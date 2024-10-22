google.charts.load('current', {'packages':['corechart','bar'],'callback':drawChart});

var globalCompareObj = {};
globalCompareObj = opener.sendCompareObj();
if( !globalCompareObj.frnchsNo1 && !globalCompareObj.frnchsNo2 ){
	alert('비정상접근입니다.');
	window.close();
}

var globalNewsObj = {};
globalNewsObj = opener.sendNewsObj();
if( !globalNewsObj.param1 && !globalNewsObj.param2 ){
	alert('비정상접근입니다.');
	window.close();
}
var yearFinal = 0;
var densityObj = {};

function sendParam(){

	densityObj.year = yearFinal;

	return densityObj;

}

//선택 조건 리스트 condition_list 요기 구성하기
function appendHtml(str){

	var tmpHtml = [];
	tmpHtml.push('<span class="ls">');
	tmpHtml.push('	<a href="javascript:void(0)" class="ul">'+str+'</a>');
	tmpHtml.push('	<a href="javascript:void(0)" class="iDel">삭제</a>');
	tmpHtml.push('</span>');

	$(".condition_list .mAttach1").append( tmpHtml.join("") );
}


function mkConditionList(){

	$(".condition_list .mAttach1").html('');

	//selectbox
	appendHtml("대분류 업종 > " + $(".ldClass option:selected").text());

	appendHtml("중분류 업종 > " + $(".mdClass option:selected").text());

	//a tag
	appendHtml( "가맹점사업자의 부담금 > " +$(".levy .selected").text() );
	appendHtml( "인테리어 비용 > " +$(".inte .selected").text() );

	//chkbox
	var sidoStr = "";
	$("input[name='sidoChk']:checked").each(function(idx,row){
		sidoStr += $(this).attr("title") + ", ";
	});
	sidoStr = sidoStr.substr(0,sidoStr.length-2);
	appendHtml("창업희망지역 > " + sidoStr );

	//selectbox
	appendHtml("폐업률 > " + $(".cls_rate option:selected").text());
	appendHtml("본사업력 > " + $(".biz_year option:selected").text());
	appendHtml("본사부채비율 > " + $(".debt_ratio option:selected").text());
	appendHtml("면적(3.3㎡)당 평균매출액 > " + $(".avg_sale option:selected").text());

	$(".condition_list .mAttach1").append(' <a href="javascript:void(0)" class="btnRelease">전체해제</a> ');

	//개별조건 없애기
	$(".iDel").off("click").on("click",function(e){
		e.preventDefault();

		$(this).parent().remove();
	});

	//전체조건 없애기
	$(".btnRelease").off("click").on("click",function(e){
		e.preventDefault();

		$(this).parent().html('');
	});


}


function getReviewNews(){
	fnGetAjaxData("/fran/selectNewsReview.ajax", globalNewsObj, function(_data) {

		/*console.log("뉴스",_data);*/

//		console.log("1번 뉴스", JSON.parse(_data.news1) );
//		console.log("2번 뉴스", JSON.parse(_data.news2) );
//
//		console.log("1번 블로그", JSON.parse(_data.blog1) );
//		console.log("2번 블로그", JSON.parse(_data.blog2) );

		var tmpHtml = [];
		
		var review1;
		var review2;
		var news1;
		var news2;

		if( globalNewsObj.param3 > globalNewsObj.param4 ){
			review1 = JSON.parse(_data.blog2);
			review2 = JSON.parse(_data.blog1);
			news1 = JSON.parse(_data.news2);
			news2 = JSON.parse(_data.news1);
		}else{
			review1 = JSON.parse(_data.blog1);
			review2 = JSON.parse(_data.blog2);
			news1 = JSON.parse(_data.news1);
			news2 = JSON.parse(_data.news2);
		}

		try{

			review1.items.forEach(function(row,idx){
				tmpHtml.push('<a target="_blank" href="'+row.link+'" class="ul">'+row.title+'</a><br>');
				tmpHtml.push(row.description);
				tmpHtml.push('<br><br>');
			});
			$(".review1").html( tmpHtml.join("") );

			tmpHtml = [];
			review2.items.forEach(function(row,idx){
				tmpHtml.push('<a target="_blank" href="'+row.link+'" class="ul">'+row.title+'</a><br>');
				tmpHtml.push(row.description);
				tmpHtml.push('<br><br>');
			});
			$(".review2").html( tmpHtml.join("") );

			tmpHtml = [];
			news1.items.forEach(function(row,idx){
				tmpHtml.push('<a target="_blank" href="'+row.link+'" class="ul">'+row.title+'</a><br>');
				tmpHtml.push(row.description);
				tmpHtml.push('<br><br>');
			});
			$(".news1").html( tmpHtml.join("") );

			tmpHtml = [];
			news2.items.forEach(function(row,idx){
				tmpHtml.push('<a target="_blank" href="'+row.link+'" class="ul">'+row.title+'</a><br>');
				tmpHtml.push(row.description);
				tmpHtml.push('<br><br>');
			});
			$(".news2").html( tmpHtml.join("") );
		}catch(e){

			console.log("뉴스,블로그 데이터에 문제가 있습니다.");

		}




	});
}

var dataTemp;
function drawChart(){
	//2. 대분류 중분류 세팅
	$(".test .datalist_toggle").each(function(row,idx){ $(this).find("dt").trigger('click');});
	fnGetAjaxData("/fran/selectBrandCompare.ajax", globalCompareObj, function(_data) {
		fn_createChart(_data, '');
		$(".test .datalist_toggle").each(function(row,idx){ $(this).find("dt").trigger('click');});
	});
}

function fn_createChart(_data, changeChartId) {
	dataTemp = _data;
	/*console.log("프랜차이즈 비교..",_data);*/
	/*console.log($(".mGraph1").width()+":"+$(".mGraph1").height());*/
	//기본정보
//	console.log(_data.yearList);
	_data.frchsList.forEach(function(row,idx){
		if( idx == 0 ){
			for(var key in row){
				$(".c1_"+key).text(typeof row[key] == "number" ? gfnNumberWithCommas(row[key]): row[key]);
				$("#downloadC1").show();
			}
		}else{
			for(var key in row){
				$(".c2_"+key).text(typeof row[key] == "number" ? gfnNumberWithCommas(row[key]): row[key]);
				$("#downloadC2").show();
			}
		}
		
		
		$(".c"+Number(idx+1)+"_bsnSgnal").next("a").attr("id",row.frnchsNo);
		if( row.deleteAt == "N"){
			$(".c"+Number(idx+1)+"_bsnSgnal").next("a").addClass("selected");
		}

	});
	for(var i=0; i<5; i++){
		if( i < Number($("#prftblMob1").text()) ){
			$(".prftblMob1").append('<span style="background-color:#d42363;"></span>');
		}else{
			$(".prftblMob1").append('<span></span>');
		}
		if( i < Number($("#fairMob1").text()) ){
			$(".fairMob1").append('<span style="background-color:#43c0a2;"></span>');
		}else{
			$(".fairMob1").append('<span></span>');
		}
		if( i < Number($("#growthMob1").text()) ){
			$(".growthMob1").append('<span style="background-color:#6f45b1;"></span>');
		}else{
			$(".growthMob1").append('<span></span>');
		}
		if( i < Number($("#safeMob1").text()) ){
			$(".safeMob1").append('<span style="background-color:#f8a80f;"></span>');
		}else{
			$(".safeMob1").append('<span></span>');
		}
	}
	for(var i=0; i<5; i++){
		if( i < Number($("#prftblMob2").text()) ){
			$(".prftblMob2").append('<span style="background-color:#d42363;"></span>');
		}else{
			$(".prftblMob2").append('<span></span>');
		}
		if( i < Number($("#fairMob2").text()) ){
			$(".fairMob2").append('<span style="background-color:#43c0a2;"></span>');
		}else{
			$(".fairMob2").append('<span></span>');
		}
		if( i < Number($("#growthMob2").text()) ){
			$(".growthMob2").append('<span style="background-color:#6f45b1;"></span>');
		}else{
			$(".growthMob2").append('<span></span>');
		}
		if( i < Number($("#safeMob2").text()) ){
			$(".safeMob2").append('<span style="background-color:#f8a80f;"></span>');
		}else{
			$(".safeMob2").append('<span></span>');
		}
	}

	if( _data.yearList.length % 2 != 0 ){
		_data.yearList.pop();//데이터 어거지로 짝수 맞추기
	}

	//11개의 차트를 그려야한다.........................
	//1. 자산 assets
	//2. 부채 debt
	//3. 자본 capl
	//4. 매출액 selng_am
	//5. 영업이익 bsn_profit
	//6. 당기순이익 thstrm_ntpf
	//7,8. 가맹사업임직원 수 EXCTV_CO 임원, EMP_CO 직원
	//9. 가맹점수 MRHST_CO
	//10. 직영점수 DROPER_CO
	//11. 신규개점 new_stor_co
	//12. 계약종료 cntrct_end_co
	//13. 계약해지 cntrct_trmnat_co
	//14. 명의변경 nm_change_co
	//15. 평균매출액, 면적당 매출액 지역별 avrg_selng_am, unit_ar_avrg_selng_am
	
	if(_data.yearList.length == 0){
		$("#year_chart1").text("비교할 데이터가 없습니다");
		$("#year_chart1").parent().css("display", "inline-block");
		$("#year_chart1").parent().css("vertical-align", "middle");
		$("#year_chart1Mob").text("비교할 데이터가 없습니다");
		$("#year_chart2").text("비교할 데이터가 없습니다");
		$("#year_chart2").parent().css("display", "inline-block");
		$("#year_chart2").parent().css("vertical-align", "middle");
		$("#year_chart2Mob").text("비교할 데이터가 없습니다");
		$("#year_chart3").text("비교할 데이터가 없습니다");
		$("#year_chart3").parent().css("display", "inline-block");
		$("#year_chart3").parent().css("vertical-align", "middle");
		$("#year_chart3Mob").text("비교할 데이터가 없습니다");
		$("#year_chart4").text("비교할 데이터가 없습니다");
		$("#year_chart4").parent().css("display", "inline-block");
		$("#year_chart4").parent().css("vertical-align", "middle");
		$("#year_chart4Mob").text("비교할 데이터가 없습니다");
		$("#year_chart5").text("비교할 데이터가 없습니다");
		$("#year_chart5").parent().css("display", "inline-block");
		$("#year_chart5").parent().css("vertical-align", "middle");
		$("#year_chart5Mob").text("비교할 데이터가 없습니다");
		$("#year_chart6").text("비교할 데이터가 없습니다");
		$("#year_chart6").parent().css("display", "inline-block");
		$("#year_chart6").parent().css("vertical-align", "middle");
		$("#year_chart6Mob").text("비교할 데이터가 없습니다");
		$("#pie_chart7").text("비교할 데이터가 없습니다");
		$("#pie_chart7").parent().css("display", "inline-block");
		$("#pie_chart7").parent().css("vertical-align", "middle");
		$("#pie_chart7Mob").text("비교할 데이터가 없습니다");
		$("#pie_chart8").text("비교할 데이터가 없습니다");
		$("#pie_chart8").parent().css("display", "inline-block");
		$("#pie_chart8").parent().css("vertical-align", "middle");
		$("#pie_chart8Mob").text("비교할 데이터가 없습니다");
		$("#year_chart9").text("비교할 데이터가 없습니다");
		$("#year_chart9").parent().css("display", "inline-block");
		$("#year_chart9").parent().css("vertical-align", "middle");
		$("#year_chart9Mob").text("비교할 데이터가 없습니다");
		$("#year_chart10").text("비교할 데이터가 없습니다");
		$("#year_chart10").parent().css("display", "inline-block");
		$("#year_chart10").parent().css("vertical-align", "middle");
		$("#year_chart10Mob").text("비교할 데이터가 없습니다");
		$("#year_chart11").text("비교할 데이터가 없습니다");
		$("#year_chart11").parent().css("display", "inline-block");
		$("#year_chart11").parent().css("vertical-align", "middle");
		$("#year_chart11Mob").text("비교할 데이터가 없습니다");
		$("#year_chart12").text("비교할 데이터가 없습니다");
		$("#year_chart12").parent().css("display", "inline-block");
		$("#year_chart12").parent().css("vertical-align", "middle");
		$("#year_chart12Mob").text("비교할 데이터가 없습니다");
		$("#year_chart13").text("비교할 데이터가 없습니다");
		$("#year_chart13").parent().css("display", "inline-block");
		$("#year_chart13").parent().css("vertical-align", "middle");
		$("#year_chart13Mob").text("비교할 데이터가 없습니다");
		$("#year_chart14").text("비교할 데이터가 없습니다");
		$("#year_chart14").parent().css("display", "inline-block");
		$("#year_chart14").parent().css("vertical-align", "middle");
		$("#year_chart14Mob").text("비교할 데이터가 없습니다");
		$("#sido_chart15").text("비교할 데이터가 없습니다");
		$("#sido_chart15").parent().css("display", "inline-block");
		$("#sido_chart15").parent().css("vertical-align", "middle");
		$("#sido_chart15Mob").text("비교할 데이터가 없습니다");
		$("#sido_chart16").text("비교할 데이터가 없습니다");
		$("#sido_chart16").parent().css("display", "inline-block");
		$("#sido_chart16").parent().css("vertical-align", "middle");
		$("#sido_chart16Mob").text("비교할 데이터가 없습니다");
		return;
	}
	
	var data1 = [];
	data1.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data1.push([_data.yearList[i].year , Number(_data.yearList[i].assets) ,Number(_data.yearList[i+1].assets) || 0]);
	}

	var data2 = [];
	data2.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data2.push([_data.yearList[i].year ,Number(_data.yearList[i].debt),Number(_data.yearList[i+1].debt)]);
	}

	var data3 = [];
	data3.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data3.push([_data.yearList[i].year ,Number(_data.yearList[i].capl),Number(_data.yearList[i+1].capl)]);
	}

	var data4 = [];
	data4.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data4.push([_data.yearList[i].year ,Number(_data.yearList[i].selngAm),Number(_data.yearList[i+1].selngAm)]);
	}

	var data5 = [];
	data5.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data5.push([_data.yearList[i].year ,Number(_data.yearList[i].bsnProfit),Number(_data.yearList[i+1].bsnProfit)]);
	}

	var data6 = [];
	data6.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data6.push([_data.yearList[i].year ,Number(_data.yearList[i].thstrmNtpf),Number(_data.yearList[i+1].thstrmNtpf)]);
	}

	var data7 = [];
	data7.push(['','']);
	data7.push(['임원수' ,Number(_data.yearList[_data.yearList.length-2].exctvCo) ]);
	data7.push(['직원수' ,Number(_data.yearList[_data.yearList.length-2].empCo) ]);

	var data8 = [];
	data8.push(['','']);
	data8.push(['임원수' ,Number(_data.yearList[_data.yearList.length-1].exctvCo) ]);
	data8.push(['직원수' ,Number(_data.yearList[_data.yearList.length-1].empCo) ]);

	var data9 = [];
//	data9.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
//	for( var i=0; i< _data.yearList.length; i=i+2 ){
//		data9.push([_data.yearList[i].year ,Number(_data.yearList[i].mrhstCo),Number(_data.yearList[i+1].mrhstCo)]);
//	}
	data9.push(['','']);
	data9.push([_data.yearList[0].bsnSgnal,Number(_data.yearList[_data.yearList.length -2].mrhstCo)]);
	data9.push([_data.yearList[1].bsnSgnal,Number(_data.yearList[_data.yearList.length -1].mrhstCo)]);

	var data10 = [];
//	data10.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
//	for( var i=0; i< _data.yearList.length; i=i+2 ){
//		data10.push([_data.yearList[i].year ,Number(_data.yearList[i].droperCo),Number(_data.yearList[i+1].droperCo)]);
//	}
	data10.push(['','']);
	data10.push([_data.yearList[0].bsnSgnal,Number(_data.yearList[_data.yearList.length -2].droperCo)]);
	data10.push([_data.yearList[1].bsnSgnal,Number(_data.yearList[_data.yearList.length -1].droperCo)]);

	var data11 = [];
	data11.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data11.push([_data.yearList[i].year ,Number(_data.yearList[i].newStorCo),Number(_data.yearList[i+1].newStorCo)]);
	}

	var data12 = [];
	data12.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data12.push([_data.yearList[i].year ,Number(_data.yearList[i].cntrctEndCo),Number(_data.yearList[i+1].cntrctEndCo)]);
	}

	var data13 = [];
	data13.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		data13.push([_data.yearList[i].year ,Number(_data.yearList[i].cntrctTrmnatCo),Number(_data.yearList[i+1].cntrctTrmnatCo)]);
	}

	var data14 = [];
	data14.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		/*console.log(i+":"+_data.yearList.length);*/
		data14.push([_data.yearList[i].year ,Number(_data.yearList[i].nmChangeCo),Number(_data.yearList[i+1].nmChangeCo)]);
	}
	/*
	// 마지막 년도만 차트에 담는다
	var newData1 = [];
	var newData2 = [];
	for( var i=0; i< _data.yearList.length; i=i+2 ){
		if((i+2) == _data.yearList.length) {
			newData1.push([_data.yearList[i].year,'']);
			newData2.push([_data.yearList[i].year,'']);
			if(!!_data.yearList[i].newStorCo) newData1.push(["신규개점 ", Number(_data.yearList[i].newStorCo)]);
			if(!!_data.yearList[i+1].newStorCo) newData2.push(["신규개점 ", Number(_data.yearList[i+1].newStorCo)]);
			if(!!_data.yearList[i].cntrctEndCo) newData1.push(["계약종료 ", Number(_data.yearList[i].cntrctEndCo)]);
			if(!!_data.yearList[i+1].cntrctEndCo) newData2.push(["계약종료 ", Number(_data.yearList[i+1].cntrctEndCo)]);
			if(!!_data.yearList[i].cntrctTrmnatCo) newData1.push(["계약해지 ", Number(_data.yearList[i].cntrctTrmnatCo)]);
			if(!!_data.yearList[i+1].cntrctTrmnatCo) newData2.push(["계약해지 ", Number(_data.yearList[i+1].cntrctTrmnatCo)]);
			if(!!_data.yearList[i].nmChangeCo) newData1.push(["계약명의변경 ", Number(_data.yearList[i].nmChangeCo)]);
			if(!!_data.yearList[i+1].nmChangeCo) newData2.push(["계약명의변경 ", Number(_data.yearList[i+1].nmChangeCo)]);
		}
	}
	*/

	var data15 = [];
	var emptyData15 = 0;
	data15.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	// 마지막년도만 - 21.03.16
	for( var y=0; y< _data.yearList.length; y=y+2 ){
		if((y+2) == _data.yearList.length) {
			for( var i=0; i< _data.sidoList.length; i=i+2 ){
				if(_data.yearList[y].year == _data.sidoList[i].year) {
					data15.push([fn_ctprvnNmLower(_data.sidoList[i].ctprvnNm) ,Number(_data.sidoList[i].avrgSelngAm),Number(_data.sidoList[i+1].avrgSelngAm)]);
					if(!_data.sidoList[i].avrgSelngAm && !_data.sidoList[i+1].avrgSelngAm) emptyData15++;
				}
			}
		}
	}

	var data16 = [];
	var emptyData16 = 0;
	data16.push(['',_data.yearList[0].bsnSgnal,_data.yearList[1].bsnSgnal]);
	// 마지막년도만 - 21.03.16
	for( var y=0; y< _data.yearList.length; y=y+2 ){
		if((y+2) == _data.yearList.length) {
			for( var i=0; i< _data.sidoList.length; i=i+2 ){
				if(_data.yearList[y].year == _data.sidoList[i].year) {
					data16.push([fn_ctprvnNmLower(_data.sidoList[i].ctprvnNm) ,Number(_data.sidoList[i].unitArAvrgSelngAm),Number(_data.sidoList[i+1].unitArAvrgSelngAm)]);
					if(!_data.sidoList[i].unitArAvrgSelngAm && !_data.sidoList[i+1].unitArAvrgSelngAm) emptyData16++;
				}
			}
		}
	}

	/*
	var data17 = [];
	data17.push(['',_data.frchsList[0].bsnSgnal,_data.frchsList[1].bsnSgnal]);
	for( var i=0; i< _data.frchsList.length; i=i+2 ){
		data17.push(['교육비' ,Number(_data.frchsList[i].edcct),Number(_data.frchsList[i+1].edcct)]);
		data17.push(['가입비' ,Number(_data.frchsList[i].srbct),Number(_data.frchsList[i+1].srbct)]);
		data17.push(['보증금' ,Number(_data.frchsList[i].gtn),Number(_data.frchsList[i+1].gtn)]);
		data17.push(['기타비용' ,Number(_data.frchsList[i].etcCt),Number(_data.frchsList[i+1].etcCt)]);
		data17.push(['합계' ,Number(_data.frchsList[i].sm),Number(_data.frchsList[i+1].sm)]);
		data17.push(['면적당 인테리어비용' ,Number(_data.frchsList[i].unitArIntrrCt),Number(_data.frchsList[i+1].unitArIntrrCt)]);

	}
	*/
	var options = {
		title: '',
		legend: { position: 'bottom' }
	};


	var chartData1 = google.visualization.arrayToDataTable(data1);
	var chartData2 = google.visualization.arrayToDataTable(data2);
	var chartData3 = google.visualization.arrayToDataTable(data3);
	var chartData4 = google.visualization.arrayToDataTable(data4);
	var chartData5 = google.visualization.arrayToDataTable(data5);
	var chartData6 = google.visualization.arrayToDataTable(data6);

	var chartData7 = google.visualization.arrayToDataTable(data7);
	var chartData8 = google.visualization.arrayToDataTable(data8);
	var chartData9 = google.visualization.arrayToDataTable(data9);
	var chartData10 = google.visualization.arrayToDataTable(data10);
	
	var chartData11 = google.visualization.arrayToDataTable(data11);
	var chartData12 = google.visualization.arrayToDataTable(data12);
	var chartData13 = google.visualization.arrayToDataTable(data13);
	var chartData14 = google.visualization.arrayToDataTable(data14);
	/*
	// 마지막 년도 차트
	var chartNewData1 = google.visualization.arrayToDataTable(newData1);
	var chartNewData2 = google.visualization.arrayToDataTable(newData2);
	*/
	var chartData15 = google.visualization.arrayToDataTable(data15);
	var chartData16 = google.visualization.arrayToDataTable(data16);
	/*
	var chartData17 = google.visualization.arrayToDataTable(data17);
	*/
	var options1 = {};
	/*
	if( chartData15.getNumberOfRows() > 8 ){
		options1 = {
				title: '평균매출액',
				width: chartData15.getNumberOfRows() * 100,
				bar: {groupWidth: 70}
			};
	}else{
		options1 = {
				title: '평균매출액',
				//width: chartData15.getNumberOfRows() * 100,
				bar: {groupWidth: 70}
			};
	}
	*/
	options1 = {
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
	/*console.log(options1);*/
	var options2 = {};
	/*
	if( chartData16.getNumberOfRows() > 8 ){
		options2 = {
				title: '면적당매출액',
				width: chartData15.getNumberOfRows() * 100,
				bar: {groupWidth: 70}
			};
	}else{
		options2 = {
				title: '면적당매출액',
				//width: chartData15.getNumberOfRows() * 100,
				bar: {groupWidth: 70}
			};
	}
	*/
	options2 = {
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
	/*console.log(options2);*/

	var options3 = {
			title: '',
			//width: chartData16.getNumberOfRows() * 100,
			//bar: {groupWidth: 70}
		};

	var options4 = {
//			title: '평균매출액',
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
	/*console.log(options4);*/
	var options5 = {
//		title: '평균매출액',
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
	/*console.log("hPie:"+$(".mGraph1").width()/3 > 240 ? $(".mGraph1").width()/3 : 240);*/
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
	
	var optionsPieHole = {
//		도넛차트 내부 정확한 표시를 위한 수정
//		pieHole: 0.4,
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
	
	//가로막대 퍼센트
	var optionsRatio = {
		isStacked: 'percent',
		 hAxis: {
            minValue: 0,
            ticks: [0, .3, .6, .9, 1]
		},
		legend: {
			position: 'bottom'
			, alignment : 'center'
		}
	};
	
	/*
	 * bar -> line chart 1,2,3 - 21.02.15
	 */
	var moptions = {
		/*title: '',
		legend: { position: 'bottom' }*/
			title: '',
			width: '80%',
			height: 250,
			/*legend: {position: 'bottom', alignment : 'center', textStyle:{fontSize:5}},*/
			legend:{textStyle:{fontSize:7}},
			bar: {groupWidth: '80%'}
	};
	
	var moptions1 = {
			title: '평균매출액',
			width: 400,
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
		/*console.log(options1);*/
		var moptions2 = {};
		/*
		if( chartData16.getNumberOfRows() > 8 ){
			options2 = {
					title: '면적당매출액',
					width: chartData15.getNumberOfRows() * 100,
					bar: {groupWidth: 70}
				};
		}else{
			options2 = {
					title: '면적당매출액',
					//width: chartData15.getNumberOfRows() * 100,
					bar: {groupWidth: 70}
				};
		}
		*/
		moptions2 = {
			title: '면적당매출액',
			width: 400,
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
		/*console.log(options2);*/

		var moptions3 = {
				title: '',
				//width: chartData16.getNumberOfRows() * 100,
				//bar: {groupWidth: 70}
			};

		var moptions4 = {
				title: '',
				width: '80%',
				height: 250,
				/*legend: {position: 'bottom', alignment : 'center', textStyle:{fontSize:5}},*/
				legend:{textStyle:{fontSize:7}},
				bar: {groupWidth: '80%'}
		};
		/*console.log(options4);*/
		var moptions5 = {
				title: '',
				width: '80%',
				height: 250,
				/*legend: {position: 'bottom', alignment : 'center', textStyle:{fontSize:5}},*/
				legend:{textStyle:{fontSize:7}},
				bar: {groupWidth: '80%'}
		};
		/*console.log("hPie:"+$(".mGraph1").width()/3 > 240 ? $(".mGraph1").width()/3 : 240);*/
		var moptionsPie = {
			title: '',
			'width' : '80%',
			'height': 250 ,
			/*'width' : $(".mGraph1").width()/2,
			'height': $(".mGraph1").width()/3 > 210 ? 210 : $(".mGraph1").width()/3,*/
			animation:{
				startup: true,
				easing: 'inAndOut',
				duration: 5000
			},
			legend:{textStyle:{fontSize:7}}
			/*legend: { position: 'bottom' }*/
		};
		
		var moptionsPieHole = {
//			도넛차트 내부 정확한 표시를 위한 수정
//			pieHole: 0.4,
			title: '',
			'width' : '80%',
			'height': 250 ,
			/*'width' : $(".mGraph1").width()/2,
			'height': $(".mGraph1").width()/3 > 210 ? 210 : $(".mGraph1").width()/3,*/
			animation:{
				startup: true,
				easing: 'inAndOut',
				duration: 5000
			},
			legend:{textStyle:{fontSize:7}}
		};
		
		//가로막대 퍼센트
		var moptionsRatio = {
			isStacked: 'percent',
			 hAxis: {
	            minValue: 0,
	            ticks: [0, .3, .6, .9, 1]
			},
			legend:{textStyle:{fontSize:7}}
		};

	
	var chart1 = new google.visualization.LineChart(document.getElementById('year_chart1'));
//	var chart1 = new google.charts.Bar(document.getElementById('year_chart1'));
//	var chart1 = new google.visualization.BarChart(document.getElementById('year_chart1'));
	var chart2 = new google.visualization.LineChart(document.getElementById('year_chart2'));
//	var chart2 = new google.charts.Bar(document.getElementById('year_chart2'));
//	var chart2 = new google.visualization.BarChart(document.getElementById('year_chart2'));
	var chart3 = new google.visualization.LineChart(document.getElementById('year_chart3'));
//	var chart3 = new google.charts.Bar(document.getElementById('year_chart3'));
//	var chart4 = new google.visualization.LineChart(document.getElementById('year_chart4'));
	var chart4 = new google.charts.Bar(document.getElementById('year_chart4'));
//	var chart5 = new google.visualization.LineChart(document.getElementById('year_chart5'));
	var chart5 = new google.charts.Bar(document.getElementById('year_chart5'));
//	var chart6 = new google.visualization.LineChart(document.getElementById('year_chart6'));
	var chart6 = new google.charts.Bar(document.getElementById('year_chart6'));

	var chart7 = new google.visualization.PieChart(document.getElementById('pie_chart7'));
	var chart8 = new google.visualization.PieChart(document.getElementById('pie_chart8'));

//	var chart9 = new google.visualization.LineChart(document.getElementById('year_chart9'));
//	var chart9 = new google.charts.Bar(document.getElementById('year_chart9'));
	var chart9 = new google.visualization.PieChart(document.getElementById('year_chart9'));
//	var chart10 = new google.visualization.LineChart(document.getElementById('year_chart10'));
//	var chart10 = new google.charts.Bar(document.getElementById('year_chart10'));
	var chart10 = new google.visualization.PieChart(document.getElementById('year_chart10'));
	/*
	var chart11 = new google.visualization.LineChart(document.getElementById('year_chart11'));
	var chart12 = new google.visualization.LineChart(document.getElementById('year_chart12'));
	var chart13 = new google.visualization.LineChart(document.getElementById('year_chart13'));
	var chart14 = new google.visualization.LineChart(document.getElementById('year_chart14'));
	*/
	var chart11 = new google.visualization.BarChart(document.getElementById('year_chart11'));
	var chart12 = new google.visualization.BarChart(document.getElementById('year_chart12'));
	var chart13 = new google.visualization.BarChart(document.getElementById('year_chart13'));
	var chart14 = new google.visualization.BarChart(document.getElementById('year_chart14'));
	/*
	var newChart1 = new google.visualization.PieChart(document.getElementById('year_chart11'));
	var newChart2 = new google.visualization.PieChart(document.getElementById('year_chart12'));
	*/
	var chart15 = new google.charts.Bar(document.getElementById('sido_chart15'));
	var chart16 = new google.charts.Bar(document.getElementById('sido_chart16'));

	/*
//	var chart17 = new google.visualization.ColumnChart(document.getElementById('frchs_chart17'));
	var chart17 = new google.charts.Bar(document.getElementById('frchs_chart17'));
	 */
	
	var chart1Mob = new google.visualization.LineChart(document.getElementById('year_chart1Mob'));
	var chart2Mob = new google.visualization.LineChart(document.getElementById('year_chart2Mob'));
	var chart3Mob = new google.visualization.LineChart(document.getElementById('year_chart3Mob'));
	var chart4Mob = new google.visualization.ColumnChart(document.getElementById('year_chart4Mob'));
	var chart5Mob = new google.visualization.ColumnChart(document.getElementById('year_chart5Mob'));
	var chart6Mob = new google.visualization.ColumnChart(document.getElementById('year_chart6Mob'));
	/*var chart4Mob = new google.charts.Bar(document.getElementById('year_chart4Mob'));
	var chart5Mob = new google.charts.Bar(document.getElementById('year_chart5Mob'));
	var chart6Mob = new google.charts.Bar(document.getElementById('year_chart6Mob'));*/
	
	var chart7Mob = new google.visualization.PieChart(document.getElementById('pie_chart7Mob'));
	var chart8Mob = new google.visualization.PieChart(document.getElementById('pie_chart8Mob'));
	
	var chart9Mob = new google.visualization.PieChart(document.getElementById('year_chart9Mob'));
	var chart10Mob = new google.visualization.PieChart(document.getElementById('year_chart10Mob'));

	var chart11Mob = new google.visualization.BarChart(document.getElementById('year_chart11Mob'));
	var chart12Mob = new google.visualization.BarChart(document.getElementById('year_chart12Mob'));
	var chart13Mob = new google.visualization.BarChart(document.getElementById('year_chart13Mob'));
	var chart14Mob = new google.visualization.BarChart(document.getElementById('year_chart14Mob'));

//	var chart15Mob = new google.charts.Bar(document.getElementById('sido_chart15Mob'));
//	var chart16Mob = new google.charts.Bar(document.getElementById('sido_chart16Mob'));
	
	/*console.log(">>"+changeChartId.substring(changeChartId.lastIndexOf("_")+1));*/
//	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart") {
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart1") {
		chart1.draw(chartData1, options);
//		chart1.draw(chartData1, google.charts.Bar.convertOptions(options4));
	}
//	chart1.draw(chartData1, options4);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart2") {
		chart2.draw(chartData2, options);
//		chart2.draw(chartData2, google.charts.Bar.convertOptions(options5));
	}
//	chart2.draw(chartData2, options5);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart3") {
		chart3.draw(chartData3, options);
//		chart3.draw(chartData3, google.charts.Bar.convertOptions(options4));
	}
//	chart4.draw(chartData4, options);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart4") {
//		chart4.draw(chartData4, google.charts.Bar.convertOptions(options4));
		chart4.draw(chartData4, google.charts.Bar.convertOptions(options5)); //jhb -21.12.23 막대 -> 가로그래프 수정
	}
//	chart5.draw(chartData5, options);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart5") {
		chart5.draw(chartData5, google.charts.Bar.convertOptions(options5));
	}
//	chart6.draw(chartData6, options);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart6") {
		chart6.draw(chartData6, google.charts.Bar.convertOptions(options5));
	}

//	chart7.draw(chartData7, options);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart7") {
		chart7.draw(chartData7, optionsPie);
	}
//	chart8.draw(chartData8, options);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart8") {
		chart8.draw(chartData8, optionsPie);
	}

//	chart9.draw(chartData9, options);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart9") {
//		chart9.draw(chartData9, google.charts.Bar.convertOptions(options4));
		chart9.draw(chartData9, optionsPieHole);
	}
//	chart10.draw(chartData10, options);
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart10") {
//		chart10.draw(chartData10, google.charts.Bar.convertOptions(options4));
		chart10.draw(chartData10, optionsPieHole);
	}
	/*
	chart11.draw(chartData11, options);
	chart12.draw(chartData12, options);
	chart13.draw(chartData13, options);
	chart14.draw(chartData14, options);
	*/
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart11") {
//		chart11.draw(chartData11, google.charts.Bar.convertOptions(options4));
		chart11.draw(chartData11, google.charts.Bar.convertOptions(optionsRatio));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart12") {
//		chart12.draw(chartData12, google.charts.Bar.convertOptions(options4));
		chart12.draw(chartData12, google.charts.Bar.convertOptions(optionsRatio));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart13") {
		//chart13.draw(chartData13, google.charts.Bar.convertOptions(options4));
		chart13.draw(chartData13, google.charts.Bar.convertOptions(optionsRatio));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart14") {
//		chart14.draw(chartData14, google.charts.Bar.convertOptions(options4));
		chart14.draw(chartData14, google.charts.Bar.convertOptions(optionsRatio));
	}
	/*
	newChart1.draw(chartNewData1, optionsPie);
	newChart2.draw(chartNewData2, optionsPie);
	*/
//	chart15.draw(chartData15, options1);
//	if((data15.length-1) == emptyData15) options1.vAxis.ticks = [0, 0.25, 0.5, 0.75, 1];
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart15") {
		chart15.draw(chartData15, google.charts.Bar.convertOptions(options1));
	}
//	chart16.draw(chartData16, options2);
	/*console.log(data16.length+":"+emptyData16);*/
//	if((data16.length-1) == emptyData16) options2.vAxis.ticks = [0, 0.25, 0.5, 0.75, 1];
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1) == "chart16") {
		chart16.draw(chartData16, google.charts.Bar.convertOptions(options2));
	}
	/*
//	chart17.draw(chartData17, options3);
	chart17.draw(chartData17, google.charts.Bar.convertOptions(options4));
	*/
	
	chart1Mob.draw(chartData1, moptions);
	chart2Mob.draw(chartData2, moptions);
	chart3Mob.draw(chartData3, moptions);
	chart4Mob.draw(chartData4, moptions5);
	chart5Mob.draw(chartData5, moptions5);
	chart6Mob.draw(chartData6, moptions5);
	chart7Mob.draw(chartData7, moptionsPie);
	chart8Mob.draw(chartData8, moptionsPie);
	chart9Mob.draw(chartData9, moptionsPieHole);
	chart10Mob.draw(chartData10, moptionsPieHole);
	chart11Mob.draw(chartData11, google.charts.Bar.convertOptions(moptionsRatio));
	chart12Mob.draw(chartData12, google.charts.Bar.convertOptions(moptionsRatio));
	chart13Mob.draw(chartData13, google.charts.Bar.convertOptions(moptionsRatio));
	chart14Mob.draw(chartData14, google.charts.Bar.convertOptions(moptionsRatio));

	if(!_data.yearList[_data.yearList.length-2].exctvCo && !_data.yearList[_data.yearList.length-2].empCo){
		$("#pie_chart7").text("데이터가 없습니다");
		$("#pie_chart7").parent().css("display", "inline-block");
		$("#pie_chart7").parent().css("vertical-align", "middle");
		$("#pie_chart7Mob").text("데이터가 없습니다");
	}
	
	if(!_data.yearList[_data.yearList.length-1].exctvCo && !_data.yearList[_data.yearList.length-1].empCo){
		$("#pie_chart8").text("데이터가 없습니다");
		$("#pie_chart8").parent().css("display", "inline-block");
		$("#pie_chart8").parent().css("vertical-align", "middle");
		$("#pie_chart8Mob").text("데이터가 없습니다");
	}
	
	if(!_data.yearList[_data.yearList.length -2].mrhstCo && !_data.yearList[_data.yearList.length -1].mrhstCo){
		$("#year_chart9").text("데이터가 없습니다");
		$("#year_chart9").parent().css("display", "inline-block");
		$("#year_chart9").parent().css("vertical-align", "middle");
		$("#year_chart9Mob").text("데이터가 없습니다");
	}
	
	if(!_data.yearList[_data.yearList.length -2].droperCo && !_data.yearList[_data.yearList.length -1].droperCo){
		$("#year_chart10").text("데이터가 없습니다");
		$("#year_chart10").parent().css("display", "inline-block");
		$("#year_chart10").parent().css("vertical-align", "middle");
		$("#year_chart10Mob").text("데이터가 없습니다");
	}
	
	/*var data11Yn = false;
	for(var i=0;i<_data.yearList.length;i++){
		if(_data.yearList[i].newStorCo){
			data11Yn = true;
		}
	}
	if(!data11Yn){
		$("#year_chart11").text("데이터가 없습니다");
		$("#year_chart11Mob").text("데이터가 없습니다");
	}
	
	var data12Yn = false;
	for(var i=0;i<_data.yearList.length;i++){
		if(_data.yearList[i].cntrctEndCo){
			data12Yn = true;
		}
	}
	if(!data12Yn){
		$("#year_chart12").text("데이터가 없습니다");
		$("#year_chart12Mob").text("데이터가 없습니다");
	}
	
	var data13Yn = false;
	for(var i=0;i<_data.yearList.length;i++){
		if(_data.yearList[i].cntrctTrmnatCo){
			data13Yn = true;
		}
	}
	if(!data13Yn){
		$("#year_chart13").text("데이터가 없습니다");
		$("#year_chart13Mob").text("데이터가 없습니다");
	}
	
	var data14Yn = false;
	for(var i=0;i<_data.yearList.length;i++){
		if(_data.yearList[i].nmChangeCo){
			data14Yn = true;
		}
	}
	if(!data14Yn){
		$("#year_chart14").text("데이터가 없습니다");
		$("#year_chart14Mob").text("데이터가 없습니다");
	}
*/
	/*if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart1Mob") {
		chart1Mob.draw(chartData1, moptions);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart2Mob") {
		chart2Mob.draw(chartData2, moptions);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart3Mob") {
		chart3Mob.draw(chartData3, moptions);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart4Mob") {
		chart4Mob.draw(chartData4, google.charts.Bar.convertOptions(moptions5)); //jhb -21.12.23 막대 -> 가로그래프 수정
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart5Mob") {
		chart5Mob.draw(chartData5, google.charts.Bar.convertOptions(moptions5));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart6Mob") {
		chart6Mob.draw(chartData6, google.charts.Bar.convertOptions(moptions5));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart7Mob") {
		chart7Mob.draw(chartData7, moptionsPie);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart8Mob") {
		chart8Mob.draw(chartData8, moptionsPie);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart9Mob") {
		chart9Mob.draw(chartData9, moptionsPieHole);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart10Mob") {
		chart10Mob.draw(chartData10, moptionsPieHole);
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart11Mob") {
		chart11Mob.draw(chartData11, google.charts.Bar.convertOptions(moptionsRatio));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart12Mob") {
		chart12Mob.draw(chartData12, google.charts.Bar.convertOptions(moptionsRatio));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart13Mob") {
		chart13Mob.draw(chartData13, google.charts.Bar.convertOptions(moptionsRatio));
	}
	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart14Mob") {
		chart14Mob.draw(chartData14, google.charts.Bar.convertOptions(moptionsRatio));
	}*/
//	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart15Mob") {
//		chart15Mob.draw(chartData15, google.charts.Bar.convertOptions(options1));
//	}
//	if(!changeChartId || $("#"+changeChartId).length == 0 || changeChartId.substring(changeChartId.lastIndexOf("_")+1+"Mob") == "chart16Mob") {
//		chart16Mob.draw(chartData16, google.charts.Bar.convertOptions(options2));
	}

/*	function fn_getFrnchsNo(target){
		var fNum = "." + target + "_frnchsNo";
		var mFrnchsNo = $(fNum).text();
	}*/

var aa;
$(document).ready(function() {
	if( globalNewsObj.param8 < globalNewsObj.param9){
		$(".ts").text(globalNewsObj.param8 + "년도 기준");
	}else {
		$(".ts").text(globalNewsObj.param9 + "년도 기준");
	}
	
	if(globalNewsObj.param3 > globalNewsObj.param4){
		if(globalNewsObj.param7 == "pc"){
			$("#c1_iFavor").attr("class", globalNewsObj.param6);
			$("#c2_iFavor").attr("class", globalNewsObj.param5);
		}else{
			$("#originC1").attr("class", globalNewsObj.param6);
			$("#originC2").attr("class", globalNewsObj.param5);
		}
		
	}else{
		if(globalNewsObj.param7 == "pc"){
			$("#c1_iFavor").attr("class", globalNewsObj.param5);
			$("#c2_iFavor").attr("class", globalNewsObj.param6);
		}else{
			$("#originC1").attr("class", globalNewsObj.param5);
			$("#originC2").attr("class", globalNewsObj.param6);
			
			
			
		}
		
	}
	

	$(".download").off("click").on("click",function(e){
		e.preventDefault();
		
		var atchmnflNo = "." + $(this).val() + "_atchmnflNo";
		var fileSn = "." + $(this).val() + "_fileSn";
		var fileKey = "." + $(this).val() + "_fileKey";
		
		var mAtchmnflNo = $(atchmnflNo).text();
		var mFileSn = $(fileSn).text();
		var mFileKey = $(fileKey).text();
		
		if(mAtchmnflNo == 0){
			alert("첨부된 파일이 없습니다");
		}else{
			$(".download").unbind();
//			if(confirm("상기 파일은 가맹본부가 제출한 내용으로 심사없이 공개되는 것임을 알려드립니다")){
			if(confirm("이용자 책임하에 열람 : 본 파일은 가맹본부가 제출한 내용으로 심사없이 공개되는 것이며, 경기도는 어떠한 보증도 하지 않습니다.")){
				location.href = "/file/downloadFile.do?atchmnflNo="+mAtchmnflNo+"&fileSn="+mFileSn+"&fileKey="+encodeURIComponent(mFileKey);
			}
		}
	});
	
	$(".mapView").off("click").on("click",function(e){
		e.preventDefault();
		
		var cCode = "." + $(this).val() + "_ctprvnCode";
		var fNum = "." + $(this).val() + "_frnchsNo";
		var lCode = "." + $(this).val() + "_mlsfcIndutyCode";
		var cRate = "." + $(this).val() + "_closeRate";
		var year = "." + $(this).val() + "_year";
		
		
		var mcCode = $(cCode).text();
		var mFrnchsNo = $(fNum).text(); 
		var mlCode = $(lCode).text();
		var mcRate = $(cRate).text();
		var mYear = $(year).text();
		
		if(mcRate == "null"){
			mcRate = "0";
		}
		
		if(mFrnchsNo.length == 22){
			mFrnchsNo = mFrnchsNo.substring(0, 11);
		}else if(mFrnchsNo.length == 16){
			mFrnchsNo = mFrnchsNo.substring(0, 8);
		}
		
		densityObj.ctprvnCode = mcCode;
		densityObj.frnchsNo = mFrnchsNo;
		densityObj.mlsfcIndutyCode = mlCode;
		densityObj.closeRate = mcRate+'%';
		yearFinal = mYear;
		

		var pop = window.open('/fran/search/densityBrand.do');

	});
	
	$(".iFavor").off("click").on("click",function(e){
		e.preventDefault();
		var thisId = $(this).attr("id");
		var fNum = "." + thisId.split("_")[0] + "_frnchsNo";
		var pFrnchsNo = $(fNum).text();
		var newpFrnchsNo = pFrnchsNo.substring(0,11);
		var param = {};
		param.frnchsNo = newpFrnchsNo;
		param.id = thisId;

		var confirmMsg = "";

		if( $(this).hasClass("selected") ){

			param.flag = 'Y';
			confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
		}else{
			param.flag = 'N';
			confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
		}

		if( confirm(confirmMsg) ){
			intrstFrnchsCompare(param);
		}else{
			return false;
		}
		

	});
	
	$(".wish").off("click").on("click",function(e){
		e.preventDefault();
		
		var fNum = "." + $(this).val() + "_frnchsNo";
		var mFrnchsNo = $(fNum).text();
		var newmFrnchsNo = mFrnchsNo.substring(0,11);
		$(this).attr('id',newmFrnchsNo);
		
		var param = {};
		
		param.frnchsNo = newmFrnchsNo;
		var confirmMsg = "";
		
		if( $(this).hasClass("selected") ){
			param.flag = 'Y';
			confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
		}else{
			param.flag = 'N';
			confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
		}
		
		if( confirm(confirmMsg) ){
			intrstFrnchs(param);
			
		}else{
			return false;
		}
	});

	getReviewNews();
	$(".jsTab1 a").on("click", function(){
		!dataTemp ? drawChart() : fn_createChart(dataTemp, $($(this).attr("href")).find("div[id*=_chart]").attr("id"));
		aa= $($(this).attr("href")).find("div[id*=_chart]").attr("id");
	})
	
});

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

//모바일 본사기업정보 height 통일
$(window).load(function(){	
	var c1_detail = $(".c1_detail").css("height");
	var c2_detail = $(".c2_detail").css("height");
	if(c1_detail > c2_detail){
		$(".c2_detail").css("height",c1_detail);
	}else{
		$(".c1_detail").css("height",c2_detail);
	}
})