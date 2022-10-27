import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("../pages/index.vue");
const Button = () => import("../pages/components/button/index.vue");
const Icon = () => import("../pages/components/icon/index.vue");
const Marquee = () => import("../pages/components/marquee/index.vue");
const Picker = () => import("../pages/components/picker/index.vue");
const Popup = () => import("../pages/components/popup/index.vue");
const SmsCode = () => import("../pages/components/sms-code/index.vue");
const Sticky = () => import("../pages/components/sticky/index.vue");
const Svga = () => import("../pages/components/svga/index.vue");

const Dialog = () => import("../pages/plugins/dialog/index.vue");
const Loading = () => import("../pages/plugins/loading/index.vue");
const Toast = () => import("../pages/plugins/toast/index.vue");

const UseCountDown = () => import("../pages/hooks/use-count-down/index.vue");
const UseLockScroll = () => import("../pages/hooks/use-lock-scroll/index.vue");
const UseOutterClick = () =>
  import("../pages/hooks/use-outter-click/index.vue");

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/index",
      name: "index",
      component: Index,
    },
    {
      path: "/components/button",
      name: "button",
      component: Button,
    },
    {
      path: "/components/icon",
      name: "icon",
      component: Icon,
    },
    {
      path: "/components/marquee",
      name: "marquee",
      component: Marquee,
    },
    {
      path: "/components/picker",
      name: "picker",
      component: Picker,
    },
    {
      path: "/components/popup",
      name: "popup",
      component: Popup,
    },
    {
      path: "/components/sms-code",
      name: "sms-code",
      component: SmsCode,
    },
    {
      path: "/components/sticky",
      name: "sticky",
      component: Sticky,
    },
    {
      path: "/components/svga",
      name: "svga",
      component: Svga,
    },

    {
      path: "/plugins/dialog",
      name: "dialog",
      component: Dialog,
    },
    {
      path: "/plugins/loading",
      name: "loading",
      component: Loading,
    },
    {
      path: "/plugins/toast",
      name: "toast",
      component: Toast,
    },
    {
      path: "/hooks/use-count-down",
      name: "use-count-down",
      component: UseCountDown,
    },
    {
      path: "/hooks/use-lock-scroll",
      name: "use-lock-scroll",
      component: UseLockScroll,
    },
    {
      path: "/hooks/use-outter-click",
      name: "use-outter-click",
      component: UseOutterClick,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "index" },
    },
  ],
});

export default router;
