import { h, defineComponent, ref, watch, onMounted } from "vue";

import { smsCodeProps } from "./types";

import "./style/index.scss";
export default defineComponent({
  name: "MoSmsCode",
  props: smsCodeProps,
  emits: ["update:modelValue", "finish"],
  setup(props, { emit, expose }) {
    const input = ref<HTMLInputElement>();
    const isFocus = ref(false);

    onMounted(() => {
      input.value?.focus();
    });
    // render
    const baseClass = "mo-sms-code";
    return () => {
      return h(
        "div",
        {
          class: baseClass,
        },
        [
          // 标题
          props.title
            ? h(
                "h3",
                {
                  class: baseClass + "__title",
                },
                props.title
              )
            : null,
          // 验证码框
          h(
            "div",
            {
              class: baseClass + "__wrapper",
              onClick: () => {
                input.value?.focus();
              },
            },
            [
              h(
                "div",
                {
                  class: baseClass + "__items",
                },
                Array.from({ length: props.length }).map((_, index) => {
                  return h(
                    "div",
                    {
                      class: [
                        baseClass + "__item",
                        {
                          [baseClass + "__item-active"]:
                            index === props.modelValue.length && isFocus.value,
                        },
                      ],
                    },
                    props.modelValue[index]
                  );
                })
              ),
              // 输入框 隐藏
              h("input", {
                class: baseClass + "__input",
                type: "text",
                inputMode: "numeric",
                autoComplete: "one-time-code",
                maxLength: props.length,
                pattern: "[0-9]*",
                ref: input,
                value: props.modelValue,
                onInput: (ev: any) => {
                  let value: string = ev.target.value;
                  if (!/^\d*$/.test(value) || value.length > props.length) {
                    value = value.replace(/\D/g, "").slice(0, props.length);
                    ev.target.value = value;
                  }

                  emit("update:modelValue", value);
                  if (value.length === props.length) {
                    emit("finish");
                  }
                },
                onFocus: () => {
                  isFocus.value = true;
                },
                onBlur: () => {
                  isFocus.value = false;
                },
              }),
            ]
          ),

          // 提示
          props.tips
            ? h(
                "p",
                {
                  class: baseClass + "__tips",
                },
                props.tips
              )
            : null,
        ]
      );
    };
  },
});
