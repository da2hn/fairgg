<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/WEB-INF/jsp/common/googleChart.jsp" %> <%-- 구글차트 - 21.01.13 --%>
<script type="text/javascript">
	$(document).ready(function() {
		$("#searchForm select,input[type=text]").on("change", function() {
			if(!!$("[name=searchYear]").val() && !!$("[name=searchMonth]").val()) {
				fn_selectMonthAccsStat();
			}
		})
	})
	
	<%-- 요청에 의한 default 공회전 - 21.03.18 --%>
	$(window).ready(function(){
		var date = new Date();
		$("[name=searchYear]").val(date.getFullYear());
		$("[name=searchMonth]").val(new String(date.getMonth()+1)).trigger("change");
	})
	
	function fn_selectDayAccsStatExcel() {
		if(!$("[name=searchYear]").val()) {
			alert("통계조회 년을 선택해주세요.");
			$("[name=searchYear]").focus();
			return;
		}
		if(!$("[name=searchMonth]").val()) {
			alert("통계조회 월을 선택해주세요.");
			$("[name=searchMonth]").focus();
			return;
		}
		location.href = '<c:url value="/sysMngr/excelDownload.do"/>?'+$("#searchForm").serialize();
	}
	function fn_selectMonthAccsStat() {
		if(!$("[name=searchYear]").val()) {
			alert("통계조회 년을 선택해주세요.");
			$("[name=searchYear]").focus();
			return;
		}
		if(!$("[name=searchMonth]").val()) {
			alert("통계조회 월을 선택해주세요.");
			$("[name=searchMonth]").focus();
			return;
		}
		
		var result = $("#yearTable > table > tbody > tr");
		$.post('<c:url value="/sysMngr/selectMonthAccsStat.ajax"/>',
			$("#searchForm").serializeArrayString()
		).done(function(data) {
			if(data.resultCode == 'success'){
				result.empty();
				$(".mBoard1 > table > tbody > .bgType1").empty();
				var dataList = data.dataList;
				fn_selectAccsStatDetailListByMonth(1);
				if(!!dataList && dataList.length != 0) {
					var resultStr = "";
					dataList.forEach(function(data,idx){
						result.append('<td>'+data.monthCount+'</td>');
					})
					
					google.charts.setOnLoadCallback(function(){drawChart("line", $(".mGraph1 > .co"),"월","", dataList, "월별 접속 통계");});
					
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
			<span class="t">월별 접속통계</span>
		</div>
		<!-- //breadcrumb -->
		
		<h2 class="mTitle1">월별 접속통계</h2>

		<div class="mSort1">
			<div class="col">
				<form id="searchForm" method="post">
					<input type="hidden" name="pageIndex" value="" />
					<label class="ti" for="dateStart">조건검색</label>
					<div class="co">
						<select class="select w1" name="searchYear" title="년">
							<option value="">선택하세요</option>
							<c:forEach var="i" begin="0" step="1" end="3">
								<option value="${sysStdrYear-i }">${sysStdrYear-i }년</option>
							</c:forEach>
						</select>
						<span class="bar">년</span>
						<select class="select w1" name="searchMonth" title="월">
							<option value="">선택하세요</option>
							<c:forEach var="i" begin="1" step="1" end="12">
								<option value="${i }">${i }월</option>
							</c:forEach>
						</select>
						<span class="bar">월</span>
	
						<select class="select" name="userSeCode" title="사용자 그룹">
							<option value="">전체</option>
							<c:forEach var="userSeCode" items="${userSeCodeList}" varStatus="status">
								<option value="${userSeCode.codeValue}">${userSeCode.codeValueNm}</option>
							</c:forEach>
							<option value="US00">비로그인</option>
						</select>
					</div>
				</form>
<!-- 				<a href="javascript:void(0)" onclick="fn_selectMonthAccsStat();" class="mBtn1 blue">검색</a> -->
			</div>
		</div>

		<div class="mBoard1 mt2" id="yearTable">
			<table summary="1월, 2월, 3월, 4월, 5월, 6월, 7월, 8월, 9월, 10월, 11월, 12월로 구성된 표입니다.">
			<caption>월별 접속 통계</caption>
			<thead>
			<tr class="bgType1">
				<th scope="col">1월</th>
				<th scope="col">2월</th>
				<th scope="col">3월</th>
				<th scope="col">4월</th>
				<th scope="col">5월</th>
				<th scope="col">6월</th>
				<th scope="col">7월</th>
				<th scope="col">8월</th>
				<th scope="col">9월</th>
				<th scope="col">10월</th>
				<th scope="col">11월</th>
				<th scope="col">12월</th>
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
			</tr>
			</tbody>
			</table>
		</div>
		
		<div class="gTitle2">
			<h3 class="mTitle2">월별 접속 통계</h3>
			<div class="gRt">
				<a href="javascript:void(0);" onclick="fn_selectDayAccsStatExcel();" class="mBtn1 s blue">엑셀 다운로드</a>
			</div>
		</div>
		<div class="mGraph1">
			<div class="co"></div>
		</div>

		<div class="mBoard1 mt2" id="dayTable">
			<table summary="번호, 접속일자, 아이피, 사용자그룹, 접속페이지, 아이디, 이름으로 구성된 표입니다.">
			<caption>월별 접속 통계</caption>
			<colgroup>
				<col width="60">
				<col span="4" width="*">
			</colgroup>
			<thead>
				<tr class="bgType1">
					<th scope="col">번호</th>
					<th scope="col">접속일자</th>
					<th scope="col">사용자 IP</th>
					<th scope="col">사이트에 머문시간</th>
					<th scope="col">사용자 그룹</th>
					<th scope="col">이름</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="6">검색을 진행해주세요.</td>
				</tr>
			</tbody>
			</table>
		</div>
		
		<!-- paging -->
		<div class="mPag1">
			<a href="javascript:void(0)" class="selected">1</a>
		</div>
		<!-- //paging -->

	</div>
	<!-- //contents -->