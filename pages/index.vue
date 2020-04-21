<template>
  <div>
    <div id="tc-canvas-container" class="tc-canvas-container"></div>
    <tc-page-content>
      <a :href="page.path" v-for="page in pages">
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

export default {
  components: {
    'tc-page-content': TcPageContent
  },
  head: {
    title: 'tksshj.com'
  },
  data() {
    return {
      pages: [
        { path: "2020042101", description: "2020-04-21_01, animation", title: "ノイズ？ハイハット？" },
        { path: "2020042004", description: "2020-04-20_04, animation", title: "おと！" },
        { path: "2020042003", description: "2020-04-20_03, animation", title: "やっすいワイン、音楽つけたい" },
        { path: "2020042002", description: "2020-04-20_02, scroll",    title: "テキスト表示なんとかした" },
        { path: "2020042001", description: "2020-04-20_01, scroll",    title: "テキスト表示なんとかする？" },
        { path: "2020041903", description: "2020-04-19_03, animation", title: "スクロール失敗" },
        { path: "2020041902", description: "2020-04-19_02, animation", title: "サバ缶うんめぇ" },
        { path: "2020041901", description: "2020-04-19_01, animation", title: "ハンドソープ、LOHACO" },
        { path: "2020041801", description: "2020-04-18_01, scroll",    title: "資源ごみ、雨" },
        { path: "2020041703", description: "2020-04-17_03, animation", title: "キリン一番搾り" },
        { path: "2020041702", description: "2020-04-17_02, animation", title: "郵便局がなくなってる・・・！？" },
        { path: "2020041701", description: "2020-04-17_01, scroll",    title: "index.vueの幅がおかしい？" },
        { path: "2020041604", description: "2020-04-16_04, animation", title: "JIM BEAMとコーラ" },
        { path: "2020041603", description: "2020-04-16_03, scroll",    title: "スクエアのスクエアのスクエアの" },
        { path: "2020041602", description: "2020-04-16_02, animation", title: "スクエアもするし自動運転もする" },
        { path: "2020041601", description: "2020-04-16_01, scroll",    title: "スクロールするしスクエアもまわす" },
        { path: "2020041503", description: "2020-04-15_03, animation", title: "醤油野菜炒め弁当" },
        { path: "2020041502", description: "2020-04-15_02, scroll",    title: "スクロールもするしサークルもする"},
        { path: "2020041501", description: "2020-04-15_01, scroll",    title: "これはブログです" }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
section:hover {
  background-color: #FAFAFA;
}
</style>
