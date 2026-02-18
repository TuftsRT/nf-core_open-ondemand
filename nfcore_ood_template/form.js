const ICONS = {
  clock: "fa fa-fw me-2 fas fa-clock",
  folder: "fa fa-fw me-2 fas fa-folder-open",
  chip: "fa fa-fw me-2 fas fa-microchip",
  gears: "fa fa-fw me-2 fas fa-cogs",
  server: "fa fa-fw me-2 fas fa-server",
  play: "fa fa-fw me-2 fas fa-play",
  skip: "fa fa-fw me-2 fas fa-forward",
  terminal: "fa fa-fw me-2 fas fa-terminal",
  cut: "fa fa-fw me-2 fas fa-cut",
  filter: "fa fa-fw me-2 fas fa-filter",
  barcode: "fa fa-fw me-2 fas fa-barcode",
  map: "fa fa-fw me-2 fas fa-map",
  dna: "fa fa-fw me-2 fas fa-dna",
  file: "fa fa-fw me-2 fas fa-file",
  search: "fa fa-fw me-2 fas fa-search",
  qc: "fa fa-fw me-2 fas fa-check-circle",
  chart: "fa fa-fw me-2 fas fa-chart-line",
  bacteria: "fa fa-fw me-2 fas fa-bacteria",
  save: "fa fa-fw me-2 fas fa-save",
  target: "fa fa-fw me-2 fas fa-bullseye",
  annotate: "fa fa-fw me-2 fas fa-file-signature",
  index: "fa fa-fw me-2 fas fa-file-code",
  warning: "fa fa-fw me-2 fas fa-exclamation-circle",
  star: "fa fa-fw me-2 fas fa-star",
  table: "fa fa-fw me-2 fas fa-table",
  app: "fa fa-fw me-2 fas fa-mobile-alt",
  lock: "fa fa-fw me-2 fas fa-lock",
  tag: "fa fa-fw me-2 fas fa-tag",
  database: "fa fa-fw me-2 fas fa-database",
  layer: "fa fa-fw me-2 fas fa-layer-group",
  virus: "fa fa-fw me-2 fas fa-virus",
  cubes: "fa fa-fw me-2 fas fa-cubes",
  bin: "fa fa-fw me-2 fas fa-boxes",
  image: "fa fa-fw me-2 fas fa-image",
  microscope: "fa fa-fw me-2 fas fa-microscope",
  vial: "fa fa-fw me-2 fas fa-vial",
  puzzle: "fa fa-fw me-2 fas fa-puzzle-piece",
  key: "fa fa-fw me-2 fas fa-key",
};

const iconMap = {
  "number of hours": ICONS.clock,
  "working directory": ICONS.folder,
  "number of cores": ICONS.chip,
  "amount of memory (gb)": ICONS.chip,
  "which nextflow executor to use?": ICONS.gears,
  partition: ICONS.server,
  resume: ICONS.play,
  "save intermediate files": ICONS.save,
  "input/output options": ICONS.terminal,
  "main options": ICONS.gears,
  "main arguments": ICONS.terminal,
  "mandatory arguments": ICONS.warning,
  "optional outputs": ICONS.file,
  "pipeline stage options": ICONS.gears,
  "pipeline summary report": ICONS.chart,
  "reporting options": ICONS.chart,
  "quality control": ICONS.qc,
  "quality control options": ICONS.qc,
  "quality check parameters": ICONS.qc,
  "qualimap options": ICONS.qc,
  "reference genome options": ICONS.dna,
  "general reference genome options": ICONS.dna,
  "reference genome": ICONS.dna,
  "indexing options": ICONS.index,
  "alignment options": ICONS.map,
  "alignment compression options": ICONS.map,
  "variant calling": ICONS.vial,
  "variant filtering": ICONS.filter,
  "variant annotation": ICONS.annotate,
  "targeted sequencing analysis options": ICONS.target,
  "peak calling options": ICONS.chart,
  "analysis options": ICONS.search,
  "exploratory analysis": ICONS.chart,
  "differential analysis": ICONS.chart,
  "differential abundance analysis": ICONS.bacteria,
  "read trimming options": ICONS.cut,
  "adapter trimming options": ICONS.cut,
  "read filtering options": ICONS.filter,
  "umi options": ICONS.barcode,
  "fastq options": ICONS.file,
  "fastq preprocessing": ICONS.cut,
  "sequencing input": ICONS.file,
  "cell barcode options": ICONS.barcode,
  "taxonomic profiling options": ICONS.tag,
  "taxonomic assignment": ICONS.tag,
  "database downloading options": ICONS.database,
  "assembly options": ICONS.puzzle,
  "binning options": ICONS.bin,
  "gene prediction and annotation options": ICONS.annotate,
  "virus identification options": ICONS.virus,
  "cellranger options": ICONS.chart,
  "cellranger arc options": ICONS.layer,
  "cellranger multi options": ICONS.cubes,
  "starsolo options": ICONS.star,
  "simpleaf options": ICONS.microscope,
  "shiny app settings": ICONS.app,
  "reproducibility options": ICONS.lock,
  "tower_access_token (optional)": ICONS.key,
};

const prefixIconMap = {
  amp: ICONS.vial,
  arg: ICONS.bacteria,
  bgc: ICONS.layer,
  annotation: ICONS.annotate,
  "protein annotation": ICONS.annotate,
  "taxonomic classification": ICONS.tag,
  cellranger: ICONS.layer,
  "quality control": ICONS.qc,
  "differential abundance": ICONS.chart,
};

const keywordRules = [
  { regex: /\b(hour|time|duration|walltime)\b/, icon: ICONS.clock },
  { regex: /\b(memory|ram|core|cpu|threads?|parallel)\b/, icon: ICONS.chip },
  { regex: /\b(work|scratch|outdir|directory|folder|path)\b/, icon: ICONS.folder },
  { regex: /\b(executor|profile|config|engine|queue|partition|cluster|slurm|pbs|lsf)\b/, icon: ICONS.server },
  { regex: /\b(resume|retry|run|launch|start)\b/, icon: ICONS.play },
  { regex: /\b(skip|exclude|disable)\b/, icon: ICONS.skip },
  { regex: /\b(input|output|io|channel)\b/, icon: ICONS.terminal },
  { regex: /\b(read|trim|adapter|primer|cutadapt|fastp)\b/, icon: ICONS.cut },
  { regex: /\b(filter|qcfilter|remove)\b/, icon: ICONS.filter },
  { regex: /\b(umi|barcode)\b/, icon: ICONS.barcode },
  { regex: /\b(map|mapping|align|alignment|bwa|star|hisat|minimap)\b/, icon: ICONS.map },
  { regex: /\b(reference|genome|fasta|gtf|gff|transcriptome|igenomes)\b/, icon: ICONS.dna },
  { regex: /\b(fastq|bam|cram|vcf|bed|tsv|csv|file|manifest)\b/, icon: ICONS.file },
  { regex: /\b(qc|quality|multiqc|fastqc|qualimap|check)\b/, icon: ICONS.qc },
  { regex: /\b(analysis|detect|discovery|search|inspect)\b/, icon: ICONS.search },
  { regex: /\b(report|visual|plot|chart|summary|dashboard)\b/, icon: ICONS.chart },
  { regex: /\b(variant|snv|indel|sv|cnv|mutat)\b/, icon: ICONS.vial },
  { regex: /\b(annotation|annotator|annotate)\b/, icon: ICONS.annotate },
  { regex: /\b(index|indexing)\b/, icon: ICONS.index },
  { regex: /\b(database|db|taxonomy|kraken|metaphlan)\b/, icon: ICONS.database },
  { regex: /\b(metagenom|microbiome|amplicon|taxonomic|profiling)\b/, icon: ICONS.bacteria },
  { regex: /\b(antismash|gecco|deepbgc|amp|arg|amrfinder|fargene|rgi|abricate)\b/, icon: ICONS.bacteria },
  { regex: /\b(assembly|assembler|contig|scaffold)\b/, icon: ICONS.puzzle },
  { regex: /\b(bin|binning|bins)\b/, icon: ICONS.bin },
  { regex: /\b(virus|viral|virome)\b/, icon: ICONS.virus },
  { regex: /\b(cellranger|single[- ]?cell|scrna|spatial)\b/, icon: ICONS.layer },
  { regex: /\b(image|imaging|microscopy|segment)\b/, icon: ICONS.image },
  { regex: /\b(protein|proteomics|peptide|openms)\b/, icon: ICONS.microscope },
  { regex: /\b(motif|fimo|macs2|chromhmm|chip|atac|dmr)\b/, icon: ICONS.chart },
  { regex: /\b(demux|demultiplex|hashed|freemuxlet|htodemux|hashsolo)\b/, icon: ICONS.cubes },
  { regex: /\b(cluster|clustering|integration|umap|tsne|dimensionality)\b/, icon: ICONS.layer },
  { regex: /\b(consensus|dedup|refine|collapse|normaliz)\b/, icon: ICONS.filter },
  { regex: /\b(ont|nanopore|hifi|pacbio|long[- ]?read)\b/, icon: ICONS.map },
  { regex: /\b(hla|epitope|immune|immuno)\b/, icon: ICONS.microscope },
  { regex: /\b(community|developer|deprecated|additional|optional|global|generic|general)\b/, icon: ICONS.gears },
  { regex: /\b(token|apikey|secret|password|credential)\b/, icon: ICONS.key },
  { regex: /\b(reproduc|lock|determin)\b/, icon: ICONS.lock },
];

function normalizeLabel(text) {
  return text
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\s+/g, " ")
    .replace(/:+$/, "")
    .toLowerCase();
}

function compactLabel(text) {
  return text.replace(/[^a-z0-9]/g, "");
}

const normalizedIconMap = Object.fromEntries(
  Object.entries(iconMap).map(([k, v]) => [normalizeLabel(k), v])
);

const compactIconMap = Object.fromEntries(
  Object.entries(normalizedIconMap).map(([k, v]) => [compactLabel(k), v])
);

function resolveIconClass(rawLabel) {
  const label = normalizeLabel(rawLabel);
  const compact = compactLabel(label);

  if (normalizedIconMap[label]) return normalizedIconMap[label];
  if (compactIconMap[compact]) return compactIconMap[compact];

  const labelNoParens = label.replace(/\([^)]*\)/g, "").trim();
  if (normalizedIconMap[labelNoParens]) return normalizedIconMap[labelNoParens];

  const prefix = labelNoParens.includes(":")
    ? labelNoParens.split(":", 1)[0].trim()
    : "";
  if (prefix && prefixIconMap[prefix]) return prefixIconMap[prefix];

  for (const rule of keywordRules) {
    if (rule.regex.test(label)) return rule.icon;
  }

  // Never leave a section/parameter unlabeled.
  return ICONS.gears;
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("label").forEach((label) => {
    const iconClass = resolveIconClass(label.textContent || "");
    const icon = document.createElement("i");
    icon.className = iconClass;

    label.style.color = "green";
    label.style.fontWeight = "bold";
    label.style.fontSize = "1.1rem";
    icon.style.color = "green";
    icon.style.fontWeight = "bold";
    icon.style.fontSize = "1.3rem";

    label.prepend(icon);
  });
});
