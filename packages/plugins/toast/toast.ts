import {
  h,
  defineComponent,
  Transition,
  computed,
  withDirectives,
  vShow,
  CSSProperties,
} from "vue";
import { getGlobalZIndex, pxToVw } from "@moxui/utils/utils";

import { toastProps, IconProp } from "./types";
import icons from "./icon";

export default defineComponent({
  name: "MoToast",
  props: toastProps,
  emits: ["closed"],
  setup(props, { emit, attrs }) {
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
        if (["loading", "success", "warn", "error"].indexOf(src) !== -1) {
          if (pos === "center") {
            src = (icons as any)[src];
          } else {
            src = (icons as any)[src + "Mini"];
          }
        }

        return {
          src,
          width: formatIcon.width ? pxToVw(formatIcon.width) : void 0,
          height: formatIcon.height ? pxToVw(formatIcon.height) : void 0,
          isLoading: formatIcon.isLoading,
          position: pos,
        };
      }
      return null;
    });

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
      if (!icon.value) {
        return props.message;
      } else {
        return h(
          "div",
          {
            class: `${baseClass}__${icon.value.position}-icon`,
          },
          [
            h("img", {
              src: icon.value.src,
              class: [baseClass + "__icon", { loading: icon.value.isLoading }],
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
      return h(
        Transition,
        {
          name: "mo-fade",
          onAfterLeave: () => {
            emit("closed");
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
                },
              },
              h(
                "div",
                {
                  class: baseClass,
                  style: style.value,
                  ...attrs,
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
