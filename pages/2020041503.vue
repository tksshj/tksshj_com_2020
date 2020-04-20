<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="醤油野菜炒め弁当"
      description="2020-04-15_03, animation"
    >
      <p>
        オリジン弁当、醤油野菜炒め弁当が最高すぎるので最高です。
      </p>
      <p>
        <span class="underline"><a href="./2020041502">ひとつ前の記事</a></span>
        をスクロールしないで自動でアニメーションするようにしました。
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
  head: {
    title: '醤油野菜炒め弁当 - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
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
      const coords = { y: 0 }
      this.tween = new TWEEN.Tween(coords)
                            .to({ y: this.height }, 10 * 1000)
                            .easing(TWEEN.Easing.Sinusoidal.InOut)
                            .onUpdate(() => {
                              if (inc) {
                                this.y = coords.y
                              } else {
                                this.y = this.height - coords.y
                              }
                            })
                            .onComplete(() => {
                              this.setTween(coords.y, !inc)
                            })
                            .start()
    },
    position() {
      let h = window.innerHeight
      let y = this.y
      return {
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
      this.p5.createCanvas(width, height)
    },
    draw() {
      TWEEN.update()
      let position = this.position()
      let t = Math.atan(this.p5.height / this.p5.width)
      let l = this.p5.height / Math.sin(t)
      let r = l * (1.0 - position.progress)

      if (position.page % 2 == 0) {
        this.p5.background(216)
        this.p5.fill(255)
      } else {
        this.p5.background(255)
        this.p5.fill(216)
      }

      this.p5.strokeWeight(0)
      this.p5.circle(this.p5.width * 0.5, this.p5.height * 0.5, r)
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
.tc-canvas-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.underline {
  text-decoration: underline;
}
</style>
