$(document).ready(function() {
	if($("#qustnrSn").val()){		
		fnSearch($("#qustnrSn").val());
	} else {
		fnGetSyncAjaxData("/surv/surv/selectQustnrSn.ajax", {}, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				$("#qustnrSn").val(_data.qustnrSn)
				fnSearch(_data.qustnrSn);
			} else {
				alert(_data.resultMsg);
				$(".btnSurv").hide();
			}
		});
	}

	//실태조사 저장
	$("#btnSurvSave").on("click", function(){
		for(var i=0; i<_anwrList.length; i++){
			var answerSn = $("input[name=qestn"+_anwrList[i].qustnrQestnSn+"]:checked").val();
			if(answerSn) _anwrList[i]["answerSn"] = $("input[name=qestn"+_anwrList[i].qustnrQestnSn+"]:checked").val();	
		}
		
		
		var param = {
				json:JSON.stringify({
					list:_anwrList
				})	
				, qustnrSn : $("#qustnrSn").val()
		}
		
		fnGetAjaxData("/surv/surv/mergeQustnResult.ajax", param, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				location.href = "/";
			} else {
				alert(_data.resultMsg);
			}
		});

	});
	
	$("#btnSurvSaveMob").on("click", function(){
		for(var i=0; i<_anwrList.length; i++){
			var answerSn = $("input[name=qestn"+_anwrList[i].qustnrQestnSn+"]:checked").val();
			if(answerSn) _anwrList[i]["answerSn"] = $("input[name=qestn"+_anwrList[i].qustnrQestnSn+"]:checked").val();	
		}
		
		
		var param = {
				json:JSON.stringify({
					list:_anwrList
				})	
			  , qustnrSn : $("#qustnrSn").val()
		}
		
		fnGetAjaxData("/surv/surv/mergeQustnResult.ajax", param, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				location.href = "/";
			} else {
				alert(_data.resultMsg);
			}
		});
		
	});
});

/* 뒤로 가기 */
function back() {
	if (document.referrer && document.referrer.indexOf("/") != -1) {
		history.back();
	} else {
		location.href = "/";
	}
}

/**
 * 설문조사 조회
 * @returns
 */
var _anwrList = [];
function fnSearch(qustnrSn){
	var params = {qustnrSn:qustnrSn};
	fnGetSyncAjaxData("/surv/surv/selectQustnrQestnList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			var _qestnList = _data.qustnList;
			_anwrList = _data.aswerList;
			var li,div;
			$("#btnSurvSave").show();
			$("#btnSurvCancel").show();
			$("#btnSurvSaveMob").show();
			$("#btnSurvCancelMob").show();
			$("#listUl").empty();
			for(var i=0; i<_qestnList.length; i++){
				li = $('<li>');
				div = $('<div class="q">');
				div.append('<span class="n">'+_qestnList[i].qestnOrdr+'</span> '+_qestnList[i].qestn);
				li.append(div);
				
				div = $('<div class="a">');
				for(var j=0; j<_anwrList.length; j++){
					if(_qestnList[i].qustnrSn==_anwrList[j].qustnrSn&&_qestnList[i].qustnrQestnSn==_anwrList[j].qustnrQestnSn){
						div.append(
								  '<span class="mRadio">'
								+ '<input type="radio" id="qestn'+_qestnList[i].qustnrQestnSn+_anwrList[j].answerSn+'" name="qestn'+_qestnList[i].qustnrQestnSn+'" value="'+_anwrList[j].answerSn+'" title="'+_anwrList[j].answer+'">'
								+ '<label for="qestn'+_qestnList[i].qustnrQestnSn+_anwrList[j].answerSn+'">'+_anwrList[j].answer+'</label>'
								+ '</span>'
							);	
					}
					
				}
				li.append(div);
				$("#listUl").append(li);
			}
			
		} else {
//			alert(_data.resultMsg);
			alert("진행중인 설문조사가 없습니다.");
		}
	});
}