<template>
    <div class="goods-list">
      <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    props:{
        goods:{
            type:Array,
            default() {
                return []
            }
        }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    /* 如果元素不是弹性盒对象的元素,则flex-wrap属性不起作用。wrap:规定灵活的项目在必要的时候拆行或拆列。 */
    flex-wrap: wrap;
    /* justify-content用于设置或检索弹性盒子元素在主轴(横轴)方向上的对齐方式。
        space-around:项目位于各行之前、之间、之后都留有空白的容器内。中间的空白是最两边空白的两倍
    */
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 2px;
  }

</style>
