require_relative 'router'
require_relative 'jubirack/babel'

use Rack::Static,
  :urls => ['/json/'],
  :root => 'public'
use JubiRack::Babel,
  :urls => ['/js/'],
  :root => 'public',
  :options => { 'presets' => ['es2015'] }
run JubikuRouter