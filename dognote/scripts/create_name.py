#!/usr/bin/env python
import subprocess as sp
from datetime import datetime as dt
import json

def main(name):
	people = [x for x in sp.Popen('ls ref/people'.split(),stdout=sp.PIPE).communicate()[0].split('\n') if x]
	
	name = name.replace(' ','_')
	
	if name not in people:
		
		date = 'Open'
		note_save_timestamp = str(dt.now())
		meeting_date_epoch_time = 9999999999
			
		data_to_save = {
			'name': name,
			'dates': {
				date : {
					'note' : '',
					'note_save_timestamp' : [note_save_timestamp],
					'meeting_date_epoch_time' : meeting_date_epoch_time,
					'important' : False, 
					'nb_checked_line_id_list' : []
				}
			}
		}
		
		with open('ref/people/'+name,'w') as f:
			doc = json.dumps(data_to_save)
			f.write(doc)
		
		return 'Name added'

	

if __name__ == '__main__':
	main(name)