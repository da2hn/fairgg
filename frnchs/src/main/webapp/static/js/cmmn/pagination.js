
var jsPager = function(){
	//총 아이템수
	this._total = null;
	//현재 페이지 
	this._currentPageNum = null;
	//총 페이지 수
	this._totalPageNum = null;
	//한 블록당 아이템수
	this._offset = null;
	//페이저가 그려질 뷰
	this._pagerView = null;
	//아이템이 그려질 뷰
	this._listView = null;
	//페이지정보가 그려질 뷰
	this._pagerInfoView = null;
	//아이템을 가져올 url 
	this._ajaxUrl = null;
	//아이템의 시작 인덱스
	this._startIdx = null;
	//아이템의 종료 인덱스
	this._endIdx = null;
	//검색 조건
	this._searchParam = {};
	//리스트를 그리기위한 메인 콜백 함수
	this.fnCallback = null;
	
	//param 1 총아이템갯수
	//param 2 검색 조건
	//param 3 pager를 그릴 영역
	//param 4 총 아이템 갯수, 시작 페이지~ 마지막 페이지 를 그릴 영역
	//param 5 list를 그릴 영역
	//param 6 item를 가져올 ajax url
	//param 7 item를 가져와서 그릴 virtualdom 함수
	this.init = function(total,searchParam,pagerView,listView,listInfoView,url,fn){
		this._total = total;
		this._searchParam = searchParam || {};
		this._currentPageNum=1;
		this._offset = 10;
		this._totalPageNum =0;
		this._pagerView = pagerView;
		this._listView = listView;
		this._pagerInfoView = listInfoView
		this._ajaxUrl = url;
		this.fnCallback = fn;
		if (total > 0){
			//총 페이지
			this._totalPageNum = Math.ceil(total / this._offset);
			this.draw(1);
		}else{
			this._startIdx =0;
			this._endIdx =0;
			this.draw(1);
			this._pagerView.html('');			
		}
	};
	this.drawPagerInfoView = function(){
		this._pagerInfoView.html('');
		vdom='<span class="total" style="padding-right:20px;">총 '+this._total+' 건</span>';
		vdom+='<span class="page">현재페이지범위 : '+ this._startIdx +'-'+this._endIdx+'</span>';
		this._pagerInfoView.html(vdom);
	};
	this.draw = function(pageNum){
		
		this._pagerView.html('');
		var vdom='';
		
		//첫 페이지로
		if (pageNum != 1)
			vdom += '<a href="#" onclick="pager.firstPage();" title="첫 페이지로 이동" class="first btnPage btnFirstPage">처음으로</a>';
		//이전 블록으로
		//if (pageNum != 1 && pageNum - this._offset > 0)
		//	vdom += '<li><a href="#" onclick="pager.preBlock();" title="다음 10페이지로" class="btnPage btnPrevBlock"><img src="/static/images/page/btn_block_prev.gif" alt="이전 10페이지로" /><div class="after"></div></a></li>';
		//이전 페이지로
		if (pageNum != 1)
			vdom += '<a href="#" onclick="pager.prePage();" title="이전 페이지로 이동" class="prev btnPage btnPrevPage">이전</a>';
		
		if (pageNum < 7){
			var block = 10;
			//10페이지씩 d/p: 10페이지 미만인 경우. _totalPageNum 
			if (this._totalPageNum < 10)
				block = this._totalPageNum ;
			
			for(var i = 1; i <= block;i++){
				if (pageNum==i){
					this._startIdx = this._offset*(pageNum-1)+1;
					
					// 마지막 페이지일 경우.
					if (this._totalPageNum==pageNum){
						this._endIdx = this._total;
					}else{
						this._endIdx = this._offset*pageNum;
					}
					
					vdom += '<a href="#" onclick="pager.paging('+i+');"  class="pageNum selected" title="'+i+'">'+i+'</a>';
				}else{
					vdom += '<a href="#" onclick="pager.paging('+i+');"  class="pageNum" title="'+i+'">'+i+'</a>';
				}
			}
		}else{
			const start = pageNum-5;
			var end = pageNum+5;
			if (this._totalPageNum < end){
				end = this._totalPageNum+1;
			}
			
			for(var i = start; i < end ;i++){
				if (pageNum==i){
					this._startIdx = this._offset*(pageNum-1)+1;
					
					// 마지막 페이지일 경우.
					if (this._totalPageNum==pageNum){
						this._endIdx = this._total;
					}else{
						this._endIdx = this._offset*pageNum;
					}
					vdom += '<a href="#" onclick="pager.paging('+i+');"  class="pageNum selected" title="'+i+'">'+i+'</a>';
				}else{
					vdom += '<a href="#" onclick="pager.paging('+i+');"  class="pageNum" title="'+i+'">'+i+'</a>';
				}
			}
		}
		//다음 페이지로
		if (pageNum != this._totalPageNum)
			vdom += '<a href="#" onclick="pager.nextPage();" title="다음 페이지로 이동" class="next btnPage btnNextPage">다음</a>';
		//다음 블록으로
		//if (pageNum +this._offset < this._totalPageNum)
		//	vdom += '<li><a href="#" onclick="pager.nextBlock();" title="다음 10페이지로" class="btnPage btnNextBlock"><img src="/static/images/page/btn_block_next.gif" alt="다음 10페이지로" /><div class="after"></div></a></li>';
		//마지막 페이지로
		if (pageNum != this._totalPageNum)
			vdom += '<a href="#" onclick="pager.lastPage();" title="끝 페이지로 이동" class="last btnPage btnLastPage">마지막으로</a>';

		
		vdom +='';
		this._pagerView.html(vdom);
		
		this.drawPagerInfoView();
	};
	this.paging =  function(pageNum){
		this._currentPageNum = pageNum;

		this._startIdx = this._offset*(pageNum-1)+1;
		this._endIdx = this._offset*pageNum;
		this._searchParam['startIdx'] = this._startIdx;
		this._searchParam['endIdx'] = this._endIdx;


		//console.log("pagination info",this);

		$.ajax({
			dataType:"json",
			type: "POST",
			url: this._ajaxUrl,
			data:this._searchParam,
			async: true,
			cache: false,
			/*contentType: "application/x-www-form-urlencoded; charset=UTF-8",*/
			beforeSend : function(request){
				//request.setRequestHeader("AJAX", true);
		 	},
			success : function(data, status, request) {
				console.log("js data",data	);
				pager.fnCallback(data.resultData,pager._listView);
				if (data.resultData[0].totalCount > 0){
					pager.draw(pageNum);
				}
			},
			complete: function(){

			},
		    error: function(request, status, error) {
		    	/*if (request.status =="403") {
		    		alert("로그인 정보가 없습니다. 로그인 하셔야 이용하실 수 있습니다.");
		    	} else {
		    		window.error = error;
					alert(error);
		    	}*/
			}
		});

	};
	this.prePage = function(){
		this._currentPageNum = this._currentPageNum-1;
		this.paging(this._currentPageNum);
	};

	this.preBlock = function (){
		this._currentPageNum = this._currentPageNum-this._offset;
		this.paging(this._currentPageNum);
	};

	this.firstPage = function (){89
		this._currentPageNum = 1;
		this.paging(this._currentPageNum);
	};

	this.nextPage =  function(){
		this._currentPageNum = this._currentPageNum+1;
		this.paging(this._currentPageNum);
	}

	this.nextBlock = function(){
		this._currentPageNum = this._currentPageNum+this._offset;
		this.paging(this._currentPageNum);
	};

	this.lastPage = function(){
		this._currentPageNum = this._totalPageNum;
		this.paging(this._currentPageNum);
	};
	
}