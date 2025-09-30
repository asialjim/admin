import { E as ElForm, a as ElFormItem, b as ElInput } from './el-input-CD-xXOtz.mjs';
import { E as ElButton } from './el-button-Coapd7Jm.mjs';
import { l as ElIcon, s as success_filled_default, d as api, E as ElMessage } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, createVNode, createTextVNode, unref, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
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
  __name: "create-admin",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const adminFormRef = ref();
    const loading = ref(false);
    const created = ref(false);
    const adminForm = reactive({
      password: "",
      confirmPassword: ""
    });
    const adminRules = reactive({
      password: [
        { required: true, message: "\u8BF7\u8F93\u5165\u5BC6\u7801", trigger: "blur" },
        { min: 6, max: 32, message: "\u5BC6\u7801\u957F\u5EA6\u5728 6 \u5230 32 \u4E2A\u5B57\u7B26", trigger: "blur" }
      ],
      confirmPassword: [
        { required: true, message: "\u8BF7\u786E\u8BA4\u5BC6\u7801", trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (value !== adminForm.password) {
              callback(new Error("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    });
    const handleCreateAdmin = async () => {
      var _a;
      try {
        await ((_a = adminFormRef.value) == null ? void 0 : _a.validate());
        loading.value = true;
        const registerData = {
          userid: "root",
          // 注册超管时写死 root
          appid: "root",
          // 注册超管时写死 root
          chlType: "PC",
          // 注册超管时写死为PC
          chlAppId: "root",
          // 注册超管时写死 root
          chlAppType: "CMS",
          // 注册超管时写死 CMS
          chlUserId: "root",
          // 注册超管时写死root
          chlUnionId: "",
          // 暂时为空
          chlUserCode: adminForm.password,
          // 用户密码字段
          chlUserToken: ""
          // 保留字段，暂时不使用
        };
        await api.register("/api/open/admin/user/user/registrar/register", registerData);
        ElMessage.success("\u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u6237\u521B\u5EFA\u6210\u529F\uFF01");
        created.value = true;
        setTimeout(() => {
          router.push("/login");
        }, 2e3);
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
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "create-admin-container" }, _attrs))} data-v-fef4bb9c><div class="create-admin-form-wrapper" data-v-fef4bb9c><h2 data-v-fef4bb9c>\u521B\u5EFA\u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u6237</h2>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "adminFormRef",
        ref: adminFormRef,
        model: adminForm,
        rules: adminRules,
        class: "create-admin-form",
        "label-position": "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, {
              label: "\u5BC6\u7801",
              prop: "password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    modelValue: adminForm.password,
                    "onUpdate:modelValue": ($event) => adminForm.password = $event,
                    type: "password",
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                    "prefix-icon": "el-icon-lock",
                    "show-password": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="form-tip" data-v-fef4bb9c${_scopeId2}>\u5BC6\u7801\u5C06\u7528\u4E8E\u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u6237\u8BA4\u8BC1</div>`);
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: adminForm.password,
                      "onUpdate:modelValue": ($event) => adminForm.password = $event,
                      type: "password",
                      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                      "prefix-icon": "el-icon-lock",
                      "show-password": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "form-tip" }, "\u5BC6\u7801\u5C06\u7528\u4E8E\u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u6237\u8BA4\u8BC1")
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
                    modelValue: adminForm.confirmPassword,
                    "onUpdate:modelValue": ($event) => adminForm.confirmPassword = $event,
                    type: "password",
                    placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                    "prefix-icon": "el-icon-lock",
                    "show-password": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_input, {
                      modelValue: adminForm.confirmPassword,
                      "onUpdate:modelValue": ($event) => adminForm.confirmPassword = $event,
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
                    class: "create-button",
                    loading: loading.value,
                    onClick: handleCreateAdmin
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u521B\u5EFA\u8D26\u6237 `);
                      } else {
                        return [
                          createTextVNode(" \u521B\u5EFA\u8D26\u6237 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      class: "create-button",
                      loading: loading.value,
                      onClick: handleCreateAdmin
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u521B\u5EFA\u8D26\u6237 ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (created.value) {
              _push2(`<div class="success-message" data-v-fef4bb9c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(success_filled_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(success_filled_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` \u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u6237\u521B\u5EFA\u6210\u529F\uFF01 </div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_el_form_item, {
                label: "\u5BC6\u7801",
                prop: "password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: adminForm.password,
                    "onUpdate:modelValue": ($event) => adminForm.password = $event,
                    type: "password",
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                    "prefix-icon": "el-icon-lock",
                    "show-password": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "form-tip" }, "\u5BC6\u7801\u5C06\u7528\u4E8E\u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u6237\u8BA4\u8BC1")
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, {
                label: "\u786E\u8BA4\u5BC6\u7801",
                prop: "confirmPassword"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: adminForm.confirmPassword,
                    "onUpdate:modelValue": ($event) => adminForm.confirmPassword = $event,
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
                    class: "create-button",
                    loading: loading.value,
                    onClick: handleCreateAdmin
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u521B\u5EFA\u8D26\u6237 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              }),
              created.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "success-message"
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(success_filled_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" \u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u6237\u521B\u5EFA\u6210\u529F\uFF01 ")
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/create-admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const createAdmin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fef4bb9c"]]);

export { createAdmin as default };
//# sourceMappingURL=create-admin-Dxy9aiM-.mjs.map
