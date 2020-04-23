<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="シンセから！だからまだ遠いわ！"
      description="2020-04-23_01, scroll"
    >
      <p>
        昨日夜からtone.jsすこしやってみて、ループ？というかリズムがかろうじてわかる？ところなんですが、
        やっぱり再生する音がこれだけだとイマイチですね。。。
        なので先に音を作る方を優先しないとダメっぽいです。
        遠いかもこれは。でもシンセいじれるのカッコいいから頑張ります。
      </p>
      <p>
        <button @click="playButtonClicked">
          <template v-if="playerState == 'stopped'">
            <i class="material-icons">play_arrow</i><div>Play</div>
          </template>
          <template v-if="playerState == 'started'">
            <i class="material-icons">stop</i><div>Stop</div>
          </template>
        </button>
      </p>
      <p>
        仕事でスロットみたいなの作れる？って話があったので、ちょっとそれっぽくしました。
        下にスクロールすると列ごとに動くという感じです。
        あとボタンをすこし変えました。アイコンが導入された。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import * as Tone from "tone";
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  head: {
    title: 'シンセから！だからまだ遠いわ！ - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
      nVerticalTiles: 0,
      cols: [],
      noise: null,
      playerState: 'stopped'
    }
  },
  methods: {
    playButtonClicked() {
      if (!this.toneStated) {
        Tone.start()
        this.noise = new Tone.NoiseSynth().toMaster()
        Tone.Transport.schedule(this.triggerSynth, '0:0')
        Tone.Transport.schedule(this.triggerSynth, '0:1')
        Tone.Transport.schedule(this.triggerSynth, '0:2')
        Tone.Transport.schedule(this.triggerSynth, '0:3')
        Tone.Transport.schedule(this.triggerSynth, '0:3.25')
        Tone.Transport.loopEnd = '1m'
        Tone.Transport.loop = 2
      }
      if (Tone.Transport.state == 'started') {
        Tone.Transport.stop()
        this.playerState = 'stopped'
      } else {
        Tone.Transport.start()
        this.playerState = 'started'
      }
    },
    triggerSynth(time){
      this.noise.triggerAttackRelease('16n', time)
    },
    setupPage() {
      this.height = window.innerHeight * this.nPages
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
    },
    position() {
      let h = window.innerHeight
      let y = window.scrollY
      return {
        y: y,
        page: Math.floor(y / h),
        progress: (y % h) / h
      }
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

      let isPortrait = this.p5.windowWidth < this.p5.windowHeight
      let nHorizontalTiles = isPortrait ? 3 : parseInt(this.p5.windowWidth / 256) + 1
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      this.nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2

      for (let row = 0; row < this.nVerticalTiles; row++) {
        for (let col = 0; col < nHorizontalTiles; col++) {
          this.squares.push({
            row: row,
            col: col,
            x: tileWidth * (col - nHorizontalTiles * 0.5),
            y: tileWidth * row - this.p5.windowHeight * 0.5,
            width: tileWidth
          })
        }
      }
      for (let col = 0; col < nHorizontalTiles + 1; col++) {
        this.cols.push({
          speed: this.p5.random(1.0, 10.0)
        })
      }
    },
    draw() {
      let position = this.position()
      this.p5.stroke(192)
      this.p5.strokeWeight(1)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()

        let w = square.width
        let y = w * square.row - this.p5.windowHeight * 0.5 + w * (position.page + position.progress) * this.cols[square.col].speed
        if (y < -1.0 * window.innerHeight * 0.5 - w) {
          square.row = square.row + this.nVerticalTiles
        }
        if (window.innerHeight * 0.5 < y) {
          square.row = square.row - this.nVerticalTiles
        }

        this.p5.translate(square.x, y)
        this.p5.fill(255 - Math.abs(square.row % this.nVerticalTiles) * 8 - square.col * 8)
        this.p5.square(0, 0, square.width)
        this.p5.pop()
      }
    },
    windowResized() {
      console.log('resized')
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
</style>
