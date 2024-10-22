<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/trade/manageList.js"/>"></script>
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
			<h5 class="mTitle2"><span class="ti">매물점포 관리</span> <span class="ts">매물점포 관리현황</span></h5>
			<div class="mSort1 mt1">
				<form id="searchForm" method="post" onsubmit="return false;">
					<input type="hidden" id="pageSe" name="pageSe" />
					<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
					<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
					<input type="hidden" id="userNo" name="userNo" />
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
					<select title="매물점포 관리현황 검색구분" class="select" id="schSeCode" name="schSeCode" >
						<option value="schSj" selected>제목</option>
				<!-- 		<option value="schSopsrtStleCodeNm">상가형태</option> -->
						<option value="schConfmUserNm">접수자(연락처)</option>
						<option value="schConfmSttusCodeNm">진행상태</option>
		<!-- 				<option value="schAdres">주소</option> -->
					</select>
					<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0);" class="mBtn1" id="btn_sch" onclick="javascript:fn_selectTradeList();">검색</a>
				</form>
				<form id="reqForm" method="post">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="trdeThingRegistNo" name="trdeThingRegistNo" />
					<input type="hidden" id="srcPath" name="srcPath" value="${param.srcPath}" />
				</form>
			</div>
			<%-- <div class="gRt" align="right">
				<a href="${contextPath}/myPage/board/info/infoSave.do" class="mBtn1 primary">글쓰기</a>
				<!-- <a href="javascript:void(0);" class="mBtn1 primary" id="btn_delete">삭제</a> -->
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_del" onclick="javascript:fn_updateSttus('deleteConfm');">삭제요청</a>
			</div> --%>
			<!-- board -->
			<div class="mBoard1 noline">
				<table>
				<caption>매물점포 관리현황</caption>
				<colgroup>
					<col style="width:6%;">
					<col style="width:8%;">
					<col style="width:auto;">
					<col style="width:25%;">
					<col style="width:10%;">
					<col style="width:18%;">
					<col style="width:6%;">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">주소</th>
					<th scope="col">접수자(연락처)</th>
					<th scope="col">진행상태</th>
					<th scope="col">첨부서류</th>
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
			<div class="mPag">
			</div>
			<!-- //paging -->
			
			<div class="mButton1 fLeft">
				<a href="javascript:void(0);" class="mBtn1 primary" id="btn_del" onclick="javascript:fn_updateSttus('deleteConfm');">삭제요청</a>
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
					<select name="schSeCodeMob" id="schSeCodeMob" class="radius">
						<option value="schSj" selected>제목</option>
					<!-- 	<option value="schSopsrtStleCodeNm">상가형태</option> -->
						<option value="schConfmUserNm">접수자(연락처)</option>
						<option value="schConfmSttusCodeNm">진행상태</option>
					</select>

					<div class="box_search radius">
						<input type="text" name="schTxtMob" id="schTxtMob" placeholder="검색어">
						<button id="btn_schMob">search</button>
					</div>
				</div>
				
				<div class="btn tar">
					<div class="box_btn w100 h26 radius gray"><button id="btnCancelMob"  onclick="javascript:fn_updateSttusMob('deleteConfm');">삭제요청</button></div>
				</div>

				<ul class="list_board hasCheck" id="dataTbodyMob">
<!-- 					<li>
						<div class="box">
							<p class="check">
								<input type="checkbox" name="temp_check0" id="temp_check0" class="hidden notxt">
								<label for="temp_check0"></label>
							</p>

							<a href="mypageSaleManageDetail.html">
								<div class="numState">
									<span class="no">NO.10</span>
									<span class="state">검토중</span>
								</div>

								<p class="subject">경기도 카페501 수원점 매각</p>

								<p class="nameDate">
									<span>근린상가</span>

									<span>
										<strong>컨설턴트</strong>
										손기웅
									</span>

									<span>
										<strong>신청일</strong>
										2020.10.25
									</span>
								</p>

								<p class="attach">없음</p>
							</a>
						</div>
					</li> -->
				</ul>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
			
			</div>
<!-- content -->