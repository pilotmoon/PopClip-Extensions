on extractDate(str)
  set dtStr to ""
  set regs to {"\\d{2,4}[-/]\\d{1,2}(?:[-/]\\d{1,2})?(?:.*?\\d{1,2}(?::\\d{1,2})?)?", "\\d{2,4}年\\s*\\d{1,2}月\\s*\\d{1,2}(日|号)(.*?\\d{1,2}(时|点))?"}
  repeat with reg in regs
    set dtStr to doExtractDate(str, reg)
    if dtStr is not equal to "" then exit repeat
  end repeat
  set dt to (current date) + 1 * minutes
  if dtStr is not equal to "" then
    --display dialog dtStr
    set dt to date dtStr
  end if
  return dt
end extractDate

on doExtractDate(str, reg)
  set dt to ""
  try
    set dt to do shell script "echo '" & str & "'|grep -Po '" & reg & "'"
  on error theErr
    --log theErr
  end try
  return dt
end doExtractDate

tell application "iCal"
  activate
  -- choose the first calendar
  set theCalendars to title of every calendar
  set cal to item 1 of theCalendars

  tell calendar cal
    set theText to "{popclip text}"
    set dueDate to extractDate(theText) of me
    set theTodo to make new todo at end with properties {due date:dueDate, summary:theText}
  end tell
  show theTodo -- open iCal for editing
end tell
