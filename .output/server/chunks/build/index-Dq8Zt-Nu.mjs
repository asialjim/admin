import { E as ElButton } from './el-button-Coapd7Jm.mjs';
import { defineComponent, useSSRContext, mergeProps, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './server.mjs';
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
import '@ctrl/tinycolor';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const goToLogin = () => {
      router.push("/login");
    };
    const goToRegister = () => {
      router.push("/register");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "portal-container" }, _attrs))} data-v-f8e7523f><div class="portal-content" data-v-f8e7523f><h1 class="portal-title" data-v-f8e7523f>\u5FAE\u5E94\u7528\u7BA1\u7406\u7CFB\u7EDF</h1><p class="portal-subtitle" data-v-f8e7523f>\u6B22\u8FCE\u4F7F\u7528\u4F01\u4E1A\u7EA7\u5E94\u7528\u7BA1\u7406\u5E73\u53F0</p><div class="portal-actions" data-v-f8e7523f>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        size: "large",
        onClick: goToLogin,
        class: "action-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u767B\u5F55`);
          } else {
            return [
              createTextVNode("\u767B\u5F55")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        size: "large",
        onClick: goToRegister,
        class: "action-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u6CE8\u518C`);
          } else {
            return [
              createTextVNode("\u6CE8\u518C")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8e7523f"]]);

export { index as default };
//# sourceMappingURL=index-Dq8Zt-Nu.mjs.map
