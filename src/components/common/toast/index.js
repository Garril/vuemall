import Toast from './Toast.vue'

const obj = {}

obj.install = function(Vue) { // 默认会把 Vue 作为参数传过来
  // 创建组件构造器  
  const toastContrustor = Vue.extend(Toast)
  // 创建组件对象
  const toast = new toastContrustor()
  // 对象手动挂载
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast; // 这里赋值注意，应该为9行创建的组件,
}

export default obj