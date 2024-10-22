<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!--Load the AJAX API-->
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
	//Load the Visualization API and the corechart package.
	google.charts.load('current', {'packages':['corechart']});
	
	function drawChart(type, obj, row, column, dataList, title) {
		obj.empty();
		
		// Instantiate and draw our chart, passing in some options.
		var chart = null;
		if("pie" == type) {
			chart = new google.visualization.PieChart(obj[0]);
		} else if("column" == type) {
			chart = new google.visualization.ColumnChart(obj[0]);
		} else if("bar" == type) {
			chart = new google.visualization.BarChart(obj[0]);
		} else if("line" == type) {
			chart = new google.visualization.LineChart(obj[0]);
		} else {
			alert("타입설정 에러가 발생하였습니다.");
			return;
		}
		var data, option;
		if(type == "line") {
			var dataArray = new Array();
			var maxCount = 0;
			dataArray.push([row || '일', column || '건수']); <%-- header --%>
			if(!!dataList && dataList.length > 0) {
				dataList.forEach(function(item,idx){
					if ("월별 접속 통계" == title) {
						dataArray.push([item.srchMonth, parseInt(item.monthCount)]);
// 						dataArray.push([item.srchMonth, 0]);
						if(maxCount < parseInt(item.monthCount)) maxCount = item.monthCount;
					}else if ("주별 접속 통계" == title) {
						dataArray.push([item.wk, parseInt(item.cnt)]);
						if(maxCount < parseInt(item.cnt)) maxCount = item.cnt;
					} else {
						dataArray.push([item.srchDay, item.dayCount]);
// 						dataArray.push([item.srchDay, 0]);
						if(maxCount < parseInt(item.dayCount)) maxCount = item.dayCount;
					}
				})
			}
			data = google.visualization.arrayToDataTable(dataArray);
			
			options = {	
// 				'title': title ,
				'legend': { position: 'none'},
				'width': obj.width(),
				'height': obj.height(),
				vAxis: {
					viewWindow: { min: 0},
					viewWindowMode: "explicit",
					baseline: 0,
					minValue: 0
				},
				hAxis: {
					gridlines:{
						count: !dataList.length ? 0 : dataList.length,
					}
				},
			}
			if(!maxCount) {
			    options.vAxis.ticks = [0, 1];
			}
		} else {
			// Create the data table.
			data = new google.visualization.DataTable();
			data.addColumn('string', row || '전체');
			data.addColumn('number', column || '건수' );
			var dataArray = new Array();
			if(!!dataList && dataList.length > 0) {
				dataList.forEach(function(item,idx){
// 					console.log(item.codeValueNm+":"+item.cnt)
					dataArray.push([item.codeValueNm, item.cnt]);
				})
			}
			data.addRows(dataArray);
	
			// Set chart options
			options = {	
				'legend': { position: ("pie" == type ? 'bottom' : 'right')},
				'width': ("pie" == type ? obj.width() : (obj.height()*2 > obj.width() ? obj.width() : obj.height() * 2)),
				'height':obj.height()};
       		console.log("차트:"+type+":"+options.legend.position); 
		}
		chart.draw(data, options);
		obj.find("div[dir=ltr]").css("position", "");
		
		//반응형 그래프 출력 - 21.01.13
       	window.addEventListener('resize', function() { 
       		options.width = ("pie"  == type || "line"  == type ? obj.width() : (obj.height()*2 > obj.width() ? obj.width() : obj.height() * 2));
       		options.legend.position = ("line" == type ? 'none' :("pie" == type ? 'bottom' : 'right')); 
       		chart.draw(data, options);
       		console.log("반응형 차트:"+type+":"+options.width); 
       		console.log(options); 
     	}, false);
	}
	
	function fn_selectAccsStatDetailList(pageIndex, type) {
		$("input[name=pageIndex]").val(pageIndex || 1);
/* 		console.log($("#searchForm").serialize()); */
		$.post('<c:url value="/sysMngr/selectAccsStatDetailList.ajax"/>',
			$("#searchForm").serializeArrayString()
		).done(function(data) {
			if(data.resultCode == 'success'){
				$("#dayTable > table > tbody").empty();
				var dataList = data.dataList;
				if(!!dataList && dataList.length != 0) {
					var dataTr = "";
					dataList.forEach(function(data,idx){
/* 						console.log(data); */
						dataTr += '<tr>';
						dataTr += '<td>'+data.rn+'</td>';
						if("month" == type|| 'week' == type) {
							dataTr += '<td>'+data.convertConectDt+'</td>';
						}
						dataTr += '<td>'+data.conectrIp+'</td>';
						dataTr += '<td>'+data.loginTime+'</td>';
						dataTr += '<td>'+(data.userSeNm || '') +'</td>';
						dataTr += '<td>'+(data.userNm || '') +'</td>';
						dataTr += '</tr>';
					})
					$("#dayTable > table > tbody").append(dataTr);
				} else {
					$("#dayTable > table > tbody").append('<tr><td colspan="'+((type == "month") ? "6" : "5")+'">조회된 접속정보가 없습니다.</td></tr>');
				}
				
/* 				console.log(data.pagingHtml); */
				$(".mPag1").html(data.pagingHtml).trigger("create");
			}else{
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		})
		
	}
	function fn_selectAccsStatDetailListByMonth(pageIndex) {
		fn_selectAccsStatDetailList(pageIndex, "month");
	}
	function fn_selectAccsStatDetailListByDay(pageIndex) {
		fn_selectAccsStatDetailList(pageIndex, "day");
	}
	function fn_selectAccsStatDetailListByWeek(pageIndex) {
		fn_selectAccsStatDetailList(pageIndex, "week");
	}
	
</script>