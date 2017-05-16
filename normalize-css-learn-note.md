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
[text-size-adjust](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-size-adjust) 属性 允许我们控制将文本溢出算法应用到一些手机设备上。这个属性还没有写进标准，使用时必须加上前缀：-moz-text-size-adjust，-webkit-text-size-adjust，和 -ms-text-size-adjust。  
主要应用于解决手机横屏时默认会放大文字的问题。将`text-size-adjust`设置成`100%`关闭字体大小自动调整功能。  
参考文档：[text-size-adjust: 100% 有什么作用？](https://segmentfault.com/q/1010000002513103)

### 2. Sections

#### 源码

```
/**
 * Remove the margin in all browsers (opinionated).
 */

body {
  margin: 0;
}

/**
 * Add the correct display in IE 9-.
 */

article,
aside,
footer,
header,
nav,
section {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
```

#### 解释
##### 2.1 margin: 0
相当于**reset.css**，个人感觉还是需要使用**reset.css**来重置更多部分的样式，比如`ul`的`list-style`等。

##### 2.2 display
修复了IE9中的一些bug。后续还有很多，不再解释。

##### 2.3 2em
统一标准

### 3. Grouping content

#### 源码

```
/**
 * Add the correct display in IE 9-.
 * 1. Add the correct display in IE.
 */

figcaption,
figure,
main { /* 1 */
  display: block;
}

/**
 * Add the correct margin in IE 8.
 */

figure {
  margin: 1em 40px;
}

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

```

### 4. Text-level semantics

#### 源码
```
/**
 * 1. Remove the gray background on active links in IE 10.
 * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.
 */

a {
  background-color: transparent; /* 1 */
  -webkit-text-decoration-skip: objects; /* 2 */
}

/**
 * 1. Remove the bottom border in Chrome 57- and Firefox 39-.
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Prevent the duplicate application of `bolder` by the next rule in Safari 6.
 */

b,
strong {
  font-weight: inherit;
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font style in Android 4.3-.
 */

dfn {
  font-style: italic;
}

/**
 * Add the correct background and color in IE 9-.
 */

mark {
  background-color: #ff0;
  color: #000;
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}
```

#### 解释
##### 4.1 text-decoration-skip

[text-decoration-skip](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip)功能为**检索或设置对象中的文本闭包线条必须略过内容中的哪些部分。参考文档：[CSS参考手册：text-decoration-skip](http://www.css88.com/book/css/properties/text-decoration/text-decoration-skip.htm)。  
`object`意为*略过原子内联元素（例如图片或内联块）*。
注：此属性未明白，亲测chrome(58.0.3029.110)对`-webkit-text-decoration-skip`的属性均提示无效，对`text-decoration-skip`的属性仅支持`objects`，且未看到什么不同。**normalize.css**中解释说移除iOS8+和Safari8+中链接空白处下划线，未有测试环境。  

##### 4.2 font-weight: bolder

* `bold`: 定义粗体字符;
* `bolder`: 定义更粗的字符。

**normalize.css**中先对`b`和`strong`的`font-weight`设置了`inherit`，然后又设置为`bolder`。其解释为：*防止Safari 6中下一个规则重复应用“bolder”*，`bolder`属性在Safari6中会叠加吗？。

### 5. Forms

#### 源码
```
/**
 * 1. Change the font styles in all browsers (opinionated).
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: sans-serif; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`
 *    controls in Android 4.
 * 2. Correct the inability to style clickable types in iOS and Safari.
 */

button,
html [type="button"], /* 1 */
[type="reset"],
[type="submit"] {
  -webkit-appearance: button; /* 2 */
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * 1. Add the correct display in IE 9-.
 * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  display: inline-block; /* 1 */
  vertical-align: baseline; /* 2 */
}

/**
 * Remove the default vertical scrollbar in IE.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10-.
 * 2. Remove the padding in IE 10-.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}
```

### 6. Interactive

#### 源码
```
/*
 * Add the correct display in IE 9-.
 * 1. Add the correct display in Edge, IE, and Firefox.
 */

details, /* 1 */
menu {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}
```

### 7. Scripting

#### 源码
```
/**
 * Add the correct display in IE 9-.
 */

canvas {
  display: inline-block;
}

/**
 * Add the correct display in IE.
 */

template {
  display: none;
}
```

### 8. Hidden

#### 源码
```
/**
 * Add the correct display in IE 10-.
 */

[hidden] {
  display: none;
}
```

## 参考：

* [github normalize.css](https://github.com/necolas/normalize.css)
* [来，让我们谈一谈 Normalize.css](http://jerryzou.com/posts/aboutNormalizeCss/)
* [MDN-CSS-text-size-adjust](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-size-adjust)
* [text-size-adjust: 100% 有什么作用？](https://segmentfault.com/q/1010000002513103)
* [css知多少（4）——解读浏览器默认样式](http://www.cnblogs.com/wangfupeng1988/p/4280801.html)