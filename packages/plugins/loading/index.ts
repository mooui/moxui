import type { App } from "vue";
import { mergeProps, createVNode, ref } from "vue";
import { mountComponent } from "@moxui/utils";
import { LoadingOptions } from "./types";
import loading from "./loading";

let ins: any = null;
let timer: ReturnType<typeof setTimeout>;
function Loading(options?: LoadingOptions | boolean) {
  if (typeof options === "boolean") {
    options = {
      show: options,
    };
  } else if (!options) {
    options = {};
  }
  const { show = true, duration, backgroundColor } = options;
  if (!show) {
    ins && ins.close();
  } else {
    if (!ins) {
      const showLoading = ref(true);
      const { instance, unmount } = mountComponent({
        render() {
          function onClosed() {
            ins = null;
            unmount();
          }
          return createVNode(
            loading,
            mergeProps(
              {
                backgroundColor,
              },
              { show: showLoading.value, onClosed }
            )
          );
        },
        setup() {
          return {
            close: () => {
              showLoading.value = false;
            },
          };
        },
      });
      ins = instance;
    }
    timer && clearTimeout(timer);
    if (duration) {
      timer = setTimeout(() => {
        ins && ins.close();
      }, duration);
    }
  }
}

// 关闭loading
Loading.close = () => {
  ins && ins.close();
};
Loading.install = (app: App) => {
  app.config.globalProperties.$loading = Loading;
};

export { Loading };
