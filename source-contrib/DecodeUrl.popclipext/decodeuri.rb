require 'uri'

input=ENV['POPCLIP_TEXT']
print URI.unescape(input)