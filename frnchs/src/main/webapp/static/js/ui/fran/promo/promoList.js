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
			var dataList = data.goodFrnchsAdiList;
			if(!!dataList && dataList.length != 0) {
				var dataLi = "";
				dataList.forEach(function(data,idx){
					dataLi += '<li>';
					dataLi += '	<a href="###">';
					dataLi += '		<span class="tit">놀부 부대찌개</span>';
					dataLi += '		<span class="txt">';
					dataLi += '			<span class="ls"><strong>업종 :</strong> 한식</span>';
					dataLi += '			<span class="ls"><strong>선정일 :</strong> 2020.08.20</span>';
					dataLi += '		</span>';
					dataLi += '	</a>';
					dataLi += '</li>';
				})
				$("#dataUl").append(dataLi);
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

