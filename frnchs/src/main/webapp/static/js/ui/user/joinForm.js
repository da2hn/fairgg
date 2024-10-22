$(document).ready(function() {
	$("#header").append("<h3 class='subtitle forMo'>회원가입</h3>");
	//공통코드로 셀렉트박스 옵션 생성
	//fn_bindCodeListToSelOption("USER_SE_CODE", "userSeCode");//유저구분
	$('#footer').css("position","relative");
	$('#footer').css("top","30px");
	$("#btn_join").click(function() {

		if(!$("#userNm").val()){
			alert("이름은 필수 입력입니다.");
			return;
		}

		if(!$("#telno").val()){
			alert("전화번호는 필수 입력입니다.");
			return;
		}

		if($("#emailAdres1").val() && $("#emailAdres2").val()){
			$("#emailAdres").val($("#emailAdres1").val() + "@" + $("#emailAdres2").val());
			if(getEmailChk("emailAdres")){
				return;
			}
		}else{
			alert("이메일은 필수 입력입니다.");
			return;
		}

		if(!$("#userPw").val()){
			alert("비밀번호는 필수 입력입니다.");
			return;
		}

		if($("#userPw").val() != $("#userPwRe").val()){
			alert("비밀번호를 확인해주세요.");
			return;
		}

		if(!$("input:checkbox[id='labelAgree1_1']").is(":checked")){
			alert("이용약관과 개인정보처리방침에 동의해주세요.");
			return;
		}else{
			$("#useStplatAgreAt").val("Y");
		}

		if($("input:checkbox[id='labelAgree1_2']").is(":checked")){
			$("#marktRecptnAgreAt").val("Y");
		}else{
			$("#marktRecptnAgreAt").val("N");
		}

		var params = {};
		params["emailAdres"]  = $("#emailAdres").val();
		fnGetAjaxData("/user/chkEmailAdres.ajax", params, function(_data) {
			if(_data.resultCode == RESULT_SUCCESS){
				var resultCount = _data.resultCount;
				if(resultCount == 0){
					doJoin();
				}else{
					alert("이미 가입되었거나 탈퇴한 이메일 주소입니다. 관리자에게 문의바랍니다."); // 문구변경 - 22.04.22
					return;
				}
			} else {
				alert(_data.resultMsg);
			}
		});

	});
	//기관관리자일경우 부서입력할수 있도록
	$("#userSeCode").change(function(){
		if(this.value == "US04"){
			$(".deptClass").removeClass("hidden");
		}else{
			$(".deptClass").addClass("hidden");
		}
	});
});

function doJoin(){
	fnGetAjaxData("/user/joinUser.ajax", "frm_join", function(_data) {
		if(_data.resultCode == 'success'){
//			if (fObj != null) {
//				// 첨부파일 업로드 완료 처리
//				fObj.updateComplete();
//			}
			var frm = $("#frm_join");
			frm.attr("action","/user/joinComplete.do");
			frm.attr("method","post");

			frm.submit();
		} else {
			alert(_data.resultMsg);
		}
	});
}
