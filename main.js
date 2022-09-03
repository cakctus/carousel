;(function () {
  const slidesContainer = document.querySelector("#slides")
  const slide = document.querySelectorAll(".slide")
  const pauseButton = document.getElementById("pause")
  const next = document.querySelector("#next")
  const previous = document.querySelector("#previous")
  const stopButton = document.getElementById("stop")
  const indicatorContainer = document.getElementById("indicators")
  const indicator = document.querySelectorAll(".indicator")

  let currentSlide = 0
  let isPlaying = true

  let intervalSlider = setInterval(nextSlides, 2000)

  function nextSlides() {
    slidesMove(currentSlide + 1)
  }

  function previousSlides() {
    slidesMove(currentSlide - 1)
  }

  function slidesMove(n) {
    currentSlide = n++
    if (currentSlide > slide.length - 1) currentSlide = 0
    if (currentSlide < 0) currentSlide = 0
    for (let i = 0; i < slide.length; i++) {
      if (
        slide[i].classList.contains("active") ||
        indicator[i].classList.contains("active")
      ) {
        slide[i].classList.remove("active")
        indicator[i].classList.remove("active")
      }
    }
    slide[currentSlide].setAttribute("class", "slide active")
    indicator[currentSlide].setAttribute("class", "indicator active")
    // slide[currentSlide].className = "slide"
    // currentSlide = (n + slide.length) % slide.length
    // slide[currentSlide].className = "slide active"
  }

  function play() {
    clearInterval(intervalSlider)
    isPlaying = false
    pauseButton.innerHTML = "Play"
  }

  function stop() {
    intervalSlider = setInterval(nextSlides, 2000)
    isPlaying = true
    pauseButton.innerHTML = "Stop"
  }

  pauseButton.onclick = function () {
    if (isPlaying) {
      play()
    } else {
      stop()
    }
  }

  function mouseOverStop() {
    play()
  }

  function mouseOverPlay() {
    stop()
  }

  function nextSlide() {
    play()
    nextSlides()
  }

  function previousSlide() {
    play()
    previousSlides()
  }

  function indicate(e) {
    if (e.target && e.target.classList.contains("indicator")) {
      let indicator = +e.target.getAttribute("data-slide")
      if (isNaN(indicator)) return
      slidesMove(indicator)
      play()
    }
  }

  function keyBoard(e) {
    if (e.code === "Space") play()
    if (e.code === "ArrowRight") nextSlide()
    if (e.code === "ArrowLeft") previousSlide()
  }

  let touchMove
  let touchStart
  let touchEnd

  function swipeStart(e) {
    touchStart = e.changedTouches[0].clientX
  }

  function swipeEnd(e) {
    touchEnd = e.changedTouches[0].clientX
    touchMove = touchStart - touchEnd
    if (touchMove < -100) nextSlide()
    if (touchMove > 100) previousSlide()
  }

  function events() {
    slidesContainer.addEventListener("mouseover", mouseOverStop)
    slidesContainer.addEventListener("mouseleave", mouseOverPlay)
    next.addEventListener("click", nextSlide)
    previous.addEventListener("click", previousSlide)
    indicatorContainer.addEventListener("click", indicate)
    document.addEventListener("keydown", keyBoard)
    slidesContainer.addEventListener("touchstart", swipeStart)
    slidesContainer.addEventListener("touchend", swipeEnd)
  }

  events()
})()
