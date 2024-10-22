$(document).ready(function() {
	var params = {};

	fnGetSyncAjaxData("/menu/selectMyPageMenuList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#myPageMenuDiv").html(fn_makeMyPageMenuHtml(_data.myPageMenuList));
			$("#myPageMobMenuDiv").html(fn_makeMobMyPageMenuHtml(_data.myPageMenuList));
		} else {
			alert("menu_error:" + _data.resultMsg);
		}
	});

	$("#myPageMenuDiv li > a").on("click", function(){
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

function fn_makeMyPageMenuHtml(menuList) {
	var html = [];
	html.push("<h4>마이페이지</h4>\n");
	html.push("<ul>\n");
	var menuIdx;
	var selectedGroupClass = " ";
	var selectedClass = " ";
	var iClass = " ";
	var hiddenClass = " ";
	var currMenuId = genMenuId($("#fullURL").val());

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

		if(currMenuGroupId == menuGroupCode){
			selectedGroupClass = " selected";
		}else{
			selectedGroupClass = " ";
		}

		if(currMenuId.split("_")[1] == menuCode){
			selectedClass = " selected";
		}else{
			selectedClass = " ";
		}

		if(subMenuCnt > 1){
			iClass = " i";
		}else{
			iClass = " ";
		}

		if(subMenuCnt > 1){
			if (menuOrdr == 1) {
				html.push("<li class=\""+menuGroupCode+iClass+selectedGroupClass+"\"><a href=\"javascript:void(0)\">"+menuGroupNm+"</a>\n");
				html.push("<div class=\""+menuGroupCode+selectedGroupClass+hiddenClass+" dep2\">\n");
			}

			html.push("<a class=\""+menuGroupCode+selectedClass+"\" id=\""+menuCode+"\" href=\""+menuUrl+"\">"+menuNm+"</a>\n");

			if(subMenuCnt == menuOrdr){
				html.push("</div>\n");
				html.push("</li>\n")
			}
		}else{
			html.push("<li class=\""+menuGroupCode+iClass+selectedClass+"\"><a href=\""+menuUrl+"\">"+menuGroupNm+"</a></li>\n");
		}
	}
	html.push("</ul>\n");
	return html.join("");
}

function fn_makeMobMyPageMenuHtml(menuList) {
	var html = [];
	var html2 = [];
	html.push("<div class='swiper-wrapper'>\n");
	var menuIdx;
	var selectedGroupClass = " ";
	var selectedClass = " ";
	var iClass = " ";
	var hiddenClass = " ";
	var currMenuId = genMenuId($("#fullURL").val());
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

		if(currMenuGroupId == menuGroupCode){
			selectedGroupClass = " active";
		}else{
			selectedGroupClass = " ";
		}

		if(currMenuId.split("_")[1] == menuCode){
			selectedClass = " active";
		}else{
			selectedClass = " ";
		}


		if(subMenuCnt > 1){
			if (menuOrdr == 1) {
				html.push('<div class="swiper-slide"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedGroupClass+'">'+menuGroupNm+'</button></div>');
			}
			
			if(currMenuGroupId == menuGroupCode){
				if(menuNm == '체험 직영점 신청 현황'){
					$("#mobTab").append('<li style="width:calc('+subMenuWidth+'% + 1px"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedClass+'" style="padding:10px 20px">'+menuNm+'</button></li>');
				}else if(menuNm == '프랜차이즈 운영 일기장'){
					$("#mobTab").append('<li style="width:calc('+subMenuWidth+'% + 1px"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedClass+'" style="padding:10px 10px">'+menuNm+'</button></li>');
				}else if(menuNm == '프랜차이즈 정보'){
					$("#mobTab").append('<li style="width:calc('+subMenuWidth+'% + 1px"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedClass+'" style="padding:10px 10px">'+menuNm+'</button></li>');
				}else {
					$("#mobTab").append('<li style="width:calc('+subMenuWidth+'% + 1px"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedClass+'">'+menuNm+'</button></li>');
				}
			}
		}else{
			html.push('<div class="swiper-slide"><button onclick="location.href=\''+menuUrl+'\'" class="'+menuGroupCode+selectedGroupClass+'">'+menuGroupNm+'</button></div>');
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
