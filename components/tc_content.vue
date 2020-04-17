<template>
  <div class="tc-container">
    <div class="tc-content">
      <a class="tc-site-title" href="/">tksshj.com</a>
      <div class="tc-titles">
        <h1>{{ title }}</h1>
        <h3>{{ date }}</h3>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'date',
    'title'
  ]
}
</script>

<style scoped lang="scss">
.tc-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  .tc-content {
    width: 100%;
    max-width: 480px;
    .tc-titles {
      padding: 24px 16px;
      h1 {
        margin: 0;
        font-size: 20px;
      }
      h3 {
        margin: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
