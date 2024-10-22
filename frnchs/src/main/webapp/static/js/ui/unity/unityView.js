var fObj = null;
var mfObj = null;

function getParameterByName(name) { 
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); 
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), 
	results = regex.exec(location.search); 
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); 
}


$(document).ready(function() {

	if($("#bbsNm").val() == '통합게시판'){ //통합게시판
		
		$("#btn_answer").css("display", "none");
		$('#btn_answerMob').css("display", "none");
		$("#btn_updt").css("display", "none");
		$('#btn_updtMob').css("display", "none");
		$('#btn_delete').css("display", "none");
		$('#btn_deleteMob').css("display", "none");
		$(".commentArea").css("display", "none");
		
	}else {
		
		if(!$("#ssUserNo").val()){ //로그인 안함 
			
			$("#btn_answer").css("display", "none");
			$('#btn_answerMob').css("display", "none");
			$("#btn_updt").css("display", "none");
			$('#btn_updtMob').css("display", "none");
			$('#btn_delete').css("display", "none");
			$('#btn_deleteMob').css("display", "none");
			
		}else if(($("#registUserNo").val() != $("#ssUserNo").val())){//글쓴이와 로그인 유저가 같지 않음 
			
			$("#btn_updt").css("display", "none");
			$('#btn_updtMob').css("display", "none");
			$('#btn_delete').css("display", "none");
			$('#btn_deleteMob').css("display", "none");
			if($("#answerAt").val() == 'N'){
				$("#btn_answer").css("display", "none");
				$('#btn_answerMob').css("display", "none");
			}else{
				$("#btn_answer").css("display", "inline-block");
				$('#btn_answerMob').css("display", "block");
			}
			
		}else{//글쓴이와 로그인 유저가 같음 
			$("#btnBox").css("display", "inline-block");
			$("#btnBoxMob").css("display", "block");
			$("#btn_answer").css("display", "none");
			$('#btn_answerMob').css("display", "none");
		}
		
		if($("#atchmnflAt").val()=='N'){
			$("#atchFileBox").css("display", "none");
		}else{
			$("#atchFileBox").css("display", "block");
		}
		
		if($("#commentAt").val() == 'N'){
			$(".commentArea").css("display", "none");
		}else{
			$(".commentArea").css("display", "block");
		}
	}

	$('#btn_list').click(function(){
		window.location.href = "/board/list.do?val=" + $("#masterSn").val();
	});
	
	$('#btn_listMob').click(function(){ //getParameterByName
		if($("#masterSn").val()) {
			window.location.href = "/board/list.do?val=" + $("#masterSn").val();
		} else {			
			var val = getParameterByName("val");
			window.location.href = "/board/list.do?val=" + val;
		}
	});
	
	$("#btn_answer").click(function(){
		var url = "/board/listModify.do?val=" + $("#masterSn").val();
		
		$("#crudUpdt").val('re');
		$("#updtForm").attr("action", url);
		$("#updtForm").submit();
	});
	
	$("#btn_answerMob").click(function(){
		var url = "/board/listModify.do?val=" + $("#masterSn").val();
		
		$("#crudUpdt").val('re');
		$("#updtForm").attr("action", url);
		$("#updtForm").submit();
	});
	
	$("#btn_updt").click(function(){
		if(!$("#ssUserNo").val()){
			alert("게시글을 수정하기 위해선 로그인이 필요합니다.");
			window.location.href = "/user/loginPage.do";
			return;
		}
		
		if($("#registUserNo").val() != $("#ssUserNo").val()){
			alert("작성자만 수정할 수 있습니다.");
			return;
		}else{
			$("#crudUpdt").val('u');
			$("#updtForm").attr("action", '/board/listModify.do');
			$("#updtForm").submit();
		}
		
	});
	
	$("#btn_updtMob").click(function(){
		if(!$("#ssUserNo").val()){
			alert("게시글을 수정하기 위해선 로그인이 필요합니다.");
			window.location.href = "/user/loginPage.do";
			return;
		}
		
		if($("#registUserNo").val() != $("#ssUserNo").val()){
			alert("작성자만 수정할 수 있습니다.");
			return;
		}else{
			$("#crudUpdt").val('u');
			$("#updtForm").attr("action", '/board/listModify.do');
			$("#updtForm").submit();
		}
	});
	
	$("#btn_delete").click(function(){
		if(!$("#ssUserNo").val()){
			alert("게시글을 삭제하기 위해선 로그인이 필요합니다.");
			window.location.href = "/user/loginPage.do";
			return;
		}
		
		if($("#registUserNo").val() != $("#ssUserNo").val()){
			alert("작성자만 삭제할 수 있습니다.");
			return;
		}else{
			$("#crudUpdt").val('d');
			if(confirm("삭제하시겠습니까?")){
				$.post('/board/unity/deleteUnityBoard.ajax',$("#updtForm").serialize()
				).done(function(data) {
					if(data.resultCode == 'success'){
						alert("게시글이 삭제되었습니다.");
						window.location.href = '/board/list.do?val='+$("#masterSn").val();
					}else{
						console.log("오류가 발생했습니다.");
						alert(data.resultMsg);
					}
				});
			}
		}
	});
	
	$("#btn_deleteMob").click(function(){
		if(!$("#ssUserNo").val()){
			alert("게시글을 삭제하기 위해선 로그인이 필요합니다.");
			window.location.href = "/user/loginPage.do";
			return;
		}
		
		if($("#registUserNo").val() != $("#ssUserNo").val()){
			alert("작성자만 삭제할 수 있습니다.");
			return;
		}else{
			$("#crudUpdt").val('d');
			if(confirm("삭제하시겠습니까?")){
				$.post('/board/unity/deleteUnityBoard.ajax',$("#updtForm").serialize()
				).done(function(data) {
					if(data.resultCode == 'success'){
						alert("게시글이 삭제되었습니다.");
						window.location.href = '/board/list.do?val='+$("#masterSn").val();
					}else{
						console.log("오류가 발생했습니다.");
						alert(data.resultMsg);
					}
				});
			}	
		}
	});
	
	$("#btn_comment_u").click(function(){
		if(!$("#ssUserNo").val()){
			alert("로그인 후에 댓글을 작성할 수 있습니다. ");
			return false;
		}
		
		if(!$.trim($("#upperComment").val())){
			alert("댓글을 작성해 주세요.");
			return false;
		}
		
		fn_insertBbsComment("upper");
		location.reload();
	});
	
	$("#btn_comment_m").click(function(){
		if(!$("#ssUserNo").val()){
			alert("로그인 후에 댓글을 작성할 수 있습니다. ");
			return false;
		}

		if(!$.trim($("#upperCommentMob").val())){
			alert("댓글을 작성해 주세요.");
			return false;
		}
		
		fn_insertBbsComment("upper");
		location.reload();
	});
	
	
	$(".btn_comment").click(function(){
		fn_insertBbsComment("lower",params);
	});

	if($("#atchmnflNo").val() == 0){
		$("#atchmnflNo").val(''); 
	}	
	
	var contentHeaderHTML = "";
	contentHeaderHTML += '<h3><span>'+$("#bbsNm").val()+'</span></h3>';
	contentHeaderHTML += '<p>'+$("#bbsDc").val()+'</p>';
	$(".mKeysub1").html(contentHeaderHTML);
	
	fn_init();
	
}); 

function fn_init() {
	
	var addcnt
	var atchmnflCo = $("#atchmnflCo").val();
	switch (atchmnflCo) {
	case 0:	addcnt = 'S'; break;
	case 1:	addcnt = 'S'; break;
	case 2:	addcnt = 'M2'; break;
	case 3:	addcnt = 'M3'; break;
	default:
		break;
	}

	// 첨부파일
	var bFile = $("#atchmnflNo").val() == "" ? false : true;
	fObj = new fileObj({objId:"f1", windowMode:"full", divId:$("#atchFileDiv"), readOnly:true, addCnt:addcnt, filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bFile});
	fObj.init();
	fObj.getFileList($("#atchmnflNo").val(), "FS02");
	
	mfObj = new fileObjMobInqry({objId:"f2", windowMode:"full", divId:$("#atchFileDivMob"), readOnly:true, addCnt:addcnt, filePath:"basic", maxFileSize:"5", fileType:"image", tmpDel:bFile});
	mfObj.getFileList($("#atchmnflNo").val(), "FS02");
	
	
	var windowWidth = window.matchMedia("screen and (max-width:750px)");
	if (windowWidth.matches) {
		fn_selectCommentListMob(); 
	}else{
		 fn_selectCommentList(); 
	}
	
}

function fn_selectCommentList() {
	var params = {};
	params.masterSn = $("#masterSn").val();
	params.bbsSn = $("#sn").val();
	
	$("#coment_content").html('');
	$.post('/board/unity/selectBbsComment.ajax', params
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			$("#commentCount").text('0');
			if(!!dataList && dataList.length != 0){
				$("#commentCount").text(dataList[0].resultCount);				
				var cbody = $("#coment_content");
				var c_ul, c_li, c_box, c_del, c_white, c_info, c_cont, c_toggle, c_toggle_div, lower_comments;
				var lowerCnt = 0;
				
				dataList.forEach(function(data,idx){
					if(!data.upperCommentSn){
						lowerCnt = 0;
						c_li = $("<li>");
						c_box = $('<div class="box">');
						
						if(data.registUserNo == $("#ssUserNo").val()){
							c_del = $('<button class="del"></button>');
							c_del.click(data, function(res){
								fn_deleteComment(data.commentSn);
								location.reload()
							})
							c_box.append(c_del);							
						}
						
						c_info = $('<div class="info">');
						c_info.append('<span class="name">'+ data.emailAdres + '</span>');
						c_info.append('<span class="date">'+ data.registDt + '</span>');
						
						c_box.append(c_info);
						
						c_cont = $('<div class="cont">');
						c_cont.text(data.cn);
						c_box.append(c_cont);
						
						c_toggle_div = $('<div class="box_btn w60 h34 lgray2"></div>')
						c_toggle = $('<button onclick="toggleWrite(this);" style="display:none;"></button>')
//						c_toggle.text('답글' + lowerCnt);
						c_toggle.text('댓글' + lowerCnt);
						c_toggle_div.append(c_toggle);
						c_box.append(c_toggle_div)
						c_li.append(c_box);
						
						c_white = $('<div class="write">');
						c_white.append('<textarea name="lowerCn" id="lowerCn" class="w100p" palceholder="내용을 입력해주세요."></textarea>');
						
//						var c_white_button = $('<div class="box_btn w112 h72 white3 fs15 medium"><button>답글쓰기</button></div>');
						var c_white_button = $('<div class="box_btn w112 h72 white3 fs15 medium"><button>댓글쓰기</button></div>');
						c_white_button.click(data, function(res){
							if(!$("#ssUserNo").val()){
//								alert("로그인 후에 답글을 작성할 수 있습니다. ");
								alert("로그인 후에 댓글을 작성할 수 있습니다. ");
								return false;
							}
							
							if( !$.trim($(this).parent().find('#lowerCn').val()) ){
								alert("댓글을 작성해 주세요.");
								return false;
							}
							
							var ret = data;	
							var params = {};
							params.upperCommentSn = ret.commentSn;
							params.cn = $(this).parent().find('#lowerCn').val();	

							fn_insertBbsComment('lower', params);
							location.reload();
						});
						
						c_white.append(c_white_button);
						
						c_li.append(c_white);
						
						lower_comments = $('<ul class="list">');
						c_li.append(lower_comments);
						
						cbody.append(c_li);				
					}else{
						var l_li = $('<li class="l_li">');
						var l_box =$('<div class="box">');
						var l_button =$('<button class="del"></button>');
						var l_info = $('<div class="info">');
						lowerCnt = lowerCnt + 1;
//						c_toggle.text('답글' + lowerCnt);
						c_toggle.text('댓글' + lowerCnt);
						
						if(data.registUserNo == $("#ssUserNo").val()){
							l_button.click(data, function(res){
								fn_deleteComment(data.commentSn);
								location.reload();
							})							
							l_box.append(l_button);							
						}						
						
						l_info.append('<span class="name">'+ data.emailAdres +'</span>');
						l_info.append('<span class="date">'+ data.registDt + '</span>');
						
						l_box.append(l_info);
						l_box.append('<div class="cont">'+ data.cn +'</div>')	
						
						l_li.append(l_box);
						lower_comments.append(l_li);
					}
					
				});
				$(".name").click(function(e){
//					console.dir(e.target);
					$("#upperComment").val( e.target.outerText + "// " + $("#upperComment").val());
				});
			}
		}else{
			console.log("오류가 발생했습니다.");
//			alert(data.resultMsg);
		}
	});
}

function fn_selectCommentListMob() {
	var params = {};
	params.masterSn = $("#masterSn").val();
	params.bbsSn = $("#sn").val();
	
	$("#coment_contentMob").html('');
	$.post('/board/unity/selectBbsComment.ajax', params
	).done(function(data) {
		if(data.resultCode == 'success'){
			var dataList = data.dataList;
			$("#commentCountMob").text('0');
			if(!!dataList && dataList.length != 0){
				$("#commentCountMob").text(dataList[0].resultCount);				
				var cbody = $("#coment_contentMob");
				var c_ul, c_li, c_box, c_del, c_white, c_info, c_cont, c_toggle, c_toggle_div, lower_comments;
				var lowerCnt = 0;
				
				dataList.forEach(function(data,idx){
					if(!data.upperCommentSn){
						lowerCnt = 0;
						c_li = $("<li>");
						c_box = $('<div class="box">');
						
						if(data.registUserNo == $("#ssUserNo").val()){
							c_del = $('<button class="del"></button>');
							c_del.click(data, function(res){
								fn_deleteComment(data.commentSn);
								location.reload()
							})
							c_box.append(c_del);							
						}
						
						c_info = $('<div class="info">');
						c_info.append('<span class="name">'+ data.emailAdres + '</span>');
						c_info.append('<span class="date">'+ data.registDt + '</span>');
						
						c_box.append(c_info);
						
						c_cont = $('<div class="cont">');
						c_cont.text(data.cn);
						c_box.append(c_cont);
						
						c_toggle_div = $('<div class="box_btn h24 radius white4 fs12 medium"></div>')
						c_toggle = $('<button onclick="toggleWrite(this);" style="display:none;"></button>')
//						c_toggle.text('답글' + lowerCnt);
						c_toggle.text('댓글' + lowerCnt);
						c_toggle_div.append(c_toggle);
						c_box.append(c_toggle_div)
						c_li.append(c_box);
						
						c_white = $('<div class="write">');
						c_white.append('<textarea name="lowerCn" id="lowerCn" class="w100p" palceholder="내용을 입력해주세요."></textarea>');
						
//						var c_white_button = $('<div class="box_btn h55 radius fs12 medium"><button>답글쓰기</button></div>');
						var c_white_button = $('<div class="box_btn h55 radius fs12 medium"><button>댓글쓰기</button></div>');
						c_white_button.click(data, function(res){
							if(!$("#ssUserNo").val()){
//								alert("로그인 후에 답글을 작성할 수 있습니다. ");
								alert("로그인 후에 댓글을 작성할 수 있습니다. ");
								return false;
							}
							
							if( !$.trim($(this).parent().find('#lowerCn').val()) ){
								alert("댓글을 작성해 주세요.");
								return false;
							}
							
							var ret = data;	
							var params = {};
							params.upperCommentSn = ret.commentSn;
							params.cn = $(this).parent().find('#lowerCn').val();	
							
							fn_insertBbsComment('lower', params);
							location.reload();
						});
						
						c_white.append(c_white_button);
						
						c_li.append(c_white);
						
						lower_comments = $('<ul class="list">');
						c_li.append(lower_comments);
						
						cbody.append(c_li);				
					}else{
						var l_li = $('<li class="l_li">');
						var l_box =$('<div class="box">');
						var l_button =$('<button class="del"></button>');
						var l_info = $('<div class="info">');
						lowerCnt = lowerCnt + 1;
//						c_toggle.text('답글' + lowerCnt);
						c_toggle.text('댓글' + lowerCnt);
						
						if(data.registUserNo == $("#ssUserNo").val()){
							l_button.click(data, function(res){
								fn_deleteComment(data.commentSn);
								location.reload();
							})							
							l_box.append(l_button);							
						}						
						
						l_info.append('<span class="name">'+ data.emailAdres +'</span>');
						l_info.append('<span class="date">'+ data.registDt + '</span>');
						
						l_box.append(l_info);
						l_box.append('<div class="cont">'+ data.cn +'</div>')	
						
						l_li.append(l_box);
						lower_comments.append(l_li);
					}
				});
			}
		}else{
			console.log("오류가 발생했습니다.");
//			alert(data.resultMsg);
		}
	});
}

function fn_deleteComment(sn){
	if(confirm("삭제하시겠습니까?")){
		$.post('/board/unity/deleteComment.ajax',{commentSn : sn}
		).done(function(data) {
			if(data.resultCode == 'success'){
				alert("댓글이 삭제되었습니다.");
			}else{
				console.log("오류가 발생했습니다.");
				alert(data.resultMsg);
			}
		});
	}	
}

function fn_insertBbsComment(type, data){
	var params = {};
	if(type == 'upper'){
		params.masterSn = $("#masterSn").val();
		params.ssUserNo = $("#ssUserNo").val();
		params.bbsSn = $("#sn").val();
		
		var windowWidth = window.matchMedia("screen and (max-width:750px)");
		if (windowWidth.matches) {
			params.cn = $("#upperCommentMob").val();
		}else{
			params.cn = $("#upperComment").val(); 
		}	
	}else if(type == 'lower'){
		params.upperCommentSn = data.upperCommentSn;
		params.cn = data.cn;	
		params.masterSn = $("#masterSn").val();
		params.ssUserNo = $("#ssUserNo").val();
		params.bbsSn = $("#sn").val();
	}
//	console.log(params);
	$.post('/board/unity/insertBbsComment.ajax',params
	).done(function(data) {
		if(data.resultCode == 'success'){
			alert("댓글이 등록되었습니다.");
		}else{
			console.log("오류가 발생했습니다.");
			alert(data.resultMsg);
		}
	});
}

function fn_postView(obj) {
	$("#crud").val('r');
	$("#sn").val(obj);
	$("#reqForm").attr("action", '/board/listView.do');
	$("#reqForm").submit();
}

function toggleWrite(obj) {
	var obj = $(obj);

	if (obj.parent().parent().next('.write').hasClass('active') == false) {
		obj.parent().parent().next('.write').addClass('active');
		obj.parent().parent().next('.write').next('.list').addClass('active');
	} else {
		obj.parent().parent().next('.write').removeClass('active');
		obj.parent().parent().next('.write').next('.list').removeClass('active');
	}
}

