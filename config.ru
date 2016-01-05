require_relative 'router'
require_relative 'jubirack/babel'

use JubiRack::Static,
  :urls => ['/js/', '/json/'],
  :root => 'public'
use JubiRack::Babel,
  :urls => ['/js/'],
  :root => 'public' 
run JubikuRouter