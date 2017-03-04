#!/usr/bin/env python
import json
def main(data):
	name = data['name']
	date = data['date']
	note = data['note']
	nb_checked_line_id_list = data['nb_checked_line_id_list']
	
	with open('ref/people/'+name,'r') as f:
		doc = json.loads(f.read())
	
	this_doc = doc['dates'][date]
	
	data_changed = False
	if note != this_doc['note']:
		#note has changed since last save
		this_doc['note'] = note
		data_changed = True
	if nb_checked_line_id_list != this_doc['nb_checked_line_id_list']:
		this_doc['nb_checked_line_id_list'] = nb_checked_line_id_list
		data_changed = True
	
	if data_changed:
		doc['dates'][date] = this_doc
		with open('ref/people/'+name,'w') as f:
			f.write(json.dumps(doc))
	
	
	
	
	pass
if __name__ == '__main__':
	main(data)