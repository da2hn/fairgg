$(document).ready(function() {
	var params = {};

	fnGetSyncAjaxData("/menu/selectMenuList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#menuDiv").html(fn_makeMenuHtml(_data.menuList));
			fn_makeQustnrHtml(_data.qustnrList);
			$("#menuDivMob").html(fn_makeMenuHtmlMob(_data.menuList,_data.qustnrList));
			$("#mainMenuMob").html(fn_makeMainMenuMob(_data.menuList));
		} else {
			alert("menu_error:" + _data.resultMsg);
		}
	});
	
	
	//브랜드 통합검색 - 업종 검색 옵션(대분류) 세팅
	fnGetAjaxData("/comcode/selectFranchLclasList.ajax", {}, function(_data) {
		$(".schLdClass").empty();
		$("#brandLdClassMob").empty();
		_data.franchLclasList.forEach(function(row,idx){
			if( row.lclasIndutyCode == "LC00" || row.lclasIndutyCode == "전체"){
				$(".schLdClass").append('<option value="">' + row.lclasIndutyNm + '</option>');
				$("#brandLdClassMob").append('<option value="">업종 대분류</option>');
			}else{
				$(".schLdClass").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
				$("#brandLdClassMob").append('<option value="' + row.lclasIndutyCode + '">' + row.lclasIndutyNm + '</option>');
			}
		});
	});
});

function fn_makeMenuHtml(menuList) {
	var html = [];
	html.push("<ul>\n");
	var menuIdx;
	var selectedClass = " ";
//	var iClass = " ";
//	var hiddenClass = " ";

//	genMenuId($("#fullURL").val());
	var bbsUrl;
	fnGetAjaxData("/board/selectIntegBbsUrl.ajax", {}, function(_data){
		if(_data.resultCode == 'success'){
			bbsUrl = _data.bbsUrl;
		}else{
			alert(_data.resultMsg);
		}
	});

	for (menuIdx = 0; menuIdx < menuList.length; menuIdx++) {
//		console.log(menuList[menuIdx]);
		var subMenuCnt = menuList[menuIdx].subMenuCnt;
		var menuOrdr = menuList[menuIdx].menuOrdr;
		var menuGroupNm = menuList[menuIdx].menuGroupNm;
		var menuGroupCode = menuList[menuIdx].menuGroupCode;
		var menuNm = menuList[menuIdx].menuNm;
		var menuCode = menuList[menuIdx].menuCode;
		var menuUrl = menuList[menuIdx].menuUrl;

		var menuCheck = menuCode.split('_');		
		var codeCheck = menuUrl.split('=');	

		if (menuOrdr == 1) {
			html.push("<li class=\""+menuGroupCode+"\">");
			// 정보지원게시판 대메뉴 클릭시 정보지원게시판으로 - 21.04.09
			var tf = false;
			for (var i = 0; i < menuList.length; i++) {
				if(menuGroupCode == "U05" && menuList[i].menuGroupCode == "U05" && menuList[i].menuGroupNm == "정보지원게시판" && menuList[i].menuUrl == "/board/integ/integList.do") {
					tf = true;
					break;
				} 
			}
			html.push("<a class=\"sel\" href=\""+(tf ? bbsUrl : menuUrl)+"\">");
			/*html.push("<a class=\"sel\" href=\""+(tf ? "/board/infoOpen/infoOpenList.do" : menuUrl)+"\">");*/
			html.push("<span>"+menuGroupNm+"</span></a>\n");
			html.push("<div class=\""+menuGroupCode+selectedClass+" dep2\">\n");
		}
		
		if(menuCheck[0] == 'menu'){
			continue;
		}
		
		if(menuGroupCode == "U05" && menuList[i].menuGroupCode == "U05" && menuList[i].menuGroupNm == "정보지원게시판" && menuNm == "통합게시판") {
			html.push("<a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+bbsUrl+"\">"+menuNm+"</a>\n");
		}else{
			if(menuCode != 'U0102' && menuCode != 'U0101'){
				html.push("<a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a>\n");	
			}
			/*html.push("<a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a>\n");*/	
		}

		if(subMenuCnt == menuOrdr){
			html.push("</div>\n");
			html.push("</li>\n")
		}
	}		
	html.push("</ul>\n");
	return html.join("");
}

function fn_makeMenuHtmlMob(menuList, qustnrList) {
	var html = [];
	html.push("<ul>\n");
	var menuIdx;
	var selectedClass = " ";
	
	var bbsUrl;
	fnGetAjaxData("/board/selectIntegBbsUrl.ajax", {}, function(_data){
		if(_data.resultCode == 'success'){
			bbsUrl = _data.bbsUrl;
		}else{
			alert(_data.resultMsg);
		}
	});

	var menuCheck = {}
	for (i = 0; i < menuList.length; i++) {
		if (menuList[i].menuGroupCode in menuCheck) {
			menuCheck[menuList[i].menuGroupCode] = true;
			menuCheck[menuList[i].menuGroupCode + '_Cnt'] = menuList[i].menuOrdr;
		}else{
			menuCheck[menuList[i].menuGroupCode] = false;
		}
		menuCheck[menuList[i].menuGroupNm] += 1; 
	}
	
	var menuNow = ""; 
	
	for (menuIdx = 0; menuIdx < menuList.length; menuIdx++) {
		var subMenuCnt = menuList[menuIdx].subMenuCnt;
		var menuOrdr = menuList[menuIdx].menuOrdr;
		var menuGroupNm = menuList[menuIdx].menuGroupNm;
		var menuGroupCode = menuList[menuIdx].menuGroupCode;
		var menuNm = menuList[menuIdx].menuNm;
		var menuCode = menuList[menuIdx].menuCode;
		var menuUrl = menuList[menuIdx].menuUrl;
		
		if (menuGroupCode == "U10"){
			if(qustnrList.length > 0){
				html.push('<li class="hassub">\n');
				html.push('<p>' + menuGroupNm + '</p>\n');
				html.push('<ul class="sub">\n');
				for(j=0; j<qustnrList.length; j++){
					html.push("<li><a class=\""+menuGroupCode+"\" id=\""+menuGroupCode+"_"+qustnrList[j].qustnrSn+"\" href=\""+qustnrList[j].menuUrl+"\">"+qustnrList[j].qustnrSj+"</a></li>\n");
				}
				html.push("</ul>\n");
				html.push("</li>\n");
			} else {
				html.push('<li>\n');					
				html.push("<a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a>\n");
				html.push("</li>\n")
			}
		} else {			
			if (menuOrdr == 1) {
				if(menuCheck[menuGroupCode]){
					html.push('<li class="hassub">\n');
					html.push('<p>' + menuGroupNm + '</p>\n');
					html.push('<ul class="sub">\n');
					if(subMenuCnt > 1){
						if(menuGroupCode == "U05" && menuList[menuIdx].menuGroupCode == "U05" && menuList[menuIdx].menuGroupNm == "정보지원게시판" && menuNm == "통합게시판") {
							html.push("<li><a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+bbsUrl+"\">"+menuNm+"</a></li>\n");
						}else{
							html.push("<li><a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a></li>\n");
						}	
//						html.push('<li>\n');					
//						html.push("<a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a>\n");
//						html.push("</li>\n");
					}
				}else{
					html.push('<li>\n');					
					html.push("<a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a>\n");
				}
			}else{			
				var menuCheck_2 = menuCode.split('_');		

				if(menuCheck_2[0] == 'menu'){
					if(menuOrdr == menuCheck[menuGroupCode + '_Cnt']){
						html.push("</ul>\n");
					}
				}else{
					if(menuGroupCode == "U05" && menuList[menuIdx].menuGroupCode == "U05" && menuList[menuIdx].menuGroupNm == "정보지원게시판" && menuNm == "통합게시판") {
						html.push("<li><a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+bbsUrl+"\">"+menuNm+"</a></li>\n");
					}else{
						html.push("<li><a class=\""+menuGroupCode+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a></li>\n");
					}
					if(menuOrdr == menuCheck[menuGroupCode + '_Cnt']){
						html.push("</ul>\n");
					}			
				}
			}
			if(subMenuCnt == menuOrdr){
				html.push("</li>\n");
			}
		}
	}
	html.push("</ul>\n");
	return html.join("");
}
//메인화면 모바일 메뉴 추가
function fn_makeMainMenuMob(menuList) {
	var html = [];
	var menuIdx;

	var bbsUrl;
	fnGetAjaxData("/board/selectIntegBbsUrl.ajax", {}, function(_data){
		if(_data.resultCode == 'success'){
			bbsUrl = _data.bbsUrl;
		}else{
			alert(_data.resultMsg);
		}
	});
	
	for (menuIdx = 0; menuIdx < menuList.length; menuIdx++) {
		var subMenuCnt = menuList[menuIdx].subMenuCnt;
		var menuOrdr = menuList[menuIdx].menuOrdr;
		var menuGroupNm = menuList[menuIdx].menuGroupNm;
		var menuGroupCode = menuList[menuIdx].menuGroupCode;
		var menuNm = menuList[menuIdx].menuNm;
		var menuCode = menuList[menuIdx].menuCode;
		var menuUrl = menuList[menuIdx].menuUrl;
		
		if (menuOrdr == 1) {
/*			html.push('<div class="swiper-slide">\n');
			html.push("<button id=\""+menuCode+"\" onclick=location.href=\""+menuUrl+"\">"+menuNm+"</button>\n");
			html.push('</div>');
			*/
			if(menuGroupCode == "U05" && menuList[menuIdx].menuGroupCode == "U05" && menuList[menuIdx].menuGroupNm == "정보지원게시판" && menuNm == "통합게시판") {
				html.push('<div class="swiper-slide">\n');
				html.push("<button id=\""+menuCode+"\" onclick=location.href=\""+bbsUrl+"\">"+menuNm+"</button>\n");
				html.push('</div>');
			}else{
				html.push('<div class="swiper-slide">\n');
				html.push("<button id=\""+menuCode+"\" onclick=location.href=\""+menuUrl+"\">"+menuNm+"</button>\n");
				html.push('</div>');
			}
			
		}
	}
	return html.join("");
}

function fn_makeQustnrHtml(menuList){
	if(menuList.length > 0){		
		$(".U10 .dep2").html("");
		
		for (var i=0; i < menuList.length; i++) {
			$(".U10 .dep2").append('<a class="U10" title="'+menuList[i].qustnrSj+'" style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" href="'+menuList[i].menuUrl+'">'+menuList[i].qustnrSj+'</a>');
		}
	}
}

function genMenuId(fullURL){
	fullURL = fullURL.replace("//","/");
	var uri = fullURL.split("/");
	var currMenuPath = uri[1];
	if(uri[2].indexOf(".do") == -1){
		currMenuPath += "_"+uri[2];
	}
	return currMenuPath;
}

function fnLinkMode(cnntTyCode) {
	if (cnntTyCode == "N") {
		return "target=\"_blank\"";
	} else {
		return ""
	}
}

function fn_getCssNm(cssNm) {
	if (cssNm == null) {
		return "";
	} else {
		return cssNm;
	}
}