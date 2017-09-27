# What is Context

今天在学习[styled-components](https://www.styled-components.com/docs/advanced)的`Theming`时，关于`styled-components`对主题的实现与管理上提到，主要应用到了`react`的[context API](https://facebook.github.io/react/docs/context.html)，所以好好研读了一下官方文档，对该API做了如下记录。

## 什么是**Context**

当我们使用`React`时，很容易的通过观察组件的`props`来跟踪组件间的数据流流向，这种跟踪观察方式也让我们很容易的去理解组件。  

而有的时候，我们不想让一个`props`从最外层，通过组件一层一层的传递到**目标组件**上，这时就可以通过`context`来直接实现我们希望的操作。

## 怎样使用**Context**

假设有个如下的结构：

```jsx harmony
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.props.color}}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button color={this.props.color}>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const color = "purple";
    const children = this.props.messages.map((message) =>
      <Message text={message.text} color={color} />
    );
    return <div>{children}</div>;
  }
}
```

上面的例子中，我们把`color`手动的方式传给了`Button`，这期间穿越了`Message`，而对`Message`本身没有什么用。如果用`context`的话，可以直接给到`Button`组件上，如下：

```jsx harmony
const PropTypes = require('prop-types');

class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
};
```

通过给`MessageList`（Context宿主）添加`childContextTypes`和`getChildContext`，可以实现在该组件子结构下的所有组件（e.g. Button）直接通过定义`contextTypes`来获取。  

如果未定义`contextTypes`的话，`context`是一个空对象。

## 可获取**Context**对象的勾子函数

一旦组件定义了`contextTypes`以后，以下的勾子中就会得到一个附加的参数——`context`对象：

* `[constructor(props, context)](https://facebook.github.io/react/docs/react-component.html#constructor)`
* `[componentWillReceiveProps(nextProps, nextContext)](https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops)`
* `[shouldComponentUpdate(nextProps, nextState, nextContext)](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate)`
* `[componentWillUpdate(nextProps, nextState, nextContext)](https://facebook.github.io/react/docs/react-component.html#componentwillupdate)`
* `[componentDidUpdate(prevProps, prevState, prevContext)](https://facebook.github.io/react/docs/react-component.html#componentdidupdate)`

## 无状态组件获取**Context**方法

无状态组件同样可以通过给函数定义`contextTypes`属性的方式，让组件拥有获取`context`的能力，例如：

```jsx harmony
const PropTypes = require('prop-types');

const Button = ({children}, context) =>
  <button style={{background: context.color}}>
    {children}
  </button>;

Button.contextTypes = {color: PropTypes.string};
```

## **Context**的更新

**不要更新Context！**

`React`虽然有提供关于更新`context`的API，但不建议去使用。

如果想用的话，可以看下面的这个例子。
`getChildContext`方法会在`state`或`props`更新时被调用，可以通过局部状态的更新进而来更新`context`。当`context`更新后，所有的子组件都能接到新值。

```jsx harmony
const PropTypes = require('prop-types');

class MediaQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type:'desktop'};
  }

  getChildContext() {
    return {type: this.state.type};
  }

  componentDidMount() {
    const checkMediaQuery = () => {
      const type = window.matchMedia("(min-width: 1025px)").matches ? 'desktop' : 'mobile';
      if (type !== this.state.type) {
        this.setState({type});
      }
    };

    window.addEventListener('resize', checkMediaQuery);
    checkMediaQuery();
  }

  render() {
    return this.props.children;
  }
}

MediaQuery.childContextTypes = {
  type: PropTypes.string
};
```

这里有个问题是，如果宿主组件的`context`更新了，其下使用该`context`的子组件可能因为某个父组件的`shouldComponentUpdate`返回`false`而不做状态更新。这就完全不符合**通过使用`context`来控制组件状态更新**的初衷，所以证明使用`context`来管理组件状态不太靠谱。  
这里有篇[博客](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076)关于介绍如何安全的使用`context`的。


## 不建议使用**Context**

绝大多数的应用程序是不需要使用`context`的。

如果你想要你的应用稳定，就不要使用它，这是一个实验性的API，在未来的版本更新中很有可能会被弃掉。

context最好的使用场景是隐式的传入登录的用户，当前的语言，或者主题信息。要不然所有这些可能就是全局变量，但是context让你限定他们到一个单独的React树里。

如果项目对数据管理较为复杂，推荐使用类似于[redux](http://www.redux.org.cn/)或[mobX](http://cn.mobx.js.org/)这样的状态管理库，而不要使用`context`。
