# nf-core bioinformatics pipelines on Open OnDemand

As the demand for reproducibility in bioinformatics analysis increases, workflow managers have become a crucial technology. Although nf-core provides many bioinformatics pipelines that are ready to use, they are not easily accessible to non-computational users. By integrating nf-core pipelines into the user-friendly Open OnDemand(OOD) web interface, the process of executing them is significantly simplified. This enables users with limited programming experience to utilize best practices for bioinformatics analysis without navigating through the initial learning curve, thus making nexflow and nf-core more accessible to a wider audience. The scripts and OOD apps for nf-core pipelines shared in this repository will enable other HPC centers to easily deploy nf-core bioinformatics pipelines on their OOD platforms.

## Prerequisite
1. The script is read to use, so there is no installation step, but `python3` is required in your computing enviroment. 
2. The recommended way to download nf-core pipelines to your cluster is via [nf-core/tools](https://nf-co.re/docs/nf-core-tools/installation), which simplifies installation and version management.
3. Tufts HPC uses **SingularityCE** to run these pipelines. **Apptainer** is also supported and works equally well.

## Usage
The scripts are straightforward to use. The master script, `nf-ood-mod`, requires three parameters:

- `-i` / `--input <input>`: Path to the directory where nf-core pipelines are stored.
- `-o` / `--output <output>`: Path to the directory where the generated Open OnDemand (OOD) apps will be saved.
- `-m` / `--module <module_outdir>`: Path to the directory where the generated environment modules will be saved.

This setup allows you to organize and deploy nf-core pipelines as both OOD apps and standard environment modules.

### Help message
```
bash nf-ood-mod -h/--help
Usage: nf-ood-mod -i/--input input -o/--output output -m/--module module_outdir
This script will convert nf-core pipelines into OOD apps.
Arguments:
 -i/--input input   - The input directory where nf-core pipelines are stored
 -o/--output output  - The output directory where the OOD apps will be generated
 -m/--module module_outdir - The output directory where the module files will be generated
```

### Download nf-core pipelines

Before running the script, nf-core pipelines should be downloaded to the local computer/node. You can use [nf-core tools](https://nf-co.re/tools) to download the pipelines. Below example shows how to download `scrnaseq` pipeline using `nf-core download`.

```
nf-core download scrnaseq -r 2.5.1 --outdir 2.5.1 -d  -s singularity -u amend -x none
```

### Input directory
We provide two example nf-core pipelines in the `testpipes` directory. Below is the expected directory structure for the pipelines.

When downloading your own pipelines to the HPC, please ensure that the structure matches the layout shown below.

```
$ tree -L 3 testpipes
testpipes
├── nf-core-bamtofastq
│   └── 2.1.1
│       ├── 2_1_1
│       └── configs -> ../../../configs/
└── nf-core-rnaseq
    ├── 3.14.0
    │   ├── 3_14_0
    │   └── configs -> ../../../configs/
    ├── 3.16.0
    │   ├── 3_16_0
    │   └── configs -> /cluster/tufts/biocontainers/nf-core/configs
    ├── 3.17.0
    │   ├── 3_17_0
    │   └── configs -> /cluster/tufts/biocontainers/nf-core/configs
    └── 3.18.0
        ├── 3_18_0
        └── configs -> /cluster/tufts/biocontainers/nf-core/configs
```


### Converting nf-core pipelines to OOD apps and enviroment modules
We provide two example nf-core pipelines in the `testpipes` directory. You can use the command below to convert them into Open OnDemand (OOD) apps.

In addition to generating OOD apps, `nf-ood-mod` can also convert nf-core pipelines into environment modules. This allows users to load and run pipelines using standard module commands, such as:

```bash
module load nf-core-rnaseq/3.14.0

rnaseq --input samplesheet.csv --outdir output \
  --fasta ref.fasta --gtf ref.gtf \
  --aligner star_salmon \
  -profile tufts
```

```
$ bash nf-ood-mod -i testpipes/ -o ood_apps -m modules
Generating OOD app for nf-core-bamtofastq
Generating module files for nf-core-bamtofastq
Generating OOD app for nf-core-rnaseq
Generating module files for nf-core-rnaseq
```

> **Note:**
> The scripts will use nf-core_template as the template to generate different ood apps. Users need to update the template according to the configurations of your own ood platform. Below is the list of files to be edited:

- nf-ood-mod (marked with TODO)
- json2ood.py (marked with TODO)
- nf-core_template/template.erb
- nf-core_template/submit.yml.erb
- nf-core_template/template/script.sh.erb (marked with TODO)
- module_template/lmod_template.lua (marked with TODO)

## Contributors

The people who contributed to this project over time:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/zhan4429"><img src="https://avatars.githubusercontent.com/u/90942318" width="100px;" alt=""/><br /><sub><b>Yucheng Zhang</b></sub></a><br /></td>  
    <td align="center"><a href="https://github.com/PayasBhutra"><img src="https://avatars.githubusercontent.com/u/70447330" width="100px;" alt=""/><br /><sub><b>Payas Bhutra</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/shirleyxueli41"><img src="https://avatars.githubusercontent.com/u/88347911?v=4" width="100px;" alt=""/><br /><sub><b>Xue(Shirley) Li</b></sub></a><br /></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Contributions are welcome in the form of suggestions for additional features, pull requests with new features or bug fixes, etc. If you find bugs or have questions, open an Issue here. If and when the project grows, a code of conduct will be provided along side a more comprehensive set of guidelines for contributing; until then, just be nice.
