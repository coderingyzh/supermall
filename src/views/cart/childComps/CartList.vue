<template>
  <div class="cart-list">
    <scroll class="scroll-height" ref="scroll">
      <cart-list-item  v-for="(item,index) in cartList" :product="item" :key="index" />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    // 刷新better-scroll
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}

.scroll-height {
  height: 100%;
  overflow: hidden;
}
</style>
