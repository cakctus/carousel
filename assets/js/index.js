import Swipe from "./swipe.js"

const carousel = new Swipe({
  container: ".carousel",
  // slides: "#slides",
  // slide: ".slide",
  interval: 1000,
  // isPlaying: true,
})

carousel.init()

export default carousel
