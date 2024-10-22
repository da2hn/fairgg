
//1번주소
const GEO_JSON_VECTOR_TILE = "http://192.168.0.237:18080/geoserver/ggfran/wms?service=WMS&version=1.1.0&request=GetMap&layers=ggfran%3Afrc_dynmc_popltn_signgu&bbox=126.514564526998%2C36.8935327413069%2C127.849469636744%2C38.2832470918473&width=737&height=768&srs=EPSG%3A4326&format=geojson";

//2번주소
const GEO_JSON = "http://192.168.0.237:18080/geoserver/ggfran/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ggfran%3Afrc_dynmc_popltn_signgu&maxFeatures=50&outputFormat=application%2Fjson";
var obj1 = {};
var obj2 = {};


$.get(GEO_JSON_VECTOR_TILE).done(function(data){
	console.log("data1",data);
	var spot = data;
	obj1 = spot;
}).fail(function(data){
	console.log("Fail to load\nError code: "+ data);
});

$.get(GEO_JSON).done(function(data){
	console.log("data2",data);
	var spot = data;
	obj2 = spot;
}).fail(function(data){
	console.log("Fail to load\nError code: "+ data);
});
	

//////////////////레이어 관련덜////////////////

	setTimeout(function(){
		
		console.log("obj1",obj1);
		console.log("obj2",obj2);
		
		//get color depending on population density value
		function getColor(d) {
			return d > 6 ? '#800026' :
					d == 6  ? '#BD0026' :
					d == 5  ? '#E31A1C' :
					d == 4  ? '#FC4E2A' :
					d == 3   ? '#FD8D3C' :
					d == 2   ? '#FEB24C' :
					d == 1   ? '#FED976' :
								'#FFEDA0';
		}
		
		function style(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.dynmc_popltn_co_grad)
			};
		}
		
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
		
		/*var geojson;
		
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
		}*/
		
		var map = L.map('map2').setView([37.52470808242787, 14129046.928310394],8);
//		L.tileLayer("http://api.vworld.kr/req/wmts/1.0.0/6E08DC47-0F44-3E88-9EAF-0F88670AE156/Base/{z}/{y}/{x}.png", {
//			maxZoom: 18,
//			attribution: 'vworld',
//			id: 'mymap',
//			tileSize: 512,
//			zoomOffset: -1
//		}).addTo(map);
		L.tileLayer("http://api.vworld.kr/req/wmts/1.0.0/6E08DC47-0F44-3E88-9EAF-0F88670AE156/Base/{z}/{y}/{x}.png").addTo(map);
		
		// control that shows state info on hover
		var info = L.control('map');
		
		info.onAdd = function (map) {
			console.log("info.onAdd");
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};
		
		info.update = function (props) {
			console.log("info.update");
			this._div.innerHTML = '유동인구' +  (props ?
				'<b>' + props.signgu_nm + '</b><br />' + props.dynmc_popltn_co_grad + ' people / mi<sup>2</sup>'
				: '뭐');
		};
		
		info.addTo(map);
		
		geojson = L.geoJson(obj2, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);
		
		console.log("이건디",geojson);
		
		map.attributionControl.addAttribution('myattr');
		
		
		var legend = L.control({position: 'bottomleft'});
		
		legend.onAdd = function (map) {
		
			var div = L.DomUtil.create('div', 'info legend'),
				grades = [1, 2, 3, 4, 5, 6, 7],
				labels = [],
				from, to;
		
			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];
		
				labels.push(
					'<i style="background:' + getColor(from + 1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+'));
			}
		
			div.innerHTML = labels.join('<br>');
			return div;
		};
		
		legend.addTo(map);
	},3000)

	
	
	////////////////////////////////////////////
	
//	//get color depending on population density value
//	function getColor2(d) {
//		return d > 1000 ? '#800026' :
//				d > 500  ? '#BD0026' :
//				d > 200  ? '#E31A1C' :
//				d > 100  ? '#FC4E2A' :
//				d > 50   ? '#FD8D3C' :
//				d > 20   ? '#FEB24C' :
//				d > 10   ? '#FED976' :
//							'#FFEDA0';
//	}
//	
//	function style2(feature) {
//		return {
//			weight: 2,
//			opacity: 1,
//			color: 'white',
//			dashArray: '3',
//			fillOpacity: 0.7,
//			fillColor: getColor(feature.properties.density)
//		};
//	}
//	
//	function highlightFeature2(e) {
//		var layer = e.target;
//	
//		layer.setStyle({
//			weight: 5,
//			color: '#666',
//			dashArray: '',
//			fillOpacity: 0.7
//		});
//	
//		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//			layer.bringToFront();
//		}
//	
//		info2.update(layer.feature.properties);
//	}
//	
//	var geojson;
//	
//	function resetHighlight2(e) {
//		geojson.resetStyle(e.target);
//		info2.update();
//	}
//	
//	function zoomToFeature2(e) {
//		map2.fitBounds(e.target.getBounds());
//	}
//	
//	function onEachFeature2(feature, layer) {
//		layer.on({
//			mouseover: highlightFeature2,
//			mouseout: resetHighlight2,
//			click: zoomToFeature2
//		});
//	}
//	
//	var map2 = L.map('map3').setView([37.8, -96], 4);
//	
//	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//		maxZoom: 18,
//		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
//			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//		id: 'mapbox/light-v9',
//		tileSize: 512,
//		zoomOffset: -1
//	}).addTo(map2);
//	
//	// control that shows state info on hover
//	var info2 = L.control('map2');
//	
//	info2.onAdd = function (map2) {
//		this._div = L.DomUtil.create('div', 'info2');
//		this.update();
//		return this._div;
//	};
//	
//	info2.update = function (props) {
//		this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
//			'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
//			: 'Hover over a state');
//	};
//	
//	info2.addTo(map2);
//	
//	geojson = L.geoJson(statesData, {
//		style: style2,
//		onEachFeature: onEachFeature2
//	}).addTo(map2);
//	
//	map2.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');
//	
//	
//	var legend2 = L.control({position: 'bottomleft'});
//	
//	legend2.onAdd = function (map2) {
//	
//		var div = L.DomUtil.create('div', 'info legend'),
//			grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//			labels = [],
//			from, to;
//	
//		for (var i = 0; i < grades.length; i++) {
//			from = grades[i];
//			to = grades[i + 1];
//	
//			labels.push(
//				'<i style="background:' + getColor2(from + 1) + '"></i> ' +
//				from + (to ? '&ndash;' + to : '+'));
//		}
//	
//		div.innerHTML = labels.join('<br>');
//		return div;
//	};
//	
//	legend2.addTo(map2);