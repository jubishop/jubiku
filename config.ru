require_relative 'router'
require_relative 'jubirack/babel'

use JubiRack::Static,
  :urls => ['/json/'],
  :root => 'public'
use JubiRack::Babel,
  :urls => ['/js/'],
  :root => 'public' 
run JubikuRouter