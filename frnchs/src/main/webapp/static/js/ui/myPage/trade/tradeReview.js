var fObj = null;
var fObjMob = null;

$(document).ready(function() {

	fn_init();

	$("#btn_apprChked").click(function() {
		fn_updateSttus('apprChked');
	});

	$("#btn_apprReturn").click(function() {
		fn_updateSttus('apprReturn');
	});

	$("#btn_list").click(function() {
		fn_srcPathList();
	});
	
	$("#btn_apprChkedMob").click(function() {
		fn_updateSttus('apprChked');
	});
	
	$("#btn_apprReturnMob").click(function() {
		fn_updateSttus('apprReturn');
	});
	
	$("#btn_listMob").click(function() {
		fn_srcPathList();
	});
	
	$("#btn_update").click(function() {
		fn_updateInfo();
	});
	$("#btn_updateMob").click(function() {
		fn_updateInfoMob();
	});
	
	
	
});

function fn_init() {

	fn_selectTradeReview();
	
	// 입주가능일 직접입력
	$("#mvnPosblDe").datepicker({
		dateFormat: 'yy-mm-dd'
	});
	
	$("#mvnPosblDeMob").datepicker({
		dateFormat: 'yy-mm-dd'
	});
	
	$('input:radio[name=mvnPosblDeCode]').click(function(){
		if($("#mvnPosblDeCode_MV03").is(':checked')){
			$("#mvnPosblDe").attr('disabled',false);
		} else {
			$("#mvnPosblDe").attr('disabled',true);
			$("#mvnPosblDe").val('');
		}
	});
	
	$('input:radio[name=mvnPosblDeCodeMob]').click(function(){
		if($("#mvnPosblDeCodeMob_MV03").is(':checked')){
			$("#mvnPosblDeMob").attr('disabled',false);
		} else {
			$("#mvnPosblDeMob").attr('disabled',true);
			$("#mvnPosblDeMob").val('');
		}
	});
}

function fn_selectTradeReview() {
	fnGetAjaxData("/myPage/board/trade/selectTrade.ajax", "dataForm", function(data) {
		if(data.resultCode == RESULT_SUCCESS){
			var keys = Object.keys(data.tradeBbs);
			for (var i in keys){
				if(keys[i] == 'sopsrtStleCode'
				|| keys[i] == 'parkngAt'
				|| keys[i] == 'elvtrAt'
				|| keys[i] == 'mvnPosblDeCode'
				|| keys[i] == 'parkngAt') {
					$("input:radio[name="+ keys[i] +"]:radio[value="+ data.tradeBbs[keys[i]] +"]").prop('checked', true);
					$("input:radio[name="+ keys[i] +"Mob]:radio[value="+ data.tradeBbs[keys[i]] +"]").prop('checked', true);
				} else if(keys[i] == 'telno') {
					$("#"+keys[i]).val(fnNumberPhoneFormat(data.tradeBbs[keys[i]]));
					$("#"+keys[i] + 'Mob').val(fnNumberPhoneFormat(data.tradeBbs[keys[i]]));
				} else if(keys[i] == 'atchmnflNo') {
					var atchmnflNo = data.tradeBbs[keys[i]];
				} else {
					$("#"+keys[i]).val(data.tradeBbs[keys[i]]);
					$("#"+keys[i]+'Mob').val(data.tradeBbs[keys[i]]);
				}
			}
			if($("#ssUserRole").val() != '[ROLE_US01]'){
				$(".isVisible").css("display", "none");
				$("#heatKndCode").prop("disabled", true);
				$("#toiletSeCode").prop("disabled", true);
			}else{
				$(".isVisible").css("display", "block");
				$("#heatKndCode").prop("disabled", false);
				$("#toiletSeCode").prop("disabled", false);
			}
					
			// 첨부파일
			var bFile = atchmnflNo == null ? false : true;
			fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:false});
			fObjMob = new fileObjMob({objId:"f1", windowMode:"full", divId:$("#atchFileDivMob"), readOnly:false, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:false});
			
			fObj.init();
			fObjMob.init();
			
			fObj.getFileList(atchmnflNo, "FS02");
			fObjMob.getFileList(atchmnflNo, "FS02");
			
			/*if($("#ssUserRole").val() != '[ROLE_US02]' || $("#confmSttusCode").val() != 'CS03') {
				$("#btn_apprChked").hide();//검토완료
				$("#btn_apprReturn").hide();//반려
				
				$("#btn_apprChkedMob").hide();//검토완료
				$("#btn_apprReturnMob").hide();//반려
				
				$('input').prop('disabled', true);
				$('textarea').prop('disabled', true);
				$('option').attr('disabled', true);
			}
			
			if($("#confmSttusCode").val() != 'CS03'){ //신청상태가 아닐경우
				$("#btn_update").hide();//수정
				$("#btn_updateMob").hide();//모바일수정
				
				$('input').prop('disabled', true);
				$('textarea').prop('disabled', true);
				$('option').attr('disabled', true);
			}*/
			
			if($("#confmSttusCode").val() != 'CS03'){ //신청상태가 아닐경우
				$("#btn_apprChked").hide();//검토완료
				$("#btn_apprReturn").hide();//반려
				
				$("#btnChk").hide();
				/*$("#btn_apprChkedMob").hide();//검토완료
				$("#btn_apprReturnMob").hide();//반려
*/				
				
				$("#btn_update").hide();//수정
				$("#btnUpdt").hide();
				/*$("#btn_updateMob").hide();//모바일수정
				*/
				$('input').prop('disabled', true);
				$('textarea').prop('disabled', true);
				$('option').attr('disabled', true);
				$('select').attr('disabled', true);
				
			}
			
			if($("#confmSttusCode").val() == 'CS03'){//신청상태이고 
				if($("#ssUserRole").val() == '[ROLE_US01]') {//일반 사용자인 경우 
					$("#btn_apprChked").hide();//검토완료
					$("#btn_apprReturn").hide();//반려
					
					$("#btnChk").hide();
					/*$("#btn_apprChkedMob").hide();//검토완료
					$("#btn_apprReturnMob").hide();//반려
*/					
					$("#btn_update").show();//수정
					$("#btnUpdt").show();
					/*$("#btn_updateMob").show();//모바일수정
*/					
					$('input').prop('disabled', false);
					$('textarea').prop('disabled', false);
					$('option').attr('disabled', false);
					$("#cnstntAnswer").prop('disabled', true);//컨설턴트 댓글
					$("#cnstntAnswerMob").prop('disabled', true);//컨설턴트 댓글
				}

				if($("#ssUserRole").val() == '[ROLE_US02]') {//컨설턴트인경우 
					$("#btn_apprChked").show();//검토완료
					$("#btn_apprReturn").show();//반려
					
					$("#btnChk").show();
					/*$("#btn_apprChkedMob").show();//검토완료
					$("#btn_apprReturnMob").show();//반려
*/					
					$("#btn_update").hide();//수정
					$("#btnUpdt").hide();
					/*$("#btn_updateMob").hide();//모바일수정
*/					
					$('input').prop('disabled', true);
					$('textarea').prop('disabled', true);
					$('option').attr('disabled', true);
					$('select').attr('disabled', true);
					$("#cnstntAnswer").prop('disabled', false);//컨설턴트 댓글
					$("#cnstntAnswerMob").prop('disabled', false);//컨설턴트 댓글
				}
				
				if($("#ssUserRole").val() == '[ROLE_US04]') {//관리자인경우 
					$("#btn_apprChked").hide();//검토완료
					$("#btn_apprReturn").hide();//반려
					
					$("#btnChk").hide();
					/*$("#btn_apprChkedMob").hide();//검토완료
					$("#btn_apprReturnMob").hide();//반려
*/					
					$("#btn_update").hide();//수정
					$("#btnUpdt").hide();
					/*$("#btn_updateMob").hide();//모바일수정
*/					
					$('input').prop('disabled', true);
					$('textarea').prop('disabled', true);
					$('option').attr('disabled', true);
					$('select').attr('disabled', true);
				}
			}
		} else {
			alert(data.resultMsg);
		}
	});
}


function fn_updateSttus(obj) {

	if (confirm("진행하시겠습니까?")) {
		var regNo = $("#trdeThingRegistNo").val();
		var params = {
				'sttus':obj
				,'trdeThingRegistNo': regNo
		};
		if($("#ssUserRole").val() == '[ROLE_US02]' &&  $("#confmSttusCode").val() == 'CS03'){
			params['cnstntAnswer'] = $("#cnstntAnswer").val() 
		}
		fnGetAjaxData("/myPage/board/trade/updateTradeSttus.ajax", params, function(data) {
			if(data.resultCode == RESULT_SUCCESS){
				alert(data.resultMsg);

				fn_srcPathList();
			} else {
				alert(data.resultMsg);
			}
		});
	}
}

function fn_srcPathList() {
	var srcPath = $("#srcPath").val();
//	document.location.href = '/myPage/trade/exmnt/exmntList.do';
	document.location.href = srcPath;
}

function calcSm(chk,obj) {// 계약면적, 전용면적  평 = m^2 변환
	var obj = obj;
	var name = obj.name;
	var inVal = $('input[name=' + name + ']').val();
	if (inVal == '') inVal = 0;
	if (chk == 1) { //평 입력
		var smName = obj.name + 'Sm';
		var smNameMob = name.replace('Mob','') + 'Sm' + 'Mob';
		$('input[name=' + smName + ']').val((parseFloat(inVal) * 3.3058).toFixed(2));
		$('input[name=' + smNameMob + ']').val((parseFloat(inVal) * 3.3058).toFixed(2));
	} else {//제곱미터 입력
		var pyName = name.slice(0,-2);
		var pyNameMob = name.replace('Mob','').slice(0,-2) + 'Mob';
		$('input[name=' + pyName + ']').val((parseFloat(inVal) / 3.3058).toFixed(2));
		$('input[name=' + pyNameMob + ']').val((parseFloat(inVal) / 3.3058).toFixed(2));
	}
}

function fn_updateInfo() {
	if (fn_isValid()) {
		if(confirm('수정하시겠습니까?')){
			var telno = $("#telno").val();
			$("#telno").val(telno.replace(/\-/g,''));
			$('#dataForm #atchmnflNo').val(fObj.getatchmnflNo());//첨부파일

			var url = "/board/trade/updateTrade.ajax";

			fnGetAjaxData(url, "dataForm", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert("수정되었습니다.");
					if (fObj != null) {
						// 첨부파일 업로드 완료 처리
						fObj.updateComplete();
						fObj.getFileList($("#dataForm input[name='atchmnflNo']").val(), "FS02");
					}
//					var dataForm = $("#dataForm");
//					dataForm.attr("action","/board/trade/tradeList.do");
//					dataForm.attr("method","post");
//					dataForm.submit();
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	}
}

function fn_updateInfoMob() {
	if (fn_isValidMob()) {
		if(confirm('수정하시겠습니까?')){
			var telnoMob = $("#telnoMob").val();
			$("#telnoMob").val(telnoMob.replace(/\-/g,''));
			$('#dataFormMob #atchmnflNo').val(fObjMob.getatchmnflNo());//첨부파일
			
			var url = "/board/trade/updateTradeMob.ajax";
			
			fnGetAjaxData(url, "dataFormMob", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert("수정되었습니다.");
					if (fObjMob != null) {
						// 첨부파일 업로드 완료 처리
						fObjMob.updateComplete();
						fObjMob.getFileList($("#dataFormMob input[name='atchmnflNo']").val(), "FS02");
					}
//					var dataForm = $("#dataFormMob");
//					dataForm.attr("action","/board/trade/tradeList.do");
//					dataForm.attr("method","post");
//					dataForm.submit();
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	}
}

function fn_isValid() {
	if(!$.trim($("input[name=sj]").val())) {
		alert("제목을 입력해주세요.");
		$("input[name=sj]").focus();
		return false;
	} else if (!$("textarea[name=detailDc]").val()) {
		alert("상세설명을 입력해주세요.");
		$("textarea[name=detailDc]").focus();
		return false;
	} else if (!$("input[name=chargerNm]").val()) {
		alert("담당자명을 입력해주세요.");
		$("input[name=chargerNm]").focus();
		return false;
	} else if (!$("input[name=telno]").val()) {
		alert("연락처를 입력해주세요.");
		$("input[name=telno]").focus();
		return false;
	} else if (!$("input[name=zip]").val()) {
		alert("우편번호를 입력해주세요.");
		$("input[name=zip]").focus();
		return false;
	} else if (!$("input[name=detailAdres]").val()) {
		alert("상세주소를 입력해주세요.");
		$("input[name=detailAdres]").focus();
		return false;
	} else if (!$("input[name=floorCo]").val()) {
		alert("해당층을 입력해주세요.");
		$("input[name=floorCo]").focus();
		return false;
	} else if (!$("input[name=buldFloorCo]").val()) {
		alert("건물층을 입력해주세요.");
		$("input[name=buldFloorCo]").focus();
		return false;
	} else if (!$("input[name=cntrctAr]").val()) {
		alert("계약면적을 입력해주세요.");
		$("input[name=cntrctAr]").focus();
		return false;
	} else if (!$("input[name=dvrAr]").val()) {
		alert("전용면적을 입력해주세요.");
		$("input[name=dvrAr]").focus();
		return false;
	} else if (!$("input[name=gtn]").val()) {
		alert("보증금을 입력해주세요.");
		$("input[name=gtn]").focus();
		return false;
	} else if (!$("input[name=mtRntchrg]").val()) {
		alert("월세을 입력해주세요.");
		$("input[name=mtRntchrg]").focus();
		return false;
	} else if (!$("input[name=premum]").val()) {
		alert("권리금을 입력해주세요.");
		$("input[name=premum]").focus();
		return false;
	} else if (!$("input[name=managect]").val()) {
		alert("관리비를 입력해주세요.");
		$("input[name=managect]").focus();
		return false;
	} else if (!$("#heatKndCode").val()) {
		alert("난방종류를 선택해주세요.");
		$("#heatKndCode").focus();
		return false;
	} else if (!$("#toiletSeCode").val()) {
		alert("화장실구분을 선택해주세요.");
		$("#toiletSeCode").focus();
		return false;
	} else if (!$("#dataForm input[name=atchmnflNo]").val()) {
		alert("매물사진을 추가해주세요.");
		$("#dataForm #atchFileNm_f1").focus();
		return false;
	} else if ('MV03'==$("input[name=mvnPosblDeCode]").val() && !$("input[name=mvnPosblDeCodeNm]").val()) {//입주가능일 직접입력일 경우
		alert("입주가능일을 입력해주세요.");
		$("input[name=mvnPosblDeCodeNm]").focus();
		return false;
	}
	return true;
}

function fn_isValidMob() {
	if(!$.trim($("input[name=sjMob]").val())) {
		alert("제목을 입력해주세요.");
		$("input[name=sjMob]").focus();
		return false;
	} else if (!$("textarea[name=detailDcMob]").val()) {
		alert("상세설명을 입력해주세요.");
		$("textarea[name=detailDcMob]").focus();
		return false;
	} else if (!$("input[name=chargerNmMob]").val()) {
		alert("담당자명을 입력해주세요.");
		$("input[name=chargerNmMob]").focus();
		return false;
	} else if (!$("input[name=telnoMob]").val()) {
		alert("연락처를 입력해주세요.");
		$("input[name=telnoMob]").focus();
		return false;
	} else if (!$("input[name=zipMob]").val()) {
		alert("우편번호를 입력해주세요.");
		$("input[name=zipMob]").focus();
		return false;
	} else if (!$("input[name=detailAdresMob]").val()) {
		alert("상세주소를 입력해주세요.");
		$("input[name=detailAdresMob]").focus();
		return false;
	} else if (!$("input[name=floorCoMob]").val()) {
		alert("해당층을 입력해주세요.");
		$("input[name=floorCoMob]").focus();
		return false;
	} else if (!$("input[name=buldFloorCoMob]").val()) {
		alert("건물층을 입력해주세요.");
		$("input[name=buldFloorCoMob]").focus();
		return false;
	} else if (!$("input[name=cntrctArMob]").val()) {
		alert("계약면적을 입력해주세요.");
		$("input[name=cntrctArMob]").focus();
		return false;
	} else if (!$("input[name=dvrArMob]").val()) {
		alert("전용면적을 입력해주세요.");
		$("input[name=dvrArMob]").focus();
		return false;
	} else if (!$("input[name=gtnMob]").val()) {
		alert("보증금을 입력해주세요.");
		$("input[name=gtnMob]").focus();
		return false;
	} else if (!$("input[name=mtRntchrgMob]").val()) {
		alert("월세을 입력해주세요.");
		$("input[name=mtRntchrgMob]").focus();
		return false;
	} else if (!$("input[name=premumMob]").val()) {
		alert("권리금을 입력해주세요.");
		$("input[name=premumMob]").focus();
		return false;
	} else if (!$("input[name=managectMob]").val()) {
		alert("관리비를 입력해주세요.");
		$("input[name=managectMob]").focus();
		return false;
	} else if (!$("#heatKndCodeMob").val()) {
		alert("난방종류를 선택해주세요.");
		$("#heatKndCodeMob").focus();
		return false;
	} else if (!$("#toiletSeCodeMob").val()) {
		alert("화장실구분을 선택해주세요.");
		$("#toiletSeCodeMob").focus();
		return false;
	} else if (!$("#dataFormMob input[name=atchmnflNo]").val()) {
		alert("매물사진을 추가해주세요.");
		$("#dataFormMob #atchFileNm_f1").focus();
		return false;
	} else if ('MV03'==$("input[name=mvnPosblDeCodeMob]").val() && !$("input[name=mvnPosblDeMob]").val()) {//입주가능일 직접입력일 경우
		alert("입주가능일을 입력해주세요.");
		$("input[name=mvnPosblDeMob]").focus();
		return false;
	}
	return true;
}

function fn_maxLengthCheck(object){
    if (object.value.length > object.maxLength){
      object.value = object.value.slice(0, object.maxLength);
    }
 }

