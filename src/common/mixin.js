import { debounce } from "./utils";

import BackTop from "components/content/backTop/BackTop";

export const imgListenerMixin = {
  data() {
    return {
      // 监听图片
      imgListener: null,
      refresh: null
    };
  },
  mounted() {
    /**
     * 监听goodsListItem中图片加载完成
     * 本来this.$refs.scroll.refresh()函数会在加载一个图片就执行一次刷新，
     * 但是在debounce函数中会在200毫秒内只执行一次刷新，200毫秒内可能会加载好几张图片，但还是只执行一次刷新，
     * 这样就可以减少刷新的频数，减少服务器的压力
     * 刷新一次就重新计算一下scrollHeight的高度，使网络延迟加载的数据加载进来后变化scrollHeight的高度
     * this.$refs.scroll.refresh();
     */
    // 给防抖函数赋值一个新的函数
    this.refresh = debounce(this.$refs.scroll.refresh, 100);

    // 接收发射的事件总线,并用监听图片变量保存
    this.imgListener = () => {
      this.refresh();
    };
    this.$bus.$on("goodsListItemImgLoad", this.imgListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    // 回到顶部
    backTop() {
      // 调用子组件里面封装的scrollTo方法即可
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
