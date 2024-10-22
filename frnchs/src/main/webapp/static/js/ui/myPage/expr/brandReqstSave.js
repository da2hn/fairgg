var fObj1 = null;
var fObj2 = null;
$(document).ready(function() {
	//시군구 조회
	fnGetSignguRelmList("signguCode","select","41",$("#rstSignguCode").val());
	fnGetAdstrdRelmList("adstrdCode","select",$("#rstSignguCode").val(),$("#rstAdstrdCode").val());
	fnGetSignguRelmList("mSignguCode","select","41",$("#rstSignguCode").val());
	fnGetAdstrdRelmList("mAdstrdCode","select",$("#rstSignguCode").val(),$("#rstAdstrdCode").val());
	//행정동 조회
	$("#signguCode").change(function(){
		if($("#signguCode").val() != ""){
			fnGetAdstrdRelmList("adstrdCode","select",$("#signguCode").val(),$("#rstAdstrdCode").val());
		}
	});

	//브랜드명 조회
	fnGetBrandList("frnchsNo", $("#rstFrnchsNo").val());
	fnGetBrandList("mFrnchsNo", $("#rstFrnchsNo").val());

	$( "#exprnBeginDe, #exprnEndDe, #edcDe, #mExprnBeginDe, #mExprnEndDe, #mEdcDe" ).datepicker({
		dateFormat: 'yy-mm-dd'
	});

	//파일첨부 세팅
	var bImageFileNo = $("#imageFileNo").val() == null ? false : true;
	fObj1 = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv1"), readOnly:false, addCnt:"S", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bImageFileNo});
	fObj1.init();
	fObj3 = new fileObj({objId:"f3", windowMode:"full", divId:$("#mAtchFileDiv1"), readOnly:false, addCnt:"S", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bImageFileNo});
	fObj3.init();
	var bEdcFileNo = $("#edcFileNo").val() == null ? false : true;
	fObj2 = new fileObj({objId:"f2", windowMode:"full", divId:$("#atchFileDiv2"), readOnly:false, addCnt:"S", filePath:"basic", maxFileSize:"6", fileType:"normal", tmpDel:bEdcFileNo});
	fObj2.init();
	fObj4 = new fileObj({objId:"f4", windowMode:"full", divId:$("#mAtchFileDiv2"), readOnly:false, addCnt:"S", filePath:"basic", maxFileSize:"6", fileType:"normal", tmpDel:bEdcFileNo});
	fObj4.init();
	//파일첨부 메세지 세팅
	$(".f1Txt").html("5MByte 이하의 파일만 등록 가능합니다.<br>등록 이미지 크기는 가로 200 pixel / 세로 200 pixel로 올려주세요.");
	$(".f2Txt").html("5MByte 이하의 파일만 등록 가능합니다.");
	$(".f3Txt").html("5MByte 이하의 파일만 등록 가능합니다.<br>등록 이미지 크기는 가로 200 pixel / 세로 200 pixel로 올려주세요.");
	$(".f4Txt").html("5MByte 이하의 파일만 등록 가능합니다.");
	//저장된값 바인딩
	fObj1.getFileList($("#imageFileNo").val(), "FS02");
	fObj2.getFileList($("#edcFileNo").val(), "FS02");
	fObj3.getFileList($("#imageFileNo").val(), "FS02");
	fObj4.getFileList($("#edcFileNo").val(), "FS02");

	//저장
	$("#btnSave").click(function(){
		var params = {};
		$(".mBoard1 input,select").each(function(index){
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
		if(!params["atchmnflNo_f1"] && !params["atchFile_f1"]){
			alert("게시 이미지는 필수 입력입니다.");
			return;
		}
		if(!params["atchmnflNo_f2"] && !params["atchFile_f2"]){
			alert("교육커리큘럼교재는 필수 입력입니다.");
			return;
		}
		if(!params["droperStorAr"]){
			alert("직영점평수는 필수 입력입니다.");
			return;
		}

		$.ajax({
			/*dataType:"text",*/
			dataType:"json",
			type: "POST",
			url: "/myPage/expr/brandReqst/updateFrnchsExprnRegist.ajax",
			data:params,
			async: true,
			cache: false,
			success : function(data, status, request) {
				alert(data.resultMsg);
				fObj1.updateComplete();
				fObj2.updateComplete();
			},
		    error: function(request, status, error) {
	    		window.error = error;
				alert(error);
			}
		});
	});
	
	//저장
	$("#btnMobSave").click(function(){
		var params = {};
		$(".tbl_row input,select").each(function(index){
			if($(this).attr("id") && $(this).attr("id") != undefined){
				if($(this).attr("id").indexOf("atch") != -1){
					params[$(this).attr("id")] = $(this).val();
				} else {					
					params[$(this).attr("name")] = $(this).val();
				}
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
		if(!params["atchmnflNo_f3"] && !params["atchFile_f3"]){
			alert("게시 이미지는 필수 입력입니다.");
			return;
		}
		if(!params["atchmnflNo_f4"] && !params["atchFile_f4"]){
			alert("교육커리큘럼교재는 필수 입력입니다.");
			return;
		}
		if(!params["droperStorAr"]){
			alert("직영점평수는 필수 입력입니다.");
			return;
		}
		
		params["atchmnflNo_f1"] = params["atchmnflNo_f3"];
		params["atchmnflNo_f2"] = params["atchmnflNo_f4"];

		$.ajax({
			/*dataType:"text",*/
			dataType:"json",
			type: "POST",
			url: "/myPage/expr/brandReqst/updateFrnchsExprnRegist.ajax",
			data:params,
			async: true,
			cache: false,
			success : function(data, status, request) {
				alert(data.resultMsg);
				fObj3.updateComplete();
				fObj4.updateComplete();
			},
		    error: function(request, status, error) {
	    		window.error = error;
				alert(error);
			}
		});
	});
});

/**
 * 유저별 브랜드 불러오기
 * @returns
 */
function fnGetBrandList(selectorId, rtnFrnchsNo){
	var params = {};
	fnGetSyncAjaxData("/user/selectUserChrgBrandList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#"+selectorId).empty();
			$.each(_data.userChrgBrandList, function(index, item) {
				var selected = "";
				if(item.frnchsNo == rtnFrnchsNo){
					selected = "selected";
				}
				var option = $("<option value=\""+item.frnchsNo+"\" "+selected+">"+item.bsnSgnal+"</option>");
				$("#"+selectorId).append(option);
			});
		} else {
			alert(_data.resultMsg);
		}
	});
}