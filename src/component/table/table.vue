<template>
  <div class="g-table-wrapper">
    <table class="g-table" :class="{bordered, compact, striped}">
      <thead>
      <tr>
        <th><input type="checkbox"></th>
        <th v-if="numberVisible">#</th>
        <th v-for="column in columns">
          {{column.text}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in dataSource">
        <th><input type="checkbox" @change="onchangeItem(item, index, $event)"></th>
        <td v-if="numberVisible">{{index + 1}}</td>
        <template v-for="column in columns">
          <td>
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
        require: true
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
    methods: {
      onchangeItem (item, index, e) {
        this.$emit('change-item', { selected: e.target.checked, item, index });
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
