<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javaScript" src="<c:url value="/static/js/ui/main/main.js"/>"></script>
<style>

/* .mMain7{background-color:#fff;border-top:1px solid #4872b3;padding:25px 0;} */
/* .mMain7 .swiper-container{padding:0 50px 0 48px;} */
/* .mMain7 .swiper-slide{border:1px solid #d3d5dc;background-color:#fff;border-radius:10px;text-align:center;overflow:hidden;width:170px !important;margin-left:8px;line-height:70px;height:70px;} */
/* .mMain7 .swiper-button-prev, */
/* .mMain7 .swiper-button-next{top:0;margin:0;left:0;background:url(../images/ico_prev3.png) 50% 50% no-repeat #fff;width:53px;height:72px;} */
/* .mMain7 .swiper-button-next{left:auto;right:0;background-image:url(../images/ico_next3.png)} */
</style>
<script>
/* 	const currentURL = window.location.href;
	console.log(currentURL);
	
	if(currentURL.includes('localhost') == true){
		location.href = "https://fair.gg.go.kr";	
	}else if(currentURL.includes('http')){
		location.href = "https://fair.gg.go.kr";
	} */
	

</script>
<!-- 카테고리 -->
<div class="topCategory forMo">
	<div class="swiper-container swiper_category forMo">
		<div id="mainMenuMob" class="swiper-wrapper">
	<!-- 		<div class="swiper-slide"><button>프랜차이즈 현황</button></div>
			<div class="swiper-slide"><button>브랜드 비교검색</button></div>
			<div class="swiper-slide"><button>정보공개서 등록</button></div>
			<div class="swiper-slide"><button>공정거래 홍보관</button></div>
			<div class="swiper-slide"><button>커뮤니케이션</button></div> -->
			<!-- <div class="swiper-slide"><button>시민 참여 마당</button></div> -->
		</div>
	</div>
</div>
<!-- //카테고리 -->

<!-- mKeymain -->
<div class="mKeymain">
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<!-- slider -->
			<div class="swiper-slide">
				<div class="img" style="background-image:url('/static/images/img_keymain1.jpg');"><img src="/static/images/img_keymain1_m.jpg" alt="프랜차이즈 창업 시 브랜드 비교해 보세요. 경기도 가맹정보제공시스템에 등록된 다양한 브랜드를 비교해 보세요."></div>
				<!-- <div class="img" style="background-image:url('/static/images/img_keymain1.jpg'); background-size: 800px;">
					<img src="/static/images/img_keymain1.jpg" alt="프랜차이즈 창업 시 브랜드 비교해 보세요. 경기도 가맹정보제공시스템에 등록된 다양한 브랜드를 비교해 보세요.">
				</div> -->
				
				<div class="txt">
					<div class="ti"><em>변화의 중심, 기회의 경기</em></div>
					<div class="tx">도정 3대 비전 : 더 많은 기회, 더 고른 기회, 더 나은 기회</div>
					<a href= https://www.gg.go.kr/contents/contents.do?ciIdx=1503&menuId=1826 class="bt" style= "position : relative" >경기도 비전</a>
				</div>
			</div>
			<!-- //slider -->

			<!-- slider -->
			<div class="swiper-slide">
				<div class="img" style="background-image:url('/static/images/img_keymain2.jpg');"><img src="/static/images/img_keymain2_m.jpg" alt="가맹사업 정보공개서 등록하세요. 가맹계약 체결시에는 정보공개서를 제공하셔야 합니다."></div>
				<div class="txt">
					<div class="ti">가맹사업 <em>정보공개서</em> 등록하세요.</div>
					<div class="tx">가맹계약 체결시에는 정보공개서를 제공 하셔야 합니다.</div>
					<a href="/board/infoOpenReg/infoOpenReg.do" class="bt">정보공개서등록 안내서비스</a>
				</div>
			</div>
			<!-- //slider -->

			<!-- slider -->
			<div class="swiper-slide">
				<div class="img" style="background-image:url('/static/images/img_keymain3.jpg');"><img src="/static/images/img_keymain3_m.jpg" alt="경기도 공공배달앱을 활용하세요. 모두가 웃는 공공상생의별 배달특급입니다."></div>
				<div class="txt">
					<div class="ti">경기도 <em>공공배달앱</em>을 활용하세요.</div>
					<div class="tx">모두가 웃는 공공상생의별 배달특급 입니다.</div>
					<a href="https://www.specialdelivery.co.kr/" target="_blank" class="bt">경기도 공공배달앱 서비스</a>
					
				</div>
			</div>
			<!-- //slider -->

			<!-- slider -->
			<div class="swiper-slide">
				<div class="img" style="background-image:url('/static/images/img_keymain4.jpg');"><img src="/static/images/img_keymain4_m.jpg" alt="공정거래 분쟁은 공정거래지원센터로 문의해 주세요."></div>
				<div class="txt">
					<div class="ti" style="font-size:px" >프랜차이즈 <em>창업</em>시 <br>브랜드 비교해 보세요.</div>
					<div class="tx">경기도 가맹정보제공시스템에 등록된 다양한 브랜드를 비교해 보세요.</div>
					<!-- <a href="https://www.gg.go.kr/ubwutcc-main" target="_blank" class="bt">공정거래지원센터 문의서비스</a> -->
					<a href="/fran/search/searchList.do" class="bt">브랜드비교검색 지원서비스</a>
				</div>
			</div>
			<!-- //slider -->

			<!-- slider -->
			<div class="swiper-slide">
				<div class="img" style="background-image:url('/static/images/img_keymain5.jpg');"><img src="/static/images/img_keymain5_m.jpg" alt="프랜차이즈 안심창업 상담 신청해주세요."></div>
				<div class="txt">
					<div class="ti">경기도 <em>프리랜서 온라인 플랫폼</em>을 <br>활용해 보세요.</div>
					<div class="tx">법률상담, 일감 정보, 교육 등 프리랜서를 위한 토탈 서비스 지원</div>
					<a href="https://www.gg.go.kr/free/web/main.do" target="_blank" class="bt">프리랜서 온라인 플랫폼</a>
				</div>
			</div>
			<!-- //slider -->
		</div>
		
		<!-- pagination -->
		<div class="swiper-pagination forMo"></div>
		<!-- //pagination -->
		
		<!-- Add Arrows -->
		<div class="swiper-button-next forPc"></div>
		<div class="swiper-button-prev forPc"></div>
		<!-- //Arrows -->
		
	</div>
</div>
<!-- //mKeymain -->

<!-- main5 -->
<!-- 임시 주석(2022.04.08) -->
 <div class="mMain5 forPc"> 
	<div class="gLeft">
		<div class="con">
			<strong class="tit"><em>통합게시판</em></strong>
			
			<div class="swiper-container swiper_board" style="padding-bottom: 30px;height:150px;">
				<div id="mainTbodyL" class="swiper-wrapper">
					<%-- <div class="swiper-slide">
						<ul>
							<c:forEach var="total" items="${totalList}" varStatus="status" begin="0" end="3">
								<li><a href="${total.href}" target="_blank">${total.sj}</a></li>
							</c:forEach>
						</ul>
					</div>	
					<div class="swiper-slide">
						<ul>
							<c:forEach var="total" items="${totalList}" varStatus="status" begin="4" end="7">
								<li><a href="${total.href}" target="_blank">${total.sj}</a></li>
							</c:forEach>
						</ul>
					</div>	
					<div class="swiper-slide">
						<ul>
							<c:forEach var="total" items="${totalList}" varStatus="status" begin="8" end="11">
								<li><a href="${total.href}" target="_blank">${total.sj}</a></li>
							</c:forEach>
						</ul>
					</div>	
					<div class="swiper-slide">
						<ul>
							<c:forEach var="total" items="${totalList}" varStatus="status" begin="12" end="15">
								<li><a href="${total.href}" target="_blank">${total.sj}</a></li>
							</c:forEach>
						</ul>
					</div>	
					<div class="swiper-slide">
						<ul>
							<c:forEach var="total" items="${totalList}" varStatus="status" begin="16" end="19">
								<li><a href="${total.href}" target="_blank">${total.sj}</a></li>
							</c:forEach>
						</ul>
					</div> --%>	
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
	<div class="gRight">
		<div class="con">
			<strong class="tit"><em>자료게시판</em></strong>
			<div class="swiper-container swiper_board" style="padding-bottom: 30px;height:150px;">
				<div id="mainTbodyR" class="swiper-wrapper">
					<%-- <div class="swiper-slide">
						<ul>
							<c:forEach var="ggBbs" items="${ggBbsList}" varStatus="status" begin="0" end="3">
								<li><a href="${ggBbs.href}" target="_blank">${ggBbs.subject}</a></li>
							</c:forEach>
						</ul>
					</div>	
					<div class="swiper-slide">
						<ul>
							<c:forEach var="ggBbs" items="${ggBbsList}" varStatus="status" begin="4" end="7">
								<li><a href="${ggBbs.href}" target="_blank">${ggBbs.subject}</a></li>
							</c:forEach>
						</ul>
					</div>	
					<div class="swiper-slide">
						<ul>
							<c:forEach var="ggBbs" items="${ggBbsList}" varStatus="status" begin="8" end="11">
								<li><a href="${ggBbs.href}" target="_blank">${ggBbs.subject}</a></li>
							</c:forEach>
						</ul>
					</div>	
					<div class="swiper-slide">
						<ul>
							<c:forEach var="ggBbs" items="${ggBbsList}" varStatus="status" begin="12" end="15">
								<li><a href="${ggBbs.href}" target="_blank">${ggBbs.subject}</a></li>
							</c:forEach>
						</ul>
					</div>	
					<div class="swiper-slide">
						<ul>
							<c:forEach var="ggBbs" items="${ggBbsList}" varStatus="status" begin="16" end="19">
								<li><a href="${ggBbs.href}" target="_blank">${ggBbs.subject}</a></li>
							</c:forEach>
						</ul>
					</div>	 --%>
				</div>
				<div class="swiper-pagination"></div>
			</div>		
		</div>
	</div>
</div>
<!-- //임시 주석(2022.04.08) -->
<!-- //main5 -->
	
<!-- mobile -->
	<!-- 경기도 소식 -->
	<!-- 임시 주석(2022.04.08) -->
<!-- 	<dl class="news forMo"> -->
<!-- 		<dt>경기도 소식</dt> -->
<!-- 		<dd> -->
<!-- 			<div class="swiper-container swiper_news"> -->
<!-- 				<div class="swiper-wrapper"> -->
<%-- 					<jsp:useBean id="now" class="java.util.Date" scope="request"/> --%>
<%-- 					<fmt:parseNumber  value="${now.time/(1000*60*60*24)}" integerOnly="true" var="nowDays" scope="request"/> --%>
<%-- 					<c:forEach var="ggNews" items="${ggNewsList}" varStatus="status" begin="0" end="10">	 --%>
<%-- 						<fmt:parseDate var="newsDate" value="${ggNews.date}" pattern="yyyy.MM.dd"/> --%>
<%-- 						<fmt:parseNumber  value="${newsDate.time/(1000*60*60*24)}" integerOnly="true" var="targetDays" scope="request"/>	 --%>
<%-- 						<c:set value="${nowDays - targetDays}" var="dateDiff"/> --%>
<!-- 						<div class="swiper-slide"> -->
<%-- 						<c:choose> --%>
<%-- 						    <c:when test="${dateDiff lt 8}"> --%>
<%-- 						    	<a href="${ggNews.href}" target="_blank">${ggNews.subject}<span class="new" style="display:block;"></span></a> --%>
<%-- 						    </c:when> --%>
<%-- 						    <c:otherwise> --%>
<%-- 						    	<a href="${ggNews.href}" target="_blank">${ggNews.subject}</a> --%>
<%-- 						    </c:otherwise> --%>
<%-- 						</c:choose> --%>
<!-- 						</div> -->
<%-- 					</c:forEach> --%>
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="swiper-button-prev"></div> -->
<!-- 			<div class="swiper-button-next"></div> -->
<!-- 		</dd> -->
<!-- 	</dl> -->
	<!-- //임시 주석(2022.04.08) -->
	<!-- //경기도 소식 -->
	
	<!-- 금주의 인기검색 -->
	<div class="keyword forMo">
		<h3>
			금주의 인기 검색 브랜드
<!-- 			<a href="#" class="more"></a> -->
		</h3>
	
		<div class="swiper-container swiper_keyword">
			<div class="swiper-wrapper">
				<c:forEach var="top" items="${topTenList}" varStatus="status" begin="0" end="10">
					<div class="swiper-slide">
						<c:choose>
							<c:when test="${fn:length(top.schBrdWord) > 14}">
								<a href="/fran/search/unifiedSearchBrandInteg.do?frnchsNo=${top.frnchsNo}&brandYear=${top.year}"><span><c:out value="${fn:substring(top.schBrdWord,0,13)}"/>....</span></a>
							</c:when>
							<c:otherwise>
								<a href="/fran/search/unifiedSearchBrandInteg.do?frnchsNo=${top.frnchsNo}&brandYear=${top.year}"><span>${top.schBrdWord}</span></a>
							</c:otherwise> 
						</c:choose>
					</div>
				</c:forEach>
<!-- 				<div class="swiper-slide">
					<a href="#"><span>세븐일레븐</span></a>
				</div>
	
				<div class="swiper-slide">
					<a href="#"><span>본죽</span></a>
				</div>
	
				<div class="swiper-slide">
					<a href="#"><span>파리바게트</span></a>
				</div>
	
				<div class="swiper-slide">
					<a href="#"><span>뚜레쥬르</span></a>
				</div> -->

			</div>
	
			<div class="swiper-pagination"></div>
		</div>
	</div>
	<!-- //금주의 인기검색 -->
	
	<!-- 배너 - 설문조사 -->
	<div class="bnr_survey forMo">
		<a href="/board/annymty/annymtyBoard.do">
			<img src="/static/images/bnr_survey.jpg" alt="설문조사 참여하기">
	
			<dl>
				<dt><span>허위·부실</span>익명제보 하기</dt>
				<dd>
					허위 과장된 프랜차이즈 정보에 대해 제보해 주세요
				</dd>
			</dl>
		</a>
	</div>
	<!-- //배너 - 설문조사 -->
	
	<!-- 경기도 공정거래 홍보관 -->
	<div class="video forMo">
		<h3 class="relative">
			경기도 공정거래 홍보관
			<a href="/fairTrade/fairTradePr/fairTradePrList.do" class="more"></a>
		</h3>
	
		<div class="swiper-container swiper_video">
			<div class="swiper-wrapper">
<!--  				<div class="swiper-slide">
					<div class="box">
						<div class="video">
							<iframe src="https://www.youtube.com/embed/nu9citisp68?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
						<p class="title">경기도 유통공정거래교육 홍보영상</p>
						<p class="date">2021.09.24</p>
					</div>
				</div>			
 -->
				<c:choose>
	 				<c:when test="${!empty education}">
						<c:forEach var="data" items="${education}">
							<c:set var="req" value="${pageContext.request}" />
							<div class="swiper-slide">
								<div class="box">
									<div class="video" style="padding-bottom:0;">
							 			<video width="100%" height="100%" style="min-height: 260px;" muted playsinline controls preload="metadata">
											<source src="/file/downloadFile.do?atchmnflNo=${data.atchmnflNo}&fileSn=${data.fileSn }&fileKey=${data.fileKey }#t=0.001" type="video/mp4">
										</video>
									</div>
									<p class="title">${data.sj }</p>
									<p class="date">${data.registDt }</p>
								</div>
							</div>
						</c:forEach>
	 				</c:when>
	 				<c:otherwise>
	 					<p class="empty tac" style="width:100%">등록된 영상이 없습니다.</p>
	 				</c:otherwise>
				</c:choose>
			</div>
			<c:choose>
		 		<c:when test="${!empty education}">
					<div class="swiper-pagination"></div>
				</c:when>
			</c:choose>
		</div>
	</div>
	<!-- //경기도 공정거래 홍보관 -->
	
	<!-- 인기 프랜차이즈 TOP10 -->
		<div class="franchise forMo">
			<h3>
				인기 프랜차이즈 검색 TOP 100
				<!-- <a href="franchiseInfo.html" class="more"></a> -->
			</h3>
			<div class="wrapBox">
				<div class="swiper-container swiper_franchise">
					<div class="swiper-wrapper" id="topListMob">
					</div>
				</div>
			</div>
		</div>
		<!-- //인기 프랜차이즈 TOP10 -->
	
	<!-- 통합게시판 -->
	<div class="board forMo">
		<form id="searchForm" method="post">
			<input type="hidden" name="pageIndex" value="" />
			<input type="hidden" name="pageIndexMax" value="" />
			<input type="hidden" id="mob" name="mob" value="Y"/>
			<input type="hidden" id="firstIndex" name="firstIndex" value="2"/>
		</form>
		<form id="reqForm" method="post">
			<input type="hidden" id="bbsNm" name="bbsNm" value=""/>
			<input type="hidden" id="crud" name="crud" />
			<input type="hidden" id="masterSn" name="masterSn" />
			<input type="hidden" id="sn" name="sn" />
		</form>
		<h3 class="relative">
			통합게시판
	
			<a id="integMore" class="more"></a>
		</h3>
	
		<ul id="dataTbody">
<!-- 			<li>
				<a href="#">
					<div class="box">
						<p class="category notice">공지사항</p>
						<p class="subject">2021년 정보공개서 정기변경등록 (표준양식 및 서식안내)</p>
						<p class="date">2021.09.24</p>
					</div>
				</a>
			</li>
	 -->
<!-- 			<li>
				<a href="#">
					<div class="box">
						<p class="category">시스템</p>
						<p class="subject">프랜차이즈정보제공시스템 안정화 기간 안내</p>
						<p class="date">2021.09.24</p>
					</div>
				</a>
			</li>
	
			<li>
				<a href="#">
					<div class="box">
						<p class="category">시스템</p>
						<p class="subject">프랜차이즈정보제공시스템 안정화 기간 안내</p>
						<p class="date">2021.09.24</p>
					</div>
				</a>
			</li> -->
		</ul>
	
		<div id="paging" class="box_btn block h40 radius"><button id="pagingMob"></button></div>
	</div>
	<!-- //통합게시판 -->
	
	<!-- 가맹사업 분쟁조정 신청 -->
	<div class="bnr forMo">
		<a href="https://www.gg.go.kr/ubwutcc-main" target="_blank">
			<img src="/static/images/bnr_apply.jpg" alt="가맹사업 분쟁조정 신청 - 프랜차이즈 관련 분쟁준비, 가맹사업 분쟁조정을 통해 해결하세요">
	
			<dl>
				<dt>가맹사업 <span>분쟁조정</span> 신청</dt>
				<dd>
					프랜차이즈 관련 분쟁준비,<br>
					가맹사업 분쟁조정을 통해 해결하세요
				</dd>
			</dl>
		</a>
	</div>
	<!-- //가맹사업 분쟁조정 신청 -->
<!-- //mobile -->

<!-- gmain2 -->
<div class="gMain2 forPc" style="margin-top:0">
	<div class="bg">
		<!-- main1 -->
		<div class="mMain1">
			<h3>프랜차이즈 점포수 분포 현황</h3>
<!-- 			<a href="/stat/franStatList.do" class="iMore">더보기</a> -->
			<div class="con">
				<div class="lCnt r11" style="top:70px;left:99px;"><span class="t">서울</span><span class="c"></span></div>
				<div class="lCnt r26" style="top:290px;left:232px;"><span class="t">부산</span><span class="c"></span></div>
				<div class="lCnt r27" style="top:225px;left:203px;"><span class="t">대구</span><span class="c"></span></div>
				<div class="lCnt r28" style="top:86px;left:58px;"><span class="t">인천</span><span class="c"></span></div>
				<div class="lCnt r29" style="top:285px;left:68px;"><span class="t">광주</span><span class="c"></span></div>
				<div class="lCnt r30" style="top:191px;left:122px;"><span class="t">대전</span><span class="c"></span></div>
				<div class="lCnt r31" style="top:241px;left:247px;"><span class="t">울산</span><span class="c"></span></div>
				<div class="lCnt r36" style="top:151px;left:105px;"><span class="t">세종</span><span class="c"></span></div>
				<div class="lCnt r41 selected" style="top:104px;left:129px;"><span class="t">경기</span><span class="c"></span></div>
				<div class="lCnt r42" style="top:68px;left:179px;"><span class="t">강원</span><span class="c"></span></div>
				<div class="lCnt r43" style="top:144px;left:147px;"><span class="t">충북</span><span class="c"></span></div>
				<div class="lCnt r44" style="top:174px;left:66px;"><span class="t">충남</span><span class="c"></span></div>
				<div class="lCnt r45" style="top:239px;left:94px;"><span class="t">전북</span><span class="c"></span></div>
				<div class="lCnt r46" style="top:310px;left:104px;"><span class="t">전남</span><span class="c"></span></div>
				<div class="lCnt r47" style="top:169px;left:198px;"><span class="t">경북</span><span class="c"></span></div>
				<div class="lCnt r48" style="top:267px;left:156px;"><span class="t">경남</span><span class="c"></span></div>
				<div class="lCnt r50" style="top:379px;left:101px;"><span class="t">제주</span><span class="c"></span></div>
			</div>
		</div>
		<!-- //main1 -->
		<!-- main2 -->
		<div class="mMain3">
			<h3>관심 업종 TOP 5</h3>
			<!-- <a href="###" class="iMore">더보기</a> -->
			<div class="con">
				<div class="mGraph1"><div class="fav_top3" id="fav_top3" style="position:relative; top: -30px; right: 8px;"></div></div>
			</div>
		</div>
		<!-- //main2 -->
		<!-- main3 -->
		<div class="mMain3">
			<div class="top10">
				<div class="title">
					<h2 style="margin-top: 35px;">
						인기 프랜차이즈 검색
						<span>TOP 100</span>
					</h2>
	
					<div class="swiper-pagination"></div>
				</div>
	
				<div class="swiper-container swiper_keyword" style="margin-top: 20px;">
					<div class="swiper-wrapper" id="topList">

					</div>
				</div>
			</div>
		</div>
		<!-- //main3 -->
	</div>                                               
</div>
<!-- //gmain2 -->

<!-- main4 -->
<div class="mMain4 forPc">
	<div class="bg">
		<div class="list1" style="display:flex;justify-content:center;">
			<ul>
			<li class="i2"><a href="/fran/search/searchList.do">프랜차이즈 정보<br> 조회 서비스</a></li>
			<li class="i3"><a href="/board/infoOpenReg/infoOpenReg.do">정보공개서<br>등록안내</a></li>
			<li class="i5"><a href="/fairTrade/fairTradePr/fairTradePrList.do">가맹거래홍보관</a></li>
			<li class="i4"><a href="https://www.gg.go.kr/gg_info_center" target="_blank">소비자정보센터</a></li>
			<!-- <li class="i6"><a href="/board/report/reportSave.do">정보공개서<br>관련제보</a></li> -->
			<li class="i7"><a href="/board/banner/bannerList.do">배너광장</a></li>
			<li class="i1"><a href= https://www.gg.go.kr/contents/contents.do?ciIdx=1503&menuId=1826 target="_blank" style = "background-size:95px;">경기도 비전</a></li>
			<li class="i8"><a href="/board/annymty/annymtyBoard.do">허위·부실정보<br>익명제보센터</a></li>

<!-- 			<li class="i3"><a href="/expr/owner/ownerList.do">체험형<br> 창업지원 서비스</a></li> -->
<!-- 			<li class="i4"><a href="/board/trade/tradeList.do">점포 거래<br> 지원 서비스 </a></li> -->
<!-- 			<li class="i5"><a href="/fran/promo/promoList.do">이 달의<br> 착한 가맹점 </a></li> -->
			</ul>
		
			<!-- <div class="top10">
				<div class="title">
					<h3 style="margin-top: 35px;">
						인기 프랜차이즈 검색
						<span>TOP 100</span>
					</h3>
	
					<div class="swiper-pagination"></div>
				</div>
	
				<div class="swiper-container swiper_keyword" style="margin-top: 10px;">
					<div class="swiper-wrapper" id="topList">

					</div>
				</div>
			</div> -->
		</div>
		
		<div class="list2">
			<a href="https://www.gg.go.kr/ubwutcc-main" target="_blank">
				<strong class="ti">가맹사업 <em>분쟁조정</em> 신청</strong>
				<span class="tx">프랜차이즈 관련하여 분쟁 준비중이세요?  분쟁조정을 통해 해결하세요.</span>
			</a>
		</div>
	</div>
</div>
<!-- //main4 -->
<!-- main6 -->
<div class="mMain6 forPc">
	<div class="bg">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide"><a href="http://www.president.go.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_1.png" alt="청와대"></a></div>
				<div class="swiper-slide"><a href="https://www.assembly.go.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_2.png" alt="대한민국국회"></a></div>
				<div class="swiper-slide"><a href="https://www.mois.go.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_3.png" alt="안전행정부"></a></div>
				<div class="swiper-slide"><a href="https://www.gg.go.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/logo_footer2_new1.png" alt="세계속의 경기도"></a></div>
				<div class="swiper-slide"><a href="https://www.ftc.go.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_5.png" alt="공정거래위원회"></a></div>
				<div class="swiper-slide"><a href="https://www.seoul.go.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_6.png" alt="서울특별시"></a></div>
				<div class="swiper-slide"><a href="https://www.incheon.go.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_7.png" alt="인천광역시"></a></div>
				<div class="swiper-slide"><a href="https://www.busan.go.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_8.png" alt="부산광역시"></a></div>
				<div class="swiper-slide"><a href="http://www.kofair.or.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_9.png" alt="한국공정거래조정원"></a></div>
				<div class="swiper-slide"><a href="https://www.koreanbar.or.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_10.png" alt="대한변호사협회"></a></div>
				<div class="swiper-slide"><a href="https://www.ftaa.or.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_11.png" alt="대한가맹거래사업회"></a></div>
				<div class="swiper-slide"><a href="http://www.ikfa.or.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_12.png" alt="KFA한국프랜차이즈산업협회"></a></div>
				<div class="swiper-slide"><a href="http://www.franchisee.kr/" target="_blank" title="새창에서 열림"><img src="/static/images/ico_main6_13.png" alt="전국가맹점주협의회"></a></div>
			</div>
			<!-- Add Arrows -->
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</div>
	</div>
</div>
<!-- //main6 -->
<!-- //main7 -->
<!-- <div class="mMain7"> -->
<!-- 	<div class="bg"> -->
<!-- 		<a href="https://www.kogl.or.kr/info/license.do" target="_blank"> -->
<!-- 		<img src="/static/images/logo_openlicense.jpg" alt="공공누리 공공저작물"> -->
<!-- 		</a> -->
<!-- 		<strong class="tit"><em>공정경제과     담당자 : 공정경제과     전화 : 031)8008-5553</em></strong> -->
<!-- 	</div> -->
<!-- </div> -->
<!-- //main7 -->

