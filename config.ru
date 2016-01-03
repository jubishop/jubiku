require './router.rb'

use Rack::Static,
  :urls => ['/json', '/js'],
  :root => 'public'
run JubikuRouter