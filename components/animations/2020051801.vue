<template>
  <div ref="tcAnimation" id="tc-animation" class="tc-animation">
    <canvas ref="tcCanvas" />
  </div>
</template>

<script>
import GlBackground from './2020051801/gl_background.js'

export default {
  data() {
    return {
      glContext: null,
      texture: null,
      viewportRect: null,
      updated: null,
      frameCount: 0,
      w: 0
    }
  },
  methods: {
    setupPage() {
      let cw = this.$refs.tcAnimation.clientWidth
      let ch = this.$refs.tcAnimation.clientHeight
      this.$refs.tcCanvas.width = cw
      this.$refs.tcCanvas.height = ch

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

      this.w = Math.max(cw, ch)
      this.viewportRect = { x: (cw - this.w) * 0.5,
                            y: (ch - this.w) * 0.5,
                            w: this.w,
                            h: this.w }

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

        this.glBackground.draw(this.texture,
                               100,
                               { width: this.$refs.tcAnimation.clientWidth, height: this.$refs.tcAnimation.clientHeight })
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
.tc-animation {
  width: 100%;
  height: 100%;
}
</style>
