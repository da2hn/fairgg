var fObj = null;
var fObjMob = null;
var bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
var addCnt = "M3";
var maxFileSize = "5";
var fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';
var fileType = "normal";
$(document).ready(function() {
	fn_init();

	//최초 실행시
	fn_selectUnitNoticeOption();
	
	
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
			$(".cCodeSpan").hide();
			addCnt = "M3";
			maxFileSize = "5";
			fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 3개만 등록 가능합니다.</p>';
			fileType = "normal";
		}else if($(this).val() == "I"){
			$(".nsSeCodeSpan").hide();
			$(".inSeCodeSpan").show();
			$(".cCodeSpan").hide();
		} else if($(this).val() == "C"){
			$(".inSeCodeSpan").hide();
			$(".nsSeCodeSpan").hide();
			$(".cCodeSpan").show();
		} else {
			$(".nsSeCodeSpan").hide();
			$(".inSeCodeSpan").hide();
			$(".cCodeSpan").hide();
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
	
	$("#unitType").change(function(){
		if($("#boardMngType").val() != 'C'){
			$(".cCodeSpan").attr("style", "display:none;");
		}else{
			$(".nsSeCodeSpan").css("display", "none");
			$(".inSeCodeSpan").attr("style", "display:none;");
		}
		
		if($("#unitType").val() == '12'){
			$(".cCodeSpan").attr("style", "display:none;");
			$("#boardMngType").val("");
			$("#boardMngType").attr("disabled", false);
		}else{
			$(".nsSeCodeSpan").css("display", "none");
			$(".inSeCodeSpan").css("display", "none");
			$("#boardMngType").val("C");
			$("#boardMngType").attr("disabled", true);
			$(".cCodeSpan").attr("style", "display:inline;");
		}
		
		if(!$("#unitType").val()){
			$(".cCodeSpan").attr("style", "display:none;");
		}
	});
	
	$("#unitTypeMob").change(function(){
		if($("#boardMngTypeMob").val() != 'C'){
			$(".cCodeSpan").attr("style", "display:none;");
		}else{
			$(".nsSeCodeSpan").css("display", "none");
			$(".inSeCodeSpan").attr("style", "display:none;");
		}
		
		if($("#unitTypeMob").val() == '12'){
			$(".cCodeSpan").attr("style", "display:none;");
			$("#boardMngTypeMob").val("");
			$("#boardMngTypeMob").attr("disabled", false);
		}else{
			$(".nsSeCodeSpan").css("display", "none");
			$(".inSeCodeSpan").css("display", "none");
			$("#boardMngTypeMob").val("C");
			$("#boardMngTypeMob").attr("disabled", true);
			$(".cCodeSpan").attr("style", "display:inline;");
		}
		
		if(!$("#unitTypeMob").val()){
			$(".cCodeSpan").attr("style", "display:none;");
		}
	});
});

function fn_init() {
	//파일넘버 초기화
	bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
	
	if($("#crud").val() == 'u') {
//		var updateBoardMngType = $("#updateBoardMngType").val();
//		var updateUnitType = $("#updateUnitType").val();
		var updateBoardMngType = $("#seCodeVal").val();
		$("#btn_insert").hide();//저장버튼
		$("#btn_insertMob").hide();//저장버튼
		$("#boardMngType").attr("disabled","true");
		$("#boardMngType").val(updateBoardMngType);
		
//		$("#unitType").val(updateUnitType);
//		$('select[name="options"]').find('option[value="'+ updateUnitType +'"]').attr("selected",true);

		/*$("#boardMngTypeMob").attr("disabled","true");
		$("#boardMngTypeMob").val(updateBoardMngType);*/
		/*$("#unitTypeMob").attr("disabled","true");*/
		/*$("#unitTypeMob").val(updateUnitType);*/
		//$("input[name='nsSeCode']").attr("disabled","true");
		//$("input[name='inSeCode']").attr("disabled","true");
		$("#unitType").attr("disabled", true);
		$("#unitTypeMob").attr("disabled", true);
		$("#boardMngType").val(updateBoardMngType.charAt(0)).prop("selected", true);
		$("#boardMngTypeMob").val(updateBoardMngType.charAt(0)).prop("selected", true);
		$("#boardMngTypeMob").attr("disabled", true);
		if(updateBoardMngType.charAt(0) == "N"){
			$(".inSeCodeSpan").hide();
			$(".nsSeCodeSpan").show();
			$("input[type=radio][value="+ $("#seCodeVal").val() +"]").prop("checked", true);
			$(".cCodeSpan").hide();
		}else if(updateBoardMngType.charAt(0) == "I"){
			$(".nsSeCodeSpan").hide();
			$(".inSeCodeSpan").show();
			$("input[type=radio][value="+ $("#seCodeVal").val() +"]").prop("checked", true);
			$(".cCodeSpan").hide();
			if($("input[name='inSeCode']:checked").val() == "IN03"){
				$(".promoTr").show();
				//첨부파일 옵션변경
				addCnt = "S";
				maxFileSize = "500";
				fileTxt = '<p class="if">※ 파일첨부 용량은 500MByte 이하로 제한하고 1개만 등록 가능합니다.</p>';
				fileType = "video";
			}
		} else if(updateBoardMngType.charAt(0) == "C") {
			$(".inSeCodeSpan").hide();
			$(".nsSeCodeSpan").hide();
			$(".cCodeSpan").show();
			var sj = $("#sj").val();
			var result = sj.substr(sj.indexOf("[")+1,sj.indexOf("]") -1);
			$("#cCodeNm").val(result);
			$("#sj").val(sj.substr(sj.indexOf("]")+1,sj.length));
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

//20220117 추가
function fn_setCustomSeCode(){
	var cCodeNm = $("#cCodeNm").val();
	var sj = $("#sj").val();
	$("#sj").val("[" + cCodeNm + "]" + sj);
};
function fn_setCustomSeCodeMob(){
	var cCodeNm = $(".cCodeNmMob").val();
	var sj = $("#sjMob").val();
	$("#sjMob").val("[" + cCodeNm + "]" + sj);
};

//20220114 추가 
function fn_selectUnitNoticeOption(){
	bAll = typeof bAll !== 'undefined' ? bAll : false ;
	fnGetAjaxData("/myPage/board/selectUnitNoticeOption.ajax", {}, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			for(var i = 0; i < _data.options.length; i++){
				var option = ""; 
				if($("#updateUnitType").val() == _data.options[i].code){
					option = $('<option selected>');
					option.val(_data.options[i].code);
					option.text(_data.options[i].codeNm);
				}else{
					option = $('<option>');
					option.val(_data.options[i].code);
					option.text(_data.options[i].codeNm);
				}
				$("#unitType").append(option);
			}
			
			for(var i = 0; i < _data.options.length; i++){
				var option = ""; 
				if($("#updateUnitType").val() == _data.options[i].code){
					option = $('<option selected>');
					option.val(_data.options[i].code);
					option.text(_data.options[i].codeNm);
				}else{
					option = $('<option>');
					option.val(_data.options[i].code);
					option.text(_data.options[i].codeNm);
				}
				$("#unitTypeMob").append(option);
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}

//20220114 추가 
function fnSetSchCodeList(boardMngType){
	
	boardMngType = typeof boardMngType !== 'undefined' ? boardMngType : $("#boardMngType option:selected").val();
	fn_bindCodeListToSelOption("INTEG_SE_CODE","schCode",true);
	fn_bindCodeListToSelOption("INTEG_SE_CODE","schCodeMob",true);
	
	fn_selectUnitNoticeOption();
}

function fn_modifyNotice(type) {
	if(type == "U"){
		$("#boardMngType").attr("disabled", false);
	}
	oEditors.getById["cn"].exec("UPDATE_CONTENTS_FIELD",[]);
	$('#atchmnflNo').val(fObj.getatchmnflNo());
	$("#motifyType").val(type);
	/*$("#inSeCode").val($("input[name='inSeCodeChk']:checked").val());*/
	
	//등록구분이 직접입력일 경우에만 세팅
	if($("#boardMngType option:selected").val() == "C") {
		fn_setCustomSeCode();
		$("#cCode").val("CS01");
	}
	
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
	
	//등록구분이 직접입력일 경우에만 세팅
	if($("#boardMngTypeMob option:selected").val() == "C") {
		fn_setCustomSeCodeMob();
		$(".cCodeMob").val("CS01");
	}
	
	$("#sj").val($("#sjMob").val());
	$("#cn").val($("#cnMob").val());
	$("#cCode").val($(".cCodeMob").val());
	$("#unitType").val($("#unitTypeMob").val());
	$("#boardMngType").val($("#boardMngTypeMob").val());
	/*$("#inSeCode").val($("input[name='inSeCodeChkMob']:checked").val());*/

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
	
	if(!$("#unitType option:selected").val()){
		alert("게시판구분을 선택해주세요.");
		return false;
	}
	
	if($("#unitType option:selected").val() == '12'){
		if(!$("#boardMngType option:selected").val()){
			alert("등록구분을 선택해주세요.");
			return false;
		}
	}
	
//	if($("#boardMngType option:selected").val() == "C") {
//		if(!$.trim($("#cCodeNm").val())){
//			alert("등록구분을 입력해주세요.");
//			$("#cCodeNm").focus();
//			return false;
//		}
//	}
	
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
	if(!$("#unitTypeMob option:selected").val()){
		alert("게시판구분을 선택해주세요.");
		return false;
	}
	
	if($("#unitTypeMob option:selected").val() == '12'){
		if(!$("#boardMngTypeMob option:selected").val()){
			alert("등록구분을 선택해주세요.");
			return false;
		}
	}
	
	if($("#boardMngTypeMob option:selected").val() == "C") {
		if(!$.trim($(".cCodeNmMob").val())){
			alert("등록구분을 입력해주세요.");
			$(".cCodeNmMob").focus();
			return false;
		}
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
	cnMob = cnMob.replace(/&nbsp;/gi,"");
	cnMob = cnMob.replace(/<p><br><\/p>/gi,"");
	cnMob = cnMob.replace(/ /gi,"");
	if( cnMob == ""  || cnMob == null || cnMob == '<p><\/p>')  {
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
