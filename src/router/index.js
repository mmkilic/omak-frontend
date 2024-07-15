import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import axios from "axios";

const url = "/auth/validation";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkActiveClass: "active"
});

router.beforeEach(async (to, from, next,) => {
  const publicPages = ['/login'];

  if(publicPages.includes(to.path)){
    return next();
  }

  const token = await JSON.parse(localStorage.getItem('token')); 
  const conf = {headers: {'Content-Type': "application/json", Authorization: `Bearer ${token}`}};

  await axios.get(url, conf)
      .then((response) => {
        localStorage.setItem('authorities', JSON.stringify(response.data.authorities));
        localStorage.setItem('fullName', JSON.stringify(response.data.fullName));
        router.app.$store.commit('setToken', token);
        return next();
      })
      .catch((e) => {
        console.log(e);
        return next('/login');
      });
});

Vue.use(VueRouter);

export default router;
