on run
  set selectedText to "{popclip text}"
  if selectedText is "" then error "No selected text found." number 700

  set dialogResult to display dialog "请输入你想补充问 Gemini 的问题：" default answer "" buttons {"取消", "发送"} default button "发送" cancel button "取消"
  set userQuestion to text returned of dialogResult
  set trimmedQuestion to my trimText(userQuestion)
  if trimmedQuestion is "" then error "问题不能为空。" number 701

  set finalPrompt to "【原文】" & return & selectedText & return & return & "【问题】" & return & userQuestion
  set the clipboard to finalPrompt

  tell application "Google Chrome"
    activate
    if (count of windows) is 0 then make new window
    tell front window
      make new tab at end of tabs with properties {URL:"https://gemini.google.com/app"}
      set active tab index to (count of tabs)
    end tell
  end tell

  display notification "内容已复制到剪贴板，请在 Gemini 输入框按 Command+V 后回车。" with title "Gemini Ask"
end run

on trimText(rawText)
  set text item delimiters to {space, tab, return, linefeed}
  set parts to text items of rawText
  set text item delimiters to ""
  set cleaned to parts as text
  set text item delimiters to ""
  return cleaned
end trimText
