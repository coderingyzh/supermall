<template>
  <div>
    <nav-bar>
      <div @click="backHomePage" class="back-img" slot="left">
        <img alt="" src="~assets/img/common/back.svg" />
      </div>
      <div class="title" slot="center">
        <div
          class="title-item"
          v-for="(item, index) in titles"
          :class="{ active: index === currentIndex }"
          :key="index"
          @click="titleItemClick(index)">
        {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "ProductDetailNavBar",
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index;
      this.$emit("titleItemClick", index);
    },
    backHomePage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back-img img {
  position: relative;
  top: 5px;
}
</style>
