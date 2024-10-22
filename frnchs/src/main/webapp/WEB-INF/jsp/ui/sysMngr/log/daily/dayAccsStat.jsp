<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/WEB-INF/jsp/common/googleChart.jsp" %> <%-- 구글차트 - 21.01.13 --%>
<script type="text/javascript">
	$(document).ready(function() {
		$("#searchForm select,input[type=text]").on("change", function() {
			if(!!$("[name=searchDate]").val()) {
				fn_selectDayAccsStat();
			}
		})
	})
	
	function fn_selectDayAccsStatExcel() {
		if(!$("[name=searchDate]").val()) {
			alert("통계조회 일을 선택해주세요.");
			$("[name=searchDate]").focus();
			return;
		}
// 		$("#searchForm").attr("action", '<c:url value="/sysMngr/excelDownload.do"/>');
// 		$("#searchForm").attr("target", "searchForm");
// 		window.open("" ,"searchForm");
// 		$("#searchForm").submit();
		location.href = '<c:url value="/sysMngr/excelDownload.do"/>?'+$("#searchForm").serialize();
	}
	function fn_selectDayAccsStat() {
		if(!$("[name=searchDate]").val()) {
			alert("통계조회 일을 선택해주세요.");
			$("[name=searchDate]").focus();
			return;
		}
		var header = $(".calendar > table > thead > .bgType1");
		var result = $(".calendar > table > tbody > tr");
		$.post('<c:url value="/sysMngr/selectDayAccsStat.ajax"/>',
			$("#searchForm").serializeArrayString()
		).done(function(data) {
			if(data.resultCode == 'success'){
				header.empty();
				result.empty();
				$(".mBoard1 > table > tbody > .bgType1").empty();
				var dataList = data.dataList;
				fn_selectAccsStatDetailListByDay(1);
				if(!!dataList && dataList.length != 0) {
					var week = new Array('일', '월', '화', '수', '목', '금', '토');
					var headerStr, resultStr = "";
					dataList.forEach(function(data,idx){
						header.append('<th scope="col"'+(data.srchWeekDay == 0 ? ' class="sun"':'')+(data.srchWeekDay == 6 ? ' class="sat"':'')+'><div class="d">'+week[data.srchWeekDay]+'</div> '+data.srchDay+'</th>');
						result.append('<td>'+data.dayCount+'</td>');
					})
					
					google.charts.setOnLoadCallback(function(){drawChart("line", $(".mGraph1 > .co"),"","", dataList, "일별 접속 통계");});
					
				}
			}else{
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		});
	}
	
</script>
	<!-- contents -->
	<div class="contents">
		
		<!-- breadcrumb -->
		<div class="mBc">
			<span class="h">home</span>
			<span class="t">로그관리</span>
			<span class="t">일별 접속통계</span>
		</div>
		<!-- //breadcrumb -->
		
		<h2 class="mTitle1">일별 접속통계</h2>

		<div class="mSort1">
			<div class="col">
				<label class="ti" for="dateStart">조건검색</label>
				<form id="searchForm" method="post">
					<input type="hidden" name="pageIndex" value="" />
					<div class="co">
						<span class="gIt"><input type="text" class="it date" title="접속일시작날짜" id="dateStart" name="searchDate"></span>
						<script type="text/javascript">
						$( function() {
							$( "#dateStart" ).datepicker({
								dateFormat: 'yy-mm-dd'
							});
							<%-- 요청에 의한 default 공회전 - 21.03.18 --%>
							$(window).ready(function(){
								$('#dateStart').datepicker('setDate', 'today').trigger("change");
							})
						} );
						</script>
						<select class="select" name="userSeCode" title="사용자 그룹">
							<option value="">전체</option>
							<c:forEach var="userSeCode" items="${userSeCodeList}" varStatus="status">
								<option value="${userSeCode.codeValue}">${userSeCode.codeValueNm}</option>
							</c:forEach>
							<!-- <option value="none">비로그인</option> -->
							<option value="US00">비로그인</option>
						</select>
					</div>
				</form>
<!-- 				<a href="javascript:void(0)" onclick="fn_selectDayAccsStat();" class="mBtn1 blue">검색</a> -->
			</div>
		</div>

		<div class="mBoard1 calendar mt2">
			<table summary="1일, 2일, 3일, 4일, 5일, 6일, 7일, 8일, 9일, 10일, 11일, 12일, 13일, 14일, 15일, 16일, 17일, 18일, 19일, 20일, 21일, 22일, 23일, 24일, 25일, 26일, 27일, 28일, 29일, 30일로 구성된 표입니다.">
			<caption>일별 접속 통계</caption>
			<thead>
			<tr class="bgType1">
				<th scope="col"><div class="d">월</div> 1</th>
				<th scope="col"><div class="d">화</div> 2</th>
				<th scope="col"><div class="d">수</div> 3</th>
				<th scope="col"><div class="d">목</div> 4</th>
				<th scope="col"><div class="d">금</div> 5</th>
				<th scope="col" class="sat"><div class="d">토</div> 6</th>
				<th scope="col" class="sun"><div class="d">일</div> 7</th>
				<th scope="col"><div class="d">월</div> 8</th>
				<th scope="col"><div class="d">화</div> 9</th>
				<th scope="col"><div class="d">수</div> 10</th>
				<th scope="col"><div class="d">목</div> 11</th>
				<th scope="col"><div class="d">금</div> 12</th>
				<th scope="col" class="sat"><div class="d">토</div> 13</th>
				<th scope="col" class="sun"><div class="d">일</div> 14</th>
				<th scope="col"><div class="d">월</div> 15</th>
				<th scope="col"><div class="d">화</div> 16</th>
				<th scope="col"><div class="d">수</div> 17</th>
				<th scope="col"><div class="d">목</div> 18</th>
				<th scope="col"><div class="d">금</div> 19</th>
				<th scope="col" class="sat"><div class="d">토</div> 20</th>
				<th scope="col" class="sun"><div class="d">일</div> 21</th>
				<th scope="col"><div class="d">월</div> 22</th>
				<th scope="col"><div class="d">화</div> 23</th>
				<th scope="col"><div class="d">수</div> 24</th>
				<th scope="col"><div class="d">목</div> 25</th>
				<th scope="col"><div class="d">금</div> 26</th>
				<th scope="col" class="sat"><div class="d">토</div> 27</th>
				<th scope="col" class="sun"><div class="d">일</div> 28</th>
				<th scope="col"><div class="d">월</div> 29</th>
				<th scope="col"><div class="d">화</div> 30</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
			</tr>
			</tbody>
			</table>
		</div>
		
		<div class="gTitle2">
			<h3 class="mTitle2">일별 접속 통계</h3>
			<div class="gRt">
				<a href="javascript:void(0);" onclick="fn_selectDayAccsStatExcel();" class="mBtn1 s blue">엑셀 다운로드</a>
			</div>
		</div>
		<div class="mGraph1">
			<div class="co"></div>
		</div>

		<div class="mBoard1 mt2" id="dayTable">
			<table summary="번호, 아이피, 사용자그룹, 접속페이지, 아이디, 이름으로 구성된 표입니다.">
			<caption>일별 접속 통계</caption>
			<colgroup>
				<col width="60">
				<col span="4" width="*">
			</colgroup>
			<thead>
				<tr class="bgType1">
					<th scope="col">번호</th>
					<th scope="col">사용자 IP</th>
					<th scope="col">사이트에 머문시간</th>
					<th scope="col">사용자 그룹</th>
					<th scope="col">이름</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="5">검색을 진행해주세요.</td>
				</tr>
			</tbody>
			</table>
		</div>
		
		<!-- paging -->
		<div class="mPag1">
			<a href="" class="selected">1</a>
		</div>
		<!-- //paging -->

	</div>
	<!-- //contents -->
