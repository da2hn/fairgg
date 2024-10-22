<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/user/login.js"/>"></script>
<style>
#wrap {
min-height:50%;
}
</style>
<style media="screen and (max-width: 750px)">
.pMain #header {height:50px;}
.pMain #header .uh h1 {display:none;}
.pMain #header .uh button.back,
.pMain #header .uh button.home {display:block;}
.pMain #header .uh .search {display:none;}
</style>
<article id="login" class="member">
<!-- login -->
<div class="mLogin">
	<h2><span>경기도 가맹정보제공시스템</span></h2>
	<h3 style="padding:0px">로그인</h3>
	<dl class="list1">
	<dt>아이디</dt>
	<dd>
		<div class="gIt"><input type="text" class="it" placeholder="이메일을 입력해주세요." name="userId" id="userId"></div>
	</dd>
	<dt>비밀번호</dt>
	<dd><div class="gIt"><input type="password" class="it" placeholder="비밀번호를 입력해주세요." name="userPw" id="userPw"></div>
		<!-- <div class="gIt"><input type="password" class="it" placeholder="비밀번호를 입력해주세요." name="userPw" id="userPw" style="width:310px;"></div> -->
	</dd>
	</dl>
	<a href="javascript:fn_login();" class="mBtn1 primary btnLogin" >로그인</a>
	<!--
		<div class="mButton1 flex1">
			<a href="javascript:fn_agree();" class="mBtn1 lPrimary w1">회원가입</a>
			<a href="#pwPopup" class="mBtn1 lPrimary jsBtnShow1">비밀번호를 잊으셨나요?</a>
		</div>
		-->
	<div class="joinFind">
		<a href="javascript:fn_agree();">회원가입</a>
		<a href="#pwPopup" class="jsBtnShow1">비밀번호 찾기</a>
	</div>
</div>
</article>
<!-- //login -->

<!-- popup -->
<div id="pwPopup" class="mPopup1 lFind1 hidden">
	<div class="cont">
		<h3>비밀번호 찾기</h3>
		<div class="con">
			<strong class="ti">등록한 정보로 찾기</strong>
			<p class="info">등록한 정보로 비밀번호를 찾을 수 있습니다.</p>
			<dl>
			<dt>이메일</dt>
			<dd>
				<div class="gIt"><input type="text" class="it" placeholder="이메일을 입력해주세요." name="emailAdres" id="emailAdres" maxlength="50"></div>
			</dd>
			<dt>이름</dt>
			<dd>
				<div class="gIt"><input type="text" class="it" placeholder="이름을 입력해주세요." name="userNm" id="userNm" maxlength="30"></div>
			</dd>
			<dt>전화번호</dt>
			<dd>
				<div class="gIt"><input type="text" class="it onlyNumber" name="telno" id="telno" maxlength="11" placeholder="전화번호를 - 없이 입력해주세요."></div>
			</dd>
			</dl>
			<div class="mButton1">
				<a href="javascript:void(0)" id="btnFind" class="mBtn1 primary" style="margin-top:10px">확인</a>
			</div>
		</div>
		<a href="#pwPopup" class="close jsBtnClose1">레이어 닫기</a>
	</div>
</div>
<!-- //popup -->
