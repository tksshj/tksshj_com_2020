<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content :playButton="true" @play-button-clicked="playButtonClicked">
      <p>
        KORG Gadgetすごい簡単に音楽作れてとてもいいんですが、
        tone.jsと同期ってなるとやっぱなんか考えないとだめっぽいですね。
        やっぱそもそも音と画面の同期が難しいだなのかもしれないですね。
      </p>
      <p>
        なんか写真とか動画とかを少し劣化加工したようなものが使いたいかもしれないですね。
        壮大な趣味になってきました。そもそもまだカラーを使ってないですね、全部モノトーン。
      </p>
      <p>
        アニメーション、好きな感じにするのすごい難しい、もう少しやりたいけど時間切れ。
        あと音楽やっぱりこの方法だとループするところが気になりますね。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import * as Tone from "tone";
import TWEEN from '@tweenjs/tween.js'
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  data() {
    return {
      playing: false,
      toneStarted: 0,
      player: null,
      p5App: null,
      p5: null,
      n: 0,
      circles: []
    }
  },
  methods: {
    playButtonClicked(playing) {
      this.setupTone()
      this.playing = playing
      this.inc = 0
      this.n = 0
      Tone.Transport.toggle()
    },
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
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
    },
    sketch(p5) {
      this.p5 = p5
      this.p5.setup = this.setup
      this.p5.draw = this.draw
      this.p5.windowResized = this.windowResized
    },
    setup() {
      let width = window.innerWidth
      let height = window.innerHeight
      this.p5.createCanvas(width, height, this.p5.WEBGL)
      this.p5.frameRate(30)

      let w = Math.max(this.p5.windowWidth, this.p5.windowHeight) * 0.2
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
      console.log(this.n)
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
      this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);
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
.tc-scroller {
  width: 100vw;
}
.tc-canvas-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.tc-play-button-row {
  padding: 8px 0 32px;
  display: flex;
  justify-content: center;
  .tc-play-button {
    width: 97.5%;
    padding: 4px 16px;
    text-align: center;
    border: solid 1px #5F5F7F;
  }
}
a {
  text-decoration: underline;
}
.tc-animation-description {
  margin: 24px 0 0;
}
</style>
