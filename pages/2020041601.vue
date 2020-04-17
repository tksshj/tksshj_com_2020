<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-content
      date="2020-04-16_01"
      title="スクロールするしスクエアもまわす"
    >
      <p>
        基本的に引きこもって自宅で仕事してるのですが、
        週に数回ミーティングで外出していたのがなくなってしまうと、
        意外にもあれ大事だったのか？と思いますね。
      </p>
      <p>
        下にスクロールすると正方形が回転しながら表示されます。
        p5.jsはWebGLモードにすると座標系変わるんですね。
      </p>
    </tc-content>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TcContent from '../components/tc_content.vue'

export default {
  components: {
    'tc-content': TcContent
  },
  head: {
    title: '2020-04-15_01 - tksshj.com'
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
      this.p5.createCanvas(width, height, this.p5.WEBGL)
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

      this.p5.rotateZ(Math.PI * position.progress)
      this.p5.strokeWeight(0)
      this.p5.square(-r * 0.5, -r * 0.5, r)
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
