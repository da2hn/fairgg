$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13){
			fn_selectTradeList();
		}
	});
	fn_selectTradeListMob();

	$(document).on("click", "#btn_sch", function(){
		if($(document).width() <= 687) {
			fn_selectTradeListMob();			
		} else {			
			fn_selectTradeList();
		}
	});

	$("#btn_tradeSavePage").click(function() {
		fn_tradeSavePage();
	});

	$("#schSido").change(function() {
		$("#schSidoTxt").val($("#schSido option:selected").text());
		fn_setSignguRelm($(this).val());
	});

	$("#schSigngu").change(function() {
		$("#schSignguTxt").val($("#schSigngu option:selected").text());
	});

	fn_init();
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectTradeListMob(Number($("input[name=pageIndexMob]").val())+1);
		}
	});

});

function fn_init() {
	fnGetCtprvnRelmList('schSido','select','00');//공통-시도 fnGetCtprvnRelmList(selectorId, type, selectVal){

	fn_selectTradeList(1);
}
function fn_setSignguRelm(val) {
	fnGetSignguRelmList('schSigngu','select',val, '');//공통-시군구 fnGetSignguRelmList(selectorId, type, ctprvnCode, selectVal){
}

function fn_selectTradeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);

	$.post('/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('총 '+data.resultCount+' 개의 매물');
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li>';

					dataTr += '<div class="img" style="background-image:url(/file/downloadFile.do?atchmnflNo='+ data.atchmnflNo +'&fileSn='+ data.fileSn +'&fileKey='+ data.fileKey +');"></div>';
					dataTr += '<div class="txt">';
					dataTr += '<div class="ti">'+data.sj+'</div>';
					dataTr += '<div class="tx">'+data.bassAdres+' '+data.detailAdres+'</div>';
					dataTr += '<div class="mBoard1">';
					dataTr += '<table>';
					dataTr += '<colgroup><col width="110"><col width="*"></colgroup>';
					dataTr += '<tbody>';
					dataTr += '<tr>';
					dataTr += '<th class="left">보증금/월세</th>';
					dataTr += '<td class="left">'+data.gtn+' / '+data.mtRntchrg+' 만원</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">권리금</th>';
					dataTr += '<td class="left">'+data.premum+' 만원</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">관리비</th>';
					dataTr += '<td class="left">'+data.managect+' 만원</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">층수</th>';
					dataTr += '<td class="left">'+data.floorCo+' 층</td>';
					dataTr += '</tr>';
					dataTr += '</tbody>';
					dataTr += '</table>';
					dataTr += '</div>';
					dataTr += '<a href="javascript:void(0);" onclick="fn_tradeView('+data.trdeThingRegistNo+')" class="btn">상세정보</a>';
					dataTr += '</div>';

					dataTr += '</li>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<div style="text-align:center;padding-top:30px">조회된 내용이 없습니다.</div>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fn_selectTradeListMob(pageIndex){
	$("#dataTbodyMob").empty();
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	$.post('/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('총 '+data.resultCount+' 개의 매물');
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li>';
					
					dataTr += '<div class="img" style="background-image:url(/file/downloadFile.do?atchmnflNo='+ data.atchmnflNo +'&fileSn='+ data.fileSn +'&fileKey='+ data.fileKey +');"></div>';
					dataTr += '<div class="txt">';
					dataTr += '<div class="ti">'+data.sj+'</div>';
					dataTr += '<div class="tx">'+data.bassAdres+' '+data.detailAdres+'</div>';
					dataTr += '<div class="mBoard1">';
					dataTr += '<table>';
					dataTr += '<colgroup><col width="110"><col width="*"></colgroup>';
					dataTr += '<tbody>';
					dataTr += '<tr>';
					dataTr += '<th class="left">보증금/월세</th>';
					dataTr += '<td class="left">'+data.gtn+' / '+data.mtRntchrg+' 만원</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">권리금</th>';
					dataTr += '<td class="left">'+data.premum+' 만원</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">관리비</th>';
					dataTr += '<td class="left">'+data.managect+' 만원</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">층수</th>';
					dataTr += '<td class="left">'+data.floorCo+' 층</td>';
					dataTr += '</tr>';
					dataTr += '</tbody>';
					dataTr += '</table>';
					dataTr += '</div>';
					dataTr += '<a href="javascript:void(0);" onclick="fn_tradeView('+data.trdeThingRegistNo+')" class="btn">상세정보</a>';
					dataTr += '</div>';
					
					dataTr += '</li>';
				})
				$("#dataTbodyMob").append(dataTr);
			} else {
				$("#dataTbodyMob").html('<p class="empty tac">조회된 내용이 없습니다.</p>');
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

function fn_tradeView(obj) {
	$("#crud").val('r');
	$("#trdeThingRegistNo").val(obj);
	$("#reqForm").attr("action", '/board/trade/tradeView.do');
	$("#reqForm").submit();
}


function fn_tradeSavePage() {
//	if($("#ssUserRole").val() != '[ROLE_US01]' && $("#ssUserRole").val() != '') {
//		alert('컨설턴트/기관관리자/브랜드 본사 관리자는 \n매물정보 등록 기능을 사용 할 수 없습니다.');
//		return;
//	} else {
		$("#reqForm").attr("action", '/board/trade/tradeSave.do');
		$("#reqForm").submit();
//	}
}
