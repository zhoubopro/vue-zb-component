<template>
  <svg class="g-icon" @click="$emit('click', $event)">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="scss">
  .g-icon {
    width: 1em;
    height: 1em;
  }
</style>
