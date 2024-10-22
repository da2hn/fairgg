<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/unity/unityBoard.js"/>"></script>
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
			<div class="warning">
				상업성 광고, 저속한 표현, 특정인에 대한 비방, 정치목적이나 성향, 반복적 게시물 등은 관리자에 의해 통보없이 삭제될 수 있습니다.<br>
				또한, 홈페이지를 통하여 불법유해 정보를 게시하거나 배포하면 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제74조에 의거 1년이하의 징역 또는 1천만원 이하의 벌금에 처해질 수 있습니다.
			</div>
			<div class="mSort1">
				<span class="cnt" id="totalCnt"></span>
				<div class="gRt">
					<form id="searchForm" method="post">
<!-- 					<form id="searchForm" method="post" onsubmit="return false;"> -->
						<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
						<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
						<input type="hidden" id="userNo" name="userNo" />
						<input type="hidden" name="pageIndex" value="" />
						<input type="hidden" name="pageIndexMob" value="" />
						<input type="hidden" name="pageIndexMobMax" value="" />
						<input type="hidden" id="crud" name="crud" />
						<input type="hidden" id="sn" name="sn" />
						<input type="hidden" id="upperBbsSn" name="upperBbsSn" value=""/>
						<!-- <input type="hidden" id="schCodeVal" name="schCodeVal" /> -->
						<!-- <input type="hidden" id="schTxtVal" name="schTxtVal" /> -->
						<input type="hidden" id="masterSn" name="masterSn" value="${dataList.masterSn}">
						<input type="hidden" id="bbsLc" name="bbsLc" value="${dataList.bbsLc}">
						<input type="hidden" id="bbsDc" name="bbsDc" value="${dataList.bbsDc}">
						<input type="hidden" id="bbsNm" name="bbsNm" value="${dataList.bbsNm}">
						<input type="hidden" id="atchmnflCo" name="atchmnflCo" value="${dataList.atchmnflCo}">
						<input type="hidden" id="answerAt" name="answerAt" value="${dataList.answerAt}">
						<input type="hidden" id="atchmnflAt" name="atchmnflAt" value="${dataList.atchmnflAt}">
						<input type="hidden" id="commentAt" name="commentAt" value="${dataList.commentAt}">
			
						<input type="hidden" name="menuGroupCode" id="menuGroupCode" value="${dataList.menuGroupCode}" />
						<input type="hidden" id="menuNm" name="menuNm" value="${dataList.bbsNm}">
						
						<input type="hidden" id="mob" name="mob" value="">
						
						<select title="구분" class="select" id="schCode" name="schCode" style="height:38px;">
							<option value=""><c:out value="전체"/></option>
							<option value="sj">제목</option>
							<option value="us">작성자</option>
							<option value="cn">내용</option>
						</select>
						
						<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" style="height:38px;" placeholder="검색어 입력">
						<a href="javascript:void(0);" class="mBtn1" id="btn_sch" onclick="fn_selectUnityList(1);" style="line-height:38px;height:38px;border:0;">검색</a>
						<!-- <a href="javascript:void(0);" class="mBtn1 l2 orange" id="btn_regist" style="line-height: 38px;height: 38px;border:0;"><span class="iPlus">등록</span></a> -->
					</form>
<!-- 				<form id="reqForm" method="post">

					</form> -->
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
					<col width="115px">
					<col width="115px">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">조회수</th>
					<th scope="col">작성자</th>
					<th scope="col">등록일</th>
				</tr>
				</thead>
				<tbody id="dataTbody">
					<tr>
						<td colspan="5">조회된 데이터가 없습니다.</td>
					</tr>
				</tbody>
				</table>
			</div>
			<!-- //board -->
			<!-- paging -->
			<div class="mPag"></div>
			<!-- //paging -->
			<c:if test="${fntnBbs.userNo eq sessionScope.user.userNo or '[ROLE_US04]' eq sessionScope.user.authorities}">
				<div class="mButton1 fLeft"><a href="javascript:void(0);" class="mBtn1 primary" id="btn_regist" style="display:none;">글쓰기</a></div>
			</c:if>
		</div>
	</div>
<%-- 	<h3 class="subtitle forMo">${dataList.bbsNm}</h3> --%>
	<h3 class="subtitle forMo">정보지원게시판</h3>
	<div class="fixTab"><div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div></div>
	<div class="wrap_inner forMo">
	
		<%-- <form id="searchMobForm" method="post">
			<input type="hidden" name="pageIndex" value="" />
			
			
			<input type="hidden" id="ssUserNo" name="ssUserNo" value="${sessionScope.user.userNo}" />
			<input type="hidden" id="ssUserRole" name="ssUserRole" value="${sessionScope.user.authorities}" />
			<input type="hidden" id="userNo" name="userNo" />
			
		</form> --%>
		
<!-- 		<div class="fixTab">
			<ul class="tab_common">
				<li><button onclick="location.href='integList.do'" class="active">통합게시판</button></li>
				<li><button onclick="location.href='/'">창업상담게시판</button></li>swiper_mypage
			</ul>
		</div> -->
		<div class="warning">
			상업성 광고, 저속한 표현, 특정인에 대한 비방, 정치적 목적이나 성향, 반복적 게시물 등은 관리자에 의해 통보없이 삭제될 수 있습니다.<br>
			또한, 홈페이지를 통하여 불법유해정보를 게시하거나 배포하면 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제74조에 의거 1년이하의 징역 또는 1천만원 이하의 벌금에 처해질 수 있습니다.
		</div>

		<div class="search">
			<select title="구분" class="radius" id="schCodeMob" name="schCode" style="height:38px;">
			<!-- <select id="searchMobType" class="radius"> -->
					<option value=""><c:out value="전체"/></option>
					<option value="sj">제목</option>
					<option value="us">작성자</option>
					<option value="cn">내용</option>
			</select>
			
			

			<div class="box_search">
				<input type="text" title="검색어" id="schTxtMob" placeholder="제목으로 검색">
				<button id="btnMobSearch">search</button>
			</div>
		</div>
		
		<div class="relative">
			<p class="totalCount">전체 <strong id="totalCntMob"></strong> 건</p>
			
			<c:if test="${fntnBbs.userNo eq sessionScope.user.userNo or '[ROLE_US04]' eq sessionScope.user.authorities}">
				<div class="box_btn w100 h26 radius charcoal fs12 medium"><button id="btn_registMob" style="display:none;">글쓰기</button></div>
			</c:if>
		</div>
		
		<!-- <div class="btn tar">
			<div class="box_btn w100 h26 radius"><button id="btn_registMob">등록</button></div>
		</div>
		
		<p class="totalCount" style="display:inline-block;">전체 <strong id="totalCntMob"></strong>건</p> -->
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
