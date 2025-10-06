const iconMap = {
  "number of hours": "fa fa-fw me-2 fa-regular fa-clock",
  "working directory": "fa fa-fw me-2 fa-folder-open svelte-1jrxhr2",
  "number of cores": "fa fa-fw me-2 fas fa-regular fa-microchip",
  "amount of memory (gb)": " fa fa-fw me-2 fas fa-microchip svelte-1jrxhr2",
  "cellranger options": " fa fa-fw me-2 fas fa-chart-bar svelte-1jrxhr2",
  "cellranger arc options": " fa fa-fw me-2 fas fa-layer-group svelte-1jrxhr2",
  "cellranger multi options": " fa fa-fw me-2 fas fa-cubes svelte-1jrxhr2",
  "which nextflow executor to use?": "fa fa-fw me-2 fas fa-regular fa-gears",
  partition: "fa fa-fw me-2 fas fa-duotone fa-solid fa-server",
  resume: "fa fa-fw me-2 fas fa-play",
  "skip steps": "fa fa-fw me-2 fas fa-fast-forward svelte-1jrxhr2",
  "skip pipeline steps": "fa fa-fw me-2 fas fa-fast-forward svelte-1jrxhr2",
  "process skipping options":
    "fa fa-fw me-2 fas fa-fast-forward svelte-1jrxhr2",
  "input/output options": "fa fa-fw me-2 fas fa-terminal svelte-1jrxhr2",
  "read trimming options": "fa fa-fw me-2 fas fa-cut svelte-1jrxhr2",
  "adapter trimming options": "fa fa-fw me-2 fas fa-cut svelte-1jrxhr2",
  "adapter trimming": "fa fa-fw me-2 fas fa-cut svelte-1jrxhr2",
  "read filtering options": "fa fa-fw me-2 fas fa-trash-alt svelte-1jrxhr2",
  "umi options": "fa fa-fw me-2 fas fa-barcode svelte-1jrxhr2",
  "alignment compression options":
    "fa fa-fw me-2 fas fa-map-signs svelte-1jrxhr2",
  "alignment options": "fa fa-fw me-2 fas fa-braille svelte-1jrxhr2",
  "reference genome options": "fa fa-fw me-2 fas fa-dna svelte-1jrxhr2",
  "generic options": "fa fa-fw me-2 fas fa-file-import svelte-1jrxhr2",
  "fastq options": "fa fa-fw me-2 fas fa-file svelte-1jrxhr2",
  "cell barcode options": "fa fa-fw me-2 fas fa-microscope svelte-1jrxhr2",
  mapping: "fa fa-fw me-2 far fa-map svelte-1jrxhr2",
  "analysis options": "fa fa-fw me-2 fas fa-search svelte-1jrxhr2",
  "quality control": "fa fa-fw me-2 fas fa-check-circle svelter-1jrxhr2",
  "quality control options":
    "fa fa-fw me-2 fas fa-check-circle svelter-1jrxhr2",
  "peak calling options": "fa fa-fw me-2 fas fa-chart-area svelte-1jrxhr2",
  "preprocessing general qc options":
    "fa fa-fw me-2 fas fa-users-cog svelte-1jrxhr2",
  "preprocessing short-read qc options":
    "fa fa-fw me-2 fas fa-compress-alt svelte-1jrxhr2",
  "preprocessing long-read qc options":
    "fa fa-fw me-2 fas fa-compress-alt svelte-1jrxhr2",
  "redundancy estimation": "fa fa-fw me-2 fas fa-chart-line svelte-1jrxhr2",
  "preprocessing host removal options":
    "fa fa-fw me-2 fas fa-user-times svelte-1jrxhr2",
  "preprocessing run merging options":
    "fa fa-fw me-2 fas fa-clipboard-check svelte-1jrxhr2",
  "profiling options": "fa fa-fw me-2 fas fa-align-center svelte-1jrxhr2",
  "postprocessing and visualisation options":
    "fa fa-fw me-2 fas fa-chart-line svelte-1jrxhr2",
  "save intermediate files": "fa fa-fw me-2 fas fa-save svelte-1jrxhr2",
  "special library options":
    "fa fa-fw me-2 fas fa-prescription-bottle svelte-1jrxhr2",
  "bismark options": "fa fa-fw me-2 fas fa-circle svelte-1jrxhr2",
  "bwa-meth options": "fa fa-fw me-2 far fa-circle svelte-1jrxhr2",
  "qualimap options": "fa fa-fw me-2 fas fa-chart-pie svelte-1jrxhr2",
  "targeted sequencing analysis options":
    "fa fa-fw me-2 fas fa-bullseye svelte-1jrxhr2",
  "run pipeline steps": "fa fa-fw me-2 fas fa-fast-forward svelte-1jrxhr2",
  "preprocessing of alignment": "fa fa-fw me-2 fas fa-toolbox svelte-1jrxhr2",
  "postprocessing of alignment": "fa fa-fw me-2 fas fa-toolbox svelte-1jrxhr2",
  "variant calling": "fa fa-fw me-2 fas fa-barcode svelte-1jrxhr2",
  "variant filtering": "fa fa-fw me-2 fas fa-filter svelte-1jrxhr2",
  "variant annotation": "fa fa-fw me-2 fas fa-pen-nib svelte-1jrxhr2",
  "pipeline stage options": "fa fa-fw me-2 fas fa-cogs svelte-1jrxhr2",
  "general reference genome options": "fa fa-fw me-2 fas fa-dna svelte-1jrxhr2",
  "indexing options": "fa fa-fw me-2 fas fa-file-code svelte-1jrxhr2",
  "dotplot parameters": "fa fa-fw me-2 fas fa-th svelte-1jrxhr2",
  "mandatory arguments":
    "fa fa-fw me-2 fas fa-exclamation-circle svelte-1jrxhr2",
  "skip tools": "fa fa-fw me-2 fas fa-fast-forward svelte-1jrxhr2",
  "simpleaf options": "fa fa-fw me-2 fas fa-microscope svelte-1jrxhr2",
  "starsolo options": "fa fa-fw me-2 fas fa-star svelte-1jrxhr2",
  "kallisto/bus options": "fa fa-fw me-2 fas fa-rainbow svelte-1jrxhr2",
  "special library types":
    "fa fa-fw me-2 fas fa-prescription-bottle svelte-1jrxhr2",
  "sequencing input": "fa fa-fw me-2 fas fa-align-justify svelte-1jrxhr2",
  "primer removal": "fa fa-fw me-2 fas fa-align-left svelte-1jrxhr2",
  "read trimming and quality filtering":
    "fa fa-fw me-2 fas fa-ban svelte-1jrxhr2",
  "amplicon sequence variants(asv) calculation":
    "fa fa-fw me-2 fas fa-braille svelte-1jrxhr2",
  "taxonmoic database": "fa fa-fw me-2 fas fa-braille svelte-1jrxhr2",
  "multi-region taxonomic database":
    "fa fa-fw me-2 fas fa-braille svelte-1jrxhr2",
  "asv filtering": "fa fa-fw me-2 fas fa-filter svelte-1jrxhr2",
  "downstream analysis": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "differential abundance analysis":
    "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "pipeline summary report": "fa fa-fw me-2 fas fa-book-open svelte-1jrxhr2",
  "skipping specified steps":
    "fa fa-fw me-2 fas fa-fast-forward svelte-1jrxhr2",
  "main options": "fa fa-fw me-2 fas fa-user-cogs svelte-1jrxhr2",
  "fastq preprocessing": "fa fa-fw me-2 fas fa-cut svelte-1jrxhr2",
  preprocessing: "fa fa-fw me-2 fas fa-plus svelte-1jrxhr2",
  annotation: "fa fa-fw me-2 fas fa-plus svelte-1jrxhr2",
  "optional outputs": "fa fa-fw me-2 fas fa-file-alt svelte-1jrxhr2",
  "tower_access_token (optional)": "fa fa-fw me-2 fas fa-key svelte-1jrxhr2",
  "Screening type activation": "fa fa-fw me-2 fa fa-list svelte-1jrxhr2",
  "Taxonomic classification: general options":
    "fa fa-fw me-2 fas fa-tag svelte-1jrxhr2",
  "Taxonomic classification: MMseqs2 databases":
    "fa fa-fw me-2 fas fa-tag svelte-1jrxhr2",
  "Taxonomic classification: MMseqs2 taxonomy":
    "fa fa-fw me-2 fas fa-tag svelte-1jrxhr2",
  "Annotation: general options":
    "fa fa-fw me-2 fas fa-file-signature svelte-1jrxhr2",
  "Annotation: BAKTA": "fa fa-fw me-2 fas fa-file-signature svelte-1jrxhr2",
  "Annotation: Prokka": "fa fa-fw me-2 fas fa-file-signature svelte-1jrxhr2",
  "Annotation: Pyrodigal": "fa fa-fw me-2 fas fa-file-signature svelte-1jrxhr2",
  "Annotation: Prodigal": "fa fa-fw me-2 fas fa-file-signature svelte-1jrxhr2",
  "Protein Annotation: INTERPROSCAN":
    "fa fa-fw me-2 fas fa-file-signature svelte-1jrxhr2",
  "Database downloading options":
    "fa fa-fw me-2 fas fa-database svelte-1jrxhr2",
  "AMP: AMPlify": "fa fa-fw me-2 fas fa-plus svelte-1jrxhr2",
  "AMP: ampir": "fa fa-fw me-2 fas fa-plus svelte-1jrxhr2",
  "AMP: hmmsearch": "fa fa-fw me-2 fas fa-plus svelte-1jrxhr2",
  "AMP: Macrel": "fa fa-fw me-2 fas fa-plus svelte-1jrxhr2",
  "AMP: ampcombi2 parsetables": "fa fa-fw me-2 fas fa-plus svelte-1jrxhr2",
  "AMP: ampcombi2 cluster": "fa fa-fw me-2 fas fa-plus svelte-1jrxhr2",
  "ARG: AMRFinderPlus": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "ARG: DeepARG": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "ARG: fARGene": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "ARG: RGI": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "ARG: ABRicate": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "ARG: hAMRonization": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "ARG: argNorm": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "BGC: general options":
    "fa fa-fw me-2 fas fa-angle-double-right svelte-1jrxhr2",
  "BGC: antiSMASH": "fa fa-fw me-2 fas fa-angle-double-right svelte-1jrxhr2",
  "BGC: DeepBGC": "fa fa-fw me-2 fas fa-angle-double-right svelte-1jrxhr2",
  "BGC: GECCO": "fa fa-fw me-2 fas fa-angle-double-right svelte-1jrxhr2",
  "BGC: hmmsearch": "fa fa-fw me-2 fas fa-angle-double-right svelte-1jrxhr2",
  "Features options": "fa fa-fw me-2 fas fa-sitemap svelte-1jrxhr2",
  "Abundance values": "fa fa-fw me-2 fas fa-chart-bar svelte-1jrxhr2",
  "Observations (e.g. samples) options":
    "fa fa-fw me-2 fas fa-eye svelte-1jrxhr2",
  "Affy input options": "fa fa-fw me-2 fas fa-table svelte-1jrxhr2",
  "Proteus input options": "fa fa-fw me-2 fas fa-table svelte-1jrxhr2",
  Filtering: "fa fa-fw me-2 fas fa-filter svelte-1jrxhr2",
  "Exploratory analysis": "fa fa-fw me-2 fas fa-chart-area svelte-1jrxhr2",
  "Differential analysis": "fa fa-fw me-2 fas fa-adjust svelte-1jrxhr2",
  "DESeq2 specific options (RNA-seq only)":
    "fa fa-fw me-2 fas fa-adjust svelte-1jrxhr2",
  "Limma specific options (microarray only)":
    "fa fa-fw me-2 fas fa-border-all svelte-1jrxhr2",
  GSEA: "fa fa-fw me-2 fas fa-layer-group svelte-1jrxhr2",
  gprofiler2: "fa fa-fw me-2 fas fa-layer-group svelte-1jrxhr2",
  "Shiny app settings": "fa fa-fw me-2 fab fa-app-store-ios svelte-1jrxhr2",
  "Options related to gene set analysis":
    "fa fa-fw me-2 fas fa-cogs svelte-1jrxhr2",
  "Reporting options": "fa fa-fw me-2 fas fa-chart-line svelte-1jrxhr2",
  "Partial run options":
    "fa fa-fw me-2 fas fa-angle-double-right svelte-1jrxhr2",
  "FastQC/fastp options": "fa fa-fw me-2 fas fa-cut svelte-1jrxhr2",
  "SortMeRNA options": "fa fa-fw me-2 fas fa-filter svelte-1jrxhr2",
  "Assembly options": "fa fa-fw me-2 fas fa-puzzle-piece svelte-1jrxhr2",
  "BUSCO options": "fa fa-fw me-2 fas fa-chart-pie svelte-1jrxhr2",
  "rnaQUAST options": "fa fa-fw me-2 fas fa-ruler svelte-1jrxhr2",
  "transRate options": "fa fa-fw me-2 fas fa-align-center svelte-1jrxhr2",
  "salmon options": "fa fa-fw me-2 fas fa-fish svelte-1jrxhr2",
  "main arguments": "fa fa-fw me-2 fas fa-terminal svelte-1jrxhr2",
  "Sequencing input": "fa fa-fw me-2 fas fa-align-justify svelte-1jrxhr2",
  "primer removal": "fa fa-fw me-2 fas fa-align-left svelte-1jrxhr2",
  "Read trimming and quality filtering":
    "fa fa-fw me-2 fas fa-ban svelte-1jrxhr2",
  "Amplicon Sequence Variants (ASV) calculation":
    "fa fa-fw me-2 fas fa-braille svelte-1jrxhr2",
  "ASV post processing": "fa fa-fw me-2 fas fa-filter svelte-1jrxhr2",
  "Taxonomic assignment": "fa fa-fw me-2 fas fa-database svelte-1jrxhr2",
  "Multi-region taxonomic database":
    "fa fa-fw me-2 fas fa-database svelte-1jrxhr2",
  "ASV filtering": "fa fa-fw me-2 fas fa-filter svelte-1jrxhr2",
  "Downstream analysis": "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "Differential abundance analysis":
    "fa fa-fw me-2 fas fa-bacteria svelte-1jrxhr2",
  "Pipeline summary report": "fa fa-fw me-2 fas fa-book-open svelte-1jrxhr2",
  "Skipping specific steps": "fa fa-fw me-2 fas fa-hand-paper svelte-1jrxhr2",
  "Reproducibility options": "fa fa-fw me-2 fas fa-lock svelte-1jrxhr2",
  "Quality control for short reads options":
    "fa fa-fw me-2 fas fa-check-circle svelte-1jrxhr2",
  "Quality control for long reads options":
    "fa fa-fw me-2 fas fa-check-circle svelte-1jrxhr2",
  "Taxonomic profiling options": "fa fa-fw me-2 fas fa-tag svelte-1jrxhr2",
  "Assembly options": "fa fa-fw me-2 fas fa-puzzle-piece svelte-1jrxhr2",
  "Gene prediction and annotation options":
    "fa fa-fw me-2 fas fa-file-signature svelte-1jrxhr2",
  "Virus identification options": "fa fa-fw me-2 fas fa-virus svelte-1jrxhr2",
  "Binning options": "fa fa-fw me-2 fas fa-cubes svelte-1jrxhr2",
  "Bin quality check options": "fa fa-fw me-2 fas fa-thumbs-up svelte-1jrxhr2",
  "Ancient DNA assembly": "fa fa-fw me-2 fas fa-landmark svelte-1jrxhr2",
};

// Create a lowercase version of the iconMap automatically
const normalizedIconMap = Object.fromEntries(
  Object.entries(iconMap).map(([key, value]) => [key.toLowerCase(), value])
);

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("label").forEach((label) => {
    const labelText = label.textContent
      .trim()
      .replace(/^["']|["']$/g, "")
      .toLowerCase(); // normalize to lowercase

    const iconClass = normalizedIconMap[labelText];
    if (iconClass) {
      const icon = document.createElement("i");
      icon.className = iconClass;

      label.style.color = "green";
      label.style.fontWeight = "bold";
      label.style.fontSize = "1.1rem";
      icon.style.color = "green";
      icon.style.fontWeight = "bold";
      icon.style.fontSize = "1.3rem";

      label.prepend(icon);
    }
  });
});
