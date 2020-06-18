// 路由过渡动画的名字、模式、过渡时间

const types = {
  SET_ROUTER_TRANSITION_NAME: 'SET_ROUTER_TRANSITION_NAME',
  SET_ROUTER_TRANSITION_MODE: 'SET_ROUTER_TRANSITION_MODE',
  SET_ROUTER_TRANSITION_DURATION: 'SET_ROUTER_TRANSITION_DURATION',
}

const DEFAULT_ROUTER_TRANSITION = {
  routerTransitionName: '',
  routerTransitionMode: '',
  routerTransitionDuration: {},
}

const routerTransition = {
  state: {
    ...DEFAULT_ROUTER_TRANSITION,
  },
  getters: {
    routerTransitionName: (state) => state.routerTransitionName,
    routerTransitionMode: (state) => state.routerTransitionMode,
    routerTransitionDuration: (state) => state.routerTransitionDuration,
  },
  mutations: {
    [types.SET_ROUTER_TRANSITION_NAME](state, routerTransitionName) {
      state.routerTransitionName = routerTransitionName
    },
    [types.SET_ROUTER_TRANSITION_MODE](state, routerTransitionMode) {
      state.routerTransitionMode = routerTransitionMode
    },
    [types.SET_ROUTER_TRANSITION_DURATION](state, routerTransitionDuration) {
      state.routerTransitionDuration = routerTransitionDuration
    },
  },
  actions: {
    setRouterTransition({ commit }, { routerTransitionName, routerTransitionMode, routerTransitionDuration }) {
      console.log(routerTransitionName)
      routerTransitionName && commit(types.SET_ROUTER_TRANSITION_NAME, routerTransitionName)
      routerTransitionMode && commit(types.SET_ROUTER_TRANSITION_MODE, routerTransitionMode)
      routerTransitionDuration && commit(types.SET_ROUTER_TRANSITION_DURATION, routerTransitionDuration)
    },
    clearRouterTransition({ commit }) {
      const {
        routerTransitionName,
        routerTransitionMode,
        routerTransitionDuration
      } = DEFAULT_ROUTER_TRANSITION
      commit(types.SET_ROUTER_TRANSITION_NAME, routerTransitionName)
      commit(types.SET_ROUTER_TRANSITION_MODE, routerTransitionMode)
      commit(types.SET_ROUTER_TRANSITION_DURATION, routerTransitionDuration)
    }
  }
}

export default routerTransition
