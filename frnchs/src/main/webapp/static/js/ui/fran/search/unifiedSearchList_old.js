//팝업들로 넘길 param
var densityObj = {};
var compareObj = {};
var newsObj = {};

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

//	$(".condition_list .mAttach1").html('');
//
//	//selectbox
//	if( !~$(".ldClass option:selected").text().indexOf("전체") ){
//		appendHtml("대분류 업종 > " + $(".ldClass option:selected").text(),"ldClass");
//	}
//
//	if( !~$(".mdClass option:selected").text().indexOf("전체") ){
//		appendHtml("중분류 업종 > " + $(".mdClass option:selected").text(),"mdClass");
//	}
//
//	//a tag
//	if( !~$(".levy .selected").text().indexOf("전체") ){
//		appendHtml( "가맹점사업자의 부담금 > " +$(".levy .selected").text(), "levy");
//	}
//
//	if( !~$(".inte .selected").text().indexOf("전체") ){
//		appendHtml( "인테리어 비용 > " +$(".inte .selected").text(), "inte");
//	}
//
//	//chkbox
//	var sidoStr = "";
//	$("input[name='sidoChk']:checked").each(function(idx,row){
//		sidoStr += $(this).attr("title") + ", ";
//	});
//	sidoStr = sidoStr.substr(0,sidoStr.length-2);
//	if( sidoStr ){
//		appendHtml("창업희망지역 > " + sidoStr ,"sido");
//	}
//
//	//selectbox
//	if( !~$(".biz_year option:selected").text().indexOf("전체") ){
//		appendHtml("본사업력 > " + $(".biz_year option:selected").text(),"biz_year");
//	}
//
//	if( !~$(".debt_ratio option:selected").text().indexOf("전체") ){
//		appendHtml("본사부채비율 > " + $(".debt_ratio option:selected").text(),"debt_ratio");
//	}
//
//	$(".condition_list .mAttach1").append(' <a href="javascript:void(0)" id="r_all" class="btnRelease2">전체해제</a> ');
//
//	//개별조건 없애기
//	$(document).off("click").on("click", ".iDel",function(e){
////	$(".iDel").off("click").on("click",function(e){
//		e.preventDefault();
//
//		$(this).parent().remove();
//		var selector = $("." + $(this).attr("id"));
//		if( selector[0].tagName == "SELECT" ){//업종 TODO 서브조건..
//			if(selector.closest("dd").hasClass("type4")) {
//				selector.find("option:first").prop("selected",true);
//			} else if (selector.closest("dd").hasClass("type1")) {
//				console.log(">> 업종");
//				selector.closest("dd").find("select:first").find("option:first").prop("selected",true);
//				$("select.mdClass").html('<option value="">전체</option>');
//				$("div[class='mAttach1']").find("[id='ldClass'], [id='mdClass']").parent().remove();
////				$("select.mdClass").find("option:last").prop("selected",true);
//			} else {
//				selector.find("option:last").prop("selected",true);
//			}
//
//		}else if( selector[0].tagName == "DD" ){//시도 컨트롤
//			selector.find(":checkbox").attr("checked",false);
//
//		}else if( selector[0].tagName == "SPAN" ){//창업비용쪽 컨트롤
//			selector.find("a:first").click();
//		}
//		
//		mkConditionList();
//	});
//
//	//전체조건 없애기
//	$("#r_all").off("click").on("click",function(e){
//		e.preventDefault();
//
//		$(".ldClass").find("option:first").prop("selected",true);
//		$(".mdClass").empty().append('<option value="">전체</option>');
//		$(".levy a").removeClass("selected");
//		$(".levy").find("a:first").addClass("selected");
//		$(".inte a").removeClass("selected");
//		$(".inte").find("a:first").addClass("selected");
//		$(".sido").find(":checkbox").prop("checked",false);
//		// 전체 해제 시 type4 영역 초기화 - 21.02.24
//		$("dd.type4").find("select").find("option:first").prop("selected",true);
//		
//		mkConditionList();
//	});
//
//	//업종 선택해제
//	$(".btnRelease").off("click").on("click",function(e){
//
//		if( ~$(this).attr("id").indexOf("r_job") ){
//			$(".ldClass").find("option:first").prop("selected",true);
//			$(".mdClass").empty().append('<option value="">전체</option>');
//		}
//
//		if( ~$(this).attr("id").indexOf("r_cost") ){
//			$(".levy a").removeClass("selected");
//			$(".levy").find("a:first").addClass("selected");
//			$(".inte a").removeClass("selected");
//			$(".inte").find("a:first").addClass("selected");
//		}
//
//		if( ~$(this).attr("id").indexOf("r_sido") ){
//			console.log(">> sortSidoArr be:"+sortSidoArr);
//			sortSidoArr = [];
//			console.log(">> sortSidoArr af:"+sortSidoArr);
//			$(".sido").find(":checkbox").attr("checked",false);
//		}
//
//		if( ~$(this).attr("id").indexOf("r_sub") ){
//			// 선택 해제시 type4 영역 초기화 - 21.02.24
//			$("dd.type4").find("select").find("option:first").prop("selected",true);
//		}
//
//		mkConditionList();
//
//	});

		search_frchs(1);

}//func[e]

function sendParam(){

	densityObj.year = '2019';

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
//	params.ldClass = $("select.ldClass").val();
//	params.mdClass = $("select.mdClass").val();
//	params.bsnSgnal = $("select.mdClass").val();
	
	params.ldClass = $("#hdn_ldClass").val();
	params.bsnSgnal = $("#hdn_bsnSgnal").val();
	// 서브 항목 4개 추가 - 21.02.10
	params.closeRate = $("select[name=closeRate]").val();
	params.histYear = $("select[name=histYear]").val();
	params.deptRatio = $("select[name=deptRatio]").val();
	params.unitArAvrgSelngAm = $("select[name=unitArAvrgSelngAm]").val();


	var ctprvnCodeArr = [];
	$("input[name='sidoChk']:checked").each(function(idx){
		ctprvnCodeArr.push( $(this).val() );
	})
	params.ctprvnCodeArr = ctprvnCodeArr.join(",");
	params.sortSidoArr = sortSidoArr.join(","); // 신규추가 - 21.02.10
	console.log(">>> data:"+params.sortSidoArr);
//	$.post('/fran/selectAttnFrnchsList.ajax',params).done(function(data) {
	$.post('/fran/selectUnifiedFrnchsList.ajax',params).done(function(data) {
		console.log("data",data);
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").text(data.resultCount);
			$("#dataTbody").empty();

			var dataList = data.frchsList;
			if(!!dataList && dataList.length != 0) {
				var tmpHtml = [];

				dataList.forEach(function(row,idx){
					tmpHtml.push('<tr>');
//					tmpHtml.push('	<td>');
//					tmpHtml.push('		<span class="mCheckbox notext">');
//					tmpHtml.push('			<input type="checkbox" id="labelCheckbox1_'+Number(idx+1)+'" name="checkbox1" title="선택" value="'+row.frnchsNo+'">');
//					tmpHtml.push('			<label for="labelCheckbox1_'+Number(idx+1)+'">선택</label>');
//					tmpHtml.push('		</span>');
//					tmpHtml.push('	</td>');
					tmpHtml.push('	<td>');
					//tmpHtml.push('		<a href="javascript:void(0)" class="ul">'+row.bsnSgnal+'</a>');
					tmpHtml.push(row.bsnSgnal);

					if( row.deleteAt == "N"){
						tmpHtml.push('		<a href="javascript:void(0)" id="'+row.frnchsNo+'" class="iFavor selected">추천</a>');
					}else{
						tmpHtml.push('		<a href="javascript:void(0)" id="'+row.frnchsNo+'" class="iFavor">추천</a>');
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
					tmpHtml.push('	<td>');
					tmpHtml.push('		<a href="javascript:void(0)" id="'+row.ctprvnCode+","+row.frnchsNo+","+row.mlsfcIndutyCode+","+row.closeRate+'" class="mBtn1 m lPrimary">상세보기</a>'); // 폐점률 추가 - 21.03.11
					tmpHtml.push('	</td>');
					tmpHtml.push('</tr>');
				});

				$("#dataTbody").append(tmpHtml.join(""));


				$("input[name='checkbox1']").off("change").on("change",function(){
					if( $("input[name='checkbox1']:checked").length > 2 ){
						$("input[name='checkbox1']:checked:last").prop("checked",false);
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
						param.flag = 'Y'
						confirmMsg = "이 프랜차이즈를 관심 프랜차이즈에서 제거할까요?";
					}else{
						param.flag = 'N'
						confirmMsg = "이 프랜차이즈를 관심 프랜차이즈로 등록할까요?";
					}

					if( confirm(confirmMsg) ){
						intrstFrnchs(param);
					}else{
						return false;
					}

				});

			} else {
				$("#dataTbody").append('<tr><td colspan="8">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");

		}else{
			console.log("데이터가 없습니다.");
			//alert(data.resultMsg);

			$("#totalCnt").empty();
			$("#totalCnt").text(0);
			$("#dataTbody").empty();

			$("#dataTbody").append('<tr><td colspan="8">조회된 내용이 없습니다.</td></tr>');
			$(".mPag").html('<a title="현재페이지" href="javascript:void(0)" class="selected">1</a>');
		}
	});
}



$(document).ready(function() {

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
		
		var pop = window.open('/fran/search/compareBrand.do')

	});
	
	
	

//	$("span.levy, span.inte").find("a").on("click",function(e){
//		mkConditionList();
//	});


	/*
	 * 대분류, 중분류
	 */

	//1. 첫번째꺼 selected 주기
	// 전체열기로 변경 - 21.02.16
//	$("dt.type1, dd.type1").addClass("selected");
	$(document).find("dt[class^=type], dd[class^=type]").addClass("selected");

	//2. 대분류 중분류 세팅
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {

		console.log("업종",_data);
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

				_data.frnchsMlsfcList.forEach(function(row,idx){
					$(".mdClass").append('<option value="' + row.mlsfcIndutyCode + '">' + row.mlsfcIndutyNm + '</option>');
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

	//3. 시도 세팅
	fnGetAjaxData("/comcode/selectCtprvnRelmList.ajax", {}, function(_data) {

		console.log("시도",_data);
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
				console.log(">>"+$(this).is(":checked")+":"+$(this).val());
				if($(this).is(":checked")) {
					console.log(">>> a1:"+sortSidoArr);
					sortSidoArr.unshift($(this).val());
					console.log(">>> b1:"+sortSidoArr);
				} else {
					var index = sortSidoArr.indexOf($(this).val());
					console.log(">>> a:"+sortSidoArr+", index:"+index);
					if(index != -1) {
						sortSidoArr.splice(index, 1);
					}
					console.log(">>> b:"+sortSidoArr+", index:"+index);
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
