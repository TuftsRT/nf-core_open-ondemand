# nf-core Home (Standalone Open OnDemand Parent App)

This app is a standalone Open OnDemand app that serves as a landing page for
nf-core pipelines. It keeps one clean entry point in the OOD dashboard and
links users to child pipeline apps.

## What this gives you

- One dashboard tile: `nf-core Home`
- A curated pipeline catalog page for non-CLI users
- Launch links to existing pipeline apps (`/pun/sys/dashboard/apps/show/<app>`)

## Directory layout

- `manifest.yml`: OOD app metadata
- `config.ru`: Rack entrypoint
- `app.rb`: app logic (loads catalog, renders page)
- `views/index.erb`: UI template
- `config/pipelines.yml`: sample pipeline catalog

## Quick deploy

1. Copy this directory to your OOD sys apps path:
   - usually `/var/www/ood/apps/sys/nf-core-home`
2. Ensure ownership/permissions match your site policy.
3. Restart the user NGINX app or reopen dashboard.

## Configuration

Environment variables:

- `NF_CORE_CATALOG`: absolute path to pipeline catalog YAML.
  - Default: `config/pipelines.yml` within the app
- `OOD_DASHBOARD_BASE`: base path to dashboard app routes.
  - Default: `/pun/sys/dashboard`

Catalog format:

```yaml
title: nf-core Pipelines
description: Choose a pipeline to begin.
groups:
  - name: Recommended for Beginners
    pipelines:
      - title: RNA-seq
        summary: Differential expression workflow.
        tags: [RNA, Beginner]
        versions:
          - app_name: nf-core-rnaseq-3-21-0
            label: v3.21.0
          - app_name: nf-core-rnaseq-3-22-2
            label: v3.22.2
```

Notes:

- Use `versions` to show one card with multiple version launch buttons.
- Backward-compatible: `app_name` (without `versions`) still works as one link.
- Flat entries are auto-merged into one card when app names follow
  `nf-core-<pipeline>-X-Y-Z`.
- If needed, set `pipeline_key` explicitly to force grouping.

Example forced grouping:

```yaml
pipelines:
  - pipeline_key: rnaseq
    title: RNA-seq
    app_name: nf-core-rnaseq-3-21-0
  - pipeline_key: rnaseq
    title: RNA-seq
    app_name: nf-core-rnaseq-3-22-2
```

## Hiding child pipeline apps from main nav

To avoid clutter, keep pipeline apps out of nav categories so only this parent
app appears in dashboard menus.

In each child app `manifest.yml`, set an empty or hidden category based on your
local OOD behavior/policy.
