# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'gemoji-parser/version'

Gem::Specification.new do |s|
  s.name          = "gemoji-parser"
  s.version       = EmojiParser::VERSION
  s.authors       = ["Greg MacWilliam"]
  s.email         = ["greg.macwilliam@voxmedia.com"]
  s.summary       = %q{The missing helper methods for GitHub's Gemoji gem.}
  s.description   = %q{Expands GitHub Gemoji to parse emoji unicode characters, token strings, and emoticons.}
  s.homepage      = "https://github.com/gmac/gemoji-parser"
  s.license       = "MIT"

  s.files         = `git ls-files -z`.split("\x0")
  s.executables   = s.files.grep(%r{^bin/}) { |f| File.basename(f) }
  s.test_files    = s.files.grep(%r{^(test|spec|features)/})
  s.require_paths = ["lib"]

  s.required_ruby_version = '> 1.9'
  s.add_dependency "gemoji", ">= 2.1.0"
  s.add_development_dependency "bundler", "~> 1.6"
  s.add_development_dependency "rake", "~> 10.0"
  s.add_development_dependency 'rspec'
end
