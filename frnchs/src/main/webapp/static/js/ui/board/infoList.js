$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectInfoList();
	});

	$("#btn_sch").click(function() {
		fn_selectInfoList();
	});

	fn_selectInfoList(1);
});

function fn_selectInfoList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);

	$.post('/board/info/selectInfoList.ajax',$("#searchForm").serialize()
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

					dataTr += '<td>'+data.fntnSportSn+'</td>';
					dataTr += '<td>'+data.fntnSportCnSeCodeNm+'</td>';
					if(("N" == data.othbcAt && data.userNo != $("#ssUserNo").val()) && '[ROLE_US01]' == $("#ssUserRole").val()) {
						dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="alert(\'비공개 글입니다\');return false;" class="ul"> [비공개] '+data.sj+' </a>';
					} else {
						dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_infoView('+data.fntnSportSn+')" class="ul"> '+data.sj+' </a>';
					}
					if("NEW" == data.updtDtAweek) dataTr += '<img src="/static/images/ico_new.png">';
					dataTr += '</td>';
					dataTr += '<td>'+data.userNm+'</td>';
					dataTr += '<td>'+data.rdcnt+'</td>';
					dataTr += '<td>'+data.updtDt+'</td>';

					/*dataTr += '<td>';
					if($("#ssUserNo").val() == ''){
						dataTr +=  '<a href="#" onclick="alert(\'로그인을 해주세요.\');return false;" class="ul"> ';
					} else if(("N" == data.othbcAt && data.userNo != $("#ssUserNo").val()) && '[ROLE_US01]' == $("#ssUserRole").val()){
						dataTr +=  '<a href="#" onclick="alert(\'비공개 글입니다.\');return false;" class="ul"> ';
					} else {
						dataTr +=  '<a href="'+contextPath+'/file/downloadZipFile.do?atchmnflNo='+data.atchmnflNo+'&zipName='+data.fntnSportSn+'_'+data.sj+'" class="ul"> ';
					}
					if(data.atchmnflNo != '') {
						dataTr += '<img src="/static/images/ico_attach1.png">';
					}
					dataTr += '</a>';
					dataTr += '</td>';
					*/

					dataTr += '<td>';
					if(("N" == data.othbcAt && data.userNo != $("#ssUserNo").val()) && '[ROLE_US01]' == $("#ssUserRole").val()){
						dataTr +=  '<a href="#" onclick="alert(\'비공개 글입니다.\');return false;" class="ul"> ';
					} else {
						dataTr +=  '<a href="'+contextPath+'/file/downloadZipFile.do?atchmnflNo='+data.atchmnflNo+'&fileKey='+data.fileKey+'&zipName='+data.fntnSportSn+'_'+data.sj+'" class="ul"> ';
					}
					if(data.atchmnflNo != null) {
						dataTr += '<img src="/static/images/ico_attach1.png">';
					}
					dataTr += '</a>';
					dataTr += '</td>';


					dataTr += '</tr>';
					//답변
					if(data.answerCn != null && data.answerCn != ''){
						dataTr += '<tr>';

						dataTr += '<td> </td>';
						dataTr += '<td>'+data.fntnSportCnSeCodeNm+'</td>';
						if(("N" == data.othbcAt && data.userNo != $("#ssUserNo").val()) && '[ROLE_US01]' == $("#ssUserRole").val()) {
							dataTr += '<td style="text-align: left;"><img src="/static/images/ico_re.png"><a href="javascript:void(0);" onclick="alert(\'비공개 글입니다\');return false;" class="ul"> [비공개] 답변 </a>';
						} else {
							dataTr += '<td style="text-align: left;"><img src="/static/images/ico_re.png"><a href="javascript:void(0);" onclick="fn_infoAnswerView('+data.fntnSportSn+')" class="ul"> 답변 </a>';
						}
						if("NEW" == data.answerUpdtDtAweek) dataTr += '<img src="/static/images/ico_new.png">';
						dataTr += '</td>';
						dataTr += '<td>'+data.answrrUserNm+'</td>';
						dataTr += '<td>'+data.rdcnt+'</td>';
						dataTr += '<td>'+data.answerUpdtDt+'</td>';
						dataTr += '<td></td>';

						dataTr += '</tr>';
					}
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="7">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			alert(data.resultMsg);
		}
	});
}

function fn_infoView(obj) {
	$("#crud").val('r');
	$("#fntnSportSn").val(obj);
	$("#reqForm").attr("action", '/board/info/infoView.do');
	$("#reqForm").submit();
}

function fn_infoAnswerView(obj) {
	$("#crud").val('r');
	$("#answerAt").val('y');
	$("#fntnSportSn").val(obj);
	$("#reqForm").attr("action", '/board/info/infoView.do');
	$("#reqForm").submit();
}
