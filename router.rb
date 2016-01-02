def inspectObj(obj)
  puts "\n\ninspect:\n" + obj.inspect + "\n\n"
  (obj.clone.public_methods - Object.new.public_methods).each { |method|
    begin 
      puts "#{method}: #{obj.send(method)}"
    rescue
    end
  }
  puts "\n\n"
end

class JubikuRouter
  def self.call(env)
    request = Rack::Request.new env
    response = Rack::Response.new
    # inspectObj(request)

    if (request.path == '/game')
    end

    response.write 'Hello World All' # write some content to the body
    response.body = ['Hello World All'] # or set it directly
    response['X-Custom-Header'] = 'foo'
    response.set_cookie 'bar', 'baz'
    response.status = 200

    response.finish # return the generated triplet
  end
end