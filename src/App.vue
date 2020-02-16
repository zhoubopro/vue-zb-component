<template>
  <div id="app">
    <g-pages :total-page="20" :current-page.sync="currentPage"></g-pages>
  </div>
</template>

<script>
  import GPages from './component/pager/pager'

  export default {
    name: 'app',
    components: {
      GPages,
    },
    data () {
      return {
        currentPage: 1
      }
    },
    created () {

    },
    methods: {},
    watch: {}
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
