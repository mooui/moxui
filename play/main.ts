import { createApp } from "vue";
import Moxui from "moxui";
(async () => {
  const apps = import.meta.glob("./src/*.vue");
  const name = location.pathname.replace(/^\//, "") || "App";
  const file = apps[`./src/${name}.vue`];
  if (!file) {
    location.pathname = "App";
    return;
  }
  const App = ((await file()) as any).default;

  const app = createApp(App).use(Moxui);

  app.mount("#play");
})();
