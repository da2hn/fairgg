<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>경기도 가맹정보제공시스템</title>

		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/ui.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/bootstrap/bootstrap.css"/>">

		<script type="text/javascript" src="<c:url value="/static/js/jquery-1.11.3.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/ui.js"/>"></script>

	</head>

	<body>
		<input type="hidden" name="contextPath" id="contextPath" value="<%=request.getContextPath()%>"/>
		<div id="wrap">
			<img alt="잘못된 접근이거나 요청하신 페이지를 찾을 수 없습니다." src="/static/images/unnamed.png">
		</div>
	</body>
</html>
