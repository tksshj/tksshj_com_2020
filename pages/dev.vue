<template>
  <div class="tc-page-dev">
    <h1>dev</h1>

    <div class="tc-slider-row">
      <div class="tc-slider"><input type="range" v-model="sliderValue" min=0 max=100></div>
      <p>{{ sliderValue }}</p>
    </div>

    <div>
      <button @click="buttonClicked"><i class="material-icons">play_arrow</i>Play</button>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
</style>
