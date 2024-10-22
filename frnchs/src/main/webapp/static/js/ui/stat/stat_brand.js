google.charts.load('current', {packages: ['corechart', 'bar','table']});
var statObj = [];
var initFlag = true;
$(document).ready(function() {
	
	$(".lCntMob").on("click",function(e){
		/*$("#subMob").show();*/
		toggle_dimmed_view('layer_statistics_seoul'); 
		return false;
	});

	$("#localBtn").on("click",function(e){
		e.preventDefault();
		location.href = "/stat/franStatList.do";
	});

	$(".jsBtnClose1").on("click",function(e){
		e.preventDefault();
		$("#frnchsPopup").hide();
	});

	var tmpHtml = [];

	fnGetAjaxData("/stat/selectDataYear.ajax", {}, function(_data) {

		//console.log("selectDataYear res",_data);

		if(_data.resultCode == RESULT_SUCCESS){

			_data.dataList.forEach(function(row,idx){
				if(row.stdrYear == "2021") {
					return false;
				}
				tmpHtml.push('<option value="'+row.stdrYear+'">'+row.stdrYear+'년</option>');
			});

			$("#localYear").html( tmpHtml.join("") );
			$("#brandYear").html( tmpHtml.join("") );
			$("#yearMob").html( tmpHtml.join("") );
			$("#localYear").val($("#localYear").find("option:last").val());
			$("#brandYear").val($("#paramBrandYear").val() || $("#brandYear").find("option:last").val());
			$("#yearMob").val($("#localYear").val() || $("#yearMob option:last").val()); // 모바일 추가 - 22.01.04

		}else{
			//console.log("데이터 있는 연도 가져오기 실패..");
		}

	});

	$("#brandLdClass").empty();
	$("#ldClassMob").empty();
	$("#brandLdClass").append('<option value="">- 전체 -</option>');
	$("#ldClassMob").append('<option value="">- 전체 -</option>');

	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {

		_data.franchLclasList.forEach(function(row,idx){
			if( !~row.lclasIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
				$("#brandLdClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
				$("#localLdClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
				$("#ldClassMob").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
		});

		if( initFlag ){
//			$("#brandLdClass").val($("#paramBrandLd").val() || "LC01");
			$("#brandLdClass").val($("#paramBrandLd").val());
			$("#ldClassMob").val($("#paramBrandLd").val());
			fnChangeBrandLd();
			//최초실행시
			$("#brandFrcClass").empty();
			$("#brandFrcClassMob").empty();
//			$("#brandFrcClass").append('<option value="20080100109">김가네김밥</option>');
			$("#brandFrcClass").append('<option value="">- 전체 -</option>');
			$("#brandFrcClassMob").append('<option value="">- 전체 -</option>');
		}

		//지역 대분류 변경시
		$("#localLdClass").off("change").on("change",function(e){
			$("#localMdClass").empty();
			$("#mdClassMob").empty();
			$("#localMdClass").append('<option value="">- 전체 -</option>');
			$("#mdClassMob").append('<option value="">- 전체 -</option>');

			var selectedVal = $('#localLdClass:visible').val();
			if(!selectedVal){
				if($(document).width() <= 687) {
					selectedVal = $("#ldClassMob option:selected").val();
				} else {			
					selectedVal = $("#ldClass option:selected").val();
				}
			}
			$("#localLdClass").val( selectedVal );
			$("#ldClassMob").val( selectedVal );

			fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {

				_data.frnchsMlsfcList.forEach(function(row,idx){
					if( !~row.mlsfcIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
						$("#localMdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
						$("#mdClassMob").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
					}
				});


//				$("#brandFrcClass").empty();
//				$("#brandFrcClass").append('<option value="">- 선 택 -</option>');
			});
		});
		//브랜드 대분류 변경시
		$("#brandLdClass").off("change").on("change",function(e){
			fnChangeBrandLd();
		});
		
		$("#ldClassMob").off("change").on("change",function(e){
			fnChangeBrandLd();
		});
	});

	//상단 조회버튼
	$(".viewLocalBtn").on("click",function(e){

		if(!$("#localYear:visible").val()){
			alert("분석기간을 선택해주세요.");
			return;
		}
//		if(!$("#localLdClass:visible").val()){
//			alert("대분류를 선택해주세요.");
//			return;
//		}
//		if(!$("#localMdClass:visible").val()){
//			alert("중분류를 선택해주세요.");
//			return;
//		}

		var frm = $("<form></form>");
		frm.attr("name","frm");
		frm.attr("method","post");
		frm.attr("action","/stat/franStatList.do");
		frm.append($('<input/>', {type: 'hidden', name: 'localYear', value: $("#localYear:visible").val() }));
		frm.append($('<input/>', {type: 'hidden', name: 'localLd', value: $("#localLdClass:visible").val()}));
		frm.append($('<input/>', {type: 'hidden', name: 'localMd', value: $("#localMdClass:visible").val()}));

		frm.appendTo("body");

		frm.submit();
	});
	//하단 조회버튼
	$(".viewBrandBtn").on("click",function(e){
		$("#startImg").hide();
		$("#searchTb").show();
		drawCharts("notInit");
		
		populMap.flyTo(['36.3812108152582','127.51094873'],6);
		cardMap.flyTo(['36.3812108152582','127.51094873'],6);
	});

	$("#btnBrandStat").on("click",function(e){
		$("#startImg").hide();
		$("#searchTb").show();
		drawCharts("notInit");
	});
	
	$("#viewBrandBtnMob").on("click",function(e){
		var text = '';
			if($("#ldClassMob option:selected").val()){
				text = $("#ldClassMob option:selected").text();
			}else{
				text = '전체';
			}
			if($("#mdClassMob option:selected").val()){
				text =  text + " - " + $("#mdClassMob option:selected").text();
			}
			if($("#brandFrcClassMob option:selected").val()){
				text =  text + " - " + $("#brandFrcClassMob option:selected").text();
			}
			$("#ldml").text(text);
			$("#yearMobText").text($("#yearMob option:selected").val() + "년 기준");
		drawCharts("notInit");
		
		if(!$("#yearMob option:selected").val() || !$("#ldClassMob option:selected").val() || !$("#mdClassMob option:selected").val() || !$("#brandFrcClassMob option:selected").val()){
			alert("분석기간과 프랜차이즈를 선택해주세요");
		}else{
			stepView(1);
		}
		
	});

	$("#brandFrcClass").click(function(){
		if($("#brandMdClass").val()){
			openFrchsPop();
		}
	});
});

$(window).load(function(){
	if(initFlag){
		drawCharts();
		initFlag = false;
	}
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

//브랜드 대분류 변경
function fnChangeBrandLd(){
	$("#brandMdClass").empty();
	$("#mdClassMob").empty();
	$("#brandMdClass").append('<option value="">- 전체 -</option>');
	$("#mdClassMob").append('<option value="">- 전체 -</option>');

	var selectedVal = $('#brandLdClass:visible').val();
	if(!selectedVal){
		if($(document).width() <= 687) {
			selectedVal = $("#ldClassMob option:selected").val();
		} else {			
			selectedVal = $("#ldClass option:selected").val();
		}
	}
	$("#brandLdClass").val( selectedVal );
	$("#ldClassMob").val( selectedVal );
	fnGetSyncAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {

		_data.frnchsMlsfcList.forEach(function(row,idx){
			if( !~row.mlsfcIndutyNm.indexOf("전체") ){//전체를 빼버리자 강제니까
				$("#brandMdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
				$("#mdClassMob").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
			}
		});
		// 대분류 경우의 수에 따른 중분류 제어 - 21.03.09
//		$("#brandMdClass").val(!$("#paramBrandMd").val() ? (initFlag ? "A1" : "") : (initFlag ? $("#paramBrandMd").val() : ""));
		if($("#paramBrandMd").val() == '' || $("#paramBrandMd").val() == null || $("#paramBrandMd").val() == 'undefined') {
			$("#brandMdClass").val('');
			$("#mdClassMob").val('');
		}

		$("#brandFrcClass").empty();
		$("#brandFrcClassMob").empty();
		$("#brandFrcClass").append('<option value="">- 전체 -</option>');
		$("#brandFrcClassMob").append('<option value="">- 전체 -</option>');

		$("#brandMdClass").off("change").on("change",function(e){
			$("#brandFrcClass").html('');
			$("#brandFrcClass").append('<option value="">- 전체 -</option>');
			$("#paramBrandFrc").val("");
			$("#paramBrandFrcNm").val("");
			var paramVal = $(this).val();
//			alert('paramVal : ' + paramVal);
//			console.log("중분류 선택" + paramVal);

			$.get(CARD_URL+"&VIEWPARAMS="+escape("MLSFC_INDUTY_CODE:"+paramVal+";"))
			.done(function(data){
				//console.log("요게 주소고",CARD_URL+escape("MLSFC_INDUTY_CODE:"+paramVal+";"));
//				console.log("이걸로 카드데이터쪽 변경합니다.",data);
//				cardObj = data;
				//psm - 중분류 선택 시 오류 수정
				cardObj = converJson(data);
			})
//			.done(function(data){
//				showPolygon("card");
//			})
			.fail(function(data){
				//console.log("Fail to load\nError code: "+ data);
			});
//			openFrchsPop();

		});
		
		$("#mdClassMob").off("change").on("change",function(e){
			$("#brandFrcClassMob").html('');
			$("#brandFrcClassMob").append('<option value="">- 전체 -</option>');		

			
			if(!$("#mdClassMob").val()){
				$("#brandFrcClassMob").attr('disabled', 'disabled');
			}else{
				$("#brandFrcClassMob").attr('disabled', false);
			}

			var params = {};//업종이랑 프랜차이즈명 like로
			params.jobCode  = $('#mdClassMob:visible').val();
//			params.frchsNm  = $("#searchFrchsNmMob").val();
			params.frchsNm  = '';
			fnGetAjaxData("/stat/selectFrchsList.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
						var tmpHtml = [];
						if(_data.dataList.length > 0){
							_data.dataList.forEach(function(row,idx){
								$("#brandFrcClassMob").append('<option value="' + row.frnchsNo + '">' + row.bsnSgnal + '</option>');
							});
						}
				} else {
					console.log("fail msg",_data.resultMsg);
				}
			});
		});
		
//		$("#mdClassMob").off("change").on("change",function(e){
//			var paramVal = $(this).val();
//
//			$.get(CARD_URL+"&VIEWPARAMS="+escape("MLSFC_INDUTY_CODE:"+paramVal+";"))
//			.done(function(data){
//				cardObj = converJson(data);
//			})
//			.done(function(data){
//				showPolygon("card");
//			})
//			.fail(function(data){
//
//			});			
//		});
	});
}

var sortList;
function drawCharts(type){
	var params ={};
	
	// 로딩시 초기값 설정 안되는 문제 수정 - 21.05.17
//	params.frchsNo = arguments.length > 0 ? $("#brandFrcClass").val() : "20080100109";
	if(arguments.length > 0) {
		$("#brandFrcClass").val();
	} else {
//		$("#brandLdClass").val($("#paramBrandLd").val() || "LC01");
		if($("#paramBrandMd").val() == '' || $("#paramBrandMd").val() == null || $("#paramBrandMd").val() == 'undefined') {
			$("#brandLdClass").val('');
		} else {
			$("#brandLdClass").val($("#paramBrandLd").val());
		}
		fnChangeBrandLd();
		//최초실행시
//		$("#brandFrcClass").empty();
//		$("#brandFrcClass").append('<option value="20080100109">김가네김밥</option>');
//		params.frchsNo = "20080100109";
		$("#brandFrcClass").empty();
		$("#brandFrcClass").append('<option value="">- 전체 -</option>');
	}
	
	//지역통계화면에서 조회했을 경우
//	if($("#paramBrandFrc").val()){
	if($("#brandMdClass").val() != ""){
		if($("#paramBrandFrc").val() != '' && $("#paramBrandFrc").val() != null && $("#paramBrandFrc").val() != 'undefined'){
			params.frchsNo = $("#paramBrandFrc").val();
			$(".frcClass").empty();
			$(".frcClass").append('<option value="'+params.frchsNo+'">' + $("#paramBrandFrcNm").val() + '</option>');
			//param setting 후 초기화
		}
	}
	params.year = $("#brandYear").val();
	params.lCode = $("#brandLdClass").val();
	params.mCode = $("#brandMdClass").val();
	
	var windowWidth = window.matchMedia("screen and (max-width:750px)");
	if (windowWidth.matches) {
		params.year =  $("#yearMob option:selected").val();
		params.lCode =  $("#ldClassMob option:selected").val();
		params.mCode =  $("#mdClassMob option:selected").val();
		params.frchsNo = $("#brandFrcClassMob option:selected").val();
	 }

	if( !params.year ){
		alert("분석기간을 선택해주세요.");
		return false;
	}
//	if( !params.frchsNo ){
//		alert("프랜차이즈를 선택해주세요.");
//		return false;
//	}

	fnGetAjaxData("/stat/franBrandStat.ajax", params, function(_data) {

		if(_data.resultCode == RESULT_SUCCESS){
			if(_data.dataList.length > 0 ){
//				$(".p_frchsNm").text( _data.dataList[0].bsnSgnal );

				$("#dataTable").empty();

				var data = new google.visualization.DataTable();
				var dataMob = new google.visualization.DataTable();
				data.addColumn('string', '지역');
				data.addColumn('number', '가맹점 수(단위:개)');
				data.addColumn('number', '평균매출액(단위:천원)');
				data.addColumn('number', '면적당 평균매출액(단위:천원)');
				data.addColumn('number', '종사자 수(단위:천원)');
				data.addColumn('number', '거주인구 수(단위:천명)');
				
				dataMob.addColumn('string', '지역');
				dataMob.addColumn('number', '가맹점 수(단위:개)');
				dataMob.addColumn('number', '평균매출액(단위:천원)');
				dataMob.addColumn('number', '면적당 평균매출액(단위:천원)');
				dataMob.addColumn('number', '종사자 수(단위:천원)');
				dataMob.addColumn('number', '거주인구 수(단위:천명)');

				var tbData = [];
				var tbDataMob = [];
				//영역 및 소팅용 기본 데이터 - 21.02.08
				var ddArea = $("#mCustomScrollbar");
				var ddAreaMob = $("#mCustomScrollbarMob");
				var ddList = "";
				var ddListMob = "";

				sortList = new Array();
				sortListMob = new Array();
				_data.dataList.forEach(function(row,idx){

//					console.log("row",row);
//				console.log("idx",idx);

					//지도에 총 가맹점 수 채우고
					$(".r" + row.ctprvnCode).find(".c").text( gfnNumberWithCommas(Number(row.mrhstCo)) );

					tbData.push([ row.ctprvnNm, Number(row.mrhstCo), Number(row.avrgSelngAm), Number(row.unitArAvrgSelngAm), Number(row.enfsnCo), (!row.popltnCo ? 0 :Number(row.popltnCo.toFixed(2))) ])
					// 영역 및 소팅용 동적 데이터 생성 - 21.02.08
					// 종사자 수 제거 - 21.03.16
					ddList += '<div class="row">';
					ddList += '<div class="col w1">'+fn_ctprvnNmLower(row.ctprvnNm)+'</div>';
					ddList += '<div class="col w2">'+("0" == row.mrhstCo ? "정보없음" : Number(row.mrhstCo).toLocaleString())+'</div>';
					ddList += '<div class="col w3">'+("0" == row.avrgSelngAm ? "정보없음" : Number(row.avrgSelngAm).toLocaleString())+'</div>';
					ddList += '<div class="col w4">'+("0" == row.unitArAvrgSelngAm ? "정보없음" : Number(row.unitArAvrgSelngAm).toLocaleString())+'</div>';
//					ddList += '<div class="col w5">'+("0" == row.enfsnCo || !row.enfsnCo ? "정보없음" : Number(row.enfsnCo).toLocaleString())+'</div>';
					ddList += '<div class="col w6">'+("0" == row.popltnCo || !row.popltnCo ? "정보없음" : Number(row.popltnCo.toFixed(2)).toLocaleString())+'</div>';
					ddList += '</div>';
//					console.log(idx+":"+row.enfsnCo);
					var sidoOject = new Object();
					sidoOject.ctprvnNm = fn_ctprvnNmLower(row.ctprvnNm);
					sidoOject.mrhstCo = ("0" == row.mrhstCo ? "정보없음" : Number(row.mrhstCo).toLocaleString());
					sidoOject.mrhstCoSort = Number(row.mrhstCo);
					sidoOject.avrgSelngAm = ("0" == row.avrgSelngAm ? "정보없음" : Number(row.avrgSelngAm).toLocaleString());
					sidoOject.avrgSelngAmSort = Number(row.avrgSelngAm);
					sidoOject.unitArAvrgSelngAm = ("0" == row.unitArAvrgSelngAm ? "정보없음" : Number(row.unitArAvrgSelngAm).toLocaleString());
					sidoOject.unitArAvrgSelngAmSort = Number(row.unitArAvrgSelngAm);
//					sidoOject.enfsnCo = ("0" == row.enfsnCo || !row.enfsnCo ? "정보없음" : Number(row.enfsnCo).toLocaleString());
//					sidoOject.enfsnCoSort = Number(row.enfsnCo);
					sidoOject.popltnCo = ("0" == row.popltnCo || !row.popltnCo ? "정보없음" : Number(row.popltnCo).toLocaleString());
					sidoOject.popltnCoSort = Number(row.popltnCo);
					sortList.push(sidoOject);
				});
				
				_data.dataList.forEach(function(row,idx){
					//지도에 총 가맹점 수 채우고
					$(".r" + row.ctprvnCode+"Mob").find(".c").text(" " + gfnNumberWithCommas(Number(row.mrhstCo)) );
					
					tbDataMob.push([ row.ctprvnNm, Number(row.mrhstCo), Number(row.avrgSelngAm), Number(row.unitArAvrgSelngAm), Number(row.enfsnCo), (!row.popltnCo ? 0 :Number(row.popltnCo.toFixed(2))) ])
					// 영역 및 소팅용 동적 데이터 생성 - 21.02.08
					ddListMob += '<div class="row">';
					ddListMob += '<div class="col w1" style="width: 30%;">'+fn_ctprvnNmLower(row.ctprvnNm)+'</div>';
					ddListMob += '<div class="col w2" style="width: 35%;">'+("0" == row.mrhstCo ? "정보없음" : Number(row.mrhstCo).toLocaleString())+'</div>';
					ddListMob += '<div class="col w3" style="width: 35%;">'+("0" == row.avrgSelngAm ? "정보없음" : Number(row.avrgSelngAm).toLocaleString())+'</div>';
//					ddListMob += '<div class="col w4" style="width: 93px;">'+("0" == row.unitArAvrgSelngAm ? "정보없음" : Number(row.unitArAvrgSelngAm).toLocaleString())+'</div>';
//					ddListMob += '<div class="col w6" style="width: 81px;">'+("0" == row.popltnCo || !row.popltnCo ? "정보없음" : Number(row.popltnCo.toFixed(2)).toLocaleString())+'</div>';
						/*ddListMob += '<div class="col w1" style="width: 50px;">'+fn_ctprvnNmLower(row.ctprvnNm)+'</div>';
						ddListMob += '<div class="col w2" style="width: 70px;">'+("0" == row.mrhstCo ? "정보없음" : Number(row.mrhstCo).toLocaleString())+'</div>';
						ddListMob += '<div class="col w3" style="width: 81px;">'+("0" == row.avrgSelngAm ? "정보없음" : Number(row.avrgSelngAm).toLocaleString())+'</div>';
						ddListMob += '<div class="col w4" style="width: 93px;">'+("0" == row.unitArAvrgSelngAm ? "정보없음" : Number(row.unitArAvrgSelngAm).toLocaleString())+'</div>';
						ddListMob += '<div class="col w6" style="width: 81px;">'+("0" == row.popltnCo || !row.popltnCo ? "정보없음" : Number(row.popltnCo.toFixed(2)).toLocaleString())+'</div>';*/
					ddListMob += '</div>';
					
					var sidoOject = new Object();
					sidoOject.ctprvnNm = fn_ctprvnNmLower(row.ctprvnNm);
					sidoOject.mrhstCo = ("0" == row.mrhstCo ? "정보없음" : Number(row.mrhstCo).toLocaleString());
					sidoOject.mrhstCoSort = Number(row.mrhstCo);
					sidoOject.avrgSelngAm = ("0" == row.avrgSelngAm ? "정보없음" : Number(row.avrgSelngAm).toLocaleString());
					sidoOject.avrgSelngAmSort = Number(row.avrgSelngAm);
					sidoOject.unitArAvrgSelngAm = ("0" == row.unitArAvrgSelngAm ? "정보없음" : Number(row.unitArAvrgSelngAm).toLocaleString());
					sidoOject.unitArAvrgSelngAmSort = Number(row.unitArAvrgSelngAm);
					sidoOject.popltnCo = ("0" == row.popltnCo || !row.popltnCo ? "정보없음" : Number(row.popltnCo).toLocaleString());
					sidoOject.popltnCoSort = Number(row.popltnCo);
					sortListMob.push(sidoOject);
				});

				data.addRows(tbData);
				dataMob.addRows(tbDataMob);
				var table = new google.visualization.Table(document.getElementById('dataTable'));
				var tableMob = new google.visualization.Table(document.getElementById('dataTableMob'));

				// 숨김영역으로 높이/너비 삭제 - 21.02.08
//			table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
				// 조건에 따른 분기 - 21.02.24 - 최초 조회결과가 없을때 목록이 정상으로 출력안되서 주석처리 함 21.02.26
//				if(type != "notInit") {
//				console.log("!?"+!$("[class*=_container]").html());
				if(!$("[class*=_container]").html()) {
//					console.log("그리기");
					ddArea.empty();
					ddAreaMob.empty();
					table.draw(data, {showRowNumber: false});
					tableMob.draw(data, {showRowNumber: false});
					ddArea.html(ddList);
					ddArea.mCustomScrollbar();
					ddAreaMob.html(ddListMob);
					ddAreaMob.mCustomScrollbar();
				} else {
//					console.log("안그리기");
					ddArea.find("[class*=_container]").empty();
					ddArea.find("[class*=_container]").html(ddList);
					ddAreaMob.find("[class*=_container]").empty();
					ddAreaMob.find("[class*=_container]").html(ddListMob);
				}

				// 데이터 넣기 및 영역 설정 - 21.02.08
				JSON.stringify(sortList);
				JSON.stringify(sortListMob);
			}else{
				var colGroupWidth = $("#columArea").width();
				var ddArea = $("#mCustomScrollbar");
				var ddAreaMob = $("#mCustomScrollbarMob");
				var ddList = "";
				var ddListMob = "";
				ddList += '<div class="row" style="width:'+colGroupWidth+'px"><div style="text-align:center;">조회된 결과가 없습니다.</div></div>';
				ddListMob += '<div class="row" style="width:auto"><div style="text-align:center;">조회된 결과가 없습니다.</div></div>';
				// 그리기 영역 수정 - 21.03.09
				if(!$("[class*=_container]").html()) {
//					console.log("그리기");
					ddArea.empty();
					ddAreaMob.empty();
					ddArea.html(ddList);
					ddAreaMob.html(ddListMob);
					ddArea.mCustomScrollbar();
					ddAreaMob.mCustomScrollbar();
				} else {
//					console.log("안그리기");
					ddArea.find("[class*=_container]").empty();
					ddArea.find("[class*=_container]").html(ddList);
					ddAreaMob.find("[class*=_container]").empty();
					ddAreaMob.find("[class*=_container]").html(ddListMob);
				}
//				if(Number($("#brandYear").val()) ==  Number($("#brandYear").find("option")[$("#brandYear").find("option").length-1].value)){
				
				var windowWidth = window.matchMedia("screen and (max-width:750px)");
				if (!windowWidth.matches) {
					if(Number($("#brandYear").val()) >  Number($("#brandYear").find("option")[0].value)){
						alert($("#brandYear").val() + "년 데이터가 없어 " + _data.dataYear + "년 데이터로 조회합니다.");
						$("#brandYear").val(_data.dataYear);
						drawCharts("notInit"); // type 없을시 2018년도 조회시 다른 값 조회 오류 수정 - 21.03.09
					}else if(Number($("#brandYear").val()) ==  Number($("#brandYear").find("option")[0].value)){
						alert($("#brandYear").val() + "년 이전 분석기간이 존재하지 않습니다.");
						//psm - 분석기간 미존재 시 이전 조회 브랜드 명칭 남아있는 오류 수정
						$('.p_frchsNm').text($('#paramBrandFrcNm').val());
					}
				}else{
					if(Number($("#yearMob").val()) >  Number($("#yearMob").find("option")[0].value)){
						alert($("#yearMob").val() + "년 데이터가 없어 " + _data.dataYear + "년 데이터로 조회합니다.");
						$("#yearMob").val(_data.dataYear);
						$("#yearMobText").text(_data.dataYear + '년 기준');
						drawCharts("notInit"); // type 없을시 2018년도 조회시 다른 값 조회 오류 수정 - 21.03.09
					}else if(Number($("#yearMob").val()) ==  Number($("#yearMob").find("option")[0].value)){
						alert($("#yearMob").val() + "년 이전 분석기간이 존재하지 않습니다.");
						//psm - 분석기간 미존재 시 이전 조회 브랜드 명칭 남아있는 오류 수정
						$('.p_frchsNmMob').text($('#brandFrcClassMob option:selected').text());
					}
				}
			}
		} else {
			alert("error.");
		}
	});
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

	return ctprvnNm
}
function fn_sortJson(obj,text) {
//	console.log("sort 전 : ", sortList);
	if(!!$(obj).closest("dl").find("div[class*=mCSB_container]")) {
		$(obj).closest("dt").find("a[class*=sortUp]").attr('class',' iUp');
		$(obj).closest("dt").find("a[class*=sortDown]").attr('class',' iDown');

		// order는 key b - a 는 내림차순 a - b 는 오름차순
		if($(obj).hasClass('iUp')) {
			if(typeof sortList[0][text] == "number") {
				sortList.sort(function (a, b) {return parseFloat(a[text]) - parseFloat(b[text]);});
			} else {
				sortList.sort(function (a, b) {return a[text].localeCompare(b[text]);});
			}
			$(obj).attr('class','sortUp');
		} else {
			(typeof sortList[0][text] == "number") ? sortList.sort(function (a, b) {return parseFloat(b[text]) - parseFloat(a[text]);}) : sortList.sort(function (a, b) {return b[text].localeCompare(a[text]);});
			$(obj).attr('class','sortDown');
		}

//	console.log("sort 후 : ", sortList);

		var ddList = "";
		sortList.forEach(function(row,idx){
			var windowWidth = window.matchMedia("screen and (max-width:750px)");
			 if (!windowWidth.matches) {
					ddList += '<div class="row">';
					ddList += '<div class="col w1">'+fn_ctprvnNmLower(row.ctprvnNm)+'</div>';
					ddList += '<div class="col w2">'+row.mrhstCo+'</div>';
					ddList += '<div class="col w3">'+row.avrgSelngAm+'</div>';
					ddList += '<div class="col w4">'+row.unitArAvrgSelngAm+'</div>';
//					ddList += '<div class="col w5">'+row.enfsnCo+'</div>';
					ddList += '<div class="col w6">'+row.popltnCo+'</div>';
					ddList += '</div>';	
				 } else { 
					ddList += '<div class="row">';
					ddList += '<div class="col w1" style="width: 30%;">'+fn_ctprvnNmLower(row.ctprvnNm)+'</div>';
					ddList += '<div class="col w2" style="width: 35%;">'+row.mrhstCo+'</div>';
					ddList += '<div class="col w3" style="width: 35%;">'+row.avrgSelngAm+'</div>';
//					ddList += '<div class="col w4" style="width: 93px;">'+row.unitArAvrgSelngAm+'</div>';
//						ddList += '<div class="col w5" style="width: 50px;">'+row.enfsnCo+'</div>';
//					ddList += '<div class="col w6" style="width: 81px;">'+row.popltnCo+'</div>';
					ddList += '</div>';
			}			
		});

		$(obj).closest("dl").find("div[class*=mCSB_container]").html(ddList);
		$(obj).closest("dl").find("#mCustomScrollbar").mCustomScrollbar("scrollTo","top",{   scrollInertia:0});
	} else {
		console.log("정렬을 찾지 못했습니다.");
	}
}






