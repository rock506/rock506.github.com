---
layout:     post
title:      Kohana入门 - 安装
category:   Php
tags:       php kohana
---

##安装步骤
* 先到[Kohana的官方网站][1]去下载最新稳定版。
* 将刚才下载的压缩包解压后会创建一个包含<code>kohana</code>框架的目录。
* 再将该目录下的文件上传至你的Web服务器。
* 打开 application/bootstrap.php ，然后作如下修改：
    1. 为你的应用程序设置默认时区。
    2. 在Kohana::init调用中为base_url设置合适的值，用以映射kohana文件夹在Web服务器上相对于网站根目录的位置。
* 请确定application/cache和application/logs两个目录对web服务器进程而言具有可写权限。
* 在你常用的浏览器里打开那个之前被你设置为了base_url的URL地址，以测试kohana的安装情况。
        #由于zip解压过程往往依赖于你所使用的操作系统平台，而这也常常给安装过程中解压出来的子目录带来权限丢失的问题。不过，我们可以通过find . -type d -exec chmod 0755 {} \;将kohana下所以文件的权限都设定为755来解决该问题。
* 你应该看看这个安装测试页面。如果它报告了任何错误，那么你就需要更正了这些错误之后再继续。
* <img src="http://kohanaframework.org/3.2/guide/media/kohana/install.png">
* 一旦你的安装页的报告中表明你正确地配置了安装环境，那么那就可以将kohana目录下的install.php重命名或者删除。这样，Kohana就被安装上了，你应该可以看到默认控制器welcome的输出：
        hello, world!
* 官方安装手册<http://kohanaframework.org/3.2/guide/kohana/install>

[1]:    http://kohanaframework.org