$(document).ready(function() {
	fn_search();
	fn_searchMob();
	
	/*$("#btn_insert").click(function() {
		
	});*/
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_searchMob(Number($("input[name=pageIndexMob]").val())+1)
		}
	});
	
});


function fn_search(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post("/myPage/expr/frnchsInfo/selectFrnchsInfoList.ajax",
		$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr data-frnchs-no="'+data.frnchsNo+'">';
					dataTr += '<td>'+data.rn+'</td>';
					dataTr += '<td>'+data.mlsfcIndutyNm+'</td>';
					dataTr += '<td><a href="javascript:void(0);" class="ul" onclick="fn_movePage(this);">'+data.bsnSgnal+'</a></td>';
					dataTr += '<td>'+data.mtltyNm+'</td>';
					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="5">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fn_searchMob(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$.post("/myPage/expr/frnchsInfo/selectFrnchsInfoList.ajax",
			$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#mDataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li data-frnchs-no="'+data.frnchsNo+'">';
					dataTr += '<div class="box" style="padding:0px">';
					dataTr += '  <a href="javascript:void(0);" class="ul" onclick="fn_movePageMob(this);">';
					dataTr += '		<div class="numState">';
					dataTr += '			<span class="no">NO.'+ data.rn + ' </span>';
					dataTr += '		</div>';
					dataTr += '    <p class="subject">'+data.bsnSgnal+'</p>';
					dataTr += '    <p class="nameDate">';
					dataTr += '      <span><strong>업종</strong> '+data.mlsfcIndutyNm+'</span>';
					dataTr += '      <span><strong>본사명</strong> '+data.mtltyNm+'</span>';
					dataTr += '    </p>';
					dataTr += '  </a>';
					dataTr += '</div>';
					dataTr += '</li>';
					
				})
				$("#mDataTbody").append(dataTr);
			} else {
				$("#mDataTbody").html('<p class="empty tac">조회된 내용이 없습니다.</p>');
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

function fn_movePage(obj) {
//	alert($(obj).closest("tr").data("frnchsNo"));
//	return;
	$("#searchForm").attr("action","/myPage/expr/frnchsInfo/frnchsInfo.do");
	$("#searchForm input[name=reqCrud]").val('r');
	$("#searchForm input[name=frnchsNo]").val($(obj).closest("tr").data("frnchsNo"));
	$("#searchForm").submit();
}

function fn_movePageMob(obj) {
//	alert($(obj).closest("tr").data("frnchsNo"));
//	return;
	$("#searchForm").attr("action","/myPage/expr/frnchsInfo/frnchsInfo.do");
	$("#searchForm input[name=reqCrud]").val('r');
	$("#searchForm input[name=frnchsNo]").val($(obj).closest("li").data("frnchsNo"));
	$("#searchForm").submit();
}

