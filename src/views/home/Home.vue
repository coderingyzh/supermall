<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control
        class="tab-control"
        ref="tabControl1"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        v-show="isTabFixed"
      />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loading"
    >
      <home-swiper :banners="banners" @homeSwiperImg="homeSwiperImgLoad" />
      <home-recommend :recommends="recommends" />
      <home-featurn />
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- @click只对原生元素有用，需加上.native才能对其他的组件作用 -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeaturn from "./childComps/HomeFeature";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { imgListenerMixin, backTopMixin } from "common/mixin";


export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFeaturn,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [imgListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabControlTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // created：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  // mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  created() {
    // 请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
  },
  activated() {
    this.$refs.scroll.refresh();
    // 离开home组件记录离开时的位置信息
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 进入home组件时，回到记录的位置
    this.saveY = this.$refs.scroll.scroll.y;
    // 取消全局事件的监听
    this.$bus.$off('goodsListItemImgLoad', this.homeGoddsListItem)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让两个tab-control同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 决定tabControl是否吸顶(position：fixed)
      // 但是在better-scroll插件里，虽然设置了fixed，但是也会随着better-scroll一起滚动
      // 所有我多复制了一份TabControl组件对象来实现停留效果，当用户滚动大于一定位置时显示出来TabControl组件,
      // 当用户滚动下于一定位置时,隐藏起来
      this.isTabFixed = -position.y > this.tabControlTop;
    },
    loading() {
      this.getHomeGoods(this.currentType);
    },
    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性 $el：用于获取组件中的元素
    homeSwiperImgLoad() {
      this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      // 函数调用时，压入函数栈中(保存函数调用过程中所有的变量)
      // 函数调用结束，弹出函数栈(释放函数中所有数据)
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // push(...数组): 就是把数组里的数据一个一个解析出来然后在push到另一个数组里
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* 视口高度 */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
