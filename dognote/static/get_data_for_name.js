$(document).on('click','.names_list_name',function(){

	var name = $(this).html();

	if ( name == '--no data saved--' ){
		return;
	}
	$.ajax({
		method:'post',
		url:'dognote.py',
		data:{
			'package': 
				JSON.stringify(
					{
						'instructions' : 'get_data_for_name', 
						'name' : name.replace(' ','_')
					}
				)
		},
		success : function(data){
			data = JSON.parse(data);
			//dates = data['dates'];
			//data = data['data'];
			
			for(i=0;i<data.length;i++){
				con(data[i]);
			}
			var date_list = '';
			for (i=0; i<data.length ; i++){
				if ( i < 3 ){
					date_list+=
						'<div class="date_list_date">'
							+data[i]+
						'</div><br>';
					con(date_list);
				}
			}
			con( $(this).attr('id') );
			//$(date_list).insertAfter( $('.names_list_name'). );
			
		}
	});
});