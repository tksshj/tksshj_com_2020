<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-content
      date="2020-04-15_01"
      title="スクロールする"
    >
      <p>
        これはブログみたいなものと、WebGLとかp5.jsとかthree.jsとかをやりたいのでそういうのです。
      </p>
      <p>
        とりあえずただ下にスクロールできるところまで。
      </p>
    </tc-content>

  </div>
</template>

<script>
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
    }
  },
  methods: {
    setupPage() {
      this.height = window.innerHeight * this.nPages
    },
    position() {
      let h = window.innerHeight
      let y = window.window.scrollY
      return {
        page: Math.floor(y / h),
        progress: (y % h) / h
      }
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
