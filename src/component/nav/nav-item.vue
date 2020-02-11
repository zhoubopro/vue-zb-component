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
    inject:['root'],
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
    created(){
      this.root.addItem(this)
    },
    methods:{
      onClick(){
        this.root.namePath = [];
        this.$parent.updateNamePath && this.$parent.updateNamePath();
        this.$emit('add:selected', this.name);
      }
    }
  }
</script>

<style scoped lang="scss">
  /*@import "../../styles";*/
  $blue: #4a90e2;
  .g-nav-item {
    padding: 10px 20px;
    &.selected {
      position: relative;
      &::after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-bottom: 2px solid $blue;
      }
    }
  }

  .g-sub-nav .g-nav-item{
    &.selected{
      color: #333;
      background: #eee;
      &::after{
        display: none;
      }
    }
  }
</style>
