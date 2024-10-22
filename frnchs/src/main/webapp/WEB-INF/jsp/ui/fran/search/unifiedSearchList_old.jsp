<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javaScript" src="<c:url value="/static/js/ui/fran/search/unifiedSearchList.js"/>"></script>

<style>
.body {padding-bottom:250px;}
</style>

	<!-- body -->
	<div class="body wType1">
		<div class="bg">
			<input type="hidden" name="hdn_ldClass" id="hdn_ldClass" value="<c:out value="${ldClass}" />" />
			<input type="hidden" name="hdn_bsnSgnal" id="hdn_bsnSgnal" value="<c:out value="${bsnSgnal}" />" />
			
			<form id="searchForm" method="post" onsubmit="return false;">
				<input type="hidden" name="pageIndex" value="" />
			</form>

			<h5 class="mTitle4 iLogo left"><span>프랜차이즈 검색</span></h5>
			<%-- 문구 추가 - 21.02.16 --%>
			<ul class="mList3" style="padding: 20px 0px;">
				<li>
				경기도는 본 웹 사이트의 서비스로부터 제공되는 데이터 및 정보는 단순 참고 사항이며, 사실과 차이가 있을 수 있어 정확성이나 신뢰성에 대해 어떠한 보증도 하지 않으며, 서비스와 관련된 광고, 기타 정보 또는 제안의 결과로서
				창업, 계약, 해약, 해지, 해제, 구매 또는 취득하게 되는 제품 또는 기타 정보(이하 "제품")의 질에 대해서도 어떠한 보증도 하지 않습니다. 
<!-- 				카드매출 데이터 : 출처 (비씨카드) / 유동인구 데이터 : 출처 (KT) -->
				</li>
			</ul>
<!-- 			<div class="mList4"> -->
<!-- 				<dl> -->
<!-- 				<dt class="type1"> -->
<!-- 					<a href="javascript:void(0)" class="sel"><span class="st">STEP 1</span> <span class="ti">업종 선택</span></a> -->
<!-- 					<div class="gRt"> -->
<!-- 						<a href="javascript:void(0)" id="r_job" class="btnRelease">선택해제</a> -->
<!-- 					</div> -->
<!-- 				</dt> -->
<!-- 				<dd class="type1"> -->
<!-- 					<label for="labelList1_1" class="ti">대분류 업종</label> -->
<!-- 					<select id="labelList1_1" class="select ldClass" title="대분류 업종"> -->
<!-- 					<option value="">전체</option> -->
<!-- 					</select> -->
<!-- 					<label for="labelList1_2" class="ti">중분류 업종</label> -->
<!-- 					<select id="labelList1_2" class="select mdClass" title="중분류 업종"> -->
<!-- 					<option value="">전체</option> -->
<!-- 					</select> -->

<!-- 				</dd> -->
<!-- 				<dt class="type2"> -->
<!-- 					<a href="javascript:void(0)" class="sel"><span class="st">STEP 2</span> <span class="ti">창업비용 선택</span></a> -->
<!-- 					<div class="gRt"> -->
<!-- 						<a href="javascript:void(0)" id="r_cost" class="btnRelease">선택해제</a> -->
<!-- 					</div> -->
<!-- 				</dt> -->
<!-- 				<dd class="type2"> -->
<!-- 					<div class="ls"> -->
<!-- 						<span class="ti">가맹점사업자의 부담금</span> -->
<!-- 						<span class="gBtn1 levy"> -->
<!-- 							<a href="javascript:void(0)" id="levy_all" class="selected levy_all">전체</a> -->
<!-- 							<a href="javascript:void(0)" id="levy_1">1,000만원~3,000만원 이하</a> -->
<!-- 							<a href="javascript:void(0)" id="levy_3">3,000만원~5,000만원 이하</a> -->
<!-- 							<a href="javascript:void(0)" id="levy_5">5,000만원~1억원 이하</a> -->
<!-- 							<a href="javascript:void(0)" id="levy_10">1억원~2억원 이하</a> -->
<!-- 							<a href="javascript:void(0)" id="levy_20">2억원 이상</a> -->
<!-- 						</span> -->
<!-- 					</div> -->
<!-- 					<div class="ls"> -->
<!-- 						<span class="ti">인테리어 비용</span> -->
<!-- 						<span class="gBtn1 inte"> -->
<!-- 							<a href="javascript:void(0)" id="inte_all" class="selected">전체</a> -->
<!-- 							<a href="javascript:void(0)" id="inte_1">1,000만원~3,000만원 이하</a> -->
<!-- 							<a href="javascript:void(0)" id="inte_3">3,000만원~5,000만원 이하</a> -->
<!-- 							<a href="javascript:void(0)" id="inte_5">5,000만원~1억원 이하</a> -->
<!-- 							<a href="javascript:void(0)" id="inte_10">1억원~2억원 이하</a> -->
<!-- 							<a href="javascript:void(0)" id="inte_20">2억원 이상</a> -->
<!-- 						</span> -->
<!-- 					</div> -->
<!-- 				</dd> -->
<!-- 				<dt class="type4"> -->
<!-- 					<a href="javascript:void(0)" class="sel"><span class="st">STEP 3</span> <span class="ti">서브 조건 선택</span></a> -->
<!-- 					<div class="gRt"> -->
<!-- 						<a href="javascript:void(0)" id="r_sub" class="btnRelease">선택해제</a> -->
<!-- 					</div> -->
<!-- 				</dt> -->
<!-- 				<dd class="type4"> -->
<%-- 					표기 안되게 - 21.02.15
<%-- 					<label for="labelList2_1" class="ti">폐업률</label> --%>
<%-- 					<select id="labelList2_1" class="select cls_rate" name="closeRate" title="폐업률"> --%>
<%-- 						<option value="">전체</option> --%>
<%-- 						<option value="under10p">10% 이하</option> --%>
<%-- 						<option value="betwen10to20p">10% 초과 20% 이하</option> --%>
<%-- 						<option value="over20p">20% 초과</option> --%>
<%-- 					</select> --%>
<!-- 					<label for="labelList2_2" class="ti">본사업력</label> -->
<!-- 					<select id="labelList2_2" class="select biz_year" name="histYear" title="본사업력"> -->
<!-- 						<option value="">전체</option> -->
<!-- 						<option value="under1y">1년 이하</option> -->
<!-- 						<option value="between1to3y">1년 초과 3년 이하</option> -->
<!-- 						<option value="over3y">3년 초과</option> -->
<!-- 					</select> -->
<!-- 					<label for="labelList2_3" class="ti">본사부채비율</label> -->
<!-- 					<select id="labelList2_3" class="select debt_ratio" name="deptRatio" title="본사부채비율"> -->
<!-- 						<option value="">전체</option> -->
<!-- 						<option value="under50p">50% 미만</option> -->
<!-- 						<option value="between50to100p">50% 초과 100% 미만</option> -->
<!-- 						<option value="over100p">100% 초과</option> -->
<!-- 					</select> -->
<!-- 				</dd> -->
<!-- 				</dl> -->
<!-- 				<div class="list condition_list"> -->
<!-- 					<span class="st">선택조건</span> -->
<!-- 					
<!-- 					<p class="nolist">상위 조건을 선택해주세요.</p> -->
<!-- 					-->
<!-- 					<div class="mAttach1"> -->
<!-- 						<a href="javascript:void(0)" id="r_all" class="btnRelease">전체해제</a> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->

			<div class="gTitle2">
				<h5 class="mTitle2 noline">
					<span class="ti">결과 내 검색 (<span class="cnt" id="totalCnt"></span>)</span>
					<span class="ts">브랜드를 선택하여 정보를 확인해보세요.</span>
				</h5>
				<%-- 신규버튼 추가 - 21.02.16 --%>
<!-- 				<div class="gRt" style="top: -10px; right: 100px;"> -->
<!-- 					<a href="javascript:void(0)" class="mBtn1 primary compareBtn" style="min-width: 100px">브랜드비교</a> -->
<!-- 				</div> -->
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
				<caption>결과 내 검색</caption>
				<thead>
				<tr>
<!-- 					<th scope="col">선택</th> -->
					<th scope="col">브랜드명</th>
					<th scope="col">대분류업종</th>
					<th scope="col">중분류업종</th>
					<th scope="col">창업비용</th>
					<%-- 창업 희망 지역 제거 - 21.02.15
					<th scope="col">창업희망지역</th>
					--%>
					<%-- 표기 안되게 - 21.02.15
					<th scope="col">폐점율</th>
					--%>
					<th scope="col">본사업력</th>
					<th scope="col">본사부채비율</th>
					<!-- <th scope="col">면적(3.3㎡)당 평균매출액<br> (단위/천원)</th> -->
					<th scope="col">프랜차이즈 정보</th>
				</tr>
				</thead>

				<tbody id="dataTbody">
					<tr>
						<td colspan="8">조회된 데이터가 없습니다.</td>
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
<!-- 			<div class="mButton1 posLt"> -->
<%-- 				버튼 색상 및 크기 변경 - 21.02.16 --%>
<!-- 				<a href="javascript:void(0)" class="mBtn1 primary compareBtn" style="min-width: 100px">브랜드비교</a> -->
<!-- 			</div> -->

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

	<div id="popupDiv"></div>