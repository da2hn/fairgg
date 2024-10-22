<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/fran/promoList.js"/>"></script>
<!-- content -->
<div class="content">
	<h5 class="mTitle2">착한 프랜차이즈 본사 관리</h5>

	<form id="searchForm" method="post" onsubmit="return false;">
		<input type="hidden" name="pageIndex" value="" />
		<div class="mSort1 mt1">
			<select class="select" title="분류" name="searchType" id="searchType">
				<option value="A">브랜드명</option>
				<option value="B">중분류 업종</option>
			</select>
			<input type="text" class="it" title="검색어" name="searchText" id="searchText" placeholder="검색어를 입력하세요">
			<a href="javascript:void(0)" id="btnSearch" class="mBtn1">검색</a>
		</div>
	</form>

	<!-- board -->
	<div class="mBoard1 noline">
		<table summary="선택, 번호, 중분류 업종, 브랜드명, 본사 주소, 임원수, 부채비율, 체험프랜차이즈 참여 횟수로 구성된 표입니다.">
		<caption>착한 프랜차이즈 본사 관리</caption>
		<thead>
		<tr>
			<th scope="col">선택</th>
			<th scope="col">번호</th>
			<th scope="col">중분류 업종</th>
			<th scope="col">브랜드명</th>
			<th scope="col">본사 주소</th>
			<th scope="col">임원수</th>
			<th scope="col">부채비율</th>
			<th scope="col">승인여부</th>
			<th scope="col">체험<br> 프랜차이즈<br> 참여 횟수</th>
		</tr>
		</thead>
		<tbody id="dataTbody">
		</tbody>
		</table>
	</div>
	<!-- //board -->

	<!-- paging -->
	<div class="mPag"></div>
	<!-- //paging -->

	<div class="mButton1 fLeft">
		<a href="javascript:void(0)" id="btnApprove" class="mBtn1 primary">승인</a>
	</div>

</div>
<!-- //content -->