tell application "iCal"
  -- choose the first calendar
  set theCalendars to title of every calendar
  set cal to item 1 of theCalendars

  tell calendar cal
    set dueDate to (current date) + 1 * minutes -- TODO extract dates from text
    set theTodo to make new todo at end with properties {due date:dueDate, summary:"{popclip text}"}
  end tell
  show theTodo -- open iCal for editing
end tell
