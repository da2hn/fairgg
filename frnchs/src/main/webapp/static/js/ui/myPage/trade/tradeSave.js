var fObj = null;

$(document).ready(function() {

	fn_init();

	$("#btn_insert").click(function() {
		fn_insertInfo();
	});

});

function fn_init() {

	// 첨부파일
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:false});
	fObj.init();

	// 공통코드 라디오
	$('input:radio[name=sopsrtStleCode]').eq(0).attr("checked", true);//상가형태
	$('input:radio[name=mvnPosblDeCode]').eq(0).attr("checked", true);//입주가능일

	// 입주가능일 직접입력
	$("#mvnPosblDe").datepicker({
		dateFormat: 'yy-mm-dd'
	});
	$('input:radio[name=mvnPosblDeCode]').click(function(){
		if($("#mvnPosblDeCode_3").is(':checked')){
			$("#mvnPosblDe").attr('disabled',false);
		} else {
			$("#mvnPosblDe").attr('disabled',true);
			$("#mvnPosblDe").val('');
		}
	});

}

function calcSm(chk,obj) {// 계약면적, 전용면적  평 = m^2 변환
	var obj = obj;
	var name = obj.name;
	var inVal = $('input[name=' + name + ']').val();
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

function fn_isValid() {
	/*if(!$("select[name=fntnSportCnSeCode]").val()) {
		alert("창업지원내용구분을 선택하세요");
		$("input[name=fntnSportCnSeCode]").focus();
		return false;
	}
	if(!$("input[name=sj]").val()) {
		alert("제목을 입력해주세요.");
		$("input[name=sj]").focus();
		return false;
	}
	if(!$("textarea[name=cn]").val()) {
		alert("내용을 입력해주세요.");
		$("textarea[name=cn]").focus();
		return false;
	}*/

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
		alert("상세주소 입력해주세요.");
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
		alert("관리비을 입력해주세요.");
		$("input[name=managect]").focus();
		return false;
	} else if ('C'==$("input[name=mvnPosblDeCode]").val() && !$("input[name=mvnPosblDe]").val()) {//입주가능일 직접입력일 경우
		alert("입주가능일을 입력해주세요.");
		$("input[name=mvnPosblDe]").focus();
		return false;
	}


	if(!$('input[name="ag1"]:checked').val()||!$('input[name="ag2"]:checked').val()||!$('input[name="ag3"]:checked').val()) {
		alert("동의 사항을 확인하시고 모두 동의해주세요.");
		return false;
	}

	return true;
}
