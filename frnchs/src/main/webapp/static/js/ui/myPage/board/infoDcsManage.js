$(document).ready(function() {
	//조회
	fn_selectInfoDcsList(1);
	fn_selectMobInfoDcsList(1);
	
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectInfoDcsList();
	});
	
	$("#searchMobText").keyup(function(e){
		if(e.keyCode == 13) {
			$("#mSearchType").val($("#searchMobType option:selected").val());
			$("#mSearchText").val($("#searchMobText").val());
			$("#dataTbodyMob").empty();
			fn_selectMobInfoDcsList(1);
		}
	});
	
	$("#btnMobSearch").click(function() {
		$("#mSearchType").val($("#searchMobType option:selected").val());
		$("#mSearchText").val($("#searchMobText").val());
		$("#dataTbodyMob").empty();
		fn_selectMobInfoDcsList(1);
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_mobSearch(Number($("input[name=pageIndexMob]").val())+1)
		}
	});
	
	//승인
	$("#btnApprove").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chk']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서를 검토완료하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			params["confmSttusCode"] = "CS04";
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsSttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fn_selectInfoDcsList();
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	$("#btnApproveMob").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chkM']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서를 검토완료하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			params["confmSttusCode"] = "CS04";
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsSttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fn_selectInfoDcsList();
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	//반려
	$("#btnCompanion").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chk']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서를 반려하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			params["confmSttusCode"] = "CS02";
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsSttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fn_selectInfoDcsList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	$("#btnSearch").click(function(){
		fn_selectInfoDcsList(1);
	});
});


//정보공개서 담당자(관리자)배정
function fn_assignInfoAdmin() {
	var checkedVal = new Array();
	checkedVal = $("input:checkbox[name='chk']:checked").val();
	var checkCount = $("input:checkbox[name='chk']:checked").length;
	if(!checkedVal){
		alert("선택된 항목이 없습니다.");
		return;
	}
	if(checkCount > 1) {
		alert("1개의 항목만 선택해주세요.");
		return;
	}
	//해당게시글번호 담기
	//히든 인풋 사용하기
	$("#infoDcsRegistNo").val(checkedVal);
	$("#assignInfoAdminPopup").show();
}


//목록 조회
function fn_selectInfoDcsList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/board/infoDcs/selectInfoDcsList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				
				dataList.forEach(function(data,idx){
					var dataTr = "";
					dataTr += '<tr>';
					dataTr += '<td><span class="mCheckbox notext"><input type="checkbox" id="chk'+data.infoDcsRegistNo+'_'+i+'" name="chk" title="선택" value="'+data.infoDcsRegistNo+'"><label for="chk'+data.infoDcsRegistNo+'_'+i+'">선택</label></span></td>';
					dataTr += '<td>'+data.rn+'</td>';
					dataTr += '<td>'+data.frnchsNm+'</td>';
					dataTr += '<td>'+data.chargerNm+'</td>';
//					dataTr += '<td>'+data.chrgCnstntUserNm+'</td>';
//					dataTr += '<td>'+data.emailAdres+'</td>';
					dataTr += '<td>'+data.emailAdres+'<br>'+data.telno+'</td>';
					if(data.confmSttusCodeNm == "신청"){
						dataTr += '<td><span class="txtPrimary">'+data.confmSttusCodeNm+'</span></td>';
					}else{
						dataTr += '<td><span>'+data.confmSttusCodeNm+'</span></td>';
					}
//					dataTr += '<td>'+data.registDt+'</td>';
					if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataTr += '<td><a href="javascript:void(0)">-</a></td>';
					} else {						
						dataTr += '<td><a href="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="ul"><img src="/static/images/ico_attach1.png" width="20" height="10"></a></td>';
					}
					dataTr += '</tr>';
					$("#dataTbody").append(dataTr);
				})
			} else {
				$("#dataTbody").append('<tr><td colspan="7">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
};


//모바일 목록 조회
function fn_selectMobInfoDcsList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/myPage/board/infoDcs/selectInfoDcsList.ajax',$("#searchMobForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){
					dataMobTr += '<li>';
					dataMobTr += '<div class="box" style="padding:16px 16px 16px 30px">';
					dataMobTr += '  <p class="check">';
					dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.infoDcsRegistNo+'" value="'+data.infoDcsRegistNo+'" class="hidden notxt">';
					dataMobTr += '    <label for="chkM'+data.infoDcsRegistNo+'"></label>';
					dataMobTr += '  </p>';
					/*dataMobTr += '  <a>';*/
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>' + ' ';
					if(data.confmSttusCodeNm == "신청"){
					dataMobTr += '<span class="state active">'+ data.confmSttusCodeNm + ' </span>';
					}else{
						dataMobTr += '<span class="state">'+ data.confmSttusCodeNm + ' </span>';
					}
					dataMobTr += '</div>';
					dataMobTr += '    <p class="subject" style="width:95%">'+data.frnchsNm+'</p>';
					dataMobTr += '    <p class="nameDate" style="width:95%">';
					dataMobTr += '      <span><strong>신청자</strong> '+data.chargerNm+'</span>';
				//	if(data.emailAdres != "-"){
					dataMobTr += '      <span><strong>이메일</strong> '+data.emailAdres+'</span>';
				//	}
			    //		if(data.telno != "-"){
					dataMobTr += '      <span><strong>연락처</strong> '+data.telno+'</span>';
			    //	}
					dataMobTr += '    </p>';
					/*dataMobTr += '<p class="reply">'+data.confmSttusCodeNm+'</p>';*/
					if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataMobTr += '<p class="attach"></p>';
					} else {						
						dataMobTr += '<p class="attach active"></p>';
					}
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

