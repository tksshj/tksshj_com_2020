<template>
  <tc-page>

    <template slot="animation">
      <tc-animation />
    </template>

    <template slot="main">
      <div class="tc-index">
        <a :href="page.id" v-for="page in pages" v-if="page.id != 'index'">
          <section>
            <h1 class="tc-title">{{ page.title }}</h1>
            <p class="tc-description">{{ page.description }}</p>
          </section>
        </a>
      </div>
    </template>

  </tc-page>
</template>

<script>
import TcPages from '../components/tc_pages.js'
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021020201.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  },
  data() {
    return {
      pages: TcPages.pages
    }
  }
}
</script>

<style scoped lang="scss">
.tc-index {
  padding: 12px;
  section {
    padding: 12px 0;
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>
