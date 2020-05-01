<template>
  <div class="tc-page-dev">
    <h1>dev</h1>

    <div class="tc-slider-row">
      <tc-slider v-model="sliderValue" min=0 max=100></tc-slider>
      <p>{{ sliderValue }}</p>
    </div>

    <div>
      <tc-button @click="buttonClicked"><i class="material-icons">play_arrow</i>Play</tc-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      sliderValue: 0
    }
  }
}
</script>

<style scoped lang="scss">
</style>
