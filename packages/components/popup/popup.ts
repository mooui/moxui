import { h, defineComponent } from "vue";

import { popupProps } from "./types";

import "./style/index.scss";
export default defineComponent({
  name: "MoPopup",
  props: popupProps,
  setup(props, { emit, expose }) {
    // render
    const baseClass = "mo-popup";
    return () => {
      return h("div", {
        class: baseClass,
      });
    };
  },
});
