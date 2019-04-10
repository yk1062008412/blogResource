---
title: 了解React.hook
date: 2019-04-10 10:47:54
categories: "React"
tags:
  - React
  - Javascript
---

React 16.8新增了Hook特性。本章将讲述Hook的基本用法

## 简介

React Hook 可以使用户在不用class的情况下，使用React函数，function来进行开发。

本次更新的最大优点是：

**No Breaking Changes**: 无破坏性改动。也就是说使用Hook并不会破坏React原本的生态。

## 背景

Hook的优势

- 使组件之间的状态逻辑可以更方便地复用。例如：如果没有使用store等状态管理框架，那么父子组件之间的状态传递会变得很复杂，如果子组件嵌套层数较多，则会使状态传递变得非常难以维护。
- 使复杂组件变得容易理解。使用Hook可以将 componentDidMount, componentDidUpdate, componentWillUnmount三者合并为一个方法，并且不需要关心代码逻辑问题。
- 简化Class，减少开发者在开发过程中，经常遇到this指向问题。

## State Hook

State Hook中，我们应该知道一个方法: useState(). 该方法返回了两个参数，并且定义了state的初始值。

### useState()

第一个count值是初始状态，第二个值是更新count值的函数,可以理解为this.setState()。

```
import React, { useState } from 'react';

const HookState = (props) => {
  // useState 返回两个值。 第一个值是当前状态，第二个值是更新当前状态的函数
  const [count, changeCount] = useState(0);

  return (
    <>
      <h2>hookState Page</h2>
      <div>You clicked this Button {count} times.</div>
      <button onClick={()=> {changeCount(count + 1)}}>Click Me to Add!</button>
      <button onClick={()=> {changeCount(count - 1)}}>Click Me to Sub!</button>
    </>
  )
}

export default HookState;
```

### 对比 Class

```
import React, { Component } from 'react';

class HookState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    this.changeCount = this.changeCount.bind(this)
  }

  //改变count的值
  changeCount(value){
    this.setState({
      count: value
    })
  }

  render() {
    const {count} = this.state;
    return (
      <>
        <h2>hookState Page</h2>
        <div>You clicked this Button {count} times.</div>
        <button onClick={()=> {this.changeCount(count + 1)}}>Click Me to Add!</button>
        <button onClick={()=> {this.changeCount(count - 1)}}>Click Me to Sub!</button>
      </>
    );
  }
}
 
export default HookState;
```

对比发现，使用Hook后的代码会非常简洁，而且可读性很高。

### 使用

useState()可以多次使用,当然了，要避免重复命名的情况。

```
import React, { useState } from 'react';

const HookState = (props) => {
  // useState 返回两个值。 第一个值是当前状态，第二个值是更新当前状态的函数
  const [count, changeCount] = useState(0);
  const [name, changeName] = useState('Bob');
  const [age, changeAge] = useState(18);

  return (
    <>
      <h2>hookState Page</h2>
    </>
  )
}

export default HookState;
```


## Effect Hook

Effect Hook中，我们应该知道一个方法: useEffect().上面的useState代表的是组件的状态，useEffect代表行为。

### useEffect

先来看一个全参数的effect方法。

```
import React, { useState, useEffect } from 'react';

const HookEffect = (props) => {

  const [count, setCount] = useState(0);
  const [name, setName] = useState('name');

  // 类似于 componentDidMount, componentDidUpdate 和 componentWillUnmount 三个的合并
  useEffect(()=>{
    // operate
    document.title = `${count} Times Clicked`;
    console.log("load");
    return () => {
      console.log('used');
    }
  },[count])

  return (
    <>
      <h2>hookEffect Page</h2>
      <div>You clicked this Button {count} times.</div>
      <div>{name}</div>
      <button onClick={()=> {setCount(count + 1)}}>Click Me!</button>
    </>
  )
}

export default HookEffect;
```

### 参数说明

调用方式稍微有点绕，但是也比较容易理解。

```
// 组件的每次更新都会调用这个方法
useEffect(()=>{
  // 组件第一次加载会调用，之后在count有更新的情况下，都会调用这个方法。
  console.log("load");
  return () => {
    // 组件第一次加载不会调用，之后在count有更新的情况下，在上面的console.log("load")之前调用。可以理解为，卸载之前的执行状态，再执行下一次。该方法可以省略不写，代表每次执行useEffect前，不需要有卸载操作。
    console.log('used');
  }
  // count 表示useEffect方法的执行条件，如果count有更新才会执行内部的方法，否则不会调用。该参数可以省略不写，如果省略不写，则每次组件的更新都会执行useEffect方法。
},[count])
```

### 对比Class来理解

#### componentDidMount

下面我们用useEffect()来实现componentDidMount

```
import React, { useState, useEffect } from 'react';

const HookEffect = (props) => {
    
  // useEffect第二个参数传值为空数组，则表示组件第一次加载的时候只触发一次，之后不再触发该useEffect()方法
  useEffect(()=>{
    console.log('componentDidMount!');
  }, []);

  return (
    <h2>hookEffect Page</h2>
  )
}

export default HookEffect;
```

#### componentDidUpdate

严格来说，useEffect似乎是摒弃了React生命周期的概念，变成了创建订阅和取消订阅的模式，每一次dom的更新都会触发满足第二个参数条件的useEffect方法。

```
useEffect(()=>{
  console.log('componentDidUpdate');
})
```

#### componentWillUnmount

这样理解可能不是太确切，return更像是取消订阅的一种方式，而不完全是componentDidUpdate和componentWillUnmount的集合，因为每次更新dom前，都会先触发return操作。

```
useEffect(()=>{
  console.log('componentDidUpdate');
  return ()=>{
    console.log('componentWillUnmount');
  }
})
```

## Hook使用规则

**只在最顶层使用Hook**

不要将Hook嵌套在条件语句或循环语句中。确保二次渲染的时候，State或Effect具有第一次渲染后保留的初始值，否则会出现bug或未知问题。

**只在React函数中调用Hook**

普通的js函数无法使用Hook

## 其他

常用的Hook就是 useState 和 useEffect 两种，官方还推出了 useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue 这几种Hook，几乎不太常用，所以暂时可以不关注。

本章完！
