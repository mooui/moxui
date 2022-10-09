import { h, defineComponent, Transition } from "vue";
import { MoSvga } from "@moxui/components/svga";
import loadingSvga from "./assets/loading.svga";

import "./style";
import { loadingProps } from "./types";

export default defineComponent({
  name: "MoLoading",
  props: loadingProps,
  setup(props, { attrs }) {
    const baseClass = "mo-loading";
    return () => {
      return h(
        Transition,
        {
          name: "mo-fade3",
          appear: true,
          onAfterLeave: () => {
            props.onClosed && props.onClosed();
          },
        },
        () => {
          if (props.show) {
            return h(
              "div",
              {
                class: baseClass,
                style: {
                  backgroundColor: props.backgroundColor,
                  zIndex: props.zIndex,
                },
                ...attrs,
              },
              h(
                "div",
                { class: baseClass + "__svga" },
                h(MoSvga, {
                  file: loadingSvga,
                  loopTimes: 0,
                  width: 200,
                  height: 200,
                })
              )
            );
          } else {
            return null;
          }
        }
      );
    };
  },
});
