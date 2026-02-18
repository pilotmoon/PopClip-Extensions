on run
  set selectedText to "{popclip text}"
  if selectedText is "" then error "No selected text found." number 700

  set dialogResult to display dialog "请输入你想补充问 ChatGPT 的问题：" default answer "" buttons {"取消", "发送"} default button "发送" cancel button "取消"
  set userQuestion to text returned of dialogResult
  set trimmedQuestion to my trimText(userQuestion)
  if trimmedQuestion is "" then error "问题不能为空。" number 701

  set finalPrompt to "【原文】" & return & selectedText & return & return & "【问题】" & return & userQuestion
  set encodedPrompt to my urlEncode(finalPrompt)
  set targetURL to "https://chatgpt.com/?q=" & encodedPrompt

  open location targetURL
end run

on trimText(rawText)
  set text item delimiters to {space, tab, return, linefeed}
  set parts to text items of rawText
  set text item delimiters to ""
  set cleaned to parts as text
  set text item delimiters to ""
  return cleaned
end trimText

on urlEncode(rawText)
  set encoded to do shell script "/usr/bin/python3 -c " & quoted form of "import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1]))" & space & quoted form of rawText
  return encoded
end urlEncode
