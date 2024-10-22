var fObj = null;

$(document).ready(function() {

	fn_init();

});

function fn_init() {

	// 첨부파일
	var bFile = $("#atchmnflNo").val() == "" ? false : true;
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:true, addCnt:"M3", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bFile});
	fObj.init();
	fObj.getFileList($("#atchmnflNo").val(), "FS02");

}

function fn_noticeView(obj) {
	$("#crud").val('r');
	$("#noticeSn").val(obj);
	$("#reqForm").attr("action", '/board/notice/noticeView.do');
	$("#reqForm").submit();
}

