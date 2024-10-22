$(document).ready(function() {
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectIntegList(); 
	});
	
	$("#btn_sch").click(function() {
		fn_selectIntegList(1);
	});
	
	$("#btnMobSearch").click(function() {
		$("#mSearchType").val($("#searchMobType option:selected").val());
		$("#mSearchText").val($("#searchMobText").val());
		$("#dataTbodyMob").empty();
		fn_selectMobIntegList(1);
	});
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			$("#schSeCode").val($("#schSeCodeMob").val());
			$("#schTxt").val($("#schTxtMob").val());
			fn_selectMobIntegList(Number($("input[name=pageIndexMob]").val())+1);
		}
	})

	$("#sch_btn").on('click', function(){
		fn_selectIntegList(1);
	});
	
	fn_selectIntegList(1);
	fn_selectMobIntegList(1);
}); 

function back() {
	if (document.referrer && document.referrer.indexOf("/") != -1) {
		history.back();
	} else {
		location.href = "/";
	}
}

function fn_selectIntegList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	
	$.post('/board/integ/selectIntegList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCnt").empty();
			$("#totalCnt").append('전체<em> '+data.resultCount+' </em>건');
			$("#dataTbody").empty();
			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				dataList.forEach(function(data,idx){
					if(data.top == 2) {
						dataTr += '<tr>';
						dataTr += '<td>'+data.rn+'</td>';
						if(dateDiff(data.registDt) < 7){
							dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_noticeView('+data.sn+')" class="ul"> ['+ data.seCodeNm+ '] ' +data.sj+'&nbsp;&nbsp;<img src="/static/images/ico_new.png"></a>';
						} else {
							dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_noticeView('+data.sn+')" class="ul"> ['+ data.seCodeNm+ '] ' +data.sj+' </a>';
						}
						dataTr += '</td>';
						dataTr += '<td>'+data.registDt+'</td>';
						dataTr += '</tr>';
					} else {//상단 공지사항일 경우
						dataTr += '<tr class="noti">';
						if(dateDiff(data.registDt) < 7){
							dataTr += '<td colspan="2" class="left"><img src="/static/images/i_news_yl.svg" alt="공지사항" class="i_noti"><a href="javascript:void(0);" onclick="fn_noticeView('+data.sn+')" class="ul">'+data.sj+'</a>&nbsp;&nbsp;<img src="/static/images/ico_new.png"></td>';
						} else {
							dataTr += '<td colspan="2" class="left"><img src="/static/images/i_news_yl.svg" alt="공지사항" class="i_noti"><a href="javascript:void(0);" onclick="fn_noticeView('+data.sn+')" class="ul">'+data.sj+'</a></td>';
						}
						dataTr += '<td>'+data.registDt+'</td>';
						dataTr += '</tr>';
					}
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="3">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}
function fn_selectMobIntegList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$.post('/board/integ/selectIntegList.ajax',$("#searchMobForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCntMob").empty();
			$("#totalCntMob").append(data.resultCount);
			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/7) % data.resultCount);
				if((parseInt(data.resultCount) % 7) > 0){
					maxPage = maxPage + 1;
				}
				if(isNaN(maxPage)){
					maxPage = "1";
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){
					//모바일에서는 상단 공지사항 최초 3개 이외에는 막기
					var firstNoticeTegCount = $("li.notice span.category").length;
					if(firstNoticeTegCount == 3) {
						if(data.top == 1) {
							return;
						}
					}
					dataMobTr += '<li class="notice">';
					dataMobTr += '<div class="box" style="padding:16px 16px 16px 30px">';
					//모바일에서 더보기 누를때 공지사항 반복 막기
					if(data.top == 1){
						if(dateDiff(data.registDt) < 7){
							dataMobTr += '<span class="category">공지사항</span>&nbsp;&nbsp;<img class="noneArrow" src="/static/images/ico_new.png">';
						} else {
							dataMobTr += '<span class="category">공지사항</span>';
						}
					}else {
						if(dateDiff(data.registDt) < 7){
							dataMobTr += '<span style="margin-bottom:6px;color:#999;">' + '[' +data.seCodeNm + ']' + '</span>&nbsp;&nbsp;<img class="noneArrow" src="/static/images/ico_new.png">';
						} else {							
							dataMobTr += '<span style="margin-bottom:6px;color:#999;">' + '[' +data.seCodeNm + ']' + '</span>';
						}
					}
					/*dataMobTr +='<p class="check">';
					dataMobTr += '    </p>';*/
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_noticeView('+data.sn+')" style="padding:0px 0px 0px 0px">';
					dataMobTr += '<div class="numState">';
					if(data.top != 1){
						dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>';
					}
					dataMobTr += '</div>';
					dataMobTr += '<p class="subject">' + data.sj +'</p>';
					dataMobTr += '    <p class="nameDate">';
					dataMobTr += '      <span>'+data.registDt+'</span>';
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

function fn_noticeView(obj) {
	$("#crud").val('r');
	$("#sn").val(obj);
	$("#schCodeVal").val($("#schCode").val());
	$("#schTxtVal").val($("#schTxt").val());
	$("#reqForm").attr("action", '/board/integ/integView.do');
	$("#reqForm").submit();		
}

//현재날짜 구하기
function dateDiff(registDt){
    var now = new Date();
    
    var day = registDt;
    var dayArr = day.split("-");
    
    var year = now.getFullYear() ;
    var month = now.getMonth()+1 ;
    var day = now.getDate();
    
    var regDate = new Date(dayArr[0], dayArr[1], dayArr[2]); 
    var nowDate = new Date(year, month, day);
    
    var btMs = nowDate.getTime() - regDate.getTime();

    return btMs / (1000*60*60*24);
}
	
	