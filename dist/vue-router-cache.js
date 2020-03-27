/*!
 * vue-router-cache.js v0.3.3
 * (c) 2019-2020 kallsave
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueRouterCache = factory());
}(this, (function () { 'use strict';

  var noop = function noop() {};

  var config = {
    max: Infinity,
    directionKey: 'direction',
    isSingleMode: true,
    isDebugger: false,
    getHistoryStack: noop,
    setHistoryStack: noop
  };

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
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
      key: "_unshift",
      value: function _unshift(item) {
        this.list.unshift(item);

        if (this.list.length > this.max) {
          return this.list.pop();
        }

        return null;
      }
    }, {
      key: "unshift",
      value: function unshift() {
        var removeList = [];

        for (var i = 0; i < arguments.length; i++) {
          var item = arguments[i];

          var removeItem = this._unshift(item);

          if (removeItem) {
            removeList.push(removeItem);
          }
        }

        return removeList;
      }
    }, {
      key: "shift",
      value: function shift() {
        if (this.list.length) {
          return this.list.shift();
        }

        return null;
      }
    }, {
      key: "_remove",
      value: function _remove(item) {
        var index = this.list.indexOf(item);

        if (index !== -1) {
          return this.list.splice(index, 1)[0];
        }

        return null;
      }
    }, {
      key: "remove",
      value: function remove() {
        var removeList = [];

        for (var i = 0; i < arguments.length; i++) {
          var item = arguments[i];

          var removeItem = this._remove(item);

          if (removeItem) {
            removeList.push(removeItem);
          }
        }

        return removeList;
      }
    }, {
      key: "removeByIndex",
      value: function removeByIndex(index) {
        if (this.list[index]) {
          return this.list.splice(index, 1)[0];
        }

        return null;
      }
    }, {
      key: "removeBackUntil",
      value: function removeBackUntil(item) {
        var index = this.list.indexOf(item);

        if (index !== -1) {
          return this.list.splice(0, index);
        }

        return this.list.splice(0);
      }
    }, {
      key: "removeBackInclue",
      value: function removeBackInclue(item) {
        var index = this.list.indexOf(item);

        if (index !== -1) {
          return this.list.splice(0, index + 1);
        }

        return this.list.splice(0);
      }
    }, {
      key: "removeBackByIndex",
      value: function removeBackByIndex(index) {
        if (index <= this.list.length - 1) {
          return this.list.splice(0, index);
        }

        return this.list.splice(0);
      }
    }, {
      key: "removeExclude",
      value: function removeExclude() {
        var removeList = [];

        for (var i = 0; i < this.list.length; i++) {
          var item = this.list[i];

          if (Array.prototype.indexOf.call(arguments, item) === -1) {
            var remove = this.list.splice(i, 1)[0];
            Array.prototype.push.call(removeList, remove);
            i--;
          }
        }

        return removeList;
      }
    }, {
      key: "removeAll",
      value: function removeAll() {
        return this.list.splice(0);
      }
    }, {
      key: "replace",
      value: function replace(item) {
        var removeItem = this.shift();

        if (removeItem) {
          this._unshift(item);

          return removeItem;
        }

        return null;
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
        return this.max === this.list.length;
      }
    }]);

    return Stack;
  }();
  var MapStack =
  /*#__PURE__*/
  function (_Stack) {
    _inherits(MapStack, _Stack);

    function MapStack() {
      _classCallCheck(this, MapStack);

      return _possibleConstructorReturn(this, _getPrototypeOf(MapStack).apply(this, arguments));
    }

    _createClass(MapStack, [{
      key: "_unshift",
      value: function _unshift(item) {
        var index = this.list.indexOf(item);

        if (index !== -1) {
          this.list.splice(index, 1);
        }

        this.list.unshift(item);

        if (this.list.length > this.max) {
          return this.list.pop();
        }

        return null;
      }
    }]);

    return MapStack;
  }(Stack);

  function checkInt(n) {
    if (n === Infinity) {
      return true;
    }

    return typeof n === 'number' && n > 0 && (n | 0) === n;
  }
  function defineReactive(data, key, fn) {
    var val = data[key];
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        return val;
      },
      set: function set(newVal) {
        if (key === 'value') {
          console.log('newVal', newVal);
        }

        if (newVal === val) {
          return;
        }

        var oldVal = val;
        val = newVal;
        typeof fn === 'function' && fn(newVal, oldVal);
      }
    });
  }

  var globalStack = new MapStack(config.max);
  var globalCache = [];
  var globalMultiKeyMap = Object.create(null);
  defineReactive(config, 'max', function (newVal) {
    globalStack.updateSize(newVal);
  });

  var routerCache = {
    resolveKeyFromRoute: function resolveKeyFromRoute(route) {
      return route.name ? route.name : route.path;
    },
    resolveKeyFromLocation: function resolveKeyFromLocation(location) {
      var router = config.router;
      var route = router.resolve(location).route;
      return this.resolveKeyFromRoute(route);
    },
    removeGlobalCacheFromItem: function removeGlobalCacheFromItem(removeItem) {
      for (var i = 0; i < globalCache.length; i++) {
        var globalCacheItem = globalCache[i];
        var cache = globalCacheItem.cache;

        if (cache[removeItem]) {
          cache[removeItem].componentInstance.$destroy();
          cache[removeItem] = null;
          delete cache[removeItem];
        }
      }
    },
    removeGlobalCacheFromList: function removeGlobalCacheFromList(removeList) {
      for (var i = 0; i < removeList.length; i++) {
        var removeItem = removeList[i];
        this.removeGlobalCacheFromItem(removeItem);
      }
    },
    shift: function shift() {
      var removeItem = globalStack.shift();

      if (removeItem) {
        this.removeGlobalCacheFromItem(removeItem);
      }
    },
    _remove: function _remove(key) {
      var removeList = globalStack.remove(key);

      if (removeList.length) {
        this.removeGlobalCacheFromList(removeList);
      }
    },
    remove: function remove() {
      for (var i = 0; i < arguments.length; i++) {
        var item = arguments[i];
        var key = this.resolveKeyFromLocation(item);

        this._remove(key);
      }
    },
    _removeBackUntil: function _removeBackUntil(key) {
      var removeList = globalStack.removeBackUntil(key);

      if (removeList.length) {
        this.removeGlobalCacheFromList(removeList);
      }
    },
    removeBackUntil: function removeBackUntil(location) {
      var key = this.resolveKeyFromLocation(location);

      this._removeBackUntil(key);
    },
    _removeBackInclue: function _removeBackInclue(key) {
      var removeList = globalStack.removeBackInclue(key);

      if (removeList.length) {
        this.removeGlobalCacheFromList(removeList);
      }
    },
    removeBackInclue: function removeBackInclue(location) {
      var key = this.resolveKeyFromLocation(location);

      this._removeBackInclue(key);
    },
    removeBackByIndex: function removeBackByIndex(index) {
      var removeList = globalStack.removeBackByIndex(index);

      if (removeList.length) {
        this.removeGlobalCacheFromList(removeList);
      }
    },
    _removeExclude: function _removeExclude() {
      var removeList = globalStack.removeExclude.apply(globalStack, arguments);

      if (removeList.length) {
        this.removeGlobalCacheFromList(removeList);
      }
    },
    removeExclude: function removeExclude() {
      var excludeList = [];

      for (var i = 0; i < arguments.length; i++) {
        var item = arguments[i];
        var key = this.resolveKeyFromLocation(item);
        excludeList.push(key);
      }

      this._removeExclude.apply(this, excludeList);
    },
    removeAll: function removeAll() {
      var removeList = globalStack.removeAll();

      if (removeList.length) {
        this.removeGlobalCacheFromList(removeList);
      }
    },
    getStore: function getStore() {
      return {
        cache: globalCache,
        stack: globalStack.getStore()
      };
    },
    has: function has(location) {
      var key = this.resolveKeyFromLocation(location);
      return globalStack.has(key);
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
  defineReactive(config, 'getHistoryStack', function (newVal) {
    var list = newVal();

    if (!list) {
      return;
    }

    var length = list.length;

    for (var i = length - 1; i > -1; i--) {
      var item = list[i];
      historyStack.unshift(item);
    }
  });

  var BACK = 'back';
  var FORWARD = 'forward';
  var REPLACE = 'replace';
  var NONE = '';

  var historyStateEvent = new Events();
  window.addEventListener('hashchange', function () {
    if (historyStack.getByIndex(1) === window.location.href) {
      historyStateEvent.emit(BACK);
    } else {
      historyStateEvent.emit(FORWARD);
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
    render: function render() {
      var slot = this.$slots["default"];
      var vnode = getFirstComponentChild(slot);
      var rawChild = vnode || slot && slot[0];
      var key;
      var parent = this.$parent;
      var depth = 0;
      var inactive = false;

      while (parent && parent._routerRoot !== parent) {
        var vnodeData = parent.$vnode && parent.$vnode.data;

        if (vnodeData) {
          if (vnodeData.routerView) {
            depth++;
          }

          if (parent._inactive) {
            inactive = true;
          }
        }

        parent = parent.$parent;
      }

      var matched = this.$route.matched[depth];

      if (vnode && matched) {
        if (config.isSingleMode) {
          key = routerCache.resolveKeyFromRoute(matched);
        } else {
          var baseKey = routerCache.resolveKeyFromRoute(matched);

          if (!globalMultiKeyMap[baseKey]) {
            globalMultiKeyMap[baseKey] = new MapStack();
          }

          var lastKey = globalMultiKeyMap[baseKey].getByIndex(0);

          if (this.$route.params[config.directionKey] !== BACK || !lastKey) {
            key = "".concat(baseKey, "_").concat(globalMultiKeyMap[baseKey].getSize());
            globalMultiKeyMap[baseKey].unshift(key);
          } else {
            key = lastKey;
          }
        }

        if (this.cache[key]) {
          if (inactive) {
            vnode.componentInstance = this.oldComponentInstance;
          } else {
            vnode.componentInstance = this.cache[key].componentInstance;
          }

          if (config.isDebugger) {
            console.log("using cache key: %c".concat(key), 'color: orange');
          }
        } else {
          if (!globalStack.checkFull()) {
            if (!inactive) {
              this.cache[key] = vnode;
              this.oldComponentInstance = vnode.componentInstance;
            }
          } else {
            var _lastKey = globalStack.getFooter();

            routerCache._remove(_lastKey);

            if (!inactive) {
              this.cache[key] = vnode;
              this.oldComponentInstance = vnode.componentInstance;
            }
          }
        }

        globalStack.unshift(key);
        vnode.data.routerCache = true;
        vnode.data.keepAlive = true;
      }

      if (config.isDebugger) {
        console.log("all cache key: %c".concat(JSON.stringify(globalStack.getStore())), 'color: orange');
      }

      return rawChild;
    },
    beforeDestroy: function beforeDestroy() {
      for (var key in this.cache) {
        routerCache._remove(key);
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

  var direction = NONE;
  historyStateEvent.on(BACK, function () {
    direction = BACK;
    historyStack.shift();
    config.setHistoryStack(historyStack.getStore());
    var route = config.router.history.current;

    if (config.isSingleMode) {
      var key = routerCache.resolveKeyFromRoute(route);

      routerCache._remove(key);
    } else {
      var baseKey = routerCache.resolveKeyFromRoute(route);

      if (globalMultiKeyMap[baseKey]) {
        var _key = globalMultiKeyMap[baseKey].shift();

        routerCache._remove(_key);
      }
    }
  });
  historyStateEvent.on(FORWARD, function () {
    direction = FORWARD;
  });

  var routerMiddle = function routerMiddle(Vue, config) {
    var router = config.router;
    var directionKey = config.directionKey;
    var originPush = router.push.bind(router);
    var originReplace = router.replace.bind(router);
    var originGo = router.go.bind(router);

    router.push = function (location, onComplete, onAbort) {
      direction = FORWARD;

      if (config.isSingleMode && routerCache.has(location)) {
        routerCache.removeBackInclue(location);
      }

      originPush(location, onComplete, onAbort);
    };

    router.replace = function (location, onComplete, onAbort) {
      direction = REPLACE;
      historyStack.shift();
      config.setHistoryStack(historyStack.getStore());
      routerCache.shift();

      if (config.isSingleMode && routerCache.has(location)) {
        routerCache.removeBackInclue(location);
      }

      originReplace(location, onComplete, onAbort);
    };

    router.go = function (n) {
      // dev: go(n > 1)会导致方向判断错误
      if (n > 1) {
        direction = FORWARD;
      } else if (n < -1) {
        direction = BACK;
        historyStack.removeBackByIndex(-n);
        config.setHistoryStack(historyStack.getStore());
        routerCache.removeBackByIndex(-n);
      }

      originGo(n);
    };

    router.beforeEach(function (to, from, next) {
      // let hashchange I/0 event trigger callback before next
      window.setTimeout(function () {
        to.params[directionKey] = direction;
        next();
      }, 16);
    });
    defineReactive(router.history, 'current', function () {
      Vue.nextTick(function () {
        var href = document.URL;

        if (direction !== BACK && historyStack.getHeader() !== href) {
          historyStack.unshift(href);
          config.setHistoryStack(historyStack.getStore());
        }

        direction = FORWARD;
      });
    });
  };

  function error(text) {
    console.error("%cerror: ".concat(text), 'color: orange');
  }

  function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!options.router) {
      error('parameter router is required');
      return;
    }

    if (!checkInt(options.max)) {
      error('parameter max must be an integer');
      return;
    }

    if (install.installed) {
      return;
    }

    install.installed = true;
    Object.assign(config, options);
    Vue.prototype.$routerCache = routerCache;
    Vue.component(Component.name, Component);
    routerMiddle(Vue, config);
  }

  var VuerouterCache = {
    install: install,
    routerCache: routerCache,
    version: '0.3.3'
  };

  return VuerouterCache;

})));
