import { App } from "vue";
import { mergeProps, createVNode, ref } from "vue";
import { mountComponent, getGlobalZIndex, designSize } from "@moxui/utils";
import { LoadingOptions } from "./types";
import loading from "./loading";

const CONTAINERCLASS = "mo-relative-hide";

const instances: Set<any> = new Set();
const containerMap = new WeakMap<HTMLElement, any>();

// 获取容器信息
function getContainerInfo(container?: string | HTMLElement | null) {
  let c: HTMLElement | null | undefined,
    size = 0;
  if (container) {
    if (typeof container === "string") {
      c = document.querySelector(container) as HTMLElement;
    } else {
      c = container;
    }
    if (c === document.body) c = null;
    if (c) {
      c.classList.add(CONTAINERCLASS);

      // 计算svga动画大小
      if (c.offsetHeight > c.offsetWidth) {
        size = c.offsetWidth;
      } else {
        size = c.offsetHeight;
      }
      size = designSize(size / 1.5);
      if (size > 200) size = 200;
    }
  }
  return {
    container: c || document.body,
    size,
  };
}

function close(container: HTMLElement) {
  const ins = containerMap.get(container);
  if (ins) {
    ins.timer && clearTimeout(ins.timer);
    ins.close();
  }
}

function Loading(options?: LoadingOptions | boolean | number) {
  if (typeof options === "boolean") {
    options = {
      show: options,
    };
  } else if (typeof options === "number") {
    options = { duration: options };
  } else if (!options) {
    options = {};
  }
  const { show = true, duration, backgroundColor } = options;
  const zIndex = options.zIndex || getGlobalZIndex();
  const { container, size } = getContainerInfo(options.container);
  if (!show) {
    close(container);
    return () => {};
  } else {
    let ins = containerMap.get(container);
    if (!ins) {
      const showLoading = ref(true);
      const { instance, unmount } = mountComponent(
        {
          render() {
            function onClosed() {
              if (container && container !== document.body) {
                container.classList.remove(CONTAINERCLASS);
              }
              instances.delete(instance);
              containerMap.delete(container);
              unmount();
            }
            return createVNode(
              loading,
              mergeProps(
                {
                  backgroundColor,
                  zIndex,
                  width: size,
                  height: size,
                  definedContainer: !!container,
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
        },
        container
      );
      containerMap.set(container, (ins = instance));
      instances.add(instance);
    }
    ins.timer && clearTimeout(ins.timer);

    if (duration) {
      ins.timer = setTimeout(() => {
        ins?.close();
      }, duration);
    }
    return function close() {
      clearTimeout(ins.timer);
      ins?.close();
    };
  }
}

// 关闭loading
Loading.close = () => {
  instances.forEach((ins) => ins.close());
  instances.clear();
};
Loading.install = (app: App) => {
  app.config.globalProperties.$loading = Loading;
};

export { Loading };
