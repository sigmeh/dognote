#!/usr/bin/env python

def main():
	with open('ref/names') as f:
		names = f.read().split('\n')
		if len(names) == 1 and names[0] == '':
			names = ['no_saved_names']
		return names
if __name__ == '__main__':
	main()