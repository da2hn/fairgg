$(document).ready(function() {
	//조회
	fnSearch();

	//승인처리
	$("#btnSearch").click(function(){
		fnSearch();
	});
	//승인처리
	$("#btnApprove").click(function(){
		var checkedVal = new Array();
		checkedVal = $("input:checkbox[name='chk']:checked").val();
		if(!checkedVal){
			alert("선택된 항목이 없습니다.");
			return;
		}
		var params = {};
		params["frnchsNo"] = checkedVal;

		fnGetAjaxData("/myPage/fran/promo/saveGoodFrnchsAdiInfo.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				fnSearch();
			} else {
				alert(_data.resultMsg);
			}
		});
	});
});

function fnSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/fran/promo/selectGoodFrnchsExprnRegistList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.goodFrnchsExprnRegistList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '<td>';
					if(data.goodFrnchsAt == "N"){
						dataTr += '		<span class="mCheckbox notext">';
						dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.frnchsNo+'>          ';
						dataTr += '			<label for="chk'+idx+'">선택</label>';
						dataTr += '		</span>';
					}else{
						dataTr += '-';
					}
					dataTr += '</td>';
					dataTr += '<td>'+data.rn+'</td>';
					dataTr += '<td>'+data.mlsfcIndutyNm+'</td>';
					dataTr += '<td>'+data.bsnSgnal+'</td>';
					dataTr += '<td>'+data.adres+'</td>';
					dataTr += '<td>'+data.exctvCo+'명</td>';
					dataTr += '<td>'+data.debtPer+'%</td>';
					if(data.goodFrnchsAt == "Y"){
						dataTr += '<td>승인</td>';
					}else{
						dataTr += '<td>미승인</td>';
					}
					dataTr += '<td>'+data.franchsConfmCnt+'번 참여</td>';
					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
				$(":checkbox[name='chk']").on({
					click:function(e){
						if($(this).prop("checked")){
							$(":checkbox[name='chk']").each(function(i,o){
								$(this).prop("checked",false);
							});
							$(this).prop("checked",true);
						}else{
							$(this).prop("checked",false);
						}
					}
				});
			} else {
				$("#dataTbody").append('<tr><td colspan="9">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

