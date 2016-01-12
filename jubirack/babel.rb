require 'execjs'
require 'rack/utils'
require 'uri'

require_relative 'jubirack'
require_relative 'static_js'

module JubiRack
  ALLOW = 'Allow'
  ALLOWED_VERBS = %w[GET HEAD OPTIONS]
  ALLOW_HEADER = ALLOWED_VERBS.join(', ')
  CONTENT_JAVASCRIPT = 'application/javascript'
  MODIFIED_SINCE = 'HTTP_IF_MODIFIED_SINCE'

  class BabelJS < StaticJS
    def initialize(app, root:, urls:, options: {})
      super(app, root: root, urls: urls)

      @options = options

      babel_path = File.expand_path("../babel.js", __FILE__)
      @compiled_babel_js = ExecJS.compile(File.read(babel_path))
    end

    def babelPath(path)
      "#{path}.babel"
    end

    def babelMTime(path)
      if (fileExists? path)
        File.mtime(path).to_i
      else
        0
      end
    end

    def jsText(path)
      if File.mtime(path).to_i > babelMTime(babelPath(path))
        babel_code = @compiled_babel_js.call(
          'Babel.transform',
          File.read(path),
          @options.merge({'ast' => false})
        )['code']

        File.open(babelPath(path), File::CREAT|File::WRONLY) { |file|
          file.write babel_code
        }
        babel_code
      else
        File.read(babelPath(path))
      end
    end
  end
end
