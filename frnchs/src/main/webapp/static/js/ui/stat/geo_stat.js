
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
//		center = [37.56612108152582, 126.99772489094873];
		center = [36.3812108152582, 127.51094873];

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
	// 만료일 : 2022-10-13  [ 인증키 연장 횟수 : 총 3회 중2회 진행 ]
	var baseMap1 = 
//		new L.TileLayer( "http://api.vworld.kr/req/wmts/1.0.0/6E08DC47-0F44-3E88-9EAF-0F88670AE156/Base/{z}/{y}/{x}.png", 
		new L.TileLayer( "http://api.vworld.kr/req/wmts/1.0.0/F82CA2FE-E955-38D0-9AD0-8BAB22BC67AB/Base/{z}/{y}/{x}.png",
	{
		minZoom : 6 ,
		maxZoom : 18 ,
		continuousWorld: true,
		subdomains: '0123',
		continuousWorld: true,
		tms: false
	});

	map.addLayer(baseMap1);

	return map;
};

var populMap = null;
var cardMap = null;

(function() {
	populMap = fncCreateMap("map1", false, 1);
	cardMap = fncCreateMap("map2", false, 1);
})()


//1번주소
const POPUL_URL = gPopulUrl;

//2번주소
const CARD_URL = gCardUrl;
var populObj = {};
var cardObj = {};
var globalGrade = [];

//GEOSJON넣기
$.get(POPUL_URL).done(function(data){
	//console.log("popul data",data);
	data = converJson(data);
	populObj = data;
}).done(function(data){

	var param = {};
	param.id = "popul";
	param.year = $("[name=brandYear]").val(); // 2019 고정값에서 변경 -21.05.06
	fnGetAjaxData("/fran/selectLegendInfo2.ajax", param, function(_data) {
		//console.log("이게 범례데이터",_data);
		globalGrade = [];
		_data.legendList.forEach(function(row,idx){
			if( idx != 0 ){//첫번째 범례 데이터가 이상함 왜 0이 있고 데이터가 이상하게 큰지모르겠음
				globalGrade.push( numberWithCommas(row.min.toFixed(0)) );
			}
		});
		//console.log("이게 채워진 범례",globalGrade);
		showPolygon("popul");
	});
}).fail(function(data){
	//console.log("Fail to load\nError code: "+ data);
});

$.get(CARD_URL).done(function(data){
	//console.log("card data",data);
	data = converJson(data);
	cardObj = data;
}).done(function(data){
	var param = {};
	param.id = "card";
	param.year = $("[name=brandYear]").val(); // 2019 고정값에서 변경 -21.05.06
	param.job = "Z0";
	fnGetAjaxData("/fran/selectLegendInfo2.ajax", param, function(_data) {
		//console.log("이게 범례데이터",_data);
		globalGrade = [];
		_data.legendList.forEach(function(row,idx){
			globalGrade.push( numberWithCommas(row.min.toFixed(0)) );
		});
		//console.log("이게 채워진 범례",globalGrade);
		showPolygon("card");
	});
}).done(function(data){
	//drawCharts();
}).fail(function(data){
	//console.log("Fail to load\nError code: "+ data);
});


//////////////////레이어 관련덜////////////////


function showPolygon(flag){
	if( flag == "popul" ){

		populMap.eachLayer(function (layer) {
			if( layer._leaflet_id != '19')
				populMap.removeLayer(layer);
		});

		$(".leaflet-pane.leaflet-overlay-pane").eq(0).empty();
		$(".leaflet-top.leaflet-right").eq(0).empty();
		$(".leaflet-bottom.leaflet-left").eq(0).empty();
	}else{

//		cardMap.eachLayer(function (layer) {
//			if( layer._leaflet_id != '28')
//			cardMap.removeLayer(layer);
//		});

		$(".leaflet-pane.leaflet-overlay-pane").eq(1).empty();
		$(".leaflet-top.leaflet-right").eq(1).empty();
		$(".leaflet-bottom.leaflet-left").eq(1).empty();
	}

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
			mouseout: resetHighlight
//			,
//			click: zoomToFeature
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
//				fillColor: getColor(feature.properties.dynmc_popltn_co_grad)
//				fillColor: getColor(feature.properties.worker_co_grad)
				fillColor: getColorSido(feature.properties.worker_co_grad)
			};
		}else{
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7,
//				fillColor: getColor(feature.properties.selng_am_grad)
				fillColor: getColor(feature.properties.selng_revn_grad)
			};

		}

	}

	function getColor(d) {
		return d > 5 ? '#800026' :
				d == 5  ? '#BD0026' :
				d == 4  ? '#E31A1C' :
				d == 3  ? '#FC4E2A' :
				d == 2   ? '#FD8D3C' :
				d == 1   ? '#FEB24C' :
							'#FFEDA0';
	}
	
	function getColorSido(d) {
		return d > 5 ? '#005590' :
				d == 5  ? '#005b96' :
				d == 4  ? '#2c79b7' :
				d == 3  ? '#0067a3' :
				d == 2   ? '#4a7eb2' :
				d == 1   ? '#97b0d1' :
							'#dce4f0';
	}

	//인포 관련?[s]
	var info = L.control('map');

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', null);
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {

		if( flag == "popul" ){

			this._div.innerHTML = (props ?
//					'<b>' + props.signgu_nm + '</b><br />' + numberWithCommas(props.dynmc_popltn_co) + ' (명)'
					'<b>' + props.ctprvn_nm + '</b><br />' + numberWithCommas(props.worker_co) + ' (명)'
					: '원하는 지역에 마우스를 올리세요.');
		}else{
			this._div.innerHTML = (props ?
//					'<b>' + props.signgu_nm + '</b><br />' + numberWithCommas(props.selng_am) + ' (원)'
					'<b>' + props.ctprvn_nm + '</b><br />' + numberWithCommas(props.selng_revn) + ' (천원)'
					: '원하는 지역에 마우스를 올리세요.');

		}
	};


	if( flag == "popul" ){
		info.addTo(populMap);
	}else{
		info.addTo(cardMap);
	}

	//인포 관련?[e]
	if( flag == "popul" ){
		geojson = L.geoJson(populObj, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(populMap);
	}else{
		geojson = L.geoJson(cardObj, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(cardMap);
	}


	var legend = L.control({position: 'bottomleft'});

	legend.onAdd = function (map) {
		//console.log("이시점에 있나",globalGrade);
			var div = L.DomUtil.create('div', 'info legend'),
			grades = globalGrade,
			labels = [],
			from, to;

			if( flag == "popul" ){
				for (var i = 0; i < grades.length; i++) {
					from = grades[i];
					to = grades[i + 1];

					labels.push(
						'<i style="background:' + getColorSido(Number(i+1)) + '"></i> ' +
						from + (to ? '&ndash;' + to : '+'));
				}
			}else {
				for (var i = 0; i < grades.length; i++) {
					from = grades[i];
					to = grades[i + 1];

					labels.push(
						'<i style="background:' + getColor(Number(i+1)) + '"></i> ' +
						from + (to ? '&ndash;' + to : '+'));
				}
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

	if( flag == "popul" ){
		legend.addTo(populMap);
	}else{
		legend.addTo(cardMap);
	}

}

// json 파싱 방법 변경 - 21.04.12, 21.05.11
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

