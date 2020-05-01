<<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content>
      <p>
        シンセわからんすぎるので、理解できるなにかをやってみようと思って、
        <a href="https://www.korg.com/jp/products/software/korg_gadget/">KORG Gadget</a>というアプリで遊んでいます。
        思ったより簡単にそれっぽいものができて、楽しすぎる。
        学んでる感じゼロ、酔っ払って変な踊りするだけの時間になってしまう問題があります。
      </p>
      <p>
        ドラムはプリセットの音ですぐにいい感じのループが作れるので、
        次はカッコいいベースを、、、というところでエンベロープとかでてきて、
        もしかしたら学びもあるか？？？になりたいけど圧倒的に遊んでる感が強い。
      </p>
      <p>
        KORG Gadgetで音楽作ってp5.jsで同期もできそうなんだけど、
        公開するには音どうするか問題がまだあるのでどうするか。
        もう少し遊んで考えます。遊んでるの強調がすごいなこの文章。楽しいからな。
      </p>
      <p class="tc-animation-description">
        アニメーションは前のに更に別の回転入れただけです。
        いま正方形を個別にオブジェクトで持っているのと、描画タイミングで計算するのと、
        なんかソースも微妙な感じなので少し整理しないと。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TWEEN from '@tweenjs/tween.js'
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
      squares: [],
      y: 0
    }
  },
  methods: {
    setupPage() {
      this.height = window.innerHeight * this.nPages
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
      this.setTween(0, true)
    },
    setTween(startY, inc) {
      let coords = { y: 0 }
      this.tween = new TWEEN.Tween(coords)
                            .to({ y: this.height }, 10 * 1000)
                            .easing(TWEEN.Easing.Linear.None)
                            .onUpdate(() => {
                              if (inc) {
                                this.y = startY + coords.y
                              } else {
                                this.y = startY - coords.y
                              }
                            })
                            .onComplete(() => {
                              if (inc) {
                                this.setTween(startY + coords.y, !inc)
                              } else {
                                this.setTween(startY - coords.y, !inc)
                              }
                            })
                            .start()
    },
    position() {
      let h = window.innerHeight
      let y = this.y
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
      let nHorizontalTiles = isPortrait ? 5 : parseInt(this.p5.windowWidth / 192) + 1
      let tileWidth = this.p5.windowWidth / nHorizontalTiles
      let nVerticalTiles = parseInt(this.p5.windowHeight / tileWidth) + 2
      this.nHorizontalTiles = nHorizontalTiles + 4

      for (let row = 0; row < nVerticalTiles + 1; row++) {
        for (let col = -1; col < this.nHorizontalTiles; col++) {
          this.squares.push({
            row: row,
            col: col,
            x: tileWidth * (col - this.nHorizontalTiles * 0.5),
            y: tileWidth * row - this.p5.windowHeight * 0.5,
            width: tileWidth,
          })
        }
      }
    },
    draw() {
      TWEEN.update()

      let position = this.position()
      let move = this.squares[0].width * position.progress
      let width = position.progress < 0.5 ? this.squares[0].width - move : move

      this.p5.stroke(216)
      this.p5.strokeWeight(1)

        this.p5.rotate(position.progress < 0.5 ? position.progress : 1.0 - position.progress)

      for (let i = 0; i < this.squares.length; i++) {
        let square = this.squares[i]
        this.p5.push()

        let c = square.col

        if (square.row % 2 == 0) {
          if (square.col % 2 == position.page % 2) {
            this.p5.translate(square.x + move, square.y)
            c = c - position.page
          } else {
            this.p5.translate(square.x, square.y + move)
          }
        } else {
          if (square.col % 2 == position.page % 2) {
            this.p5.translate(square.x, square.y - move)
          } else {
            this.p5.translate(square.x - move, square.y)
            c = c + position.page
          }
        }

        this.p5.rotate(position.progress < 0.5 ? position.progress : 1.0 - position.progress)
        this.p5.fill(255 - (c % 4) * 8)
        this.p5.square(0, 0, width)
        this.p5.pop()
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
