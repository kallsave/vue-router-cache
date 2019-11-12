<template>
  <div ref="wrapper"
    class="vi-scroll-wrapper">
    <div ref="content"
      class="vi-scroll-content">
      <slot></slot>
      <div class="vi-scroll-pull-up"
        v-if="pullUpLoad && isOpenPullUpLoad && data.length">
        <slot name="pull-up"
          :pull-up-load="pullUpLoad"
          :pull-up-state="pullUpState"
          :pull-up-state-list="pullUpStateList">
            <div class="vi-scroll-pull-up-normal"
              v-show="pullUpState === pullUpStateList[0]">{{pullUpLoad.txt.more}}</div>
            <div class="vi-scroll-pull-up-lock"
              v-show="pullUpState === pullUpStateList[1]">
              <vi-loading :scale="0.8"></vi-loading>
            </div>
            <div class="vi-scroll-pull-up-no-more"
              v-show="pullUpState === pullUpStateList[2]">{{pullUpLoad.txt.noMore}}</div>
        </slot>
      </div>
    </div>
    <div ref="pullDown"
      class="vi-scroll-pull-down"
      v-if="pullDownRefresh"
      :style="{'top': `${pullDownTop}px`}">
      <slot name="pull-down"
        :pull-down-refresh="pullDownRefresh"
        :pull-down-state="pullDownState"
        :pull-down-state-list="pullDownStateList"
        :pull-down-cross-threshold="pullDownCrossThreshold"
        :pull-down-scroll-y="pullDownScrollY"
        :pull-down-pull-down-stop="pullDownStop">
          <div class="vi-scroll-pull-down-normal"
            :style="{'line-height': `${pullDownStop}px`}"
            v-show="pullDownState === pullDownStateList[0]">
            <span class="vi-scroll-pull-down-icon" :class="{rotate: pullDownCrossThreshold > 0}">↓</span>
            <span class="vi-scroll-pull-pull-down-tip">{{pullDownCrossThreshold > 0 ? '释放更新': '下拉刷新'}}</span>
          </div>
          <div class="vi-scroll-pull-down-lock"
            v-show="pullDownState === pullDownStateList[1]">
            <vi-loading :scale="0.8"></vi-loading>
          </div>
          <transition name="pull-down-finish">
            <div class="vi-scroll-pull-down-finish"
              :style="{'line-height': `${pullDownStop}px`}"
              v-show="pullDownState === pullDownStateList[2]">{{pullDownRefresh.txt}}</div>
          </transition>
      </slot>
    </div>
  </div>
</template>

<script>
import ViLoading from '../vi-loading/vi-loading'
import BScroll from 'better-scroll'
import {
  camelize,
  multiDeepClone
} from '../../common/helpers/utils.js'

import {
  getRect,
  prefixStyle,
  addClass
} from '../../common/helpers/dom.js'

import {
  EASE_OUT_QUART,
} from '../../common/helpers/ease.js'

const TRANSFORM = prefixStyle('transform')
const TRANSITION = prefixStyle('transition')
const TRANSITION_PROPERTY = prefixStyle('transitionProperty')
const TRANSITION_DURATION = prefixStyle('transitionDuration')
const TRANSITION_TIMING_FUNCTION = prefixStyle('transitionTimingFunction')

const COMPONENT_NAME = 'vi-scroll'

const EVENT_SCROLL = 'scroll'
const EVENT_BEFORE_SCROLL_START = 'before-scroll-start'
const EVENT_SCROLL_END = 'scroll-end'
const EVENT_PULLING_DOWN = 'pulling-down'
const EVENT_PULLING_UP = 'pulling-up'

const SCROLL_EVENTS = [
  EVENT_SCROLL,
  EVENT_BEFORE_SCROLL_START,
  EVENT_SCROLL_END
]

const DEFAULT_OPTIONS = {
  scrollX: false,
  scrollY: true,
  observeDOM: false,
  // 多层嵌套会触发多次,所以需要click的场景自主添加
  click: false,
  probeType: 1,
  scrollbar: false,
  pullDownRefresh: false,
  pullUpLoad: false,
  directionLockThreshold: 1,
  // 不用transition而是requestAnimationFrame帧滚动,这样不会出现白屏
  useTransition: false
  // 会阻止原生的其他事件的事件冒泡,开启需要巨大的代价
  // 配置class有better-scroll的元素不会阻止,在最子代的元素添加class
  // preventDefaultException: {
  //   className: /^(.+\s)?better-scroll(\s.+)?$/
  // }
}

// 开启pullDownRefresh的默认配置
const PULL_DOWN_REFRESH_DEFAULT_OPTIONS = {
  // 阀值
  threshold: 80,
  // 滞留的位置
  stop: 56,
  txt: '更新成功',
  // 更新到数据,调用finishPullDown的延迟时间,
  // 会影响到txt的显示持续时间
  stopTime: 1000
}

// 开启pullUpLoad的默认配置
const PULL_UP_LOAD_DEFAULT_OPTIONS = {
  // 距离底部threshold时触发卡死状态
  threshold: 0,
  txt: {
    more: '下拉加载更多',
    noMore: '没有更多啦'
  },
  size: 10
}

const PULL_DOWN_STATE_LIST = [
  'normal',
  'locking',
  'finish',
]

const PULL_UP_STATE_LIST = [
  'normal',
  'locking',
  'noMore',
]

export default {
  name: COMPONENT_NAME,
  components: {
    ViLoading
  },
  provide() {
    return {
      ViScroll: this
    }
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    scrollEvents: {
      type: Array,
      default() {
        return []
      },
      validator(arr) {
        return arr.every((item) => {
          return SCROLL_EVENTS.indexOf(item) !== -1
        })
      }
    },
    data: {
      type: [Array],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      pullDownCrossThreshold: 0,
      pullDownScrollY: 0,
      pullDownTop: 0,
      pullDownState: PULL_DOWN_STATE_LIST[0],
      pullDownStateList: PULL_DOWN_STATE_LIST,
      pullUpState: PULL_UP_STATE_LIST[0],
      pullUpStateList: PULL_UP_STATE_LIST,
      isOpenPullUpLoad: false
    }
  },
  computed: {
    pullDownRefresh() {
      if (this.options.pullDownRefresh === true) {
        return multiDeepClone({}, PULL_DOWN_REFRESH_DEFAULT_OPTIONS)
      } else if (!this.options.pullDownRefresh) {
        return false
      } else {
        return multiDeepClone({}, PULL_DOWN_REFRESH_DEFAULT_OPTIONS, this.options.pullDownRefresh)
      }
    },
    pullDownThreshold() {
      if (this.pullDownRefresh) {
        return this.pullDownRefresh.threshold
      }
      return 0
    },
    pullDownStop() {
      if (this.pullDownRefresh) {
        return this.pullDownRefresh.stop
      }
      return 0
    },
    pullUpLoad() {
      if (this.options.pullUpLoad === true) {
        return multiDeepClone({}, PULL_UP_LOAD_DEFAULT_OPTIONS)
      } else if (!this.options.pullUpLoad) {
        return false
      } else {
        return multiDeepClone({}, PULL_UP_LOAD_DEFAULT_OPTIONS, this.options.pullUpLoad)
      }
    },
  },
  watch: {
    data: {
      handler(newVal) {
        this.$nextTick(() => {
          this.deblocking()
        })
      },
    },
    isOpenPullUpLoad: {
      handler() {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    },
    pullUpState: {
      handler() {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    }
  },
  mounted() {
    this._initScroll()
  },
  methods: {
    _initScroll() {
      let extraOptions = {}
      if (this.pullDownRefresh) {
        extraOptions.pullDownRefresh = this.pullDownRefresh
      }
      if (this.pullUpLoad) {
        extraOptions.pullUpLoad = this.pullUpLoad
      }
      let options = multiDeepClone({}, DEFAULT_OPTIONS, extraOptions, this.options)
      if (options.scrollX && !options.scrollY) {
        addClass(this.$refs.content, 'vi-scroll-x')
      }
      this.scroll = new BScroll(this.$refs.wrapper, options)
      if (this.pullDownRefresh) {
        this._calculatelPullDownContentHeight()
        this._onPullDownRefreshEvent()
      }
      // 如果开启了上拉加载
      if (this.pullUpLoad) {
        this._onPullUpLoadEvent()
      }
      this._listenScrollEvents()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    _listenScrollEvents() {
      const finalScrollEvents = this.scrollEvents.slice()
      finalScrollEvents.forEach((event) => {
        this.scroll.on(camelize(event), (...args) => {
          this.$emit(event, ...args)
        })
      })
    },
    // 计算pull-down-content的高度,并且初始化它的top
    _calculatelPullDownContentHeight() {
      const pullDownContent = this.$refs.pullDown
      this.pullDownHeight = getRect(pullDownContent).height
      this.pullDownContentStyle = pullDownContent.style
      // this.pullDownContentStyle['height'] = `${this.pullDownHeight}`
      this.pullDownContentStyle[TRANSITION_PROPERTY] = 'top'
      this.pullDownContentStyle[TRANSITION_TIMING_FUNCTION] = EASE_OUT_QUART
      this.pullDownTop = -this.pullDownHeight
    },
    _onPullDownRefreshEvent() {
      if (this.isOpenPullDownRefresh) {
        return
      }
      this.isOpenPullDownRefresh = true
      this.scroll.on('pullingDown', this._pullDownLockingHandler)
      this.scroll.on('scroll', this._pullDownScrollHandler)
    },
    _offPullDownRefreshEvent() {
      if (!this.isOpenPullDownRefresh) {
        return
      }
      this.isOpenPullDownRefresh = false
      this.scroll.off('pullingDown', this._pullDownLockingHandler)
      this.scroll.off('scroll', this._pullDownScrollHandler)
    },
    // 达到阀值只会一瞬间触发
    _pullDownLockingHandler() {
      // 达到了阀值,松手后会处于卡死状态
      this.pullDownState = PULL_DOWN_STATE_LIST[1]
      this.$emit(EVENT_PULLING_DOWN)
    },
    // 下拉超过阀值时会一直卡在stop高度的位置
    _pullDownScrollHandler(pos) {
      this.pullDownScrollY = pos.y
      if (this.pullDownState === PULL_DOWN_STATE_LIST[0]) {
        this.pullDownContentStyle[TRANSITION_DURATION] = '0ms'
        this.pullDownCrossThreshold = Math.max(0, this.pullDownScrollY - this.pullDownHeight)
        this.pullDownTop = Math.min(this.pullDownScrollY - this.pullDownHeight, 0)
      } else if (this.pullDownState === PULL_DOWN_STATE_LIST[1]) {
        if (this.pullDownState === PULL_DOWN_STATE_LIST[1] && this.stopY === this.pullDownScrollY) {
          return
        }
        this.pullDownContentStyle[TRANSITION_DURATION] = '0ms'
        this.stopY = this.pullDownScrollY
        this.pullDownCrossThreshold = 0
        this.pullDownTop = Math.min(this.stopY - this.pullDownHeight, 0)
      }
    },
    // 如果data没更新,就要在外部手动触发deblocking恢复原来状态的方法
    deblocking({
      isClosePullDownRefresh = false,
      isClosePullUpLoad = false,
      isPullUpNoMore = false
    } = {}) {
      if (this.pullDownRefresh && this.pullDownState === PULL_DOWN_STATE_LIST[1]) {
        this._finishPullDown(() => {
          this._normalPullDown(isClosePullDownRefresh)
        })
      } else if (this.pullUpLoad && this.pullUpState === PULL_UP_STATE_LIST[1]) {
        this.isPullUpNoMore = isPullUpNoMore
        if (this.isPullUpNoMore) {
          this.pullUpState = PULL_UP_STATE_LIST[2]
        } else {
          this.pullUpState = PULL_UP_STATE_LIST[0]
        }
        this.scroll.finishPullUp()
        if (isClosePullUpLoad) {
          this.closePullUpLoad()
        }
        this.$nextTick(() => {
          this.refresh()
        })
      } else {
        this.refresh()
      }
    },
    forceSetPullUpState(state) {
      if (PULL_UP_STATE_LIST.index(state) !== -1) {
        this.pullUpState = state
      }
    },
    // 数据已经更新,stopTime后回弹finishPullDown
    _finishPullDown(next) {
      this.pullDownState = PULL_DOWN_STATE_LIST[2]
      this._finishPullDownTimer = window.setTimeout(() => {
        this.pullDownContentStyle[TRANSITION_DURATION] = `${this.scroll.options.bounceTime}ms`
        this.pullDownTop = -this.pullDownHeight
        this.scroll.finishPullDown()
        next()
      }, this.pullDownRefresh.stopTime)
    },
    // 在finishPullDown回弹后,复原原始状态
    _normalPullDown(isClosePullDownRefresh) {
      // this.scroll.options.bounceTime(默认800ms)是finishPullDown恢复到原点的时间
      this._normalPullDownTimer = window.setTimeout(() => {
        this.pullDownState = PULL_DOWN_STATE_LIST[0]
        if (isClosePullDownRefresh) {
          this.closePullDown()
        }
        this.$nextTick(() => {
          this.refresh()
        })
      }, this.scroll.options.bounceTime)
    },
    // 手动开启pullDownRefresh
    openPullDownRefresh() {
      this.scroll.openPullDown(this.pullDownRefresh)
      this._onPullDownRefreshEvent()
    },
    // 手动关闭pullDownRefresh
    closePullDownRefresh() {
      this.scroll.closePullDown()
      this._offPullDownRefreshEvent()
    },
    // 自动触发pullDownRefresh
    autoPullDownRefresh() {
      if (!this.isOpenPullDownRefresh) {
        return
      }
      this.scroll.autoPullDownRefresh()
    },
    _onPullUpLoadEvent() {
      if (this.isOpenPullUpLoad) {
        return
      }
      this.isOpenPullUpLoad = true
      this.scroll.on('pullingUp', this._pullUpLockingHandler)
    },
    _offPullUpLoadEvent() {
      if (!this.isOpenPullUpLoad) {
        return
      }
      this.isOpenPullUpLoad = false
      this.scroll.off('pullingUp', this._pullUpLockingHandler)
    },
    _pullUpLockingHandler() {
      // 处于上拉状态
      this.pullUpState = PULL_UP_STATE_LIST[1]
      this.$emit(EVENT_PULLING_UP)
    },
    // 手动开启pullUpLoad
    openPullUpLoad() {
      this.scroll.openPullUp(this.pullUpLoad)
      this._onPullUpLoadEvent()
    },
    // 手动关闭pullUpLoad
    closePullUpLoad() {
      this.scroll.closePullUp()
      this._offPullUpLoadEvent()
    },
    _destroy() {
      this.scroll && this.scroll.destroy()
      this.scroll = null
      this._clearTimer()
    },
    _clearTimer() {
      window.clearTimeout(this._finishPullDownTimer)
      this._finishPullDownTimer = null
      window.clearTimeout(this._normalPullDownTimer)
      this._normalPullDownTimer = null
    }
  },
  beforeDestroy() {
    this._destroy()
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/var/font-size.styl"

.vi-scroll-wrapper
  position: relative
  height: 100%
  overflow: hidden
  font-size: $font-size-medium
  z-index: 0
  line-height: 0
  vertical-align: text-top
  .vi-scroll-content
    &.vi-scroll-x
      display: inline-block
    .vi-scroll-pull-up
      text-align: center
      .vi-scroll-pull-up-normal
        box-sizing: content-box
        height: 40px
        line-height: 40px
        padding: 5px 0
      .vi-scroll-pull-up-lock
        box-sizing: content-box
        padding: 5px 0
      .vi-scroll-pull-up-no-more
        box-sizing: content-box
        width: 100%
        text-align: center
        height: 40px
        line-height: 40px
        padding: 5px 0
  .vi-scroll-pull-down
    text-align: center
    position: absolute
    left: 0
    right: 0
    top: 0
    z-index: -1
    .vi-scroll-pull-down-normal
      box-sizing: content-box
      margin: 0 auto
      .vi-scroll-pull-down-icon
        display: inline-block
        transition: all 0.3s
        vertical-align: middle
        margin-right: 10px
        &.rotate
          transform: rotate(180deg)
      .vi-scroll-pull-down-tip
        display: inline-block
        font-size: 12px
        vertical-align: middle
    .vi-scroll-pull-down-lock
      box-sizing: content-box
      width: 100%
      padding: 8px 0
    .vi-scroll-pull-down-finish
      box-sizing: content-box
      background-color: #d6eaf8
      margin: 0 auto
      &.pull-down-finish-enter
        width: 20%
      &.pull-down-finish-enter-active
        transition: width .5s
      &.pull-down-finish-enter-to
        width: 100%
      &.pull-down-finish-leave
        opacity: 0
</style>
