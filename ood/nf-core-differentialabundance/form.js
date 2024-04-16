'use strict'


/*
 *  * Morgan is well aware that this is some ugly JS but its in production...working...so he is going to let it stay this way...
 *
 *   code references lovingly stolen from https://github.com/OSC/bc_osc_ansys_workbench/blob/master/form.js
 *
 *    * */

function toggle_array() {
  let affy_cel_files_archive = $('#batch_connect_session_context_affy_cel_files_archive');  
  let affy_file_name_col = $('#batch_connect_session_context_affy_file_name_col');
  let affy_background = $('#batch_connect_session_context_affy_background'); 
  let affy_bgversion = $('#batch_connect_session_context_affy_bgversion');
  let affy_destructive = $('#batch_connect_session_context_affy_destructive');
  let affy_cdfname = $('#batch_connect_session_context_affy_cdfname');
  let affy_build_annotation = $('#batch_connect_session_context_affy_build_annotation');
  let affy_rm_mask = $('#batch_connect_session_context_affy_rm_mask');
  let affy_rm_outliers = $('#batch_connect_session_context_affy_rm_outliers');
  let affy_rm_extra = $('#batch_connect_session_context_affy_rm_extra');
  let limma_ndups = $('#batch_connect_session_context_limma_ndups');
  let limma_spacing = $('#batch_connect_session_context_limma_spacing');
  let limma_block = $('#batch_connect_session_context_limma_block');
  let limma_correlation = $('#batch_connect_session_context_limma_correlation');
  let limma_method = $('#batch_connect_session_context_limma_method');
  let limma_proportion = $('#batch_connect_session_context_limma_proportion');
  let limma_trend = $('#batch_connect_session_context_limma_trend');
  let limma_robust = $('#batch_connect_session_context_limma_robust');
  let limma_stdev_coef_lim = $('#batch_connect_session_context_limma_stdev_coef_lim');
  let limma_winsor_tail_p = $('#batch_connect_session_context_limma_winsor_tail_p');
  let limma_lfc = $('#batch_connect_session_context_limma_lfc');
  let limma_confint = $('#batch_connect_session_context_limma_confint');
  let limma_adjust_method = $('#batch_connect_session_context_limma_adjust_method');
  let limma_p_value = $('#batch_connect_session_context_limma_p_value');
  let study_type = document.getElementById("batch_connect_session_context_study_type");
  let selectedValue = study_type.options[study_type.selectedIndex].value;
if(selectedValue === "affy_array")  {
   affy_cel_files_archive.parent().show(); 
   affy_file_name_col.parent().show();
   affy_background.parent().show();
   affy_bgversion.parent().show();
   affy_destructive.parent().show();
   affy_cdfname.parent().show();
   affy_build_annotation.parent().show();
   affy_rm_mask.parent().show();
   affy_rm_outliers.parent().show();
   affy_rm_extra.parent().show();
   limma_ndups.parent().show();
   limma_spacing.parent().show();
   limma_block.parent().show();
   limma_correlation.parent().show();
   limma_method.parent().show();
   limma_proportion.parent().show();
   limma_trend.parent().show();
   limma_robust.parent().show();
   limma_stdev_coef_lim.parent().show();
   limma_winsor_tail_p.parent().show();   
   limma_lfc.parent().show();     
   limma_confint.parent().show();    
   limma_adjust_method.parent().show();   
   limma_p_value.parent().show();   
  } else {
   affy_cel_files_archive.parent().hide();
   affy_file_name_col.parent().hide();
   affy_background.parent().hide();
   affy_bgversion.parent().hide();
   affy_destructive.parent().hide();
   affy_cdfname.parent().hide();
   affy_build_annotation.parent().hide();
   affy_rm_mask.parent().hide();
   affy_rm_outliers.parent().hide();
   affy_rm_extra.parent().hide();
   limma_ndups.parent().hide();
   limma_spacing.parent().hide();
   limma_block.parent().hide();
   limma_correlation.parent().hide();
   limma_method.parent().hide();
   limma_proportion.parent().hide();
   limma_trend.parent().hide();
   limma_robust.parent().hide();
   limma_stdev_coef_lim.parent().hide();
   limma_winsor_tail_p.parent().hide();   
   limma_lfc.parent().hide();  
   limma_confint.parent().hide();
   limma_adjust_method.parent().hide();
   limma_p_value.parent().hide();

  }
}

function toggle_maxquant() {
  let proteus_measurecol_prefix = $('#batch_connect_session_context_proteus_measurecol_prefix');  
  let proteus_norm_function = $('#batch_connect_session_context_proteus_norm_function');
  let proteus_plotsd_method = $('#batch_connect_session_context_proteus_plotsd_method'); 
  let proteus_plotmv_loess = $('#batch_connect_session_context_proteus_plotmv_loess');
  let proteus_palette_name = $('#batch_connect_session_context_proteus_palette_name');
  let proteus_round_digits = $('#batch_connect_session_context_proteus_round_digits');
  let study_type = document.getElementById("batch_connect_session_context_study_type");
  let selectedValue = study_type.options[study_type.selectedIndex].value;
if(selectedValue === "maxquant")  {
   proteus_measurecol_prefix.parent().show(); 
   proteus_norm_function.parent().show();
   proteus_plotsd_method.parent().show();
   proteus_plotmv_loess.parent().show();
   proteus_palette_name.parent().show();
   proteus_round_digits.parent().show(); 
  } else {
   proteus_measurecol_prefix.parent().hide();
   proteus_norm_function.parent().hide();
   proteus_plotsd_method.parent().hide();
   proteus_plotmv_loess.parent().hide();
   proteus_palette_name.parent().hide();
   proteus_round_digits.parent().hide();
  }
}

function toggle_gsea() {
  let gsea_permute = $('#batch_connect_session_context_gsea_permute');
  let gsea_nperm = $('#batch_connect_session_context_gsea_nperm');
  let gsea_scoring_scheme = $('#batch_connect_session_context_gsea_scoring_scheme');
  let gsea_metric = $('#batch_connect_session_context_gsea_metric');
  let gsea_sort = $('#batch_connect_session_context_gsea_sort');
  let gsea_order = $('#batch_connect_session_context_gsea_order');
  let gsea_set_max = $('#batch_connect_session_context_gsea_set_max');
  let gsea_set_min = $('#batch_connect_session_context_gsea_set_min');
  let gsea_norm = $('#batch_connect_session_context_gsea_norm');
  let gsea_rnd_type = $('#batch_connect_session_context_gsea_rnd_type');
  let gsea_make_sets = $('#batch_connect_session_context_gsea_make_sets');
  let gsea_median = $('#batch_connect_session_context_gsea_median');
  let gsea_num = $('#batch_connect_session_context_gsea_num');
  let gsea_plot_top_x = $('#batch_connect_session_context_gsea_plot_top_x');
  let gsea_rnd_seed = $('#batch_connect_session_context_gsea_rnd_seed');
  let gsea_save_rnd_lists = $('#batch_connect_session_context_gsea_save_rnd_lists');
  let gsea_zip_report = $('#batch_connect_session_context_gsea_zip_report');
  let gsea_gene_sets = $('#batch_connect_session_context_gsea_gene_sets');
  let gsea_check = document.getElementById("batch_connect_session_context_gsea_run");
  let selectedValue = gsea_check.options[gsea_check.selectedIndex].value;
if(selectedValue === "true")  {
  gsea_permute.parent().show();
  gsea_nperm.parent().show();
  gsea_scoring_scheme.parent().show();
  gsea_metric.parent().show();
  gsea_sort.parent().show();
  gsea_order.parent().show();
  gsea_set_max.parent().show();
  gsea_set_min.parent().show();
  gsea_norm.parent().show();
  gsea_rnd_type.parent().show();
  gsea_make_sets.parent().show();
  gsea_median.parent().show();
  gsea_num.parent().show();
  gsea_plot_top_x.parent().show();
  gsea_rnd_seed.parent().show();
  gsea_save_rnd_lists.parent().show();
  gsea_zip_report.parent().show();
  gsea_gene_sets.parent().show();
} else {
  gsea_permute.parent().hide();
  gsea_nperm.parent().hide();
  gsea_scoring_scheme.parent().hide();
  gsea_metric.parent().hide();
  gsea_sort.parent().hide();
  gsea_order.parent().hide();
  gsea_set_max.parent().hide();
  gsea_set_min.parent().hide();
  gsea_norm.parent().hide();
  gsea_rnd_type.parent().hide();
  gsea_make_sets.parent().hide();
  gsea_median.parent().hide();
  gsea_num.parent().hide();
  gsea_plot_top_x.parent().hide();
  gsea_rnd_seed.parent().hide();
  gsea_save_rnd_lists.parent().hide();
  gsea_zip_report.parent().hide();
  gsea_gene_sets.parent().hide();
}
}

toggle_array()
toggle_maxquant()
toggle_gsea()
let select_trigger = $('#batch_connect_session_context_study_type');
select_trigger.change(toggle_array);
select_trigger.change(toggle_maxquant);

let gsea_trigger = $('#batch_connect_session_context_gsea_run');
gsea_trigger.change(toggle_gsea);
