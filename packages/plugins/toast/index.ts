import toast from "./toast";

function Toast() {}

Toast.install = (app: App) => {
  app.config.globalProperties.$toast = Toast;
};
export { Toast }
