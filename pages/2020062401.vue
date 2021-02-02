<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        プログラムには変数とか関数とかオブジェクトとかいうのがあって、それの有効範囲をスコープといいます。
        そしてそのスコープは狭いほうが良いケースが多いです。
        狭くしたり見えなくしたりするためにプライベートにする、みたいなのもあります。
        狭いと管理がしやすくて、逆に広いと予想できないような使い方をされたりして、制御が難しくなります。
      </p>
      <p>
        なので狭い範囲で幸せに生きましょうみたいな、制御できる範囲で生きましょうみたいな、
        現実に戻って人間的ないい雰囲気のことを言いたいところなんですけど、
        範囲がめっちゃ狭い場合は、変数も関数もオブジェクトも存在する必要がないケースも多くなります。
      </p>
      <p>
        まあ適当なスコープで生きてゆけ。おわり。
      </p>
    </template>
  </tc-page>
</template>

<script>
import TcPage from '../components/tc_page.vue'
import TcAnimation from '../components/animations/2020062401.vue'

export default {
  components: {
    'tc-page': TcPage,
    'tc-animation': TcAnimation
  }
}
</script>
