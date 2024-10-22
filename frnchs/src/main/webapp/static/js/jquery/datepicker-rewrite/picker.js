/*
 * Experimental datepicker rewrite to evaluate jquery-tmpl.
 *
 * Based on Marc Grabanski's https://github.com/1Marc/jquery-ui-datepicker-lite
 */
(function( $, undefined ) {

var idIncrement = 0;
$.widget( "ui.datepickerAccessible", {
	options: {
		eachDay: $.noop,
		position: {
			my: "left top",
			at: "left bottom"
		},
		dateFormat: "d",
		buttonImage: "/images/common/calendar.gif",
		buttonText: "달력보기"
	},
	_create: function() {

		var that = this;
		this.date = $.date();
		this.date.eachDay = this.options.eachDay;

		this.id = "ui-datepicker-" + idIncrement;
		idIncrement++;
		if ( this.element.is( "input" ) ) {
			this.picker = $( "<div>" );
			this.picker.attr("id", "picker_"+idIncrement);
			this.picker.css({"position":"absolute", "left":this.element.position().left});
			this.picker.insertAfter( this.element ).hide();

			this.toggleButton = $( "<button class=\"btnToggleCalendar\" type=\"button\" style=\"border:0px; display:inline-block; width:20px; height:20px; cursor:pointer; background: url('"+this.options.buttonImage+"') no-repeat; text-indent: -9999px;\" title=\""+this.options.buttonText+"\">"+this.options.buttonText+"</button>" );
			this.toggleButton.attr("id", "toggleButton_"+idIncrement);
			var pickerId = this.picker.attr("id");
			var element = this.element;
			var wg = this;
			this.toggleButton.insertAfter( this.element ).bind("click", function(e) {
				if (element.val() != "") {
					var date = new Date(element.val());

					wg.date.setTime( date.getTime() );
					wg.refresh();
				}

				$("#"+pickerId).css({"position":"absolute", "left":element.position().left, "zIndex":9999});

				if ($("#"+pickerId).css("display")=="none") {
					$("#"+pickerId).show();
				} else {
					$("#"+pickerId).hide();
				}
			});

		} else {
			this.inline = true;
			this.picker = this.element;
		}
		this.picker.delegate( ".ui-datepicker-prev", "click", function( event ) {
			event.preventDefault();
			that.date.adjust( "M", -1 );
			$(this).attr("title", Globalize.localize( "datepicker" ).prevText + " ("+that.date.prevYear() + "-" + that.date.prevMonth()+")");
			that.refresh();
		});
		this.picker.delegate( ".ui-datepicker-next", "click", function( event ) {
			event.preventDefault();
			that.date.adjust( "M", 1 );
			$(this).attr("title", Globalize.localize( "datepicker" ).nextText + " ("+that.date.nextYear() + "-" + that.date.nextMonth()+")");
			that.refresh();
		});
		this.picker.delegate( ".ui-datepicker-calendar a", "mousedown", function( event ) {
			event.preventDefault();
			// TODO exclude clicks on lead days or handle them correctly
			// TODO store/read more then just date, also required for multi month picker
			that.select( event, $( this ).data( "timestamp" ) );
			that.grid.focus( 1 );
		});

		this.picker.delegate( ".ui-datepicker-header a, .ui-datepicker-calendar a", "mouseenter.datepicker mouseleave.datepicker", function() {
			$( this ).toggleClass( "ui-state-hover" );
		});

		this.picker.delegate( ".ui-datepicker-calendar", "keydown.datepicker", function(event) {
			if (jQuery.inArray(event.keyCode, [ 13, 33, 34, 35, 36, 37, 38, 39, 40]) == -1) {
				//only interested navigation keys
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			var activeCell = $( "#" + that.grid.attr( "aria-activedescendant" ) ),
				oldMonth = that.date.month(),
				oldYear = that.date.year();

			switch ( event.keyCode ) {
				case $.ui.keyCode.ENTER:
					that.select( event, activeCell.children( "a:first" ).data( "timestamp" ) );
					return;
					break;
				case $.ui.keyCode.PAGE_UP:
					that.date.adjust( event.altKey ? "Y" : "M", 1 );
					break;
				case $.ui.keyCode.PAGE_DOWN:
					that.date.adjust( event.altKey ? "Y" : "M", -1 );
					break;
				case $.ui.keyCode.END:
					that.date.setDay( that.date.daysInMonth() );
					break;
				case $.ui.keyCode.HOME:
					that.date.setDay( 1 );
					break;
				case $.ui.keyCode.LEFT:
					that.date.adjust( "D", -1 );
					break;
				case $.ui.keyCode.UP:
					that.date.adjust( "D", -7 );
					break;
				case $.ui.keyCode.RIGHT:
					that.date.adjust( "D", 1 );
					break;
				case $.ui.keyCode.DOWN:
					that.date.adjust( "D", 7 );
					break;
				default:
					return;
			}

			if ( that.date.month() != oldMonth || that.date.year() != oldYear ) {
				that.refresh();
				that.grid.focus( 1 );
			}
			else {
				var newId = that.id + "-" + that.date.day(),
					newCell = $("#" + newId);

				if ( !newCell.length ) {
					return;
				}
				that.grid.attr("aria-activedescendant", newId);

				activeCell.children("a").removeClass("ui-state-focus");
				newCell.children("a").addClass("ui-state-focus");
			}
		});

		this.createTmpl();
	},
	createTmpl: function() {
		this.date.refresh();

		var date =  this.date;
		var labels = Globalize.localize( "datepicker" );
		var instance = {	id: this.id, focusedDay: this.date.day() };

		var html = createCalendarTemplete(date, labels, instance);
		$(html).appendTo( this.picker ).find( "button" ).button().end();

		if ( this.inline ) {
			this.picker.children().addClass( "ui-datepicker-inline" );
		}
		// against display:none in datepicker.css
		this.picker.find( ".ui-datepicker" ).css( "display", "block" );
		this.grid = this.picker.find( ".ui-datepicker-calendar" );

		var date = this.date;
		var wg = this;

		//오늘버튼 클릭시
		this.picker.find( ".ui-datepicker-current" ).bind("click", function(e) {
			var today = new Date();
			date.setFullDate(today.getFullYear(), today.getMonth(), today.getDate());
			wg.select(e, today.getTime());
		});
		//닫기버튼 클릭시
		this.picker.find( ".ui-datepicker-close" ).bind("click", function(e) {
			wg.close();
		});

	},
	refresh: function() {
		//determine which day gridcell to focus after refresh
		//TODO: Prevent disabled cells from being focused
		this.date.refresh();
		$(".ui-datepicker-title", this.picker).html(createCalendarTitleTemplate(this.date));

		var date =  this.date;
		var labels = Globalize.localize( "datepicker" );
		var instance = {	id: this.id, focusedDay: this.date.day() };

		var html = createCalendarGridTemplete(date, labels, instance);

		this.grid = this.grid.replaceWith( html );
		this.grid = this.picker.find( ".ui-datepicker-calendar" );
	},
	open: function( event ) {
		if ( !this.inline ) {
			this.date = $.date( this.element.val() );
			this.date.eachDay = this.options.eachDay;
			this.date.select();
			this.refresh();
		}
	},
	close: function( event ) {
		var pickerId = this.picker.attr("id");
		$("#"+pickerId).hide();
		this.toggleButton.focus();
	},
	select: function( event, time ) {
		this.date.setTime( time ).select();
		this.refresh();
		if ( !this.inline ) {
			this.element.val( this.date.format(this.options.dateFormat) );
			this.close();
		}
		this._trigger( "select", event, {
			date: this.date.format(this.options.dateFormat)
		});
	},
	_destroy: function() {
		if ( !this.inline ) {
			this.picker.remove();
		}
	},
	widget: function() {
		return this.picker;
	}
});

}( jQuery ));

function createCalendarTemplete(date, labels, instance) {
	var html = "";
	html += "		<div class=\"ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\" role=\"region\" aria-labelledby=\"" + instance.id + "-title\">";
	html += "			<div class=\"ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all\">";
	html += "				<a href=\"#\" class=\"ui-datepicker-prev ui-corner-all\" title=\"" + labels.prevText + " (" + date.prevYear() + "-" + date.prevMonth() + ")\"><span class=\"ui-icon ui-icon-circle-triangle-w\">" + labels.prevText + "</span></a>";
	html += "				<a href=\"#\" class=\"ui-datepicker-next ui-corner-all\" title=\"" + labels.nextText + " (" + date.nextYear() + "-" + date.nextMonth() + ")\"><span class=\"ui-icon ui-icon-circle-triangle-e\">" + labels.nextText + "</span></a>";
	html += "				<div role=\"header\" id=\"" + instance.id + "-title\">";
	html += "					<div id=\"" + instance.id + "-month-lbl\" class=\"ui-datepicker-title\">";
	html += "						" + createCalendarTitleTemplate(date);
	html += "					</div>";
	html += "					<span class=\"ui-helper-hidden-accessible\">, " + labels.datePickerRole + "</span>";
	html += "				</div>";
	html += "			</div>";
	html += "			" + createCalendarGridTemplete(date, labels, instance);
	html += "			<div class=\"ui-datepicker-buttonpane ui-widget-content\">";
	html += "				<button type=\"button\" class=\"ui-datepicker-current\">" + labels.currentText + "</button>";
	html += "				<button type=\"button\" class=\"ui-datepicker-close\">" + labels.closeText + "</button>";
	html += "			</div>";
	html += "		</div>";
	return html;
}
function createCalendarGridTemplete(date, labels, instance) {

	var html = "";
	html += "		<table class=\"ui-datepicker-calendar\" role=\"grid\" aria-readonly=\"true\" aria-labelledby=\"" + instance.id + "-month-lbl\" tabindex=\"0\" aria-activedescendant=\"" + instance.id + "-" + instance.focusedDay + "\" summary=\"달력을 나타내는 표로 각월에 해당하는 일자가 주간별로 순차적으로 나열되어 있습니다. 방향키로 일자를 이동시킬 수 있으며, 탭키를 누르면 다음 단계로 이동합니다. 전 단계로 이동하시려면 쉬프트+탭키를 눌러주세요.\">";
	html += "			<caption style=\"visibility:hidden;\">달력</caption>";
	html += "			<thead role=\"presentation\">";
	html += "				<tr role=\"row\">";
	for (var i=0; i<date.weekdays().length; i++) {
		var day = date.weekdays()[i];
		html += "						<th scope=\"col\" class=\"\" style=\"font-size:11px;\" role=\"columnheader\" abbr=\"" + day.fullname + "\" aria-label=\"" + day.fullname + "\"><span title=\"" + day.fullname + "\">" + day.shortname + "</span></th>";
	}
	html += "				</tr>";
	html += "			</thead>";
	html += "			<tbody role=\"presentation\">";
	for (var i=0; i<date.days().length; i++) {
		var week = date.days()[i];
		html += "				<tr role=\"row\">";
		for (var j=0; j<week.days.length; j++) {
			var day = week.days[j];
			html += "						<td style=\"font-size:11px;\" ";
			if (day.render) {
				html += "					id=\"" + instance.id + "-" + day.date + "\"";
			}
			html += "						role=\"gridcell\" aria-selected=\"" + (day.current?"true":"false") + "\"";
			html += "						" + (!day.selectable?"aria-disabled=\"true\"":"");
			html += "						>";

			if (day.render) {
				if (day.selectable) {
					html += "								<a title=\"" + day.year + "-" + day.month + "-" + day.date +" (" + day.dayOfWeek + ")\" ";
					html += "								class=\"" + (day.date == instance.focusedDay?"ui-state-focus":"") + " ui-state-default ";
					html += " "+(day.current?" ui-state-active ":"") + (day.today ? " ui-state-highlight ":"") + day.extraClasses + "\" href=\"#\" tabindex=\"-1\" data-timestamp=" + day.timestamp + ">"+ day.date;
					if (day.today) {
						html += "									<span class=\"ui-helper-hidden-accessible\">, " + labels.currentText + "</span>";
					}
					html += "								</a>";
				} else {
					html += "								<span class=\""+ (day.current ? " ui-state-active ":"") + (day.today? " ui-state-highlight ":"") + day.extraClasses +  "\">";
					html += "								" + day.date;
					html += "								</span>";
				}
			}
			html += "						</td>";
		}
		html += "				</tr>";
	}
	html += "			</tbody>";
	html += "		</table>";
	return html;
}
function createCalendarTitleTemplate(date, labels, instance) {
	var html = "<span class=\"ui-datepicker-year\">" + date.year() + " " + date.yearname() + "</span> <span class=\"ui-datepicker-month\">" + date.monthname() + "</span>";
	return html;
}