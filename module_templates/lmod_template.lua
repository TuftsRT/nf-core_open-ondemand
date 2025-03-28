help([==[

Description
===========
nf-core is a global community effort to collect a curated set of open‑source analysis pipelines built using Nextflow. More information about nf-core/${PIPELINE} can be found at: https://nf-co.re/${PIPELINE}

More information
================
 - Home page:     https://nf-co.re/${PIPELINE}
]==])

whatis("Pipeline: ${PIPELINE}")
whatis("Version: ${VERSION}")
whatis("Description: nf-core is a global community effort to collect a curated set of open‑source analysis pipelines built using Nextflow. More information about nf-core/${PIPELINE} can be found at: https://nf-co.re/${PIPELINE}")
whatis("Home page:     https://nf-co.re/${PIPELINE}")

-- Load the required modules
depends_on("nextflow")

-- TODO
-- Set Singularity Cache Dir
setenv("NXF_SINGULARITY_CACHEDIR", "/cluster/tufts/biocontainers/nf-core/singularity-images")

-- TODO
-- And assemble container command
local pipeline_path = "/cluster/tufts/biocontainers/nf-core/pipelines/" .. myModuleName() .. "/" .. myModuleVersion() .. "/" .. "${VERSION_}"
local pipeline_launch = "nextflow run " .. pipeline_path

-- Programs to setup in the shell
set_shell_function("${PIPELINE}", pipeline_launch .. " \"$@\"",
                                pipeline_launch .. " $*")
-- Additional commands or environment variables, if any