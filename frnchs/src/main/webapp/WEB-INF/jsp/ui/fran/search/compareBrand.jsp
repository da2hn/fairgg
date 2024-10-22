<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/compareBrand.js"/>"></script>
<style>
	.mGraph1{ padding: 10px 20px;}
	.body {padding-bottom:70px;}
	.chartAreaMob{width:100%;display:inline-block;}
</style>
<script>

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
			/* $("#footer").hide(); */
			var swiper_company = new Swiper('.swiper_company', {
				freeMode: true,
				slidesPerView: 1.1,
				spaceBetween: 8,
			});
			
			initialHeight();
			
			$(".back").click(function(){
				window.location.href = "/fran/search/searchList.do";
			});
		});

		$(window).resize(function() {
			initialHeight();
		});
		</script>
<article id="brandCompareResult" class="franchise">
	<!-- body -->
	<div class="body forPc">
		<div class="bg">

			<div class="mSub6">
				<h5 class="mTitle4 iLogo left">브랜드 비교 <span class="ts"></span></h5>
				<!-- con1 -->
				<input type="hidden" class="c1_frnchsNo">
				<input type="hidden" class="c2_frnchsNo">
				<div class="con con1">
					<div class="gLeft"><span><t class="c1_bsnSgnal"></t></span><a href="javascript:void(0)" id="c1_iFavor" class="iFavor" style="display:none;">추천</a></div>
					<div class="gRight"><span><t class="c2_bsnSgnal"></t></span><a href="javascript:void(0)" id="c2_iFavor" class="iFavor" style="display:none;">추천</a></div>
				</div>
				<!-- //con1 -->
				<!-- con2 -->
				<div class="con con2">
					<h6>기본정보</h6>
					<div class="mBoard1">
						<table summary="대표자, 중분류 업종, 법인설립등기일, 대표번호, 주소, 사업자등록번호로 구성된 표입니다."></caption>
						<colgroup>
							<col width="475px">
							<col width="*">
							<col width="475px">
						</colgroup>
						<tbody>
						<tr>
							<td class="left c1_rprsntvNm">홍길동</td>
							<th>대표자</th>
							<td class="left c2_rprsntvNm">xxxxxxx</td>
						</tr>
						<tr>
							<td class="left c1_mlsfcIndutyNm"></td>
							<th>중분류 업종</th>
							<td class="left c2_mlsfcIndutyNm"></td>
						</tr>
						<tr>
							<td class="left c1_cprFondRgistDe"></td>
							<th>법인설립등기일</th>
							<td class="left c2_cprFondRgistDe"></td>
						</tr>
						<tr>
							<td class="left c1_reprsntNo">02-548-9853</td>
							<th>대표번호</th>
							<td class="left c2_reprsntNo">02-548-9853</td>
						</tr>
						<tr>
							<td class="left c1_adres">서울시 중구 중구동 423-12</td>
							<th>주소</th>
							<td class="left c2_adres">서울시 중구 중구동 423-12</td>
						</tr>
						<tr>
							<td class="left c1_bizrno">121-154-8960</td>
							<th>사업자등록번호</th>
							<td class="left c2_bizrno">121-154-8960</td>
						</tr>
						</tbody>
						</table>
					</div>
				</div>
				<!-- //con2 -->
				<!-- con3 -->
				<div class="con con3">
					<h6>가맹본부 재무상황</h6>
					<div class="gRt">(단위 : 천원)</div>
					<div class="mTab1 jsTab1">
						<a href="#jsTabCont3_1" class="selected"><span>자산</span></a>
						<a href="#jsTabCont3_2"><span>부채</span></a>
						<a href="#jsTabCont3_3"><span>자본</span></a>
					</div>
					<div id="jsTabCont3_1" class="tabCont"><div class="mGraph1"><div class="year_chart1" id="year_chart1"></div></div></div>
					<div id="jsTabCont3_2" class="tabCont hidden"><div class="mGraph1"><div class="year_chart2" id="year_chart2"></div></div></div>
					<div id="jsTabCont3_3" class="tabCont hidden"><div class="mGraph1"><div class="year_chart3" id="year_chart3"></div></div></div>
				</div>
				<!-- //con3 -->
				<!-- con3 -->
				<div class="con con3">
					<h6>가맹본부 실적상황</h6>
					<div class="gRt">(단위 : 천원)</div>
					<div class="mTab1 jsTab1">
						<a href="#jsTabCont3_4" class="selected"><span>매출액</span></a>
						<a href="#jsTabCont3_5"><span>영업이익</span></a>
						<a href="#jsTabCont3_6"><span>당기순이익</span></a> <%-- 오타수정 - 21.04.05 --%>
					</div>
					<div id="jsTabCont3_4" class="tabCont"><div class="mGraph1"><div class="year_chart4" id="year_chart4"></div></div></div>
					<div id="jsTabCont3_5" class="tabCont hidden"><div class="mGraph1"><div class="year_chart5" id="year_chart5"></div></div></div>
					<div id="jsTabCont3_6" class="tabCont hidden"><div class="mGraph1"><div class="year_chart6" id="year_chart6"></div></div></div>
				</div>
				<!-- //con3 -->
				<!-- con4 -->
				<div class="con con4">
					<h6>가맹사업 임직원 수</h6>
					<div class="gRt">(단위 : 명)</div>
					<div class="graph">
						<div class="gLeft"><div class="mGraph1" style="padding: 0;"><div class="pie_chart7" id="pie_chart7"></div></div></div>
						<div class="gRight"><div class="mGraph1" style="padding: 0;"><div class="pie_chart8" id="pie_chart8"></div></div></div>
					</div>
				</div>
				<!-- //con4 -->
				<!-- con4 -->
				<div class="con con4">
					<h6>가맹점 및 직영점 현황</h6>
					<div class="gRt">(단위 : 개)</div>
					<div class="graph">
						<div class="gLeft"><div class="mGraph1" style="padding: 0;"><div class="year_chart9" id="year_chart9"></div></div></div>
						<div class="gRight"><div class="mGraph1" style="padding: 0;"><div class="year_chart10" id="year_chart10"></div></div></div>
					</div>
				</div>
	<!-- 			<div class="con con3">
					<h6>가맹점 및 직영점 현황</h6>
					<div class="gRt">(단위:개)</div>
					<div class="mTab1 jsTab1">
						<a href="#jsTabCont4_1" class="selected"><span>전체 가맹점수</span></a>
						<a href="#jsTabCont4_2"><span>전체 직영점수</span></a>
					</div>
					<div id="jsTabCont4_1" class="tabCont"><div class="mGraph1"><div class="year_chart9" id="year_chart9"></div></div></div>
					<div id="jsTabCont4_2" class="tabCont hidden"><div class="mGraph1"><div class="year_chart10" id="year_chart10"></div></div></div>
				</div> -->
				<!-- //con4 -->
				<!-- con44 -->
				<div class="con con44">
					<h6>가맹점 변동 현황</h6>
					<div class="gRt">(단위 : 개)</div>
					<div class="mTab1 jsTab1">
						<a href="#jsTabCont44_1" class="selected"><span>신규개점</span></a>
						<a href="#jsTabCont44_2"><span>계약종료</span></a>
						<a href="#jsTabCont44_3"><span>계약해지</span></a>
						<a href="#jsTabCont44_4"><span>계약명의변경</span></a>
					</div>
					<div id="jsTabCont44_1" class="tabCont"><div class="mGraph1"><div class="year_chart11" id="year_chart11"></div></div></div>
					<div id="jsTabCont44_2" class="tabCont hidden"><div class="mGraph1"><div class="year_chart12" id="year_chart12"></div></div></div>
					<div id="jsTabCont44_3" class="tabCont hidden"><div class="mGraph1"><div class="year_chart13" id="year_chart13"></div></div></div>
					<div id="jsTabCont44_4" class="tabCont hidden"><div class="mGraph1"><div class="year_chart14" id="year_chart14"></div></div></div>
				</div>
				<!-- //con44 -->
				<!-- con5 -->
				<div class="con con3">
					<h6>가맹점 사업자의 평균매출액 및 면적당 매출액</h6>
					<div class="gRt">(단위 : 천원)</div>
					<div class="mTab1 jsTab1">
						<a href="#jsTabCont5_1" class="selected"><span>평균매출액</span></a>
						<a href="#jsTabCont5_2"><span>면적당 매출액</span></a>
					</div>
					<div id="jsTabCont5_1" class="tabCont"><div class="mGraph1"><div class="sido_chart15" id="sido_chart15"></div></div></div>
					<div id="jsTabCont5_2" class="tabCont hidden"><div class="mGraph1"><div class="sido_chart16" id="sido_chart16"></div></div></div>
				</div>
				<!-- //con5 -->
				<!-- con6 -->
				<div class="con con6">
					<h6>광고 판촉비 내역</h6>
					<div class="gRt">(단위 : 천원)</div>
					<div class="list1">
						<div class="gLeft">
							<div class="ls"><strong class="c1_advrtsCt">12,000</strong> 광고비</div>
							<div class="ls"><strong class="c1_promtnCt">0</strong> 판촉비</div>
						</div>
						<div class="gRight">
							<div class="ls"><strong class="c2_advrtsCt">12,000</strong> 광고비</div>
							<div class="ls"><strong class="c2_promtnCt">0</strong> 판촉비</div>
						</div>
					</div>
				</div>
				<!-- //con6 -->
				<!-- con7 -->
				<div class="con con7">
					<h6>가맹본부와 그 임원의 법 위반 사실</h6>
					<div class="gRt">(단위 : 천원)</div>
					<div class="list1">
						<div class="gLeft">
							<div class="ls"><strong class="c1_ftcCorecManagtCo">2</strong> 공정거래위원회의<br> 시정조치</div>
							<div class="ls"><strong class="c1_cfrsCo">0</strong> 민사소송 패소 및<br> 민사상 화해</div>
							<div class="ls"><strong class="c1_petyCo">0</strong> 형의 선고</div>
						</div>
						<div class="gRight">
							<div class="ls"><strong class="c2_ftcCorecManagtCo">2</strong> 공정거래위원회의<br> 시정조치</div>
							<div class="ls"><strong class="c2_cfrsCo">0</strong> 민사소송 패소 및<br> 민사상 화해</div>
							<div class="ls"><strong class="c2_petyCo">0</strong> 형의 선고</div>
						</div>
					</div>
				</div>
				<!-- //con7 -->
				<!-- con8 -->
				<!--
				<div class="con con8">
					<h6>가맹점사업자의 부담금</h6>
					<div class="gRt">(단위:천원)</div>
					<div class="graph2"><img src="images/x_graph8.png" alt="가맹점사업자의 부담금 그래프"></div>
				</div>
				 -->
				<!-- //con8 -->

				<!-- con8 -->
				<div class="con con8">
					<h6>가맹점사업자의 부담금</h6>
					<div class="gRt">(단위 : 천원)</div>
					<div class="list1">
						<div class="gLeft">
							<div class="ls"><strong class="c1_edcct">2</strong>교육비</div>
							<div class="ls"><strong class="c1_srbct">0</strong>가입비</div>
							<div class="ls"><strong class="c1_gtn">0</strong>보증금</div>
							<div class="ls"><strong class="c1_etcCt">0</strong>기타비용</div>
							<div class="ls"><strong class="c1_sm">0</strong>합계</div>
						</div>
						<div class="gRight">
							<div class="ls"><strong class="c2_edcct">2</strong>교육비</div>
							<div class="ls"><strong class="c2_srbct">0</strong>가입비</div>
							<div class="ls"><strong class="c2_gtn">0</strong>보증금</div>
							<div class="ls"><strong class="c2_etcCt">0</strong>기타비용</div>
							<div class="ls"><strong class="c2_sm">0</strong>합계</div>
						</div>
					</div>
				</div>
				<!-- //con8 -->
				<!-- con8 -->
				<div class="con con8">
					<h6>면적당 인테리어비용</h6>
					<div class="gRt">(단위 : 천원)</div>
					<div class="list1">
						<div class="gLeft">
							<div class="ls"><strong class="c1_unitArIntrrCt">0</strong></div>
						</div>
						<div class="gRight">
							<div class="ls"><strong class="c2_unitArIntrrCt">0</strong></div>
						</div>
					</div>
				</div>
				<!-- //con8 -->
				<!-- con9 -->
				<!-- 상위에 같은 데이터있어서 주석처리 -->
<!-- 				<div class="con con9"> -->
<!-- 					<h6>인테리어 비용</h6> -->
<!-- 					<div class="gRt">(단위:천원)</div> -->
<!-- 					<div class="list1"> -->
<!-- 						<div class="gLeft"> -->
<!-- 							<div class="ls"><strong class="c1_unitArIntrrCt">12,000</strong> 단위면적당 인테리어 비용</div> -->
<!-- 						</div> -->
<!-- 						<div class="gRight"> -->
<!-- 							<div class="ls"><strong class="c2_unitArIntrrCt">12,000</strong> 단위면적당 인테리어 비용</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
				<!-- //con9 -->

				<!-- con99 -->
				<div class="con con99">
					<h6>가맹계약기간</h6>
					<div class="gRt">(단위 : 년)</div>
					<div class="list1">
						<div class="gLeft">
							<div class="ls"><strong class="c1_cntrctFrst">12,000</strong>최초</div>
							<div class="ls"><strong class="c1_cntrctExtn">12,000</strong>연장</div>
						</div>
						<div class="gRight">
							<div class="ls"><strong class="c2_cntrctFrst">12,000</strong>최초</div>
							<div class="ls"><strong class="c2_cntrctExtn">12,000</strong>연장</div>
						</div>
					</div>
				</div>
				<!-- //con99 -->
				<!-- con10 -->
				<div class="con con10">
					<h6>브랜드 리뷰</h6>
					<div class="gRt"></div>
					<div class="list2">
						<div class="gLeft">
							<div class="mTxt1 review1"></div>
						</div>
						<div class="gRight">
							<div class="mTxt1 review2"></div>
						</div>
					</div>
				</div>
				<!-- //con10 -->
				<!-- con11 -->
				<div class="con con11">
					<h6>브랜드 뉴스</h6>
					<div class="gRt"></div>
					<div class="list2">
						<div class="gLeft">
							<div class="mTxt1 news1"></div>
						</div>
						<div class="gRight">
							<div class="mTxt1 news2"></div>
						</div>
					</div>
				</div>
				<!-- //con11 -->
			</div>

			<ul class="mList3" style="padding: 20px 0px;">
				<li>
				경기도는 본 웹 사이트의 서비스로부터 제공되는 데이터 및 정보는 단순 참고 사항이며, 사실과 차이가 있을 수 있어 정확성이나 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스와 관련된 광고, 기타 정보 또는 제안의 결과로서
				창업, 계약, 해약, 해지, 해제, 구매 또는 취득하게 되는 제품 또는 기타 정보(이하 "제품")의 질에 대해서도 어떠한 보증도 하지 않습니다.
				</li>
<!-- 				<li> -->
<!-- 				카드매출 데이터 : 출처 (비씨카드) / 유동인구 데이터 : 출처 (KT) -->
<!-- 				</li> -->
			</ul>

		</div>
	</div>
	<!-- //body -->
	<h3 class="subtitle forMo">비교결과</h3>
	
	<div class="wrap_inner forMo test" style=" overflow: hidden;">
				<div class="compare">
					<span><t class="c1_bsnSgnal"></t></span>
					<span><t class="c2_bsnSgnal"></t></span>
				</div>

				<dl class="datalist_toggle">
					<dt class="active" onclick="dlToogle(this);">본사 기업정보</dt>
					<dd class="active">
						<div class="swiper-container swiper_company list_box radius">
						<input type="hidden" class="c1_frnchsNo">
						<input type="hidden" class="c2_frnchsNo">
						<input type="hidden" class="c1_ctprvnCode">
						<input type="hidden" class="c2_ctprvnCode">
						<input type="hidden" class="c1_mlsfcIndutyCode">
						<input type="hidden" class="c2_mlsfcIndutyCode">
						<input type="hidden" class="c1_closeRate">
						<input type="hidden" class="c2_closeRate">
						<input type="hidden" class="c1_atchmnflNo">
						<input type="hidden" class="c2_atchmnflNo">
						<input type="hidden" class="c1_fileSn">
						<input type="hidden" class="c2_fileSn">
						<input type="hidden" class="c1_fileKey">
						<input type="hidden" class="c2_fileKey">
						<input type="hidden" class="c1_year">
						<input type="hidden" class="c2_year">
							<div class="swiper-wrapper">
								<div class="swiper-slide">
									<div class="box">
										<div class="brand">
											<p class="type">상호</p>
											<p class="name"><t class="c1_bsnSgnal"></t></p>
										</div>

										<div class="detail c1_detail">
											<dl>
												<dt>대표자</dt>
												<dd class="left c1_rprsntvNm"></dd>
											</dl>

											<dl>
												<dt>법인설립등기일</dt>
												<dd class="left c1_cprFondRgistDe"></dd>
											</dl>

											<dl>
												<dt>대표번호</dt>
												<dd class="left c1_reprsntNo"></dd>
											</dl>

											<dl>
												<dt>법인번호</dt>
												<dd class="left c1_jurirno"></dd>
											</dl>

											<dl>
												<dt>사업자등록번호</dt>
												<dd class="left c1_bizrno"></dd>
											</dl>

											<dl>
												<dt>주소</dt>
												<dd class="left c1_adres"></dd>
											</dl>
										</div>
										
										<div id="prftblMob1" class="c1_prftblGrad" style="display:none;"></div>
										<div id="prftblMob2" class="c2_prftblGrad" style="display:none;"></div>
										<div id="fairMob1" class="c1_fairGrad" style="display:none;"></div>
										<div id="fairMob2" class="c2_fairGrad" style="display:none;"></div>
										<div id="growthMob1" class="c1_growthGrad" style="display:none;"></div>
										<div id="growthMob2" class="c2_growthGrad" style="display:none;"></div>
										<div id="safeMob1" class="c1_safeGrad" style="display:none;"></div>
										<div id="safeMob2" class="c2_safeGrad" style="display:none;"></div>
 
										<div class="mGraph4">
											<div class="ls">
												<span class="t" style="color:#d42363;">수익성</span>
												<span class="c prftblGrad prftblMob1">
												</span>
											</div>
										
											<div class="ls">
												<span class="t" style="color:#43c0a2;">공정성</span>
												<span  class="c fairGrad fairMob1">
												</span>
											</div>
										
											<div class="ls">
												<span class="t" style="color:#6f45b1;">성장성</span>
												<span class="c growthGrad growthMob1">
												</span>
											</div>
										
											<div class="ls">
												<span class="t" style="color:#f8a80f;">안전성</span>
												<span class="c safeGrad safeMob1">
												</span>
											</div>
										</div>
									</div>

									<div class="btn">
										<button class="wish" id="originC1" value="c1" style="display:none;">관심 프랜차이즈 등록</button>
										<button class="mapView" value="c1">지도보기</button>
										<button class="download" id="downloadC1" value="c1">정보공개서 다운로드</button>
									</div>
								</div>

								<div class="swiper-slide">
									<div class="box">
										<div class="brand">
											<p class="type">상호</p>
											<p class="name"><t class="c2_bsnSgnal"></t></p>
										</div>
								
										<div class="detail c2_detail">
											<dl>
												<dt>대표자</dt>
												<dd class="left c2_rprsntvNm"></dd>
											</dl>
								
											<dl>
												<dt>법인설립등기일</dt>
												<dd class="left c2_cprFondRgistDe"></dd>
											</dl>
								
											<dl>
												<dt>대표번호</dt>
												<dd class="left c2_reprsntNo"></dd>
											</dl>
								
											<dl>
												<dt>법인번호</dt>
												<dd class="left c2_jurirno"></dd>
											</dl>
								
											<dl>
												<dt>사업자등록번호</dt>
												<dd class="left c2_bizrno"></dd>
											</dl>
								
											<dl>
												<dt>주소</dt>
												<dd class="left c2_adres"></dd>
											</dl>
										</div>

										<div class="mGraph4">
											<div class="ls">
												<span class="t" style="color:#d42363;">수익성</span>
												<span class="c prftblGrad prftblMob2">
												</span>
											</div>
										
											<div class="ls">
												<span class="t" style="color:#43c0a2;">공정성</span>
												<span class="c fairGrad fairMob2">
												</span>
											</div>
										
											<div class="ls">
												<span class="t" style="color:#6f45b1;">성장성</span>
												<span class="c growthGrad growthMob2">
												</span>
											</div>
										
											<div class="ls">
												<span class="t" style="color:#f8a80f;">안전성</span>
												<span class="c safeGrad safeMob1">
												</span>
											</div>
										</div>
									</div>

									<div class="btn">
										<button class="wish" id="originC2" value="c2" style="display:none;">관심 프랜차이즈 등록</button>
										<button class="mapView" value="c2">지도보기</button>
										<button class="download" id="downloadC2" value="c2">정보공개서 다운로드</button>
									</div>
								</div>
							</div>
						</div>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">가맹본부 재무상황</dt>
					<dd>
						<p class="subTitle">자산</p>
						<span style="float:right;font-size:12px;">(단위 : 천원)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart1Mob" style="position:relative;"></div>
						</div>

						<p class="subTitle">부채</p>
						<span style="float:right;font-size:12px;">(단위 : 천원)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart2Mob" style="position:relative; "></div>
						</div>

						<p class="subTitle">자본</p>
						<span style="float:right;font-size:12px;">(단위 : 천원)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart3Mob" style="position:relative;"></div>
						</div>

						<p class="subTitle">매출액</p>
						<span style="float:right;font-size:12px;">(단위 : 천원)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart4Mob" style="position:relative;"></div>
						</div>

						<p class="subTitle">영업이익</p>
						<span style="float:right;font-size:12px;">(단위 : 천원)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart5Mob" style="position:relative;"></div>
						</div>

						<p class="subTitle">당기순이익</p>
						<span style="float:right;font-size:12px;">(단위 : 천원)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart6Mob" style="position:relative;"></div>
						</div>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">가맹사업 임직원 수</dt>
					<dd>
						<span style="float:right;font-size:12px;">(단위 : 명)</span>
						<div class="chartArea chartAreaMob">
						<!-- <div class="chartArea col2" style="width:100%;display:inline-block;"> -->
							<div class="chart" id="pie_chart7Mob" style="position:relative; left:0vw;"></div>
						</div>
						<span style="float:right;font-size:12px;">(단위 : 명)</span>
						<div class="chartArea chartAreaMob">
						<!-- <div class="chartArea col2" style="width:100%;display:inline-block;"> -->
							<div class="chart" id="pie_chart8Mob" style="position:relative; left:0vw;"></div>
						</div>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">가맹점 및 직영점 현황</dt>
					<dd>
						
						<p class="subTitle">전체 가맹점수</p>
						<span style="float:right;font-size:12px;">(단위 : 개)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart9Mob" style="position:relative; left:0vw;"></div>
						</div>
						
						<p class="subTitle">전체 직영점수</p>
						<span style="float:right;font-size:12px;">(단위 : 개)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart10Mob" style="position:relative; left:0vw;"></div>
						</div>
					</dd>
				</dl>
				
				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">가맹점 변동 현황</dt>
					<dd>
						<p class="subTitle">신규개점</p>
						<span style="float:right;font-size:12px;">(단위 : 개)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart11Mob" style="position:relative;"></div>
						</div>
				
						<p class="subTitle">계약종료</p>
						<span style="float:right;font-size:12px;">(단위 : 개)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart12Mob" style="position:relative;"></div>
						</div>
				
						<p class="subTitle">계약해지</p>
						<span style="float:right;font-size:12px;">(단위 : 개)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart13Mob" style="position:relative;"></div>
						</div>
				
						<p class="subTitle">계약명의변경</p>
						<span style="float:right;font-size:12px;">(단위 : 개)</span>
						<div class="chartArea chartAreaMob">
							<div class="chart" id="year_chart14Mob" style="position:relative;"></div>
						</div>
					</dd>
				</dl>

				<!-- <dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">가맹점 사업자의 평균매출액 및 면적당 매출액</dt>
					<dd>
						<p class="subTitle">평균매출액</p>
						<div class="chartArea">
							<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div>
						</div>
						
						<p class="subTitle">면적당 매출액</p>
						<div class="chartArea">
							<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div>
						</div>
					</dd>
				</dl> -->

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">광고 판촉비 내역</dt>
					<dd>
						<dl>
							<dt class="relative">
								광고비
								<span>(단위 : 천원)</span>
							</dt>

							<dd>
								<p class="c1_advrtsCt"></p>

								<p class="c2_advrtsCt"></p>
							</dd>
						</dl>

						<dl>
							<dt class="relative">
								판촉비
								<span>(단위 : 천원)</span>
							</dt>

							<dd>
								<p class="c1_promtnCt"></p>

								<p class="c2_promtnCt"></p>
							</dd>
						</dl>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">가맹본부와 그 임원의 법 위반 사실</dt>
					<dd>
						<dl>
							<dt class="relative">
								공정거래위원회의 시정조치
								<span>(단위 : 건)</span>
							</dt>

							<dd>
								<p class="c1_ftcCorecManagtCo"></p>

								<p class="c2_ftcCorecManagtCo"></p>
							</dd>
						</dl>

						<dl>
							<dt class="relative">
								민사소송 패소 및 민사상 화해
								<span>(단위 : 건)</span>
							</dt>
						
							<dd>
								<p class="c1_cfrsCo"></p>
						
								<p class="c2_cfrsCo"></p>
							</dd>
						</dl>

						<dl>
							<dt class="relative">
								형의 선고
								<span>(단위 : 건)</span>
							</dt>

							<dd>
								<p class="c1_petyCo"></p>

								<p class="c2_petyCo"></p>
							</dd>
						</dl>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">가맹점 사업자의 부담금</dt>
					<dd>
						<dl>
							<dt class="relative">
								교육비
								<span>(단위 : 천원)</span>
							</dt>
						
							<dd>
								<p class="c1_edcct"></p>
						
								<p class="c2_edcct"></p>
							</dd>
						</dl>

						<dl>
							<dt class="relative">가입비
								<span>(단위 : 천원)</span>
							</dt>
						
							<dd>
								<p class="c1_srbct"></p>
						
								<p class="c2_srbct"></p>
							</dd>
						</dl>

						<dl>
							<dt class="relative">
								보증금
								<span>(단위 : 천원)</span>
							</dt>
						
							<dd>
								<p class="c1_gtn"></p>
						
								<p class="c2_gtn"></p>
							</dd>
						</dl>

						<dl>
							<dt class="relative">
								기타비용
								<span>(단위 : 천원)</span>
							</dt>
						
							<dd>
								<p class="c1_etcCt"></p>
						
								<p class="c2_etcCt"></p>
							</dd>
						</dl>

						<dl>
							<dt class="relative">
								합계
								<span>(단위 : 천원)</span>
							</dt>
						
							<dd>
								<p class="c1_sm"></p>
						
								<p class="c2_sm"></p>
							</dd>
						</dl>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">면적당 인테리어 비용</dt>

					<dd>
						<dl>
							<dt class="relative">
								인테리어 비용
								<span>(단위 : 천원)</span>
							</dt>

							<dd>
								<p class="c1_unitArIntrrCt"></p>

								<p class="c2_unitArIntrrCt"></p>
							</dd>
						</dl>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">가맹계약기간</dt>
					<dd>
						<dl>
							<dt class="relative">
								최초
								<span>(단위 : 년)</span>
							</dt>

							<dd>
								<p class="c1_cntrctFrst"></p>

								<p class="c2_cntrctFrst"></p>
							</dd>
						</dl>

						<dl>
							<dt class="relative">
								연장
								<span>(단위 : 년)</span>
							</dt>
						
							<dd>
								<p class="c1_cntrctExtn"></p>
						
								<p class="c2_cntrctExtn"></p>
							</dd>
						</dl>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">브랜드 리뷰</dt>
				
					<dd>
						<dl class="mTxt1 review1">
						</dl>

						<dl class="mTxt1 review2">
						</dl>
					</dd>
				</dl>

				<dl class="datalist_toggle">
					<dt onclick="dlToogle(this);">브랜드 뉴스</dt>
				
					<dd>
						<dl class="mTxt1 news1">
						</dl>

						<dl class="mTxt1 news2">
						</dl>
					</dd>
				</dl>

				<div class="box_btn block h50 gray fix" style="z-index:1;"><button onclick="window.close();">이전으로</button></div>
			</div>

	<div id="popupDiv"></div>
	</article>