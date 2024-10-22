<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/integList.js"/>"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/mobMenu/mobMenu.js"/>"></script>
<script type="text/javaScript">
$(document).ready(function() {
	var swiper_mypage = new Swiper('.swiper_mypage', {
		freeMode: true,
		slidesPerView: 'auto',
	});
	
})
</script>
		
		
	<article id="totalBoard" class="boardList"> 
	<!-- body -->
	<div class="body forPc">
		<div class="bg">
			<div class="mSort1">
				<span class="cnt" id="totalCnt"></span>
				<div class="gRt">
					<form id="searchForm" method="post" onsubmit="return false;">
						<input type="hidden" name="menuGroupCode" id="menuGroupCode" value="U05" />
						<input type="hidden" id="menuNm" name="menuNm" value="통합게시판">
					
						<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
						<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
						<input type="hidden" id="userNo" name="userNo" />
						<input type="hidden" name="pageIndex" value="" />
						<select title="공지사항및정보공개 구분" class="select" id="schCode" name="schCode" >
							<option value=""><c:out value="전체" /></option>
							<c:forEach var="code" items="${integList}">
								<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
							</c:forEach>
						</select>
						<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="제목으로 검색">
						<a href="javascript:void(0);" class="mBtn1" id="sch_btn">검색</a>
					</form>
					<form id="reqForm" method="post">
						<input type="hidden" id="crud" name="crud" />
						<input type="hidden" id="sn" name="sn" />
						<input type="hidden" id="schCodeVal" name="schCodeVal" />
						<input type="hidden" id="schTxtVal" name="schTxtVal" />
					</form>
				</div>
			</div>
			<!-- board -->
			<div class="mBoard1">
				<table summary="번호, 제목, 등록일로 구성된 표입니다.">
				<caption>공지사항</caption>
				<colgroup>
					<col width="90px">
					<col width="*">
					<col width="115px">
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
						<td colspan="9">조회된 데이터가 없습니다.</td>
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
	<h3 class="subtitle forMo">정보지원게시판</h3>
	<div class="wrap_inner forMo">
	
		<form id="searchMobForm" method="post">
			<input type="hidden" name="pageIndex" value="" />
			<input type="hidden" name="pageIndexMob" value="" />
			<input type="hidden" name="pageIndexMobMax" value="" />
			<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
			<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
			<input type="hidden" id="userNo" name="userNo" />
			<input type="hidden" name="schCode" id="mSearchType" />
			<input type="hidden" name="schTxt" id="mSearchText" />
		</form>
		
<!-- 		<div class="fixTab">
			<ul class="tab_common">
				<li><button onclick="location.href='integList.do'" class="active">통합게시판</button></li>
				<li><button onclick="location.href='/'">창업상담게시판</button></li>
			</ul>
		</div> -->
		<div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div>
		
		<div class="search">
			<select id="searchMobType" class="radius">
					<option value=""><c:out value="전체" /></option>
					<c:forEach var="code" items="${integList}">
						<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
					</c:forEach>
			</select>

			<div class="box_search">
				<input type="text" title="검색어" id="searchMobText" placeholder="제목으로 검색">
				<button id="btnMobSearch">search</button>
			</div>
		</div>

		<p class="totalCount">전체 <strong id="totalCntMob"></strong>건</p>
		<ul id="dataTbodyMob" class="list_board">
			<!-- <li class="notice">
				<div class="box">
					<a href="boardView_total.html">
						<div class="category">공지사항</div>
						<p class="subject">2021년 정보공개서 정기변경등록 (표준양식 및 서식안내) 2021년 정보공개서 정기변경등록 (표준양식 및 서식안내)</p>
						<p class="date">2021.09.24</p>
					</a>
				</div>
			</li>

			<li class="notice">
				<div class="box">
					<a href="#">
						<div class="category">공지사항</div>
						<p class="subject">프랜차이즈정보제공시스템 안정화 기간 안내</p>
						<p class="date">2021.09.24</p>
					</a>
				</div>
			</li>

			<li>
				<div class="box">
					<a href="#">
						<div class="category">시스템</div>
						<p class="subject">2021년 정보공개서 정기변경등록 (표준양식 및 서식안내)</p>
						<p class="date">2021.09.24</p>
					</a>
				</div>
			</li> -->
		</ul>

		<!-- <div class="box_btn block h40 radius white more"><button>더보기(<span>1</span>/<span>4</span>)</button></div> -->
		<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
	</div>
</article>
	<!-- //body -->
