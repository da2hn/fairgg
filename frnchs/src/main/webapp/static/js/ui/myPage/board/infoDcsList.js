var count = 0;
$(document).ready(function() {
	//조회
	fn_selectInfoDcsList(1);
	fn_selectMobInfoDcsList(1);
	
	selectInfoAdminMobLIst();
	
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectInfoDcsList();
	});
	
	$("#schTxtMob").keyup(function(e){
		if(e.keyCode == 13) {
			$("#mSchSeCode").val($("#schSeCodeMob option:selected").val());
			$("#mSchTxt").val($("#schTxtMob").val());
			$("#dataTbodyMob").empty();
			fn_selectMobInfoDcsList();
		}
	});
	
	$("#btn_saveMob").click(function(){
		fn_updateAssignInfoAdminMob("update");
	});
	
	$("#btn_deleteMob").click(function(){
		/* fn_updateAssignInfoAdmin("delete"); */
		if(!fn_updateAssignInfoAdminMob("delete")){
			$("#assignInfoAdminPopupMob").show();
		}
	});
	
	$(".mButton1 > a").click(function(e){
		var btnType = e.target.id;
		if(btnType.indexOf("btnApprove") != -1) {
			btnMotify("CS01");
		} else if(btnType.indexOf("btnCompanion") != -1) {
			btnMotify("CS02");
		} else if(btnType.indexOf("btbAssign") != -1){
			fn_assignInfoAdmin();
		}
	});
	
	$("div.tar > div > button").click(function(e){
		var btnType = e.target.id;
		if(btnType.indexOf("btnMobApprove") != -1){
			btnMobMotify("CS01");
		} else if(btnType.indexOf("btnMobCompanion") != -1){
			btnMobMotify("CS02");
		} else if(btnType.indexOf("btnMobbAssign") != -1){
			fn_assignInfoAdminMob();
			return;
		} else if(btnType.indexOf("btnMobDown") != -1) {
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
			var fileSn = $("input:checkbox[name='chkM']:checked").data("filesn");
			if(fileNo == "0"|| fileSn == "0") {
				alert("등록된 파일이 없습니다.");
				return;
			} 
			location.href = fileDownLink;
		}
	});
	
	$("#btnMobbAssign").click(function(){
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
	});
	
	$("#btnSearch").click(function(){
		fn_selectInfoDcsList(1);
	});
	
	$("#btnMobSearch").click(function(){
		$("#mSchSeCode").val($("#schSeCodeMob option:selected").val());
		$("#mSchTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_selectMobInfoDcsList(1);
	});
	
	//Mob paging
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectMobInfoDcsList(Number($("input[name=pageIndexMob]").val())+1);
		}
	});
});

//승인 반려
function btnMotify(confmSttusCode) {
	var isValid = true;
	var checkedValArr = new Array();
	var confirmTxt = confmSttusCode == "CS01" ? "승인" : "반려";
	$("input:checkbox[name='chk']:checked").each(function(){
		if($(this).data("chrg") == '배정중') {
			alert($(this).data("name")+ "의 담당자를 먼저 배정해주세요.");
			$(this).attr("checked", false);
			isValid = false;
			return false;
		} else if($(this).data("code") == "CS03") {
			alert("정보공개서 관리자가 검토를 진행후 가능합니다.");
			isValid = false;
			return false;
		}
		if(confmSttusCode != $(this).data("code")) {
			checkedValArr.push($(this).val());
		} else {
			alert($(this).data("name")+ "은 이미" + confirmTxt + "되어 있습니다.");
			$(this).attr("checked", false);
			isValid = false;
		}
	});
	
	if(isValid) {
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서를 "+confirmTxt+"하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			params["confmSttusCode"] = confmSttusCode;
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsSttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fn_selectInfoDcsList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	} 
}

//승인 반려 모바일
function btnMobMotify(confmSttusCode) {
	var isValid = true;
	var checkedValArr = new Array();
	var confirmTxt = confmSttusCode == "CS01" ? "승인" : "반려";
	$("input:checkbox[name='chkM']:checked").each(function(){
		if($(this).data("chrg") == '배정중') {
			alert($(this).data("name")+ "의 담당자를 먼저 배정해주세요.");
			$(this).attr("checked", false);
			isValid = false;
			return false;
		} else if($(this).data("code") == "CS03") {
			alert("정보공개서 관리자가 검토를 진행후 가능합니다.");
			isValid = false;
			return false;
		}
		if(confmSttusCode != $(this).data("code")) {
			checkedValArr.push($(this).val());
		} else {
			alert($(this).data("name")+ "은 이미" + confirmTxt + "되어 있습니다.");
			$(this).attr("checked", false);
			isValid = false;
		}
	});
	
	if(isValid) {
		if(checkedValArr.length == 0){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(confirm("선택한 정보공개서를 "+confirmTxt+"하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			params["confmSttusCode"] = confmSttusCode;
			fnGetAjaxData("/myPage/brand/infoDcs/updateInfoDcsSttus.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					$("#dataTbodyMob").empty();
					fn_selectMobInfoDcsList(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	}
}

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
	$("#assignInfoAdminPopup").removeClass('hidden');
	$("#infoDcsRegistNo").val(checkedVal);
	$("#assignInfoAdminPopup").show();
}

function fn_assignInfoAdminMob() {
	var checkedVal = new Array();
	checkedVal = $("input:checkbox[name='chkM']:checked").val();
	var checkCount = $("input:checkbox[name='chkM']:checked").length;
	if(!checkedVal){
		alert("선택된 항목이 없습니다.");
		$("#assignInfoAdminPopupMob").removeClass("active");
		$("#dimmed").removeAttr("class","active");
		return;
	}
	if(checkCount > 1) {
		alert("1개의 항목만 선택해주세요.");
		$("#assignInfoAdminPopupMob").removeClass("active");
		$("#dimmed").removeAttr("class","active");
		return;
	}
	//해당게시글번호 담기
	//히든 인풋 사용하기
//	$("#assignInfoAdminPopup").removeClass('hidden');
	$("#infoDcsRegistNo").val(checkedVal);
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
					dataTr += '<td><span class="mCheckbox notext"><input type="checkbox" data-chrg="'+data.chrgCnstntUserNm+'" data-name="'+data.frnchsNm+'" data-code="'+data.confmSttusCode+'" id="chk'+data.infoDcsRegistNo+'_'+i+'" name="chk" title="선택" value="'+data.infoDcsRegistNo+'"><label for="chk'+data.infoDcsRegistNo+'_'+i+'">선택</label></span></td>';
					dataTr += '<td>'+data.rn+'</td>';
//					dataTr += '<td>'+data.year+'</td>';
					dataTr += '<td>'+data.frnchsNm+'</td>';
					dataTr += '<td>'+data.chargerNm+'<br><p>'+data.telno+'</p></td>';
					dataTr += '<td>'+data.chrgCnstntUserNm+'<br><p>'+data.telno+'</p></td>';
					if(data.confmSttusCodeNm == "승인"){
						dataTr += '<td><span class="txtPrimary">'+data.confmSttusCodeNm+'</span></td>';
					}else{
						dataTr += '<td>'+data.confmSttusCodeNm+'</td>';
					}
					dataTr += '<td>'+data.registDt+'</td>';
					/*if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataTr += '<td><a href="javascript:void(0)">-</a></td>';
					} else {						
						dataTr += '<td><a href="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="ul"><img src="/static/images/ico_attach1.png" width="20" height="10"></a></td>';
					}*/
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


function fn_selectMobInfoDcsList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	$.post("/myPage/board/infoDcs/selectInfoDcsList.ajax",
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
					dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.infoDcsRegistNo+'" data-file="'+data.atchmnflNo+'" data-filesn="'+data.fileSn+'" data-chrg="'+data.chrgCnstntUserNm+'" data-name="'+data.frnchsNm+'" data-code="'+data.confmSttusCode+'" value="'+data.infoDcsRegistNo+'" data-link="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="hidden notxt">';
					dataMobTr += '    <label for="chkM'+data.infoDcsRegistNo+'"></label>';
					dataMobTr += '  </p>';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>';
					if(data.confmSttusCodeNm == "승인"){
						dataMobTr += '<span class="state active">'+ data.confmSttusCodeNm + ' </span>';
					}else{
						dataMobTr += '<span class="state">'+ data.confmSttusCodeNm + ' </span>';
					}
					dataMobTr += '</div>';
//					dataMobTr += '    <p class="type" style="width:95%;"><span>'+data.chargerNm+'</span></p>';
					dataMobTr += '    <p class="subject" style="width:95%;">'+data.frnchsNm+'</p>';
					dataMobTr += '    <p class="nameDate" style="width:95%;">';
					dataMobTr += '      <span><strong>신청자</strong> '+data.chargerNm+'</span>';
					dataMobTr += '      <span><strong>신청일</strong> '+data.registDt+'</span>';
					dataMobTr += '    </p>';
					/*if(data.inputFileNm == null || data.atchmnflNo == 0) {
						dataMobTr += '<p class="attach"></p>';
					} else {						
						dataMobTr += '<p class="attach active"></p>';
					}*/
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

function selectInfoAdminMobLIst() {
	var params = {};
	fnGetAjaxData("/myPage/board/infoDcs/selectInfoAdminList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#dataTbodyMobPopup").empty();
			var dataList = _data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li>';
					dataTr += '	<div class="box" name="chkRowMob">';
					dataTr += '	<input type="hidden" class="thisNo" value="'+data.chrgCnstntUserNo+'">';
					dataTr += '		<div class="brand">';
					dataTr += '			<p class="name">'+data.userNm+'</p>';
					dataTr += '		</div>';
					dataTr += '		<div class="detail">';
					dataTr += '			<dl>';
					dataTr += '				<dt>전화번호</dt>';
					dataTr += '				<dd>'+data.telno+'</dd>';
					dataTr += '			</dl>';
					dataTr += '			<dl>';
					dataTr += '				<dt>이메일</dt>';
					dataTr += '				<dd>'+data.emailAdres+'</dd>';
					dataTr += '			</dl>';
					dataTr += '		</div>';
					dataTr += '	</div>';
					dataTr += '</li>';
				})
				$("#dataTbodyMobPopup").append(dataTr);
			} else {
				$("#dataTbodyMobPopup").append('<li>조회된 내용이 없습니다.</li>');
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}

function fn_updateAssignInfoAdminMob(type) {
	var chrgCnstntUserNo = $("#dataTbodyMobPopup").find(".active").find(".thisNo").attr("value");
	if(!chrgCnstntUserNo) {
		alert("관리자를 선택하세요");
		return false;
	}
	if (confirm(type == "update" ? "배정하시겠습니까?" : "배정취소 하시겠습니까?")) {
		var url = "/myPage/board/infoDcs/updateInfoAdmin.ajax";
		var params = {
				 "infoDcsRegistNo" : $("#infoDcsRegistNo").val()
				,"chrgCnstntUserNo" : type == "update" ? chrgCnstntUserNo : null
				};
		fnGetAjaxData(url, params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(type == "update" ? "배정되었습니다." : "배정취소 되었습니다.");
//				$("input[type=checkbox]").prop("checked",false);
				$("#dataTbodyMobPopup").find(".active").removeClass("active");
				$("#assignInfoAdminPopupMob").hide(selectInfoAdminMobLIst());
				location.href = "/myPage/board/infoDcs/infoDcsList.do";
				return false;
			} else {
				alert(_data.resultMsg);
			}
		});
	}
	count = 0;
}