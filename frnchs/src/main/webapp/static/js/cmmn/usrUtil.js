var ajaxBUICnt;
function requestPost(url, type, params, callback, async, error, mthd, afterFnc){
	ajaxBUICnt++;
	if(ajaxBUICnt === 1){
//		$.blockUI({
//			message : $('#progressImg').html(),
//			css : {
//				border : 'none',
//				padding : '15px',
//				backgroundColor : '#000',
//				'-webkit-border-radius' : '10px',
//				'-moz-border-radius' : '10px',
//				opacity : .5,
//				color : '#fff'
//			}
//		});
	}
	if(mthd == null){
		mthd = "post";
	}
	
	var post;
	if (error == null) {
		error = function(data) {
		};
	}
	if(async == null){
		async = true;
	}
	jQuery.ajaxSettings.traditional = true;
	post = $.ajax({
		url : url.indexOf("http://") == -1 ? contextPath + url : url,
		type        : mthd,
        dataType    : type,
        async       : async,
        data		: params
	}).done(callback).fail(error).always(function() {
		ajaxBUICnt--;
//		if(ajaxBUICnt === 0){
//			$.unblockUI();
//		}
		if(afterFnc) afterFnc();
		
	});
	
	return post;
}


function requestPostNoBlockUI(url, type, params, callback, async, error, mthd){
	var post = null;
	
	if (error == null) {
		error = function(data) {
		};
	}
	
	if (mthd == null) {
		mthd = "post";
	}
	
	
	if(async == null){
		async = true;
	}
	jQuery.ajaxSettings.traditional = true;
	post = $.ajax({
		url : url.indexOf("http://") == -1 ? contextPath + url : url,
		type        : mthd,
        dataType    : type,
        async       : async,
        data		: params
	}).done(callback).fail(error).always(function() {
	});
	
	return post;
}

function fnDateSnECheck(sDayId,eDayId){
	
	var mFrom = sDayId.val();
	var mTo = eDayId.val();
	
	if(mFrom == "" && mTo == "" || mFrom == null && mTo == null){
		return false;
	}else if(mFrom == ""){
		sDayId.val(mTo);
		mFrom = mTo;
	}else if(mTo == ""){
		eDayId.val(mFrom);
		mTo = mFrom;
	}
	
	var arrTo = mTo.split("-");
	var arrFrom = mFrom.split("-");
	
	var toDate = new Date(arrTo[0], arrTo[1]-1, arrTo[2]);
    var fromDate = new Date(arrFrom[0], arrFrom[1]-1, arrFrom[2]);
	var dateCnt =  (toDate - fromDate) /1000/60/60/24;
	
	if(dateCnt < 0){
		return true;
	}
}

//지정한 날짜 만큼 이전의 날짜를 보여 준다.
function getDaysAgo(daysago, date){
	var toDay = new Date();
	if(date){
		toDay = new Date(date);
	}
	
	toDay.setDate(toDay.getDate() - daysago); 
	
    var Year = toDay.getFullYear();
    var Month = toDay.getMonth() + 1;
    if(Month < 10){
    	Month = "0" + Month;
    }
    var Day = toDay.getDate();
    
    if(Day < 10){
    	Day = "0" + Day;
    }
    
    var makeDay = Year +"-"+ Month +"-"+Day;
    
    return makeDay;    
}
//날짜 차이 계산
function getDateDiff(date1, date2){
    var arrDate1 = date1.split("-");
    var getDate1 = new Date(parseInt(arrDate1[0]),parseInt(arrDate1[1])-1,parseInt(arrDate1[2]));
    var arrDate2 = date2.split("-");
    var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));
    var getDiffTime = getDate1.getTime() - getDate2.getTime();
    
    return Math.floor(getDiffTime / (1000 * 60 * 60 * 24));
}

//날짜/ 기간의 시작일과 종료일을 임의수에따라 분할하여 반환
function getDateSplitList(sDate,eDate,n){//시작일,종료일,분할수
	var result = [];
	
	var dateDiff =  Math.ceil((Math.abs(getDateDiff(sDate,eDate))+1)/n);
	
	
	var tmpStrt = sDate;
	for(var i=0;i<dateDiff;i++){
		var tmpEnd = getDaysAgo(-(n-1),tmpStrt);
		if(new Date(tmpEnd) >= new Date(eDate)){
			tmpEnd = eDate;
		}
		
		result.push([tmpStrt,tmpEnd]); 
		tmpStrt = getDaysAgo(-(n),tmpStrt);
	}
	
	return result;
}



function fn_delay(fnc,sec,obj){
	var timer = setInterval(function () {
        clearInterval(timer);
        fnc(obj);
     }, sec,obj);
}


function fn_fncLoad(name,params){
	var fnc = eval(name);
	fnc(params);
}

function getFuncName(caller) { 
    var pat = /^function\s+([a-zA-Z0-9_]+)\s*\(/i;
    pat.exec(caller.toString());  //메서드가 일치하는 부분을 찾으면 배열변수를 반환하고, 검색 결과를 반영하도록 RegExp 개체가 업데이트된다.
    var func = new Object(); 
    func.name = RegExp.$1; 
    return func; 
}

function addDateHipn(str){
	return str?str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8):"";
}

function fillzero(n, digits, rvs) { 
	var zero = '';
	n = n.toString();
	if (digits > n.length) {
		for (var i = 0; digits - n.length > i; i++) {
			zero += '0';
		}
	}
	if(rvs){
		return n+zero;
	}else{
		return zero + n;
	}
	
}

function listFinder(list,name,code,cdtn){
	var res = []
	var codes = code instanceof Array ? code : [code];
	var len = list.length;
	for(var i=0; i<len; i++){
		var isPush = cdtn ?  true : false;
		for(var j=0;j<codes.length;j++){
			if(list[i][name] == codes[j]){
				isPush = cdtn ? false : true;
				j = codes.length;
			}
		}
		if(isPush){
			res.push(list[i]);
		}
	}
	return res;
}


function comma(num){
    var len, point, str;  
       
    num = num + "";  
    point = num.length % 3 ;
    len = num.length;  
   
    str = num.substring(0, point);  
    while (point < len) {  
        if (str != "") str += ",";  
        str += num.substring(point, point + 3);  
        point += 3;  
    }  
    return str;
}

