<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/myPage/board/annymtyList.js"/>"></script>
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
			<h5 class="mTitle2">익명신고 관리</h5>
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<div class="mSort1 mt1">
					<select name="schSeCode" id="schSeCode" title="" class="select">
						<option value="1">제목</option>
						<option value="2">내용</option>
					</select>
					<input type="text" class="it" title="검색어" name="schTxt" id="schTxt" placeholder="검색어를 입력하세요">
					<a href="javascript:void(0)" id="btnSearch" class="mBtn1">검색</a>
				</div>
			</form>
			<form id="reqForm" method="post">
				<input type="hidden" id="infoDcsRegistNo" name="infoDcsRegistNo" />
			</form>
			<div class="mButton1 right" style="margin-bottom:8px;">
				<a href="javascript:void(0)" id="btnDelete" class="mBtn1 gray">삭제</a>
			</div>
			<!-- 정보공개서 번호 -->
			<input type="hidden" id="infoDcsRegistNo" name="infoDcsRegistNo" />
					
			<!-- board -->
			<div class="mBoard1 noline">
				<table summary="선택, 번호, 프랜차이즈, 신청자, 접수자, 진행상태, 신청일, 파일첨부로 구성된 테이블입니다.">
					<caption>정보공개서 관리 - 교육신청 관리 - 번호, 구분, 신청자명, 연락처/이메일, 사전 질의, 수료여부/신청일</caption>
						<colgroup>
							<%-- <col style="width:6%;">
							<col style="width:12%;">
							<col style="width:auto;">
							<col style="width:10%;">
							<col style="width:18%;">
							<col style="width:8%;"> --%>
							<col style="width:6%;">
							<col style="width:8%;">
							<col style="width:auto;">
							<%-- <col style="width:15%;"> --%>
							<col style="width:20%;">
							<col style="width:10%;">
							<col style="width:10%;">
						</colgroup>

						<thead>
							<tr>
								<th scope="col">선택</th>
								<th scope="col">번호</th>
								<th scope="col">제목</th>
								<!-- <th scope="col">신청자</th> -->
								<th scope="col">연락처/이메일</th>
								<th scope="col">익명질의</th>
								<th scope="col">파일첨부</th>
							</tr>
						</thead>
					<tbody id="dataTbody">
						<tr>
							<td colspan="6">조회된 내용이 없습니다.</td>
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
					<input type="hidden" name="comCode" id="mComCode" />
					<input type="hidden" name="schTxt" id="mSchTxt" />
				</form>
				
				<div class="search">
					<select id="schSeCodeMob" title="" class="radius" style="width:calc(35% - 8px)">
						<option value="1">제목</option>
						<option value="2">내용</option>
					</select>
				
					<div class="box_search radius" style="width:calc(65% - 8px)">
						<input type="text" id="schTxtMob" placeholder="검색어를 입력하세요">
						<button id="btnMobSearch">search</button>
					</div>
				</div>
				<div class="btn tar">
					<div class="box_btn w100 h26 radius "><button id="btnMobDown" style="width:100%">다운로드</button></div>
					<div class="box_btn w100 h26 radius gray"><button id="btnMobDelete" style="width:100%">삭제</button></div>
				</div>
				<ul id="dataTbodyMob" class="list_board hasCheck">
					
				</ul>

				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
				
				<!-- <div class="btn_col2 col2">
					<div class="box_btn block h40 radius"><button>등록</button></div>
					<div class="box_btn block h40 radius gray" id=""><button>삭제</button></div>
				</div> -->
			</div>

<!-- //content -->