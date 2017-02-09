#!/usr/bin/env python
import subprocess as sp
import json
from datetime import datetime as dt
import timecon as tc

def save_data(data):
	
	name = data['name'].replace(' ','_')
	date = data['date']
	note = data['note']
	
	if '/' in date: 	#date not "open"
		date_list = date.replace(' ','').split('/')
		month = int(date_list[0])
		day = 	int(date_list[1])
		year = 	int(date_list[2])
		meeting_date_epoch_time = tc.to_epoch(year,month,day)
		#a=tc.to_epoch(2012,12,25)
	else:
		meeting_date_epoch_time = 9999999999
	
	note_save_timestamp = str(dt.now())
	
	
	saved_names = sp.Popen('ls ref/people'.split(),stdout=sp.PIPE).communicate()[0]
	if name in saved_names:
		with open('ref/people/'+name,'r') as f:
			doc = f.read()
		doc = json.loads(doc)
		if not date in doc['dates']:
			doc['dates'][date] = {
				'note' : note,
				'note_save_timestamp' : [note_save_timestamp],
				'meeting_date_epoch_time' : meeting_date_epoch_time,
				'important' : False
			}
			
		
		#	doc['dates'][date] = note
		else:
			d = doc['dates'][date] 
			doc['dates'][date]['note'] = d + '\n\n############### NEW NOTE FOR SAME DATE ################\n\n' + note
			doc['dates'][date]['note_save_timestamp'].append(timestamp)
		
		with open('ref/people/'+name,'w') as f:
			doc = json.dumps(doc)
			f.write(doc)
			
	else:
		data_to_save = {
			'name': name,
			'dates': {
				date : {
					'note' : note,
					'note_save_timestamp' : [note_save_timestamp],
					'meeting_date_epoch_time' : meeting_date_epoch_time
				}
			}
		}
		
		with open('ref/people/'+name,'w') as f:
			doc = json.dumps(data_to_save)
			f.write(doc)
		
		
def main():
	pass
if __name__ == '__main__':
	main()