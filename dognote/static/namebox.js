//show namebox when #name_ta is clicked
$(document).on('click','#name_ta',function(){
	$('#namebox').show();
});

//hide namebox when other page element is clicked
$(document).on('click','*',function(e){
	e.stopPropagation();
	$('#namebox').hide();
	var id = $(this).attr('id');
	if( id == 'name_ta' ||  id == 'namebox' || $(this).hasClass('namebox_name') ){
		$('#namebox').show();
	}
});

//auto-populate namebox on load (hidden until clicked) for selecting a previously-saved name
//also populate #names_list for retrieval of previous notes for previous names
$(document).ready(function(){
	$.ajax({
		method:'post',
		url:'dognote.py',
		data:{'package': 
			JSON.stringify({ 
				'instructions': 'get_names'
			}) 
		},	
		success:function(names){
			names = JSON.parse(names);
			con(names.length);
			
			if (names.length == 0){
				$('#names_list').append(
					'\
					<div class="border names_list_name">--no saved data--</div>   \
					'
				);		
			}
			
			//populate namebox 
			for (i=0; i<names.length; i++){
				var name = names[i];
				$('#namebox').append(
					'<div id="'+name+'" class="namebox_name">	\
					</div>'
				);
				$('#'+name).html(name);
				$('#names_list').append(
					'\
					<div class="border names_list_name">'+name+'</div>   \
					'
				);
			}		
		}
	});
});

$(document).on('click','.namebox_name',function(){
	var id = $(this).attr('id');
	if ( id != 'no_saved_names'){
		$('#name_ta').val( $(this).attr('id') );	
	}
	$('#namebox').hide();
});