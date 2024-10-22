$(document).ready(function() {
	$("#btnModify").click(function() {
//		if(!infoRule($("#telno").val())) return;

		if($("#telno").val().length < 8){
			alert("올바른 전화번호를 입력해주세요.")
			return false;
		}
		
		/*var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		if(!emailRule.test($("#emailAdres").val())) {            
			alert("이메일 형식이 잘못되었습니다.")
			return false;
		}*/	
		
		if($("#userPw").val()){
			if($("#userPw").val() != $("#userPwRe").val()){
				alert("비밀번호를 확인해주세요.");
				return;
			}		
		}	
		
		if(!$("#userPw").val()){
			if($("#userPwRe").val()){
				alert("비밀번호를 확인해주세요.");
				return;
			}		
		}	
		
		if(confirm("가입정보를 수정하시겠습니까?")){
			fnGetAjaxData("/myPage/user/user/saveUserInfo.ajax", "userForm", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	$("#btnModifyMob").click(function() {
//		if(!infoRule($("#telno").val())) return;

		if($("#telnoMob").val().length < 8){
			alert("올바른 전화번호를 입력해주세요.")
			return false;
		}
		
		/*var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		if(!emailRule.test($("#emailAdresMob").val())) {            
			alert("이메일 형식이 잘못되었습니다.")
			return false;
		}	*/
		
		if($("#userPwMob").val()){
			if($("#userPwMob").val() != $("#userPwReMob").val()){
				alert("비밀번호를 확인해주세요.");
				return;
			}
		}
		
		if(!$("#userPwMob").val()){
			if($("#userPwReMob").val()){
				alert("비밀번호를 확인해주세요.");
				return;
			}		
		}	
		
		if(confirm("가입정보를 수정하시겠습니까?")){
			$("#userNm").val($("#userNmMob").val());
			$("#deptNm").val($("#deptNmMob").val());
			/*$("#emailAdres").val($("#emailAdresMob").val())*/
			$("#telno").val($("#telnoMob").val());
			$("#userPw").val($("#userPwMob").val());
			$("#userPwRe").val($("#userPwReMob").val());
			
			fnGetAjaxData("/myPage/user/user/saveUserInfo.ajax", "userForm", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	$("#btnDrop").click(function() {
		if(confirm("가입정보를 탈퇴하시겠습니까?")){
			fnGetAjaxData("/myPage/user/user/deleteUserInfo.ajax", "userForm", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					location.href='/logout.do';
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
	
	$("#btnDropMob").click(function() {
		if(confirm("가입정보를 탈퇴하시겠습니까?")){
			$("#userNo").val($("#userNoMob").val());
			fnGetAjaxData("/myPage/user/user/deleteUserInfo.ajax", "userForm", function(_data) {
				if(_data.resultCode == RESULT_SUCCESS){
					alert(_data.resultMsg);
					location.href='/logout.do';
				} else {
					alert(_data.resultMsg);
				}
			});
		}
	});
});

//이메일, 전화번호 유효성
function infoRule(telNo){
	/*var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	if(!emailRule.test(eMail)) {            
		alert("이메일 형식이 잘못되었습니다.")
		return false;
	}	*/
	if(telNo.length < 8){
		alert("올바른 전화번호를 입력해주세요.")
		return false;
	}
} 