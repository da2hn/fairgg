<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
  /**
  * @Class Name : sampleList.jsp
  * @Description : Sample List 화면
  * @Modification Information
  *
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2019.07.09            최초 생성
  *
  * author htkim
  * since 2019.07.09
  *
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script type="text/javaScript" language="javascript">
		

		
		$(function() {
			//fnInit();
			
			$.ajax({
				dataType:"json",
				type: "POST",
				url: "/sample/sample/callChartData.do",
				data:{},
				async: true,
				cache: false,
				/*contentType: "application/x-www-form-urlencoded; charset=UTF-8",*/
				beforeSend : function(request){
					//request.setRequestHeader("AJAX", true);
			 	},
				success : function(data, status, request) {
					console.log('data',data);
					
					var chartArr = [];
					var chartObj = {};
					
					
					//highchart형식에 맞게 재조립을 해주어야함
					data.chartObj.forEach(function(row,idx){
						chartObj = {};
						console.log("row",row);
						chartObj.name = row.name;
						
						chartObj.data = row.data.split(',').map(function(item) {
						    return parseInt(item, 10);
						});
						
						chartArr.push(chartObj);
						
					});
					
					console.log("완성된 chartArr",chartArr);
					
					 /* series: [{
					        name: 'Installation',
					        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
					    }, {
					        name: 'Manufacturing',
					        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
					    }, { */
					
					
					Highcharts.chart('container', {

					    title: {
					        text: 'Solar Employment Growth by Sector, 2010-2016'
					    },

					    subtitle: {
					        text: 'Source: thesolarfoundation.com'
					    },

					    yAxis: {
					        title: {
					            text: 'Number of Employees'
					        }
					    },

					    xAxis: {
					        accessibility: {
					            rangeDescription: 'Range: 202008 to 202011'
					        }
					    },

					    legend: {
					        layout: 'vertical',
					        align: 'right',
					        verticalAlign: 'middle'
					    },

					    plotOptions: {
					        series: {
					            label: {
					                connectorAllowed: false
					            },
					            pointStart: 202008,
					        }
					    },

					    series: chartArr,

					    responsive: {
					        rules: [{
					            condition: {
					                maxWidth: 500
					            },
					            chartOptions: {
					                legend: {
					                    layout: 'horizontal',
					                    align: 'center',
					                    verticalAlign: 'bottom'
					                }
					            }
					        }]
					    }

					});
					
					
					
					
					
					
					
					
				},
				complete: function(){
	
				},
			    error: function(request, status, error) {
			    	console.log("request",request);
				}
			});
			
			
			
		});
	</script>
	<style>
	
	.highcharts-figure, .highcharts-data-table table {
    min-width: 360px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
	
	</style>
</head>

<!-- s : 타이틀 -->
<div class="titleArea">
	<h2>사용자관리</h2>
	<ol class="subNaviArea">
		<li><a href="#"><img src="images/sub/icon_home.png" alt="HOME" /></a></li>
		<li><a href="#">시스템관리</a></li>
		<li><a href="#">사용자관리</a></li>
		<li><a href="#">사용자관리</a></li>
	</ol>
</div>
<!-- e : 타이틀 -->
<!-- s : 검색 -->
<div class="searchArea">
	<form class="form-inline">
		<div class="form-group">
			<label for="" class="first-title">기관</label>
			<select class="w100 form-control">
				<option value="">전체</option>				
			</select>

			<label class="search-title">승인여부</label>
			<select class="w100 form-control">
				<option value="">전체</option>
				<option value="100">예</option>					
				<option value="200">아니오</option>
			</select>

			<label for="" class="search-title">사용여부</label>
			<select class="w100 form-control">
				<option value="">전체</option>
				<option value="100">예</option>					
				<option value="200">아니오</option>
			</select>

			<label for="" class="search-title">사용자명</label>
			<input type="text" class="w100 form-control">
		</div>

		<div class="form-group">
			<label for="" class="search-title">등록일</label>
			<input type="calendar" class="w100 form-control">
			<span>~</span>
			<label for="" class="search-title blind">등록종료일</label>
			<input type="calendar" class="w100 form-control">

			<label for="" class="search-title">계정잠김여부</label>
			<select class="w100 form-control">
				<option value="">전체</option>
				<option value="100">예</option>					
				<option value="200">아니오</option>
			</select>
		</div>
		<button type="submit" class="btn btn-primary">검색</button>
	</form>
</div>
<!-- e : 검색 -->

<!-- s : jexcel -->
<div id="spreadsheet" class="jexcel_container mgt10">
	<div class="jexcel_toolbar"></div>
	<div class="jexcel_content">
		<table class="jexcel" cellpadding="0" cellspacing="0" unselectable="yes" onselectstart="return false">
			<colgroup>
				<col width="50">
				<col width="200">
				<col width="100">
				<col width="100">
				<col width="100">
			</colgroup>
			<thead class="draggable resizable">
				<tr>
					<td></td>
					<td data-x="0" title="name" class="" style="text-align: center;">name</td>
					<td data-x="1" title="year" class="" style="text-align: center;">year</td>
					<td data-x="2" title="price" class="" style="text-align: center;">price</td>
					<td data-x="3" title="date" style="text-align: center;">date</td>
				</tr>
			</thead>
			<tbody class="draggable resizable">
				<tr data-y="0" class="">
					<td data-y="0" class="jexcel_row">1</td>
					<td data-x="0" data-y="0" style="text-align: center; overflow: hidden;">Mazda</td>
					<td data-x="1" data-y="0" class="" style="text-align: center; overflow: hidden;">2001</td>
					<td data-x="2" data-y="0" style="text-align: center; overflow: hidden;" class="">2000</td>
					<td data-x="3" data-y="0" style="text-align: center;">01/01/2006</td>
				</tr>
				<tr data-y="1" class="">
					<td data-y="1" class="jexcel_row">2</td>
					<td data-x="0" data-y="1" style="text-align: center; overflow: hidden;" class="">Pegeout</td>
					<td data-x="1" data-y="1" class="" style="text-align: center; overflow: hidden;">2010</td>
					<td data-x="2" data-y="1" style="text-align: center; overflow: hidden;" class="">5000</td>
					<td data-x="3" data-y="1" style="text-align: center;">01/01/2005</td>
				</tr>
				<tr data-y="2" class="">
					<td data-y="2" class="jexcel_row">3</td>
					<td data-x="0" data-y="2" style="text-align: center; overflow: hidden;">Honda Fit</td>
					<td data-x="1" data-y="2" class="" style="text-align: center; overflow: hidden;">2009</td>
					<td data-x="2" data-y="2" style="text-align: center; overflow: hidden;" class="">3000</td>
					<td data-x="3" data-y="2" style="text-align: center;">01/01/2004</td>
				</tr>
				<tr data-y="3" class="">
					<td data-y="3" class="jexcel_row">4</td>
					<td data-x="0" data-y="3" style="text-align: center; overflow: hidden;">Eka Fit</td>
					<td data-x="1" data-y="3" class="" style="text-align: center; overflow: hidden;">2011</td>
					<td data-x="2" data-y="3" class="" style="text-align: center; overflow: hidden;">4000</td>
					<td data-x="3" data-y="3" style="text-align: center;">01/01/2004</td>
				</tr>
				<tr data-y="4">
					<td data-y="4" class="jexcel_row">5</td>
					<td data-x="0" data-y="4" style="text-align: center; overflow: hidden;">Honda CRV</td>
					<td data-x="1" data-y="4" style="text-align: center; overflow: hidden;">2010</td>
					<td data-x="2" data-y="4" style="text-align: center; overflow: hidden;">6000</td>
					<td data-x="3" data-y="4" style="text-align: center;">01/01/2003</td>
				</tr>
			</tbody>
		</table>
		<div class="jexcel_corner" unselectable="on" onselectstart="return false" style="top: -2000px; left: -2000px;"></div>
		<textarea class="jexcel_textarea" id="jexcel_textarea"></textarea>
	</div>
</div>
<!-- e : jexcel -->

	<!-- e : 타이틀 -->
	<input type="hidden" name="selectedId" />
	<input id="searchCondition" name="searchCondition" type="hidden" value=""/>
	
	<div id="content_pop">
		<!-- Single button -->
		<div class="dropdown">
		  	<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
		    	선택<span class="caret"></span>
		  	</button>
			<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu3">
				<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:fn_selectChg('');">선택</a></li>
			    <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:fn_selectChg('id');">id</a></li>
			    <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:fn_selectChg('name');">name</a></li>
			</ul>
		</div>
		<div class="col-lg-6">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="검색어 입력" id="searchKeyword" name="searchKeyword" />
				<span class="input-group-btn">
					<button class="btn btn-default" type="button" id="btnSearch" >검색</button>
				</span>
			</div><!-- /input-group -->
		</div><!-- /.col-lg-6 -->


		<!-- S: List -->
		<div id="table">
			<div class="boardListInfo" id="boardListInfo"></div>
			<table class="boardList">
				<caption style="visibility:hidden">카테고리ID, 케테고리명, 사용여부, Description, 등록자 표시하는 테이블</caption>
				<colgroup>
					<col width="50"/>
					<col width="150"/>
					<col width="200"/>
					<col width="100"/>
					<col width="100"/>
					<col width="100"/>
				</colgroup>
				<thead>
					<tr>
						<th align="center">No</th>
						<th align="center">카테고리ID</th>
						<th align="center">카테고리명</th>
						<th align="center">사용여부</th>
						<th align="center">설명</th>
						<th align="center">등록자</th>
					</tr>
				</thead>
				<tbody id="boardListItem"></tbody>
			</table>
		</div>
		<!-- E : List -->
	
		<div class="boardNavigation">
			<div class="pagination"></div>
		</div>
		
		<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Basic line chart showing trends in a dataset. This chart includes the
        <code>series-label</code> module, which adds a label to each line for
        enhanced readability.
    </p>
</figure>

		
	</div>
