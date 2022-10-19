import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("../pages/index.vue");
const Button = () => import("../pages/components/button/index.vue");
const Icon = () => import("../pages/components/icon/index.vue");

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
      path: "/:pathMatch(.*)*",
      redirect: { name: "index" },
    },
  ],
});

export default router;
