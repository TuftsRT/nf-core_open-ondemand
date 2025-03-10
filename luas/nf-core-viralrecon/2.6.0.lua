help([==[

Description
===========
nf-core is a global community effort to collect a curated set of open‑source analysis pipelines built using Nextflow. More information about nf-core/viralrecon can be found at: https://nf-co.re/viralrecon

More information
================
 - Home page:     https://nf-co.re/viralrecon
]==])

whatis("Pipeline: viralrecon")
whatis("Version: 2.6.0")
whatis("Description: nf-core is a global community effort to collect a curated set of open‑source analysis pipelines built using Nextflow. More information about nf-core/viralrecon can be found at: https://nf-co.re/viralrecon")
whatis("Home page:     https://nf-co.re/viralrecon")

-- Load the required modules
depends_on("nextflow")

-- Set Singularity Cache Dir
setenv("NXF_SINGULARITY_CACHEDIR", "/cluster/tufts/biocontainers/nf-core/singularity-images")

-- And assemble container command
local pipeline_path = "/cluster/tufts/biocontainers/nf-core/pipelines/" .. myModuleName() .. "/" .. myModuleVersion() .. "/" .. "2_6_0"
local pipeline_launch = "nextflow run " .. pipeline_path

-- Programs to setup in the shell
set_shell_function("viralrecon", pipeline_launch .. " \"$@\"",
                                pipeline_launch .. " $*")
-- Additional commands or environment variables, if any
