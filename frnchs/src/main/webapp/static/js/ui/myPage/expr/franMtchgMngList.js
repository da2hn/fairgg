$(document).ready(function() {

	//조회
	fnSearch(1);
	fnMobSearch(1);

	$("#btnDelete").click(function() {
		var checkedValArr = new Array();
		$("input:checkbox[name='chk']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		var params = {};
		params["exprnRegistNoArr"] = checkedValArr.join(",");

		fnGetAjaxData("/myPage/expr/franMtchgMng/updateFrnchsExprnRegistDelete.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				fnSearch();
			} else {
				alert(_data.resultMsg);
			}
		});
	});
	$("#btnDeleteMob").click(function() {
		var checkedValArr = new Array();
		$("input:checkbox[name='chkM']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		var params = {};
		params["exprnRegistNoArr"] = checkedValArr.join(",");
		
		fnGetAjaxData("/myPage/expr/franMtchgMng/updateFrnchsExprnRegistDelete.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				$("#dataTbodyMob").empty();
				fnMobSearch();
			} else {
				alert(_data.resultMsg);
			}
		});
	});
	$("#btnSearch").click(function() {
		fnSearch(1);
	});
	
	$("#btnMobSearch").click(function() {
		$("#mSearchType").val($("#searchMobType option:selected").val());
		$("#mSearchText").val($("#searchMobText").val());
		$("#dataTbodyMob").empty();
		fnMobSearch(1);
	});
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fnMobSearch(Number($("input[name=pageIndexMob]").val())+1)
		}
	});

});

function fnSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/expr/franMtchgMng/selectFranMtchgMngList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.franMtchgMngList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '	<td>';
					if(data.progrsSttusSeCode == "PS02"){
						dataTr += '		<span class="mCheckbox notext">';
						dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value="'+data.exprnRegistNo+'">';
						dataTr += '			<label for="chk'+idx+'">선택</label>';
						dataTr += '		</span>';
					}else{
						dataTr += '-';
					}
					dataTr += '	</td>';
					dataTr += '	<td>'+data.rn+'</td>';
					dataTr += '	<td>'+data.mlsfcIndutyNm+'</td>';
					/*dataTr += '	<td>'+data.bsnSgnal+'</td>';*/
					dataTr += '	<td class="tit"><a href="javascript:fnFranBrandInfoView('+data.frnchsNo+')">'+data.bsnSgnal+' '+data.bhfNm+'</a></td>';
					dataTr += '	<td>'+data.bhfAdres+'</td>';
//					dataTr += '	<td class="tit">'+data.bsnSgnal+' '+data.bhfNm+'</td>                                                      ';
					
					//dataTr += '	<td class="tit"><a href="javascript:fnFranMtchgMngView('+data.exprnRegistNo+')">'+data.bsnSgnal+' '+data.bhfNm+'</a></td>';
//					dataTr += '	<td>기관관리자 승인(2020.11.01)</td>                                                                            ';
					//체험 시작일, 종료일 추가 21.12.07 -주한별
					dataTr += '	<td>'+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</td>';
					var confmDt = '';
					if(data.confmDt != null) {
						confmDt += '<br>(' + data.confmDt + ')';
					}
					dataTr += '	<td>기관관리자<br>'+data.confmSttusCodeNm+''+ confmDt +'</td>';
					if(data.reqstCnt > 0 && data.confmSttusCode == "CS01"){
						dataTr += '	<td><a href="javascript:fnFranMtchgMngListPopup('+data.exprnRegistNo+')" class="ul">'+data.reqstCnt+'명</a></td>';
					}else{
						dataTr += ' <td>'+data.reqstCnt+'명</td>';
					}
					dataTr += '	<td>'+data.progrsSttusSeCodeNm+'</td>';
					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="11">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fnMobSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/myPage/expr/franMtchgMng/selectFranMtchgMngList.ajax',$("#searchMobForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.franMtchgMngList;
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
					dataMobTr += '<p class="check">';
					if(data.progrsSttusSeCode == "PS02"){
						dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.exprnRegistNo+'" value="'+data.exprnRegistNo+'" class="hidden notxt">';
						dataMobTr += '    <label for="chkM'+data.exprnRegistNo+'"></label>';
					}else{
						dataMobTr += '-';
					}
					dataMobTr += '  </p>';
					dataMobTr += '  <a href="javascript:void(0);" onclick="fnFranBrandInfoView('+data.frnchsNo+')">';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>' + ' ';
					if(data.progrsSttusSeCodeNm == '종료'){
						dataMobTr += '<span class="state">' + data.progrsSttusSeCodeNm +'</span>'
					}else {
						dataMobTr += '<span class="state active">' + data.progrsSttusSeCodeNm +'</span>'
					}
//					dataMobTr += '<span class="state">'+ data.progrsSttusSeCodeNm + ' </span>';
					dataMobTr += '</div>';
					/*dataMobTr += '    <p class="type" style="width:90%;"><span>'+data.lclasIndutyNm+'</span>-<span>'+data.mlsfcIndutyNm+'</span></p>';*/
					dataMobTr += '    <p class="subject">'+data.bsnSgnal+' '+data.bhfNm +'</p>';
					dataMobTr += '    <p class="nameDate">';
					/*dataMobTr += '      <span><strong>주소</strong>'+data.bhfAdres+'</span>';
					dataMobTr += '      <span><strong>지점명</strong>'+data.bsnSgnal+' '+data.bhfNm+'</span>';
					dataMobTr += '      <span><strong>지점 승인 상태</strong>'+data.confmSttusCodeNm+''+ confmDt +'</span>';
					dataMobTr += '      <span><strong>상태 </strong>'+data.progrsSttusSeCodeNm+'</span>';*/
					var confmDt = '';
					if(data.confmDt != null) {
						confmDt += '<br>(' + data.confmDt + ')';
					}
					/*dataMobTr += '      <span><strong>체험 시작일 </strong>'+data.exprnBeginDe+'</span>';
					dataMobTr += '      <span><strong>체험 종료일 </strong>'+data.exprnEndDe+'</span>';*/
					dataMobTr += '      <span><strong>중분류업종</strong>'+data.mlsfcIndutyNm+'</span>';
					dataMobTr += '      <span><strong>체험일 </strong>'+data.exprnBeginDe+ ' ~ ' + data.exprnEndDe +'</span><br>';
					dataMobTr += '      <span><strong> 승인상태 </strong>기관관리자 '+data.confmSttusCodeNm+'</span>';
					dataMobTr += '      <span><strong> 신청현황 </strong>'+data.reqstCnt+'명</span>';
					dataMobTr += '    </p>';
					/*dataMobTr += '<p class="reply">'+data.progrsSttusSeCodeNm+'</p>';*/
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

//function fnFranMtchgMngView(exprnRegistNo) {
//	$("#reqCrud").val('r');
//	$("#exprnRegistNo").val(exprnRegistNo);
//	$("#reqForm").attr("action", '/myPage/expr/franMtchgMng/franMtchgMngView.do');
//	$("#reqForm").submit();
//}

//프랜차이즈정보 보기
function fnFranBrandInfoView(exprnRegistNo) {
$("#reqCrud").val('r');
$("#exprnRegistNo").val(exprnRegistNo);
$("#reqForm").attr("action", '/fran/search/unifiedSearchBrand.do');
$("#reqForm").submit();
}

//프랜차이즈 제공 등록 팝업
 function fnFranMtchgMngListPopup(exprnRegistNo){
	var params = {};
	params["exprnRegistNo"] = exprnRegistNo;
	$.ajax({
		/*dataType:"text",*/
		dataType:"html",
		type: "POST",
		url: "/myPage/expr/franMtchgMng/franMtchgMngListPopup.do",
		data:params,
		async: true,
		cache: false,
		success : function(data, status, request) {
			$("#popupDiv").html(data);
		},
	    error: function(request, status, error) {
    		window.error = error;
			alert(error);
		}
	});
}
