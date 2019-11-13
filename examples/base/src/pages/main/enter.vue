<template>
  <vi-page>
    <div :class="$style['enter']">
      <div class="package">
        <div class="package-icon common-icon-location"></div>
        <div class="package-version">{{`v${version}`}}</div>
      </div>
      <div class="link">
        <a href="javascript:;" class="link-examples" @click="pageTurnConfig">
          <span class="link-icon common-icon-location"></span>
          <span class="link-text">Live Examples</span>
        </a>
        <a href="https://github.com/kallsave/vue-router-cache" class="link-github">
          <span class="link-icon common-icon-github"></span>
          <span class="link-text">Github</span>
        </a>
      </div>
      <div class="version">{{`current vue version ${VueVersion}`}}</div>
      <div class="version">{{`current vue-router version ${VueRouterVersion}`}}</div>
    </div>
  </vi-page>
</template>

<script>
import VuerouterCache from 'vue-router-cache'
import Vue from 'vue'
import VueRouter from 'vue-router'

export default {
  data() {
    return {
      VueVersion: Vue.version,
      VueRouterVersion: VueRouter.version,
      version: VuerouterCache.version,
    }
  },
  methods: {
    pageTurnConfig() {
      this.$router.push({
        name: 'mainConfig',
      })
    },
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.enter {
  box-sizing: border-box;
  height: 100%;
  padding-top: 80 / @rem;
  :global {
    .package {
      text-align: center;
      margin-bottom: 60 / @rem;
      .package-icon {
        font-size: 60 / @rem;
        margin-bottom: 10 / @rem;
      }
      .package-version {
        font-size: 14 / @rem;
        color: #999;
      }
    }
    .link {
      box-sizing: border-box;
      padding-left: 15 / @rem;
      margin-bottom: 15 / @rem;
      border-top: 1 / @rem solid #eee;
      border-bottom: 1 / @rem solid #eee;
      background: #fff;
      a {
        display: flex;
        position: relative;
        line-height: 44 / @rem;
        font-size: 16 / @rem;
        color: #333;
        border-bottom: 1 / @rem solid #eee;
        .link-icon {
          font-size: 26 / @rem;
          margin-right: 10 / @rem;
        }
        &:last-child {
          border-bottom: none;
        }
        &:after {
          position: absolute;
          content: "";
          height: 6 / @rem;
          width: 6 / @rem;
          border-width: 2 / @rem 2 / @rem 0 0;
          border-color: #c8c8cd;
          border-style: solid;
          -webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
          transform: matrix(.71, .71, -.71, .71, 0, 0);
          top: -2 / @rem;
          top: 50%;
          margin-top: -4 / @rem;
          right: 15 / @rem;
        }
      }
    }
    .version {
      font-size: 12 / @rem;
      color: #999;
      text-align: center;
      line-height: 20 / @rem;
    }
  }
}
</style>
