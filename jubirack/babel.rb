require 'execjs'
require 'rack/utils'
require 'uri'

require_relative 'jubirack'

module JubiRack
  ALLOW = 'Allow'
  ALLOWED_VERBS = %w[GET HEAD OPTIONS]
  ALLOW_HEADER = ALLOWED_VERBS.join(', ')
  CONTENT_JAVASCRIPT = 'application/javascript'
  MODIFIED_SINCE = 'HTTP_IF_MODIFIED_SINCE'

  class Babel

    def initialize(app, options={})
      @app = app
      @root = options[:root]
      @urls = options[:urls]

      if (@root.nil? || @urls.nil?)
        raise ArgumentError,
          "JubiRack::Babel missing required 'root' or 'urls' option"
      end

      @urls = [@urls] if @urls.kind_of? String
    end

    def shouldServe? path
      @urls.any? { |url| path.index(url) == 0 }
    end

    # TODO: Replace URI::DEFAULT_PARSER with Rack::Utils.unescape_path
    def filePath(path)
      File.join(
        @root,
        Rack::Utils.clean_path_info(URI::DEFAULT_PARSER.unescape path)
      )
    end

    def fileExists? path
      begin
        File.file?(path) && File.readable?(path)
      rescue
        false
      end
    end

    def call(env)
      request = Rack::Request.new env

      unless ALLOWED_VERBS.include? request.request_method
        return Rack::Response.new('Method Not Allowed', 405, {
          ALLOW => ALLOW_HEADER
        }).finish
      end

      if shouldServe? request.path_info
        file_path = filePath(request.path_info)
        if fileExists? file_path
          if request.options?
            return Rack::Response.new('', 200, {
              ALLOW => ALLOW_HEADER
            }).finish
          end

          last_modified = File.mtime(file_path).httpdate
          # TODO: Replace env[] with request.get_header
          if env[MODIFIED_SINCE] == last_modified
            return Rack::Response.new('', 304).finish
          end

          gem_spec = Gem::Specification.find_by_name('babel-source')
          script_path = File.join(
            gem_spec.full_require_paths.first,
            'babel.js'
          )

          js_code = ExecJS.compile("var self = this; " + File.read(script_path))
          babel_code = js_code.call(
            'babel.transform',
            File.read(file_path),
            {'ast' => false}
          )['code']
          
          return response = Rack::Response.new(babel_code, 200, {
            LAST_MODIFIED => last_modified,
            CONTENT_TYPE => CONTENT_JAVASCRIPT
          }).finish
        else
          return Rack::Response.new("#{request.path} not found", 404).finish
        end
      else
        @app.call(env)
      end
    end
  end
end
