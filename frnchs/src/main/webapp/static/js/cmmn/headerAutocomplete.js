var ajaxSrc;
$(document).ready(function() {
	//자동완성기능 -jhb
	var isComplete = false;
	$('#search, #searchMob').on("keyup",function(event){
		
		//키업 이벤트시에도 자동완성(내역)창 활성화
		if ($('.layer_search').hasClass('active') == false) {			
			$('.layer_search').addClass('active');
		}
		
		//자동완성 사용여부체크
		var autoStat = localStorage.getItem("autoStat");
		if(autoStat == null || autoStat == undefined || autoStat == '0') {return false};
		
		//방향키 이벤트 막기
		if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 37 || event.keyCode == 39) {return false};
		
		
		
		var html = '<ul>';
		
		if($(this).val()){
			if(ajaxSrc){
				ajaxSrc.abort();
			}
			$('#hist_box').children().remove();
			ajaxSrc = $.ajax({
	            type : 'get',
	            url: '/fran/selectSchBrandAutoCmptList.ajax',
	            data : {
	            	ldClass : $('#schLdClass').val(), 
            	    bsnSgnal : $(this).val()},                
	            dataType : 'json',
	            success : function(data) {
	        		if(data.resultCode == 'success'){
	        			$("#hist_delBtn").empty();
	        			$("#hist_box").empty();
	        			//10씩 자르기
	        			 var result = data.frchsList.slice(0, 10).map(function (item) {
            			      return {
            			    	bsnSgnal: item.bsnSgnal,
            			    	frnchsNo: item.frnchsNo,
            			    	lclasIndutyCode: item.lclasIndutyCode,
            			    	lclasIndutyNm: item.lclasIndutyNm,
            			    	year: item.year
            			      }
            			});
	        			if(!!result && result.length != 0) {
	        				result.forEach(function (item, index){
	        					html += '<li style="cursor: pointer;" data-code="'+item.frnchsNo+'" data-year="'+item.year+'">';
	        					html += '<span>'+ item.bsnSgnal +'</span>';							
	        					html += '</li>';
	        				});
	        			} else {
	        				html += '<li><p class="empty">입력하신 브랜드 정보가 없습니다.</p></li>';
	        			}
	        		}
	        		html += '</ul>';
	        		$("#hist_box").append(html);
	        		
	        		$("#hist_delBtn").hide();
	        		
	        		$("#hist_box").children().children().each(function(){
	    		    	$(this).click(function(){
	    		    		//검색창 value 값 넣어주기
	    		    		var keywordTxt = $(this).find('span').text();
	    		    		$("#search").val(keywordTxt);
	    		    		$("#searchMob").val(keywordTxt);
	    		    		
	    		    		$('#hnd_schFrnchsNo').val($(this).data("code"));
	    		            $('#txt_schBrnd').val(keywordTxt);
	    		            $("#year").val($(this).data("year"));
	    		            $('#hist_box').children().remove();	
	    		            isComplete = true;
	    		            
	    		            $("#btn_sch").click();
	    		        });
	    		    });
	            }
	        });
		} else {
			//검색값 없으면 검색내역 보여주기
			var userNo = $("#userNo").val() == '' ? '0' : $("#userNo").val();//
			fn_getSchBranList({"userNo":userNo});
		}
	});
	
	//방향키 및 엔터 이벤트
	 var liCnt = 0;
    var height = 0;
    var keyUpDownYn = 1;
	$('#search, #searchMob').keydown(function(event){
	    if(isComplete) { 
	        $('#search').val('');
	        $('#searchMob').val('');
	    }
	    if(event.keyCode == 38) {
	    	keyUpDownYn = 2;
	    	if(liCnt == 0) {
	    		$("#hist_box ul li:eq(" + liCnt + ")").addClass("autoActive");	    		
	    	} else {
	    		$("#hist_box ul li:eq(" + liCnt + ")").removeClass();
	    		liCnt--; 
	    		$("#hist_box ul li:eq(" + liCnt + ")").addClass("autoActive");
	    		/* 리스트 selected 설정 */ 
	    		var winH = $("#hist_box ul li:eq(" + liCnt + ")").outerHeight(); 
	    		height -= winH;
	    		
	    		//Focus 이동 
	    		if (235 > height) { 
	    			$('#hist_box ul').animate({ scrollTop: height }, 0); 
	    		}
	    	}
	    	event.preventDefault();
	    } else if(event.keyCode == 40) {
	    	keyUpDownYn = 2;
	    	if (liCnt == $("#hist_box ul li").length - 1) {
	    		 //리스트의 마지막을 선택 하는 경우 
    			liCnt = $("#hist_box ul li").length - 1; 
    			$("#hist_box ul li:eq(" + liCnt + ")").addClass("autoActive"); 
    		} else { 
    			$("#hist_box ul li:eq(" + liCnt + ")").removeClass(); 
    			liCnt++; 
    			$("#hist_box ul li:eq(" + liCnt + ")").addClass("autoActive"); 
	    		/* 리스트 selected 설정 */ 
	    		var winH = $("#hist_box ul li:eq(" + liCnt + ")").outerHeight(); 
	    		height += winH; 
	    		var vDivH = $("#hist_box ul").outerHeight(); 
	    		$('#hist_box ul').animate({ scrollTop: liCnt - vDivH }, 0); 
    		}
	    } else if(event.keyCode == 13) {
	    	var target = null;
	    	if(keyUpDownYn == 1) {
	    		if($(document).width() <= 687) {
		    		target = $("#searchMob").val();
		    	} else {
		    		target = $("#search").val();
		    	}
		    	if(target == "") {
		    		alert("검색어를 입력해주세요.");
		    		return false;
		    	}
	    	} else {
	    		fn_setSearchKwd(liCnt);
	    	}

    		fn_brandSearch();
	    	$("#hist_box").empty();
	    	keyUpDownYn = 1;
	    }
	});
	
	$('.auto button').click(function(event) {
		//자동완성 기능 수정  - 21.12.06 주한별
		event.preventDefault();
		if ($(this).parent().hasClass('active') == false) {
			$(this).parent().addClass('active');
			$(this).parent().contents()[0].textContent = "ON"
			localStorage.setItem("autoStat", 1);
		} else {
			$(this).parent().removeClass('active');
			$(this).parent().contents()[0].textContent = "OFF"
			localStorage.setItem("autoStat", 0);
		}
	});
	
	$("#btn_sch").click(function(){
		fn_validation();
	});
	
	$("#btn_schMob").click(function(){
		fn_validationMob();
	});
	
	$("input[name='search']").on('click',function() {
		setTimeout(function() { $('input[name="searchMob"]').focus() }, 500);
	});
});

//pc 유효성
function fn_validation() {
	if($('#search').val() == ""){
		alert("브랜드명을 입력해주세요.");
		$('#search').focus();
		return;
	}
	$("#txt_schBrnd").val($('#search').val());
	fn_brandSearch();
}

//모바일 유효성
function fn_validationMob() {
	if($('#searchMob').val() == ""){
		alert("브랜드명을 입력해주세요.");
		$('#searchMob').focus();
		return;
	}
	$("#txt_schBrnd").val($('#searchMob').val());
	fn_brandSearch();
}

//통합검색 
function fn_brandSearch() {
	//검색어, 사용자번호, 선택한 검색어(브랜드)코드 가져오기
	var userNo = $("#userNo").val() == '' ? '0' : $("#userNo").val();
	var schBrdWord = "";
	if($(document).width() <= 687) {
		schBrdWord = $('#searchMob').val();
	} else {
		schBrdWord = $('#search').val();
	}
	
	var frnchsNo =  $('#hnd_schFrnchsNo').val();
	var brandYear = $("#year").val();
	
	//검색내역 저장
	fn_saveSchBranWord({"userNo":userNo, "SsUserNo":userNo, "schBrdWord":schBrdWord, "frnchsNo":frnchsNo});
	
	if(brandYear == "undefined") {
		brandYear = '';
	}
//	$('#unifiedSearchForm').attr('action', '/fran/search/unifiedSearchBrandInteg.do');
//	$('#unifiedSearchForm').append($('<input type="hidden" name="frnchsNo" value="'+ frnchsNo +'">'));
//	$('#unifiedSearchForm').append($('<input type="hidden" name="brandYear" value="'+ brandYear +'">'));
//	$('#unifiedSearchForm').append($('<input type="hidden" name="bsnSgnal" value="'+ bsnSgnal +'">'));
//	$('#unifiedSearchForm').submit();
	
	
	var form = $('<form method="post">');
	form.append($('<input type="hidden" name="frnchsNo" value="'+ frnchsNo +'">'));
	form.append($('<input type="hidden" name="brandYear" value="'+ brandYear +'">'));
	form.append($('<input type="hidden" name="bsnSgnal" value="'+ schBrdWord +'">'));
	form.attr("method","post");
	form.attr("action", "/fran/search/unifiedSearchBrandInteg.do");
	form.appendTo('body').submit().remove();
}

//통합검색시 넘길 데이터 세팅
function fn_setSearchKwd(liCnt) {
	var frnchsNo = $("#hist_box ul li:eq(" + liCnt + ")").data("code");
	var brandYear = $("#hist_box ul li:eq(" + liCnt + ")").data("year");
	var frnchsNm = $("#hist_box ul li:eq(" + liCnt + ")").find("span").text();
	$('#hnd_schFrnchsNo').val(frnchsNo);
	$('#search').val(frnchsNm);
//	$('#hnd_schFrnchsNoMob').val(frnchsNo);
	$('#searchMob').val(frnchsNm);
	$('#year').val(brandYear);
};

//검색내역 저장
function fn_saveSchBranWord(obj) {
	fnGetSyncAjaxData("/fran/saveSchBrandHistory.ajax", obj, function(_data) {
		if(_data.resultCode == 'success') {
			var obj = _data.dataList;
			//로컬스토리지에 저장
			if(obj.userNo == '0') {
				var schBrdWord = obj.schBrdWord;
				var frnchsNo = obj.frnchsNo;
				var year = obj.brandYear;
				var userNo = obj.userNo;
				setStorage('schHistArr', {"userNo":userNo, "schBrdWord":schBrdWord, "frnchsNo":frnchsNo, "year":year});
			}
		}
	});
}

//검색내역 삭제(userNo가 0 일경우 전체 삭제)
function fn_deleteSchBran(userNo, frnchsNo, e) {
	var frnchsNo = frnchsNo;
	if(frnchsNo == undefined) {//검색어 번호가 없으면 전체 삭제
		frnchsNo = "0";
	}
	if(userNo == '0') {
		deleteStorage(frnchsNo);
		fn_getSchBranList({"userNo":userNo});
	} else {
		fnGetSyncAjaxData("/fran/updateSchBrandHistory.ajax", {"userNo":userNo, "frnchsNo":frnchsNo}, function(_data) {
			var userNo = $("#userNo").val() == '' ? '0' : $("#userNo").val();
			fn_getSchBranList({"userNo":userNo});
		});
	}	
}