'use strict'


function toggle_profile() {
  let cpu_partition = $('#batch_connect_session_context_cpu_partition');
  let cores = $('#batch_connect_session_context_core_count');
  let num_memory = $('#batch_connect_session_context_num_memory');
  let profile_checkbox = document.getElementById("batch_connect_session_context_profile_checkbox");
if(profile_checkbox.checked === false)  {
   cpu_partition.parent().show();
   cores.parent().show();
   num_memory.parent().show();
  } else {
    cpu_partition.parent().hide();
    cores.parent().hide();
    num_memory.parent().hide();
  }
}


toggle_profile()

let checkbox_trigger = $('#batch_connect_session_context_profile_checkbox');
checkbox_trigger.change(toggle_profile);