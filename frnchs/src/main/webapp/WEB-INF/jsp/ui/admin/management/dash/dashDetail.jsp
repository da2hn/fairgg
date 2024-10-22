<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 대시보드 */
%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/series-label.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
	<script src="https://code.highcharts.com/modules/data.js"></script>
	
	<title>기본 게시판 목록</title>
	
	<script type="text/javaScript" language="javascript" defer="defer">
	
		$(function(){
			$("#startDt, #endDt").datepicker();
			
			var dt = new Date();
			
			/* if( !$("#startDt").val() ){
				var startDt = new Date();
				startDt.setDate(dt.getDate() - 7);
				$("#startDt").datepicker( "setDate", startDt );
			}
			
			if( !$("#endDt").val() ){
				var endDt = new Date();
				endDt.setDate(dt.getDate());
				$("#endDt").datepicker( "setDate", endDt );
			} */
			
			var data ={};
			data['startDt']=$("#startDt").val();
			data['endDt']=$("#endDt").val();
			drawChart(data);
			
		});
	
	
	function drawChart(chartData){
		//console.log("차트데이터");
		cmAjax(
			"${contextPath}/admin/management/dash/searchAjax.do",	//url
			chartData,												//data
			function(data){											//callback
				console.log('chart data',data);
				
				data = data.resultData;
				
				//1. 콘텐츠 요약정보
				Object.entries(data.smryStat[0]).forEach(function(row,idx){
					//console.log(row);
					$("#" + row[0]).text( row[1] );
				});
				
				//2. 권한 관리
				Object.entries(data.prmsStat[0]).forEach(function(row,idx){
					//console.log(row);
					$("#" + row[0]).text( row[1] );
				});
				
				//3. 사용자별 접속 정보
				
				var pieArr = [];
				var pieObj = {};
				
				data.usrGrpStat.forEach(function(row,idx){
					//console.log(row);
					pieObj = {};
					
					if( row.grpName == "cnslt" ){
						pieObj.name	= "전문컨설턴트";
					}else if( row.grpName == "expct" ){
						pieObj.name	= "예비점주";
					}else if( row.grpName == "owner" ){
						pieObj.name	= "점주";
					}else if( row.grpName == "admin" ){
						pieObj.name	= "사이트 관리자";
					}
					
					//pieObj.name	= row.grpName;
					pieObj.y	= row.cnncRatio;
					pieArr.push(pieObj);
					$("#" + row.grpName).text( row.cnncCnt );
				});
				
				console.log("조합완료된 pieArr",pieArr);
				
				Highcharts.chart('pie', {
					chart: {
						height : 200, //차트가 200이면 너무 작긴함
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						type: 'pie'
					},
					title: {
						text: ' '
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					accessibility: {
						point: {
							valueSuffix: '%'
						}
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: false
							},
							showInLegend: true
						}
					},
					series: [{
						name: '비율',
						colorByPoint: true,
						data: pieArr
					}]
				});//pie[e]
				
				//4. 서비스별 접속 현황
				
				var columnArr = [];
				var columnObj = [];
				
				data.srvcStat.forEach(function(row,idx){
					//console.log(row);
					columnObj = [];
					columnObj.push(row.serviceId);
					columnObj.push( Number(row.cnncCnt) );
					columnArr.push(columnObj);
					
					$("#srvcArea").find("tr").eq(idx).find("td").each(function(idx2){
						if( idx2 == 0 ){
							$(this).eq(idx2).text( row.serviceId );
						}else if( idx2 == 1 ){
							$(this).text( row.serviceNm );
						}else{
							$(this).text( row.cnncCnt );
						}
					});
					
				});
				
				//console.log("조합완료된 columnArr",columnArr);
				
				Highcharts.chart('column', {
					chart: {
						height: 200,
						type: 'column'
					},
					title: {
						text: ' '
					},
					xAxis: {
						type: 'category',
						labels: {
							rotation: 0,
							style: {
								fontSize: '13px',
								fontFamily: 'Verdana, sans-serif'
							}
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: '이용건수'
						}
					},
					legend: {
						enabled: false
					},
					tooltip: {
						pointFormat: '이용건수: <b>{point.y:.1f} 명</b>'
					},
					series: [{
						name: 'Population',
						data: columnArr,
						dataLabels: {
							//enabled: true,
							//rotation: -90,
							//color: '#FFFFFF',
							//align: 'right',
							format: '{point.y:.1f}', // one decimal
							y: 10, // 10 pixels down from the top
							style: {
								fontSize: '13px',
								fontFamily: 'Verdana, sans-serif'
							}
						}
					}]
				});
			
			}//callback[e]
		);//cmAjax[e]
	}//drawchart[e]
	
	$(document).ready(function(){
		
		//초기화
		$("#resetBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			$("#startDt,#endDt").val("");
			$("#searchBtn").click();
		});
		
		//검색
		$("#searchBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			var data ={};
			data['startDt']=$("#startDt").val();
			data['endDt']=$("#endDt").val();
			drawChart(data);
			
		});
		
		
		
	});
	
	</script>
	<!-- contents -->
		<div class="contents">
			
			<!-- breadcrumb -->
			<div class="mBc">
				<span class="h">home</span>
				<span class="t">대시보드홈</span>
			</div>
			<!-- //breadcrumb -->
			
			<h2 class="mTitle1">대시보드 홈</h2>

			<div class="mSort1">
				<div class="col">
					<label class="ti" for="dateStart">조회기간</label>
					<div class="co">
						<span class="gIt"><input type="text" name="startDt" class="it date" title="접속일시작날짜" id="startDt"></span>
						<span class="bar">~</span>
						<span class="gIt"><input type="text" name="endDt" class="it date" title="접속일마지막날짜" id="endDt"></span>
						
						<div class="mButton1">
							<span class="gRight">
								<a href="javascript:void(0)" id="resetBtn" class="mBtn1 resetBtn" style="right: 118px;">초기화</a><!-- 여기 스타일좀 잡아주세요.. -->
								<a href="javascript:void(0)" id="searchBtn" class="mBtn1 blue searchBtn">검색</a>
							</span>
						</div>
					</div>
				</div>
			</div>

			
			<div class="gTitle2">
				<h3 class="mTitle2">콘텐츠 요약정보</h3>
				<div class="gRt">(단위  : 건수)</div>
			</div>
			<div class="mBoard1">
				<table summary="데이터 업로드, 커뮤니티 게시글, 팝업 게시, 홍보영상 업로드, 홈페이지 접속자 수로 구성된 표입니다.">
				<colgroup>
					<col width="20%">
					<col width="20%">
					<col width="20%">
					<col width="20%">
					<col width="20%">
				</colgroup>
				<thead>
				<tr>
					<th scope="col">데이터 업로드</th>
					<th scope="col">커뮤니티 게시글</th>
					<th scope="col">팝업 게시</th>
					<th scope="col">홍보영상 업로드</th>
					<th scope="col">홈페이지 접속자 수</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td id="dataCnt"></td>
					<td id="cmmntCnt"></td>
					<td id="popupCnt"></td>
					<td id="promoCnt"></td>
					<td id="cnncCnt"></td>
				</tr>
				</tbody>
				</table>
			</div>

			<div class="mBoard1 mt1">
				<table summary="데이터 업로드, 커뮤니티 게시글, 팝업 게시, 홍보영상 업로드, 홈페이지 접속자 수로 구성된 표입니다." id="prmsTb">
				<caption>콘텐츠 요약정보</caption>
				<thead>
				<tr>
					<th scope="col" colspan="4">점포거래 관리</th>
					<th scope="col" colspan="4">창업지원관리</th>
					<th scope="col" colspan="4">사용자 사용신청 관리</th>
				</tr>
				<tr class="bgType1">
					<th scope="col">전체</th>
					<th scope="col">신청</th>
					<th scope="col">승인</th>
					<th scope="col">반려</th>
					
					<th scope="col">전체</th>
					<th scope="col">신청</th>
					<th scope="col">승인</th>
					<th scope="col">반려</th>
					
					<th scope="col">전체</th>
					<th scope="col">신청</th>
					<th scope="col">승인</th>
					<th scope="col">반려</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td id="storeTtl"></td>
					<td id="storeAppl"></td>
					<td id="storeAprv"></td>
					<td id="storeRejc"></td>
					
					<td id="sprtTtl"></td>
					<td id="sprtAppl"></td>
					<td id="sprtAprv"></td>
					<td id="sprtRejc"></td>
					
					<td id="useTtl"></td>
					<td id="useAppl"></td>
					<td id="useAprv"></td>
					<td id="useRejc"></td>
					
				</tr>
				</tbody>
				</table>
			</div>

			<!-- grid -->
			<div class="mGrid1">
				<!-- left -->
				<div class="gLeft">
					<div class="gTitle2">
						<h3 class="mTitle2">가맹정보제공 온라인 플랫폼 이용현황</h3>
						<div class="gRt">(단위  : 건수)</div>
					</div>
					<div class="mBoard1">
						<table summary="사용자그룹, 접속건수로 구성된 표입니다.">
						<caption>가맹정보제공 온라인 플랫폼 이용현황</caption>
						<colgroup>
							<col width="60%">
							<col width="*">
						</colgroup>
						<thead>
						<tr>
							<th scope="col">사용자그룹</th>
							<th scope="col">접속건수</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>사이트 관리자</td>
							<td id="admin"></td>
						</tr>
						<tr>
							<td>전문컨설턴트</td>
							<td id="cnslt"></td>
						</tr>
						<tr>
							<td>점주</td>
							<td id="owner"></td>
						</tr>
						<tr>
							<td>예비점주</td>
							<td id="expct"></td>
						</tr>
						<!-- <tr>
							<td></td>
							<td></td>
						</tr> -->
						</tbody>
						</table>
					</div>
				</div>
				<!-- //left -->
				<!-- right -->
				<div class="gRight">
					<div class="gTitle2">
						<div class="gRt">(단위  : 비율)</div>
					</div>
					<div class="mGraph1">
						<div class="pie" id="pie"></div>
					</div>
				</div>
				<!-- //right -->
			</div>
			<!-- //grid -->

			<!-- grid -->
			<div class="mGrid1">
			
				<!-- left -->
				<div class="gLeft">
					<div class="gTitle2">
						<h3 class="mTitle2">가맹정보제공 온라인 플랫폼 이용현황</h3>
						<div class="gRt">(단위  : 건수)</div>
					</div>
					<div class="mBoard1">
						<table class="datatable" id="datatable" summary="서비스ID, 서비스명, 사용건수로 구성된 표입니다.">
						<colgroup>
							<col width="140">
							<col width="*">
							<col width="120">
						</colgroup>
						<thead>
						<tr>
							<th scope="col">서비스ID</th>
							<th scope="col">서비스명</th>
							<th scope="col">사용건수</th>
						</tr>
						</thead>
						<tbody id="srvcArea">
							<tr >
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr >
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr >
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr >
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr >
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
						</table>
					</div>
				</div>
				<!-- //left -->
				<!-- right -->
				<div class="gRight">
					<div class="gTitle2">
						<div class="gRt">(단위  : 비율)</div>
					</div>
					<div class="mGraph1 type2 h1">
						<div class="ti">서비스별 사용건수</div>
						<div class="column" id="column"></div>
					</div>
				</div>
				<!-- //right -->
			</div>
			<!-- //grid -->

		</div>
		<!-- //contents -->
	
