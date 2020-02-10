<template>
  <div class="g-nav">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "g-nav",
    props: {
      selected: {
        type: Array,
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      items () {
        return this.$children.filter(vm => vm.$options.name === "g-nav-item");
      }
    },
    mounted () {
      this.updateChildren();
      this.listenToChildren();
    },
    updated () {
      this.updateChildren();
    },
    methods: {
      updateChildren () {
        this.items.forEach(vm => {
          if (this.selected.indexOf(vm.name) >= 0) {
            vm.selected = true
          } else {
            vm.selected = false
          }
        });
      },
      listenToChildren () {
        this.items.forEach(vm => {
          vm.$on('add:selected', (name) => {
            if (this.multiple) {
              if (this.selected.indexOf(name) < 0) {
                let copySelected = JSON.parse(JSON.stringify(this.selected));
                copySelected.push(...name);
                this.$emit('update:selected', copySelected);
              }
            }
            else {
              this.$emit('update:selected', [name]);
            }
          })
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .g-nav {
    display: flex;
    border: 1px solid red;
  }
</style>
