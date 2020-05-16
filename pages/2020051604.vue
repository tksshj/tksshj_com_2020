<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container">
      <canvas ref="tcCanvas"></canvas>
    </div>

    <tc-page-content :playButton="true">
      <p>
        動画っていうかビデオっぽくなった？かも？
        細かい調整は必要かもしれないですね。
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import TcPageContent from '../components/tc_page_content.vue'
import GlBackground from '../components/2020051603/gl_background.js'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  data() {
    return {
      glContext: null,
      texture: null,
      viewportRect: null,
      updated: null,
      frameCount: 0
    }
  },
  methods: {
    setupPage() {
      this.$refs.tcCanvas.width = window.innerWidth
      this.$refs.tcCanvas.height = window.innerHeight

      this.glContext = this.$refs.tcCanvas.getContext('webgl') || this.$refs.tcCanvas.getContext('experimental-webgl')

      this.glBackground = new GlBackground(this.glContext)
      this.glBackground.setup()


      this.texture = this.glContext.createTexture()

      let image = new Image()
      image.onload = () => {
        this.glContext.bindTexture(this.glContext.TEXTURE_2D, this.texture)
        this.glContext.pixelStorei(this.glContext.UNPACK_FLIP_Y_WEBGL, true)
        this.glContext.texImage2D(this.glContext.TEXTURE_2D,
                                  0,
                                  this.glContext.RGBA,
                                  this.glContext.RGBA,
                                  this.glContext.UNSIGNED_BYTE,
                                  image)

        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_MAG_FILTER, this.glContext.NEAREST)
        this.glContext.texParameteri(this.glContext.TEXTURE_2D, this.glContext.TEXTURE_MIN_FILTER, this.glContext.NEAREST)

        this.glContext.bindTexture(this.glContext.TEXTURE_2D, null)

      }
      image.src = '/2020051601.jpg'

      let w = Math.max(window.innerWidth, window.innerHeight)
      this.viewportRect = { x: (window.innerWidth - w) * 0.5,
                            y: (window.innerHeight - w) * 0.5,
                            w: w,
                            h: w }

      this.startDrawing()

    },
    startDrawing() {
      requestAnimationFrame(this.draw)
    },
    draw(timestamp) {
      if (timestamp - this.updated > 1000 / 30.0) {
        this.updated = timestamp

        this.frameCount += 1
        if (this.frameCount > 120) {
          this.frameCount = 0
        }

        this.glContext.clearColor(1.0, 1.0, 0.0, 1.0)
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT)

        this.glContext.viewport(this.viewportRect.x, this.viewportRect.y, this.viewportRect.w, this.viewportRect.h)

        this.glBackground.draw(this.texture, window.innerWidth / 10 + this.frameCount % 10)
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
a {
  text-decoration: underline;
}
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
