var fObj = null;
var mfObj = null;

$(document).ready(function() {

	fn_init();

}); 

function fn_init() {

	// 첨부파일
	var bFile = $("#atchmnflNo").val() == "" ? false : true;
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:true, addCnt:"M3", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bFile});
	fObj.init();
	fObj.getFileList($("#atchmnflNo").val(), "FS02");
	
	m_fObj = new fileObjMobInqry({objId:"f1", windowMode:"full", divId:$("#atchFileDivMob"), readOnly:true, addCnt:"M3", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bFile});
//	m_fObj.init();
	m_fObj.getFileList($("#atchmnflNo").val(), "FS02");


}

function fn_integView(obj) {
	$("#crud").val('r');
	$("#sn").val(obj);
	$("#reqForm").attr("action", '/board/integ/integView.do');
	$("#reqForm").submit();
}

