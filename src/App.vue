<template>
  <div id="app">
    <div style="margin-top: 20px">
      <g-table
        bordered
        compact
        :columns="columns"
        :data-source="dataSource"
        @change-item="onItem"
      />
    </div>
    {{selected}}
    <div style="margin-top: 20px">
      <g-pages :total-page="20" :current-page.sync="currentPage"></g-pages>
    </div>
  </div>
</template>

<script>
  import GPages from './component/pager/pager'
  import GTable from './component/table/table'

  export default {
    name: 'app',
    components: {
      GPages,
      GTable
    },
    data () {
      return {
        currentPage: 1,
        columns: [
          { text: '姓名', field: 'name' },
          { text: '分数', field: 'score' },
        ],
        dataSource: [
          { id: 1, name: '周博', score: 100 },
          { id: 2, name: '周周', score: 80 },
          { id: 3, name: 'zz', score: 99 },
          { id: 4, name: 'xx', score: 70 },
          { id: 5, name: 'cc', score: 89 },
          { id: 6, name: 'dd', score: 98 },
          { id: 7, name: 'ee', score: 66 },
          { id: 8, name: 'ff', score: 77 },
          { id: 9, name: 'gg', score: 89 },
        ],
        selected: []
      }
    },
    created () {

    },
    methods: {
      onItem (object) {
        console.log(object);
        const { selected, item, index } = object
        if (selected) {
          this.selected.push(item)
        } else {
          let index = this.selected.indexOf(item);
          this.selected.splice(index, 1);
        }
      }
    },
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
