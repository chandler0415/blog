### 前因

今天在学习mdn上的[Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=control)时，看到Polyfill部分有一段代码为：

```
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
```

疑问为什么不直接用 `undefined` 而使用 `void 0`，在执行时结果都是返回 `undefined`。

### 解释
#### 原因1
事实上`void`返回值都是`undefined`，在ES5之前，在`window`下的`undefined`是可以被重写的，于是导致在某些极端情况下使用`undefined`会出现错误。
非严格模式下，`undefined`是可以被重写的，严格模式下不能重写。

>注：在ES5之后的标准中，规定了全局变量下的`undefined`值为只读，不可以改写，但局部变量中的依然可以对之进行改写。

```
undefined = 1;
console.log(!!undefined); // true
console.log(!!void(0)); // false
```

所以`void 0`是为了防止`undefined`被重写而出现判断不准确的情况。

#### 原因2
`void 0`比`undefined`省略了3个字节。