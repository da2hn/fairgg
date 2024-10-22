<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
		<title>경기도 가맹점</title>


		<!-- 20200820추가 -->
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/sysMngr/jquery-ui.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.css"/>" />
		<%-- <link rel="stylesheet" type="text/css" href="<c:url value="/static/css/sysMngr/ui.css"/>"> --%>
<%-- 		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/bootstrap/bootstrap.css"/>"> --%>
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/sysMngr/system_ui.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/sysMngr/system_style.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/style_dark.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/style_dark2.css"/>">
		<link rel="stylesheet" type="text/css" media="screen and (max-width:750px)" href="<c:url value="/static/css/sysMngr/system_style_mo.css"/>">
		<link rel="stylesheet" type="text/css" media="screen and (max-width:750px)" href="<c:url value="/static/css/style_dark_mo.css"/>">
		<link rel="stylesheet" type="text/css" media="screen and (max-width:750px)" href="<c:url value="/static/css/style_dark_mo2.css"/>">
		
		
		<script type="text/javascript" src="<c:url value="/static/js/jquery-3.2.1.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery-ui.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"/>"></script>
		<%-- <script type="text/javascript" src="<c:url value="/static/js/sysMngr/ui.js"/>"></script> --%>

		<script type="text/javascript" src="<c:url value="/static/js/cmmn/common.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/constants.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/js/jquery.form.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery-ui/jquery.blockUI.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/sysMngr/system_ui.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/sysMngr/system_script.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/monthpicker.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/file.js"/>"></script>
		
		<tiles:insertAttribute name="analitics" /><!-- script -->
	</head>

	<body>
		<input type="hidden" name="contextPath" id="contextPath" value="<%=request.getContextPath()%>"/>
		<input type="hidden" name="currMenuId" id="currMenuId" value="${currMenuId}"/>
		<div id="wrap">
			<tiles:insertAttribute name="header" /><!-- header -->

			<div id="body">
				<tiles:insertAttribute name="left" /><!-- left menu -->
				<tiles:insertAttribute name="body" /><!-- content -->
			</div>
		</div>
	</body>

	<tiles:insertAttribute name="footer" /><!-- footer -->
</html>

