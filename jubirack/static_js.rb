require_relative 'jubirack'

module JubiRack
  class StaticJS
    def initialize(app, root:, urls:)
      @app = app
      @root = root
      @urls = urls
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

    def jsText(file_path)
      File.read(file_path)
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
        unless (File.extname(file_path) == '.js')
          raise SecurityError,
            "#{file_path} must be a .js file"
        end

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

          return response = Rack::Response.new(jsText(file_path), 200, {
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