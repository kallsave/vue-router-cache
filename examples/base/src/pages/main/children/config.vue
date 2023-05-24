<template>
  <vi-page>
    <div :class="$style['config']">
      <div class="wrapper">
        <div class="mode">
          <span class="mode-placeholder">使用单例模式</span>
          <vi-switch
            v-model="isSingleMode"
            @change="change"
          ></vi-switch>
        </div>
        <div class="instruction">
          <div class="group">
            单例模式是指系统中一个路由对应的组件(缓存实例)只存在一个,
            比如A=>B=>C=>A,系统中只会存在3个缓存实例,
            所以路由和缓存实例(key)是一一对应的。
          </div>
          <div class="group">
            多例模式是指系统中一个路由对应的组件(缓存实例)可以存在多个,
            比如A=>B=>C=>A,系统中会存在4个缓存实例,
            所以路由和缓存实例(key)是一对多的关系。
          </div>
          <div class="group">
            多例模式系统性能存在浪费,
            多例模式可以说是简单模式,
            如果A要回跳C页面需要C页面刷新,只能push到C页面,
            多例模式能做的事情单例模式都能实现。
          </div>
          <div class="group">
            单例模式系统的性能高,
            有灵活的手动清除缓存的api,
            如果A要回跳C页面需要C页面刷新,
            可以调用api清除C页面缓存然后back到C页面(推荐)。
            也可以直接push到C页面(但是这样浏览器会比执行back多存历史记录)
          </div>
        </div>
      </div>
      <div class="sticky-footer">
        <btn @click.native="pageTurnNumberList">{{mode}}尝试</btn>
      </div>
    </div>
  </vi-page>
</template>

<script>
import tpLocalStorage from '@/store/cache/local-storage/index.js'
import { isSingleMode } from '@/config.js'
import Btn from '@/components/btn.vue'

export default {
  components: {
    Btn,
  },
  data() {
    return {
      isSingleMode: isSingleMode
    }
  },
  computed: {
    mode() {
      return this.isSingleMode ? '单例模式' : '多例模式'
    }
  },
  methods: {
    pageTurnNumberList() {
      this.$router.push({
        name: 'testCaseNumberList',
      })
    },
    change(value) {
      tpLocalStorage.set('isSingleMode', value)
      window.location.reload()
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.config {
  box-sizing: border-box;
  height: 100%;
  padding: 10 / @rem;
  :global {
    .wrapper {
      box-sizing: border-box;
      height: 100%;
      .mode {
        font-size: 24 / @rem;
        color: #41b883;
        text-align: right;
        margin-bottom: 20 / @rem;
        line-height: 30 / @rem;
        .mode-placeholder {
          font-size: 16 / @rem;
          vertical-align: middle;
        }
      }
      .instruction {
        font-size: 16 / @rem;
        color: #41b883;
        line-height: 20 / @rem;
        .group {
          margin-bottom: 15 / @rem;
        }
      }
    }
    .sticky-footer {
      transform: translate(0, -100%);
    }
  }
}
</style>
