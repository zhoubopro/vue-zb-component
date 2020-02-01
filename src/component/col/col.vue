<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "g-col",
    props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String],
        default: 0
      },
      // gutter: {
      //   type: [Number, String]
      // }
    },
    data () {
      return {
        gutter: 0
      }
    },
    computed: {
      colClass () {
        const { span, offset } = this;
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`
        ]
      },
      colStyle () {
        return {
          paddingLeft: `${this.gutter / 2}px`,
          paddingRight: `${this.gutter / 2}px`
        }
      }
    },
    created () {
      console.log('col created');
    },
    mounted () {
      console.log('col mounted');
    }
  }
</script>

<style scoped lang="scss">
  .col {
    width: 50%;
    $span-prefix: col-;
    @for $n from 1 through 24 {
      &.#{$span-prefix}#{$n} {
        width: ($n/24) * 100%;
      }
    }
    $offset-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$offset-prefix}#{$n} {
        margin-left: ($n/24) * 100%;
      }
    }
  }
</style>
