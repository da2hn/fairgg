$(document).ready(function() {
	var params = {};

	fnGetSyncAjaxData("/menu/selectMenuList.ajax", params, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			$("#menuDiv").html(fn_makeMenuHtml(_data.menuList));
		} else {
			alert("menu_error:" + _data.resultMsg);
		}
	});
	
	$(".popUpLink").off("click").on("click",function(e){
//		e.preventDefault();
 
		var pop = window.open($(this).attr('value'));
	});
});

function fn_makeMenuHtml(menuList) {
	var html = [];
	html.push("<dl>\n");
	var menuIdx;
	var selectedClass = " ";
	var currMenuId = $('#currMenuId').val();

	for (menuIdx = 0; menuIdx < menuList.length; menuIdx++) {
		if(currMenuId == menuList[menuIdx].menuCode || currMenuId.substr(0,3) == menuList[menuIdx].menuGroupCode){
			selectedClass = " selected";
//			alert(currMenuId + " // " + menuList[menuIdx].menuCode + " // " + menuList[menuIdx].menuGroupCode);
		}else{
			selectedClass = " ";
		}

		if (menuList[menuIdx].menuOrdr == 1) {
			html.push("<dt class=\""+menuList[menuIdx].menuGroupCode+selectedClass+"\"><a href=\""+menuList[menuIdx].menuUrl+"?menuId="+menuList[menuIdx].menuGroupCode+"01\">"+menuList[menuIdx].menuGroupNm+"</a></dt>\n");
		}
		html.push("<dd class=\""+menuList[menuIdx].menuGroupCode+selectedClass+"\">\n");

		if(currMenuId == menuList[menuIdx].menuCode){
			selectedClass = " selected";
		}else{
			selectedClass = " ";
		}
		
		if(menuList[menuIdx].menuCode == 'A0204'){
			html.push("<a class=\""+menuList[menuIdx].menuGroupCode+selectedClass+" popUpLink\" id=\""+menuList[menuIdx].menuCode+"\" href=\"#\" value=\""+menuList[menuIdx].menuUrl+"\">");
		} else {
			html.push("<a class=\""+menuList[menuIdx].menuGroupCode+selectedClass+"\" id=\""+menuList[menuIdx].menuCode+"\" href=\""+menuList[menuIdx].menuUrl+"?menuId="+menuList[menuIdx].menuCode+"\">");
		}
		html.push(menuList[menuIdx].menuNm+"</a>\n</dd>\n");

	}
	html.push("</dl>\n");

	return html.join("");
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
