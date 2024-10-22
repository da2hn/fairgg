var eventModal = $('#eventModal');

var modalTitle = $('.modal-title');
var editAllDay = $('#edit-allDay');
var editDailSelngAm = $('#edit-dail-selng-am');
var editStart = $('#edit-start');
var editEnd = $('#edit-end');
var editExprnRegistNo = $('#edit-exprn-regist-no');
var editColor = $('#edit-color');
var editBsnDiaryCn = $('#edit-bsn-diary-cn');
var editHedofcFdbckCn = $('#edit-hedofc-fdbck-cn');

var modifyBtnContainer = $('.modalBtnContainer-modifyEvent');

/* ****************
 *  일정 편집
 * ************** */
var editEvent = function (event, element, view) {

    $('#deleteEvent').data('id', event._id); //클릭한 이벤트 ID

    $('.popover.fade.top').remove();
    $(element).popover("hide");

    modalTitle.html('일정 수정');
    editDailSelngAm.val(event.dailSelngAm);
    editStart.val(event.jobBeginTime);
    editEnd.val(event.jobEndTime);
    editExprnRegistNo.val(event.exprnRegistNo);
    editBsnDiaryCn.val(event.bsnDiaryCn);
    editHedofcFdbckCn.val(event.hedofcFdbckCn);
    editColor.val(event.backgroundColor);//.css('color', event.backgroundColor);

    modifyBtnContainer.show();
    eventModal.modal('show');

    //업데이트 버튼 클릭시
    $('#updateEvent').unbind();
    $('#updateEvent').on('click', function () {

    	if (editDailSelngAm.val() === '') {
    		alert('일매출액은 필수입니다.')
    		return false;
    	}
        if (editStart.val() > editEnd.val()) {
            alert('끝나는 시간이 앞설 수 없습니다.');
            return false;
        }

        var statusAllDay;
        var startDate;
        var endDate;
        var displayDate;

        if (editAllDay.is(':checked')) {
            statusAllDay = true;
            startDate = moment(editStart.val()).format('YYYY-MM-DD');
            endDate = moment(editEnd.val()).format('YYYY-MM-DD');
            displayDate = moment(editEnd.val()).add(1, 'days').format('YYYY-MM-DD');
        } else {
            statusAllDay = false;
            startDate = editStart.val();
            endDate = editEnd.val();
            displayDate = endDate;
        }

        eventModal.modal('hide');

        event.allDay = statusAllDay;
        event.dailSelngAm = editDailSelngAm.val();
        event.jobBeginTime = editStart.val();
        event.jobEndTime = editEnd.val();
        event.exprnRegistNo = editExprnRegistNo.val();
        event.backgroundColor = editColor.val();
        event.bsnDiaryCn = editBsnDiaryCn.val();
        event.hedofcFdbckCn = editHedofcFdbckCn.val();

        $("#calendar").fullCalendar('updateEvent', event);

        var params = {};

        params["dailSelngAm"] = editDailSelngAm.val();
    	params["jobBeginTime"] = editStart.val();
		params["jobEndTime"] = editEnd.val();
		params["bsnDiaryCn"] = editBsnDiaryCn.val();
		params["hedofcFdbckCn"] = editHedofcFdbckCn.val();
		params["exprnRegistNo"] = editExprnRegistNo.val();
		params["operDe"] = event.start.format("YYYY-MM-DD");
		if($("#userSeCode").val() == "US03"){
			params["reqUserNo"] = event.userNo;
		}

        //일정 업데이트
        $.ajax({
            type: "post",
            url: "/myPage/expr/diary/updateFrnchsExprnDiary.ajax",
            dataType:"json",
            data: params,
            success: function (data) {
                alert(data.resultMsg)
            },
            fail:function(data) {
            	alert(data.resultMsg)
            }
        });

    });
};
