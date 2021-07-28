// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"assets/sass/main.sass":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = css;

function css(el) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.assign(el.style, styles);
}
},{}],"assets/js/tooltip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltip = tooltip;
exports.overlay = overlay;

var _utils = require("./utils");

var template = function template(data) {
  return "\n    <div class=\"tooltip-title\">".concat(data.title, "</div>\n    <div class=\"tooltip-price\">").concat(data.price, "</div>\n");
};

function tooltip($el) {
  var clear = function clear() {
    $el.innerHTML = '';
  };

  return {
    show: function show(_ref, data) {
      var left = _ref.left,
          top = _ref.top;

      var _$el$getBoundingClien = $el.getBoundingClientRect(),
          height = _$el$getBoundingClien.height,
          width = _$el$getBoundingClien.width;

      clear();
      (0, _utils.css)($el, {
        display: 'block',
        top: top + height - 20 + 'px',
        left: left + width / 3 + 'px'
      });
      $el.insertAdjacentHTML('afterbegin', template(data));
    },
    hide: function hide() {
      (0, _utils.css)($el, {
        display: 'none'
      });
    }
  };
}

var overlay_template = function overlay_template(data) {
  return "\n    <div class=\"overlay-container__content__img\">\n        <img src=\"#\" alt=\"image\">\n    </div>\n    <div class=\"overlay-container__content__text\">\n        <h3>\u041F\u043B\u0435\u0434 1</h3>\n    </div>\n";
};

function overlay($el) {
  var content = $el.querySelector('.overlay-container__content');

  var clear = function clear() {
    content.innerHTML = '';
  };

  return {
    show: function show() {
      clear();
      (0, _utils.css)($el, {
        display: 'block'
      });
      content.insertAdjacentHTML('afterbegin', overlay_template());
    },
    hide: function hide() {
      (0, _utils.css)($el, {
        display: 'none'
      });
    }
  };
}
},{"./utils":"assets/js/utils.js"}],"assets/js/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.product_data = void 0;
var product_data = {
  'cls-1': {
    id: 1,
    title: 'Плед 1',
    price: 11 + ' BYN',
    description: 'Психосоматика значительно просветляет индивидуальный блеск, независимо от психического состояния пациента.',
    img: ''
  },
  'cls-2': {
    id: 2,
    title: 'Плед 2',
    price: 22 + ' BYN',
    description: 'Все это побудило нас обратить внимание на то, что фаза возможна.',
    img: ''
  },
  'cls-3': {
    id: 3,
    title: 'Плед 3',
    price: 33 + ' BYN',
    description: 'Краевая часть артезианского бассейна колеблет тектонический психоз. Плато однократно.',
    img: ''
  },
  'cls-4': {
    id: 4,
    title: 'Плед 4',
    price: 44 + ' BYN',
    description: 'Психосоматика значительно просветляет индивидуальный блеск, независимо от психического состояния пациента. Все это побудило нас обратить внимание на то, что фаза возможна. Краевая часть артезианского бассейна колеблет тектонический психоз. Плато однократно.',
    img: ''
  },
  'cls-5': {
    id: 5,
    title: 'Плед 5',
    price: 55 + ' BYN',
    description: 'Психосоматика значительно просветляет индивидуальный блеск, независимо от психического состояния пациента. Все это побудило нас обратить внимание на то, что фаза возможна. Краевая часть артезианского бассейна колеблет тектонический психоз. Плато однократно.',
    img: ''
  },
  'cls-6': {
    id: 6,
    title: 'Плед 6',
    price: 66 + ' BYN',
    description: 'Психосоматика значительно просветляет индивидуальный блеск, независимо от психического состояния пациента. Все это побудило нас обратить внимание на то, что фаза возможна. Краевая часть артезианского бассейна колеблет тектонический психоз. Плато однократно.',
    img: ''
  }
};
exports.product_data = product_data;
},{}],"assets/js/main.js":[function(require,module,exports) {
"use strict";

require("../sass/main.sass");

var _tooltip = require("./tooltip");

var _data = require("./data");

var _utils = require("./utils");

function svghover($container, _ref, prod_data) {
  var main_svg_ID = _ref.main_svg_ID,
      overflow_svg_ID = _ref.overflow_svg_ID,
      img_ID = _ref.img_ID;
  var main_svg = $container.querySelector(main_svg_ID);
  var overflow_svg = $container.querySelector(overflow_svg_ID);
  var img = $container.querySelector(img_ID);
  var over_polygon = overflow_svg.querySelectorAll('polygon');
  var over_path = overflow_svg.querySelectorAll('path');
  var main_polygon = main_svg.querySelectorAll('polygon');
  var main_path = main_svg.querySelectorAll('path');
  var tip = (0, _tooltip.tooltip)($container.querySelector('[data-el="tooltip"]'));
  var title = $container.querySelector('[data-el="title"]');
  var over = (0, _tooltip.overlay)(document.querySelector('[data-el="overlay"]'));
  over_polygon.forEach(function (polygon) {
    return polygon.addEventListener('mousemove', mousemove);
  });
  over_path.forEach(function (path) {
    return path.addEventListener('mousemove', mousemove);
  });
  over_polygon.forEach(function (polygon) {
    return polygon.addEventListener('mouseleave', mouseleave);
  });
  over_path.forEach(function (path) {
    return path.addEventListener('mouseleave', mouseleave);
  });
  over_polygon.forEach(function (polygon) {
    return polygon.addEventListener('click', click);
  });
  over_path.forEach(function (path) {
    return path.addEventListener('click', click);
  });

  function mousemove(_ref2) {
    var target = _ref2.target,
        clientX = _ref2.clientX,
        clientY = _ref2.clientY;
    var el_class = target.getAttribute('class');
    (0, _utils.css)(title, {
      display: 'none'
    });

    var polygoHover = function polygoHover(figure, index, array) {
      if (figure.getAttribute('class') != el_class) {
        img.style = 'opacity: 0.25';
        figure.style = 'fill: #3e3e3e;';
      } else {
        figure.style = 'fill: white;';

        var _el_class = figure.getAttribute('class');

        var data = {
          title: prod_data[_el_class].title,
          price: prod_data[_el_class].price
        };
        tip.show({
          left: clientX,
          top: clientY
        }, data);
      }
    };

    main_polygon.forEach(polygoHover);
    main_path.forEach(polygoHover);
  }

  function mouseleave(event) {
    tip.hide();
    (0, _utils.css)(title, {
      display: 'block'
    });

    var polygonLeave = function polygonLeave(figure, index, array) {
      img.style = 'opacity: 1';
      figure.style = 'fill: white;';
    };

    main_polygon.forEach(polygonLeave);
    main_path.forEach(polygonLeave);
  }

  function click(evenr) {
    over.show();
  }
}

svghover(document.querySelector('.plugin-container'), {
  main_svg_ID: '#main_svg',
  overflow_svg_ID: '#overlay_svg',
  img_ID: '#plugin-img'
}, _data.product_data);
},{"../sass/main.sass":"assets/sass/main.sass","./tooltip":"assets/js/tooltip.js","./data":"assets/js/data.js","./utils":"assets/js/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53713" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/main.js"], null)
//# sourceMappingURL=/main.cea5deef.js.map