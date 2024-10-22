<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/franReqstMngList.js"/>"></script>
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
			<h5 class="mTitle2"><span class="ti">체험 서비스 확인</span> <span class="ts">체험 직영점 신청 현황</span></h5>
		
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<input type="hidden" name="pageIndexMob" value="" />
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
				<input type="hidden" id="reqCrud" name="reqCrud" />
				<input type="hidden" id="exprnRegistNo" name="exprnRegistNo" />
			</form>
			
			<div class="mButton1 right" style="margin-bottom:8px;">
				<a href="javascript:void(0)" id="btnApprove" class="mBtn1 primary">승인</a>
				<a href="javascript:void(0)" id="btnReject" class="mBtn1 gray">반려</a>
			</div>
			
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 중분류 업종, 브랜드명, 주소, 지점명, 진행상태, 신청일로 구성된 표입니다.">
				<caption>가맹본사 참여하기 신청현황</caption>
				<colgroup>
					<col style="width:6%;">
					<col style="width:8%;">
					<col style="width:8%;">
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
					<th scope="col">신청일</th> -->
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
				</tbody>
				</table>
			</div>
			<!-- //board -->
		
			<!-- paging -->
			<div class="mPag"></div>
			<!-- //paging -->
		
		
		</div>
	</div>
</div>

		<h3 class="subtitle forMo">마이페이지</h3>
			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;">
			</div>

			<div class="wrap_inner forMo">
				<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;"></ul>
				
				<form id="searchMobForm" method="post">
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<input type="hidden" id="reqCrud" name="reqCrud" />
					<input type="hidden" id="exprnRegistNo" name="exprnRegistNo" />
					<input type="hidden" name="searchType" id="mSearchType" />
					<input type="hidden" name="searchText" id="mSearchText" />
				</form>
				
				<div class="search">
					<select id="searchMobType" class="radius">
						<option value="A">브랜드명</option>
						<option value="B">중분류 업종</option>
						<option value="C">지점명</option>
						<option value="D">상태</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" id="searchMobText" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>
				
				<div class="btn tar">
					<div class="box_btn w100 h26 radius"><button id="btnApproveMob">승인</button></div>
					<div class="box_btn w100 h26 radius gray"><button id="btnRejectMob">반려</button></div>
				</div>
				
				<ul id="dataTbodyMob" class="list_board hasCheck">
					
				</ul>
				
		<!-- 		<ul class="list_board hasCheck">
					<li>
						<div class="box">
							<p class="check">
								<input type="checkbox" name="temp_check0" id="temp_check0" class="hidden notxt">
								<label for="temp_check0"></label>
							</p>

							<a href="brandDensity.html" target="_blank">
								<p class="type"><span>외식</span>-<span>한식</span></p>
								<p class="subject">놀부부대찌개</p>
								<p class="nameDate">
									<span>
										<strong>창업비용</strong>
										999,999,999
									</span>

									<span>
										<strong>본사업력</strong>
										900년
									</span>

									<span>
										<strong>본사부채</strong>
										-9,999%
									</span>
								</p>
							</a>
						</div>
					</li>
				</ul> -->
			<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
		</div>
<!-- //content -->
