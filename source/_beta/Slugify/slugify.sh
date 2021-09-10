#!/usr/bin/env bash
echo -n "${POPCLIP_TEXT}" | tr '[:blank:]' '-' | sed 's/[^-[:alnum:]]//g' | tr '[:upper:]' '[:lower:]' | tr -d '\n'