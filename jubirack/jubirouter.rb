class JubiRouter
  def initialize(app, jsDeps: {})
    @app = app
    @jsDeps = jsDeps
  end

  # TODO: Put this in Babel.rb and output just one file
  # TODO: Preprocess for faster production speeds
  protected def jsTag(jsFile)
    tagFiles = Array.new

    (addDeps = ->(depFile) {
      tagFiles.unshift depFile
      @jsDeps.fetch(depFile, []).each(&addDeps)
    }).(jsFile)

    tagFiles.uniq.map { |file|
      "<script src='#{file}.js'></script>"
    }.join("\n")
  end

  def call(env)
    request = Rack::Request.new env

    file_path = filePath(request.path_info)
    if fileExists? file_path
      return Rack::Response.new(erbText(file_path)).finish
    end

    @app.call(env)
  end

  private def erbText path
    ERB.new(File.read(path)).result(binding)
  end

  private def filePath path
    "#{path[1..-1]}.erb"
  end

  private def fileExists? path
    File.file?(path) && File.readable?(path)
  end
end