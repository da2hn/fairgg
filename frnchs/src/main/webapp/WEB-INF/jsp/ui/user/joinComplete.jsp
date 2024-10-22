<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<!-- login -->
<style>
.mLogin .done{background:url(../../../../static/images/img_done1.png) 45% 40px no-repeat;}
</style>
<article id="joinComplete" class="member">
	<h3 class="subtitle forMo">회원가입 완료</h3>
		<div class="body"> <%-- 바디 없어서 영역 안잡히던 문제 수정 - 21.04.09 --%>
			<div class="mLogin">
				<h2><span>경기도 가맹정보제공시스템</span></h2>
				<div class="done">
					<strong class="ti">환영합니다.</strong>
					<!-- <span class="tx"><em>브랜드 본사 관리자 회원가입의 경우</em><br> 회원 가입승인 후 이용하실 수 있습니다.</span> -->
					<c:choose>
						<c:when test="${userSeCode eq 'US01' }">
							<span class="tx">로그인하시면 다양한<br> 정보를 얻으실 수 있습니다.</span>
						</c:when>
						<c:when test="${userSeCode eq 'US02' }"> <%-- 요청에 의한 문구분리 - 21.05.06 --%>
							<span class="tx">가입신청 확인되었습니다.<br> 관리자 승인 후 사용가능 합니다.</span>
						</c:when>
						<c:when test="${userSeCode eq 'US03' }">
							<span class="tx"><em>브랜드 본사 관리자 회원가입의 경우</em><br> 회원 가입승인 후 이용하실 수 있습니다.</span>
						</c:when>
						<c:when test="${userSeCode eq 'US04' }">
							<span class="tx"><em>기관관리자 회원가입의 경우</em><br> 회원 가입승인 후 이용하실 수 있습니다.</span>
						</c:when>
						<c:when test="${userSeCode eq 'US06' }">
							<span class="tx"><em>정보공개서 관리자 회원가입의 경우</em><br> 회원 가입승인 후 이용하실 수 있습니다.</span>
						</c:when>
					</c:choose>
				</div>
				<%-- 요청에 의한 컨설턴트 로그인 버튼 제거 - 21.06.28 --%>
				<div class="mButton1">
					<c:if test="${userSeCode eq 'US01'}">
						<a href="/user/loginPage.do" class="mBtn1 l primary">로그인하기</a>
					</c:if>
					<c:if test="${userSeCode ne 'US01'}">
						<a href="/" class="mBtn1 l primary">메인으로</a>
					</c:if>
				</div>
			</div>
	</div>
</article>
<!-- //login -->
