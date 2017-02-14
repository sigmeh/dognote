#!/usr/bin/env python
'''	Processing center for dognote app
	Links to all relevant python scripts'''

import cgi
import json
from datetime import datetime 
import sys
import dogcal
from scripts import namebox
from scripts import save_data
from scripts import get_data_for_name
from scripts import update_importance
from scripts import show_note

print

data = cgi.FieldStorage()['package'].value
data = json.loads(data)

instr = data['instructions'].split(' ')
cmd = instr[0]


if cmd == 'load_html':
	file = instr[1]
	with open(file,'r') as f:
		data_file = f.read()
	cal = dogcal.main()	
	data = {'html':data_file,'cal':cal}	
	print json.dumps(data)


elif cmd == 'get_cal':
	cal = dogcal.main(month=data['month'],year=data['year'])
	print json.dumps(cal)


elif cmd == 'get_names':
	names = namebox.main()
	print json.dumps(names)


elif cmd == 'save_data':
	data_to_save = data['data']
	save_data.save_data(data_to_save)


elif cmd == 'get_data_for_name':
	data = get_data_for_name.main(data['name'])
	print json.dumps(data)
	#print json.dumps( {'dates':dates,'data':data} )


elif cmd == 'update_importance':
	update_importance.main( 
		data['this_name'], 
		data['date_key'],
		data['is_important']
	)	

elif cmd == 'get_note':
	data = show_note.main(name=data['name'],date=data['date'])
	print json.dumps(data)














class person():
	def __init__(self,name,creation):
		self.name = name
		self.creation = datetime.now()
		self.header = header
		self.content = ''
		self.meetings = []
		

















def main():

	pass


if __name__ == '__main__':
	main()