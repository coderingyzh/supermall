<template>
  <div id="app">
    <!-- keep-alive会保存创建的组件，组件会被缓存起来，再次跳转到组件时，就不会被再次创建.
    include: 只有匹配的组件会被缓存
    exclude: 只有匹配的组件不会被缓存：<keep-alive exclude='组件的name属性'>-->
    <keep-alive exclude="ProductDetail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>
