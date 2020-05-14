<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container">
      <canvas ref="tcCanvas"></canvas>
    </div>

    <tc-page-content :playButton="true">
      <p>
        p5.jsでやってることが同じに見えてきたので、そろそろ次なんですが、
        仕事で使うのもあって先にWebGLでなんかやってみることにしました。
        three.jsのほうがなんか先にやろうと思ってたんですけど、
        仕事から逃げても仕事っぽいことやってポイントが溜まっていくみたいな予定です。
      </p>
      <p>
        WebGL、そもそも何をやるにしても初期コストが高い感じなので、グラデーションだけですんごい量のソースコード書きました。
        しかもスマホとか他のブラウザでも表示できるか超不安。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import TcPageContent from '../components/tc_page_content.vue'
import GlBackground from '../components/2020051501/gl_background.js'


export default {
  components: {
    'tc-page-content': TcPageContent
  },
  data() {
    return {
      glContext: null,
      updated: null
    }
  },
  methods: {
    setupPage() {
      this.$refs.tcCanvas.width = window.innerWidth
      this.$refs.tcCanvas.height = window.innerHeight

      this.height = window.innerHeight * this.nPages

      this.glContext = this.$refs.tcCanvas.getContext('webgl') || this.$refs.tcCanvas.getContext('experimental-webgl')

      this.glBackground = new GlBackground(this.glContext)
      this.glBackground.setup()

      this.startDrawing()

    },
    position() {
      let h = window.innerHeight
      let y = window.window.scrollY
      return {
        page: Math.floor(y / h),
        progress: (y % h) / h
      }
    },
    startDrawing() {
      requestAnimationFrame(this.draw)
    },
    draw(timestamp) {
      if (timestamp - this.updated > 1000 / 30.0) {
        this.updated = timestamp

        this.glContext.clearColor(1.0, 1.0, 1.0, 1.0)
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT)

        this.glBackground.draw()
      }
      requestAnimationFrame(this.draw)
    }

  },
  mounted() {
    this.setupPage()
  },
  beforeDestroy() {
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
