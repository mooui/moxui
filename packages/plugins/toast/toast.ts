import { h, defineComponent } from "vue";

import { toastProps } from "./types";

import "./style/index.scss";
export default defineComponent({
  name: "MoToast",
  props: toastProps,
  setup(props, { emit, expose }) {
    // render
    const baseClass = "mo-toast";
    return () => {
      return h("div", {
        class: baseClass,
      });
    };
  },
});
