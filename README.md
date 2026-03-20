# nf2ood

`nf2ood` generates Open OnDemand batch-connect apps from locally downloaded
nf-core pipelines. It no longer creates Lmod modules; the repository is now
focused entirely on pipeline-to-Open-OnDemand app generation.

## Prerequisites

- `python3`

## What it does

- reads `nextflow_schema.json` from downloaded nf-core pipelines
- generates `form.yml.erb` and `nf-params.json.erb` from that schema
- creates a complete Open OnDemand app directory for each pipeline version
- writes a per-app `README.md` intended for deployment review and future
  Appverse preparation

## Usage

```bash
source ./nf2ood.env
./nf2ood --input /path/to/pipelines --output /path/to/generated-apps
```

Optional flags:

- `--image-map /path/to/pipeline2image.tsv`: override the default pipeline image map
- `--force`: remove the output directory before regeneration

## Configuration

Use the checked-in environment file
[`nf2ood.env`](/Users/yucheng/Documents/GitHub/nf-core_open-ondemand/nf2ood.env)
as the single place to define site values:

```bash
source ./nf2ood.env
./nf2ood --input /path/to/pipelines --output /path/to/generated-apps
```

The generated apps render their default values from whatever was exported when
`nf2ood` ran. If `NF2OOD_ENV_FILE` points to a deployed copy of the same file,
the generated job wrapper will source it again at runtime.

The default module name in this config is now `nextflow`.
The default container module is `singularity`.
The default partition partial is `/etc/ood/config/apps/dashboard/batch_connect/partials/cpu_partition.yml`.
By default, `NF2OOD_ENV_FILE` resolves to the `nf2ood.env` file located next to
[`nf2ood`](/Users/yucheng/Documents/GitHub/nf-core_open-ondemand/nf2ood).

## Expected input layout

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

## Generated app contents

Each generated app directory includes:

- `manifest.yml`
- `form.yml.erb`
- `submit.yml.erb`
- `template/script.sh.erb`
- `template/nf-params.json.erb`
- `README.md`

## Portability notes

Review [`nf2ood.env`](/Users/yucheng/Documents/GitHub/nf-core_open-ondemand/nf2ood.env)
before publishing to other sites or preparing an Appverse submission. The main
site-specific values remain the cluster name, working directory root, module
name, pipeline installation root, Singularity cache path, and scheduler
profile.
