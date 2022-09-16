import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import MV from '../views/MV/index.vue'
import My from '../views/My/index.vue'
import Friend from '../views/Friend/index.vue'


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },{
    path: "/mv",
    name: "mv",
    component: MV,
  },{
    path: "/my",
    name: "my",
    component: My,
  },{
    path: "/friend",
    name: "friend",
    component: Friend,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
