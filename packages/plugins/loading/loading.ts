import { h, defineComponent, Transition } from "vue";
import { MoSvga } from "@moxui/components";
import loadingSvga from "./assets/loading.svga";
import "./style/index.scss";

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
          name: baseClass,
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
                style: { backgroundColor: props.backgroundColor },
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
