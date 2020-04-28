<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content>
      <p>
        シンセやっぱり難しいですね、やっぱりですね。
        <a href="https://learningsynths.ableton.com/ja/">これ</a>を何回かやってみてるんですけど、
        なんとなくわかった気になってtone.jsでなにか作ろうとすると全く手が動かねえっス。
        それでなんかシンセを勉強するなにかを作ってみようかと思って、ボタンとスライダーをつくりました。
        いや遠すぎねえかな？
      </p>
      <p>
        <tc-button @click="playButtonClicked">
          <template v-if="!playing">
            <tc-icon>play_arrow</tc-icon>Play
          </template>
          <template v-if="playing">
            <tc-icon>pause</tc-icon>Pause
          </template>
        </tc-button>
        <tc-slider v-model="sliderValue"></tc-slider>
      </p>
      <p>
        Playボタンで回転して、速度をスライダーで変更できます。まあアニメーションは今回はまあ。
      </p>
    </tc-page-content>
  </div>
</template>

<script>
import * as P5 from 'p5'
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  data() {
    return {
      sliderValue: 50,
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      playing: false,
      angle: 0
    }
  },
  methods: {
    playButtonClicked() {
      this.playing = !this.playing
    },
    setupPage() {
      this.height = window.innerHeight * this.nPages
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

    },
    draw() {
      if (this.playing) {
        this.angle = this.angle + this.sliderValue * 0.001
      }
      let w = Math.min(this.p5.windowWidth, this.p5.windowHeight)
      this.p5.clear()
      this.p5.strokeWeight(0)
      this.p5.fill(192)
      this.p5.rotate(Math.PI * this.angle)
      this.p5.square(w * -0.25, w * -0.25, w * 0.5)
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

.tc-slider-row {
  display: flex;
  padding: 16px 0;
  .tc-slider {
    width:calc(100% - 96px);
  }
  p {
    width: 96px;
    margin: 0 16px;
  }
}
</style>
