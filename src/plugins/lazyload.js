import { getScrollParent } from '../utils/utils'
class Lazyload {
  constructor () {
    this.init()
  }
  init () {
    this.images = []
    this.scrollParent = []
    this.clientH = document.body.clientHeight + document.documentElement.clientHeight
    this._timer = ''
  }
  addImages (el) {
    if (!el.tagName || el.tagName.toLowerCase() !== 'img') return
    let parent = getScrollParent(el)
    this.images.push({
      img: el,
      show: false,
      scrollParent: parent
    })
    this.images.forEach((val) => {
      this.checkInView(val)
    })
    if (this.scrollParent.findIndex((val) => val === parent) === -1) {
      this.scrollParent.push(parent)
      this.addScrollListener(parent)
    }
  }
  addScrollListener (el) {
    const self = this
    el.addEventListener('scroll', () => {
      clearTimeout(self._timer)
      self._timer = setTimeout(() => {
        let imgs = this.images.filter((val) => val.scrollParent === el)
        imgs.forEach((val) => {
          if (!val.show) {
            self.checkInView(val)
          }
        })
      }, 500)
    })
  }
  checkInView (imgObj) {
    let scrollTop = 0
    if (imgObj.scrollParent === window) {
      scrollTop = document.documentElement.scrollTop + document.body.scrollTop
    } else {
      scrollTop = imgObj.scrollParent.scrollTop
    }
    if ((imgObj.img.offsetTop - scrollTop) < this.clientH) {
      imgObj.show = true
      let img = imgObj.img.dataset.src
      imgObj.img.src = img
    }
  }
}
export default function install (Vue) {
  let lazyLoad = new Lazyload()
  Vue.prototype.$lazyLoad = lazyLoad
}
