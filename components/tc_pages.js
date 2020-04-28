export default {
  pages: [
    {
      id: "2020042801",
      title: "距離感？",
      description: "2020-04-28_01, sound"
    },
    {
      id: "2020042703",
      title: "意外とやらない",
      description: "2020-04-27_03, animation, text"
    },
    {
      id: "2020042702",
      title: "HHKB",
      description: "2020-04-27_02, scroll"
    },
    {
      id: "2020042701",
      title: "なんかやる",
      description: "2020-04-27_01, animation, text"
    },
    {
      id: "2020042601",
      title: "次へ！やっぱ前へ！",
      description: "2020-04-26_01, animation"
    },
    {
      id: "2020042502",
      title: "力が欲しいか",
      description: "2020-04-25_02, animation, text"
    },
    {
      id: "2020042501",
      title: "スピーカーほしいけど",
      description: "2020-04-25_01, animation"
    },
    {
      id: "2020042304",
      title: "あれ・・・？",
      description: "2020-04-23_04, animation"
    },
    {
      id: "2020042303",
      title: "ドラムキットじゃんもうこれ！！！",
      description: "2020-04-23_03, animation"
    },
    {
      id: "2020042302",
      title: "のり弁",
      description: "2020-04-23_02, animation"
    },
    {
      id: "2020042301",
      title: "シンセから！だからまだ遠いわ！",
      description: "2020-04-23_01, scroll"
    },
    {
      id: "2020042201",
      title: "チャット",
      description: "2020-04-22_01, animation, text"
    },
    {
      id: "2020042102",
      title: "ミニマルテクノ",
      description: "2020-04-21_02, scroll"
    },
    {
      id: "2020042101",
      title: "ノイズ？ハイハット？",
      description: "2020-04-21_01, animation"
    },
    {
      id: "2020042004",
      title: "おと！",
      description: "2020-04-20_04, animation"
    },
    {
      id: "2020042003",
      title: "やっすいワイン、音楽つけたい",
      description: "2020-04-20_03, animation"
    },
    {
      id: "2020042002",
      title: "テキスト表示なんとかした",
      description: "2020-04-20_02, scroll"
    },
    {
      id: "2020042001",
      title: "テキスト表示なんとかする？",
      description: "2020-04-20_01, scroll"
    },
    {
      id: "2020041903",
      title: "スクロール失敗",
      description: "2020-04-19_03, animation"
    },
    {
      id: "2020041902",
      title: "サバ缶うんめぇ",
      description: "2020-04-19_02, animation"
    },
    {
      id: "2020041901",
      title: "ハンドソープ、LOHACO",
      description: "2020-04-19_01, animation"
    },
    {
      id: "2020041801",
      title: "資源ごみ、雨",
      description: "2020-04-18_01, scroll"
    },
    {
      id: "2020041703",
      title: "キリン一番搾り",
      description: "2020-04-17_03, animation"
    },
    {
      id: "2020041702",
      title: "郵便局がなくなってる・・・！？",
      description: "2020-04-17_02, animation"
    },
    {
      id: "2020041701",
      title: "index.vueの幅がおかしい？",
      description: "2020-04-17_01, scroll"
    },
    {
      id: "2020041604",
      title: "JIM BEAMとコーラ",
      description: "2020-04-16_04, animation"
    },
    {
      id: "2020041603",
      title: "スクエアのスクエアのスクエアの",
      description: "2020-04-16_03, scroll"
    },
    {
      id: "2020041602",
      title: "スクエアもするし自動運転もする",
      description: "2020-04-16_02, animation"
    },
    {
      id: "2020041601",
      title: "スクロールするしスクエアもまわす",
      description: "2020-04-16_01, scroll"
    },
    {
      id: "2020041503",
      title: "醤油野菜炒め弁当",
      description: "2020-04-15_03, animation"
    },
    {
      id: "2020041502",
      title: "スクロールもするしサークルもする",
      description: "2020-04-15_02, scroll"
    },
    {
      id: "2020041501",
      title: "これはブログです",
      description: "2020-04-15_01, scroll"
    }
  ],
  page(id) {
    return this.pages.find(page => page.id == id)

  },
  prev(id) {
    let current = this.pages.findIndex(page => page.id == id)
    if (current < this.pages.length) {
      return this.pages[current + 1]
    }
    return null
  },
  next(id) {
    let current = this.pages.findIndex(page => page.id == id)
    if (0 < current) {
      return this.pages[current - 1]
    }
    return null
  }
}
