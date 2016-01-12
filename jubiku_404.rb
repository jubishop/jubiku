class Jubiku404
  def self.call(env)
    Rack::Response.new('Path Not Found', 404).finish
  end
end