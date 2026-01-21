TEMP_FILE="${TMPDIR}mermaid_$(/usr/bin/uuidgen).svg"

# Extract mermaid content from code block if present (```mermaid...```), otherwise use original text
INPUT=$(echo "$POPCLIP_TEXT" | perl -0777 -ne 'print /```mermaid\s*(.*?)(?:```|$)/s ? $1 : $_')

if command -v mmdc &> /dev/null; then
    echo "$INPUT" | mmdc -i - -o - -e svg > "$TEMP_FILE" || exit 1
else
    BASE64_STRING=$(echo -n "$INPUT" | /usr/bin/base64 -b 0 | tr '+/' '-_' | tr -d '=')
    /usr/bin/curl -sf "https://mermaid.ink/svg/${BASE64_STRING}" -o "$TEMP_FILE" || exit 1
fi
qlmanage -p "${TEMP_FILE}" &>/dev/null &
