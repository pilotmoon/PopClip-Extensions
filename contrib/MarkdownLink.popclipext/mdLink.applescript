if length of "{popclip selected url}" > 0 then
	set xfr_clip to "[" & (the clipboard as text) & "](" & "{popclip selected url}" & ")"
	set the clipboard to ((xfr_clip) as text)
	return xfr_clip
end if
if length of "{popclip browser url}" > 0 and length of "{popclip text}" > 0 then
	set xfr_clip to "[" & "{popclip text}" & "](" & "{popclip browser url}" & ")"
	set the clipboard to ((xfr_clip) as text)
	return xfr_clip
end if