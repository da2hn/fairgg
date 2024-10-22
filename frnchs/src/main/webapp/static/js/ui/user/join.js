$(document).ready(function() {
	$("#btn_join").click(function() {
		var form = document.frm_join;
		form.action = "/user/joinUser.do";
		form.submit();
		
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