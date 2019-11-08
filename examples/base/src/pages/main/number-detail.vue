<template>
  <page>
    <div :class="$style['number-detail']">
      <div class="wrapper">
        <div class="context" :style="{'background': numberDetail.background}">
          <div class="text">id: {{numberDetail.id}}</div>
          <div class="text">text: {{numberDetail.text}}</div>
          <div class="text" v-if="numberDetail.children">子项长度: {{numberDetail.children.length}}</div>
        </div>
        <input class="input" type="tel" v-model="text" placeholder="输入你想输入的值" />
        <div class="change-btn" @click="updateNumberDetail">修改当前列表元素的text为输入框的值</div>
      </div>
      <div class="sticky-footer">
        <div class="btn" @click="back">返回上一页(back)</div>
        <div class="btn" @click="forward">前进一页(forward)</div>
        <div class="btn" @click="backPage">导航到输入框的值的页数(go)</div>
        <template v-if="isSingleMode">
          <div class="btn" @click="pageTurnNumberList">push(自动更新)到列表页</div>
        </template>
        <template v-else>
          <div class="btn" @click="pageTurnNumberList">push到新的列表页</div>
        </template>
        <div class="btn" @click="replaceNumberList">replace到上一个的列表页</div>
        <div class="btn" @click="pageTurnLetterList">push到子项列表页</div>
      </div>
    </div>
  </page>
</template>

<script>
import { getNumberDetail, updateNumberDetail } from '@/api/list.js'
import config from '@/config'

export default {
  data() {
    return {
      text: '',
      numberDetail: {},
      isSingleMode: config.isSingleMode
    }
  },
  computed: {
    numberId() {
      return this.$route.params.numberId
    }
  },
  mounted() {
    this.getNumberDetail()
  },
  methods: {
    getNumberDetail() {
      this.numberDetail = getNumberDetail(this.numberId)
    },
    updateNumberDetail() {
      if (!this.text) {
        console.log('请填写内容！')
        return
      }
      const isSuccess = updateNumberDetail(this.numberId, this.text)
      if (isSuccess) {
        console.log('修改成功')
        this.getNumberDetail()
      }
    },
    back() {
      this.$routerKeepHelper.remove({name: 'mainNumberList'})
      this.$router.back()
    },
    backPage() {
      let number = this.text | 0
      this.$router.go(number)
    },
    forward() {
      this.$router.forward()
    },
    pageTurnLetterList() {
      this.$router.push({
        name: 'mainLetterList',
        params: {
          numberId: this.numberId
        }
      })
    },
    pageTurnNumberList() {
      this.$router.push({
        name: 'mainNumberList',
      })
    },
    replaceNumberList() {
      if (this.isSingleMode) {
        this.$routerKeepHelper.remove({
          name: 'mainNumberList',
        })
        this.$router.replace({
          name: 'mainNumberList',
        })
      }
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.number-detail {
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
