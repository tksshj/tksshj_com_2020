<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>
    <tc-page-content>
      <a :href="page.id" v-for="page in pages">
        <section>
          <h1 class="tc-title">{{ page.title }}</h1>
          <p class="tc-description">{{ page.description }}</p>
        </section>
      </a>
    </tc-page-content>
  </div>
</template>

<script>
import * as P5 from 'p5'
import TcPageContent from '../components/tc_page_content.vue'
import TcPages from '../components/tc_pages.js'

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  head: {
    title: 'tksshj.com'
  },
  data() {
    return {
      pages: TcPages.pages
    }
  }
}
</script>

<style scoped lang="scss">
section:hover {
  background-color: #FAFAFA;
}
</style>
