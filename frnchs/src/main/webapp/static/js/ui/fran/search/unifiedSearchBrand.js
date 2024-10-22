//google.charts.load('current', {'packages':['corechart','bar'],'callback':drawChart});
var chartData = [];
$(document).ready(function() {
	init();
});

function init(){
	
	$(".favorite").off("click").on("click",function(e){
		e.preventDefault();

		var param = {};
		param.frnchsNo = $("#paramfrnchsNo").val();

		var confirmMsg = "";

		if( $(this).hasClass("selected") ){

			param.flag = 'Y'
			confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
		}else{
			param.flag = 'N'
			confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
		}

		if( confirm(confirmMsg) ){
			$.ajax({
				dataType:"html",
				type: "POST",
				url: "/comcode/intrstFrnchs.ajax",
				data:param,
				async: true,
				cache: false,
				success : function(data, status, request) {
					if(fnChkJson(data)){
						var jsonData = JSON.parse(data);
						if(jsonData.resultCode == "success"){
							$(".favorite").toggleClass("selected");
						}
					} else{
						$("#popupDiv").html(data);
						
							$("#loginPopup .gray").attr("href","javascript:closeLgnPop();");
							$("#loginPopup .close").attr("href","javascript:closeLgnPop();");
					}
				},
			    error: function(request, status, error) {
		    		window.error = error;
					alert(error);
				}
			});
		}else{
			return false;
		}


	});
	
	$(".iFavor").off("click").on("click",function(e){
		e.preventDefault();
		
		var param = {};
		param.frnchsNo = $("#paramfrnchsNo").val();
		
		var confirmMsg = "";
		
		if( $(this).hasClass("selected") ){
			
			param.flag = 'Y'
				confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
		}else{
			param.flag = 'N'
				confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
		}
		
		if( confirm(confirmMsg) ){
			$.ajax({
				dataType:"html",
				type: "POST",
				url: "/comcode/intrstFrnchs.ajax",
				data:param,
				async: true,
				cache: false,
				success : function(data, status, request) {
					if(fnChkJson(data)){
						var jsonData = JSON.parse(data);
						if(jsonData.resultCode == "success"){
							$(".iFavor").toggleClass("selected");
						}
					} else{
						$("#popupDiv").html(data);
						
						$("#loginPopup .gray").attr("href","javascript:closeLgnPop();");
						$("#loginPopup .close").attr("href","javascript:closeLgnPop();");
					}
				},
				error: function(request, status, error) {
					window.error = error;
					alert(error);
				}
			});
		}else{
			return false;
		}
		
		
	});
	
	$(".jsTab1 a").on("click", function(){
		!dataTemp ? chartInit() : fn_createChart(dataTemp, $($(this).attr("href")).find("div[id*=_chart]").attr("id"));
//		$(this).attr("href");
//		aa= $($(this).attr("href")).find("div[id*=_chart]").attr("id");
//		console.log("$(this).attr('href'):"+aa);
//		console.log("버튼:"+!dataTemp );
	});
	
	fnGetAjaxData("/stat/selectDataYear.ajax", {}, function(_data) {
		var tmpHtml=[];
		if(_data.resultCode == RESULT_SUCCESS){
			_data.dataList.forEach(function(row,idx){
//				if(row.stdrYear == '2020'){
//					var windowWidth = window.matchMedia("screen and (max-width:750px)");
////					if (!windowWidth.matches) {
////						tmpHtml.push('<option value="'+row.stdrYear+'" selected>'+row.stdrYear+'년</option>');
////					}					
//				}
				if(row.stdrYear == "2021") {
					return false;
				}
				tmpHtml.push('<option value="'+row.stdrYear+'" >'+row.stdrYear+'년</option>');
			});

			$(".year").html( tmpHtml.join("") );
			$("#brandYear").html( tmpHtml.join("") );
			$("#brandYearMob").html( tmpHtml.join("") );
			$(".year").val($("#localYear").val() || $(".year option:last").val()); // 최신년 선택으로 변경 - 21.03.17 
			$("#brandYear").val($("#brandYear option:last").val()); // 최신년 선택으로 변경 - 21.03.17 //요청으로 인한 임시 주석처리
			$("#brandYearMob").val($("#brandYear option:last").val()); // 최신년 선택으로 변경 - 21.03.17
			if(!$("#parambrandYear").val()){
				$("#parambrandYear").val($("#brandYear option:selected").val());			
			}

		}else{
			////console.log("데이터 있는 연도 가져오기 실패..");
		}
	});
	

	
	
	$(".brandLdClass").empty();
	$(".brandLdClass").append('<option value="">- 대분류 -</option>');
	$(".brandLdClassMob").empty();
	$(".brandLdClassMob").append('<option value="">업종 대분류</option>');
	//대분류 조회
	//2021-12-23 대분류 중첩으로 인한 주석처리
	//forEach 반복으로 다중조회 현상 제거
/*	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {
		////console.log("대분류",_data);
		_data.franchLclasList.forEach(function(row,idx){
			if( !~row.lclasIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
				$("#brandLdClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
		});
	});*/
	
	$("#brandYear").off("change").on("change",function(e){
		$("#parambrandYear").val($("#brandYear option:selected").val());
	});
	$("#brandYearMob").off("change").on("change",function(e){;
		$("#parambrandYear").val($("#brandYearMob option:selected").val());
	});
	$("#brandFrcClassMob").off("change").on("change",function(e){;
		$("#paramfrnchsNo").val($("#brandFrcClassMob option:selected").val());
	});
	
	//브랜드대분류 변경시
	$("#brandLdClass").off("change").on("change",function(e){
		fnChangeBrandLd();
	});
	$("#brandLdClassMob").off("change").on("change",function(e){
		fnChangeBrandLdMob();
	});
	//브랜드중분류 변경시
	$("#brandMdClass").off("change").on("change",function(e){
		$("#brandFrcClass").html('');
		$("#brandFrcClass").append('<option value="">- 프랜차이즈 -</option>');
	});
	//브랜드중분류 변경시---------------------------------------------------------------------------------------------------------------------
	$("#brandMdClassMob").off("change").on("change",function(e){
		$("#brandFrcClassMob").html('');
		$("#brandFrcClassMob").append('<option value="">프랜차이즈명</option>');		

		
		if(!$("#brandMdClassMob").val()){
			$("#brandFrcClassMob").attr('disabled', 'disabled');
		}else{
			$("#brandFrcClassMob").attr('disabled', false);
		}

		var params = {};//업종이랑 프랜차이즈명 like로
		params.jobCode  = $('#brandMdClassMob:visible').val();
//		params.frchsNm  = $("#searchFrchsNmMob").val();
		params.frchsNm  = '';
		//TODO 임시_20220215 - 박성민
	 	params.orderType = 'cnt';
	 	////TODO 임시_20220215 - 박성민
		fnGetAjaxData("/stat/selectFrchsList.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
					var tmpHtml = [];
					if(_data.dataList.length > 0){
						_data.dataList.forEach(function(row,idx){
							$("#brandFrcClassMob").append('<option value="' + row.frnchsNo + '">' + row.bsnSgnal + '</option>');
						});
					} 
			} else {
				console.log("fail msg",_data.resultMsg);
			}
		});
	});
	$("#brandFrcClass").click(function(){
		if($("#brandMdClass").val()){
			openFrchsPop();
		}
	});
	$(".kakaoShare").click(function(){
		var title = $("#m1_bsnSgnal").text();		
		var params ={
				'frnchsNo' : $("#paramfrnchsNo").val(),
				'brandYear' : $("#parambrandYear").val()
		}
		sendLinkDefault(title, params);
	});
	
	//링크를 통해 접근했을경우
	if($("#paramfrnchsNo").val()){
		$('#paramBrandFrcNm').val('');		
		stepView(1);
		chartInit();
		getReviewNews();
	}
	drawbubbleChart();
	events();	
}
function chartInit(){
	google.charts.load('current', {'packages':['corechart','bar'],'callback':drawChart});
}

function drawChart(){
	fnGetAjaxData("/fran/selectBrandInfo.ajax",{frnchsNo:$("#paramfrnchsNo").val(),brandYear:$("#parambrandYear").val()} , function(_data) {
		$("#anlyYearMob").text($("#parambrandYear").val());
		dataTemp = _data;
		fn_createChart(_data, '');
	});
}

function drawbubbleChart(){
	google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawSeriesChart);
};

function drawSeriesChart() {
	var chartData = [];
	var data, options, brandYear;
	
//	if($('#parambrandYear').val()){
//		brandYear = $('#parambrandYear').val();
//	}else{
//		brandYear = $('#brandYear').val();
//	}
	
//	var params = {
//			'brandLdClass' : $('#brandLdClass').val(),
//			'brandMdClass' : $('#brandMdClass').val(),
//			'brandYear' : (parseInt(brandYear))
//	}

	$("#bubbleChart").html('');
    var el = document.getElementById('bubbleChart');
    var data;
    
    fnGetAjaxData("/fran/selectPopularityKeyword.ajax", {}, function(_data) {
    	if(_data.PopularityList.length > 0){
    		chartData = _data.PopularityList;
    		var seriesMap = {};
			data = { series: [] };
			
    		_data.PopularityList.forEach(function(row,idx){
    			var dataMap = {}
    			dataMap.name = row.mlsfcIndutyNm;
    			dataMap.data = row.bsnSgnalCnt;
    			data.series.push(dataMap);
    			data.series[idx].markers = [0];
    			data.series[idx].ranges = [[0]];
//    			if(idx == 0){
//    				data.categories.push(row.registDt +'('+ row.daysNm + ')' )
//    				categoriesStr = row.daysNm;
//        			if(row.lclasIndutyNm == '도소매'){
//            			data.series[0].data[categoriesIdx] = row.bsnSgnalCnt
//        			}else if(row.lclasIndutyNm == '서비스'){
//            			data.series[1].data[categoriesIdx] = row.bsnSgnalCnt
//        			}else{
//            			data.series[2].data[categoriesIdx] = row.bsnSgnalCnt
//        			}
//    			}else{
//    				if(categoriesStr != row.daysNm) {
//        				data.categories.push(row.registDt +'('+ row.daysNm + ')' )
//        				categoriesStr = row.daysNm;					
//    					categoriesIdx ++;
//    					
//    	     			if(row.lclasIndutyNm == '도소매'){
//                			data.series[0].data[categoriesIdx] = row.bsnSgnalCnt
//            			}else if(row.lclasIndutyNm == '서비스'){
//                			data.series[1].data[categoriesIdx] = row.bsnSgnalCnt
//            			}else{
//                			data.series[2].data[categoriesIdx] = row.bsnSgnalCnt
//            			}
//                		
//    				}else{
//    	     			if(row.lclasIndutyNm == '도소매'){
//                			data.series[0].data[categoriesIdx] = row.bsnSgnalCnt
//            			}else if(row.lclasIndutyNm == '서비스'){
//                			data.series[1].data[categoriesIdx] = row.bsnSgnalCnt
//            			}else{
//                			data.series[2].data[categoriesIdx] = row.bsnSgnalCnt
//            			}
//    				}
//    			}
    		});
    	}else{
				$("#bubbleChart").text("최근 검색된 데이터가 없습니다.");
				$("#bubbleChart").css("line-height", "490px");
				$("#bubbleChart").css("text-align", "center");
    	}
    });
    
    var options = {
      chart: { 
    	  title: ''
    	  , width: $("#bubbleChart").width()
    	  , height: $("#bubbleChart").height()
      },
      series: {
          vertical: true,
        },
      yAxis: {
        title: '검색수'
      },
      xAxis: {
        title: '업종 별 통계',
      },
	  lang: {
	    noData: '현재 표시할 데이터가 없습니다 분석기간 또는 업종을 확인해주세요.'
      },
      exportMenu: {
    	    visible: false
    	  },
      circleLegend: {
    	    visible: true,
    	  },
//      tooltip: {
//    	    formatter: function(value, tooltipDataInfo){
//    	      var temp = Number(value);
//    	      let icon = '☀️';
//    	      if (temp < 0) {
//    	        icon = '❄️';
//    	      } else if (temp > 25) {
//    	        icon = '🔥';
//    	      }
//    	      return `${icon} ${value} ℃`;
//    	    	console.log(tooltipDataInfo)
//      	      var temp = Number(value);
//    	      return temp + '건';
//    	    }, 
//    	  },
    	  
      tooltip: {
    	  template: function(model, body ) {
    		  	  body = {"body":body}
            	  var label = model.data[0].label;
            	  var thisValue = model.data[0].value[0].value;
            	  var thisColor = model.data[0].color;
            	  var bsnSgnal = '정보없음';
            	  var bsnCnt = 0;
            	  for(var i = 0; i<chartData.length; i++){
            		  if(chartData[i].mlsfcIndutyNm == label){
            			  bsnSgnal = chartData[i].bsnSgnal;
            			  bsnCnt = chartData[i].maxCount;
            		  }
            	  }
            	  var etcCnt = (thisValue - bsnCnt);
//				    <span class="toastui-chart-name">${label}</span>
//					  </span></div>
//					            <div class="toastui-chart-tooltip-series">
//					    <span class="toastui-chart-series-value">${thisValue}</span>
            	  var titleBody = ''; 
            	  titleBody += '<div class="toastui-chart-tooltip-series-wrapper" style="font-weight: normal; font-family: Noto Sans Korean; font-size: 13px; color: #56565;">'
					      +'<div class="toastui-chart-tooltip-series"><span class="toastui-chart-series-name">'
					    +'<i class="toastui-chart-icon" style="background:' + thisColor + '"></i>'
	    					+'<span class="toastui-chart-series-name">'
						        +'<span class="toastui-chart-name">'+label +'</span>'
						    +'</span>'
				            +'<span class="toastui-chart-series-value">'+thisValue+'</span>'
					  +'</div>'
					    +'</div>';
            	  
            	  var popularity = '';
            	  popularity += '<div class="toastui-chart-tooltip-series-wrapper" style="font-weight: normal; font-family: Noto Sans Korean; font-size: 13px; color: #56565;">'
					                    +'<div class="toastui-chart-tooltip-series">'
						                    +'<span class="toastui-chart-series-name">'
										        	 +'<span class="toastui-chart-name">'+bsnSgnal+'</span>'
										    +'</span>'
								            +'<span class="toastui-chart-series-value">'+bsnCnt+'</span>'
							            +'</div>'
							        +'</div>';
            	  var etc = '';
            	  etc += '<div class="toastui-chart-tooltip-series-wrapper" style="font-weight: normal; font-family: Noto Sans Korean; font-size: 13px; color: #56565;">'
				                +'<div class="toastui-chart-tooltip-series">'
				                    +'<span class="toastui-chart-series-name">'
				                    	 +'<span class="toastui-chart-name">기타</span>'
								    +'</span>'
						            +'<span class="toastui-chart-series-value">'+etcCnt+'</span>'
					            +'</div>'
					        +'</div>';
                return 
              '<div style="display: flex; flex-direction: column; background: #fff; border-radius: 5px; border: 3px solid #565656;">'
               +titleBody
                +popularity
                +etc
              +'</div>';
            	  
//                <p style="padding: 5px; margin: 0; border-bottom: 1px solid #ddd;font-size: 13px; text-align: center"> ${model.category} </p>
              },
            },
      theme: {
    	    tooltip: {
    	      background: '#fff',
    	      borderColor: '#f8a80f',
    	      borderWidth: 7,
    	      borderRadius: 30,
//    	      borderStyle: 'double',
    	      header: {
	  	    		fontFamily: 'Noto Sans Korean',
		    		fontSize: 13,
//		    		fontWeight: 600,
		    		color: '#56565',
    	    	  },
    	      body: {
  	    		fontFamily: 'Noto Sans Korean',
	    		fontSize: 13,
//	    		fontWeight: 600,
	    		color: '#56565',
  	    	  }
    	    },
    	    xAxis:{    	    	
    	    	title: {
    	    		fontFamily: 'Noto Sans Korean',
    	    		fontSize: 13,
    	    		fontWeight: 600,
    	    		color: '#212227',
    	    		},
    	    	visible: false,
    	    },
    	    yAxis:{    	    	
    	    	title: {
    	    		fontFamily: 'Noto Sans Korean',
    	    		fontSize: 13,
    	    		fontWeight: 600,
    	    		color: '#212227',
    	    		},
        	    visible: false
    	    },
    	}
    };

    var chart = toastui.Chart.bulletChart({ "el":el, "data":data, "options":options });
 }


function events(){
	$("#brandLdClass").change(function(){
		fnChangeBrandLd();
	});
	$("#brandLdClassMob").change(function(){
		fnChangeBrandLdMob();
	});
	
	$(".viewBrandBtn").click(function(){
//		if(!$("#brandFrcClass").val()){
//			stepView(0);
//			drawbubbleChart();
//		}else{			
//			stepView(1);
//			chartInit();
//			getReviewNews();
//		}
		if(!$("#brandLdClass").val()){
			alert("대분류 업종을 선택해주세요");
			return;
		}
		if(!$("#brandMdClass").val()){
			alert("중분류 업종을 선택해주세요");
			return;
		}	
		if(!$("#brandFrcClass").val()){
			alert("프랜차이즈를 선택해주세요");
			return;
		}
		stepView(1);
		chartInit();
		getReviewNews();
	});
	
	$("#viewBrandBtnMob").click(function(){	
		if(!$("#brandLdClassMob").val() || !$("#brandMdClassMob").val()){
			alert("업종분류를 선택해주세요");
			return;
		}
		if(!$("#brandFrcClassMob").val()){
			alert("프랜차이즈를 선택해주세요");
			return;
		}
		$('#paramBrandFrc').val($('#brandFrcClassMob option:selected').val());
		$('#paramBrandFrcNm').val($('#brandFrcClassMob option:selected').text());
		$("#parambrandYear").val($("#brandYearMob option:selected").val());
		stepView(1);
		chartInit();
		getReviewNews();
	});
}
//브랜드대분류 변경
function fnChangeBrandLd(){
	$("#brandMdClass").empty();
	$("#brandMdClass").append('<option value="">- 중분류 -</option>');

	$("#brandFrcClass").html('');
	$("#brandFrcClass").append('<option value="">- 프랜차이즈 -</option>');
	
	var selectedVal = $('#brandLdClass:visible').val();
	$("#brandLdClass").val( selectedVal );
	fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
		////console.log("중분류",_data);
		_data.frnchsMlsfcList.forEach(function(row,idx){
			if( !~row.mlsfcIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
				$("#brandMdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
			}
		});
	});
}

//모바일 브랜드대분류 변경
function fnChangeBrandLdMob(){
	$("#brandMdClassMob").empty();
	$("#brandMdClassMob").append('<option value="">업종 중분류</option>');
	
	$("#brandFrcClassMob").html('');
	$("#brandFrcClassMob").append('<option value="">프랜차이즈명</option>');
	
	if(!$("#brandLdClassMob").val()){
		$("#brandMdClassMob").attr('disabled', 'disabled');
		$("#brandFrcClassMob").attr('disabled', 'disabled');
	}else{
		$("#brandMdClassMob").attr('disabled', false);
	}
	
	var selectedVal = $('#brandLdClassMob:visible').val();
	$("#brandLdClassMob").val( selectedVal );
	fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
		_data.frnchsMlsfcList.forEach(function(row,idx){
			if( !~row.mlsfcIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
				$("#brandMdClassMob").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
			}
		});
	});
}

var dataTemp;
function fn_createChart(_data, changeChartId){
//	$(".mTitle4").html(_data.frchsList[0].bsnSgnal+'<span class="ts">'+$("#brandYear").val()+"년 기준"+'</span>');
	$(".mTitle4").html(_data.frchsList[0].bsnSgnal+'<span class="ts" style="font-size:15px">'+"2023년  등록된 정보공개서 기반 데이터 입니다."+'</span>');//정보공개서 기준년도로 수정함
	if(_data.frchsList[0].atchmnflNo){
		/*$(".favorite").removeAttr("style");
		$(".share").removeAttr("style");
		$(".download").show();*/
		$(".download").unbind();
		$(".download").click(function(){
			if(confirm("이용자 책임하에 열람 : 본 파일은 가맹본부가 제출한 내용으로 심사없이 공개되는 것이며, 경기도는 어떠한 보증도 하지 않습니다.")){
				location.href = '/file/downloadFile.do?atchmnflNo='+_data.frchsList[0].atchmnflNo+'&fileSn=1&fileKey='+encodeURIComponent(_data.frchsList[0].fileKey);
			};
		});
//		$(".download").attr("href",'/file/downloadFile.do?atchmnflNo='+_data.frchsList[0].atchmnflNo+'&fileSn=1&fileKey='+encodeURIComponent(_data.frchsList[0].fileKey));
	}else{
		$(".download").unbind();
		$(".download").click(function(){
			if(confirm("이용자 책임하에 열람 : 본 파일은 가맹본부가 제출한 내용으로 심사없이 공개되는 것이며, 경기도는 어떠한 보증도 하지 않습니다.")){
				alert("첨부된 파일이 없습니다.");
			};
		});
		/*$(".download").hide();*/
	}
	//반복문으로 인한 차트호출 속도저하 개선
	//2022-01-03 염종찬	
	_data.frchsList.forEach(function(row,idx){
		for(var key in row){
			$("#c1_"+key).text(typeof row[key] == "number" ? gfnNumberWithCommas(row[key]): row[key]);
			$("#m1_"+key).text(typeof row[key] == "number" ? gfnNumberWithCommas(row[key]): row[key]);
			$("#m2_"+key).text(typeof row[key] == "number" ? gfnNumberWithCommas(row[key]): row[key]);
			
			if(key == 'prftblGrad' || key == 'fairGrad'|| key == 'growthGrad'|| key == 'safeGrad'){
				var color;
				var tmpHtml = [];
				var target = "."+key
				var grade = $(target);
				
				if(key == 'prftblGrad') color = '#d42363;';
				if(key == 'fairGrad') color = '#55ba50;';
				if(key == 'growthGrad') color = '#6f45b1;';
				if(key == 'safeGrad') color = '#f8a80f;';
				
				for(var i=0; i<5; i++){
					if( i < Number(row[key]) ){
						tmpHtml.push('<span style=background-color:' + color + '"></span>');
					}else{
						tmpHtml.push('<span></span>');
					}
				}
				grade.html(tmpHtml.join(""));
			};
			if(key == 'deleteAt' && row[key] == "N"){
				$(".favorite").addClass("selected");
				$(".iFavor").addClass("selected");
			};
		};
	});
	
	var options = {
			title: '',
			height: $(".chart").height() - 200,
			legend: { position: 'none' }
	
		};

	var options1 = {
			title: '평균매출액',
			width: $(".mGraph1").width(),
			height: $(".chart").height() - 200,
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
				position: 'none'
			},
			is3D: true
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
			position: 'none'
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
		height: $(".chart").height() - 200,
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
			position: 'none'
		},
		colors: '#ffb840',
		theme: 'material',
		bar: {groupWidth: '90%'}
	};
	
	var options4_1 = {
//				title: '평균매출액',
			width:$(".mGraph1").width(),
			height: $(".chart").height() - 200,
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
				position: 'none'
			},
//			colors: '#e0440e',
			colors: '#f28b8c',
			bars: 'horizontal', // Required for Material Bar Charts.
			theme: 'material',
			bar: {groupWidth: '90%'}
	};
	var options4_1_2 = {
//			title: '평균매출액',
		width:$(".mGraph1").width(),
		height: $(".chart").height() - 200,
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
			position: 'none'
		},
		colors: '#f28b8c',
//		colors: '#4285f4',
		bars: 'horizontal', // Required for Material Bar Charts.
		theme: 'material',
		bar: {groupWidth: '90%'}
};
	var options4_2 = {
//				title: '평균매출액',
			width:$(".mGraph1").width(),
			height: $(".chart").height() - 200,
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
				position: 'none'
			},
			colors: '#00bd9f',
			bars: 'horizontal', // Required for Material Bar Charts.
			theme: 'material',
			bar: {groupWidth: '90%'}
	};
	var options4_3 = {
			title: '평균매출액',
			width: $(".mGraph1").width(),
			height: $(".chart").height() - 200,
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
			colors: '#785fff',
			legend: {
				position: 'none'
			},
			is3D: true
		};
	var options4_4 = {
			title: '면적당 매출액',
			width: $(".mGraph1").width(),
			height: $(".chart").height() - 200,
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
			colors: '#785fff',
			legend: {
				position: 'none'
			},
			is3D: true
	};
	var options5 = {
//			title: '평균매출액',
		width: $(".mGraph1").width(),
		height: $(".chart").height() - 200,
		bar: {groupWidth: '90%'},
		theme: 'material',
		bars: 'horizontal',
		hAxis: {format: 'decimal'},
		legend: {
			position: 'none'
		},
		colors: '#ffb840'
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
		legend: { position: 'none' }
	};
	
	var mOptions = {
//			title: '',
			width: $("#chartAreaId").width(), 
			height: 200,
			legend: { position: 'none' },
			bar: {groupWidth: '80%'}
	};

	var mOptions1 = {
			width: $("#chartAreaId").width(), 
			height: 200,
			legend: { position: 'none' },
			bar: {groupWidth: '80%'},
			vAxis: {
			      minValue: 0,
			      viewWindow: { min: 0 },
			      format: '0'
			}, 
			hAxis: {textStyle: {fontSize: '5'}},
			colors : ['#785fff']
		};
	
	var mOptions2 = {
			width: $("#chartAreaId").width(), 
			height: 200,
			legend: { position: 'none' },
			bar: {groupWidth: '80%'},
			vAxis: {
			      minValue: 0,
			      viewWindow: { min: 0 },
			      format: '0'
			}, 
			hAxis: {textStyle: {fontSize: '5'}},
			colors : ['#785fff']
	};
	/*var mOptions2 = {
			width: $("#chartAreaId").width() + 200, 
			height: 200,
			legend: { position: 'none' },
			bar: {groupWidth: '80%'},
			vAxis: {
			      minValue: 0,
			      viewWindow: { min: 0 },
			      format: '0'
			}, 
			hAxis: {textPosition: 'out', slantedText: true, textStyle: {fontSize: '7', slantedTextAngle: 45}}
	};*/
	
	var mOptions3 = {
//			title: '',
			//width: chartData16.getNumberOfRows() * 100,
			//bar: {groupWidth: 70}
			bar: {groupWidth: '80%'}
		};

	var mOptions4 = {
			width: $("#chartAreaId").width(), 
			height: 200,
			legend: { position: 'none' },
			colors: ['#00bd9f'],
			bar: {groupWidth: '80%'}
	};
	var mOptions4_1 = {
			width: $("#chartAreaId").width(), 
			height: 200,
			legend: { position: 'none' },
			colors: ['#ffb840'],
			bar: {groupWidth: '80%'}
	};
	var mOptions4_2 = {
			width: $("#chartAreaId").width(), 
			height: 200,
			legend: { position: 'none' },
			colors: ['#f28b8c'],
			bar: {groupWidth: '80%'}
	};
	var mOptions4_3 = {
			width: $("#chartAreaId").width(), 
			height: 200,
			legend: { position: 'none' },
			colors: ['#f28b8c'],
			bar: {groupWidth: '80%'}
	};
	var mOptions5 = {
			width: $("#chartAreaId").width(), 
			height: 200,
			legend: { position: 'none' },
			bar: {groupWidth: '80%'},
			colors : ['#ffb840']
	};
	var mOptionsPie = {
		title: '',
		'width' : $(".mGraph1").width()/2,
		'height': $(".mGraph1").width()/3 > 210 ? 210 : $(".mGraph1").width()/3,
		animation:{
			startup: true,
			easing: 'inAndOut',
			duration: 5000
		},
		legend: { position: 'none' }
	};
	
	if(_data.yearList.length < 1){
		var data1 = [];
		data1.push(['',_data.frchsList[0].bsnSgnal]);
		data1.push([$("#brandYear option:selected").val() , 0]);
		$("#m_assets").text("0"+" 천원");
		
		var data2 = [];
		data2.push(['',_data.frchsList[0].bsnSgnal]);
		data2.push([$("#brandYear option:selected").val() , 0]);
		$("#m_debt").text("0"+" 천원");
		
		var data3 = [];
		data3.push(['',_data.frchsList[0].bsnSgnal]);
		data3.push([$("#brandYear option:selected").val() , 0]);
		$("#m_capl").text("0"+" 천원");
		
		var data4 = [];
		data4.push(['',_data.frchsList[0].bsnSgnal]);
		data4.push([$("#brandYear option:selected").val() , 0]);
		$("#m_selngAm").text("0"+" 천원");
		
		var data5 = [];
		data5.push(['',_data.frchsList[0].bsnSgnal]);
		data5.push([$("#brandYear option:selected").val() , 0]);
		$("#m_bsnProfit").text("0"+" 천원");
		
		var data6 = [];
		data6.push(['',_data.frchsList[0].bsnSgnal]);
		data6.push([$("#brandYear option:selected").val() , 0]);
		$("#m_thstrmNtpf").text("0"+" 천원");
		
		var data9 = [];
		data9.push(['',_data.frchsList[0].bsnSgnal]);
		data9.push([$("#brandYear option:selected").val() , 0]);
		$("#m_year_9").text("0"+"개");
		
		var data10 = [];
		data10.push(['',_data.frchsList[0].bsnSgnal]);
		data10.push([$("#brandYear option:selected").val() , 0]);
		$("#m_year_10").text("0"+"개");
		
		var data11 = [];
		data11.push(['',_data.frchsList[0].bsnSgnal]);
		data11.push([$("#brandYear option:selected").val() , 0]);
		$("#m_year_11").text("0"+"개");
		
		var data12 = [];
		data12.push(['',_data.frchsList[0].bsnSgnal]);
		data12.push([$("#brandYear option:selected").val() , 0]);
		$("#m_year_12").text("0"+"개");
		
		var data13 = [];
		data13.push(['',_data.frchsList[0].bsnSgnal]);
		data13.push([$("#brandYear option:selected").val() , 0]);
		$("#m_year_13").text("0"+"개");
		
		var data14 = [];
		data14.push(['',_data.frchsList[0].bsnSgnal]);
		data14.push([$("#brandYear option:selected").val() , 0]);
		$("#m_year_14").text("0"+"개");

		var data15 = [];
		data15.push(['',_data.frchsList[0].bsnSgnal]);
		data15.push(["전체" , 0]);
		$("#m_year_15").text("0"+"천원");
		
		var data16 = [];
		data16.push(['',_data.frchsList[0].bsnSgnal]);
		data16.push(["전체" , 0]);
		$("#m_year_16").text("0"+"천원");

		
		$("#staffCnt").html("0"); 
		$("#m_staffCnt").html("0");
	}else{
		var data1 = [];
		data1.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data1.push([_data.yearList[i].year , Number(_data.yearList[i].assets)]);
			if(i==_data.yearList.length-1){
				var txt = _data.yearList[i].assets;
				$("#m_assets").text(txt.toLocaleString('ko-KR')+" 천원");
			}
		}
		
		
		var data2 = [];
		data2.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data2.push([_data.yearList[i].year ,Number(_data.yearList[i].debt)]);
			if(i==_data.yearList.length-1){
				var txt = _data.yearList[i].debt;
				$("#m_debt").text(txt.toLocaleString('ko-KR')+" 천원");
			}
		}

		
		var data3 = [];
		data3.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data3.push([_data.yearList[i].year ,Number(_data.yearList[i].capl)]);
			if(i==_data.yearList.length-1){
				var txt = _data.yearList[i].capl;
				$("#m_capl").text(txt.toLocaleString('ko-KR')+" 천원");
			}
		}
		
		
		var data4 = [];
		data4.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data4.push([_data.yearList[i].year ,Number(_data.yearList[i].selngAm)]);
			if(i==_data.yearList.length-1){
				var txt = _data.yearList[i].selngAm;
				$("#m_selngAm").text(txt.toLocaleString('ko-KR')+" 천원");
			}
		}

		var data5 = [];
		data5.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data5.push([_data.yearList[i].year ,Number(_data.yearList[i].bsnProfit)]);
			if(i==_data.yearList.length-1){
				var txt = _data.yearList[i].bsnProfit;
				$("#m_bsnProfit").text(txt.toLocaleString('ko-KR')+" 천원");
			}
		}

		var data6 = [];
		data6.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data6.push([_data.yearList[i].year ,Number(_data.yearList[i].thstrmNtpf)]);
			if(i==_data.yearList.length-1){
				var txt = _data.yearList[i].thstrmNtpf;
				$("#m_thstrmNtpf").text(txt.toLocaleString('ko-KR')+" 천원");
			}
		}
		
//			var data7 = [];
//			data7.push(['','']);
//			data7.push(['임원수' ,Number(_data.yearList[_data.yearList.length-2].exctvCo) ]);
//			data7.push(['직원수' ,Number(_data.yearList[_data.yearList.length-2].empCo) ]);
	//
//			var data8 = [];
//			data8.push(['','']);
//			data8.push(['임원수' ,Number(_data.yearList[_data.yearList.length-1].exctvCo) ]);
//			data8.push(['직원수' ,Number(_data.yearList[_data.yearList.length-1].empCo) ]);

		var data9 = [];
		data9.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data9.push([_data.yearList[i].year ,Number(_data.yearList[i].mrhstCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_9").text(Number(_data.yearList[i].mrhstCo)+" 개");
			}
		}


		var data10 = [];
		data10.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data10.push([_data.yearList[i].year ,Number(_data.yearList[i].droperCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_10").text(Number(_data.yearList[i].droperCo)+" 개");
			}
		}
		var data11 = [];
		data11.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data11.push([_data.yearList[i].year ,Number(_data.yearList[i].newStorCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_11").text(Number(_data.yearList[i].newStorCo)+" 개");
			}
		}

		var data12 = [];
		data12.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data12.push([_data.yearList[i].year ,Number(_data.yearList[i].cntrctEndCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_12").text(Number(_data.yearList[i].cntrctEndCo)+" 개");
			}
		}

		var data13 = [];
		data13.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			data13.push([_data.yearList[i].year ,Number(_data.yearList[i].cntrctTrmnatCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_13").text(Number(_data.yearList[i].cntrctTrmnatCo)+" 개");
			}
		}

		var data14 = [];
		data14.push(['',_data.frchsList[0].bsnSgnal]);
		for( var i=0; i< _data.yearList.length; i++ ){
			//console.log(i+":"+_data.yearList.length);
			data14.push([_data.yearList[i].year ,Number(_data.yearList[i].nmChangeCo)]);
			if(i==_data.yearList.length-1){
				$("#m_year_14").text(Number(_data.yearList[i].nmChangeCo)+" 개");
			}
		}
		
		
		
//		var data15 = [];
//		var emptyData15 = 0;
//		data15.push(['',_data.frchsList[0].bsnSgnal]);
//	    var ctprvnNm = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
//		for( var y=0; y< _data.yearList.length; y++ ){
//			if(y==_data.yearList.length-1){
////				for( var i=0; i< _data.sidoList.length; i=i+2 ){
//				for( var i=0; i< 18; i++ ){
//					if(_data.yearList[y].year == _data.sidoList[i].year) {
//						if(_data.sidoList[i].ctprvnNm=="전체"){
//							$("#m_year_15").text(Number(Number(_data.sidoList[i].avrgSelngAm))+" 천원");
//						}
//						data15.push([fn_ctprvnNmLower(_data.sidoList[i].ctprvnNm) ,Number(_data.sidoList[i].avrgSelngAm),]);
//						if(!_data.sidoList[i].avrgSelngAm) emptyData15++;
//					}
//				}
//			}
//		}

		var data15 = [];
		var emptyData15 = 0;
		data15.push(['',_data.frchsList[0].bsnSgnal]);
		for( var y=0; y< _data.yearList.length; y++ ){
			if(y==_data.yearList.length-1){
				var emptyCount = 0;
				for( var i=0; i< _data.sidoList.length; i++ ){
					if(_data.yearList[y].year == _data.sidoList[i].year) emptyCount++;
				}
				if(emptyCount > 0){
					for( var i=0; i< _data.sidoList.length; i++ ){
						if(_data.yearList[y].year == _data.sidoList[i].year) {
							if(_data.sidoList[i].ctprvnNm=="전체"){
								$("#m_year_15").text(Number(Number(_data.sidoList[i].avrgSelngAm)).toLocaleString('ko-KR')+" 천원");
							}
							data15.push([fn_ctprvnNmLower(_data.sidoList[i].ctprvnNm) ,Number(_data.sidoList[i].avrgSelngAm)]);
							if(!_data.sidoList[i].avrgSelngAm ) emptyData15++;
						}
					}
					if(emptyData15 == 18){	
						setTimeout(function() {							
							$("#m_sido_chart15").empty();
							$("#m_sido_chart15").attr("style", "height: 100px;text-align: center;");
							$("#m_sido_chart15").html("<p class='empty'>데이터가 없습니다.</p>");
							$("#span_15").text("");
						}, 300);
					}
				}else{
					/*var ctprvnNm = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
					for(var n = 0; n<ctprvnNm.length; n++){
						$("#m_year_15").text("0 천원");
						data15.push([fn_ctprvnNmLower(ctprvnNm[n]), Number('0')]);
					}*/
					$("#m_year_15").text("0 천원");
					setTimeout(function () {							
						$("#m_sido_chart15").empty();
						$("#m_sido_chart15").attr("style", "height: 100px;text-align: center;");
						$("#m_sido_chart15").html("<p class='empty'>데이터가 없습니다.</p>");
						$("#span_15").text("");
					}, 300);
				}
			}
		}
 
		var data16 = [];
		var emptyData16 = 0;
		data16.push(['',_data.frchsList[0].bsnSgnal]);
		for( var y=0; y< _data.yearList.length; y++ ){
			if(y==_data.yearList.length-1){
				var emptyCount = 0;
				for( var i=0; i< _data.sidoList.length; i++ ){
					if(_data.yearList[y].year == _data.sidoList[i].year) emptyCount++;
				}
				if(emptyCount > 0){
					for( var i=0; i< _data.sidoList.length; i++ ){
						if(_data.yearList[y].year == _data.sidoList[i].year) {
							if(_data.sidoList[i].ctprvnNm=="전체"){
								$("#m_year_16").text(Number(Number(_data.sidoList[i].unitArAvrgSelngAm)).toLocaleString('ko-KR')+" 천원");
							}
							data16.push([fn_ctprvnNmLower(_data.sidoList[i].ctprvnNm) ,Number(_data.sidoList[i].unitArAvrgSelngAm)]);
							console.log(_data.sidoList[i].unitArAvrgSelngAm);
							if(!_data.sidoList[i].unitArAvrgSelngAm ) emptyData16++;
						}
					}
					if(emptyData16 == 18){	
						setTimeout(function () {		
							$("#m_sido_chart16").empty();
							$("#m_sido_chart16").attr("style", "height: 100px;text-align: center;");
							$("#m_sido_chart16").html("<p class='empty'>데이터가 없습니다.</p>");
							$("#span_16").text("");
						}, 300);
					}
				}else{
					/*var ctprvnNm = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
					for(var n = 0; n<ctprvnNm.length; n++){
						$("#m_year_16").text("0 천원");
						data16.push([fn_ctprvnNmLower(ctprvnNm[n]), Number('0')]);
					}*/
					$("#m_year_16").text("0 천원");
					setTimeout(function () {	
						$("#m_sido_chart16").empty();
						$("#m_sido_chart16").attr("style", "height: 100px;text-align: center;");
						$("#m_sido_chart16").html("<p class='empty'>데이터가 없습니다.</p>");
						$("#span_16").text("");
					}, 300);
				}
			}
		}
		
		/*var data16 = [];
		var emptyData16 = 0;
		data16.push(['',_data.frchsList[0].bsnSgnal]);
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
		}*/
		
		$("#staffCnt").html(Number(_data.yearList[_data.yearList.length-1].exctvCo)+Number(_data.yearList[_data.yearList.length-1].empCo)); 
		$("#m_staffCnt").html(Number(_data.yearList[_data.yearList.length-1].exctvCo)+Number(_data.yearList[_data.yearList.length-1].empCo));
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
	var mchart4 = new google.visualization.ColumnChart(document.getElementById('m_year_chart4'));
	var chart5 = new google.charts.Bar(document.getElementById('year_chart5'));
	var mchart5 = new google.visualization.ColumnChart(document.getElementById('m_year_chart5'));
	var chart6 = new google.charts.Bar(document.getElementById('year_chart6'));
	var mchart6 = new google.visualization.ColumnChart(document.getElementById('m_year_chart6'));
	/*var chart4 = new google.charts.Bar(document.getElementById('year_chart4'));
	var mchart4 = new google.charts.Bar(document.getElementById('m_year_chart4'));
	var chart5 = new google.charts.Bar(document.getElementById('year_chart5'));
	var mchart5 = new google.charts.Bar(document.getElementById('m_year_chart5'));
	var chart6 = new google.charts.Bar(document.getElementById('year_chart6'));
	var mchart6 = new google.charts.Bar(document.getElementById('m_year_chart6'));*/
//		var chart7 = new google.visualization.PieChart(document.getElementById('pie_chart7'));
//		var chart8 = new google.visualization.PieChart(document.getElementById('pie_chart8'));
	var chart9 = new google.charts.Bar(document.getElementById('year_chart9'));
	var mchart9 = new google.visualization.ColumnChart(document.getElementById('m_year_chart9'));
	/*var mchart9 = new google.charts.Bar(document.getElementById('m_year_chart9'));*/
	var chart10 = new google.charts.Bar(document.getElementById('year_chart10'));
	var mchart10 = new google.visualization.ColumnChart(document.getElementById('m_year_chart10'));
	/*var mchart10 = new google.charts.Bar(document.getElementById('m_year_chart10'));*/
	var chart11 = new google.charts.Bar(document.getElementById('year_chart11'));
	var mchart11 = new google.visualization.ColumnChart(document.getElementById('m_year_chart11'));
	/*var mchart11 = new google.charts.Bar(document.getElementById('m_year_chart11'));*/
	var chart12 = new google.charts.Bar(document.getElementById('year_chart12'));
	var mchart12 = new google.visualization.ColumnChart(document.getElementById('m_year_chart12'));
	/*var mchart12 = new google.charts.Bar(document.getElementById('m_year_chart12'));*/
	var chart13 = new google.charts.Bar(document.getElementById('year_chart13'));
	var mchart13 = new google.visualization.ColumnChart(document.getElementById('m_year_chart13'));
	/*var mchart13 = new google.charts.Bar(document.getElementById('m_year_chart13'));*/
	var chart14 = new google.charts.Bar(document.getElementById('year_chart14'));
	var mchart14 = new  google.visualization.ColumnChart(document.getElementById('m_year_chart14'));
	/*var mchart14 = new google.charts.Bar(document.getElementById('m_year_chart14'));*/
	var chart15 = new google.charts.Bar(document.getElementById('sido_chart15'));
	var mchart15 = new google.visualization.ColumnChart(document.getElementById('m_sido_chart15'));
	/*var mchart15 = new google.charts.Bar(document.getElementById('m_sido_chart15'));*/
	var chart16 = new google.charts.Bar(document.getElementById('sido_chart16'));
	var mchart16 = new google.visualization.ColumnChart(document.getElementById('m_sido_chart16'));
	/*var mchart16 = new google.charts.Bar(document.getElementById('m_sido_chart16'));*/

	/*웹*/	
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart1") {
		chart1.draw(chartData1, options);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart2") {
		chart2.draw(chartData2, options);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart3") {
		chart3.draw(chartData3, options);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart4") {
		chart4.draw(chartData4, google.charts.Bar.convertOptions(options4));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart5") {
		chart5.draw(chartData5, google.charts.Bar.convertOptions(options5));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart6") {
		chart6.draw(chartData6, google.charts.Bar.convertOptions(options5));
	}
	
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart9") {
		chart9.draw(chartData9, google.charts.Bar.convertOptions(options4_1_2));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart10") {
		chart10.draw(chartData10, google.charts.Bar.convertOptions(options4_1));
	}
	
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart11") {
		chart11.draw(chartData11, google.charts.Bar.convertOptions(options4_2));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart12") {
		chart12.draw(chartData12, google.charts.Bar.convertOptions(options4_2));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart13") {
		chart13.draw(chartData13, google.charts.Bar.convertOptions(options4_2));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart14") {
		chart14.draw(chartData14, google.charts.Bar.convertOptions(options4_2));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart15") {
		chart15.draw(chartData15, google.charts.Bar.convertOptions(options4_3));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart16") {
		chart16.draw(chartData16, google.charts.Bar.convertOptions(options4_4));
	}

	/*모바일*/
	/*mchart1.draw(chartData1, options);
	mchart2.draw(chartData2, options);
	mchart3.draw(chartData3, options);
	mchart4.draw(chartData4, google.charts.Bar.convertOptions(options4));
	mchart5.draw(chartData5, google.charts.Bar.convertOptions(options5));
	mchart6.draw(chartData6, google.charts.Bar.convertOptions(options5));
	mchart9.draw(chartData9, google.charts.Bar.convertOptions(options4));
	mchart10.draw(chartData10, google.charts.Bar.convertOptions(options4));
	mchart11.draw(chartData11, google.charts.Bar.convertOptions(options4));
	mchart12.draw(chartData12, google.charts.Bar.convertOptions(options4));
	mchart13.draw(chartData13, google.charts.Bar.convertOptions(options4));
	mchart14.draw(chartData14, google.charts.Bar.convertOptions(options4));
	mchart15.draw(chartData15, google.charts.Bar.convertOptions(options1));
	mchart16.draw(chartData16, google.charts.Bar.convertOptions(options2));*/
	
	mchart1.draw(chartData1, mOptions);
	mchart2.draw(chartData2, mOptions);
	mchart3.draw(chartData3, mOptions);
	mchart4.draw(chartData4, mOptions4_1);
	mchart5.draw(chartData5, mOptions5);
	mchart6.draw(chartData6, mOptions5);
	mchart9.draw(chartData9, mOptions4_2);
	mchart10.draw(chartData10, mOptions4_3);
	mchart11.draw(chartData11, mOptions4);
	mchart12.draw(chartData12, mOptions4);
	mchart13.draw(chartData13, mOptions4);
	mchart14.draw(chartData14, mOptions4);
	mchart15.draw(chartData15, mOptions1);
	mchart16.draw(chartData16, mOptions2);

	/*if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart1") {
		mchart1.draw(chartData1, mOptions);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart2") {
		mchart2.draw(chartData2, mOptions);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart3") {
		mchart3.draw(chartData3, mOptions);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart4") {
		mchart4.draw(chartData4, google.charts.Bar.convertOptions(mOptions4));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart5") {
		mchart5.draw(chartData5, google.charts.Bar.convertOptions(mOptions5));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart6") {
		mchart6.draw(chartData6, google.charts.Bar.convertOptions(mOptions5));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart9") {
		mchart9.draw(chartData9, google.charts.Bar.convertOptions(mOptions4));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart10") {
		mchart10.draw(chartData10, google.charts.Bar.convertOptions(mOptions4));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart11") {
		mchart11.draw(chartData11, google.charts.Bar.convertOptions(mOptions4));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart12") {
		mchart12.draw(chartData12, google.charts.Bar.convertOptions(mOptions4));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart13") {
		mchart13.draw(chartData13, google.charts.Bar.convertOptions(mOptions4));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart14") {
		mchart14.draw(chartData14, google.charts.Bar.convertOptions(mOptions4));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart15") {
		mchart15.draw(chartData15, google.charts.Bar.convertOptions(mOptions1));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "mchart16") {
		mchart16.draw(chartData16, google.charts.Bar.convertOptions(mOptions2));
	}*/
	
	
	
	/* 속도 개선으로 인한 수정 */
	/* 2022-01-03 염종찬 */
//	chart1.draw(chartData1, options);
//	mchart1.draw(chartData1, options);
//	chart2.draw(chartData2, options);
//	mchart2.draw(chartData2, options);
//	chart3.draw(chartData3, options);
//	mchart3.draw(chartData3, options);
//	chart4.draw(chartData4, google.charts.Bar.convertOptions(options4));
//	chart5.draw(chartData5, google.charts.Bar.convertOptions(options5));
//	chart6.draw(chartData6, google.charts.Bar.convertOptions(options5));
//	
//	mchart4.draw(chartData4, google.charts.Bar.convertOptions(options4));
//	mchart5.draw(chartData5, google.charts.Bar.convertOptions(options5));
//	mchart6.draw(chartData6, google.charts.Bar.convertOptions(options5));
//	
////		chart7.draw(chartData7, optionsPie);
////		chart8.draw(chartData8, optionsPie);
//	chart9.draw(chartData9, google.charts.Bar.convertOptions(options4));
//	mchart9.draw(chartData9, google.charts.Bar.convertOptions(options4));
//	chart10.draw(chartData10, google.charts.Bar.convertOptions(options4));
//	mchart10.draw(chartData10, google.charts.Bar.convertOptions(options4));
//	chart11.draw(chartData11, google.charts.Bar.convertOptions(options4));
//	mchart11.draw(chartData11, google.charts.Bar.convertOptions(options4));
//	chart12.draw(chartData12, google.charts.Bar.convertOptions(options4));
//	mchart12.draw(chartData12, google.charts.Bar.convertOptions(options4));
//	chart13.draw(chartData13, google.charts.Bar.convertOptions(options4));
//	mchart13.draw(chartData13, google.charts.Bar.convertOptions(options4));
//	chart14.draw(chartData14, google.charts.Bar.convertOptions(options4));
//	mchart14.draw(chartData14, google.charts.Bar.convertOptions(options4));
//	chart15.draw(chartData15, google.charts.Bar.convertOptions(options1));
//	mchart15.draw(chartData15, google.charts.Bar.convertOptions(options1));
//	chart16.draw(chartData16, google.charts.Bar.convertOptions(options2));
//	mchart16.draw(chartData16, google.charts.Bar.convertOptions(options2));
	
}

function getReviewNews(){
	fnGetAjaxData("/fran/selectNewsReview.ajax", {param3:$("#paramfrnchsNo").val()}, function(_data) {
		var tmpHtml = [];

		var review1 = JSON.parse(_data.blog1);
		var news1 = JSON.parse(_data.news1);

		try{
			review1.items.forEach(function(row,idx){
				tmpHtml.push('<a target="_blank" href="'+row.link+'" class="ul">'+row.title+'</a><br>');
				tmpHtml.push(row.description);
				tmpHtml.push('<br><br>');
			});
			$(".review1").html( tmpHtml.join("") );

			tmpHtml = [];
			news1.items.forEach(function(row,idx){
				tmpHtml.push('<a target="_blank" href="'+row.link+'" class="ul">'+row.title+'</a><br>');
				tmpHtml.push(row.description);
				tmpHtml.push('<br><br>');
			});
			$(".news1").html( tmpHtml.join("") );

			tmpHtml = [];
			
			if(review1.items.length == 0){
				$(".review1").append("<div style='text-align:center'>등록된 브랜드 리뷰가 없습니다.</div>");
			}

			if(news1.items.length == 0){
				$(".news1").append("<div style='text-align:center'>등록된 브랜드 뉴스가 없습니다.</div>");
			}
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

	return ctprvnNm;
}