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
//
// a delay in show_cal allows for key log before cal_showing == true
// in order to hide dogcal_popup when anything else is clicked
function show_cal(id){

	//Add functionality to show selected date(month) if date was previously selected when a hidden calendar is shown

	setTimeout(function(){
		if (!cal_showing){
			$('#'+id).select();
		
			$('#calendar').css({
				'margin-left':mouseX+'px',
				'margin-top':mouseY+'px'
			});
		
			$('#dogcal_popup').show();
			cal_showing = true;			
		}
	},1);
}


//----------------------------------------------------------//
//---------------------- EVENT HANDLERS --------------------//
//----------------------------------------------------------//
	
	//-------------- clear_data --------------//
	$(document).on('click','#clear_data',function(){
		$('#name_ta').val('Name');
		$('#set_meeting').val('Set meeting');
		$('#note_lines').val('');
		$('#checkbox_ribbon').html('');
		$('.dummy_text').remove();
	
	});
	
	//-------------- expand_note --------------//
	$(document).on('click','#new_note',function(){			
		$(this).addClass('note_expanded');
		$('#new_note').css({'text-align':'left'});
	});
	//-------------- expand_note --------------//
	$(document).on('click','#expand_note',function(){	
		$('#note_outer').toggleClass('note_expanded');
		$('#note_lines').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-7 );
		$('#checkbox_ribbon').height( $('#note_outer').height() );
		$('#note_lines').height( $('#note_outer') );
		$('.dummy_text').width( $('#note_lines').width() );
		//$('.dummy_text').show();
		
		for (i=0; i< $('.dummy_text').length; i++){
			//eliminate overflow .dummy_text and .checkbox
			
			//con($('.dummy_text')[i].getBoundingClientRect().top+' dummy');
			//con($('#note_outer')[0].getBoundingClientRect().bottom+' note_outer');
			
			if ( $('.dummy_text')[i].getBoundingClientRect().top > $('#note_outer')[0].getBoundingClientRect().bottom ){
				
				//$('.dummy_text').remove();
				//$('.dummy_text')[i].style.display = 'none';
				con('none');
				//con($('.dummy_text')[i].style.display);
			}
			//$('.dummy_text')[dtl-1].getBoundingClientRect().bottom;
		}
		
		sections_check('pass');
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




function sections_check(key){
	var pos = $('#note_lines').prop('selectionStart');
	if ( pos > 1 && key != 8 && key != 9 && $('#note_lines').val()[pos-2] != '\n' && note_height == $('#note_lines').height() && key != 'pass'){ 
		con('in');
		return;
	}
	note_height = $('#note_lines').height();
	$('#checkbox_ribbon').html('');
	$('.dummy_text').remove();
	var lines = $('#note_lines').val().split('\n') ;

	var is_new_section = [];
	for (i=0 ; i < lines.length ; i++){
		//ensure each line has length and does not start with whitespace characters
		var new_section = lines[i].length != 0 && [' ','\n','\t','\r'].indexOf( lines[i][0] ) == -1;
		is_new_section.push(new_section);
		var dummy_text = document.createElement('textarea');
		dummy_text.className = 'dummy_text';
		dummy_text.autocomplete = 'off';

		$('#note_inner').append(dummy_text);
		$('.dummy_text').width( $('#note_lines').width() );
		$('.dummy_text').last().val( lines[i] );
		autosize( $('.dummy_text') );
		
		dtl = $('.dummy_text').length;
		var topPos = $('.dummy_text')[dtl-1].getBoundingClientRect().top  ;
		var botPos = $('.dummy_text')[dtl-1].getBoundingClientRect().bottom ;
		
		next_checkbox_height = $('.dummy_text')[dtl-1].getBoundingClientRect().bottom;
		
		if (new_section){
			var new_checkbox = document.createElement('input');
			new_checkbox.type = 'checkbox';
			new_checkbox.id = 'line'+String(i);
			new_checkbox.className = 'checkbox';
			
			new_checkbox.style.marginTop = topPos - $('#checkbox_ribbon')[0].getBoundingClientRect().top +'px';
			
			$('#checkbox_ribbon').append(new_checkbox);
		}
	}
}


var num_checkboxes = 0;
var note_height = $('#note_lines').height();
var next_checkbox_height = 0;
$(document).on('keydown','#note_lines',function(e){
	
	setTimeout(function(){
		//event handler does not register final input character unless assayed after delay (1 ms)
		sections_check(e.which);
	},1);

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
});
	
	
//handle escape keypress (hide dogcal if open
$(document).keydown(function(e){
	con(e);
	switch (e.which){
		case 27:	// ESC
			$('#dogcal_popup').hide();
			cal_showing = false;
	}
	if ( $('#note_lines').height() > $('#note_outer').height() ){
		$('#note_lines').height( $('#note_outer').height() );
	}
});


//selectRange can set cursor position in text element by supplying a single number (vs. a range)
//	from mpen https://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
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

//		
//---------------------- BUTTON CLICK EVENT HANDLERS  --------------------//
//	



$(document).ready(function(){
	
	$('#note_lines').width( $('#note_outer').width()- $('#checkbox_ribbon').width()-7 );
	
	autosize($('#note_lines'));		//Cause vertical propagation of note
	
	$('#checkbox_ribbon').height( $('#note_outer').height() );
});



//---------------------- note typing event handler --------------------//

//set cursor to last position of #note_lines when the larger note_outer div is clicked
$(document).on('click','#note_outer',function(){
	$('#note_lines').focus();
	$('#note_lines').selectRange( $('#note_lines').val().length );
});


//prevent propagation firing of elements over #note_outer (to select for click on #note_outer only)
$(document).on('click','#note_lines, #checkbox_ribbon',function(e){
	e.stopPropagation();
});

//hide dogcal_popup if user clicks elsewhere in window
$(document).on('click','*',function(e){	
	if ( ! $(this).hasClass('cal_class')  ){
		$('#dogcal_popup').hide();	
		cal_showing = false;
	}
});

//----------------------------------------------------------//
//-------------------- AUTO-RUN AT STARTUP------------------//	
//----------------------------------------------------------//
(function(){	
	load_cal_html();
})();

$(document).ready(function(){
	$('#note_lines').focus();
});




