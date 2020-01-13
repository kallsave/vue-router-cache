vue-router-cache
========================================

一个实现原生app前进刷新后退缓存并提供浏览器路由方向、灵活手动管理缓存api的vue-router插件

特性
------------

- 提供浏览器路由方向(forward、back、replace)
- 在知道路由是forward、back、replace的基础上,浏览器进入新页面缓存新页面,浏览器触发后退(back)时自动删除离开页面缓存,从而实现前进刷新后退缓存
- 提供管理缓存的api方法,这些方法的参数和vue-router的push方法的参数一致,这样做保证了代码的可读性
- 对累积的页面缓存可能导致的内存泄漏做了保护机制,提供max参数,当页面缓存达到max,会自动把最后方的页面缓存删除
- 支持嵌套路由 (嵌套路由请在最里层的router-view包裹router-cache,外层的router-view不要包裹router-cache)

在线案例
------------
- [Base demo](https://kallsave.github.io/vue-router-cache/examples/base/dist/#/main/enter)
- [Demo address](https://github.com/kallsave/vue-router-cache/tree/master/examples/base)

安装
------------
npm install vue-router-cache --save

初始化的配置
-----------
```javascript
import router from './router'
import VueRouterCache from 'vue-router-cache'

Vue.use(VueRouterCache, {
  router: router,
  max: 10,
  isSingleMode: true,
  isDebugger: true,
  directionKey: 'direction',
  getHistoryStack() {
    const str = window.sessionStorage.getItem('historyStack')
    return JSON.parse(str)
  },
  setHistoryStack(history) {
    const str = JSON.stringify(history)
    window.sessionStorage.setItem('historyStack', str)
  }
})
```

```javascript
<template>
  <div class="app">
    <transition
      :name="transitionName"
      :mode="mode"
      :duration="transitionDuration">
      <router-cache>
        <router-view></router-view>
      </router-cache>
    </transition>
  </div>
</template>
```

浏览器路由方向
-----------
```javascript

// 判断浏览器路由方向对相应的方向做过渡动画
watch: {
  $route: {
    handler(to, from) {
      this.transitionDuration = TRANSITION_DURATION
      if (to.params.direction === 'back') {
        this.transitionName = 'move-left'
        this.mode = ''
      } else if (to.params.direction === 'forward') {
        this.transitionName = 'move-right'
        this.mode = ''
      } else {
        // replace
        this.transitionName = ''
        this.mode = ''
      }
    },
  }
}
```

清除页面缓存方法使用例子
-----------
```javascript
// 在vue组件实例中清除缓存

// 从详情页修改了数据需要回退到列表页时手动删除列表页的缓存让列表页刷新的例子

export default {
  methods: {
    // 用back的方式,推荐
    back() {
      // remove的参数是location,和this.$router.push的参数是一样的
      this.$routerCache.remove({name: 'mainNumberList'})

      // or
      // this.$routerCache.remove('/main/number-list')

      // or
      // this.$routerCache.remove({
      //   path: '/main/number-list'
      // })
      
      this.$router.back()
    },
    // 用push的方式,但是浏览器会比使用back的方式多出额外的历史记录
    push() {
      // 直接使用push
      this.$router.push({name: 'mainNumberList'})
    },
    // 用replace的方式
    replace() {
      // 直接使用replace
      this.$router.replace({name: 'mainNumberList'})
    }
  }
}
```

```javascript
// 在js文件中清除缓存
import { routerCache } from 'vue-router-cache'

routerCache.remove({name: 'mainNumberList'})
```

配置说明
-----------
|arg name|type|description|default|necessary|
|:--:|:--:|:----------|:--:|:--:|
|参数名称|参数类型|描述|默认值|必需|
|router|router|vue-router的实例||是|
|max|Number Int|缓存的最大数量,如果超过这个数量,会自动删除最后方的缓存|Infinity|否|
|isSingleMode|Boolean|是否是单例模式|true|否|
|isDebugger|Boolean|开始debugger模式,可以看到系统存在的页面缓存和使用中的页面缓存|false|否|
|directionKey|String|挂载在$route.params[directionKey]上的key名|'direction'|否|
|getHistoryStack|Function|判断浏览器路由方向时,如果需要刷新后仍能有效判断,用于做本地储存|noop|否|
|setHistoryStack|Function|判断浏览器路由方向时,如果需要刷新后仍能有效判断,用于做本地储存|noop|否|


方法说明
-----------
|method name|arg|description|can use in when isSingleMode is false|
|:--:|:--:|:----------|:--:|
|方法名称|参数|描述|多例模式下是否可以使用|
|remove|location|删除参数页面的缓存|否|
|removeBackUntil|location|删除当前页面直到参数页面的缓存(不包括参数页面)|否|
|removeBackInclue|location|删除当前页面一直到参数页面的缓存(包括参数页面)|否|
|removeBackByIndex|number|删除从当前页面开始第n个页面的缓存|可以用但是没必要|
|removeExclude|location|删除除了参数页面以外的所有页面的缓存|否|
|removeAll||删除所有页面的缓存|是|
|getStore||查看系统中的页面缓存|是|
|has|location|查看系统中的页面缓存是否有参数页面|否|

单例模式和多例模式对比
-----------
- 单例模式是指系统中一个路由对应的组件(缓存实例)只存在一个,比如A=>B=>C=>A,系统中只会存在3个缓存实例,所以路由和缓存实例(key)是一一对应的。
- 多例模式是指系统中一个路由对应的组件(缓存实例)可以存在多个,比如A=>B=>C=>A,系统中会存在4个缓存实例,所以路由和缓存实例(key)是一对多的关系。
- 多例模式系统性能存在浪费,多例模式可以说是简单模式,如果A要回跳C页面需要C页面刷新,只能push到C页面,多例模式能做的事情单例模式都能实现。
- 单例模式系统的性能高,有灵活的手动清除缓存的api,如果A要回跳C页面需要C页面刷新,可以调用api清除C页面缓存然后back到C页面(推荐)。也可以直接push到C页面(但是这样浏览器会比执行back多存历史记录)

这个插件开发是需要关闭webpack热更新
-----------
在开发环境使用这个插件保存代码会出现白屏,这是因为webpack热更新会分析改动代码来决定哪个模块热更新还是重刷,
这需要写webpack的相关loader,一个简单的做法是关闭webpack热更新只使用webpack重刷就正常使用啦
```javascript
// in webpack.dev.conf.js

devServer: {
  ...
  hot: false,
  ...
},

```
更多介绍
------------
[原理解析](https://juejin.im/post/5dccdb4a51882510ce752164)