<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/cmmn/headerAutocomplete.js"/>"></script>
<script type="text/javaScript" src="<c:url value="/static/js/cmmn/headerMenu.js"/>"></script>
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-BJ4V2NZJXF"></script> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SFWX36LQJN"></script>
<script>
	if(location.hostname != "localhost") {
	    if (window.location.protocol != "https:") {
	        window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
	    }
	
	    if (document.location.protocol == 'http:') {
	        document.location.href = document.location.href.replace('http:', 'https:');
	    }
	}

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

//   gtag('config', 'G-BJ4V2NZJXF');
  gtag('config', 'G-SFWX36LQJN');
  
  
  var replaceId  = /[<>()]/gi;
  
  $(document).ready(function(){
	  
	  $("#search").on("focusout", function() {
	        var x = $(this).val();
	        if (x.length > 0) {
	            if (x.match(replaceId)) {
	               x = x.replace(replaceId, "");
	            }
	            $(this).val(x);
	            
	        }
	    }).on("keyup", function() {
	        $(this).val($(this).val().replace(replaceId, ""));

	    });

	  
  });
  
</script>
<style>
.autoActive {
	background-color: #eeeeee;
}
</style>

<!--접근성 패널-->
	<header id="header" class="header">
		<!-- uh -->
		<div class="uh">
			<div class="bg">
				<h1><a href="/"><strong>가맹정보제공시스템</strong>프랜차이즈</a></h1>
				<button class="back forMo" onclick="back();"></button>
				<!-- 로그인 주석 22.06.21 -->
				<div class="gRt forPc"> 
					<%-- <a href="${contextPath}/board/service/serviceInfo.do">이용안내</a> --%>
					<c:if test="${!empty sessionScope.user }">
						<p class="member"><span>${sessionScope.user.userNm}</span></p>
						
						<c:if test="${sessionScope.user.userSeCode == 'US04' }">
						<a href="${contextPath}/myPage/user/user/userInfo.do" >마이페이지</a>
						<a href="/sysMngr/user/user/userList.do">시스템관리</a>
						<a href="${contextPath}/logout.do" class="iLog">로그아웃</a>
						</c:if>
						
						<c:if test="${sessionScope.user.userSeCode == 'US03' }">
						<a href="${contextPath}/myPage/user/user/userInfo.do" >마이페이지</a>
						<a href="${contextPath}/logout.do" class="iLog">로그아웃</a>
						</c:if>
						
					</c:if>
					<c:if test="${empty sessionScope.user }">
						<a href="${contextPath}/user/joinForm.do" >회원가입</a>
						<a href="${contextPath}/user/loginPage.do" class="iLog">로그인</a>
					</c:if>
				</div>
				
				<button class="home forMo" onclick="location.href='/'">홈</button>
				<button class="all forMo" onclick="aside_toggle();">전체메뉴</button>
			</div>
			
			<form id="unifiedSearchForm" method="post">
				<input type="hidden" id="userNo" value="${sessionScope.user.userNo }"/>
				<%-- <input type="hidden" id="ssUserRole" name="ssUserRole" value="<c:out value="${sessionScope.user.authorities}" />" /> --%>
				<input type=hidden id="hnd_schFrnchsNo" name="hnd_schFrnchsNo">
				<input type=hidden id="txt_schBrnd" name="txt_schBrnd">
				<input type=hidden id="year" name="year">
				<div class="search">
					<select name="slct_schBrnd" id="schLdClass" class="schLdClass">
						<option value="">통합검색</option>
					</select>
					<div class="box_search radius" onclick="search_view();">
						<input type="text" name="search" id="search" placeholder="검색하실 브랜드를 입력해주세요" autocomplete="off">
						<button type="button" id="btn_sch"></button>
					</div>
	
					<div class="layer_common layer_full layer_search">
						<div class="titleArea">
							<button type="button" class="back" onclick="search_view();"></button>
	
							<p class="box_input">
								<input type="text" name="searchMob" id="searchMob" placeholder="브랜드명 검색" class="w100p radius" autocomplete="off">
							</p>
	
							<button type="button" id="btn_schMob" class="searchBtn">검색</button>
						</div>
	
						<dl class="recent">
							<dt id="hist_delBtn">
								<!-- 최근검색어
								<button class="del">전체삭제</button> -->
							</dt>
							<dd id="hist_box" style="overflow-y: auto; height: 250px;">
							</dd>
	
							<dd>
								<div class="auto" id="autoSearch">
									검색어 자동완성						
									<span>
										OFF						
										<button type="button"></button>
									</span>
								</div>
							</dd>
						</dl>
					</div>
				</div>
			</form>
			
	<!-- 		<form id="unifiedSearchForm2" method="post"  style="display:none;">
				<div class="gRt" style="position: relative; margin-left: 20px" >
					<input type=hidden id="hnd_schFrnchsNoMob" name="hnd_schFrnchsNoMob">
					<select id="slct_schBrnd" name="slct_schBrnd" class="select schLdClass" title="대분류 업종" style="width: 20px;">
						<option value="">전체</option>
					</select>
					<input type="text" class="it" title="검색어" id="txt_schBrnd" name="txt_schBrnd" style="width: 220px;">
				</div>
			</form>
			<a href="javascript:void(0);" class="mBtn1" id="btn_sch"  style="display:none;position: absolute; top: 25px;">검색</a> -->
				
		</div>
		<!-- //uh -->
		<!-- search -->
		<!-- 중복 코드 제거 20220111 서가영 -->
		<!-- <div class="box_search forMo" onclick="toggle_view('searchArea');">
			<input type="text" name="" id="" placeholder="검색하실 브랜드를 입력해주세요">
			<button></button>
		</div> -->
		<!-- //search -->
		<!-- 레이어 - 검색 -->
		<div class="searchArea">

		</div>
		<!-- //레이어 - 검색 -->
		<!-- mh -->
		<div id="gnbNavi" class="mGnb forPc">
			<div class="bg" id="menuDiv">
			</div>
		</div>
		<!-- //mh -->
	</header>
	
	<!-- aside -->
	<aside id="aside" class="aside forMo">
		<div class="topArea">
			<!-- <a href="#">로그인하기</a> -->
<!-- 			<a href="#">로그아웃</a> -->
<%-- 			<a href="${contextPath}/board/service/serviceInfo.do">이용안내</a> --%>
			<h1><a href="/"><strong>가맹정보제공시스템</strong>프랜차이즈</a></h1>
			<!-- 로그인 주석 22.06.21 -->
			<%-- <div class="memberInfo">
				<c:if test="${!empty sessionScope.user }">
					<p class="member" style="margin-left: 20px;">${sessionScope.user.userNm }</a>
					<a href="${contextPath}/logout.do">로그아웃</a>
				</c:if>
				<c:if test="${empty sessionScope.user }">
					<p class="member">로그인 해주세요.</p>			
					<a href="${contextPath}/user/loginPage.do">로그인</a>
				</c:if>
			</div> --%>
			<button class="close" onclick="aside_toggle();"></button>
		</div>

		<div class="menu">
			<ul>
				<li class="use"><a href="${contextPath}/board/service/serviceInfo.do">이용안내</a></li>
				<!-- <li class="join"><a href="#">회원가입</a></li> -->
				<c:if test="${!empty sessionScope.user }">
				<li class="mypage"><a href="${contextPath}/myPage/user/user/userInfo.do" >마이페이지</a></li>
				</c:if>
				<c:if test="${sessionScope.user.userSeCode == 'US04' }">
					<li class="system"><a href="/sysMngr/user/user/userList.do">시스템관리</a></li>					
				</c:if>
			</ul>
		</div>

		<div class="category" id="menuDivMob">
<!-- 			<ul>
				<li class="hassub">
					<p>프랜차이즈 현황</p>

					<ul class="sub">
						<li><a href="franchiseInfo.html">프랜차이즈 정보</a></li>
						<li><a href="statisticsArea.html">업종 통계</a></li>
					</ul>
				</li>

				<li><a href="brandCompare.html">브랜드 비교검색</a></li>
				<li><a href="infoOpen.html">정보공개서 등록</a></li>
				<li><a href="fairTrade.html">공정거래 홍보관</a></li>
				<li><a href="survey.html">실태조사게시판</a></li>

				<li class="hassub">
					<p>정보지원게시판</p>

					<ul class="sub">
						<li><a href="boardList_total.html">통합게시판</a></li>
						<li><a href="boardList_counsel.html">창업상담게시판</a></li>
						<li><a href="#">상권심화분석</a></li>
						<li><a href="#">배너광장</a></li>
					</ul>
				</li>

				<li><a href="#">이용안내</a></li>
			</ul> -->
		</div>
	</aside>
	<!-- //aside -->
<!-- e : 메뉴 -->
