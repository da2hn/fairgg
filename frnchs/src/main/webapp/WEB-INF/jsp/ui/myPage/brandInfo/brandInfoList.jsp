<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/brandInfo/brandInfoList.js"/>"></script>
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
			<h5 class="mTitle2"><span class="ti">브랜드 정보 관리</span></h5>
			
			<form id="searchForm" method="post">
				<input type="hidden" name="pageIndex" value="" />
				<input type="hidden" name="frnchsNo" value="" />
				<input type="hidden" id="reqCrud" name="reqCrud" />
				<div class="mSort1 mt1">
					<select class="select" title="분류" name="searchType" id="searchType">
						<option value="A">브랜드명</option>
						<option value="B">업종</option>
					</select>
					<input hidden="hidden" />
					<input type="text" class="it" title="검색어" name="searchText" id="searchText" placeholder="검색어를 입력하세요" style="margin-left:7px">
					<a href="javascript:void()" id="btnSearch" class="mBtn1">검색</a>
				</div>
			</form>
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="번호, 중분류 업종, 브랜드명, 주소로 구성된 표입니다.">
				<caption>프랜차이즈 관리</caption>
				<colgroup>
					<col style="width:6%;">
					<col style="width:8%;">
					<col style="width:12%;">
					<col style="width:12%;">
					<col style="width:auto;">
					<col style="width:10%;">
					<col style="width:12%;">
					<col style="width:8%;">
					<col style="width:8%;">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">번호</th>
					<th scope="col">대분류 업종</th>
					<th scope="col">중분류 업종</th>
					<th scope="col">브랜드명</th>
					<th scope="col">상세정보<br/>등록</th>
					<th scope="col">등록일</th>
					<th scope="col">이미지<br/>첨부</th>
					<th scope="col">소개자료<br/>첨부</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="9">조회된 내용이 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
		
			<!-- paging -->
			<div class="mPag"></div>
			<!-- //paging -->
		
			<div class="mButton1 fLeft">
				<a href="javascript:void(0)" id="btnCancel" class="mBtn1 primary">삭제</a>
			</div>
		</div>
	</div>
</div>
		
		<h3 class="subtitle forMo">마이페이지</h3>

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo"></div></div>
			
			<div class="wrap_inner forMo">
				<form id="searchMobForm" method="post">
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<input type="hidden" name="frnchsNo" value="" />
					<input type="hidden" name="reqCrud" />
					<input type="hidden" name="searchType" id="mSearchType" />
					<input type="hidden" name="searchText" id="mSearchText" />
				</form>
				<div class="search">
					<select id="searchMobType" class="radius">
						<option value="A">브랜드명</option>
						<option value="B">업종</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" id="searchMobText" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>

				<div class="btn tar">
<!-- 					<div id="btnMobSearch" class="box_btn w100 h26 radius gray"><button>조회하기</button></div> -->
					<div id="btnMobCancel" class="box_btn w100 h26 radius gray"><button>삭제</button></div>
				</div>
				
				<ul id="dataTbodyMob" class="list_board hasCheck">
					
				</ul>
				
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
				
			</div>
<!-- //content -->