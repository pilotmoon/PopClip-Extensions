desc 'Runs a sweep of all library tasks'
task :sweep do
  Rake::Task["db:rankings"].invoke
  Rake::Task["spec"].invoke
  Rake::Task["output:regex:all"].invoke
  Rake::Task["output:emoticons"].invoke
end