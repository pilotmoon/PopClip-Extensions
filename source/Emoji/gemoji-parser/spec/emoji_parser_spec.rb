# coding: utf-8
require 'gemoji-parser'

describe EmojiParser do
  let(:test_unicode) { 'Test 🙈 🙊 🙉 😰 :invalid: 🐠. :o)' }
  let(:test_mixed) { 'Test 🙈 🙊 🙉 :cold_sweat: :invalid: :tropical_fish:. :o)' }
  let(:test_tokens) { 'Test :see_no_evil: :speak_no_evil: :hear_no_evil: :cold_sweat: :invalid: :tropical_fish:. :o)' }
  let(:test_emoticons) { ';-) Test (:cold_sweat:) :) :-D' }
  let(:test_custom) { Emoji.create('custom') }

  describe '#emoticons' do
    it 'should provide a hash with emoticons and their tokens as key/value pairs.' do
      expect(EmojiParser.emoticons[':o)']).to eq :monkey_face
    end
  end

  describe '#unicode_regex' do
    it 'generates once and remains cached.' do
      first = EmojiParser.unicode_regex
      second = EmojiParser.unicode_regex
      expect(first).to be second
    end

    it 'regenerates when called with a :rehash option.' do
      first = EmojiParser.unicode_regex
      second = EmojiParser.unicode_regex(rehash: true)
      expect(first).not_to be second
    end
  end

  describe '#token_regex' do
    it 'generates once and remains cached.' do
      first = EmojiParser.token_regex
      second = EmojiParser.token_regex
      expect(first).to be second
    end
  end

  describe '#emoticon_regex' do
    it 'generates once and remains cached.' do
      first = EmojiParser.emoticon_regex
      second = EmojiParser.emoticon_regex
      expect(first).to be second
    end

    it 'regenerates when called with a :rehash option.' do
      first = EmojiParser.emoticon_regex
      second = EmojiParser.emoticon_regex(rehash: true)
      expect(first).not_to be second
    end
  end

  describe '#rehash!' do
    it 'regenerates all cached regular expressions.' do
      urx = EmojiParser.unicode_regex
      erx = EmojiParser.emoticon_regex
      EmojiParser.rehash!
      expect(EmojiParser.unicode_regex).not_to be urx
      expect(EmojiParser.emoticon_regex).not_to be erx
    end
  end

  describe '#parse_unicode' do
    it 'successfully parses full Gemoji unicode set.' do
      Emoji.all.each do |emoji|
        emoji.unicode_aliases.each do |u|
          parsed = EmojiParser.parse_unicode("Test #{u}") { |e| 'X' }
          expect(parsed).to eq "Test X"
        end
      end
    end

    it 'replaces all valid unicode symbols via block transformation.' do
      parsed = EmojiParser.parse_unicode(test_mixed) { |e| 'X' }
      expect(parsed).to eq 'Test X X X :cold_sweat: :invalid: :tropical_fish:. :o)'
    end
  end

  describe '#parse_tokens' do
    it 'successfully parses full Gemoji name set.' do
      Emoji.all.each do |emoji|
        parsed = EmojiParser.parse_tokens("Test :#{emoji.name}:") { |e| 'X' }
        expect(parsed).to eq "Test X"
      end
    end

    it 'replaces all valid token symbols via block transformation.' do
      parsed = EmojiParser.parse_tokens(test_tokens) { |e| 'X' }
      expect(parsed).to eq 'Test X X X X :invalid: X. :o)'
    end
  end

  describe '#parse_emoticons' do
    it 'successfully parses full default emoticon set.' do
      EmojiParser.emoticons.each_key do |emoticon|
        parsed = EmojiParser.parse_emoticons("Test #{emoticon}") { |e| 'X' }
        expect(parsed).to eq "Test X"
      end
    end

    it 'replaces all valid emoticon symbols via block transformation.' do
      parsed = EmojiParser.parse_emoticons(test_emoticons) { |e| 'X' }
      expect(parsed).to eq 'X Test (:cold_sweat:) X X'
    end
  end

  describe '#emoticon_lookaround' do
    before(:example) do
      EmojiParser.emoticon_lookaround[:behind] += '|>'
      EmojiParser.emoticon_lookaround[:ahead] += '|<'
      EmojiParser.emoticon_regex(rehash: true)
    end

    after(:example) do
      EmojiParser.emoticon_lookaround(reset: true)
    end

    it 'allows customization of emoticon lookaround patterns.' do
      parsed = EmojiParser.parse_emoticons('<p>:-) Test :-)</p>') { |e| 'X' }
      expect(parsed).to eq '<p>X Test X</p>'
    end
  end

  describe '#parse' do
    it 'replaces valid symbols of all types via block transformation.' do
      parsed = EmojiParser.parse(test_mixed) { |e| 'X' }
      expect(parsed).to eq 'Test X X X X :invalid: X. X'
    end

    it 'replaces valid symbols of specified types (unicode, tokens).' do
      parsed = EmojiParser.parse(test_mixed, emoticons: false) { |e| 'X' }
      expect(parsed).to eq 'Test X X X X :invalid: X. :o)'
    end

    it 'replaces valid symbols of specified types (unicode, emoticons).' do
      parsed = EmojiParser.parse(test_mixed, tokens: false) { |e| 'X' }
      expect(parsed).to eq 'Test X X X :cold_sweat: :invalid: :tropical_fish:. X'
    end

    it 'replaces valid symbols of specified types (tokens, emoticons).' do
      parsed = EmojiParser.parse(test_mixed, unicode: false) { |e| 'X' }
      expect(parsed).to eq 'Test 🙈 🙊 🙉 X :invalid: X. X'
    end

    it 'allows symbols to safely insert other symbol types without getting re-parsed.' do
      parsed = EmojiParser.parse('🙈 🙊 :hear_no_evil:') { |e| ":#{e.name}:" }
      expect(parsed).to eq ':see_no_evil: :speak_no_evil: :hear_no_evil:'
    end
  end

  describe '#tokenize' do
    it 'successfully tokenizes full Gemoji unicode set.' do
      Emoji.all.each do |emoji|
        emoji.unicode_aliases.each do |u|
          tokenized = EmojiParser.tokenize("Test #{u}")
          expect(tokenized).to eq "Test :#{emoji.name}:"
        end
      end
    end

    it 'replaces all valid emoji unicode with their token equivalent.' do
      tokenized = EmojiParser.tokenize(test_mixed)
      expect(tokenized).to eq test_tokens
    end
  end

  describe '#detokenize' do
    it 'replaces all valid emoji tokens with their raw unicode equivalent.' do
      tokenized = EmojiParser.detokenize(test_mixed)
      expect(tokenized).to eq test_unicode
    end
  end

  describe '#find' do
    let (:the_unicode) { '🐵' }
    let (:the_token) { 'monkey_face' }
    let (:the_emoticon) { ':o)' }
    let (:the_emoji) { Emoji.find_by_alias(the_token) }
    
    it 'returns valid emoji characters.' do
      expect(EmojiParser.find(the_emoji)).to eq the_emoji
    end

    it 'finds the proper emoji character for a unicode symbol.' do
      expect(EmojiParser.find(the_unicode)).to eq the_emoji
    end

    it 'finds the proper emoji character for a token symbol.' do
      expect(EmojiParser.find(the_token)).to eq the_emoji
    end

    it 'finds the proper emoji character for a unicode symbol.' do
      expect(EmojiParser.find(the_emoticon)).to eq the_emoji
    end
  end

  describe '#image_path' do
    let (:the_emoji) { Emoji.find_by_alias('smiley') }
    let (:the_image) { '1f603.png' }

    it 'gets the image filename by emoji character.' do
      path = EmojiParser.image_path(the_emoji)
      expect(path).to eq the_emoji.image_filename
    end

    it 'gets the image filename by unicode symbol.' do
      path = EmojiParser.image_path(the_emoji.raw)
      expect(path).to eq the_emoji.image_filename
    end

    it 'gets the image filename by token symbol.' do
      path = EmojiParser.image_path(the_emoji.name)
      expect(path).to eq the_emoji.image_filename
    end

    it 'gets the image filename by emoticon symbol.' do
      path = EmojiParser.image_path('=)')
      expect(path).to eq the_emoji.image_filename
    end

    it 'formats a Gemoji image path as a custom location (with trailing slash).' do
      custom_path = '//fonts.test.com/emoji/'
      path = EmojiParser.image_path(the_emoji, custom_path)
      expect(path).to eq "#{ custom_path }#{ the_image }"
    end

    it 'formats a Gemoji image path to a custom location (no trailing slash).' do
      custom_path = '//fonts.test.com/emoji'
      path = EmojiParser.image_path(the_emoji, custom_path)
      expect(path).to eq "#{ custom_path }/#{ the_image }"
    end
  end

  describe 'custom emoji' do
    it 'replaces tokens for custom Emoji.' do
      Emoji.create('boxing_kangaroo')
      parsed = EmojiParser.parse_tokens('Test :boxing_kangaroo:') { |e| 'X' }
      expect(parsed).to eq 'Test X'
    end

    it 'replaces custom emoticons (requires rehashing the regex).' do
      EmojiParser.emoticons['¯\\(°_o)/¯'] = :confused
      EmojiParser.emoticon_regex(rehash: true)

      parsed = EmojiParser.parse_emoticons('Test ¯\\(°_o)/¯') { |e| e.name }
      expect(parsed).to eq 'Test confused'
    end
  end
end