import { createApp, Component } from "vue";

// 挂载组件
function mountComponent(
  RootComponent: Component,
  container?: HTMLElement | null
) {
  const app = createApp(RootComponent);
  const root = document.createElement("div");
  container = container || document.body;

  container.appendChild(root);

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      container!.removeChild(root);
    },
  };
}

export { mountComponent };
