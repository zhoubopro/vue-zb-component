<template>
  <div class="g-table-wrapper">
    <table
      class="g-table" :class="{bordered, compact, striped}">
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
          {{column.text}}
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
</template>

<script>
  export default {
    name: "g-table",
    props: {
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
    methods: {
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
    }
  }
</script>

<style scoped lang="scss">
  $tgrey: darken($grey, 10%);
  .g-table-wrapper {
    display: flex;
    justify-content: center;
    .g-table {
      width: 98%;
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
      th, td {
        border-bottom: 1px solid $tgrey;
        text-align: left;
        padding: 8px;
      }
    }
  }
</style>
