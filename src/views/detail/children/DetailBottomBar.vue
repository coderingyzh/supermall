<template>
  <div class="detail-bottom-bar">
    <div class="left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .detail-bottom-bar {
    background-color: #fff;
    height: 49px;

    position: fixed;
    left: 0;
    right: 0;
    /* position: relative; */

    display: flex;
    text-align: center;


  }
  .left {
    width: 50%;
  }
  .left,.right {
    display: flex;
  }
  .left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 9px 10px 0px 12px;
    background:url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }
  .left .shop {
    background-position: 0 50px;
  }
  .left .service {
    background-position: 0 96px;
  }
  .text {
    font-size: 14px;
  }
  .cart {
    height: 49px;
    width: 94px;
    background-color: #fff737;
    text-align: center;
    color:#666;
    font-size: 16px;
    line-height: 49px;
  }
  .buy {
    height: 49px;
    width: 94px;
    background-color: var(--color-tint);
    text-align: center;
    color:#fff;
    font-size:16px;
    line-height: 49px;
  }
</style>
