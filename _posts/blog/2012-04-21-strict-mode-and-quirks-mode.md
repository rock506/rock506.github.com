---
layout:     post
title:      IE的strict mode & quirks mode 
category:   IE
tags:       IE
---

Quirks mode:怪异模式

Strict mode:标准模式

Almost Standards mode:近乎标准模式:由mozilla提出,和strict mode的区别是：img元素在strict中是inline的，而在almost strict mode中是block的.

在strict mode中 ：

width是内容宽度 ，也就是说,元素真正的宽度 = margin-left  +  border-left-width  +  padding-left  + width  +  padding-right  +  border-right-width  +  margin-right;

在quirks mode中 ：(在ie5下只有quirks mode所以它就是这样解析的,IE6也修正了这个错误)

width则是元素的实际宽度 ，内容宽度 = width  -  (margin-left  +  margin-right  +  padding-left  +  padding-right  +  border-left-width  +  border-right-width)

<script type="text/javascript">
if(document.compatMode!="BackCompat")
document.write("标准模式");
else 
document.write("诡异模式");
</script>

document对象有个属性compatMode ,它有两个值：
BackCompat    对应quirks mode
CSS1Compat    对应strict mode