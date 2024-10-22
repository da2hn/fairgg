$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectInfoOpenList();
	});

	$("#btn_sch").click(function() {
		fn_selectInfoOpenList();
	});

	fn_selectInfoOpenList(1);
});

function fn_selectInfoOpenList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);

	$.post('/board/infoOpen/selectInfoOpenList.ajax',$("#searchForm").serialize()
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
					dataTr += '<td>'+data.infoOthbcSn+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_infoOpenView('+data.infoOthbcSn+')" class="ul"> ['+ data.infoOthbcSeCodeNm+ '] ' +data.sj+' </a>';
					if("NEW" == data.updtDtAweek) dataTr += '<img src="/static/images/ico_new.png">';
					dataTr += '</td>';
					dataTr += '<td>'+data.registDt+'</td>';
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

function fn_infoOpenView(obj) {
	$("#crud").val('r');
	$("#infoOthbcSn").val(obj);
	$("#schCodeVal").val($("#schCode").val());
	$("#schTxtVal").val($("#schTxt").val());
	$("#reqForm").attr("action", '/board/infoOpen/infoOpenView.do');
	$("#reqForm").submit();
}

function tabFix() {
	var pos = $(window).scrollTop();
	var hdPos = $('#header').scrollTop();
	var tab = $('.fixTab');

	if (pos > hdPos) {
		tab.addClass('fixed');
	} else {
		tab.removeClass('fixed');
	}
}

$(window).scroll(function() {
	tabFix();
});