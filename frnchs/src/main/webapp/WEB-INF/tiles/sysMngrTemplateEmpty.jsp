<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>경기도 가맹점</title>		

		<!-- 20200820추가 -->
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/sysMngr/jquery-ui.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/sysMngr/ui.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/bootstrap/bootstrap.css"/>">
		
		<script type="text/javascript" src="<c:url value="/static/js/jquery-3.2.1.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery-ui.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/sysMngr/ui.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/sysMngr/jquery-ui/jquery.blockUI.js"/>"></script>
		
		
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/common.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/constants.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/pagination.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/monthpicker.js"/>"></script>
	
	</head>
	
	<body>
		<input type="hidden" name="contextPath" id="contextPath" value="<%=request.getContextPath()%>"/>
		<tiles:insertAttribute name="body" /><!-- content -->
	</body>
	<tiles:insertAttribute name="footer" /><!-- footer -->
</html>