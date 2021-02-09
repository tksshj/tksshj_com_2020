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
      points: []
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
      this.points.push({x: this.p5.width * 0.5, y: this.p5.height * 0.5, c: 200})
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      let wh = Math.max(this.p5.width, this.p5.height)
      this.p5.strokeWeight(wh * 0.1)

      if (256 < this.points.length) {
        this.points = [{x: this.p5.width * 0.5, y: this.p5.height * 0.5, c: 200}]
      }
      let lastPoint = this.points[this.points.length - 1]
      let x = Math.min(this.p5.width,
                       Math.max(0,
                                lastPoint.x + this.p5.random(this.p5.width * 0.2) * (this.p5.random(100) < 50 ? 1 : -1)))
      let y = Math.min(this.p5.height,
                       Math.max(0,
                                lastPoint.y + this.p5.random(this.p5.height * 0.2) * (this.p5.random(100) < 50 ? 1 : -1)))
      let c = 128 + this.p5.random(255 - 128)
      this.points.push({ x: x, y: y, c: c})

      for (let i = 0; i < this.points.length - 1; i++) {
        let p1 = this.points[i]
        let p2 = this.points[i + 1]
        this.p5.stroke(p1.c)
        this.p5.line(p1.x, p1.y, p2.x, p2.y)
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
