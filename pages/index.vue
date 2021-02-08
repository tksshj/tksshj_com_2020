<template>
  <tc-page>

    <template slot="animation">
      <tc-animation-0 v-if="animation == 0" />
      <tc-animation-1 v-if="animation == 1" />
      <tc-animation-2 v-if="animation == 2" />
      <tc-animation-3 v-if="animation == 3" />
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
import TcAnimation0 from '../components/animations/2020050502.vue'
import TcAnimation1 from '../components/animations/2021020301.vue'
import TcAnimation2 from '../components/animations/2020080501.vue'
import TcAnimation3 from '../components/animations/2020051201.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation-0': TcAnimation0,
    'tc-animation-1': TcAnimation1,
    'tc-animation-2': TcAnimation2,
    'tc-animation-3': TcAnimation3
  },
  data() {
    return {
      pages: TcPages.pages,
      animation: parseInt((Math.random() * 1000)) % 4
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
