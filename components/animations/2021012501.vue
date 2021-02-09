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
      lastColor: 0
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
      this.p5.frameRate(3)
      this.reset()
    },
    reset() {
      this.lastColor = 255 - 255 / this.p5.random(5)
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      this.p5.stroke(192)

      let color = 255
      let radius = this.p5.random(100)
      for (let i = 0; i < 10; i++) {
        this.p5.fill(255 - 10 * i * this.p5.random(10) * 0.1)

        this.p5.translate(this.p5.width * 0.5, this.p5.height * 0.5)
        this.p5.rotate(this.p5.PI * 0.1 / this.p5.random(100) * i)
        this.p5.translate(-this.p5.width * 0.5, -this.p5.height * 0.5)

        this.p5.rect(this.p5.width * 0.05 * i,
                     this.p5.height * 0.05 * i,
                     this.p5.width * (1.0 - 0.1 * i),
                     this.p5.height * (1.0 - 0.1 * i),
                     radius)
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
