# gemoji-parser

The missing helper methods for [GitHub's gemoji](https://github.com/github/gemoji) gem. This utility provides a parsing API for the `Emoji` corelib (provided by *gemoji*). Parser performs the transformation of emoji symbols between unicode characters (😃), token strings (`:smile:`), and emoticons (`:-D`); and may perform arbitrary replacement of emoji symbols into custom display formats (such as image tags). Internally, [highly-optimized regular expressions](http://product.voxmedia.com/2015/3/25/8292199/optimizing-regex-for-emoji) are generated and cached for efficient parsing.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'gemoji-parser'
```

And then execute:

    $ bundle install

Or install it yourself as:

    $ gem install gemoji-parser

To run tests:

    $ bundle exec rake spec

## Usage

### Tokenizing

The tokenizer methods perform basic conversions of unicode symbols into token symbols, and vice versa.

```ruby
EmojiParser.tokenize("Test 🙈 🙊 🙉")
# "Test :see_no_evil: :speak_no_evil: :hear_no_evil:"

EmojiParser.detokenize("Test :see_no_evil: :speak_no_evil: :hear_no_evil:")
# "Test 🙈 🙊 🙉"
```

### Symbol Parsing

Use the symbol parser methods for custom transformations. All symbol parsers yield [Emoji::Character](https://github.com/github/gemoji/blob/master/lib/emoji/character.rb) instances into the parsing block for custom formatting.

**Unicode symbols**

```ruby
EmojiParser.parse_unicode("Test 🐠") do |emoji|
  %Q(<img src="#{emoji.image_filename}" alt=":#{emoji.name}:">).html_safe
end

# 'Test <img src="unicode/1f420.png" alt=":tropical_fish:">'
```

**Token symbols**

```ruby
EmojiParser.parse_tokens("Test :tropical_fish:") do |emoji|
  %Q(<img src="#{emoji.image_filename}" alt=":#{emoji.name}:">).html_safe
end

# 'Test <img src="unicode/1f420.png" alt=":tropical_fish:">'
```

**Emoticon symbols**

```ruby
EmojiParser.parse_emoticons("Test ;-)") do |emoji|
  %Q(<img src="#{emoji.image_filename}" alt=":#{emoji.name}:">).html_safe
end

# 'Test <img src="unicode/1f609.png" alt=":wink:">'
```

See [emoticons output](https://github.com/gmac/gemoji-parser/blob/master/output/emoticons.txt) for the default emoticon set.

**All symbol types**

Use the `parse` method to target all symbol types with a single parsing pass. Specific symbol types may be excluded using options:

```ruby
EmojiParser.parse("Test 🐠 :scream: ;-)") { |emoji| "[#{emoji.name}]" }
# 'Test [tropical_fish] [scream] [wink]'

EmojiParser.parse("Test 🐠 :scream: ;-)", emoticons: false) do |emoji|
  "[#{emoji.name}]"
end
# 'Test [tropical_fish] [scream] ;-)'
```

While the `parse` method is heavier to run than the discrete parsing methods for each symbol type (`parse_unicode`, `parse_tokens`, etc...), it has the advantage of avoiding multiple parsing passes. This is handy if you want parsed symbols to output new symbols in a different format, such as generating image tags that include a symbol in their alt text:

```ruby
EmojiParser.parse("Test 🐠 ;-)") do |emoji|
  %Q(<img src="#{emoji.image_filename}" alt=":#{emoji.name}:">).html_safe
end

# 'Test <img src="unicode/1f420.png" alt=":tropical_fish:"> <img src="unicode/1f609.png" alt=":wink:">'
```

### Lookups & File Paths

Use the `find` method to derive [Emoji::Character](https://github.com/github/gemoji/blob/master/lib/emoji/character.rb) instances from any symbol format (unicode, token, emoticon):

```ruby
emoji = EmojiParser.find(🐠)
emoji = EmojiParser.find('see_no_evil')
emoji = EmojiParser.find(';-)')
```

Use the `image_path` helper to derive an image filepath from any symbol format (unicode, token, emoticon). You may optionally provide a custom path that overrides the *gemoji* default location (this is useful if you'd like to reference your images from a CDN):

```ruby
EmojiParser.image_path('tropical_fish')
# "unicode/1f420.png"

EmojiParser.image_path('tropical_fish', '//cdn.fu/emoji/')
# "//cdn.fu/emoji/1f420.png"
```

## Custom Symbols

**Emoji**

The parser plays nicely with [custom emoji](https://github.com/github/gemoji#adding-new-emoji) defined through the *gemoji* core. You just need to call `rehash!` once after adding new emoji symbols to regenerate the parser's regex cache:

```ruby
Emoji.create('boxing_kangaroo') # << WHY IS THIS NOT STANDARD?!
EmojiParser.rehash!
```

**Emoticons**

Emoticon [patterns](https://github.com/gmac/gemoji-parser/blob/master/output/emoticons.txt) are defined through the parser, and are simply mapped to an emoji name that exists within the *gemoji* core (this can be a standard emoji name, or a [custom name](https://github.com/github/gemoji#adding-new-emoji) that you have added). To add custom emoticon symbols:

```ruby
# Alias a standard emoji name:
EmojiParser.emoticons[':@'] = :angry

# Create a custom emoji name, and alias it:
Emoji.create('bill_clinton')
EmojiParser.emoticons['=:o]'] = :bill_clinton

# IMPORTANT:
# Rehash once after adding any new symbols:
EmojiParser.rehash!
```

**Emoticon Lookarounds**

Emoticons are matched using [lookaround patterns](http://www.regular-expressions.info/lookaround.html) that separate the icon from its surrounding text. By default, an emoticon pattern must start a string, end it, and/or be surrounded by whitespace. To adjust these rules, you may modify the `emoticon_lookaround` settings. The following would allow emoticons to be wrapped in HTML tags:

```ruby
# Allow HTML tags to surround emoticons, ex: "<p>:-)</p>"
EmojiParser.emoticon_lookaround[:behind] += '|>'
EmojiParser.emoticon_lookaround[:ahead] += '|<'
EmojiParser.rehash!
```

## Shoutout

Thanks to the GitHub team for the [gemoji](https://github.com/github/gemoji) gem, Matthew Rothenberg for [emojitracker](http://www.emojitracker.com/), and my esteemed colleague Michael Lovitt for the fantastic [Rubular](http://rubular.com/) regex tool (it has been invaluable on this project).

🙈 🙊 🙉
