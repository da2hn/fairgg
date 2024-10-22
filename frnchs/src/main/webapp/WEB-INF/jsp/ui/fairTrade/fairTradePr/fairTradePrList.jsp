<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javascript" src="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
<link rel="stylesheet" type="text/css" href="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.css">
<script type="text/javascript" src="/static/plugins/swiper/swiper.min.js"></script>
<script type="text/javascript" src="/static/js/ui/fairTrade/fairTradePrList.js"></script>
<link rel="stylesheet" href="/static/plugins/swiper/swiper.min.css">
<%-- <script type="text/javaScript" src="<c:url value="/static/js/ui/fran/promoList.js"/>"></script> --%>
<!-- body -->
<style>
iframe {
    margin-left: 20px;
}
.yellowLine {
	border: 1.5px solid #fbb807 !important;
}

ul.tabs{
	margin: -45px 0px 0px 0px;
	padding: 0px;
	list-style: none;
	border-bottom: 1px solid #fbb807;
	float: right;
}
ul.tabs li{
	background: none;
	color: #BDBDBD;
	font-weight: bold;
	display: inline-block;
	padding: 10px 15px;
	cursor: pointer;
	border-radius: 10px 10px 0px 0px;
	padding: 8px 30px;
	border: 2px solid #c7c9cd;
}

ul.tabs li.current{
	background:#443b21; 
	color: #fbb807;
	font-weight: bold;
	opacity: 0.5;
}

.tab-content{
	display: none;
	background: #ededed;
}

.tab-content.current{
	display: block;
}
</style>
<article id="fairTrade">
<div class="gTitle5 type2 forPc">
	<div class="con1">
		<div class="bg">
			<h5 class="tit">경기도 가맹거래홍보관</h5>
			<p class="info">도내 프랜차이즈 산업의 발전과 상생문화 확산을 위한 업계의 노고를 위로, 격려하며<br>가맹사업 정보공개서 등록 및 가맹거래 활성화를 위한 홍보입니다.</p>
		</div>
	</div>
	<div class="con2">
		<div class="bg">
			<h6>추진절차 흐름도</h6>
			<ul class="type2">
			<li>
				<div class="ti"><span>홍보영상 게시요청(공문)</span></div>
			</li>
			<li>
				<div class="ti"><span>요청내용 접수</span></div>
			</li>
			<li>
				<div class="ti"><span>영상내용 평가</span></div>
			</li>
			<li>
				<div class="ti"><span>게시기간 문의</span></div>
			</li>
			<li>
				<div class="ti"><span>게시기간 확정</span></div>
			</li>
			<li>
				<div class="ti"><span>영상게시 확정통보</span></div>
			</li>
			</ul>
		</div>
	</div>
</div>

<div class="body forPc">
	<div class="bg">
		<!--  -->
	<!-- 	<div class="container"> -->
			<ul class="tab_common3 tab_video">
				<li class="tab-link"><button class="active" data-tab="education" id="FT01">교육 영상</button></li>
				<li class="tab-link" ><button data-tab="promotion" id="FT02">홍보 영상</button></li>
				<li class="tab-link" ><button data-tab="normal" id="FT03">일반 영상</button></li>
			</ul>

			<div id="education" class="tabcnt_common tabcnt_video tabcnt_video0 active">
				<div class="mFrans1">
					<div class="mRoll1">
						<div id="video-swiper" class="swiper-container">
							<div class="swiper-wrapper">
								<c:choose>
									<c:when test="${empty education}">
										<div class="swiper-slide">
												<div class="video-container" data-type="education">
									              	<video width="100%" src="" controls="controls">
									              	</video>
									            </div>
								            </div>
								    </c:when>
								    <c:otherwise>
										<c:forEach var="data" items="${education}">
											<!-- slider -->
											<div class="swiper-slide">
												<div class="video-container" data-type="education">
									              	<c:set var="req" value="${pageContext.request}" />
									              	<%-- 비디오 타입을 줘서 다운로드 분기 - 21.06.25 --%>
									              	<video width="100%" height="100%" style="min-height: 420px;" autoplay muted playsinline controls>
								              			<source src="/file/downloadFile.do?atchmnflNo=${data.atchmnflNo}&fileSn=${data.fileSn}&fileKey=${data.fileKey}" type="video/mp4">
									              	</video>
									            </div>
								            </div>
											<!-- //slider -->
										</c:forEach>
								    </c:otherwise>
								</c:choose>
							</div>
							<!-- Add Pagination -->
							<div class="swiper-pagination"></div>
						</div>
						<div class="txt mCustomScrollbar videoTxt"></div>
					</div>
					<div class="mList1 mCustomScrollbar">
						<ul>
							<c:choose>
								<c:when test="${empty education}">
									<li>
										<a href="javascript:void(0);">
											<span class="tit">-</span>
											<span class="txt">
												<span class="ls"><strong>등록일  : </strong>-</span>
											</span>
										</a>
									</li>
							    </c:when>
							    <c:otherwise>
									<c:forEach var="data" items="${education}" varStatus="status">
										<script>
										var json = new Object();
										json.sj = '${data.sj}';
										json.cn = '${data.cn}';
										txtArray.push(json);
										</script>
										<li>
											<a href="javascript:void(0);" onclick="mySwiper.slideTo(${status.index }, 0);fnSetVideoTxt('education', ${status.index });">
												<span class="tit">${data.sj }</span>
												<span class="txt">
													<span class="ls"><strong>등록일  : </strong>${data.registDt }</span>
												</span>
											</a>
										</li>
									</c:forEach>
							    </c:otherwise>
							</c:choose>
						
						</ul>
					</div>
				</div>
			</div>
			
			<div id="promotion" class="tabcnt_common tabcnt_video tabcnt_video0">
				<div class="mFrans1">
					<div class="mRoll1">
						<div id="video-swiper" class="swiper-container">
							<div class="swiper-wrapper">
								<c:choose>
									<c:when test="${empty promotion}">
										<div class="swiper-slide">
												<div class="video-container" data-type="promotion">
									              	<video width="100%" src="" controls="controls">
									              	</video>
									            </div>
								            </div>
								    </c:when>
								    <c:otherwise>
										<c:forEach var="data" items="${promotion}">
											<!-- slider -->
											<div class="swiper-slide">
												<div class="video-container"data-type="promotion">
									              	<c:set var="req" value="${pageContext.request}" />
									              	<%-- 비디오 타입을 줘서 다운로드 분기 - 21.06.25 --%>
									              	<video width="100%" height="100%" style="min-height: 420px;" autoplay muted playsinline controls>
									              		<source src="/file/downloadFile.do?atchmnflNo=${data.atchmnflNo}&fileSn=${data.fileSn}&fileKey=${data.fileKey}" type="video/mp4">
									              	</video>
									            </div>
								            </div>
											<!-- //slider -->
										</c:forEach>
								    </c:otherwise>
								</c:choose>
							</div>
							<!-- Add Pagination -->
							<div class="swiper-pagination"></div>
						</div>
						<div class="txt mCustomScrollbar videoTxt"></div>
					</div>
					<div class="mList1 mCustomScrollbar">
						<ul>
						<c:choose>
							<c:when test="${empty promotion}">
								<li>
									<a href="javascript:void(0);">
										<span class="tit">-</span>
										<span class="txt">
											<span class="ls"><strong>등록일  : </strong>-</span>
										</span>
									</a>
								</li>
						    </c:when>
						    <c:otherwise>
								<c:forEach var="data" items="${promotion}" varStatus="status">
									<script>
									var json = new Object();
									json.sj = '${data.sj}';
									json.cn = '${data.cn}';
									txtArray2.push(json);
									</script>
									<li>
										<a href="javascript:void(0);" onclick="mySwiper.slideTo(${status.index }, 0);fnSetVideoTxt('promotion', ${status.index });">
											<span class="tit">${data.sj }</span>
											<span class="txt">
												<span class="ls"><strong>등록일  : </strong>${data.registDt }</span>
											</span>
										</a>
									</li>
								</c:forEach>
						    </c:otherwise>
						</c:choose>
						</ul>
					</div>
				</div>
			</div>
			
			<div id="normal" class="tabcnt_common tabcnt_video tabcnt_video0">
				<div class="mFrans1">
					<div class="mRoll1">
						<div id="video-swiper" class="swiper-container">
							<div class="swiper-wrapper">
								<c:choose>
									<c:when test="${empty normal}">
										<div class="swiper-slide">
												<div class="video-container" data-type="normal">
									              	<video width="100%" src="" controls="controls">
									              	</video>
									            </div>
								            </div>
								    </c:when>
								    <c:otherwise>
										<c:forEach var="data" items="${normal}">
											<!-- slider -->
											<div class="swiper-slide">
												<div class="video-container" data-type="normal">
									              	<c:set var="req" value="${pageContext.request}" />
									              	<%-- 비디오 타입을 줘서 다운로드 분기 - 21.06.25 --%>
									              	<video width="100%" height="100%" style="min-height: 420px;" autoplay muted playsinline controls>
									              		<source src="/file/downloadFile.do?atchmnflNo=${data.atchmnflNo}&fileSn=${data.fileSn}&fileKey=${data.fileKey}" type="video/mp4">
									              	</video>
									            </div>
								            </div>
											<!-- //slider -->
										</c:forEach>
								    </c:otherwise>
								</c:choose>
							</div>
							<!-- Add Pagination -->
							<div class="swiper-pagination"></div>
						</div>
						<div class="txt mCustomScrollbar videoTxt"></div>
					</div>
					<div class="mList1 mCustomScrollbar">
						<ul>
						<c:choose>
							<c:when test="${empty normal}">
								<li>
									<a href="javascript:void(0);">
										<span class="tit">-</span>
										<span class="txt">
											<span class="ls"><strong>등록일  : </strong>-</span>
										</span>
									</a>
								</li>
						    </c:when>
						    <c:otherwise>
								<c:forEach var="data" items="${normal}" varStatus="status">
									<script>
									var json = new Object();
									json.sj = '${data.sj}';
									json.cn = '${data.cn}';
									txtArray3.push(json);
									</script>
									<li>
										<a href="javascript:void(0);" onclick="mySwiper.slideTo(${status.index }, 0);fnSetVideoTxt('normal', ${status.index });">
											<span class="tit">${data.sj }</span>
											<span class="txt">
												<span class="ls"><strong>등록일  : </strong>${data.registDt }</span>
											</span>
										</a>
									</li>
								</c:forEach>
						    </c:otherwise>
						</c:choose>
						</ul>
					</div>
				</div>
			</div>
	<!-- 	</div> -->
		<!-- //module -->
	</div>
</div>

<h3 class="subtitle forMo">가맹거래홍보관</h3>

	<div class="wrap_inner forMo">
			<form id="searchForm" method="post" onsubmit="return false;">
					<input type="hidden" name="pageIndex" value="" />
					<input type="hidden" name="pageIndexMob" value="" />
					<input type="hidden" name="pageIndexMobMax" value="" />
				<input type="hidden" name="fairTradeSeCode" id="fairTradeSeCode" value="" />
				<div class="fixTab" style="margin:0px">
					<ul class="tab_common tab_videomoMob">
						<li><button data-tab="educationMob" id="FT01" class="active">교육영상</button></li>
						<li><button data-tab="promotionMob" id="FT02">홍보영상</button></li>
						<li><button data-tab="normalMob" id="FT03">일반영상</button></li>
					</ul>
				</div>
			</form>
				
			<div class="tabcnt_common tabcnt_videomo tabcnt_videomo0 active">
				<ul class="list_video">
				</ul>
				<div class="box_btn block h40 radius white more"><button id="pagingMob"></button></div>
			</div>
		</div>
	</article>
<!-- //body -->