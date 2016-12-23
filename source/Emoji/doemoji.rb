require 'gemoji-parser'

# the popclip text
ARGV.each do |text|
	# try tokenising it first
	result = EmojiParser.detokenize text
	if result == text 
		# then try detokenizing
		result = EmojiParser.tokenize text
		if result == text
			# then try single emoji lookup (no colons needed)
			char = EmojiParser.find(text)
			result = char ? char.raw : text
		end
	end

	print result ? result : text
end