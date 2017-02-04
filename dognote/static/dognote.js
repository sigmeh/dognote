//---------------------- testing functions --------------------//
function print(msg){$('#msgbox').append(msg);}	
function con(msg){console.log(msg)};
	
//---------------------- variable definitions --------------------//	
var cal_showing = false;
var mouseX = 0, mouseY = 0;
var note_height = $('.current_note').height();

//---------------------- LOAD CALENDAR --------------------//		
function load_cal_html(){
	info = {'instructions':'load_html dogcal.html'};
	
	$.ajax({
		method:'post',
		url:'dognote.py',
		data: {'package': JSON.stringify(info)},
		success:function(result){
			result = JSON.parse(result);
			
			html = result['html'];
			cal = result['cal'];
			
			$('#dogcal_popup').append(html);
			generate_cal(cal);		
		}
	});
}

//---------------------- SHOW CALENDAR --------------------//	
function show_cal(id){
	
	if (!cal_showing){
		$('#'+id).select();
		
		$('#calendar').css({
			'margin-left':mouseX+'px',
			'margin-top':mouseY+'px'
		});
		
		$('#dogcal_popup').show();
		cal_showing = true;			
	}
}


//----------------------------------------------------------//
//---------------------- EVENT HANDLERS --------------------//
//----------------------------------------------------------//
	
	
	//-------------- expand_note --------------//
	$(document).on('click','#new_note',function(){			
		$(this).addClass('note_expanded');
		$('#new_note').css({'text-align':'left'});
	});
	//-------------- expand_note --------------//
	$(document).on('click','#expand_note',function(){	
		$('#note_outer').toggleClass('note_expanded');
		$('.note_line').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-7 );
		$('#checkbox_ribbon').height( $('#note_outer').height() );
		$('.note_line').height( $('#note_outer') );
		$('.dummy_text').width( $('.note_line').width() );
		//$('#note_outer').css({'height':'500px'});
		/*
		$('#new_note').toggleClass('note_expanded');
		note_ribbon_height_match();	
		if ( $('#new_note').hasClass('note_expanded') ){
			$('#new_note').css({'text-align':'left'});
		}
		else{
			if ( $('#new_note').val() == 'Note'){
				$('#new_note').css({'text-align':'center'});
			}	
		}
		*/
		
	});
	

	//-------------- select date --------------//	
	//adjust the date input field based on new user-selected date
	$(document).on('click','.cal_box_numbered',function(){	
		d = $(this).children()[0].innerHTML.split(',')
	
		month = d[0];
		day = d[1];
		year = d[2];
	
		$('#set_meeting').val(month+' / '+day+' / '+year);
		$('#dogcal_popup').hide();
		cal_showing = false;
	});

	//-------------- mousemove --------------//
	$(document).on('mousemove',function(e){
		mouseX = e.pageX;
		mouseY = e.pageY;
	});	

	//-------------- textarea keylogger and keydown functions --------------//
	

//inserts '    ' when tab is pressed and places cursor at the end of the insertion
function insert_text(text, el){
	var cursorPos = el.prop('selectionStart');
	var line = el.val();
	line = line.substring(0, cursorPos) +text+ line.substring(cursorPos, line.length);
	
	el.val( line );
	el.selectRange(cursorPos+text.length);
}




var num_checkboxes = 0;
//event handler does not register final input character unless assayed after delay (1 ms)
var note_height = $('.note_line').height();
var next_checkbox_height = 0;
$(document).on('keydown','.note_line',function(e){
	setTimeout(function(){
		sections_check(e.which);
	},1);
	//con( $('.note_line').height() );
	
	
	function sections_check(key){
		var pos = $('.note_line').prop('selectionStart');
		if ( pos > 1 && key != 8 && key != 9 && $('.note_line').val()[pos-2] != '\n' && note_height == $('.note_line').height() ){
			con('in');
			return;
		}
		//con('not in');
		//con( note_height == $('.note_line').height() );
		
		note_height = $('.note_line').height();
		
	
		$('#checkbox_ribbon').html('');
		$('.dummy_text').remove();
		var lines = $('.note_line').val().split('\n') ;
		//con(lines.length);
		var is_new_section = [];
		for (i=0 ; i < lines.length ; i++){
			//ensure each line has length and does not start with whitespace characters
			var new_section = lines[i].length != 0 && [' ','\n','\t','\r'].indexOf( lines[i][0] ) == -1;
			is_new_section.push(new_section);
			//con( $('.note_line').css('line-height') );
			
			var dummy_text = document.createElement('textarea');
			dummy_text.className = 'dummy_text';
			dummy_text.autocomplete = 'off';
			//dummy_text.value = lines[i];
			
			//con( dummy_text.style.height + String(i) );
			//con(dummy_text.value);
			$('#note_inner').append(dummy_text);
			
			
			

			
			$('.dummy_text').width( $('.note_line').width() );
			//con( $('#note_inner').children()[-1] );
			
			
			
			$('.dummy_text').last().val( lines[i] );
			con( $('.dummy_text').last().val() );
			
			autosize( $('.dummy_text') );
			
			dtl = $('.dummy_text').length;
			var topPos = $('.dummy_text')[dtl-1].getBoundingClientRect().top  ;
			var botPos = $('.dummy_text')[dtl-1].getBoundingClientRect().bottom ;
			
			
			next_checkbox_height = $('.dummy_text')[dtl-1].getBoundingClientRect().bottom;
			//con('topPos:'+String(topPos));
			
			if (new_section){
				var new_checkbox = document.createElement('input');
				new_checkbox.type = 'checkbox';
				new_checkbox.id = 'line'+String(i);
				new_checkbox.className = 'checkbox';
				
				//new_checkbox.style.marginTop = next_checkbox_height - $('#checkbox_ribbon')[0].getBoundingClientRect().top +'px';
				
				new_checkbox.style.marginTop = topPos - $('#checkbox_ribbon')[0].getBoundingClientRect().top +'px';
				
				$('#checkbox_ribbon').append(new_checkbox);
			}
		}
		
		
		
		
		
		
		//-------------------------------------------------section breakdown here
		for (i=0 ; i < lines.length; i ++){
			if ( is_new_section[i] ){
				
			}
		}
	}
	
	switch (e.which){
		case 9:	
		//	tab pressed... (insert 4 spaces)
			e.preventDefault();
			insert_text('    ', $(this));
			sections_check();
			break;	
		/*
		case 13:
		//  enter pressed (calculate number of lines)
			sections_check();
			break;	
		case 32:
		//  space pressed
			sections_check();
			break;
		case 224:
		// 	command key pressed
			sections_check();
			break;	
		*/	
	}
	
	
	//con(num_lines);
});
	
	
	
	$(document).keydown(function(e){
		switch (e.which){
			case 27:	// ESC
				$('#dogcal_popup').hide();
				cal_showing = false;
		}
		if ( $('.note_line').height() > $('#note_outer').height() ){
			$('.note_line').height( $('#note_outer').height() );
		}
	});


//from mpen https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
//selectRange can set cursor position in text element by supplying a single number (vs. a range)
$.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

//With this, you can do

//$('#elem').selectRange(3,5); // select a range of text
//$('#elem').selectRange(3); // set cursor position

	
	
	
	/*
	$(document).keydown(function(e){
		
		if ($('.note_line').is(':focus')){
			con($(this).attr('id'));
			if (e.which == 13){
				e.preventDefault();
				h = $(this).height();
				//con( $(this) );
				$(this).css({'height': h + $('#note_line_orig').css('height') });
				//e.preventDefault();
				
			}
			
			if (e.which == 9){
				//con('here');
				e.preventDefault();
				var note_val = $(this).val();
				con(note_val);
				$(this).val(note_val+'    ');
				
			}
			con(e.which);
		}
		
		if (e.which == 27 && cal_showing){	//if esc key pressed when cal_showing
			$('#dogcal_popup').hide();		//then hide cal
			cal_showing = false;
		}
		
		
		if (e.which == 9 && $('.note_line').is(':focus')){			
			//if tab key pressed when textarea ('.note') has focus:
			//insert four spaces (prevent default)
			e.preventDefault();
			
			
			var note_val = $(this).val();
			con(note_val);
			$(this).val(note_val+'    ');
		
		}
		
	});
	*/
	//});
//		
//---------------------- BUTTON CLICK EVENT HANDLERS  --------------------//
//	



$(document).ready(function(){
	
	//$('.note_line').width( $('#note_outer').width()-4 );				//------------------------------------------
	$('.note_line').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-7 );
	
	autosize($('.note_line'));
	
	$('#checkbox_ribbon').height( $('#note_outer').height() );
});



//---------------------- note typing event handler --------------------//

//set cursor to last position of .note_line when the larger note_outer div is clicked
$(document).on('click','#note_outer',function(){
	$('.note_line').focus();
	$('.note_line').selectRange( $('.note_line').val().length );
});


//prevent propagation firing of elements over #note_outer (to select for click on #note_outer only)
$(document).on('click','.note_line, #checkbox_ribbon',function(e){
	e.stopPropagation();
});

//----------------------------------------------------------//
//-------------------- AUTO-RUN AT STARTUP------------------//	
//----------------------------------------------------------//
(function(){	
	load_cal_html();
})();

$(document).ready(function(){
	$('.note_line').focus();
});



















