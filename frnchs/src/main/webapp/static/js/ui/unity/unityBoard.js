$(document).ready(function() {
	
	if($("#bbsNm").val() != '통합게시판'){
		$("#btn_regist").css("display", "inline-block");
		$("#btn_registMob").css("display", "inline-block");
	}
	
	if(!$("#ssUserNo").val()){
		$("#btn_regist").css("display", "none");
		$("#btn_registMob").css("display", "none");
	}
	
	$("#btn_regist").click(function(){
		if(!$("#ssUserNo").val()){
			alert("게시글을 등록하기 위해선 로그인이 필요합니다.");
			window.location.href = "/user/loginPage.do";
			return;
		}
		fn_regist();
	})
	$("#btn_registMob").click(function(){
		if(!$("#ssUserNo").val()){
			alert("게시글을 등록하기 위해선 로그인이 필요합니다.");
			window.location.href = "/user/loginPage.do";
			return;
		}
		fn_regist();
	})
	
	$("#schTxt").keyup(function(e){
		if(e.keyCode == 13) fn_selectUnityList(); 
	});
	
	$("#schTxtMob").keyup(function(e){
		if(e.keyCode == 13) fn_selectUnityList(); 
	});
	
	$("#btn_sch").click(function() {
		fn_selectUnityList(1);
	});
	
	$("#btnMobSearch").click(function() {
		$("#schCode").val($("#schCodeMob option:selected").val());
		$("#schTxt").val($("#schTxtMob").val());
		$("#dataTbodyMob").empty();
		fn_selectMobUnityList(1);
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			/*$("#schCode").val($("#schCodeMob").val());
			$("#schTxt").val($("#schTxtMob").val());*/
			fn_selectMobUnityList(Number($("input[name=pageIndexMob]").val())+1);
		}
	});
	
	var windowWidth = window.matchMedia("screen and (max-width:750px)");
	if (windowWidth.matches) {
		fn_selectMobUnityList(1);
	}else{
		fn_selectUnityList(1);
	}
	
	var contentHeaderHTML = "";
	contentHeaderHTML += '<h3><span>'+$("#bbsNm").val()+'</span></h3>';
	contentHeaderHTML += '<p>'+$("#bbsDc").val()+'</p>';
	$(".mKeysub1").html(contentHeaderHTML);
}); 

function fn_regist() {
	var ssUserRole = $("#ssUserRole").val()
	if(ssUserRole != "[ROLE_US04]"){
		return;
	}
	$("#crud").val('c');
	$("#searchForm").attr("action", '/board/listModify.do?val='+$("#masterSn").val());
	$("#searchForm").submit();
}

function back() {
	if (document.referrer && document.referrer.indexOf("/") != -1) {
		history.back();
	} else {
		location.href = "/";
	}
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

function fn_selectUnityList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("#Mob").val('');
	$.post('/board/unity/selectUnityBoard.ajax', $("#searchForm").serialize()
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
					//로그인 관련 댓글 주석 22.06.21	
					/*var commentCount = ''
						if($("#commentAt").val() == 'Y'){
							commentCount = '(' + data.commentCount + ')';
						}
						
						if(data.commentCount == 0){
							commentCount = '';
						}*/
//						if(data.upperBbsSn){
//							if(dateDiff(data.registDt) < 7){
//								dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul"><img src="/static/images/ico_re.png"> [답변] ' +data.sj + commentCount +'<img src="/static/images/ico_new.png"></a>';	
//							}else{
//								dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul"><img src="/static/images/ico_re.png"> [답변] ' +data.sj + commentCount +'</a>';	
//							}
//						}else{
//							if(dateDiff(data.registDt) < 7){
//								dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul"> ' +data.sj + commentCount +'<img src="/static/images/ico_new.png"></a>';								
//							}else{
//								dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul"> ' +data.sj + commentCount +'</a>';							
//							}
//						}
//						dataTr += '</td>';
//						dataTr += '<td>'+data.rdcnt+'</td>';
//						dataTr += '<td>'+data.userNm+'</td>';
//						dataTr += '<td>'+data.registDt+'</td>';
//						dataTr += '</tr>';
						/*통합게시판 합병 2022-01-14 염종찬*/
						if(data.top == 2) {
							dataTr += '<tr>';
							dataTr += '<td>'+data.rn+'</td>';
							if(data.upperBbsSn){
								if(dateDiff(data.registDt) < 7){
									dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul"><img src="/static/images/ico_re.png"> [답변] ' +data.sj /*+ commentCount*/ +'</a>&nbsp;&nbsp;<img src="/static/images/ico_new.png">';	
								}else{
									dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul"><img src="/static/images/ico_re.png"> [답변] ' +data.sj /*+ commentCount */ +'</a>';	
								}
							}else{
								if(dateDiff(data.registDt) < 7){
									dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul"> ' +data.sj /*+ commentCount*/ +'</a>&nbsp;&nbsp;<img src="/static/images/ico_new.png">';								
								}else{
									dataTr += '<td style="text-align: left;"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul"> ' +data.sj /*+ commentCount*/ +'</a>';							
								}
							}
							dataTr += '</td>';
							dataTr += '<td>'+data.rdcnt+'</td>';
							dataTr += '<td>'+data.userNm+'</td>';
							dataTr += '<td>'+data.registDt+'</td>';
							dataTr += '</tr>';
						} else {//상단 공지사항일 경우
							dataTr += '<tr class="noti">';
							if(dateDiff(data.registDt) < 7){
								dataTr += '<td colspan="4" class="left"><img src="/static/images/i_news_yl.svg" alt="공지사항" class="i_noti"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul">'+data.sj+'</a>&nbsp;&nbsp;<img src="/static/images/ico_new.png"></td>';
							} else {
								dataTr += '<td colspan="4" class="left"><img src="/static/images/i_news_yl.svg" alt="공지사항" class="i_noti"><a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" class="ul">'+data.sj+'</a></td>';
							}
							dataTr += '<td>'+data.registDt+'</td>';
							dataTr += '</tr>';
						}
				})
				$("#dataTbody").append(dataTr);
			} else {
				$("#dataTbody").append('<tr><td colspan="5">조회된 내용이 없습니다.</td></tr>');
			}
			$(".mPag").html(data.pagingHtml).trigger("create");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}
function fn_selectMobUnityList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$("#Mob").val('Y');
	$.post('/board/unity/selectUnityBoard.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			$("#totalCntMob").empty();
			$("#totalCntMob").append(data.resultCount);
			$("#labelCheckboxAll").prop("checked", false);
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				if(isNaN(maxPage)){
					maxPage = "1";
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataMobTr = "";
				dataList.forEach(function(data,idx){
					//로그인 관련 댓글 주석 22.06.21
					/*var commentCount = ''
					if($("#commentAt").val() == 'Y'){
						commentCount = '(' + data.commentCount + ')';
					}
					
					if(data.commentCount == 0){
						commentCount = '';
					}*/
					//모바일에서는 상단 공지사항 최초 n개 이외에는 막기
					var firstNoticeTegCount = $("li.notice span.category").length;
					if(firstNoticeTegCount >= idx +1) {
						if(data.top == 1) {
							return;
						}
					}
					dataMobTr += '<li class="notice">';
					dataMobTr += '<div class="box" style="padding:16px 16px 16px 0px">';
					dataMobTr += '  <a href="javascript:void(0);" onclick="fn_postView('+data.bbsSn+')" style="padding:0px 0px 0px 0px">';
					dataMobTr += '<div class="numState">';
					
					if(data.top == 1){
						dataMobTr += '<span class="category">공지사항</span>';
					}else{
						dataMobTr += '<span class="no">NO.'+ data.rn + ' </span>';
					}
					
					if(dateDiff(data.registDt) < 7){
						dataMobTr +=	'&nbsp;&nbsp;<img class="noneArrow" src="/static/images/ico_new.png">';	
					}
					dataMobTr += '</div>';
									
					if(data.upperBbsSn){
						dataMobTr += '<p class="subject"><img src="/static/images/ico_re.png"> [답변] ' + data.sj /*+ commentCount*/ +'</p>';	
					}else{
						dataMobTr += '<p class="subject">' + data.sj /*+ commentCount*/ +'</p>';				
					}
					
					dataMobTr += '    <p class="nameDate">';
					dataMobTr += '      <span><strong>조회수</strong> '+data.rdcnt+'</span>';
					dataMobTr += '      <span><strong>작성자</strong> '+data.userNm+'</span>';
					dataMobTr += '      <span><strong>등록일</strong> '+data.registDt+'</span>';
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

function fn_postView(obj) {
	$("#crud").val('r');
	$("#sn").val(obj);
	$("#searchForm").attr("action", '/board/listView.do?val='+$("#masterSn").val());
	$("#searchForm").submit();
}



	
	