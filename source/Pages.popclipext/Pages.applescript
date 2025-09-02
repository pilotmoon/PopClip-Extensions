on newDocument(theText)
    tell application "Pages"
        activate
        set theDoc to make new document
        set body text of theDoc to theText
    end tell
end newDocument
