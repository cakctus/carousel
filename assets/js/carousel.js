class Carousel {
  constructor(params) {
    this._initParams(params)
    this.container = document.querySelector(this._initParams().container)
    this.slidesContainer = document.querySelector(this._initParams().slides)
    this.slide = document.querySelectorAll(this._initParams().slide)

    this.interval = 2000
    this.currentSlide = 0
  }

  _initParams(params) {
    const defaultObject = {
      container: ".carousel",
      slides: "#slides",
      slide: ".slide",
      interval: 1000,
      isPlaying: true,
    }
    console.log({ ...defaultObject, ...params })
    return { ...defaultObject, ...params }
  }

  _controls() {
    this.div = document.createElement("div")
    this.div.setAttribute("id", "controls")
    this.div.setAttribute("class", "controls")
    let stopB =
      '<span class="control control-stop" id="pause"><i class="fa-solid fa-stop"></i></span>'
    let previousB =
      '<span class="control control-previous" id="previous"><i class="fa-solid fa-angle-left"></i></span>'
    let nextB =
      '<span class="control control-next" id="next"><i class="fa-solid fa-angle-right"></i></span>'
    this.div.innerHTML = stopB + previousB + nextB
    this.container.append(this.div)

    this.next = document.querySelector("#next")
    this.previous = document.querySelector("#previous")
    this.stopButton = document.getElementById("stop")
    this.pauseButton = document.getElementById("pause")
  }

  _indicators() {
    let div = document.createElement("div")
    div.setAttribute("id", "indicators")
    div.setAttribute("class", "indicators")

    for (let i = 0; i < this.slide.length; i++) {
      let span = document.createElement("span")
      span.setAttribute("id", "indicator")
      span.setAttribute(
        "class",
        `${i === 0 ? "indicator active" : "indicator"}`
      )
      span.setAttribute("data-slide-to", i)
      div.append(span)
    }
    this.container.append(div)
    this.indicatorContainer = document.getElementById("indicators")
    this.indicator = document.querySelectorAll(".indicator")
  }

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
  }

  init() {
    this._controls()
    this._indicators()
    this._events()
    this.intervalSlider = setInterval(() => this.nextSlides(), this.interval)
  }

  nextSlides() {
    this.slidesMove(this.currentSlide + 1)
  }

  previousSlides() {
    this.slidesMove(this.currentSlide - 1)
  }

  slidesMove(n) {
    this.currentSlide = n++
    if (this.currentSlide > this.slide.length - 1) this.currentSlide = 0
    if (this.currentSlide < 0) this.currentSlide = this.slide.length - 1
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
  }

  play() {
    clearInterval(this.intervalSlider)
    this.isPlaying = false
    this.pauseButton.innerHTML = '<i class="fa-solid fa-play"></i>'
  }

  stop() {
    this.intervalSlider = setInterval(this.nextSlides.bind(this), this.interval)
    this.isPlaying = true
    this.pauseButton.innerHTML = '<i class="fa-solid fa-stop"></i>'
  }

  stopPlay() {
    if (this.isPlaying) {
      this.play()
    } else {
      this.stop()
    }
  }

  mouseOverStop() {
    this.play()
  }

  mouseOverPlay() {
    this.stop()
  }

  _nextSlide() {
    this.play()
    this.nextSlides()
  }

  _previousSlide() {
    this.play()
    this.previousSlides()
  }

  _indicate(e) {
    if (e.target && e.target.classList.contains("indicator")) {
      const indicator = +e.target.dataset.slideTo
      if (isNaN(indicator)) return
      this.slidesMove(indicator)
      this.play()
    }
  }

  _keyBoard(e) {
    if (e.code === "Space") this.stopPlay()
    if (e.code === "ArrowRight") this._nextSlide()
    if (e.code === "ArrowLeft") this._previousSlide()
  }
}

export default Carousel
