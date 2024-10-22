var fObj = null;

$(document).ready(function() {

	fn_init();

	$("#fn_updateReport").click(function() {
		fn_updateReport();
	});
});

function fn_init() {
	// 첨부파일
	var bFile = $("#atchmnflNo").val() == "" ? false : true;
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:true, addCnt:"M3", filePath:"basic", maxFileSize:"5", fileType:"normal", tmpDel:bFile});
	fObj.init();
	fObj.getFileList($("#atchmnflNo").val(), "FS02");

	if($("#answerSttusSeCode").val() =='AN01') {// 답변완료
		//$("#answerCn").attr('readonly','true');
		$("#answerCn").attr('disabled','disabled');
		$("#fn_updateReport").hide();
	}
}

function fn_updateReport() {
	if (fn_isValid()) {
		if (confirm("답변메일을 발송하시겠습니까?")) {
			fnGetAjaxData("/myPage/board/report/updateReport.ajax", "dataForm", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert("답변메일을 발송하였습니다.");

					var frm = $("#dataForm");
					frm.attr("action","/myPage/board/report/reportList.do");
					frm.attr("method","post");
					frm.submit();
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	}
}

function fn_isValid() {
	if(!$("textarea[name=answerCn]").val()) {
		alert("내용을 입력해주세요.");
		$("textarea[name=answerCn]").focus();
		return false;
	}
	return true;
}
