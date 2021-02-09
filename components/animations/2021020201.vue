<template>
  <div ref="tcAnimation" id="tc-animation" class="tc-animation" />
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
    sketch(p5) {
      this.p5 = p5
      this.p5.setup = this.setup
      this.p5.draw = this.draw
      this.p5.windowResized = this.windowResized
    },
    setup() {
      this.p5.createCanvas(this.$refs.tcAnimation.clientWidth, this.$refs.tcAnimation.clientHeight)
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
            color: 255 - this.p5.random(64),
            r: this.p5.random(360),
            rs: this.p5.random(10)
          })
        }
      }
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      for (let i = 0; i < this.squares.length; i++) {
        this.p5.push()

        let square = this.squares[i]
        this.p5.strokeWeight(square.borderWidth)
        this.p5.stroke(square.color)

        this.p5.translate(square.x, square.y)
        this.p5.rotate(square.r / 180 * Math.PI)
        this.p5.translate(-square.w * 0.5, -square.w * 0.5)

        this.p5.rect(0, 0, square.w, square.w)
        square.borderWidth -= 2
        if (square.borderWidth <= 0) {
          square.borderWidth = this.p5.random(square.w)
        }
        square.color -= 1
        if (square.color <= 255 - 64) {
          square.color = 255 - this.p5.random(64)
        }
        square.r += square.rs

        this.p5.pop()
      }
    },
    windowResized() {
      this.p5.resizeCanvas(this.$refs.tcAnimation.clientWidth, this.$refs.tcAnimation.clientHeight)
      this.reset()
    }
  },
  mounted() {
    this.p5App = new P5(this.sketch, 'tc-animation')
  },
  beforeDestroy() {
    this.p5.remove()
  }
}
</script>

<style scoped lang="scss">
.tc-animation {
  width: 100%;
  height: 100%;
}
</style>
