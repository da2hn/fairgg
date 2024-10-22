<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
/* 일별 접속 통계 */
%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/series-label.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
	
	<title>기본 게시판 목록</title>
	
	<script type="text/javaScript" language="javascript" defer="defer">
	
		$(function(){
			$("#startDt, #endDt").datepicker({
				dateFormat: 'yy-mm-dd'
			});
			
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
		console.log("차트데이터");
		cmAjax(
			"${contextPath}/admin/management/log/dayChartAjax.do",	//url
			chartData,												//data
			function(data){											//callback
				console.log('chart data',data);
				
				if( data.resultData.length < 1 ){
					console.log("0건인 경우 에러처리해야함");
				}else{
					
					var chartData = [];
					
					var chartStart = Date.UTC(
							data.resultData[0].baseDate.split("-")[0]
							,data.resultData[0].baseDate.split("-")[1]-1
							,data.resultData[0].baseDate.split("-")[2]
					)
					
					var dt;
					data.resultData.forEach(function(row,idx){
						//console.log("row",row);
						if( idx > 0){
							if( dt.toISOString().split("T")[0] != row.baseDate ){
								
								//console.log("이때의 iso",dt.toISOString().split("T")[0]);
								//console.log("이때의 basedate",row.baseDate);
								
								var diff = Math.abs(
									new Date(dt.toISOString().split("T")[0]).getTime()
									-
									new Date(row.baseDate).getTime()
								);
								diff = Math.ceil(diff / (1000 * 3600 * 24));
								
								for( var i=0; i<diff; i++){
									chartData.push(Number(0));
								}
								
							}
						}
						
						chartData.push(Number(row.totalCount));
						
						dt = new Date(row.baseDate);//8월 30일이라고 생각하고 다음날짜가 9월 1일이 들어왔다고 하면 31일이 비는 상황
						dt.setDate(dt.getDate()+1);
						
					});
					
					console.log("이게 chartData",chartData);
					console.log("이게 chartStart",chartStart);
					
					Highcharts.chart('co', {
						title: {
							text: '일별 접속자 통계'
						},
						subtitle: {
							text: ' '
						},
						xAxis: {
							 type: 'datetime',
							 dateTimeLabelFormats: {
								day: '%m.%d'
							 }
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
							pointInterval: 24 * 3600 * 1000,// one day
							name: '접속자수'					//짝대기 이름
						}]
					});
				}//else[e]
			}//callback[e]
		);//cmAjax[e]
	}//drawChart[e]
		
	//목록 조립
	function drawTable(data,area){
		
		console.log('data',data);
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
	
	$(document).ready(function(){
		
		//pager[s]
		pager = new jsPager();
		
		var data ={};
		cmAjax(
			"${contextPath}/admin/management/log/searchAjax.do",				//url
			data,																//data
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
		//pager[e]
		
		//검색 
		$("#searchBtn").off("click").on("click",function(e){
			e.preventDefault();
			
			//조건 파라미터 set
			var data2 ={};
			data2['startDt']=$("#startDt").val();
			data2['endDt']=$("#endDt").val();
			
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

	
		<h2 class="mTitle1">일별 접속통계</h2>

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
			
			<h3 class="mTitle2">일별 접속 통계</h3>
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
	
