<template>
  <!-- ref如果是绑定在组件中的，那么通过this.$refs.绑定的名字，获取到的是一个组件的对象
  ref如果是绑定在普通元素(div 等)中的，那么通过this.$refs.绑定的名字，获取到的是一个元素的对象-->
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 滚动用到的插件
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: {
        type: Object,
        default() {
          return {};
        }
      }
    };
  },
  //接收父组件来的值
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 默认值为0
      // 作用：有时候我们需要知道滚动的位置。当probeType为1的时候,会非实时(屏幕滑动超过一定时间后)派发scroll事件;
      // 当probeType为2的时候,会在屏幕滑动的过程中实时的派发scroll事件；当probeType为3的时候,不仅在屏幕滑动的过程中,
      // 而且在momentum滚动动画运行过程中实时派发scroll事件。
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动的位置
    this.scroll.on("scroll", postion => {
      this.$emit("scroll", postion);
    });

    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });



  },
  methods: {
    // ES6语法可以这样写，直接传一个默认值
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped>
</style>
