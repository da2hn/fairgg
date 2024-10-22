var count = 0;
$(document).ready(function() {
	//조회
	fnSearch();
	fnMobSearch();

	$("#btnSearch").click(function() {
		fnSearch();
	});
	$("#btnMobSearch").click(function() {
		$("#searchType").val($("#mSearchType option:selected").val());
		$("#searchText").val($("#mSearchText").val());
		$("#mDataTbody").empty();
		fnMobSearch();
	});
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fnMobSearch(Number($("input[name=pageIndexMob]").val())+1)
		}
	});
	
	/*$(".diary type2").click(function(){
		count = 0;
		$(".box").unbind();
		$(".box").click(function(e){
			if(count > 1){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					count--;
				}
			}
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				count--;
			}else{
				$(this).addClass("active");
				count++;
			}
		});
	});
	$("#PopupMobClose").click(function(){
		$(".box").removeClass("active");
		count = 0;
	});*/
});

function fnSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/expr/exprManage/selectFrnchsExprnRegistManageList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.frnchsExprnRegistManageList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '<td>';
					dataTr += '		<span class="mCheckbox notext">';
					dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.frnchsNo+'>          ';
					dataTr += '			<label for="chk'+idx+'">선택</label>';
					dataTr += '		</span>';
					dataTr += '</td>';
					dataTr += '	<td>'+data.rn+'</td>';
					dataTr += '	<td class="tit"><a href="javascript:fnBrandReqstView('+data.exprnRegistNo+')">'+data.bsnSgnal+' '+data.bhfNm+'</a></td>';
					dataTr += '	<td>'+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</td>';
					dataTr += '	<td>'+data.rcritNmpr+'명</td>';
					/*dataTr += '	<td>'+data.reqstConfmCnt+"/"+data.reqstCnt+'</td>';*/
					dataTr += '	<td>'+data.emplyCo+'명</td>';
					if(data.confmSttusCode == "CS05"){//마감
						dataTr += '	<td>사업종료</td>'; 
						/*dataTr += '	<td>'+data.confmSttusCodeNm+'</td>'; */
					}else{
						if(data.progrsSttusSeCodeNm == '진행중'){
							dataTr += '	<td><span class="txtPrimary">모집중</span></td>';
						}else if(data.progrsSttusSeCodeNm == '종료'){
							dataTr += '	<td>모집완료</td>';
						}
						/*dataTr += '	<td>'+data.progrsSttusSeCodeNm+'</td>';*/
					}
					dataTr += '	<td>';
					if(data.reqstConfmCnt < data.rcritNmpr){//승인 && 진행중 < 모집인원 
                        dataTr += '		<a href="javascript:fn_exprRcrit(\''+data.exprnRegistNo+'\',\''+data.rcritNmpr+'\')"  class="ul">모집현황</a>';//exprnRegistNo
					}else{
						dataTr += '		<a href="javascript:fnNextView(1,'+data.exprnRegistNo+')"><img src="../../../static/images/ico_calendar3.png" alt="일기장"></a>';
					}
					dataTr += '	</td>';
					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="7">조회된 내용이 없습니다.</td></tr>');
			}
			$("#mListPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}
function fnMobSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/expr/exprManage/selectFrnchsExprnRegistManageList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.frnchsExprnRegistManageList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li>';
					dataTr += '<div class="box" style="padding-left: 100px;">';
					dataTr += '  <p class="check">';
					dataTr += '  <input type="checkbox" name="chkM" id="chkM'+data.exprnRegistNo+'" value="'+data.exprnRegistNo+'" class="hidden notxt">';
					dataTr += '  <label for="chkM'+data.exprnRegistNo+'"></label>';
					dataTr += '	 </p>';
					/*dataTr += '  <p class="check" onclick="javascript:fnBrandReqstView('+data.exprnRegistNo+')">'+data.rn;
					dataTr += '	 </p>';*/
//					dataTr += '  <a href="javascript:fnBrandReqstView('+data.exprnRegistNo+')" >';
					if(data.reqstConfmCnt < data.rcritNmpr){
						dataTr += '<button class="diary type2" style="left:30px;" onclick="toggle_dimmed_view(\'layer_recruit_mo\');">모집<br>현황</button>';
                       /* dataTr += '		<a href="javascript:fnMoExprRcrit(\''+data.exprnRegistNo+'\',\''+data.rcritNmpr+'\')" onclick="toggle_dimmed_view(\'layer_qnaDetail_0\')">';*/
						dataTr += '		<a href="javascript:fnBrandReqstView(\''+data.exprnRegistNo+'\',\''+data.rcritNmpr+'\')">'
                    }else{
                    	dataTr += '<button class="diary" style="left:30;" onclick="fnNextView(1,'+data.exprnRegistNo+')">체험일기</button>';
						dataTr += '		<a href="javascript:fnNextView(1,'+data.exprnRegistNo+')">';
					}
                    
					dataTr += '<div class="numState">';
					dataTr += '<span class="no">NO.'+ data.exprnRegistNo + ' </span>';
					if(data.confmSttusCode == "CS05"){
						dataTr += '<span class="state active">'+data.confmSttusCodeNm+'</span>';
					}else{
						dataTr += '<span class="state">'+data.progrsSttusSeCodeNm+'</span>';
					}
					dataTr += '</div>';
					dataTr += '    <p class="subject">'+data.bsnSgnal+' '+data.bhfNm+'</p>';
					/*dataTr += '    <p class="type" style="width:90%;"><span>'+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</span></p>';*/
					dataTr += '    <p class="nameDate">';
					dataTr += '      <span><strong>체험기간</strong> '+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</span>';
					dataTr += '      <span><strong>모집인원</strong> '+data.rcritNmpr+'명</span>';
					/*dataTr += '      <span><strong>승인/지원</strong> '+data.reqstConfmCnt+'/'+data.reqstCnt+'</span>';*/
					dataTr += '      <span><strong>종업원수</strong> '+data.emplyCo+'명</span>';
					/*if(data.confmSttusCode == "CS05"){
						dataTr += '<p class="reply">'+data.confmSttusCodeNm+'</p>';
					}else{
						dataTr += '<p class="reply">'+data.progrsSttusSeCodeNm+'</p>';
					}*/
					dataTr += '    </p>';
					dataTr += '  </a>';
					dataTr += '</div>';
					dataTr += '</li>';
				})
				$("#mDataTbody").append(dataTr);
				
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
				
				$("#btnMobDetail").click(function(){
					var checkedVal = $("input:checkbox[name='chkM']:checked").val();
					var checkCount = $("input:checkbox[name='chkM']:checked").length;
					if(!checkedVal){
						alert("선택된 항목이 없습니다.");
						return;
					}
					if(checkCount > 1) {
						alert("1개의 항목만 선택해주세요.");
						return;
					}
					toggle_dimmed_view('layer_recruit_mo');
					fnMoExprRcrit(checkedVal, data.rcritNmpr);
				});
				
			} else {
				$("#mDataTbody").html('<p class="empty tac">조회된 내용이 없습니다.</p>');
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

function fnBrandReqstView(exprnRegistNo) {
	$("#reqCrud").val('r');
	$("#package").val('exprManage');
	$("#exprnRegistNo").val(exprnRegistNo);
	$("#reqForm").attr("action", '/myPage/expr/brandReqst/brandReqstView.do');
	$("#reqForm").submit();
}

function fnNextView(type, exprnRegistNo){

	var pageUrl = "";
	if(type == 1){
		pageUrl = "/myPage/expr/exprManage/calendarInfoMng.do";
	}else if(type == 2){
		pageUrl = "/myPage/expr/exprManage/exprRcritList.do";
	}

	var newForm = $('<form></form>');
	newForm.attr("name", "pageForm");
	newForm.attr("method", "post");
//	newForm.attr("action", "/myPage/expr/diary/calendarInfo.do");
	newForm.attr("action", pageUrl);

	newForm.append($("<input/>",{type:"hidden", name:"exprnRegistNo", value:exprnRegistNo}));
	newForm.appendTo("body");
	newForm.submit();
}

//모집현황 팝업
function fn_exprRcrit(exprnRegistNo,rcritNmpr) {
	$("#exprRcritPopup").removeClass('hidden');
	//히든 인풋 사용하기
	$("#pExprnRegistNo").val(exprnRegistNo);
	$("#rcritNmpr").val(rcritNmpr);
	$("#exprRcritPopup").show();
    $("#moExprRcritPopup").show();
	fnRcritSrh();
	fnMoRcritSrh();
}

function fnMoExprRcrit(exprnRegistNo,rcritNmpr){
	$("#pExprnRegistNo").val(exprnRegistNo);
	$("#rcritNmpr").val(rcritNmpr);
	/*$("#moExprRcritPopup").show();*/
	$("#exprRcritPopup").show();
	fnMoRcritSrh();
	fnRcritSrh();
	
}

function fnMoRcritSrh(){
	var params = {};
	approveCnt = 0;
	params["exprnRegistNo"] = $("#pExprnRegistNo").val();
	$.post('/myPage/expr/exprManage/selectExprRcritList.ajax',params)
	.done(function(data) {
		
		if(data.resultCode == 'success'){
			$("#moRcritDataTbody").empty();
			$("#btnApproveMob").show();
			$("#btnCloseMob").attr("style", "width:47%;");
			$("#moPopPaging").html("")
			var dataList = data.exprRcritList;
			
			if(!!dataList && dataList.length != 0) {
				
				var dataTrMob = "";
				dataList.forEach(function(data,idx){
					if(data.confmSttusCode == "CS01"){
						approveCnt++;
					}
					dataTrMob += '<li>';
					dataTrMob += '<div class="box">';
					dataTrMob += '  <p class="check">';
						if(data.confmSttusCode == "CS04"){
							dataTrMob += '  <input type="checkbox" name="chkM" id="chkM'+idx+'" value="'+data.exprnReqstNo+'" class="hidden notxt">';
							dataTrMob += '  <label for="chkM'+idx+'"></label>';
						}
						dataTrMob += '	 </p>';
						
					dataTrMob += '</br><p class="subject">'
					dataTrMob += '<span class="no">'+ data.userNm + ' </span>';	
					dataTrMob += '</p>'
						
					dataTrMob += '<p class="subject">';
					
					if(data.confmSttusCode == "CS04"){
						dataTrMob += '	<span>기관관리자 승인 완료 '+data.updtDt+'</span>';
					}else if(data.confmSttusCode == "CS01"){
						dataTrMob += '	<span>승인 완료 '+data.confmDt+'</span>';
					}else{
						dataTrMob += ' <span>검토중</span>';
					}
					
					dataTrMob += '</p>';
					dataTrMob += '<p class="nameDate">';
					dataTrMob += '<span><strong>전화번호 </strong>' + data.telno + '</span>';
					dataTrMob += '<span><strong> 이메일 </strong>' + data.emailAdres + '</span>';
					dataTrMob += '</br><span><strong> 신청일 </strong>' + data.registDt + '</span>';
					dataTrMob += '</p class="nameDate">';
					dataTrMob += '</br>';
					dataTrMob += '</li>';
					
				});
				$("#moRcritDataTbody").append(dataTrMob);
			}else{
				$("#btnApproveMob").hide();
				$("#btnCloseMob").css("position", "absolute");
				$("#btnCloseMob").css("left", "50%");
				$("#btnCloseMob").css("transform", "translateX(-50%)");
				$("#moRcritDataTbody").append('<li><div class="box" style="padding-right:30px; text-align:center;"></br></br></br><span style="display:inline-block;">조회된 내용이 없습니다.</span></br></br></br></br></br></div></li>');
			}
			$("#moPopPaging").html(data.pagingHtml).trigger("create");
				
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}