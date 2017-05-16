# [normalize.css](https://github.com/necolas/normalize.css)学习记录

## 前言

**normalize.css**并不是**reset.css**，而是**reset.css**的一种替代方案，**reset.css**只是将不同浏览器中的默认样式做了统一，而**normalize.css**对所有浏览器中的样式做了一定的优化，同时修改了浏览器的一些bug。在读**normalize.css**源码前，请先读一下『[来，让我们谈一谈 Normalize.css](http://jerryzou.com/posts/aboutNormalizeCss/)』这篇官方解释的译文，有助于你更好的理解什么是**normalize.css**。

## 分析与解释
### 1. Document

#### 源码
```
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in
 *    IE on Windows Phone and in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -ms-text-size-adjust: 100%; /* 2 */
  -webkit-text-size-adjust: 100%; /* 2 */
}
```

#### 解释
##### 1.1 line-height
`line-height`默认为相对于字体1.12倍高，对英文比较友好，在中文状态下就显得有点拥挤，另外`line-height`是具有继承性的，在body中设置了，body下面所有的文字都会继承生效。  
`line-height`一定要用相对值，不要使用绝对值。如下：

```
.test1 {
  line-height: 1.4;
}
.test2 {
  line-height: 1.4em;
}
.test3 {
  line-height: 30px;
}
```

* 情况1： 永远按照文字的1.4倍计算，不管文字的高度如何，可适应任何变化；
* 情况2： 永远按照1.4em计算，随着em的值改变，不管文字高度如何；
* 情况3： 就是30px，绝对的。

##### 1.2 text-size-adjust
[text-size-adjust](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-size-adjust) 属性 允许我们控制将文本溢出算法应用到一些手机设备上。这个属性还没有写进标准，使用时必须加上前缀：-moz-text-size-adjust，-webkit-text-size-adjust,，和 -ms-text-size-adjust。  
主要应用于解决手机横屏时默认会放大文字的问题。将`text-size-adjust`设置成`100%`关闭字体大小自动调整功能。  
参考文档：[text-size-adjust: 100% 有什么作用？](https://segmentfault.com/q/1010000002513103)

//continue

## 参考：

* [github normalize.css](https://github.com/necolas/normalize.css)
* [来，让我们谈一谈 Normalize.css](http://jerryzou.com/posts/aboutNormalizeCss/)
* [MDN-CSS-text-size-adjust](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-size-adjust)
* [text-size-adjust: 100% 有什么作用？](https://segmentfault.com/q/1010000002513103)
* [css知多少（4）——解读浏览器默认样式](http://www.cnblogs.com/wangfupeng1988/p/4280801.html)