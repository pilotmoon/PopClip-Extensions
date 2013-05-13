tell application "iCal"
  -- choose the first calendar
  set theCalendars to title of every calendar
  set cal to item 1 of theCalendars

  tell calendar cal
      set theDate to (current date) + 1 * minutes -- TODO extract dates from text
      set theEvent to make new event at end with properties {summary:"{popclip text}", start date:theDate}
   end tell
   show theEvent -- open iCal for editing
end tell
