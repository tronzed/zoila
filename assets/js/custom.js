
$(document).ready(function(){
	$('.ser_select_btn').on('click',function(e){
		e.preventDefault()
		$(this).addClass('ser_select_btn_active');
		$(this).prev().prop('checked','checked');
	});

	$(".ser_select_btn").on("click", function(e){
		e.preventDefault()
	    $(this).addClass('ser_select_btn_active');
		$(this).prev().prop('checked','checked');	      
	})
	$(".ser_select_btn").on("click", function(){

	    var checked_value = $(this).prev("input").attr("checked");

	    if(checked_value == "checked")
	    {        
	       $(this).prev("input").attr("checked",false);
	       $(this).removeClass('ser_select_btn_active');        
	    }
	    else
	    {
	       $(this).prev("input").attr("checked",true);                    
	    }
	});
});





$(document).ready(function(){
	$('.select_service_cover .service_box').on('click',function(){
		$(this).addClass('service_box_active');
		$(this).next().prop('checked','checked');
	});

	$(".select_service_cover .service_box").on("click", function(){

	    var checked_value = $(this).next("input").attr("checked");

	    if(checked_value == "checked")
	    {        
	       $(this).next("input").attr("checked",false);
	       $(this).removeClass('service_box_active');        
	    }
	    else
	    {
	       $(this).next("input").attr("checked",true);                    
	    }
	});
});
$(document).ready(function(){
	$('.pro_ser_next .custom_button').on('click',function(){
		alert('a');
		$('#select_service').addClass('action');
	});
});


$(document).ready(function(){
	$('#drop_down_nav').on('click',function(){
		$(this).next().toggle(300);
	});
});

$(document).ready(function(){
	$('#payment_nav_d_d').on('click',function(){
		$(this).next().toggle(300);
	});
});




/*mouse hover animate.css*/
    
$(".class").hover(function (e) {
    $(this).addClass('animated bounceIn');
});

$(".class").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
    $(this).removeClass('animated bounceIn');
});

/*add employee*/

$('document').ready(function(){
	$('#add_emp').on('click',function(){
		$(this).next().toggle('.employee_add_detail');
	});

})


$(function() {

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

});


/*handlers for sidebar */

$(document).ready(function () {
    // All sides
    var sides = ["left", "top", "right", "bottom"];
    $("h1 span.version").text($.fn.sidebar.version);

    // Initialize sidebars
    for (var i = 0; i < sides.length; ++i) {
        var cSide = sides[i];
        $(".sidebar." + cSide).sidebar({side: cSide});
    }

    // Click handlers
    $(".btn[data-action]").on("click", function () {
        var $this = $(this);
        var action = $this.attr("data-action");
        var side = $this.attr("data-side");
        $(".sidebar." + side).trigger("sidebar:" + action);
        return false;
    });
});

/* calendar */

var cal_length = $('#calendar').length; 

if( cal_length >= 1 ){

$(document).ready(function() {

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listWeek'
			},
			defaultDate: '2017-02-12',
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			selectable: true,
			eventLimit: true, // allow "more" link when too many events
			events: {
				url: 'php/get-events.php',
				error: function() {
					$('#script-warning').show();
				}
			},
			loading: function(bool) {
				$('#loading').toggle(bool);
			},
			eventRender: function(event, el) {
				// render the timezone offset below the event title
				if (event.start.hasZone()) {
					el.find('.fc-title').after(
						$('<div class="tzo"/>').text(event.start.format('Z'))
					);
				}
			},
			dayClick: function(date) {
				console.log('dayClick', date.format());
			},
			select: function(startDate, endDate) {
				console.log('select', startDate.format(), endDate.format());
			}
		});

		// load the list of available timezones, build the <select> options
		$.getJSON('php/get-timezones.php', function(timezones) {
			$.each(timezones, function(i, timezone) {
				if (timezone != 'UTC') { // UTC is already in the list
					$('#timezone-selector').append(
						$("<option/>").text(timezone).attr('value', timezone)
					);
				}
			});
		});

		// when the timezone selector changes, dynamically change the calendar option
		$('#timezone-selector').on('change', function() {
			$('#calendar').fullCalendar('option', 'timezone', this.value || false);
		});
	});

}	





$(document).ready(function(){

	var myTabs_length = $('#myTabs').length;
	
	if( myTabs_length>=1 ){
		$('#myTabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		})

		$('.responsive-tabs').responsiveTabs({
		  accordionOn: ['xs', 'sm'] // xs, sm, md, lg 
		});
	}

});





/* today date show on calendar */

$(function(){

	$('#today_d').on('click',function(){
		$('.fc-today-button').trigger('click');
	})	

});


/* show selected img on form */


$(document).ready(function(){
	$('.c_m_img span img').on('click',function(){
		$(this).toggleClass('sel_img_popup');
	})
	$('.sel_img_popup').closest().siblings().click(function(){
		//$('img.sel_img_popup').removeClass('sel_img_popup');
		alert("i am the best");
	})
});

/* inbox message scroll bottom */

$(document).ready(function(){
  	var msg_cover = $('.msg_con_box_cover');
  	var msg_c_sh = msg_cover[0].scrollHeight;
  	msg_cover.scrollTop(msg_c_sh);
});