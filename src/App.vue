<template>
  <div id="app">
    <g-slide class="wrapper" :selected.sync="selected" :timer="timer">
      <g-slide-item :name="item" v-for="(item, index) in items" :key="index">
        <div class="box">{{item}}</div>
      </g-slide-item>
    </g-slide>
  </div>
</template>

<script>
  import GSlide from './component/slide/slide'
  import GSlideItem from './component/slide/slide-item'

  export default {
    name: 'app',
    components: {
      GSlide,
      GSlideItem
    },
    data () {
      return {
        selected: 'first',
        timer: 3,
        items: ['first', 'two', 'three']
      }
    },
    created(){

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
  .wrapper{
    margin: 40px;
  }
  .box {
    width: 100%;
    height: 350px;
    background: deepskyblue;
    color: #ffffff;
    font-size: 30px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>
