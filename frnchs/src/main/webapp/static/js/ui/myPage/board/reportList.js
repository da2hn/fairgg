$(document).ready(function() {

	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectReportList(); 
	});

	$("#btn_sch").click(function() {
		fn_selectReportList();
	});
	
	fn_selectReportList(1);
	
});

function fn_selectReportList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/myPage/board/report/selectReportList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
//			$("#totalCnt").empty();
//			$("#totalCnt").append('전체<em> '+data.resultCount+' </em>건');
			$("#dataTbody").empty();
//			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '<td>'+data.injstCntrctSttemntSn+'</td>';
					dataTr += '<td>'+data.sttemntIemSeCodeNm+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_reportView('+data.injstCntrctSttemntSn+')" class="ul">'+data.sj+'</a>';
					if("NEW" == data.updtDtAweek) dataTr += '<img src="/static/images/ico_new.png">';
					dataTr += '</td>';
					dataTr += '<td>'+data.updtDt+'</td>';
					dataTr += '<td>'+data.answerSttusSeCodeNm+'</td>';
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

function fn_reportView(obj) {
	$("#crud").val('u');
	$("#injstCntrctSttemntSn").val(obj);
	$("#reqForm").attr("action", '/myPage/board/report/reportView.do');
	$("#reqForm").submit();
}

	
	