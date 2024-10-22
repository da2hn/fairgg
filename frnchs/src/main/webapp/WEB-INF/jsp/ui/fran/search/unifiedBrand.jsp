<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/unifiedBrand.js"/>"></script>
<!-- sub 필터메뉴 js -->
<!-- [Dev] id에 페이지명 -->
<style>
#footer .forMo {display:none;}
</style>
<input type="hidden" id="frnchsNo" value="${hnd_schFrnchsNo}">
<input type="hidden" id="brandYear" value="${brandYear}">
<article id="franchiseInfo" class="franchise">
	<h3 class="subtitle forMo">프랜차이즈 정보</h3>

	<div class="body forPc">
		<div class="bg">
			<div class="content bgType1">

				<div class="step step1 active">
					<div class="gTitle2">
						<h5 class="mTitle4 iLogo left" >프랜차이즈명 <span class="ts">2019년 기준</span></h5>

						<span class="gRt">
							<a href="#" class="mBtn1 download">첨부파일 다운로드</a>
						</span>
					</div>

					<div class="mSub6">
						<div class="con">
							<h6>기본정보</h6>

							<div class="mBoard1">
								<table>
									<colgroup></colgroup>

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
								<span class="gRt">(단위:%)</span>

								<div class="list">
									<div class="ls"><strong id="staffCnt"></strong></div>
								</div>
							</div>

							<div class="con">
								<h6>면적당 인테리어비용</h6>
								<span class="gRt">(단위:천원)</span>

								<div class="list">
									<div class="ls"><strong id="c1_unitArIntrrCt"></strong></div>
								</div>
							</div>
						</div>

						<div class="con">
							<h6>가맹점 및 직영점 현황</h6>
							<span class="gRt">(단위:개)</span>

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
							<span class="gRt">(단위:개)</span>
						
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
							<span class="gRt">(단위:천원)</span>
						
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

						<div class="con">
							<h6>브랜드 코멘트</h6>

							<div class="list">
								<div class="ls"></div>
							</div>
						</div>

						<div class="con">
							<h6>광고 판촉비 내역</h6>
							<span class="gRt">(단위:천원)</span>

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
							<span class="gRt">(단위:건)</span>
						
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
							<span class="gRt">(단위:천원)</span>
						
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
							<span class="gRt">(단위:년)</span>

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
								<div class="ls review1"></div>
							</div>
						</div>

						<div class="con">
							<h6>브랜드 뉴스</h6>

							<div class="list">
								<div class="ls news1"></div>
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

	<div class="wrap_inner forMo">
		<div class="step step1 active">
			<div class="brandInfo">
				<button class="favorite"></button>
				<button class="share"></button>

				<p class="name" id="m1_bsnSgnal">세븐일레븐</p>

				<div class="wrapbox">
					<div class="mGraph4">
						<div class="ls">
							<span class="t" style="color:#d42363;">수익성
								<span class="lMsg" style="width:150px">당기순이익 / 총자산 * 100</span> <!-- add20210306 -->
							</span>
							<span class="c prftblGrad"><span style="background-color:#d42363;"></span><span style="background-color:#d42363;"></span><span style="background-color:#d42363;"></span><span></span><span></span></span>
						</div>
						<div class="ls">
							<span class="t" style="color:#43c0a2;">공정성
								<span class="lMsg" style="width:200px">공정거래위원회의 시정조치 건수 + 민사소송 패소 및 민사상 화해 건수 + 형의 선고 건수</span> <!-- add20210306 -->
							</span>
							<span class="c fairGrad"><span style="background-color:#43c0a2;"></span><span style="background-color:#43c0a2;"></span><span style="background-color:#43c0a2;"></span><span></span><span></span></span>
						</div>
						<div class="ls">
							<span class="t" style="color:#6f45b1;">성장성
								<span class="lMsg" style="width:170px">당기매출액 / 전기매출액 * 100</span> <!-- add20210306 -->
							</span>
							<span class="c growthGrad"><span style="background-color:#6f45b1;"></span><span style="background-color:#6f45b1;"></span><span style="background-color:#6f45b1;"></span><span></span><span></span></span>
						</div>
						<div class="ls">
							<span class="t" style="color:#f8a80f;">안전성
								<span class="lMsg" style="width:230px">부채총계 / 자기자본<br>(자본금 + 이익잉여금 + 자본잉여금) * 100</span> <!-- add20210306 -->
							</span>
							<span class="c safeGrad"><span style="background-color:#f8a80f;"></span><span style="background-color:#f8a80f;"></span><span style="background-color:#f8a80f;"></span><span style="background-color:#f8a80f;"></span><span></span></span>
						</div>
					</div>
				</div>
			</div>

			<h4 class="title">2021년 정보공개서 데이터</h4>

			<dl class="datalist_toggle">
				<dt class="active" onclick="dlToogle(this);">본사 기업정보</dt>

				<dd class="active">
					<div class="wrapbox">
						<div class="box">
							<dl class="top">
								<dt>상호</dt>
								<dd id="m2_rprsntvNm">세븐일레븐</dd>
							</dl>

							<dl>
								<dt>대표자</dt>
								<dd id="m1_rprsntvNm"></dd>
							</dl>

							<dl>
								<dt>법이설립등기일</dt>
								<dd id="m1_cprFondRgistDe"></dd>
							</dl>

							<dl>
								<dt>대표번호</dt>
								<dd id="m1_reprsntNo"></dd>
							</dl>

<!-- 							<dl> -->
<!-- 								<dt>법인번호</dt> -->
<!-- 								<dd id="">123456-123456</dd> -->
<!-- 							</dl> -->

							<dl>
								<dt>사업자등록번호</dt>
								<dd id="m1_bizrno"></dd>
							</dl>

							<dl>
								<dt>주소</dt>
								<dd id="m1_adres"></dd>
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

						<tbody>
							<tr>
								<th scope="row">자산</th>
								<td id="m_assets"> 천원</td>
							</tr>

							<tr>
								<th scope="row">부채</th>
								<td id="m_debt"> 천원</td>
							</tr>

							<tr>
								<th scope="row">자본</th>
								<td id="m_capl"> 천원</td>
							</tr>

							<tr>
								<th scope="row">매출액</th>
								<td id="m_selngAm">천원</td>
							</tr>

							<tr>
								<th scope="row">영업이익</th>
								<td id="m_bsnProfit"> 천원</td>
							</tr>

							<tr>
								<th scope="row">당기순이익</th>
								<td id="m_thstrmNtpf">천원</td>
							</tr>
						</tbody>
					</table>

					<p class="subTitle">자산</p>
					<div class="chartArea">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"> -->
						<div class="m_year_chart1" id="m_year_chart1"></div>
<!-- 						</div> -->
					</div>

					<p class="subTitle">부채</p>
					<div class="chartArea">
						<div class="m_year_chart2" id="m_year_chart2"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>

					<p class="subTitle">자본</p>
					<div class="chartArea">
						<div class="m_year_chart3" id="m_year_chart3"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>

					<p class="subTitle">매출액</p>
					<div class="chartArea">
						<div class="m_year_chart4" id="m_year_chart4"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>

					<p class="subTitle">영업이익</p>
					<div class="chartArea">
						<div class="m_year_chart5" id="m_year_chart5"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>

					<p class="subTitle">당기순이익</p>
					<div class="chartArea">
						<div class="m_year_chart6" id="m_year_chart6"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">가맹사업 임직원 수</dt>
			
				<dd>
					<div class="wrapbox" id="m_staffCnt">
						
					</div>
<!-- 					<div class="chartArea"> -->
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
<!-- 					</div> -->
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">면적당 인테리어 비용</dt>
			
				<dd>
					<div class="wrapbox" id="m1_unitArIntrrCt">
						
					</div>
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
					<div class="chartArea">
						<div class="m_year_chart9" id="m_year_chart9"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
					
					<p class="subTitle">전체 직영점수</p>
					<div class="chartArea">
						<div class="m_year_chart10" id="m_year_chart10"></div>
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
					<div class="chartArea">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
							<div class="m_year_chart11" id="m_year_chart11"></div>
					</div>
					
					<p class="subTitle">계약종료</p>
					<div class="chartArea">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
						<div class="m_year_chart12" id="m_year_chart12"></div>
					</div>

					<p class="subTitle">계약해지</p>
					<div class="chartArea">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
						<div class="m_year_chart13" id="m_year_chart13"></div>
					</div>

					<p class="subTitle">계약명의변경</p>
					<div class="chartArea">
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
						<div class="m_year_chart14" id="m_year_chart14"></div>
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
					<div class="chartArea">
						<div class="m_sido_chart15" id="m_sido_chart15"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
					
					<p class="subTitle">면적당 매출액</p>
					<div class="chartArea">
						<div class="m_sido_chart16" id="m_sido_chart16"></div>
<!-- 						<div class="chart" style="width:100%; height:170px; background:#f1f1f1;"></div> -->
					</div>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">브랜드 코멘트</dt>
			
				<dd>
					<p class="txt"></p>
				</dd>
			</dl>

			<dl class="datalist_toggle">
				<dt onclick="dlToogle(this);">광고 판촉비 내역</dt>
			
				<dd>
					<ul>
						<li>
							<dl>
								<dt>광고비</dt>

								<dd><strong id="m1_advrtsCt"></strong>천원</dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>판촉비</dt>

								<dd><strong  id="m1_promtnCt"></strong>천원</dd>
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

								<dd><strong id="m1_ftcCorecManagtCo"></strong>건</dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>민사소송 패소 및 민사상 화해</dt>
						
								<dd><strong id="m1_cfrsCo"></strong>건</dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>형의 선고</dt>
						
								<dd><strong id="m1_petyCo"></strong>건</dd>
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
						
								<dd><strong id="m1_edcct"></strong>천원</dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>가입비</dt>
						
								<dd><strong id="m1_srbct"></strong>천원</dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>보증금</dt>
						
								<dd><strong id="m1_gtn"></strong>천원</dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>기타비용</dt>
						
								<dd><strong id="m1_etcCt"></strong>천원</dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>합계</dt>
						
								<dd><strong id="m1_sm"></strong>천원</dd>
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
						
								<dd><strong id="m1_cntrctFrst"></strong>년</dd>
							</dl>
						</li>

						<li>
							<dl>
								<dt>연장</dt>
						
								<dd><strong id="m1_cntrctExtn"></strong>년</dd>
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

			<div class="box_btn block h50 gray fix"><button onclick="stepView(0);">이전으로</button></div>
		</div>
	</div>
</article>
