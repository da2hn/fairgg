var draggedEventIsAllDay;
var activeInactiveWeekends = true;

var calendarPc = $('#calendarPc').fullCalendar({
	locale                    : 'ko',
	timezone                  : "local",
	nextDayThreshold          : "00:00:00",
	allDaySlot                : true,
	displayEventTime          : true,
	displayEventEnd           : true,
	firstDay                  : 1, //�붿슂�쇱씠 癒쇱� �ㅺ쾶 �섎젮硫� 1
	weekNumbers               : false,
	selectable                : true,
	weekNumberCalculation     : "ISO",
	eventLimit                : true,
	views                     : {
									month : { eventLimit : 1 } // �� �좎쭨�� 理쒕� �대깽�� 12媛�, �섎㉧吏��� + 泥섎━��
								},
	eventLimitClick           : 'week', //popover
	navLinks                  : false,
	defaultDate               : moment(), //�ㅼ젣 �ъ슜�� �꾩옱 �좎쭨濡� �섏젙
	timeFormat                : 'HH:mm',
	defaultTimedEventDuration : '01:00:00',
	editable                  : true,
	minTime                   : '00:00:00',
	maxTime                   : '24:00:00',
	slotLabelFormat           : 'HH:mm',
	weekends                  : true,
	nowIndicator              : true,
	dayPopoverFormat          : 'MM/DD dddd',
	longPressDelay            : 0,
	eventLongPressDelay       : 0,
	selectLongPressDelay      : 0,
	contentHeight: 'auto',
});

var calendar = $('#calendar').fullCalendar({

 /** ******************
   *  OPTIONS
   * *******************/
  locale                    : 'ko',
  timezone                  : "local",
  nextDayThreshold          : "00:00:00",
  allDaySlot                : true,
  displayEventTime          : true,
  displayEventEnd           : true,
  firstDay                  : 1, //월요일이 먼저 오게 하려면 1
  weekNumbers               : false,
  selectable                : true,
  weekNumberCalculation     : "ISO",
  eventLimit                : true,
  views                     : {
                                month : { eventLimit : 1 } // 한 날짜에 최대 이벤트 12개, 나머지는 + 처리됨
                              },
  eventLimitClick           : 'week', //popover
  navLinks                  : false,
  defaultDate               : moment(), //실제 사용시 현재 날짜로 수정
  timeFormat                : 'HH:mm',
  defaultTimedEventDuration : '01:00:00',
  editable                  : true,
  minTime                   : '00:00:00',
  maxTime                   : '24:00:00',
  slotLabelFormat           : 'HH:mm',
  weekends                  : true,
  nowIndicator              : true,
  dayPopoverFormat          : 'MM/DD dddd',
  longPressDelay            : 0,
  eventLongPressDelay       : 0,
  selectLongPressDelay      : 0,
  contentHeight				: 'auto',
  header                    : {
                                left   : '',
//                                left   : 'today, prevYear, nextYear, viewWeekends',
                                center : 'prev, title, next',
                                right  : ''
//                                	right  : 'month, agendaWeek, agendaDay, listWeek'
                              },
  views                     : {
                                month : {
                                  columnFormat : 'dddd'
                                },
                                agendaWeek : {
                                  columnFormat : 'M/D ddd',
                                  titleFormat  : 'YYYY년 M월 D일',
                                  eventLimit   : false
                                },
                                agendaDay : {
                                  columnFormat : 'dddd',
                                  eventLimit   : false
                                },
                                listWeek : {
                                  columnFormat : ''
                                }
                              },
  customButtons             : { //주말 숨기기 & 보이기 버튼
                                viewWeekends : {
                                  text  : '주말',
                                  click : function () {
                                    activeInactiveWeekends ? activeInactiveWeekends = false : activeInactiveWeekends = true;
                                    $('#calendar').fullCalendar('option', {
                                      weekends: activeInactiveWeekends
                                    });
                                  }
                                }
                               },


  eventRender: function (event, element, view) {

    //일정에 hover시 요약
//     element.popover({
//       title: $('<div />', {
//         class: 'popoverTitleCalendar',
//         text: event.title
//       }).css({
//         'background': event.backgroundColor,
//         'color': event.textColor
//       }),
//       content: $('<div />', {
//           class: 'popoverInfoCalendar'
//         }).append('<p><strong>등록자:</strong> ' + event.username + '</p>')
//         .append('<p><strong>구분:</strong> ' + event.type + '</p>')
//         .append('<p><strong>시간:</strong> ' + getDisplayEventDate(event) + '</p>')
//         .append('<div class="popoverDescCalendar"><strong>설명:</strong> ' + event.description + '</div>'),
//       delay: {
//         show: "800",
//         hide: "50"
//       },
//       trigger: 'hover',
//       placement: 'top',
//       html: true,
//       container: 'body'
//     });
    element.find(".fc-content").find(".fc-time").remove();
    element.find(".fc-content").find(".fc-title").remove();

    var userNmTxt = "";
    if($("#userSeCode").val() == "US03"){
    	userNmTxt = "[" + event.userNm + "]";
    }

    if(event.dailSelngAm){
    	element.find(".fc-content").prepend(userNmTxt + "매출액:" + event.dailSelngAm + "원");
    }else{
    	if(moment() < moment(event.start)){
    		element.find(".fc-content").prepend(userNmTxt + "체험예정");
    	}else{
    		element.find(".fc-content").prepend(userNmTxt + "미입력");
    	}
    }
        // .prepend(event.title);


    return true;//filtering(event);

  },
  
  /*임시 - 달력 클릭하여 일정 등록 모달 열어주는 이벤트 */
//  dayClick: function(date, allDay, jsEvent, view) {
//	   var yy=date.format("YYYY");
//	   var mm=date.format("MM");
//	   var dd=date.format("DD");
//	   var ss=date.format("dd");
//	   
//	    var modifyBtnContainer = $('.modalBtnContainer-modifyEvent');
//	    var eventModal = $('#eventModal');
//	    var modalTitle = $('.modal-title');
//	    var editAllDay = $('#edit-allDay');
//	    var editDailSelngAm = $('#edit-dail-selng-am');
//	    var editStart = $('#edit-start');
//	    var editEnd = $('#edit-end');
//	    var editExprnRegistNo = $('#edit-exprn-regist-no');
//	    var editColor = $('#edit-color');
//	    var editBsnDiaryCn = $('#edit-bsn-diary-cn');
//	    var editHedofcFdbckCn = $('#edit-hedofc-fdbck-cn');
//	    
//	    modifyBtnContainer.show();
//	    eventModal.modal('show');
//	    
//	    modalTitle.html('일정 등록');
//	    editDailSelngAm.val("");
//	    editStart.val("");
//	    editEnd.val("");
//	    editExprnRegistNo.val("");
//	    editBsnDiaryCn.val("");
//	    editHedofcFdbckCn.val("");
//	    editColor.val("");
//
//	   console.log(date);
//	   console.log(allDay);
//	   console.log(jsEvent);
//	   console.log(view);
//  },

  /* ****************
   *  일정 받아옴
   * ************** */
   events: function (start, end, timezone, callback) {
	   var params = {};
	   params["exprnRegistNo"] = $("#exprnRegistNo").val();
     $.ajax({
       type: "post",
       url: "/myPage/expr/diary/selectFrnchsExprnDiaryList.ajax",
       dataType:"json",
       data: params
         // 화면이 바뀌면 Date 객체인 start, end 가 들어옴
         //startDate : moment(start).format('YYYY-MM-DD'),
         //endDate   : moment(end).format('YYYY-MM-DD')
       ,
       success: function (response) {
    	   var fixedDate = response.frnchsExprnDiaryList.map(function (array) {
           if (array.allDay && array.start !== array.end) {
        	   array.end = moment(array.end).add(1, 'days'); // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
           }
           return array;
         });

         callback(fixedDate);
       }
     });
   },

  eventAfterAllRender: function (view) {
    if (view.name == "month") $(".fc-content").css('height', 'auto');
  },

  //일정 리사이즈
  eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
    $('.popover.fade.top').remove();

    /** 리사이즈시 수정된 날짜반영
     * 하루를 빼야 정상적으로 반영됨. */
    var newDates = calDateWhenResize(event);

    //리사이즈한 일정 업데이트
    $.ajax({
      type: "get",
      url: "",
      data: {
        //id: event._id,
        //....
      },
      success: function (response) {
        alert('수정: ' + newDates.startDate + ' ~ ' + newDates.endDate);
      }
    });

  },

  eventDragStart: function (event, jsEvent, ui, view) {
    draggedEventIsAllDay = event.allDay;
  },

  //일정 드래그앤드롭
  eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
    $('.popover.fade.top').remove();

    //주,일 view일때 종일 <-> 시간 변경불가
    if (view.type === 'agendaWeek' || view.type === 'agendaDay') {
      if (draggedEventIsAllDay !== event.allDay) {
        alert('드래그앤드롭으로 종일<->시간 변경은 불가합니다.');
        location.reload();
        return false;
      }
    }

    // 드랍시 수정된 날짜반영
    var newDates = calDateWhenDragnDrop(event);
    var params = {};
    var tmp = event.id;
    var operDe = tmp.substr(9,12);
    
    params["dailSelngAm"] = event.dailSelngAm;
	params["jobBeginTime"] = event.jobBeginTime;
	params["jobEndTime"] = event.jobEndTime;
	params["bsnDiaryCn"] = event.bsnDiaryCn;
	params["hedofcFdbckCn"] = event.hedofcFdbckCn;
	params["exprnRegistNo"] = event.exprnRegistNo;
	params["operDeNow"] = event.start.format("YYYY-MM-DD");
	params["operDe"] = operDe
	if($("#userSeCode").val() == "US03"){
		params["reqUserNo"] = event.userNo;
	}

    //드롭한 일정 업데이트
    $.ajax({
        type: "post",
        url: "/myPage/expr/diary/updateFrnchsExprnDiaryDrag.ajax",
        dataType:"json",
        data: params,
        success: function (data) {
            alert(data.resultMsg)
        },
        fail:function(data) {
        	alert(data.resultMsg)
        }
    });
    
    
    
    
    //드롭한 일정 업데이트
//    $.ajax({
//      type: "get",
//      url: "",
//      data: {
//        //...
//      },
//      success: function (response) {
//        alert('수정: ' + newDates.startDate + ' ~ ' + newDates.endDate);
//      }
//    });

  },

  select: function (startDate, endDate, jsEvent, view) {
    var today = moment();

    if (view.name == "month") {
      startDate.set({
        hours: today.hours(),
        minute: today.minutes()
      });
      startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
      endDate = moment(endDate).subtract(1, 'days');

      endDate.set({
        hours: today.hours() + 1,
        minute: today.minutes()
      });
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    } else {
      startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    }

    //날짜 클릭시
//    $(".fc-body").on('click', 'td', function (e) {
//      e.preventDefault();

//      console.log(startDate + " // " + endDate + " // " + jsEvent + " // " + view);

//      if($(this).attr("class") != "fc-event-container"){
//    	  newEvent(startDate, endDate, $(this).html());
//      }

//    });

  },
  //이벤트 클릭시 수정이벤트
  eventClick: function (event, jsEvent, view) {
	  if(event.start <= moment()){
		  editEvent(event);
	  }else{
		  alert("오늘 이후의 날짜는 수정할수 없습니다.");
		  return;
	  }
  }

});

function getDisplayEventDate(event) {

  var displayEventDate;

  if (event.allDay == false) {
    var startTimeEventInfo = moment(event.start).format('HH:mm');
    var endTimeEventInfo = moment(event.end).format('HH:mm');
    displayEventDate = startTimeEventInfo + " - " + endTimeEventInfo;
  } else {
    displayEventDate = "하루종일";
  }

  return displayEventDate;
}

function filtering(event) {
  var show_username = true;
  var show_type = true;

  var username = $('input:checkbox.filter:checked').map(function () {
    return $(this).val();
  }).get();
  var types = $('#type_filter').val();

  show_username = username.indexOf(event.username) >= 0;

  if (types && types.length > 0) {
    if (types[0] == "all") {
      show_type = true;
    } else {
      show_type = types.indexOf(event.type) >= 0;
    }
  }

  return show_username && show_type;
}

function calDateWhenResize(event) {

  var newDates = {
    startDate: '',
    endDate: ''
  };

  if (event.allDay) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = moment(event.end._d).subtract(1, 'days').format('YYYY-MM-DD');
  } else {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD HH:mm');
    newDates.endDate = moment(event.end._d).format('YYYY-MM-DD HH:mm');
  }

  return newDates;
}

function calDateWhenDragnDrop(event) {
  // 드랍시 수정된 날짜반영
  var newDates = {
    startDate: '',
    endDate: ''
  }

  // 날짜 & 시간이 모두 같은 경우
  if(!event.end) {
    event.end = event.start;
  }

  //하루짜리 all day
  if (event.allDay && event.end === event.start) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = newDates.startDate;
  }

  //2일이상 all day
  else if (event.allDay && event.end !== null) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = moment(event.end._d).subtract(1, 'days').format('YYYY-MM-DD');
  }

  //all day가 아님
  else if (!event.allDay) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD HH:mm');
    newDates.endDate = moment(event.end._d).format('YYYY-MM-DD HH:mm');
  }

  return newDates;
}