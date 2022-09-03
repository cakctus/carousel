function Swipe() {
  Carousel.apply(this, arguments)
}

Swipe.prototype = Object.create(Carousel.prototype)

Swipe.prototype.constructor = Swipe
;(Swipe.prototype._swipeStart = function (e) {
  this.touchStart = e.changedTouches[0].clientX
}),
  (Swipe.prototype._swipeEnd = function (e) {
    this.touchEnd = e.changedTouches[0].clientX
    this.touchMove = this.touchStart - this.touchEnd
    if (this.touchMove < -100) this._nextSlide()
    if (this.touchMove > 100) this._previousSlide()
  }),
  (Swipe.prototype._events = function () {
    Carousel.prototype._events.apply(this)
    this.slidesContainer.addEventListener(
      "touchstart",
      this._swipeStart.bind(this)
    )
    this.slidesContainer.addEventListener("touchend", this._swipeEnd.bind(this))
  })
