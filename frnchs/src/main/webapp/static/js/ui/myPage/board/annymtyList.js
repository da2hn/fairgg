$(document).ready(function() {
	//조회
	fn_selectAnnymtyList(1);
	fn_selectAnnymtyListMob(1);
	
	$("#btnSearch").click(function(){
		fn_selectAnnymtyList();
	});

	$("#btnMobSearch").click(function(){
		$("#mSchSeCode").val($("#schSeCodeMob option:selected").val());
		$("#mComCode").val($("#comCodeMob option:selected").val());
		$("#mSchTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_selectAnnymtyListMob();
	});
	
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectAnnymtyList();
	});
	
	$("#schTxtMob").keyup(function(e){
		if(e.keyCode == 13) {
			$("#mSchSeCode").val($("#schSeCodeMob option:selected").val());
			$("#mSchTxt").val($("#schTxtMob").val());
			$("#dataTbodyMob").empty();
			fn_selectAnnymtyListMob();
		}
	});

	//Mob paging
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectAnnymtyListMob(Number($("input[name=pageIndexMob]").val())+1);
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
		if(confirm("선택한 교육신청을 삭제하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			fnGetAjaxData("/myPage/brand/annymty/updateAnnymtyListDelete.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					fn_selectAnnymtyList(1);
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
		if(confirm("선택한 교육신청을 삭제하시겠습니까?")) {
			var params = {};
			params["infoDcsRegistNoArr"] = checkedValArr.join(",");
			fnGetAjaxData("/myPage/brand/annymty/updateAnnymtyListDelete.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					$("#dataTbodyMob").empty();
					fn_selectAnnymtyListMob(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
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
});

//목록 조회
function fn_selectAnnymtyList(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/myPage/board/annymty/selectAnnymtyList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				dataList.forEach(function(data,idx){
					var dataTr = "";
					dataTr += '<tr>';
					dataTr += '<td><span class="mCheckbox notext"><input type="checkbox" id="chk'+data.annymtyId+'_'+i+'" name="chk" title="선택" value="'+data.annymtyId+'"><label for="chk'+data.annymtyId+'_'+i+'">선택</label></span></td>';
					dataTr += ' <td>'+data.rn+'</td>';
					dataTr += ' <td>'+data.annymtyTitle+'</td>';
					/*dataTr += ' <td>'+data.applcntNm+'</td>';*/
					dataTr += ' <td>';
					dataTr += '		<p><a href="tel:'+data.telNo+'">'+data.telNo+'</a></p>';
					dataTr += '		<p><a href="mailto:'+data.emailAdres+'">'+data.emailAdres+'</a></p>';
					dataTr += '	</td>';
					if($.trim(data.annymtyQuest) == ""){
						dataTr += '	<td>-</td>';
					}else{
						dataTr += '	<td>';
						dataTr += '		<a href="#" onclick="toggle_dimmed_view(\'layer_question_detail_'+data.rn+'\'); return false;"><img src="../../../static/images/i_view.png" alt="사전질의 상세"></a>';
						dataTr += '		<div class="layer_common layer_question_detail layer_question_detail_'+data.rn+'">';
						dataTr += '			<div class="titleArea">';
						dataTr += '				<h3>익명질의 상세</h3>';
						dataTr += '				<button class="close" onclick="toggle_dimmed_view(\'layer_question_detail_'+data.rn+'\');">닫기</button>';
						dataTr += '			</div>';
						dataTr += '			<div class="inner">';
						dataTr += '				<div class="cont">'+data.annymtyQuest+'</div>';
						dataTr += '			</div>';
						dataTr += '		</div>';
						dataTr += '	</td>';
						if(data.atchmnflNo == 0 || data.atchmnflNo == null) {
							dataTr += '<td><a href="javascript:void(0)">-</a></td>';
						} else {						
							dataTr += '<td><a href="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="ul"><img src="/static/images/ico_attach1.png" width="20" height="10"></a></td>';
						}
					}
					dataTr += '</tr>';
					$("#dataTbody").append(dataTr);
				})
			} else {
				$("#dataTbody").append('<tr><td colspan="6">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
};

function fn_selectAnnymtyListMob(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	$.post("/myPage/board/annymty/selectAnnymtyList.ajax",
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

					dataMobTr += '	<div class="box hasLayer">';
					dataMobTr += '  <p class="check">';
					dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.annymtyId+'" value="'+data.annymtyId+'" data-file="'+data.atchmnflNo+'" data-link="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'" class="hidden notxt">';
					dataMobTr += '    <label for="chkM'+data.annymtyId+'"></label>';
					dataMobTr += '  </p>';
					dataMobTr += '		<a onclick="toggle_dimmed_view(\'layer_question_'+data.rn+'\');">';

					dataMobTr += '			<div class="numState">';
					dataMobTr += '				<span class="no">NO.'+data.rn+'</span>';
					dataMobTr += '			</div>';
					dataMobTr += '			<div class="subject">';
					dataMobTr += '				<span>'+data.annymtyTitle+'</span>';
					dataMobTr += '			</div>';
					dataMobTr += '			<div class="nameDate">';
					/*dataMobTr += '				<span><strong>신청자 </strong>'+data.applcntNm+'</span>';*/
					dataMobTr += '				<span><strong>전화번호 </strong>'+data.telNo+'</span>';
					if(data.emailAdres != ""){
						dataMobTr += '				<span><strong>이메일 </strong>'+data.emailAdres+'</span>';
					}
					dataMobTr += '			</div>';
					if(data.atchmnflNo == 0 || data.atchmnflNo == null) {
						dataMobTr += '<p class="attach"></p>';
					} else {						
						dataMobTr += '<p class="attach active"></p>';
					}
					dataMobTr += '		</a>';
					dataMobTr += '			<div class="layer_common layer_popup layer_question layer_question_'+data.rn+'">';
					dataMobTr += '				<div class="titleArea">';
					dataMobTr += '					<h3>익명질의 상세</h3>';
					dataMobTr += '					<button class="close" onclick="toggle_dimmed_view(\'layer_question_'+data.rn+'\');">닫기</button>';
					dataMobTr += '				</div>';
					dataMobTr += '				<div class="inner scroll_y">';
					dataMobTr += '					<div class="cont">'+data.annymtyQuest+'</div>';
					dataMobTr += '				</div>';
					dataMobTr += '				<div class="btn">';
					dataMobTr += '					<div class="box_btn block h50 gray fs16 bold"><button onclick="toggle_dimmed_view(\'layer_question_'+data.rn+'\');">닫기</button></div>';
					dataMobTr += '				</div>';
					dataMobTr += '			</div>';
					dataMobTr += '	</div>';
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
