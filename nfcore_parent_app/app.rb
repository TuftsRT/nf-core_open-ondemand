# frozen_string_literal: true

require 'erb'
require 'yaml'
require 'cgi'

class NfCoreHomeApp
  TEMPLATE_PATH = File.expand_path('views/index.erb', __dir__)
  DEFAULT_APPS_DIR = '/var/www/ood/apps/sys'
  DEFAULT_DASHBOARD_BASE = '/pun/sys/dashboard'

  def call(env)
    req_path = env['PATH_INFO'].to_s
    return not_found unless req_path == '/' || req_path.empty?

    @title, @description, @groups = load_from_manifests
    @dashboard_base = ENV.fetch('OOD_DASHBOARD_BASE', DEFAULT_DASHBOARD_BASE)
    html = ERB.new(File.read(TEMPLATE_PATH)).result(binding)
    [200, { 'Content-Type' => 'text/html; charset=utf-8' }, [html]]
  rescue StandardError => e
    body = <<~HTML
      <h1>nf-core Home</h1>
      <p>Failed to render app.</p>
      <pre>#{CGI.escapeHTML(e.message)}</pre>
    HTML
    [500, { 'Content-Type' => 'text/html; charset=utf-8' }, [body]]
  end

  private

  def apps_dir
    ENV.fetch('NF_CORE_APPS_DIR', DEFAULT_APPS_DIR)
  end

  def load_from_manifests
    groups = discover_manifest_groups
    title = 'nf-core Pipelines'
    description = 'Pipelines are grouped by subcategory.'
    [title, description, groups]
  rescue StandardError => e
    [
      'nf-core Pipelines',
      "Failed to discover pipeline manifests from #{apps_dir}: #{e.message}",
      []
    ]
  end

  def discover_manifest_groups
    grouped = {}

    Dir.glob(File.join(apps_dir, 'nf-core-*', 'manifest.yml')).sort.each do |manifest_path|
      app_name = File.basename(File.dirname(manifest_path))
      raw = YAML.safe_load(File.read(manifest_path), aliases: true) || {}
      next unless include_manifest_app?(raw, app_name)

      subcategory = raw['subcategory'].to_s.strip
      subcategory = 'other' if subcategory.empty?
      subcategory_key = subcategory.downcase
      grouped[subcategory_key] ||= { name: subcategory.downcase, pipelines: {} }

      parsed_name = parse_manifest_name(raw['name'].to_s, app_name)
      pipeline_key = parsed_name[:title].downcase
      grouped[subcategory_key][:pipelines][pipeline_key] ||= {
        title: parsed_name[:title],
        versions: []
      }
      grouped[subcategory_key][:pipelines][pipeline_key][:versions] << {
        app_name: app_name,
        label: parsed_name[:version_label],
        sort_key: parsed_name[:version_sort_key]
      }
    end

    grouped.keys.sort.map do |subcategory_key|
      group = grouped[subcategory_key]
      cards = group[:pipelines].values
      cards.each do |card|
        card[:versions] = uniq_versions(card[:versions])
        card[:versions].sort_by! { |v| v[:sort_key] }
        card[:versions].reverse!
      end
      cards.sort_by! { |card| card[:title].downcase }
      { name: group[:name], pipelines: cards }
    end
  end

  def include_manifest_app?(raw, app_name)
    return false unless app_name.start_with?('nf-core-')

    role = raw['role'].to_s.strip.downcase
    role.empty? || role == 'batch_connect'
  end

  def parse_manifest_name(manifest_name, app_name)
    name = manifest_name.to_s.strip
    name = infer_pipeline_name_from_app_name(app_name) if name.empty?

    version_match = name.match(/(v?\d+(?:\.\d+)+)\s*\z/)
    version = version_match ? version_match[1] : infer_version_from_app_name(app_name)
    title = version_match ? name.sub(/(v?\d+(?:\.\d+)+)\s*\z/, '').strip : name
    title = infer_pipeline_name_from_app_name(app_name) if title.empty?

    version_label = version.to_s.strip
    version_label = "v#{version_label}" unless version_label.empty? || version_label.start_with?('v')
    {
      title: title.downcase,
      version_label: version_label,
      version_sort_key: version_sort_key(version_label)
    }
  end

  def infer_version_from_app_name(app_name)
    parts = app_name.split('-')
    return '' if parts.size < 3
    maybe_version = parts[-3, 3]
    return '' unless maybe_version.all? { |p| p.match?(/^\d+$/) }
    maybe_version.join('.')
  end

  def infer_pipeline_name_from_app_name(app_name)
    return app_name unless app_name.start_with?('nf-core-')

    parts = app_name.split('-')
    return app_name if parts.length < 3

    if parts.length >= 6 && parts[-3, 3].all? { |p| p.match?(/^\d+$/) }
      parts[2..-4].join('-')
    else
      parts[2..].join('-')
    end
  end

  def titleize_key(key)
    key.to_s.tr('-', ' ').split.map(&:capitalize).join(' ')
  end

  def version_sort_key(version_label)
    return [0, 0, 0] if version_label.to_s.empty?

    numeric = version_label.to_s.sub(/^v/i, '')
    pieces = numeric.split('.').map { |p| p.to_i }
    (pieces + [0, 0, 0])[0, 3]
  end

  def uniq_versions(versions)
    seen = {}
    versions.each do |v|
      seen[v[:app_name]] ||= v
    end
    seen.values
  end

  def launch_url(app_name)
    base = @dashboard_base.chomp('/')
    "#{base}/apps/show/#{CGI.escape(app_name)}"
  end

  def not_found
    [404, { 'Content-Type' => 'text/plain; charset=utf-8' }, ['Not found']]
  end
end
