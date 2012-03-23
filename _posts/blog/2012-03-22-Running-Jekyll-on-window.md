---
layout:     default
title:      Running Jekyll On Windows
category:   Github
tags:       git github jekyll
---

# {{ page.title }}
jekyll是一个简单的免费的Blog生成工具，类似WordPress。但是和WordPress又有很大的不同，原因是jekyll只是一个生成静态网页的工具，不需要数据库支持。但是可以配合第三方服务,例如disqus。最关键的是jekyll可以免费部署在Github上，而且可以绑定自己的域名。[More][1]

## 安装
* 安装Ruby到C:\ruby，[下载][2]；
* 安装Ruby development kit到C:\devkit，[下载][3]；
* cd devkit

        #依次运行以下代码
        ruby dk.rb init
        ruby dk.rb install
        gem install jekyll

## 本地预览
* 进入到项目目录并运行以下命令

        jekyll
* 访问http://localhost:4000

## 解决invalid byte sequence in GBK问题
* 打开<code>\ruby\lib\ruby\gems\1.9.1\gems\jekyll-0.11.2\lib\jekyll\tags\include.rb</code>文件

        #将source = File.read(@file)修改为：
        source = File.read(@file, :encoding => "utf-8")
* 打开<code>\ruby\lib\ruby\gems\1.9.1\gems\jekyll-0.11.2\lib\jekyll\convertible.rb</code>文件

        #将self.content = File.read(File.join(base, name))修改为：
        self.content = File.read(File.join(base, name), :encoding => "utf-8")

[1]:    http://baike.baidu.com/view/7878719.htm
[2]:    http://rubyinstaller.org/downloads/
[3]:    http://rubyinstaller.org/downloads/