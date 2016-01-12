require_relative 'jubirack/babel'
require_relative 'jubiku_router'
require_relative 'jubiku_404'

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
run Jubiku404