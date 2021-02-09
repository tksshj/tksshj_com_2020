<template>
  <div ref="tcAnimation" id="tc-animation" class="tc-animation"></div>
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
      this.reset()
    },
    reset() {
      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256)
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2
      this.squares.splice(0)
      for (let row = 0; row < nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles + 2; col++) {
          this.squares.push({
            x: tileWidth * col,
            y: tileWidth * row,
            width: tileWidth,
            c: this.p5.random(32, 64),
            m: this.p5.random(40, 80),
            dx: this.p5.random(-4, 4),
            dy: this.p5.random(-4, 4)
          })
        }
      }
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)
      this.p5.stroke(216)
      this.p5.strokeWeight(1)
      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        let x = square.x
        let y = square.y
        this.p5.push()
        this.p5.translate(x, y)
        let c = square.c + this.p5.random(-10, 10)
        square.c = Math.max(32, Math.min(64, c))

        let f = this.p5.frameCount % parseInt(square.m)
        let r = f < (square.m / 2.0) ? f : square.m - f
        let rx = x / 4.0 + square.dx * r
        let ry = y / 4.0 + square.dy * r

        for (let j = 0; j < 8; j++) {
          this.p5.fill(255 - c * 1.0 / 5 * j)
          this.p5.circle(rx, ry, square.width * (2.0 - 0.2 * j))
        }

        this.p5.pop()

        if (this.p5.frameCount % parseInt(square.m) == 0) {
          square.dx = this.p5.random(-4, 4)
          square.dy = this.p5.random(-4, 4)
        }
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
