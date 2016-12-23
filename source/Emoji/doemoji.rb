require 'gemoji'
require 'gemoji-parser'


text = ARGV[0]
result = EmojiParser.detokenize text
if result
	print result
end