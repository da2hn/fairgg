/*
 * 매물점포 검토하기 - 컨설턴트
*/
$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectTradeList();
	});

	$('#btn_schTrade').click(function() {
		fn_selectTradeList(1);
	});
	$("#btnMobSearch").click(function() {
		$("#mSearchType").val($("#searchMobType option:selected").val());
		$("#mSearchText").val($("#searchMobText").val());
		$("#dataTbodyMob").empty();
		fn_selectMobTradeList(1);
	});
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			/*fn_mobSearch(Number($("input[name=pageIndexMob]").val())+1)*/
			fn_selectMobTradeList(Number($("input[name=pageIndexMob]").val())+1);
		}
	});

	fn_selectTradeList(1);
	fn_selectMobTradeList(1);
});

function fn_selectTradeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);

	$.post('/myPage/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '<td>'+data.trdeThingRegistNo+'</td>';
					dataTr += '<td style="text-align: left;"><p class="type">' + data.sopsrtStleCodeNm + '</p><a href="javascript:void(0);" onclick="fn_tradeReview('+data.trdeThingRegistNo+')" class="ul"> '+data.sj+' </a></td>';
					dataTr += '<td>'+data.bassAdres+' '+data.detailAdres+'</td>';
					dataTr += '<td>'+data.userNm+'</td>';
					dataTr += '<td>'+data.emailAdres+'<br>'+fnNumberPhoneFormat(data.telno)+'</td>';
					/*if("CS04" == data.confmSttusCode) {
						dataTr += '<td>진행중</td>';
					} else {
						dataTr += '<td>'+data.confmSttusCodeNm+'</td>';
					}*/
					if("신청" == data.confmSttusCode) {
						dataTr += '<td><span class="txtPrimary">'+data.confmSttusCodeNm+'</span></td>';
					} else {
						dataTr += '<td>'+data.confmSttusCodeNm+'</td>';
					}
					dataTr +=  '<td><a href="'+contextPath+'/file/downloadZipFile.do?atchmnflNo='+data.atchmnflNo+'&fileKey='+data.fileKey+'&zipName='+data.trdeThingRegistNo+'_'+data.sj+'" class="ul"> ';
					if(data.atchmnflNo != null) {
						dataTr += '<img src="/static/images/ico_attach1.png">';
					}
					dataTr += '</a></td>';

					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="7">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fn_selectMobTradeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/myPage/board/trade/selectTradeList.ajax',$("#searchMobForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){
					dataMobTr += '<li>';
					dataMobTr += '<div class="box" style="padding:16px 16px 16px 30px">';
					/*dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.trdeThingRegistNo+'" value="'+data.trdeThingRegistNo+'" class="hidden notxt">';
					dataMobTr += '    <label for="chkM'+data.trdeThingRegistNo+'"></label>';*/
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.trdeThingRegistNo + ' </span>';
					dataMobTr += '<span class="state">';
				/*	if("CS04" == data.confmSttusCode) {
						dataMobTr += '진행중</span>';
					} else {
						dataMobTr += data.confmSttusCodeNm+'</span>';
					}*/
					if("신청" == data.confmSttusCode) {
						dataMobTr += '<span class="txtPrimary">'+data.confmSttusCodeNm+'</span>';
					} else {
						dataMobTr += data.confmSttusCodeNm+'</span>';
					}
					dataMobTr += '</div>';
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_tradeReview('+data.trdeThingRegistNo+')" style="padding:0px 0px 0px 0px">';
					dataMobTr += '    <p class="subject">'+data.sj+'</p>';
					dataMobTr += '    <p class="type" style="width:90%;"><span>'+data.userNm+' : '+data.bassAdres+' '+data.detailAdres+'</span></p>';
					dataMobTr += '    <p class="nameDate" style="width:90%;">';
//					dataMobTr += '      <span><strong>신청자명</strong> '+data.userNm+'</span>';
					dataMobTr += '      <span><strong>이메일</strong> '+data.emailAdres+'</span>';
					dataMobTr += '      <span><strong>연락처</strong> '+fnNumberPhoneFormat(data.telno)+'</span>';
					/*dataMobTr += '      <span><strong>상가형태</strong> '+data.sopsrtStleCodeNm+'</span>';*/
					dataMobTr += '    </p>';
					if(data.atchmnflNo != null) {
					dataMobTr += '<p class="attach active"></p>';
					}else {
						dataMobTr += '<p class="attach"></p>';	
					}
					/*dataMobTr += '<p class="reply">';
					if("CS04" == data.confmSttusCode) {
						dataMobTr += '진행중</p>';
					} else {
						dataMobTr += data.confmSttusCodeNm+'</p>';
					}*/
					dataMobTr += '  </a>';
					dataMobTr += '</div>';
					dataMobTr += '</li>';
				})
					$("#dataTbodyMob").append(dataMobTr);
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

function fn_tradeReview(obj) {
	$("#crud").val('r');
	$("#trdeThingRegistNo").val(obj);
	$("#srcPath").val(location.pathname);
	$("#reqForm").attr("action", '/myPage/trade/tradeReview.do');
	$("#reqForm").submit();
}
