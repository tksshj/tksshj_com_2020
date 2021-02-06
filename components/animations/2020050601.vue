<template>
  <div id="tc-animation" class="tc-animation" />
</template>

<script>
import * as P5 from 'p5'
import * as Tone from "tone"
import TWEEN from '@tweenjs/tween.js'

export default {
  props: [
    'playing'
  ],
  data() {
    return {
      toneStarted: 0,
      player: null,
      p5App: null,
      p5: null,
      n: 0,
      circles: []
    }
  },
  watch: {
    playing(newVal, oldVal) {
      this.setupTone()
      this.inc = 0
      this.n = 0
      Tone.Transport.toggle()
    }
  },
  methods: {
    setupTone() {
      if (!this.toneStated) {
        this.toneStated = true
        Tone.start()
        Tone.Transport.bpm.rampTo(80, 4)
        Tone.Transport.scheduleRepeat((time) => {
          Tone.Draw.schedule(() => {
            this.drawNote()
          }, time)
        }, "8n", 0);
        this.player = new Tone.Player("/2020050601.mp3", () => {
          this.player.loop = true
          this.player.sync().start()
        }).toMaster()
      }
    },
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
      this.p5.createCanvas(window.innerWidth, window.innerHeight, this.p5.WEBGL)
      this.p5.frameRate(30)
      this.reset()
    },
    reset() {
      let w = Math.max(this.p5.windowWidth, this.p5.windowHeight) * 0.2
      this.circles.splice(0)
      for (let i = 0; i < 128; i++) {
        let circle = {
          x: this.p5.random(this.p5.windowWidth) - this.p5.windowWidth * 0.5,
          y: this.p5.random(this.p5.windowHeight * 1.2) - this.p5.windowHeight * 0.6,
          w: this.p5.random(Math.max(this.p5.windowWidth, this.p5.windowHeight) * 0.25),
          c: this.p5.random(216, 255),
          dy: this.p5.random(this.p5.windowHeight * 0.005, this.p5.windowHeight * 0.0075)
        }
        this.circles.push(circle)
      }
    },
    drawNote() {
      this.n++
      let w = this.p5.random(0.1, 0.4) * Math.min(this.p5.windowWidth, this.p5.windowHeight)
      for (let i = this.n % 4; i < this.circles.length; i += 4) {
        let circle = this.circles[i]
        circle.w = w
        this.p5.noStroke()
        this.p5.fill(circle.c)
        this.p5.circle(circle.x, circle.y, circle.w)
      }
    },
    draw() {
      this.p5.clear();
      this.p5.noStroke()
      let removeIndex = -1
      for (let i = 0; i < this.circles.length; i++) {
        let circle = this.circles[i]
        if (this.playing) {
          circle.w = circle.w - this.p5.random(4, 8)
          circle.y = circle.y + circle.dy
          if (circle.y - circle.w * 0.5 > this.p5.windowHeight) {
            circle.y = -circle.w * 0.5 - this.p5.windowHeight * 0.5
          }
        }
        this.p5.fill(circle.c)
        this.p5.circle(circle.x, circle.y, circle.w)
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
    if (this.player) {
      this.player.stop()
    }
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
