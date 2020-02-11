<template>
  <div class="g-sub-nav" :class="{active}" v-click-outside="close">
    <span @click="onClick" class="g-sub-nav-label">
      <slot name="title"></slot>
      <span class="g-sub-nav-icon" :class="{open}">
        <g-icon name="arrowright"></g-icon>
      </span>
    </span>
    <div class="g-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ClickOutside from '../../utils/click-outside';
  import GIcon from '../icon/icon';

  export default {
    name: "g-sub-nav",
    directives: { ClickOutside },
    inject: ['root'],
    components: {
      GIcon
    },
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        open: false,
      }
    },
    computed: {
      active () {
        return this.root.namePath.indexOf(this.name) >= 0 ? true : false;
      }
    },
    methods: {
      onClick () {
        this.open = !this.open
      },
      updateNamePath () {
        console.log('x');
        // this.active = true;
        this.root.namePath.unshift(this.name);
        if (this.$parent.updateNamePath) {
          this.$parent.updateNamePath();
        } else {
          // this.root.namePath = []
        }
      },
      close () {
        this.open = false
      }
    }
  }
</script>

<style scoped lang="scss">
  $border-radius: 4px;
  $blue: #4a90e2;
  .g-sub-nav {
    position: relative;
    &.active {
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-bottom: 2px solid $blue;
      }
    }
    &-label {
      padding: 10px 20px 10px 20px;
      display: block;
    }
    &-icon {
      display: none;
    }
    &-popover {
      position: absolute;
      top: 100%;
      left: 0;
      white-space: nowrap;
      background: white;
      box-shadow: 0 0 3px fade_out(black, .8);
      margin-top: 4px;
      border-radius: $border-radius;
      font-size: 14px;
      color: #666;
      min-width: 8em;
    }
  }
  .g-sub-nav .g-sub-nav {
    display: flex;
    &.active {
      &::after {
      display: none;
      }
    }
    &-label {
      padding: 10px 10px 10px 20px;
      display: block;
    }
    .g-sub-nav-popover {
      top: 0;
      left: 100%;
      margin-left: 8px;
    }
    .g-sub-nav-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
    }
    .g-sub-nav-icon {
      display: inline-flex;
      margin-left: 1em;
      transition: transform .3s;
      svg {
        fill: #666;
      }
      &.open {
        transform: rotate(180deg);
      }
    }
  }
</style>
