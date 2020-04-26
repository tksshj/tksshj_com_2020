<template>
  <div class="tc-page-index">

    <header ref="tcHeader">
      <a href="/"><h1 class="tc-site-title">tksshj.com</h1></a>
    </header>

    <main ref="tcMain">
      <article>

        <a :href="page.id" v-for="page in pages">
          <section>
            <h1 class="tc-title">{{ page.title }}</h1>
            <p class="tc-description">{{ page.description }}</p>
          </section>
        </a>

      </article>
    </main>

  </div>
</template>

<script>
import * as P5 from 'p5'
import TcPages from '../components/tc_pages.js'

export default {
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
.tc-page-index {
  width: 100%;
  height: 100%;

  header {
    position: fixed;
    width: calc(100% - 32px);
    height: 80px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.8);
  }

  main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: rgba(255, 255, 255, 0.8);

    article {
      width: calc(100% - 32px);
      margin: 80px 0 0;
      padding: 0 16px;
      .tc-title {
        padding: 24px 0 0;
        font-size: 20px;
      }
      .tc-description {
        padding: 0 0 24px;
        font-size: 14px;
      }
      .tc-article-content {
        margin: 0 0 64px;
        padding: 0 8px 24px 0;
        p {
          padding: 0 0 16px;
        }
      }
    }
  }
}
</style>
