#!/usr/bin/env python
'''
Retrieve note for selected name/date
'''
import json

def main(name,date):
	with open('ref/people/'+name,'r') as f:
		data = json.loads(f.read())
	
	note = data['dates'][date]['note']
	nb_checked_line_id_list = data['dates'][date]['nb_checked_line_id_list']
	return {'note':note,
			'nb_checked_line_id_list':nb_checked_line_id_list}
		
if __name__ == '__main__':
	main(name,date)