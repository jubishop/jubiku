require './utility.rb'
require 'erb'

class JubikuRouter
  def self.call(env)
    request = Rack::Request.new env
    response = Rack::Response.new
    # inspectObj(request)

    if (request.path == '/game')
      renderer = ERB.new(File.read('game.erb'))
      response.write renderer.result()
    else
      response.write 'Path Not Found'
      response.status = 404
    end

    response.finish
  end
end