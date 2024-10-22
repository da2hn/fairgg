<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/cmmn/menu.js"/>"></script>
<!--접근성 패널-->
	<div id="header">
		<h1>
			<a href="/"> <%-- 헤더 url 추가 - 21.03.10 --%>
				<span class="lo"><img src="/static/images/sysMngr/logo.png" alt="가맹정보제공 온라인 플랫폼 관리자 시스템"></span>
				<span class="tx">가맹정보제공 온라인 플랫폼 관리자 시스템</span>
			</a>
		</h1>
		<div class="gRt">
			<span class="na"><c:out value="${sessionScope.user.userNm }" />님</span>
			<a href="/logout.do" class="bt">로그아웃</a>
		</div>
	</div>
<!-- e : 메뉴 -->
