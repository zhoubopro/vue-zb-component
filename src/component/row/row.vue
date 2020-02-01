<template>
  <div class="row" :style="rowStyle">
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
    computed: {
      rowStyle () {
        return {
          marginLeft: `-${this.gutter / 2}px`,
          marginRight: `-${this.gutter / 2}px`
        }
      }
    }, created () {
      // 没有children
      // console.log(this.$children);
      console.log('row created');
    },
    mounted () {
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
