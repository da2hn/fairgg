<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>GIRS 국가온실가스인벤토리시스템</title>
	<link rel="shortcut icon" type="image/x-icon" href="<c:url value="/images/icon/GIRS.ico"/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value="/css/bootstrap/bootstrap.css"/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value="/js/paramquery/pqgrid.min.css"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/js/paramquery/pqgrid.ui.min.css"/>" />
    <link type="text/css" rel='stylesheet' href="<c:url value="/js/paramquery/themes/bootstrap/pqgrid.css"/>" />
    <link type="text/css" rel="stylesheet"  href="<c:url value="/js/jquery-ui/jquery-ui.css"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/css/bootstrap/bootstrap-datetimepicker.min.css"/>">

	<script type="text/javascript" src="<c:url value="/js/cmmn/constants.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/jquery/js/jquery-1.9.1.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/jquery/js/jquery.form.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/jquery/js/jquery.fileDownload.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/jquery/js/jquery.cookie.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/jquery/js/jquery.base62.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/jquery-ui/jquery.blockUI.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/jquery-ui/jquery.bpopup.min.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/cmmn/common.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/cmmn/pagination.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/bootstrap/bootstrap.min.js"/>"></script>

	<script type="text/javascript" src="<c:url value="/js/jquery-ui/jquery-ui.min.js"/>"></script>

<!--PQ Grid files-->
    <script type="text/javascript" src="<c:url value="/js/paramquery/pqgrid.min.js"/>"></script>
    <!--for localization and intellisense -->
    <script type="text/javascript" src="<c:url value="/js/paramquery/localize/pq-localize-en.js"/>"></script>
<!--for touch devices-->
    <script type="text/javascript" src="<c:url value="/js/paramquery/pqTouch/pqtouch.min.js"/>"></script>
<!--jsZip for zip and xlsx import/export-->
    <script type="text/javascript" src="<c:url value="/js/paramquery/jsZip-2.5.0/jszip.min.js"/>"></script>

	<script type="text/javascript" src="<c:url value="/js/bootstrap/moment.min.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/bootstrap/moment-locale-ko.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/bootstrap/bootstrap-datetimepicker.min.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/cmmn/file.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/paramquery/FileSaver.js"/>"></script>
	<script type="text/javascript" src="<c:url value="/js/cmmn/JControl.js"/>"></script>
	<!-- highcharts js -->
	<%-- <script type="text/javascript" src="<c:url value="/js/highcharts/highcharts.js"/>"></script> --%>
</head>

<body>
<div id="popup" class="pop-wrap">
	<input type="hidden" name="topMenuId" id="topMenuId" value="${topMenuId}"/>
	<input type="hidden" name="currentMenuId" id="currentMenuId" value="${currentMenuId}"/>
	<tiles:insertAttribute name="body" />
</div>
</body>
</html>