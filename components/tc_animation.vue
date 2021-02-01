<template>
  <div id="tc-animation" class="tc-animation" />
</template>

<script>
export default {
  props: {
    animation: String
  }
}
</script>

<style scoped lang="scss">
.tc-animation {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
