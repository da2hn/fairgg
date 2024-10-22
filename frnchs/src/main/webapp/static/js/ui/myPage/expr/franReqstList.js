$(document).ready(function() {

	$("#btnCancel").click(function() {
		var checkedValArr = new Array();
		$("input:checkbox[name='chk']:checked").each(function(){
			checkedValArr.push($(this).val());
		});;
		if('' == checkedValArr){
			alert("대상을 선택하세요.");
			return false;
		}
		var params = {};
		params["exprnReqstNoArr"] = checkedValArr.join(",");
		fnGetAjaxData("/myPage/expr/franReqst/updateFrnchsExprnReqstCancl.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				fnSearch();
			} else {
				alert(_data.resultMsg);
			}
		});
	});
	
	$("#btnCancelMob").click(function() {
		var checkedValArr = new Array();
		$("input:checkbox[name='chkMob']:checked").each(function(){
			checkedValArr.push($(this).val());
		});;
		if('' == checkedValArr){
			alert("대상을 선택하세요.");
			return false;
		}
		var params = {};
		params["exprnReqstNoArr"] = checkedValArr.join(",");
		fnGetAjaxData("/myPage/expr/franReqst/updateFrnchsExprnReqstCancl.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				$("#dataTbodyMob").empty();
				fnSearchMob();
			} else {
				alert(_data.resultMsg);
			}
		});
	});
	
	$("#btnSearch").click(function() {
		fnSearch();
	});
	
	$("#btnSearchMob").click(function() {
		$("#searchType").val($("#searchTypeMob").val());
		$("#searchText").val($("#searchTextMob").val());
		$("#dataTbodyMob").empty();
		fnSearchMob();
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			$("#schSeCode").val($("#schSeCodeMob").val());
			$("#schTxt").val($("#schTxtMob").val());
			fnSearchMob(Number($("input[name=pageIndexMob]").val())+1)
		}
	});
	
	//조회
	
	$("#dataTbody").empty();
	$("#dataTbodyMob").empty();
	fnSearch(1);
	fnSearchMob(1);
});

function fnSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/expr/franReqst/selectFranReqstList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.frnchsExprnReqstList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>                                                                                                            ';
					dataTr += '	<td>                                                                                                           ';
					if(data.fntnSttusSeCodeNmR == "신청"){
						dataTr += '		<span class="mCheckbox notext">                                                                            ';
						dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.exprnReqstNo+'>          ';
						dataTr += '			<label for="chk'+idx+'">선택</label>                                                             ';
						dataTr += '		</span>                                                                                                    ';
					}else{
						dataTr += '-';
					}
					dataTr += '	</td>                                                                                                          ';
					dataTr += '	<td>'+data.rn+'</td>                                                                                                     ';
					dataTr += '	<td>'+data.bsnSgnal+'</td>                                                                                          ';
					dataTr += '	<td>'+data.bhfAdres+'</td>                                                                      ';
					dataTr += '	<td>'+data.fntnSttusSeCodeNmR+'</td>                                                                                                  ';
					dataTr += '	<td>'+data.registDt+'</td>                                                                                            ';
					dataTr += '</tr>                                                                                                           ';
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

function fnSearchMob(pageIndex){
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndex]").val($("input[name=pageIndexMob]").val());
	$("#searchType").val($("#searchTypeMob").val());
	$("#searchText").val($("#searchTextMob").val());
	$.post('/myPage/expr/franReqst/selectFranReqstList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
			if((parseInt(data.resultCount) % 10) > 0){
				maxPage = maxPage + 1;
			}
			var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
			var dataTrMob = "";
			var dataList = data.frnchsExprnReqstList;
			if(!!dataList && dataList.length != 0) {
				dataList.forEach(function(data,idx){
					dataTrMob += '<li>';
					dataTrMob += '<div class="box" style="padding: 16px 16px 16px 30px">';
					dataTrMob += '<p class="check">';
					if(data.fntnSttusSeCodeNmR == "신청"){
						dataTrMob += '<input type="checkbox" name="chkRowSnMob" id=chk'+idx+' class="hidden notxt" value='+ data.exprnReqstNo + '>';
						dataTrMob += '<label for=chk'+idx+'></label>';
					}else{
						dataTrMob += '-';
					}
					dataTrMob += '</p>'	
					dataTrMob += '<div class="numState">';
					dataTrMob += '<span class="no">NO.'+ data.rn + '</span>';
					if(data.fntnSttusSeCodeNmR == '마감'){
						dataTrMob += '<span class="state active">'+ ' ' + data.fntnSttusSeCodeNmR +'</span>';
					}else{
						dataTrMob += '<span class="state">'+ ' ' + data.fntnSttusSeCodeNmR +'</span>';
					}
					dataTrMob += '</div>';
					dataTrMob += '<p class="subject">' + data.bsnSgnal +'</p>';
					dataTrMob += '<p class="nameDate" style="margin-bottom:6px;">';
					/*dataTrMob += '<span>'+ data.bhfAdres +'</span>';*/
					dataTrMob += '<span><strong>신청일 </strong>'+ data.registDt +'</span>';
					dataTrMob += '</p>';
					dataTrMob += '</div>';
					dataTrMob += '</li>';
				});
				$("#dataTbodyMob").append(dataTrMob);
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