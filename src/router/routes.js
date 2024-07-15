import LayoutMain from "@/layout/LayoutMain.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import Login from "@/pages/LoginPage.vue";

//Child Pages
import MainPage from "@/pages/MainPage.vue";
import OfferPage from "@/pages/OfferPage.vue";
import OrderPage from "@/pages/OrderPage.vue";
import AdminPage from "@/pages/AdminPage.vue";

const routes = [
  {
    path: '/login',
    name: 'Login',  
    component: Login
  },
  {
    path: "/",
    component: LayoutMain,
    redirect: "/main",
    children: [
      {
        path: "main",
        name: "mainPage",
        component: MainPage
      },
      {
        path: "offer",
        name: "offer",
        component: OfferPage
      },
      {
        path: "order",
        name: "order",
        component: OrderPage
      },
      {
        path: "admin",
        name: "admin",
        component: AdminPage
      }
    ]
  },
  { 
    path: "*", 
    component: NotFound 
  }
];

export default routes;
