<template>
  <div class="tc-page-index">
    <a href="/" class="tc-site-title">tksshj.com</a>

    <div class="tc-pages">
      <template v-for="page in pages">
        <a :href="page.path">
          <h2>{{ page.title }}</h2>
          <p>{{ page.date }}</p>
        </a>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { path: "2020041901", date: "2020-04-19_01, animation", title: "ハンドソープ、LOHACO" },
        { path: "2020041801", date: "2020-04-18_01, scroll",    title: "資源ごみ、雨" },
        { path: "2020041703", date: "2020-04-17_03, animation", title: "キリン一番搾り" },
        { path: "2020041702", date: "2020-04-17_02, animation", title: "郵便局がなくなってる・・・！？" },
        { path: "2020041701", date: "2020-04-17_01, scroll",    title: "index.vueの幅がおかしい？" },
        { path: "2020041604", date: "2020-04-16_04, animation", title: "JIM BEAMとコーラ" },
        { path: "2020041603", date: "2020-04-16_03", title: "スクエアのスクエアのスクエアの" },
        { path: "2020041602", date: "2020-04-16_02", title: "スクエアもするし自動運転もする" },
        { path: "2020041601", date: "2020-04-16_01", title: "スクロールするしスクエアもまわす" },
        { path: "2020041503", date: "2020-04-15_03, animation", title: "醤油野菜炒め弁当" },
        { path: "2020041502", date: "2020-04-15_02", title: "スクロールするしサークルもする"},
        { path: "2020041501", date: "2020-04-15_01", title: "スクロールする" }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.tc-page-index {
  .tc-description {
    margin: 48px 16px;
  }
  .tc-pages {
    a {
      display: block;
      width: calc(100% - 32px);
      padding: 24px 16px;
      &:hover {
        background-color: #FAFAFA;
      }
      h2 {
        margin: 0;
        font-size: 20px;
      }
      p {
        margin: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
