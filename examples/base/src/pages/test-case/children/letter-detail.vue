<template>
  <vi-page>
    <vi-scroll
      ref="scroll"
      style="color: #999"
      :options="scrollOptions"
      :scrollEvents="scrollEvents"
      @pulling-down="pullingDownHandler">
      <div :class="$style['letter-detail']">
        <div class="wrapper">
          <div class="context" :style="{'background': letterDetail.background}">
            <div class="text">id: {{letterDetail.id}}</div>
            <div class="text">text: {{letterDetail.text}}</div>
          </div>
          <input class="input" v-model="text" placeholder="输入你想修改的text值" />
          <btn style="background: #ff1133;" @click.native="updateLetterDetail">修改当前列表元素的text为输入框的值</btn>
          <btn v-if="isSingleMode" style="background: #ff1133;" @click.native="deleteLetterDetail">删除并返回</btn>
        </div>
        <div class="sticky-footer">
          <btn v-if="isSingleMode" @click.native="back">返回</btn>
          <btn v-if="isSingleMode" @click.native="removeCacheBack">销毁上个列表页的缓存并返回</btn>
          <btn v-if="!isSingleMode" @click.native="pageTurnLetterList">push到新的列表页</btn>
        </div>
      </div>
    </vi-scroll>
  </vi-page>
</template>

<script>
import {
  getLetterDetail,
  updateLetterDetail,
  deleteLetterDetail
} from '@/api/list.js'
import Btn from './components/btn.vue'
import { isSingleMode } from '@/config.js'
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
      letterDetail: {},
      isSingleMode: isSingleMode,
    }
  },
  computed: {
    numberId() {
      return this.$route.params.numberId
    },
    letterId() {
      return this.$route.params.letterId
    }
  },
  methods: {
    pullingDownHandler() {
      this.getLetterDetail()
    },
    getLetterDetail() {
      getLetterDetail(this.numberId, this.letterId).then((res) => {
        if (res.data && res.data.code === 1) {
          this.letterDetail = res.data.data
          this.$refs.scroll.deblocking()
        }
      })
    },
    updateLetterDetail() {
      updateLetterDetail(this.numberId, this.letterId, this.text).then((res) => {
        if (res.data && res.data.code === 1) {
          this.getLetterDetail()
        }
      })
    },
    deleteLetterDetail() {
      deleteLetterDetail(this.numberId, this.letterId).then((res) => {
        if (res.data && res.data.code === 1) {
          this.$routerCache.removeBackUntil({name: 'mainEnter'})
          this.$router.back()
        }
      })
    },
    back() {
      this.$router.back()
    },
    removeCacheBack() {
      this.$routerCache.remove({name: 'testCaseLetterList'})
      this.$router.back()
    },
    pageTurnLetterList() {
      this.$router.push({
        name: 'testCaseLetterList'
      })
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.letter-detail {
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
