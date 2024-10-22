var fObj1 = null;
var fObj2 = null;
$(document).ready(function() {
	//시군구 조회
	fnGetSignguRelmList("signguCode","select","41");

	//행정동 조회
	$("#signguCode").change(function(){
		fnGetAdstrdRelmList("adstrdCode","select",$("#signguCode").val());
	});

	//브랜드명 조회
	fnGetBrandList("frnchsNo");

	//datepicker 생성
	$( "#exprnBeginDe, #exprnEndDe, #edcDe" ).datepicker({
		dateFormat: 'yy-mm-dd'
	});

	//파일첨부 세팅
	fObj1 = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv1"), readOnly:false, addCnt:"S", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:false});
	fObj1.init();
	fObj2 = new fileObj({objId:"f2", windowMode:"full", divId:$("#atchFileDiv2"), readOnly:false, addCnt:"S", filePath:"basic", maxFileSize:"6", fileType:"normal", tmpDel:false});
	fObj2.init();
	//파일첨부 메세지 세팅
	$(".f1Txt").html("5MByte 이하의 파일만 등록 가능합니다.<br>등록 이미지 크기는 가로 200 pixel / 세로 200 pixel로 올려주세요.");
	$(".f2Txt").html("5MByte 이하의 파일만 등록 가능합니다.");

	//저장
	$("#btnSave").click(function(){
		var params = {};
		$("#ownerRegSavePopup input,select").each(function(index){
			if($(this).attr("id") && $(this).attr("id") != undefined){
				params[$(this).attr("id")] = $(this).val();
			}
		});

		if(!params["signguCode"]){
			alert("시군구는 필수 입력입니다.");
			return;
		}
		if(!params["adstrdCode"]){
			alert("행정동은 필수 입력입니다.");
			return;
		}
		if(!params["frnchsNo"]){
			alert("브랜드명은 필수 입력입니다.");
			return;
		}
		if(!params["bhfNm"]){
			alert("지점명은 필수 입력입니다.");
			return;
		}
		if(!params["bhfAdres"]){
			alert("지점주소는 필수 입력입니다.");
			return;
		}
		if(!params["exprnBeginDe"] || !params["exprnEndDe"]){
			alert("체험기간은 필수 입력입니다.");
			return;
		}
		if(!params["operBeginTime"] || !params["operEndTime"]){
			alert("운영시간은 필수 입력입니다.");
			return;
		}
		if(!params["rcritNmpr"]){
			alert("모집인원은 필수 입력입니다.");
			return;
		}
		if(!params["emplyCo"]){
			alert("종업원수는 필수 입력입니다.");
			return;
		}
		if(!params["edcDe"]){
			alert("프랜차이즈 영업교육일은 필수 입력입니다.");
			return;
		}
		if(!params["atchFile_f1"]){
			alert("게시 이미지는 필수 입력입니다.");
			return;
		}
		if(!params["atchFile_f2"]){
			alert("교육커리큘럼교재는 필수 입력입니다.");
			return;
		}
		if(!params["droperStorAr"]){
			alert("직영점평수는 필수 입력입니다.");
			return;
		}

		$.ajax({
			/*dataType:"text",*/
			dataType:"html",
			type: "POST",
			url: "/expr/owner/ownerRegSaveResult.do",
			data:params,
			async: true,
			cache: false,
			success : function(data, status, request) {
				fObj1.updateComplete();
				fObj2.updateComplete();
				$("#popupDiv").html(data);
			},
		    error: function(request, status, error) {
	    		window.error = error;
				alert(error);
			}
		});
	});

	$(".btnPopupClose").click(function(){
		$("#popupDiv").html("");
	});

});

/**
 * 유저별 브랜드 불러오기
 * @returns
 */
function fnGetBrandList(selectorId){
	var params = {};
	fnGetSyncAjaxData("/user/selectUserChrgBrandList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			var dataList = new Array();
			$("#"+selectorId).empty();
			$.each(_data.userChrgBrandList, function(index, item) {
				var option = $("<option value=\""+item.frnchsNo+"\">"+item.bsnSgnal+"</option>");
				$("#"+selectorId).append(option);

				if(index == 0){
					$("#rprsntvNm").text(item.rprsntvNm);
					$("#exctvEmpSum").text(item.exctvEmpSum + " 명");
				}
			});
		} else {
			alert(_data.resultMsg);
		}
	});
}