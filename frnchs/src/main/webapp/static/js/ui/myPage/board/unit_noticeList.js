$(document).ready(function() {
	/*$("#mboardMngType").val($("#boardMngTypeMob option:selected").val());
	$("#mschCode").val($("#schCodeMob option:selected").val());
	$("#mschTxt").val($("#schTxtMob").val());*/
	//최초 실행시
	fnSetSchCodeList();
	//통합게시판 코드로 조회
	fn_selectNoticeList(1);
	fn_selectMobNoticeList(1);
	
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectNoticeList();
	});

	$("#schTxtMob").keyup(function(e){
		if(e.keyCode == 13) {
			$("#dataTbodyMob").empty();
			fn_selectMobNoticeList(1);
		}
	});

	$("#btnSearch").click(function(){
		fn_selectNoticeList(1);
	});
	
/*	$("#unitType").change(function(){
		fn_selectNoticeList(1);
	});*/
	
	/*$("#unitTypeMob").change(function(){
		$("#dataTbodyMob").empty();
		fn_selectMobNoticeList(1);
	});*/
	
	$("#unitType").change(function(){
		$("#schCode").val("");
		if($("#unitType").val() == '12'){
			$("#schCode").attr("disabled", false);
		}else{
			$("#schCode").val("");
			$("#schCode").attr("disabled", true);
		}
		
//		fn_selectNoticeList(1);
	});
	
	$("#unitTypeMob").change(function(){
		$("#schCodeMob").val("");
		if($("#unitTypeMob").val() == '12'){
			$("#schCodeMob").attr("disabled", false);
		}else{
			$("#schCodeMob").val("");
			$("#schCodeMob").attr("disabled", true);
		}
		
		/*$("#dataTbodyMob").empty();
		fn_selectMobNoticeList(1);*/
	});
	
	/*$("#boardMngType").change(function(){
		$("#schCode").val("");
	});
	
	$("#boardMngTypeMob").change(function(){
		$("#schCodeMob").val("");
	});*/
	
	//공지사항변경시 =>나머지 옵션 초기화  
	/*$("#boardMngType").change(function(){
		fnSetSchCodeList($(this).val());
	});
	$("#boardMngTypeMob").change(function(){
		fnSetSchCodeList($(this).val());
	});*/
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectMobNoticeList(Number($("input[name=pageIndexMob]").val())+1);
		}
	});

	$("#btnMobSearch").click(function() {
		/*$("#mboardMngType").val($("#boardMngTypeMob option:selected").val());
		$("#mschCode").val($("#schCodeMob option:selected").val());
		$("#mschTxt").val($("#schTxtMob").val());*/
		$("#dataTbodyMob").empty();
		fn_selectMobNoticeList(1);
	});
});

function fn_selectUnitNoticeOption(){
	bAll = typeof bAll !== 'undefined' ? bAll : false ;
	fnGetAjaxData("/myPage/board/selectUnitNoticeOption.ajax", {}, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#unitType").empty();
			for(var i = 0; i < _data.options.length; i++){
				var option = $('<option>');
				option.val(_data.options[i].code);
				option.text(_data.options[i].codeNm);
				$("#unitType").append(option);
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}

function fn_selectUnitNoticeOptionMob(){
	bAll = typeof bAll !== 'undefined' ? bAll : false ;
	fnGetAjaxData("/myPage/board/selectUnitNoticeOption.ajax", {}, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#unitTypeMob").empty();
/*			$("#unitTypeMob").append("<option value=''>전체</option>");*/
			for(var i = 0; i < _data.options.length; i++){
				var option = $('<option>');
				option.val(_data.options[i].code);
				option.text(_data.options[i].codeNm);
				$("#unitTypeMob").append(option);
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}

function fnSetSchCodeList(boardMngType){
	
	boardMngType = typeof boardMngType !== 'undefined' ? boardMngType : $("#boardMngType option:selected").val();
//	console.log(boardMngType);
	fn_bindCodeListToSelOption("INTEG_SE_CODE","schCode",true);
	fn_bindCodeListToSelOption("INTEG_SE_CODE","schCodeMob",true);
	
	fn_selectUnitNoticeOption();
	fn_selectUnitNoticeOptionMob();
}

function fn_selectNoticeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/myPage/board/notice/selectUnitNoticeList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('전체<em> '+data.resultCount+' </em>건');
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					var sn = data.sn;
					var codeNm = "";
					var sj = "";
					if(data.seCode == "CS01" || !data.seCodeNm) {
						sj = data.sj;
					} else {				
						sj = "["+ data.seCodeNm+ "]" + data.sj;
					}
					
					dataTr += '<tr>';
					dataTr += '<td>'+data.rn+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_noticeSave('+sn+')" class="ul">' + sj + '</a>';
					if("NEW" == data.updtDtAweek) dataTr += '&nbsp;&nbsp;<img src="/static/images/ico_new.png">';
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
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	$.post('/myPage/board/notice/selectUnitNoticeList.ajax',$("#searchMobForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			/*$("#totalCnt").empty();
			$("#totalCnt").append('전체<em> '+data.resultCount+' </em>건');*/
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){
					dataMobTr += '<li class="notice">';
					dataMobTr += '<div class="box" style="padding:16px 16px 16px 0px">';
					var seCodeNm = "";
					if(data.seCode == "CS01"  || !data.seCodeNm) {
						seCodeNm = '';
					} else {
						seCodeNm = '[' +data.seCodeNm + ']';
					}
					if("NEW" == data.updtDtAweek){
						dataMobTr += '<div style="margin-bottom:6px;color:#999;">' + seCodeNm + '&nbsp;&nbsp;<img src="/static/images/ico_new.png"></div>';
					}else{
						dataMobTr += '<div style="margin-bottom:6px;color:#999;">' + seCodeNm + '</div>';
					}
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_noticeSave('+data.sn+')" style="padding:0px 0px 0px 0px">';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>';
					dataMobTr += '</div>';
					dataMobTr += '    <p class="subject">'+data.sj+'</p>';
					dataMobTr += '    <p class="nameDate">';
					dataMobTr += '      <span><strong>등록일 </strong>'+data.registDt+'</span>';
					dataMobTr += '    </p>';
					dataMobTr += '  </a>';
					dataMobTr += '</div>';
					dataMobTr += '</li>';
				})
				$("#dataTbodyMob").append(dataMobTr);
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

function fn_noticeSave(obj) {
	$("#crud").val('u');
	$("#viewBoardMngType").val($("#boardMngType").val());
	$("#viewUnitType").val($("#unitType").val());
	$("#sn").val(obj);
	$("#reqForm").attr("action", '/myPage/mng/notice/noticeSave.do');
	$("#reqForm").submit();
}


