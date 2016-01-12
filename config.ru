require_relative 'jubirack/babel'
require_relative 'jubirack/jubi404'
require_relative 'jubiku_router'

use Rack::Static,
  :urls => ['/css/', '/json/'],
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