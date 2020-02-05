<template>
  <div id="app">
    <g-button icon="set">
      按钮
    </g-button>
  </div>
</template>

<script>
  import Button from './component/button'

  export default {
    name: 'app',
    components: {
      'g-button': Button
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  html {
    --font-size: 14px;
  }
  :root {
    --button-height: 32px;
    --font-size: 14px;
    --button-bg: white;
    --button-active-bg: #eee;
    --border-radius: 4px;
    --color: #999;
    --border-color: #999;
    --border-color-hover: #666;
  }
  body {
    font-size: var(--font-size);
  }
</style>
