import { h, defineComponent, computed } from "vue";

import { pxToVw } from "@moxui/utils/utils";
import { MoPopup } from "@moxui/components/popup";
import { MoButton } from "@moxui/components/button";

import { dialogProps } from "./types";

import "./style/index.scss";

export default defineComponent({
  name: "Dialog",
  emits: ["close", "cancel", "confirm"],
  props: dialogProps,
  setup(this, props, { slots, emit }) {
    // 内容样式
    const contentStyle = computed(() => {
      let res: any = null,
        style: any = {};
      if (props.contentHeight) {
        res = { minHeight: pxToVw(props.contentHeight), overflowY: "auto" };
      }
      if (props.style) {
        for (const key in props.style) {
          // px 转换成vw
          if (
            typeof props.style[key] === "string" &&
            /\d+px/i.test(props.style[key])
          ) {
            style[key] = props.style[key].replace(/\d+px/gi, (m: string) => {
              return pxToVw(m);
            });
          } else {
            style[key] = props.style[key];
          }
        }
      }
      return Object.assign({}, res, style);
    });
    // 关闭样式
    const closeStyle = computed(() => {
      if (props.close) {
        const close = typeof props.close === "boolean" ? {} : props.close;
        return {
          top: pxToVw(close.top || 20),
          right: pxToVw(close.right || 20),
          width: pxToVw(close.width || 30),
          height: pxToVw(close.height || 30),
          backgroundImage: close.icon ? `url(${close.icon})` : void 0,
        };
      } else {
        return null;
      }
    });
    // 按钮
    const formatBtns = computed(() => {
      const btns = props.btns;
      return btns.map((txt, index) => {
        if (typeof txt === "string") {
          if (index === 0 && btns.length !== 1) {
            return {
              txt,
              active: false,
            };
          } else {
            return {
              txt,
              active: true,
            };
          }
        } else {
          return txt;
        }
      });
    });

    function btnClick(index: number) {
      if (formatBtns.value[index].active) {
        emit("confirm");
      } else {
        emit("cancel");
      }
    }

    const baseClass = "mo-dialog";

    return () =>
      h(
        MoPopup,
        {
          show: props.show,
        },
        () =>
          h("div", { class: baseClass }, [
            slots.close
              ? h(
                  "div",
                  { class: baseClass + "__close-wrapper" },
                  slots.close()
                )
              : props.close
              ? h("a", {
                  href: "javascript:void(0);",
                  class: baseClass + "__close",
                  style: closeStyle.value,
                  onClick: () => emit("close"),
                })
              : null,
            props.title
              ? h("div", { class: baseClass + "__title" }, props.title)
              : null,

            slots.default
              ? slots.default()
              : h(
                  "div",
                  { class: baseClass + "__content-wrapper" },
                  h(
                    "div",
                    {
                      class: baseClass + "__content",
                      style: contentStyle.value,
                    },
                    props.content
                  )
                ),

            h(
              "div",
              { class: baseClass + "__btn-wrapper" },
              slots.button?.() || [
                formatBtns.value.map((btn, index) => {
                  return h(
                    MoButton,
                    {
                      key: btn.txt,
                      type: btn.active ? "confirm" : "cancel",
                      onClick: () => btnClick(index),
                    },
                    () => btn.txt
                  );
                }),
              ]
            ),
          ])
      );
  },
});
