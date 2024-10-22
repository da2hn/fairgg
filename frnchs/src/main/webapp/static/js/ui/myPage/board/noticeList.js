$(document).ready(function() {
	$("#mboardMngType").val($("#boardMngTypeMob option:selected").val());
	$("#mschCode").val($("#schCodeMob option:selected").val());
	$("#mschTxt").val($("#schTxtMob").val());
	//최초 실행시
	fnSetSchCodeList();
	//통합게시판 코드로 조회
	fn_selectNoticeList(1);
	fn_selectMobNoticeList(1);
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectNoticeList();
	});

	$("#btnSearch").click(function(){
		fn_selectNoticeList(1);
	});
	
	//공지사항변경시
	$("#boardMngType").change(function(){
		fnSetSchCodeList($(this).val());
	});
	$("#boardMngTypeMob").change(function(){
		fnSetSchCodeList($(this).val());
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectMobNoticeList(Number($("input[name=pageIndexMob]").val())+1);
		}
	});

	$("#btnMobSearch").click(function() {
		$("#mboardMngType").val($("#boardMngTypeMob option:selected").val());
		$("#mschCode").val($("#schCodeMob option:selected").val());
		$("#mschTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_selectMobNoticeList(1);
	});
	
/*	$("#schCode").change(function(){
		fn_selectNoticeList(1);
	});*/
});

function fnSetSchCodeList(boardMngType){
	
	boardMngType = typeof boardMngType !== 'undefined' ? boardMngType : $("#boardMngType option:selected").val();
//	var codeId = "";
//	if(boardMngType == "N"){
//		codeId = "NOTICE_SE_CODE";
//	}else if(boardMngType == "I"){
//		codeId = "INFO_OTHBC_SE_CODE";
//	}
//	fn_bindCodeListToSelOption(codeId,"schCode",true);
	fn_bindCodeListToSelOption("INTEG_SE_CODE","schCode",true);
	fn_bindCodeListToSelOption("INTEG_SE_CODE","schCodeMob",true);
}

function fn_selectNoticeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/myPage/board/notice/selectNoticeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('전체<em> '+data.resultCount+' </em>건');
			$("#dataTbody").empty();
//			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					var sn = data.sn;
					var codeNm = "";
					var sj = "["+ data.seCodeNm+ "]" + data.sj;
//					if($("#boardMngType").val() == "N" || data.noticeSn){
//						sn = data.noticeSn;
//						codeNm = data.noticeSeCodeNm;
//						sj = "["+ codeNm+ "]" + data.sj;
//
//						//뒤로가기 대응
//						$("#boardMngType").val("N");
//					}else if($("#boardMngType").val() == "I" && data.infoOthbcSn){
//						var code = data.infoOthbcSeCode;
//						sn = data.infoOthbcSn;
//						codeNm = data.infoOthbcSeCodeNm;
//						sj = "["+ codeNm+ "]" + data.sj;
//						if(code == "IN03"){
//							sj += " (순번:"+data.expsrSn+"사용유무:"+data.useAt+")";
//						}
//					}
					
					dataTr += '<tr>';
					dataTr += '<td>'+data.rn+'</td>';
//					dataTr += '<td>'+sn+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_noticeSave('+sn+')" class="ul">' + sj + '</a>';
					if("NEW" == data.updtDtAweek) dataTr += '<img src="/static/images/ico_new.png">';
					dataTr += '</td>';
					dataTr += '<td>'+data.registDt+'</td>';
					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="3">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fn_selectMobNoticeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/myPage/board/notice/selectNoticeList.ajax',$("#searchMobForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('전체<em> '+data.resultCount+' </em>건');
//			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){
					/*var sj = "["+ data.seCodeNm+ "]" + data.sj;*/
					dataMobTr += '<li class="notice">';
					dataMobTr += '<div class="box" style="padding:16px 16px 16px 30px">';
					if(data.seCodeNm == "공지"){
						dataMobTr += '<div class="category">공지사항</div>';
					}else {
						dataMobTr += '<div style="margin-bottom:6px;color:#999;">' + '[' +data.seCodeNm + ']' + '</div>';
					}
					/*dataMobTr += '<p class="check">'+data.rn;
					dataMobTr += '  </p>';*/
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_noticeSave('+data.sn+')" style="padding:0px 0px 0px 0px">';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>';
					dataMobTr += '</div>';
					dataMobTr +=  '    <p class="subject">'+data.sj+'</p>';
					dataMobTr += '    <p class="nameDate">';
					dataMobTr += '      <span><strong>등록일 </strong>'+data.registDt+'</span>';
					dataMobTr += '    </p>';
					dataMobTr += '  </a>';
					dataMobTr += '</div>';
					dataMobTr += '</li>';
				})
				$("#dataTbodyMob").append(dataMobTr);
			} else {
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

function fn_noticeSave(obj) {
	$("#crud").val('u');
//	if($("#boardMngType").val() == "N"){
//		$("#noticeSn").val(obj);
//		$("#viewBoardMngType").val("N");
//	}else if($("#boardMngType").val() == "I"){
//		$("#infoOthbcSn").val(obj);
//		$("#viewBoardMngType").val("I");
//	}
	$("#viewBoardMngType").val($("#boardMngType").val());
	$("#sn").val(obj);
	$("#reqForm").attr("action", '/myPage/mng/notice/noticeSave.do');
	$("#reqForm").submit();
}


