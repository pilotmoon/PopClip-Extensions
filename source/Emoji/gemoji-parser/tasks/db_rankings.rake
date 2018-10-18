require 'net/http'

namespace :db do

  desc 'Updates the JSON database with current rankings from emojitracker.com'
  task :rankings do
    data = Net::HTTP.get(URI('http://www.emojitracker.com/api/rankings'))

    fp = 'db/rankings.json'
    f = File.open(fp, 'w')
    f.puts data
    f.close
    puts "write: #{fp}"
    
    data = JSON.parse(data)
    data = data.reduce({}) do |obj, emoji|
      obj[emoji['char']] = emoji['score'].to_i
      obj
    end

    fp = 'db/scores.json'
    f = File.open(fp, 'w')
    f.puts JSON.generate(data)
    f.close
    puts "write: #{fp}"
  end

end