<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/WEB-INF/jsp/common/googleChart.jsp" %> <%-- 구글차트 - 21.01.13 --%>
<script type="text/javascript">
	var chart1, chart2;
	$(document).ready(function() {
		$("#searchForm select").on("change", function() {
			if($(this).attr("name") == "survYear") {
				$("select[name=survYearMonth]").find("option[value!='']").remove();
				if(!!$("select[name=survYearMonth]")) {
					$.post('<c:url value="/sysMngr/selectSurvYearMonthList.ajax"/>',
						$("#searchForm").serialize()
					).done(function(data) {
						if(data.resultCode == 'success'){
							var dataList = data.dataList;
							if(!!dataList && dataList.length != 0) {
								if(dataList.length>1) $("select[name=survYearMonth]").append('<option value="all">전체</option>');
								dataList.forEach(function(data,idx){
									$("select[name=survYearMonth]").append('<option value="'+data.survYearMonth+'">'+data.survYearMonth+'</option>');
								})
							}
						}
					})
				}
			}
			// 그래프 그리기
			if($("select[name*=surv] option[value!='']:selected").length == $("select[name*=surv]").length && !!$("select[name=evlIemNo]").val()) {
				$.post('<c:url value="/sysMngr/selectSurvDataByCondition.ajax"/>',
					$("#searchForm").serialize()
				).done(function(data) {
					if(data.resultCode == 'success'){
						chart1 = google.charts.setOnLoadCallback(function(){drawChart("pie", $(".gLeft > .mGraph1 > .co"), "", "", data.dataList, $("select[name=evlIemNo] option:selected").text())});
						chart2 = google.charts.setOnLoadCallback(function(){drawChart("column", $(".gRight > .mGraph1 > .co"), "", "", data.dataList, $("select[name=evlIemNo] option:selected").text())});
						$(".mTitle2").text($("select[name=evlIemNo] option:selected").text());
					} else {
						alert("에러가 발생했습니다.");
						$(".gRight > .mGraph1 > .co").empty();
						$(".gLeft > .mGraph1 > .co").empty();
						$(".mTitle2").text("");
						return;
					}
				})
			}
		})
	})
</script>
	<!-- contents -->
	<div class="contents">
		
		<h2 class="mTitle1">설문관리</h2>

		<div class="mSort1">
			<form id="searchForm" method="post">
			<div class="col">
				<label class="ti" for="dateStart">조건검색</label>
				<div class="co">
					<select class="select w1" name="survYear" title="년">
						<option value="">선택하세요</option>
						<c:forEach var="data" items="${survYearList}" varStatus="status">
							<option value="${data.survYear}">${data.survYear}</option>
						</c:forEach>
					</select>
					<span class="bar">년</span>
					<select class="select w1" name="survYearMonth" title="월">
						<option value="">선택하세요</option>
						<option value="all">전체</option>
					</select>
					<span class="bar">월</span>

					<select class="select ml1" name="userSeCode" title="사용자 그룹">
						<option value="">전체</option>
						<c:forEach var="userSeCode" items="${userSeCodeList}" varStatus="status">
							<option value="${userSeCode.codeValue}">${userSeCode.codeValueNm}</option>
						</c:forEach>
					</select>
					
					<select class="select ml1" name="evlIemNo" title="그룹">
						<option value="">선택하세요</option>
						<c:forEach var="data" items="${survEvlList}" varStatus="status">
							<option value="${data.evlIemNo}">${data.evlIemCn}</option>
						</c:forEach>
					</select>
				</div>
<!-- 				<a href="###" class="mBtn1 blue">검색</a> -->
			</div>
			</form>
		</div>
	
		<!-- grid -->
		<div class="mGrid1">
			<div class="gTitle2">
				<h3 class="mTitle2">메뉴의 구성이 적정합니까?</h3>
				<div class="gRt">(단위  : 건수)</div>
			</div>
			<!-- left -->
			<div class="gLeft">
				<div class="mGraph1">
					<div class="co">
					</div>
<!-- 						<div id="chart_div"></div> -->
				</div>
			</div>
			<!-- //left -->
			<!-- right -->
			<div class="gRight">
				<div class="mGraph1">
					<div class="co">
					</div>
<!-- 				    <div id="chart_div1"></div> -->
				</div>
			</div>
			<!-- //right -->
		</div>
		<!-- //grid -->

	</div>
	<!-- //contents -->