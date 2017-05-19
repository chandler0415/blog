要在email中发送html格式的邮件，因为之前没有接触过这种业务需求，自以为就是普通的一个html静态页，因此也走了不少坑，作总结如下：

### 测试

我先编写了一段很简单的html文本，如下：

```
<!DOCTYPE html>
<html lang="en">
<head id="test-head">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body id="test-body">
  <div id="test-div">div</div>
  <table id="test-table">table</table>
</body>
</html>
```

通过公司的服务器直接发送给我的sina邮箱和qq邮箱，从接到的邮件中发现，我的代码中，只有`<body>`中的内部被留下，并插入到了一个`<pre>`的标签中，同时`<pre>`标签被解析的格式又很怪异，在`<pre>`及内部元素的`padding`和`margin`值都为0的前提下，多出很多空白的间隙，暂为研究明白，还需要后续跟进。

### 坑记录
通过反复的实践，发现就**html-email**中对于**html**代码的限制还是很多，在编写时大概要留心以下：

1. 不要写js：基于安全考虑，所有js的代码会被严格过滤掉；
2. 不要写iframe：原理同1，测试中发现iframe标签会被保留，但src已经被过滤；
3. 不要写`<style>`标签、不要写`class`，所有*CSS*都用`style`属性，什么元素需要什么样式就用`style`写内联的*CSS*；
4. 少用图片，图片过多时，邮箱系统可能会过滤你的图片，然后判断为垃圾邮件，所以要用图片时一定要记得加`alt`属性，同时注意qq邮箱会把图片地址变更为`/cgi-bin/get_netres?url=`加编码后你的图片地址，造成图片挂掉；
5. style内容里面background可以设置color，但是img会被过滤，就是说不能通过CSS来设置背景图片了。但是有一个很有意思的元素 属性，也叫background，里面可以定义一个图片路径，这是个不错的替代方案，虽然这样功能有限，比如无法定位背景图片了，有总比没有好。例如要给 一个单元格加一个背景，必须这样写：`<td background=”http://image1.koubei.com/images/common/logo_koubei.gif”></td>`；
6. sina邮箱中直接写的*html*元素间空隙很大，无`padding`和`margin`值设置，原因需要再细查；
7. 阮一峰老师的[文章](http://www.ruanyifeng.com/blog/2013/06/html_email.html)中指出关于*Doctype*的设置，可是依我测试的结果来看，不管怎样邮箱系统都只过滤留下了我`body`中的内容，至于*Doctype*的设置具体应用到何处，不是很明白，可能我理解有问题；
8. 布局尽量使用`table`方式来布局；


### 参考文档
* [HTML Email 编写指南](http://www.ruanyifeng.com/blog/2013/06/html_email.html)
* [编写email邮件的HTML页面原则小结](http://www.jb51.net/web/23842.html)
* [如何制作网页格式的邮件（html）邮件？](https://www.zhihu.com/question/20556280)
* [从头开始构建一个HTML电子邮件模板](https://www.w3cplus.com/css/build-an-html-email-template-from-scratch.html)
* [邮件中嵌入html中要注意的样式](https://www.idaima.com/article/2394)
* [常见的HTML电子邮件错误语法](https://www.benchmarkemail.com/cn/help-FAQ/answer/Common-HTML-Email-Coding-Mistakes)
* [HTML 格式的邮件如何定义 CSS](https://segmentfault.com/q/1010000000115371)
