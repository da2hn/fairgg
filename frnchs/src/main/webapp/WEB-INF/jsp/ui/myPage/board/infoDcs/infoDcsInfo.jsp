<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/infoDcsListInfo.js"/>"></script>
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
			<h5 class="mTitle2">정보 공개서 등록</h5>
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<div class="mSort1 mt1">
					<select class="select ldClass" title="분류" name="schSeCode" id="schSeCode">
						<option value="frnchsNm">브랜드명</option>
						<option value="ldClass">대분류업종</option>
						<option value="mdClass">중분류업종</option>
					</select>
					<input type="text" class="it" title="검색어" name="schTxt" id="schTxt" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0)" id="btnSearch" class="mBtn1">검색</a>
				</div>
			</form>
			<form id="reqForm" method="post">
				<input type="hidden" id="infoDcsRegistNo" name="infoDcsRegistNo" />
			</form>
			
			<!-- 정보공개서 번호 -->
			<input type="hidden" id="infoDcsRegistNo" name="infoDcsRegistNo" />
					
			<div class="mButton1 right" style="margin-bottom:8px;">
				<a href="javascript:void(0)" id="btnEnroll" class="mBtn1 primary">등록</a>
			<c:if test="${sessionScope.user.userSeCode eq 'US03'}">	
				<a href="javascript:void(0)" id="btnApply" class="mBtn1 primary">신청</a>
			</c:if>
				<a href="javascript:void(0)" id="btnDelete" class="mBtn1 gray">삭제</a>
			</div>
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 프랜차이즈, 신청자, 접수자, 진행상태, 신청일, 파일첨부로 구성된 테이블입니다.">
					<caption>프랜차이즈 본사 상벌 관리</caption>
					<thead>
					<tr>
						<th scope="col">선택</th>
						<th scope="col">번호</th>
						<th scope="col">대분류 업종</th>
						<th scope="col">중분류 업종</th>
						<th scope="col">브랜드명</th>
						<th scope="col">진행상태</th>
						<th scope="col">등록일</th>
						<th scope="col">파일첨부</th>
					</tr>
					</thead>
					<tbody id="dataTbody">
						<tr>
							<td colspan="8">조회된 내용이 없습니다.</td>
						</tr>
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

			<div class="fixTab"><div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>

			<div class="wrap_inner forMo">
				<ul id="mobTab" class="tab_common2" style="margin-bottom:16px;"></ul>
		
				<form id="searchMobForm" method="post">
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<input type="hidden" id="infoDcsRegistNo" name="infoDcsRegistNo" />
					<input type="hidden" name="schSeCode" id="mSchSeCode" />
					<input type="hidden" name="schTxt" id="mSchTxt" />
				</form>
				
				<div class="search">
					<select id="schSeCodeMob" class="radius">
						<option value="frnchsNm">브랜드명</option>
						<option value="ldClass">대분류업종</option>
						<option value="mdClass">중분류업종</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" id="schTxtMob" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>
				
				<div class="btn tar">
					<div class="box_btn w100 h26 radius "><button id="btnMobDown" style="width:100%">다운로드</button></div>
					<div class="box_btn w100 h26 radius "><button id="btnMobEnroll" style="width:100%">등록</button></div>
				<c:if test="${sessionScope.user.userSeCode eq 'US03'}">	
					<div class="box_btn w100 h26 radius "><button id="btnMobApply" style="width:100%">신청</button></div>
				</c:if>
					<div class="box_btn w100 h26 radius gray"><button id="btnMobDelete" style="width:100%">삭제</button></div>
				</div>

				<ul id="dataTbodyMob" class="list_board hasCheck">
					
				</ul>
				<!-- <ul class="list_board hasCheck">
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

					<li>
						<div class="box">
							<p class="check">
								<input type="checkbox" name="temp_check1" id="temp_check1" class="hidden notxt">
								<label for="temp_check1"></label>
							</p>
						
							<a href="brandDensity.html" target="_blank">
								<p class="type"><span>외식</span>-<span>한식</span></p>
								<p class="subject">원조감자탕</p>
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
				
				<!-- <div class="btn_col2 col2">
					<div class="box_btn block h40 radius"><button>등록</button></div>
					<div class="box_btn block h40 radius gray" id=""><button>삭제</button></div>
				</div> -->
			</div>

<!-- //content -->