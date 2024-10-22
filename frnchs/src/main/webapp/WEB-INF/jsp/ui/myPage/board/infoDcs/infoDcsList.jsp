<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/infoDcsList.js"/>"></script>
<jsp:include page="/WEB-INF/tiles/assignInfoAdminPopup.jsp"/><!-- 브랜드관리자 배정 팝업 -->
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
						<option value="chrgCnstntUserNm">접수자</option>
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
					
			<div class="mButton1 right">
				<!-- <a href="javascript:void(0)" id="btbAssign" class="mBtn1 primary">담당자 배정</a> -->
				<a href="javascript:void(0)" id="btnApprove" class="mBtn1 primary">승인</a>
				<a href="javascript:void(0)" id="btnCompanion" class="mBtn1 gray">반려</a>
			</div>
			<div class="mButton1 fLeft">
				<a href="javascript:void(0)" id="btbAssign" class="mBtn1 primary">담당자 배정</a>
			</div>
			<!-- board -->
			<div class="mBoard1 noline" style="margin-top:8px">
				<table summary="선택, 번호, 프랜차이즈, 신청자, 접수자, 진행상태, 신청일, 파일첨부로 구성된 테이블입니다.">
					<caption>프랜차이즈 본사 상벌 관리</caption>
					<colgroup>
							<col style="width:6%;">
							<col style="width:8%;">
							<col style="width:auto;">
							<col style="width:16%;">
							<col style="width:16%;">
							<col style="width:10%;">
							<col style="width:12%;">
						</colgroup>

						<thead>
							<tr>
								<th scope="col">선택</th>
								<th scope="col">번호</th>
								<th scope="col">브랜드명</th>
								<th scope="col">신청자</th>
								<th scope="col">접수자</th>
								<th scope="col">진행상태</th>
								<th scope="col">신청일</th>
							</tr>
						</thead>
					<tbody id="dataTbody">
						<tr>
							<td colspan="7">조회된 데이터가 없습니다.</td>
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
					<input type="hidden" id="hedofcNo" name="hedofcNo" />
					<input type="hidden" name="schSeCode" id="mSchSeCode" />
					<input type="hidden" name="schTxt" id="mSchTxt" />
				</form>
			
				<div class="search">
					<select id="schSeCodeMob" class="radius">
						<option value="">전체</option>
						<option value="chargerNm">신청자</option>
						<option value="chrgCnstntUserNm">접수자</option>
						<option value="frnchsNm">프랜차이즈</option>
						<option value="confmSttusCodeNm">진행상태</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" id="schTxtMob" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>

				<div class="btn tar">
					<!-- <div class="box_btn w100 h26 radius "><button id="btnMobDown" style="width:100%">다운로드</button></div> -->
					<div class="box_btn w100 h26 radius "><button id="btnMobbAssign" style="width:100%" onclick="toggle_dimmed_view('layer_appoint_mo');">담당자 배정</button></div>
					<div class="box_btn w100 h26 radius "><button id="btnMobApprove" style="width:100%">승인</button></div>
					<div class="box_btn w100 h26 radius gray"><button id="btnMobCompanion" style="width:100%">반려</button></div>
				</div>
				
				<ul id="dataTbodyMob" class="list_board hasCheck">
					
				</ul>
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
				
				<!-- 레이어 - 담당자 배정 -->
				<div id="assignInfoAdminPopupMob" class="layer_common layer_popup layer_appoint_mo">
					<div class="titleArea">
						<h3>정보공개서 관리자 지정</h3>

						<button id="PopupMobClose" class="close" onclick="toggle_dimmed_view('layer_appoint_mo');"></button>
					</div>

					<div class="inner scroll_y">
						<ul id="dataTbodyMobPopup" class="list_box radius">
						</ul>
					</div>

					<div class="btn btn_col col2">
						<div class="box_btn block h50 fs16 bold"><button id="btn_saveMob">배정</button></div>
						<div class="box_btn block h50 gray fs16 bold"><button id="btn_deleteMob">배정취소</button></div>
					</div>
				</div>
				<!-- //레이어 - 담당자 배정 -->
				
		</div>
		
		<div id="dimmed"></div>
			
<!-- //content -->