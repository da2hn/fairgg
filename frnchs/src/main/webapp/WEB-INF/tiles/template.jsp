<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="ko">

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
		<title>경기도 가맹정보제공시스템</title> <%-- 요청에 의한 가맹정보시스템 -> 가맹정보제공시스템- 21.03.22 --%>
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/jquery-ui.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.css"/>" />
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/plugins/swiper/swiper.min.css"/>" />
		<link id="load-css-0" rel="stylesheet" type="text/css" href=https://www.gstatic.com/charts/51/css/core/tooltip.css>
        <link id="load-css-1" rel="stylesheet" type="text/css" href=https://www.gstatic.com/charts/51/css/util/util.css>
		<link rel="stylesheet" href="/static/fullCalendar/core/css/fullcalendar.min.css" />
		<link rel="stylesheet" href='/static/fullCalendar/core/css/select2.min.css' />
		<link rel="stylesheet" href='/static/fullCalendar/core/css/bootstrap-datetimepicker.min.css' />
		<link rel="stylesheet" href="/static/fullCalendar/css/main.css">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/glyphicon.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/ui.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/style.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/style_dark.css"/>">
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/style_dark2.css"/>">
		<link rel="stylesheet" type="text/css" media="screen and (max-width:750px)" href="<c:url value="/static/css/style_mo.css"/>">
		<link rel="stylesheet" type="text/css" media="screen and (max-width:750px)" href="<c:url value="/static/css/style_dark_mo.css"/>">
		<link rel="stylesheet" type="text/css" media="screen and (max-width:750px)" href="<c:url value="/static/css/style_dark_mo2.css"/>">
		
		<script type="text/javascript" src="<c:url value="/static/js/jquery-1.11.3.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery-ui.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/plugins/swiper/swiper.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/common.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/constants.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/js/jquery.form.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery-ui/jquery.blockUI.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/jquery/js/jquery.cookie.min.js"/>"></script><!-- 1.4.1 21.01.12 추가-->
		<script type="text/javascript" charset="UTF-8" src=https://www.gstatic.com/charts/51/loader.js></script>
        <script type="text/javascript" charset="UTF-8" src=https://www.gstatic.com/charts/51/js/jsapi_compiled_default_module.js></script>
        <script type="text/javascript" charset="UTF-8" src=https://www.gstatic.com/charts/51/js/jsapi_compiled_graphics_module.js></script>
        <script type="text/javascript" charset="UTF-8" src=https://www.gstatic.com/charts/51/js/jsapi_compiled_ui_module.js></script>
        <script type="text/javascript" charset="UTF-8" src=https://www.gstatic.com/charts/51/js/jsapi_compiled_corechart_module.js></script>
		<script type="text/javascript" src="<c:url value="/static/js/ui.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/script.js"/>"></script>


		<script type="text/javascript" src="<c:url value="/static/js/cmmn/pagination.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/monthpicker.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/cmmn/file.js"/>"></script>
		<tiles:insertAttribute name="analitics" /><!-- analitics -->
	</head>

	<body>
    <spring:eval var="populBlkUrl" expression="@prop['geo.populBlkUrl']"/>
    <spring:eval var="cardBlkUrl" expression="@prop['geo.cardBlkUrl']"/>
    <spring:eval var="ovpopBlkUrl" expression="@prop['geo.ovpopBlkUrl']"/>
    <spring:eval var="populUrl" expression="@prop['geo.populUrl']"/>
    <spring:eval var="cardUrl" expression="@prop['geo.cardUrl']"/>

	<script>
	const gPopulBlkUrl = '${populBlkUrl}';
	const gCardBlkUrl = '${cardBlkUrl}';
	const gOvpopBlkUrl = '${ovpopBlkUrl}';
	const gPopulUrl = '${populUrl}';
	const gCardUrl = '${cardUrl}';
	</script>

		<c:set var="fullURL" value="${requestScope['javax.servlet.forward.servlet_path'] }"/>
		<c:set var="pathName" value="${fn:split(requestScope['javax.servlet.forward.servlet_path'],'/')[0]}" />
		<input type="hidden" name="contextPath" id="contextPath" value="<%=request.getContextPath()%>"/>
		<input type="hidden" name="fullURL" id="fullURL" value="${fullURL}"/>
		<!-- s:skip navigation -->
		<div id="skipnavigation">
			<ul class="skip">
			<li><a href="#body">본문내용 바로가기</a></li>
			<li><a href="#gnbNavi">메인메뉴 바로가기</a></li>
			</ul>
		</div>
		<!-- e:skip navigation -->
		<div id="wrap">
			<tiles:insertAttribute name="header" /><!-- header -->
				<div id="cnt">
			<c:if test="${pathName!='myPage' }">
				<tiles:insertAttribute name="contentHeader" /><!-- contentHeader -->
			</c:if>
			<c:if test="${pathName=='myPage' }">
			<article id="mypageWish" class="mypage">
				<div id="body" class="body forPc">
					<div class="bg">
 						<tiles:insertAttribute name="left" /><!-- left menu -->
	 		</c:if>
					<tiles:insertAttribute name="body" /><!-- content -->
			<c:if test="${pathName=='myPage' }">
				</article>
			</c:if>
				</div>		
					<tiles:insertAttribute name="footer" /><!-- footer -->
				</div>
	</body>

	<tiles:insertAttribute name="layerPopup" /><!-- layerPopup -->
	<tiles:insertAttribute name="popup" /><%-- popup - 20.12.29, 위치이동 - 21.03.22 --%>
</html>

