require 'erb'

class JubikuRouter
  def self.call(env)
    request = Rack::Request.new env
    response = Rack::Response.new

    if request.path == '/game'
      renderer = ERB.new(File.read('game.erb'))
      response.write renderer.result()
    else
      response.write 'URL unsupported'
      response.status = 404
    end

    response.finish
  end
end