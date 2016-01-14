require 'sass/plugin/rack'

require_relative 'jubirack/babel'
require_relative 'jubirack/jubi404'
require_relative 'jubiku_router'

use Sass::Plugin::Rack
use Rack::Static,
  :urls => ['/stylesheets/', '/json/'],
  :root => 'public'
use JubiRack::BabelJS,
  :urls => ['/js/'],
  :root => 'public',
  :options => { 'presets' => ['es2015'] }
use JubikuRouter,
  :jsDeps => {
    'js/jubiku' => ['js/jubisquare'],
    'js/jubisquare' => ['js/lib/tweener']
  }
run Jubi404