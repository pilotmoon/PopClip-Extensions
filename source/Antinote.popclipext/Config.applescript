-- # PopClip Extension for Antinote
-- name: Antinote
-- identifier: com.pilotmoon.popclip.extension.antinote
-- popclip version: 4151
-- description: Create a new note in Antinote.
-- app: { name: Antinote, link: https://antinote.io/, bundleIdentifiers: [com.chabomakers.Antinote, com.chabomakers.Antinote-setapp], checkInstalled: true }
-- icon: svg:<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 364.1 315.32"><path d="M364.1 315.32H0L182.05 0l182.05 315.32ZM69.28 285.32h225.54c7.7 0 12.51-8.338.66-15l-112.77-195.32c-3.85-6.67-13.47-6.67-17.32 0l-112.77 195.32c-3.85 6.67.96 15 8.66 15Z"/></svg>
-- language: applescript
tell application "Antinote"
  activate
  delay 0.5
  open location "antinote://x-callback-url/createNote?content={popclip text}"
end tell
