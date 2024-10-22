<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/user/joinForm.js"/>"></script>
<style media="screen and (max-width: 750px)">
.pMain #header {height:0px;}
.pMain #header .uh h1 {display:none;}
.pMain #header .uh button.back,
.pMain #header .uh button.home {display:block;}
.pMain #header .uh .search {display:none;}
.wType2 {position:relative;top:20px}
</style>
<form id="frm_join" name="frm_join" method="post">
<!-- login -->
	<div class="mLogin wType2">
		<h2><span>경기도 가맹정보제공시스템</span></h2>
		<h3 class="forPc">사용자 가입</h3>
		<h3 class="forMo" style="padding:30px 0px 0px 0px">사용자 가입</h3>

		<h4>일반사용자 정보</h4>
		<div class="list3">
			<dl>
			<dt>구분선택</dt>
			<dd>
				<select id="userSeCode" name="userSeCode" class="select" title="구분선택">
					<c:forEach var="userSeCode" items="${userSeCodeList}" varStatus="status">
						<%-- 기관관리자도 제거 추가 - 21.04.12 --%>
						<c:if test="${userSeCode.codeValue ne 'US05' && userSeCode.codeValue ne 'US04' && userSeCode.codeValue ne 'US03' && userSeCode.codeValue ne 'US02' && userSeCode.codeValue ne 'US06'}">
							<option value="${userSeCode.codeValue}">${userSeCode.codeValueNm}</option>
						</c:if>
					</c:forEach>
				</select>
			</dd>
			<dt class="deptClass hidden">부서</dt>
			<dd class="deptClass hidden">
				<div class="gIt"><input type="text" class="it" title="부서" placeholder="부서를 입력해주세요." name="deptNm" id="deptNm"></div>
			</dd>
			<dt>이름</dt>
			<dd>
				<div class="gIt"><input type="text" class="it" title="이름" placeholder="이름을 입력해주세요." name="userNm"id="userNm"></div>
			</dd>
			<dt>전화번호</dt>
			<dd>
				<div class="gIt"><input type="text" class="it onlyNumber" title="핸드폰번호" name="telno" id="telno" maxlength="11" placeholder="전화번호를 - 없이 입력해주세요."></div>
			</dd>
			<dt>이메일</dt>
			<dd>
				<input type="hidden" name="emailAdres" id="emailAdres" />
				<div class="mFlex1">
					<div class="gIt">
						<input type="text" class="it" title="이메일" value="" id="emailAdres1">
					</div>
					<span class="bar" style="padding:0px 10px 0px 0px">@</span>
					<select class="select" title="이메일 선택" id="emailAdres2">
						<option>naver.com</option>
						<option>gmail.com</option>
						<option>daum.net</option> <%-- 메일 다음 추가 - 21.04.09 --%>
					</select>
				</div>
<!-- 				<div class="if txtEm2">사용가능합니다.</div> -->
			</dd>
			<dt>비밀번호</dt>
			<dd>
				<div class="gIt"><input type="password" class="it" title="비밀번호" placeholder="비밀번호를 입력해주세요." name="userPw" id="userPw"></div>
			</dd>
			<dt>비밀번호 확인</dt>
			<dd>
				<div class="gIt"><input type="password" class="it" title="비밀번호 확인" placeholder="비밀번호를 재확인해주세요." name="userPwRe" id="userPwRe"></div>
			</dd>
			</dl>
		</div>

		<div class="list4">
			<h4>약관동의</h4>
			<div class="check">
				<div class="mCheckbox type2">
					<input type="hidden" id="useStplatAgreAt" name="useStplatAgreAt" >
					<input type="checkbox" id="labelAgree1_1" title="(필수) 이용약관과 개인정보처리방침에 동의합니다." name="">
					<label for="labelAgree1_1">(필수) 이용약관과 개인정보처리방침에 동의합니다.</label>
				</div>
				<div class="mCheckbox type2">
					<input type="hidden" id="marktRecptnAgreAt" name="marktRecptnAgreAt" >
					<input type="checkbox" id="labelAgree1_2" title="(선택) 마케팅 정보 수신에 동의합니다." name="">
					<label for="labelAgree1_2">(선택) 마케팅 정보 수신에 동의합니다.</label>
				</div>
			</div>
		</div>
		<div class="mButton1 flex1">
			<a href="javascript:void(0)" class="mBtn1 l primary" id="btn_join">완료</a>
			<a href="/" class="mBtn1 l lPrimary">다음에하기</a>
		</div>
	</div>
	<!-- //login -->
	
</form>
