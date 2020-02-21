<template>
  <div class="g-table-wrapper" ref="wrapper">
    <div :style="{height, overflow: 'auto'}">
      <table
        class="g-table" :class="{bordered, compact, striped}"
        ref="table"
      >
        <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              @change="onChangeAllItems"
              ref="allChecked"
              :checked="areAllItemsSelected"
            />
          </th>
          <th v-if="numberVisible">#</th>
          <th v-for="column in columns" :key="column.field">
            <div class="g-table-header">
              {{column.text}}
              <span
                v-if="column.field in orderBy"
                class="g-table-sorter"
                @click="changeOrderBy(column.field)"
              >
            <g-icon
              name="up-arrow"
              :class="{active: orderBy[column.field] === 'asc'}">
            </g-icon>
            <g-icon
              name="down-arrow"
              :class="{active: orderBy[column.field] === 'desc'}">
            </g-icon>
          </span>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in dataSource" :key="item.id">
          <td>
            <input
              type="checkbox"
              @change="onchangeItem(item, index, $event)"
              :checked="inSelectedItems(item)"
            />
          </td>
          <td v-if="numberVisible">{{index + 1}}</td>
          <template v-for="column in columns">
            <td :key="column.field">
              {{item[column.field]}}
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="g-table-loading">
      <g-icon name="set"></g-icon>
    </div>
  </div>
</template>

<script>
  import GIcon from '../icon/icon';

  export default {
    name: "g-table",
    components: {
      GIcon,
    },
    props: {
      height: {
        type: String
      },
      orderBy: {
        type: Object,
        default: () => ({}),
      },
      loading: {
        type: Boolean,
        default: false,
      },
      striped: {
        type: Boolean,
        default: true
      },
      selectedItems: {
        type: Array,
        default: () => []
      },
      compact: {
        type: Boolean,
        default: false
      },
      columns: {
        type: Array,
        require: true
      },
      dataSource: {
        type: Array,
        require: true,
        validator (array) {
          return array.filter(item => item.id === undefined).length > 0 ? false : true;
        }
      },
      numberVisible: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      areAllItemsSelected () {
        let a = this.dataSource.map(item => item.id).sort();
        let b = this.selectedItems.map(item => item.id).sort();
        if (a.length !== b.length) {
          return false
        }
        let equal = true;
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            equal = false;
            break;
          }
        }
        return equal;
      }
    },
    mounted () {
      this.table2 = this.$refs.table.cloneNode(true);
      this.onWindowResize = this.updateHeadersWidth();
      window.addEventListener('resize', () => this.onWindowResize)
    },
    methods: {
      updateHeadersWidth () {
        let table2 = this.table2;
        table2.classList.add('g-table-copy');
        let tableHeader = Array.from(this.$refs.table.children).filter(node => node.tagName.toLowerCase() === 'thead')[0]
        let tableHeader2;
        Array.from(table2.children).map(node => {
          if (node.tagName.toLowerCase() !== 'thead') {
            node.remove()
          } else {
            tableHeader2 = node
          }
        });
        Array.from(tableHeader.children[0].children).map((th, index) => {
          const { width } = th.getBoundingClientRect();
          tableHeader2.children[0].children[index].style = width + 'px';
        });
        this.$refs.wrapper.appendChild(table2);
      },
      changeOrderBy (key) {
        const copy = JSON.parse(JSON.stringify(this.orderBy));
        let oldValue = copy[key];
        if (oldValue === 'asc') {
          copy[key] = 'desc';
        } else if (oldValue === 'desc') {
          copy[key] = true;
        } else {
          copy[key] = 'asc';
        }
        this.$emit('update:orderBy', copy)
      },
      inSelectedItems (item) {
        return this.selectedItems.filter(i => i.id === item.id).length > 0;
      },
      onchangeItem (item, index, e) {
        let selected = e.target.checked;
        let copyItems = JSON.parse(JSON.stringify(this.selectedItems));
        if (selected) {
          copyItems.push(item)
        } else {
          copyItems = copyItems.filter(i => i.id !== item.id)
        }
        this.$emit('update:selectedItems', copyItems);
      },
      onChangeAllItems (e) {
        let selected = e.target.checked;
        this.$emit('update:selectedItems', selected ? this.dataSource : []);
      }
    },
    watch: {
      // 半选
      selectedItems () {
        if (this.selectedItems.length === this.dataSource.length) {
          this.$refs.allChecked.indeterminate = false
        } else if (this.selectedItems.length === 0) {
          this.$refs.allChecked.indeterminate = false
        } else {
          this.$refs.allChecked.indeterminate = true
        }
      }
    },
    beforeDestroy(){
      window.removeEventListener('remove', this.onWindowResize);
      this.table2.remove();
    }
  }
</script>

<style scoped lang="scss">
  $tgrey: darken($grey, 10%);
  .g-table-wrapper {
    position: relative;
    overflow: auto;
    .g-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      border-bottom: 1px solid $tgrey;
      &.bordered {
        border: 1px solid $tgrey;
        td, th {
          border: 1px solid $tgrey;
        }
      }
      &.compact {
        th, td {
          padding: 4px;
        }
      }
      &.striped {
        tbody {
          > tr {
            &:nth-child(odd) {
              background: white;
            }
            &:nth-child(even) {
              background: lighten($tgrey, 12%);
            }
          }
        }
      }
      &-sorter {
        display: inline-flex;
        flex-direction: column;
        margin: 0 4px;
        cursor: pointer;
        svg {
          width: 8px;
          height: 8px;
          fill: $grey;
          &.active {
            fill: red;
          }
        }
      }
      &-header {
        display: flex;
        align-items: center;
      }
      th, td {
        border-bottom: 1px solid $tgrey;
        text-align: left;
        padding: 8px;
      }
      /*&-wrapper{*/
      /*position: relative;*/
      /*overflow: auto;*/
      /*}*/
      &-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.7);
        svg {
          width: 30px;
          height: 30px;
          animation: spin 1.5s infinite linear;
        }
      }
      &-copy {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: white;
      }
    }
  }
</style>
