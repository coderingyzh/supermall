<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="isStyleActive">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String
    },
    activeStyle: {
      type: String,
      default: "coral"
    }
  },
  data() {
    return {};
  },
  methods: {
    itemClick() {
      // 点击两下会报异常，需要捕获
      this.$router.replace(this.path).catch(err => {});
    }
  },
  computed: {
    isActive() {
      // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
      return this.$route.path.indexOf(this.path) !== -1;
    },
    isStyleActive() {
      return this.isActive ? { color: this.activeStyle } : {};
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  color: black;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin: 4px 0 2px 0;
}

.actived {
  color: coral;
  font-weight: bolder;
}
</style>
