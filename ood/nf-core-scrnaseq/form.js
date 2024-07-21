'use strict'


function toggle_profile() {
  let cores = $('#batch_connect_session_context_num_core');
  let num_memory = $('#batch_connect_session_context_num_memory');
  let profile_checkbox = document.getElementById("batch_connect_session_context_profile");
  let executor = document.getElementById("batch_connect_session_context_executor");
  let selected_executor = executor.options[executor.selectedIndex].value;
if(selected_executor === "local")  {
   cores.parent().show();
   num_memory.parent().show();
  } else {
    cores.parent().hide();
    num_memory.parent().hide();
  }
}


toggle_profile()

let select_trigger = $('#batch_connect_session_context_executor');
select_trigger.change(toggle_profile);