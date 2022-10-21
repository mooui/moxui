import { h, defineComponent, Transition } from "vue";
import { MoSvga } from "@moxui/components/svga";
import { pxToVw } from "@moxui/utils/utils";
import loadingSvga from "./assets/loading.svga";

import "./style";
import { loadingProps } from "./types";

export default defineComponent({
  name: "MoLoading",
  props: loadingProps,
  setup(props) {
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
                class: [
                  baseClass,
                  { [baseClass + "__absolute"]: props.definedContainer },
                ],
                style: {
                  backgroundColor: props.backgroundColor,
                  zIndex: props.zIndex,
                },
              },
              h(
                "div",
                {
                  class: baseClass + "__svga",
                  style: {
                    width: pxToVw(props.width || 200),
                    height: pxToVw(props.height || 200),
                  },
                },
                h(MoSvga, {
                  file: loadingSvga,
                  loopTimes: 0,
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
