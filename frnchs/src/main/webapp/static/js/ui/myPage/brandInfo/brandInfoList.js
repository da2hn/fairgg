$(document).ready(function() {
	fn_search(1);
	fn_mobSearch(1);
	
	$("#searchText").keyup(function(e){
		if(e.keyCode == 13) {
			fn_search(1);
		}
	});
	
	$("#searchMobText").keyup(function(e){
		if(e.keyCode == 13) {
			$("#mSearchType").val($("#searchMobType option:selected").val());
			$("#mSearchText").val($("#searchMobText").val());
			$("#dataTbodyMob").empty();
			fn_mobSearch(1);
		}
	});
	
	$("#btnSearch").click(function() {
		fn_search(1);
	});
	$("#btnMobSearch").click(function() {
		$("#mSearchType").val($("#searchMobType option:selected").val());
		$("#mSearchText").val($("#searchMobText").val());
		$("#dataTbodyMob").empty();
		fn_mobSearch(1);
	});
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_mobSearch(Number($("input[name=pageIndexMob]").val())+1)
		}
	});
	
	$("#btnCancel").click(function() {
		var chkRowSn = "";
		$("input[name='chk']:checked").each (function (){
			chkRowSn = chkRowSn + $(this).val()+"," ;
		});
		chkRowSn = chkRowSn.substring(0,chkRowSn.lastIndexOf( ",")); //맨끝 콤마 지우기
		if("" == chkRowSn){
			alert("대상을 선택하세요.");
			return false;
		}
		if(confirm("삭제하시겠습니까?")){
			var params = {
					'chkRowSn':chkRowSn
			};
			fnGetAjaxData("/myPage/boardInfo/deleteBrandAdiInfo.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);

					fn_search(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	$("#btnMobCancel").click(function(){
		var chkRowSn = "";
		$("input[name='chkM']:checked").each(function (){
			chkRowSn = chkRowSn + $(this).val()+"," ;
		});
		chkRowSn = chkRowSn.substring(0,chkRowSn.lastIndexOf(",")); //맨끝 콤마 지우기
		if("" == chkRowSn){
			alert("대상을 선택하세요.");
			return false;
		}
		if(confirm("삭제하시겠습니까?")){
			var params = {
					'chkRowSn':chkRowSn
			};
			fnGetAjaxData("/myPage/boardInfo/deleteBrandAdiInfo.ajax", params, function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					$("#dataTbodyMob").empty();
					fn_mobSearch(1);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
});


function fn_search(pageIndex){
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
	$.post("/myPage/brandInfo/selectBrandInfoList.ajax",
		$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataTbody").empty();
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					var adiTxt = data.adiAt=='Y'?'등록완료':'등록안함';
					dataTr += '<tr data-frnchs-no="'+data.frnchsNo+'">';
					dataTr += '<td>';
					dataTr += '		<span class="mCheckbox notext">';
					dataTr += '			<input type="checkbox" id="chk'+idx+'" name="chk" title="선택" value='+data.frnchsNo+'>          ';
					dataTr += '			<label for="chk'+idx+'">선택</label>';
					dataTr += '		</span>';
					dataTr += '</td>';
					dataTr += '<td>'+data.rn+'</td>';
					dataTr += '<td>'+data.lclasIndutyNm+'</td>';
					dataTr += '<td>'+data.mlsfcIndutyNm+'</td>';
					dataTr += '<td><a href="javascript:void(0);" class="ul" onclick="fn_movePage('+data.frnchsNo+');">'+data.bsnSgnal+'</a></td>';
					dataTr += '<td>'+adiTxt+'</td>';
					dataTr += '<td>'+data.registDt+'</td>';
					if(data.frnchsImageFileNo == null) {
						dataTr += '<td><a href="javascript:void(0)">-</a></td>';
					} else {						
						dataTr += '<td><a href="/file/downloadFile.do?atchmnflNo='+data.frnchsImageFileNo+'&fileSn='+data.fileSn+'&fileKey='+encodeURIComponent(data.fileKey)+'&atchmnflSttusCode='+data.atchmnflSttusCode+'" class="ul"><img src="/static/images/ico_attach1.png"></a></td>';
					}
					if(data.entrprsFileSttusCode == null) {
						dataTr += '<td><a href="javascript:void(0)">-</a></td>';
					} else {
						dataTr += '<td><a href="/file/downloadZipFile.do?atchmnflNo='+data.entrprsIntrcnFileNo+'&fileKey='+data.entFileKey+'&zipName='+data.frnchsNo+'_'+data.rn+'" class="ul"><img src="/static/images/ico_attach1.png"></a></td>';
					}
					dataTr += '</tr>';
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="9">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");	
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fn_mobSearch(pageIndex){
	/*$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);*/
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	$.post("/myPage/brandInfo/selectBrandInfoList.ajax",
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
					var adiTxt = data.adiAt=='Y'?'등록완료':'등록안함';					
					dataMobTr += '<li>';
					dataMobTr += '<div class="box">';
					dataMobTr += '  <p class="check">';
					dataMobTr += '    <input type="checkbox" name="chkM" id="chkM'+data.frnchsNo+'" value="'+data.frnchsNo+'" class="hidden notxt">';
					dataMobTr += '    <label for="chkM'+data.frnchsNo+'"></label>';
					dataMobTr += '  </p>';
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_movePage('+data.frnchsNo+');">';
					dataMobTr += '<div class="numState">';
					dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>' + ' ';
					if(data.adiAt != 'Y'){
						dataMobTr += '<span class="state active">'+ adiTxt + ' </span>';
					}else{
						dataMobTr += '<span class="state">'+ adiTxt + ' </span>';
					}
					dataMobTr += '</div>';
					/*dataMobTr += '    <p class="type" style="width:90%;"><span>'+data.lclasIndutyNm+' - '+data.mlsfcIndutyNm+'</span></p>';*/
					dataMobTr += '    <p class="subject">'+data.bsnSgnal+'</p>';
					dataMobTr += '    <p class="nameDate">';
					dataMobTr += '      <span><strong>업종</strong> '+data.lclasIndutyNm+' - '+data.mlsfcIndutyNm+'</span>';
					dataMobTr += '      <span><strong>등록일자</strong> '+data.registDt+'</span>';
					dataMobTr += '    </p>';
					if(data.frnchsImageFileNo != null || data.entrprsIntrcnFileNo != null) {
						dataMobTr += '<p class="attach active"></p>';
					} else {						
						dataMobTr += '<p class="attach"></p>';
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

function fn_movePage(frnchsNo) {
//	alert($(obj).closest("tr").data("frnchsNo"));
//	return;
	$("#searchForm").attr("action","/myPage/brandInfo/brandInfo.do");
	$("#searchForm input[name=reqCrud]").val('r');
	$("#searchForm input[name=frnchsNo]").val(frnchsNo);
	$("#searchForm").submit();
}

