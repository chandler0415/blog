css的核心是：多组合，少继承，在我们用css-reset还原所有浏览器存在的默认样式之后，接下来需要把公用样式提炼出来，我个人觉得，公用样式分两种：

	1. 开发公用样式表；
	2. 项目属性样式表。

前者是所有项目通用的，后者是专对某个项目特有属性的，比如说按钮样式，颜色等。

常用样式，主要在：**模块浮动**，**字体（颜色/大小/样式）**，**边距（内/外）**等几方面。现分类如下：

#### 字体

```
/* -------font------- */
.ellipsis {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.fb {
	font-weight: 700;
}
.tc {
	text-align: center;
}
.hide {
	display: none!important;
}
```

#### 颜色

```
/* --------color------- */
.c3 {
	color: #333;
}
.c6 {
	color: #666;
}
.c9 {
	color: #999;
}
```

#### 浮动

```
/* ------float------ */
.clearfix {
	clear: both;
	*zoom: 1;
	overflow: hidden;
}
.clearfix::before,
.clearfix::after {
	content: "";
	display: table;
}
.clearfix::after {
	clear: both;
}
.fl {
	float: left;
}
.fr {
	float: right;
}
```

#### 外边距

```
/* --------margin-------- */
.m5 {
	margin: 5px;
}
.m10 {
	margin: 10px;
}
.m15 {
	margin: 15px;
}
.m20 {
	margin: 20px;
}
.mt5 {
	margin-top: 5px;
}
.mt10 {
	margin-top: 10px;
}
.mt15 {
	margin-top: 15px;
}
.mt20 {
	margin-top: 20px;
}
.mr5 {
	margin-right: 5px;
}
.mr10 {
	margin-right: 10px;
}
.mr15 {
	margin-right: 15px;
}
.mr20 {
	margin-right: 20px;
}
.mb5 {
	margin-bottom: 5px;
}
.mb10 {
	margin-bottom: 10px;
}
.mb15 {
	margin-bottom: 15px;
}
.mb20 {
	margin-bottom: 20px;
}
.ml5 {
	margin-left: 5px;
}
.ml10 {
	margin-left: 10px;
}
.ml15 {
	margin-left: 15px;
}
.ml20 {
	margin-left: 20px;
}
```

#### 内填充

```
/* -------padding--------- */
.p5 {
	padding: 5px;
}
.p10 {
	padding: 10px;
}
.p15 {
	padding: 15px;
}
.p20 {
	padding: 20px;
}
.pt5 {
	padding-top: 5px;
}
.pt10 {
	padding-top: 10px;
}
.pt15 {
	padding-top: 15px;
}
.pt20 {
	padding-top: 20px;
}
.pr5 {
	padding-right: 5px;
}
.pr10 {
	padding-right: 10px;
}
.pr15 {
	padding-right: 15px;
}
.pr20 {
	padding-right: 20px;
}
.pb5 {
	padding-bottom: 5px;
}
.pb10 {
	padding-bottom: 10px;
}
.pb15 {
	padding-bottom: 15px;
}
.pb20 {
	padding-bottom: 20px;
}
.pl5 {
	padding-left: 5px;
}
.pl10 {
	padding-left: 10px;
}
.pl15 {
	padding-left: 15px;
}
.pl20 {
	padding-left: 20px;
}
```