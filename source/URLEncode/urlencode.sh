#!/bin/bash

echo -n "$POPCLIP_TEXT" | perl -pe's/([^-_.~A-Za-z0-9])/sprintf("%%%02X", ord($1))/seg'
