/*
 * 점포 관리 확인 - 기관관리자
*/
var count = 0;
$(document).ready(function() {
	fn_mobSelectTradeList(1);
	fn_selectTradeList(1);
	selectConsultantMobList();
	
	$("#btn_saveMob").click(function(){
		fn_updateAssignConsultantMob('등록');
	});
	$("#btn_companionMob").click(function(){
		fn_updateAssignConsultantMob('반려');//배정취소
	});
	
	$("#btn_apprConfm").click(function() {
		fn_updateSttus('apprConfm');
	});

	$("#btn_apprReturn").click(function() {
		fn_updateSttus('apprReturn');
	});
	
	$("#btn_apprDelete").click(function() {
		fn_updateSttus('apprDelete');
	});
	
	//나중에 합치자....일단 추가추가
	$("#btn_apprMobConfm").click(function() {
		fn_updateSttusMob('apprConfm');
	});

	$("#btn_apprMobReturn").click(function() {
		fn_updateSttusMob('apprReturn');
	});
	
	$("#btn_apprMobDelete").click(function() {
		fn_updateSttusMob('apprDelete');
	});
	
	$("#btn_apprMobAssign").click(function() {
		var checkedVal = new Array();
		checkedVal = $("input:checkbox[name='chkM']:checked").val();
		var checkCount = $("input:checkbox[name='chkM']:checked").length;
		if(!checkedVal){
			alert("선택된 항목이 없습니다.");
//			$("#dataTbodyMobPopup").removeClass("active");
			return;
		}
		if(checkCount > 1) {
			alert("1개의 항목만 선택해주세요.");
			return;
		}
		toggle_dimmed_view('layer_appoint_mo');
		selectConsultantMobList();
		fn_assignCnsltMob(checkedVal);
		
		count = 0;
		$(".box").unbind();
		$(".box").click(function(e){
			if(count > 0){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					count--;
				}
			}else {
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					count--;
				}else{
					$(this).addClass("active");
					count++;
				}
				
			}
			
		});
		
	});
	
	$("#PopupMobClose").click(function(){
		$(".box").removeClass("active");
		count = 0;
	});
	
	//컨설턴트 배정하기
	$("#btn_apprAssign").click(function() {
		var checkedVal = new Array();
		checkedVal = $("input:checkbox[name='chkRowSn']:checked").val();
		var checkCount = $("input:checkbox[name='chkRowSn']:checked").length;
		if(!checkedVal){
			alert("선택된 항목이 없습니다.");
			return;
		}
		if(checkCount > 1) {
			alert("1개의 항목만 선택해주세요.");
			return;
		}
		fn_assignCnslt(checkedVal);
	});

	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectTradeList();
	});

	$("#btnSearch").click(function() {
		fn_selectTradeList(1);
	});
	
	$("#btnMobSearch").click(function() {
		$("#mSchSeCode").val($("#schSeCodeMob option:selected").val());
		$("#mSchTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_mobSelectTradeList(1);
	});
	
	//Mob paging
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_mobSelectTradeList(Number($("input[name=pageIndexMob]").val())+1);
		}
	});
});

function fn_selectTradeList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);

	$.post('/myPage/board/trade/selectTradeList.ajax',$("#searchForm").serialize()
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
//					if(data.confmSttusCode != 'CS04') {//검토중
						dataTr += '<input type="checkbox" id="sn_'+data.trdeThingRegistNo+'" name="chkRowSn" title="선택" value="'+data.trdeThingRegistNo+'">';
						dataTr += '<label for="sn_'+data.trdeThingRegistNo+'">선택</label>';
//					} else {
//						dataTr += '-';
//					}
					dataTr += '</span>';
					dataTr += '</td>';
					dataTr += '<td>'+data.rn+'</td>';
					dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_tradeReview('+data.trdeThingRegistNo+')" class="ul"> '+data.sj+' </a></td>';
					dataTr += '<td>'+data.sopsrtStleCodeNm+'</td>';
					if(data.userNm == null){
						data.userNm = "-";
					}
					dataTr += '<td>'+data.userNm+'<br>('+fnNumberPhoneFormat(data.telno)+')'+'</td>';
					if(data.chrgCnstntUserTelno == null){
						data.chrgCnstntUserTelno = "-";
					}
					//배정 날짜가 null 경우 "-"처리
					var confmDt = data.confmDt == null ? '-' : data.confmDt;
					if(data.chrgCnstntUserNo == null) {
						dataTr += '<td><a href="javascript:void(0);" onclick="fn_assignCnslt('+data.trdeThingRegistNo+')">배정중</a></td>';
						//dataTr += '<td><a href="javascript:void(0);" onclick="fn_assignCnslt('+data.trdeThingRegistNo+')" class="mBtn1">컨설턴트배정</a></td>';
					} else if(data.confmSttusCode == 'CS03') {//신청
						dataTr += '<td>'+data.chrgCnstntUserNm+'<br>('+fnNumberPhoneFormat(data.chrgCnstntUserTelno)+')'+'</td>';
					} else if(data.confmSttusCode == 'CS04') {//검토중
						dataTr += '<td>'+data.chrgCnstntUserNm+'<br>('+fnNumberPhoneFormat(data.chrgCnstntUserTelno)+')'+'<br>('+confmDt+')'+'</td>';
					} else if(data.confmSttusCode == 'CS02') {//반려
						dataTr += '<td>'+data.chrgCnstntUserNm+'<br>('+fnNumberPhoneFormat(data.chrgCnstntUserTelno)+')'+'<br>('+confmDt+')'+'</td>';
					} else if(data.confmSttusCode == 'CS01') {//승인
						dataTr += '<td>'+data.chrgCnstntUserNm+'<br>('+fnNumberPhoneFormat(data.chrgCnstntUserTelno)+')'+'<br>('+confmDt+')'+'</td>';
					} else if(data.confmSttusCode == 'CS07') {
						dataTr += '<td>-</td>';
					} else {

					}
					
					if(data.confmSttusCode != 'CS04') {//검토중
						if(data.confmSttusCode == 'CS01'){
							dataTr += '<td><span class="txtPrimary">'+data.confmSttusCodeNm+'</span></td>';
						}else{
							dataTr += '<td>'+data.confmSttusCodeNm+'</td>';
						}
					} else {
						dataTr += '<td>-</td>';
					}
					
					dataTr += '<td>'+data.updtDt+'</td>';

					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="8">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			alert(data.resultMsg);
		}
	});
}


function fn_mobSelectTradeList(pageIndex){
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndex]").val($("input[name=pageIndexMob]").val());
	$.post("/myPage/board/trade/selectTradeList.ajax",
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
					if(data.userNm == null){
						data.userNm = "-";
					}
					dataMobTr += '<li>';
					dataMobTr += '<div class="box">';
					if(data.confmSttusCode != 'CS04') {//검토중
						dataMobTr += '  <p class="check">';
						dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.trdeThingRegistNo+'" value="'+data.trdeThingRegistNo+'" class="hidden notxt">';
						dataMobTr += '    <label for="chkM'+data.trdeThingRegistNo+'"></label>';
						dataMobTr += '  </p>';
					} else {
						dataMobTr += '  <p class="check">-</p>';
					}
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_tradeReview('+data.trdeThingRegistNo+')">';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>' + ' ';
					if(data.confmSttusCode != 'CS04') {//검토중
						if(data.confmSttusCodeNm == '승인'){
							dataMobTr += '<span class="state active">'+data.confmSttusCodeNm+'</span>';
						}else{
							dataMobTr += '<span class="state">'+data.confmSttusCodeNm+'</span>';
						}
					} else {
//						dataMobTr += '<span>-</span>';
					}
					dataMobTr += '</div>';
					/*dataMobTr += '    <p class="type"><span>'+data.sopsrtStleCodeNm+'</span></p>';*/
					/*dataMobTr += '<p><span>'+data.userNm+'('+fnNumberPhoneFormat(data.telno)+')'+'</span></p>';*/
					dataMobTr += '    <p class="subject">'+data.sj+'</p>';
					dataMobTr += '    <p class="nameDate">';
					
					//배정 날짜가 null 경우 "-"처리
					var confmDt = data.confmDt == null ? '-' : data.confmDt;
					if(data.chrgCnstntUserNo == null) {
						dataMobTr += '<span><strong>접수자(컨설턴트) </strong>배정중</span>';
						//dataTr += '<td><a href="javascript:void(0);" onclick="fn_assignCnslt('+data.trdeThingRegistNo+')" class="mBtn1">컨설턴트배정</a></td>';
					} else if(data.confmSttusCode == 'CS03') {//신청
						dataMobTr += '<span><strong>접수자(컨설턴트)</strong>'+data.chrgCnstntUserNm+' ('+fnNumberPhoneFormat(data.chrgCnstntUserTelno)+')'+'</span>';
					} else if(data.confmSttusCode == 'CS04') {//검토중
						dataMobTr += '<span><strong>접수자(컨설턴트) </strong>'+''+data.chrgCnstntUserNm+'('+fnNumberPhoneFormat(data.chrgCnstntUserTelno)+')'+'('+confmDt+')'+'</span>';
					} else if(data.confmSttusCode == 'CS02') {//반려
						dataMobTr += '<span><strong>접수자(컨설턴트) </strong>'+''+data.chrgCnstntUserNm+'('+fnNumberPhoneFormat(data.chrgCnstntUserTelno)+')'+' ('+confmDt+')'+'</span>';
					} else if(data.confmSttusCode == 'CS01') {//승인
						dataMobTr += '<span><strong>접수자(컨설턴트) </strong>'+''+data.chrgCnstntUserNm+'('+fnNumberPhoneFormat(data.chrgCnstntUserTelno)+')'+' ('+confmDt+')'+'</span>';
					} else if(data.confmSttusCode == 'CS07') {
						dataMobTr += '<span><strong>접수자(컨설턴트) </strong>-</span>';
					} else {

					}
					dataMobTr += '      <span><strong>신청일</strong> '+data.registDt+'</span>';
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

function fn_assignCnslt(obj) {//컨설턴트배정 팝업
	$("#trdeThingRegistNo").val(obj);
	fnGetAjaxData("/board/trade/selectTrade.ajax", {trdeThingRegistNo : $("#trdeThingRegistNo").val()}, function(_data) {
		var tradeBbs = _data.tradeBbs;
		if(_data.resultCode == RESULT_SUCCESS){
			$("#chrgCnstntUserNm").val(tradeBbs.chargerNm);
			$("#chrgCnstntUserNo").val(tradeBbs.chrgCnstntUserNo);
			
			if(!$("#chrgCnstntUserNo").val()){//컨설턴트 배정x
				$("#btn_save").css("display", "inline-block");
				$('#dataTbodyPopup tr').show();
			}else{
				$("#btn_save").css("display", "none");
				$('#dataTbodyPopup tr').hide();
				$('#dataTbodyPopup').find('tr td span input').each(function(){
					if($(this).val() == $("#chrgCnstntUserNo").val()){
						$(this).parent().parent().parent().show();
						$(this).prop("checked", true);
					}
				});
			}
		} else {
			alert(_data.resultMsg);
		}
	});
	$("#assignCnsltPopup").show();
	$("#assignCnsltPopup").removeClass("hidden");
}

function fn_assignCnsltMob(obj) {//컨설턴트배정 모바일 팝업
	$("#trdeThingRegistNo").val(obj);
	fnGetAjaxData("/board/trade/selectTrade.ajax", {trdeThingRegistNo : $("#trdeThingRegistNo").val()}, function(_data) {
		var tradeBbs = _data.tradeBbs;
		if(_data.resultCode == RESULT_SUCCESS){
			$("#chrgCnstntUserNm").val(tradeBbs.chargerNm);
			$("#chrgCnstntUserNo").val(tradeBbs.chrgCnstntUserNo);
			
			if(!$("#chrgCnstntUserNo").val()){//컨설턴트 배정x
				$("#btn_saveMob").css("display", "block");
				$("#btn_companionMob").css("display", "none");
				$('#dataTbodyMobPopup li').show();
			}else{
				$("#btn_saveMob").css("display", "none");
				$("#btn_companionMob").css("display", "block");
				$('#dataTbodyMobPopup li').hide();
				$('#dataTbodyMobPopup').find('li div input').each(function(){
					if($(this).val() == $("#chrgCnstntUserNo").val()){
						$(this).parent().parent().show();
					}
				});
			}
		} else {
			alert(_data.resultMsg);
		}
	});
	$("#assignCnsltPopup").show();
	$("#assignCnsltPopup").removeClass("hidden");
}

function fn_tradeReview(obj) {
	$("#crud").val('r');
	$("#trdeThingRegistNo").val(obj);
	$("#srcPath").val(location.pathname);
	$("#reqForm").attr("action", '/myPage/trade/tradeReview.do');
	$("#reqForm").submit();
}

function fn_updateSttus(obj) {
	var chkRowSn = "";
	$("input[name='chkRowSn']:checked").each (function (){
		chkRowSn = chkRowSn + $(this).val()+"," ;
	});
	chkRowSn = chkRowSn.substring(0,chkRowSn.lastIndexOf( ",")); //맨끝 콤마 지우기
	$("#chkRowSn").val(chkRowSn);
	if('' == chkRowSn){
		alert("대상을 선택하세요.");
		return false;
	}

	if (confirm("처리하시겠습니까?")) {
		var regNo = $("#trdeThingRegistNo").val();
		var params = {
				'sttus':obj
				//,'trdeThingRegistNo': regNo
				,'chkRowSn':chkRowSn
			};
		fnGetAjaxData("/myPage/board/trade/updateTradeSttus.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);

				fn_selectTradeList(1);
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}

function fn_updateSttusMob(obj) {
	var chkRowSn = "";
	$("input[name='chkM']:checked").each (function (){
		chkRowSn = chkRowSn + $(this).val()+"," ;
	});
	chkRowSn = chkRowSn.substring(0,chkRowSn.lastIndexOf( ",")); //맨끝 콤마 지우기
	$("#chkRowSn").val(chkRowSn);
	if('' == chkRowSn){
		alert("대상을 선택하세요.");
		return false;
	}

	if (confirm("처리하시겠습니까?")) {
		var regNo = $("#trdeThingRegistNo").val();
		var params = {
				'sttus':obj
				//,'trdeThingRegistNo': regNo
				,'chkRowSn':chkRowSn
			};
		fnGetAjaxData("/myPage/board/trade/updateTradeSttus.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				$("#dataTbodyMob").empty();
				fn_mobSelectTradeList(1);
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}

function selectConsultantMobList() {
	var params = {};
	fnGetAjaxData("/myPage/board/trade/selectConsultantList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#dataTbodyMobPopup").empty();
			var dataList = _data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li>';
					dataTr += '	<div class="box">';
					dataTr += '	<input type="hidden" class="thisNo" value="'+data.chrgCnstntUserNo+'">';
					dataTr += '		<div class="brand">';
					dataTr += '			<p class="name">'+ data.userNm +'</p>';
					dataTr += '		</div>';
					dataTr += '		<div class="detail">';
					dataTr += '			<dl>';
					dataTr += '				<dt>전화번호</dt>';
					dataTr += '				<dd><a href="tel:'+data.telno+'">'+data.telno+'</a></dd>';
					dataTr += '			</dl>';
					dataTr += '			<dl>';
					dataTr += '				<dt>이메일</dt>';
					dataTr += '				<dd><a href="mailto:'+data.emailAdres+'">'+data.emailAdres+'</a></dd>';
					dataTr += '			</dl>';
					dataTr += '		</div>';
					dataTr += '	</div>';
					dataTr += '</li>';
				})
				$("#dataTbodyMobPopup").append(dataTr);
			} else {
				$("#dataTbodyMobPopup").append('<tr><td colspan="4">조회된 내용이 없습니다.</td></tr>');
			}
		} else {
			alert(_data.resultMsg);
		}
	});
}

function fn_updateAssignConsultantMob(str) {
	var chrgCnstntUserNo = $("#assignCnsltMobPopup").find(".active").find(".thisNo").attr("value");
	if(!chrgCnstntUserNo) {
		alert("컨설턴트를 선택하세요");
		return false;
	}
	
	//str이 반려일 경우
	if(str.indexOf('반려') != -1) {
		chrgCnstntUserNo = "";
	}
	if (confirm(str + "하시겠습니까?")) {
		var url = "/myPage/board/trade/updateAssignConsultant.ajax";
		var params = {
				 "trdeThingRegistNo" : $("#trdeThingRegistNo").val()
				,"chrgCnstntUserNo" : chrgCnstntUserNo
				};
		fnGetAjaxData(url, params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(str + "되었습니다.");
				$("#assignCnsltMobPopup").find(".active").removeClass("active");
				$("#assignCnsltMobPopup").hide(fn_mobSelectTradeList());
				location.href = "/myPage/trade/manageAdm/manageAdmList.do";
				return false;
			} else {
				alert(_data.resultMsg);
			}
		});
	}
}