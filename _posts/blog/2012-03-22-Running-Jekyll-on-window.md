---
layout: default
title:  Running Jekyll on window
category: github
---
# Running Jekyll on window
jekyll是一个简单的免费的Blog生成工具，类似WordPress。但是和WordPress又有很大的不同，原因是jekyll只是一个生成静态网页的工具，不需要数据库支持。但是可以配合第三方服务,例如disqus。最关键的是jekyll可以免费部署在Github上，而且可以绑定自己的域名。[more][http://baike.baidu.com/view/7878719.htm]

## 安装
* 安装Ruby到C:\ruby，[下载][http://rubyinstaller.org/downloads/]；
* 安装Ruby development kit到C:\devkit，[下载][http://rubyinstaller.org/downloads/]；
* cd devkit

    ruby dk.rb init
    ruby dk.rb install
    gem install jekyll

* 解决中文编码问题
    \ruby\lib\ruby\gems\1.9.1\gems\jekyll-0.11.2\lib\jekyll\tags\include.rb 
    source = File.read(@file, :encoding => "utf-8")

    \ruby\lib\ruby\gems\1.9.1\gems\jekyll-0.11.2\lib\jekyll\convertible.rb
    self.content = File.read(File.join(base, name), :encoding => "utf-8")