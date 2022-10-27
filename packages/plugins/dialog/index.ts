import { ref, createVNode, mergeProps, App, h } from "vue";
import { mountComponent } from "@moxui/utils/mountComponent";
import { callInterceptor } from "@moxui/utils/interceptor";

import dialog from "./dialog";
import { DialogActionType, DialogOptions } from "./types";
export { DialogActionType, type DialogOptions } from "./types";

let queue: any[] = [];

function Dialog(options: DialogOptions): Promise<DialogActionType> {
  // promiseExecutor 中的 resolve
  let finish: Function;
  const show = ref(true);
  const { instance, unmount } = mountComponent({
    render() {
      async function onAction(type: DialogActionType) {
        if (options.beforeClose) {
          callInterceptor(options.beforeClose, {
            done: () => {
              (<any>instance).close();
              finish(type);
            },
            canceled: () => {
              finish(type);
            },
            args: [type],
          });
        } else {
          (<any>instance).close();
          finish(type);
        }
      }
      function onClosed() {
        queue.filter((ins) => ins !== instance);
        unmount();
      }
      const { title, content, btns, contentHeight, close, style } = options;
      return createVNode(
        dialog,
        mergeProps(
          {
            title,
            content,
            btns,
            contentHeight,
            close,
            style,
          },
          { show: show.value, onAction, onClosed }
        )
      );
    },
    setup() {
      return {
        close: () => {
          show.value = false;
        },
      };
    },
  });
  queue.push(instance);
  // 返回
  return new Promise((resolve) => {
    finish = resolve;
    if (options.duration) {
      setTimeout(() => {
        show.value = false;
        resolve(0);
      }, options.duration);
    }
  });
}
Dialog.install = (app: App) => {
  app.component("mo-dialog", dialog);
  app.config.globalProperties.$dialog = Dialog;
};
// 关闭弹窗 从最近一个开始关
Dialog.close = (isAll?: boolean) => {
  if (queue.length > 0) {
    if (isAll) {
      queue.forEach((ins) => ins.close());
    } else {
      queue[queue.length - 1].close();
    }
  }
};
Dialog.Component = dialog;
export { Dialog };
