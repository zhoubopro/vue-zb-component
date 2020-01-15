<template>
  <button class="g-button" :class="{[`icon-${iconPosition}`]: true}">
    <svg v-if="icon" class="svg-icon">
      <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
    <span class="content">
      <slot></slot>
    </span>
  </button>
</template>
<script>
  export default {
    props: {
      icon: {
        type: String,
        default: ''
      },
      iconPosition: {
        type: String,
        default: 'left'
      }
    }
  }
</script>
<style lang="scss">
  .g-button {
    font-size: var(--font-size);
    height: var(--button-height);
    padding: 0 1em;
    /*font: inherit;*/
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--button-bg);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    &:hover {
      border-color: var(--border-color-hover);
    }
    &:active {
      background: var(--button-active-bg);
    }
    &:focus {
      outline: none;
    }
    > .svg-icon {
      order: 1;
      margin: .1em .2em 0 0;
    }
    > .content {
      order: 2;
    }
    &.icon-right {
      > .content {
        order: 1;
      }
      > .svg-icon {
        order: 2;
        margin: .1em 0 0 .2em;
      }
    }
  }
</style>
