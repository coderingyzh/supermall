<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in topImg" :key="index" >
        <img :src="item" @load="swiperLoad" alt="" />
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  props: {
    topImg: {
      type: Array,
      // default默认值需要一个函数return一个默认值
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: true
    };
  },
  methods: {
    swiperLoad() {
      if (this.isLoad) {
        this.$emit("swiperLoad");
        this.isLoad = false;
      }
    }
  }
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
