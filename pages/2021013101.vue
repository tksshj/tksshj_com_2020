<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        Dewar'sが1300円くらい、BEEFEATERが1000円くらい、EARLY TIMESが1200円くらい。
      </p>
      <p>
        Dewar'sはソーダ割り、BEEFEATERもソーダ割り、EARLY TIMESはストレート。
      </p>
      <p>
        ビンの音とか、キャップとか、液体の色とか。
      </p>
      <p>
        所有するという感覚は固体のイメージ、でも最近はデータっていうのも多いか。
        液体も所有しているという感覚はなくて、ビンにその感覚があるかも。
      </p>
      <p>
        所有できないけど持ってるものっていうのもあるな、友達とか。
      </p>
      <p>
        アニメーション、適当だけどまあまあ好き。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2021013101.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
