<template>
  <div id="tc-animation" class="tc-animation" />
</template>

<script>
import * as P5 from 'p5'

export default {
  data() {
    return {
      p5App: null,
      p5: null,
      squares: []
    }
  },
  methods: {
    setupPage() {
      this.p5App = new P5(this.sketch, 'tc-animation')
    },
    sketch(p5) {
      this.p5 = p5
      this.p5.setup = this.setup
      this.p5.draw = this.draw
      this.p5.windowResized = this.windowResized
    },
    setup() {
      this.p5.createCanvas(window.innerWidth, window.innerHeight)
      this.p5.frameRate(20)
      this.reset()
    },
    reset() {
      this.squares.splice(0)
      let w = Math.max(this.p5.width, this.p5.height) * 0.1
      for (let y = 0; y < (this.p5.height / w + 1); y++) {
        for (let x = 0; x < (this.p5.width / w + 1); x++) {
          this.squares.push({
            x: w * x,
            y: w * y,
            w: w,
            borderWidth: this.p5.random(w),
            color: 255 - this.p5.random(64)
          })
        }
      }
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.strokeWeight(square.borderWidth)
        this.p5.stroke(square.color)
        this.p5.rect(square.x, square.y, square.w, square.w)

        square.borderWidth -= 2
        if (square.borderWidth <= 0) {
          square.borderWidth = this.p5.random(square.w)
        }
        square.color -= 1
        if (square.color <= 255 - 64) {
          square.color = 255 - this.p5.random(64)
        }
      }
    },
    windowResized() {
      this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight)
      this.reset()
    }
  },
  mounted() {
    this.setupPage()
  },
  beforeDestroy() {
    this.p5.remove()
  }
}
</script>

<style scoped lang="scss">
.tc-animation {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
