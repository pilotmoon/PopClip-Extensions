tell application id "com.apple.reminders"
  make new reminder with properties {name:"{popclip text}", body:"{popclip browser url}"}
end tell
