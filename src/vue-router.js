import Vue from "vue";
import Router from "vue-router";
import Landing from "./components/Landing";
import PracticalUse from "./components/PracticalUse";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Landing",
      component: Landing
    },
    {
      path: "/practical",
      name: "PracticalUse",
      component: PracticalUse
    }
  ]
});
