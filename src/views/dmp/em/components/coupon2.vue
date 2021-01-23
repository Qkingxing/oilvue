<template>
  <div class="block">
    <span>券名称</span>
    <div class="seleck">
      <el-select multiple filterable  collapse-tags v-model="selectedArray" @change="changeSelect" placeholder="请选择">
        <el-option label="全选" value="全选" @click.native="selectAll"></el-option>
        <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </div>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      selectedArray: [],
      options: [
        { name: '1-10元随机券', label: 'one' },
        { name: '100元加油站1', label: 'tow' },
        { name: '100', label: 'tow' },
      ],
    }
  },
  methods: {
    selectAll() {
      if (this.selectedArray.length < this.options.length) {
        this.selectedArray = []
        this.options.map((item) => {
          this.selectedArray.push(item.name)
        })
        this.selectedArray.unshift('全选')
      } else {
        this.selectedArray = []
        this.$message.warning('查询券类型、券名称领券渠道不能为空')
      }
    },
    changeSelect(val) {
      if (!val.includes('全选') && val.length === this.options.length) {
        this.selectedArray.unshift('全选')
      } else if (val.includes('全选') && val.length - 1 < this.options.length) {
        this.selectedArray = this.selectedArray.filter((item) => {
          return item !== '全选'
        })
      }
    },
    // removeTag(val) {
    //   if (val === '全选') {
    //     this.selectedArray = []
    //   }
    // },
  },
}
</script>

<style lang="scss" scoped>
    .block{
        display: flex;
        span{
            padding-top: 9px;
        }
        .el-select{
            margin-left: 10px;
            border: 0;
        }
    }
    
</style>