import {
  h,
  ref,
  defineComponent,
  Transition,
  computed,
  withDirectives,
  vShow,
  CSSProperties,
} from "vue";

import { MoIcon } from "@moxui/components/icon";
import { getGlobalZIndex, pxToVw } from "@moxui/utils/utils";

import "./style";
import { toastProps, IconProp } from "./types";

export default defineComponent({
  name: "MoToast",
  props: toastProps,
  emits: ["closed"],
  setup(props, { emit }) {
    // 图标
    const icon = computed(() => {
      if (props.type || props.icon) {
        const pos = props.iconPosition;
        let formatIcon: IconProp = {};
        if (!props.icon) {
          formatIcon.src = props.type;
        } else {
          if (typeof props.icon === "string") {
            formatIcon.src = props.icon;
          } else {
            formatIcon = props.icon;
            // icon 未指定src 使用type
            if (!formatIcon.src) {
              formatIcon.src = props.type;
            }
            // 仍然未有  判断loading  否则使用success
            if (!formatIcon.src) {
              formatIcon.src = formatIcon.isLoading ? "loading" : "success";
            }
          }
        }
        if (
          typeof formatIcon.isLoading !== "boolean" &&
          formatIcon.src === "loading"
        ) {
          formatIcon.isLoading = true;
        }

        let src = formatIcon.src!;
        let buildIn = false;
        if (["loading", "success", "warn", "error"].indexOf(src) !== -1) {
          buildIn = true;
        }

        return {
          src,
          width: formatIcon.width ? pxToVw(formatIcon.width) : void 0,
          height: formatIcon.height ? pxToVw(formatIcon.height) : void 0,
          isLoading: formatIcon.isLoading,
          position: pos,
          buildIn,
        };
      }
      return null;
    });

    const closed = ref(false);

    const style = computed(() => {
      const res: CSSProperties = {};
      if (typeof props.transitionDuration !== "undefined") {
        res.transitionDuration = props.transitionDuration / 1000 + "s";
      }
      return res;
    });
    // render
    const baseClass = "mo-toast";

    function renderContent() {
      if (props.show) {
        closed.value = false;
      }
      if (!icon.value) {
        return props.message;
      } else {
        return h(
          "div",
          {
            class: `${baseClass}__${icon.value.position}-icon`,
          },
          [
            icon.value.buildIn
              ? closed.value // 完成后隐藏内置icon 以便下一次显示动画
                ? null
                : h(MoIcon, {
                    type: icon.value.src as any,
                    size: icon.value.width
                      ? icon.value.width
                      : icon.value.position === "inline"
                      ? 30
                      : 60,
                    animate: true,
                    color: "#fff",
                  })
              : h("img", {
                  src: icon.value.src,
                  class: [
                    baseClass + "__icon",
                    { loading: icon.value.isLoading },
                  ],
                  style: {
                    width: icon.value.width,
                    height: icon.value.height,
                  },
                }),

            h("p", {}, props.message),
          ]
        );
      }
    }

    return () => {
      const mask =
        props.mask === false
          ? null
          : props.mask === true || !props.mask
          ? "rgba(0,0,0,.2)"
          : props.mask;
      const forbidClick =
        typeof props.forbidClick === "undefined"
          ? mask
            ? true
            : false
          : props.forbidClick;

      return h(
        Transition,
        {
          name: "mo-fade",
          onAfterLeave: () => {
            emit("closed");
            closed.value = true;
          },
        },
        () => {
          return withDirectives(
            h(
              "div",
              {
                class: baseClass + "__wrapper",
                style: {
                  zIndex: props.zIndex || getGlobalZIndex(),
                  pointerEvents: forbidClick ? "all" : null,
                  background: mask,
                },
              },
              h(
                "div",
                {
                  class: baseClass,
                  style: style.value,
                },
                renderContent()
              )
            ),
            [[vShow, props.show]]
          );
        }
      );
    };
  },
});
