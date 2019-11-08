/*!
 * vue-router-cache.js v0.0.1
 * (c) 2019-2019 kallsave
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueRouterKeep = factory());
}(this, (function () { 'use strict';

  var config = {
    max: Infinity,
    actionKey: 'action'
  };

  function error(text) {
    console.warn("%cerror: ".concat(text), 'color: red');
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Stack =
  /*#__PURE__*/
  function () {
    function Stack() {
      var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;

      _classCallCheck(this, Stack);

      this.max = max;
      this.init();
    }

    _createClass(Stack, [{
      key: "init",
      value: function init() {
        this.list = [];
      }
    }, {
      key: "_add",
      value: function _add(item) {
        var index = this.list.indexOf(item);

        if (index !== -1) {
          this.list.splice(index, 1);
        }

        this.list.unshift(item);

        if (this.list.length > this.max) {
          this.list.pop();
        }
      }
    }, {
      key: "add",
      value: function add() {
        for (var i = 0; i < arguments.length; i++) {
          var item = arguments[i];

          this._add(item);
        }
      }
    }, {
      key: "reduce",
      value: function reduce() {
        if (!this.list.length) {
          return false;
        }

        return this.list.shift();
      }
    }, {
      key: "replace",
      value: function replace(item) {
        var result = this.reduce();

        if (!result) {
          return false;
        }

        this._add(item);
      }
    }, {
      key: "removeFrom",
      value: function removeFrom(item) {
        var index = this.list.indexOf(item);

        if (index !== -1) {
          return this.list.splice(index);
        }

        return false;
      }
    }, {
      key: "remove",
      value: function remove(item) {
        var index = this.list.indexOf(item);

        if (index === -1) {
          return false;
        }

        return this.list.splice(index, 1);
      }
    }, {
      key: "removeByIndex",
      value: function removeByIndex(index) {
        if (this.list[index]) {
          return this.list.splice(index, 1);
        }
      }
    }, {
      key: "removeAll",
      value: function removeAll() {
        return this.list.splice(0);
      }
    }, {
      key: "removeExclude",
      value: function removeExclude() {
        for (var i = 0; i < this.list.length; i++) {
          var item = this.list[i];

          if (Array.prototype.indexOf.call(arguments, item) === -1) {
            this.list.splice(i, 1);
            i--;
          }
        }
      }
    }, {
      key: "backTo",
      value: function backTo(item) {
        var index = this.list.indexOf(item);

        if (index === -1) {
          return false;
        }

        return this.list.splice(0, index);
      }
    }, {
      key: "backToByIndex",
      value: function backToByIndex(index) {
        if (index > this.list.length - 1) {
          return this.list.splice(0);
        }

        return this.list.splice(0, index);
      }
    }, {
      key: "getHeader",
      value: function getHeader() {
        return this.list[0];
      }
    }, {
      key: "getByIndex",
      value: function getByIndex(index) {
        return this.list[index];
      }
    }, {
      key: "getFooter",
      value: function getFooter() {
        return this.list[this.list.length - 1];
      }
    }, {
      key: "getSize",
      value: function getSize() {
        return this.list.length;
      }
    }, {
      key: "getStore",
      value: function getStore() {
        return this.list;
      }
    }, {
      key: "getMax",
      value: function getMax() {
        return this.max;
      }
    }, {
      key: "has",
      value: function has(item) {
        return this.list.indexOf(item) !== -1;
      }
    }, {
      key: "updateSize",
      value: function updateSize(max) {
        this.max = max;
      }
    }, {
      key: "checkFull",
      value: function checkFull() {
        return this.max <= this.list.length;
      }
    }]);

    return Stack;
  }();

  function defineReactive(data, key, val, fn) {
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        return val;
      },
      set: function set(newVal) {
        if (newVal === val) {
          return;
        }

        val = newVal;
        typeof fn === 'function' && fn(newVal);
      }
    });
  }

  var globalStack = new Stack(config.max);
  var globalCache = [];
  defineReactive(config, 'max', config.max, function (newVal) {
    globalStack.updateSize(newVal);
  });

  var routerKeepHelper = {
    remove: function remove(key) {
      for (var i = 0; i < globalCache.length; i++) {
        var globalCacheItem = globalCache[i];
        var stack = globalCacheItem.stack;
        var cache = globalCacheItem.cache;

        if (cache[key]) {
          cache[key].componentInstance.$destroy();
          cache[key] = null;
          globalStack.remove(key);
        }
      }
    },
    removeAll: function removeAll() {
      for (var i = 0; i < globalCache.length; i++) {
        var globalCacheItem = globalCache[i];
        var stack = globalCacheItem.stack;
        var cache = globalCacheItem.cache;

        for (var key in cache) {
          cache[key].componentInstance.$destroy();
          cache[key] = null;
        }
      }

      globalStack.removeAll();
    },
    getStore: function getStore() {
      return {
        cache: globalCache,
        stack: globalStack.getStore()
      };
    }
  };

  var Events =
  /*#__PURE__*/
  function () {
    function Events() {
      _classCallCheck(this, Events);

      this.map = {};
    }

    _createClass(Events, [{
      key: "on",
      value: function on(name, fn) {
        if (this.map[name]) {
          this.map[name].push(fn);
          return;
        }

        this.map[name] = [fn];
      }
    }, {
      key: "emit",
      value: function emit(name) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (this.map[name]) {
          this.map[name].forEach(function (fn) {
            fn.apply(void 0, args);
          });
        }
      }
    }]);

    return Events;
  }();

  var historyStack = new Stack();

  var EVENT_HISTORY_ACTION_BACK = 'back';
  var EVENT_HISTORY_ACTION_FORWARD = 'forward';

  var historyStateEvent = new Events();
  window.addEventListener('hashchange', function () {
    if (historyStack.getByIndex(1) === window.location.href) {
      historyStateEvent.emit(EVENT_HISTORY_ACTION_BACK);
    } else {
      historyStateEvent.emit(EVENT_HISTORY_ACTION_FORWARD);
    }
  });

  function isDef(v) {
    return v !== undefined && v !== null;
  }

  function isAsyncPlaceholder(node) {
    return node.isComment && node.asyncFactory;
  }

  function getFirstComponentChild(children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];

        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c;
        }
      }
    }
  }

  var COMPONENT_NAME = 'router-cache';
  var Component = {
    name: COMPONENT_NAME,
    "abstract": true,
    created: function created() {
      this.cache = Object.create(null);
      globalCache.push({
        cache: this.cache
      });
    },
    render: function render(h) {
      var slot = this.$slots["default"];
      var vnode = getFirstComponentChild(slot);
      console.log(globalStack.getMax());

      if (vnode) {
        var key = this.$route.name;

        if (this.cache[key]) {
          vnode.componentInstance = this.cache[key].componentInstance;
        } else {
          if (!globalStack.checkFull()) {
            console.log('node');
            this.cache[key] = vnode;
          } else {
            console.log('full');
            var lastKey = globalStack.getFooter();
            routerKeepHelper.remove(lastKey);
            this.cache[key] = vnode;
          }
        }

        globalStack.add(key);
        vnode.data.keepAlive = true;
      }

      return vnode || slot && slot[0];
    },
    mounted: function mounted() {
      this.historyStateBackHandler();
    },
    methods: {
      historyStateBackHandler: function historyStateBackHandler() {
        var _this = this;

        historyStateEvent.on(EVENT_HISTORY_ACTION_BACK, function () {
          _this.remove(globalStack.getByIndex(0));
        });
      },
      remove: function remove(key) {
        this.removeCacheItem(key);
        this.removeStackItem(key);
      },
      removeCacheItem: function removeCacheItem(key) {
        if (this.cache[key]) {
          this.cache[key].componentInstance.$destroy();
          this.cache[key] = null;
        }
      },
      removeStackItem: function removeStackItem(key) {
        globalStack.remove(key);
      }
    },
    beforeDestroy: function beforeDestroy() {
      for (var key in this.cache) {
        this.remove(key);
      }

      var index;

      for (var i = 0; i < globalCache.length; i++) {
        if (this.cache === globalCache[i]) {
          index = i;
          break;
        }
      }

      globalCache.splice(index, 1);
    }
  };

  var isBack = false;
  historyStateEvent.on(EVENT_HISTORY_ACTION_BACK, function () {
    historyStack.reduce();
    isBack = true;
  });

  var routerMiddle = function routerMiddle(Vue, config) {
    var router = config.router;
    var actionKey = config.actionKey;
    router.beforeEach(function (to, from, next) {
      // let hashchange I/0 event trigger callback before next
      window.setTimeout(function () {
        if (isBack) {
          to.params[actionKey] = EVENT_HISTORY_ACTION_BACK;
        } else {
          to.params[actionKey] = EVENT_HISTORY_ACTION_FORWARD;
        }

        isBack = false;
        next();
      }, 0);
    });
    Vue.util.defineReactive(router.history, 'current', router.history.current, function () {
      Vue.nextTick(function () {
        historyStack.add(window.location.href);
      });
    });
  };

  var isInstalled = false;

  function install(Vue, options) {
    if (!options.router) {
      error('router');
      return;
    }

    if (isInstalled) {
      return;
    }

    isInstalled = true;
    Object.assign(config, options);
    Vue.prototype.$routerKeepHelper = routerKeepHelper;
    Vue.component(Component.name, Component);
    routerMiddle(Vue, config);
  }

  var VueRouterKeep = {
    install: install
  };

  return VueRouterKeep;

})));
