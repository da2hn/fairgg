$(document).ready(function() {
	$("#header").append("<h3 class='subtitle forMo'>로그인</h3>");
	
	(function($) {
		$.ajaxSetup({
			beforeSend : function (xhr,settings) {
				xhr.setRequestHeader ( 'AJAX' , true );
				console.log ( 'ajax beforeSend' );
			}
			,error : function (xhr, status, err) {
				if (xhr.status == 400){
					console.log ( '400' );
					alert('만료된 페이지입니다. 다시 시도해주세요.');
				} else if (xhr.status == 401){
					console.log ( '401' );
					alert('로그아웃되었습니다. 다시 로그인 해주세요.');
				} else if (xhr.status == 403) {
					console.log ( '403' );
					console.log(xhr);
				} else if (err == 'Service Unavailable') {
					console.log ( 'Service Unavailable' );
				} else {
					console.log ( 'error else' );
				}
				console.log ( 'ajax error' );
			}
			,complete : function () {
				console.log ( 'ajax complete' );
			}
		});
	})(jQuery);

	$("#btn_login").click(function() {
		var form = document.frm_login;
		form.action = "/user/login.do";
		form.submit();

	});

	$("#btnFind").click(function() {

		if(!$("#emailAdres").val()){
			alert("이메일을 입력해주세요.");
			return;
		}
		if(!$("#userNm").val()){
			alert("이름을 입력해주세요.");
			return;
		}
		if(!$("#telno").val()){
			alert("전화번호를 입력해주세요.");
			return;
		}

		var params = {};
		params["emailAdres"]  = $("#emailAdres").val();
		params["userNm"]  = $("#userNm").val();
		params["telno"]  = $("#telno").val();
		fnGetAjaxData("/user/findUserPw.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				alert(_data.resultMsg);
				$("#pwPopup").hide();
			} else {
				alert(_data.resultMsg);
			}
		});

	});
	$("#userPw").keyup(function(e){
		if(e.keyCode == 13) fn_login();
	});
});

function fn_login(){
// 	commonProgressBarOn();
	$.post("/loginSecurity.do",
		{ 'userId' : btoa($("#userId").val()) , 'userPw' : btoa($("#userPw").val()) }
	).done(function(data) {
		data = jQuery.parseJSON(data);
		if(data.result == 'success'){
			document.location.href = data.returnUrl;
		}else{
			console.log(data);
			alert(data.msg);
		}
	})
}
function fn_agree(){
	var frm = $("<form></form>");
	frm.attr("name","frm");
	frm.attr("method","post");
	frm.attr("action","/user/joinForm.do");

	frm.appendTo("body");

	frm.submit();
}
