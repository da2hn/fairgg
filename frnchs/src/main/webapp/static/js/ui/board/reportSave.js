var fObj = null;
var maxTxtLmit = 50;

$(document).ready(function() {
	// 첨부파일
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M3", filePath:"basic", maxFileSize:"5", fileType:"normal", tmpDel:false});
	fObj.init();

	$('textarea[name=cn]').keyup(function() {
        // 텍스트영역의 길이를 체크
        var textLength = $(this).val().length;

     // 입력된 텍스트 길이를 #textCount 에 업데이트 해줌
        $('.mCount1 em').text(textLength);

        // 제한된 길이보다 입력된 길이가 큰 경우 제한 길이만큼만 자르고 텍스트영역에 넣음
        if (textLength > maxTxtLmit) {
            $(this).val($(this).val().substr(0, maxTxtLmit));
        }
    });
});



function fnSave(){
	var sttemntIemSeCode = $(":input:radio[name=sttemntIemSeCode]:checked").val();
	var colctAgreAt = $(":input:radio[name=colctAgreAt]:checked").val();
	var sj = $("#sj").val();
	var cn = $("#cn").val();
	var wrterNm = $("#wrterNm").val();
	var mailFront = $("#mailFront").val();
	var mailBack = $("#mailBack").val();
	var wrterEmailAdres = mailFront+'@'+mailBack;
	var atchmnflNo_f1 = $("#atchmnflNo_f1").val();

	if(!wrterNm){
		alert("문의자명을 입력해주세요.");
		return;
	}
	if(!mailFront){
		alert("메일을 입력해주세요.");
		return;
	}
	if(!mailBack){
		alert("메일 도메인을 입력해주세요.");
		return;
	}
	if(!sj){
		alert("제보제목을 입력해주세요.");
		return;
	}

	if(!cn){
		alert("제보내용을 입력해주세요.");
		return;
	}

	if(colctAgreAt != "Y"){
		alert("고객정보 수집동의 동의선택을 해주세요.");
		return;
	}

	var params = {};
	params["sttemntIemSeCode"]  = sttemntIemSeCode;
	params["sj"]  = sj;
	params["cn"]  = cn;
	params["atchmnflNo_f1"]  = atchmnflNo_f1;
	params["colctAgreAt"]  = colctAgreAt;
	params["wrterNm"]  = wrterNm;
	params["wrterEmailAdres"]  = wrterEmailAdres;

	fnGetAjaxData("/board/report/insertReport.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			alert("제보작성이 되었습니다.");
			fObj.updateComplete();
			window.location.replace("/");
		} else {
			alert(_data.resultMsg);
		}
	});
}

