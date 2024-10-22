$(document).ready(function() {

	fn_selectInfoList();
	fn_selectInfoListMob();
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectInfoListMob(Number($("input[name=pageIndexMob]").val())+1);
		}
	});
	
	//프랜차이즈 제공 등록 팝업
	$("#btnRegExpr").on("click", function(){
		var params = {};
		$.ajax({
			/*dataType:"text",*/
			dataType:"html",
			type: "POST",
			url: "/expr/owner/ownerRegSave.do",
			data:params,
			async: true,
			cache: false,
			success : function(data, status, request) {
				$("#popupDiv").html(data);
				//위치 조정
				$("#ownerRegSavePopup").attr("style","margin-top:-400px");
			},
		    error: function(request, status, error) {
	    		window.error = error;
				alert(error);
			}
		});
	});
});

function fn_selectInfoList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	//console.log($("#searchForm").serialize());

	$.post('/expr/owner/selectFrnchsExprnRegistList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#dataUl").empty();
//			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.frnchsExprnRegistList;
			if(!!dataList && dataList.length != 0) {
				var dataLi = "";
				dataList.forEach(function(data,idx){
					//모바일 하드코딩 포함 (*양사이드중 하나라도 txt 길어지면 비율 깨짐)
					dataLi += '<li>                                                                                                   ';
					dataLi += '	<div class="img" style="background-image:url(/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+data.fileKey+');"></div>                     ';
					dataLi += '	<div class="txt">                                                                                     ';
					dataLi += '		<div class="ti">'+data.bsnSgnal+' '+data.bhfNm+'</div>                                                              ';
					dataLi += '		<div class="tx">'+data.bhfAdres+'</div>                                            ';
					dataLi += '		<div class="mBoard1 forPc">                                                                             ';
					dataLi += '			<table summary="체험기간, 운영시간, 모집인원, 종업원수, 프랜차이즈 체험, 사전 교육일로 구성된 표입니다.">';
					dataLi += '			<caption>'+data.bsnSgnal+' '+data.bhfNm+'</caption>                                                             ';
					dataLi += '			<colgroup>                                                                                    ';
					dataLi += '				<col width="110">                                                                         ';
					dataLi += '				<col width="*">                                                                           ';
					dataLi += '			</colgroup>                                                                                   ';
					dataLi += '			<tbody>                                                                                       ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">체험기간</th>                                                            ';
					dataLi += '				<td class="left">'+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</td>                                             ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">운영시간</th>                                                            ';
					dataLi += '				<td class="left">'+data.operBeginTime+' ~ '+data.operEndTime+'</td>                                                       ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">모집인원</th>                                                            ';
					dataLi += '				<td class="left">'+data.rcritNmpr+'명</td>                                                                 ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">종업원수</th>                                                            ';
					dataLi += '				<td class="left">'+data.emplyCo+'명</td>                                                                 ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">프랜차이즈 체험<br> 사전 교육일</th>                                     ';
					dataLi += '				<td class="left">'+data.edcDe+'</td>                                                          ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			</tbody>                                                                                      ';
					dataLi += '			</table>                                                                                      ';
					dataLi += '		</div>                                                                                            ';
					dataLi += '		<div class="info forMo">                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>체험기간</dt>                                                                             ';
					dataLi += '				<dd>'+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>운영시간</dt>                                                                             ';
					dataLi += '				<dd>'+data.operBeginTime+' ~ '+data.operEndTime+'</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>모집인원</dt>                                                                             ';
					dataLi += '				<dd>'+data.rcritNmpr+'명</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>종업원수</dt>                                                                             ';
					dataLi += '				<dd>'+data.emplyCo+'명</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>사전 교육일</dt>                                                                             ';
					dataLi += '				<dd>'+data.edcDe+'</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '		</div>                                                                                            ';
					dataLi += '		<a href="javascript:void(0)" onclick="fn_infoView('+data.frnchsNo+','+data.exprnRegistNo+')" class="btn">상세정보</a>      ';
					dataLi += '	</div>                                                                                                ';
					dataLi += '</li>                                                                                                  ';
				})
				$("#dataUl").append(dataLi);
			} else {
				$("#dataUl").append('<div style="text-align:center;padding-top:30px">조회된 내용이 없습니다.</div>');
			}
			$(".mPag forPc").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fn_selectInfoListMob(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val($("input[name=pageIndex]").val());
	//console.log($("#searchForm").serialize());
	
	$.post('/expr/owner/selectFrnchsExprnRegistList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
//			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.frnchsExprnRegistList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataLi = "";
				dataList.forEach(function(data,idx){
					//모바일 하드코딩 포함 (*양사이드중 하나라도 txt 길어지면 비율 깨짐)
					dataLi += '<li>                                                                                                   ';
					dataLi += '	<div class="img" style="background-image:url(/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+data.fileKey+');"></div>                     ';
					dataLi += '	<div class="txt">                                                                                     ';
					dataLi += '		<div class="ti">'+data.bsnSgnal+' '+data.bhfNm+'</div>                                                              ';
					dataLi += '		<div class="tx">'+data.bhfAdres+'</div>                                            ';
					dataLi += '		<div class="mBoard1 forPc">                                                                             ';
					dataLi += '			<table summary="체험기간, 운영시간, 모집인원, 종업원수, 프랜차이즈 체험, 사전 교육일로 구성된 표입니다.">';
					dataLi += '			<caption>'+data.bsnSgnal+' '+data.bhfNm+'</caption>                                                             ';
					dataLi += '			<colgroup>                                                                                    ';
					dataLi += '				<col width="110">                                                                         ';
					dataLi += '				<col width="*">                                                                           ';
					dataLi += '			</colgroup>                                                                                   ';
					dataLi += '			<tbody>                                                                                       ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">체험기간</th>                                                            ';
					dataLi += '				<td class="left">'+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</td>                                             ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">운영시간</th>                                                            ';
					dataLi += '				<td class="left">'+data.operBeginTime+' ~ '+data.operEndTime+'</td>                                                       ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">모집인원</th>                                                            ';
					dataLi += '				<td class="left">'+data.rcritNmpr+'명</td>                                                                 ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">종업원수</th>                                                            ';
					dataLi += '				<td class="left">'+data.emplyCo+'명</td>                                                                 ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			<tr>                                                                                          ';
					dataLi += '				<th class="left">프랜차이즈 체험<br> 사전 교육일</th>                                     ';
					dataLi += '				<td class="left">'+data.edcDe+'</td>                                                          ';
					dataLi += '			</tr>                                                                                         ';
					dataLi += '			</tbody>                                                                                      ';
					dataLi += '			</table>                                                                                      ';
					dataLi += '		</div>                                                                                            ';
					dataLi += '		<div class="info forMo">                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>체험기간</dt>                                                                             ';
					dataLi += '				<dd>'+data.exprnBeginDe+' ~ '+data.exprnEndDe+'</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>운영시간</dt>                                                                             ';
					dataLi += '				<dd>'+data.operBeginTime+' ~ '+data.operEndTime+'</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>모집인원</dt>                                                                             ';
					dataLi += '				<dd>'+data.rcritNmpr+'명</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>종업원수</dt>                                                                             ';
					dataLi += '				<dd>'+data.emplyCo+'명</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '			<dl>                                                                             ';
					dataLi += '				<dt>사전 교육일</dt>                                                                             ';
					dataLi += '				<dd>'+data.edcDe+'</dd>                                                                             ';
					dataLi += '			</dl>                                                                             ';
					dataLi += '		</div>                                                                                            ';
					dataLi += '		<a href="javascript:void(0)" onclick="fn_infoView('+data.frnchsNo+','+data.exprnRegistNo+')" class="btn">상세정보</a>      ';
					dataLi += '	</div>                                                                                                ';
					dataLi += '</li>                                                                                                  ';
				})
				$("#dataUlMob").append(dataTr);
			} else {
				$("#dataUlMob").html('<p class="empty tac">조회된 내용이 없습니다.</p>');
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

function fn_infoView(reqFrnchsNo, reqExprnRegistNo) {
	$("#reqCrud").val('r');
	$("#reqFrnchsNo").val(reqFrnchsNo);
	$("#reqExprnRegistNo").val(reqExprnRegistNo);
	$("#reqForm").attr("action", '/expr/owner/ownerView.do');
	$("#reqForm").submit();
}
