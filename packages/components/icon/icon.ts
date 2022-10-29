import { h, defineComponent, computed } from "vue";
import { pxToVw } from "@moxui/utils/utils";

import { IconOptions, iconProps } from "./types";

import {
  renderSuccessIcon,
  renderLoadingIcon,
  renderWarnIcon,
  renderErrorIcon,
} from "./icon-render";

export default defineComponent({
  name: "MoIcon",
  props: iconProps,
  setup(props) {
    const iconOptions = computed<IconOptions>(() => {
      return {
        color: props.color,
        size: pxToVw(props.size),
        animate: !!props.animate,
      };
    });
    const iconRenderer = computed(() => {
      switch (props.type) {
        case "success":
          return renderSuccessIcon(baseClass, iconOptions.value);
        case "loading":
          return renderLoadingIcon(baseClass, iconOptions.value);
        case "warn":
          return renderWarnIcon(baseClass, iconOptions.value);
        case "error":
          return renderErrorIcon(baseClass, iconOptions.value);
      }
    });
    // render
    const baseClass = "mo-icon";
    return () => {
      return iconRenderer.value();
    };
  },
});
