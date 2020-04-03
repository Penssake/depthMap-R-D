(function(n) {
  function e(e) {
    for (
      var r, a, c = e[0], u = e[1], s = e[2], d = 0, p = [];
      d < c.length;
      d++
    )
      (a = c[d]),
        Object.prototype.hasOwnProperty.call(o, a) && o[a] && p.push(o[a][0]),
        (o[a] = 0);
    for (r in u) Object.prototype.hasOwnProperty.call(u, r) && (n[r] = u[r]);
    l && l(e);
    while (p.length) p.shift()();
    return i.push.apply(i, s || []), t();
  }
  function t() {
    for (var n, e = 0; e < i.length; e++) {
      for (var t = i[e], r = !0, c = 1; c < t.length; c++) {
        var u = t[c];
        0 !== o[u] && (r = !1);
      }
      r && (i.splice(e--, 1), (n = a((a.s = t[0]))));
    }
    return n;
  }
  var r = {},
    o = { app: 0 },
    i = [];
  function a(e) {
    if (r[e]) return r[e].exports;
    var t = (r[e] = { i: e, l: !1, exports: {} });
    return n[e].call(t.exports, t, t.exports, a), (t.l = !0), t.exports;
  }
  (a.m = n),
    (a.c = r),
    (a.d = function(n, e, t) {
      a.o(n, e) || Object.defineProperty(n, e, { enumerable: !0, get: t });
    }),
    (a.r = function(n) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(n, "__esModule", { value: !0 });
    }),
    (a.t = function(n, e) {
      if ((1 & e && (n = a(n)), 8 & e)) return n;
      if (4 & e && "object" === typeof n && n && n.__esModule) return n;
      var t = Object.create(null);
      if (
        (a.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: n }),
        2 & e && "string" != typeof n)
      )
        for (var r in n)
          a.d(
            t,
            r,
            function(e) {
              return n[e];
            }.bind(null, r)
          );
      return t;
    }),
    (a.n = function(n) {
      var e =
        n && n.__esModule
          ? function() {
              return n["default"];
            }
          : function() {
              return n;
            };
      return a.d(e, "a", e), e;
    }),
    (a.o = function(n, e) {
      return Object.prototype.hasOwnProperty.call(n, e);
    }),
    (a.p = "/");
  var c = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    u = c.push.bind(c);
  (c.push = e), (c = c.slice());
  for (var s = 0; s < c.length; s++) e(c[s]);
  var l = u;
  i.push([0, "chunk-vendors"]), t();
})({
  0: function(n, e, t) {
    n.exports = t("56d7");
  },
  "034f": function(n, e, t) {
    "use strict";
    var r = t("85ec"),
      o = t.n(r);
    o.a;
  },
  "56d7": function(n, e, t) {
    "use strict";
    t.r(e);
    t("e260"), t("e6cf"), t("cca6"), t("a79d");
    var r = t("2b0e"),
      o = function() {
        var n = this,
          e = n.$createElement,
          t = n._self._c || e;
        return t("div", { attrs: { id: "app" } }, [t("Canvas")], 1);
      },
      i = [],
      a = function() {
        var n = this,
          e = n.$createElement,
          t = n._self._c || e;
        return t("div", {
          staticClass: "canvasContainer",
          attrs: { id: "canvas" }
        });
      },
      c = [],
      u = t("5a89"),
      s = t("e642"),
      l = {
        name: "Canvas",
        props: { msg: String },
        mounted: function() {
          var n = document.getElementById("canvas"),
            e = new u["n"](),
            t = new u["k"](75, window.innerWidth / window.innerHeight, 1, 1e3),
            r = new u["o"]({ antialias: !0 });
          r.setClearColor("#32cd32"),
            r.setSize(window.innerWidth, window.innerHeight),
            n.appendChild(r.domElement),
            window.addEventListener("resize", function() {
              r.setSize(window.innerWidth, window.innerHeight),
                (t.aspect = window.innerWidth / window.innerHeight),
                t.updateProjectionMatrix();
            });
          var o = new s["a"]();
          o.setPath("./assets/models/"),
            o.load("model.obj", function(n) {
              console.log("3d model", n),
                e.add(n),
                (n.position.y -= 60),
                r.render(e, t);
            }),
            console.log(r);
        },
        methods: { addModelToCanvas: function() {} }
      },
      d = l,
      p = (t("77c5"), t("2877")),
      f = Object(p["a"])(d, a, c, !1, null, "a922ea90", null),
      v = f.exports,
      w = { name: "App", components: { Canvas: v } },
      h = w,
      b = (t("034f"), Object(p["a"])(h, o, i, !1, null, null, null)),
      g = b.exports;
    (r["a"].config.productionTip = !1),
      new r["a"]({
        render: function(n) {
          return n(g);
        }
      }).$mount("#app");
  },
  "77c5": function(n, e, t) {
    "use strict";
    var r = t("b76e"),
      o = t.n(r);
    o.a;
  },
  "85ec": function(n, e, t) {},
  b76e: function(n, e, t) {}
});
//# sourceMappingURL=app.85912375.js.map
