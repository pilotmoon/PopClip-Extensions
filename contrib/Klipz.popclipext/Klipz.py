# coding=utf-8

# Copyright 2013 by David Hoerl
# For Usage see LICENSE in the same folder
# Version 1.0

import json
import os
import re
import subprocess
import sys
import syslog
import stat
from collections import deque

keyShift =		131072
keyControl =	262144
keyOption =		524288
keyCommand =   1048576

# globals
path = ""
dict = {}
separator = ""
queueType = ""
enumerateFunction = reversed

def main(clipNum):
	global dict
	global path
	global queueType
	global separator
	global enumerateFunction

	# log(str(os.environ)) #useful helper

	s = os.environ['POPCLIP_TEXT']
	pasteIt = False if len(s) else True

	modifiers	= int(os.environ['POPCLIP_MODIFIER_FLAGS'])
	alternate	= (modifiers & keyShift) == keyShift
	popAll		= (modifiers & keyOption) == (keyOption if os.environ['POPCLIP_OPTION_POP_TYPE'] == "All" else 0)
	chooseOne	= (modifiers & keyControl) == keyControl
	deleteIt	= (modifiers & keyCommand) == 0
	deleteAll	= modifiers == (keyControl | keyOption | keyCommand)
	modifiers	= 0
	
	board = os.environ['POPCLIP_OPTION_DEFAULT_CLIPBOARD']
	#log("Board is " + board)

	if (board == "Global" and alternate) or (board == "Project" and not alternate):
		clipboard = os.popen('osascript script1.txt').read()
	else:
		clipboard = "Global"

	separator	= os.environ['POPCLIP_OPTION_SEPARATOR'].decode('unicode_escape')
	queueType	= os.environ['POPCLIP_OPTION_QUEUE_TYPE']	# fifo or lifo
	enumerateFunction = identity if queueType == 'FIFO' else reversed

	# OK, now lets do the real work!

	makeOrFetchDict(clipboard)
	
	try:
		clips = dict[clipNum]
	except KeyError:
		#log("y")
		clips = deque()
		dict[clipNum] = clips
	except Exception as e:
		#log("z")
		#log(e.__name__)
		pass

	#log("1 " + type(clips).__name__ )

	saveIt = False
	ret = ""

	if deleteAll:
		clips.clear()
		saveIt = True
		
	elif pasteIt and (not popAll or chooseOne):
		ret = getOne(clipNum, deleteIt, chooseOne)
		if deleteIt: saveIt = True

	elif pasteIt:
		#log("Try join")
		ret = separator.join(enumerateFunction(clips))
		if deleteIt:
			clips.clear()
			saveIt = True
		#log("Did join")
	elif not pasteIt:
		if len(s):
			clips.append(s)
			saveIt = True

	#log("Clip: %s dump: %s" % (clipNum, clips))

	if saveIt:
		saveClip()
	#log("Return: " + ret)
	return ret

def saveClip():
	try:
		#log("TRY WRITE")
		fp = open(path, "w")
		#log("DID IT now dump!")
		try:
			json.dump({k: list(v) for k, v in dict.items()}, fp)
		except:
			log("json dump failed!")
		else:
			log("successfully dumped!")
		fp.close()
	except IOError:
		log("Failed to save Clip file")
	return

def _safe_clip_path(base_dir, board_name):
	safe_name = re.sub(r'[^A-Za-z0-9_-]', '_', board_name.strip())
	return os.path.join(base_dir, safe_name + ".pic")

def makeOrFetchDict(clibBoard):
	global path
	base = os.path.realpath(os.getcwd() + "/../../Klipz")
	log("Path1: " + base)
	
	try:
		mode = os.stat(base).st_mode;
	except OSError:
		try:
			os.mkdir(base)
		except OSError:
			log("Failed to create directory at " + base)
			exit(1)

	path = _safe_clip_path(base, clibBoard)
	log("Path2: " + path)

	global dict
	dict = {}

	try:
		fp = open(path, "r")
	except IOError:
		dict = {}
	else:
		try:
			raw = json.load(fp)
			dict = {k: deque(v) for k, v in raw.items()}
		except (ValueError, KeyError) as e:
			log("Error on json.load: " + str(e))
		fp.close()

	return

def getOne(clipNum, deleteIt, chooseOne):
	global enumerateFunction
	global queueType

	d = dict[clipNum]

	if len(d) == 0:
		beep()
		return "\n"
	
	idx = 0
	if chooseOne:
		l = []
		for s in d:
			s2 = snipper(s)
			l.append(s2)
		args = ["osascript", "script0.txt", "Clipboard " + str(clipNum)] + list(enumerateFunction(l))
		log("Cmd: %s" % str(args))

		option = subprocess.check_output(args).decode().strip()
		if option == "false":
			return ""
		else:
			idx = l.index(option)
	else:
		idx = 0 if queueType == "FIFO" else len(d) - 1

	try:
		#log("Index: %d" % idx)
		d.rotate(-idx)
		s = d[0]
		#log("S: %s" % s)
		if deleteIt: d.popleft()
		d.rotate(idx)
		return s
	except Exception:
		return ""

def snipper(sx):
	s = sx.strip()
	ret = ""
	for i,c in enumerate(s):
		if c == '\n':
			ret += "…";
			break
		if i > 31: 
			ret += "…";
			break
		if c == "'":
			c = unicodeSingleQuote
		elif c == "\t":
			c = ' '
		ret += c
	return ret.strip()

def beep():
	os.system('osascript script2.txt')

def log(msg):
	syslog.openlog("Klipz")
	syslog.syslog(syslog.LOG_ALERT, msg)
	syslog.closelog()

def identity(arg):
	return arg

def handleException(excType, excValue, traceback):
	s = str(excType) + ' ' + str(excValue) + ' ' + str(traceback)
	log("EXCEPTION: " + s)

sys.excepthook = handleException

# Testing
#if __name__ == '__main__':
#	main()
