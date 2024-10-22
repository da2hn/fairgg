<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/infoDcsManage.js"/>"></script>
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
			<h5 class="mTitle2">정보 공개서 관리</h5>
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<div class="mSort1 mt1">
					<select class="select ldClass" title="분류" name="schSeCode" id="schSeCode">
						<option value="">전체</option>
						<option value="chargerNm">신청자</option>
<!-- 						<option value="chrgCnstntUserNm">접수자</option> -->
						<option value="frnchsNm">프랜차이즈</option>
						<option value="confmSttusCodeNm">진행상태</option>
					</select>
					<input type="text" class="it" title="검색어" name="schTxt" id="schTxt" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0)" id="btnSearch" class="mBtn1">검색</a>
				</div>
			</form>
			<form id="reqForm" method="post">
				<input type="hidden" id="hedofcNo" name="hedofcNo" />
			</form>
			
			<!-- 정보공개서 번호 -->
			<input type="hidden" id="infoDcsRegistNo" name="infoDcsRegistNo" />
					
			<!-- <div class="mButton1 right">
				<a href="javascript:void(0)" id="btnApprove" class="mBtn1 primary">검토완료</a>
				<a href="javascript:void(0)" id="btnCompanion" class="mBtn1 primary">반려</a>
			</div> -->
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 프랜차이즈, 신청자, 접수자, 진행상태, 신청일, 파일첨부로 구성된 테이블입니다.">
					<caption>프랜차이즈 본사 상벌 관리</caption>
					<!-- <thead>
					<tr>
						<th scope="col">선택</th>
						<th scope="col">번호</th>
						<th scope="col">프랜차이즈</th>
						<th scope="col">신청자</th>
						<th scope="col">이메일</th>
						<th scope="col">연락처</th>
						<th scope="col">진행상태</th>
						<th scope="col">파일첨부</th>
					</tr>
					</thead> -->
					<colgroup>
						<col style="width:6%;">
						<col style="width:8%;">
						<col style="width:auto;">
						<col style="width:10%;">
						<col style="width:20%;">
						<col style="width:8%;">
						<col style="width:8%;">
					</colgroup>

					<thead>
						<tr>
							<th scope="col">선택</th>
							<th scope="col">번호</th>
							<th scope="col">브랜드명</th>
							<th scope="col">신청자</th>
							<th scope="col">이메일/연락처</th>
							<th scope="col">진행상태</th>
							<th scope="col">첨부파일</th>
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
			<a href="javascript:void(0)" id="btnApprove" class="mBtn1 primary">검토완료</a>
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
					<input type="hidden" name="schSeCode" id="mSearchType" />
					<input type="hidden" name="schTxt" id="mSearchText" />
				</form>
				
				<div class="search">
					<select id="searchMobType" class="radius">
						<option value="">전체</option>
						<option value="chargerNm">신청자</option>
						<!-- <option value="chrgCnstntUserNm">접수자</option> -->
						<option value="frnchsNm">프랜차이즈</option>
						<option value="confmSttusCodeNm">진행상태</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" id="searchMobText" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>
				
				<div class="btn tar">
					<div class="box_btn w100 h26 radius "><button id="btnApproveMob">검토완료</button></div>
				</div>
				
				<ul id="dataTbodyMob" class="list_board hasCheck">
				</ul>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
			</div>
<!-- //content -->