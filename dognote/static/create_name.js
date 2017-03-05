//-------------- add new name --------------//
$(document).on('click','#create_name',function(){
	var new_name = $('#name_ta').val();
	var current_names = [];
	$('.names_list_name').each(function(){
		current_names.push( $(this).html().trim().replace(' ','_') );
	});
	
	var name_ = new_name.replace(' ','_');
	
	
	if ( $.inArray(name_, current_names) != -1 ){
		flash_message('Name is already in list');
	}
	else{
		$.ajax({
			method	: 'post',
			url		: 'dognote.py',
			data	: {
				'package' : 
					JSON.stringify({
						'instructions' 	: 'create_name',	
						'name'			: name_
					})
				},
			success	: function(result){
				flash_message(result);
				get_saved_names();
				$('#name_ta_dummy').val(new_name);
				$('#set_meeting_dummy').val('Open');
				$('#note_lines').val('');
				$('.nb_on').removeClass('nb_on nb_checked');
				$( $('.note_bullet')[0] ).addClass('nb_on');
				autosave();
				//$('.nb_on').removeClass('nb_checked');
				//result = JSON.parse(result);
				//con(result);
			}
		});	
	}
	
	//result = send_data('instructions'='save_new_name','name'=new_name)
});

$(document).on('click','#cancel_add_new_name',function(){
	$('#new_meeting_popup').hide();
});