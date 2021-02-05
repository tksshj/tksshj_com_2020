<template>
  <div class="tc-page">


    <slot name="animation" />


    <div class="tc-page-content">

      <header>
        <h1><a href="/">tksshj.com</a></h1>
      </header>

      <div ref="tcMain" class="tc-main">
        <main>
          <template v-if="$route.name == 'index'">
            <slot name="main"></slot>
          </template>
          <template v-if="$route.name != 'index'">
            <article>
              <h1 class="tc-title">{{ page.title }}</h1>
              <p class="tc-description">{{ page.description }}</p>
              <div class="tc-article-content">
                <slot name="main"></slot>
              </div>
            </article>
          </template>
        </main>
      </div>

      <footer ref="tcFooter">
        <p class="tc-show-text" @click="showText = !showText">
          {{ showText ? 'テキストを隠す' :  'テキストを表示する' }}
        </p>
        <a :href="prevPath" :class="prevButtonClass">
          <i class="material-icons">keyboard_arrow_left</i><p>前へ</p>
        </a>
        <a :href="nextPath" :class="nextButtonClass">
          <p>次へ</p><i class="material-icons">keyboard_arrow_right</i>
        </a>
      </footer>

    </div>


  </div>
</template>

<script>
import TcPages from './tc_pages.js'

export default {
  props: {
    footer: Boolean
  },
  data() {
    return {
      showText: false,
      page: TcPages.page(this.$route.name),
      prev: TcPages.prev(this.$route.name),
      next: TcPages.next(this.$route.name),
      prevPath: null,
      nextPath: null
    }
  },
  computed: {
    prevButtonClass() {
      return 'tc-button' + (this.prev != null ? '' : ' disabled')
    },
    nextButtonClass() {
      return 'tc-button' + (this.next != null ? '' : ' disabled')
    }
  },
  watch: {
    showText(newVal, oldVal) {
      if (newVal) {
        this.$refs.tcMain.classList.add('show')
        this.$refs.tcFooter.classList.add('show')
      } else {
        this.$refs.tcMain.classList.remove('show')
      }
    }
  },
  methods: {
    hide() {
      this.$refs.tcPageContent.classList.remove('show')
    }
  },
  mounted() {
    this.prevPath = this.prev == null ? null : ('/' + this.prev.id)
    this.nextPath = this.next == null ? null : ('/' + this.next.id)
    setTimeout(() => {
      this.showText = true
    }, 1500)
  }
}
</script>

<style scoped lang="scss">
.tc-page {
  width: 100%;
  height: 100%;

  .tc-page-content {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 480px;

    header {
      position: absolute;
      width: 100%;
      height: 64px;
      z-index: 100;
      padding: 0 12px;
      h1 {
        line-height: 64px;
      }
    }

    .tc-main {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);

      left: -100%;
      transition: left 0.4s;
      &.show {
        left: 0;
      }

      main {
        height: calc(100% - 128px);
        margin: 64px 0;
        overflow: scroll;
        article {
          width: calc(100% - 24px);
          padding: 0 12px;
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
            a {
              text-decoration: underline;
            }
          }
        }
      }
    }

    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 64px;
      z-index: 100;
      display: flex;
      align-items: center;

      opacity: 0.0;
      transition: opacity 0.4s 0.4s;
      &.show {
        opacity: 1.0;
      }

      .tc-show-text {
        width: 50%;
        text-align: center;
        text-decoration: underline;
      }
      .tc-button {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;

        &.disabled {
          opacity: 0.3;
        }
      }
    }
  }
}
</style>
