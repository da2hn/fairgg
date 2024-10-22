<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/unit_noticeList.js"/>"></script>
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
		<h5 class="mTitle2">관리자 게시판 관리</h5>
			<div class="mSort1 mt1">
				<form id="searchForm" method="post" onsubmit="return false;">
					<input type="hidden" name="pageIndex" value="" />
					<select title="게시판구분" class="select" id="unitType" name="unitType"></select>
					<!-- <select title="게시물구분" class="select" id="boardMngType" name="boardMngType">
						<option value="">전체</option>
						<option value="N">공지사항</option>
						<option value="I">정보지원</option>
					</select> -->
					<!-- 	<option value="C">직접입력</option> -->
					<select title="구분" class="select" id="schCode" name="schCode" disabled>
						<option value=""><c:out value="전체" /></option>
			<%-- 			<c:forEach var="code" items="${integList}">
							<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
						</c:forEach> --%>
					</select>
					<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0);" class="mBtn1" id="btnSearch">검색</a>
				</form>
				<form id="reqForm" method="post">
					<input type="hidden" id="crud" name="crud" />
					<input type="hidden" id="sn" name="sn" />
				<!-- 	<input type="hidden" id="noticeSn" name="noticeSn" />
					<input type="hidden" id="infoOthbcSn" name="infoOthbcSn" /> -->
					<input type="hidden" id="viewBoardMngType" name="viewBoardMngType" />
					<input type="hidden" id="viewUnitType" name="viewUnitType" />
				</form>
			</div>
		
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="번호, 제목, 등록일로 구성된 표입니다.">
				<caption>공지사항 관리</caption>
				<colgroup>
					<col width="95px">
					<col width="*">
					<col width="170px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">등록일</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="3">조회된 데이터가 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
			<!-- paging -->
			<div class="mPag"></div>
			<!-- //paging -->
			<div class="mButton1 fLeft">
				<a href="${contextPath}/myPage/mng/notice/noticeSave.do" class="mBtn1 primary">신규</a>
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
					<!-- <input type="hidden" name="boardMngType" id="mboardMngType" />
					<input type="hidden" name="schCode" id="mschCode" /> -->
					<!-- <input type="hidden" name="schTxt" id="mschTxt" /> -->

					<div class="search">
						<select title="게시판구분" class="radius" id="unitTypeMob" name="unitType" style="width:48%;margin-left:2%"></select>
						<!-- <select id="boardMngTypeMob" name="boardMngType" class="radius" style="width:20%">
							<option value="">전체</option>
							<option value="N">공지사항</option>
							<option value="I">정보지원</option>
						</select> -->
						<select id="schCodeMob" name="schCode" class="radius" style="width:48%;margin-left:2%" disabled>
							<option value=""><c:out value="전체" /></option>
						</select>
						<div class="box_search radius" style="width:98%;margin-left:2%;margin-top:10px">
							<input hidden="hidden" />
							<input type="text" id="schTxtMob" name="schTxt" placeholder="검색어를 입력하세요">
							<button type="button" id="btnMobSearch">search</button>
						</div>
					</div>
				</form>
				<div class="btn tar">
					<div class="box_btn w100 h26 radius"><button onclick="location.href='${contextPath}/myPage/mng/notice/noticeSave.do'">신규</button></div>
				</div>

				<ul id="dataTbodyMob" class="list_board hasCheck">
				</ul>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
		</div>
<!-- //content -->