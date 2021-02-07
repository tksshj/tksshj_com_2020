<template>
  <tc-page>
    <template slot="animation">
      <tc-animation />
    </template>
    <template slot="main">
      <p>
        プログラムには変数とか関数とかオブジェクトとかいうのがあって、それの有効範囲がスコープ。
        そしてそのスコープは狭いほうが良いケースが多い。
        狭くしたり見えなくしたりするためにプライベートにする、みたいなのもある。
        狭いと管理がしやすくて、逆に広いと予想できないような使い方をされたりして、制御が難しくなる。
        でも広いものがどうしても必要なケースもある。環境とか言われる。
      </p>
      <p>
        自分がこのオブジェクトだとすると、自分の影響する範囲を大きくすると、バグりやすくなる。
        管理する側だとすると、影響範囲が小さいほうが扱いやすい。
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
