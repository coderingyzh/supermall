export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每一个方法尽可能完成的事件比较淡单一点
    addCount(state, payload) {
      payload.count ++;
    },
    addToCart(state, payload) {
      payload.checked = true;
      state.cartList.push(payload);
    }
  }