def inspectObj(obj)
  puts "\n\ninspect:\n" + obj.inspect + "\n\n"
  (obj.clone.public_methods - Object.new.public_methods).each { |method|
    begin 
      puts "#{method}: #{obj.send(method)}"
    rescue
    end
  }
  puts "\n\n"
end