---
title: js常用方法
date: 2019-04-10 10:52:56
categories: "Javascript"
tags: 
  - Javascript
---

本章介绍常用的js方法，方便使用。

## 获取当前URL参数值

```
/**
 * 获取当前URL参数值
 * @param {name}    参数名称
 * @return    参数值
 */
export function getUrlParam(name) {
    const currentUrl = window.location.href;
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = currentUrl.substring(currentUrl.indexOf('?') + 1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return '';
}
```

## 深拷贝

```
/**
 * 深拷贝
 * @param {需要拷贝的Object对象} obj
 */
export function deepClone(obj){
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = deepClone(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
```

## 去除字符串前后空格

```
/**
 * 去除字符串前后空格
 * @param {需要去除前后空格的字符串} str 
 */
export function trimStr(str){
    if(str == null || str == '') return str;
    str+='';
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
```

## 字符格式检测

```
/**
 * 字符串格式检测
 * @param {*待检测的字符串} str 
 * @param {*检测的类型} type
 */
export function formatCheck(str, type){
    if(str == null || str === ''){
        return true;
    }
    let numberPattern = /^-?\d*\.?\d+$/,
        emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        mobilePattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
        urlPattern = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        intPattern = /^-?\d+$/,          // 整数
        result = false;
    switch(type){
        case 'number': result = numberPattern.test(str); break;
        case 'email': result = emailPattern.test(str); break;
        case 'mobile': result = mobilePattern.test(str); break;
        case 'url': result = urlPattern.test(str); break;
        case 'int': result = intPattern.test(str); break;
    }
    return result;
}
```

## 格式化日期时间

```
/**
 * 格式化日期时间为: yyyy-MM-dd hh:mm:ss格式
 * @param {需要格式化的日期时间} date 
 * @param {需要的格式} fmt 
 */
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss'){
    var o = {   
        "M+" : date.getMonth()+1,                 //月份   
        "d+" : date.getDate(),                    //日   
        "h+" : date.getHours(),                   //小时   
        "m+" : date.getMinutes(),                 //分   
        "s+" : date.getSeconds(),                 //秒   
        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
        "S"  : date.getMilliseconds()             //毫秒   
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt))   {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
```

## 格式化时间

```
/**
 * 格式化时间为：hh:mm:ss格式
 * @param {需要格式化的时间} time 
 */
export function formatTime(time){
    if(!time) return;
    var timeArr = time.split(':'),
    hour = timeArr[0].length < 2 ? '0' + timeArr[0] : timeArr[0],
    minute = timeArr[1].length < 2 ? '0' + timeArr[1] : timeArr[1],
    second = timeArr[2].length < 2 ? '0' + timeArr[2] : timeArr[2];
    return hour + ':' + minute + ':' + second;
}
```

未完待续...