<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/searchList.js"/>"></script>
<style>
.body {padding-bottom:70px;}
 .mGraph4 {
border : 0px;
margin : 0px;
}
.mGraph4 .ls:before{
width:0px;
}
</style>
<script type="text/javaScript">
$(document).ready(function() {
	/* $("#footer").hide(); */
	
})
</script>
<article id="brandCompare">
	<h3 class="subtitle forMo">브랜드비교검색</h3>
	<!-- body -->
	<div class="body wType1 forPc">
		<div class="bg forPc">

			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
				<input type="hidden" name="pageIndexMob" value="" />
				<input type="hidden" name="pageIndexMobMax" value="" />
			</form>

			<h5 class="mTitle4 iLogo left"><span>프랜차이즈 검색</span></h5>
			
			<!-- [M 2022-01-18] 추가 -->
			<!-- 자주찾는 인기 브랜드 TOP10 -->
			<div class="hotBrand">
				<dl>
					<dt>자주찾는 인기 브랜드 TOP10</dt>
					<dd id="topList">
			<!-- 			<a href="#"><span>네네치킨</span></a>
						<a href="#"><span>놀부부대찌개</span></a>
						<a href="#"><span>씨유 (CU)</span></a>
						<a href="#"><span>교촌치킨</span></a>
						<a href="#"><span>롯데리아</span></a>
						<a href="#"><span>맥도날드</span></a>
						<a href="#"><span>피자헛 (Pizzahut)</span></a>
						<a href="#"><span>세븐일레븐 (SEVEN ELEVEN)</span></a>
						<a href="#"><span>남도애꽃</span></a>
						<a href="#"><span>어썸에그 (AWESOME EGG)</span></a> -->
					</dd>
				</dl>
			</div>
			<!-- //자주찾는 인기 브랜드 TOP10 -->
			
			<%-- 문구 추가 - 21.02.16 --%>
			<ul class="mList3" style="padding: 20px 0px;">
				<li>
				경기도는 본 웹 사이트의 서비스로부터 제공되는 데이터 및 정보는 단순 참고 사항이며, 사실과 차이가 있을 수 있어 정확성이나 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스와 관련된 광고, 기타 정보 또는 제안의 결과로서
				창업, 계약, 해약, 해지, 해제, 구매 또는 취득하게 되는 제품 또는 기타 정보(이하 "제품")의 질에 대해서도 어떠한 보증도 하지 않습니다. 
<!-- 				카드매출 데이터 : 출처 (비씨카드) / 유동인구 데이터 : 출처 (KT) -->
				</li>
			</ul>
			<div class="mList4">
				<dl>
				<dt class="type1">
					<a href="javascript:void(0)" class="sel"><span class="st">STEP 1</span> <span class="ti">업종 선택</span></a>
					<div class="gRt">
						<a href="javascript:void(0)" id="r_job" class="btnRelease choice">선택해제</a>
					</div>
				</dt>
				<dd class="type1">
					<label for="labelList1_1" class="ti">대분류 업종</label>
					<select id="labelList1_1" class="select ldClass" title="대분류 업종">
					<option value="">전체</option>
					</select>
					<label for="labelList1_2" class="ti">중분류 업종</label>
					<select id="labelList1_2" class="select mdClass" title="중분류 업종">
					<option value="">전체</option>
					</select>
				</dd>
				<dt class="type2">
					<a href="javascript:void(0)" class="sel"><span class="st">STEP 2</span> <span class="ti">창업비용 선택</span></a>
					<div class="gRt">
						<a href="javascript:void(0)" id="r_cost" class="btnRelease choice">선택해제</a>
					</div>
				</dt>
				<dd class="type2">
					<div class="ls">
						<span class="ti">가맹점사업자의 부담금</span>
						<span class="gBtn1 levy">
							<a href="javascript:void(0)" id="levy_all" class="selected levy_all">전체</a>
							<a href="javascript:void(0)" id="levy_1">1,000만원~3,000만원 이하</a>
							<a href="javascript:void(0)" id="levy_3">3,000만원~5,000만원 이하</a>
							<a href="javascript:void(0)" id="levy_5">5,000만원~1억원 이하</a>
							<a href="javascript:void(0)" id="levy_10">1억원~2억원 이하</a>
							<a href="javascript:void(0)" id="levy_20">2억원 이상</a>
						</span>
					</div>
					<div class="ls">
						<span class="ti">인테리어 비용</span>
						<span class="gBtn1 inte">
							<a href="javascript:void(0)" id="inte_all" class="selected">전체</a>
							<a href="javascript:void(0)" id="inte_1">1,000만원~3,000만원 이하</a>
							<a href="javascript:void(0)" id="inte_3">3,000만원~5,000만원 이하</a>
							<a href="javascript:void(0)" id="inte_5">5,000만원~1억원 이하</a>
							<a href="javascript:void(0)" id="inte_10">1억원~2억원 이하</a>
							<a href="javascript:void(0)" id="inte_20">2억원 이상</a>
						</span>
					</div>
				</dd>
				<%-- 창업 희망 지역 제거 - 21.02.15
				<dt class="type3">
					<a href="javascript:void(0)" class="sel"><span class="st">STEP 3</span> <span class="ti">창업희망 지역 선택</span></a>
					<div class="gRt">
						<a href="javascript:void(0)" id="r_sido" class="btnRelease">선택해제</a>
					</div>
				</dt>
				<dd class="type3 sido">
					<!-- 가변영역 -->
				</dd>	
				--%>
				<dt class="type4">
					<a href="javascript:void(0)" class="sel"><span class="st">STEP 3</span> <span class="ti">서브 조건 선택</span></a>
					<div class="gRt">
						<a href="javascript:void(0)" id="r_sub" class="btnRelease choice">선택해제</a>
					</div>
				</dt>
				<dd class="type4">
					<%-- 표기 안되게 - 21.02.15
					<label for="labelList2_1" class="ti">폐업률</label>
					<select id="labelList2_1" class="select cls_rate" name="closeRate" title="폐업률">
						<option value="">전체</option>
						<option value="under10p">10% 이하</option>
						<option value="betwen10to20p">10% 초과 20% 이하</option>
						<option value="over20p">20% 초과</option>
					</select>
					--%>
					<label for="labelList2_2" class="ti">본사업력</label>
					<select id="labelList2_2" class="select biz_year" name="histYear" title="본사업력">
						<option value="">전체</option>
						<option value="under1y">1년 이하</option>
						<option value="between1to3y">1년 초과 3년 이하</option>
						<option value="over3y">3년 초과</option>
					</select>
					<label for="labelList2_3" class="ti">본사부채비율</label>
					<select id="labelList2_3" class="select debt_ratio" name="deptRatio" title="본사부채비율">
						<option value="">전체</option>
						<option value="under50p">50% 미만</option>
						<option value="between50to100p">50% 초과 100% 미만</option>
						<option value="over100p">100% 초과</option>
					</select>
					<%-- 표기 안되게 - 21.02.15
					<label for="labelList2_4" class="ti">면적(3.3㎡)당 평균매출액 </label>
					<select id="labelList2_4" class="select avg_sale" name="unitArAvrgSelngAm" title="면적(3.3㎡)당 평균매출액 ">
						<option value="">전체</option>
						<option value="under5000">5,000만원 이하</option>
						<option value="between5000to10000">5,000만원 ~ 1억원</option>
						<option value="over10000">1억원 초과</option>
					</select>
					--%>
				</dd>
				</dl>
				<div class="list condition_list">
					<span class="st">선택조건</span>
					<!--
					<p class="nolist">상위 조건을 선택해주세요.</p>
					-->
					<div class="mAttach1">
						<!-- <a href="javascript:void(0)" id="r_all" class="btnRelease">전체해제</a> -->
					</div>
				</div>
			</div>

			<div class="gTitle2">
				<h5 class="mTitle2 noline">
					<span class="ti">결과 내 검색 (<span class="cnt" id="totalCnt"></span>)</span>
					<span class="ts">브랜드를 선택하여 비교해 정보를 비교해보세요.</span>
				</h5>
				<%-- 신규버튼 추가 - 21.02.16 --%>
				<div class="gRt" style="top: -10px; right: 100px;">
					<a href="javascript:void(0)" class="mBtn1 primary compareBtn" style="min-width: 100px">브랜드비교</a>
				</div>
				<div class="gRt">
					<select class="select recordCountPerPage" title="분류">
						<option value="10">10개씩</option>
						<option value="20">20개씩</option>
						<option value="50">50개씩</option>
					</select>
				</div>
			</div>
			<div class="mBoard1 noline">
				<table summary="선택, 브랜드명, 대분류업종, 중분류업종, 창업비용, 창업희망지역, 폐점율, 본사업력, 본사부채비율, 면적(3.3㎡)당 평균매출액(단위/천원), 프랜차이즈 정보로 구성된 표입니다.">
				<colgroup>
					<col style="width:5%;">
					<col style="width:auto;">
					<col style="width:8%;">
					<col style="width:8%;">
					<col style="width:8%;">
					<col style="width:6%;">
					<col style="width:7%;">
					<col style="width:24%;">
					<col style="width:8%;">
					<col style="width:9%;">
				</colgroup>				
				<caption>결과 내 검색</caption>
				<thead>
				<tr>
					<th scope="col">선택</th>
					<th scope="col">브랜드명</th>
					<th scope="col">대분류업종</th>
					<th scope="col">중분류업종</th>
					<th scope="col">창업비용<br>(단위 : 천원)</th>
					<%-- 창업 희망 지역 제거 - 21.02.15
					<th scope="col">창업희망지역</th>
					--%>
					<%-- 표기 안되게 - 21.02.15
					<th scope="col">폐점율</th>
					--%>
					<th scope="col">본사업력</th>
					<th scope="col">본사부채<br>비율</th>
					<!-- <th scope="col">면적(3.3㎡)당 평균매출액<br> (단위/천원)</th> -->
					<th scope="col" class="relative">
					본사 주요 지표
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
					</th>
					<th scope="col">정보공개서</th>
					<th scope="col">프랜차이즈 정보</th>
				</tr>
				</thead>

				<tbody id="dataTbody">
					<tr>
						<td colspan="10">조회된 데이터가 없습니다.</td>
					</tr>
				</tbody>

				<!-- <tr>
					<td>
						<span class="mCheckbox notext">
							<input type="checkbox" id="labelCheckbox1_1" name="checkbox1" title="선택" checked="checked">
							<label for="labelCheckbox1_1">선택</label>
						</span>
					</td>
					<td>
						<a href="javascript:void(0)" class="ul">박수근네온천골</a>
						<a href="javascript:void(0)" class="iFavor">추천</a>
					</td>
					<td>외식</td>
					<td>한식</td>
					<td>45,000,000원</td>
					<td>서울</td>
					<td>30%</td>
					<td>12년</td>
					<td>110%</td>
					<td>60,000</td>
					<td>
						<a href="javascript:void(0)" class="mBtn1 m lPrimary">상세보기</a>
					</td>
				</tr> -->
				</table>
			</div>

			<!-- paging -->
			<div class="mPag">
			</div>

			<!-- //paging -->
			<div class="mButton1 posLt">
				<%-- 버튼 색상 및 크기 변경 - 21.02.16 --%>
				<a href="javascript:void(0)" class="mBtn1 primary compareBtn" style="min-width: 100px">브랜드비교</a>
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
	<!-- //body -->
	
	<div class="wrap_inner forMo">
				<div class="step step0 active">
					<dl class="datalist_common">
						<dt>업종선택하기</dt>
						<dd class="type2">
							<div class="box_col col2">
								<select id="ldId" class="radius">
									<!-- <option value="" selected disabled hidden>대분류 업종</option> -->
								</select>

								<select id="mdId" class="radius">
									<option value="" selected disabled hidden>중분류 업종</option>
								</select>
							</div>
						</dd>
					</dl>

					<dl class="datalist_common">
						<dt>창업비용 선택하기</dt>
						<dd>
							<div class="box_col col2">
								<select id="selLevyMob" class="radius">
									<option value="" selected disabled hidden>가맹점주부담금</option>
									<option value="">전체</option>
									<option value="levy_1">1,000만원~3,000만원 이하</option>
									<option value="levy_3">3,000만원~5,000만원 이하</option>
									<option value="levy_5">5,000만원~1억원 이하</option>
									<option value="levy_10">1억원~2억원 이하</option>
									<option value="levy_20">2억원 이상</option>
								</select>
							
								<select id="selInteMob" class="radius">
									<option value="" selected disabled hidden>인테리어 비용</option>
									<option value="">전체</option>
									<option value="inte_1">1,000만원~3,000만원 이하</option>
									<option value="inte_3">3,000만원~5,000만원 이하</option>
									<option value="inte_5">5,000만원~1억원 이하</option>
									<option value="inte_10">1억원~2억원 이하</option>
									<option value="inte_20">2억원 이상</option>
								</select>
							</div>
						</dd>
					</dl>

					<dl class="datalist_common">
						<dt>서브조건 선택하기</dt>
						<dd>
							<div class="box_col col2">
								<select id="" name="mobHistYear" class="radius">
								<option value="" selected disabled hidden>본사업력</option>
									<option value="">전체</option>
									<option value="under1y">1년 이하</option>
									<option value="between1to3y">1년 초과 3년 이하</option>
									<option value="over3y">3년 초과</option>
								</select>
					
								<select id="" name="mobDeptRatio" class="radius">
								<option value="" selected disabled hidden>본사부채비율</option>
									<option value="">전체</option>
									<option value="under50p">50% 미만</option>
									<option value="between50to100p">50% 초과 100% 미만</option>
									<option value="over100p">100% 초과</option>
								</select>
							</div>
						</dd>
					</dl>

					<!-- <div class="btn" style="text-align:center;margin-top:20px;margin-bottom:10px;">
						<div class="box_btn w150 h40 radius gray"><button onclick="location.href='/fran/search/searchList.do'">초기화</button></div>
					</div> -->
					<div class="btn_col2 col2" style="text-align:center;margin-top:20px;margin-bottom:30px;">
						<div class="box_btn w150 h40 radius" style="margin-left:5px"><button onclick="fn_searchMob()" style="width:90%">검색</button></div>
						<div class="box_btn w150 h40 radius gray" style="margin-right:5px"><button style="width:90%" onclick="location.href='/fran/search/searchList.do'">초기화</button></div>
					</div>

<!-- 					<div class="box_btn block h50 fix"><button onclick="stepView(1);">조회하기</button></div> -->
				</div>

				<div class="step step1">
					<p class="total" style="margin-bottom:3px">전체 <strong id="totalCntMob"></strong> 건</p>

					<div class="search" style="margin-bottom:20px;">
						<div class="box_search radius">
							<input type="text" name="" id="btnMobSearchVal" placeholder="결과 내 브랜드명 재검색">
							<button id="btnMobSearch"></button>
						</div>	
					</div>
					
					<!-- [M 2022-01-18] 추가 -->
					<!-- 자주찾는 인기 브랜드 TOP10 -->
					<div class="hotBrand">
						<dl>
							<dt>자주찾는 인기 브랜드 TOP10</dt>
	
							<dd id="topListMob">
							<!-- 	<a href="#"><span>네네치킨</span></a>
								<a href="#"><span>놀부부대찌개</span></a>
								<a href="#"><span>씨유 (CU)</span></a>
								<a href="#"><span>교촌치킨</span></a>
								<a href="#"><span>롯데리아</span></a>
								<a href="#"><span>맥도날드</span></a>
								<a href="#"><span>피자헛 (Pizzahut)</span></a>
								<a href="#"><span>세븐일레븐 (SEVEN ELEVEN)</span></a>
								<a href="#"><span>남도애꽃</span></a>
								<a href="#"><span>어썸에그 (AWESOME EGG)</span></a> -->
							</dd>
						</dl>
					</div>
					<!-- //자주찾는 인기 브랜드 TOP10 -->

					<ul id="dataTbodyMob" class="list_box radius">
					</ul>

					<div class="box_btn block h40 radius white more" style="margin-top:20px;"><button id="pagingMob"></button></div>

					<div class="box_btn block h50 lgray fix"><button id="btnComp">비교하기</button></div>
				</div>
			</div>

	<div id="popupDiv"></div>
</article>