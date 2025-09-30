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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const registerFormRef = ref();
    const loading = ref(false);
    const registerForm = reactive({
      appid: "",
      // 修改为接口要求的字段名
      chlUserId: "",
      // 修改为接口要求的字段名
      password: "",
      confirmPassword: ""
    });
    const registerRules = reactive({
      appid: [
        { required: true, message: "\u8BF7\u8F93\u5165\u5E94\u7528ID", trigger: "blur" },
        { min: 1, max: 50, message: "\u5E94\u7528ID\u957F\u5EA6\u5728 1 \u5230 50 \u4E2A\u5B57\u7B26", trigger: "blur" }
      ],
      chlUserId: [
        { required: true, message: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", trigger: "blur" },
        { min: 3, max: 20, message: "\u7528\u6237\u540D\u957F\u5EA6\u5728 3 \u5230 20 \u4E2A\u5B57\u7B26", trigger: "blur" }
      ],
      password: [
        { required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" },
        { min: 6, max: 32, message: "\u5BC6\u7801\u957F\u5EA6\u5728 6 \u5230 32 \u4E2A\u5B57\u7B26", trigger: "blur" }
      ],
      confirmPassword: [
        { required: true, message: "\u8BF7\u786E\u8BA4\u5BC6\u7801", trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (value !== registerForm.password) {
              callback(new Error("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    });
    const handleRegister = async () => {
      var _a;
      try {
        await ((_a = registerFormRef.value) == null ? void 0 : _a.validate());
        loading.value = true;
        const registerData = {
          appid: registerForm.appid,
          chlType: "PC",
          // 普通用户注册也使用PC渠道
          chlAppId: "CMS",
          // 普通用户注册渠道应用ID
          chlAppType: "CMS",
          // 普通用户注册渠道应用类型
          chlUserId: registerForm.chlUserId,
          chlUnionId: "",
          // 暂时为空
          chlUserCode: registerForm.password,
          // 密码字段
          chlUserToken: ""
          // 保留字段，暂时不使用
        };
        await api.register("/api/open/admin/user/user/registrar/register", registerData);
        ElMessage.success("\u6CE8\u518C\u6210\u529F");
        router.push("/login");
      } catch (error) {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "register-container" }, _attrs))} data-v-e2f320a4><div class="register-form-wrapper" data-v-e2f320a4><h2 data-v-e2f320a4>\u6CE8\u518C\u8D26\u53F7</h2>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "registerFormRef",
        ref: registerFormRef,
        model: registerForm,
        rules: registerRules,
        class: "register-form",
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u5E94\u7528ID",
              prop: "appid"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: registerForm.appid,
                    "onUpdate:modelValue": ($event) => registerForm.appid = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u5E94\u7528ID",
                    "prefix-icon": "el-icon-setting"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.appid,
                      "onUpdate:modelValue": ($event) => registerForm.appid = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u5E94\u7528ID",
                      "prefix-icon": "el-icon-setting"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u7528\u6237\u540D",
              prop: "chlUserId"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: registerForm.chlUserId,
                    "onUpdate:modelValue": ($event) => registerForm.chlUserId = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                    "prefix-icon": "el-icon-user"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.chlUserId,
                      "onUpdate:modelValue": ($event) => registerForm.chlUserId = $event,
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
                    modelValue: registerForm.password,
                    "onUpdate:modelValue": ($event) => registerForm.password = $event,
                    type: "password",
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                    "prefix-icon": "el-icon-lock",
                    "show-password": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.password,
                      "onUpdate:modelValue": ($event) => registerForm.password = $event,
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
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u786E\u8BA4\u5BC6\u7801",
              prop: "confirmPassword"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: registerForm.confirmPassword,
                    "onUpdate:modelValue": ($event) => registerForm.confirmPassword = $event,
                    type: "password",
                    placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                    "prefix-icon": "el-icon-lock",
                    "show-password": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.confirmPassword,
                      "onUpdate:modelValue": ($event) => registerForm.confirmPassword = $event,
                      type: "password",
                      placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
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
                    class: "register-button",
                    loading: loading.value,
                    onClick: handleRegister
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u6CE8\u518C `);
                      } else {
                        return [
                          createTextVNode(" \u6CE8\u518C ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      class: "register-button",
                      loading: loading.value,
                      onClick: handleRegister
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u6CE8\u518C ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="login-link" data-v-e2f320a4${_scopeId}> \u5DF2\u6709\u8D26\u53F7\uFF1F`);
            _push2(ssrRenderComponent(_component_router_link, { to: "/login" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u8FD4\u56DE\u767B\u5F55`);
                } else {
                  return [
                    createTextVNode("\u8FD4\u56DE\u767B\u5F55")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_el_form_item, {
                label: "\u5E94\u7528ID",
                prop: "appid"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: registerForm.appid,
                    "onUpdate:modelValue": ($event) => registerForm.appid = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u5E94\u7528ID",
                    "prefix-icon": "el-icon-setting"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u7528\u6237\u540D",
                prop: "chlUserId"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: registerForm.chlUserId,
                    "onUpdate:modelValue": ($event) => registerForm.chlUserId = $event,
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
                    modelValue: registerForm.password,
                    "onUpdate:modelValue": ($event) => registerForm.password = $event,
                    type: "password",
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                    "prefix-icon": "el-icon-lock",
                    "show-password": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u786E\u8BA4\u5BC6\u7801",
                prop: "confirmPassword"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: registerForm.confirmPassword,
                    "onUpdate:modelValue": ($event) => registerForm.confirmPassword = $event,
                    type: "password",
                    placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
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
                    class: "register-button",
                    loading: loading.value,
                    onClick: handleRegister
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u6CE8\u518C ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              }),
              createVNode("div", { class: "login-link" }, [
                createTextVNode(" \u5DF2\u6709\u8D26\u53F7\uFF1F"),
                createVNode(_component_router_link, { to: "/login" }, {
                  default: withCtx(() => [
                    createTextVNode("\u8FD4\u56DE\u767B\u5F55")
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2f320a4"]]);

export { register as default };
//# sourceMappingURL=register-B7mZFjbD.mjs.map
