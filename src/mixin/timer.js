export default {
  created () {
    this._interval = {}
    this._timeout = {}
  },
  methods: {
    $setInterval (cb, ms, key) {
      if (this._interval[key]) {
        console.log(`${key}定时器已存在$clearInterval`)
      } else {
        this._interval[key] = setInterval(cb, ms)
      }
    },
    $clearInterval (key) {
      if (key) {
        if (this._interval[key]) {
          clearInterval(this._interval[key])
          this._interval[key] = undefined
        } else {
          console.log(`${key}定时器不存在$clearInterval`)
        }
      } else {
        let keys = Object.keys(this._interval)
        if (keys.length > 0) {
          keys.forEach(item => {
            clearInterval(this._interval[item])
          })
          this._interval = {}
        }
      }
    },
    $setTimeout (cb, ms, key) {
      if (this._timeout[key]) {
        console.log(`${key}定时器已存在$setTimeout`)
      } else {
        this._timeout[key] = setTimeout(cb, ms)
      }
    },
    $clearTimeout (key) {
      if (key) {
        if (this._timeout[key]) {
          clearTimeout(this._timeout[key])
          this._timeout[key] = undefined
        } else {
          console.log(`${key}定时器不存在$clearTimeout`)
        }
      } else {
        let keys = Object.keys(this._timeout)
        if (keys.length > 0) {
          keys.forEach(item => {
            clearTimeout(this._timeout[item])
            this._timeout[item] = undefined
          })
          this._timeout = {}
        }
      }
    }
  },
  beforeDestroy () {
    this.$clearInterval()
    this.$clearTimeout()
    this._listenters = null
  }
}
