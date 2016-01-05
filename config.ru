require_relative 'router'
require_relative 'jubirack/babel'

use Rack::Static,
  :urls => ['/json/'],
  :root => 'public'
use JubiRack::Babel,
  :urls => ['/js/'],
  :root => 'public' 
run JubikuRouter