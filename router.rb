require 'rack'
require 'rack/server'

class JubikuRouter
  def self.call(env)
    request = Rack::Request.new env
    response = Rack::Response.new
    response.write 'Hello World' # write some content to the body
    response.body = ['Hello World'] # or set it directly
    response['X-Custom-Header'] = 'foo'
    response.set_cookie 'bar', 'baz'
    response.status = 202

    response.finish # return the generated triplet
  end
end

Rack::Server.start :app => JubikuRouter