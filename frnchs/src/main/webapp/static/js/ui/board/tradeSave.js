var fObj = null;
var m_fObj = null;

$(document).ready(function() {

	fn_init();

	$("#btn_insert").click(function() {
		fn_insertInfo();
	});
	
	$("#btn_insertMob").click(function() {
		fn_insertInfoMob();
	});

});

function fn_init() {

	// 첨부파일
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:false});
	fObj.init();
	
	m_fObj = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#mAtchFileDiv"), readOnly:false, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:false});
	m_fObj.init();
	
	// 공통코드 라디오
	$('input:radio[name=sopsrtStleCode]').eq(0).attr("checked", true);//상가형태
	$('input:radio[name=sopsrtStleCodeMob]').eq(0).attr("checked", true);//상가형태
	$('input:radio[name=mvnPosblDeCode]').eq(0).attr("checked", true);//입주가능일
	$('input:radio[name=mvnPosblDeCodeMob]').eq(0).attr("checked", true);//입주가능일

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

function calcSm(chk,obj) {// 계약면적, 전용면적  평 = m^2 변환
	var obj = obj;
	var name = obj.name;
	var inVal = $('input[name=' + name + ']').val();
	if (inVal == '') inVal = 0;
	if (chk == 1) { //평 입력
		var smName = obj.name + 'Sm';
		$('input[name=' + smName + ']').val((parseFloat(inVal) * 3.3058).toFixed(2));
	} else {//제곱미터 입력
		var pyName = name.slice(0,-2);
		$('input[name=' + pyName + ']').val((parseFloat(inVal) / 3.3058).toFixed(2));
	}
}

function fn_insertInfo() {
	if (fn_isValid()) {
		if(confirm('등록하시겠습니까?')){
			$('#atchmnflNo').val(fObj.getatchmnflNo());//첨부파일

			var url = "/board/trade/insertTrade.ajax";

			fnGetAjaxData(url, "dataForm", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert("등록되었습니다.");

					if (fObj != null) {
						// 첨부파일 업로드 완료 처리
						fObj.updateComplete();
						fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
					}

					var dataForm = $("#dataForm");
					dataForm.attr("action","/board/trade/tradeList.do");
					dataForm.attr("method","post");
					dataForm.submit();
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	}
}
function fn_insertInfoMob() {
	if (fn_isValidMob()) {
		if(confirm('등록하시겠습니까?')){
			$('#atchmnflNo').val(m_fObj.getatchmnflNo());//첨부파일
//			console.log(m_fObj.getatchmnflNo())
/*			$("#sj").val($("#sjMob").val());
			$("#detailDc").val($("#detailDcMob").val());
			$("#chargerNm").val($("#chargerNmMob").val());
			$("#telno").val($("#telnoMob").val());
			$("#zipNo").val($("#zipMob").val());
			$("#competYear").val($("#competYearMob").val());
			$("#remdelngYear").val($("#remdelngYearMob").val());
			$("#addrDetail").val($("#detailAdresMob").val());
			$("#floorCo").val($("#floorCoMob").val());
			$("#buldFloorCo").val($("#buldFloorCoMob").val());
			$("#cntrctAr").val($("#cntrctArMob").val());
			$("#dvrAr").val($("#dvrArMob").val());
			$("#gtn").val($("#gtnMob").val());
			$("#mtRntchrg").val($("#mtRntchrgMob").val());
			$("#premum").val($("#premumMob").val());
			$("#managect").val($("#managectMob").val());
			$("#heatKndCode").val($("#heatKndCodeMob").val());
			$("#toiletSeCode").val($("#toiletSeCodeMob").val());*/
			
			$("#sjForm").val($("#sjMob").val());
			$("#detailDcForm").val($("#detailDcMob").val());
			$("#chargerNmForm").val($("#chargerNmMob").val());
			$("#telnoForm").val($("#telnoMob").val());
			$("#zipNoForm").val($("#zipMob").val());
			$("#roadAddrPart1Form").val($("#bassAdresMob").val());
			$("#addrDetailForm").val($("#detailAdresMob").val());
			$("#competYearForm").val($("#competYearMob").val());
			$("#remdelngYearForm").val($("#remdelngYearMob").val());
			$("#sopsrtStleCodeForm").val($("input[name='sopsrtStleCodeMob']").val());
			$("#parkngAtForm").val($("input:radio[name='parkngAtMob']:checked").val());
			$("#elvtrAtForm").val($("input:radio[name='elvtrAtMob']:checked").val());
			$("#floorCoForm").val($("#floorCoMob").val());
			$("#buldFloorCoForm").val($("#buldFloorCoMob").val());
			$("#cntrctArForm").val($("#cntrctArMob").val());
			$("#dvrArForm").val($("#dvrArMob").val());
			$("#gtnForm").val($("#gtnMob").val());
			$("#mtRntchrgForm").val($("#mtRntchrgMob").val());
			$("#premumForm").val($("#premumMob").val());
			$("#managectForm").val($("#managectMob").val());
			$("#heatKndCodeForm").val($("#heatKndCodeMob").val());
			$("#toiletSeCodeForm").val($("#toiletSeCodeMob").val());
			$("#mvnPosblDeCodeForm").val($("input[name='mvnPosblDeCodeMob']").val());
			$("#mvnPosblDeForm").val($("input[name='mvnPosblDeMob']").val() == "" ? null : $("input[name='mvnPosblDeMob']").val());
			
			var url = "/board/trade/insertTrade.ajax";
			
			fnGetAjaxData(url, "dataFormMob", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert("등록되었습니다.");
					
					if (m_fObj != null) {
						// 첨부파일 업로드 완료 처리
						m_fObj.updateComplete();
						m_fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
					}
					
					var dataForm = $("#dataFormMob");
					dataForm.attr("action","/board/trade/tradeList.do");
					dataForm.attr("method","post");
					dataForm.submit();
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
	} else if (!$("input[name=zipNo]").val()) {
		alert("우편번호를 입력해주세요.");
		$("input[name=zipNo]").focus();
		return false;
	} else if (!$("input[name=addrDetail]").val()) {
		alert("상세주소를 입력해주세요.");
		$("input[name=addrDetail]").focus();
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
	} else if ('MV03'==$("input[name=mvnPosblDeCode]").val() && !$("input[name=mvnPosblDe]").val()) {//입주가능일 직접입력일 경우
		alert("입주가능일을 입력해주세요.");
		$("input[name=mvnPosblDe]").focus();
		return false;
	} else if (!$("input[name=atchmnflNo]").val()) {
		alert("매물사진을 추가해주세요.");
		$("#atchFileNm_f1").focus();
		return false;
	}


	if(!$('input[name="ag1"]:checked').val()||!$('input[name="ag2"]:checked').val()||!$('input[name="ag3"]:checked').val()) {
		alert("동의 사항을 확인하시고 모두 동의해주세요.");
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
		$("input[name=zipNoMob]").focus();
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
	} else if ('MV03'==$("input[name=mvnPosblDeCodeMob]").val() && !$("input[name=mvnPosblDeMob]").val()) {//입주가능일 직접입력일 경우
		alert("입주가능일을 입력해주세요.");
		$("input[name=mvnPosblDeMob]").focus();
		return false;
	} else if (!$("#atchmnflNoMob_f2").val()) {
		alert("매물사진을 추가해주세요.");
		$("#atchFileNmMob_f2").focus();
		return false;
	}
	
	
	if(!$('input[name="ag1Mob"]:checked').val()||!$('input[name="ag2Mob"]:checked').val()||!$('input[name="ag3Mob"]:checked').val()) {
		alert("동의 사항을 확인하시고 모두 동의해주세요.");
		return false;
	}
	
	return true;
}

function fn_maxLengthCheck(object){
    if (object.value.length > object.maxLength){
      object.value = object.value.slice(0, object.maxLength);
    }
 }
