<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";


// vuex的mapGetters辅助函数知识点
import { mapGetters } from "vuex"

export default {
  name: "Cart",
  components: {
      NavBar,
      CartList,
      CartBottomBar
  },
  computed: {
      ...mapGetters(['cartLength'])
    //   第二种写法
    // ...mapGetters({
    //     // 取别名
    //     length: 'cartLength'
    // })
  },
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
