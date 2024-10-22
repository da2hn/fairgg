<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/user/joinBrandForm.js"/>"></script>
<style media="screen and (max-width: 750px)">
.pMain #header {height:0px;}
.pMain #header .uh h1 {display:none;}
.pMain #header .uh button.back,
.pMain #header .uh button.home {display:block;}
.pMain #header .uh .search {display:none;}
.wType3 {position:relative;top:20px}
</style>
<form id="frm_join" name="frm_join" method="post" enctype="multipart/form-data">
<input type="hidden" id="compareFileArea" name="compareFileArea" />
<!-- login -->
<div class="mLogin wType3">
	<h2><span>경기도 가맹정보제공시스템</span></h2>
	<h3 class="forPc">브랜드 본사 관리자 가입</h3>
	<h3 class="forMo" style="padding:30px 0px 0px 0px">브랜드 본사 관리자 가입</h3>
	<h4>프랜차이즈 본사 정보</h4>
	<div class="list3">
		<dl>
		<dt>구분선택</dt>
		<dd>
			<select id="userSeCode" name="userSeCode" class="select" title="구분선택">
					<c:forEach var="userSeCode" items="${userSeCodeList}" varStatus="status">
						<c:if test="${userSeCode.codeValue eq 'US03'}">
							<option value="${userSeCode.codeValue}">${userSeCode.codeValueNm}</option>
						</c:if>
					</c:forEach>
				</select>
		</dd>
		<dt>상호명</dt>
		<dd>
			<div class="mFlex2 type2">
				<input type="text" name="mtltyNm" id="mtltyNm" readonly="readonly" class="it searchMtltyNm" title="상호명">
				<input type="hidden" name="hedofcNo" id="hedofcNo" title="본사번호">
				<input type="hidden" name="bizrno" id="bizrno" title="사업자등록번호">
				<a href="javascript:void(0)" class="mBtn1 jsBtnShow1 searchMtltyNm" style="height: 40px;">검색</a> <!-- add20210107 -->
			</div>
		</dd>
		<dt>사업자등록증</dt>
		<dd class="fileArea">
			<div class="mFile1 type2">
				<div class="gIt"><input type="text" id="atchFileNm" class="it" readonly title="사업자등록증"></div>
				<div class="btn">
					<a href="javascript:void(0)" class="mBtn1">첨부파일</a>
					<input type="file" name="atchFile" id="atchFile" class="fileHidden" onchange="javascript: document.getElementById('atchFileNm').value = this.value">
					<input type="hidden" name="atchmnflNo" id="atchmnflNo">
				</div>
			</div>
			<div class="fileExists hidden">이미 등록된 파일이 있습니다.</div>
		</dd>
		</dl>
	</div>

	<div class="list3">
		<h4>브랜드 담당자 정보</h4>
		<div class="gRt">
			<a href="javascript:void(0)" class="iPlus" id="brandPlus">추가</a>
			<a href="javascript:void(0)" class="iMinus" id="brandMinus">삭제</a>
		</div>
		<dl>
			<dt class="brandInfoStart">이메일</dt>
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
			<dt>담당자명</dt>
			<dd>
				<div class="gIt"><input type="text" class="it" title="담당자명" name="chargerNm" id="chargerNm" maxlength="30"></div>
			</dd>
			<dt>핸드폰번호</dt>
			<dd>
				<div class="gIt"><input type="text" class="it onlyNumber" title="핸드폰번호" name="telno" id="telno" maxlength="11" placeholder="전화번호를 - 없이 입력해주세요."></div>
			</dd>
			<dt>비밀번호</dt>
			<dd>
				<div class="gIt"><input type="password" class="it" title="비밀번호" name="userPw" id="userPw" ></div>
			</dd>
			<dt>비밀번호 확인</dt>
			<dd>
				<div class="gIt"><input type="password" class="it" title="비밀번호 확인" name="userPwRe" id="userPwRe" ></div>
			</dd>
		</dl>
	</div>
	<div class="mButton1 flex1">
		<a href="javascript:void(0)" class="mBtn1 l primary" id="btn_join">완료</a>
		<a href="/" class="mBtn1 l lPrimary">다음에하기</a>
	</div>
</div>
<!-- //login -->
</form>