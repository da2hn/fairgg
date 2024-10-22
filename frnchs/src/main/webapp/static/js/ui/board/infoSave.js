var fObj = null;

$(document).ready(function() {

	fn_init();

	$("#btn_insert").click(function() {
		fn_insertInfo();
	});

});

function fn_init() {

	// 첨부파일
	var bFile = $("#atchmnflNo").val() == "" ? false : true;
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M3", filePath:"basic", maxFileSize:"5", fileType:"normal", tmpDel:bFile});
	fObj.init();

	if($("#crud").val() == 'u') {
		$("#fntnSportCnSeCode").val($("#fntnSportCnSeCodeVal").val());
		$("input[type=radio][value="+ $("#othbcAtVal").val() +"]").prop("checked", true);
		//$("[name=othbcAt]:not(:checked)").attr('disabled', 'disabled');
		$("#answerCn").attr('readonly', true);

		// 첨부파일목록
		fObj.getFileList($("#atchmnflNo").val(), "FS02");

		} else {
		$(".mReply1").hide();
	}

}

function fn_insertInfo() {
	if (fn_isValid()) {
		// 첨부파일
		$('#atchmnflNo').val(fObj.getatchmnflNo());

		var url = "/board/info/insertInfo.ajax";
		if($("#crud").val() == 'u') {
			url = "/board/info/updateInfo.ajax";
		}
		fnGetAjaxData(url, "dataForm", function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert("게시글이 등록되었습니다.");

				if (fObj != null) {
					// 첨부파일 업로드 완료 처리
					fObj.updateComplete();
					fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
				}

				var dataForm = $("#dataForm");
				dataForm.attr("action","/board/info/infoList.do");
				dataForm.attr("method","post");
				dataForm.submit();
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}

function fn_isValid() {
	if(!$("select[name=fntnSportCnSeCode]").val()) {
		alert("창업지원내용구분을 선택하세요");
		$("input[name=fntnSportCnSeCode]").focus();
		return false;
	}
	if(!$.trim($("input[name=sj]").val())) {
		alert("제목을 입력해주세요.");
		$("input[name=sj]").focus();
		return false;
	}
	if(!$.trim($("textarea[name=cn]").val())) {
		alert("내용을 입력해주세요.");
		$("textarea[name=cn]").focus();
		return false;
	}
	return true;
}
