google.charts.load('current', {'packages':['corechart','bar'],'callback':drawChart});

var globalParam = {};
globalParam = opener.sendParam();
if( !globalParam.frnchsNo ){
	alert('비정상접근입니다.');
	window.close();
}

var globalGrade = [];

var sidoObj = {
	"11":{latlng:[37.55,127],zoom:11},
	"26":{latlng:[35.17,129.1],zoom:11},
	"27":{latlng:[35.84,128.6],zoom:11},
	"28":{latlng:[37.53,126.71],zoom:11},
	"29":{latlng:[35.17,126.87],zoom:11},
	"30":{latlng:[36.34,127.43],zoom:11},
	"31":{latlng:[35.54,129.3],zoom:11},
	"36":{latlng:[36.49,127.32],zoom:11},
	"41":{latlng:[37.39,126.93],zoom:9.5},
	"42":{latlng:[37.75,128.3],zoom:9},
	"43":{latlng:[36.76,127.5],zoom:9},
	"44":{latlng:[36.6,126.8],zoom:9},
	"45":{latlng:[35.8,127.26],zoom:9},
	"46":{latlng:[34.9,126.89],zoom:9},
	"47":{latlng:[36.34,128.84],zoom:9},
	"48":{latlng:[35.1,128.29],zoom:9},
	"50":{latlng:[33.41,126.54],zoom:10},
};

/*
 * objMap.setView([33.41,126.54],10)//제주
 * objMap.setView([34.9,126.89],9)//전남
 * objMap.setView([35.8,127.26],9)//전북
 * objMap.setView([35.1,128.29],9)//경남
 * objMap.setView([36.6,126.8],9)//충남
 * objMap.setView([36.76,127.5],9)//충북
 * objMap.setView([36.49,127.32],11)//세종
 * objMap.setView([36.34,127.43],11)//대전
 * objMap.setView([37.39,126.93],9.5)//경기
 * objMap.setView([37.53,126.71],11)//인천
 * objMap.setView([37.55,127],11)//서울
 * objMap.setView([37.75,128.3],9)//강원
 * objMap.setView([36.34,128.84],9)//경북
 * objMap.setView([35.17,126.87],11)//광주
 * objMap.setView([35.17,129.1],11)//부산
 * objMap.setView([35.54,129.3],11)//울산
 * objMap.setView([35.84,128.6],11)//대구
 */


//console.log("이게 가져온파람인데",globalParam);

$( "#datepicker" ).monthpicker({
	pattern: 'yyyy-mm',
	selectedYear:2020,
//	selectedYear:2021,
	startYear:2017,
	finalYear:2020,
//	finalYear:2021,
	monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
});
$( "#datepicker" ).val("2020-01")
//$( "#datepicker" ).val("2021-01")

$( "#datepickerMob" ).monthpicker({
	pattern: 'yyyy-mm',
	selectedYear:2020,
//	selectedYear:2021,
	startYear:2017,
	finalYear:2020,
//	finalYear:2021,
	monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
});
$( "#datepickerMob" ).val("2020-01")
//$( "#datepickerMob" ).val("2021-01")

function fncCreateMap(divId, center, zoom) {
	var db_srs = 'EPSG:5181';
	var db_crs = new L.Proj.CRS(
		'EPSG:5181',
		'+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
		{
			resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2,
				1, 0.5, 0.25],
			origin: [-30000, -60000],
			bounds: L.bounds([-30000, -60000], [494288, 988576])
		});

	if (!zoom)
		zoom = 18;

	if (!center)
		center = [37.56612108152582, 126.99772489094873];

	var mapOption = {
		continuousWorld: true,
		worldCopyJump: false,
		attributionControl: false,
		zoomControl: false,
		zoomAnimation: true
	};

	mapOption.crs = L.CRS.EPSG3857;

	var zoomLevel = zoom;

	var map = L.map(divId, mapOption).setView(center, zoomLevel);
	
	// 브이월드(VWorld) 오픈 API 개발 인증키(운영키) 발급 필요(3개월마다 연장 필요, 최대 3회 연장 가능)
	// ttps://www.vworld.kr/dev/v4api.do
	// 만료일 : 2022-10-13  [ 인증키 연장 횟수 : 총 3회 중 2회 진행 ]
	var baseMap1 = 
//		new L.TileLayer( "http://api.vworld.kr/req/wmts/1.0.0/6E08DC47-0F44-3E88-9EAF-0F88670AE156/Base/{z}/{y}/{x}.png",
		new L.TileLayer( "http://api.vworld.kr/req/wmts/1.0.0/F82CA2FE-E955-38D0-9AD0-8BAB22BC67AB/Base/{z}/{y}/{x}.png",
	{
		minZoom : 8 ,
		maxZoom : 18 ,
		continuousWorld: true,
		subdomains: '0123',
		continuousWorld: true,
		tms: false,
		zoomControl: true
	});


	map.addLayer(baseMap1);

	L.control.zoom({
		position:'topright'
	}).addTo(map);

	L.control.polylineMeasure().addTo(map);


	return map;
};

var objMap = null;

(function() {
	objMap = fncCreateMap("map1", false, 10);
	// 전체거나 값이 없을때 서울 줌 - 21.02.16
	if(!isNaN(globalParam.ctprvnCode) && !!globalParam.ctprvnCode && globalParam.ctprvnCode != "00" ) {
		objMap.setView(sidoObj[globalParam.ctprvnCode].latlng, sidoObj[globalParam.ctprvnCode].zoom);
	} else {
		objMap.setView(sidoObj[11].latlng, sidoObj[11].zoom);
	}

})()


/////////////////////////geojson가져오기////////s/////////////////////


var dataObj = {};

//유동인구(연월, 동)
const POPUL_BLK_URL = gPopulBlkUrl;

//카드(연월, 업종, 동)
const CARD_BLK_URL  = gCardBlkUrl;

//과밀도(연, 업종, 동)
const OVPOP_BLK_URL = gOvpopBlkUrl;


//GEOSJON넣기
$.get(POPUL_BLK_URL).done(function(data){
	//console.log("popul data",data);
	data = converJson(data);
	dataObj = data;
}).fail(function(data){
	//console.log("Fail to load\nError code: "+ data);
});


/////////////////////////geojson가져오기////////e/////////////////////

function updateObj(id,param){

	var url = "";
	var paramStr = "&VIEWPARAMS=";
	var paramUrl = "";

	//console.log("id",id);
	//console.log("param",param);

	if( ~id.indexOf("popltn") ){
		url = POPUL_BLK_URL;
	}else if( ~id.indexOf("card") ){
		url = CARD_BLK_URL;
	}else{
		url = OVPOP_BLK_URL;
	}

	var keys = Object.keys(param);

	for ( var i in keys ) {
		paramStr += (keys[i] + ":" + param[keys[i]] + ";");
	}
	paramUrl = url+paramStr;


	$.get(paramUrl).done(function(data){
		data = converJson(data);
		dataObj = data;
	}).done(function(data){
		console.log("===");
		param.job = param.mlsfc_induty_code;
		param.id = id;
		fnGetAjaxData("/fran/selectLegendInfo.ajax", param, function(_data) {
			//console.log("이게 범례데이터",_data);
			globalGrade = [];
			_data.legendList.forEach(function(row,idx){

				if( ~id.indexOf("popltn") ){
					globalGrade.push( numberWithCommas(row.min.toFixed(0)) );
				}else if( ~id.indexOf("card") ){
					globalGrade.push( numberWithCommas(row.min.toFixed(0)) );
				}else{
					globalGrade.push( row.ovpopGrad );
				}



			});
			//console.log("이게 채워진 범례",globalGrade);
			data = converJson(data);
			
			if( data.features.length == 0 ){
				alert("해당 지역 데이터가 없습니다.");
				return false;
			}


				if( ~id.indexOf("popltn") ){
					showPolygon("popul");
				}else if( ~id.indexOf("card") ){
					showPolygon("card");
				}else{
					showPolygon("ovpop");
				}



		});

	}).fail(function(data){
		//console.log("Fail to load\nError code: "+ data);
	});




}

function search(id){
	var param = {};

	//obj바꾸고
	//그리기
	if( ~id.indexOf("ovpop") ){
		param.year = $(".year").val().substring(0,4);//'2020';
	}else{
		param.year = $(".year").val().replace("-","");//'201901';
	}

	param.dong = $(".dong").val();//'41113650';
	param.mlsfc_induty_code = $(".mdClass").val();//"A1";

	//console.log("검색파람",param);

	if( !param.year ){
		alert("날짜를 선택해주세요.");
		return false;
	}
	if( !param.dong ){
		alert("동 단위까지 선택해주세요.");
		return false;
	}
	if( !param.mlsfc_induty_code ){
		alert("중분류 업종까지 선택해주세요.");
		return false;
	}

	updateObj(id,param);
}

function searchMob(id){
	var param = {};

	//obj바꾸고
	//그리기
	if( ~id.indexOf("ovpop") ){
		param.year = $(".year").val().substring(0,4);//'2020';
	}else{
		param.year = $(".year").val().replace("-","");//'201901';
	}

	param.dong = $(".dong").val();//'41113650';
	param.mlsfc_induty_code = $("#mdClassMob").val();//"A1";

	//console.log("검색파람",param);

	if( !param.year ){
		alert("날짜를 선택해주세요.");
		return false;
	}
	if( !param.dong ){
		alert("동 단위까지 선택해주세요.");
		return false;
	}
	if( !param.mlsfc_induty_code ){
		alert("중분류 업종까지 선택해주세요.");
		return false;
	}

	updateObj(id,param);
	return true;
}

function showPolygon(flag){

	objMap.eachLayer(function (layer) {
		if( layer._leaflet_id != '19')
			objMap.removeLayer(layer);
	});

//	$(".leaflet-pane.leaflet-overlay-pane").eq(0).empty();
//	$(".leaflet-top.leaflet-right").eq(0).empty();
//	$(".leaflet-bottom.leaflet-left").eq(0).empty();
	$(".info.leaflet-control").remove();

	//console.log("showPolygon flag : " + flag);
	var geojson;

	//eachFeature관련[s]
	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}
	//eachFeature관련[e]

	function style(feature) {

		if( flag == "popul" ){

			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.dynmc_popltn_co_grad)
			};
		}else if( flag == "card" ){
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.selng_am_grad)
			};

		}else{
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.ovpop_grad)
			};
		}

	}


	function getColor(d) {
		return  d == 5  ? '#BD0026' :
				d == 4  ? '#E31A1C' :
				d == 3  ? '#FC4E2A' :
				d == 2   ? '#FD8D3C' :
				d == 1   ? '#FEB24C' :
							'#FFEDA0';
	}


	//인포 관련?[s]
	var info = L.control('map');

	info.onAdd = function (map) {
		//console.log("info.onAdd");
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {

		if( flag == "popul" ){
			this._div.innerHTML = (props ?
					'<b>유동인구</b><br />' + numberWithCommas(props.dynmc_popltn_co) + ' (명)'
					: '원하는 지역에 마우스를 올리세요.');
		}else if( flag == "card" ){
			this._div.innerHTML = (props ?
					'<b>카드매출</b><br />' + numberWithCommas(props.selng_am) + ' (원)'
					: '원하는 지역에 마우스를 올리세요.');
		}else{
			this._div.innerHTML = (props ?
					'<b>점포과밀도</b><br />' + numberWithCommas(props.ovpop_value)
					: '원하는 지역에 마우스를 올리세요.');
		}

	};


	info.addTo(objMap);

	//인포 관련?[e]
	geojson = L.geoJson(dataObj, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(objMap);


	var legend = L.control({position: 'bottomleft'});

	legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend'),
		grades = globalGrade,
		labels = [],
		from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(Number(i+1)) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(objMap);

	objMap.fitBounds(geojson.getBounds());

}



function drawChart(){

	globalParam.b_year = Number(globalParam.year) -2 + "";

	//2. 대분류 중분류 세팅
	fnGetAjaxData("/fran/selectDensityInfo.ajax", globalParam, function(_data) {

//		console.log("점포과밀도..",_data);

		//기본정보
		_data.frchsList.forEach(function(row,idx){

			for(var key in row){
				if( row[key] != null ){
					if(key == "yearTxt"){
						$(".d_"+key).text(row[key]);
					}else{
						$(".d_"+key).text(numberWithCommas(row[key]));
					}
				}
			}

			if($(document).width() <= 687) {//mobile
				$("#frnchsNo").val(row.frnchsNo);
				$(".d_bsnSgnal").parent().find("button").attr("id", row.frnchsNo);
				if( row.deleteAt == "N"){
					$(".d_bsnSgnal").parent().find("button").addClass("selected");
				}
	    	} else {//pc
	    		$("#frnchsNo").val(row.frnchsNo);
	    		$(".d_bsnSgnal").next("div").find("a").attr("id", row.frnchsNo);
	    		/*$(".d_bsnSgnal").next("div").find("a").attr("id", row.frnchsNo);*/
				if( row.deleteAt == "N"){
					$(".d_bsnSgnal").parent().find(".gRt").find("a").addClass("selected");
				}
	    	}
		});

		$(".d_closeRate").text(globalParam.closeRate);

		//평균매출액 추이, 가맹점 수 추이
		var data1 = [];
		data1.push(['','평균매출액']);
		for( var i=0; i< _data.frchsTrend.length; i++ ){
			data1.push([_data.frchsTrend[i].year,Number(_data.frchsTrend[i].avrgSelngAm) ]);
		}

//		var data2 = [];
//		data2.push(['','가맹점 수']);
//		for( var i=0; i< _data.frchsTrend.length; i++ ){
//			data2.push([_data.frchsTrend[i].year,Number(_data.frchsTrend[i].mrhstCo) ]);
//		}

		var options = {
			title: '',
			legend: { position: 'bottom' }
		};

		var chartData1 = google.visualization.arrayToDataTable(data1);
//		var chartData2 = google.visualization.arrayToDataTable(data2);

		var chart1 = new google.visualization.ColumnChart(document.getElementById('year_chart1'));
		var chartMob1 = new google.visualization.ColumnChart(document.getElementById('year_chartMob1'));
//		var chart2 = new google.visualization.LineChart(document.getElementById('year_chart2'));

		chart1.draw(chartData1, options);
		chartMob1.draw(chartData1, options);
//		chart2.draw(chartData2, options);
		//지표 채우기
		// 공정성 5개 만점에서 3개로 변경 - 21.03.16
		// 공정성 칸은 5개 지만 만점 3개 - 21.03.18
		$("span.prftblGrad").empty();
		if(_data.frchsList.length > 0){
			for(var i=0; i<5; i++){
				if( i < Number(_data.frchsList[0].prftblGrad) ){
					$("span.prftblGrad").append('<span style="background-color:#f8a80f;"></span>');
				}else{
					$("span.prftblGrad").append('<span></span>');
				}
			}

			$("span.fairGrad").empty();
			for(var i=0; i<5; i++){
				if( i < Number(_data.frchsList[0].fairGrad) ){
					$("span.fairGrad").append('<span style="background-color:#e67c97;"></span>');
				}else{
					$("span.fairGrad").append('<span></span>');
				}
			}

			$("span.growthGrad").empty();
			for(var i=0; i<5; i++){
				if( i < Number(_data.frchsList[0].growthGrad) ){
					$("span.growthGrad").append('<span style="background-color:#3c7ce6;"></span>');
				}else{
					$("span.growthGrad").append('<span></span>');
				}
			}

			$("span.safeGrad").empty();
			for(var i=0; i<5; i++){
				if( i < Number(_data.frchsList[0].safeGrad) ){
					$("span.safeGrad").append('<span style="background-color:#55ba50;"></span>');
				}else{
					$("span.safeGrad").append('<span></span>');
				}
			}
		}


		$(".iFavor").off("click").on("click",function(e){
			e.preventDefault();

			var param = {};
			param.frnchsNo = $("#frnchsNo").val();
			$(".iFavor").attr("id", $("#frnchsNo").val() );
			param.id = $(".iFavor").attr("id");
			var confirmMsg = "";

			if( $(this).hasClass("selected") ){

				param.flag = 'Y'
				confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
			}else{
				param.flag = 'N'
				confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
			}

			if( confirm(confirmMsg) ){
				intrstFrnchsCompare(param);
			}else{
				return false;
			}


		});
		
		$(".favorite").off("click").on("click",function(e){
			e.preventDefault();
			
			var param = {};
			param.frnchsNo = $("#frnchsNo").val();
			$(".favorite").attr("id", $("#frnchsNo").val()+"Mob" );
			param.id = $(".favorite").attr("id");
			var confirmMsg = "";
			
			if( $(this).hasClass("selected") ){
				
				param.flag = 'Y'
					confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
			}else{
				param.flag = 'N'
					confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
			}
			
			if( confirm(confirmMsg) ){
				intrstFrnchsCompare(param);
			}else{
				return false;
			}
			
			
		});


	})
}

function converJson(obj) {
	//console.log("data url",paramUrl);
	if( Object.prototype.toString.call(obj) === "[object JSON]"){
		//value_Json가 json
		console.log("json");
	} else{
	  //value_Json가 json X
		obj = JSON.parse(obj);
		console.log("json x");
	}
	
	return obj;
}

$(document).ready(function() {

	//2. 대분류 중분류 세팅
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {

		//console.log("업종",_data);
		_data.franchLclasList.forEach(function(row,idx){
			$(".ldClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
		});
		//좋은데이터를 보여주기위한 임시코드
		$(".ldClass option:eq(1)").prop("selected", true);
		$(".mdClass").empty();
		$(".mdClass").append('<option value="Z0">전체</option>');
		
		fnGetAjaxData("/comcode/selectSignguRelmList.ajax", {ctprvnCode:'11'}, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				$("#signguPc").empty();
				$("#signguPc").append('<option value="">- 선 택 -</option>');

				$("#dongPc").empty();
				$("#dongPc").append('<option value="">- 선 택 -</option>');
				
				_data.signguRelmList.forEach(function(row,idx){
					if(row.signguCode == "11680"){
						$("#signguPc").append('<option value="' + row.signguCode + '" selected>' + row.signguNm + '</option>');
					}else{						
						$("#signguPc").append('<option value="' + row.signguCode + '">' + row.signguNm + '</option>');
					}
				});
			}
		});
		fnGetAjaxData("/comcode/selectAdstrdRelmList.ajax", {signguCode:'11680'}, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				$("#dongPc").empty();
				$("#dongPc").append('<option value="">- 선 택 -</option>');
				_data.adstrdRelmList.forEach(function(row,idx){
					if(row.adstrdCode == "11680510"){
						$("#dongPc").append('<option value="' + row.adstrdCode + '" selected>' + row.adstrdNm + '</option>');
					}else{						
						$("#dongPc").append('<option value="' + row.adstrdCode + '">' + row.adstrdNm + '</option>');
					}
				});
			}
		});

		$(".ldClass").off("change").on("change",function(e){

			$(".mdClass").empty();
			$(".mdClass").append('<option value="">- 선 택 -</option>');

			var selectedVal = $('.ldClass:visible').val();
			$(".ldClass").val( selectedVal );
			fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {

				_data.frnchsMlsfcList.forEach(function(row,idx){
					$(".mdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
				});

			});
		});

	});
	
	//3. 시도 세팅
	fnGetAjaxData("/comcode/selectCtprvnRelmList.ajax", {}, function(_data) {

		//console.log("시도",_data);
		if(_data.resultCode == RESULT_SUCCESS){

			$("#sidoPc").empty();
			$("#sidoPc").append('<option value="" selected disabled hidden>시/도</option>');
			$("#sidoPc").append('<option value="">- 선 택 -</option>');

			_data.ctprvnRelmList.forEach(function(row,idx){
				if(row.ctprvnCode != "00"){					
					if(row.ctprvnCode == "11"){
						$("#sidoPc").append('<option value="' + row.ctprvnCode + '" selected>' + row.ctprvnNm + '</option>');
					}else{
						$("#sidoPc").append('<option value="' + row.ctprvnCode + '">' + row.ctprvnNm + '</option>');
					}
				}
			});

			//4. 시군구 세팅
			$("#sidoPc").off("change").on("change",function(e){
				fnGetAjaxData("/comcode/selectSignguRelmList.ajax", {ctprvnCode:$("#sidoPc").val()}, function(_data) {

//					console.log("시군구",_data);
					if(_data.resultCode == RESULT_SUCCESS){
						$("#signguPc").empty();
						$("#signguPc").append('<option value="">- 선 택 -</option>');

						$("#dongPc").empty();
						$("#dongPc").append('<option value="">- 선 택 -</option>');
						
						_data.signguRelmList.forEach(function(row,idx){					
							$("#signguPc").append('<option value="' + row.signguCode + '">' + row.signguNm + '</option>');
						});


						//5. 읍면동 세팅
						$("#signguPc").off("change").on("change",function(e){
							fnGetAjaxData("/comcode/selectAdstrdRelmList.ajax", {signguCode:$("#signguPc").val()}, function(_data) {

								//console.log("읍면동",_data);
								if(_data.resultCode == RESULT_SUCCESS){
									$("#dongPc").empty();
									$("#dongPc").append('<option value="">- 선 택 -</option>');
									/*if($(".signgu option:selected").val() == "00000"){
										$(".dong").append('<option value="00000000">전체</option>');
									}*/
									_data.adstrdRelmList.forEach(function(row,idx){					
										$("#dongPc").append('<option value="' + row.adstrdCode + '">' + row.adstrdNm + '</option>');
									});
								}

							})
						});//읍면동[e]
					}
				});


				objMap.setView(sidoObj[$("#sidoPc").val()].latlng,sidoObj[$("#sidoPc").val()].zoom);


			});//시군구[e]
			
			//이미 세팅되어 있을 때 - 읍면동 세팅 변경 
			$("#signguPc").off("change").on("change",function(e){
				fnGetAjaxData("/comcode/selectAdstrdRelmList.ajax", {signguCode:$("#signguPc").val()}, function(_data) {

					//console.log("읍면동",_data);
					if(_data.resultCode == RESULT_SUCCESS){
						$("#dongPc").empty();
						$("#dongPc").append('<option value="">- 선 택 -</option>');
						/*if($(".signgu option:selected").val() == "00000"){
							$(".dong").append('<option value="00000000">전체</option>');
						}*/
						_data.adstrdRelmList.forEach(function(row,idx){					
							$("#dongPc").append('<option value="' + row.adstrdCode + '">' + row.adstrdNm + '</option>');
						});
					}

				})
			});//읍면동[e]
			
			$("#sidoMob").empty();
			$("#sidoMob").append('<option value="" selected disabled hidden>시/도</option>');
			$("#sidoMob").append('<option value="">- 선 택 -</option>');
			_data.ctprvnRelmList.forEach(function(row,idx){
				if(row.ctprvnCode != "00"){
					$("#sidoMob").append('<option value="' + row.ctprvnCode + '">' + row.ctprvnNm + '</option>');
				}
			});

			
			//4.모바일 시군구 세팅
			$("#sidoMob").off("change").on("change",function(e){
				fnGetAjaxData("/comcode/selectSignguRelmList.ajax", {ctprvnCode:$("#sidoMob").val()}, function(_data) {
					
//					console.log("시군구",_data);
					if(_data.resultCode == RESULT_SUCCESS){
						$("#signguMob").empty();
						$("#signguMob").append('<option value="">- 선 택 -</option>');
						
						$("#dongMob").empty();
						$("#dongMob").append('<option value="">- 선 택 -</option>');
						
						_data.signguRelmList.forEach(function(row,idx){
							$("#signguMob").append('<option value="' + row.signguCode + '">' + row.signguNm + '</option>');
						});
						
						
						//5. 읍면동 세팅
						$("#signguMob").off("change").on("change",function(e){
							fnGetAjaxData("/comcode/selectAdstrdRelmList.ajax", {signguCode:$("#signguMob").val()}, function(_data) {
								
								//console.log("읍면동",_data);
								if(_data.resultCode == RESULT_SUCCESS){
									$("#dongMob").empty();
									$("#dongMob").append('<option value="">- 선 택 -</option>');
									/*if($(".signgu option:selected").val() == "00000"){
										$(".dong").append('<option value="00000000">전체</option>');
									}*/
//									console.log(_data.adstrdRelmList);
									_data.adstrdRelmList.forEach(function(row,idx){
										$("#dongMob").append('<option value="' + row.adstrdCode + '">' + row.adstrdNm + '</option>');
									});
								}
								
							})
						});//읍면동[e]
					}
				});
				
				
			});//시군구[e]
		}
	});//시도[e]
	setTimeout(function() {
		$(".searchBtn").click();
	}, 300);

	$(".searchBtn").off("click").on("click",function(e){

		search($("div.layer a.selected").attr("id"));
	});

	$("div.layer a").off("click").on("click",function(e){

		$("div.layer a").removeClass("selected");
		$(this).addClass("selected");

		search($(this).attr("id"));

	});
	
//	$(".searchMobBtn").click(function(){
//		var isResult = searchMob($("div.layer a.selected").attr("id"));
//		if(isResult) {
//			stepView(1);
//		}
//	});


});
