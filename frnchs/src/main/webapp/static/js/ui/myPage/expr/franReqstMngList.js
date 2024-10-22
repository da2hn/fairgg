$(document).ready(function() {
	//조회
	fnSearch(1);//PC
	fn_mobSearch(1);//Mob
	
	//승인처리
	$("#btnApprove").click(function() {//PC
		fnChangeSttus("CS01","PS01");
	});
	//반려처리
	$("#btnReject").click(function() {//PC
		fnChangeSttus("CS02","PS02");
	});
	
	//승인처리
	$("#btnApproveMob").click(function() {//Mob
		fnChangeSttusMob("CS01","PS01");
	});
	//반려처리
	$("#btnRejectMob").click(function() {//Mob
		fnChangeSttusMob("CS02","PS02");
	});
	
	
	$("#btnSearch").click(function() {//PC
		fnSearch(1);
	});
	
	$("#btnMobSearch").click(function() {//Mob
		$("#mSearchType").val($("#searchMobType option:selected").val());
		$("#mSearchText").val($("#searchMobText").val());
		$("#dataTbodyMob").empty();
		fn_mobSearch(1);
	});
	//Mob paging
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_mobSearch(Number($("input[name=pageIndexMob]").val())+1);
		}
	});
});

function fnSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/expr/brandReqst/selectFrnchsExprnRegistList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.frnchsExprnRegistList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '	<td>';
//					if(data.confmSttusCode == "CS03"){
						dataTr += '		<span class="mCheckbox notext">';
						dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.exprnRegistNo+'>          ';
						dataTr += '			<label for="chk'+idx+'">선택</label>';
						dataTr += '		</span>';
//					}else{
//						dataTr += '-';
//					}
					dataTr += '	</td>';
					dataTr += '	<td>'+data.rn+'</td>';
					dataTr += '	<td>'+data.mlsfcIndutyNm+'</td>';
					/*dataTr += '	<td>'+data.bsnSgnal+'</td>';*/
					dataTr += '	<td class="tit"><a href="javascript:fnFranReqstMngView('+data.exprnRegistNo+')">'+data.bsnSgnal+' '+data.bhfNm+'</a></td>';
					dataTr += '	<td>'+data.bhfAdres+'</td>';
					if(data.confmSttusCodeNm == "승인요청"){
						dataTr += '	<td><span class="txtPrimary">'+data.confmSttusCodeNm+'</span></td>';
					}else {
						dataTr += '	<td>'+data.confmSttusCodeNm+'</td>';
					}
					dataTr += '	<td>'+data.registDt+'</td>';
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

function fn_mobSearch(pageIndex){
//	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	$.post("/myPage/expr/brandReqst/selectFrnchsExprnRegistList.ajax",
		$("#searchMobForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.frnchsExprnRegistList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){				
					dataMobTr += '<li>';
					dataMobTr += '<div class="box">';
					dataMobTr += '  <p class="check">';
					dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.exprnRegistNo+'" value="'+data.exprnRegistNo+'" class="hidden notxt">';
					dataMobTr += '    <label for="chkM'+data.exprnRegistNo+'"></label>';
					dataMobTr += '  </p>';
					dataMobTr += '  <a href="javascript:void(0);" onclick="fnFranReqstMngView('+data.exprnRegistNo+');">';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>' + ' ';
					if(data.confmSttusCodeNm == "승인요청"){
						dataMobTr += '<span class="state active">'+ data.confmSttusCodeNm + ' </span>';
					}else{
						dataMobTr += '<span class="state">'+ data.confmSttusCodeNm + ' </span>';
					}
					dataMobTr += '</div>';
					/*dataMobTr += '    <p class="type" style="width:90%;"><span>'+data.lclasIndutyNm+'</span>-<span>'+data.mlsfcIndutyNm+'</span></p>';*/
					dataMobTr += '    <p class="subject">'+data.bsnSgnal+' ['+ data.bhfNm +']</p>';
					dataMobTr += '    <p class="nameDate">';
					dataMobTr += '      <span><strong>업종</strong> '+data.mlsfcIndutyNm+'</span>';
					dataMobTr += '      <span><strong>신청일</strong> '+data.registDt+'</span>';
					dataMobTr += '    </p>';
					/*dataMobTr += '<p class="reply">'+data.confmSttusCodeNm+'</p>'*/;
					dataMobTr += '  </a>';
					dataMobTr += '</div>';
					dataMobTr += '</li>';
				})
				$("#dataTbodyMob").append(dataMobTr);
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

function fnChangeSttus(confmSttusCode, progrsSttusSeCode){
	var checkedValArr = new Array();
	$("input:checkbox[name='chk']:checked").each(function(idx, obj){
		checkedValArr.push($(this).val());
	});
	if(checkedValArr.length == 0){
		alert("선택된 항목이 없습니다.");
		return;
	}
	var params = {};
	params["exprnRegistNoArr"] = checkedValArr.join(",");
	params["confmSttusCode"] = confmSttusCode;
	params["progrsSttusSeCode"] = progrsSttusSeCode;

	fnGetAjaxData("/myPage/expr/franReqstMng/updateFrnchsExprnRegistSttus.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			alert(_data.resultMsg);
			fnSearch();
		} else {
			alert(_data.resultMsg);
		}
	});
}

function fnChangeSttusMob(confmSttusCode, progrsSttusSeCode){
	var checkedValArr = new Array();
	$("input:checkbox[name='chkM']:checked").each(function(idx, obj){
		checkedValArr.push($(this).val());
	});
	if(checkedValArr.length == 0){
		alert("선택된 항목이 없습니다.");
		return;
	}
	var params = {};
	params["exprnRegistNoArr"] = checkedValArr.join(",");
	params["confmSttusCode"] = confmSttusCode;
	params["progrsSttusSeCode"] = progrsSttusSeCode;

	fnGetAjaxData("/myPage/expr/franReqstMng/updateFrnchsExprnRegistSttus.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			alert(_data.resultMsg);
			fn_mobSearch();
			location.href = "/myPage/expr/franReqstMng/franReqstMngList.do";
		} else {
			alert(_data.resultMsg);
		}
	});
}

function fnFranReqstMngView(exprnRegistNo) {
	$("#reqCrud").val('r');
	$("#exprnRegistNo").val(exprnRegistNo);
	$("#reqForm").attr("action", '/myPage/expr/franReqstMng/franReqstMngView.do');
	$("#reqForm").submit();
}