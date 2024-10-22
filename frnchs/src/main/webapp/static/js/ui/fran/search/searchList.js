//팝업들로 넘길 param
var densityObj = {};
var compareObj = {};
var newsObj = {};
var count = 0;
var cnt = 0;
var year = 0;

//자주찾는 인기 브랜드 TOP10
function fn_brandTopList() {
	fnGetAjaxData("/main/getTopHundredList.ajax", {}, function(_data) {
		$("#topList").empty();
		if(_data.resultCode == RESULT_SUCCESS){
			var topHtml = "";
			_data.dataList.forEach(function(item, idx){	
				if(idx >= 10){
					return false;
				};
				var year = item.year == null ? "" : item.year;
				topHtml += '<a href=\'/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+ item.frnchsNo+'&brandYear='+year+'\';\" data-id="'+item.frnchsNo+'">';
				topHtml += '<span>'+item.schBrdWord+'</span>';
				topHtml += '</a>';
			});
			$("#topList").append(topHtml);
		} else {
			alert(_data.resultMsg);
		}
	});
};
function fn_brandTopListMob() {
	fnGetAjaxData("/main/getTopHundredList.ajax", {}, function(_data) {
		$("#topListMob").empty();
		if(_data.resultCode == RESULT_SUCCESS){
			var topHtml = "";
			_data.dataList.forEach(function(item, idx){	
				if(idx >= 10){
					return false;
				};
				var year = item.year == null ? "" : item.year;
				topHtml += '<a href=\'/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+ item.frnchsNo+'&brandYear='+year+'\';\" data-id="'+item.frnchsNo+'">';
				topHtml += '<span>'+item.schBrdWord+'</span>';
				topHtml += '</a>';
			});
			$("#topListMob").append(topHtml);
		} else {
			alert(_data.resultMsg);
		}
	});
};

//선택 조건 리스트 condition_list 요기 구성하기
function appendHtml(str,id){

	var tmpHtml = [];
	tmpHtml.push('<span class="ls">')
	tmpHtml.push('	<a href="javascript:void(0)" class="ul">'+str+'</a>')
	tmpHtml.push('	<a href="javascript:void(0)" id="'+id+'" class="iDel">삭제</a>')
	tmpHtml.push('</span>')

	$(".condition_list .mAttach1").append( tmpHtml.join("") );
}

//검색조건 문자 만들고 검색 ㄱ
var sortSidoArr = [];
function mkConditionList(){

	$(".condition_list .mAttach1").html('');

	//selectbox
	if( !~$(".ldClass option:selected").text().indexOf("전체") ){
		appendHtml("대분류 업종 > " + $(".ldClass option:selected").text(),"ldClass");
	}

	if( !~$(".mdClass option:selected").text().indexOf("전체") ){
		appendHtml("중분류 업종 > " + $(".mdClass option:selected").text(),"mdClass");
	}

	//a tag
	if( !~$(".levy .selected").text().indexOf("전체") ){
		appendHtml( "가맹점사업자의 부담금 > " +$(".levy .selected").text(), "levy");
	}

	if( !~$(".inte .selected").text().indexOf("전체") ){
		appendHtml( "인테리어 비용 > " +$(".inte .selected").text(), "inte");
	}

	//chkbox
	var sidoStr = "";
	$("input[name='sidoChk']:checked").each(function(idx,row){
		sidoStr += $(this).attr("title") + ", ";
	});
	sidoStr = sidoStr.substr(0,sidoStr.length-2);
	if( sidoStr ){
		appendHtml("창업희망지역 > " + sidoStr ,"sido");
	}

	//selectbox
	/* 표기 안되게 - 21.02.15
	if( !~$(".cls_rate option:selected").text().indexOf("전체") ){
		appendHtml("폐업률 > " + $(".cls_rate option:selected").text(),"cls_rate");
	}
	*/
	if( !~$(".biz_year option:selected").text().indexOf("전체") ){
		appendHtml("본사업력 > " + $(".biz_year option:selected").text(),"biz_year");
	}

	if( !~$(".debt_ratio option:selected").text().indexOf("전체") ){
		appendHtml("본사부채비율 > " + $(".debt_ratio option:selected").text(),"debt_ratio");
	}
	/* 표기 안되게 - 21.02.15
	if( !~$(".avg_sale option:selected").text().indexOf("전체") ){
		appendHtml("면적(3.3㎡)당 평균매출액 > " + $(".avg_sale option:selected").text(),"avg_sale");
	}
	*/

	$(".condition_list .mAttach1").append(' <a href="javascript:void(0)" id="r_all" class="btnRelease2">전체해제</a> ');

	//개별조건 없애기
	/* 
	 * 동적 델버튼 클릭시도 조회 - 21.02.15
	 * 업종 델버튼 시 수정 - 21.02.15 
	 * */
	$(document).off("click").on("click", ".iDel",function(e){
//	$(".iDel").off("click").on("click",function(e){
		e.preventDefault();

		$(this).parent().remove();
		var selector = $("." + $(this).attr("id"));
		if( selector[0].tagName == "SELECT" ){//업종 TODO 서브조건..
			if(selector.closest("dd").hasClass("type4")) {
				selector.find("option:first").prop("selected",true);
			} else if (selector.closest("dd").hasClass("type1")) {
//				console.log(">> 업종");
				selector.closest("dd").find("select:first").find("option:first").prop("selected",true);
				$("select.mdClass").html('<option value="">전체</option>');
				$("div[class='mAttach1']").find("[id='ldClass'], [id='mdClass']").parent().remove();
//				$("select.mdClass").find("option:last").prop("selected",true);
			} else {
				selector.find("option:last").prop("selected",true);
			}

		}else if( selector[0].tagName == "DD" ){//시도 컨트롤
			selector.find(":checkbox").attr("checked",false);

		}else if( selector[0].tagName == "SPAN" ){//창업비용쪽 컨트롤
			selector.find("a:first").click();
		}
		
		mkConditionList();
	});

	//전체조건 없애기
	$("#r_all").off("click").on("click",function(e){
		e.preventDefault();

		$(".ldClass").find("option:first").prop("selected",true);
		$(".mdClass").empty().append('<option value="">전체</option>');
		$(".levy a").removeClass("selected");
		$(".levy").find("a:first").addClass("selected");
		$(".inte a").removeClass("selected");
		$(".inte").find("a:first").addClass("selected");
		$(".sido").find(":checkbox").prop("checked",false);
		// 전체 해제 시 type4 영역 초기화 - 21.02.24
		$("dd.type4").find("select").find("option:first").prop("selected",true);
		
		mkConditionList();
	});

	//업종 선택해제
	$(".choice").off("click").on("click",function(e){

		if( ~$(this).attr("id").indexOf("r_job") ){
			$(".ldClass").find("option:first").prop("selected",true);
			$(".mdClass").empty().append('<option value="">전체</option>');
		}

		if( ~$(this).attr("id").indexOf("r_cost") ){
			$(".levy a").removeClass("selected");
			$(".levy").find("a:first").addClass("selected");
			$(".inte a").removeClass("selected");
			$(".inte").find("a:first").addClass("selected");
		}

		if( ~$(this).attr("id").indexOf("r_sido") ){
//			console.log(">> sortSidoArr be:"+sortSidoArr);
			sortSidoArr = [];
//			console.log(">> sortSidoArr af:"+sortSidoArr);
			$(".sido").find(":checkbox").attr("checked",false);
		}

		if( ~$(this).attr("id").indexOf("r_sub") ){
			// 선택 해제시 type4 영역 초기화 - 21.02.24
			$("dd.type4").find("select").find("option:first").prop("selected",true);
		}

		mkConditionList();

	});

		search_frchs(1);
		searchMob_frchs(1);
		
}//func[e]

function sendParam(){

	densityObj.year = year;

	return densityObj;

}


function sendCompareObj(){
	return compareObj;
}

function sendNewsObj(){
	return newsObj;
}

function search_frchs(pageIndex) {

	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);

	/*
	 * 넘겨야할거
	 *
	 * 1.페이지번호
	 * 2.페이지당 목록 수
	 * 3.검색할 파라미터
	 */

	var params = {};
	params.pageIndex = pageIndex;
	params.recordCountPerPage = $("select.recordCountPerPage").val();
	params.ldClass = $("select.ldClass").val();
	params.mdClass = $("select.mdClass").val();
	// 서브 항목 4개 추가 - 21.02.10
	params.closeRate = $("select[name=closeRate]").val();
	params.histYear = $("select[name=histYear]").val();
	params.deptRatio = $("select[name=deptRatio]").val();
	params.unitArAvrgSelngAm = $("select[name=unitArAvrgSelngAm]").val();

	if( $("span.levy .selected").attr("id") == "levy_1" ){
		params.levy1 = 10000;
		params.levy2 = 30000;
	}else if( $("span.levy .selected").attr("id") == "levy_3" ){
		params.levy1 = 30000;
		params.levy2 = 50000;
	}else if( $("span.levy .selected").attr("id") == "levy_5" ){
		params.levy1 = 50000;
		params.levy2 = 100000;
	}else if( $("span.levy .selected").attr("id") == "levy_10" ){
		params.levy1 = 100000;
		params.levy2 = 200000;
	}else if( $("span.levy .selected").attr("id") == "levy_20" ){
		params.levy1 = 200000;
		params.levy2 = 999999;
	}

	if( $("span.inte .selected").attr("id") == "inte_1" ){
		params.inte1 = 10000;
		params.inte2 = 30000;
	}else if( $("span.inte .selected").attr("id") == "inte_3" ){
		params.inte1 = 30000;
		params.inte2 = 50000;
	}else if( $("span.inte .selected").attr("id") == "inte_5" ){
		params.inte1 = 50000;
		params.inte2 = 100000;
	}else if( $("span.inte .selected").attr("id") == "inte_10" ){
		params.inte1 = 100000;
		params.inte2 = 200000;
	}else if( $("span.inte .selected").attr("id") == "inte_20" ){
		params.inte1 = 200000;
		params.inte2 = 999999;
	}

	var ctprvnCodeArr = [];
	$("input[name='sidoChk']:checked").each(function(idx){
		ctprvnCodeArr.push( $(this).val() );
	})
	params.ctprvnCodeArr = ctprvnCodeArr.join(",");
	params.sortSidoArr = sortSidoArr.join(","); // 신규추가 - 21.02.10
//	console.log(">>> data:"+params.sortSidoArr);
	$.post('/fran/selectAttnFrnchsList.ajax',params).done(function(data) {
//		console.log("data",data);
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			var resultCount = gfnNumberWithCommas(data.resultCount);
			$("#totalCnt").text(resultCount);
			$("#dataTbody").empty();

			var dataList = data.frchsList;
			if(!!dataList && dataList.length != 0) {
				var tmpHtml = [];

				dataList.forEach(function(row,idx){
					tmpHtml.push('<tr>');
					tmpHtml.push('	<td>');
					tmpHtml.push('		<span class="mCheckbox notext">');
					tmpHtml.push('			<input type="checkbox" id="labelCheckbox1_'+Number(idx+1)+'" name="checkbox1" title="선택" value="'+row.frnchsNo+'">');
					tmpHtml.push('			<label for="labelCheckbox1_'+Number(idx+1)+'">선택</label>');
					tmpHtml.push('		</span>');
					tmpHtml.push('	</td>');
					tmpHtml.push('	<td>');
					var year = row.year == null ? "" : row.year;
//					tmpHtml.push('		<a href="/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+ row.frnchsNo+'&brandYear='+year+'" onclick="window.open(this.href); return false;" class="ul">'+row.bsnSgnal+'</a>');
					tmpHtml.push('		<input type="hidden" class="bsnSgnalNm" value='+row.bsnSgnal+' />');
					tmpHtml.push('		<a href="/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+ row.frnchsNo+'&brandYear='+year+'" onclick="window.open(this.href); return false;">'+row.bsnSgnal+'</a>');
//					tmpHtml.push(row.bsnSgnal);

					if( row.deleteAt == "N"){
						tmpHtml.push('		<a href="javascript:void(0)" id="'+row.frnchsNo+'" class="iFavor selected" style="display:none;">추천</a>');
					}else{
						tmpHtml.push('		<a href="javascript:void(0)" id="'+row.frnchsNo+'" class="iFavor" style="display:none;">추천</a>');
					}
					tmpHtml.push('	</td>');
					tmpHtml.push('	<td>'+row.lclasIndutyNm+'</td>');
					tmpHtml.push('	<td>'+row.mlsfcIndutyNm+'</td>');
					tmpHtml.push('	<td>'+numberWithCommas(row.sm)+'</td>');
//					tmpHtml.push('	<td>'+row.ctprvnNm+'</td>'); // 창업 희망 지역 제거 - 21.02.15
//					tmpHtml.push('	<td>'+row.closeRate+'</td>'); // 폐점율 표기 안되게 - 21.02.15
					tmpHtml.push('	<td>'+row.histYear+'년</td>');
					tmpHtml.push('	<td>'+Number(row.deptRatio*100).toFixed(0)+'%</td>');
//					tmpHtml.push('	<td>'+numberWithCommas(row.unitArAvrgSelngAm)+'</td>');
					
					//주요지표 - 21.11.26 주한별
					//지표 채우기
					// 공정성 5개 만점에서 3개로 변경 - 21.03.16
					// 공정성 칸은 5개 지만 만점 3개 - 21.03.18
					tmpHtml.push('	<td>');
					tmpHtml.push('<div class="mGraph4">');
					tmpHtml.push('<span class="ls" style="float:left;width: 40%;border:0px;margin-left:12%">');
					tmpHtml.push('<span class="t" style="padding:0% 10% 0% 10%;color:#f8a80f;">수익성');
					tmpHtml.push('<span class="lMsg" style="width:150px">당기순이익 / 총자산 * 100</span> ');
					tmpHtml.push('</span>');
					tmpHtml.push('<span class="c prftblGrad">');
					for(var i=0; i<5; i++){
						if( i < Number(row.prftblGrad) ){
							tmpHtml.push('<span style="background-color:#f8a80f;"></span>');
						}else{
							tmpHtml.push('<span></span>');
						}
					}
					tmpHtml.push('</span>');
					/*tmpHtml.push('</span>');
					tmpHtml.push('<span class="ls" style="width: 50%;border:0px;">');*/
					tmpHtml.push('<span class="t" style="padding:0% 10% 0% 10%;color:#e67c97;">공정성');
					tmpHtml.push('<span class="lMsg" style="width:200px">공정거래위원회의 시정조치 건수 + 민사소송 패소 및 민사상 화해 건수 + 형의 선고 건수</span> ');
					tmpHtml.push('</span>');
					tmpHtml.push('<span class="c fairGrad">');
					for(var i=0; i<5; i++){
						if( i < Number(row.fairGrad) ){
							tmpHtml.push('<span style="background-color:#e67c97;"></span>');
						}else{
							tmpHtml.push('<span></span>');
						}
					}
					tmpHtml.push('</span>');
					tmpHtml.push('</span>');
					tmpHtml.push('<span class="ls" style="float:left;width: 40%; border:0px;margin-left:0px;">');
					tmpHtml.push('<span class="t" style="padding:0% 10% 0% 10%;color:#3c7ce6;">성장성');
					tmpHtml.push('	<span class="lMsg" style="width:170px">당기매출액 / 전기매출액 * 100</span> ');
					tmpHtml.push('</span>');
					tmpHtml.push('<span class="c growthGrad">');
					for(var i=0; i<5; i++){
						if( i < Number(row.growthGrad) ){
							tmpHtml.push('<span style="background-color:#3c7ce6;"></span>');
						}else{
							tmpHtml.push('<span></span>');
						}
					}
					tmpHtml.push('</span>');
					/*tmpHtml.push('	</span>');
					tmpHtml.push('<span class="ls" style="width: 50%; border:0px;">');*/
					tmpHtml.push('<span class="t" style="padding:0% 10% 0% 10%;color:#55ba50;">안전성');
					tmpHtml.push('	<span class="lMsg" style="width:230px">부채총계 / 자기자본<br>(자본금 + 이익잉여금 + 자본잉여금) * 100</span>');
					tmpHtml.push('</span>');
					tmpHtml.push('<span class="c safeGrad">');
					for(var i=0; i<5; i++){
						if( i < Number(row.safeGrad) ){
							tmpHtml.push('<span style="background-color:#55ba50;"></span>');
						}else{
							tmpHtml.push('<span></span>');
						}
					}
					tmpHtml.push('</span>');
					tmpHtml.push('</span>');
					tmpHtml.push('</div>');
					tmpHtml.push('	</td>');
					//정보공개서 - 21.11.26 주한별 임시..
					if(row.inputFileNm == null || row.atchmnflNo == 0) {
						tmpHtml.push('	<td><a href="javascript:void(0)">-</a></td>');
					} else {						
//						tmpHtml.push('	<td><a onclick="yesFile(\''+row.atchmnflNo+'\',\''+row.fileSn+'\',\''+encodeURIComponent(row.fileKey)+'\');" class="ul"><img src="/static/images/i_download_gr.png" width="20" height="25"></a></td>');
						tmpHtml.push('	<td><a onclick="yesFile(\''+row.atchmnflNo+'\',\''+row.fileSn+'\',\''+encodeURIComponent(row.fileKey)+'\');" class="ul"><img src="/static/images/i_download_gr.png"></a></td>');
					}
					/*tmpHtml.push('	<td><a href="javascript:void(0)">'+row.inputFileNm+'</a></td>');*/
					
					tmpHtml.push('	<td>');
					tmpHtml.push('		<a href="javascript:void(0)" id="'+row.ctprvnCode+","+row.frnchsNo+","+row.mlsfcIndutyCode+","+row.closeRate+","+row.year+'" class="mBtn1 m lPrimary" rel="opener">지도보기</a>'); // 폐점률 추가 - 21.03.11
					tmpHtml.push('	</td>');
					tmpHtml.push('</tr>');
				});

				$("#dataTbody").append(tmpHtml.join(""));


				$("input[name='checkbox1']").off("change").on("change",function(){
					if( $("input[name='checkbox1']:checked").length > 2 ){
						alert("비교할 두개의 브랜드를 선택해주세요.");
						$(this).prop("checked",false);
					}
				});

				$(".lPrimary").off("click").on("click",function(e){
					e.preventDefault();
					densityObj.ctprvnCode = $(this).attr("id").split(",")[0];
					densityObj.frnchsNo = $(this).attr("id").split(",")[1];
					densityObj.mlsfcIndutyCode = $(this).attr("id").split(",")[2];
					/* 폐점률 방법 변경 - 21.03.11
					densityObj.closeRate = $(this).parent("td").siblings("td:eq(6)").text();
					*/
					densityObj.closeRate = ($(this).attr("id").split(",")[3] || '0')+'%';

					var pop = window.open('/fran/search/densityBrand.do');

				});


				$(".iFavor").off("click").on("click",function(e){
					e.preventDefault();

					var param = {};
					param.frnchsNo = $(this).attr("id");

					var confirmMsg = "";

					if( $(this).hasClass("selected") ){
						param.flag = 'Y';
						confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
					}else{
						param.flag = 'N';
						confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
					}

					if( confirm(confirmMsg) ){
						intrstFrnchs(param);
					}else{
						return false;
					}
				});
				
			} else {
				$("#dataTbody").append('<tr><td colspan="10">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");

		}else{
			console.log("데이터가 없습니다.");
			//alert(data.resultMsg);

			$("#totalCnt").empty();
			$("#totalCnt").text(0);
			$("#dataTbody").empty();

			$("#dataTbody").append('<tr><td colspan="10">조회된 내용이 없습니다.</td></tr>');
			$(".mPag").html('<a title="현재페이지" href="javascript:void(0)" class="selected">1</a>');
		}
	});
}

function searchMob_frchs(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	
	var params = {};
	params.pageIndex = pageIndex;
	/*params.recordCountPerPage = $("select.recordCountPerPage").val();*/
	params.ldClass = $("#ldId").val();
	params.mdClass = $("#mdId").val();
	params.closeRate = $("select[name=closeRate]").val();
	params.histYear = $("select[name=mobHistYear]").val();
	params.deptRatio = $("select[name=mobDeptRatio]").val();
	/*params.unitArAvrgSelngAm = $("select[name=unitArAvrgSelngAm]").val();*/
	if( $("#selLevyMob option:selected").val() == "levy_1" ){
		params.levy1 = 10000;
		params.levy2 = 30000;
	}else if($("#selLevyMob option:selected").val() == "levy_3" ){
		params.levy1 = 30000;
		params.levy2 = 50000;
	}else if($("#selLevyMob option:selected").val() == "levy_5" ){
		params.levy1 = 50000;
		params.levy2 = 100000;
	}else if($("#selLevyMob option:selected").val() == "levy_10" ){
		params.levy1 = 100000;
		params.levy2 = 200000;
	}else if($("#selLevyMob option:selected").val() == "levy_20" ){
		params.levy1 = 200000;
		params.levy2 = 999999;
	}

	if($("#selInteMob option:selected").val() == "inte_1" ){
		params.inte1 = 10000;
		params.inte2 = 30000;
	}else if($("#selInteMob option:selected").val() == "inte_3" ){
		params.inte1 = 30000;
		params.inte2 = 50000;
	}else if($("#selInteMob option:selected").val() == "inte_5" ){
		params.inte1 = 50000;
		params.inte2 = 100000;
	}else if($("#selInteMob option:selected").val() == "inte_10" ){
		params.inte1 = 100000;
		params.inte2 = 200000;
	}else if($("#selInteMob option:selected").val() == "inte_20" ){
		params.inte1 = 200000;
		params.inte2 = 999999;
	}
	var ctprvnCodeArr = [];
	$("input[name='sidoChk']:checked").each(function(idx){
		ctprvnCodeArr.push( $(this).val() );
	})
	params.ctprvnCodeArr = ctprvnCodeArr.join(",");
	params.sortSidoArr = sortSidoArr.join(","); // 신규추가 - 21.02.10
	
	$.post('/fran/selectAttnFrnchsList.ajax',params).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCntMob").empty();
			var resultCount = gfnNumberWithCommas(data.resultCount);
			$("#totalCntMob").text(resultCount);

			var dataList = data.frchsList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){
					dataMobTr += '<li>';
					
					dataMobTr += '<div class="box" onclick="addActive(this);">';
					dataMobTr += '	<input type="hidden" class="boxFrnchsNo" value="'+data.frnchsNo+'">';
					dataMobTr += '	<div class="brand">';
					dataMobTr += '		<p class="type">';
					dataMobTr += '			<span>' + data.lclasIndutyNm + ' - ' + data.mlsfcIndutyNm + '</span>';
					dataMobTr += '		</p>';
//					dataMobTr += '		<p class="name">'+ data.bsnSgnal + '</p>';
					dataMobTr += '		<p class="name">';
					var year = data.year == null ? "" : data.year;
					dataMobTr += '        <input type="hidden" class="bsnSgnalNm" value='+data.bsnSgnal+' />';
					dataMobTr += '        <a href="/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+ data.frnchsNo+'&brandYear='+year+'" onclick="window.open(this.href); return false;" class="ul">'+data.bsnSgnal+'</a>';
					dataMobTr += '		</p>';
					dataMobTr += '	</div>';
					
					dataMobTr += '	<div class="detail col2">';
					dataMobTr += '		<dl>';
					dataMobTr += '			<dt>창업비용</dt>';
					dataMobTr += '			<dd>' + numberWithCommas(data.sm) + '</dd>';
					dataMobTr += '		</dl>';
					dataMobTr += '		<dl>';
					dataMobTr += '			<dt>본사입력</dt>';
					dataMobTr += '			<dd>' + data.histYear + '</dd>';
					dataMobTr += '		</dl>';
					dataMobTr += '		<dl>';
					dataMobTr += '			<dt>본사부채비율</dt>';
					dataMobTr += '			<dd>' + Number(data.deptRatio*100).toFixed(0) + '%' + '</dd>';
					dataMobTr += '		</dl>';
					dataMobTr += '	</div>';
					dataMobTr += '</div>';
					
					dataMobTr += '<div class="btn">';
					if(data.deleteAt == "N"){
						dataMobTr += '	<button id="'+data.frnchsNo+'Mob'+'" value="'+data.frnchsNo+'" class="wish selected" style="display:none;"></button>';
					}else{
						dataMobTr += '	<button id="'+data.frnchsNo+'Mob'+'" value="'+data.frnchsNo+'" class="wish" style="display:none;"></button>';
					}
					dataMobTr += '	<button class="mapView" id="'+data.ctprvnCode+","+data.frnchsNo+","+data.mlsfcIndutyCode+","+data.closeRate+","+data.year+'" type="submit" rel="opener"></button>';
					if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataMobTr += '	<button class="download" onclick="javascript:noFile()"></button>';
//						$(".download").unbind();
//						$(".download").click(function(){
//							alert("첨부된 파일이 없습니다.");
//						});
					}else{
						dataMobTr += '	<button class="download" onclick="yesFile(\''+data.atchmnflNo+'\',\''+data.fileSn+'\',\''+encodeURIComponent(data.fileKey)+'\');"></button>';
					}
					dataMobTr += '</div>';
					
					dataMobTr += '</li>';
				})
				$("#dataTbodyMob").append(dataMobTr);

				$(".box").unbind();
				$(".box").click(function() {
					if($(this).hasClass("active")){
						count++;
					}else {
						count--;
					}
					
					if(count > 2){
						if($(this).hasClass("active")){
							$(this).removeClass("active");
							count--;
						}
					}
					if(count == 2){
						$("#btnComp").css('color', '#fff');
						$("#btnComp").css('backgroundColor', '#fcc710');
						$("#btnComp").css('borderColor', '#fcc710');
					}else{
						$("#btnComp").css('color', '#999');
						$("#btnComp").css('backgroundColor', '#f1f1f1');
						$("#btnComp").css('borderColor', '#f1f1f1');
					}
				});
				
				$(".mapView").off("click").on("click",function(e){
					e.preventDefault();
					densityObj.ctprvnCode = $(this).attr("id").split(",")[0];
					densityObj.frnchsNo = $(this).attr("id").split(",")[1];
					densityObj.mlsfcIndutyCode = $(this).attr("id").split(",")[2];
					densityObj.closeRate = ($(this).attr("id").split(",")[3] || '0')+'%';
					year = ($(this).attr("id").split(",")[4]);
					
					var pop = window.open('/fran/search/densityBrand.do');
				});
				
				$(".wish").off("click").on("click",function(e){
					e.preventDefault();
					var param = {};
					
					param.frnchsNo = $(this).attr("value");
					
					var confirmMsg = "";
					
					if( $(this).hasClass("selected") ){
						param.flag = 'Y';
						confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
					}else{
						param.flag = 'N';
						confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
					}
					
					if( confirm(confirmMsg) ){
						intrstFrnchsMob(param);
						
					}else{
						return false;
					}
				});
				
				$("#btnMobSearch").click();
			} else {
				var maxPage = 1;
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/1)';
			}
			$("input[name=pageIndexMobMax]").val(maxPage);
			$("#pagingMob").text(pagingText);
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
		
	});
	
	
}

function noFile(){
	alert("첨부된 파일이 없습니다.");
}

function fn_searchMob(){
	$("#dataTbodyMob").empty();
	count = 0;
	searchMob_frchs(1);
}

$(document).ready(function() {
	
	//자주찾는 인기 브랜드 TOP10
	
	if($(document).width() <= 687) {
		fn_brandTopListMob();
	} else {
		fn_brandTopList();
	}
	
	$("#btnMobSearchVal").keydown(function(key) {
		if (key.keyCode == 13 ) {
			fn_searchMob();
		}
	})

	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			searchMob_frchs(Number($("input[name=pageIndexMob]").val())+1);
		}
	});
	
	$("select.recordCountPerPage").off("change").on("change",function(e){
		search_frchs(1);
	});

	$(".compareBtn").on("click",function(e){
		e.preventDefault();

		if( $("input[name='checkbox1']:checked").length != 2 ){
			alert("비교할 두개의 브랜드를 선택해주세요.");
			return false;
		}
		compareObj.frnchsNo1 = $("input[name='checkbox1']:checked").eq(0).val();
		compareObj.frnchsNo2 = $("input[name='checkbox1']:checked").eq(1).val();
		
		newsObj.param1 = $("input[name='checkbox1']:checked").eq(0).parents("td").next("td").find("a:first").text();
		newsObj.param2 = $("input[name='checkbox1']:checked").eq(1).parents("td").next("td").find("a:first").text();
		newsObj.param3 = $("input[name='checkbox1']:checked").eq(0).val();
		newsObj.param4 = $("input[name='checkbox1']:checked").eq(1).val();
		newsObj.param5 = $("#" + $("input[name='checkbox1']:checked").eq(0).val()).attr("class");
		newsObj.param6 = $("#" + $("input[name='checkbox1']:checked").eq(1).val()).attr("class");
		newsObj.param7 = "pc";
		newsObj.param8 = $("input[name='checkbox1']:checked").eq(0).parent().parent().parent().find(".lPrimary").attr("id").split(",")[4];
		newsObj.param9 = $("input[name='checkbox1']:checked").eq(1).parent().parent().parent().find(".lPrimary").attr("id").split(",")[4];
//		newsObj.param10 = $("input[name='checkbox1']:checked").eq(0).parent().parent().parent().find(".bsnSgnalNm").val();
//		newsObj.param11 = $("input[name='checkbox1']:checked").eq(1).parent().parent().parent().find(".bsnSgnalNm").val();

		var pop = window.open('/fran/search/compareBrand.do');
		
	});
	
	
	
	$("#btnComp").on("click",function(e){
		e.preventDefault();
		
		if( count != 2 ){
			alert("비교할 두개의 브랜드를 선택해주세요.");
			return false;
		}
		
		var arr = [];
		$(".box").each(function(){
			if($(this).hasClass("active")) arr.push($(this).find(".boxFrnchsNo").val());
//			console.log(arr);
			return;
		});
		compareObj.frnchsNo1 = arr[0];
		compareObj.frnchsNo2 = arr[1];
		
		newsObj.param1 = "추천";
		newsObj.param2 = "추천";
		newsObj.param3 = arr[0];
		newsObj.param4 = arr[1];
		newsObj.param5 = $("#" + arr[0] + "Mob").attr("class");
		newsObj.param6 = $("#" + arr[1] + "Mob").attr("class");
		newsObj.param7 = "mob";
		newsObj.param8 = $("#" + arr[0] + "Mob").parent().find("button[class='mapView']").attr("id").split(",")[4];
		newsObj.param9 = $("#" + arr[1] + "Mob").parent().find("button[class='mapView']").attr("id").split(",")[4];
//		newsObj.param10 = $("#" + arr[0] + "Mob").find(".bsnSgnalNm").val();
//		newsObj.param11 = $("#" + arr[1] + "Mob").find(".bsnSgnalNm").val();
		
		var pop = window.open('/fran/search/compareBrand.do');

	});

	$("span.levy, span.inte").find("a").on("click",function(e){
		mkConditionList();
	});
	
	$("#btnMobSearch").click(function(){
		if($.trim($("#btnMobSearchVal").val())==''){
			$('#dataTbodyMob li').show();
		}else{
			$('#dataTbodyMob li').hide();
			$('#dataTbodyMob li:contains("'+$("#btnMobSearchVal").val()+'")' ).show();	
		}
	});

	/*
	 * 대분류, 중분류
	 */

	//1. 첫번째꺼 selected 주기
	// 전체열기로 변경 - 21.02.16
//	$("dt.type1, dd.type1").addClass("selected");
	$(document).find("dt[class^=type], dd[class^=type]").addClass("selected");

	//2. 대분류 중분류 세팅
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {

		$(".ldClass").empty();

		_data.franchLclasList.forEach(function(row,idx){
			if( row.lclasIndutyCode == "LC00" ){
				$(".ldClass").append('<option value="">' + row.lclasIndutyNm + '</option>');
			}else{
				$(".ldClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
		});

		$(".ldClass").off("change").on("change",function(e){

			//mkConditionList();

			$(".mdClass").empty();

			var selectedVal = $('.ldClass:visible').val();
			$(".ldClass").val( selectedVal );
			fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
				if (selectedVal == ''){
					$(".mdClass").append('<option value=""> 전체 </option>');
				}
				_data.frnchsMlsfcList.forEach(function(row,idx){
					if( row.mlsfcIndutyCode == "Z1" || row.mlsfcIndutyCode == "Z2" || row.mlsfcIndutyCode == "Z3"){
						$(".mdClass").append('<option value="">' + row.mlsfcIndutyNm + '</option>');
					}else{
					$(".mdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
					}
				});

				$(".mdClass").off("change").on("change",function(e){
					mkConditionList();
				});

				mkConditionList();
			});

		});
		
		$("[id*=labelList2]").off("change").on("change",function(e){
			console.log("서브 변경");
			mkConditionList();
		});

	});
	//2. 대분류 중분류 세팅 모바일
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {
		
		$("#ldId").empty();
		
		_data.franchLclasList.forEach(function(row,idx){
			if( row.lclasIndutyCode == "LC00" ){
				$("#ldId").append('<option value="none" selected disabled hidden>대분류 업종</option>');
				$("#ldId").append('<option value="">' + row.lclasIndutyNm + '</option>');
			}else{
				$("#ldId").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
		});
		
		$("#ldId").off("change").on("change",function(e){
			
			//mkConditionList();
			
			$("#mdId").empty();
			
			var selectedVal = $('#ldId:visible').val();
			$("#ldId").val( selectedVal );
			fnGetAjaxData("/comcode/selectFrnchsMlsfcList.ajax", {lclasIndutyCode: selectedVal}, function(_data) {
				if (selectedVal == ''){
					$("#mdId").append('<option value="">전체 </option>');
				}
				_data.frnchsMlsfcList.forEach(function(row,idx){
					if( row.mlsfcIndutyCode == "Z1" || row.mlsfcIndutyCode == "Z2" || row.mlsfcIndutyCode == "Z3"){
						$("#mdId").append('<option value="">' + row.mlsfcIndutyNm + '</option>');
					}else{
					$("#mdId").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
					}
				});
				
				$("#mdId").off("change").on("change",function(e){
					mkConditionList();
				});
				
				mkConditionList();
			});
			
		});
		
		$("[id*=labelList2]").off("change").on("change",function(e){
			mkConditionList();
		});
		
	});

	//3. 시도 세팅
	fnGetAjaxData("/comcode/selectCtprvnRelmList.ajax", {}, function(_data) {

		if(_data.resultCode == RESULT_SUCCESS){

			var tmpHtml = [];

			//전체지역이 첫번째로 오게 소팅
			_data.ctprvnRelmList.sort(function(a, b) { return a.ctprvnCode - b.ctprvnCode });

			_data.ctprvnRelmList.forEach(function(row,idx){

				if( row.ctprvnCode != "00" ){
					tmpHtml.push('<span class="mCheckbox">')
					tmpHtml.push('	<input type="checkbox" id="sidoChk_'+idx+'" name="sidoChk" title="'+row.ctprvnNm+'" value="'+row.ctprvnCode+'">')
					tmpHtml.push('	<label for="sidoChk_'+idx+'">'+row.ctprvnNm+'</label>')
					tmpHtml.push('</span>')
				}

			});

			$("dd.sido").html( tmpHtml.join("") );

			$("input[name='sidoChk']").on("change",function(){
				if($(this).is(":checked")) {
					sortSidoArr.unshift($(this).val());
				} else {
					var index = sortSidoArr.indexOf($(this).val());
					if(index != -1) {
						sortSidoArr.splice(index, 1);
					}
				}
				mkConditionList();
			});

			// 전체해제로 변경 - 21.02.10
			$("input[name='sidoChk']").prop("checked", false);//처음엔 전체지역으로 세팅? 
			mkConditionList();

		} else {
			alert(_data.resultMsg);
		}
	});

});

function yesFile(aa, bb, cc) {
	if(confirm("이용자 책임하에 열람 : 본 파일은 가맹본부가 제출한 내용으로 심사없이 공개되는 것이며, 경기도는 어떠한 보증도 하지 않습니다.")){
		location.href = "/file/downloadFile.do?atchmnflNo="+aa+"&fileSn="+bb+"&fileKey=" + cc;
	}
}

//검색조건 미구현 관심, 지도, 다운로드버튼 미구현, 비교하기 미구현