<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${layerPopupType eq 'loginPopup' }">
<!-- 로그인 팝업 -->
<jsp:include page="/WEB-INF/jsp/ui/common/loginPopup.jsp"/>
</c:if>

<!-- 본사찾기 팝업 -->
<jsp:include page="frnchsHedofcPopup.jsp"/>

<!-- 프랜차이즈 팝업 -->
<jsp:include page="frnchsInfoPopup.jsp"/>
