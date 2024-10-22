/*!
 * jQuery Print Previw Plugin v1.0.1
 *
 * Copyright 2011, Tim Connell
 * Licensed under the GPL Version 2 license
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Date: Wed Jan 25 00:00:00 2012 -000
 */

(function($) {

	// Initialization
	$.fn.printPreview = function(selector) {
		this.each(function() {
			$(this).bind('click', function(e) {
			    e.preventDefault();
			    if (!$('#print-modal').length) {
			        $.printPreview.loadPrintPreview(selector);
			    }
			});
		});
		return this;
	};

    // Private functions
    var mask, size, print_modal, print_controls;
    $.printPreview = {
        loadPrintPreview: function(selector) {
        	if(!selector) {
        		selector = "body";
        	}

            // Declare DOM objects
            print_modal = $('<div id="print-modal"></div>');
            print_controls = $('<div id="print-modal-controls">' +
                                    '<a href="#" class="print" title="Print page">Print page</a>' +
                                    '<a href="#" class="close" title="Close print preview">Close</a>').hide();
            var print_frame = $('<iframe id="print-modal-content" scrolling="no" border="0" frameborder="0" name="print-frame" />');

            // Raise print preview window from the dead, zooooooombies
            print_modal
                .hide()
                .append(print_controls)
                .append(print_frame)
                .appendTo('body');

            // The frame lives
            for (var i=0; i < window.frames.length; i++) {
            	// 2013.04.29 외부프레임 엑세스 거부 문제 수정
            	try {
	                if (window.frames[i].name == "print-frame") {
	                    var print_frame_ref = window.frames[i].document;
	                    break;
	                }
            	} catch(e) {
            		//alert(e);
            	}
            }
            print_frame_ref.open();

            /** 2013.04.28 CSS 추가 **/
            print_frame_ref.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                    '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">' +
                    '<head><title>' + document.title + '</title>' +
                    '<link type="text/css" rel="stylesheet" href="/admin/css/base.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/admin/css/layout.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/admin/css/board.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/admin/css/menu.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/admin/css/blue.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/admin/css/button.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/admin/css/pager.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/admin/css/research.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/jquery/css/custom-theme/jquery-ui-1.10.2.custom.css" />' +
                    '<link type="text/css" rel="stylesheet" href="/jquery/plugins/jstree-v.pre1.0/themes/apple/style.css" />' +
                    '</head>' +
                    '<body></body>' +
                    '</html>');
            print_frame_ref.close();

            // 2013.04.30 chart 인쇄 제외

            // Grab contents and apply stylesheet
            var $iframe_head = $('head link[media*=print], head link[media=all]').clone(),
                $iframe_body = $(selector+' > *:not(#print-modal):not(script):not(.chart)').clone();
            $iframe_head.each(function() {
                $(this).attr('media', 'all');
            });
            if (!$.browser.msie && !($.browser.version < 7) ) {
                $('head', print_frame_ref).append($iframe_head);
                $('body', print_frame_ref).append($iframe_body);
            }
            else {
                $(selector+' > *:not(#print-modal):not(script):not(.chart)').clone().each(function() {
                    $('body', print_frame_ref).append(this.outerHTML);
                });
                $('head link[media*=print], head link[media=all]').each(function() {
                    $('head', print_frame_ref).append($(this).clone().attr('media', 'all')[0].outerHTML);
                });
            }

            // Disable all links
            $('a', print_frame_ref).bind('click.printPreview', function(e) {
                e.preventDefault();
            });
            $('button', print_frame_ref).bind('click.printPreview', function(e) {
                e.preventDefault();
            });

            // Introduce print styles
            $('head').append('<style type="text/css">' +
                '@media print {' +
                    '/* -- Print Preview --*/' +
                    '#print-modal-mask,' +
                    '#print-modal {' +
                        'display: none !important;' +
                    '}' +
                '}' +
                '</style>'
            );

            // Load mask
            $.printPreview.loadMask();

            // Disable scrolling
            $('body').css({overflowY: 'hidden', height: '100%'});
            $('img', print_frame_ref).load(function() {
                print_frame.height($('body', print_frame.contents())[0].scrollHeight);
            });

            // Position modal
            starting_position = $(window).height() + $(window).scrollTop();
            var css = {
                    top:         starting_position,
                    height:      '100%',
                    overflowY:   'auto',
                    zIndex:      10000,
                    display:     'block'
                };
            print_modal
                .css(css)
                .animate({ top: $(window).scrollTop()}, 400, 'linear', function() {
                    print_controls.fadeIn('slow').focus();
                });
            print_frame.height($('body', print_frame.contents())[0].scrollHeight+20);

            // Bind closure
            // 지정영역만 프린트 되게 수정
            $('a', print_controls).bind('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('print')) { /*window.print();*/ window.frames[0].focus(); window.frames[0].print(); }
                else { $.printPreview.distroyPrintPreview(); }
            });
    	},

    	distroyPrintPreview: function() {
    	    print_controls.fadeOut(100);
    	    print_modal.animate({ top: $(window).scrollTop() - $(window).height(), opacity: 1}, 400, 'linear', function(){
    	        print_modal.remove();
    	        $('body').css({overflowY: 'auto', height: 'auto'});
    	    });
    	    mask.fadeOut('slow', function()  {
    			mask.remove();
    		});

    		$(document).unbind("keydown.printPreview.mask");
    		mask.unbind("click.printPreview.mask");
    		$(window).unbind("resize.printPreview.mask");
	    },

    	/* -- Mask Functions --*/
	    loadMask: function() {
	        size = $.printPreview.sizeUpMask();
            mask = $('<div id="print-modal-mask" />').appendTo($('body'));
    	    mask.css({
    			position:           'absolute',
    			top:                0,
    			left:               0,
    			width:              size[0],
    			height:             size[1],
    			display:            'none',
    			opacity:            0,
    			zIndex:             9999,
    			backgroundColor:    '#000'
    		});

    		mask.css({display: 'block'}).fadeTo('400', 0.75);

            $(window).bind("resize..printPreview.mask", function() {
				$.printPreview.updateMaskSize();
			});

			mask.bind("click.printPreview.mask", function(e)  {
				$.printPreview.distroyPrintPreview();
			});

			$(document).bind("keydown.printPreview.mask", function(e) {
			    if (e.keyCode == 27) {  $.printPreview.distroyPrintPreview(); }
			});
        },

        sizeUpMask: function() {
            if ($.browser.msie) {
            	// if there are no scrollbars then use window.height
            	var d = $(document).height(), w = $(window).height();
            	return [
            		window.innerWidth || 						// ie7+
            		document.documentElement.clientWidth || 	// ie6
            		document.body.clientWidth, 					// ie6 quirks mode
            		d - w < 20 ? w : d
            	];
            } else { return [$(document).width(), $(document).height()]; }
        },

        updateMaskSize: function() {
    		var size = $.printPreview.sizeUpMask();
    		mask.css({width: size[0], height: size[1]});
        }
    }
})(jQuery);