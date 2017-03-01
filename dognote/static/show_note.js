//-------------------ADD RETRIEVED NOTE TO #NOTE_LINES---------------//

var set_name = '';
var set_date = '';

function show_note(data){

	
	$('.nb_on').removeClass('nb_on nb_checked');
	
	var note = data.note;
	var nb_checked_line_id_list = data.nb_checked_line_id_list;
	con(nb_checked_line_id_list);
	
	$('#name_ta_dummy').val( set_name );
	$('#set_meeting_dummy').val( set_date );
	
	$('#note_lines').height( $('#note_outer').height() );

	$('#note_lines').val(note);
	
	nb_checked_line_id_list.forEach(function(el){
		//con(el);
		$('#'+el).addClass('nb_checked');
	});
	
	
	autosave();
	
	sections_check(key='pass');
}


//-------------------RETRIEVE NOTE WHEN DATE IS CLICKED---------------//


	
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
			
			data = JSON.parse(data);
			clear_data();

			show_note(data);
			
		}
	});
});
	
	


