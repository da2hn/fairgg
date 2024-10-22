<%@ page contentType="text/html; charset=UTF-8" %>
<link rel="stylesheet" type="text/css" href="<c:url value="/static/js/geo/leaflet/leaflet.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/static/js/geo/leaflet/plugins/measure_control/leaflet.measurecontrol.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/static/js/geo/leaflet/plugins/draw/leaflet.draw.css"/>" />
<link rel="stylesheet" type="text/css" href="<c:url value="/static/js/geo/leaflet/plugins/geoman/leaflet-geoman.min.css"/>" />
<%-- <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverKey}"></script> --%>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/leaflet.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/proj4/proj4.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/proj4/proj4leaflet.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/geoman/leaflet-geoman.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/geoman/translationTxt.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/Leaflet.draw.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/Leaflet.Draw.Event.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/Control.Draw.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/Tooltip.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/ext/GeometryUtil.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/ext/LatLngUtil.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/ext/LineUtil.Intersect.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/ext/Polyline.Intersect.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/ext/Polygon.Intersect.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/handler/Draw.Feature.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/handler/Draw.Polyline.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/draw/handler/Draw.Polygon.js"/>"></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/measure/L.openmate_measure.js"/>" ></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/plugins/sync/L.Map.Sync.js"/>" ></script>
<script type="text/javascript" src="<c:url value="/static/js/geo/leaflet/LeafletBaseMapNHNWebDynamicMap2.js"/>" ></script>