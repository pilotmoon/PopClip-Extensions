on run
  set selectedText to "{popclip text}"
  if selectedText is "" then error "No selected text found." number 700

  set dialogResult to display dialog "请输入你想补充问 ChatGPT 的问题：" default answer "" buttons {"取消", "发送"} default button "发送" cancel button "取消"
  set userQuestion to text returned of dialogResult
  set trimmedQuestion to my trimText(userQuestion)
  if trimmedQuestion is "" then error "问题不能为空。" number 701

  set finalPrompt to "【原文】" & return & selectedText & return & return & "【问题】" & return & userQuestion
  set the clipboard to finalPrompt
  set encodedPrompt to my urlEncode(finalPrompt)
  set targetURL to "https://chatgpt.com/?q=" & encodedPrompt

  try
    tell application "Google Chrome"
      activate
      if (count of windows) is 0 then make new window
      tell front window
        make new tab at end of tabs with properties {URL:targetURL}
        set active tab index to (count of tabs)
      end tell
    end tell
  on error
    do shell script "/usr/bin/open " & quoted form of targetURL
  end try
end run

on trimText(rawText)
  set cleaned to do shell script "/usr/bin/python3 -c " & quoted form of "import sys; print(sys.argv[1].strip())" & space & quoted form of rawText
  return cleaned
end trimText

on urlEncode(rawText)
  set encoded to do shell script "/usr/bin/python3 -c " & quoted form of "import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1]))" & space & quoted form of rawText
  return encoded
end urlEncode
