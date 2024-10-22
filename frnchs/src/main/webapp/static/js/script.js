/* 토글 뷰 */
function toggle_view(selector, obj) {
	var detail = $('.' + selector + '');
	var obj = $(obj);

	if (detail.css('display') == 'none') {
		detail.addClass('active');
		obj.addClass('active');
	} else {
		detail.removeClass('active');
		obj.removeClass('active');
	}
}

/* 토글 뷰 딤드 */
function toggle_dimmed_view(selector, obj) {
	var detail = $('.' + selector + '');
	var obj = $(obj);

	if (detail.css('display') == 'none') {
		detail.addClass('active');
		obj.addClass('active');
		$('#dimmed').addClass('active');

		/* [M 2022-01-26] 추가 */
		var wW = window.innerWidth;
		if (wW < 751) { // 모바일용
			if (detail.find('.scroll_y').length > 0) {
				var height = detail.height();
				var titleH = detail.find('.titleArea').outerHeight(true);
				var inner = detail.find('.scroll_y');
				var btn = detail.find('.btn').outerHeight(true);

				inner.css({'height' : height - titleH - btn});
				inner.mCustomScrollbar();
			}
		}

		$('#dimmed').click(function() {
			detail.removeClass('active');
			$('#dimmed').removeClass('active');
		});
	} else {
		detail.removeClass('active');
		obj.removeClass('active');
		$('#dimmed').removeClass('active');
	}
}
/* 데이터리스트 토글 뷰 */
function dlToogle(obj) {
	var obj = $(obj);

	if (obj.hasClass('active') == false) {
		obj.addClass('active');
		obj.next().addClass('active');
	} else {
		obj.removeClass('active');
		obj.next().removeClass('active');
	}
}

/* 탭 뷰 */
function tab_over(name, no) {
	var tabs = $('.tab_' + name + '').find('li, .swiper-slide');

	tabs.each(function(idx) {
		var detail = $('.tabcnt_' + name + idx);
		var link = $(this).find('button, a');

		if (no == idx) {
			detail.addClass('active');
			link.addClass('active');
		} else {
			detail.removeClass('active');
			link.removeClass('active');
		}
	});
}

/* 뒤로 가기 */
function back() {
	//부모창 있는경우 현재창 닫기 아니면 뒤로가기 - 22.01.13 주한별	
	if(opener && !opener.closed) {//부모창이 있을경우
		window.close();
	} else {
		var agent = navigator.userAgent.toLowerCase();
		if(agent.indexOf("safari") != -1) {
			history.back(-1);
			return false;
		} else {			
			history.back();
		}
	}
	
//	if (document.referrer && document.referrer.indexOf("index.html") != -1) {
//		history.back();
//	} else {
//		location.href = "/index.html";
//	}
}

/* 전체메뉴 토글 */
function aside_toggle() {
	var aside = $('#aside');

	// var scrollPosition = window.pageYOffset;
	// console.log('init: ' + scrollPosition);

	if (aside.hasClass('active') == false) {
		// $('body').css({'overflow' : 'hidden', 'position' : 'fixed', 'top' : -scrollPosition, 'left' : 0, 'right' : 0});
		aside.addClass('active');
		$('#dimmed').show();

		$('#dimmed').click(function() {
			// $('body').css({'overflow' : 'visible', 'position' : 'relative', 'top' : 'auto', 'left' : 'auto', 'right' : 'auto'});
			// window.scrollTo(0, scrollPosition);
			// console.log('active: ' + scrollPosition);

			aside.removeClass('active');
			$(this).hide();
		});

		aside.find('.category .hassub > p').click(function() {
			if ($(this).hasClass('active') == false) {
				$(this).addClass('active');
				$(this).next().slideDown();
			} else {
				$(this).removeClass('active');
				$(this).next().slideUp();
			}
		});
	} else {
		// $('body').css({'overflow' : 'visible', 'position' : 'relative', 'top' : 'auto', 'left' : 'auto', 'right' : 'auto'});
		// window.scrollTo(0, scrollPosition);
		// console.log('remove: ' + scrollPosition);

		aside.removeClass('active');
		$('#dimmed').hide();
	}

	function initHeight() {
		var wH = window.innerHeight;
		var topH = aside.find('.topArea').outerHeight(true);
		var menuH = aside.find('.menu').outerHeight(true);

		aside.find('.category').css({'height' : wH - topH - menuH});
	}

	initHeight();

	$(window).resize(function() {
		initHeight();
	});
}

/* 활성화 */
function addActive(obj) {
	var obj = $(obj);

	if (obj.hasClass('active') == false) {
		obj.addClass('active');
	} else {
		obj.removeClass('active');
	}
}

$(document).ready(function() {
	$('.scroll_y2').mCustomScrollbar();
	
	//검색어 자동완성 체크 여부 확인
	//통합검색 자동완성 토글 설정
	var autoStat = localStorage.getItem("autoStat");
	if(autoStat == null || autoStat == undefined || autoStat == '0'){ 
		$('#autoSearch span').removeClass('active');
		$('#autoSearch button').parent().contents()[0].textContent = "OFF"
	} else {
		$('#autoSearch span').addClass('active');
		$('#autoSearch button').parent().contents()[0].textContent = "ON"
	}
});

//검색내역 목록 생성
//21.12.06 - 주한별
function fn_getMemberSchBranList(obj) {
	fnGetSyncAjaxData("/fran/selectSchBrandHistoryList.ajax", obj, function(data) {
		var html = '';
		html += '<ul>';
		if(data.resultCode == 'success'){
			$("#hist_delBtn").empty();
			$("#hist_box").empty();
			var dataList = data.frchsList;
			if(!!dataList && dataList.length != 0) {
				dataList.forEach(function (item, index){
					html += '<li style="cursor: pointer;" data-code="'+item.frnchsNo+'" data-year="'+item.year+'">';
					html += '<span>'+ item.schBrdWord +'</span>';							
					html += '<button type="button" onclick="fn_deleteSchBran('+ item.userNo +', '+item.frnchsNo+', this);" class="del" style=" width: 30px;height: 20px;position: absolute;right: 0;z-index: 99;top: 5px;font-size: 15px;color: #aca2a2;">&#215;</button>';//파라미터 schBrdNo, userNo 
					html += '</li>';
				});
			} else {
				html += '<p class="empty">최근 검색한 내역이 없습니다.</p>';
			}
		}
		html += '</ul>';
		var delBtn  = '최근검색어<br><button type="button" class="del" onclick="fn_deleteSchBran('+ obj.userNo +');">전체삭제</button>';
		$("#hist_delBtn").append(delBtn);
		$("#hist_box").append(html);
		
		$("#hist_box").children().children().each(function(){
	    	$(this).click(function(){
	    		//검색창 value 값 넣어주기
	    		var keywordTxt = $(this).find('span').text();
	    		$("#search").val(keywordTxt);
	    		$("#searchMob").val(keywordTxt);
	    		
	    		$('#hnd_schFrnchsNo').val($(this).data("code"));
	            $('#txt_schBrnd').val(keywordTxt);
	            $("#year").val($(this).data("year"));
	            $('#hist_box').children().remove();	
	            isComplete = true;
	            
	            $("#btn_sch").click();
	        });
	    });
	});
}

//검색내역 로컬스토리지 저장 (비회원 유저의 검색내역은 여기에서 조회하여 보여준다.) - 22.01.05 jhb
function setStorage(name, value) {
    var arr = getStorage(name);
    var array = new Array();
    if(arr != null) {
        for(var i = 0; i < arr.length; i++) {
        	array.push(arr[i]);//기존 데이터 넣기
    	}
        array.push(value);//신규데이터 넣기
        var result = array.filter(function(item1, idx1){
        	//filter() 메서드는 콜백함수에서 정의한 조건이 true인 항목만 리턴한다.(필터링)
            return array.findIndex(function(item2, idx){
            	//findIndex() 메서드는 콜백함수에 정의한 조건이 true인 항목의 index를 리턴한다.
                return item1.frnchsNo == item2.frnchsNo
            }) == idx1;
        });
        localStorage.setItem(name, JSON.stringify(result));
    } else {//처음
        array.push(value);        
        localStorage.setItem(name, JSON.stringify(array));
    }
};

//검색내역 로컬스토리지 조회 - 22.01.05 jhb
function getStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

//검색내역 로컬스토리지 삭제 - 22.01.05 jhb
function deleteStorage(no) {
	if(no == '0') {
		localStorage.removeItem("schHistArr");
		return;
	}
	
	var arr = getStorage('schHistArr');
	var itemToFind = arr.find(function(item) {
		return item.frnchsNo == no;
	});
	var idx = arr.indexOf(itemToFind);
	if(idx > -1){
		arr.splice(idx, 1);
	};
	 localStorage.setItem('schHistArr', JSON.stringify(arr));
}

//localStorage 검색내역 조회
function fn_getSchBranList(obj) {
	$("#hist_delBtn").show();
	//회원 사용자일 경우
	if(obj.userNo != '0') {
		fn_getMemberSchBranList(obj);
		return;
	}
	var arr = getStorage('schHistArr');
	var html = '';
	html += '<ul>';
	if(arr != null){
		$("#hist_delBtn").empty();
		$("#hist_box").empty();
		if(!!arr && arr.length != 0) {
			arr.forEach(function (item, index){
				html += '<li style="cursor: pointer;" data-code="'+item.frnchsNo+'" data-year="'+item.year+'">';
				html += '<span>'+ item.schBrdWord +'</span>';							
				html += '<button type="button" onclick="fn_deleteSchBran('+ item.userNo +', '+item.frnchsNo+', this);" class="del" style=" width: 30px;height: 20px;position: absolute;right: 0;z-index: 99;top: 5px;font-size: 15px;color: #aca2a2;">&#215;</button>';//파라미터 schBrdNo, userNo 
				html += '</li>';
			});
		} else {
			html += '<p class="empty">최근 검색한 내역이 없습니다.</p>';
		}
	} else {
		$("#hist_delBtn").empty();
		$("#hist_box").empty();
		html += '<p class="empty">최근 검색한 내역이 없습니다.</p>';
	}
	html += '</ul>';
	var delBtn  = '최근검색어<br><button type="button" class="del" onclick="fn_deleteSchBran('+ obj.userNo +');">전체삭제</button>';
//	$("#hist_delBtn").show();
	$("#hist_delBtn").append(delBtn);
	$("#hist_box").append(html);
	
	$("#hist_box").children().children().each(function(){
    	$(this).click(function(){
    		//검색창 value 값 넣어주기
    		var keywordTxt = $(this).find('span').text();
    		$("#search").val(keywordTxt);
    		$("#searchMob").val(keywordTxt);
    		
    		$('#hnd_schFrnchsNo').val($(this).data("code"));
            $('#txt_schBrnd').val(keywordTxt);
            $("#year").val($(this).data("year"));
            $('#hist_box').children().remove();	
            isComplete = true;
            
            $("#btn_sch").click();
        });
    });
}

function search_view() {
	var wW = window.innerWidth;
	var search = $('.layer_search');
	
	if (search.hasClass('active') == false) {
		var scrollPosition = window.pageYOffset;

		search.addClass('active');
		
		//통합검색 자동완성 토글 설정
		var autoStat = localStorage.getItem("autoStat");
		if(autoStat == null || autoStat == '0'){ 
			$('#autoSearch span').removeClass('active');
			$('#autoSearch button').parent().contents()[0].textContent = "OFF"
		} else {
			$('#autoSearch span').addClass('active');
			$('#autoSearch button').parent().contents()[0].textContent = "ON"
		}
		
		//최근 검색어 조회 21.12.06 - 주한별
		var userNo = $("#userNo").val() == '' ? '0' : $("#userNo").val();
		fn_getSchBranList({"userNo":userNo});

		if (wW > 750) { // pc
			$('html').click(function(e) {
				if ($(e.target).parents('.search').length < 1){
					search.removeClass('active');
				}
			});
		} else if (wW < 751) { // mo

		}
	} else {
		search.removeClass('active');
	}
}

$(window).scroll(function() {
	tabFix();
});

function tabFix() {
	var pos = $(window).scrollTop();
	var hdPos = $('#header').scrollTop();
	var tab = $('.fixTab');

	if (pos > hdPos) {
		tab.addClass('fixed');
	} else {
		tab.removeClass('fixed');
	}
}
// 무분별한 로딩으로 인한 주석처리 유한승
//$(window).resize(function() {
//	location.reload();
//});