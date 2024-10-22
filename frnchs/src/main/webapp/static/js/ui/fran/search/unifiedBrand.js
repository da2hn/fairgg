google.charts.load('current', {'packages':['corechart','bar'],'callback':drawChart});
$(document).ready(function() {
	init();
});

function init(){
	$(".jsTab1 a").on("click", function(){
		!dataTemp ? drawChart() : fn_createChart(dataTemp, $($(this).attr("href")).find("div[id*=_chart]").attr("id"));
//		$(this).attr("href");
		aa= $($(this).attr("href")).find("div[id*=_chart]").attr("id");
//		console.log("$(this).attr('href'):"+aa);
//		console.log("버튼:"+!dataTemp );
	})
	getReviewNews();
}

var dataTemp;
function drawChart(){
//	if($.trim($("#frnchsNo").val())=="" || $.trim($("#brandYear").val())==""){
	if($.trim($("#frnchsNo").val())==""){//정보공개서 년도가 없는 가맹점은 계속 alert창 뜨므로 제거 - jhb
		alert("요청정보 조회중 에러가 발생하였습니다.");
		return;
	}
	fnGetAjaxData("/fran/selectBrandInfo.ajax",{"frnchsNo":$("#frnchsNo").val(), "brandYear":$("#brandYear").val()} , function(_data) {
		dataTemp = _data;
		fn_createChart(_data, '');
	})
}

function fn_createChart(_data){
	_data.frchsList.forEach(function(row,idx){
		$(".mTitle4").html(_data.frchsList[0].bsnSgnal+'<span class="ts">'+$("#brandYear").val()+"년 기준"+'</span>');
			 
		if(_data.frchsList[0].atchmnflNo){
			$(".download").show();
			$(".download").attr("href",'/file/downloadFile.do?atchmnflNo='+_data.frchsList[0].atchmnflNo+'&fileSn=1&fileKey='+encodeURIComponent(_data.frchsList[0].fileKey));
		}else{
			$(".download").hide();
		}
			
		for(var key in row){
			$("#c1_"+key).text(typeof row[key] == "number" ? gfnNumberWithCommas(row[key]): row[key]);
			$("#m1_"+key).text(typeof row[key] == "number" ? gfnNumberWithCommas(row[key]): row[key]);
			$("#m2_"+key).text(typeof row[key] == "number" ? gfnNumberWithCommas(row[key]): row[key]);
		}
		
		var options = {
				title: '',
				legend: { position: 'bottom' }
			};
		
		var options1 = {
				title: '평균매출액',
				width: $(".mGraph1").width(),
				vAxis: {
					format: 'decimal',
					viewWindow: { min: 0},
					viewWindowMode: "explicit",
					baseline: 0,
					minValue: 0
				},
				animation:{
					startup: true,
					easing: 'inAndOut',
					duration: 5000
				},
				hAxis: {
					viewWindow : {
						min : 0
					}
				},
				bar: {groupWidth: '80%'},
				legend: {
					position: 'bottom'
					, alignment : 'center'
				}
			};
		var options2 = {
			title: '면적당매출액',
			width: $(".mGraph1").width(),
			vAxis: {
				format: 'decimal',
				viewWindow: { min: 0},
				viewWindowMode: "explicit",
				baseline: 0,
				minValue: 0
			},
			hAxis: {
				viewWindow : {
					min : 0
				}
			},
			bar: {groupWidth: '80%'},
			legend: {
				position: 'bottom'
				, alignment : 'center'
			}

		};

		var options3 = {
				title: '',
				//width: chartData16.getNumberOfRows() * 100,
				//bar: {groupWidth: 70}
			};

		var options4 = {
//				title: '평균매출액',
			width:$(".mGraph1").width(),
			animation:{
				duration: 2000,
				easing: 'inAndOut',
				startup: true
			},
			vAxis: {
				format: 'decimal',
				viewWindow: { min: 0},
				viewWindowMode: "explicit",
				baseline: 0,
				minValue: 0
			},
			hAxis: {
				viewWindow : {
					min : 0
				}
			},
			legend: {
				position: 'bottom'
				, alignment : 'center'
			},
			theme: 'material',
			bar: {groupWidth: '90%'}
		};
		var options5 = {
//			title: '평균매출액',
			width: $(".mGraph1").width(),
			bar: {groupWidth: '90%'},
			theme: 'material',
			bars: 'horizontal',
			hAxis: {format: 'decimal'},
			legend: {
				position: 'bottom'
				, alignment : 'center'
			}
		};
		var optionsPie = {
			title: '',
			'width' : $(".mGraph1").width()/2,
			'height': $(".mGraph1").width()/3 > 210 ? 210 : $(".mGraph1").width()/3,
			animation:{
				startup: true,
				easing: 'inAndOut',
				duration: 5000
			},
			legend: { position: 'bottom' }
		};
		
		
		var data1 = [];
		data1.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data1.push([_data.yearList[i].year , Number(_data.yearList[i].assets)]);
			if(i==_data.yearList.length-1){
				$("#m_assets").text(Number(_data.yearList[i].assets)+" 천원");
			}
		}
		
		
		var data2 = [];
		data2.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data2.push([_data.yearList[i].year ,Number(_data.yearList[i].debt)]);
			if(i==_data.yearList.length-1){
				$("#m_debt").text(Number(_data.yearList[i].debt)+" 천원");
			}
		}
	
		
		var data3 = [];
		data3.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data3.push([_data.yearList[i].year ,Number(_data.yearList[i].capl)]);
			if(i==_data.yearList.length-1){
				$("#m_capl").text(Number(_data.yearList[i].capl)+" 천원");
			}
		}
		
		
		var data4 = [];
		data4.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data4.push([_data.yearList[i].year ,Number(_data.yearList[i].selngAm)]);
			if(i==_data.yearList.length-1){
				$("#m_selngAm").text(Number(_data.yearList[i].selngAm)+" 천원");
			}
		}

		var data5 = [];
		data5.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data5.push([_data.yearList[i].year ,Number(_data.yearList[i].bsnProfit)]);
			if(i==_data.yearList.length-1){
				$("#m_bsnProfit").text(Number(_data.yearList[i].bsnProfit)+" 천원");
			}
		}

		var data6 = [];
		data6.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data6.push([_data.yearList[i].year ,Number(_data.yearList[i].thstrmNtpf)]);
			if(i==_data.yearList.length-1){
				$("#m_thstrmNtpf").text(Number(_data.yearList[i].thstrmNtpf)+" 천원");
			}
		}
		
		$("#staffCnt").html(Number(_data.yearList[_data.yearList.length-1].exctvCo)+Number(_data.yearList[_data.yearList.length-1].empCo)); 
		$("#m_staffCnt").html(Number(_data.yearList[_data.yearList.length-1].exctvCo)+Number(_data.yearList[_data.yearList.length-1].empCo));
//		var data7 = [];
//		data7.push(['','']);
//		data7.push(['임원수' ,Number(_data.yearList[_data.yearList.length-2].exctvCo) ]);
//		data7.push(['직원수' ,Number(_data.yearList[_data.yearList.length-2].empCo) ]);
//
//		var data8 = [];
//		data8.push(['','']);
//		data8.push(['임원수' ,Number(_data.yearList[_data.yearList.length-1].exctvCo) ]);
//		data8.push(['직원수' ,Number(_data.yearList[_data.yearList.length-1].empCo) ]);

		var data9 = [];
		data9.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data9.push([_data.yearList[i].year ,Number(_data.yearList[i].mrhstCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_9").text(Number(_data.yearList[i].mrhstCo)+" 개");
			}
		}


		var data10 = [];
		data10.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data10.push([_data.yearList[i].year ,Number(_data.yearList[i].droperCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_10").text(Number(_data.yearList[i].droperCo)+" 개");
			}
		}
		var data11 = [];
		data11.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data11.push([_data.yearList[i].year ,Number(_data.yearList[i].newStorCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_11").text(Number(_data.yearList[i].newStorCo)+" 개");
			}
		}

		var data12 = [];
		data12.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data12.push([_data.yearList[i].year ,Number(_data.yearList[i].cntrctEndCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_12").text(Number(_data.yearList[i].cntrctEndCo)+" 개");
			}
		}

		var data13 = [];
		data13.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data13.push([_data.yearList[i].year ,Number(_data.yearList[i].cntrctTrmnatCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_13").text(Number(_data.yearList[i].cntrctTrmnatCo)+" 개");
			}
		}

		var data14 = [];
		data14.push(['',_data.yearList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
//			console.log(i+":"+_data.yearList.length);
			data14.push([_data.yearList[i].year ,Number(_data.yearList[i].nmChangeCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_14").text(Number(_data.yearList[i].nmChangeCo)+" 개");
			}
		}
		
		var data15 = [];
		var emptyData15 = 0;
		data15.push(['',_data.yearList[0].bsnSgnal]);
		// 마지막년도만 - 21.03.16
		for( var y=0; y< _data.yearList.length; y++ ){
			if(y==_data.yearList.length-1){
				for( var i=0; i< _data.sidoList.length; i=i+2 ){
					if(_data.yearList[y].year == _data.sidoList[i].year) {
						if(_data.sidoList[i].ctprvnNm=="전체"){
							$("#m_year_15").text(Number(Number(_data.sidoList[i].avrgSelngAm))+" 천원");
						}
						data15.push([fn_ctprvnNmLower(_data.sidoList[i].ctprvnNm) ,Number(_data.sidoList[i].avrgSelngAm),]);
						if(!_data.sidoList[i].avrgSelngAm) emptyData15++;
					}
				}
			}
		}

		var data16 = [];
		var emptyData16 = 0;
		data16.push(['',_data.yearList[0].bsnSgnal]);
		// 마지막년도만 - 21.03.16
		for( var y=0; y< _data.yearList.length; y++ ){
			if(y==_data.yearList.length-1){
				for( var i=0; i< _data.sidoList.length; i++ ){
					if(_data.yearList[y].year == _data.sidoList[i].year) {
						if(_data.sidoList[i].ctprvnNm=="전체"){
							$("#m_year_16").text(Number(Number(_data.sidoList[i].unitArAvrgSelngAm))+" 천원");
						}
						data16.push([fn_ctprvnNmLower(_data.sidoList[i].ctprvnNm) ,Number(_data.sidoList[i].unitArAvrgSelngAm)]);
						if(!_data.sidoList[i].unitArAvrgSelngAm ) emptyData16++;
					}
				}
			}
		}
		
		var chartData1 = google.visualization.arrayToDataTable(data1);
		var chartData2 = google.visualization.arrayToDataTable(data2);
		var chartData3 = google.visualization.arrayToDataTable(data3);
		var chartData4 = google.visualization.arrayToDataTable(data4);
		var chartData5 = google.visualization.arrayToDataTable(data5);
		var chartData6 = google.visualization.arrayToDataTable(data6);
//		var chartData7 = google.visualization.arrayToDataTable(data7);
//		var chartData8 = google.visualization.arrayToDataTable(data8);
		var chartData9 = google.visualization.arrayToDataTable(data9);
		var chartData10 = google.visualization.arrayToDataTable(data10);
		var chartData11 = google.visualization.arrayToDataTable(data11);
		var chartData12 = google.visualization.arrayToDataTable(data12);
		var chartData13 = google.visualization.arrayToDataTable(data13);
		var chartData14 = google.visualization.arrayToDataTable(data14);
		var chartData15 = google.visualization.arrayToDataTable(data15);
		var chartData16 = google.visualization.arrayToDataTable(data16);
		
		var chart1 = new google.visualization.LineChart(document.getElementById('year_chart1'));
		var mchart1 = new google.visualization.LineChart(document.getElementById('m_year_chart1'));
		var chart2 = new google.visualization.LineChart(document.getElementById('year_chart2'));
		var mchart2 = new google.visualization.LineChart(document.getElementById('m_year_chart2'));
		var chart3 = new google.visualization.LineChart(document.getElementById('year_chart3'));
		var mchart3 = new google.visualization.LineChart(document.getElementById('m_year_chart3'));
		var chart4 = new google.charts.Bar(document.getElementById('year_chart4'));
		var mchart4 = new google.charts.Bar(document.getElementById('m_year_chart4'));
		var chart5 = new google.charts.Bar(document.getElementById('year_chart5'));
		var mchart5 = new google.charts.Bar(document.getElementById('m_year_chart5'));
		var chart6 = new google.charts.Bar(document.getElementById('year_chart6'));
		var mchart6 = new google.charts.Bar(document.getElementById('m_year_chart6'));
//		var chart7 = new google.visualization.PieChart(document.getElementById('pie_chart7'));
//		var chart8 = new google.visualization.PieChart(document.getElementById('pie_chart8'));
		var chart9 = new google.charts.Bar(document.getElementById('year_chart9'));
		var mchart9 = new google.charts.Bar(document.getElementById('m_year_chart9'));
		var chart10 = new google.charts.Bar(document.getElementById('year_chart10'));
		var mchart10 = new google.charts.Bar(document.getElementById('m_year_chart10'));
		var chart11 = new google.charts.Bar(document.getElementById('year_chart11'));
		var mchart11 = new google.charts.Bar(document.getElementById('m_year_chart11'));
		var chart12 = new google.charts.Bar(document.getElementById('year_chart12'));
		var mchart12 = new google.charts.Bar(document.getElementById('m_year_chart12'));
		var chart13 = new google.charts.Bar(document.getElementById('year_chart13'));
		var mchart13 = new google.charts.Bar(document.getElementById('m_year_chart13'));
		var chart14 = new google.charts.Bar(document.getElementById('year_chart14'));
		var mchart14 = new google.charts.Bar(document.getElementById('m_year_chart14'));
		var chart15 = new google.charts.Bar(document.getElementById('sido_chart15'));
		var mchart15 = new google.charts.Bar(document.getElementById('m_sido_chart15'));
		var chart16 = new google.charts.Bar(document.getElementById('sido_chart16'));
		var mchart16 = new google.charts.Bar(document.getElementById('m_sido_chart16'));
		
		chart1.draw(chartData1, options);
		mchart1.draw(chartData1, options);
		chart2.draw(chartData2, options);
		mchart2.draw(chartData2, options);
		chart3.draw(chartData3, options);
		mchart3.draw(chartData3, options);
		chart4.draw(chartData4, google.charts.Bar.convertOptions(options4));
		chart5.draw(chartData5, google.charts.Bar.convertOptions(options5));
		chart6.draw(chartData6, google.charts.Bar.convertOptions(options5));
		
		mchart4.draw(chartData4, google.charts.Bar.convertOptions(options4));
		mchart5.draw(chartData5, google.charts.Bar.convertOptions(options5));
		mchart6.draw(chartData6, google.charts.Bar.convertOptions(options5));
		
//		chart7.draw(chartData7, optionsPie);
//		chart8.draw(chartData8, optionsPie);
		chart9.draw(chartData9, google.charts.Bar.convertOptions(options4));
		mchart9.draw(chartData9, google.charts.Bar.convertOptions(options4));
		chart10.draw(chartData10, google.charts.Bar.convertOptions(options4));
		mchart10.draw(chartData10, google.charts.Bar.convertOptions(options4));
		chart11.draw(chartData11, google.charts.Bar.convertOptions(options4));
		mchart11.draw(chartData11, google.charts.Bar.convertOptions(options4));
		chart12.draw(chartData12, google.charts.Bar.convertOptions(options4));
		mchart12.draw(chartData12, google.charts.Bar.convertOptions(options4));
		chart13.draw(chartData13, google.charts.Bar.convertOptions(options4));
		mchart13.draw(chartData13, google.charts.Bar.convertOptions(options4));
		chart14.draw(chartData14, google.charts.Bar.convertOptions(options4));
		mchart14.draw(chartData14, google.charts.Bar.convertOptions(options4));
		chart15.draw(chartData15, google.charts.Bar.convertOptions(options1));
		mchart15.draw(chartData15, google.charts.Bar.convertOptions(options1));
		chart16.draw(chartData16, google.charts.Bar.convertOptions(options2));
		mchart16.draw(chartData16, google.charts.Bar.convertOptions(options2));
	});
	
}

function getReviewNews(){
	fnGetAjaxData("/fran/selectNewsReview.ajax", {param3:$("#frnchsNo").val()}, function(_data) {
		var tmpHtml = [];

		var review1 = JSON.parse(_data.blog1);
		var news1 = JSON.parse(_data.news1);

		try{

			review1.items.forEach(function(row,idx){
				tmpHtml.push('<a target="_blank" href="'+row.link+'" class="ul">'+row.title+'</a><br>')
				tmpHtml.push(row.description);
				tmpHtml.push('<br><br>')
			});
			$(".review1").html( tmpHtml.join("") );


			tmpHtml = [];
			news1.items.forEach(function(row,idx){
				tmpHtml.push('<a target="_blank" href="'+row.link+'" class="ul">'+row.title+'</a><br>')
				tmpHtml.push(row.description);
				tmpHtml.push('<br><br>')
			});
			$(".news1").html( tmpHtml.join("") );

			tmpHtml = [];
		}catch(e){
			console.log("뉴스,블로그 데이터에 문제가 있습니다.");
		}
	});
}

function fn_ctprvnNmLower(ctprvnNm) {
	if("서울특별시" == ctprvnNm) {
		ctprvnNm = "서울";
	} else if("제주특별자치도" == ctprvnNm) {
		ctprvnNm = "제주";
	} else if("울산광역시" == ctprvnNm) {
		ctprvnNm = "울산";
	} else if("충청남도" == ctprvnNm) {
		ctprvnNm = "충남";
	} else if("충청북도" == ctprvnNm) {
		ctprvnNm = "충북";
	} else if("경상북도" == ctprvnNm) {
		ctprvnNm = "경북";
	} else if("경상남도" == ctprvnNm) {
		ctprvnNm = "경남";
	} else if("전라북도" == ctprvnNm) {
		ctprvnNm = "전북";
	} else if("전라남도" == ctprvnNm) {
		ctprvnNm = "전남";
	} else if("대전광역시" == ctprvnNm) {
		ctprvnNm = "대전";
	} else if("경기도" == ctprvnNm) {
		ctprvnNm = "경기";
	} else if("인천광역시" == ctprvnNm) {
		ctprvnNm = "인천";
	} else if("광주광역시" == ctprvnNm) {
		ctprvnNm = "광주";
	} else if("대구광역시" == ctprvnNm) {
		ctprvnNm = "대구";
	} else if("세종특별자치시" == ctprvnNm) {
		ctprvnNm = "세종";
	} else if("부산광역시" == ctprvnNm) {
		ctprvnNm = "부산";
	} else if("강원도" == ctprvnNm) {
		ctprvnNm = "강원";
	}

	return ctprvnNm
}