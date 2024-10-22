/*
 * 매물점포 문의신청 현황 - 일반사용자
*/
/*var check = false;*/
/*var fObj = null*/
var fObjMob = null
$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectInqryList();
	}); 
	
	$("#schTxtMob").keyup(function(e){
		if(e.keyCode == 13){
			$("#schSeCode").val($("#schSeCodeMob").val());
			$("#schTxt").val($("#schTxtMob").val());
			$("#dataTbodyMob").empty();
			fn_selectInqryListMob();
		} 
	});

	$("#btn_sch").click(function() {
		fn_selectInqryList();
	});
	
	$("#btn_schMob").click(function() {
		$("#schSeCode").val($("#schSeCodeMob").val());
		$("#schTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_selectInqryListMob();
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			$("#schSeCode").val($("#schSeCodeMob").val());
			$("#schTxt").val($("#schTxtMob").val());
			fn_selectInqryListMob(Number($("input[name=pageIndexMob]").val())+1)
		}
	})
	
	$("#btnAnswerMob").click(function(){
		if (confirm("처리하시겠습니까?")) {
			var params = {
					 'trdeThingInqryNo':$("#trdeThingInqryNoMob").val()
					,'answerCn' : $("#answerCnMob").val()
				};
			fnGetAjaxData("/myPage/board/trade/updateInqrySttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					toggle_dimmed_view('layer_qnaDetail_0');
					fn_selectInqryList(1);
				} else {
					alert(_data.resultMsg);
				};
			});
		};
	});

	$(".chkMyInqry").click(function(){
		if($("#myInqryVal").val() == 'N'){
			$("#myInqry").prop("checked", true);
			$("#myInqryMob").prop("checked", true);
			$("#myInqryVal").val('Y');
		}else{
			$("#myInqry").prop("checked", false);
			$("#myInqryMob").prop("checked", false);
			$("#myInqryVal").val('N');
		}
	});
	
	$("#dataTbody").empty();
	$("#dataTbodyMob").empty();
	fn_selectInqryList(1);
	fn_selectInqryListMob(1);
	
	$(".jsBtnClose1").click(function(){
		$("#inqryPopup").hide();
		$("#userNm").text("");
		$("#inqryRegDt").text("");
		$("#inqrTelno").text("");
		$("#emailAdres").text("");
		$("#answerCn").val("");
		
		$("#inqryUserNmMob").text("");
		$("#inqryRegDtMob").text("");
		$("#inqrTelnoMob").text("");
		$("#inqrEmailAdresMob").text("");
		$("#answerCnMob").val("");
	});
	
});

function fn_selectInqryList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("#pageSe").val('managePage');
	
	$.post('/myPage/board/trade/selectInqryList.ajax',$("#searchForm").serialize()
	).done(function(data) {
//			data = jQuery.parseJSON(data);
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					var dataTr = $("<tr>");
					var td = $("<td>");
					td.text(data.rn);
					dataTr.append(td);
					
					td = $('<td class="tit" style="text-align: left;">');
					td.html('<p class="type">' + data.sopsrtStleCodeNm + '</p>');
					var aTag = $('<a href="javascript:void(0);" class="ul">')
					aTag.click(data, function(res){
						toggle_dimmed_view('layer_qna_0');
						var data = res.data;
						fn_inqryPopupView(data);
					});
					aTag.text(data.sj);
					td.append(aTag);
					dataTr.append(td);
					
					td = $('<td>');
					if(data.userNo == data.inqryUserNo){
						td.text('내 문의');
					}else{
						td.text('타인 문의');
					}
					dataTr.append(td);
					
					td = $('<td>');
					td.text(data.inqryUserNm);
					dataTr.append(td);
					
					td = $('<td style="text-align:center;">');
					if(data.answerSttusSeCodeNm == '답변완료'){
						td.html('<span class="txtPrimary">' + data.answerSttusSeCodeNm + '</span>');
					}else {
						td.text(data.answerSttusSeCodeNm);
					}
					dataTr.append(td);

					td = $('<td>');
					var aTag = $('<a class="iview" style="height:19px;">');
					aTag.css('cursor', 'pointer');
					aTag.click(data, function(res){
						var data = res.data;
						fn_tradeView(data.trdeThingRegistNo);
					});
					td.append(aTag);
					dataTr.append(td);
					
					td = $('<td>');
					var aTag = $('<a class="iAttach">첨부파일</a>');
					var href = contextPath+'/file/downloadZipFile.do?atchmnflNo='+data.atchmnflNo+'&fileKey='+data.fileKey+'&zipName='+data.trdeThingRegistNo+'_'+data.sj;
					aTag.attr('href', href);
					td.append(aTag);
					dataTr.append(td);

					$("#dataTbody").append(dataTr);
				});
			} else {
				$("#dataTbody").append('<tr><td colspan="7">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			alert(data.resultMsg);
		}
	});
}

function fn_selectInqryListMob(pageIndex) {
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndex]").val($("input[name=pageIndexMob]").val());
	$("#pageSe").val('managePage');
	$("#schSeCode").val($("#schSeCodeMob").val());
	$("#schTxt").val($("#schTxtMob").val());
	$("#myInqry").val($("#myInqryMob").val());
	$.post('/myPage/board/trade/selectInqryList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataUl = $("#dataTbodyMob");
				dataList.forEach(function(data,idx){
					$("#inqryPopup").hide();
					var li = $("<li>");
					var div = $("<div class='box'>");
					var aTag = $('<a href="javascript:void(0);" class="ul">');
					aTag.click(function(){
						toggle_dimmed_view('layer_qnaDetail_0');
						fn_inqryPopupViewMob(data);
					});
					var p = $("<p class='no'>NO."+ data.trdeThingInqryNo + '<p>');
					aTag.append(p);
					p = $("<p class='subject' style='width:90%'>"+ data.sj + '<p>');
					aTag.append(p);
					p = $("<p class='nameDate' style='width:90%'><span>" + data.sopsrtStleCodeNm + "</span> " +
					        "<span>"+ data.inqryUserNm + '(' + data.inqrTelno + ')' +"</span></p>");
					aTag.append(p);
					if(data.answerSttusSeCode =='AN01'){
						p = $("<p class='reply active'>" + '답변완료' + "</p>");
					}else{
						p = $("<p class='reply'>" + '미답변' + "</p>");
					}
					aTag.append(p);
					var span = $('<p class="nameDate" style="width:90%"><span><strong>이메일 </strong>' + data.inqrEmailAdres + '</span></p>');
					
					aTag.append(span);
					div.append(aTag);
					li.append(div);
					dataUl.append(li);
				});
			} else {
				var maxPage = 1;
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/1)';
			}
			$("input[name=pageIndexMobMax]").val(maxPage);
			$("#pagingMob").text(pagingText);
		}else{
			alert(data.resultMsg);
		}
	});
}

function fn_tradeView(obj) {
	$("#crud").val('r');
	$("#trdeThingRegistNo").val(obj);
	$("#srcPath").val(location.pathname);
	$("#reqForm").attr("action", '/board/trade/tradeView.do');
	$("#reqForm").submit();
}

function fn_inqryPopupView(params){
	openInqryPop(params.answerSttusSeCode, params.atchmnflNo);
	$("#trdeThingInqryNo").val(params.trdeThingInqryNo);
	$("#userNm").text(params.userNm);
	$("#inqryRegDt").text(params.inqrRegistDt);
	$("#inqrTelno").text(params.inqrTelno);
	$("#inqrCn").text(params.inqrCn);
	$("#emailAdres").text(params.emailAdres);

//	$('#atchmnfl').html('')
//	if(params.atchmnflNo != null) {
//		var bFile = atchmnflNo == null ? false : true;
//		fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:false, addCnt:"M10", filePath:"basic", maxFileSize:"5", fileType:"imageNpdf", tmpDel:bFile});
//		fObj.init();
//		fObj.getFileList(params.atchmnflNo, "FS02");
//	}
	if(params.answerCn) $("#answerCn").val(params.answerCn);		
}

function fn_inqryPopupViewMob(params){
	openInqryPop(params.answerSttusSeCode);
	$("#trdeThingInqryNoMob").val(params.trdeThingInqryNo);
	$("#inqryTitleMob").text(params.sj);
	$("#inqryRegDtMob").text(params.inqrRegistDt);
	$("#inqryCnMob").text(params.inqrCn);
	$("#inqryUserNmMob").text(params.inqryUserNm);
	$("#inqrEmailAdresMob").text(params.inqrEmailAdres);
	$("#inqrTelnoMob").text(params.inqrTelno);
	if(params.answerCn) $("#answerCnMob").val(params.answerCn);
	if(params.answerSttusSeCode =='AN01'){
		$("#replyNon").hide();
		$("#replyActive").show();
		$("#replyActive").text(params.answerSttusSeCodeNm);
		
		$("#answerCnMob").attr('readOnly', true);
		$("#btnAnswerMob").hide();
		$("#closeBtnMob").css('width', '100%');
	}else{
		$("#replyNon").show();
		$("#replyActive").hide();
		$("#replyNon").text(params.answerSttusSeCodeNm);
		
		$("#answerCnMob").attr('readOnly', false);
		$("#btnAnswerMob").show();
		$("#closeBtnMob").css('width', '50%');
	}
	if(params.atchmnflNo != null) {
		var bImageFileNo = params.atchmnflNo == null ? false : true;
		fObjMob = new fileObjMobInqry({objId:"f2", windowMode:"full", divId:$("#atchFileDivMob"), readOnly:true, addCnt:"S", filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bImageFileNo});
		fObjMob.getFileList(params.atchmnflNo, "FS02");
	}
	if(params.answerCn) $("#answerCnMob").text(params.answerCn);		
}

function fn_limit_txt(txt){
	if(txt.length > 20){
		return txt.substr(0,20)+"...";
	}else{
		return txt;
	};
};