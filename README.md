# nf-core bioinformatics pipelines on Open OnDemand

As the demand for reproducibility in bioinformatics analysis increases, workflow managers have become a crucial technology. Although nf-core provides many bioinformatics pipelines that are ready to use, they are not easily accessible to non-computational users. By integrating nf-core pipelines into the user-friendly Open OnDemand(OOD) web interface, the process of executing them is significantly simplified. This enables users with limited programming experience to utilize best practices for bioinformatics analysis without navigating through the initial learning curve, thus making nexflow and nf-core more accessible to a wider audience. The scripts and OOD apps for nf-core pipelines shared in this repository will enable other HPC centers to easily deploy nf-core bioinformatics pipelines on their OOD platforms.

## Usage
The scripts are very straightforward to use. The master script `nfcore2ood.sh` only requires two parameters, namely `-i/--input input` and `-o/--output output`. Input is the directory where nf-core pipelines are stored, and output is the directory where the generated Open OnDemand apps will be saved. 

### Help message
```
bash nfcore2ood.sh -h/--help
Usage: nf2ood.sh -i/--input input -o/--output output
This script will convert nf-core pipelines into OOD apps.
Arguments:
 -i/--input input   - The input directory where nf-core pipelines are stored
 -o/--output output  - The output directory where the OOD apps will be generated
```

### Download nf-core pipelines
Before running the script, nf-core pipelines should be downloaded to the local computer/node. You can use [nf-core tools](https://nf-co.re/tools) to download the pipelines. Below example shows how to download `scrnaseq` pipeline using `nf-core download`.
```
nf-core download scrnaseq -r 2.5.1 --outdir 2.5.1 -d  -s singularity -u amend -x none 
```

### Input directory
At Tufts HPC, all nf-core pipelines are stored in `/cluster/tufts/biocontainers/nf-core/pipelines`. Below is the organization of all pipelines in the folder. 

```
[yzhang85@login-prod-01 pipelines]$ tree -L 2 .
.
├── nf-core-ampliseq
│   └── 2.8.0
├── nf-core-atacseq
│   └── 2.1.2
├── nf-core-chipseq
│   └── 2.0.0
├── nf-core-differentialabundance
│   └── 1.4.0
├── nf-core-eager
│   └── 2.5.1
├── nf-core-fetchngs
│   ├── 1.11.0
│   └── 1.12.0
├── nf-core-funcscan
│   └── 1.1.4
├── nf-core-hic
│   └── 2.1.0
├── nf-core-mag
│   ├── 2.5.2
│   └── 2.5.4
├── nf-core-metatdenovo
│   └── 1.0.0
├── nf-core-methylseq
│   └── 2.6.0
├── nf-core-nanoseq
│   └── 3.1.0
├── nf-core-nanostring
│   └── 1.2.1
├── nf-core-pangenome
│   ├── 1.1.0
│   └── 1.1.1
├── nf-core-raredisease
│   └── 2.0.1
├── nf-core-rnafusion
│   └── 3.0.1
├── nf-core-rnaseq
│   └── 3.14.0
├── nf-core-rnasplice
│   ├── 1.0.2
│   └── 1.0.3
├── nf-core-sarek
│   └── 3.4.0
├── nf-core-scrnaseq
│   └── 2.5.1
├── nf-core-smrnaseq
│   └── 2.3.0
├── nf-core-taxprofiler
│   └── 1.1.5
└── nf-core-viralrecon
    └── 2.6.0
```

### Converting nf-core pipelines to OOD apps
```
bash nfcore2ood.sh -i /cluster/tufts/biocontainers/nf-core/pipelines -o ood 
Generating OOD app for nf-core-ampliseq
Generating OOD app for nf-core-atacseq
Generating OOD app for nf-core-chipseq
Generating OOD app for nf-core-differentialabundance
Generating OOD app for nf-core-eager
Generating OOD app for nf-core-fetchngs
Generating OOD app for nf-core-funcscan
Generating OOD app for nf-core-hic
Generating OOD app for nf-core-mag
Generating OOD app for nf-core-metatdenovo
Generating OOD app for nf-core-methylseq
Generating OOD app for nf-core-nanoseq
Generating OOD app for nf-core-nanostring
Generating OOD app for nf-core-pangenome
Generating OOD app for nf-core-raredisease
Generating OOD app for nf-core-rnafusion
Generating OOD app for nf-core-rnaseq
Generating OOD app for nf-core-rnasplice
Generating OOD app for nf-core-sarek
Generating OOD app for nf-core-scrnaseq
Generating OOD app for nf-core-smrnaseq
Generating OOD app for nf-core-taxprofiler
Generating OOD app for nf-core-viralrecon
```

> **Note:**
  The scripts will use nf-core_template as the template to generate different ood apps. Users need to update the template according to the configurations of your own ood platform. 

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
