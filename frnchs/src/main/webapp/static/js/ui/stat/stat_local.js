google.charts.load('current', {packages: ['corechart', 'bar','table']});
var statObj = [];
var changeObj = [];
var initFlag = true;
$(document).ready(function() {
	
	$(document).on("click", ".lCntMob", function(e){
//	$(".lCntMob").on("click",function(e){
			/*$("#subMob").show();*/
		toggle_dimmed_view('layer_statistics_seoul'); 
		return false;
	});
	
	$("#brandBtn").on("click",function(e){
		e.preventDefault();

		location.href = "/stat/franBrandStatList.do";
	});

	$(".jsBtnClose1").on("click",function(e){
		e.preventDefault();
		$("#frnchsPopup").hide();
	});

	var tmpHtml = [];
	//분석기간 선택
	fnGetAjaxData("/stat/selectDataYear.ajax", {}, function(_data) {

		////console.log("selectDataYear res",_data);

		if(_data.resultCode == RESULT_SUCCESS){

			_data.dataList.forEach(function(row,idx){
				if(row.stdrYear == "2021") {
					return false;
				}
				tmpHtml.push('<option value="'+row.stdrYear+'" >'+row.stdrYear+'년</option>');
			});

			$(".year").html( tmpHtml.join("") );
			$("#brandYear").html( tmpHtml.join("") );
			$("#yearMob").html( tmpHtml.join("") );
			$(".year").val($("#localYear").val() || $(".year option:last").val()); // 최신년 선택으로 변경 - 21.03.17
			$("#brandYear").val($("#brandYear option:last").val()); // 최신년 선택으로 변경 - 21.03.17
			$("#yearMob").val($("#localYear").val() || $("#yearMob option:last").val()); // 모바일 추가 - 22.01.04

		}else{
			////console.log("데이터 있는 연도 가져오기 실패..");
		}

	});

	$(".ldClass").empty();
	$(".ldClass").append('<option value="">- 전체 -</option>');
	
	//대분류 조회
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {
		////console.log("대분류",_data);
		_data.franchLclasList.forEach(function(row,idx){
			if( !~row.lclasIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
				$(".ldClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
				$("#brandLdClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
		});
		if( initFlag ){
//			$(".ldClass").val($("#localLd").val() || "LC01");
			fnChangeLd();
		}
	});
	//지역대분류 변경시
	$(".ldClass").off("change").on("change",function(e){
		fnChangeLd();
	});
	//브랜드대분류 변경시
	$("#brandLdClass").off("change").on("change",function(e){
		fnChangeBrandLd();
	});
	//브랜드중분류 변경시
//		$("#brandMdClass").off("change").on("change",function(e){
//			openFrchsPop();
//		});
	$("#brandFrcClass").click(function(){
		if($("#brandMdClass").val()){
			openFrchsPop();
		}
	});
	
	$(".viewLocalBtn").on("click",function(e){
		e.preventDefault();
		searchViewStat();
		fnMakeChart();
	});
	
	$("#viewLocalBtnMob").on("click",function(e){
		var text = '';
		if($("#ldClassMob option:selected").val()){
			text = $("#ldClassMob option:selected").text();
		}else{
			text = '전체';
		}
		if($("#mdClassMob option:selected").val()){
			text =  text + " - " + $("#mdClassMob option:selected").text();
		}
		$("#ldml").text(text);
		e.preventDefault();
		searchViewStat();
		fnMakeChartMob();
		
		if(!$("#yearMob option:selected").val() || !$("#ldClassMob option:selected").val() || !$("#mdClassMob option:selected").val()){
			alert("분석기간과 프랜차이즈를 선택해주세요");
		}else{
			stepView(1);
		}
		
	});

	$(".viewBrandBtn").on("click",function(e){
		fnGoBrandPage();
	});


});

$(window).load(function(){
	//최초 로드시실행
	if($(document).width() <= 687) {
		fnMakeChartMob($("#41"));	
	} else {
		fnMakeChart($("#41"));
	}
	
//	$(".mMain1").children().find("a[id=41]").click();
	$("#chart1MobToggle").find("dt").trigger('click');
});

function stepView(no) {
	$('.step').removeClass('active');
	$('.step' + no).addClass('active');

	if (no == 0) { // 업종 통계
		$('h3.subtitle').text('업종 통계');
	} else if (no == 1) { // 검색결과
		$('h3.subtitle').text('검색결과');
	}
}

//프랜차이즈 검색 공통 callback함수
function drawCharts(){
	//fnGoBrandPage();
}

function fnGoBrandPage(){
//	//console.log($("#brandYear:visible").val());
	if(!$("#brandYear:visible").val()){
		alert("분석기간을 선택해주세요.");
		return;
	}
//	if(!$("#brandLdClass:visible").val()){
//		alert("대분류를 선택해주세요.");
//		return;
//	}
//	if(!$("#brandMdClass:visible").val()){
//		alert("중분류를 선택해주세요.");
//		return;
//	}
//	if(!$("#brandFrcClass:visible").val()){
//		alert("프랜차이즈를 선택해주세요.");
//		return;
//	}

	var frm = $("<form></form>");
	frm.attr("name","frm");
	frm.attr("method","post");
	frm.attr("action","/stat/franBrandStatList.do");
	frm.append($('<input/>', {type: 'hidden', name: 'brandYear', value: $("#brandYear:visible").val() }));
	frm.append($('<input/>', {type: 'hidden', name: 'brandLd', value: $("#brandLdClass:visible").val()}));
	frm.append($('<input/>', {type: 'hidden', name: 'brandMd', value: $("#brandMdClass:visible").val()}));
	frm.append($('<input/>', {type: 'hidden', name: 'brandFrc', value: $("#brandFrcClass:visible").val()}));
	frm.append($('<input/>', {type: 'hidden', name: 'brandFrcNm', value: $("#brandFrcClass:visible").text()}));

	frm.appendTo("body");

	frm.submit();
}

//지역대분류 변경
function fnChangeLd(){
	$(".mdClass").empty();
	$(".mdClass").append('<option value="">- 전체 -</option>');

	var selectedVal = $('.ldClass:visible').val();
	$(".ldClass").val( selectedVal );
	fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
		////console.log("중분류",_data);
		_data.frnchsMlsfcList.forEach(function(row,idx){
			if( !~row.mlsfcIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
				$(".mdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
			}
		});
		if( initFlag ){
//			$(".mdClass").val($("#localMd").val() || "A1");
			//최초 실행시 기본값 세팅
			searchViewStat();
			initFlag = false;
		}
	});
}
//브랜드대분류 변경
function fnChangeBrandLd(){
	$("#brandMdClass").empty();
	$("#brandMdClass").append('<option value="">- 전체 -</option>');

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

function searchViewStat(){
	var params = {};
	
	var windowWidth = window.matchMedia("screen and (max-width:750px)");
	if (windowWidth.matches) {
		params.year =  $("#yearMob option:selected").val();
		params.lCode =  $("#ldClassMob option:selected").val();
		params.code =  $("#mdClassMob option:selected").val();
	}else{
		params.year = $(".year option:selected").val();
		params.lCode = $(".ldClass option:selected").val();
		params.code = $(".mdClass option:selected").val();
	}
//	console.log("local js view btn",params);
	//psm TODO 업종 전체 선택용 처리 필요
//	if( params.code == "" ){
//		alert("중분류까지 선택해주세요.");
//		return false;
//	}
//	if( params.code == "Z0" ){
//		params.code = "";
//	}
	// //psm TODO 업종 전체 선택용 처리 필요

	viewStat(params);
}

//최신년도 데이터 없을경우 년도 지정하여 데이터 가져오기 - 22.01.19 jhb
function nowDataChange(year) {
	var params = {};
	var result = null;
	var windowWidth = window.matchMedia("screen and (max-width:750px)");
	if (windowWidth.matches) {
		params.year =  year;
		params.lCode =  $("#ldClassMob option:selected").val();
		params.code =  $("#mdClassMob option:selected").val();
	}else{
		params.year = year;
		params.lCode = $(".ldClass option:selected").val();
		params.code = $(".mdClass option:selected").val();
	}
	
	fnGetSyncAjaxData("/stat/franStat.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			result = _data.dataList;
		} else {
			alert(_data.resultMsg);
		}
	});
	return result;
}

//기초 데이터 세팅
function viewStat(params){
	var tmpHtml = [];
	var tmpHtmlMob = [];

	//console.log("local js viewStat param",params);

	fnGetSyncAjaxData("/stat/franStat.ajax", params, function(_data) {

		$("#ajaxArea").empty();
//		$("#ajaxAreaMob").empty();

		if(_data.resultCode == RESULT_SUCCESS){

			statObj = _data.dataList;

			statObj.forEach(function(row,idx){
				//지도에 총 가맹점 수 채우고
				$(".r" + row.ctprvnCode).find(".c").text( gfnNumberWithCommas(Number(row.mrhstCo + row.droperCo)) );

				//지역별 점포수 통계 카드 만듬
				tmpHtml.push('<div class="lst">')
				tmpHtml.push('	<a href="javascript:void(0)" class="chartBtn" id="'+row.ctprvnCode+'">')
				tmpHtml.push('		<span class="ti">'+row.ctprvnNm+'</span>')
				tmpHtml.push('		<span class="tx">')
				tmpHtml.push('			<span class="l"><strong class="txtEm3" style="letter-spacing: -1px;font-size: 16px;">'+gfnNumberWithCommas(Number(row.mrhstCo + row.droperCo))+'</strong> 전체</span>')
				tmpHtml.push('			<span class="l"><strong style="letter-spacing: -1px;font-size: 16px;">'+gfnNumberWithCommas(row.mrhstCo)+'</strong> 가맹점수</span>')
				tmpHtml.push('			<span class="l"><strong style="letter-spacing: -1px;font-size: 16px;">'+gfnNumberWithCommas(row.droperCo)+'</strong> 직영점수</span>')
				tmpHtml.push('		</span>')
				tmpHtml.push('	</a>')
				tmpHtml.push('</div>')
			});
			
			statObj.forEach(function(row,idx){
				//지도에 총 가맹점 수 채우고
				$(".r" + row.ctprvnCode + "Mob").find(".c").text(" "+ gfnNumberWithCommas(Number(row.mrhstCo + row.droperCo)) );
				
				//지역별 점포수 통계 카드 만듬
				tmpHtmlMob.push('<div class="lst">')
				tmpHtmlMob.push('	<a href="javascript:void(0)" class="chartBtn" id="'+row.ctprvnCode+'">')
				tmpHtmlMob.push('		<span class="ti">'+row.ctprvnNm+'</span>')
				tmpHtmlMob.push('		<span class="tx">')
				tmpHtmlMob.push('			<span class="l"><strong class="txtEm3" style="letter-spacing: -1px;font-size: 16px;">'+gfnNumberWithCommas(Number(row.mrhstCo + row.droperCo))+'</strong> 전체</span>')
				tmpHtmlMob.push('			<span class="l"><strong style="letter-spacing: -1px;font-size: 16px;">'+gfnNumberWithCommas(row.mrhstCo)+'</strong> 가맹점수</span>')
				tmpHtmlMob.push('			<span class="l"><strong style="letter-spacing: -1px;font-size: 16px;">'+gfnNumberWithCommas(row.droperCo)+'</strong> 직영점수</span>')
				tmpHtmlMob.push('		</span>')
				tmpHtmlMob.push('	</a>')
				tmpHtmlMob.push('</div>')
			});

//			tmpHtml.push('<div class="info">');
//			tmpHtml.push('	상기 정보는 공정거래위원회의 정보공개서에서<br> 수집된 기본정보 입니다.<br>');
//			tmpHtml.push('	카드매출 데이터 : 출처 (비씨카드)  /   유동인구 데이터 : 출처 (KT)');
//			tmpHtml.push('</div>');

			$("#ajaxArea").html( tmpHtml.join("") );
//			$("#ajaxAreaMob").html( tmpHtmlMob.join("") );
			//점포수통계 연도 바인딩
			$("#s_year").text( params.year );
			$("#s_yearMob").text( params.year );

			//지역 클릭시 차트생성
			$(".chartBtn").off("click").on("click",function(e){
				fnMakeChart($(this));
			});
			$(".chartBtnMob").off("click").on("click",function(e){
				fnMakeChartMob($(this));
			});
		} else {
			alert(_data.resultMsg);
		}
	});
}

//차트 생성
function fnMakeChart(Obj){

	if(Obj == null || Obj == undefined){
//		Obj = $("#00");
		Obj = $("#41");
//		console.log(Obj);
//		console.log(typeof Obj);
	}

	//업종별 프랜차이즈 가맹점 통계 클릭시
	if(~Obj.attr("class").indexOf("lCnt")){
		$(".mMain1").find("a").removeClass("selected");
		Obj.addClass("selected");
	}else{
		$(".mMain1").find("a").removeClass("selected");
		$(".r"+Obj.attr("id")).addClass("selected");
	}

	//점포수 통계 차트

	var id = Obj.attr("id");

	statObj.forEach(function(row,idx){
		if( row.ctprvnCode == id ){
			//통계 요약 결과 타이틀 바인딩
			$(".p_ctprvnCode").text( row.ctprvnNm );

			//점포수 통계 차트 생성
			drawChart(row);
		}
	});


	//3년치 추이 차트

	var params = {};
	
	var windowWidth = window.matchMedia("screen and (max-width:750px)");
	if (windowWidth.matches) {
		params.strtYear = Number($("#yearMob option:selected").val() -2 );
		params.endYear =  $("#yearMob option:selected").val();
		params.lJobCode =  $("#ldClassMob option:selected").val();
		params.jobCode = $("#mdClassMob option:selected").val();
		params.ctprvnCode = id;
	}else{
		params.strtYear = Number( $(".year option:selected").val() -2 );
		params.endYear = $(".year option:selected").val();
//		params.jobCode = $(".mdClass:visible").val() || 'A1';
		params.lJobCode = $(".ldClass option:selected").val();
		params.jobCode = $(".mdClass option:selected").val();
		params.ctprvnCode = id;
	}

	////console.log("3년치 추이 차트 파람",params);
	fnGetAjaxData("/stat/franStat.ajax", params, function(_data) {

		////console.log("trend _data",_data);

		if(_data.resultCode == RESULT_SUCCESS){

			$(".trendPop").show();

			drawTrendChart(_data);

		}else{

		}

	});
}

//차트 생성
function fnMakeChartMob(Obj){
	var id;
	if(Obj == null || Obj == undefined){
//		Obj = $("#00");
		Obj = $("#41");
		//최초 or 조회하기 눌렀을때
		id = Obj.attr("id");
	} else {
		//점포수 통계 차트 지도 클릭했을때
		id = Obj.children("span").attr("id");
	}
	
	//업종별 프랜차이즈 가맹점 통계 클릭시
	if(~Obj.attr("class").indexOf("lCntMob")){
		$(".peninsula").find("a").removeClass("selected");
		Obj.addClass("selected");
	}else{
		$(".peninsula").find("a").removeClass("selected");
		$(".r"+Obj.attr("id")+"Mob").addClass("selected");
	}
	
	
	
	statObj.forEach(function(row,idx){
		if( row.ctprvnCode == id ){
			//통계 요약 결과 타이틀 바인딩
			$(".p_ctprvnCode").text( row.ctprvnNm );
			//점포수 통계 차트 생성
			drawChart(row);
		}
	});
	
	
	//3년치 추이 차트
	var params = {};
	
	var windowWidth = window.matchMedia("screen and (max-width:750px)");
	if (windowWidth.matches) {
		params.strtYear = Number($("#yearMob option:selected").val() -2 );
		params.endYear =  $("#yearMob option:selected").val();
		params.lJobCode =  $("#ldClassMob option:selected").val();
		params.jobCode = $("#mdClassMob option:selected").val();
		params.ctprvnCode = id;
	}else{
		params.strtYear = Number( $(".year:visible").val() -2 );
		params.endYear = $(".year:visible").val();
//		params.jobCode = $(".mdClass:visible").val() || 'A1';
		params.lJobCode = $(".ldClass:visible").val();
		params.jobCode = $(".mdClass:visible").val();
		params.ctprvnCode = id;
	}
//	console.log("모바일 : "+ JSON.stringify(params)); 
	
//	console.log("3년치 추이 차트 파람",params);
	fnGetAjaxData("/stat/franStat.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){	
			$(".trendPop").show();
			drawTrendChart(_data);
		}
	});
}

var chart1;
var chart1Mob;
function drawChart(data) {
	//현재 검색 년도 기준으로 데이터가 없을 경우 이전 년도 데이터 가져와 데이터 없는 부분 넣어주기.- 22.01.19 jhb
	var enfsnCo = data.enfsnCo;
	var avgRow = null;
	var selectYear = new Date($(".year option:selected").val());
	if(data.stdrYear == String(selectYear.getFullYear()) && data.enfsnCo == null) {
		var nowData = nowDataChange(String(selectYear.getFullYear() - 1));
		nowData.forEach(function(row,idx){
			if( row.ctprvnCode == "00" ){
				avgRow = row;
			}
			if( row.ctprvnCode == data.ctprvnCode){
				enfsnCo = row.enfsnCo;
			}
		});
	}//---------------------
	//chart1[s]
	var data1 = google.visualization.arrayToDataTable([
		['', ''],
		['가맹점 비율', Number(data.mrhstCo)],
		['직영점 비율', Number(data.droperCo)]
	]);

	var options1 = {
		title: '',
		legend: {position: 'none'},
		colors: ['#fcc710', '#67706d'],
		animation: {
			startup: true,
			duration : 2000,
//			easing : 'out'
		},
//		is3D: true, // 보류
	};

	chart1 = new google.visualization.PieChart(document.getElementById('chart1'));
	chart1Mob = new google.visualization.PieChart(document.getElementById('chart1Mob'));

	chart1.draw(data1, options1);
	chart1Mob.draw(data1, options1);
	$("#chart1MobToggle").find("dt").trigger('click');
	//chart1[e]

	//chart2[s]

	//전국평균 가져오기
	var ntnlAvrgSelngAm = "";//전국평균 매출
	var ntnlEnfsnCo = "";//전국평균 종사자수
	var ntnlResidePopltnCo = "";//전국평균 거주인구수
	statObj.forEach(function(row,idx){
		if( row.ctprvnCode == "00" ){
			ntnlAvrgSelngAm = row.avrgSelngAm;
			ntnlEnfsnCo = row.enfsnCo;
			ntnlResidePopltnCo = row.residePopltnCo;
		}
	});
	
	//전국 값이 없을경우 이전 년도 데이터 넣어주기 - 22.01.19 jhb
	if(ntnlEnfsnCo == null) {
		ntnlEnfsnCo = avgRow.enfsnCo;
	}
	if(ntnlAvrgSelngAm == null) {
		ntnlAvrgSelngAm = avgRow.avrgSelngAm;
	}
	if(ntnlResidePopltnCo == null) {
		ntnlResidePopltnCo = avgRow.residePopltnCo;
	}
	
//	//console.log("ntnlAvrgSelngAm :: " + ntnlAvrgSelngAm);
//	//console.log("data.avrgSelngAm :: " + data.avrgSelngAm);
	var data2 = google.visualization.arrayToDataTable([
//		['', '', '#fcc710'],
//		['전국', Number(Number(ntnlAvrgSelngAm).toFixed(2)), '#fcc710'],
//		[fn_ctprvnNmLower(data.ctprvnNm), Number(Number(data.avrgSelngAm).toFixed(2)), '#67706d']
		['전국','지역',{role:"style"}],
		['전국', Number(Number(ntnlAvrgSelngAm).toFixed(2)), '#fcc710'],
		[fn_ctprvnNmLower(data.ctprvnNm), Number(Number(data.avrgSelngAm).toFixed(2)), '#67706d']
	]);

	var options2 = {
			title: '',
			legend: {position: 'none'},
			// 옵션확인필요
			animation: {
				startup: true,
				duration : 2000,
				easing : 'out'
			},
			hAxis:{
	
			}
	};
	if(!data.avrgSelngAm){
		options2.hAxis.ticks = [0, 0.5, 1];
	}
	var chart2 = new google.visualization.BarChart(document.getElementById('chart2'));
	var chart2Mob = new google.visualization.BarChart(document.getElementById('chart2Mob'));

	chart2.draw(data2, options2);
	chart2Mob.draw(data2, options2);
	//chart2[e]
////console.log("ntnlEnfsnCo :: " + ntnlEnfsnCo);
////console.log("data.enfsnCo :: " + data.enfsnCo);

	//chart3[s]
	var data3 = google.visualization.arrayToDataTable([
//		['', '', '#fcc710'],
//		['전국', Number(Number(ntnlEnfsnCo/17).toFixed(2)), '#fcc710'],
//		[fn_ctprvnNmLower(data.ctprvnNm), Number(Number(data.enfsnCo).toFixed(2)), '#67706d']
		['전국','지역',{role:"style"}],
		['전국', Number(Number(ntnlEnfsnCo).toFixed(2)), '#fcc710'],
		[fn_ctprvnNmLower(data.ctprvnNm), Number(Number(enfsnCo).toFixed(2)), '#67706d']
	]);

	var options3 = {
			title: '',
			animation: {
				startup: true,
				duration : 2000,
				easing : 'out'
			},
			hAxis: {
				
			},
			legend: {position: 'none'}

	};
	if(!enfsnCo){
		options3.hAxis.ticks = [0, 0.5, 1];
	}else if(enfsnCo == Number(ntnlEnfsnCo)){
		//console.log("equeals");
		options3.hAxis.ticks = [Number(ntnlEnfsnCo) - 100000, Number(ntnlEnfsnCo), Number(ntnlEnfsnCo) + 100000];
	}
//	console.log(options3);
	var chart3 = new google.visualization.BarChart(document.getElementById('chart3'));
	chart3.draw(data3, options3);
	
	if(!ntnlEnfsnCo){
		$("#chart3Mob").html('<p>데이터가 없습니다</p>');
		$("#chart3Mob").text("데이터가 없습니다");
	}else{
		$("#chart3Mob").html('');
		var chart3Mob = new google.visualization.BarChart(document.getElementById('chart3Mob'));
		chart3Mob.draw(data3, options3);
	}
	//chart3[e]

	//chart4[s]
	var data4 = google.visualization.arrayToDataTable([
//		['', '', '#fcc710'],
//		['전국', Number(Number(ntnlResidePopltnCo/17).toFixed(2)), '#fcc710'],
//		[fn_ctprvnNmLower(data.ctprvnNm), Number(Number(data.residePopltnCo).toFixed(2)), '#67706d']
		['전국','지역',{role:"style"}],
		['전국', Number(Number(ntnlResidePopltnCo).toFixed(2)), '#fcc710'],
		[fn_ctprvnNmLower(data.ctprvnNm), Number(Number(data.residePopltnCo).toFixed(2)), '#67706d']
	]);
//console.log("data.residePopltnCo :: " + data.residePopltnCo);
	var options4 = {
			title: '',
			animation: {
				startup: true,
				duration : 2000,
				easing : 'out'
			},
			hAxis:{

			},
			legend: {position: 'none'}
	};
	if(!data.residePopltnCo){
		options4.hAxis.ticks = [0, 0.5, 1];
	}else if(Number(ntnlResidePopltnCo) == Number(data.residePopltnCo)){
		options4.hAxis.ticks = [Number(ntnlResidePopltnCo) - 200000, Number(ntnlResidePopltnCo), Number(ntnlResidePopltnCo) + 200000];
	}
	var chart4 = new google.visualization.BarChart(document.getElementById('chart4'));
	var chart4Mob = new google.visualization.BarChart(document.getElementById('chart4Mob'));
	chart4.draw(data4, options4);
	chart4Mob.draw(data4, options4);
	//chart2[e]
}


function drawTrendChart(data) {
//	console.log("drawTrendChart data",data);

	var dataArr1 = [];//가맹점 및 직영점 추이
	var dataArr2 = [];//가맹점 평균 매출액 추이
	var dataArr3 = [];//종사자 수 추이
	var dataArr4 = [];// 거주인구수 추이

	dataArr1.push(['', '가맹점', '직영점'])
	dataArr2.push(['', '평균 매출액'])
	dataArr3.push(['', '종사자 수'])
	dataArr4.push(['', '거주인구 수'])


	data.dataList.forEach(function(row,idx){
		if(idx > 0 && row.mrhstCo == null || row.droperCo == null) {
			dataArr1.push([row.stdrYear, Number(data.dataList[idx- 1].mrhstCo), Number(data.dataList[idx- 1].droperCo) ]);
		} else {			
			dataArr1.push([row.stdrYear, Number(row.mrhstCo), Number(row.droperCo) ]);
		}
		
		if(idx > 0 && row.avrgSelngAm == null) {
			dataArr2.push([row.stdrYear, Number(data.dataList[idx- 1].avrgSelngAm) ]);
		} else {			
			dataArr2.push([row.stdrYear, Number(row.avrgSelngAm) ]);
		}
		
		if(idx > 0 && row.enfsnCo == null) {
			dataArr3.push([row.stdrYear, Number(data.dataList[idx- 1].enfsnCo) ]);
		} else {			
			dataArr3.push([row.stdrYear, Number(row.enfsnCo) ]);
		}
		
		if(idx > 0 && row.residePopltnCo.toFixed(2) == null) {
			dataArr4.push([row.stdrYear, Number(data.dataList[idx- 1].residePopltnCo.toFixed(2)) ]);
		} else {			
			dataArr4.push([row.stdrYear, Number(row.residePopltnCo.toFixed(2)) ]);
		}
	});
	var widthValue = '95%';
	var widthValue2 = '90%';
	//console.log("data.dataList.length:"+data.dataList.length);

	if(data.dataList.length == 2) {
		widthValue = '80%';
		widthValue2 = '65%';
	} else if(data.dataList.length == 1)  {
		widthValue = '65%';
		widthValue2 = '40%';
	}

	var options = {
			title: '',
			//curveType: 'function',
			legend: { position: 'none' },
			colors: ['#fcc710', '#67706d'],
			bar: {groupWidth: widthValue},
			// 정상작동
			animation: {
				startup: true,
				duration : 2000,
				easing : 'inAndOut'
			},
//			, vAxis: {minValue:0, maxValue:1000}
	};
	var options2 = {
			title: '',
			//curveType: 'function',
			legend: { position: 'none' },
			colors: ['#fcc710', '#67706d'],
			bar: {groupWidth: widthValue2},
			// 정상작동
			animation: {
				startup: true,
				duration : 2000,
				easing : 'inAndOut'
			},
//			, vAxis: {minValue:0, maxValue:1000}
	};

	var data1 = google.visualization.arrayToDataTable(dataArr1);
	var data2 = google.visualization.arrayToDataTable(dataArr2);
	var data3 = google.visualization.arrayToDataTable(dataArr3);
	var data4 = google.visualization.arrayToDataTable(dataArr4);
	var chart1 = null;
	var chart1Mob = null;
//	if(data.dataList.length > 1){
//		chart1 = new google.visualization.LineChart(document.getElementById('trend1'));
//		chart2 = new google.visualization.LineChart(document.getElementById('trend2'));
//		chart3 = new google.visualization.LineChart(document.getElementById('trend3'));
//		chart4 = new google.visualization.LineChart(document.getElementById('trend4'));
//	}else{
		chart1 = new google.visualization.ColumnChart(document.getElementById('trend1'));
		chart2 = new google.visualization.ColumnChart(document.getElementById('trend2'));
		chart3 = new google.visualization.ColumnChart(document.getElementById('trend3'));
		chart4 = new google.visualization.ColumnChart(document.getElementById('trend4'));
		
		chart1Mob = new google.visualization.ColumnChart(document.getElementById('trend1Mob'));
		chart2Mob = new google.visualization.ColumnChart(document.getElementById('trend2Mob'));
		chart3Mob = new google.visualization.ColumnChart(document.getElementById('trend3Mob'));
		chart4Mob = new google.visualization.ColumnChart(document.getElementById('trend4Mob'));
//	}
	
	chart1.draw(data1, options);
	chart2.draw(data2, options2);
	chart3.draw(data3, options2);
	chart4.draw(data4, options2);
	
	chart1Mob.draw(data1, options);
	chart2Mob.draw(data2, options2);
	chart3Mob.draw(data3, options2);
	chart4Mob.draw(data4, options2);
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
