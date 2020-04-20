<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content
      title="スクロールするしサークルもする"
      description="2020-04-15_02"
    >
      <p>
        マグカップの取っ手はちょっと太くないと、なんか安心感が足りないです？か？
      </p>
      <p>
        下にスクロールすると、位置にあわせてサークルします。サークルするって動詞ほんとにありそうだけど知らないです。
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
  head: {
    title: 'スクロールするしサークルもする - tksshj.com'
  },
  data() {
    return {
      nPages: 10,
      height: 0,
      p5App: null,
      p5: null,
    }
  },
  methods: {
    setupPage() {
      this.height = window.innerHeight * this.nPages
      this.p5App = new P5(this.sketch, 'tc-canvas-container')
    },
    position() {
      let h = window.innerHeight
      let y = window.window.scrollY
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
</style>
