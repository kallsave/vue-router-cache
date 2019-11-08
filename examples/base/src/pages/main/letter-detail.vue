<template>
  <page>
    <div :class="$style['letter-detail']">
      <div class="wrapper">
        <div class="context" :style="{'background': letterDetail.background}">
          <div class="text">id: {{letterDetail.id}}</div>
          <div class="text">text: {{letterDetail.text}}</div>
        </div>
        <input class="input" v-model="text" placeholder="输入你想修改的text值" />
        <div class="change-btn" @click="updateLetterDetail">修改当前列表元素的text为输入框的值</div>
        <div class="change-btn" @click="deleteLetterDetail">删除并返回</div>
      </div>
      <div class="sticky-footer">
        <div class="btn" @click="back">返回</div>
        <div class="btn" @click="removeCacheBack">销毁列表页的缓存并返回</div>
      </div>
    </div>
  </page>
</template>

<script>
import { getLetterDetail, updateLetterDetail, deleteLetterDetail } from '@/api/list.js'

export default {
  data() {
    return {
      text: '',
      letterDetail: {}
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
      this.letterDetail = getLetterDetail(this.numberId, this.letterId)
      console.log(this.letterDetail)
    },
    updateLetterDetail() {
      if (!this.text) {
        console.log('请填写内容！')
        return
      }
      let isSuccess = updateLetterDetail(this.numberId, this.letterId, this.text)
      if (isSuccess) {
        this.getLetterDetail()
      }
    },
    deleteLetterDetail() {
      let isSuccess = deleteLetterDetail(this.numberId, this.letterId)
      if (isSuccess) {
        // this.$routerKeepHelper.removeUntil({name: 'mainEnter'})
        this.$routerKeepHelper.removeExclude({name: 'mainEnter'})
      }
      this.$router.back()
    },
    back() {
      this.$router.back()
    },
    removeCacheBack() {
      this.$routerKeepHelper.remove({name: 'mainLetterList'})
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
      .change-btn {
        font-size: 16 / @rem;
        color: #fff;
        border-radius: 5 / @rem;
        background: #ff1133;
        margin-bottom: 10 / @rem;
        line-height: 30 / @rem;
        text-align: center;
        padding: 10 / @rem;
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
        padding-left: 22 / @rem;
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
      .btn {
        font-size: 16 / @rem;
        color: #fff;
        border-radius: 5 / @rem;
        background: #41b883;
        margin-bottom: 10 / @rem;
        line-height: 30 / @rem;
        text-align: center;
        padding: 10 / @rem;
      }
    }
  }
}
</style>
