var fObj = null;
var fObjMob = null;
var bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
var maxFileSize = "5";
//var fileTxt = '<p class="if">※ 파일첨부 하나당 5MByte 이하로 제한하고 1개만 등록 가능합니다.</p>';
var fileType = "normal";
var addCnt = "S";

$(document).ready(function() {
	
	fn_init();
	
	$("#btn_apply").click(function(){
		infoRule($("#annymtyTitle").val(), $("#telNo").val(), $("#emailAdres").val(), $("#annymtyQuest").val());
	});

});

function fn_init() {
	//초기화
	bFile = $("#atchmnflNo").val() == "" || $("#atchmnflNo").val() == null ? false : true;
	/*var atchmnflCo = $("#atchmnflCo").val();
	switch (atchmnflCo) {
	case '0':	addCnt = 'S'; break;
	case '1':	addCnt = 'S'; break;
	case '2':	addCnt = 'M2'; break;
	case '3':	addCnt = 'M3'; break;
	default:
		break;
	}*/
	// 첨부파일
	/*if($("#atchmnflNo").val() == 0){
		$("#atchmnflNo").val("");
	}*/
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
	fObjMob = new fileObjMob({objId:"f2", windowMode:"full", divId:$("#mAtchFileDiv"), readOnly:false, addCnt:addCnt, filePath:"basic", maxFileSize:maxFileSize, fileType:fileType, tmpDel:bFile});
	
	fObj.init();
	fObjMob.init();
	fObj.getFileList($("#atchmnflNo").val(), "FS02");
	fObjMob.getFileList($("#atchmnflNo").val(), "FS02");
}


function fn_apply(){
	$("#fnTitle").val($("#annymtyTitle").val());
	$("#fnApplcntNm").val($("#applcntNm").val());
	$("#fnTelNo").val($("#telNo").val());
	$("#fnEmailAdres").val($("#emailAdres").val());
	$("#fnQuest").val($("#annymtyQuest").val());
	
	if(confirm("신청 하시겠습니까?")){
		var pcVal = fObj.getatchmnflNo();
		var moVal = fObjMob.getatchmnflNo();
		
		if(pcVal == '' && moVal == ''){
			$('#atchmnflNo').val(0);
		}else if(pcVal != ''){
			$('#atchmnflNo').val(pcVal);
		}else{
			$('#atchmnflNo').val(moVal);
		}
		$.post('/board/annymty/insertAnnymtyBoard.ajax',$("#reqForm").serialize()
		).done(function(data) {
			if(data.resultCode == 'success'){
				alert("등록성공");
				// 첨부파일 업로드 완료 처리
				fObj.updateComplete();
				fObjMob.updateComplete();
				fObj.getFileList($("input[name='atchmnflNo']").val(), "FS02");
				fObjMob.getFileList($("input[name='atchmnflNo']").val(), "FS02");
				location.href = '/';
			}else{
				alert("등록실패");
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		});
	}
}

//이메일, 전화번호 유효성
function infoRule(annymtyTitle, telNo, eMail, annymtyQuest){
	var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	if(!$.trim(annymtyTitle)){
		alert("제목을 입력해주세요.");
		return;
	}
	
	/*if(!$.trim(applcntNm)){
		alert("신청자명을 입력해주세요.");
		return;
	}else{
		if(applcntNm.length > 30){
			alert("신청자명을 30자 이하로 작성해주세요");
			return false;
		}
	}*/
	
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

	if(annymtyQuest){
		if(annymtyQuest.length > 300){
			alert("제보사항을 300자 이하로 작성해주세요");
			return false;
		}
	}
	fn_apply();
} 