<template>
  <div id="tc-anmiation" class="tc-animation">
    <canvas ref="tcCanvas" />
  </div>
</template>

<script>
import GlBackground from './2020051501/gl_background.js'


export default {
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

      this.glContext = this.$refs.tcCanvas.getContext('webgl') || this.$refs.tcCanvas.getContext('experimental-webgl')

      this.glBackground = new GlBackground(this.glContext)
      this.glBackground.setup()

      this.startDrawing()
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
.tc-animation {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
