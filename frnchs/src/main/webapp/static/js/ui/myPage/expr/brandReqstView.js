var fObj1 = null;
var fObj2 = null;
$(document).ready(function() {
	//파일첨부 세팅
	var bImageFileNo = $("#imageFileNo").val() == null ? false : true;
	fObj1 = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv1"), readOnly:true, addCnt:"S", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bImageFileNo});
	fObj1.init();
	m_fObj1 = new fileObj({objId:"m_f1", windowMode:"full", divId:$("#m_atchFileDiv1"), readOnly:true, addCnt:"S", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bImageFileNo});
	m_fObj1.init();
	var bEdcFileNo = $("#edcFileNo").val() == null ? false : true;
	fObj2 = new fileObj({objId:"f2", windowMode:"full", divId:$("#atchFileDiv2"), readOnly:true, addCnt:"S", filePath:"basic", maxFileSize:"6", fileType:"normal", tmpDel:bEdcFileNo});
	fObj2.init();
	m_fObj2 = new fileObj({objId:"m_f2", windowMode:"full", divId:$("#m_atchFileDiv2"), readOnly:true, addCnt:"S", filePath:"basic", maxFileSize:"6", fileType:"normal", tmpDel:bEdcFileNo});
	m_fObj2.init();
	//파일첨부 메세지 세팅
	$(".f1Txt").html("5MByte 이하의 파일만 등록 가능합니다.<br>등록 이미지 크기는 가로 200 pixel / 세로 200 pixel로 올려주세요.");
	$(".f2Txt").html("5MByte 이하의 파일만 등록 가능합니다.");
	//저장된값 바인딩
	fObj1.getFileList($("#imageFileNo").val(), "FS02");
	fObj2.getFileList($("#edcFileNo").val(), "FS02");
	m_fObj1.getFileList($("#imageFileNo").val(), "FS02");
	m_fObj2.getFileList($("#edcFileNo").val(), "FS02");
});
