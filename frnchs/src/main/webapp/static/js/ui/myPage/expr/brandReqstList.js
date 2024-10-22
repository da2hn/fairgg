$(document).ready(function() {

	//조회
	fnSearch();
	fnMobSearch();

	$("#searchText").keyup(function(e){
		if(e.keyCode == 13) {
			fnSearch(1);
		}
	});
	
	$("#searchMobText").keyup(function(e){
		if(e.keyCode == 13) {
			$("#searchType").val($("#mSearchType option:selected").val());
			$("#searchText").val($("#mSearchText").val());
			$("#mDataTbody").empty();
			fnMobSearch(1);
		}
	});
	
	$("#btnCancel").click(function() {
		var checkedValArr = new Array();
		$("input:checkbox[name='chk']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("취소하시겠습니까?")){
			var params = {};
			params["exprnRegistNoArr"] = checkedValArr.join(",");
			fnGetAjaxData("/myPage/expr/brandReqst/updateFrnchsExprnRegistCancl.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fnSearch();
				} else {
					alert(_data.resultMsg);
				}
			});			
		}
	});
	$("#btnMobCancel").click(function() {
		var checkedValArr = new Array();
		$("input:checkbox[name='chkM']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("취소하시겠습니까?")){			
			var params = {};
			params["exprnRegistNoArr"] = checkedValArr.join(",");
			fnGetAjaxData("/myPage/expr/brandReqst/updateFrnchsExprnRegistCancl.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					$("#mDataTbody").empty();
					fnMobSearch();
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	$("#btnSearch").click(function() {
		fnSearch();
	});
	$("#btnMobSearch").click(function() {
		$("#searchType").val($("#mSearchType option:selected").val());
		$("#searchText").val($("#mSearchText").val());
		$("#mDataTbody").empty();
		fnMobSearch(1);
	});
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fnMobSearch(Number($("input[name=pageIndexMob]").val())+1)
		}
	});
});

function fnSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/expr/brandReqst/selectFrnchsExprnRegistList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.frnchsExprnRegistList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<tr>';
					dataTr += '	<td>';
					if(data.confmSttusCode == "CS03"){
						dataTr += '		<span class="mCheckbox notext">';
						dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.exprnRegistNo+'>          ';
						dataTr += '			<label for="chk'+idx+'">선택</label>';
						dataTr += '		</span>';
					}else{
						dataTr += '-';
					}
					dataTr += '	</td>';
					dataTr += '	<td>'+data.rn+'</td>';
					dataTr += '	<td>'+data.mlsfcIndutyNm+'</td>';
					/*dataTr += '	<td>'+data.bsnSgnal+'</td>';*/
					dataTr += '	<td class="tit"><a href="javascript:fnBrandReqstView('+data.exprnRegistNo+')">'+data.bsnSgnal+' '+data.bhfNm+'</a></td>';
					dataTr += '	<td>'+data.bhfAdres+'</td>';
					if(data.confmSttusCodeNm == "신청"){
						dataTr += '	<td><span class="txtPrimary">'+data.confmSttusCodeNm+'</span></td>';
					}else{
						dataTr += '	<td>'+data.confmSttusCodeNm+'</td>';
					}
					dataTr += '	<td>'+data.registDt+'</td>';
					/*dataTr += '	<td><a href="javascript:fnBrandInfoView(\''+data.frnchsNo+'\',\''+data.mlsfcIndutyCode+'\')" class="mBtn1 m lPrimary" style="font-size:12px">상세보기</a></td>';*/
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

function fnMobSearch(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/expr/brandReqst/selectFrnchsExprnRegistList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.frnchsExprnRegistList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li>';
					dataTr += '<div class="box">';
					dataTr += '  <p class="check">';
						if(data.confmSttusCode == "CS03"){
							dataTr += '  <input type="checkbox" name="chkM" id="chkM'+data.exprnRegistNo+'" value="'+data.exprnRegistNo+'" class="hidden notxt">';
							dataTr += '  <label for="chkM'+data.exprnRegistNo+'"></label>';
						}
					dataTr += '	 </p>';
					dataTr += '  <a href="javascript:fnBrandReqstView('+data.exprnRegistNo+')" >';
					dataTr += '<div class="numState">';
					dataTr += '<span class="no">NO.'+ data.rn + ' </span>' + ' ';
					if(data.confmSttusCodeNm == "신청"){
						dataTr += '<span class="state active">'+data.confmSttusCodeNm+'</span>';
					}else {
						dataTr += '<span class="state">'+data.confmSttusCodeNm+'</span>';
					}
					dataTr += '</div>';
					/*dataTr += '    <p class="type" style="width:90%;"><span>'+data.mlsfcIndutyNm+' - '+data.bsnSgnal+'</span></p>';*/
					dataTr += '    <p class="subject">'+data.bsnSgnal+' '+data.bhfNm+'</p>';
					dataTr += '    <p class="nameDate">';
					dataTr += '      <span><strong>업종</strong> '+data.mlsfcIndutyNm+'</span>';
					dataTr += '      <span><strong>신청일자</strong> '+data.registDt+'</span>';
					dataTr += '    </p>';
					/*dataTr += '<p class="reply">'+data.confmSttusCodeNm+'</p>';*/
					dataTr += '  </a>';
					dataTr += '</div>';
					dataTr += '</li>';
				})
				$("#mDataTbody").append(dataTr);
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
	$("#package").val('brandReqst');
	$("#exprnRegistNo").val(exprnRegistNo);
	$("#reqForm").attr("action", '/myPage/expr/brandReqst/brandReqstView.do');
	$("#reqForm").submit();
}

function fnBrandInfoView(pNo, indutyCd){
	alert("준비중입니다.");
}