help([==[

Description
===========
nf-core is a global community effort to collect a curated set of open‑source analysis pipelines built using Nextflow. More information about nf-core/pangenome can be found at: https://nf-co.re/pangenome

More information
================
 - Home page:     https://nf-co.re/pangenome
]==])

whatis("Pipeline: pangenome")
whatis("Version: 1.1.2")
whatis("Description: nf-core is a global community effort to collect a curated set of open‑source analysis pipelines built using Nextflow. More information about nf-core/pangenome can be found at: https://nf-co.re/pangenome")
whatis("Home page:     https://nf-co.re/pangenome")

-- Load the required modules
depends_on("nextflow")

-- Set Singularity Cache Dir
setenv("NXF_SINGULARITY_CACHEDIR", "/cluster/tufts/biocontainers/nf-core/singularity-images")

-- And assemble container command
local pipeline_path = "/cluster/tufts/biocontainers/nf-core/pipelines/" .. myModuleName() .. "/" .. myModuleVersion() .. "/" .. "1_1_2"
local pipeline_launch = "nextflow run " .. pipeline_path

-- Programs to setup in the shell
set_shell_function("pangenome", pipeline_launch .. " \"$@\"",
                                pipeline_launch .. " $*")
-- Additional commands or environment variables, if any
