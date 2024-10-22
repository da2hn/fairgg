$(document).ready(function() {
	//조회
	fn_selectInfoDcsInfoList(1);
	fn_selectMobInfoDcsInfoList(1);
	
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectInfoDcsInfoList();
	});
	
	$("#schTxtMob").keyup(function(e){
		if(e.keyCode == 13) {
			$("#mSchSeCode").val($("#schSeCodeMob option:selected").val());
			$("#mSchTxt").val($("#schTxtMob").val());
			$("#dataTbodyMob").empty();
			fn_selectMobInfoDcsInfoList();
		}
	});
	
	//신청
	$("#btnApply").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chk']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서를 신청하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			params["confmSttusCode"] = "CS03";
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsSttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fn_selectInfoDcsInfoList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	$("#btnMobApply").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chkM']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서를 신청하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			params["confmSttusCode"] = "CS03";
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsSttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					$("#dataTbodyMob").empty();
					fn_selectMobInfoDcsInfoList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	//삭제
	$("#btnDelete").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chk']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서 파일을 삭제하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsInfoDelete.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fn_selectInfoDcsInfoList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	$("#btnMobDelete").click(function(){
		var checkedValArr = new Array();
		$("input:checkbox[name='chkM']:checked").each(function(){
			checkedValArr.push($(this).val());
		});
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서 파일을 삭제하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsInfoDelete.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					$("#dataTbodyMob").empty();
					fn_selectMobInfoDcsInfoList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	//등록
	$("#btnEnroll,#btnMobEnroll").click(function(){
		location.href = "/myPage/board/infoDcsInfo/infoDcsEnrol.do";
	});
	
	$("#btnSearch").click(function(){
		fn_selectInfoDcsInfoList(1);
	});
	$("#btnMobSearch").click(function(){
		$("#mSchSeCode").val($("#schSeCodeMob option:selected").val());
		$("#mSchTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_selectMobInfoDcsInfoList(1);
	});
	
	$("#btnMobDown").click(function(){
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
		var fileDownLink = $("input:checkbox[name='chkM']:checked").data('link');
		var fileNo = $("input:checkbox[name='chkM']:checked").data("file");
		if(fileNo == 0) {
			alert("등록된 파일이 없습니다.");
			return;
		} 
		location.href = fileDownLink;
	});
	
	//Mob paging
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectMobInfoDcsInfoList(Number($("input[name=pageIndexMob]").val())+1);
		}
	});
});

//등록화면 이동
function fn_goInfoDcsEnroll(obj) {
	$("#infoDcsRegistNo").val(obj);
	$("#reqForm").attr("action", '/myPage/board/infoDcsInfo/infoDcsEnrol.do');
	$("#reqForm").submit();
}


//목록 조회
function fn_selectInfoDcsInfoList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/board/infoDcs/selectInfoDcsInfoList.ajax',$("#searchForm").serialize()
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
//					dataTr += '<td>'+data.year+'</td>';
					dataTr += '<td>'+data.lclasIndutyNm+'</td>';
					dataTr += '<td>'+data.mlsfcIndutyNm+'</td>';
					dataTr += '<td><a href="javascript:void(0)" onclick="fn_goInfoDcsEnroll('+data.infoDcsRegistNo+');">'+data.frnchsNm+'</a></td>';
					if(data.confmSttusCodeNm == "승인"){
						dataTr += '<td><span class="txtPrimary">'+data.confmSttusCodeNm+'</span></td>';
					}else{
						dataTr += '<td>'+data.confmSttusCodeNm+'</td>';
					}
					dataTr += '<td>'+data.registDt+'</td>';
					if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataTr += '<td><a href="javascript:void(0)">-</a></td>';
					} else {						
						dataTr += '<td><a href="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="ul"><img src="/static/images/ico_attach1.png" width="20" height="10"></a></td>';
					}
					dataTr += '</tr>';
					$("#dataTbody").append(dataTr);
				})
			} else {
				$("#dataTbody").append('<tr><td colspan="8">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
};

function fn_selectMobInfoDcsInfoList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	$.post("/myPage/board/infoDcs/selectInfoDcsInfoList.ajax",
		$("#searchMobForm").serialize()
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
					dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.infoDcsRegistNo+'" value="'+data.infoDcsRegistNo+'" data-file="'+data.atchmnflNo+'" data-link="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="hidden notxt">';
					dataMobTr += '    <label for="chkM'+data.infoDcsRegistNo+'"></label>';
					dataMobTr += '  </p>';
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_goInfoDcsEnroll('+data.infoDcsRegistNo+')" style="padding:0px 0px 0px 0px">';
					dataMobTr += '<div class="numState" >';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>' + ' ';
					if(data.confmSttusCodeNm == "승인"){
						dataMobTr += '<span class="state active">'+ data.confmSttusCodeNm + ' </span>';
					}else{
						dataMobTr += '<span class="state">'+ data.confmSttusCodeNm + ' </span>';
					}
					dataMobTr += '</div>';
//					dataMobTr += '	  <p class="type" style="width:95%;"><span>'+data.lclasIndutyNm+'</span>-<span>'+data.mlsfcIndutyNm+'</span></p>';
					dataMobTr += '    <p class="subject" style="width:95%;">'+data.frnchsNm+'</p>';
					dataMobTr += '    <p class="nameDate" style="width:95%;">';
					dataMobTr += '      <span><strong>업종 </strong></span><span>'+data.lclasIndutyNm+'-'+data.mlsfcIndutyNm+'</span>';
					dataMobTr += '      <span><strong>승인일 </strong>'+data.registDt+'</span>';
					dataMobTr += '    </p>';
					if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataMobTr += '<p class="attach"></p>';
					} else {						
						dataMobTr += '<p class="attach active"></p>';
					}
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
