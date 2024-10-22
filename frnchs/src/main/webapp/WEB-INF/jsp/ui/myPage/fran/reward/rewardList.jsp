<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/reward/rewardList.js"/>"></script>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
})
</script>
<!-- content -->
	<input type="hidden" id="hedofcNoCheck" />
		<div class="content">
			<h5 class="mTitle2">프랜차이즈 본사 상벌 관리</h5>
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<div class="mSort1 mt1">
					<select class="select ldClass" title="분류" name="ldClass" id="ldClass">
						<option value="">대분류 전체</option>
					</select>
					<select class="select mdClass" title="분류" name="mdClass" id="mdClass">
						<option value="">중분류 전체</option>
					</select>
					<input type="text" class="it" title="검색어" name="mtltyNm" id="mtltyNm" placeholder="브랜드명 입력하세요">
					<a href="javascript:void(0)" id="btnSearch" class="mBtn1">검색</a>
				</div>
			</form>
			<form id="reqForm" method="post">
				<input type="hidden" id="hedofcNo" name="hedofcNo" />
			</form>
			<div class="mButton1 fRight" style="float:right;margin-bottom:8px;">
				<!-- <a href="javascript:void(0)" id="btnInfo" class="mBtn1 primary">상점부여</a> -->
			</div>
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 대분류업종, 중분류업종, 브랜드명, 본사주소, 수상횟수, 최근 수상일로 구성된 표입니다.">
					<caption>프랜차이즈 본사 상벌 관리</caption>
					<colgroup>
						<col style="width:6%;">
						<col style="width:8%;">
						<col style="width:10%;">
						<col style="width:10%;">
						<col style="width:14%;">
						<col style="width:auto;">
						<col style="width:8%;">
						<col style="width:12%;">
					</colgroup>
					<thead>
					<tr style="border-top:1px solid #ddd">
						<th scope="col">선택</th>
						<th scope="col">번호</th>
						<th scope="col">대분류 업종</th>
						<th scope="col">중분류 업종</th>
						<th scope="col">브랜드명</th>
						<th scope="col">주소</th>
						<th scope="col">수상횟수</th>
						<th scope="col">최근 수상일</th>
					</tr>
					</thead>
					<tbody id="dataTbody">
						<tr>
							<td colspan="8">조회된 데이터가 없습니다.</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- //board -->
			
			
			<!-- paging -->
			<div class="mPag"></div>
			<!-- //paging -->
			
			<div class="mButton1 fLeft">
				<a href="javascript:void(0)" id="btnApprove" class="mBtn1 primary">삭제</a>
			</div>
		</div>
	</div>
</div>	
	<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>

			<div class="wrap_inner forMo">
				
				<form id="searchMobForm" method="post">
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<input type="hidden" name="ldClass" id="mIdClass" />
					<input type="hidden" name="mdClass" id="mMdClass" />
					<input type="hidden" name="mtltyNm" id="mMtltyNm" />
				</form>
			
				<div class="search">
					<select name="" id="ldClassMob" class="radius" style="width:48%;margin-left:2%">
						<option value="">전체</option>
					</select>
					
					<select id="mdClassMob" class="radius" style="width:48%;margin-left:2%">
						<option value="">중분류 전체</option>
					</select>
				
					<div class="box_search radius" style="width:98%;margin-left:2%;margin-top:10px">
						<input type="text" id="mtltyNmMob" placeholder="브랜드명 입력하세요">
						<button id="btnSearchMob">search</button>
					</div>
				</div>
				
				<div class="btn tar">
					<!-- <div class="box_btn w100 h26 radius"><button id="btnInfoMob">상점부여</button></div> -->
					<div class="box_btn w100 h26 radius gray"><button id="btnApproveMob">삭제</button></div>
				</div>

				<ul id="dataTbodyMob" class="list_board hasCheck">
				</ul>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
		</div>
<!-- //content -->