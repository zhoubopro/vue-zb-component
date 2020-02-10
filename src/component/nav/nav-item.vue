<template>
  <div
    class="g-nav-item"
    :class="{selected}"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "g-nav-item",
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        selected: false
      }
    },
    methods:{
      onClick(){
        this.$emit('add:selected', this.name)
      }
    }
  }
</script>

<style scoped lang="scss">
  .g-nav-item {
    padding: 10px 20px;
    &.selected {
      background: #795da3;
    }
  }
</style>
