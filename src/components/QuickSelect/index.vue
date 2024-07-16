<template>
  <div class="item-warp">
    <div :class="{ 'item': true, 'active': item.active }" v-for="(item, index) in list" :key="index" @click="handleClick(item)">
       {{ item.value }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'quickSelect',
  props: ['typedata', 'allText'],
  mounted() {
    Object.keys(this.typedata).forEach(key => {
      this.list.push({
        key,
        value: this.typedata[key],
        active: false
      })
    })
  },

  data() {
    return {
      list: [{active: true, value: this.allText, key: ''}]
    }
  },
  methods: {
    handleClick(item) {
      this.list.forEach(i => {
        i.active = false
      })
      item.active = true
      this.$emit('select', item)
    }
  }
}
</script>
<style lang="scss">
.item-warp {
  display: flex;
  padding:0px 0px;
  margin-bottom: 10px;
  .item {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
    margin-right: 4px;
    cursor: pointer;
    background-color: rgb(234, 238, 240);
    &.active {
      color: #fff;
      background-color: #13ce66;
      border-color: #13ce66;

    }
  }
}
</style>
