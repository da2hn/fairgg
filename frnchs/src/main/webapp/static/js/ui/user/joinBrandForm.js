var joinCnt = 0;
var franchLclasList = new Array();
$(document).ready(function() {
	$(document).on("click",'input:checkbox[name="chk"]',function(){
		if($(this).prop('checked')){
			$('input:checkbox[name="chk"]').prop('checked',false);
			$(this).prop('checked',true);
		}
	});
	
	$(document).on("click",'input:checkbox[name="chkM"]',function(){
		if($(this).prop('checked')){
			$('input:checkbox[name="chkM"]').prop('checked',false);
			$(this).prop('checked',true);
		}
	});
	
	$("#header").append("<h3 class='subtitle forMo'>회원가입</h3>");
	$('#footer').css("position","relative");
	$('#footer').css("top","30px");
	//브랜드 담당자 정보 기본1개 생성
	$(fnGetBrandHtml()).insertBefore($(".brandInfoStart"));

	/**
	 * 가입하기
	 */
	$("#btn_join").click(function() {

		if(!$("#mtltyNm").val()){
			alert("상호명은 필수 입력입니다.");
			return;
		}

		if(!$("#atchFile").val() && $('.mFile1').is(':visible')){
			alert("사업자등록증은 필수 입력입니다.");
			return;
		}
 
		if(!$(".frnchsNo > option:selected").val()){
			alert("선택된 업체명이 없습니다.");
			return;
		}

		if($("#emailAdres1").val() && $("#emailAdres2").val()){
			$("#emailAdres").val($("#emailAdres1").val() + "@" + $("#emailAdres2").val());
			if(getEmailChk("emailAdres")){
				return;
			}
		}else{
			alert("이메일은 필수 입력입니다.");
			return;
		}

		if(!$("#chargerNm").val()){
			alert("담당자명은 필수 입력입니다.");
			return;
		}
		if(!$("#telno").val()){
			alert("전화번호는 필수 입력입니다.");
			return;
		}

		if(!$("#userPw").val()){
			alert("비밀번호는 필수 입력입니다.");
			return;
		}

		if($("#userPw").val() != $("#userPwRe").val()){
			alert("비밀번호를 확인해주세요.");
			return;
		}
		
		//이미 가입된 이메일인지 체크
		var params = {};
		params["emailAdres"]  = $("#emailAdres").val();
		fnGetAjaxData("/user/chkEmailAdres.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				var resultCount = _data.resultCount;
				if(resultCount == 0){
					doJoin();
				}else{
					alert("이미 가입되었거나 탈퇴한 이메일 주소입니다. 관리자에게 문의바랍니다."); // 문구변경 - 22.04.22
					return;
				}
			} else {
				alert(_data.resultMsg);
			}
		});
		
	});

	$("#brandPlus").click(function(){
		$(fnGetBrandHtml()).insertBefore($(".brandInfoStart"));
	});

	$("#brandMinus").click(function(){
		var makeCnt = $(".franchLclas").length;
		if(makeCnt > 1){
			$(".brandInfoStart").prev().remove();
			$(".brandInfoStart").prev().remove();
		}else{
			//todo : 문구
			alert("더이상 삭제할수 없습니다.");
			return;
		}
	});
});

/**
 * 대분류 변경시 이벤트
 * @returns
 */
$(document).on("change", ".franchLclas", function(){

	if(!$("#hedofcNo").val()){
		alert("상호명을 선택해주세요.");
		$(this).val("");
		return;
	}

	var targetNum = $(this).attr("id").split("_")[1];
	var params = {};
	params["lclasIndutyCode"]  = $(this).val();
	params["hedofcNo"]  = $("#hedofcNo").val();
	fnGetAjaxData("/fran/selectHedofcNoFrnchsMlsfcList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			var resultList = _data.hedofcNoFrnchsMlsfcList;
			var html = [];
			html.push("<option value=\"\">선택하세요</option>/n");
			for(var i = 0 ; i < resultList.length ; i++){
				var mlsfcIndutyCode = resultList[i].mlsfcIndutyCode;
				var mlsfcIndutyNm = resultList[i].mlsfcIndutyNm;
				html.push("<option value=\""+mlsfcIndutyCode+"\">"+mlsfcIndutyNm+"</option>\n");
			}
			$("#frnchsMlsfc"+"_"+targetNum).html(html.join(""));
			//업체명목록 초기화
			$("#frnchsNo_"+targetNum).html("<option value=\"\">업체명</option>/n");
		} else {
			alert(_data.resultMsg);
		}
	});

});
/**
 * 중분류 변경시 이벤트
 * @returns
 */
$(document).on("change", ".frnchsMlsfc", function(){

	if(!$("#hedofcNo").val()){
		alert("상호명을 선택해주세요.");
		$(this).val("");
		return;
	}
	var targetNum = $(this).attr("id").split("_")[1];
	var params = {};
	params["hedofcNo"]  = $("#hedofcNo").val();
	params["mlsfcIndutyCode"]  = $(this).val();
	fnGetAjaxData("/fran/selectBsnSgnalList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			var resultList = _data.bsnSgnalList;
			var html = [];
			html.push("<option value=\"\">선택하세요</option>/n");
			for(var i = 0 ; i < resultList.length ; i++){
				var frnchsNo = resultList[i].frnchsNo;
				var bsnSgnal = resultList[i].bsnSgnal;
				var usedYn = resultList[i].usedYn;
				if(usedYn == "Y"){
					html.push("<option value=\"used\">"+bsnSgnal+"(사용중)</option>\n");
				}else{
					html.push("<option value=\""+frnchsNo+"\">"+bsnSgnal+"</option>\n");
				}
			}
			$("#frnchsNo_"+targetNum).html(html.join(""));
		} else {
			alert(_data.resultMsg);
		}
	});

});

/**
 * 프랜차이즈명 변경시 이벤트
 * @returns
 */
$(document).on("change", ".frnchsNo", function(){

	if($(this).val() == "used"){
		alert("이미 다른 관리자가 관리중입니다.");
		$(this).val("");
		return;
	}

	var frnchsNoArr = $(".frnchsNo").serializeArrayString().frnchsNo.split(",");
	var frnchsDupChkCnt = 0;
	if(frnchsNoArr.length > 1){
		for(var i = 0 ; i < frnchsNoArr.length ; i++){
//			console.log($(this).val() + " // " + frnchsNoArr[i]);
			if($(this).val() == frnchsNoArr[i]){
				frnchsDupChkCnt++;
			}
		}
	}
	if(frnchsDupChkCnt > 1){
		alert($(this).find('option:selected').text() + " 는 이미 선택되어있습니다.");
		$(this).val("");
	}
});

function fnGetBrandHtml(){
	var makeCnt = $(".franchLclas").length;
	var html = [];
	html.push("<dt>브랜드 명</dt>\n");
	html.push("	<dd>\n");
	html.push("		<div class=\"mFlex2 type2\">\n");
	html.push("			<select class=\"select franchLclas\" title=\"대분류업종\" name=\"franchLclas\" id=\"franchLclas_"+makeCnt+"\">\n");
	html.push("				<option value=\"\">대분류업종</option>\n");
	for(var i = 0 ; i < franchLclasList.length ; i++){
		html.push("<option value=\""+franchLclasList[i].lclasIndutyCode+"\">"+franchLclasList[i].lclasIndutyNm+"</option>")
	}
	html.push("			</select>\n");
	html.push("			<select class=\"select frnchsMlsfc\" title=\"중분류업종\" name=\"frnchsMlsfc\" id=\"frnchsMlsfc_"+makeCnt+"\">\n");
	html.push("				<option value=\"\">중분류업종</option>\n");
	html.push("			</select>\n");
	html.push("			<select class=\"select frnchsNo\" title=\"업체명\" name=\"frnchsNo\" id=\"frnchsNo_"+makeCnt+"\">\n");
	html.push("				<option value=\"\">업체명</option>\n");
	html.push("			</select>\n");
	html.push("		</div>\n");
	html.push("</dd>\n");

	return html.join("");
}
/**
 * 상호명 변경 이벤트
 * @returns
 */
function fnChangeMtltyNm(){
//	console.log("==상호명 변경==");
	var targetNum = $(".franchLclas").length -1;
	var params = {};
	params["hedofcNo"]  = $("#hedofcNo").val();
	fnGetAjaxData("/fran/selectHedofcNoFranchLclasList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			//첨부파일 초기화
			$("#atchFile").val("");
			$("#atchFileNm").val("");
			//이미등록된 파일이 있으면 문구 표시 후 파일업로드 영역 숨김
			if($("#atchmnflNo").val()){
				$(".mFile1").hide();
				$(".fileExists").show();
			}else{
				$(".mFile1").show();
				$(".fileExists").hide();
			}
			var resultList = _data.hedofcNoFranchLclasList;
			//기본 대분류 업종 업데이트
			franchLclasList = resultList;
			//브랜드 명 모두 제거 후 다시 생성
			var makeCnt = $(".franchLclas").length;
			for(var i = 0 ; i < makeCnt ; i++){
				$(".brandInfoStart").prev().remove();
				$(".brandInfoStart").prev().remove();
			}
			$(fnGetBrandHtml()).insertBefore($(".brandInfoStart"));
		} else {
			alert(_data.resultMsg);
		}
	});
}
/**
 * 가입하기
 * @returns
 */
function doJoin(){
	if($('.mFile1').is(':visible')){
		$("#compareFileArea").val("visible");
	}else{
		$("#compareFileArea").val("non");
	}
	$("#frm_join").append("<input type='hidden' name='frnchsNoList' value='"+$(".frnchsNo").serializeArrayString().frnchsNo+"'/>");
	$("#frm_join").ajaxForm({
		url: contextPath+"/user/joinUser.ajax",
		dataType:"json",
		async: "true",
		beforeSend:function(){
		},
		success : function(data, status, request) {
			alert(data.resultMsg);
			if(data.resultCode == 'success'){
				$('#frm_join').ajaxFormUnbind();

				var frm = $("#frm_join");
				frm.attr("action","/user/joinComplete.do");
				frm.attr("method","post");

				frm.submit();
			}
		},
		complete:function(dt){

		},error : function(data) {
			alert("에러가 발생하였습니다.");
		}
	});
	if(joinCnt == 0){
		$("#frm_join").submit();
		joinCnt++;
	}
}

/**
 * 본사찾기 팝업내용 바인드(팝업에서 호출)
 * @returns
 */
function fnBindMtltyNm(returnChkVal){
	if(!$("#hedofcNo").val() || confirm("작성했던 브랜드 명이 초기화 됩니다.\n진행하시겠습니까?")){
		$("#mtltyNm").val(returnChkVal.split("_")[0]);
		$("#mtltyNm").change();
		$("#hedofcNo").val(returnChkVal.split("_")[1]);
		$("#bizrno").val(returnChkVal.split("_")[2]);
		$("#atchmnflNo").val(returnChkVal.split("_")[3]);
		fnChangeMtltyNm();
	}
}
