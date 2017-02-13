//-------------------ADD RETRIEVED NOTE TO #NOTE_LINES---------------//

var set_name = '';
var set_date = '';

function show_note(note){
	//
	// add js_input prompt here if there is unsaved data before replacing
	//
	
	$('#name_ta').val( set_name );
	$('#set_meeting').val( set_date );
	
	$('#note_lines').height( $('#note_outer').height() );
	con( $('#note_outer').height() );
	con( $('#note_lines').height() );
	$('#note_lines').val(note);
	
	sections_check(key='pass');
	/*
	setTimeout(function(){
		
	},100);
	*/
}


//-------------------RETRIEVE NOTE WHEN DATE IS CLICKED---------------//


//$(document).ready(function(){
	
$(document).on('click','.date_list_date_inner',function(e){
	
	set_date = $(this).html();
	classes = $(this).attr('class').split(' ');
	
	for (i = 0; i < classes.length; i++){
		if ( $.inArray(classes[i],names) != -1){
			set_name = classes[i];
		}
	}

	$.ajax({
		method	:	'post',
		url		:	'dognote.py',
		data:{'package'	:
			JSON.stringify({
				'instructions'	:	'get_note',
				'name'			:	set_name,
				'date'			: 	set_date
			})
		},
		success	:	function(data){
			
			note = JSON.parse(data);
			clear_data();
			show_note(note);
		}
	});
});
	
	
//});




