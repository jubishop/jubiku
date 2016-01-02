require './router.rb'

use Rack::Static,
  :urls => ["/gameJSON"],
  :root => "public"
run JubikuRouter