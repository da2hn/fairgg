$(document).ready(function() {
	$("#header").append("<h3 class='subtitle forMo'>회원가입</h3>");
	$('#footer').css("position","relative");
	$('#footer').css("top","30px");
	
	$(".mTab1 a").on("click",function(){
		$(".mTab1 a").removeClass("w1 selected");
		$("#"+this.id).addClass("w1 selected");

	});

	$("#labelAgreeAll").on("click", function(){
		$("#labelAgree1_1").prop("checked",$(this).is(":checked"));
		$("#labelAgree1_2").prop("checked",$(this).is(":checked"));
	});
	
	$("#labelAgree1_1").on("click", function(){
		if($("#labelAgree1_1").prop("checked",$(this).is(":checked"))){
			$("#labelAgreeAll").prop("checked",false);
		}
	});
	
	$("#labelAgree1_2").on("click", function(){
		if($("#labelAgree1_2").prop("checked",$(this).is(":checked"))){
			$("#labelAgreeAll").prop("checked",false);
		}
	});
});


function fnAgree(){
	if(!$("input:checkbox[id='labelAgree1_1']").is(":checked")){
		alert("이용약관 동의는 필수 선택입니다.");
		$("#labelAgree1_1").focus();
		return;
	}
	if(!$("input:checkbox[id='labelAgree1_2']").is(":checked")){
		alert("개인정보 수집 및 이용에 대한 안내는 필수 선택입니다.");
		$("#labelAgree1_2").focus();
		return;
	}

	var frm = $("<form></form>");
	frm.attr("name","frm");
	frm.attr("method","post");
	frm.attr("action","/user/joinForm.do");
	frm.append($('<input/>', {type: 'hidden', name: 'agreeYn', value:'Y' }));
	frm.append($('<input/>', {type: 'hidden', name: 'userType', value: $(".w1").attr("id")}));

	frm.appendTo("body");

	frm.submit();
}

function fnDisagree(){
	if(confirm("회원가입을 취소하고 메인화면으로 이동합니다")){
		location.href = "/";
	}
}