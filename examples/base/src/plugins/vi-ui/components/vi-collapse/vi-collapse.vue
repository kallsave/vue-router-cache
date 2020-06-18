<template>
  <div class="vi-collapse">
    <slot name="collapse-header"
      :is-collapse="isCollapse"
      :toggle="toggle">
    </slot>
    <template v-if="isUseTransition">
      <vi-collapse-transition>
        <div ref="collapseContent"
          v-show="!isCollapse">
          <slot name="collapse-content"
            :is-collapse="isCollapse"
            :toggle="toggle">
          </slot>
        </div>
      </vi-collapse-transition>
    </template>
    <template v-else>
      <div ref="collapseContent"
        v-show="!isCollapse">
        <slot name="collapse-content"
          :is-collapse="isCollapse"
          :toggle="toggle">
        </slot>
      </div>
    </template>
    <div v-show="isCollapse">
      <slot name="collapse-skeleton"
        :is-collapse="isCollapse"
        :toggle="toggle">
      </slot>
    </div>
    <slot name="collapse-footer"
      :is-collapse="isCollapse"
      :toggle="toggle">
    </slot>
  </div>
</template>

<script>
import ViCollapseTransition from './vi-collapse-transition.js'
import { prefixStyle } from '../../common/helpers/dom.js'

const TRANSITIONEND = prefixStyle('transitionend')

const COMPONENT_NAME = 'vi-collapse'

const EVENT_TRANSITION_END = 'transition-end'

export default {
  name: COMPONENT_NAME,
  components: {
    ViCollapseTransition
  },
  props: {
    isInitCollapse: {
      type: Boolean,
      default: false
    },
    isUseTransition: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isCollapse: this.isInitCollapse,
    }
  },
  mounted() {
    this._addEventListener()
  },
  methods: {
    _addEventListener() {
      this.$refs.collapseContent && this.$refs.collapseContent.addEventListener(TRANSITIONEND, this.transitionEndCallBack, false)
    },
    _removeEventListener() {
      this.$refs.collapseContent && this.$refs.collapseContent.removeEventListener(TRANSITIONEND, this.transitionEndCallBack, false)
    },
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    transitionEndCallBack() {
      this.$emit(EVENT_TRANSITION_END, this.isCollapse)
    }
  },
  beforeDestroy() {
    this._removeEventListener()
  }
}
</script>
