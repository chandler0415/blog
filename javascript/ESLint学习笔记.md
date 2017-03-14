### 前言
[ELint](http://eslint.cn/)主要是js语法的检查工具。主要配置规则为：

|规则|配置值|
|---|---|
|关闭|off/0|
|警告|warn/0|
|错误|error/0|

文件中也可单独对某一判断规则做特殊处理，在文件头添加：

```
/* eslint no-console: 1 */
// 或
/* eslint no-console: "warn" */
```

我对ESLint的理解，这些规则都是对发生错误后的总结，应对的一些方案总结。学好ESLint的规则，也是能帮助我们写出更具有有规范性的代码，避免了很多错误的发生。以下是对学习的一些记录内容。

### 规则
#### [no-shadow](http://eslint.cn/docs/rules/no-shadow)
禁止变量声明覆盖外层作用域的变量

```
// bad
const a = 3;
const b = () => {
	const a = 4;
};
```

#### [no-param-reassign](http://eslint.cn/docs/rules/no-param-reassign)
禁止对函数参数再赋值

```
// bad
const foo = num => {
	num = 33;
};
const foo = num => {
	++num;
};

// good
const foo = num => {
	var newNum = num;
};
```

#### [guard-for-in](http://eslint.cn/docs/rules/guard-for-in)
需要约束 `for-in` ，在使用 `for-in` 遍历对象时，会把从原型链继承来的属性也包括进来，这样会导致意想不到的项出来。   
注意，在某些情况下，对 `foo.hasOwnProperty(key)` 做简单的检测可能会导致错误出现；查看[no-prototype-builtins](http://eslint.cn/docs/rules/no-prototype-builtins)。  
此规则目的在于，阻止在 `for in` 遍历过程中，由于不对结果进行筛选而导致意想不到的行为发生。因此，当 `for in` 循环没有使用 `if` 语句对结果进行筛选时，该规则将会发出警告。

```
// bad
for (key in foo) {
    doSomething(key);
}

// good
for (key in foo) {
    if ({}.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}
```

这里推荐使用 [ramda(v0.23.0)](http://ramdajs.com/docs/#forEachObjIndexed)的 `forEachObjIndexed` 方法。

#### [radix](http://eslint.cn/docs/rules/radix)
当使用 `parseInt()` 函数时，默认情况下，该函数会自动检测十进制和十六进制（通过**0x**前缀）。在ECMAScript5之前，`parseInt()` 也自动检测八进制文本，这会出现问题。  
为了避免这种混乱，建议使用该函数时，强制加上基数。

```

// bad
var num = parseInt("071");  // 57
// good
var num = parseInt("071", 10);  // 71
```

#### [no-case-declarations](http://eslint.cn/docs/rules/no-case-declarations)
该规则禁止词法声明 (`let`、`const`、`function` 和 `class`) 出现在 `case`或`default` 子句中。原因是，词法声明在整个 `switch` 语句块中是可见的，但是它只有在运行到它定义的 `case` 语句时，才会进行初始化操作。  
为了保证词法声明语句只在当前 `case` 语句中有效，将你子句包裹在块中。

```
// bad
switch (foo) {
    case 1:
        let x = 1;
        break;
    case 2:
        const y = 2;
        break;
    case 3:
        function f() {}
        break;
    default:
        class C {}
}

// good
switch (foo) {
    case 1: {
        let x = 1;
        break;
    }
    case 2: {
        const y = 2;
        break;
    }
    case 3: {
        function f() {}
        break;
    }
    default: {
        class C {}
    }
}
```