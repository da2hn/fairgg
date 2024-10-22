var approveCnt = 0;

$(document).ready(function() {

	//조회
	fnSearch();

	//승인처리
	$("#btnApprove").click(function() {
		fnChangeSttus("CS01","PS01");
	});
});

function fnSearch(pageIndex){
	var params = {};
	params["exprnRegistNo"] = $("#exprnRegistNo").val();
	$.post('/myPage/expr/exprManage/selectExprRcritList.ajax',params)
	.done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.exprRcritList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					if(data.confmSttusCode == "CS01"){
						approveCnt++;
					}
					dataTr += '<tr>';
					dataTr += '	<td>';
					if(data.confmSttusCode == "CS04"){
					dataTr += '		<span class="mCheckbox notext">';
					dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.exprnReqstNo+'>          ';
					dataTr += '			<label for="chk'+idx+'">선택</label>';
					dataTr += '		</span>';
					}else{
						dataTr += '-';
					}
					dataTr += '	</td>';
					dataTr += '	<td>'+data.rn+'</td>';
					dataTr += '	<td>'+data.userNm+'</td>';
					dataTr += '	<td>'+data.telno+'</td>';
					dataTr += '	<td>'+data.emailAdres+'</td>';
					dataTr += '	<td>'+data.registDt+'</td>';
					if(data.confmSttusCode == "CS04"){
						dataTr += '	<td>기관관리자 승인 완료<br>'+data.updtDt+'</td>';
					}else if(data.confmSttusCode == "CS01"){
						dataTr += '	<td>승인 완료<br>'+data.confmDt+'</td>';
					}else{
						dataTr += ' <td>검토중</td>';
					}
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
function fnChangeSttus(confmSttusCode, progrsSttusSeCode){
	var checkedValArr = new Array();
	$("input:checkbox[name='chk']:checked").each(function(idx, obj){
		checkedValArr.push($(this).val());
	});
	if(checkedValArr.length == 0){
		alert("선택된 항목이 없습니다.");
		return;
	}
	var maxRcRitNmpr = $("#rcritNmpr").val();
	console.log(Number(approveCnt));
	console.log(Number(checkedValArr.length));
	console.log(maxRcRitNmpr);
	var selectCnt = maxRcRitNmpr-approveCnt < 0 ? 0 : maxRcRitNmpr-approveCnt;
	if(selectCnt == 0){
		alert("마감되었습니다.");
		return;
	}
	if(Number(approveCnt) + Number(checkedValArr.length) > maxRcRitNmpr){
		alert("모집인원보다 많이 신청할수 없습니다.\n"+selectCnt+"명 선택가능합니다.");
		return;
	}

	var params = {};
	params["exprnRegistNo"] = $("#exprnRegistNo").val();
	params["exprnReqstNoArr"] = checkedValArr.join(",");
	params["confmSttusCode"] = confmSttusCode;
	params["progrsSttusSeCode"] = progrsSttusSeCode;

	fnGetAjaxData("/myPage/expr/exprManage/updateFrnchsExprnReqstApproveSttus.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			alert(_data.resultMsg);
			fnSearch();
		} else {
			alert(_data.resultMsg);
		}
	});
}
