var fObj = null;
var fObjMob = null;
var bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
var addCnt = "M3";
var maxFileSize = "5";
var fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';
var fileType = "normal";
$(document).ready(function() {
	fn_init();

	$("#btn_insert").click(function() {
		if (fn_isValid()) {
			if(confirm("저장하시겠습니까?")){
				fn_modifyNotice("I");
			}
		}
	});
	$("#btn_insertMob").click(function() {
		if (fn_isValidMob()) {
			if(confirm("저장하시겠습니까?")){
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
	$("#btn_delete").click(function() {
		if (confirm("삭제하시겠습니까?")) {
			fn_modifyNotice("D");
		}
	});
	$("#btn_deleteMob").click(function() {
		if (confirm("삭제하시겠습니까?")) {
			fn_modifyMobNotice("D");
		}
	});

	$("#boardMngType, #boardMngTypeMob").change(function(){
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
		} else {
			$(".nsSeCodeSpan").hide();
			$(".inSeCodeSpan").hide();
		}
//		fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
//		fObj.init();
//		fObjMob = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#atchFileDivMob"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
//		fObjMob.init();
//		$(".f1Txt").html(fileTxt);
		
	});
	//promoTr
//	$("input[name='inSeCode']").click(function(){
//		if($(this).val() == "IN03"){
//			$(".promoTr").show();
//			addCnt = "S";
//			maxFileSize = "500";
//			fileTxt = '<p class="if">※ 파일첨부 용량은 500MByte 이하로 제한하고 1개만 등록 가능합니다.</p>';
//			fileType = "video";
//		}else{
//			$(".promoTr").hide();
//			addCnt = "M3";
//			maxFileSize = "5";
//			fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';
//			fileType = "normal";
//		}
//		fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
//		fObj.init();
//		$(".f1Txt").html(fileTxt);
//	});
	
//	$(".inSeCodeMob").click(function(){
//		if($(this).val() == "IN03"){
//			$(".promoTr").show();
//			addCnt = "S";
//			maxFileSize = "500";
//			fileTxt = '<p class="if">※ 파일첨부 용량은 500MByte 이하로 제한하고 1개만 등록 가능합니다.</p>';
//			fileType = "video";
//		}else{
//			$(".promoTr").hide();
//			addCnt = "M3";
//			maxFileSize = "5";
//			fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';
//			fileType = "normal";
//		}
//		fObjMob = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#atchFileDivMob"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
//		fObjMob.init();
//		$(".f1Txt").html(fileTxt);
//	});
});

function fn_init() {
	//파일넘버 초기화
	bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
	
	if($("#crud").val() == 'u') {
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
		$('.inSeCodeMob').eq(0).attr("checked", true);
		$('.nsSeCodeMob').eq(0).attr("checked", true);
	}
	
	// 첨부파일
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:"normal", tmpDel:bFile});
	fObj.init();
	fObjMob = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#atchFileDivMob"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:"normal", tmpDel:bFile});
	fObjMob.init();
	$(".f1Txt").html(fileTxt);
//	if($("#crud").val() == 'u') {
		// 첨부파일목록
		fObj.getFileList($("#atchmnflNo").val(), "FS02");
		fObjMob.getFileList($("#atchmnflNo").val(), "FS02");
//	}
}


function fn_modifyNotice(type) {
	oEditors.getById["cn"].exec("UPDATE_CONTENTS_FIELD",[]);
	$('#atchmnflNo').val(fObj.getatchmnflNo());
	$("#motifyType").val(type);
	var	url = "/myPage/board/notice/motifyNotice.ajax";
	
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
					
				location.href = '/myPage/mng/notice/noticeList.do';
			}
		},
		complete:function(dt){

		},error : function(data) {
			alert("에러가 발생하였습니다.");
		}
	}).submit();
};

function fn_modifyMobNotice(type) {
//	oEditorsMob.getById["cnMob"].exec("UPDATE_CONTENTS_FIELD",[]);
	$('#atchmnflNo').val(fObjMob.getatchmnflNo());
	$("#motifyType").val(type);
	$("#sj").val($("#sjMob").val());
	$("#cn").val($("#cnMob").val());
	$("#boardMngType").val($("#boardMngTypeMob").val());
	
	var	url = "/myPage/board/notice/motifyNotice.ajax";
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
				
				location.href = '/myPage/mng/notice/noticeList.do';
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
	if(!$("#boardMngType option:selected").val()){
		alert("구분을 입력해주세요.");
		return false;
	}
	
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
    if( cn == ""  || cn == null || cn == '&nbsp;' || cn == '<br>')  {
         alert("게시내용을 입력해주세요.");
         oEditors.getById["cn"].exec("FOCUS"); //포커싱
         return false;
    }
    
	//구분 정보공개 - 홍보영상 일경우에만
	var boardMngType = $("#boardMngType").val();
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
	}
	return true;
}

//모바일 유효성검사
function fn_isValidMob() {
	if(!$("#boardMngTypeMob option:selected").val()){
		alert("구분을 입력해주세요.");
		return false;
	}
	
	if(!$.trim($("#sjMob").val())) {
		alert("제목을 입력해주세요.");
		$("#sjMob").focus();
		return false;
	}
	
	/*if(!$("#cnMob").val()) {
	alert("내용을 입력해주세요.");
	$("#cnMob").focus();
	return false;
	}*/

	//스마트에디터 textarea 유효성검사
	oEditorsMob.getById["cnMob"].exec("UPDATE_CONTENTS_FIELD", []);
	var cnMob = $("#cnMob").val();
	if( cnMob == ""  || cnMob == null || cnMob == '&nbsp;' || cnMob == '<p><br></p>')  {
		alert("게시내용을 입력해주세요.");
		oEditors.getById["cnMob"].exec("FOCUS"); //포커싱
		return false;
	}
	
	//구분 정보공개 - 홍보영상 일경우에만
	var boardMngTypeMob = $("#boardMngTypeMob").val();
	var infoOthbcSeCode = $("input[class='inSeCodeMob']:checked").val();
	if(boardMngTypeMob == "I" && infoOthbcSeCode == "IN03"){
		if(!fObjMob.getatchmnflNo()){
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
	}
	return true;
}
