input=ENV['POPCLIP_TEXT']
print input.split(' ').map {|w| w.capitalize }.join(' ')