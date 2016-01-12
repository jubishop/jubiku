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
    # TODO: Optimize by writing cached transpiled_js to file
    def initialize(app, options = {})
      super(app, options)

      @options = options[:options] || {}

      babel_path = File.expand_path("../babel.js", __FILE__)
      @compiled_babel_js = ExecJS.compile(File.read(babel_path))
    end

    def jsText(file_path)
      @compiled_babel_js.call(
        'Babel.transform',
        File.read(file_path),
        @options.merge({'ast' => false})
      )['code']
    end
  end
end
