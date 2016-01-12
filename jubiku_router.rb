class JubikuRouter
  def initialize(app, jsDeps: {})
    @app = app
    @jsDeps = jsDeps
  end

  def jsTag(jsFile)
    tagFiles = Array.new

    addDeps = lambda { |depFile|
      tagFiles.unshift depFile
      if (@jsDeps.include? depFile)
        @jsDeps[depFile].each { |file| addDeps.(file) }
      end
    }
    addDeps.(jsFile)

    tagFiles.uniq.map { |file|
      "<script src='#{file}.js'></script>"
    }.join("\n")
  end

  def call(env)
    request = Rack::Request.new env
    response = Rack::Response.new

    if request.path == '/game'
      return Rack::Response.new(
        ERB.new(File.read('game.erb')).result(binding)
      ).finish
    end

    @app.call(env)
  end
end