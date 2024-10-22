$(document).ready(function() { 

	/*$("#btnDiary").click(function() {
		var checkedVal = new Array();
		checkedVal = $("input:checkbox[name='chk']:checked").val();
		if(!checkedVal){
			alert("선택된 항목이 없습니다.");
			return;
		} 
		var params = {};
		params["exprnRegistNo"] = checkedVal;

		var newForm = $('<form></form>');
		newForm.attr("name", "pageForm");
		newForm.attr("method", "post");
		newForm.attr("action", "/myPage/expr/diary/calendarInfo.do");
//		newForm.attr("target", "_blank");

		newForm.append($("<input/>",{type:"hidden", name:"exprnRegistNo", value:checkedVal}));
		newForm.appendTo("body");
		newForm.submit();

//		var form = new FormData();
//		var xhr = new XMLHttpRequest();
//		form.append("exprnRegistNo", checkedVal);
//		xhr.open("POST","/myPage/expr/diary/calendarInfo.do", false);
//		xhr.send(form);

//		fnGetAjaxData("/myPage/expr/diary/calendarInfo.do", params, function(_data) {
//			if(_data.resultCode == RESULT_SUCCESS){
//
//			} else {
//				alert(_data.resultMsg);
//			}
//		});
	});*/
	
	/*$("#btnDiaryMob").click(function() {
		var checkedVal = new Array();
		checkedVal = $("input:checkbox[name='chkRowSnMob']:checked").val();
		if(!checkedVal){
			alert("선택된 항목이 없습니다.");
			return;
		}
		var params = {};
		params["exprnRegistNo"] = checkedVal;
		
		var newForm = $('<form></form>');
		newForm.attr("name", "pageForm");
		newForm.attr("method", "post");
		newForm.attr("action", "/myPage/expr/diary/calendarInfo.do");
		
		newForm.append($("<input/>",{type:"hidden", name:"exprnRegistNo", value:checkedVal}));
		newForm.appendTo("body");
		newForm.submit();
	});
	*/
	
	$("#searchText").keyup(function(e){
		if(e.keyCode == 13) fnSearch();
	});

	$("#searchTextMob").keyup(function(e){
		if(e.keyCode == 13) {
			$("#searchType").val($("#searchTypeMob").val());
			$("#searchText").val($("#searchTextMob").val());
			$("#dataTbodyMob").empty();
			fnSearchMob();
		}
	});
	
	$("#btnSearch").click(function() {
		fnSearch();
	});
	
	$("#btnSearchMob").click(function() {
		$("#searchType").val($("#searchTypeMob").val());
		$("#searchText").val($("#searchTextMob").val());
		$("#dataTbodyMob").empty();
		fnSearchMob();
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			$("#schSeCode").val($("#schSeCodeMob").val());
			$("#schTxt").val($("#schTxtMob").val());
			fnSearchMob(Number($("input[name=pageIndexMob]").val())+1)
		}
	});
	
	//조회
	$("#dataTbody").empty();
	$("#dataTbodyMob").empty();
	fnSearch(1);
	fnSearchMob(1);
});

function fnSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/expr/diary/selectFrnchsExprnReqstConfmList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.frnchsExprnReqstConfmList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					/*dataTr += '	<td>';
					dataTr += '		<span class="mCheckbox notext">';
					dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.exprnRegistNo+'>          ';
					dataTr += '			<label for="chk'+idx+'">선택</label>';
					dataTr += '		</span>';
					dataTr += '	</td>';*/
					dataTr += '	<td>'+data.rn+'</td>';
					dataTr += '	<td>'+data.bsnSgnal+'</td>';
					dataTr += '	<td><a href="javascript:fnBrandReqstView('+data.exprnRegistNo+')" class="ul">'+data.bhfNm+'</a></td>';
					dataTr += '	<td>'+data.bhfAdres+'</td>';
					dataTr += '	<td>'+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</td>';
					if(data.progrsSttusSeCodeNm == "진행중"){
						dataTr += '	<td><span class="txtPrimary">'+data.progrsSttusSeCodeNm+'</span></td>';
					}else{
						dataTr += '	<td>'+data.progrsSttusSeCodeNm+'</td>';
					}
					dataTr += '	<td>';
					if(data.fileKey){
						dataTr += '		<a href="'+contextPath+'/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+data.fileKey+'" class="iAttach">첨부파일</a>';
					}else{
						dataTr += '-';
					}
					dataTr += '	</td>';
					dataTr += '	<td><a href="javascript:void(0);" onclick="fn_diaryView('+data.exprnRegistNo+')"> <img src="../../../static/images/ico_calendar3.png" alt="일기장"></a></td>';
					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);

				$(":checkbox[name='chk']").on({
					click:function(e){
						if($(this).prop("checked")){
							$(":checkbox[name='chk']").each(function(i,o){
								$(this).prop("checked",false);
							});
							$(this).prop("checked",true);
						}else{
							$(this).prop("checked",false);
						}
					}
				});

			} else {
				$("#dataTbody").append('<tr><td colspan="8">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fnSearchMob(pageIndex){
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndex]").val($("input[name=pageIndexMob]").val());
	$("#searchType").val($("#searchTypeMob").val());
	$("#searchText").val($("#searchTextMob").val());
	$.post('/myPage/expr/diary/selectFrnchsExprnReqstConfmList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.frnchsExprnReqstConfmList;
			var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
			if((parseInt(data.resultCount) % 10) > 0){
				maxPage = maxPage + 1;
			}
			var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')'
			var dataTrMob = "";
			if(!!dataList && dataList.length != 0) {
				dataList.forEach(function(data,idx){
					dataTrMob += '<li>';
					dataTrMob += '<div class="box" style="padding-left: 100px;">';
					dataTrMob += '<p class="check">';
					dataTrMob += '<button class="diary" style="left:25px;" onclick="fn_diaryView('+data.exprnRegistNo+')"></button>';					
					/*dataTrMob += '<input type="checkbox" id="sn_'+idx+'" name="chkRowSnMob" class="hidden notxt" value="'+data.exprnRegistNo+'">';
					dataTrMob += '<label for="sn_'+idx+'"></label>';*/
					dataTrMob += '</p>'
					dataTrMob += '<a href="javascript:fnBrandReqstView('+data.exprnRegistNo+')" class="ul">' 
					dataTrMob += '<div class="numState">';
					dataTrMob += '<span class="no">NO.'+ data.rn + '</span>' + ' ';
					if(data.progrsSttusSeCodeNm == '종료'){
						dataTrMob += '<span class="state active">' + data.progrsSttusSeCodeNm +'</span>'
					}else {
						dataTrMob += '<span class="state">' + data.progrsSttusSeCodeNm +'</span>'
					}
					dataTrMob += '</div>';
					dataTrMob += '<p class="subject" style="width:95%;">' + data.bsnSgnal+' '+data.bhfNm +'</p>';
					dataTrMob += '<p class="nameDate" style="margin-bottom:6px;width:95%">';
					/*dataTrMob += '<span>'+ data.bsnSgnal +'  </span>';
					dataTrMob += '<span>'+ data.bhfAdres +'</span>';*/
					dataTrMob += '<span><strong>체험일 </strong>'+ data.exprnBeginDe+' ~ '+data.exprnEndDe +'</span>';
					dataTrMob += '</p>';
					if(data.fileKey){
						dataTrMob += '<p class="attach active"></p>';
					}else{
						dataTrMob += '<p class="attach"></p>';
					}
/*					if(data.fntnSttusSeCodeNmR == '마감'){
						dataTrMob += '<p class="state active">' + data.fntnSttusSeCodeNmR +'</p>'
					}else{
						dataTrMob += '<p class="state">' + data.fntnSttusSeCodeNmR +'</p>'
					}*/
					dataTrMob += '</a>';
					dataTrMob += '</div>';
					dataTrMob += '</li>';

/*					if(data.fileKey){
						dataTr += '		<a href="'+contextPath+'/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+data.fileKey+'" class="iAttach">첨부파일</a>';
					}else{
						dataTr += '-';
					}*/
				})
				$("#dataTbodyMob").append(dataTrMob);
				$(":checkbox[name='chkRowSnMob']").on({
					click:function(e){
						if($(this).prop("checked")){
							$(":checkbox[name='chkRowSnMob']").each(function(i,o){
								$(this).prop("checked",false);
							});
							$(this).prop("checked",true);
						}else{
							$(this).prop("checked",false);
						}
					}
				});
				
			} else {
				var maxPage = 1;
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/1)'
			}
			$("input[name=pageIndexMobMax]").val(maxPage);
			$("#pagingMob").text(pagingText);
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fnBrandReqstView(exprnRegistNo) {
	$("#reqCrud").val('r');
	$("#exprnRegistNo").val(exprnRegistNo);
	$("#reqForm").attr("action", '/myPage/expr/diary/brandReqstView.do');
	$("#reqForm").submit();
}

function fn_diaryView(exprnRegistNo) {
	$("#exprnRegistNo").val(exprnRegistNo);
	$("#reqForm").attr("action", '/myPage/expr/diary/calendarInfo.do');
	$("#reqForm").submit();
}

