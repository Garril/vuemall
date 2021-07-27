import {
  ADD_COUNT,
  ADD_TO_CART_LIST
} from './mutation-types.js'

export default {
  addCart(context,payload) {
    // 判断是否购物车内有重复的商品
    let product = context.state.cartList.find(item =>item.iid===payload.iid);
    if(product) {
      context.commit(ADD_COUNT,product);
    } else{
      payload.count=1;
      context.commit(ADD_TO_CART_LIST,payload);
    }
  }
}