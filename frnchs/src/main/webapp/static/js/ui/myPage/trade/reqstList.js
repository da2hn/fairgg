/*
 * 매물점포 신청현황 - 일반사용자
*/
$(document).ready(function() {

	$("#btn_apprExpired").click(function() {
		fn_updateSttus('apprExpired');
	});
	
	$("#btn_apprExpiredMob").click(function() {
		fn_updateSttusMob('apprExpired');
	});

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

	$("#btn_schMob").click(function() {
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
	$("#pageSe").val('reqstPage');

	$.post('/myPage/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				var dataTrMob = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';

					dataTr += '<td>';
					dataTr += '<span class="mCheckbox notext">';
					if("CS03" == data.confmSttusCode && null == data.chrgCnstntUserNo) {
						dataTr += '<input type="checkbox" id="sn_'+data.trdeThingRegistNo+'" name="chkRowSn" title="선택" value="'+data.trdeThingRegistNo+'">';
						dataTr += '<label for="sn_'+data.trdeThingRegistNo+'">선택</label>';
					}else{
						dataTr += '-';
					}
					dataTr += '</span>';
					dataTr += '</td>';
					dataTr += '<td>'+data.trdeThingRegistNo+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_tradeReview('+data.trdeThingRegistNo+')" class="ul"> '+data.sj+' </a></td>';

					if(null == data.chrgCnstntUserNo) {
						dataTr += '<td>배정중</td>';
					} else {
						dataTr += '<td>'+data.chrgCnstntUserNm;
						dataTr += '</br>(' + data.chrgCnstntUserTelno + ')';
						dataTr += '</td>';
					}
					dataTr += '<td>'+data.confmSttusCodeNm+'</td>';
					dataTr += '<td>'+data.updtDt+'</td>';

					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="6">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

/*모바일 조회하기 추가*/
function fn_selectTradeListMob(pageIndex) {
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndex]").val($("input[name=pageIndexMob]").val());
	$("#pageSe").val('reqstPage');
	$("#schSeCode").val($("#schSeCodeMob").val());
	$("#schTxt").val($("#schTxtMob").val());
	$.post('/myPage/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataTrMob = "";
				dataList.forEach(function(data,idx){				
					dataTrMob +='<li>';
					dataTrMob +='<div class="box">';
					dataTrMob +='<p class="check">';
					if("CS03" == data.confmSttusCode && null == data.chrgCnstntUserNo) {
						dataTrMob += '<input type="checkbox" name="chkRowSnMob" id=sn'+data.trdeThingRegistNo +' class="hidden notxt" value='+ data.trdeThingRegistNo + '>';
						dataTrMob += '<label for=sn'+data.trdeThingRegistNo +'></label>';
					}else{
						dataTrMob += '-';
					}
					dataTrMob +='</p>';
					dataTrMob += '<a href="javascript:void(0);" onclick="fn_tradeReview('+data.trdeThingRegistNo+')">';
					dataTrMob += '<div class="numState">';
					dataTrMob += '<span class="no">NO.'+ data.trdeThingRegistNo + ' </span>' + ' ';
					dataTrMob += '<span class="state">'+ data.confmSttusCodeNm + ' </span>';
					/*dataTrMob += '<span class="state">'+ data.confmSttusCodeNm +'</span>'*/
					dataTrMob += '</div>';
					dataTrMob += '<p class="subject">' + data.sj +'</p>';
					/*dataTrMob += '<span><strong>'+ data.sopsrtStleCodeNm +'  </strong></span>';*/
					dataTrMob += '    <p class="nameDate">';
					dataTrMob += '</br><span><strong> 신청일 </strong>' + data.updtDt + '</span>';
					dataTrMob +='<span><strong>접수자 </strong>';
						if(null == data.chrgCnstntUserNo) {
							dataTrMob += '배정중</span>';
						} else {
							dataTrMob +=  data.chrgCnstntUserNm + '(' + data.chrgCnstntUserTelno + ')';
							dataTrMob += '</span>';
						}	
					/*dataTrMob += '<p class="reply">'+ data.confmSttusCodeNm +'</p>';*/	
					dataTrMob += '</p>';
					dataTrMob += '</a>';
					dataTrMob += '</div>';
					dataTrMob += '</li>';
				});
				$("#dataTbodyMob").append(dataTrMob);
			}
			else {
				var maxPage = 1;
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/1)';
			}
			$("input[name=pageIndexMobMax]").val(maxPage);
			$("#pagingMob").text(pagingText);
		}else{
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

/*모바일 취소하기 추가*/
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
};