<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<!-- 20200820추가 -->
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/sysMngr/jquery-ui.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/sysMngr/ui.css"/>">

		<script type="text/javascript" src="<c:url value="/static/js/jquery-3.2.1.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery-ui.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/sysMngr/ui.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/sysMngr/jquery-ui/jquery.blockUI.js"/>"></script>


		<script type="text/javascript" src="<c:url value="/static/js/cmmn/common.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/constants.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/pagination.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/monthpicker.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/file.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/js/jquery.form.js"/>"></script>
<script>

var fObj = null;
$(function(){
	// 첨부파일
	fObj = fileObj.init({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M3", filePath:"basic"});

	fObj.getFileList("23", "FS02");
	//유효성검사
// 	if(fObj.getAtchFileId() == "" || fObj.getAtchFileId() == null){
// 		alert("수정파일을 등록해주세요.");
// 		return;
// 	}
	//입력폼 저장성공후
// 	if (fObj != null) {
// 		//파일 업로드 완료 처리
// 		fObj.updateComplete();
// 	}
});
</script>
<body>

		<div id="atchFileDiv"></div>
</body>
</html>