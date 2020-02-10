<template>
  <div id="app">
    <g-nav :selected.sync="selected" :multiple="multiple">
      <g-nav-item name="home">首页</g-nav-item>
      <g-sub-nav>
        <template slot="title">关于</template>
        <g-nav-item name="qiye">企业文化</g-nav-item>
        <g-nav-item name="item">开发团队</g-nav-item>
        <g-nav-item name="other">联系电话</g-nav-item>
      </g-sub-nav>
      <g-nav-item name="other">其他</g-nav-item>
    </g-nav>
  </div>
</template>

<script>
  import GNav from './component/nav/nav'
  import GNavItem from './component/nav/nav-item'
  import GSubNav from './component/nav/sub-nav'

  export default {
    name: 'app',
    components: {
      GNav,
      GNavItem,
      GSubNav
    },
    data () {
      return {
        selected: ['qiye'],
        multiple: false
      }
    },
    created () {

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
