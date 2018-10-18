require 'gemoji-parser'

def display_row(label, value, label_width)
  label = Array.new(label_width - label.length, ' ').join('') + label
  "#{ label }  #{ value }\n"
end

namespace :output do

  desc 'Outputs default emoticon set'
  task :emoticons do
    
    HEADER_NAME = 'emoji_name'.upcase
    HEADER_ICONS = 'emoticons'.upcase
    label_width = HEADER_NAME.length

    # Compile table of emoticon symbols:
    icons = {}
    EmojiParser.emoticons.each_pair do |icon, name|
      name = name.to_s
      icons[name] ||= []
      icons[name] << icon
      label_width = name.length if name.length > label_width
    end

    # Compile symbol display table:
    display = display_row(HEADER_NAME, HEADER_ICONS, label_width)
    icons.each_pair do |name, icons|
      display += display_row(name, icons.join('  '), label_width)
    end

    # Write display to output:
    fp = 'output/emoticons.txt'
    f = File.open(fp, 'w')
    f.puts display
    f.close

    # Print display:
    puts "write: #{fp}"
    puts display
  end
  
end