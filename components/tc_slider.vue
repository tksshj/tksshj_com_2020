<template>
  <div>
    <input
      type="range"
      max="max"
      min="min"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: [
    'max',
    'min',
    'value'
  ]
}
</script>

<style scoped lang="scss">
input[type="range"] {
  appearance: none;
  height: 4px;
  width: 100%;
  background-color: #5F5F7F;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: #5F5F7F;
    border-radius: 50%;
  }
}
</style>
