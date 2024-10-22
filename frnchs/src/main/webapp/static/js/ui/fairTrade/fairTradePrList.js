var txtArray = new Array();
var txtArray2 = new Array();
var txtArray3 = new Array();
var mySwiper;
var slideList;
var timer;
var count = 0;
function fn_createSwiper(tabType) {
	slideList = $("#"+tabType+" #video-swiper").find(".swiper-slide");
	mySwiper = new Swiper('#'+tabType+' .mFrans1 .swiper-container', {
    effect: 'slide',
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    observer: true, observeParents: true,
    pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
    on: {
    	slideChangeTransitionEnd: function() {
    	// Check all slides and initialize video players
			timer = null;
    		for (var i = 0; i < slideList.length; i++) {
    			if(i == mySwiper.activeIndex) {
	    			$(slideList[i]).find("video").get(0).currentTime = 0;
	    			if((window.navigator.userAgent.toLowerCase().indexOf('chrome') > 0 || window.navigator.userAgent.toLowerCase().indexOf('safari') > 0) && count == 0) {
	    				$(slideList[i]).find("video").get(0).muted = true;
	    				count++;
	    			} else {
	    				$(slideList[i]).find("video").get(0).muted = false;
	    			}
	    			$(slideList[i]).find("video").get(0).play();
					$(slideList[i]).find("video").off("ended").on("ended", function() {
						if(slideList.length == (mySwiper.activeIndex+1)) {
							mySwiper.slideTo(0,0);
						} else {
							mySwiper.slideNext(1);
						}
					})
    			} else {
	    			$(slideList[i]).find("video").get(0).pause();
    			}
			}
			$(".mList1").find("a").attr("class", "");
			$(".mList1").find("a:eq("+mySwiper.activeIndex+")").attr("class", "yellowLine");
      }
    }
  });

// 		fn_firstStartPlayer();
// 		$("#btn").trigger("click");

	var videoTxt = '';
	videoTxt += '<div class="txtBg">';
	videoTxt += '	<strong class="ti" id="videoTxtTi"></strong>';
	videoTxt += '	<div class="tx" id="videoTxtTx"></div>';
	videoTxt += '</div>';

	$("#"+tabType+" .videoTxt").html(videoTxt);

}


function fn_firstStartPlayer() {
	mySwiper.activeIndex = 0;
	mySwiper.emit("slideChangeTransitionEnd");
}

function fnSetVideoTxt(tabType,idx){
	var arr = null;
	if(tabType == "education") {
		arr = txtArray;
	}else if(tabType == "promotion") {
		arr = txtArray2;
	}else if(tabType == "normal") {
		arr = txtArray3;
	}
	
	if(arr.length == 0) {
		$("#"+tabType+" #videoTxtTi").html("등록된 영상이 없습니다.");
		$("#"+tabType+" #videoTxtTx").html("종료일이 지날 경우 목록에서 제외됩니다.");
		return false;
	};
	if(idx == undefined) {return false};
	
	$("#"+tabType+" #videoTxtTi").html(arr[idx].sj);
	$("#"+tabType+" #videoTxtTx").html(arr[idx].cn);
}

$(document).ready(function() {
	fn_createSwiper('education');
//	fn_createSwiper('promotion');
//	fn_createSwiper('normal');
	
	fnSetVideoTxt('education',0);
	
	fn_initVideo();
	
	$('ul.tab_video li button').click(function(){
		var tab_id = $(this).attr('data-tab');
		fn_createSwiper(tab_id);
//		mySwiper.slideTo(0,0);
		$(".mList1").find("a").removeClass("yellowLine");
		$(".mList1").find("a:eq(0)").attr("class", "yellowLine");
		$('ul.tab_video li button').removeClass('active');
		$('.tabcnt_video0').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
		
		fnSetVideoTxt(tab_id,0);
	});
	
	//mob
	$("ul.tab_videomoMob li button").click(function(){
		var tab_id = $(this).attr('data-tab');
		var id = $(this).attr("id");
		
		$('ul.tab_videomoMob li button').removeClass('active');
		
		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
		$(".list_video").empty();
		$("#fairTradeSeCode").val(id);
		fn_selectFairTradePrListMob(1);
	});
	
	$("#pagingMob").click(function(){
		if($("input[name=pageIndexMob]").val() == $("input[name=pageIndexMobMax]").val()){
			alert('마지막 페이지입니다.');
			return;
		}else{
			fn_selectFairTradePrListMob(Number($("input[name=pageIndexMob]").val())+1);
		}
	})
})

function fn_initVideo() {
	$("#fairTradeSeCode").val("FT01");
	fn_selectFairTradePrListMob(1);
};

function fn_selectFairTradePrListMob(pageIndex) {
	$("input[name=pageIndex]").val(!pageIndex ? 1 : pageIndex);
	$("input[name=pageIndexMob]").val(!pageIndex ? 1 : pageIndex);
	$.post('/fairTrade/fairTradePr/selectFairTradePrList.ajax',$("#searchForm").serialize()
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			if(!!dataList && dataList.length != 0) {
				var maxPage = (parseInt(data.resultCount/10) % data.resultCount);
				if((parseInt(data.resultCount) % 10) > 0){
					maxPage = maxPage + 1;
				}
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/' + maxPage + ')';
				var dataTr = "";
				dataList.forEach(function(data,idx){
					dataTr += '<li>';
					dataTr += '<div class="box">';
					dataTr += '<div class="video" style="padding-bottom: 0;">';
					dataTr += '<video width="100%" height="100%" style="min-height: 260px;" muted playsinline controls preload="metadata">';
					dataTr += '<source src="/file/downloadFile.do?atchmnflNo='+data.atchmnflNo+'&fileSn='+data.fileSn+'&fileKey='+data.fileKey+'#t=0.001" type="video/mp4">';
					dataTr += '</video>';
					dataTr += '</div>';
					dataTr += '<p class="subject">'+data.sj+'</p>';
					dataTr += '<p class="date">'+data.registDt+'</p>';
					dataTr += '</div>';
					dataTr += '</li>';
				})
				$(".list_video").append(dataTr);
			} else {
				$(".list_video").html('<p class="empty tac">등록된 영상이 없습니다.</p>');
				var maxPage = 1;
				var pagingText = '더보기(' + $("input[name=pageIndexMob]").val() + '/1)';
			}
			
			$("input[name=pageIndexMobMax]").val(maxPage);
			$("#pagingMob").text(pagingText);
		}else{
			alert(data.resultMsg);
		}
	});
}

$(window).load(function() {
	mySwiper.activeIndex = 0;
	mySwiper.emit("slideChangeTransitionEnd");
})