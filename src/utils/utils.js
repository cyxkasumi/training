// 获取滚动条所在节点  可能是overflow的
export const getScrollParent = (el) => {
  if (!(el instanceof HTMLElement)) {
    console.log('不是HTMLElement')
    return
  }
  let parent = el
  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      return window
    }
    if (cheakOverflow(parent)) {
      return parent
    }
    if (!parent) { return }
    parent = parent.parentNode
  }
  return parent
}
// 检查元素是否有 overflow  滚动条
export const cheakOverflow = (el) => {
  if (!el || el === window) { // window不能用getComputedStyle
    return null
  }
  if (getComputedStyle(el).overflowY === 'auto' || getComputedStyle(el).overflowY === 'scroll') {
    return true
  }
}

export const random = (min, max) => {
  return Math.random() * (max - min) + min
}
