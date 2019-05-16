set theBody to "{popclip text}"
if "{popclip app name}" is "Safari" then
	set theURL to "{popclip browser url}"
	set theTitle to "{popclip browser title}"
	set theLink to "[" & theTitle & "](" & theURL & ")"
else
	set theLink to ""
end if
set theZettel to ""

-- look to see whether there is a zettel id in selected text
try
	set theZettel to do shell script "echo " & quoted form of theBody & " | /usr/local/opt/grep/libexec/gnubin/grep -oP '(?<=(\\[\\[|\\[@))(.+?(?=\\]))'"
end try
-- if there is, then see if there is more than 1 such link
if theZettel is not "" then
	set zettels to paragraphs of theZettel
	if (count of zettels) is greater than 1 then
		-- if there is more than one link, then prompt user to select which link to open
		set theNote to (choose from list zettels with prompt "Select note to open" OK button name "Open") as string
	else
		-- if there is only one link, then set that as link to open
		set theNote to zettels as string
	end if
	try
		set noteID to do shell script "echo " & quoted form of theNote & " |egrep -o -e '\\d{14}'"
		do shell script "open zk://" & noteID
	on error
		try
			set refID to do shell script "echo " & quoted form of theNote & " |egrep -o -e '[a-zA-Z_:-]+\\d{4}\\w?'"
			do shell script "open src://" & quoted form of refID
		end try
	end try
	
	-- otherwise, the selected text will serve as the title for a new note
else
	set theString to my getString()
	
	if "{popclip modifier flags}" is "131072" then
		set theText to theBody
		set theBody to ""
		set the clipboard to "[[" & theString & " " & theText & "]]"
		tell application "System Events" to keystroke "v" using command down
	else
		set theText to ""
	end if
	
	set make_zettel to (path to desktop as text) & "notetaking-new_zettel.scpt" as alias
	run script make_zettel with parameters {theString, theText, theBody, theLink, "popclip"}
	
end if

on getString()
	set yearstr to year of (current date)
	
	set monthnum to month of (current date) as integer
	if monthnum < 10 then
		set monthstr to "0" & (monthnum as string)
	else
		set monthstr to (monthnum as string)
	end if
	
	set daynum to (day of (current date)) as integer
	if daynum < 10 then
		set daystr to "0" & (daynum as string)
	else
		set daystr to (daynum as string)
	end if
	
	set t to time of (current date)
	
	set hournum to (round (t / 3600) rounding down)
	if hournum < 10 then
		set hourstr to "0" & (hournum as string)
	else
		set hourstr to (hournum as string)
	end if
	
	set t to t - hournum * 3600
	
	set minnum to (round (t / 60) rounding down)
	if minnum < 10 then
		set minstr to "0" & (minnum as string)
	else
		set minstr to (minnum as string)
	end if
	
	set t to t - minnum * 60
	
	if t < 10 then
		set secstr to "0" & (t as string)
	else
		set secstr to (t as string)
	end if
	
	return (yearstr & monthstr & daystr & hourstr & minstr & secstr) as string
end getString
