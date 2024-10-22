$(document).ready(function() {
	//프랜차이즈 체험 신청 결과 팝업
	$("#btnReqExpr").on("click", function(){
		var params = {};
		params["exprnRegistNo"] = $("#exprnRegistNo").val();
		params["frnchsNo"] = $("#frnchsNo").val();
		$.ajax({
			/*dataType:"text",*/
			dataType:"html",
			type: "POST",
			url: "/expr/owner/ownerReqSaveResult.do",
			data:params,
			async: true,
			cache: false,
			success : function(data, status, request) {
				$("#popupDiv").html(data);
			},
		    error: function(request, status, error) {
	    		window.error = error;
				alert(error);
			}
		});
	});
});

