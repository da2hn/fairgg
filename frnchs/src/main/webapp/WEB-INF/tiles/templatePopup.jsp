<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title><c:out value="${data.sj }" /></title>
	
	<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/ui.css"/>">
<%-- 		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/bootstrap/bootstrap.css"/>"> --%>

		<script type="text/javascript" src="<c:url value="/static/js/jquery-1.11.3.min.js"/>"></script>
<%-- 		<script type="text/javascript" src="<c:url value="/static/js/jquery-ui.js"/>"></script> --%>
		<script type="text/javascript" src="<c:url value="/static/js/ui.js"/>"></script>


		<script type="text/javascript" src="<c:url value="/static/js/cmmn/common.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/constants.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/pagination.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/monthpicker.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/file.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/js/jquery.form.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery-ui/jquery.blockUI.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/js/jquery.cookie.min.js"/>"></script><!-- 21.03.08 추가 -->
</head>

<!-- <body style="min-width: 300px;width: 300px !important; height: 200px !important;"> -->
<body class="gPopup2" style="overflow-x:hidden; overflow-y:hidden;">
	<tiles:insertAttribute name="body" />
</body>
</html>