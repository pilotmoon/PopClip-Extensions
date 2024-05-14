-- #popclip
-- name: Reminders
-- identifier: com.pilotmoon.popclip.extension.reminders
-- description: Add a new reminder in Reminders.
-- icon: Reminders.png
-- permissions: [reminders]
-- popclipVersion: 4151
-- language: applescript

tell application id "com.apple.reminders"
  make new reminder with properties {name:"{popclip text}", body:"{popclip browser url}"}
end tell
