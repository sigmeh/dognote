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

//auto-populate namebox on load (hidden until clicked)
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
			con(names);
			names = JSON.parse(names);
			//populate namebox 
			for (i=0; i<names.length; i++){
				var id = names[i];
				$('#namebox').append(
					'<div id="'+id+'" class="namebox_name">	\
					</div>'
				);
				$('#'+id).html(id);
			}		
		}
	});
});

$(document).on('click','.namebox_name',function(){
	var id = $(this).attr('id');
	if ( id != 'no_saved_names'){
		$('#name_ta').val( $(this).attr('id') );	
	}
});