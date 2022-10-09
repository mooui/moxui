import { h, defineComponent, computed } from "vue";

import "./style";
import { buttonProps } from "./types";

import { pxToVw } from "@moxui/utils/utils";

export default defineComponent({
  name: "MoButton",
  props: buttonProps,
  setup(props, { slots, attrs }) {
    const buttonTxt = computed(() => {
      return props.txt ? props.txt : props.type === "confirm" ? "确认" : "取消";
    });

    const buttonStyle = computed(() => {
      const height = props.height
        ? pxToVw(props.height)
        : props.size === "large"
        ? pxToVw(100)
        : pxToVw(90);
      const width = props.width
        ? pxToVw(props.width)
        : props.size === "large"
        ? pxToVw(630)
        : pxToVw(330);
      return {
        width,
        height,
        backgroundColor: props.backgroundColor,
        color: props.color,
      };
    });
    // render
    const baseClass = "mo-button";
    return () => {
      return h(
        "button",
        {
          class: [
            baseClass,
            `${baseClass}__${props.type}`,
            `${baseClass}__${props.size}`,
            { [baseClass + "__disabled"]: props.disabled },
          ],
          style: buttonStyle.value,
          disabled: props.disabled,
          ...attrs,
        },
        slots.default ? slots.default() : buttonTxt.value
      );
    };
  },
});
