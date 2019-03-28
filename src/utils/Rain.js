import { random } from '../utils/utils'
class Rain {
  constructor (ctx, color, speed, size) {
    this.init(ctx, color, speed, size)
  }
  init (ctx, color, speed, size) {
    if (!ctx) { return }
    if (!color) { color = '#fff' }
    if (!speed) { speed = 10 }
    if (!size) { size = 2 }
    this.x = random(0, window.innerWidth)
    this.y = random(0, window.innerHeight)
    this.rainH = random(this.y, window.innerHeight)
    this.color = color
    this.speed = speed
    this.size = size
    this.ctx = ctx
  }
  draw () {
    if (this.y < this.rainH) {
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.color
      this.ctx.lineWidth = this.size
      this.ctx.moveTo(this.x, this.y)
      this.y = this.y + this.speed
      this.ctx.lineTo(this.x, this.y)
      this.ctx.stroke()
    } else {
      this.init(this.ctx, this.color, this.speed)
    }
  }
}
export default Rain
