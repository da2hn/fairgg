$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectNoticeList(); 
	});

	$("#btn_sch").click(function() {
		fn_selectNoticeList();
	});
	
	fn_selectNoticeList(1);
});

function fn_selectNoticeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/board/notice/selectNoticeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('전체<em> '+data.resultCount+' </em>건');
			$("#dataTbody").empty();
			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '<td>'+data.noticeSn+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_noticeView('+data.noticeSn+')" class="ul"> ['+ data.noticeSeCodeNm+ '] ' +data.sj+' </a>';
					if("NEW" == data.updtDtAweek) dataTr += '<img src="/static/images/ico_new.png">';
					dataTr += '</td>';
					dataTr += '<td>'+data.updtDt+'</td>';
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

function fn_noticeView(obj) {
	$("#crud").val('r');
	$("#noticeSn").val(obj);
	$("#schCodeVal").val($("#schCode").val());
	$("#schTxtVal").val($("#schTxt").val());
	$("#reqForm").attr("action", '/board/notice/noticeView.do');
	$("#reqForm").submit();		
}

	
	