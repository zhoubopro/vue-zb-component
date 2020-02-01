<template>
  <div class="row" :style="{marginLeft: `-${gutter/2}px`, marginRight: `-${gutter/2}px`}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "g-row",
    props: {
      gutter: {
        type: [Number, String]
      }
    },
    created(){
      // 没有children
      // console.log(this.$children);
      console.log('row created');
    },
    mounted(){
      console.log(this.$children);
      console.log('row mounted');
      this.$children.forEach(vm => {
        vm.gutter = this.gutter
      })
    }
  }
</script>

<style scoped lang="scss">
  .row {
    display: flex;
  }
</style>
