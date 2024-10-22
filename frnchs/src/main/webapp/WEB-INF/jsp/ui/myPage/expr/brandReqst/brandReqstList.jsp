<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/brandReqstList.js"/>"></script>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
})
</script>
<!-- content -->
		<div class="content">
			<h5 class="mTitle2"><span class="ti">프랜차이즈 관리</span> <span class="ts">가맹본사 참여하기 신청현황</span></h5>
		
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<input type="hidden" name="pageIndexMob" value="" />
				<input type="hidden" name="pageIndexMobMax" value="" />
				<div class="mSort1 mt1">
					<select class="select" title="분류" name="searchType" id="searchType">
						<option value="A">브랜드명</option>
						<option value="B">중분류 업종</option>
						<option value="C">지점명</option>
						<option value="D">상태</option>
					</select>
					<input type="text" class="it" title="검색어" name="searchText" id="searchText" placeholder="검색어를 입력하세요">
					<a href="javascript:void()" id="btnSearch" class="mBtn1">검색</a>
				</div>
			</form>
			<form id="reqForm" method="post">
				<input type="hidden" id="ssUserSeCode" name="ssUserSeCode" />
				<input type="hidden" id="package" name="package" />
				<input type="hidden" id="reqCrud" name="reqCrud" />
				<input type="hidden" id="exprnRegistNo" name="exprnRegistNo" />
			</form>
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 중분류 업종, 브랜드명, 주소, 지점명, 진행상태, 신청일로 구성된 표입니다.">
				<caption>가맹본사 참여하기 신청현황</caption>
				<colgroup>
					<col style="width:6%;">
					<col style="width:8%;">
					<col style="width:12%;">
					<col style="width:20%;">
					<col style="width:auto;">
					<col style="width:10%;">
					<col style="width:12%;">
				</colgroup>
				<thead>
				<tr>
					<!-- <th scope="col">선택</th>
					<th scope="col">번호</th>
					<th scope="col">중분류 업종</th>
					<th scope="col">브랜드명</th>
					<th scope="col">주소</th>
					<th scope="col">지점명</th>
					<th scope="col">진행상태</th>
					<th scope="col">신청일</th>
					<th scope="col">브랜드 정보</th> -->
					<th scope="col">선택</th>
					<th scope="col">번호</th>
					<th scope="col">중분류 업종</th>
					<th scope="col">지점명</th>
					<th scope="col">주소</th>
					<th scope="col">진행상태</th>
					<th scope="col">신청일</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="7">조회된 내용이 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
		
			<!-- paging -->
			<div class="mPag"></div>
			<!-- //paging -->
		
			<div class="mButton1 fLeft">
				<a href="javascript:void(0)" id="btnCancel" class="mBtn1 primary">취소</a>
			</div>
		</div>
	</div>
</div>

		<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>

			<div class="wrap_inner forMo">
				<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;">
				</ul>

				<div class="search">
					<select name="" id="mSearchType" class="radius">
						<option value="A">브랜드명</option>
						<option value="B">중분류 업종</option>
						<option value="C">지점명</option>
						<option value="D">상태</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" name="" id="mSearchText" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>

				<div class="btn tar">
					<div id="btnMobCancel" class="box_btn w100 h26 radius gray"><button>취소</button></div>
				</div>
				
				<ul id="mDataTbody" class="list_board hasCheck">
					
				</ul>
				
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
				
			</div>
<!-- //content -->