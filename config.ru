require 'sass/plugin/rack'

require_relative 'jubirack/babel'
require_relative 'jubirack/jubi404'
require_relative 'jubiku_router'

use Sass::Plugin::Rack
use JubiRack::BabelJS,
  :options => { 'presets' => ['es2015'] }
use Rack::Static,
  :urls => ['/js/', '/json/', '/stylesheets/'],
  :root => 'public'
use JubikuRouter,
  :jsDeps => {
    'js/jubiku' => ['js/jubisquare'],
    'js/jubisquare' => ['js/tweener']
  }
run Jubi404