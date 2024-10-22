$(document).ready(function() {
	$("#btn_test").click(function() {
		fn_search();
	});
});

function fn_search() {
	
	var params = {};
	params["codeId"]  = $("#codeId").val();
	
	fnGetAjaxData("/sample/selectCode.do", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			var resultJsonStr = JSON.stringify(_data.codeList);
			$("#result").val(resultJsonStr);
		} else {
			alert(_data.resultMsg);
		}		
	});	
}