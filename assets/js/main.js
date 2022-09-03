function Carousel() {
  this.slidesContainer = document.querySelector("#slides")
  this.slide = document.querySelectorAll(".slide")
  this.pauseButton = document.getElementById("pause")
  this.next = document.querySelector("#next")
  this.previous = document.querySelector("#previous")
  this.stopButton = document.getElementById("stop")
  this.indicatorContainer = document.getElementById("indicators")
  this.indicator = document.querySelectorAll(".indicator")

  this.interval = 2000
  this.currentSlide = 0
  // this.isPlaying = true
  // this.intervalSlider
  // this.touchMove
  // this.touchStart
  // this.touchEnd
}

Carousel.prototype = {
  nextSlides() {
    this.slidesMove(this.currentSlide + 1)
  },

  previousSlides() {
    this.slidesMove(this.currentSlide - 1)
  },

  slidesMove(n) {
    this.currentSlide = n++
    if (this.currentSlide > this.slide.length - 1) this.currentSlide = 0
    if (this.currentSlide < 0) this.currentSlide = 0
    for (let i = 0; i < this.slide.length; i++) {
      if (
        this.slide[i].classList.contains("active") ||
        this.indicator[i].classList.contains("active")
      ) {
        this.slide[i].classList.remove("active")
        this.indicator[i].classList.remove("active")
      }
    }
    this.slide[this.currentSlide].setAttribute("class", "slide active")
    this.indicator[this.currentSlide].setAttribute("class", "indicator active")
    // slide[currentSlide].className = "slide"
    // currentSlide = (n + slide.length) % slide.length
    // slide[currentSlide].className = "slide active"
  },

  play() {
    clearInterval(this.intervalSlider)
    this.isPlaying = false
    this.pauseButton.innerHTML = "Play"
  },

  stop() {
    this.intervalSlider = setInterval(this.nextSlides.bind(this), this.interval)
    this.isPlaying = true
    this.pauseButton.innerHTML = "Stop"
  },

  stopPlay() {
    if (this.isPlaying) {
      this.play()
    } else {
      this.stop()
    }
  },

  mouseOverStop() {
    this.play()
  },

  mouseOverPlay() {
    this.stop()
  },

  _nextSlide() {
    this.play()
    this.nextSlides()
  },

  _previousSlide() {
    this.play()
    this.previousSlides()
  },

  _indicate(e) {
    if (e.target && e.target.classList.contains("indicator")) {
      const indicator = +e.target.getAttribute("data-slide")
      if (isNaN(indicator)) return
      this.slidesMove(indicator)
      this.play()
    }
  },

  _keyBoard(e) {
    if (e.code === "Space") this.play()
    if (e.code === "ArrowRight") this._nextSlide()
    if (e.code === "ArrowLeft") this._previousSlide()
  },

  // _swipeStart(e) {
  //   this.touchStart = e.changedTouches[0].clientX
  // },

  // _swipeEnd(e) {
  //   this.touchEnd = e.changedTouches[0].clientX
  //   this.touchMove = this.touchStart - this.touchEnd
  //   if (this.touchMove < -100) this._nextSlide()
  //   if (this.touchMove > 100) this._previousSlide()
  // },

  _events() {
    this.slidesContainer.addEventListener(
      "mouseover",
      this.mouseOverStop.bind(this)
    )
    this.slidesContainer.addEventListener(
      "mouseleave",
      this.mouseOverPlay.bind(this)
    )
    this.pauseButton.addEventListener("click", this.stopPlay.bind(this))
    this.next.addEventListener("click", this._nextSlide.bind(this))
    this.previous.addEventListener("click", this._previousSlide.bind(this))
    this.indicatorContainer.addEventListener("click", this._indicate.bind(this))
    document.addEventListener("keydown", this._keyBoard.bind(this))
    // this.slidesContainer.addEventListener(
    //   "touchstart",
    //   this._swipeStart.bind(this)
    // )
    // this.slidesContainer.addEventListener("touchend", this._swipeEnd.bind(this))
  },

  init() {
    this.intervalSlider = setInterval(() => this.nextSlides(), this.interval)
    this._events()
  },
}

Carousel.prototype.constructor = Carousel

function Swipe() {
  Carousel.apply(this, arguments)
}

Swipe.prototype = Object.create(Carousel.prototype)
Swipe.prototype.constructor = Swipe
;(Swipe.prototype._swipeStart = function (e) {
  this.touchStart = e.changedTouches[0].clientX
  console.log("x")
}),
  (Swipe.prototype._swipeEnd = function (e) {
    this.touchEnd = e.changedTouches[0].clientX
    this.touchMove = this.touchStart - this.touchEnd
    if (this.touchMove < -100) this._nextSlide()
    if (this.touchMove > 100) this._previousSlide()
    console.log("x")
  }),
  (Swipe.prototype._events = function () {
    Carousel.prototype._events.apply(this)
    this.slidesContainer.addEventListener(
      "touchstart",
      this._swipeStart.bind(this)
    )
    this.slidesContainer.addEventListener("touchend", this._swipeEnd.bind(this))
  })

const carousel = new Swipe()
// const swipe = new Swipe()
console.dir(carousel)
carousel.init()

// ;(function () {
//   const slidesContainer = document.querySelector("#slides")
//   const slide = document.querySelectorAll(".slide")
//   const pauseButton = document.getElementById("pause")
//   const next = document.querySelector("#next")
//   const previous = document.querySelector("#previous")
//   const stopButton = document.getElementById("stop")
//   const indicatorContainer = document.getElementById("indicators")
//   const indicator = document.querySelectorAll(".indicator")

//   let currentSlide = 0
//   let isPlaying = true

//   let intervalSlider
//   let init = function (callback) {
//     intervalSlider = setInterval(nextSlides, 2000)
//     callback()
//   }

//   function nextSlides() {
//     slidesMove(currentSlide + 1)
//   }

//   function previousSlides() {
//     slidesMove(currentSlide - 1)
//   }

//   function slidesMove(n) {
//     currentSlide = n++
//     if (currentSlide > slide.length - 1) currentSlide = 0
//     if (currentSlide < 0) currentSlide = 0
//     for (let i = 0; i < slide.length; i++) {
//       if (
//         slide[i].classList.contains("active") ||
//         indicator[i].classList.contains("active")
//       ) {
//         slide[i].classList.remove("active")
//         indicator[i].classList.remove("active")
//       }
//     }
//     slide[currentSlide].setAttribute("class", "slide active")
//     indicator[currentSlide].setAttribute("class", "indicator active")
//     // slide[currentSlide].className = "slide"
//     // currentSlide = (n + slide.length) % slide.length
//     // slide[currentSlide].className = "slide active"
//   }

//   function play() {
//     clearInterval(intervalSlider)
//     isPlaying = false
//     pauseButton.innerHTML = "Play"
//   }

//   function stop() {
//     intervalSlider = setInterval(nextSlides, 2000)
//     isPlaying = true
//     pauseButton.innerHTML = "Stop"
//   }

//   pauseButton.onclick = function () {
//     if (isPlaying) {
//       play()
//     } else {
//       stop()
//     }
//   }

//   function mouseOverStop() {
//     play()
//   }

//   function mouseOverPlay() {
//     stop()
//   }

//   function nextSlide() {
//     play()
//     nextSlides()
//   }

//   function previousSlide() {
//     play()
//     previousSlides()
//   }

//   function indicate(e) {
//     if (e.target && e.target.classList.contains("indicator")) {
//       let indicator = +e.target.getAttribute("data-slide")
//       if (isNaN(indicator)) return
//       slidesMove(indicator)
//       play()
//     }
//   }

//   function keyBoard(e) {
//     if (e.code === "Space") play()
//     if (e.code === "ArrowRight") nextSlide()
//     if (e.code === "ArrowLeft") previousSlide()
//   }

//   let touchMove
//   let touchStart
//   let touchEnd

//   function swipeStart(e) {
//     touchStart = e.changedTouches[0].clientX
//   }

//   function swipeEnd(e) {
//     touchEnd = e.changedTouches[0].clientX
//     touchMove = touchStart - touchEnd
//     if (touchMove < -100) nextSlide()
//     if (touchMove > 100) previousSlide()
//   }

//   function events() {
//     slidesContainer.addEventListener("mouseover", mouseOverStop)
//     slidesContainer.addEventListener("mouseleave", mouseOverPlay)
//     next.addEventListener("click", nextSlide)
//     previous.addEventListener("click", previousSlide)
//     indicatorContainer.addEventListener("click", indicate)
//     document.addEventListener("keydown", keyBoard)
//     slidesContainer.addEventListener("touchstart", swipeStart)
//     slidesContainer.addEventListener("touchend", swipeEnd)
//   }

//   init(events())
// })()
