'use strict'


/*
 * Morgan is well aware that this is some ugly JS but its in production...working...so he is going to let it stay this way...

 code references lovingly stolen from https://github.com/OSC/bc_osc_ansys_workbench/blob/master/form.js

 * */

function toggle_umi() {
  let umitools_extract_method = $('#batch_connect_session_context_umitools_extract_method');
  let umitools_bc_pattern = $('#batch_connect_session_context_umitools_bc_pattern');
  let umitools_bc_pattern2 = $('#batch_connect_session_context_umitools_bc_pattern2');
  let umi_discard_read = $('#batch_connect_session_context_umi_discard_read');
  let umitools_umi_separator = $('#batch_connect_session_context_umitools_umi_separator');
  let umitools_grouping_method = $('#batch_connect_session_context_umitools_grouping_method');
  let umitools_dedup_stats = $('#batch_connect_session_context_umitools_dedup_stats');
  let with_umi= document.getElementById("batch_connect_session_context_with_umi");
  let selectedValue = with_umi.options[with_umi.selectedIndex].value;
  if(selectedValue === "true")  {
   umitools_extract_method.parent().show();
   umitools_bc_pattern.parent().show();
   umitools_bc_pattern2.parent().show();
   umi_discard_read.parent().show();
   umitools_umi_separator.parent().show();
   umitools_grouping_method.parent().show();
   umitools_dedup_stats.parent().show();
  } else {
   umitools_extract_method.parent().hide();
   umitools_bc_pattern.parent().hide();
   umitools_bc_pattern2.parent().hide();
   umi_discard_read.parent().hide();
   umitools_umi_separator.parent().hide();
   umitools_grouping_method.parent().hide();
   umitools_dedup_stats.parent().hide();
  }
}


toggle_umi()

let checkbox_trigger = $('#batch_connect_session_context_with_umi');
checkbox_trigger.change(toggle_umi);

