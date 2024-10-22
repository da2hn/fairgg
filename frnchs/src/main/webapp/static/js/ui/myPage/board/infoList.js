$(document).ready(function() {
	$(document).on("click", "#btn_sch", function(){
		fn_selectInfoList();
	});
	
	$(document).on("click", "#btn_schMob", function(){
		$("#schFntnSportCnSeCode").val($("#schFntnSportCnSeCodeMob").val());
		$("#schTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_selectInfoListMob();
	});
	
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectInfoList();
	});
	
	$("#schTxtMob").keyup(function(e){
		$("#schFntnSportCnSeCode").val($("#schFntnSportCnSeCodeMob").val());
		$("#schTxt").val($("#schTxtMob").val());
		if(e.keyCode == 13){
			$("#dataTbodyMob").empty();
			fn_selectInfoListMob();
		}
	});

	
	$("#btn_delete").click(function() {
		fn_deleteInfo();
	});

	$("#btn_deleteMob").click(function() {
		fn_deleteInfoMob();
	});

	fn_selectInfoList(1);
	fn_selectInfoListMob();
	
	//Mob paging
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectInfoListMob(Number($("input[name=pageIndexMob]").val())+1);
		}
	});
});

function fn_selectInfoList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);

	$.post('/myPage/board/info/selectInfoList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '<td>';
					dataTr += '<span class="mCheckbox notext">';
					dataTr += '<input type="checkbox" id="sn_'+data.fntnSportSn+'" name="chkRowSn" title="선택" value="'+data.fntnSportSn+'">';
					dataTr += '<label for="sn_'+data.fntnSportSn+'">선택</label>';
					dataTr += '</span>';
					dataTr += '</td>';
//					dataTr += '<td>'+data.fntnSportSn+'</td>';
					dataTr += '<td>'+data.fntnSportCnSeCodeNm+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_infoSave('+data.fntnSportSn+')" class="ul"> '+data.sj+' </a>';
					if("NEW" == data.updtDtAweek) dataTr += '<img src="/static/images/ico_new.png">';
					dataTr += '</td>';
					dataTr += '<td>'+data.updtDt+'</td>';
					if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataTr += '<td><a href="javascript:void(0)">-</a></td>';
					} else {
						dataTr += '<td><a href="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="ul"><img src="/static/images/ico_attach1.png" width="20" height="10"></a></td>';
					}
					dataTr += '</tr>';
					//답변
					if(data.answerCn != null && data.answerCn != ''){
						dataTr += '<tr>';
						dataTr += '<td>';
						dataTr += '<span class="mCheckbox notext">';
						dataTr += '<input type="checkbox" id="re_'+data.fntnSportSn+'" name="chkRowRe" title="선택" value="'+data.fntnSportSn+'">';
						dataTr += '<label for="re_'+data.fntnSportSn+'">선택</label>';
						dataTr += '</span>';
						dataTr += '</td>';
//						dataTr += '<td></td>';
						dataTr += '<td></td>';
						dataTr += '<td style="text-align: left;"><img src="/static/images/ico_re.png"><a href="javascript:void(0);" onclick="fn_infoSave('+data.fntnSportSn+')" class="ul"> 답변 </a>';
						if("NEW" == data.answerUpdtDtAweek) dataTr += '<img src="/static/images/ico_new.png">';
						dataTr += '</td>';
						dataTr += '<td>'+data.answerUpdtDt+'</td>';
						/*dataTr += '<td>'+data.answrrUserNm+'</td>';*/
						if(data.inputFileNm == null || data.atchmnflNo == 0) {
							dataTr += '<td><a href="javascript:void(0)">-</a></td>';
						} else {
							dataTr += '<td><a href="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="ul"><img src="/static/images/ico_attach1.png" width="20" height="10"></a></td>';
						}
						dataTr += '</tr>';
					}
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

function fn_selectInfoListMob(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	$.post('/myPage/board/info/selectInfoList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li>';
					dataTr += '	<div class="box">';
					dataTr += '  <p class="check">';
					dataTr += '    <input type="checkbox" name="chkM" id="re_'+data.fntnSportSn+'" title="선택" value="'+data.fntnSportSn+'" class="hidden notxt">';
					dataTr += '    <label for="re_'+data.fntnSportSn+'"></label>';
					dataTr += '  </p>';
					dataTr += '  <a href="javascript:void(0);" onclick="fn_infoSaveMob('+data.fntnSportSn+')">';
					dataTr += '		<div class="numState">';
					dataTr += '			<span class="no">'+data.fntnSportCnSeCodeNm+'</span>';
					dataTr += '		</div>';
					dataTr += '		<p class="subject">'+data.sj+'</p>';
					dataTr += '		<p class="nameDate"><span><strong>등록일 '+data.updtDt+'</strong></span></p>';
					if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataTr += '<p class="attach"></p>';
					} else {						
						dataTr += '<p class="attach active"></p>';
					}
					dataTr += '		</a>';
					dataTr += '	</div>';
					dataTr += '</li>';
				})
				$("#dataTbodyMob").append(dataTr);
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

function fn_deleteInfo(){
	if (confirm("삭제하시겠습니까?")) {
		var chkRowSn = "";//게시글
		var chkRowRe = "";//답변
		$("input[name='chkRowSn']:checked").each (function (){
			chkRowSn = chkRowSn + $(this).val()+"," ;
		});
		chkRowSn = chkRowSn.substring(0,chkRowSn.lastIndexOf( ",")); //맨끝 콤마 지우기
		$("#chkRowSn").val(chkRowSn);

		$("input[name='chkRowRe']:checked").each (function (){
			chkRowRe = chkRowRe + $(this).val()+"," ;
		});
		chkRowRe = chkRowRe.substring(0,chkRowRe.lastIndexOf( ",")); //맨끝 콤마 지우기
		$("#chkRowRe").val(chkRowRe);

		if('' == chkRowSn && '' == chkRowRe){
			alert("삭제할 대상을 선택하세요.");
			return false;
		}

		fnGetAjaxData("/myPage/board/info/deleteMultiInfo.ajax", "reqForm", function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert("삭제되었습니다.");

				var frm = $("#reqForm");
				frm.attr("action","/myPage/board/info/infoList.do");
				frm.attr("method","post");
				frm.submit();
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}

function fn_deleteInfoMob(){
	if (confirm("삭제하시겠습니까?")) {
		var chkM = "";
		
		$("input[name='chkM']:checked").each (function (){
			chkM = chkM + $(this).val()+"," ;
		});
		chkM = chkM.substring(0,chkM.lastIndexOf( ",")); //맨끝 콤마 지우기
		$("#chkRowSn").val(chkM);
		
		if('' == chkM){
			alert("삭제할 대상을 선택하세요.");
			return false;
		}
		
		
		fnGetAjaxData("/myPage/board/info/deleteMultiInfo.ajax", "reqForm", function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert("삭제되었습니다.");
				
				var frm = $("#reqForm");
				frm.attr("action","/myPage/board/info/infoList.do");
				frm.attr("method","post");
				frm.submit();
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}

function fn_infoSave(obj) {
	$("#crud").val('u');
	$("#fntnSportSn").val(obj);
	$("#schCodeVal").val($("#schFntnSportCnSeCode").val());
	$("#schTxtVal").val($("#schTxt").val());
	$("#reqForm").attr("action", '/myPage/board/info/infoSave.do');
	$("#reqForm").submit();
}

function fn_infoSaveMob(obj) {
	$("#crud").val('u');
	$("#fntnSportSn").val(obj);
	$("#schCodeVal").val($("#schFntnSportCnSeCodeMob").val());
	$("#schTxtVal").val($("#schTxtMob").val());
	$("#reqForm").attr("action", '/myPage/board/info/infoSave.do');
	$("#reqForm").submit();
}
