#!/bin/zsh

# Create a temporary audio file
temp_audio_file=$(mktemp).${POPCLIP_OPTION_FORMAT}

# Use curl to call OpenAI TTS API
curl -X POST "${POPCLIP_OPTION_BASE_URL}/audio/speech" \
     -H "Authorization: Bearer ${POPCLIP_OPTION_APIKEY}" \
     -H "Content-Type: application/json" \
     -d "{
       \"model\": \"${POPCLIP_OPTION_MODEL}\",
       \"input\": \"${POPCLIP_TEXT}\",
       \"voice\": \"${POPCLIP_OPTION_VOICE}\",
       \"response_format\": \"${POPCLIP_OPTION_FORMAT}\",
       \"speed\": ${POPCLIP_OPTION_SPEED}
     }" \
     --output "$temp_audio_file"

# Play the temporary audio file using afplay
afplay "$temp_audio_file"

# Clean up the temporary audio file when you're done with it
rm "$temp_audio_file"
