---
layout:     post
title:      Kohana入门 - 添加Smarty3模块
category:   Php
tags:       php kohana
---

##安装步骤
从github上下载[Kohana_Smarty3][1]

解压放到<code>\kohana-3.2\modules\Kohana_Smarty3</code>目录下。

修改<code>\kohana-3.2\application\bootstrap.php</code>文件，添加<code>smarty3</code>模块

    Kohana::modules(array(
    // 'auth'       => MODPATH.'auth',       // Basic authentication
    // 'cache'      => MODPATH.'cache',      // Caching with multiple backends
    // 'codebench'  => MODPATH.'codebench',  // Benchmarking tool
    // 'database'   => MODPATH.'database',   // Database access
    // 'image'      => MODPATH.'image',      // Image manipulation
    // 'orm'        => MODPATH.'orm',        // Object Relationship Mapping
    // 'unittest'   => MODPATH.'unittest',   // Unit testing
    // 'userguide'  => MODPATH.'userguide',  // User guide and API documentation
    'Kohana_Smarty3'  => MODPATH.'Kohana_Smarty3',  // Use Smarty3
    ));

## Hello Kohana_Smarty
在<code>\kohana-3.2\application\classes\controller</code>新建一个<code>smartydemo.php</code>文件

    <?php defined('SYSPATH') or die('No direct access allowed.');

    class Controller_SmartyDemo extends Controller_Template {

      public $template = 'smarty_demo.tpl';

      function action_index() {
        $this->template->title = 'Demo Page' ;
        $this->template->content = 'Kohana_Smarty content！';
      }

    }

在<code>\kohana-3.2\application\views</code>新建一个<code>layout.tpl</code>和<code>smarty_demo.tpl</code>文件

    #layout.tpl
    <html>
        <head>
            <title>{$title|default:'No title supplied'}</title>
        </head>
        <body>
        <div>header</div>
        {block name="content"}
        defaule content ...
        {/block}
        <div>footer</div>
        </body>
    </html>

    #smarty_demo.tpl
    {extends file="layout.tpl"}

    {block name="content"}
    {$content|default:'No content supplied'}
    {/block}

访问<code>http://localhost/kohana-3.2/index.php/smartydemo/index</code>，it work！

## 自定义Smarty配置

smarty配置文件<code>\kohana-3.2\modules\Kohana_Smarty3\config\smarty.php</code>

修改smarty定界符：

        'left_delimiter'  => '<%'
        'right_delimiter' => '%>'

[1]:    https://github.com/MrAnchovy/Kohana_Smarty3