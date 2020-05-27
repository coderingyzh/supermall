import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Category = () => import('views/category/Category.vue')
const ProductDetail = () => import('views/detail/ProductDetail.vue')


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      // 指定的组件
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/productDatail/:iid',
      component: ProductDetail
    },
  ] 

const router = new VueRouter({
  // url模式
  mode: 'history',
  routes
})

export default router
