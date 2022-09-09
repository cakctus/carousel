import Carousel from "./carousel.js"

class Swipe extends Carousel {
  _swipeStart(e) {
    this.touchStart = e.changedTouches[0].clientX
  }
  _swipeEnd(e) {
    this.touchEnd = e.changedTouches[0].clientX
    this.touchMove = this.touchStart - this.touchEnd
    if (this.touchMove < -100) this._nextSlide()
    if (this.touchMove > 100) this._previousSlide()
  }
  _events() {
    super._events()
    this.slidesContainer.addEventListener(
      "touchstart",
      this._swipeStart.bind(this)
    )
    this.slidesContainer.addEventListener("touchend", this._swipeEnd.bind(this))
  }
}

export default Swipe
