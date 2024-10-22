<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript">
function fn_popup(param){
	fnGetAjaxData("/selectPopupMngInfo.ajax", param, function(_data) {
		if(_data.resultCode == RESULT_SUCCESS){
			var data = _data.result;
			
			var div, imgDiv, cont, imgArea, img, bott, p, input;
			
			div = $('<div id="mngPopup_'+data.popupNo+'" class="layer_modal layer_modal_2 imgntxt">');
			div.css("top",data.popupWidthLc);
			div.css("left",data.popupVrticlLc);
			
			cont = $('<div class="inner">');
			cont.css("width",data.popupWidthMg);
			cont.css("height",data.popupVrticlMg);
			imgDiv = $('<div class="img">');
				if(data.atchmnflNo){
					img = $('<img src="/file/downloadFile.do?fileKey='+data.fileKey+'&fileSn='+data.fileSn+'&atchmnflNo='+data.atchmnflNo+'" >');
					if(data.imgLink){
						imgArea = $('<a href="'+data.imgLink+'" target="_blank">');
						imgArea.append(img);
						imgDiv.append(imgArea);
						cont.append(imgDiv);
					} else {
						imgDiv.append(img);
						cont.append(imgDiv);
					}
				}
				
				//} else {
				if(data.cn){
					cont.append('<div class="txt">'+data.cn+'</div>');
				}
				//}
				div.append(cont);
				
				bott = $('<div class="btn">');
				
				p = $('<p class="box_checkbox">');
				input = $('<input type="checkbox" name="popChk_+'+data.popupNo+'" id="popChk_'+data.popupNo+'" class="hidden left">');
				input.click(data,function(res){
					var info = res.data;
					console.log(info);
				});
				p.append(input);
				p.append('<label for="popChk_'+data.popupNo+'">오늘 하루 보지 않기</label>');
				bott.append(p);
				
				bott.append('<div class="box_btn"><button onclick="fn_closePopup('+data.popupNo+');">닫기</button></div>');
				
				div.append(bott);
								
				$("#cnt").after(div);
		}
	});
}
function fn_closePopup(popupNo) {
	if($("#popChk_"+popupNo).is(":checked")){
        if($.cookie('popupCookie'+popupNo) == undefined){
            $.cookie('popupCookie'+popupNo, 'Y', { expires: 1, path: '/' });//쿠키생성
        }
	}
	$("#mngPopup_"+popupNo).remove();
}
</script>
<script>
	$(document).ready(function() {
		<c:forEach var="data" items="${popupList}" varStatus="status">
			var popupNo = '<c:out value="${data.popupNo}" />';
			var menuCode = '<c:out value="${data.menuCode}" />';
			<%-- 쿠키에 따른 열기 설정 - 21.03.08 --%>
			var popupCookie = 'popupCookie${data.popupNo}';
			if (typeof $.cookie(popupCookie) !== 'undefined'){
				if($.cookie('popupCookie${data.popupNo}') != "Y"){
					fn_popup({no:popupNo,code:menuCode});
				}
			}else{
				fn_popup({no:popupNo,code:menuCode});
			}
		</c:forEach>
	});
</script>
<input type="hidden" id="popReqUri" value="${fn:replace(req.requestURL, req.requestURI, '')}">