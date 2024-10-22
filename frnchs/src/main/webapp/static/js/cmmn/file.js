var fileObj = function(fileConfig){
	this.fileConfig = fileConfig;
	this.init = function(){
		if(this.fileConfig.tmpDel == null){
			this.fileConfig.tmpDel = true;
		}
		var that = this;
		this.fileConfig.maxFileSize = this.calcMaxFileSize(this.fileConfig.maxFileSize);
//		console.log(this.fileConfig.maxFileSize);
		var vObjId = this.fileConfig.objId;
		var html = [];
		html.push("		<input type=\"hidden\" name=\"atchmnflNo\" id=\"atchmnflNo_"+vObjId+"\"/>");
		html.push("		<input type=\"hidden\" name=\"delFileSn\" id=\"delFileSn_"+vObjId+"\"/>");
		if (this.fileConfig.readOnly == false) {
			html.push("	<div class=\"mFile1\">");
			html.push("		<div class=\"gIt\"><input type=\"text\" name=\"atchFileNm_"+vObjId+"\" id=\"atchFileNm_"+vObjId+"\" class=\"it\" readonly title=\"파일첨부\"></div>");
			html.push("		<div class=\"btn\">");
			html.push("			<a href=\"javascript:void(0)\" class=\"mBtn1\">첨부파일</a>");
			html.push("			<input type=\"file\" name=\"atchFile\" id=\"atchFile_"+vObjId+"\" class=\"fileHidden\" >");
			html.push("		</div>");
			html.push("		<a href=\"javascript:void(0)\" id=\"btnAddFile_"+vObjId+"\" class=\"mBtn1 lGray btnAdd\">+ 추가</a>");
			html.push("	</div>");
			html.push("	<div class=\"mInfo1 "+vObjId+"Txt\"></div>");
		}
		html.push("	<div id=\"fileList_"+vObjId+"\">");
		html.push("	</div>");
		this.fileConfig.divId.html(html.join(""));
		if (this.fileConfig.readOnly == false) {
			//파일 첨부
			$(document).on("click", "#btnAddFile_"+vObjId, function() {
				if(that.fileConfig.addCnt == "S"){
					if($( "#fileList_"+that.fileConfig.objId + " div" ).length > 0){
						alert("파일은 하나만 등록 가능 합니다.");
						return;
					}
				}
				if(that.fileConfig.addCnt == "M2"){
					if($( "#fileList_"+that.fileConfig.objId + " div" ).length > 1){
						alert("파일은 2개까지 등록 가능합니다.");
						return;
					}
				}
				if(that.fileConfig.addCnt == "M3"){
					if($( "#fileList_"+that.fileConfig.objId + " div" ).length > 2){
						alert("파일은 3개까지 등록 가능합니다.");
						return;
					}
				}
				if(that.fileConfig.addCnt == "M10"){
					if($( "#fileList_"+that.fileConfig.objId + " div" ).length > 10){
						alert("파일은 10개까지 등록 가능합니다.");
						return;
					}
				}
				if(that.fileConfig.filePath == "basic"){
					that.fileUpload();
				}
			});
			//파일 등록
			$(document).on("change", "#atchFile_"+vObjId, function() {
				if($(this).val() != ""){
					//파일
					var vFile = this.files[0];
					var inputObj = this;
					//확장자 체크
					if(that.fileConfig.fileType == "image"){
						var ext = $(this).val().split(".").pop().toLowerCase();
						if($.inArray(ext, ["gif","jpg","jpeg","png"]) == -1){
							alert("gif, jpg, jpeg, png 파일만 업로드 해주세요.");
							$(this).val("");
							return;
						}
						//가로세로 길이
						var _URL = window.URL || window.webkitURL;
						var vImg = new Image();

						vImg.src = _URL.createObjectURL(vFile);
						vImg.onload = function(){
							if(vImg.width > 200 || vImg.height > 200){
								$(inputObj).val("");
								that.setFileName($(inputObj).val());
								alert("이미지 크기를 확인해주세요.");
								return;
							}
						}
					} else if(that.fileConfig.fileType == "video"){ // 비디오
						var ext = $(this).val().split(".").pop().toLowerCase();
						if($.inArray(ext, ["mp4"]) == -1){
							alert("mp4 파일만 업로드 해주세요.");
							$(this).val("");
							return;
						}
					}
					if(that.fileConfig.fileType == "imageNpdf"){
						var ext = $(this).val().split(".").pop().toLowerCase();
						if($.inArray(ext, ["gif","jpg","jpeg","png","pdf"]) == -1){
							alert("gif, jpg, jpeg, png, pdf 파일만 업로드 해주세요.");
							$(this).val("");
							return;
						}
						//가로세로 길이
						var _URL = window.URL || window.webkitURL;
						var vImg = new Image();

						vImg.src = _URL.createObjectURL(vFile);
						vImg.onload = function(){
							/*if(vImg.width > 200 || vImg.height > 200){
								alert("이미지 크기를 확인해주세요.");
								$(this).val("");
								return;
							}*/
						}
					}
					//파일 용량체크
//					console.log(vFile.size + " // " + that.fileConfig.maxFileSize);
					if(vFile.size > that.fileConfig.maxFileSize){
						alert("파일용량이 초과하였습니다.");
						$(this).val("");
						return;
					}

					var fileName = $(this).val();
					that.setFileName(fileName);
				} else {//등록할 파일이 없으면 (undefined)
					$("#atchFileNm_f1").val("");
				}
			});
		}

		/*
		 * 파일삭제 클릭
		 */
		$(document).on("click", ".btnDel_"+vObjId, function() {
		    var fileSn = $(this).attr("fileSn");
		    that.delFile($(this), fileSn);
		});
	}
	/*
	 * maxFileSize 계
	 */
	this.calcMaxFileSize = function(paramFileSize){
		var returnVal;
		if(paramFileSize != null){
			returnVal = Number(paramFileSize) * 1024 * 1024;
		}
		return returnVal;
	}
	/*
	 * 선택한 파일명 설정
	 */
	this.setFileName = function(fileName) {
		$("#atchFileNm_"+this.fileConfig.objId).val(fileName);
	}

	/*
	 * GET 첨부파일 ID
	 */
	this.getatchmnflNo = function() {
		return $("#atchmnflNo_"+this.fileConfig.objId).val();
	}

	/*
	 * GET 첨부파일 ID
	 */
	this.setatchmnflNo = function(atchmnflNo) {
		$("#atchmnflNo_"+this.fileConfig.objId).val(atchmnflNo);
	}

	/*
	 * 첨부파일 업로드
	 */
	this.fileUpload = function() {
		var that = this;
		var $file 			= $("#atchFile_"+this.fileConfig.objId);
		var $atchmnflNo 	= $("#atchmnflNo_"+this.fileConfig.objId);
		var $delFileSn 		= $("#delFileSn_"+this.fileConfig.objId);
		var $fileListArea 	= $("#fileList_"+this.fileConfig.objId);
		var $form			= new FormData();

		$form.append($file.attr("name"), $file.prop("files")[0]);
		$form.append($atchmnflNo.attr("name"), $atchmnflNo.val());
		$form.append($delFileSn.attr("name"), $delFileSn.val());
		$form.append($fileListArea.attr("name"), $fileListArea.val());

		var fileUrl = $file.val();
		if(fileUrl == null || fileUrl == ""){
			alert("선택된 파일이 없습니다.");
			$("#atchFileNm_f1").val("");
			return;
		}
		$.ajax({
				url: contextPath + "/file/uploadFile.do",
				processData:false,
				contentType:false,
				data:$form,
				type:"POST",
				dataType:"json",
				async: "false",
				success : function(data, status, request) {
					if(data.resultCode == 'success'){
						$atchmnflNo.val(data.atchmnflNo);
						that.getFileList(data.atchmnflNo, "FS01,FS02");
					}else if(data.resultCode == 'fail'){
						alert(data.resultMsg);
					}else if(!data.session){
						if($("#loginPopup")){
							$("#loginPopup").show();
						}else{
							$("<div id='loginPopup'></div>").appendTo("body");
							$("#loginPopup").load(data.loginPopup);
						}
					}else{
						alert("파일 저장중 에러가 발생하였습니다.");
					}
				},
				error : function(data) {
					alert("파일 저장중 에러가 발생하였습니다.");
				}
		});
	}
	/*
	 * 첨부파일 목록 조회
	 */
	this.getFileList = function(atchmnflNo, atchmnflSttusCode) {
		if(this.fileConfig.tmpDel){
			//이미 등록된 파일중에 임시저장 파일 삭제처리
			this.updateTmpFileToDelete(atchmnflNo); 
			this.fileConfig.tmpDel = false;
		}
		var that = this;
		var $fileListArea 	= $("#fileList_"+this.fileConfig.objId);
		if (fnIsEmpty(atchmnflNo)) {
			return;
		}
		$("#atchmnflNo_"+this.fileConfig.objId).val(atchmnflNo);
		var params = {};
		params["atchmnflNo"] = atchmnflNo;	// 첨부파일번호
		params["atchmnflSttusCode"] = atchmnflSttusCode;	// 상태
		fnGetAjaxData("/file/getFileList.do", params, function(data) {
			var html = [];
			$(data.fileList).each(function() {
				if (!that.checkDel(this.fileSn)) {
					html.push('<div class="mAttach1">');
					html.push('	<span class="ls">');
					html.push('		<a href="'+contextPath+'/file/downloadFile.do?atchmnflNo='+this.atchmnflNo+'&fileSn='+this.fileSn+'&fileKey='+encodeURIComponent(this.fileKey)+'" class="ul">'+this.inputFileNm+'</a>');
					if (that.fileConfig.readOnly == false) {
						html.push('		<a href="javascript:void(0)" fileSn="'+this.fileSn+'" class="iDel btnDel_'+that.fileConfig.objId+'">삭제</a>');
					}
					html.push('	</span>');
					html.push('</div>');
				}
			});
			$fileListArea.html(html.join(""));
			$fileListArea.trigger('contentchanged');
		});
	}

	/*
	 * 파일삭제(서버전송)
	 */
	this.deleteServerFile = function() {
		var that = this;
		if (fnIsEmptyObj($("#atchmnflNo_"+this.fileConfig.objId))) {
			return;
		}
		if (fnIsEmptyObj($("#delFileSn_"+this.fileConfig.objId))) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = $("#atchmnflNo_"+this.fileConfig.objId).val();
		params['delFileSn'] = $("#delFileSn_"+this.fileConfig.objId).val();
		fnGetSyncAjaxData('/file/deleteFile.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 삭제중 에러가 발생하였습니다.");
			} else {
				$("#delFileSn_"+that.fileConfig.objId).val("");
			}
		}, false, "");
	}

	/*
	 * 파일삭제
	 */
	this.delFile = function(obj, fileSn) {

		var delFileSn = $("#delFileSn_"+this.fileConfig.objId).val();
		var $fileListArea 	= $("#fileList_"+this.fileConfig.objId);
		if (delFileSn == "") {
			delFileSn = fileSn;
		} else {
			delFileSn += ","+fileSn;
		}

		if (this.fileConfig.filePath == "dataSubm"){
			$("#delFileSn_"+this.fileConfig.objId).val("");
		} else {
			$("#delFileSn_"+this.fileConfig.objId).val(delFileSn);
		}
		$(obj).parent().parent().remove();
		$fileListArea.trigger('contentchanged');
		//중복된파일입니다 오류로 인한 추가 - 2022-01-11 염종찬
		this.deleteServerFile();
	}

	/*
	 * 삭제파일인지 체크
	 */
	this.checkDel = function(fileSn) {
		var delFileSn = $("#delFileSn_"+this.fileConfig.objId).val();
		if (delFileSn == "") {
			return false;
		} else {
			var splitFileSn = delFileSn.split(",");
			for (var i = 0; i < splitFileSn.length; i++) {
				if (splitFileSn[i] == fileSn) {
					return true;
				}
			}
			return false;
		}
	}
	/*
	 * 파일상태를 정상으로 변경
	 */
	this.updateTmpFileToNoraml = function() {
		if (fnIsEmptyObj($("#atchmnflNo_"+this.fileConfig.objId))) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = $("#atchmnflNo_"+this.fileConfig.objId).val();
		fnGetSyncAjaxData('/file/updateTmpFileToNoraml.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 상태 변경중 에러가 발생하였습니다.");
			}
		}, false, "");
	}

	/*
	 * 임시저장파일을 삭제로 변경
	 */
	this.updateTmpFileToDelete = function(atchmnflNo) {
		if (!atchmnflNo) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = atchmnflNo;
		fnGetSyncAjaxData('/file/updateTmpFileToDelete.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 상태 변경중 에러가 발생하였습니다.");
			}
		}, false, "");

		$("#fileList_"+this.fileConfig.objId).html("");
		$("#atchFileNm_"+this.fileConfig.objId).val("");
	}

	/*
	 * 파일 업로드 완료 처리
	 */
	this.updateComplete = function() {
		this.deleteServerFile();
		this.updateTmpFileToNoraml();
	}

	/*
	 * 파일 업로드 목록 개수 조회
	 */
	this.uploadFileCount = function() {

		if($( "#fileList_"+this.fileConfig.objId + " li" ).length > 1) {
			return true;
		} else {
			return false;
		}
	}
}

var fileObjMob = function(fileConfig){
	this.fileConfig = fileConfig;
	this.init = function(){
		if(this.fileConfig.tmpDel == null){
			this.fileConfig.tmpDel = true;
		}
		var that = this;
		this.fileConfig.maxFileSize = this.calcMaxFileSize(this.fileConfig.maxFileSize);
		var vObjId = this.fileConfig.objId;
		var html = [];
		html.push("		<input type=\"hidden\" name=\"atchmnflNo\" id=\"atchmnflNoMob_"+vObjId+"\"/>");
		html.push("		<input type=\"hidden\" name=\"delFileSn\" id=\"delFileSnMob_"+vObjId+"\"/>");
		if (this.fileConfig.readOnly == false) {
			html.push("	<div class=\"box_file\">");
			html.push("		<input type=\"text\" name=\"atchFileNm_"+vObjId+"\" id=\"atchFileNmMob_"+vObjId+"\" style=\"border: none;\" class=\"it\" readonly title=\"파일첨부\">");
			html.push("		<input type=\"file\" name=\"atchFile\" id=\"atchFileMob_"+vObjId+"\" class=\"hidden\" >");
			html.push("		<label for=\"atchFileMob_"+vObjId+"\">파일첨부</label>");
			html.push("	</div>");	
			html.push("	<p class=\"msg\">");
			html.push("		5MByte 이하의 파일만 등록가능합니다.<br>");
			html.push("		등록이미지 크기는 가로 200pixel / 세로 200pixel로 올려주세요.");
			html.push("	</p>");
			html.push("	<div class=\"box_btn block h40 radius charcoal\">");
			html.push("		<button type=\"button\" id=\"btnAddFileMob_"+vObjId+"\">첨부파일 추가</a>");
			html.push("	</div>");	
		}
		html.push("	<ul class=\"list_upload\" id=\"fileListMob_"+vObjId+"\">");
		html.push("	</ul>");
		this.fileConfig.divId.html(html.join(""));
		if (this.fileConfig.readOnly == false) {
			//파일 첨부
			$(document).on("click", "#btnAddFileMob_"+vObjId, function() {
				if(that.fileConfig.addCnt == "S"){
					if($( "#fileListMob_"+that.fileConfig.objId + " li" ).length > 0){
						alert("파일은 하나만 등록 가능 합니다.");
						return;
					}
				}
				if(that.fileConfig.addCnt == "M2"){
					if($( "#fileListMob_"+that.fileConfig.objId + " li" ).length > 1){
						alert("파일은 3개까지 등록 가능합니다.");
						return;
					}
				}
				if(that.fileConfig.addCnt == "M3"){
					if($( "#fileListMob_"+that.fileConfig.objId + " li" ).length > 2){
						alert("파일은 3개까지 등록 가능합니다.");
						return;
					}
				}
				if(that.fileConfig.addCnt == "M10"){
					if($( "#fileListMob_"+that.fileConfig.objId + " li" ).length > 10){
						alert("파일은 10개까지 등록 가능합니다.");
						return;
					}
				}
				if(that.fileConfig.filePath == "basic"){
					that.fileUpload();
				}
			});
			//파일 등록
			$(document).on("change", "#atchFileMob_"+vObjId, function() {
				if($(this).val() != ""){
					//파일
					var vFile = this.files[0];
					var inputObj = this;
					//확장자 체크
					if(that.fileConfig.fileType == "image"){
						var ext = $(this).val().split(".").pop().toLowerCase();
						if($.inArray(ext, ["gif","jpg","jpeg","png"]) == -1){
							alert("gif, jpg, jpeg, png 파일만 업로드 해주세요.");
							$(this).val("");
							return;
						}
						//가로세로 길이
						var _URL = window.URL || window.webkitURL;
						var vImg = new Image();
						
						vImg.src = _URL.createObjectURL(vFile);
						vImg.onload = function(){
							if(vImg.width > 200 || vImg.height > 200){
								$(inputObj).val("");
								that.setFileName($(inputObj).val());
								alert("이미지 크기를 확인해주세요.");
								return;
							}
						}
					} else if(that.fileConfig.fileType == "video"){ // 비디오
						var ext = $(this).val().split(".").pop().toLowerCase();
						if($.inArray(ext, ["mp4"]) == -1){
							alert("mp4 파일만 업로드 해주세요.");
							$(this).val("");
							return;
						}
					}
					if(that.fileConfig.fileType == "imageNpdf"){
						var ext = $(this).val().split(".").pop().toLowerCase();
						if($.inArray(ext, ["gif","jpg","jpeg","png","pdf"]) == -1){
							alert("gif, jpg, jpeg, png, pdf 파일만 업로드 해주세요.");
							$(this).val("");
							return;
						}
						//가로세로 길이
						var _URL = window.URL || window.webkitURL;
						var vImg = new Image();
						
						vImg.src = _URL.createObjectURL(vFile);
						vImg.onload = function(){
							/*if(vImg.width > 200 || vImg.height > 200){
								alert("이미지 크기를 확인해주세요.");
								$(this).val("");
								return;
							}*/
						}
					}
					//파일 용량체크
//					console.log(vFile.size + " // " + that.fileConfig.maxFileSize);
					if(vFile.size > that.fileConfig.maxFileSize){
						alert("파일용량이 초과하였습니다.");
						$(this).val("");
						return;
					}
					
					var fileName = $(this).val();
					that.setFileName(fileName);
				} else {//등록할 파일이 없으면 (undefined)
					$("#atchFileNmMob_f2").val("");
				}
			});
		}
		
		/*
		 * 파일삭제 클릭
		 */
		$(document).on("click", ".btnDelMob_"+vObjId, function() {
			var fileSn = $(this).attr("fileSn");
			that.delFile($(this), fileSn);
		});
	}
	/*
	 * maxFileSize 계
	 */
	this.calcMaxFileSize = function(paramFileSize){
		var returnVal;
		if(paramFileSize != null){
			returnVal = Number(paramFileSize) * 1024 * 1024;
		}
		return returnVal;
	}
	/*
	 * 선택한 파일명 설정
	 */
	this.setFileName = function(fileName) {
		$("#atchFileNmMob_"+this.fileConfig.objId).val(fileName);
	}
	
	/*
	 * GET 첨부파일 ID
	 */
	this.getatchmnflNo = function() {
		return $("#atchmnflNoMob_"+this.fileConfig.objId).val();
	}
	
	/*
	 * SET 첨부파일 ID
	 */
	this.setatchmnflNo = function(atchmnflNo) {
		$("#atchmnflNoMob_"+this.fileConfig.objId).val(atchmnflNo);
	}
	
	/*
	 * 첨부파일 업로드
	 */
	this.fileUpload = function() {
		var that = this;
		var $file 			= $("#atchFileMob_"+this.fileConfig.objId);
		var $atchmnflNo 	= $("#atchmnflNoMob_"+this.fileConfig.objId);
		var $delFileSn 		= $("#delFileSnMob_"+this.fileConfig.objId);
		var $fileListArea 	= $("#fileListMob_"+this.fileConfig.objId);
		var $form			= new FormData();
		
		$form.append($file.attr("name"), $file.prop("files")[0]);
		$form.append($atchmnflNo.attr("name"), $atchmnflNo.val());
		$form.append($delFileSn.attr("name"), $delFileSn.val());
		$form.append($fileListArea.attr("name"), $fileListArea.val());
		
		var fileUrl = $file.val();
		if(fileUrl == null || fileUrl == ""){
			alert("선택된 파일이 없습니다.");
			$("#atchFileNmMob_f2").val("");
			return;
		}
		$.ajax({
			url: contextPath + "/file/uploadFile.do",
			processData:false,
			contentType:false,
			data:$form,
			type:"POST",
			dataType:"json",
			async: "false",
			success : function(data, status, request) {
				if(data.resultCode == 'success'){
					$atchmnflNo.val(data.atchmnflNo);
					that.getFileList(data.atchmnflNo, "FS01,FS02");
				}else if(data.resultCode == 'fail'){
					alert(data.resultMsg);
				}else if(!data.session){
					if($("#loginPopup")){
						$("#loginPopup").show();
					}else{
						$("<div id='loginPopup'></div>").appendTo("body");
						$("#loginPopup").load(data.loginPopup);
					}
				}else{
					alert("파일 저장중 에러가 발생하였습니다.");
				}
			},
			error : function(data) {
				alert("파일 저장중 에러가 발생하였습니다.");
			}
		});
	}
	/*
	 * 첨부파일 목록 조회
	 */
	this.getFileList = function(atchmnflNo, atchmnflSttusCode) {
		if(this.fileConfig.tmpDel){
			//이미 등록된 파일중에 임시저장 파일 삭제처리
			this.updateTmpFileToDelete(atchmnflNo);
			this.fileConfig.tmpDel = false;
		}
		var that = this;
		var $fileListArea 	= $("#fileListMob_"+this.fileConfig.objId);
		if (fnIsEmpty(atchmnflNo)) {
			return;
		}
		$("#atchmnflNoMob_"+this.fileConfig.objId).val(atchmnflNo);
		var params = {};
		params["atchmnflNo"] = atchmnflNo;	// 첨부파일번호
		params["atchmnflSttusCode"] = atchmnflSttusCode;	// 상태
		fnGetAjaxData("/file/getFileList.do", params, function(data) {
			var html = [];
			$(data.fileList).each(function() {
				if (!that.checkDel(this.fileSn)) {
					html.push('<li>');
					html.push('<a href='+contextPath+'/file/downloadFile.do?atchmnflNo='+this.atchmnflNo+'&fileSn='+this.fileSn+'&fileKey='+encodeURIComponent(this.fileKey)+'>');
					html.push('<p>');	
					html.push(this.inputFileNm +'</p>');
					html.push('</a>');
					if (that.fileConfig.readOnly == false) {
						html.push('		<button fileSn="'+this.fileSn+'" class="iDel del btnDelMob_'+that.fileConfig.objId+'">삭제</a>');
					}
					html.push('	</li>');
				}
			});
			$fileListArea.html(html.join(""));
			$fileListArea.trigger('contentchanged');
		});
	}
	
	/*
	 * 파일삭제(서버전송)
	 */
	this.deleteServerFile = function() {
		var that = this;
		if (fnIsEmptyObj($("#atchmnflNoMob_"+this.fileConfig.objId))) {
			return;
		}
		if (fnIsEmptyObj($("#delFileSnMob_"+this.fileConfig.objId))) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = $("#atchmnflNoMob_"+this.fileConfig.objId).val();
		params['delFileSn'] = $("#delFileSnMob_"+this.fileConfig.objId).val();
		fnGetSyncAjaxData('/file/deleteFile.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 삭제중 에러가 발생하였습니다.");
			} else {
				$("#delFileSn_"+that.fileConfig.objId).val("");
			}
		}, false, "");
	}
	
	/*
	 * 파일삭제
	 */
	this.delFile = function(obj, fileSn) {
		var delFileSn = $("#delFileSnMob_"+this.fileConfig.objId).val();
		var $fileListArea 	= $("#fileListMob_"+this.fileConfig.objId);
		if (delFileSn == "") {
			delFileSn = fileSn;
		} else {
			delFileSn += ","+fileSn;
		}
		
		if (this.fileConfig.filePath == "dataSubm"){
			$("#delFileSnMob_"+this.fileConfig.objId).val("");
		} else {
			$("#delFileSnMob_"+this.fileConfig.objId).val(delFileSn);
		}
		$(obj).parent().remove();
		$fileListArea.trigger('contentchanged');
		//중복된파일입니다 오류로 인한 추가 - 2022-01-11 염종찬
		this.deleteServerFile();
	}
	
	/*
	 * 삭제파일인지 체크
	 */
	this.checkDel = function(fileSn) {
		var delFileSn = $("#delFileSnMob_"+this.fileConfig.objId).val();
		if (delFileSn == "") {
			return false;
		} else {
			var splitFileSn = delFileSn.split(",");
			for (var i = 0; i < splitFileSn.length; i++) {
				if (splitFileSn[i] == fileSn) {
					return true;
				}
			}
			return false;
		}
	}
	/*
	 * 파일상태를 정상으로 변경
	 */
	this.updateTmpFileToNoraml = function() {
		if (fnIsEmptyObj($("#atchmnflNoMob_"+this.fileConfig.objId))) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = $("#atchmnflNoMob_"+this.fileConfig.objId).val();
		fnGetSyncAjaxData('/file/updateTmpFileToNoraml.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 상태 변경중 에러가 발생하였습니다.");
			}
		}, false, "");
	}
	
	/*
	 * 임시저장파일을 삭제로 변경
	 */
	this.updateTmpFileToDelete = function(atchmnflNo) {
		if (!atchmnflNo) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = atchmnflNo;
		fnGetSyncAjaxData('/file/updateTmpFileToDelete.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 상태 변경중 에러가 발생하였습니다.");
			}
		}, false, "");
		
		$("#fileListMob_"+this.fileConfig.objId).html("");
		$("#atchFileNmMob_"+this.fileConfig.objId).val("");
	}
	
	/*
	 * 파일 업로드 완료 처리
	 */
	this.updateComplete = function() {
		this.deleteServerFile();
		this.updateTmpFileToNoraml();
	}
	
	/*
	 * 파일 업로드 목록 개수 조회
	 */
	this.uploadFileCount = function() {
		if($( "#fileListMob_"+this.fileConfig.objId + " li" ).length > 1) {
			return true;
		} else {
			return false;
		}
	}
}


var fileObjMobInqry = function(fileConfig){
	this.fileConfig = fileConfig;
	/*
	 * 첨부파일 목록 조회
	 */
	this.getFileList = function(atchmnflNo, atchmnflSttusCode) {
		if(this.fileConfig.tmpDel){
			//이미 등록된 파일중에 임시저장 파일 삭제처리
			this.updateTmpFileToDelete(atchmnflNo);
			this.fileConfig.tmpDel = false;
		}
		var that = this;
		var $fileListArea 	= $("#atchFileDivMob");
		if (fnIsEmpty(atchmnflNo)) {
			return;
		}
		var params = {};
		params["atchmnflNo"] = atchmnflNo;	// 첨부파일번호
		params["atchmnflSttusCode"] = atchmnflSttusCode;	// 상태
		fnGetAjaxData("/file/getFileList.do", params, function(data) {
			var html = [];
			$(data.fileList).each(function() {
				html.push('<li>');
				html.push('<a class="ul" href='+contextPath+'/file/downloadFile.do?atchmnflNo='+this.atchmnflNo+'&fileSn='+this.fileSn+'&fileKey='+encodeURIComponent(this.fileKey)+'>');
				html.push('<span style="color:#f8a80f;">');		
				html.push(this.inputFileNm +'</span>');
				html.push('</a>');
				html.push('	</li>');
			});
			$fileListArea.html(html.join(""));
		});
	}	
	/*
	 * 삭제파일인지 체크
	 */
	this.checkDel = function(fileSn) {
		var delFileSn = $("#delFileSn_"+this.fileConfig.objId).val();
		if (delFileSn == "") {
			return false;
		} else {
			var splitFileSn = delFileSn.split(",");
			for (var i = 0; i < splitFileSn.length; i++) {
				if (splitFileSn[i] == fileSn) {
					return true;
				}
			}
			return false;
		}
	}

	/*
	 * 임시저장파일을 삭제로 변경
	 */
	this.updateTmpFileToDelete = function(atchmnflNo) {
		if (!atchmnflNo) {
			return;
		}
		var params = {};
		params['atchmnflNo'] = atchmnflNo;
		fnGetSyncAjaxData('/file/updateTmpFileToDelete.do', params, function(data){
			if (data.resultCode == "fail") {
				alert("파일 상태 변경중 에러가 발생하였습니다.");
			}
		}, false, "");
		$("#fileListMob_"+this.fileConfig.objId).html("");
		$("#atchFileNmMob_"+this.fileConfig.objId).val("");
	}
}


