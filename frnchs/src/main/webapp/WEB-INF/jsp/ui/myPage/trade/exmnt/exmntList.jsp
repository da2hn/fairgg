<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/trade/exmntList.js"/>"></script>
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
			<!-- <h5 class="mTitle2">매물점포 검토하기</h5> -->
			<h5 class="mTitle2"><span class="ti">매물점포 관리</span> <span class="ts">매물점포 검토하기</span></h5>
			<div class="mSort1 mt1">
				<form id="searchForm" method="post" onsubmit="return false;">
					<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
					<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
					<input type="hidden" id="userNo" name="userNo" />
					<input type="hidden" name="pageIndex" value="" />
					<select title="매물점포 검토하기 검색구분" class="select" id="schSeCode" name="schSeCode" >
						<option value="schSj">제목</option>
		<!-- 				<option value="schAdres">주소</option> -->
						<option value="schSopsrtStleCodeNm">상가형태</option>
						<option value="schConfmSttusCodeNm">진행상태</option>
						<option value="schUserNm">신청자명</option>
					</select>
					<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0);" class="mBtn1" id="btn_schTrade">검색</a>
				</form>
				<form id="reqForm" method="post">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="trdeThingRegistNo" name="trdeThingRegistNo" />
					<input type="hidden" id="srcPath" name="srcPath" value="${param.srcPath}" />
				</form>
			</div>
			<div class="gRt" align="right">
				<%-- <a href="${contextPath}/myPage/board/info/infoSave.do" class="mBtn1 primary">글쓰기</a> --%>
				<!-- <a href="javascript:void(0);" class="mBtn1 primary" id="btn_delete">삭제</a> -->
			</div>
			<!-- board -->
			<div class="mBoard1 noline">
				<table>
				<caption>매물점포 검토하기</caption>
				<colgroup>
					<col style="width:6%;">
					<col style="width:auto;">
					<col style="width:auto;">
					<col style="width:8%;">
					<col style="width:18%;">
					<col style="width:8%;">
					<col style="width:8%;">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">번호</th>
						<th scope="col">상가형태/제목</th>
						<th scope="col">주소</th>
						<th scope="col">신청자</th>
						<th scope="col">이메일/연락처</th>
						<th scope="col">진행상태</th>
						<th scope="col">첨부파일</th>
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
					<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
					<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
					<input type="hidden" id="userNo" name="userNo" />
					<input type="hidden" name="schSeCode" id="mSearchType" />
					<input type="hidden" name="schTxt" id="mSearchText" />
				</form>
				<div class="search">
					<select id="searchMobType" class="radius">
						<option value="schSj">제목</option>
						<option value="schSopsrtStleCodeNm">상가형태</option>
						<option value="schConfmSttusCodeNm">진행상태</option>
						<option value="schUserNm">신청자명</option>
					</select>
				
					<div class="box_search radius">
						<input type="text" id="searchMobText" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>
				
				<ul id="dataTbodyMob" class="list_board hasCheck">
				</ul>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
				
			</div>
<!-- content -->