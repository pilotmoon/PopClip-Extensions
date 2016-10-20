#!/bin/bash
urldecode() {
    # urldecode <string>

    local url_encoded="${1//+/ }"
    printf '%b' "${url_encoded//%/\\x}"
}
urldecode ${POPCLIP_TEXT} |iconv -f gbk -t utf-8
