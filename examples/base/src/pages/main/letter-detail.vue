<template>
  <page>
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
  </page>
</template>

<script>
import { getLetterDetail, updateLetterDetail, deleteLetterDetail } from '@/api/list.js'
import Btn from './components/btn.vue'
import { isSingleMode } from '@/config.js'

export default {
  components: {
    Btn,
  },
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
  mounted() {
    this.getLetterDetail()
  },
  methods: {
    getLetterDetail() {
      getLetterDetail(this.numberId, this.letterId).then((res) => {
        if (res.code === 1) {
          this.letterDetail = res.data
        }
      })
    },
    updateLetterDetail() {
      updateLetterDetail(this.numberId, this.letterId, this.text).then((res) => {
        if (res.code === 1) {
          this.getLetterDetail()
        }
      })
    },
    deleteLetterDetail() {
      let isSuccess = deleteLetterDetail(this.numberId, this.letterId)
      if (isSuccess) {
        // this.$routerCache.removeUntil({name: 'mainEnter'})
        this.$routerCache.removeExclude({name: 'mainEnter'})
      }
      this.$router.back()
    },
    back() {
      this.$router.back()
    },
    removeCacheBack() {
      this.$routerCache.remove({name: 'mainLetterList'})
      this.$router.back()
    },
    pageTurnLetterList() {
      this.$router.push({
        name: 'mainLetterList',
        params: {
          id: this.id
        }
      })
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.letter-detail {
  box-sizing: border-box;
  padding: 30 / @rem 10 / @rem;
  height: 100%;
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
        &::-webkit-input-placeholder {
          color: #999;
        }
        &:-moz-placeholder{
          color: #999;
        }
        &::-moz-placeholder{
          color: #999;
        }
        &:-ms-input-placeholder{
          color: #999;
        }
      }
    }
    .sticky-footer {
      transform: translate(0, -100%);
    }
  }
}
</style>
