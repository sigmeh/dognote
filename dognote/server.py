#!/usr/bin/env python
import BaseHTTPServer
import CGIHTTPServer
import cgitb
import time
import subprocess as sp
import kill_server

def start_server():
	
	server=BaseHTTPServer.HTTPServer
	handler=CGIHTTPServer.CGIHTTPRequestHandler
	server_address=("", 8000)
	handler.cgi_directories=['/','/cgi-bin']

	httpd=server(server_address, handler)
	httpd.serve_forever()
	

def main():
	
	try:
		start_server()
		
	except:
		py_proc = sp.Popen(['ps -fA | grep python'],stdout=sp.PIPE,shell=True).communicate()[0]
		serv_proc = sp.Popen(['ps -fA | grep server'],stdout=sp.PIPE,shell=True).communicate()[0]
		
		time.sleep(.5)
		
		print
		print 'Cannot start server...'
		print 'The following information is available:'
		print '#--------python processes--------#'
		print py_proc
		print '#--------------------------------#'
		print '#--------server processes--------#'
		print serv_proc
		print '#--------------------------------#'
		print
		print 'Running kill_server.py...'
		print
		
		kill_server.main()
		attempted_kill = True
		
		print 'Returned from kill; attempting server restart...'
		print
		
		try: 
			start_server()
		except:
			print 'Second attempt failed; quitting application.'
			print
		
if __name__ == '__main__':
	main()