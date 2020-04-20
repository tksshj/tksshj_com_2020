<template>
  <div class="tc-page-content" ref="tcPageContent">


    <header ref="tcHeader">
      <a href="/"><h1 class="tc-site-title">tksshj.com</h1></a>
    </header>


    <main ref="tcMain">
      <article>
        <h1 class="tc-title" v-if="title">{{ title }}</h1>
        <p  class="tc-description" v-if="description">{{ description }}</p>
        <div class="tc-article-content">
          <slot></slot>
        </div>
      </article>
    </main>


    <footer ref="tcFooter" v-show="showFooter">
      <p class="tc-underline" @click="toggleText">{{ showText ? 'テキストを隠す' :  'テキストを表示する' }}</p>
    </footer>


  </div>
</template>

<script>
export default {
  props: [
    'title',
    'description'
  ],
  data() {
    return {
      showText: false,
      showFooter: false
    }
  },
  watch: {
    showText(val) {
      if (val) {
        this.$refs.tcPageContent.classList.add('show')
        this.$refs.tcHeader.classList.add('show')
        this.$refs.tcMain.classList.add('show')
        this.$refs.tcFooter.classList.add('show')
      } else {
        this.$refs.tcPageContent.classList.remove('show')
        this.$refs.tcHeader.classList.remove('show')
        this.$refs.tcMain.classList.remove('show')
        this.$refs.tcFooter.classList.remove('show')
      }
    }
  },
  methods: {
    toggleText() {
      this.showText = !this.showText
    }
  },
  mounted() {
    setTimeout(() => {
      this.showText = true
      this.showFooter = true
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.tc-page-content {
  position: fixed;
  width: 100%;
  max-width: 480px;
  height: 100%;
  left: 0;
  top: 0;

  header {
    position: absolute;
    width: calc(100% - 32px);
    height: 80px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    z-index: 10;

    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.4s;
    &.show {
      background-color: rgba(255, 255, 255, 0.9);
    }
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

    left: -100%;
    transition: left 0.4s;
    &.show {
      left: 0;
    }
  }

  footer {
    position: absolute;
    width: calc(100% - 32px);
    height: 64px;
    padding: 0 16px;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;

    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.4s;
    &.show {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
}
</style>
