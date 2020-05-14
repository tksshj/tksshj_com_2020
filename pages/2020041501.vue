<template>
  <div>
    <div class="tc-scroller" :style="{ height: height + 'px' }"></div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>

    <tc-page-content>
      <p>
        これはブログとかそういうのです。
        あとWebGLとかp5.jsとかthree.jsとかをやりたいのでそういうのです。
      </p>
      <p>
        とりあえず下にスクロールできるところまで作ったんですが、このページでは何も起きません！
      </p>
    </tc-page-content>

  </div>
</template>

<script>
import TcPageContent from '../components/tc_page_content.vue'

export default {
  components: {
    'tc-page-content': TcPageContent
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
