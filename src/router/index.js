import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomePage/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  // Use hash mode
  history: createWebHashHistory(),
  routes,
});

export default router;
