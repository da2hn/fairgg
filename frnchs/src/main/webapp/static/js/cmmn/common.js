//** ---------------------------------------------------------------------------
//함 수 명 : fnGetSyncAjaxData
//인    자 :
//		  1. pUrl          : json 호출 url
//		  2. pData         : 파라메터 데이터 Form 명 또는 Array
//		  3. pCallBackFn   : 정상 처리 완료 후 호출 Function 명
//		  4. pBlockUI      : true - blockUI 함수를 호출 한다., false - blockUI 호출 하지 않는다.
//		  5. pBlockMessage : BlockUI에 설정 할 메시지
//		  6. pObj		 		:pCallBackFn에 붙일 object
//목    적 :
//플 로 우 :
//검    수 :
//예   제  : 	fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', 'frm', 'callbackTblListClick', true, '조회 중 입니다.' );
//			fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', {codeId:$(obj).data("data").codeId}, 'callbackTblListClick', true, '조회 중 입니다.' );
//생 성 일 :
//수    정 :
//** ---------------------------------------------------------------------------
var contextPath = $("#contextPath").val();
var arrWinHandle = new Array();	// 팝업창 핸들 저장 array


$(function() {
	$(".onlyNumber").on("keyup", function() {
	    $(this).val($(this).val().replace(/[^0-9]/g,""));
	});

	$(".enterSearch").keydown(function(key) {
		if (key.keyCode == 13 ) {
			if (typeof fnSearch == 'function') {
				fnSearch();
			}
		}
	})

	//패밀리사이트 변경시
	$("#selectFamilySite").change(function(){
		console.log($(this).val());
		window.open($(this).val(),"_blank");
	});
});

function fnGetSyncAjaxData(/* String */ pUrl, /* String or Array */ pData, /* String */ pCallBackFn)
{
	try {
		contextPath = $("#contextPath").val();
		var sData = null;
		if(typeof(pData) == "object" ) {
			sData = pData;
		}
		else {
			sData = $('#'+pData).serialize();
		}
		pUrl = contextPath+pUrl;
		$.ajax({
			/*dataType:"text",*/
			dataType:"json",
			type: "POST",
			url: pUrl,
			data:sData,
			async: false,
			cache: false,
			/*contentType: "application/x-www-form-urlencoded; charset=UTF-8",*/
			beforeSend : function(request){
				request.setRequestHeader("AJAX", true);
		 	},
			success : function(data, status, request) {
				pCallBackFn(data);

			},
			complete: function(){

			},
		    error: function(request, status, error) {

		    	if (request.status =="403") {
		    		alert("로그인 정보가 없습니다. 로그인 하셔야 이용하실 수 있습니다.");
		    	} else {
		    		window.error = error;
		    		//psm주석처리
//					alert("fnGetSyncAjaxData : " + error);
		    	}
			}
		});
	} catch(e) {
		//alert(e.exception.errMessage);
	}

}


//** ---------------------------------------------------------------------------
//함 수 명 : fnGetAjaxData
//인    자 :
//		  1. pUrl          : json 호출 url
//		  2. pData         : 파라메터 데이터 Form 명 또는 Array
//		  3. pCallBackFn   : 정상 처리 완료 후 호출 Function 명
//		  4. pBlockUI      : true - blockUI 함수를 호출 한다., false - blockUI 호출 하지 않는다.
//		  5. pBlockMessage : BlockUI에 설정 할 메시지
//		  6. pObj		 		:pCallBackFn에 붙일 object
//목    적 :
//플 로 우 :
//검    수 :
//예   제  : 	fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', 'frm', 'callbackTblListClick', true, '조회 중 입니다.' );
//			fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', {codeId:$(obj).data("data").codeId}, 'callbackTblListClick', true, '조회 중 입니다.' );
//생 성 일 :
//수    정 :
//** ---------------------------------------------------------------------------
function fnGetAjaxData(/* String */ pUrl, /* String or Array */ pData, /* String */ pCallBackFn )
{
	try {
		contextPath = $("#contextPath").val();
		var sData = null;
		if(typeof(pData) == "object" ) {
			sData = pData;
		}
		else {
			sData = $('#'+pData).serialize();
		}
		pUrl = contextPath+pUrl;
		$.ajax({
			/*dataType:"text",*/
			dataType:"json",
			type: "POST",
			url: pUrl,
			data:sData,
			async: false, /* 순서충돌로 인한 async 제거 - 21.04.12 */
			cache: false,
			/*contentType: "application/x-www-form-urlencoded; charset=UTF-8",*/
			beforeSend : function(request){
				request.setRequestHeader("AJAX", true);
		 	},
			success : function(data, status, request) {
				pCallBackFn(data);
			},
			complete: function(){

			},
		    error: function(request, status, error) {
		    	if (request.status =="403") {
		    		alert("로그인 정보가 없습니다. 로그인 하셔야 이용하실 수 있습니다.");
		    	} else {
		    		window.error = error;
					alert(error);
		    	}
			}
		});
	} catch(e) {
		alert("에러가 발생하였습니다.");
	}

}
//comma 찍기
function gfnNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function blockUI(/** String */ mesg, /** object of the css */ cssMap, /** Number */ timeout) {

	try{

		cssMap = cssMap || {  width:'0px', height:'0px', padding:'0px', border: "0px", position:'absolute', top:'35%', left:'35%' };
		timeout = timeout || 5000;

		$.blockUI({
			message: "<img src='"+contextPath || ''+"/static/js/paramquery/images/loading.gif' alt='loading'>",
			fadeIn:0,
			css: cssMap,
			overlayCSS: { backgroundColor: '#fff', opacity: 0.5, cursor: 'wait' },
			blockMsgClass: 'blockMsg',
			baseZ: 9999
		});

		//setTimeout(unblockUI, timeout);

	}catch(e){
		return;
	}
}

function unblockUI() {
	$.unblockUI();
}

/*
 * 2021-12-22 화면깜빡임 제거
 */
//$(document).ajaxStart(blockUI);
//$(document).ajaxStop(unblockUI);

/*
 * select box 초기화
 */
function fn_bindSelectBox($selector, items) {
	$selector.empty();

	$.each(items, function(index, item) {
		var padding = "";
		if (item.lv != undefined) {
			if (Number(item.lv) > 1) {
				var pSize = (Number(item.lv)-1)*2;
				for (var i = 0; i < pSize; i++) {
					padding += "&nbsp;";
				}

			}
		}
		var option = $("<option value=\""+item.codeValue+"\">"+item.codeValueNm+"</option>");
		if (padding != "") {
			option = $("<option value=\""+item.codeValue+"\">"+padding+item.codeValueNm+"</option>");
		}
		$selector.append(option);
	});
}

/*
 * select box 초기화
 */
function fn_bindSelectBoxWithAll($selector, items) {
	$selector.empty();
	var allOption = $("<option value=''>전체</option>");
	$selector.append(allOption);

	$.each(items, function(index, item) {
		var option = $("<option value=\""+item.codeValue+"\">"+item.codeValueNm+"</option>");
		$selector.append(option);
	});
}

/*
 * select box 초기화
 */
function fn_bindSelectBoxWithSel($selector, items) {
	$selector.empty();
	var allOption = $("<option value=''>선택</option>");
	$selector.append(allOption);

	$.each(items, function(index, item) {
		var option = $("<option value=\""+item.codeValue+"\">"+item.codeValueNm+"</option>");
		$selector.append(option);
	});
}

/*
 * 설  명 : 공통 레이어팝업
 * 인자 1 : url 타겟 url
 * 인자 2 : 레이어팝업 width 사이즈
 * 인자 3 : 레이어팝업 height 사이즈
 */
function fn_bpopup(url,wsize,hsize){

	url = contextPath+url;

	wsize = $(window).width();
	hsize = $(window).height();

	$('#element_to_pop_up').css("width", wsize);
	$('#element_to_pop_up').css("height", hsize);

	$('#element_to_pop_up').bPopup({

//		follow:[true,true],
		speed:800,
		transition:'slideDown',
//		position:[cWidth,100],
//		modal:'true',
//    	onOpen:fn_progressPop,
//    	onClose:fn_progressPopClose,
        content:'iframe', //'ajax', 'iframe' or 'image'
//        contentContainer:'#container_2',
    	loadUrl:url //Uses jQuery.load()
    });

	$('.b-iframe').css("width", wsize);
	$('.b-iframe').css("height", hsize);
}


/*
 * 설  명 : 공통 레이어팝업 종료
 */
function fn_bClose(){
	var bPopup = $('#element_to_pop_up').bPopup();
	bPopup.close();

	$('#element_to_pop_up').html('');
}

/**
 * 팝업 창 열기
 * @param url
 * @param map1
 * @see #popupPostNew
 */
function fn_Popup(/** String */ url, /** Number */ w, /** Number */ h, /** String */ _WinName, /** String */ _FrmName, /** Map */ arg, vo) {
	if (_WinName === undefined || _WinName == null) {
		_WinName = "_blank";
	}
	if (_FrmName === undefined || _FrmName == null) {
		_FrmName = "frmPopup";
	}
	url = contextPath+url;
	fnComClosePopup(_WinName); // 기존 같은 이름의 팝업창을 닫는다.
	opt = getOptNewCenter(w, h); //센터 오픈
	arrWinHandle[_WinName] = window.open('', _WinName, opt);
	if (arrWinHandle[_WinName]) {
		arrWinHandle[_WinName].focus();
		fnPopupWindowThruPostNew(url, arg, _FrmName, _WinName,vo);
	}
	return arrWinHandle[_WinName];
}

/**
 * POST 방법으로 팝업창 띄우기 New 2014-07-29
 * 이전 방식을 알수 없음
 * @param url
 * @param map1
 * @see #popupPost
 */
function fnPopupWindowThruPostNew(/** String */ url, /** map */ arg, /** String */ frmName, /** String */ targetName, vo) {
	url = contextPath+url;
	var $frm = $('form[target='+ targetName + ']');
	if ($frm.length == 1) {
		$frm.remove();
	}

	var frm = document.createElement('form');
	for (var key in arg) {
        value = arg[key];
        var input = '<input type="hidden" name="' + key + '" value="' + value + '">';
        $(frm).append(input);
	}

	frm.setAttribute('name', frmName || vo);
	frm.setAttribute('action', url);
	frm.setAttribute('method', 'post');
	frm.setAttribute('target', targetName);
	document.body.appendChild(frm);

	frm.submit();
}

//** ---------------------------------------------------------------------------
//함 수 명 : fnComClosePopup
//인    자 :
//		  1. pWinName : open windown name
//목    적 : 현재 열린 popup창을  닫는다.
//플 로 우 :
//검    수 :
//예   제  :
//생 성 일 :
//수    정 :
//** ---------------------------------------------------------------------------
function fnComClosePopup(pWinName) {
	if(typeof(pWinName) == 'undefined') {	// 전체 닫기
		for(var i in arrWinHandle){	// 현재 열려 있는 팝업창
			if(arrWinHandle[i] != null && typeof(arrWinHandle[i].name)== "string" ){ // 핸들이 존재하는 확인
				arrWinHandle[i].close();
				arrWinHandle[i] = null;
			}
		}

	} else {	// 넘어온 object만 닫기
		if(arrWinHandle[pWinName] != null && typeof(arrWinHandle[pWinName].name)== "string" ){ // 핸들이 존재하는 확인
			arrWinHandle[pWinName].close();
			arrWinHandle[pWinName] = null;
		}
	}

}

function getOptNewCenter(/** Number */ w, /** Number */ h) {
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
	var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	var top = ((height / 2) - (h / 2)) + dualScreenTop;

	var pos = 'height='+ h+ ',width='+ w+ ',left='+ left+ ',top='+ top;
	var opt = 'location=no,directories=no,toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,'+ pos;
	return opt;
}

//** ---------------------------------------------------------------------------
//함 수 명 : getCodeChk
//인    자 : 체크 하고자 하는 코드명
//목    적 : 벨리데이션 체크
//플 로 우 :
//검    수 :
//예   제  :
//생 성 일 :
//수    정 :
//** ---------------------------------------------------------------------------

function getCodeChk(nm, code){
	if(!/^[A-Z]+[A-Z0-9]{2,19}$/g.test(code)){
		alert(nm + "코드 형식은 첫 글자 영문, 대문자 영문, 숫자만 가능합니다.");
		return true;
	}
	return false;
}

//** ---------------------------------------------------------------------------
//함 수 명 : getEmailChk
//인    자 : 체크 하고자 하는 email 위치
//목    적 : 벨리데이션 체크
//플 로 우 :
//검    수 :
//예   제  :
//생 성 일 :
//수    정 :
//** ---------------------------------------------------------------------------

function getEmailChk(email){
	if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test($('#' + email).val())){
		alert("이메일 형식을 확인하시기 바랍니다.");
		$('#' + email).focus();
		return true;
	}
	return false;
}

//** ---------------------------------------------------------------------------
//함 수 명 : getTelChk
//인    자 : 체크 하고자 하는 전화번호 위치
//목    적 : 벨리데이션 체크
//플 로 우 :
//검    수 :
//예   제  :
//생 성 일 :
//수    정 :
//** ---------------------------------------------------------------------------
function getTelChk(tel){
	if(!/^\d{2,3}\d{3,4}\d{4}$/.test($('#' + tel).val())){
		alert("전화번호 형식을 확인하시기 바랍니다.");
		$("#" + tel).focus();
		return true;
	}
	return false;
}

//** ---------------------------------------------------------------------------
//함 수 명 : getPhoneChk
//인    자 : 체크 하고자 하는 헨드폰번호 위치
//목    적 : 벨리데이션 체크
//플 로 우 :
//검    수 :
//예   제  :
//생 성 일 :
//수    정 :
//** ---------------------------------------------------------------------------
function getPhoneChk(phone){
	if(!/^01([0|1|6|7|8|9])\d{3,4}\d{4}$/.test($('#' + phone).val())){
		alert("핸드폰번호 형식을 확인하시기 바랍니다.");
		$("#" + phone).focus();
		return true;
	}
	return false;
}

//** ---------------------------------------------------------------------------
//함 수 명 : getPasswdChk
//인    자 : 체크 하고자 하는 패스워드 위치
//목    적 : 벨리데이션 체크
//플 로 우 :
//검    수 :
//예   제  :
//생 성 일 :
//수    정 :
//** ---------------------------------------------------------------------------

function getPasswdChk(pass){
	if(!/^.*(?=^.{9,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,%,^,&,^,*,?,(,),=,+,_,.,|]).*$/.test($('#' + pass).val())){
		alert("패스워드 형식을 확인하시기 바랍니다.");
		$("#" + pass).focus();
		return true;
	}
	return false;
}

function fnIsEmpty(val) {

	if ($.trim(val).length == 0) {
		return true;
	} else {
		return false;
	}
}

function fnIsEmptyObj(obj) {

	if ($.trim(obj.val()).length == 0) {
		return true;
	} else {
		return false;
	}
}

function gfnNullCheck(obj, msg){
	if (fnIsEmptyObj(obj)) {
		alert(msg + "을(를) 입력하세요.");
		obj.focus();
		return false;
	}
	return true;
}

function fnGridResize($pqGrid, margin) {
	if (margin == null) {
		margin = 280;
	}

	//grid resize
	$(window).bind("resize", function() {
		var gridHeight = window.innerHeight -margin;
		if (gridHeight < 100) {
			gridHeight = 100;
		}
		$pqGrid.pqGrid( "option", "height",gridHeight );
	}).trigger("resize");
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function fnGetExcelHeadNm(idx) {
	var num =(idx+1);
	var nmArr = new Array();
	var resultStr = "";
	while (num > 0) {
		var rest = ((num-1) % 26);
		nmArr.push(String.fromCharCode(65+rest));
		num = parseInt((num-1) / 26);
	}
	for (var n = nmArr.length-1; n >= 0; n--) {
		resultStr += nmArr[n];
	}

	return resultStr;
}

function fnReplaceAll(str, searchStr, replaceStr) {
	return str.split(searchStr).join(replaceStr);
}

function fnSplitArr(targetStr, splitChr, defaultSize) {
	if (targetStr != null && targetStr!= undefined) {
		return targetStr.split(splitChr);
	} else {
		var returnArr = new Array();
		for (var i = 0; i < defaultSize; i++) {
			returnArr.push("");
		}
		return returnArr;
	}
}

function fnStrReplaceAll(str, searchStr, replaceStr) {
	return str.replace(/searchStr/g, replaceStr);
}

function fnIsNumber(s) {
	s += ''; // 문자열로 변환
	s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
	if (s == '' || isNaN(s)) return false;
	return true;
}

function fnShowPer(ctx, per) {
	ctx.clearRect(0, 0, 400, 400);
	//바깥쪽 써클 그리기
	ctx.strokeStyle = "#f66";
	ctx.lineWidth=10;
	ctx.beginPath();
	ctx.arc(60, 60, 50, 0, Math.PI * 2 * per / 100);
	ctx.stroke();
	//숫자 올리기
	ctx.font = '32px serif';
	ctx.fillStyle = "#000";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(per + '%', 60, 60);
}


function fnFileDownload(_url, _evt) {
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext("2d");
	console.dir(canvas);
	console.dir(ctx);
	console.log("url is ["+_url+"]");
	$.ajax({
		url : _url,
		type : 'get',
		xhrFields: { //response 데이터를 바이너리로 처리한다.
			responseType: 'blob'
		},beforeSend : function() { //ajax 호출전 progress 초기화
			fnShowPer(ctx, 0);
			canvas.style.display = 'block';
		},xhr: function() { //XMLHttpRequest 재정의 가능
			var xhr = $.ajaxSettings.xhr();
			console.dir(_evt);
			xhr.onprogress = function(_evt) {
				fnShowPer(ctx, Math.floor(_evt.loaded / _evt.total * 100));
			};
			return xhr;
		},success : function(data) {
			console.log("완료");
			var blob = new Blob([data]);
			//파일저장
			if (navigator.msSaveBlob) {
				return navigator.msSaveBlob(blob, url);
			}
			else {
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = url;
				link.click();
			}
		},
		complete : function() {
			canvas.style.display = 'none';
		}
	});
}

/*
 * highChart 초기화
 *
 * type : column(바차트) / spline(꺽은선차트)
 * title : 차트 제목
 * stacking : 차트 형태 (normal , percent, 빈값)
 * data : json 데이터
 */
function fnInitChart(type, title, stacking, unit, calcBeginYear, calcEndYear, data) {
	var yearArr = new Array();
	for(var year = calcBeginYear; year <= calcEndYear; year++) {
		yearArr.push(year);
	}

	Highcharts.chart('container', {
	    chart: {
	        type: type
	    },
	    title: {
	        text: title
	    },
	    xAxis: {
	        categories: yearArr,
	        tickWidth: 10
	    },
	    yAxis: {
	        title: {
	            text: unit
	        },
	        stackLabels: {
	            enabled: false,
	            style: {
	                fontWeight: 'bold',
	                color: ( // theme
	                    Highcharts.defaultOptions.title.style &&
	                    Highcharts.defaultOptions.title.style.color
	                ) || 'gray'
	            }
	        }
	    },
	    legend: {
	        align: 'right',
	        x: -30,
	        verticalAlign: 'top',
	        y: 0,
	        floating: true,
	        backgroundColor:
	            Highcharts.defaultOptions.legend.backgroundColor || 'white',
	        borderColor: '#CCC',
	        borderWidth: 1,
	        shadow: false
	    },
	    tooltip: {
	        headerFormat: '<b>{point.x}</b><br/>',
	        pointFormat: '{series.name}: {point.y}'
	    },
	    plotOptions: {
	        column: {
	            stacking: stacking,	//Whether to stack the values of each series on top of each other. "normal" to stack by value or "percent"
	            dataLabels: {
	                enabled: false
	            }
	        },
	        series: {
	            pointWidth: 40
	        }
	    },
	    exporting: {	//context menu hide
	        enabled: false
	    },
	    series: data
	});
}

function autoMerge(grid, refresh) {
	var mc = [];
	var CM = grid.option("colModel");
	var i = 0;
	var data = grid.option("dataModel.data");

	var dataIndx = CM[i].dataIndx;
	var rc = 1;
	var j = data.length;

	while (j--) {
		var cd = data[j][dataIndx],
			cd_prev = data[j - 1] ? data[j - 1][dataIndx] : undefined;
		if (cd_prev !== undefined && cd == cd_prev) {
			rc++;
		}
		else if (rc > 1) {
			mc.push({ r1: j, c1: i, rc: rc, cc: 1 });
			rc = 1;
		}
	}
	grid.option("mergeCells", mc);
	if (refresh) {
		grid.refreshView();
	}
}

/**
 * 공통코드로 셀렉트 옵션 세팅
 * @param codeId
 * @returns
 */
function fn_bindCodeListToSelOption(codeId, selectorId, bAll) {
	// IE 기본값세팅
	bAll = typeof bAll !== 'undefined' ? bAll : false ;

	var params = {};
	params["codeId"]  = codeId;

	fnGetAjaxData("/comcode/getComCodeList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			if(bAll){
				fn_bindSelectBoxWithAll($("#"+selectorId), eval("_data."+codeId+"_LIST"));
			}else{
				fn_bindSelectBox($("#"+selectorId), eval("_data."+codeId+"_LIST"));
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}
/**
 * str > camelCase 로 변환
 * @param str
 * @returns
 */
function fn_toCamelCase(str) {

    return str.toLowerCase()
      .replace(/_+(\w|$)/g, function ($$, $1) {
          return $1.toUpperCase();
      });
}

/* ajax용 array 공통 추가 - 20.12.28 */
$.fn.serializeArrayString = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name] += !this.value ? '' : (!o[this.name] ? this.value : (","+this.value));
        } else {
            o[this.name] = !this.value ? '' : (!o[this.name] ? this.value : (","+this.value));
        }
    });
    return o;
};

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
      //object.maxLength : 매게변수 오브젝트의 maxlength 속성 값입니다.
      object.value = object.value.slice(0, object.maxLength);
    }
  }
/**
 * 시도 조회
 * @param selectorId
 * @param type
 * @returns
 */
function fnGetCtprvnRelmList(selectorId, type, selectVal){
	var params = {};
	fnGetAjaxData("/comcode/selectCtprvnRelmList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			if(type == "select"){
				$.each(_data.ctprvnRelmList, function(index, item) {
					var selected = "";
					if(item.ctprvnCode == selectVal){selected = "selected";}
					var option = $("<option value=\""+item.ctprvnCode+"\" "+selected+">"+item.ctprvnNm+"</option>");
					$("#"+selectorId).append(option);
				});
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}
/**
 * 시군구 조회
 * @param selectorId
 * @param type
 * @param ctprvnCode
 * @returns
 */
function fnGetSignguRelmList(selectorId, type, ctprvnCode, selectVal){
	var params = {};
	params["ctprvnCode"]  = ctprvnCode;
	fnGetAjaxData("/comcode/selectSignguRelmList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			if(type == "select"){
				$("#"+selectorId).empty();
				var option = "<option value=\"\">시군구</option>";
				$("#"+selectorId).append(option);
				$.each(_data.signguRelmList, function(index, item) {
					var selected = "";
					if(item.signguCode == selectVal){selected = "selected";}
					option = $("<option value=\""+item.signguCode+"\" "+selected+">"+item.signguNm+"</option>");
					$("#"+selectorId).append(option);
				});
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}
/**
 * 행정동 조회
 * @param selectorId
 * @param type
 * @param signguCode
 * @returns
 */
function fnGetAdstrdRelmList(selectorId, type, signguCode, selectVal){
	var params = {};
	params["signguCode"]  = signguCode;
	fnGetAjaxData("/comcode/selectAdstrdRelmList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			if(type == "select"){
				$("#"+selectorId).empty();
				var option = "<option value=\"\">행정동</option>";
				$("#"+selectorId).append(option);
				$.each(_data.adstrdRelmList, function(index, item) {
					var selected = "";
					if(item.adstrdCode == selectVal){selected = "selected";}
					option = $("<option value=\""+item.adstrdCode+"\" "+selected+">"+item.adstrdNm+"</option>");
					$("#"+selectorId).append(option);
				});
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}

function intrstFrnchs(param){

	var locStr = this.location.pathname;
	$.ajax({
		/*dataType:"text",*/
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
					$("#" +param.frnchsNo).toggleClass("selected");
				}
			}else{
				$("#popupDiv").html(data);

				if( ~locStr.indexOf("compareBrand") || ~locStr.indexOf("densityBrand") || ~locStr.indexOf("fran/search/searchList") ){
					$("#loginPopup .gray").attr("href","javascript:closeLgnPop();");
					$("#loginPopup .close").attr("href","javascript:closeLgnPop();");
				}
			}
		},
	    error: function(request, status, error) {
    		window.error = error;
			alert(error);
		}
	});
}

function intrstFrnchsMob(param){
	
	var locStr = this.location.pathname;
	$.ajax({
		/*dataType:"text",*/
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
					$("#" +param.frnchsNo+"Mob").toggleClass("selected");
				}
			}else{
				$("#popupDiv").html(data);
				
				if( ~locStr.indexOf("compareBrand") || ~locStr.indexOf("densityBrand") || ~locStr.indexOf("fran/search/searchList") ){
					$("#loginPopup .gray").attr("href","javascript:closeLgnPop();");
					$("#loginPopup .close").attr("href","javascript:closeLgnPop();");
				}
			}
		},
		error: function(request, status, error) {
			window.error = error;
			alert(error);
		}
	});
}

function intrstFrnchsCompare(param){

	var locStr = this.location.pathname;
	$.ajax({
		/*dataType:"text",*/
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
					$("#" +param.id).toggleClass("selected");
				}
			}else{
				$("#popupDiv").html(data);

				if( ~locStr.indexOf("compareBrand") || ~locStr.indexOf("densityBrand") || ~locStr.indexOf("fran/search/searchList") ){
					$("#loginPopup .gray").attr("href","javascript:closeLgnPop();");
					$("#loginPopup .close").attr("href","javascript:closeLgnPop();");
				}
			}
		},
	    error: function(request, status, error) {
    		window.error = error;
			alert(error);
		}
	});
}

function fnChkJson(str){
	var result;
	try{
		JSON.parse(str);
		result = true;
	}catch(e){
		result = false;
	}
	return result;
}

function closeLgnPop(){
	$("#loginPopup").hide();
}

function createMonthpicker(id, defaultValue,startYear, endYear) {
	$( "#"+ id ).datepicker({
		autoclose: true,
		format: "yyyy-mm",
		minViewMode: 1,
		language: "kr",
		todayHighlight: true,
		startDate: new Date(startYear),
		endDate: new Date(endYear)
	});
	if(defaultValue) {
		$( "#"+ id ).datepicker('setDate', defaultValue);
	}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isEmptyObject(param) {
	  return Object.keys(param).length === 0 && param.constructor === Object;
}

/**
 * 주소검색 팝업 호출
 * @returns
 */
function goJusoPopup(){
	// 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(https://www.juso.go.kr/addrlink/addrLinkUrl.do)를 호출하게 됩니다.
    var pop = window.open("/jusoPopup.do","pop","width=570,height=420, scrollbars=yes, resizable=yes");

	// 모바일 웹인 경우, 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(https://www.juso.go.kr/addrlink/addrMobileLinkUrl.do)를 호출하게 됩니다.
    //var pop = window.open("/popup/jusoPopup.jsp","pop","scrollbars=yes, resizable=yes");
}

/**
 * 주소검색 팝업 callback
 */
/** API 서비스 제공항목 확대 (2017.02) **/
function fnJusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn
						, detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm, buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo){
	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
	$("#roadAddrPart1").val(roadAddrPart1 + roadAddrPart2);
	$("#addrDetail").val(addrDetail);
	$("#zipNo").val(zipNo);
}

/**
 * 주소검색 팝업 callback
 */
/** API 서비스 제공항목 확대 (2017.02) **/
function fnJusoCallBackMob(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn
		, detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm, buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo){
	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
	$("#bassAdresMob").val(roadAddrPart1 + roadAddrPart2);
	$("#detailAdresMob").val(addrDetail);
	$("#zipMob").val(zipNo);
}

/**
 * 전화번호 사이에 - 추가
 * @param StrNumber (type string)
 * @returns
 */
function fnNumberPhoneFormat(StrNumber){
	var returnStr = "";
	if(StrNumber == null || StrNumber == "" || StrNumber.length < 8 || typeof StrNumber != "string"){
		returnStr = StrNumber;
	}else{
		var tmpStr = StrNumber;
		var tmpLen = tmpStr.length;
		if(tmpLen == 8){
			returnStr= tmpStr.substr(0,4) + "-" + tmpStr.substr(4,4);
		}else if(tmpLen == 9){
			returnStr= tmpStr.substr(0,2) + "-" + tmpStr.substr(2,3) + "-" + tmpStr.substr(5,4);
		}else if(tmpLen == 10){
			returnStr = tmpStr.substr(0,3) + "-" + tmpStr.substr(3,3) + "-" + tmpStr.substr(6,4);
		}else if(tmpLen == 11){
			returnStr = tmpStr.substr(0,3) + "-" + tmpStr.substr(3,4) + "-" + tmpStr.substr(7,4);
		}else{
			returnStr = tmpStr;
		}
	}
	return returnStr;
}