<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 월별 접속 통계 */
%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/series-label.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
	
	<script src="https://code.highcharts.com/highcharts.js"></script>
	
	<title>기본 게시판 목록</title>
	
	<script type="text/javaScript" language="javascript" defer="defer">
	
		$(function(){
			$("#startDt, #endDt").monthpicker({
				pattern: 'yyyy-mm',
				monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			});
			
			/* var dt = new Date();
			
			$("#startDt").val( dt.getFullYear() + '-01' );
			$("#endDt").val( dt.getFullYear() + '-12' ); */
			
			drawChart();
			
		});
	
	function drawChart(chartData){
		
		cmAjax(
			"${contextPath}/admin/management/log/monthChartAjax.do",		//url
			chartData,														//data
			function(data){													//callback
				console.log('chart data',data);
				
				if( data.resultData.length < 1 ){
					console.log("0건인 경우 에러처리해야함");
				}else{
					
					var chartData = [];
					var chartStart = Date.UTC(
							  data.resultData[0].baseMonth.split("-")[0]
							, data.resultData[0].baseMonth.split("-")[1]-1
							, 1
					)
					
					//highchart형식에 맞게 재조립을 해주어야함
					data.resultData.forEach(function(row,idx){
						console.log("row",row);
						
						chartData.push(Number(row.totalCount));
					});
					
					Highcharts.chart('co', {
						title: {
							text: '월별 접속자 통계'
						},
						subtitle: {
							text: 'subtitle'
						},
						xAxis: {
							type: 'datetime',
							labels: {
								format: '{value:%Y.%m}'
							},
							tickInterval: 1000 * 3600 * 24 *30 // 1 month
						},
						
						yAxis: {
							title: {
								enabled: true,
								text: '단위(명)'
							}
						},
						series: [{
							data: chartData,				//[] 형식의 데이터
							pointStart: chartStart,			//시작일자 Date.UTC(yyyy,mm,dd)
							pointInterval: 24 * 3600 * 1000 * 30,// one day * 30 = one month
							name: '접속자수'					//짝대기 이름
						}]
					});
				}//else[e]
			}//callback[e]
		);//cmAjax[e]
		
		
		
	}
		
	//목록 조립
	function drawTable(data,area){
		
		console.log('drawTable data',data);
		data = data.resultData || data;
		var tmpHtml = [];
		
		if( data.length < 1 ){
			tmpHtml.push('<tr><td colspan="6">데이터 없음</td></tr>');
		}else{
			data.forEach(function(row,idx){
				tmpHtml.push('<tr>');
				
				tmpHtml.push('	<td>');
				tmpHtml.push(		Number(row.row));
				tmpHtml.push('	</td>');
				
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.cnncIp);
				tmpHtml.push('	</td>');
				
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.cnncUserGroup);
				tmpHtml.push('	</td>');
				
				tmpHtml.push('	<td class="left">');
				tmpHtml.push(		row.cnncUrl);
				tmpHtml.push('	</td>');
				
				tmpHtml.push('	<td>');
				tmpHtml.push(		row.cnncUserId);
				tmpHtml.push('	</td>');
				
				tmpHtml.push('	<td>');
				tmpHtml.push(		"회원명(나중에 조인해서 가져오기)");
				tmpHtml.push('	</td>');
				
			});
		}//else[e]
		
		$(area).html( tmpHtml.join("") );
		
	}//drawTable[e]
	
	//목록 조립
	function drawMonthTable(data,area){
		
		console.log('monthTable data',data);
		data = data.resultData || data;
		var tmpHtml = [];
		tmpHtml.push('<tr>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m1);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m2);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m3);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m4);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m5);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m6);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m7);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m8);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m9);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m10);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m11);
		tmpHtml.push('	</td>');
		
		tmpHtml.push('	<td>');
		tmpHtml.push(		data.m12);
		tmpHtml.push('	</td>');
			
		
		$(area).html( tmpHtml.join("") );
		
	}//drawMonthTable[e]
	
	$(document).ready(function(){
		
		//pager[s]
		pager = new jsPager();
		
		var data ={};
		cmAjax(
			"${contextPath}/admin/management/log/searchAjax.do",				//url
			data,																//data
			function(result){													//callback
				//console.log("테이블 result",result);
				pager.init(
					result.resultData.length == 0 ? 0 : parseInt(result.resultData[0].totalCount),	//total
					data,													//검색파라미터
					$('.pagination'),										//페이징 들어갈부분
					$('#ajaxArea'),											//그려질부분
					$('#boardListInfo'),									//정보요약부분
					"${contextPath}/admin/management/log/searchAjax.do",	//url
					drawTable												//callback
				);
				
				drawTable(result,$("#ajaxArea"));
				
			}
		);
		//pager[e]
		
		
		//월별 테이블 처음그리기
			cmAjax(
				"${contextPath}/admin/management/log/monthTableAjax.do",	//url
				{},															//data
				function(result){											//callback
					//console.log("월별 테이블 result",result);
					drawMonthTable(result,$("#monthTable"));
					
				}
			);
		
		
		
		//검색 
		$("#searchBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			//조건 파라미터 set
			var data2 ={};
			
			data2['startDt']=$("#startDt").val() ? $("#startDt").val() + "-1" : "";
			data2['endDt']=$("#endDt").val() ? $("#endDt").val() + "-30" : "";
			
			//차트 다시 그리고
			drawChart(data2);
			
			//테이블 다시 그리고
			cmAjax(
				"${contextPath}/admin/management/log/searchAjax.do",				//url
				data2,																//data
				function(result){													//callback
					console.log("테이블 result",result);
					pager.init(
							result.resultData.length == 0 ? 0 : parseInt(result.resultData[0].totalCount),	//total
							data,													//검색파라미터
							$('.pagination'),										//페이징 들어갈부분
							$('#ajaxArea'),											//그려질부분
							$('#boardListInfo'),									//정보요약부분
							"${contextPath}/admin/management/log/searchAjax.do",	//url
							drawTable												//callback
					);
					
					drawTable(result,$("#ajaxArea"));
					
				}
			);
			
			//월별 테이블 다시 그리고
			cmAjax(
				"${contextPath}/admin/management/log/monthTableAjax.do",				//url
				data2,																//data
				function(result){													//callback
					console.log("월별 테이블 result",result);
					drawMonthTable(result,$("#monthTable"));
					
				}
			);
			
			
		});//searchBtn[e]
		
		
		$("#resetBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			$("#startDt,#endDt").val("");
			$("#searchBtn").click();
		});
		
	});
	
	</script>
	<!-- content[s] -->
	<div class="contents">

	
		<h2 class="mTitle1">월별 접속통계</h2>

			<div class="mSort1">
				<div class="col">
					<label class="ti" for="dateStart">조회기간</label>
					<div class="co">
						<div class="gDate1">
								<span class="gIt"><input type="text" name="startDt" class="it date" title="접속일시작날짜" id="startDt" autocomplete="off" readonly></span>
								<span class="bar">~</span>
								<span class="gIt"><input type="text" name="endDt" class="it date" title="접속일마지막날짜" id="endDt" autocomplete="off" readonly></span>
							</div>
						
						<div class="mButton1">
							<span class="gRight">
								<a href="javascript:void(0)" id="resetBtn" class="mBtn1 resetBtn" style="right: 118px;">초기화</a><!-- 여기 스타일좀 잡아주세요.. -->
								<a href="javascript:void(0)" id="searchBtn" class="mBtn1 blue searchBtn">검색</a>
							</span>
						</div>
						
						
					</div>
				</div>
			</div>
			
			
			<div class="mBoard1 mt2">
				<table summary="1월, 2월, 3월, 4월, 5월, 6월, 7월, 8월, 9월, 10월, 11월, 12월로 구성된 표입니다.">
				<caption>일별 접속 통계</caption>
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
				<tbody id="monthTable"></tbody>
				</table>
			</div>
			
			
			<h3 class="mTitle2">월별 접속 통계</h3>
			<div class="mGraph1" id="mGraph1">
				<div class="co" id="co"></div><!-- 차트 위치 -->
			</div>
			

			<div class="mBoard1 mt2">
				<table summary="번호, 아이피, 사용자그룹, 접속페이지, 아이디, 이름으로 구성된 표입니다.">
				<caption>일별 접속 통계</caption>
				<thead>
				<tr class="bgType1">
					<th scope="col">번호</th>
					<th scope="col">아이피</th>
					<th scope="col">사용자그룹</th>
					<th scope="col">접속페이지</th>
					<th scope="col">아이디</th>
					<th scope="col">이름</th>
				</tr>
				</thead>
				
				<tbody id="ajaxArea"></tbody>
				
				</table>
			</div>

	
			<div class="boardNavigation">
				<div class="pagination mPag1"></div>
			</div>


</div>
	
