import {
  ADD_COUNT,
  ADD_TO_CART_LIST
} from './mutation-types.js'

export default {
  [ADD_COUNT](state,payload) {
    payload.count++;
  },
  [ADD_TO_CART_LIST](state,payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
}