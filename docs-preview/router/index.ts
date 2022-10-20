import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("../pages/index.vue");
const Button = () => import("../pages/components/button/index.vue");
const Icon = () => import("../pages/components/icon/index.vue");
const Marquee = () => import("../pages/components/marquee/index.vue");
const Picker = () => import("../pages/components/picker/index.vue");
const Popup = () => import("../pages/components/popup/index.vue");

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
      path: "/:pathMatch(.*)*",
      redirect: { name: "index" },
    },
  ],
});

export default router;
