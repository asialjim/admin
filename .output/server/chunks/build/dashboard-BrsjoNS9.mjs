import { E as ElButton } from './el-button-Coapd7Jm.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, createElementBlock, openBlock, normalizeClass, unref, createCommentVNode, createElementVNode, renderSlot, toDisplayString, normalizeStyle, computed, useSSRContext } from 'vue';
import { w as withInstall, d as api, _ as _export_sfc$1, e as buildProps, g as useGlobalConfig, h as useNamespace, j as useLocale, k as addUnit, f as definePropType, i as useId } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@ctrl/tinycolor';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';

const cardProps = buildProps({
  header: {
    type: String,
    default: ""
  },
  footer: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  shadow: {
    type: String,
    values: ["always", "hover", "never"],
    default: void 0
  }
});
const __default__$2 = defineComponent({
  name: "ElCard"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: cardProps,
  setup(__props) {
    const globalConfig = useGlobalConfig("card");
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).is(`${_ctx.shadow || ((_a = unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)
        ])
      }, [
        _ctx.$slots.header || _ctx.header ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(ns).e("header"), _ctx.headerClass])
        }, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            createTextVNode(toDisplayString(_ctx.header), 1)
          ])
        ], 2)) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass]),
          style: normalizeStyle(_ctx.bodyStyle)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6),
        _ctx.$slots.footer || _ctx.footer ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
        }, [
          renderSlot(_ctx.$slots, "footer", {}, () => [
            createTextVNode(toDisplayString(_ctx.footer), 1)
          ])
        ], 2)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var Card = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "card.vue"]]);
const ElCard = withInstall(Card);
const __default__$1 = defineComponent({
  name: "ImgEmpty"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  setup(__props) {
    const ns = useNamespace("empty");
    const id = useId();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        viewBox: "0 0 79 86",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      }, [
        createElementVNode("defs", null, [
          createElementVNode("linearGradient", {
            id: `linearGradient-1-${unref(id)}`,
            x1: "38.8503086%",
            y1: "0%",
            x2: "61.1496914%",
            y2: "100%"
          }, [
            createElementVNode("stop", {
              "stop-color": `var(${unref(ns).cssVarBlockName("fill-color-1")})`,
              offset: "0%"
            }, null, 8, ["stop-color"]),
            createElementVNode("stop", {
              "stop-color": `var(${unref(ns).cssVarBlockName("fill-color-4")})`,
              offset: "100%"
            }, null, 8, ["stop-color"])
          ], 8, ["id"]),
          createElementVNode("linearGradient", {
            id: `linearGradient-2-${unref(id)}`,
            x1: "0%",
            y1: "9.5%",
            x2: "100%",
            y2: "90.5%"
          }, [
            createElementVNode("stop", {
              "stop-color": `var(${unref(ns).cssVarBlockName("fill-color-1")})`,
              offset: "0%"
            }, null, 8, ["stop-color"]),
            createElementVNode("stop", {
              "stop-color": `var(${unref(ns).cssVarBlockName("fill-color-6")})`,
              offset: "100%"
            }, null, 8, ["stop-color"])
          ], 8, ["id"]),
          createElementVNode("rect", {
            id: `path-3-${unref(id)}`,
            x: "0",
            y: "0",
            width: "17",
            height: "36"
          }, null, 8, ["id"])
        ]),
        createElementVNode("g", {
          stroke: "none",
          "stroke-width": "1",
          fill: "none",
          "fill-rule": "evenodd"
        }, [
          createElementVNode("g", { transform: "translate(-1268.000000, -535.000000)" }, [
            createElementVNode("g", { transform: "translate(1268.000000, 535.000000)" }, [
              createElementVNode("path", {
                d: "M39.5,86 C61.3152476,86 79,83.9106622 79,81.3333333 C79,78.7560045 57.3152476,78 35.5,78 C13.6847524,78 0,78.7560045 0,81.3333333 C0,83.9106622 17.6847524,86 39.5,86 Z",
                fill: `var(${unref(ns).cssVarBlockName("fill-color-3")})`
              }, null, 8, ["fill"]),
              createElementVNode("polygon", {
                fill: `var(${unref(ns).cssVarBlockName("fill-color-7")})`,
                transform: "translate(27.500000, 51.500000) scale(1, -1) translate(-27.500000, -51.500000) ",
                points: "13 58 53 58 42 45 2 45"
              }, null, 8, ["fill"]),
              createElementVNode("g", { transform: "translate(34.500000, 31.500000) scale(-1, 1) rotate(-25.000000) translate(-34.500000, -31.500000) translate(7.000000, 10.000000)" }, [
                createElementVNode("polygon", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-7")})`,
                  transform: "translate(11.500000, 5.000000) scale(1, -1) translate(-11.500000, -5.000000) ",
                  points: "2.84078316e-14 3 18 3 23 7 5 7"
                }, null, 8, ["fill"]),
                createElementVNode("polygon", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-5")})`,
                  points: "-3.69149156e-15 7 38 7 38 43 -3.69149156e-15 43"
                }, null, 8, ["fill"]),
                createElementVNode("rect", {
                  fill: `url(#linearGradient-1-${unref(id)})`,
                  transform: "translate(46.500000, 25.000000) scale(-1, 1) translate(-46.500000, -25.000000) ",
                  x: "38",
                  y: "7",
                  width: "17",
                  height: "36"
                }, null, 8, ["fill"]),
                createElementVNode("polygon", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-2")})`,
                  transform: "translate(39.500000, 3.500000) scale(-1, 1) translate(-39.500000, -3.500000) ",
                  points: "24 7 41 7 55 -3.63806207e-12 38 -3.63806207e-12"
                }, null, 8, ["fill"])
              ]),
              createElementVNode("rect", {
                fill: `url(#linearGradient-2-${unref(id)})`,
                x: "13",
                y: "45",
                width: "40",
                height: "36"
              }, null, 8, ["fill"]),
              createElementVNode("g", { transform: "translate(53.000000, 45.000000)" }, [
                createElementVNode("use", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-8")})`,
                  transform: "translate(8.500000, 18.000000) scale(-1, 1) translate(-8.500000, -18.000000) ",
                  "xlink:href": `#path-3-${unref(id)}`
                }, null, 8, ["fill", "xlink:href"]),
                createElementVNode("polygon", {
                  fill: `var(${unref(ns).cssVarBlockName("fill-color-9")})`,
                  mask: `url(#mask-4-${unref(id)})`,
                  transform: "translate(12.000000, 9.000000) scale(-1, 1) translate(-12.000000, -9.000000) ",
                  points: "7 0 24 0 20 18 7 16.5"
                }, null, 8, ["fill", "mask"])
              ]),
              createElementVNode("polygon", {
                fill: `var(${unref(ns).cssVarBlockName("fill-color-2")})`,
                transform: "translate(66.000000, 51.500000) scale(-1, 1) translate(-66.000000, -51.500000) ",
                points: "62 45 79 45 70 58 53 58"
              }, null, 8, ["fill"])
            ])
          ])
        ])
      ]);
    };
  }
});
var ImgEmpty = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "img-empty.vue"]]);
const emptyProps = buildProps({
  image: {
    type: String,
    default: ""
  },
  imageSize: Number,
  description: {
    type: String,
    default: ""
  }
});
const __default__ = defineComponent({
  name: "ElEmpty"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: emptyProps,
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const ns = useNamespace("empty");
    const emptyDescription = computed(() => props.description || t("el.table.emptyText"));
    const imageStyle = computed(() => ({
      width: addUnit(props.imageSize)
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(ns).b())
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ns).e("image")),
          style: normalizeStyle(unref(imageStyle))
        }, [
          _ctx.image ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _ctx.image,
            ondragstart: "return false"
          }, null, 8, ["src"])) : renderSlot(_ctx.$slots, "image", { key: 1 }, () => [
            createVNode(ImgEmpty)
          ])
        ], 6),
        createElementVNode("div", {
          class: normalizeClass(unref(ns).e("description"))
        }, [
          _ctx.$slots.description ? renderSlot(_ctx.$slots, "description", { key: 0 }) : (openBlock(), createElementBlock("p", { key: 1 }, toDisplayString(unref(emptyDescription)), 1))
        ], 2),
        _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).e("bottom"))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var Empty = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "empty.vue"]]);
const ElEmpty = withInstall(Empty);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const handleLogout = () => {
      api.logout();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_empty = ElEmpty;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-container" }, _attrs))} data-v-1a235ec3><div class="dashboard-header" data-v-1a235ec3><h1 data-v-1a235ec3>\u6B22\u8FCE\u4F7F\u7528\u5FAE\u5E94\u7528\u7BA1\u7406\u7CFB\u7EDF</h1>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: handleLogout
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9000\u51FA\u767B\u5F55`);
          } else {
            return [
              createTextVNode("\u9000\u51FA\u767B\u5F55")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="dashboard-content" data-v-1a235ec3>`);
      _push(ssrRenderComponent(_component_el_card, { class: "dashboard-card" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-header" data-v-1a235ec3${_scopeId}><span data-v-1a235ec3${_scopeId}>\u7CFB\u7EDF\u4FE1\u606F</span></div>`);
          } else {
            return [
              createVNode("div", { class: "card-header" }, [
                createVNode("span", null, "\u7CFB\u7EDF\u4FE1\u606F")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="dashboard-welcome" data-v-1a235ec3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_empty, {
              description: "\u60A8\u5DF2\u6210\u529F\u767B\u5F55\u7CFB\u7EDF",
              "image-size": "200"
            }, null, _parent2, _scopeId));
            _push2(`<p data-v-1a235ec3${_scopeId}>\u8FD9\u662F\u4E00\u4E2A\u793A\u4F8B\u4EEA\u8868\u76D8\u9875\u9762\uFF0C\u540E\u7EED\u53EF\u4EE5\u6839\u636E\u9700\u6C42\u8FDB\u884C\u529F\u80FD\u6269\u5C55\u3002</p></div>`);
          } else {
            return [
              createVNode("div", { class: "dashboard-welcome" }, [
                createVNode(_component_el_empty, {
                  description: "\u60A8\u5DF2\u6210\u529F\u767B\u5F55\u7CFB\u7EDF",
                  "image-size": "200"
                }),
                createVNode("p", null, "\u8FD9\u662F\u4E00\u4E2A\u793A\u4F8B\u4EEA\u8868\u76D8\u9875\u9762\uFF0C\u540E\u7EED\u53EF\u4EE5\u6839\u636E\u9700\u6C42\u8FDB\u884C\u529F\u80FD\u6269\u5C55\u3002")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a235ec3"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-BrsjoNS9.mjs.map
