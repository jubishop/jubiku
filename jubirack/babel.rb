require 'execjs'
require 'rack/utils'
require 'uri'

require_relative 'jubirack'

# TODO: Make sure Babel.js is updated
module JubiRack
  class BabelJS
    def initialize(app, options: {})
      @app = app
      @options = options

      babel_path = File.expand_path("../babel.js", __FILE__)
      @compiled_babel_js = ExecJS.compile(File.read(babel_path))
    end

    def call(env)
      request = Rack::Request.new env

      if shouldServe? request.path_info
        unless (File.extname(request.path_info) == '.js')
          raise SecurityError, "#{request.path_info} must be a .js file"
        end

        source_path = sourcePath(request.path_info)
        target_path = targetPath(request.path_info)
        if mTime(source_path) > mTime(target_path)
          File.open(target_path, File::CREAT|File::WRONLY|File::TRUNC) { |file|
            file.write @compiled_babel_js.call(
              'Babel.transform',
              File.read(source_path),
              @options.merge({'ast' => false})
            )['code']
          }
        end
      end

      @app.call(env)
    end

    private def shouldServe? path
      path.index('/js/') == 0
    end

    private def fileExists? path
      File.file?(path) && File.readable?(path)
    end

    private def sourcePath(path)
      dir, file = *File.split(path)
      bjs_file = "#{File.basename(file, '.js')}.bjs"
      File.join('public', dir, '/babel', bjs_file)
    end

    private def targetPath(path)
      File.join('public', path)
    end

    private def mTime(path)
      if (fileExists? path)
        File.mtime(path).to_i
      else
        0
      end
    end
  end
end