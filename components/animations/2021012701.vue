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
      l: 0,
      nX: 0,
      nY: 0,
      rs: []
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
      this.p5.frameRate(30)
      this.reset()
    },
    reset() {
      this.l = Math.max(this.p5.width, this.p5.height) * 0.1
      this.nY = Math.ceil(this.p5.height / this.l)
      this.nX = Math.ceil(this.p5.width / this.l)
      this.rs = Array(this.nY * this.nX)
      this.rs.splice(0)
      for (let y = 0; y < this.nY; y++) {
        for (let x = 0; x < this.nX; x++) {
          this.rs[y * this.nX + x] = this.p5.random(this.l * 0.5)
        }
      }
    },
    draw() {
      this.p5.clear()
      this.p5.background(216)

      this.p5.stroke(192)

      for (let y = 0; y < this.p5.height / this.l; y++) {
        for (let x = 0; x < this.p5.width / this.l; x++) {
          this.p5.rect(x * this.l,
                       y * this.l,
                       this.l,
                       this.l,
                       this.rs[this.nX * y + x])
          let r = this.rs[this.nX * y + x] + this.l * 0.5 / 30.0
          this.rs[this.nX * y + x] = r < this.l * 0.5 ? r : this.p5.random(this.l * 0.5)
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
