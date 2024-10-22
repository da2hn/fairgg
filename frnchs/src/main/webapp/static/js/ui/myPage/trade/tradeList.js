$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectTradeList();
	});

	$("#btn_sch").click(function() {
		fn_selectTradeList();
	});

	$("#btn_tradeSave").click(function() {
		fn_tradeSave();
	});

	fn_selectTradeList(1);
});

function fn_selectTradeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	//console.log($("#searchForm").serialize());

	$.post('/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
//			data = jQuery.parseJSON(data);
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('총 <span>'+data.resultCount+'</span> 개의 매물');
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					//console.log('data >> ',data);

					dataTr += '<li>';

					dataTr += '<div class="img" style="background-image:url(images/x_list2.png);"></div>';
					dataTr += '<div class="txt">';
					dataTr += '<div class="ti">'+data.sj+'</div>';
					dataTr += '<div class="tx">'+data.bassAdres+' '+data.detailAdres+'</div>';
					dataTr += '<div class="mBoard1">';
					dataTr += '<table>';
					dataTr += '<colgroup><col width="110"><col width="*"></colgroup>';
					dataTr += '<tbody>';
					dataTr += '<tr>';
					dataTr += '<th class="left">브랜드</th>';
					dataTr += '<td class="left">'+data.sj+'</td>';
					dataTr += '</tr>';
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




					/*
					dataTr += '<li>';
					dataTr += '<div class="img" style="background-image:url(images/x_list2.png);"></div>';
					dataTr += '<div class="txt">';
					dataTr += '<div class="ti">ㅇㅇㅇㅇㅇ</div>';
					dataTr += '<div class="tx">경기도 수원시 권선구 서둔동 81-1</div>';
					dataTr += '<div class="mBoard1">';
					dataTr += '<table summary="체험기간, 운영시간, 모집인원, 종업원수, 프랜차이즈 체험, 사전 교육일로 구성된 표입니다."></caption>';
					dataTr += '<caption>카페051 서둔점</caption>';
					dataTr += '<colgroup><col width="110"><col width="*"></colgroup>';
					dataTr += '<tbody>';
					dataTr += '<tr>';
					dataTr += '<th class="left">체험기간</th>';
					dataTr += '<td class="left">2020.09.01 ~ 2020.10.30</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">운영시간</th>';
					dataTr += '<td class="left">09:00 ~ 18:00</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">모집인원</th>';
					dataTr += '<td class="left">1명</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">종업원수</th>';
					dataTr += '<td class="left">5명</td>';
					dataTr += '</tr>';
					dataTr += '<tr>';
					dataTr += '<th class="left">프랜차이즈 체험<br> 사전 교육일</th>';
					dataTr += '<td class="left">2020.09.01</td>';
					dataTr += '</tr>';
					dataTr += '</tbody>';
					dataTr += '</table>';
					dataTr += '</div>';
					dataTr += '<a href="#" class="btn">상세정보</a>';
					dataTr += '</div>';
					dataTr += '</li>';
					*/
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="7">조회된 내용이 없습니다.</td></tr>');
			}
			//console.log('>>pagingHtml>>>>',data.pagingHtml);
			$(".mPag").html(data.pagingHtml).trigger("create");
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


function fn_tradeSave() {
	if($("#ssUserRole").val() != '[ROLE_US01]') {
		alert('컨설턴트/기관관리자/브랜드 본사 관리자는 \n매물정보 등록 기능을 사용 할 수 없습니다.');
		return;
	} else {
		$("#reqForm").attr("action", '/board/trade/tradeSave.do');
		$("#reqForm").submit();
	}
}

