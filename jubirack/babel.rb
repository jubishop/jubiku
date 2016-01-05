require_relative 'jubirack'
require 'rack/utils'
require 'uri'

module JubiRack
  ALLOW = 'Allow'
  ALLOWED_VERBS = %w[GET HEAD OPTIONS]
  ALLOW_HEADER = ALLOWED_VERBS.join(', ')
  HTTP_IF_MODIFIED_SINCE = 'HTTP_IF_MODIFIED_SINCE'

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

          # TODO: Replace env[] with request.get_header
          if env[HTTP_IF_MODIFIED_SINCE] == File.mtime(file_path).httpdate
            return Rack::Response.new('', 304).finish
          end

          puts "working on getting the file"
          response = Rack::Response.new
          response.write 'Working on it'
          response.status = 200
          response.finish
        else
          return Rack::Response.new("#{request.path} not found", 404).finish
        end
      else
        @app.call(env)
      end
    end
  end

  class Static < Rack::Static
    def call(env)
      response = super(env)
      # puts response
      response
    end
  end
end
