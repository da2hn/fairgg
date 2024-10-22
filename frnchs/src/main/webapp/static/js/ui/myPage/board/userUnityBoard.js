$(document).ready(function() {
	//최초 실행시
	fnSetSchCodeList();
	//통합게시판 코드로 조회
	fn_selectUserUnityBoardList(1);
	fn_selectMobNoticeList(1);
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectUserUnityBoardList();
	});
	
	$("#schTxtMob").keyup(function(e){
		if(e.keyCode == 13){
			$("#dataTbodyMob").empty();
			fn_selectMobNoticeList();
		}
	});

	$("#btnSearch").click(function(){
		fn_selectUserUnityBoardList(1);
	});
	
	$("#btnMobSearch").click(function() {
		$("#dataTbodyMob").empty();
		fn_selectMobNoticeList(1);
	});
	
	/*$("#unitType").change(function(){
		$("#schCode").val("");
		fn_selectUserUnityBoardList(1);
	});
	
	$("#unitTypeMob").change(function(){
		$("#dataTbodyMob").empty();
		fn_selectMobNoticeList(1);
	}); */
	
//	$("#unitType").change(function(){
//		$("#schCode").val("");
//		if($("#unitType").val() == '12'){
//			$("#schCode").attr("disabled", false);
//		}else{
//			$("#schCode").attr("disabled", true);
//		}
//	});
	
//	$("#unitTypeMob").change(function(){
//		$("#schCodeMob").val("");
//		if($("#unitTypeMob").val() == '12'){
//			$("#schCodeMob").attr("disabled", false);
//		}else{
//			$("#schCodeMob").attr("disabled", true);
//		}
//		/*$("#boardMngTypeMob").val("");*/
//	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectMobNoticeList(Number($("input[name=pageIndexMob]").val())+1);
		}
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
//	fn_bindCodeListToSelOption("INTEG_SE_CODE","schCode",true);
//	fn_bindCodeListToSelOption("INTEG_SE_CODE","schCodeMob",true);
	
	fn_selectUnitNoticeOption();
	fn_selectUnitNoticeOptionMob();
}

function fn_selectUserUnityBoardList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/myPage/board/info/selectUserUnityBoardList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('전체<em> '+data.resultCount+' </em>건');
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
//					console.log(data);
					var boardType = '-';
					if(data.boardType == 1) {
						boardType = "게시글";
//					} else if(data.boardType == 2) {
//						boardType = "답글";
					} else if(data.boardType == 3) {
						boardType = "댓글";
					}
					
					dataTr += '<tr>';
					dataTr += '<td>'+data.rn+'</td>';
					dataTr += '<td>'+boardType+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_noticeSave('+data.bbsSn+')" class="ul">' + data.sj + '</a>';
					if("NEW" == data.updtDtAweek) dataTr += '&nbsp;&nbsp;<img src="/static/images/ico_new.png">';
					dataTr += '</td>';
					dataTr += '<td>'+data.registDt+'</td>';
					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="4">조회된 내용이 없습니다.</td></tr>');
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
	$.post('/myPage/board/info/selectUserUnityBoardList.ajax',$("#searchMobForm").serialize()
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
//					var seCodeNm = "";
//					if(data.seCode == "CS01"  || !data.seCodeNm) {
//						seCodeNm = '';
//					} else {
//						seCodeNm = '[' +data.seCodeNm + ']';
//					}
					var boardType = '-';
					if(data.boardType == 1) {
						boardType = "게시글";
//					} else if(data.boardType == 2) {
//						boardType = "답글";
					} else if(data.boardType == 3) {
						boardType = "댓글";
					}
//					
//					if("NEW" == data.updtDtAweek){
//						dataMobTr += '<div style="margin-bottom:6px;color:#999;">' + seCodeNm + '&nbsp;&nbsp;<img src="/static/images/ico_new.png"></div>';
//					}else{
//						dataMobTr += '<div style="margin-bottom:6px;color:#999;">' + seCodeNm + '</div>';
//					}
					
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_noticeSave('+data.bbsSn+')" style="padding:0px 0px 0px 0px">';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>';
					if("NEW" == data.updtDtAweek) dataMobTr += '&nbsp;&nbsp;<img src="/static/images/ico_new.png">';
					dataMobTr += '</div>';
					dataMobTr +=  '    <p class="subject">'+data.sj+'</p>';
					dataMobTr += '    <p class="nameDate">';
					dataMobTr += '      <span><strong>구분 </strong>'+boardType+'</span>';
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
	var unitTypeTxt = "";
	//해당 url로 이동시키기
//	$("#crud").val('u');
//	$("#viewBoardMngType").val($("#boardMngType").val());
	if($(document).width() <= 687) {
		$("#masterSn").val($("#unitTypeMob").val());//게시판번호
		unitTypeTxt = $("#unitTypeMob option:checked").text();
	} else {
		$("#masterSn").val($("#unitType").val());//게시판번호
		unitTypeTxt = $("#unitType option:checked").text();
	}
	
	$("#bbsDc").val(unitTypeTxt);
	$("#bbsNm").val(unitTypeTxt);
	$("#menuNm").val(unitTypeTxt);
	$("#sn").val(obj);//글번호
	$("#reqForm").attr("action", '/board/listView.do');
	$("#reqForm").submit();
}


