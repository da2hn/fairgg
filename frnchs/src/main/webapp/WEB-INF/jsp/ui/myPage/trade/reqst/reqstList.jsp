<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/trade/reqstList.js"/>"></script>
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
			<h5 class="mTitle2"><span class="ti">매물점포 관리</span> <span class="ts">매물점포 신청현황</span></h5>
			<div class="mSort1 mt1">
				<form id="searchForm" method="post" onsubmit="return false;">
					<input type="hidden" id="pageSe" name="pageSe" />
					<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
					<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
					<input type="hidden" id="userNo" name="userNo" />
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<select title="매물점포 신청현황 검색구분" class="select" id="schSeCode" name="schSeCode" >
						<option value="schSj">제목</option>
						<option value="schConfmSttusCodeNm">진행상태</option>
						<option value="schChrgCnstntUserNm">접수자(연락처)</option>
					</select>
					<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="검색어를 입력하세요">
					<!-- 검색이벤트 연결 염종찬 -->
					<a href="javascript:void(0);" class="mBtn1" id="btn_sch" onclick="javascript:fn_selectTradeList();">검색</a>
				</form>
				<form id="reqForm" method="post">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="trdeThingRegistNo" name="trdeThingRegistNo" />
					<input type="hidden" id="srcPath" name="srcPath" value="${param.srcPath}" />
				</form>
			</div>
			<!-- <div class="gRt" align="right">
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprExpired">취소하기</a>
			</div> -->
			<!-- board -->
			<div class="mBoard1 noline">
				<table>
				<caption>매물점포 신청현황</caption>
				<colgroup>
					<col width="65px">
					<col width="65px">
					<col width="*">
					<col width="180px">
					<col width="120px">
					<col width="120px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">접수자(연락처)</th>
					<th scope="col">진행상태</th>
					<th scope="col">신청일</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="6">조회된 데이터가 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
			<!-- paging -->
			<div class="mPag">
			</div>
			<!-- //paging -->
			<div class="mButton1 fLeft">
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_apprExpired">취소하기</a>
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
					<select title="매물점포 신청현황 검색구분" class="radius" id="schSeCodeMob" name="schSeCodeMob">
						<option value="schChrgCnstntUserNm">접수자(컨설턴트)</option>
						<option value="schConfmSttusCodeNm">진행상태</option>
						<option value="schSj">제목</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" name="schTxtMob" id="schTxtMob" placeholder="검색어를 입력하세요">
						<button id="btn_schMob">search</button>
					</div>
				</div>

				<div class="btn tar">
					<div class="box_btn w100 h26 radius gray"><button id="btn_apprExpiredMob">취소하기</button></div>
				</div>
				
				<ul class="list_board hasCheck" id="dataTbodyMob">
<!-- 					<li>
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
					</li> -->
				</ul>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
				
			</div>
<!-- content -->