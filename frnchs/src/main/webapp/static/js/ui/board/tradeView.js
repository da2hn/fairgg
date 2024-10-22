var fObj = null;

$(document).ready(function() {
	fn_init();

	$("#btn_tradeSavePage").click(function() {
		fn_tradeSavePage();
	});

});

function fn_init() {

	//fn_selectTradeView();

}

function fn_selectTradeView() {
	var params = {trdeThingRegistNo:$("#paramTrdeThingRegistNo").val()};
	fnGetAjaxData("/board/trade/selectTrade.ajax", params, function(data) {
		if(data.resultCode == RESULT_SUCCESS){
			$("#trdeThingPhoto").append('<div class="img"><img src="'+contextPath+'/file/downloadFile.do?atchmnflNo='+ data.tradeBbs.atchmnflNo +'&fileSn='+ data.tradeBbs.fileSn +'&fileKey='+ data.tradeBbs.fileKey +'"></div>');

			var keys = Object.keys(data.tradeBbs);
			for (var i in keys){
				$("#"+keys[i]).val(data.tradeBbs[keys[i]]);
			}

			$('input').prop('readonly', true);
			$('textarea').prop('readonly', true);
			$('input').prop('style', 'border:none;text-align:center;');

			// 첨부파일
			/*var bFile = $("#atchmnflNo").val() == "" ? false : true;
			fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:true, addCnt:"M3", filePath:"basic", maxFileSize:"6", fileType:"normal", tmpDel:bFile});
			fObj.init();
			fObj.getFileList($("#atchmnflNo").val(), "FS02");
			*/

		} else {
			alert(data.resultMsg);
		}
	});
}

function fn_tradeSavePage() {
	if($("#ssUserRole").val() != '[ROLE_US01]' && $("#ssUserRole").val() != '') {
		alert('컨설턴트/기관관리자/브랜드 본사 관리자는 \n매물정보 등록 기능을 사용 할 수 없습니다.');
		return;
	} else {
		$("#reqForm").attr("action", '/board/trade/tradeSave.do');
		$("#reqForm").submit();
	}
}

function fn_isValid() {
	if(!$("select[name=fntnSportCnSeCode]").val()) {
		alert("창업지원내용구분을 선택하세요");
		$("input[name=fntnSportCnSeCode]").focus();
		return false;
	}
	if(!$.trim($("input[name=sj]").val())) {
		alert("제목을 입력해주세요.");
		$("input[name=sj]").focus();
		return false;
	}
	if(!$.trim($("textarea[name=cn]").val())) {
		alert("내용을 입력해주세요.");
		$("textarea[name=cn]").focus();
		return false;
	}
	return true;
}
