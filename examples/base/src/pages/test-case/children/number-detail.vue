<template>
  <vi-page>
    <vi-scroll
      ref="scroll"
      style="color: #999"
      :options="scrollOptions"
      :scrollEvents="scrollEvents"
      @pulling-down="pullingDownHandler">
      <div :class="$style['number-detail']">
        <div class="wrapper">
          <div class="context" :style="{'background': numberDetail.background}">
            <div class="text">id: {{numberDetail.id}}</div>
            <div class="text">text: {{numberDetail.text}}</div>
            <div class="text" v-if="numberDetail.children">子项长度: {{numberDetail.children.length}}</div>
          </div>
          <input class="input" type="tel" v-model="text" placeholder="输入你想输入的值" />
          <btn style="background: #ff1133;" @click.native="updateNumberDetail">修改当前列表元素的text为输入框的值</btn>
        </div>
        <div class="sticky-footer">
          <btn @click.native="back">返回上一页(back)</btn>
          <btn @click.native="forward">前进一页(forward)</btn>
          <btn @click.native="go">导航到输入框的值的页数(go)</btn>
          <btn @click.native="pageTurnNumberList">自动更新并跳转到上一个列表页(push)</btn>
          <btn @click.native="replaceNumberList">自动更新并替换到上一个的列表页(replace)</btn>
          <btn @click.native="pageTurnLetterList">跳转到子项列表页(push)</btn>
        </div>
      </div>
    </vi-scroll>
  </vi-page>
</template>

<script>
import { getNumberDetail, updateNumberDetail } from '@/api/list.js'
import { isSingleMode } from '@/config.js'
import Btn from './components/btn.vue'
import scrollMixins from './mixins/scroll.js'

export default {
  components: {
    Btn,
  },
  mixins: [
    scrollMixins,
  ],
  data() {
    return {
      text: '',
      numberDetail: {},
      isSingleMode: isSingleMode,
    }
  },
  computed: {
    numberId() {
      return this.$route.params.numberId
    }
  },
  methods: {
    pullingDownHandler() {
      this.getNumberDetail()
    },
    getNumberDetail() {
      getNumberDetail(this.numberId).then((res) => {
        if (res.data && res.data.code === 1) {
          this.numberDetail = res.data.data
          this.$refs.scroll.deblocking()
        }
      })
    },
    updateNumberDetail() {
      updateNumberDetail(this.numberId, this.text).then((res) => {
        if (res.data && res.data.code === 1) {
          this.getNumberDetail()
        }
      })
    },
    back() {
      if (isSingleMode) {
        this.$global.confirm.show({
          title: '要手动删除上个页面缓存吗',
          text: `执行this.$routerCache.remove('/test-case/number-list')`,
          confirmText: '确定',
          cancelText: '不需要',
          onConfirm: () => {
            this.$routerCache.remove('/test-case/number-list')
            // or
            // this.$routerCache.remove({name: 'testCaseNumberList'})
            // or
            // this.$routerCache.remove({
            //   path: '/test-case/number-list'
            // })
            this.$router.back()
          },
          onCancel: () => {
            this.$router.back()
          }
        })
      }
    },
    go() {
      const number = this.text | 0
      this.$router.go(number)
    },
    forward() {
      this.$router.forward()
    },
    pageTurnLetterList() {
      this.$router.push({
        name: 'testCaseLetterList',
        params: {
          numberId: this.numberId
        }
      })
    },
    pageTurnNumberList() {
      this.$router.push({
        name: 'testCaseNumberList',
      })
    },
    replaceNumberList() {
      this.$router.replace({
        name: 'testCaseNumberList'
      })
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.number-detail {
  box-sizing: border-box;
  height: 100%;
  padding: 10 / @rem;
  :global {
    .wrapper {
      height: 100%;
      .context {
        box-sizing: border-box;
        margin-bottom: 10 / @rem;
        height: 120 / @rem;
        border-radius: 6 / @rem;
        text-align: center;
        padding: 10 / @rem 0;
        .text {
          font-size: 20 / @rem;
          line-height: 30 / @rem;
          color: #fff;
        }
      }
      .input {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        width: 100%;
        height: 40 / @rem;
        color: #333;
        border: 1 / @rem solid #ccc;
        border-radius: 6 / @rem;
        margin-bottom: 20 / @rem;
        padding-left: 10 / @rem;
      }
    }
    .sticky-footer {
      padding-bottom: 20 / @rem;
    }
  }
}
</style>
