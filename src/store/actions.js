export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找之前数组中是否有商品
      let oldProduct = context.state.cartList.find(item => item.id === payload.id)
      // 判断oldProduct
      if (oldProduct) {
        context.commit('addCount', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1;
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}