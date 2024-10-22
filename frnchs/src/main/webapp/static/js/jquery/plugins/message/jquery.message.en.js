
	jQuery.extend({
		/*
		 * ========얼럿모달창========
		 * make by jhh. 2009-05-26
		 * 파라미터설명
		 * [필수] msg : 얼럿메세지
		 * [옵션] type : 얼럿타입 (notice, warn, error, lock)
		 * [옵션] title : 얼럿창제목
		 * [옵션] icon : 얼럿아이콘이미지경로
		 * [옵션] width : 얼럿창 가로사이즈
		 * [옵션] height : 얼럿창 세로사이즈
		 *
		 * 예제1 : $.showAlert('알림메세지입니다');
		 * 예제2 : $.showAlert('잠김메세지입니다.', {type:'lock', width:500, height:300});
		 */
		showAlert: function(msg, parameters) {
			map = {
				type : "",
				title : "Notice",
				icon : "/images/common/icon_notice.png",
				width: 0,
				height: 0,
				autoHide: true,
				hideDelay: 3000,
				callback: function(){}
			};
			if (parameters) {
				map = jQuery.extend(map,parameters);	//변수에 담긴값 셋팅

				if (map.type=="notice") {
					if (!parameters.title) {
						map.title = "Notice";
					}
					if (!parameters.icon) {
						map.icon = "/images/common/icon_notice.png";
					}
				} else if (map.type=="warn") {
					if (!parameters.title) {
						map.title = "Warning";
					}
					if (!parameters.icon) {
						map.icon = "/images/common/icon_warn.png";
					}
				} else if (map.type=="error") {
					if (!parameters.title) {
						map.title = "Error";
					}
					if (!parameters.icon) {
						map.icon = "/images/common/icon_error.png";
					}
				} else if (map.type=="lock") {
					if (!parameters.title) {
						map.title = "Access Denied.";
					}
					if (!parameters.icon) {
						map.icon = "/images/common/icon_lock.png";
					}
				}
			}

			jAlert(msg, map, function(r){
				map.callback();
			});
		},

		/*
		 * ========컨펌창========
		 * make by jhh. 2009-05-26
		 * 파라미터설명
		 * [필수] msg : 얼럿메세지
		 * [필수] callback : yes를 클릭했을경우 실행할 콜백메소드이름 또는 메소드
		 * [옵션] title : 얼럿창제목
		 * [옵션] icon : 얼럿아이콘이미지경로
		 * [옵션] width : 얼럿창 가로사이즈
		 * [옵션] height : 얼럿창 세로사이즈
		 *
		 * 예제 : $.showConfirm('알림메세지입니다', { callback:function(){alert('예를 클릭하셧네요.');}, width:500 });
		 */
		showConfirm: function(msg, parameters) {

			map = {
				title : "Confrim",
				icon : "/images/common/icon_question.png",
				width: 0,
				height: 0,
				yesCallback: function(){},
				noCallback: function(){}
			};
			if (parameters) {
				map = jQuery.extend(map,parameters);	//변수에 담긴값 셋팅

				if (map.type=="notice") {
					if (!parameters.title) {
						map.title = "Notice";
					}
					if (!parameters.icon) {
						map.icon = "/images/common/icon_notice.png";
					}
				} else if (map.type=="warn") {
					if (!parameters.title) {
						map.title = "Warning";
					}
					if (!parameters.icon) {
						map.icon = "/images/common/icon_warn.png";
					}
				} else if (map.type=="error") {
					if (!parameters.title) {
						map.title = "Error";
					}
					if (!parameters.icon) {
						map.icon = "/images/common/icon_error.png";
					}
				} else if (map.type=="lock") {
					if (!parameters.title) {
						map.title = "Access Denied.";
					}
					if (!parameters.icon) {
						map.icon = "/images/common/icon_lock.png";
					}
				}
			}
			jConfirm(msg, map, function(r){
				if (r==true) {
					map.yesCallback();
				} else {
					map.noCallback();
				}
			});
		},

		showPasswordConfirm: function(parameters) {

			map = {
				title : "비밀번호 확인",
				msg : "비밀번호를 입력해주세요.",
				icon : "/images/common/icon_lock.png",
				width: 320,
				height: 140,
				value: "",
				yesCallback: function(){},
				noCallback: function(){}
			};
			map = jQuery.extend({},map,parameters);	//변수에 담긴값 셋팅

			jPrompt(map.msg, map.value, map, function(r){
				if (r) {
					map.yesCallback(r);
				} else {
					map.noCallback();
				}
			});

		}


	});


	// jQuery Alert Dialogs Plugin
	//
	// Version 1.1
	//
	// Cory S.N. LaViska
	// A Beautiful Site (http://abeautifulsite.net/)
	// 14 May 2009
	//
	// Visit http://abeautifulsite.net/notebook/87 for more information
	//
	// Usage:
//			jAlert( message, [title, callback] )
//			jConfirm( message, [title, callback] )
//			jPrompt( message, [value, title, callback] )
	//
	// History:
	//
//			1.00 - Released (29 December 2008)
	//
//			1.01 - Fixed bug where unbinding would destroy all resize events
	//
	// License:
	//
	// This plugin is dual-licensed under the GNU General Public License and the MIT License and
	// is copyright 2008 A Beautiful Site, LLC.
	//
	(function($) {

		$.alerts = {

			// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

			verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
			horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
			repositionOnResize: true,           // re-centers the dialog on window resize
			overlayOpacity: .4,                // transparency level of overlay
			overlayColor: '#000',               // base color of overlay
			draggable: false,                    // make the dialogs draggable (requires UI Draggables plugin)
			okButton: '&nbsp;OK&nbsp;',         // text for the OK button
			cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
			dialogClass: null,                  // if specified, this class will be applied to all dialogs

			// Public methods

			alert: function(message, map, callback) {
				if( map.title == null ) map.title = 'Alert';
				$.alerts._show(map, message, null, 'alert', function(result) {
					if( callback ) callback(result);
				});
			},

			confirm: function(message, map, callback) {
				if( map == null ) map.title = 'Confirm';
				$.alerts._show(map, message, null, 'confirm', function(result) {
					if( callback ) callback(result);
				});
			},

			prompt: function(message, value, map, callback) {
				if( map == null ) map.title = 'Prompt';
				$.alerts._show(map, message, value, 'prompt', function(result) {
					if( callback ) callback(result);
				});
			},

			// Private methods

			_show: function(map, msg, value, type, callback) {

				$.alerts._hide();
				$.alerts._overlay('show');

				$("BODY").append(
				  '<div id="popup_container">' +
				    '<h1 id="popup_title"></h1>' +
				    '<div id="popup_content">' +
				      '<div id="popup_message"></div>' +
					'</div>' +
				  '</div>');

				if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);

				// IE6 Fix
				var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed';

				$("#popup_container").css({
					position: pos,
					zIndex: 99999,
					padding: 0,
					margin: 0
				});
				if (map.width > 0) {
					$("#popup_container").css({
						width: map.width
					});
				}
				if (map.height > 0) {
					$("#popup_container").css({
						height: map.height
					});
				}

				$("#popup_container").addClass("ui-corner-all").css({
					"border-top-left-radius" : "10px",
					"border-top-right-radius" : "10px",
					"border-bottom-left-radius" : "10px",
					"border-bottom-right-radius" : "10px"
				});

				$("#popup_title").addClass("ui-corner-top").css({
					"border-top-left-radius" : "10px",
					"border-top-right-radius" : "10px"
				});

				$("#popup_title").text(map.title);
				//$("#popup_content").addClass(type);
				$("#popup_content").css({
					backgroundImage : "url("+map.icon+")",
					backgroundPosition : "20px 25px"
				});

				$("#popup_message").text(msg);
				$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );

				$("#popup_container").css({
					minWidth: $("#popup_container").outerWidth(),
					maxWidth: $("#popup_container").outerWidth()
				});
				if (jQuery.browser.msie && jQuery.browser.version=='7.0') {
					$("#popup_title").css({
						width: $("#popup_container").outerWidth()-10
					});
				}

				$.alerts._reposition();
				$.alerts._maintainPosition(true);

				switch( type ) {
					case 'alert':
						if (map.autoHide) {
							$("#popup_title").remove();

							$("#popup_content").addClass("ui-corner-all").css({
								"border-top-left-radius" : "10px",
								"border-top-right-radius" : "10px",
								"border-bottom-left-radius" : "10px",
								"border-bottom-right-radius" : "10px",
								backgroundColor : "#2CA5E3",
								color: "#FFFFFF",
								backgroundImage : "url("+map.icon+")",
								backgroundPosition : "15px 25px",
								minHeight: "50px",
								lineHeight: "50px"
							});
							$("#popup_container").fadeOut(map.hideDelay);
							$.alerts._overlay('hide');
							map.callback();

							$.alerts._maintainPosition(false);
							/*
							$("#popup_container").remove();
							*/
						} else {
							$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="btn" /></div>');
							$("#popup_ok").click( function() {
								$.alerts._hide();
								callback(true);
							});
							$("#popup_ok").focus().keypress( function(e) {
								if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
							});
						}
					break;
					case 'confirm':
						$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="btn" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" class="btn" /></div>');
						$("#popup_ok").click( function() {
							$.alerts._hide();
							if( callback ) callback(true);
						});
						$("#popup_cancel").click( function() {
							$.alerts._hide();
							if( callback ) callback(false);
						});
						$("#popup_ok").focus();
						$("#popup_ok, #popup_cancel").keypress( function(e) {
							if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
							if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
						});
					break;
					case 'prompt':
						$("#popup_message").append('<br /><input type="text" class="inputLeft" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="btn" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" class="btn" /></div>');
						$("#popup_prompt").width( 150 );
						$("#popup_ok").click( function() {
							var val = $("#popup_prompt").val();
							if (val=="") {
								$("#popup_prompt").focus();
								return;
							}
							$.alerts._hide();
							if( callback ) callback( val );
						});
						$("#popup_cancel").click( function() {
							$.alerts._hide();
							if( callback ) callback( null );
						});
						$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
							if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
							if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
						});
						if( value ) $("#popup_prompt").val(value);
						$("#popup_prompt").focus().select();
					break;
				}

				// Make draggable
				if( $.alerts.draggable ) {
					try {
						$("#popup_container").draggable({ handle: $("#popup_title") });
						$("#popup_title").css({ cursor: 'move' });
					} catch(e) { /* requires jQuery UI draggables */ }
				}
				$(".btn").addClass('ui-state-default ui-corner-all').hover(function() { $(this).addClass('ui-state-hover'); }, function() { $(this).removeClass('ui-state-hover'); });
			},

			_hide: function() {
				$("#popup_container").remove();
				$.alerts._overlay('hide');
				$.alerts._maintainPosition(false);
			},

			_overlay: function(status) {
				switch( status ) {
					case 'show':
						$.alerts._overlay('hide');
						$("BODY").append('<div id="popup_overlay"></div>');
						$("#popup_overlay").css({
							position: 'absolute',
							zIndex: 99998,
							top: '0px',
							left: '0px',
							width: $(document).width(),
							height: $(document).height(),
							background: $.alerts.overlayColor,
							opacity: $.alerts.overlayOpacity
						});
					break;
					case 'hide':
						$("#popup_overlay").remove();
					break;
				}
			},

			_reposition: function() {

				var outerWidth = $("#popup_container").outerWidth();
				var outerHeight = $("#popup_container").outerHeight();
				if (outerWidth == 0) {
					outerWidth = $("#popup_container").css("minWidth").replace("px", "");
				}
				var top = (($(window).height() / 2) - (outerHeight / 2)) + $.alerts.verticalOffset;
				var left = (($(window).width() / 2) - (outerWidth / 2)) + $.alerts.horizontalOffset;

				if( top < 0 ) top = 0;
				if( left < 0 ) left = 0;

				// IE6 fix
				if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();

				$("#popup_container").css({
					top: top + 'px',
					left: left + 'px'
				});

				$("#popup_overlay").css({
					width: $(document).width(),
					height: $(document).height(),
					position: "fixed"
				});
				/*
				alert(
						"window width : "+$(window).width()+"\n\n" +
						"outerWidth : " + outerWidth +"\n\n" +
						"width : " + $("#popup_container").width() +"\n\n" +
						"top : "+top+", left : "+left
						);
				*/
			},

			_maintainPosition: function(status) {
				if( $.alerts.repositionOnResize ) {
					switch(status) {
						case true:
							$(window).bind('resize', $.alerts._reposition);
						break;
						case false:
							$(window).unbind('resize', $.alerts._reposition);
						break;
					}
				}
			}

		}

		// Shortuct functions
		jAlert = function(message, map, callback) {
			$.alerts.alert(message, map, callback);
		}

		jConfirm = function(message, map, callback) {
			$.alerts.confirm(message, map, callback);
		};

		jPrompt = function(message, value, map, callback) {
			$.alerts.prompt(message, value, map, callback);
		};

	})(jQuery);