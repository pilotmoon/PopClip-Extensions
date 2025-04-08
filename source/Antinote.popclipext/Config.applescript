-- # PopClip Extension for Antinote
-- name: Antinote
-- identifier: com.pilotmoon.popclip.extension.antinote
-- popclip version: 4151
-- description: Create a new note in Antinote.
-- app: { name: Antinote, link: https://antinote.io/, bundleIdentifiers: [com.chabomakers.Antinote, com.chabomakers.Antinote-setapp], checkInstalled: true }
-- icon: antinote.svg
-- language: applescript
tell application "Antinote"
  activate
  delay 0.5
  open location "antinote://x-callback-url/createNote?content={popclip text}"
end tell
