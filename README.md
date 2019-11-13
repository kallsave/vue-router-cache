vue-router-cache
========================================

一个实现原生app前进刷新后退缓存并提供浏览器路由方向、灵活手动管理缓存api的vue-router插件

Features
------------

vue-router-cache做了几件事

- 提供浏览器路由方向(forward、back、replace)
- 在知道路由是forward、back、replace的基础上,浏览器进入新页面缓存新页面,浏览器触发后退(back)时自动删除离开页面缓存,从而实现前进刷新后退缓存
- 封装了管理缓存的api方法,这些方法的参数和vue-router的push方法的参数一致,这样做保证了代码的可读性
- 对累积的页面缓存可能导致的内存泄漏做了保护,提供max参数,当页面缓存达到max,会自动把最后方的页面缓存删除

Installation
------------
npm install vue-router-cache --save

Options for Usage
-----------
```javascript
import router from './router'
import VueRouterCache from 'vue-router-cache'

Vue.use(VueRouterCache, {
  // vue-router
  router: router,
  // 缓存的最大数量,如果超过这个数量,会自动删除最后方的缓存
  max: 10,
  // 开启单例模式,推荐单例模式
  isSingleMode: true,
  // 开启debugger,可以看到当前缓存页面的key
  isDebugger: true,
  // 可以自定义的路由方向的key,挂载在$route.params.direction上
  directionKey: 'direction',
  // 判断浏览器路由方向时,如果需要刷新后仍能有效判断,需要做本地储存
  // 开发者用getHistoryStack和setHistoryStack实现本地储存,推荐首选sessionStorage
  getHistoryStack() {
    const str = window.sessionStorage.getItem('historyStack')
    return JSON.parse(str)
  },
  // 判断浏览器路由方向时,如果需要刷新后仍能有效判断,需要做本地储存
  // 开发者用getHistoryStack和setHistoryStack实现本地储存,推荐首选sessionStorage
  setHistoryStack(history) {
    const str = JSON.stringify(history)
    window.sessionStorage.setItem('historyStack', str)
  }
})

```
routerCache下的api方法使用例子
-----------
```javascript
// routerCache api in vue
export default {
  methods: {
    // 从详情页修改了数据需要回退到列表页时手动删除列表页的缓存
    // 从而让列表页刷新的例子
    back() {
      // remove的参数是location,和this.$router.push的参数一样
      this.$routerCache.remove({name: 'mainNumberList'})
      // or
      // this.$routerCache.remove('/main/number-list')
      // or
      // this.$routerCache.remove({
      //   path: '/main/number-list'
      // })
      this.$roter.back()
    }
  }
}
```

```javascript
// routerCache api in js
import { routerCache } from 'vue-router-cache'

routerCache.remove({name: 'mainNumberList'})
```

|method name|arg|description|can use in when isSingleMode is false
|:--:|:--:|:----------|:--:|
|方法名称|参数|描述|多例模式下是否可以使用
|remove|location|删除参数页面的缓存|否
|removeUntil|location|删除当前页面直到参数页面的缓存(不包括参数页面)|否
|removeExclude|location|删除除了参数页面以外的所有页面的缓存|否
|removeBackByIndex|number|删除从当前页面开始第n个页面的缓存|是
|removeBackInclue|location|删除当前页面一直到参数页面的缓存(包括参数页面)|否
|removeAll||删除所有页面的缓存|是
|getStore||查看系统中的页面缓存|是
|has|location|查看系统中的页面缓存是否有参数页面|否

Demos (案例)
------------
[base demo](https://kallsave.github.io/vue-router-cache/examples/base/dist/#/main/enter)

More instruction (更多介绍)
------------