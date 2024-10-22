<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/unifiedSearchBrand.js"/>"></script>
<script type="text/JavaScript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script type="text/javaScript" src="<c:url value="/static/js/cmmn/kakaoShaer.js"/>"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/mobMenu/mobMenu.js"/>"></script>
<!-- https사용시 공유하기 사용가능 테스트 필 -->
<%-- <script type="text/javaScript" src="<c:url value="/static/js/cmmn/MobShaer.js"/>"></script> --%>

<link rel="stylesheet" type="text/css" href="/static/css/toastui-chart.min.css">
<script type="text/javascript" src="/static/js/toastui-chart.min.js"></script>

<!-- sub 필터메뉴 js -->
<%-- <script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/unifiedSearchBrand_sub.js"/>"></script> --%>

<!-- [Dev] id에 페이지명 -->
<style>
#footer .forMo {display:none;}
.chartAreaMob {width:92vw; display:inline-block;}
</style>
<input type="hidden" id="paramBrandFrc">
<input type="hidden" id="paramfrnchsNo" value="${frnchsNo}">
<input type="hidden" id="parambrandYear" value="${brandYear}">
<!-- <input type="hidden" name="menuGroupCode" id="menuGroupCode" value="U01" /> -->
<article id="franchiseInfo" class="franchise">
	<h3 class="subtitle forMo">프랜차이즈 정보</h3>

	<div class="body forPc">
		<div class="bg">
			<div class="mLnb type2">
				<ul>
					<li class="i">
						<div class="dep2">
							<dl>
								<dt>분석기간 선택</dt>
								<dd>
									<select class="select" name="brandYear" id="brandYear" title="분석기간 선택"><option value="">-</option></select>
								</dd>

								<dt>프랜차이즈 선택</dt>
								<dd>
									<select class="select" name="brandLdClass" id="brandLdClass" title="대분류">
									<option value="">- 대분류 -</option>
									<option value="LC01">외식</option><option value="LC02">도소매</option><option value="LC03">서비스</option></select>
									<select class="select" name="brandMdClass" id="brandMdClass" title="중분류">
									<option value="">- 중분류 -</option>
									</select>
									<!-- [M 2022-01-18] 임시 onclick 추가 -->
									<select class="select frcClass" name="brandFrcClass" id="brandFrcClass" title="프랜차이즈" onclick="$('#frnchsPopup').removeClass('hidden').show();">
									<option value="">- 프랜차이즈 -</option>
									</select>
									<a href="javascript:void(0)" class="mBtn1 jsBtnShow1 searchMtltyNm" style="display:none;">프랜차이즈 검색</a>
								</dd>
							</dl>
							<a href="#"  class="mBtn1 viewBrandBtn">조회</a>
						</div>
					</li>
				</ul>
			</div>

			<div class="content bgType1">
				<div class="step step0 active">
					<!-- <h3 class="mTitle5">인기 검색 업종</h3> -->
					<div class="gTitle5">
						<div class="con1">
							<div class="bg">
								<h5 class="tit">인기 검색 업종</h5>
								<p class="info">가맹정보제공시스템의 이용자들이 조회하고 검색하는 프랜차이즈 브랜드 정보의 집계를 통하여, 인기 검색 업종을 확인하실 수 있습니다.</p>
							</div>
						</div>
					</div>
					
					<!-- 차트 -->
					<div class="chartArea">
						<div id="bubbleChart" class="chart" style="width:100% ; height:490px; background:#fff; padding-left: 30px;"></div>
					</div>
					<!-- //차트 -->

					<!-- 이미지 -->
<!-- 					<div class="imgArea">
						<div class="img" style="width:100%; height:380px; background:#fff;"></div>
					</div> -->
					<!-- //이미지 -->
					<ul class="mList3">
						<li>
							관심있는 프랜차이즈 정보 검색을 위해  좌측 조회 기능을 활용하세요.
						</li>
					</ul>
				</div>

				<div class="step step1">
					<div class="gTitle2" style="padding-left: 0px;">
						<!-- 로그인 주석에따른 경로 주석  22.06.21-->
						<!-- <a href="#" class="iFavor">즐겨찾기</a> -->
						<h5 class="mTitle4 iLogo left" style="margin-left: 30px">프랜차이즈명 <span class="ts" id="anlyYear"></span></h5>

						<span class="gRt">
							<!--   <a href="#" class="mBtn1 download">본사 제출 공개본</a> -->
							<!-- <a href="#" class="mBtn1 download">가맹본부 제출 정보공개서 공개버전</a> -->
							<!-- <a href="#" class="mBtn1 download">첨부파일 다운로드</a> -->
						</span>
					</div>

<!-- 					<ul class="mList3"> -->
<!-- 						<li>해당 프랜차이즈의 상기 첨부파일은 가맹본부가 제출한 내용으로 심사없이 공개되는 것임을 알려드립니다.</li> -->
<!-- 					</ul> -->
							
					<div class="mSub6">
						<div class="con">
							<h6>기본정보</h6>
							<!-- [M 2022-01-12] 주요지표 추가 -->
							<div class="mGraph4">
								<button class="tooltip" onclick="toggle_view('toggle_tooltip');">툴팁</button>
								<div class="toggle_view toggle_tooltip">
									<dl>
										<dt>수익성</dt>
										<dd>당기순이익 / 총자산 * 100</dd>
									</dl>
									<dl>
										<dt>공정성</dt>
										<dd>공정거래위원회의 시정조치 건수 + 민사소송 패소 및 민사상 화해 건수 + 형의 선고 건수</dd>
									</dl>
									<dl>
										<dt>성장성</dt>
										<dd>당기매출액 / 전기매출액 * 100</dd>
									</dl>
									<dl>
										<dt>안정성</dt>
										<dd>부채총계 / 자기자본 (자본금 + 이익잉여금 + 자본잉여금) * 100</dd>
									</dl>
								</div>

								<div class="ls">
									<span class="t" style="color:#d42363;">수익성</span>
									<span class="c prftblGrad">
										<!-- <span style="background-color:#d42363;"></span>
										<span style="background-color:#d42363;"></span>
										<span style="background-color:#d42363;"></span>
										<span></span>
										<span></span> -->
									</span>
								</div>
								<div class="ls">
									<span class="t" style="color:#43c0a2;">공정성</span>
									<span class="c fairGrad">
										<!-- <span style="background-color:#43c0a2;"></span>
										<span style="background-color:#43c0a2;"></span>
										<span style="background-color:#43c0a2;"></span>
										<span></span>
										<span></span> -->
									</span>
								</div>
								<div class="ls">
									<span class="t" style="color:#6f45b1;">성장성</span>
									<span class="c growthGrad">
										<!-- <span style="background-color:#6f45b1;"></span>
										<span style="background-color:#6f45b1;"></span>
										<span style="background-color:#6f45b1;"></span>
										<span></span>
										<span></span> -->
									</span>
								</div>
								<div class="ls">
									<span class="t" style="color:#f8a80f;">안전성</span>
									<span class="c safeGrad">
										<!-- <span style="background-color:#f8a80f;"></span>
										<span style="background-color:#f8a80f;"></span>
										<span style="background-color:#f8a80f;"></span>
										<span style="background-color:#f8a80f;"></span>
										<span></span> -->
									</span>
								</div>
							</div>
							
							<div class="mBoard1">
								<table>
									<colgroup>
										<col style="width:230px;">
										<col style="width:auto;">
									</colgroup>

									<tbody>
										<tr>
											<th scope="row">대표자</th>
											<td id="c1_rprsntvNm"></td>
										</tr>

										<tr>
											<th scope="row">중분류 업종</th>
											<td id="c1_mlsfcIndutyNm"></td>
										</tr>

										<tr>
											<th scope="row">법인설립등기일</th>
											<td id="c1_cprFondRgistDe"></td>
										</tr>

										<tr>
											<th scope="row">대표번호</th>
											<td id="c1_reprsntNo"></td>
										</tr>

										<tr>
											<th scope="row">주소</th>
											<td id="c1_adres"></td>
										</tr>

										<tr>
											<th scope="row">사업자등록번호</th>
											<td id="c1_bizrno"></td>
										</tr>
									</tbody>

								</table>
							</div>
						</div>

						<div class="con">
							<h6>가맹본부 재무상황</h6>
							<span class="gRt">(단위:천원)</span>

							<div class="mTab1 jsTab1">
								<a href="#jsTabCont1_1" class="selected"><span>자산</span></a>
								<a href="#jsTabCont1_2"><span>부채</span></a>
								<a href="#jsTabCont1_3"><span>자본</span></a>
							</div>

							<div id="jsTabCont1_1" class="tabCont">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart1" id="year_chart1"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont1_2" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart2" id="year_chart2"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont1_3" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="chart" style="width:100%; height:300px;">
											<div class="year_chart3" id="year_chart3"></div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="con">
							<h6>가맹본부 실적상황</h6>
							<span class="gRt">(단위:천원)</span>

							<div class="mTab1 jsTab1">
								<a href="#jsTabCont2_1" class="selected"><span>매출액</span></a>
								<a href="#jsTabCont2_2"><span>영업이익</span></a>
								<a href="#jsTabCont2_3"><span>당기순이익</span></a>
							</div>

							<div id="jsTabCont2_1" class="tabCont">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart4" id="year_chart4"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont2_2" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart4" id="year_chart5"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont2_3" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart4" id="year_chart6"></div>
									</div>
								</div>
							</div>
						</div>

						<div class="col2">
							<div class="con">
								<h6>가맹사업 임직원 수</h6>
								<span class="gRt">(단위 : 명)</span>

								<div class="list">
									<div class="ls"><strong id="staffCnt"></strong></div>
								</div>
							</div>

							<div class="con">
								<h6>면적당 인테리어비용</h6>
								<span class="gRt">(단위 : 천원)</span>

								<div class="list">
									<div class="ls"><strong id="c1_unitArIntrrCt"></strong></div>
								</div>
							</div>
						</div>

						<div class="con">
							<h6>가맹점 및 직영점 현황</h6>
							<span class="gRt">(단위 : 개)</span>

							<div class="mTab1 jsTab1">
								<a href="#jsTabCont3_1" class="selected"><span>전체 가맹점수</span></a>
								<a href="#jsTabCont3_2"><span>전체 직영점수</span></a>
							</div>

							<div id="jsTabCont3_1" class="tabCont">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart9" id="year_chart9"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont3_2" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart10" id="year_chart10"></div>
									</div>
								</div>
							</div>
						</div>

						<div class="con">
							<h6>가맹점 변동 현황</h6>
							<span class="gRt">(단위 : 개)</span>
						
							<div class="mTab1 jsTab1">
								<a href="#jsTabCont4_1" class="selected"><span>신규개점</span></a>
								<a href="#jsTabCont4_2"><span>계약종료</span></a>
								<a href="#jsTabCont4_3"><span>계약해지</span></a>
								<a href="#jsTabCont4_4"><span>계약명의변경</span></a>
							</div>
						
							<div id="jsTabCont4_1" class="tabCont">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart11" id="year_chart11"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont4_2" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart12" id="year_chart12"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont4_3" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="year_chart13" id="year_chart13"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont4_4" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
											<div class="year_chart14" id="year_chart14"></div>
									</div>
								</div>
							</div>
						</div>

						<div class="con">
							<h6>가맹점 사업자의 평균매출액 및 면적당 매출액</h6>
							<span class="gRt">(단위 : 천원)</span>
						
							<div class="mTab1 jsTab1">
								<a href="#jsTabCont5_1" class="selected"><span>평균매출액</span></a>
								<a href="#jsTabCont5_2"><span>면적당 매출액</span></a>
							</div>
						
							<div id="jsTabCont5_1" class="tabCont">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="sido_chart15" id="sido_chart15"></div>
									</div>
								</div>
							</div>
							<div id="jsTabCont5_2" class="tabCont hidden">
								<div class="chartArea">
									<div class="chart" style="width:100%; height:300px;">
										<div class="sido_chart16" id="sido_chart16"></div>
									</div>
								</div>
							</div>
						</div>

<!-- 						<div class="con">
							<h6>브랜드 코멘트</h6>

							<div class="list">
								<div class="ls">
									<strong id="c1_rewardCn"></strong>
								</div>
							</div>
						</div> -->

						<div class="con">
							<h6>광고 판촉비 내역</h6>
							<span class="gRt">(단위 : 천원)</span>

							<div class="list col">
								<div class="ls">
									<strong id="c1_advrtsCt"></strong>
									광고비
								</div>

								<div class="ls">
									<strong id="c1_promtnCt"></strong>
									판촉비
								</div>
							</div>
						</div>

						<div class="con">
							<h6>가맹본부와 그 임원의 법 위반 사실</h6>
							<span class="gRt">(단위 : 건)</span>
						
							<div class="list col">
								<div class="ls">
									<strong id="c1_ftcCorecManagtCo"></strong>
									공정거래위원회의시정조치
								</div>
						
								<div class="ls">
									<strong id="c1_cfrsCo"></strong>
									민사소송 패소 및 민사상 화해
								</div>

								<div class="ls">
									<strong id="c1_petyCo"></strong>
									형의 선고
								</div>
							</div>
						</div>

						<div class="con">
							<h6>가맹점사업자의 부담금</h6>
							<span class="gRt">(단위 : 천원)</span>
						
							<div class="list col">
								<div class="ls">
									<strong id="c1_edcct"></strong>
									교육비
								</div>
						
								<div class="ls">
									<strong id="c1_srbct"></strong>
									가입비
								</div>
						
								<div class="ls">
									<strong id="c1_gtn"></strong>
									보증금
								</div>

								<div class="ls">
									<strong id="c1_etcCt"></strong>
									기타비용
								</div>

								<div class="ls">
									<strong id="c1_sm"></strong>
									합계
								</div>
							</div>
						</div>

						<div class="con">
							<h6>가맹계약기간</h6>
							<span class="gRt">(단위 : 년)</span>

							<div class="list col">
								<div class="ls">
									<strong id="c1_cntrctFrst">2</strong>
									최초
								</div>

								<div class="ls">
									<strong id="c1_cntrctExtn">1</strong>
									연장
								</div>
							</div>
						</div>

						<div class="con">
							<h6>브랜드 리뷰</h6>

							<div class="list">
								<div class="ls review1 tal" style="text-align:left;"></div>
							</div>
						</div>

						<div class="con">
							<h6>브랜드 뉴스</h6>

							<div class="list">
								<div class="ls news1 tal" style="text-align:left;"></div>
							</div>
						</div>
					</div>
				</div>

				<ul class="mList3">
					<li>
					경기도는 본 웹 사이트의 서비스로부터 제공되는 데이터 및 정보는 단순 참고 사항이며, 사실과 차이가 있을 수 있어 정확성이나 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스와 관련된 광고, 기타 정보 또는 제안의 결과로서
					창업, 계약, 해약, 해지, 해제, 구매 또는 취득하게 되는 제품 또는 기타 정보(이하 "제품")의 질에 대해서도 어떠한 보증도 하지 않습니다.
<!-- 					카드매출 데이터 : 출처 (비씨카드) / 유동인구 데이터 : 출처 (KT) -->
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="wrap_inner forMo" style="overflow:hidden;">
		<div class="step step0 active">
<!-- 			<dl class="datalist_common">
				<dt>브랜드명으로 검색</dt>

				<dd>
					<div class="box_search radius">
						<input type="text" name="searchFrchsNmMob" id="searchFrchsNmMob" placeholder="브랜드명을 입력해주세요">
						<button></button>
					</div>
				</dd>
			</dl> -->
			<div id="mobMenuDiv" class="swiper-container swiper_mypage forMo" style="margin-bottom:16px;"></div>
			<dl class="datalist_common">
				<dt>분석정보 설정으로 검색</dt>

				<dd>
					<select name="brandYearMob" id="brandYearMob" class="w100p radius">
						<option value="전체">연도선택</option>
					</select>

					<div class="box_col col2">
						<select name="brandLdClassMob" id="brandLdClassMob" class="radius">
							<option value="전체">업종 대분류</option>
						</select>

						<select name="brandMdClassMob" id="brandMdClassMob" class="radius" disabled>
							<option value="전체">업종 중분류</option>
						</select>
					</div>

					<select name="brandFrcClassMob" id="brandFrcClassMob" class="w100p radius" disabled>
						<option value="전체">프랜차이즈명</option>
					</select>
				</dd>
			</dl>

<!-- 			<div class="box_btn block h50 fix"><button onclick="stepView(1);">조회하기</button></div> -->
			<div class="box_btn block h50 fix"><button id="viewBrandBtnMob">조회하기</button></div>
		</div>

		<div class="step step1">
			<div class="brandInfo">
				<!-- 로그인 주석에따른 경로 주석 22.06.21-->
				<!-- <button class="favorite"></button> -->
 				<button class="share kakaoShare"></button>
				<a class="download"></a>

				<p class="name" id="m1_bsnSgnal" style="width:60%"></p>

				<div class="wrapbox">
					<div class="mGraph4">
						<div class="ls">
							<span class="t" style="color:#d42363;">수익성
								<span class="lMsg" style="width:150px">당기순이익 / 총자산 * 100</span> <!-- add20210306 -->
							</span>
							<span class="c prftblGrad">
<!-- 							<span style="background-color:#d42363;"></span><span style="background-color:#d42363;"></span><span style="background-color:#d42363;"></span><span></span><span></span> -->
							</span>
						</div>
						<div class="ls">
							<span class="t" style="color:#43c0a2;">공정성
								<span class="lMsg" style="width:200px">공정거래위원회의 시정조치 건수 + 민사소송 패소 및 민사상 화해 건수 + 형의 선고 건수</span> <!-- add20210306 -->
							</span>
							<span class="c fairGrad">
							<!-- <span style="background-color:#43c0a2;"></span><span style="background-color:#43c0a2;"></span><span style="background-color:#43c0a2;"></span><span></span><span></span> -->
							</span>
						</div>
						<div class="ls">
							<span class="t" style="color:#6f45b1;">성장성
								<span class="lMsg" style="width:170px">당기매출액 / 전기매출액 * 100</span> <!-- add20210306 -->
							</span>
							<span class="c growthGrad">
<!-- 							<span style="background-color:#6f45b1;"></span><span style="background-color:#6f45b1;"></span><span style="background-color:#6f45b1;"></span><span></span><span></span> -->
							</span>
						</div>
						<div class="ls">
							<span class="t" style="color:#f8a80f;">안전성
								<span class="lMsg" style="width:230px">부채총계 / 자기자본<br>(자본금 + 이익잉여금 + 자본잉여금) * 100</span> <!-- add20210306 -->
							</span>
							<span class="c safeGrad">
<!-- 							<span style="background-color:#f8a80f;"></span><span style="background-color:#f8a80f;"></span><span style="background-color:#f8a80f;"></span><span style="background-color:#f8a80f;"></span><span></span> -->
							</span>
						</div>
					</div>
				</div>
<!-- 				<p class="msg">해당 프랜차이즈의 상기 첨부파일은 가맹본부가 제출한 내용으로 심사없이 공개되는 것임을 알려드립니다.</p> -->
			</div>

			<h4 class="title"><span id="anlyYearMob">2021</span>년 정보공개서 데이터</h4>

			<dl class="datalist_toggle">
				<dt class="active" onclick="dlToogle(this);">본사 기업정보</dt>

				<dd class="active">
					<div class="wrapbox">
						<div class="box">
							<dl class="top">
								<dt>상호</dt>
								<dd id="m2_bsnSgnal" style="font-size: 11px;"></dd>
							</dl>

							<dl>
								<dt>대표자</dt>
								<dd id="m1_rprsntvNm" style="font-size: 11px;"></dd>
							</dl>

							<dl>
								<dt>법인설립등기일</dt>
								<dd id="m1_cprFondRgistDe" style="font-size: 11px;"></dd>
							</dl>

							<dl>
								<dt>대표번호</dt>
								<dd id="m1_reprsntNo" style="font-size: 11px;"></dd>
							</dl>

<!-- 							<dl> -->
<!-- 								<dt>법인번호</dt> -->
<!-- 								<dd id="">123456-123456</dd> -->
<!-- 							</dl> -->

							<dl>
								<dt>사업자등록번호</dt>
								<dd id="m1_bizrno" style="font-size: 11px;"></dd>
							</dl>

							<dl>
								<dt>주소</dt>
								<dd id="m1_adres" style="font-size: 11px;"></dd>
							</dl>
						</div>
					</div>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹본부 재무상황</dt>

				<dd>
					<table class="tbl_row2">
						<colgroup>
							<col style="width:30%;">
							<col style="width:70%;">
						</colgroup>

						<tbody style="text-align:right;">
							<tr>
								<th scope="row" style="text-align: center;">자산</th>
								<td id="m_assets"> 원</td>
							</tr>

							<tr>
								<th scope="row" style="text-align: center;">부채</th>
								<td id="m_debt"> 원</td>
							</tr>

							<tr>
								<th scope="row" style="text-align: center;">자본</th>
								<td id="m_capl"> 원</td>
							</tr>

							<tr>
								<th scope="row" style="text-align: center;">매출액</th>
								<td id="m_selngAm"> 원</td>
							</tr>

							<tr>
								<th scope="row" style="text-align: center;">영업이익</th>
								<td id="m_bsnProfit"> 원</td>
							</tr>

							<tr>
								<th scope="row" style="text-align: center;">당기순이익</th>
								<td id="m_thstrmNtpf">원</td>
							</tr>
						</tbody>
					</table>

					<p class="subTitle">자산</p>
					<span style="float:right;font-size:12px;">(단위 : 천원)</span>
					<div class="chartArea chartAreaMob">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"> -->
						<div class="m_year_chart1" id="m_year_chart1" style="position:relative; left:0vw;"></div>
<!-- 						</div> -->
					</div>

					<p class="subTitle">부채</p>
					<span style="float:right;font-size:12px;">(단위 : 천원)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_year_chart2" id="m_year_chart2" style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>

					<p class="subTitle">자본</p>
					<span style="float:right;font-size:12px;">(단위 : 천원)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_year_chart3" id="m_year_chart3" style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>

					<p class="subTitle">매출액</p>
					<span style="float:right;font-size:12px;">(단위 : 천원)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_year_chart4" id="m_year_chart4" style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>

					<p class="subTitle">영업이익</p>
					<span style="float:right;font-size:12px;">(단위 : 천원)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_year_chart5" id="m_year_chart5" style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>

					<p class="subTitle">당기순이익</p>
					<span style="float:right;font-size:12px;">(단위 : 천원)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_year_chart6" id="m_year_chart6" style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹사업 임직원 수</dt>
			
				<dd>
					<ul>
						<li>
							<dl>
								<dt>임직원 수</dt>
								<dd>
									<span><strong id="m_staffCnt"></strong>(단위 : 명)</span>
								</dd>
							</dl>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">면적당 인테리어 비용</dt>
				<dd>
					<ul>
						<li>
							<dl>
								<dt>인테리어 비용</dt>
								<dd>
									<span><strong id="m1_unitArIntrrCt"></strong>(단위 : 천원)</span>
								</dd>
							</dl>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹점 및 직영점 현황</dt>
			
				<dd>
					<table class="tbl_row2">
						<colgroup>
							<col style="width:30%;">
							<col style="width:70%;">
						</colgroup>
					
						<tbody>
							<tr>
								<th scope="row">전체 가맹점수</th>
								<td id="m_year_9"> 개</td>
							</tr>
					
							<tr>
								<th scope="row">전체 직영점수</th>
								<td id="m_year_10"> 개</td>
							</tr>
						</tbody>
					</table>
					
					<p class="subTitle">전체 가맹점수</p>
					<span style="float:right;font-size:12px;">(단위 : 개)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_year_chart9" id="m_year_chart9" style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
					
					<p class="subTitle">전체 직영점수</p>
					<span style="float:right;font-size:12px;">(단위 : 개)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_year_chart10" id="m_year_chart10" style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹점 변동 현황</dt>
			
				<dd>
					<table class="tbl_row2">
						<colgroup>
							<col style="width:30%;">
							<col style="width:70%;">
						</colgroup>
					
						<tbody>
							<tr>
								<th scope="row">신규개점</th>
								<td id="m_year_11"> 개</td>
							</tr>
					
							<tr>
								<th scope="row">계약종료</th>
								<td id="m_year_12"> 개</td>
							</tr>

							<tr>
								<th scope="row">계약해지</th>
								<td id="m_year_13"> 개</td>
							</tr>

							<tr>
								<th scope="row">계약명의변경</th>
								<td id="m_year_14"> 개</td>
							</tr>
						</tbody>
					</table>
					
					<p class="subTitle">신규개점</p>
					<span style="float:right;font-size:12px;">(단위 : 개)</span>
					<div class="chartArea chartAreaMob" id="chartAreaId">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
							<div class="m_year_chart11" id="m_year_chart11" style="position:relative; left:0vw;"></div>
					</div>
					
					<p class="subTitle">계약종료</p>
					<span style="float:right;font-size:12px;">(단위 : 개)</span>
					<div class="chartArea chartAreaMob">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
						<div class="m_year_chart12" id="m_year_chart12" style="position:relative; left:0vw;"></div>
					</div>

					<p class="subTitle">계약해지</p>
					<span style="float:right;font-size:12px;">(단위 : 개)</span>
					<div class="chartArea chartAreaMob">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
						<div class="m_year_chart13" id="m_year_chart13" style="position:relative; left:0vw;"></div>
					</div>

					<p class="subTitle">계약명의변경</p>
					<span style="float:right;font-size:12px;">(단위 : 개)</span>
					<div class="chartArea chartAreaMob">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
						<div class="m_year_chart14" id="m_year_chart14" style="position:relative; left:0vw;"></div>
					</div>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹점 사업자의 평균매출액 및 면적당 매출액</dt>
			
				<dd>
					<table class="tbl_row2">
						<colgroup>
							<col style="width:30%;">
							<col style="width:70%;">
						</colgroup>
					
						<tbody>
							<tr>
								<th scope="row">평균 매출액</th>
								<td id="m_year_15"> 천원</td>
							</tr>
					
							<tr>
								<th scope="row">면적당 매출액</th>
								<td id="m_year_16"> 천원</td>
							</tr>
						</tbody>
					</table>
					
					<p class="subTitle">평균 매출액</p>
					<span id="span_15" style="float:right;font-size:12px;">(단위 : 천원)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_sido_chart15" id="m_sido_chart15" style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
					
					<p class="subTitle">면적당 매출액</p>
					<span id="span_16" style="float:right;font-size:12px;">(단위 : 천원)</span>
					<div class="chartArea chartAreaMob">
						<div class="m_sido_chart16" id="m_sido_chart16"style="position:relative; left:0vw;"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
				</dd>
			</dl>

<!-- 			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">브랜드 코멘트</dt>
			
				<dd>
					<p id="m1_rewardCn" class="txt"></p>
				</dd>
			</dl> -->

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">광고 판촉비 내역</dt>
			
				<dd>
					<ul>
						<li>
							<dl>
								<dt>광고비</dt>
								
								<dd><span><strong id="m1_advrtsCt"></strong>(단위 : 천원)</span></dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>판촉비</dt>

								<dd><span><strong id="m1_promtnCt"></strong>(단위 : 천원)</span></dd>
							</dl>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹본부와 그 임원의 법 위반 사실</dt>
			
				<dd>
					<ul>
						<li>
							<dl>
								<dt>공정거래위원회의시정조치</dt>

								<dd><span><strong id="m1_ftcCorecManagtCo"></strong>(단위 : 건)</span></dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>민사소송 패소 및 민사상 화해</dt>
						
								<dd><span><strong id="m1_cfrsCo"></strong>(단위 : 건)</span></dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>형의 선고</dt>
						
								<dd><span><strong id="m1_petyCo"></strong>(단위 : 건)</span></dd>
							</dl>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹점사업자의 부담금</dt>
				<dd>
					<ul>
						<li>
							<dl>
								<dt>교육비</dt>
						
								<dd><span><strong id="m1_edcct"></strong>(단위 : 천원)</span></dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>가입비</dt>
						
								<dd><span><strong id="m1_srbct"></strong>(단위 : 천원)</span></dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>보증금</dt>
						
								<dd><span><strong id="m1_gtn"></strong>(단위 : 천원)</span></dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>기타비용</dt>
						
								<dd><span><strong id="m1_etcCt"></strong>(단위 : 천원)</span></dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>합계</dt>
						
								<dd><span><strong id="m1_sm"></strong>(단위 : 천원)</span></dd>
							</dl>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹계약기간</dt>
			
				<dd>
					<ul>
						<li>
							<dl>
								<dt>최초</dt>
						
								<dd><span><strong id="m1_cntrctFrst"></strong>(단위 : 년)</span></dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>연장</dt>
						
								<dd><span><strong id="m1_cntrctExtn"></strong>(단위 : 년)</span></dd>
							</dl>
						</li>
					</ul>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">브랜드 리뷰</dt>
			
				<dd>
					<p class="txt review1"></p>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">브랜드 뉴스</dt>
			
				<dd>
					<p class="txt news1"></p>
				</dd>
			</dl>
			<!-- [M 2022-02-15] 추가 S -->
			<!-- 메세지 -->
			<div class="warningMsg">경기도는 본 웹사이트의 서비스로부터 제공되는 데이터 및 정보는 단순 참고 사항임을 알려드리며, 관련 정보에 어떠한 보증도 하지 않습니다.</div>
			<!-- //메세지 -->
			<!-- [M 2022-02-15] 추가 E -->

			<div class="box_btn block h50 gray fix"><button onclick="stepView(0);">이전으로</button></div>
		</div>
	</div>
	<div id="popupDiv"></div>
</article>
<script>
function stepView(no) {
	var wW = window.innerWidth;

	$('.step').removeClass('active');
	$('.step' + no).addClass('active');

	if (wW < 751) { // mo
		if (no == 0) { // 프랜차이즈 정보
			$('h3.subtitle').text('프랜차이즈 정보');
		} else if (no == 1) { // 검색결과
			$('h3.subtitle').text('검색결과');
		}
	}
}
</script>
