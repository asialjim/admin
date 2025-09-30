import { E as ElForm, a as ElFormItem, b as ElInput } from './el-input-CD-xXOtz.mjs';
import { E as ElButton } from './el-button-Coapd7Jm.mjs';
import { d as api, E as ElMessage } from './server.mjs';
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import 'async-validator';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const loginFormRef = ref();
    const loading = ref(false);
    const loginForm = reactive({
      appId: "",
      username: "",
      password: ""
    });
    const loginRules = reactive({
      appId: [
        { required: true, message: "\u8BF7\u8F93\u5165\u5E94\u7528\u7F16\u53F7", trigger: "blur" }
      ],
      username: [
        { required: true, message: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", trigger: "blur" }
      ],
      password: [
        { required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" },
        { min: 6, message: "\u5BC6\u7801\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E6\u4F4D", trigger: "blur" }
      ]
    });
    const handleLogin = async () => {
      if (!loginFormRef.value) return;
      try {
        await loginFormRef.value.validate();
        loading.value = true;
        const loginData = {
          username: loginForm.username,
          password: loginForm.password,
          code: "",
          // 保留字段
          state: ""
          // 保留字段
        };
        const customHeaders = {
          "x-app-id": loginForm.appId,
          // 应用编号，从表单获取
          "x-app-chl": "PC",
          // 登录渠道，后管页面固定为PC
          "x-app-chl-app-type": "CMS"
          // 渠道应用，后管页面固定为CMS
        };
        const response = await api.login("/api/open/auth/login", loginData, customHeaders);
        if (response && response.status === 200 && response.code === "0") {
          ElMessage.success("\u767B\u5F55\u6210\u529F");
          router.push("/dashboard");
        } else {
          ElMessage.error((response == null ? void 0 : response.msg) || "\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
        }
      } catch (error) {
        console.error("\u767B\u5F55\u5931\u8D25:", error);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-container" }, _attrs))} data-v-88f4e7b3><div class="login-form-wrapper" data-v-88f4e7b3><div class="form-header" data-v-88f4e7b3><h2 class="form-title" data-v-88f4e7b3>\u7528\u6237\u767B\u5F55</h2><p class="form-subtitle" data-v-88f4e7b3>\u8BF7\u8F93\u5165\u60A8\u7684\u8D26\u53F7\u4FE1\u606F</p></div>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "loginFormRef",
        ref: loginFormRef,
        model: loginForm,
        rules: loginRules,
        "label-width": "80px",
        class: "login-form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u5E94\u7528\u7F16\u53F7",
              prop: "appId"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: loginForm.appId,
                    "onUpdate:modelValue": ($event) => loginForm.appId = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u5E94\u7528\u7F16\u53F7",
                    "prefix-icon": "el-icon-office-building"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: loginForm.appId,
                      "onUpdate:modelValue": ($event) => loginForm.appId = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u5E94\u7528\u7F16\u53F7",
                      "prefix-icon": "el-icon-office-building"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u7528\u6237\u540D",
              prop: "username"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: loginForm.username,
                    "onUpdate:modelValue": ($event) => loginForm.username = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                    "prefix-icon": "el-icon-user"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: loginForm.username,
                      "onUpdate:modelValue": ($event) => loginForm.username = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                      "prefix-icon": "el-icon-user"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u5BC6\u7801",
              prop: "password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: loginForm.password,
                    "onUpdate:modelValue": ($event) => loginForm.password = $event,
                    type: "password",
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                    "prefix-icon": "el-icon-lock",
                    "show-password": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: loginForm.password,
                      "onUpdate:modelValue": ($event) => loginForm.password = $event,
                      type: "password",
                      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                      "prefix-icon": "el-icon-lock",
                      "show-password": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    size: "large",
                    class: "login-btn",
                    onClick: handleLogin,
                    loading: loading.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u767B\u5F55 `);
                      } else {
                        return [
                          createTextVNode(" \u767B\u5F55 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      size: "large",
                      class: "login-btn",
                      onClick: handleLogin,
                      loading: loading.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u767B\u5F55 ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form_item, {
                label: "\u5E94\u7528\u7F16\u53F7",
                prop: "appId"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: loginForm.appId,
                    "onUpdate:modelValue": ($event) => loginForm.appId = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u5E94\u7528\u7F16\u53F7",
                    "prefix-icon": "el-icon-office-building"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u7528\u6237\u540D",
                prop: "username"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: loginForm.username,
                    "onUpdate:modelValue": ($event) => loginForm.username = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                    "prefix-icon": "el-icon-user"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u5BC6\u7801",
                prop: "password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: loginForm.password,
                    "onUpdate:modelValue": ($event) => loginForm.password = $event,
                    type: "password",
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                    "prefix-icon": "el-icon-lock",
                    "show-password": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    size: "large",
                    class: "login-btn",
                    onClick: handleLogin,
                    loading: loading.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u767B\u5F55 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="form-footer" data-v-88f4e7b3>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/register",
        class: "register-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u6CA1\u6709\u8D26\u53F7\uFF1F\u7ACB\u5373\u6CE8\u518C`);
          } else {
            return [
              createTextVNode("\u6CA1\u6709\u8D26\u53F7\uFF1F\u7ACB\u5373\u6CE8\u518C")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-88f4e7b3"]]);

export { login as default };
//# sourceMappingURL=login-SbFLrX3d.mjs.map
