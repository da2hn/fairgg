/*
 * 매물점포 관리현황 - 일반사용자
*/
$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectTradeList();
	});
	
	$("#schTxtMob").keyup(function(e){
		if(e.keyCode == 13){
			$("#schSeCode").val($("#schSeCodeMob").val());
			$("#schTxt").val($("#schTxtMob").val());
			$("#dataTbodyMob").empty();
			fn_selectTradeListMob();
		} 
	});
	
	$("#btn_schMob").click(function(){
		$("#schSeCode").val($("#schSeCodeMob").val());
		$("#schTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_selectTradeListMob();
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			$("#schSeCode").val($("#schSeCodeMob").val());
			$("#schTxt").val($("#schTxtMob").val());
			fn_selectTradeListMob(Number($("input[name=pageIndexMob]").val())+1)
		}
	})
	
	$("#dataTbody").empty();
	$("#dataTbodyMob").empty();
	fn_selectTradeList(1);
	fn_selectTradeListMob(1);
});

function fn_selectTradeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("#pageSe").val('managePage');

	$.post('/myPage/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
//			data = jQuery.parseJSON(data);
		if(data.resultCode == 'success'){
			/*$("#totalCnt").empty();
			$("#totalCnt").append('총 '+data.resultCount+' 개의 매물');*/
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '<td>';
					dataTr += '<span class="mCheckbox notext">';
					dataTr += '<input type="checkbox" id="sn_'+data.trdeThingRegistNo+'" name="chkRowSn" title="선택" value="'+data.trdeThingRegistNo+'">';
					dataTr += '<label for="sn_'+data.trdeThingRegistNo+'">선택</label>';
					dataTr += '</span>';
					dataTr += '</td>';
					dataTr += '<td>'+data.trdeThingRegistNo+'</td>';
					dataTr += '<td style="text-align: left;"><p class="type">' + data.sopsrtStleCodeNm + '</p><a href="javascript:void(0);" onclick="fn_tradeReview('+data.trdeThingRegistNo+')" class="ul"> '+data.sj+' </a></td>';
					dataTr += '<td>'+ data.bassAdres+'</td>';
					dataTr += '<td>'+ data.confmUserNm+'</td>';
					dataTr += '<td><p class="state">' + data.confmSttusCodeNm + '</p>';
					dataTr += '<p class="date">' + '신청일 ' + data.confmDt + '</p></td>';
					/*dataTr += '<td>'+data.confmDt+'</td>';*/
					dataTr += '<td>';
					dataTr +=  '<a href="'+contextPath+'/file/downloadZipFile.do?atchmnflNo='+data.atchmnflNo+'&fileKey='+data.fileKey+'&zipName='+data.trdeThingRegistNo+'_'+data.sj+'" class="ul"> ';
					if(data.atchmnflNo != null) {
						dataTr += '<img src="/static/images/ico_attach1.png">';
					}
					dataTr += '</a>';
					dataTr += '</td>';

					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="7">조회된 내용이 없습니다.</td></tr>');
			}
			//console.log('>>pagingHtml>>>>',data.pagingHtml);
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			alert(data.resultMsg);
		}
	});
}

function fn_selectTradeListMob(pageIndex) {
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndex]").val($("input[name=pageIndexMob]").val());
	$("#pageSe").val('managePage');
	$("#schSeCode").val($("#schSeCodeMob").val());
	$("#schTxt").val($("#schTxtMob").val());
	$.post('/myPage/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
			if((parseInt(data.resultCount) % 10) > 0){
				maxPage = maxPage + 1;
			}
			var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
			var dataTrMob = "";
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTrMob += '<li>';
					dataTrMob += '<div class="box">';
					dataTrMob += '<p class="check">';
					dataTrMob += '<input type="checkbox" name="chkRowSnMob" id=sn'+data.trdeThingRegistNo +' class="hidden notxt" value='+ data.trdeThingRegistNo + '>';
					dataTrMob += '<label for=sn'+data.trdeThingRegistNo +'></label>';
					dataTrMob += '</p>';
					dataTrMob += '<a href="javascript:void(0);" onclick="fn_tradeReview('+data.trdeThingRegistNo+')">';
					dataTrMob += '<div class="numState">';
					dataTrMob += '<span class="no">NO.'+ data.trdeThingRegistNo + '</span> ';
					if(data.confmSttusCodeNm == '승인'){
						dataTrMob += '<span class="state active">' + data.confmSttusCodeNm + '</span>';
					}else {
						dataTrMob += '<span class="state">' + data.confmSttusCodeNm + '</span>';
					}
					dataTrMob += '</div>';
					dataTrMob += '<p class="subject" style="width:95%;">' + data.sj +'</p>';
					dataTrMob += '<p class="nameDate" style="width:95%;">';
					dataTrMob += '<span>' + data.sopsrtStleCodeNm + '</span>';
					dataTrMob += '<span><strong>컨설턴트 </strong> ' + data.confmUserNm +'</span>';
					dataTrMob += '<span><strong>신청일 </strong>' + data.updtDt + '</span>';
					dataTrMob += '</p>';

                    if(data.atchmnflNo != null) {
                    	  dataTrMob += '<p class="attach active">';
                    }else{
                    	  dataTrMob += '<p class="attach">';
                    }
					dataTrMob += '</p>';
					
					/*if(data.atchmnflNo != null) {
						dataTrMob += '<p class="attach active">';
						dataTrMob += '<a href="'+contextPath+'/file/downloadZipFile.do?atchmnflNo='+data.atchmnflNo+'&fileKey='+data.fileKey+'&zipName='+data.trdeThingRegistNo+'_'+data.sj+'" class="ul">';
					}else{
						dataTrMob += '<p class="attach">';
					}
					dataTrMob += '</p>';*/
					dataTrMob += '</a>';
					dataTrMob += '</div>';
					dataTrMob += '</li>';
				})
			} else {
				var maxPage = 1;
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/1)';
			}
			$("#dataTbodyMob").append(dataTrMob);
			$("input[name=pageIndexMobMax]").val(maxPage);
			$("#pagingMob").text(pagingText);
		}else{
			alert(data.resultMsg);
		}
	});
}

function fn_updateSttus(obj) {
	var chkRowSn = "";
	$("input[name='chkRowSn']:checked").each (function (){
		chkRowSn = chkRowSn + $(this).val()+"," ;
	});
	chkRowSn = chkRowSn.substring(0,chkRowSn.lastIndexOf( ",")); //맨끝 콤마 지우기
	
	$("#chkRowSn").val(chkRowSn);
	if('' == chkRowSn){
		alert("대상을 선택하세요.");
		return false;
	}

	if (confirm("처리하시겠습니까?")) {
		var regNo = $("#trdeThingRegistNo").val();
		var params = {
				'sttus':obj
				//,'trdeThingRegistNo': regNo
				,'chkRowSn':chkRowSn
			};
		fnGetAjaxData("/myPage/board/trade/updateTradeSttus.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);

				fn_selectTradeList(1);
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}

function fn_updateSttusMob(obj) {
	var chkRowSn = "";
	$("input[name='chkRowSnMob']:checked").each (function (){
		chkRowSn = chkRowSn + $(this).val()+"," ;
	});
	chkRowSn = chkRowSn.substring(0,chkRowSn.lastIndexOf( ",")); //맨끝 콤마 지우기
	$("#chkRowSn").val(chkRowSn);
	if('' == chkRowSn){
		alert("대상을 선택하세요.");
		return false;
	}
	
	if (confirm("처리하시겠습니까?")) {
		var regNo = $("#trdeThingRegistNo").val();
		var params = {
				'sttus':obj
				//,'trdeThingRegistNo': regNo
				,'chkRowSn':chkRowSn
		};
		fnGetAjaxData("/myPage/board/trade/updateTradeSttus.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				
				$("#dataTbodyMob").empty();
				fn_selectTradeListMob(1);
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}

function fn_tradeReview(obj) {
	$("#crud").val('r');
	$("#trdeThingRegistNo").val(obj);
	$("#srcPath").val(location.pathname);
	$("#reqForm").attr("action", '/myPage/trade/tradeReview.do');
	$("#reqForm").submit();
}
