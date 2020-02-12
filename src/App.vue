<template>
  <div id="app">
    <g-nav :selected.sync="selected" :multiple="multiple" style="width: 200px;" @update:selected="onChange">
      <g-nav-item name="home">
        首页
      </g-nav-item>
      <g-sub-nav name="about">
        <template slot="title">关于</template>
        <g-nav-item name="qiye">企业文化</g-nav-item>
        <g-nav-item name="item">开发团队</g-nav-item>
        <g-sub-nav name="tel">
          <template slot="title">联系方式</template>
          <g-nav-item name="wechat">weChat</g-nav-item>
          <g-nav-item name="qq">QQ</g-nav-item>
          <g-sub-nav name="phone">
            <template slot="title">Tel</template>
            <g-nav-item name="yd">移动</g-nav-item>
            <g-nav-item name="lt">联通</g-nav-item>
            <g-nav-item name="dx">电信</g-nav-item>
          </g-sub-nav>
        </g-sub-nav>
      </g-sub-nav>
      <g-nav-item name="other">其他</g-nav-item>
    </g-nav>
    <div>
      中午啊啊啊啊
      中午啊啊啊啊
    </div>
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

    },
    methods:{
      onChange(selected){
        alert(selected)
      }
    },
    watch:{
      selected(newVal){
        console.log(newVal);
      }
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
