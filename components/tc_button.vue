<template>
  <button @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  margin: 8px 8px;
  padding: 0 16px 0 4px;
  background: none;
  border: solid 2px #5F5F7F;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5F5F7F;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
    background-color: #EAEAEA;
  }
  i.material-icons {
    display: block;
    font-size: 32px;
    padding: 0 4px 0 0;
  }
  a {
    text-decoration: none;
  }
}
</style>
