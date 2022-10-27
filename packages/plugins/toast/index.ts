import { ref, reactive, watch, App, h } from "vue";
import { getGlobalZIndex, mountComponent } from "@moxui/utils";

import toast from "./toast";
import type { ToastInstance, ToastOptions, TypedToastOptions } from "./types";
export type { ToastOptions, TypedToastOptions } from "./types";

const defaultOptions: ToastOptions = {
  message: "",
  show: true,
  transitionDuration: 500,
  type: void 0,
  icon: void 0,
  mask: void 0,
  iconPosition: void 0,
  zIndex: void 0,
  forbidClick: void 0,
};

let duration = 2500;
const currentOptions: ToastOptions = Object.assign({}, defaultOptions);

// 单例模式, 不支持多toast
let toastInstance: ToastInstance;
let toastTimer: ReturnType<typeof setTimeout>;

function setToastOptions(options: ToastOptions) {
  if (typeof options.duration === "number") {
    duration = options.duration;
    delete options.duration;
  }
  Object.assign(currentOptions, options);
}

// 关闭toast
function close() {
  toastInstance && toastInstance.close();
  return toastInstance;
}

function createInstance() {
  const { instance } = mountComponent({
    setup(_, { expose }) {
      const message = ref("");

      const state = reactive<{ show: boolean; [k: string]: any }>({
        show: false,
      });
      const open = (props: Record<string, any>) => {
        const zIndex: number = props.zIndex || getGlobalZIndex();
        Object.assign(state, currentOptions, props, { zIndex });
        state.show = true;
      };

      const close = () => (state.show = false);

      watch(message, (val) => (state.message = val));

      // 动态修改message
      watch(message, (val) => {
        state.message = val;
      });

      expose({ message, open, close });

      return () => {
        return h(toast, { ...state });
      };
    },
  });

  toastInstance = instance as ToastInstance;
}

function Toast(options: false | string | number | ToastOptions) {
  if (typeof options === "string" || typeof options === "number") {
    options = { message: options };
  }
  if (
    options === false ||
    (typeof options.show === "boolean" && !options.show)
  ) {
    close();
  } else {
    if (!toastInstance) {
      createInstance();
    }
    let dur: number;
    if (typeof options.duration === "number") {
      dur = options.duration;
      delete options.duration;
    } else if (options.type === "loading" || options.icon === "loading") {
      dur = 0;
    } else {
      dur = duration;
    }
    toastTimer && clearTimeout(toastTimer);
    toastInstance.open(options);
    // 指定duration = 0 不自动关闭
    if (dur !== 0) {
      toastTimer = setTimeout(() => {
        close();
      }, dur);
    }
  }

  return toastInstance;
}

function createTypedMethod(type: "loading" | "success" | "warn" | "error") {
  return function (options: string | TypedToastOptions) {
    if (typeof options === "string" || typeof options === "number")
      options = { message: options };
    const newOptions: ToastOptions = Object.assign({}, options, {
      type,
    });
    return Toast(newOptions);
  };
}

Toast.success = createTypedMethod("success");
Toast.warn = createTypedMethod("warn");
Toast.error = createTypedMethod("error");
Toast.loading = createTypedMethod("loading");

Toast.close = close;
Toast.install = (app: App) => {
  app.config.globalProperties.$toast = Toast;
};

export { Toast, setToastOptions };
