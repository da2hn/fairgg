$(document).ready(function() {
	fnGetSyncAjaxData("/menu/selectMobMenuList.ajax", {'menuGroupCode': $("#menuGroupCode").val()}, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#mobMenuDiv").html(fn_makeMobMenuHtml(_data.mobMenuList));
		} else {
			alert("menu_error:" + _data.resultMsg);
		}
	});

	$("#mobMenuDiv li > a").on("click", function(){
		if ( $(this).parent().hasClass("i") )
		{
			if ( $(this).parent().hasClass("selected"))
			{
				$(this).parent().removeClass("selected");
			}
			else
			{
				$(this).parent().parent().children().removeClass("selected");
				$(this).parent().addClass("selected");
			}
			return false;
		}
	});
});

//function fn_makeMyPageMenuHtml(menuList) {
//	var html = [];
//	html.push("<h4>마이페이지</h4>\n");
//	html.push("<ul>\n");
//	var menuIdx;
//	var selectedGroupClass = " ";
//	var selectedClass = " ";
//	var iClass = " ";
//	var hiddenClass = " ";
//	var currMenuId = genMenuId($("#fullURL").val());
//
//	for (menuIdx = 0; menuIdx < menuList.length; menuIdx++) {
//
//		var subMenuCnt = menuList[menuIdx].subMenuCnt;
//		var menuOrdr = menuList[menuIdx].menuOrdr;
//		var menuGroupNm = menuList[menuIdx].menuGroupNm;
//		var menuId = genMenuId(menuList[menuIdx].menuUrl);
//		var menuGroupCode = menuId.split("_")[0];
//		var menuNm = menuList[menuIdx].menuNm;
//		var menuCode = menuId.split("_")[1];
//		var menuUrl = menuList[menuIdx].menuUrl;
//		var currMenuGroupId = currMenuId.split("_")[0];
//
//		if(currMenuGroupId == menuGroupCode){
//			selectedGroupClass = " selected";
//		}else{
//			selectedGroupClass = " ";
//		}
//
//		if(currMenuId.split("_")[1] == menuCode){
//			selectedClass = " selected";
//		}else{
//			selectedClass = " ";
//		}
//
//		if(subMenuCnt > 1){
//			iClass = " i";
//		}else{
//			iClass = " ";
//		}
//
//		if(subMenuCnt > 1){
//			if (menuOrdr == 1) {
//				html.push("<li class=\""+menuGroupCode+iClass+selectedGroupClass+"\"><a href=\"javascript:void(0)\">"+menuGroupNm+"</a>\n");
//				html.push("<div class=\""+menuGroupCode+selectedGroupClass+hiddenClass+" dep2\">\n");
//			}
//
//			html.push("<a class=\""+menuGroupCode+selectedClass+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a>\n");
//
//			if(subMenuCnt == menuOrdr){
//				html.push("</div>\n");
//				html.push("</li>\n")
//			}
//		}else{
//			html.push("<li class=\""+menuGroupCode+iClass+selectedClass+"\"><a href=\""+menuUrl+"\">"+menuGroupNm+"</a></li>\n");
//		}
//	}
//	html.push("</ul>\n");
//	return html.join("");
//}

function fn_makeMobMenuHtml(menuList) {
	var html = [];
	var html2 = [];
	html.push("<div class='swiper-wrapper'>\n");
	var menuIdx;
	var selectedGroupClass = " ";
	var selectedClass = " ";
	var iClass = " ";
	var hiddenClass = " ";
	var currMenuId = genMenuId($("#fullURL").val());
	
	var bbsUrl;
	fnGetAjaxData("/board/selectIntegBbsUrl.ajax", {}, function(_data){
		if(_data.resultCode == 'success'){
			bbsUrl = _data.bbsUrl;
		}else{
			alert(_data.resultMsg);
		}
	});
	
	$("#mobTab").html("");
	
	for (menuIdx = 0; menuIdx < menuList.length; menuIdx++) {

		var subMenuCnt = menuList[menuIdx].subMenuCnt;
		var menuOrdr = menuList[menuIdx].menuOrdr;
		var menuGroupNm = menuList[menuIdx].menuGroupNm;
		var menuId = genMenuId(menuList[menuIdx].menuUrl);
		var menuGroupCode = menuId.split("_")[0];
		var menuNm = menuList[menuIdx].menuNm;
		var menuCode = menuId.split("_")[1];
		var menuUrl = menuList[menuIdx].menuUrl;
		var currMenuGroupId = currMenuId.split("_")[0];
		var subMenuWidth = parseInt(100 / subMenuCnt);

		var menuCode_2 = menuList[menuIdx].menuCode
		var menuCheck = menuCode_2.split('_');		
		var codeCheck = menuUrl.split('=');	
		
		if($("#menuNm").val() == menuNm){
			selectedGroupClass = " active";
		}else{
			selectedGroupClass = " ";
		}

		if(currMenuId.split("_")[1] == menuCode){
			selectedClass = " active";
		}else{
			selectedClass = " ";
		}

		if(menuCheck[0] == 'menu'){
			continue;
		}
		
		if(subMenuCnt > 1){
			if(menuGroupCode == "integ" && menuList[menuIdx].menuGroupCode == "U05" && menuList[menuIdx].menuGroupNm == "정보지원게시판" && menuNm == "통합게시판") {
				html.push('<div class="swiper-slide"><button onclick="location.href=\''+bbsUrl+'\'" class="'+menuGroupCode+selectedGroupClass+'">'+menuNm+'</button></div>');
			}else{
			    html.push('<div class="swiper-slide"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedGroupClass+'">'+menuNm+'</button></div>');
			}
			/*html.push('<div class="swiper-slide"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedGroupClass+'">'+menuNm+'</button></div>');*/
		}else{
			if(menuGroupCode == "integ" && menuList[menuIdx].menuGroupCode == "U05" && menuList[menuIdx].menuGroupNm == "정보지원게시판" && menuNm == "통합게시판") {
				html.push('<div class="swiper-slide"><button onclick="location.href=\''+bbsUrl+'\'" class="'+menuGroupCode+selectedGroupClass+'">'+menuNm+'</button></div>');
			}else{
				html.push('<div class="swiper-slide"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedGroupClass+'">'+menuNm+'</button></div>');
			}
			/*html.push('<div class="swiper-slide"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedGroupClass+'">'+menuNm+'</button></div>');*/
		}
	}
	html.push("</div>\n");
	return html.join("");
}

function genMenuId(fullURL){
//	console.log("::" + fullURL);
	fullURL = fullURL.replace("//","/");
	var uri = fullURL.split("/");
	var currMenuPath = uri[2]+"_"+uri[3];
//console.log("currMenuPath::" + currMenuPath);
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
