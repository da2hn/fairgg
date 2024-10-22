<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/expr/franReqstList.js"/>"></script>
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
			<h5 class="mTitle2"><span class="ti">프랜차이즈 체험관리</span> <span class="ts">체험 프랜차이즈 신청 현황</span></h5>
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<input type="hidden" name="pageIndexMob" value="" />
				<input type="hidden" name="pageIndexMobMax" value="" />
				<div class="mSort1 mt1">
					<select class="select" title="분류" name="searchType" id="searchType">
						<option value="A">브랜드명</option>
						<option value="B">진행상태</option>
						<option value="C">주소</option>
					</select>
					<input type="text" class="it" title="검색어" name="searchText" id="searchText" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0)" id="btnSearch" class="mBtn1">검색</a>
				</div>
			</form>
		
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 브랜드명, 주소, 진행상태, 신청일로 구성된 표입니다.">
				<caption>매물점포 문의현황</caption>
				<colgroup>
					<col width="95px">
					<col span="5" width="*">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">번호</th>
					<th scope="col">브랜드명</th>
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
		
			<div class="mButton1 fLeft">
				<a href="javascript:void(0)" id="btnCancel" class="mBtn1 primary">취소하기</a>
			</div>
		
		</div>
	</div>
</div>

		<h3 class="subtitle forMo">마이페이지</h3>
			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo">
				<div class="swiper-wrapper"></div>
			</div>
			<div class="wrap_inner forMo">
				<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;"></ul>
				<div class="search">
					<select name="searchTypeMob" id="searchTypeMob" class="radius">
						<option value="A">브랜드명</option>
						<option value="B">진행상태</option>
						<option value="C">주소</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" name="" id="searchTextMob" placeholder="검색어">
						<button id="btnSearchMob">search</button>
					</div>
				</div>

				<div class="btn tar">
					<div class="box_btn w100 h26 radius gray"><button id="btnCancelMob">취소하기</button></div>
				</div>

				<ul class="list_board hasCheck" id="dataTbodyMob">
<!-- 					<li>
						<div class="box">
							<p class="check">
								<input type="checkbox" name="chkRowSnMob" id=chk_11 class="hidden notxt" value='11'>
								<label for=chk_11></label>
							</p>	
							<a href="javascript:void(0)">
								<p class="no">NO.09</p>
								<p class="subject">경기도 카페501 수원점 매각</p>
								<p class="nameDate" style="margin-bottom:6px;">
									<span>경기도 수원시 권선구 서둔동 81-1</span>
								
									<span>2021.11.16~2021.12.31</span>
								</p>
					
								<p class="state active">진행중</p>

								<p class="attach active"></p>
							</a>
						</div>
					</li>  -->
				</ul>
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
			</div>
<!-- //content -->