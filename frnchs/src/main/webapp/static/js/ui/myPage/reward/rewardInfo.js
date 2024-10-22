$(document).ready(function() {
	
	$("#btnBack, #btnBackMob").click(function(){
		event.preventDefault();
		location.href = "/myPage/fran/reward/rewardList.do";
	});
	
	$("#btnModify").click(function() {
//		var rewardType = $("input[name=rewardType]").val() == 'Y' ? '수정': '저장';
		if(confirm("프랜차이즈 본사 상벌을 등록 하시겠습니까?")){
			if(!$("#rewardCount").val()){
				alert("수상횟수를 확인해주세요.");
				return;
			}
			if(Number($("#rewardCount").val()) > 100) {
				alert("수상횟수는 0 ~ 100회까지 가능합니다.");
				return;
			}
			if(!$("#rewardDt").val()){
				alert("수상일을 확인해주세요.");
				return;
			}
			if(!$.trim($("#rewardCn").val())){
				alert("게시내용을 확인해주세요.");
				return;
			}
			$.post('/myPage/fran/reward/insertReward.ajax',$("#dataForm").serialize()
			).done(function(data) {
				if(data.resultCode == RESULT_SUCCESS){
					alert(data.resultMsg);
					$("#reqForm").attr("action", '/myPage/fran/reward/rewardInfo.do');
					$("#reqForm").submit();	
				} else {
					alert(data.resultMsg);
				}
			});
		}
	});
	
	$("#btnMobModify").click(function() {
//		var rewardType = $("input[name=rewardType]").val() == 'Y' ? '수정': '저장';
		if(confirm("프랜차이즈 본사 상벌을 등록 하시겠습니까?")){
			if(!$("#rewardCountMob").val()){
				alert("수상횟수를 확인해주세요.");
				return;
			}
			if(Number($("#rewardCountMob").val()) > 100) {
				alert("수상횟수는 0 ~ 100회까지 가능합니다.");
				return;
			}
			if(!$("#rewardDtMob").val()){
				alert("수상일을 확인해주세요.");
				return;
			}
			if(!$.trim($("#rewardCnMob").val())){
				alert("게시내용을 확인해주세요.");
				return;
			}
			$.post('/myPage/fran/reward/insertReward.ajax',$("#dataFormMob").serialize()
			).done(function(data) {
				if(data.resultCode == RESULT_SUCCESS){
					alert(data.resultMsg);
					location.reload();
				} else {
					alert(data.resultMsg);
				}
			});
		}
	});
});
