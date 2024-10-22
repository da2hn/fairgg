<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<jsp:include page="/WEB-INF/tiles/densityBrandPopup.jsp"/><!-- 점포 과밀도 안내 팝업 -->
<script>
function stepView(no) {
	$('.step').removeClass('active');
	$('.step' + no).addClass('active');
}

function initialHeight() {
	var wH = $(window).height();
	var wW = $(window).width();
	var cnt = $('#cnt > article');
	var h = $('#header').height();
	var keysub = $('.mKeysub1').height();
	var f = $('#footer').height();

	if(wW < 751) { // mo
		cnt.css({'min-height' : wH - h});
	} else {
		cnt.css({'min-height' : wH - h - keysub - f});
	}
}

$(document).ready(function() {
	$('#brandDensity .mSub5 .gRight .list').css({'height' : $('#brandDensity .mSub5 .gRight').outerHeight(true) - $('#brandDensity .mSub5 .gRight .tit').outerHeight(true)});
	/* $("#footer").hide(); */
	var  result = "${result}";
	console.log(result);
	if(result == "fail"){
		alert("${resultMsg}");
		return;
	}
	initialHeight();
	stepView(1);
});

$(window).resize(function() {
	initialHeight();
});
</script>
<style>
.ui-datepicker{z-index:1020 !important;}
#map { width: 654px;
    height: 668px; }
.info { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } .info h4 { margin: 0 0 5px; color: #777; }
.info2 { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } .info h4 { margin: 0 0 5px; color: #777; }
.legend { text-align: left; line-height: 18px; color: #555; } .legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }


.leaflet-control {
    cursor: pointer;
}

a.polyline-measure-controlOnBgColor, a.polyline-measure-controlOnBgColor:hover {
    background-color: #8f8;
}

.polyline-measure-unicode-icon {
    font-size: 19px;
    font-weight: bold;
}

a.polyline-measure-clearControl:active {
    background-color: #f88;
}

.polyline-measure-tooltip {
    font: 10px Arial, Helvetica, sans-serif;
    line-height: 10px;
    background-color: rgba(255, 255, 170, 0.7);
    border-radius: 3px;
    box-shadow: 1px 1px 4px #888;
    margin: 0;
    padding: 2px;
    width: auto !important;
    height: auto !important;
    white-space: nowrap;
    text-align: right;
}

.polyline-measure-tooltip-end {
    background-color: rgba(255, 255, 40, 0.7);
}

.polyline-measure-tooltip-total {
    color: #006;
    font-weight: bold;
}

.polyline-measure-tooltip-difference {
    color: #060;
    font-style: italic;
}

.polyline-measure-popupTooltip {
    font: 11px Arial, Helvetica, sans-serif;
    line-height: 11px;
}
.body {padding-bottom:70px;}

</style>

<%@ include file="/WEB-INF/tiles/gis.jsp" %>
<%@ include file="/WEB-INF/tiles/leaflet_gis.jsp" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/leaflet-measure.js"/>"></script>
	<!-- body -->
	<article id="brandDensity" class="franchise">
	<input type="hidden" id="frnchsNo" value="">
	<div class="body forPc">
		<div class="bg">

			<h5 class="mTitle4 left">점포 과밀도</h5>
			
			본 지도에서의 과밀도는 특정 브랜드가 아닌 일반상권의 점포과밀도입니다.			

			<div class="mSub5">
				<!-- left -->
				<div class="gLeft">
					<dl>
					<dt>분석조건 선택</dt>
					<dd>
						<select id="sidoPc" class="select sido" title="시도">
						<option value="">시도</option>
						</select>
						<select id="signguPc" class="select signgu" title="시군구">
						<option value="">시군구</option>
						</select>
						<select id="dongPc" class="select dong" title="읍면동">
						<option value="">읍면동</option>
						</select>
					</dd>
					<dt>분석설정</dt>
					<dd>
						<div class="gIt" style="width:100%;padding:0px"><input type="text" class="it date year" id="datepicker"></div>
						<select class="select ldClass" title="대분류 업종">
						<option value="">대분류 업종</option>
						</select>
						<select class="select mdClass" title="중분류 업종">
						<option value="">중분류 업종</option>
						</select>
					</dd>
					</dl>
					<a href="javascript:void(0)" class="mBtn1 orange searchBtn"><span class="iFind">분석시작</span></a>
				</div>
				<!-- //left -->
				<!-- map -->
				<div class="gMap">
					<div id="map1" class="gis_con map" style="z-index: 10;"></div>

						<!-- rule -->
						<!-- <div class="lRule">
							<div class="ls"><span class="i" style="background-color:#fe6f30;"></span>1293-1299</div>
							<div class="ls"><span class="i" style="background-color:#fec630;"></span>1293-1299</div>
							<div class="ls"><span class="i" style="background-color:#71f1eb;"></span>1293-1299</div>
							<div class="ls"><span class="i" style="background-color:#25adfc;"></span>1293-1299</div>
							<div class="ls"><span class="i" style="background-color:#696ce6;"></span>1293-1299</div>
						</div> -->
						<!-- //rule -->

						<!-- rule2 -->
						<div class="lRule2 layer" style="z-index:10;margin-left:210px">
							<a href="javascript:void(0)" id="frc_stor_ovpop_blck" class="selected">점포수</a>
						<!-- 	<a href="javascript:void(0)" id="frc_dynmc_popltn_blck">유동인구</a>
							<a href="javascript:void(0)" id="frc_card_selng_blck">카드매출</a> -->
						</div>
						<!-- //rule2 -->

						<!-- mapzoom -->
						<!-- <div class="mMapzoom">
							<div class="btn">
								<a href="###" class="plus">지도 확대/a>
								<a href="###" class="minus">지도 축소</a>
							</div>
						</div> -->
						<!-- //mapzoom -->

						<!-- pointer -->
						<!-- //pointer -->
				</div>
				<!-- //map -->
				<!-- right -->
				<%-- (단위 : 천원) 공통으로 처리 및 추천버튼 끝열 맞춤으로 인한 right 18->36px 변경 - 21.03.16 --%>
				<div class="gRight" style="width:304px;">
					<div class="tit" style="min-height:25px;">
						<t class="d_bsnSgnal"></t><br><t class="d_yearTxt" style="font-size:14px">(2019년 기준)</t>
						<div class="gRt" id="" style="right: 36px;">
							<!-- 로그인 주석으로 인한 경로 차단 22.06.21 -->
							<!-- <a href="javascript:void(0)" class="iFavor" style="position:relative;left:20px">추천</a> -->
						</div>
						<div align="right" style="padding-right: 36px;">
							<font size="1">(단위 : 천원)</font>					
						</div>
					</div>
					<div class="list mCustomScrollbar" style="/* overflow-x: hidden;overflow-y: scroll; */"> <!-- 02-09 스크롤바 주석 -->
						<div class="listBg">
							<div class="mBoard1">
								<table summary="창업비용(33㎡ 10평기준), 법 위반 건수, 폐업률, 월 평균 매출액, 3.3㎡(1평)당 월평균 매출액, 가맹점수로 구성된 표입니다.">

								<colgroup>
									<col width="175px">
									<col width="*">
								</colgroup>
								<tbody>
								<tr>
									<th class="left">창업비용(33㎡ 10평기준)<%-- <font size="1">(단위 : 천원)</font> --%></th>
									<td class="d_sm"></td>
								</tr>
								<tr>
									<th class="left">정보공개서상<br>법 위반 건수</th>
									<td class="d_outlawCnt"></td>
								</tr>
								<tr>
									<th class="left">폐업률</th>
									<td class="d_closeRate"></td>
								</tr>
								<tr>
									<%-- 요청메일에 의한 월 제거 - 21.06.25 --%>
									<th class="left">평균 매출액<%-- <font size="1">(단위 : 천원)</font> --%></th>
									<td class="d_avrgSelngAm"></td>
								</tr>
								<tr>
									<%-- 요청메일에 의한 월 제거 - 21.06.25 --%>
									<th class="left">3.3㎡(1평)당 평균 매출액<%-- <font size="1">(단위 : 천원)</font> --%></th>
									<td class="d_unitArAvrgSelngAm"></td>
								</tr>
								<tr>
									<th class="left">가맹점수</th>
									<td class="d_mrhstCo"></td>
								</tr>
								</tbody>
								</table>
							</div>
							<%-- 3개년에서 5개년으로 변경 - 21.03.17 --%>
							<div class="mGraph3">
								<div class="ti">최근 5개년 평균 매출액 추이<font size="1">(단위 : 천원)</font></div>
								<div class="gr"><div class="year_chart1" id="year_chart1"></div></div>
							</div>

							<!-- <div class="mGraph3">
								<div class="ti">최근 3개년 가맹점 수 추이</div>
								<div class="gr"><div class="year_chart2" id="year_chart2"></div></div>
							</div> -->

							<div class="mGraph4">
								<div class="ls">
									<span class="t">수익성
										<span class="lMsg" style="width:150px">당기순이익 / 총자산 * 100</span> <!-- add20210306 -->
									</span>
									<span class="c prftblGrad">
									</span>
								</div>
								<div class="ls">
									<span class="t">공정성
										<span class="lMsg" style="width:200px">공정거래위원회의 시정조치 건수 + 민사소송 패소 및 민사상 화해 건수 + 형의 선고 건수</span> <!-- add20210306 -->
									</span>
									<span class="c fairGrad">
									</span>
								</div>
								<div class="ls">
									<span class="t">성장성
										<span class="lMsg" style="width:170px">당기매출액 / 전기매출액 * 100</span> <!-- add20210306 -->
									</span>
									<span class="c growthGrad">
									</span>
								</div>
								<div class="ls">
									<span class="t">안전성
										<span class="lMsg" style="width:230px">부채총계 / 자기자본<br>(자본금 + 이익잉여금 + 자본잉여금) * 100</span> <!-- add20210306 -->
									</span>
									<span class="c safeGrad">
									</span>
								</div>
							</div>

						</div>
					</div>
				</div>
				<!-- //right -->
			</div>

			<ul class="mList3" style="padding: 20px 0px;">
				<li>
				경기도는 본 웹 사이트의 서비스로부터 제공되는 데이터 및 정보는 단순 참고 사항이며, 사실과 차이가 있을 수 있어 정확성이나 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스와 관련된 광고, 기타 정보 또는 제안의 결과로서
				창업, 계약, 해약, 해지, 해제, 구매 또는 취득하게 되는 제품 또는 기타 정보(이하 "제품")의 질에 대해서도 어떠한 보증도 하지 않습니다. 
<!-- 				카드매출 데이터 : 출처 (비씨카드) / 유동인구 데이터 : 출처 (KT) -->
				</li>
			</ul>
		</div>
	</div>
	
	<div class="wrap_inner forMo">
		<h3 class="subtitle forMo">점포 과밀도</h3>
				<div class="step step0">
					<dl class="datalist_common">
						<dt>분석조건 선택</dt>
						<dd>
							<select name="" id="sidoMob" class="w100p radius">
								<option value="" selected disabled hidden>시/도</option>
							</select>

							<select name="" id="signguMob" class="w100p radius">
								<option value="" selected disabled hidden>시/군/구</option>
							</select>

							<select name="" id="dongMob" class="w100p radius">
								<option value="" selected disabled hidden>읍/면/동</option>
							</select>
						</dd>
					</dl>

					<dl style="margin-top:20px;">
						<dt>분석설정</dt>

						<dd>
							<div class="box_date radius">
								<div class="gIt" style="width:100%;padding:0px;margin-bottom:8px"><input type="text" class="it date year" id="datepickerMob"></div>
							</div>

							<div class="box_col col2">
								<select name="" id="" class="radius ldClass">
									<option value="" selected disabled hidden>대분류 업종</option>
								</select>
							
								<select name="" id="mdClassMob" class="radius mdClass">
									<option value="" selected disabled hidden>중분류 업종</option>
								</select>
							</div>
						</dd>
					</dl>

					<div class="box_btn block h50 fix"><button class="searchMobBtn">분석하기</button></div>
				</div>
				<div class="step step1 active">
					<div class="brandInfo">
						<!-- 로그인 주석으로 인한 경로 차단 22.06.21 -->
						<!-- <button class="favorite"></button> -->

						<p class="name d_bsnSgnal" style="width:90%"></p>

						<div class="wrapbox">
							<div class="mGraph4">
								<div class="ls">
									<span class="t" style="color:#d42363;">수익성</span>
									<span class="c prftblGrad">
										<span style="background-color:#d42363;"></span>
										<span style="background-color:#d42363;"></span>
										<span style="background-color:#d42363;"></span>
										<span></span>
										<span></span>
									</span>
								</div>

								<div class="ls">
									<span class="t" style="color:#43c0a2;">공정성</span>
									<span class="c fairGrad">
										<span style="background-color:#43c0a2;"></span>
										<span style="background-color:#43c0a2;"></span>
										<span style="background-color:#43c0a2;"></span>
										<span></span>
										<span></span>
									</span>
								</div>

								<div class="ls">
									<span class="t" style="color:#6f45b1;">성장성</span>
									<span class="c growthGrad">
										<span style="background-color:#6f45b1;"></span>
										<span style="background-color:#6f45b1;"></span>
										<span style="background-color:#6f45b1;"></span>
										<span></span>
										<span></span>
									</span>
								</div>

								<div class="ls">
									<span class="t" style="color:#f8a80f;">안전성</span>
									<span class="c safeGrad">
										<span style="background-color:#f8a80f;"></span>
										<span style="background-color:#f8a80f;"></span>
										<span style="background-color:#f8a80f;"></span>
										<span style="background-color:#f8a80f;"></span>
										<span></span>
									</span>
								</div>
							</div>
						</div>
					</div>

					<table class="tbl_row2">
						<caption>점포 과밀도 - 창업비용 (33㎡ 10평 기준), 정보공개서상 법 위반 건수, 폐업률, 평균 매출액, 3.3㎡ (1평)당 평균 매출액, 가맹점수</caption>
						<colgroup>
							<col style="width:60%;">
							<col style="width:40%;">
						</colgroup>

						<tbody>
							<tr>
								<th scope="row">창업비용 (33㎡ 10평 기준)</th>
								<td class="d_sm">-</td>
							</tr>

							<tr>
								<th scope="row">정보공개서상 법 위반 건수</th>
								<td class="d_outlawCnt">-</td>
							</tr>

							<tr>
								<th scope="row">폐업률</th>
								<td class="d_closeRate">-</td>
							</tr>

							<tr>
								<th scope="row">평균 매출액</th>
								<td class="d_avrgSelngAm">-</td>
							</tr>

							<tr>
								<th scope="row">3.3㎡ (1평) 당 평균 매출액</th>
								<td class="d_unitArAvrgSelngAm">-</td>
							</tr>

							<tr>
								<th scope="row">가맹점수</th>
								<td class="d_mrhstCo">-</td>
							</tr>
						</tbody>
					</table>

					<div class="chartArea">
						<p class="title">최근 5개년 평균 매출액 추이</p>
						<span class="unit">(단위 : 천원)</span>
						<!-- [Dev] 임시 style -->
						<div class="chart mGraph3" style="width:100%;">
							<div class="gr"><div class="year_chartMob1" id="year_chartMob1"></div></div>
						</div>
					</div>

<!-- 					<div class="box_btn block h50 gray fix"><button onclick="stepView(0);">다시 분석하기</button></div>이전으로
 -->				</div>
			</div>
		</article>
	<!-- //body -->

	<script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/densityBrand.js"/>"></script>

	<div id="popupDiv"></div>