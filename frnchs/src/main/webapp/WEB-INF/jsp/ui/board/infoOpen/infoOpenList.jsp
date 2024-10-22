<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/board/infoOpenList.js"/>"></script>

<div id="cnt">
	<!-- <div class="mKeysub1 forPc">
		<div class="bg">
			<h3><span>정보지원게시판</span></h3>
			<p>경기도 가맹사업 정보공개서 심사·등록·거부·취소 등에 관한 정보를 제공하는 게시판입니다.</p>
		</div>
	</div> -->
	
	<article id="totalBoard" class="boardList">
		<!-- body -->
		<div class="body forPc">
			<div class="bg">
				<div class="mSort1">
					<span class="cnt" id="totalCnt"></span>
					<div class="gRt">
						<form id="searchForm" method="post" onsubmit="return false;">
							<input type="hidden" id="ssUserNo" name="ssUserNo" value="<c:out value="${sessionScope.user.userNo}" />" />
							<input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" />
							<input type="hidden" id="userNo" name="userNo" />
							<input type="hidden" name="pageIndex" value="1" />
							<select title="정보공개구분" class="select" id="schCode" name="schCode" >
								<option value=""><c:out value="전체" /></option>
								<c:forEach var="code" items="${schCodeList}">
									<c:if test="${code.codeValue ne 'IN03' }">
										<option value="${code.codeValue}"><c:out value="${code.codeValueNm}" /></option>
									</c:if>
								</c:forEach>
							</select>
							<input type="text" class="it" title="검색어" id="schTxt" name="schTxt" placeholder="제목으로 검색">
							<a href="javascript:void(0);" class="mBtn1" id="btn_sch">검색</a>
						</form>
						<form id="reqForm" method="post">
							<input type="hidden" id="crud" name="crud" />
							<input type="hidden" id="infoOthbcSn" name="infoOthbcSn" />
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
		<!-- //body -->
		<h3 class="subtitle forMo">정보지원게시판</h3>
	
		<div class="wrap_inner forMo">
			<div class="fixTab">
				<ul class="tab_common">
					<li><button onclick="location.href='boardList_total.html'" class="active">통합게시판</button></li>
					<li><button onclick="location.href='boardList_counsel.html'">창업상담게시판</button></li>
				</ul>
			</div>
	
			<div class="search">
				<select name="" id="" class="radius">
					<option value="시스템안내">시스템안내</option>
					<option value="공지사항">공지사항</option>
					<option value="시스템안내">시스템안내</option>
					<option value="시스템안내">시스템안내</option>
				</select>
	
				<div class="box_search">
					<input type="text" name="" id="" placeholder="검색어를 입력해주세요">
					<button>search</button>
				</div>
			</div>
	
			<p class="totalCount">전체 <strong>2,935</strong> 건</p>
			<ul class="list_board">
				<li class="notice">
					<div class="box">
						<!-- <a href="boardView_counsel.html"> -->
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
				</li>
			</ul>
	
			<div class="box_btn block h40 radius white more"><button>더보기(<span>1</span>/<span>4</span>)</button></div>
		</div>
	</article>
<script>
function tabFix() {
	var pos = $(window).scrollTop();
	var hdPos = $('#header').scrollTop();
	var tab = $('.fixTab');

	if (pos > hdPos) {
		tab.addClass('fixed');
	} else {
		tab.removeClass('fixed');
	}
}

$(window).scroll(function() {
	tabFix();
});
</script>
</div>
