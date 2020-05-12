<template>
  <div class="tc-page-content" ref="tcPageContent">


    <header ref="tcHeader">
      <a href="/"><h1 class="tc-site-title">tksshj.com</h1></a>
    </header>


    <main ref="tcMain">
      <article>
        <h1 class="tc-title">{{ page.title }}</h1>
        <p  class="tc-description">{{ page.description }}</p>
        <div class="tc-article-content">
          <slot></slot>
        </div>
      </article>
    </main>


    <footer ref="tcFooter" v-show="showFooter">

      <p class="tc-underline" @click="toggleText" v-if="!playButton">
        {{ showText ? 'テキストを隠す' :  'テキストを表示する' }}
      </p>

      <p v-if="playButton">
        <tc-button @click="playButtonClicked" v-if="!playing"><tc-icon>play_arrow</tc-icon>Play</tc-button>
        <tc-button @click="playButtonClicked" v-if="playing"><tc-icon>pause</tc-icon>Pause</tc-button>
      </p>



      <a :class="prevButtonClass" :href="prevPath">
        <i class="material-icons">keyboard_arrow_left</i><p>前へ</p>
      </a>
      <a :class="nextButtonClass" :href="nextPath">
        <p>次へ</p><i class="material-icons">keyboard_arrow_right</i>
      </a>

    </footer>


  </div>
</template>

<script>
import TcPages from './tc_pages.js'
import TcButton from './tc_button.vue'

export default {
  components: {
    'tc-button': TcButton
  },
  props: [
    'playButton'
  ],
  data() {
    return {
      page: TcPages.page(this.$route.name),
      prev: TcPages.prev(this.$route.name),
      next: TcPages.next(this.$route.name),
      prevPath: null,
      nextPath: null,
      prevButtonClass: 'tc-bottom-button',
      nextButtonClass: 'tc-bottom-button',
      showText: false,
      showFooter: false,
      playing: false
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
    hideText() {
      this.showText = false
    },
    toggleText() {
      this.showText = !this.showText
    },
    playButtonClicked() {
      this.playing = !this.playing
      this.showText = !this.playing
      this.$emit('play-button-clicked', this.playing)
    }
  },
  mounted() {
    this.prevPath = this.prev == null ? null : ('/' + this.prev.id)
    this.nextPath = this.next == null ? null : ('/' + this.next.id)
    this.prevButtonClass = 'tc-bottom-button' + (this.prev == null ? ' disabled' : '')
    this.nextButtonClass = 'tc-bottom-button' + (this.next == null ? ' disabled' : '')

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
    justify-content: space-around;
    align-items: center;

    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.4s;
    &.show {
      background-color: rgba(255, 255, 255, 0.9);
    }
    .tc-underline {
      text-decoration: underline;
    }
    .tc-bottom-button {
      display: flex;
      align-items: center;
      &.disabled {
        opacity: 0.2;
      }
      i {
        padding: 2px 0 0;
        font-size: 36px;
        display: block;
      }
    }
  }
}
</style>
