google.charts.load("current", {packages:['corechart']});
var count = 0;
var mySwiper;
var slideList;
var refreshIntervalId;
function fn_createSwiper() {
	slideList = $(".swiper_video").find(".swiper-slide");
	mySwiper = new Swiper('.swiper_video', {
    effect: 'slide',
    autoplay: {
		delay:5000,
		disableOnInteraction: false
	},
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    observer: true, observeParents: true,
    pagination: {
		el: '.swiper_video .swiper-pagination',
		clickable: true,
	},
    on: {
    	slideChange: function() {
    		if($(slideList[mySwiper.activeIndex]).find("video").get(0) != undefined){       
				if(!$(slideList[mySwiper.activeIndex]).find("video").get(0).paused) {
					mySwiper.autoplay.stop();
					return false;
				} else {
					$(slideList[mySwiper.activeIndex]).find("video").get(0).pause();
				}
    		}
        },
        sliderMove: function() {
        	if($(slideList[mySwiper.activeIndex]).find("video").get(0) != undefined){       
        		$(slideList[mySwiper.activeIndex]).find("video").get(0).pause();
        	}
        },
        touchMove: function() {
        	if($(slideList[mySwiper.activeIndex]).find("video").get(0) != undefined){        		
        		$(slideList[mySwiper.activeIndex]).find("video").get(0).pause();
        	}
        }
    }
  }
)};

$(document).ready(function(){
	var initParams = {};
	//psm - 현재 사용부분 X
//	initParams.year = "2019"; 
//	initParams.code = "A1"
	fnGetAjaxData("/stat/selectFranFullStatList.ajax", initParams, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
//			_data.franFullStatList.forEach(function(row,idx){
			_data.dataList.forEach(function(row,idx){
				//지도에 총 가맹점 수 세팅
				$(".r" + row.ctprvnCode).find(".c").text( gfnNumberWithCommas(Math.floor(Number(row.mrhstCoSum + row.droperCoSum))) );
			});
		} else {
			alert(_data.resultMsg);
		}
	});
	fn_selectTotalSwiper(1);
	fn_selectDataSwiper(1);
	$("#dataTbody").html('');
	fn_selectMobIntegList(1);
	events();
	
	//TOP100
	if($(document).width() <= 687) {
		fn_mainMobTopList();
		fnGetAjaxData("/main/selectCommonNoticeInfo.ajax", {"bbsNm" : "통합게시판"}, function(_data){
			if(_data.resultCode == 'success'){
				var dataList = _data.urlList;
				var val = dataList.bbsLc + dataList.masterSn;
				$("#integMore").attr("href", val);
			}else{
				alert(_data.resultMsg);
			}
		});
		
	} else {
		fn_mainWebTopList();
	}
	
	
	$(".swiper-slide").mouseover(function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
    });
	
	if($(document).width() <= 687) {
	 refreshIntervalId  = setInterval(function(){
		if(mySwiper) {			
			if(slideList[mySwiper.activeIndex] != undefined) {				
				if($(slideList[mySwiper.activeIndex]).find("video").get(0).paused){
					//영상종료 후 진행할 함수 입력부분
					$(slideList[mySwiper.activeIndex]).find("video").get(0).pause();
					mySwiper.autoplay.start();
					return;
				} else {
					mySwiper.autoplay.stop();
				}
			}
		}
	  },100);
	}
});

function fn_mainWebTopList() {
	fnGetAjaxData("/main/getTopHundredList.ajax", {}, function(_data) {
		$("#topList").empty();
		if(_data.resultCode == RESULT_SUCCESS){
			var topHtml = "";
			var data = division(_data.dataList, 5);
			data.forEach(function(row,idx){
				row.forEach(function(item, idx){	
					topHtml += '<div class="swiper-slide">';
					var year = item.year == null ? "" : item.year;
					topHtml += '<a style="cursor: pointer;" href=\'/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+ item.frnchsNo+'&brandYear='+year+'\';\" data-id="'+item.frnchsNo+'">';
//					topHtml += '<a style="cursor: pointer;" data-id="'+item.frnchsNo+'">';
					topHtml += '<span class="num">'+item.rn+'</span><p class="name">'+item.schBrdWord+'</p>';
					topHtml += '</a>';
					topHtml += '</div>';
				});
			});
			$("#topList").append(topHtml);
		} else {
			alert(_data.resultMsg);
		}
	});
};

function fn_mainMobTopList() {
	fnGetAjaxData("/main/getTopHundredList.ajax", {}, function(_data) {
		$("#topListMob").empty();
		if(_data.resultCode == RESULT_SUCCESS){
			var topHtml = "";
			var data = division(_data.dataList, 5);
			data.forEach(function(row,idx){
				row.forEach(function(item, idx){	
					topHtml += '<div class="swiper-slide">';
					var year = item.year == null ? "" : item.year;
					topHtml += '<a style="cursor: pointer;" href=\'/fran/search/unifiedSearchBrandInteg.do?frnchsNo='+ item.frnchsNo+'&brandYear='+year+'\';\" data-id="'+item.frnchsNo+'">';
//					topHtml += '<a style="cursor: pointer;" data-id="'+item.frnchsNo+'">';
					topHtml += '<span class="num">'+item.rn+'</span><p class="name">'+item.schBrdWord+'</p>';
					topHtml += '</a>';
					topHtml += '</div>';
				});
			});
			$("#topListMob").append(topHtml);
		} else {
			alert(_data.resultMsg);
		}
	});
};

//array 특정 갯수로 자르기
function division(arr,n) {
	var len = arr.length;
	var cnt = Math.floor(len/n) + (Math.floor(len % n) > 0 ? 1 : 0);
	var tmp = [];
	for(var i = 0; i < cnt; i++) {
		tmp.push(arr.splice(0,n));
	}
	return tmp;
}

$(window).load(function(){
	slide_init();
	fn_getChartIntrst();
	fn_getChartFairUsage(); 
});

function slide_init(){
	var wW = $(window).width();

	// 상단 카테고리
	var swiper_category = new Swiper('.swiper_category', {
		freeMode: true,
		slidesPerView: 'auto',
		/* [M 2022-01-20] 수정 */
		// slidesPerView: 3,
		// spaceBetween: '10'
	});

//	var keymain = new Swiper('.mKeymain .swiper-container', {
//		autoplay: { delay:5000 },
//		loop: true,
//		navigation: {
//			nextEl: '.swiper-button-next',
//			prevEl: '.swiper-button-prev',
//		},
//	});
	// 비주얼슬라이드
	var keymain = new Swiper('.mKeymain .swiper-container', {
		autoplay: {
			delay:5000
		},
		loop: true,
		navigation: {
			nextEl: '.mKeymain .swiper-container .swiper-button-next',
			prevEl: '.mKeymain .swiper-container .swiper-button-prev',
		},
		pagination: {
			el: '.mKeymain .swiper-container .swiper-pagination',
			type: 'bullets',
		}
	});

	if (wW > 750) { // pc
//		// 통합게시판, 자료게시판
		$('.mMain5').find('.swiper_board').each(function() {
			var swiper_board = new Swiper($(this), {
				autoplay: {
					delay: 5000
				},
				pagination: {
					el: $(this).find('.swiper-pagination'),
					type: 'bullets',
					clickable: true,
				},
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
			});
		});

		// 인기 프랜차이즈 TOP10
		var swiper_keyword = new Swiper('.swiper_keyword', {
			direction: 'vertical',
			loop: true,
			slidesPerView: 10,
			slidesPerGroup: 10,
			grid: {
				rows: 5,
			},
			autoplay: {
				delay: 5000
			},
			pagination: {
//				el: '.top10 .swiper-pagination',
//				type: 'bullets',
				clickable: true,
			},
			on: {
				init: function() {
				}
			}
		});
	} else if (wW < 751) { // mo
//		// 경기도 소식
//		var swiper_news = new Swiper('.swiper_news', {
//			loop: true,
//			navigation: {
//				prevEl: '.news .swiper-button-prev',
//				nextEl: '.news .swiper-button-next',
//			},
//			autoplay: {
//				delay: 5000
//			},
//		});

		// 금주의 인기검색
		var swiper_keyword = new Swiper('.swiper_keyword', {
//			loop: true,
//			loopAdditionalSlides: 1,
			freeMode: true,
			slidesPerView: 2.3,
			spaceBetween: 8,
			pagination: {
				el: '.swiper_keyword .swiper-pagination',
				type: 'progressbar'
			},
//			autoplay: {
//				delay: 5000
//			},
		});
		
		var swiper_franchise = new Swiper('.swiper_franchise', {
			direction: 'vertical',
			loop: true,
			slidesPerView: 5,
			slidesPerGroup: 5,
			grid: {
				rows: 5,
			},
			autoplay: {
				delay: 5000,
			},
			on: {
				init: function () {
				},
			},
		});
	}		

	// 경기도 공정거래 홍보관
//	var swiper_video = new Swiper('.swiper_video', {
//		loop: true,
//		pagination: {
//			el: '.swiper_video .swiper-pagination',
//			// type: 'bullet'
//		},
//		autoplay: {
//			delay: 5000
//		},
//	});
	fn_createSwiper();
	// 협력사
	var main6 = new Swiper('.mMain6 .swiper-container', {
		autoplay: { delay:5000 },
		slidesPerView: 6,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.mMain6 .swiper-button-next',
			prevEl: '.mMain6 .swiper-button-prev',
		},
	});
}

function fn_getChartIntrst() {
	$.post('/main/getChartIntrst.ajax'
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			var topNameList = data.topNameList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = new Array();
//				dataTr.push(['','외식', '도소매', '서비스']);
				dataTr.push(['',topNameList[0].topfivenm, topNameList[1].topfivenm, topNameList[2].topfivenm, topNameList[3].topfivenm, topNameList[4].topfivenm]);
				dataList.forEach(function(data,idx){
					dataTr.push(Object.values(data));
				});
				drawChart1(dataTr);
			} else {
			}
		}else{
			alert(data.resultMsg);
		}
	});
}

function fn_getChartFairUsage() {
	$.post('/main/getChartFairUsage.ajax'
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = new Array();
//				dataTr.push(['날짜','일반사용자','컨설턴트','브랜드관리자','접속합산']);
//				dataTr.push(['날짜','시스템사용자 현황','접속합산']);
				dataTr.push(['날짜','로그인사용자수','시스템접속합산']);
//				dataTr.push(['날짜','시스템사용자 현황']);
				dataList.forEach(function(data,idx){
					dataTr.push(Object.values(data));
				});
				drawChart2(dataTr);
			} else {
			}
		}else{
			alert(data.resultMsg);
		}
	});
}

function events(){
	$("#paging").click(function(){
//		if($("input[name=pageIndex]").val() == $("input[name=pageIndexMax]").val()){
//			alert('마지막 페이지입니다.');
//			return;
//		}else{
//			if($("#dataTbody").children().length < 10) {//최대 10개 제한				
//				fn_selectMobIntegList(Number($("input[name=pageIndex]").val())+1);
//			} 
//		}
		var val = "";
		fnGetAjaxData("/main/selectCommonNoticeInfo.ajax", {"bbsNm" : "통합게시판"}, function(_data){
			if(_data.resultCode == 'success'){
				var dataList = _data.urlList;
				val = dataList.bbsLc + dataList.masterSn;
			}else{
				alert(_data.resultMsg);
			}
		});
		location.href = val;
	});
	
}
//통합게시판 조회 swiper 22.06.13 - 김진호
function fn_selectTotalSwiper(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/board/integ/selectTotalSwiper.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				var bbsNm = 1;
				var limitSwiper = dataList.length < 5 ? 0 : dataList.length < 9 ? 1 : dataList.length < 13 ? 2 : dataList.length < 17 ? 3 : 4;
				for( var i=0 ; i<=limitSwiper ; i++){
					var lastRow = dataList.length % 4 == 1 ? (i+1)*4-3 : dataList.length % 4 == 2 ? (i+1)*4-2 : dataList.length % 4 == 3 ? (i+1)*4-1 : (i+1)*4;
		            dataTr += '<div class="swiper-slide">';
		            dataTr += 	'<ul>';
		            if(i == limitSwiper){
		            	for(var j=i*4 ; j<lastRow ; j++){
		            		dataTr +=	'<li><a href="javascript:void(0);" onclick="fn_noticeView('+dataList[j].bbsSn+','+bbsNm+')">'+ dataList[j].sj +'</a></li>';
		            	} 
		            }else {
		            	for(var j=i*4 ; j<(i+1)*4 ; j++){
		            		dataTr +=	'<li><a href="javascript:void(0);" onclick="fn_noticeView('+dataList[j].bbsSn+','+bbsNm+')">'+ dataList[j].sj +'</a></li>';
		            	} 
		            }
		            dataTr += 	'</ul>';
		            dataTr += '</div>';
		        }
				$("#mainTbodyL").append(dataTr);
			} else {
				$("#mainTbodyL").html('<p class="empty tac">등록된 내용이 없습니다.</p>');
			}
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
};

//자료게시판 조회 swiper 22.06.13 - 김진호
function fn_selectDataSwiper(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/board/integ/selectDataSwiper.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var dataTr = "";
				var bbsNm = 2;
				var limitSwiper = dataList.length < 5 ? 0 : dataList.length < 9 ? 1 : dataList.length < 13 ? 2 : dataList.length < 17 ? 3 : 4;
				for(var i=0 ; i<=limitSwiper ; i++){
					var lastRow = dataList.length % 4 == 1 ? (i+1)*4-3 : dataList.length % 4 == 2 ? (i+1)*4-2 : dataList.length % 4 == 3 ? (i+1)*4-1 : (i+1)*4;
					dataTr += '<div class="swiper-slide">';
					dataTr += 	'<ul>';
					if(i == limitSwiper){
						for(var j=i*4 ; j<lastRow ; j++){
							dataTr +=	'<li><a href="javascript:void(0);" onclick="fn_noticeView('+dataList[j].bbsSn+','+bbsNm+')">'+ dataList[j].sj +'</a></li>';
						} 
					}else {
						for(var j=i*4 ; j<(i+1)*4 ; j++){
							dataTr +=	'<li><a href="javascript:void(0);" onclick="fn_noticeView('+dataList[j].bbsSn+','+bbsNm+')">'+ dataList[j].sj +'</a></li>';
						} 
					}
					dataTr += 	'</ul>';
					dataTr += '</div>';
				}
				$("#mainTbodyR").append(dataTr);
			} else {
				$("#mainTbodyR").html('<p class="empty tac">등록된 내용이 없습니다.</p>');
			}
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
};

//통합게시판 조회
function fn_selectMobIntegList(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$.post('/board/integ/selectIntegList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
//				var pagingText = '더보기(' + $("input[name=pageIndex]").val() + '/' + maxPage + ')';
				var pagingText = '더보기';
				var dataMobTr = "";
				var bbsNm = 1;
				dataList.forEach(function(data,idx){
					//모바일에서는 상단 공지사항 최초 3개 이외에는 막기
					/*var firstNoticeTegCount = $("ul#dataTbody li div p.notice").length;
					if(firstNoticeTegCount == 3) {
						if(data.top == 1) {
							return;
						}
					}*/
					dataMobTr += '<li>';	
					dataMobTr += '<a href="javascript:void(0);" onclick="fn_noticeView('+data.bbsSn+','+bbsNm+')">';
					dataMobTr += '<div class="box">';					
					if(data.top == 1){
						dataMobTr += '<p class="category notice">공지사항</p>';
					}else {
						if(dateDiff(data.registDt) < 7){
							dataMobTr += '<p class="category">' + data.integSeNm + '&nbsp;&nbsp;<img src="/static/images/ico_new.png"></p>';
						} else {							
							dataMobTr += '<p class="category">' + data.integSeNm + '</p>';
						}
					}
					dataMobTr += '<p class="subject">' + data.sj +'</p>';
					dataMobTr += '<p class="date">' + data.registDt +'</p>';
					dataMobTr += '</div>';
					dataMobTr += '  </a>';
					dataMobTr += '</li>';
				})
				$("#dataTbody").append(dataMobTr);
			} else {
				$("#dataTbody").html('<p class="empty tac">등록된 내용이 없습니다.</p>');
				var maxPage = 1;
				var pagingText = '더보기(' + $("input[name=pageIndex]").val() + '/1)';
			}
			$("input[name=pageIndexMax]").val(maxPage);
			$("#pagingMob").text(pagingText);
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
};

function fn_noticeView(obj,type) {
	var val = "";
	var bbsSm = "";
	if(type == 1){
		bbsSm = "통합게시판";
	}else if(type == 2){
		bbsSm = "자료게시판";
	}
	fnGetAjaxData("/main/selectCommonNoticeInfo.ajax", {"bbsNm" : bbsSm}, function(_data){
		if(_data.resultCode == 'success'){
			var dataList = _data.urlList;
			val = dataList.masterSn;
			$("#bbsNm").val(dataList.bbsNm);
		}else{
			alert(_data.resultMsg);
		}
	});
	$("#crud").val('r');
	$("#sn").val(obj);
	$("#masterSn").val(val);
//	$("#schCodeVal").val($("#schCode").val());
//	$("#schTxtVal").val($("#schTxt").val());
	$("#reqForm").attr("action", '/board/listView.do?val='+val);
	$("#reqForm").submit();
}

//관심업종 TOP5(현황)
function drawChart1(obj) {
	var options = {
		width : 360,
		height : 360,
		animation : {
			startup : true,
			duration : 1000,
			easing : 'out'
		},
		legend : {
			position : 'top',
			maxLines : 2
		},
		series : {
			0 : {color : '#fcc710'},
			1 : {color : '#769a52'},
			2 : {color : '#67706d'}
		},
		lineWidth : 4
	};
	var chart = new google.visualization.LineChart(document
			.getElementById('fav_top3'));
	var data = google.visualization.arrayToDataTable(obj);
	chart.draw(data, options);
}

//페어북 사용현황
function drawChart2(obj) {
	var options = {
		width : 400,
		height : 380,
//		vAxis : {
//			0 : {
//				title : '시스템사용자',
//			},
//            1 : {
//            	title : '접속사용자',
//            }
//		},
		animation : {
			startup : true,
			duration : 1000,
			easing : 'in'
		},
		legend : {
			position : 'top',
			alignment:'left',
			maxLines : 3
		},
		series : {
			0 : {type: "line",color : '#fcc710', targetAxisIndex: 0},
//			1 : {type: "line",color : '#769a52', targetAxisIndex: 0},
//			2 : {type: "line",color : '#67706d', targetAxisIndex: 0},
			1 : {
				color : '#90CFF9',
				type : 'bars',
				targetAxisIndex: 1 
			}
		},
		lineWidth : 4
	};
//	var chart = new google.visualization.ComboChart(document.getElementById('fair_usage'));
//	var data = google.visualization.arrayToDataTable(obj);
//	chart.draw(data, options);
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
