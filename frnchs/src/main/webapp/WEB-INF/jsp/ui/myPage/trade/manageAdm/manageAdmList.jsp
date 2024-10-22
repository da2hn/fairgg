<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/trade/manageAdmList.js"/>"></script>
<jsp:include page="/WEB-INF/tiles/assignCnsltPopup.jsp"/><!-- 컨설턴트배정 팝업 -->
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
			<h5 class="mTitle2">점포 관리 확인</h5>
			<div class="mSort1 mt1">
				<form id="searchForm" method="post" onsubmit="return false;">
					<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
					<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
					<input type="hidden" id="userNo" name="userNo" />
					<input type="hidden" name="pageIndex" value="" />
					<select title="점포 관리 확인 검색구분" class="select" id="schSeCode" name="schSeCode" >
						<option value="schUserNm">신청자</option>
						<option value="schChrgCnstntUserNm">접수자</option>
						<option value="schSj">제목</option>
						<option value="schConfmSttusCodeNm">진행상태</option>
					</select>
					<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0);" class="mBtn1" id="btnSearch">검색</a>
				</form>
				<form id="reqForm" method="post">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="trdeThingRegistNo" name="trdeThingRegistNo" />
					<input type="hidden" id="chrgCnstntUserNm" name="chrgCnstntUserNm" />
					<input type="hidden" id="chrgCnstntUserNo" name="chrgCnstntUserNo" />
					<input type="hidden" id="srcPath" name="srcPath" value="${param.srcPath}" />
				</form>
				
				<div class="mButton1 right">
					<a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprAssign">컨설턴트 배정</a>
					<a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprConfm">승인</a>
					<a href="javascript:void(0);" class="mBtn1 gray" id="btn_apprReturn">반려</a>
					<a href="javascript:void(0);" class="mBtn1 gray" id="btn_apprDelete">삭제</a>
				</div>
			
			</div>
			<!-- board -->
			<div class="mBoard1 noline">
				<table>
				<caption>점포 관리 확인</caption>
				<colgroup>
					<col width="65px">
					<col width="65px">
					<col width="220px">
					<col width="120px">
					<col width="140px">
					<col width="140px">
					<col width="80px">
					<col width="120px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">상가형태</th>
					<th scope="col">신청자</th>
					<th scope="col">접수자(컨설턴트)</th>
					<th scope="col">진행상태</th>
					<th scope="col">신청일</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="9">조회된 데이터가 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
			<!-- paging -->
			<div class="mPag">
			</div>
			<!-- //paging -->
		</div>
	</div>
</div>

		<h3 class="subtitle forMo">마이페이지</h3>

			<div id="myPageMobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;">
			</div>

			<div class="wrap_inner forMo">
				<form id="searchMobForm" method="post">
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<input type="hidden" id="trdeThingRegistNo" name="trdeThingRegistNo" />
					<input type="hidden" name="schSeCode" id="mSchSeCode" />
					<input type="hidden" name="schTxt" id="mSchTxt" />
				</form>
				<div class="search">
					<select id="schSeCodeMob" class="radius">
						<option value="schUserNm">신청자</option>
						<option value="schConfmUserNm">접수자</option>
						<option value="schSj">제목</option>
						<option value="schConfmSttusCodeNm">진행상태</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" id="schTxtMob" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>
				
				<div class="btn tar">
					<div class="box_btn w100 h26 radius "><button id="btn_apprMobAssign" style="width:100%">컨설턴트 배정</button></div>
					<div class="box_btn w100 h26 radius "><button id="btn_apprMobConfm" style="width:100%">승인</button></div>
					<div class="box_btn w100 h26 radius gray"><button id="btn_apprMobReturn" style="width:100%">반려</button></div>
					<div class="box_btn w100 h26 radius gray"><button id="btn_apprMobDelete" style="width:100%">삭제</button></div>
				</div>
				
				<ul id="dataTbodyMob" class="list_board hasCheck">
				</ul>
				
				<div id="assignCnsltMobPopup" class="layer_common layer_popup layer_appoint_mo">
					<div class="titleArea">
						<h3>점포 문서 점검 컨설턴트 명단</h3>

						<button class="close" onclick="toggle_dimmed_view('layer_appoint_mo');"></button>
					</div>

					<div class="inner scroll_y">
						<ul id="dataTbodyMobPopup" class="list_box radius">
						</ul>
					</div>

					<div class="btn btn_col col2">
						<div class="box_btn block h50 fs16 bold"><button id="btn_saveMob" style="width:200%">배정</button></div>
						<!-- <div class="box_btn block h50 gray fs16 bold"><button onclick="toggle_dimmed_view('layer_appoint_mo');">배정취소</button></div> -->
						<div class="box_btn block h50 gray fs16 bold"><button id="btn_companionMob" style="width:200%;display:none;">배정취소</button></div>
					</div>
				</div>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
				
			</div>
<!-- content -->