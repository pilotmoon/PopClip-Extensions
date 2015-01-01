 #!/usr/bin/ruby -w
require 'digest/md5'

input=ENV['POPCLIP_TEXT']

digest = Digest::MD5.hexdigest(input)
puts digest
