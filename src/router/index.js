import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import ProductPage from "@/views/ProductPage.vue";
import ApiTest from "@/views/ApiTest.vue";

const router = createRouter({
  mode: "hash",
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/category/:url_key",
      name: "CategoryPage",
      component: CategoryPage,
      props: true, // Allows passing route.params as props
    },
    {
      path: "/product/:sku",
      name: "ProductPage",
      component: ProductPage,
      props: true,
    },
    {
      path: "/ApiTest",
      name: "ApiTest",
      component: ApiTest,
    },
  ],
});

export default router;