import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MV from '../views/MV.vue'
import My from '../views/My.vue'
import Friend from '../views/Friend.vue'


const routes = [
  {
    path: "/home",
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
