<template>
  <div id="detail">
    <product-detail-nav-bar class="detail-nav" @titleItemClick="titleItemClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-img="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shops" />
      <detail-goods-info :detail-info="detailsInfo" @detailImgLoad="detailImgLoad" />
      <detail-param-info ref="params" :param-info="paramsInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommendList" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    
    <!-- @click只对原生元素有用，需加上.native才能对其他的组件作用 -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>
<script>
import ProductDetailNavBar from "./children/ProductDetailNavBar";
import DetailSwiper from "./children/DetailSwiper";
import DetailBaseInfo from "./children/DetailBaseInfo";
import DetailShopInfo from "./children/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./children/DetailGoodsInfo";
import DetailParamInfo from "./children/DetailParamInfo";
import DetailCommentInfo from "./children/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./children/DetailBottomBar";

import { mapActions } from "vuex";

import {
  getProductDetail,
  getRecommend,
  Goods,
  GoodsParams,
  Shop
} from "network/productDetail";
import { backTopMixin, imgListenerMixin } from "common/mixin";
import { debounce } from "common/utils";

export default {
  name: "ProductDetail",
  data() {
    return {
      detailId: null,
      // 轮播图数据
      topImages: [],
      goods: {},
      shops: {},
      detailsInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,

      //     detailClassList: [],
      //     detailIndex: 0
    };
  },
  // vue中的混入，类似于继承，只是继承是类用的，这个是对象用的
  mixins: [imgListenerMixin, backTopMixin],
  components: {
    ProductDetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll
    //   DetailImagesInfo,
    //   BackTop
  },
  // beforeCreate() {
  //   // 进入详情页隐藏tabBar
  //   this.$store.commit("setTabBarShow", false);
  // },
  created() {
    // 获取页面传过来的id
    this.detailId = this.$route.params.iid;

    // 发送网络请求
    this.getProductDetail();
    this.getRecommend();

    // 给getThemeTopY赋值(对this.getThemeTop赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 200);
  },
  mounted() {},
  // // 路由离开的时候恢复tabBar
  // beforeRouteLeave(to, from, next) {
  //   this.$store.commit("setTabBarShow", true);
  //   next();
  // },
  destroyed() {
    // 取消detail组件事件总线的监听
    this.$bus.$off("imgLoad", this.imgListenerMixin);
  },
  methods: {
    ...mapActions(['addCart']),
    // 请求详情数据
    getProductDetail() {
      getProductDetail(this.detailId).then(res => {
        const data = res.result;

        // 获取轮播图数据
        this.topImages = data.itemInfo.topImages;

        // 获取商品数据,调用封装的ES6的class
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 获取店铺数据
        this.shops = new Shop(data.shopInfo);

        // 获取下面的图片展示数据
        this.detailsInfo = data.detailInfo;

        // 获取尺寸数据
        this.paramsInfo = new GoodsParams(
          data.itemParams.info,
          data.itemParams.rule || {}
        );

        // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      });
    },
    // 请求推荐数据
    getRecommend() {
      getRecommend().then(res => {
        this.recommendList = res.data.list;
      });
    },
    detailImgLoad() {
      this.refresh();
      // 图片加载完获取classList
      this.getThemeTopY();
    },
    // navBar点击
    titleItemClick(index) {
      // 根据数组下标滚动到对应的元素内容位置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    // 添加购物车
    addToCart() {
      // 1.获取需要展示到购物车的商品信息
      const product = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        id: this.detailId
      };
      // 2.将商品数据传到购物车页面
      // this.$store.dispatch("addCart", product).then(res => {
        
      // });
      // 2.1 第二种方法,用vuex的mappActions
      this.addCart(product).then(res => {
        this.$toast.toastShow(res)
      })


    }
    //   // 获取classList
    //   getClassList() {
    //     // Array.from() 将伪数组转换成纯数组
    //     this.detailClassList = [];
    //     this.detailClassList = Array.from(document.getElementsByClassName("detail-set-scroll"));
    //     let maxValue = 10000000;
    //     this.detailClassList.push({ offsetTop: maxValue });
    //     console.log(this.detailClassList);
    //   },
    //   // 监听详情页滚动事件,并动态设置navBar的index
    //   detailScroll(position) {
    //     let detailPosition = position ? -position.y : 0;
    //     this.curPosition = detailPosition;

    //     for (let i = 0; i < this.detailClassList.length - 1; i++) {
    //       if (
    //         detailPosition >= this.detailClassList[i].offsetTop &&
    //         detailPosition < this.detailClassList[i + 1].offsetTop
    //       ) {
    //         if (this.detailIndex !== i) {
    //           this.detailIndex = i;
    //           this.$refs.detailNavBar.currentIndex = this.detailIndex;
    //         }
    //         break;
    //       }
    //     }
    //   },
    //   
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.product-detail {
  width: 100%;
  height: 100%;
}

/* BScroll固定高度和区域 */
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}

/* vue的淡入淡出动画 */
.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.3s;
}

.scroll-enter,
.scroll-leave-to {
  opacity: 0;
}

.scroll-enter-to,
.scroll-leave {
  opacity: 1;
}
</style>
