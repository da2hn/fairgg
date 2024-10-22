<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javascript" src="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
<link rel="stylesheet" type="text/css" href="/static/plugins/jquery.mCustomScrollbar/jquery.mCustomScrollbar.css">
<script type="text/javascript" src="/static/plugins/swiper/swiper.min.js"></script>
<link rel="stylesheet" href="/static/plugins/swiper/swiper.min.css">
<%-- <script type="text/javaScript" src="<c:url value="/static/js/ui/fran/promoList.js"/>"></script> --%>
<!-- body -->
<style>
iframe {
    margin-left: 20px;
}
.yellowLine {
	border: 1.5px solid #fbb807 !important;
}
</style>

<div class="gTitle5 type2">
	<div class="con1">
		<div class="bg">
			<h5 class="tit">경기도 상생가맹본부지원</h5>
			<p class="info">도내 프랜차이즈 산업의 발전과 상생문화 확산에 기여한 기업을 발굴 포상하여 업계의 노고를 위로, 격려하며 가맹본부와<br> 가맹점사업자의 경영활성화를 위한 홍보입니다.</p>
		</div>
	</div>
	<div class="con2">
		<div class="bg">
			<h6>추진절차 흐름도</h6>
			<ul class="type2">
			<li>
				<div class="ti"><span>기본계획 수립</span></div>
			</li>
			<li>
				<div class="ti"><span>조례 제정</span></div>
			</li>
			<li>
				<div class="ti"><span>평가위원회<br> 구성&middot;지표 개발</span></div>
			</li>
			<li>
				<div class="ti"><span>대상자 선발 및<br> 확정</span></div>
			</li>
			<li>
				<div class="ti"><span>공적심사의뢰</span></div>
			</li>
			<li>
				<div class="ti"><span>대상자 선발 및<br> 확정</span></div>
			</li>
			</ul>
		</div>
	</div>
</div>

<div class="body">
	<div class="bg">

		<!-- module -->
		<div class="mFrans1">
			<div class="mRoll1">
				<div id="video-swiper" class="swiper-container">
					<div class="swiper-wrapper">
						<c:forEach var="data1" items="${goodFrnchsAdiList}">
						<!-- slider -->
						<div class="swiper-slide">
<!-- 							<div class="img" style="background-image:url(/static/images/x_intro1.jpg);"></div> -->
								<c:if test="${!empty data1.youtubeMvpLinkKey }">
									<div class="video-container">
						              <div class="yt-player" data-id="${data1.youtubeMvpLinkKey }"></div>
						            </div>
								</c:if>
								<c:if test="${empty data1.youtubeMvpLinkKey && !empty data1.fileKey}">
									<div class="img" style="background-image:url(/file/downloadFile.do?atchmnflNo=${data1.atchmnflNo}&fileSn=${data1.fileSn }&fileKey=${data1.fileKey });"></div>
								</c:if>
						</div>
						<!-- //slider -->
						</c:forEach>
					</div>
					<!-- Add Pagination -->
					<div class="swiper-pagination"></div>
					<script type="text/javascript">
					// 2. This code loads the IFrame Player API code asynchronously.
					var tag = document.createElement('script');

					tag.src = "https://www.youtube.com/iframe_api";
					var firstScriptTag = document.getElementsByTagName('script')[0];
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

					 var players = [];
					 var mySwiper;
					 var timer;
					 var waitingTime = 30000;
					var playersId = [];
					var slideList;

					function onYouTubeIframeAPIReady() {
					  // Check all slides and initialize video players
					  var swiper = document.getElementById('video-swiper');
					  var slides = swiper.getElementsByClassName('swiper-slide');
					  var videoCnt = 0;

					  for (var i=0; i < slides.length; i++) {
					    var element = slides[i].getElementsByClassName('yt-player')[0];
					    var iCnt = i;
					    console.log(element);
					    console.log(playersId);
					    if(element != null){
						    var id = element.getAttribute('data-id');
						    var player = null;
						    player = new YT.Player(element, {
						      height: '416',
						      width: '713',
						      videoId: id,
						      playerVars: {
						        autoplay:true,
						        color: '#7fbc03',
						        modestbranding: true,
						        rel: 0
						      }
						    ,
						      events: {
						        'onReady': function(event){
								    playersId.push(event);
									console.log("pl:"+playersId.length+":"+players.length);
									console.log("pl2:"+$(slides).find(".yt-player").length);
									if(playersId.length == $(slides).find(".yt-player").length){
										console.log("유투브있음:"+id);
										fn_createSwiper();
									}
						        },
						        'onStateChange': onPlayerStateChange
						      }
						    });
						    players.push(player);
						    videoCnt++;
					    }
					    // 마지막 행에서 판단
					    if(slides.length == (i+1)){
			    			if($(slides).find(".yt-player").length == 0) {
			    				console.log(">>>> 유튜브없음");
						    	fn_createSwiper();
							}
			    		}
					  }


					  ////
					}

					function fn_createSwiper() {
						console.log("fn_createSwiper");
						
						slideList = $("#video-swiper").find(".swiper-slide");
// 						var noVideoCnt = slideList.length - videoCnt;
						console.log("zz1:"+(mySwiper == null));
						console.log("zz2:"+($(".swiper-pagination").height()));
						mySwiper = new Swiper('.mFrans1 .swiper-container', {
					    effect: 'slide',
					    spaceBetween: 0,
					    slidesPerView: 1,
					    centeredSlides: true,
					    observer: true, observeParents: true,
					    pagination: {
							el: '.swiper-pagination',
							clickable: true,
						},
// 					    loop: true,
// 						init: false,
					    on: {
					    	slideChangeTransitionEnd: function() {
					    	// Check all slides and initialize video players

					    		var vCount = 0;
					    		var iCount = 0;
				    			timer = null;
					    		for (var i = 0; i < slideList.length; i++) {
									if($(slideList[i]).find(".yt-player").length ==1) {
										console.log("영상"+i+",iCount:"+iCount+",activeIndex:"+mySwiper.activeIndex);
						    			if(i == mySwiper.activeIndex) {
											console.log("재생"+parseInt(i-iCount));
											console.log(players[parseInt(i-iCount)].playVideo());
						    			} else {
											console.log("멈춤"+parseInt(i-iCount));
						    				players[parseInt(i-iCount)].pauseVideo();
						    			}
						    			vCount++;
									} else {
										iCount++;
										console.log("이미지"+i);
										if(i == mySwiper.activeIndex) {
											console.log("타이머:"+slideList.length+":"+(i+1));
											if(slideList.length == (i+1)) {
												timer = setTimeout(function(){ mySwiper.slideTo(0,0); },waitingTime);
											} else {
												timer = setTimeout(function(){ mySwiper.slideNext(1); },waitingTime);
											}
										}
									}
									console.log(i+":"+$(slideList[i]).find("a").attr("class"));
								}
								$(".mList1").find("a").attr("class", "");
								$(".mList1").find("a:eq("+mySwiper.activeIndex+")").attr("class", "yellowLine");
					      }
					    }
					  });
						console.log("zz3:"+(mySwiper == null));
						mySwiper.activeIndex = 0;
						mySwiper.emit("slideChangeTransitionEnd");
// 						console.log("mySwiper.pagination");
// 						console.log(mySwiper.pagination.el);
// 						console.log(mySwiper.pagination.bullets);
// 						mySwiper.pagination.update();
					}
					function onPlayerStateChange(event){
						//동영상일때 재생 완료되면 다음 슬라이드로 이동
						if(event.data == YT.PlayerState.ENDED){
							(slideList.length == mySwiper.activeIndex) ? mySwiper.slideTo(0,1) : mySwiper.slideNext(1);
						} else if(event.data == YT.PlayerState.PLAYING){
							console.log("playing")
						}
					}

					function onPlayerReady(event){
						// Check all slides and initialize video players
						var swiper = document.getElementById('video-swiper');
						var slides = swiper.getElementsByClassName('swiper-slide')
			        	if(slides[0].getElementsByClassName('yt-player')[0] != null) {
		    				console.log("Aaaa1-1");
		    				console.log(event.target.playVideo());
		    				console.log("Aaaa1-1-1");
						} else {
		    				console.log("Aaaa1-2");
							timer = setTimeout(function(){
								mySwiper.slideNext(1);
							},waitingTime);
						}
						console.log("a"+i+":"+iCnt);
						if(iCnt == 0) {
							event.target.playVideo();
						}
					}

					function fnSetInfo(idx, videoCnt, b){
						if(players[videoCnt] != null && players[videoCnt] != undefined && players[videoCnt] != "undefined" && b){
							mySwiper.slideTo(idx, 1);
							// 실행외의것 멈춤
							if(players != null > players.length > 0) {
								for (var i = 0; i < players.length; i++) {
									if(i == videoCnt) {
										console.log("실행:"+videoCnt);
										players[videoCnt].playVideo();
									} else {
										console.log("멈춤:"+i);
										players[i].pauseVideo();
									}
								}
							}
						}else{
							mySwiper.slideTo(idx, 1);
							if(players != null > players.length > 0) {
								for (var i = 0; i < players.length; i++) {
									console.log("멈춤:"+i);
									players[i].pauseVideo();
								}
							}
							//이미지는 30초후 다음 슬라이드로 넘어감
							setTimeout(function(){
								mySwiper.slideNext(1);
							},waitingTime);
						}
					}
					</script>
				</div>
			</div>
			<div class="mList1 mCustomScrollbar">
				<ul>
				<c:set var="videoCnt" value="0"/>
				<c:forEach var="data" items="${goodFrnchsAdiList}" varStatus="status">
					<li>
<%-- 						<a href="javascript:fnSetInfo(${status.index }, ${videoCnt }, ${data.youtubeMvpLinkKey == '' ? false : true })"> --%>
						<a href="javascript:void(0);" onclick="mySwiper.slideTo(${status.index }, 0);">
							<span class="tit">${data.bsnSgnal }</span>
							<span class="txt">
								<span class="ls"><strong>업종 :</strong>${data.mlsfcIndutyNm }</span>
								<span class="ls"><strong>선정일 :</strong>${data.goodFrnchsSlctnDt }</span>
							</span>
						</a>
					</li>
					<c:if test="${!empty data.youtubeMvpLinkKey }">
						<c:set var="videoCnt" value="${videoCnt+1 }"/>
					</c:if>
				</c:forEach>
				</ul>
			</div>
		</div>
		<!-- //module -->
	</div>
</div>
<!-- //body -->