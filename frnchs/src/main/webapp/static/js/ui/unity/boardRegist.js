var fObj = null;
var fObjMob = null;
var bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
var maxFileSize = "5";
var fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';
var fileType = "normal";
var addCnt;
$(document).ready(function() {
	fn_init();

	if(!$("#sn").val()){
		$("#btn_update").css("display", "none");
		$("#btn_insert").css("display", "inline-block");
	}else{
		$("#btn_update").css("display", "inline-block");
		$("#btn_insert").css("display", "none");
	}
	
	if($("#atchmnflAt").val()=='N'){
		$("#atchFileBox").parent().parent().css("display", "none");
		$("#atchFileDivMob").parent().parent().css("display", "none");
		/*$("#atchFileTr").css("display", "none");*/
	}else{
		$("#atchFileBox").parent().parent().css("display", "table-row");
		$("#atchFileDivMob").parent().parent().css("display", "block");
		/*$("#atchFileTr").css("display", "table-row");*/
	}
	
	$("#btn_insert").click(function() {
		if (fn_isValid()) {
			if(confirm("등록하시겠습니까?")){
				fn_modifyNotice("I");
			}
		}
	});
	$("#btn_insertMob").click(function() {
		if(fn_isValidMob()) {
			if(confirm("등록하시겠습니까?")){
				fn_modifyMobNotice("I");
			}
		}
	});
	$("#btn_update").click(function() {
		if (fn_isValid()) {
			if(confirm("수정하시겠습니까?")){ // 수정으로 텍스트 수정 - 21.05.06
				fn_modifyNotice("U");
			}
		}
	});
	$("#btn_updateMob").click(function() {
		if (fn_isValidMob()) {
			if(confirm("수정하시겠습니까?")){ 
				fn_modifyMobNotice("U");
			}
		}
	});
	
	/*$("#boardMngType, #boardMngTypeMob").change(function(){
		if($(this).val() == "N"){
			$(".inSeCodeSpan").hide();
			$(".nsSeCodeSpan").show();
			$(".promoTr").hide();//홍보영상 부가정보 등록부분 숨김
			addCnt = "M3";
			maxFileSize = "5";
			fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';
			fileType = "normal";
		}else if($(this).val() == "I"){
			$(".nsSeCodeSpan").hide();
			$(".inSeCodeSpan").show();
		}
		fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
		fObj.init();
		$(".f1Txt").html(fileTxt);
	});*/
	//promoTr
	/*$("input[name='inSeCode']").click(function(){
		if($(this).val() == "IN03"){
			$(".promoTr").show();
			addCnt = "S";
			maxFileSize = "500";
			fileTxt = '<p class="if">※ 파일첨부 용량은 500MByte 이하로 제한하고 1개만 등록 가능합니다.</p>';
			fileType = "video";
		}else{
			$(".promoTr").hide();
			addCnt = "M3";
			maxFileSize = "5";
			fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';
			fileType = "normal";
		}
		fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
		fObj.init();
		$(".f1Txt").html(fileTxt);
	});*/
	
	$("#btn_list").click(function(){
		window.location.href = "/board/list.do?val="+$("#masterSn").val();
	});
	
	$("#btn_listMob").click(function(){
		window.location.href = "/board/list.do?val="+$("#masterSn").val();
	});
	var contentHeaderHTML = "";
	contentHeaderHTML += '<h3><span>'+$("#bbsNm").val()+'</span></h3>';
	contentHeaderHTML += '<p>'+$("#bbsDc").val()+'</p>';
	$(".mKeysub1").html(contentHeaderHTML)
});

function fn_init() {
	//초기화
	bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
	/*if($("#crud").val() == 'u') {
		var updateBoardMngType = $("#updateBoardMngType").val();
		$("#btn_insert").hide();//저장버튼
		$("#btn_insertMob").hide();//저장버튼

		$("#boardMngType").attr("disabled","true");
		$("#boardMngType").val(updateBoardMngType);
		$("#boardMngTypeMob").attr("disabled","true");
		$("#boardMngTypeMob").val(updateBoardMngType);
		//$("input[name='nsSeCode']").attr("disabled","true");
		//$("input[name='inSeCode']").attr("disabled","true");
		if(updateBoardMngType == "N"){
			$(".inSeCodeSpan").hide();
			$(".nsSeCodeSpan").show();
			$("input[type=radio][value="+ $("#seCodeVal").val() +"]").prop("checked", true);
		}else if(updateBoardMngType == "I"){
			$(".nsSeCodeSpan").hide();
			$(".inSeCodeSpan").show();
			$("input[type=radio][value="+ $("#seCodeVal").val() +"]").prop("checked", true);
			if($("input[name='inSeCode']:checked").val() == "IN03"){
				$(".promoTr").show();
				//첨부파일 옵션변경
				addCnt = "S";
				maxFileSize = "500";
				fileTxt = '<p class="if">※ 파일첨부 용량은 500MByte 이하로 제한하고 1개만 등록 가능합니다.</p>';
				fileType = "video";
			}
		}
	} else {
		$("#btn_update").hide();//수정버튼
		$("#btn_updateMob").hide();//모바일 수정버튼
		$("#btn_delete").hide();//삭제버튼
		$("#btn_deleteMob").hide();//모바일 삭제버튼
		$('input:radio[name=nsSeCode]').eq(0).attr("checked", true);
		$('input:radio[name=inSeCode]').eq(0).attr("checked", true);
	}*/
	
	var atchmnflCo = $("#atchmnflCo").val();
	switch (atchmnflCo) {
	case '0':	addCnt = 'S'; break;
	case '1':	addCnt = 'S'; break;
	case '2':	addCnt = 'M2'; break;
	case '3':	addCnt = 'M3'; break;
	default:
		break;
	}
	// 첨부파일
	if($("#atchmnflNo").val() == 0){
		$("#atchmnflNo").val("");
	}
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:"normal", tmpDel:bFile});
	fObjMob = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#atchFileDivMob"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:"normal", tmpDel:bFile});
//	$(".f1Txt").html(fileTxt);
	
	fObj.init();
	fObjMob.init();
//	if($("#crud").val() == 'u') {
		// 첨부파일목록
	fObj.getFileList($("#atchmnflNo").val(), "FS02");
	fObjMob.getFileList($("#atchmnflNo").val(), "FS02");
//	}
}

function fn_modifyNotice(type) {
//	oEditors.getById["cn"].exec("UPDATE_CONTENTS_FIELD",[]);
	$('#atchmnflNo').val(fObj.getatchmnflNo());
	$("#motifyType").val(type);
	var	url = "/board/unity/motifyNotice.ajax";
	
	$("#dataForm").ajaxForm({
		url: url,
		dataType:"json",
		async: "false",
		contentType : 'application/json; charset=UTF-8',
		beforeSend:function(){
		},
		success : function(data, status, request) {
			if(data.resultCode == 'success'){
				alert(data.resultMsg);
				if (fObj != null) {
					// 첨부파일 업로드 완료 처리
					fObj.updateComplete();
					fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
				}
			}
			window.location.href = '/board/list.do?val='+$("#masterSn").val();
		},
		complete:function(dt){
		},error : function(data) {
			alert("에러가 발생하였습니다.");
		}
	}).submit();
	/*
	 * $("#dataForm").attr("action", '/sysMngr/board/listView.do');
	$("#dataForm").submit();*/
};

function fn_modifyMobNotice(type) {
//	oEditorsMob.getById["cnMob"].exec("UPDATE_CONTENTS_FIELD",[]);
	$('#atchmnflNo').val(fObjMob.getatchmnflNo());
	$("#motifyType").val(type);
	$("#sj").val($("#sjMob").val());
	$("#cn").val($("#cnMob").val());
	
	var	url = "/board/unity/motifyNotice.ajax";
	$("#dataForm").ajaxForm({
		url: url,
		dataType:"json",
		async: "false",
		contentType : 'application/json; charset=UTF-8',
		beforeSend:function(){
		},
		success : function(data, status, request) {
			if(data.resultCode == 'success'){
				alert(data.resultMsg);
				if (fObjMob != null) {
					// 첨부파일 업로드 완료 처리
					fObjMob.updateComplete();
					fObjMob.getFileList($("input[name='atchmnflNo']").val(), "FS02");
				}
				window.location.href = '/board/list.do?val='+$("#masterSn").val();
			}
		},
		complete:function(dt){
			
		},error : function(data) {
			alert("에러가 발생하였습니다.");
		}
	}).submit();
};

//유효성검사
function fn_isValid() {
	if(!$.trim($("#sj").val())) {
		alert("제목을 입력해주세요.");
		$("#sj").focus();
		return false;
	}
	
//	if(!$("textarea[name=cn]").val()) {
//		alert("내용을 입력해주세요.");
//		$("textarea[name=cn]").focus();
//		return false;
//	}
	//스마트에디터 textarea 유효성검사
	oEditors.getById["cn"].exec("UPDATE_CONTENTS_FIELD", []);
    var cn = $("#cn").val();
    cn = cn.replace(/&nbsp;/gi,"");
    cn = cn.replace(/<p><br><\/p>/gi,"");
    cn = cn.replace(/ /gi,"");
    if( cn == ""  || cn == null || cn == '<p></p>')  {
         alert("게시내용을 입력해주세요.");
         oEditors.getById["cn"].exec("FOCUS"); //포커싱
         return false;
    }
    
	//구분 정보공개 - 홍보영상 일경우에만
	/*var boardMngType = $("#boardMngType").val();
	var infoOthbcSeCode = $("input[name='inSeCode']:checked").val();
	if(boardMngType == "I" && infoOthbcSeCode == "IN03"){
		if(!fObj.getatchmnflNo()){
			alert("파일을 추가해주세요.");
			return false;
		}
		if(!$("input[name=expsrSn]").val()) {
			alert("순번을 입력해주세요.");
			$("input[name=expsrSn]").focus();
			return false;
		}
		if(!$("input[name=useAt]").val()) {
			alert("사용유무를 선택해주세요.");
			$("input[name=useAt]").focus();
			return false;
		}
	}*/
	return true;
}

//모바일 유효성검사
function fn_isValidMob(){
	if(!$.trim($("#sjMob").val())) {
		alert("제목을 입력해주세요.");
		$("#sjMob").focus();
		return false;
	}

/*	if(!$("#cnMob").val()) {
		alert("게시내용을 입력해주세요.");
		$("#cnMob").focus();
		return false;
	}*/
	
	//스마트에디터 textarea 유효성검사
	oEditorsMob.getById["cnMob"].exec("UPDATE_CONTENTS_FIELD", []);
	var cnMob = $("#cnMob").val();
	cnMob = cnMob.replace(/&nbsp;/gi,"");
	cnMob = cnMob.replace(/<p><br><\/p>/gi,"");
	cnMob = cnMob.replace(/ /gi,"");
	if( cnMob == ""  || cnMob == null || cnMob == '<p></p>')  {
		alert("게시내용을 입력해주세요.");
		oEditorsMob.getById["cnMob"].exec("FOCUS"); //포커싱
		return false;
	}
	
	//구분 정보공개 - 홍보영상 일경우에만
	/*var boardMngTypeMob = $("#boardMngTypeMob").val();
	var infoOthbcSeCode = $("input[name='inSeCode']:checked").val();
	if(boardMngTypeMob == "I" && infoOthbcSeCode == "IN03"){
		if(!fObj.getatchmnflNo()){
			alert("파일을 추가해주세요.");
			return false;
		}
		if(!$("input[name=expsrSnMob]").val()) {
			alert("순번을 입력해주세요.");
			$("input[name=expsrSnMob]").focus();
			return false;
		}
		if(!$("input[name=useAtMob]").val()) {
			alert("사용유무를 선택해주세요.");
			$("input[name=useAtMob]").focus();
			return false;
		}
	}*/
	return true;
}
