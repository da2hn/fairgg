var fObj = null;

$(document).ready(function() {

	fn_init();

	$("#btn_update").click(function() {
		fn_updateInfo();
	});

	$("#btn_delete").click(function() {
		fn_deleteInfo();
	});

	$("#btn_updateAnswer").click(function() {
		fn_updateInfoAnswer();
	});
});

function fn_init() {

	// 첨부파일
	var bFile = $("#atchmnflNo").val() == "" ? false : true;
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:true, addCnt:"M3", filePath:"basic", maxFileSize:"6", fileType:"normal", tmpDel:bFile});
	fObj.init();
	fObj.getFileList($("#atchmnflNo").val(), "FS02");


	//공개여부
	$("input[type=radio][value="+ $("#othbcAtVal").val() +"]").prop("checked", true);
	$("[name=othbcAt]:not(:checked)").attr('disabled', 'disabled');

	//버튼
	if($("#ssUserRole").val() =='[ROLE_US01]') {
		$("#btn_updateAnswer").hide();//답변등록
	}
	if($("#answerAt").val() == 'y') {
		$("#btn_update").hide();//수정
		$("#btn_delete").hide();//삭제
	}

	//답변
	if($("#answerAt").val() != 'y' && $("#ssUserRole").val() =='[ROLE_US01]') {
		$("#answerArea").hide();
	} else {
		$("#answerArea").show();
		if($("#ssUserRole").val() =='[ROLE_US01]' && $("#ssUserRole").val()) {
			$("#answerCn").attr('readonly','true');
		}
	}
}

function fn_updateInfo() {
	$("#crud").val('u');
	$("#dataForm").attr("action", '/board/info/infoSave.do');
	$("#dataForm").submit();
}

function fn_deleteInfo() {
	if (confirm("게시글을 삭제하시겠습니까?")) {
		fnGetAjaxData("/board/info/deleteInfo.ajax", "dataForm", function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert("게시글이 삭제되었습니다.");

				var frm = $("#dataForm");
				frm.attr("action","/board/info/infoList.do");
				frm.attr("method","post");
				frm.submit();
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}

function fn_updateInfoAnswer() {
	if (confirm("답변을 등록하시겠습니까?")) {
		fnGetAjaxData("/board/info/updateInfoAnswer.ajax", "answerForm", function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert("답변이 등록되었습니다.");

				var frm = $("#dataForm");
				frm.attr("action","/board/info/infoList.do");
				frm.attr("method","post");
				frm.submit();
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
