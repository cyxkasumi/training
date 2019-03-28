export default {
  created () {
    this._listenters = []
  },
  methods: {
    // options:true是捕获（由外往内传递时）  false是冒泡（由内向外传递时）  默认为false
    // 例如： $addEventListener（this.$el.refs.cont, 'click', ()=>{}）
    $addEventListener (target, type, listener, option) {
      target.addEventListener(type, listener)
      this._listenters = this._listenters.concat({
        target, type, listener, option
      })
    },
    $removeEventListener (target, type, listener, option) {
      target.removeEventListener(type, listener, option)
      this._listenters = this._listenters.filter(data => {
        return !(data.target === target && data.type === type && data.listener === listener)
      })
    },
    // 根据条件移除事件
    $removeEventListenersByCondition (fn) {
      this.$removeEventListeners(this._listenters.filter(fn))
    },
    $removeEventListeners (listenters) {
      listenters.forEach(({target, type, listener, options}) => this.$removeEventListener(target, type, listener, options))
    }
  },
  beforeDestroy () {
    this.$removeEventListeners(this._listenters)
    this._listenters = null
  }
}
