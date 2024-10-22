$(document).ready(function() {
	$("#btn_apply").click(function(){
		infoRule($("#brandNm").val(), $("#applcntNm").val(), $("#telNo").val(), $("#emailAdres").val(), $("#brandQuest").val());
	});
	
	$("#labelAgreeAll").on("click", function(){
		$("#labelAgree1_1").prop("checked",$(this).is(":checked"));
		$("#labelAgree2_1").prop("checked",$(this).is(":checked"));
	});

	$("#labelAgree1_1").on("click", function(){
		if($("#labelAgree1_1").prop("checked",$(this).is(":checked"))){
			$("#labelAgreeAll").prop("checked",false);
		}
	});
	
	$("#labelAgree2_1").on("click", function(){
		if($("#labelAgree2_1").prop("checked",$(this).is(":checked"))){
			$("#labelAgreeAll").prop("checked",false);
		}
	});
	
	$(".ldClass").empty();
	$(".ldClass").append('<option value="">- 대분류 -</option>');
	//대분류 조회
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {
		_data.franchLclasList.forEach(function(row,idx){
			if( !~row.lclasIndutyNm.indexOf("전체") ){
				$(".ldClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
		});
	});
	
	//대분류 변경시
	$("#infoLdClass").off("change").on("change",function(e){
		fnChangeLd();
	});
	
	//중분류 변경시
	$("#brandMdClass").off("change").on("change",function(e){
		$("#infoFrcClass").html('');
		$("#infoFrcClass").append('<option value="">- 프랜차이즈 -</option>');		
		
		fnGetSyncAjaxData("/fran/selectBsnSgnalList.ajax", {mlsfcIndutyCode: $("#brandMdClass:visible").val(), hedofcNo:$("#hedofcNo").val()}, function(_data) {
			_data.bsnSgnalList.forEach(function(row,idx){
				$("#infoFrcClass").append('<option value="' + row.frnchsNo + '">' + row.bsnSgnal + '</option>');
			});
		});
	});
	
	$("#infoFrcClass").click(function(){
		if($("#brandMdClass").val()){
			openFrchsPop();
		}
	});

	$("#closePopup, #closeLayer").click(function(){
		$(".mPag").hide();
	});
	
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
});

function fnAgree(){
	if(!$("input:checkbox[id='labelAgree1_1']").is(":checked")){
		alert("개인정보처리방침 동의는 필수 선택입니다.");
		$("#labelAgree1_1").focus();
		return;
	}
	if(!$("input:checkbox[id='labelAgree2_1']").is(":checked")){
		alert("민감정보처리방침 동의는 필수 선택입니다.");
		$("#labelAgree2_1").focus();
		return;
	}

	if($("#head").attr("class") == "active"){
		$("#divComp").val("1");
		$("#mTitle2").text("가맹본부");
		$("#mSubTitle0").text("본사 조회");
		$("#mSubTitle1").text("가맹본부명");
		$("#mSubTitle2").text("가맹본부 주소");
		$(".box_btn").show();
	}else if($("#company").attr("class") == "active"){
		$("#divComp").val("2");
		$("#mSubTitle0").text("프랜차이즈 조회");
		$("#mTitle2").text("가맹거래사");
		$("#mSubTitle1").text("가맹거래사명");
		$("#mSubTitle2").text("가맹거래사 주소");
		$("#frnchsSelect").show();
	}
	
	$('.step0').hide(); 
	$('.step1').show();
	/*return false;*/ //ie 브라우저에서 오류
}

function fnDisagree(){
	if(confirm("교육신청을 취소하고 메인화면으로 이동합니다")){
		location.href = "/";
	}
}

function tabover(name, no) {
	var tabs = $('.tab_' + name + '').find('li, .swiper-slide');

	tabs.each(function(idx) {
		var detail = $('.tabcnt_' + name + idx);
		var link = $(this).find('button, a');

		if (no == idx) {
			detail.addClass('active');
			link.addClass('active');
		} else {
			detail.removeClass('active');
			link.removeClass('active');
		}
	});
}

function fn_apply(){
	$("#fnBrandNm").val($("#brandNm").val());
	$("#fnBrandAdres").val($("#brandAdres").val());
	$("#fnRprsntvNm").val($("#rprsntvNm").val());
	$("#fnApplcntNm").val($("#applcntNm").val());
	$("#fnTelNo").val($("#telNo").val());
	$("#fnEmailAdres").val($("#emailAdres").val());
	$("#fnQuest").val($("#brandQuest").val());
	$("#fnDivComp").val($("#divComp").val());
	
	if(confirm("신청 하시겠습니까?")){
		$.post('/board/infoOpenEdc/insertInfoOpenEdc.ajax',$("#reqForm").serialize()
		).done(function(data) {
			if(data.resultCode == 'success'){
				alert("등록성공");
//				location.reload();
				location.href="/";
			}else{
				alert("등록실패");
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		});
	}
}

//이메일, 전화번호 유효성
function infoRule(brandNm, applcntNm, telNo, eMail, brandQuest){
	var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	if(!$.trim(brandNm)){
		alert("가맹명을 선택해주세요.");
		return;
	}
	
	if(!$.trim(applcntNm)){
		alert("신청자명을 입력해주세요.");
		return;
	}else{
		if(applcntNm.length > 30){
			alert("신청자명을 30자 이하로 작성해주세요");
			return false;
		}
	}
	
	if(!$.trim(telNo)){
		alert("전화번호를 입력해주세요.");
		return;
	}else{
		if(telNo.length < 8 || telNo.length > 11){
			alert("올바른 전화번호를 입력해주세요.");
			return false;
		}
	}
	
	if(eMail){
		if(!emailRule.test(eMail)) {            
			alert("이메일 형식이 잘못되었습니다.")
			return false;
		}	
	}

	if(brandQuest){
		if(brandQuest.length > 300){
			alert("질의사항을 300자 이하로 작성해주세요");
			return false;
		}
	}
	fn_apply();
} 

/**
 * 본사찾기 팝업내용 바인드(팝업에서 호출)
 * @returns
 */
function fnBindMtltyNm(returnChkVal){
	if(!$("#hedofcNo").val() || confirm("작성했던 브랜드 명이 초기화 됩니다.\n진행하시겠습니까?")){
		$("#brandNm").val(returnChkVal.split("_")[0]);
//		$("#brandNm").change();
		$("#brandAdres").val(returnChkVal.split("_")[4]);
		$("#rprsntvNm").val(returnChkVal.split("_")[5]);
	}
}

function fnBindFrnchsNm(returnChkVal){
	if(!$("#hedofcNo").val() || confirm("작성했던 브랜드 명이 초기화 됩니다.\n진행하시겠습니까?")){
		$("#brandNm").val(returnChkVal.split("_")[1]);
//		$("#brandNm").change();
		$("#rprsntvNm").val(returnChkVal.split("_")[2]);
		$("#brandAdres").val(returnChkVal.split("_")[3]);
	}
}

function fnChangeLd(){
	$("#brandMdClass").empty();
	$("#brandMdClass").append('<option value="">- 중분류 -</option>');

	$("#infoFrcClass").html('');
	$("#infoFrcClass").append('<option value="">- 프랜차이즈 -</option>');

	var selectedVal = $('#infoLdClass:visible').val();
	$("#infoLdClass").val(selectedVal);
		fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
			_data.frnchsMlsfcList.forEach(function(row,idx){
				if( !~row.mlsfcIndutyNm.indexOf("전체")){
					$("#brandMdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
				}
			});
		});
}