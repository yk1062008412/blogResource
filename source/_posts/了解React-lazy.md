---
title: 了解React.lazy()
date: 2019-04-10 10:43:10
categories: "React"
tags:
  - React
  - Javascript
---

React 16.6.0添加了React.lazy()和React.memo()组件

## 背景

React 打包时，如果不进行特殊处理，则会将多个文件打包合并为一个bundle文件，然后引入bundle文件，则整个应用可以一次性加载。

随着应用的增长，bundle文件也随之增长，尤其是在整合了许多第三方库的情况下，单文件体积过大，导致加载时间过长。

## 方案

### react-loadable
在React 16.6.0之前，解决方案是引入第三方库react-loadable，将代码分批打包，使单文件体积变小，而且可以“按需加载”。

但是这样的话，写起来比较麻烦。

```
class MyComponent extends React.Component {
  state = {
    AnotherComponent: null
  };

  componentWillMount() {
    import('./another-component').then(AnotherComponent => {
      this.setState({ AnotherComponent });
    });
  }
  
  render() {
    let {AnotherComponent} = this.state;
    if (!AnotherComponent) {
      return <div>Loading...</div>;
    } else {
      return <AnotherComponent/>;
    };
  }
}
```

### React.lazy()

因此，在React 16.6.0版本，官方添加了React.lazy()组件，使其调用更方便。

```
const OtherComponent = React.lazy(() => import('./OtherComponent'));

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <div>
        <OtherComponent />
      </div>
    )
  };
}
```

## React.lazy使用

React.lazy 接受一个函数，这个函数需要动态调用import()。它必须返回一个Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。

当然了，在调用lazy之前，我们还需要了解一个组件。

### Suspense

Suspense组件可以在应用的组件没有被加载完成时，给用户提示。

该组件可以接受一个fallback函数，作为提示语。

```
<Suspense fallback={<div>Loading...</div>}>
  <section>
    <OtherComponent />
    <AnotherComponent />
  </section>
</Suspense>
```

### 异常捕获Error boundaries

如果因为一些原因(如：网络原因)，导致模块加载失败。则触发异常捕获边界(Error boundaries)来处理异常

```
import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div>
        <MyErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <section>
              <OtherComponent />
              <AnotherComponent />
            </section>
          </Suspense>
        </MyErrorBoundary>
      </div>
    );
  }
}
```

## 代码分割

### 基于组件的代码分割

分割组件，打开控制台的Network,可以发现有一个bundle.js 和 分批打包后的4个chunk.js。

```
import React, { Component, lazy, Suspense } from 'react';

const Header = lazy(() => import('./component/header'));
const Body = lazy(() => import('./component/body'));
const Footer = lazy(() => import('./component/footer'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <>
        <Suspense fallback="loading...">
          <Header />
          <Body />
          <Footer />
        </Suspense>
      </>
    );
  }
}
 
export default App;
```

### 基于路由的代码分割

分割路由，打开控制台的Network,可以发现每点击a标签按钮，都会请求分批打包后对应的分割后的代码。

```
import React, { Component, lazy, Suspense } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';

// import Home from './component/home';
// import News from './component/news';
// import Share from './component/share';
// import About from './component/about';
const Home = lazy(() => import('./component/home'));
const News = lazy(() => import('./component/news'));
const Share = lazy(() => import('./component/share'));
const About = lazy(() => import('./component/about'));

class App extends Component {
  render() {
    return (
      <>
        <section>
          <a href="/#/home">home</a>
          <a href="/#/news">news</a>
          <a href="/#/share">share</a>
          <a href="/#/about">about</a>
        </section>
        <Suspense fallback="loading...">
          <Router>
            <Route path="/" exact component={Home}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/news" component={News}></Route>
            <Route path="/share" component={Share}></Route>
            <Route path="/about" component={About}></Route>
          </Router>
        </Suspense>
      </>
    );
  }
}

export default App;
```

## 命名导出

React.lazy 目前只支持默认导出的组件

```
export default MyDefaultComponent
```

如果想支持使用命名导出的组件模块，则需要创建一个中间模块，封装一下，来进行重新导出。

```
// ManyComponent.js
export const ComponentA = /*....*/;
export const ComponentB = /*....*/;
export const ComponentIWanted = /*....*/;
// MyComponent.js
export { ComponentIWanted as default } from './ManyComponent.js';
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

## React.memo()

在说React.memo()之前，先说一下React.PureComponent。

### React.PureComponent

React.PureComponent 与 React.Component类似，都是用来定义React组件的基类。区别在于React.Component并未实现shouldComponentUpdate()，而React.PureComponent对组件的state和prop实现了浅层对比，所以使用React.PureComponent可以提高性能。

**React.PureComponent仅作对象的浅层对比，如果数据结构比较复杂，则可能产生错误的对比结果**

### React.memo()

React.memo是高阶组件，它和React.PureComponent作用类似，区别在于：React.PureComponent适用于class组件，而React.memo适用于函数组件(函数组件后面的更新会讲到)。

```
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

### 深层对比方案

刚才说了，React.memo()仅作为浅层对比，如果有部分深层次的复杂对象，则需要手动控制对比过程。

```
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

**此方法仅作为性能优化的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。**

本章完！