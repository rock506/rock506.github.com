#!/usr/bin/env ruby19
module Jekyll
  class CategoryList < Liquid::Tag
    safe = true
    
    def render(context)
      result = ""
      categories = context.registers[:site].categories
      
      categories.keys.each do |category|
        result << %(<li><a href="/categories/#{category}">#{category}(#{categories[category].length})</a> </li>)
      end
      
      result
    end
  end
end
 
Liquid::Template.register_tag('category_list', Jekyll::CategoryList)