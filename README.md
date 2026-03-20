# nf2ood

`nf2ood` generates Open OnDemand batch-connect apps from locally downloaded
nf-core pipelines. The repository is focused on pipeline-to-Open-OnDemand app
generation only.

![nf2ood icon](docs/icon.png)

## Prerequisites

- `python3`
- a local copy of nf-core pipeline downloads that include `nextflow_schema.json`

## What `nf2ood` does

- discovers nf-core pipelines and versions under an input directory
- locates `nextflow_schema.json` for each pipeline version
- converts schema fields into `form.yml.erb` and `template/nf-params.json.erb`
- creates one Open OnDemand app directory per pipeline version
- writes a per-app `README.md` for deployment review

## Usage

Source the shared environment file first:

```bash
source ./nf2ood.env
./nf2ood --input /path/to/pipelines --output /path/to/generated-apps
```

Optional flags:

- `--image-map /path/to/pipeline2image.tsv`: override the default pipeline image map
- `--force`: remove the output directory before regeneration

Help:

```bash
./nf2ood --help
```

## Input layout

`nf2ood` expects one directory per pipeline and one directory per version. It
looks for `nextflow_schema.json` in the common nf-core download layouts.

```text
pipelines/
├── nf-core-rnaseq/
│   └── 3.18.0/
│       └── 3_18_0/
│           └── nextflow_schema.json
└── nf-core-bamtofastq/
    └── 2.1.1/
        └── 2_1_1/
            └── nextflow_schema.json
```

Schema discovery currently checks these locations in order:

```text
<input>/<pipeline>/<version>/<version_underscored>/nextflow_schema.json
<input>/<pipeline>/<version>/nextflow_schema.json
<input>/<pipeline>/<version_underscored>/nextflow_schema.json
<input>/<pipeline>/nextflow_schema.json
```

## Configuration

Use the checked-in environment file
[`nf2ood.env`](/Users/yucheng/Documents/GitHub/nfcore2ood/nf2ood.env) as the
single place to define site values:

```bash
source ./nf2ood.env
./nf2ood --input /path/to/pipelines --output /path/to/generated-apps
```

Current variables:

- `NF2OOD_ENV_FILE`: path that generated runtime scripts will try to source
- `NF2OOD_CLUSTER`: Open OnDemand cluster id written into `form.yml.erb`
- `NF2OOD_DEFAULT_DIRECTORY`: default working directory shown in the app form
- `NF2OOD_PARTITION_YML`: path to the partition partial used in the form
- `NF2OOD_MODULE_NAME`: main runtime module, default `nextflow`
- `NF2OOD_CONTAINER_MODULE`: container runtime module, default `singularity`
- `NF2OOD_PIPELINE_ROOT`: root directory containing installed nf-core pipelines
- `NF2OOD_SINGULARITY_CACHEDIR`: Singularity or Apptainer cache path
- `NF2OOD_SLURM_PROFILE`: Nextflow profile used for scheduler-backed runs

Important runtime note:

The generated job wrapper will try to source `NF2OOD_ENV_FILE` again at job
runtime. By default, `nf2ood.env` sets this to the `nf2ood.env` file next to
[`nf2ood`](/Users/yucheng/Documents/GitHub/nfcore2ood/nf2ood). That only works
if the same path is visible from the Open OnDemand host and compute nodes.

## Generated app contents

Each generated app directory includes:

- `manifest.yml`
- `form.yml.erb`
- `form.js`
- `submit.yml.erb`
- `view.html.erb`
- `template/before.sh.erb`
- `template/script.sh.erb`
- `template/nf-params.json.erb`
- `README.md`
- app assets from the shared template such as `icon.png`, `LICENSE.txt`, and `CHANGELOG.md`

## Current generated behavior

- the form header can show a pipeline image, with `max-width` and `max-height`
  both set to `600px`
- the partition field comes from:
  `<%= File.read(NF2OOD_PARTITION_YML).indent(2) %>`
- the runtime script can load both a workflow module and a container module
- local executor mode generates a small `custom.config`
- Slurm mode runs `nextflow` with the configured `NF2OOD_SLURM_PROFILE`
- generated schema field names are normalized so Open OnDemand hide rules do
  not break when digits appear inside field names

## Image mapping

By default, `nf2ood` uses [`pipeline2image.tsv`](/Users/yucheng/Documents/GitHub/nfcore2ood/pipeline2image.tsv)
when it exists. That file maps pipeline names to header image URLs.

If the TSV file exists but a pipeline is not listed, no image is rendered for
that app. If the TSV file does not exist, `nf2ood` falls back to a best-effort
GitHub raw image URL pattern.

## Portability notes

This repository is more configurable than the earlier script, but the generated
apps still assume:

- Open OnDemand batch connect conventions
- a partition partial file compatible with your site
- a module environment if you want module loading
- an nf-core pipeline installation layout under `NF2OOD_PIPELINE_ROOT`
- a scheduler profile name understood by your local nf-core pipeline installs

Those are the main areas to review before sharing the generated apps with other
centers or preparing an Appverse submission.

## Testing

The repository includes unit tests for the schema-to-form conversion logic in
[`tests/test_json2ood.py`](/Users/yucheng/Documents/GitHub/nfcore2ood/tests/test_json2ood.py).

Run them with:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
```

## Contributor

<img src="https://github.com/zhan4429.png" alt="Yucheng Zhang" width="120">

Yucheng Zhang  
Research Technology, Tufts Technology Services  
Tufts University  
yucheng.zhang@tufts.edu

## License

This repository is released under the MIT License. See [LICENSE](LICENSE).
