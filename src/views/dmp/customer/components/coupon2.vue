<template>
  <div class="block">
    <span>券名称</span>
    <div class="seleck">
      <el-select v-model="selectedArray" @change="changeSelect" placeholder="请选择">
        <el-option label="全选" value="全选" ></el-option>
        <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.label" @click="bba(index)"></el-option>
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
        { name: '1-10元随机券', label: '1' },
        { name: '100元加油站1', label: '2' },
        { name: '100', label: '3' },
      ],
    }
  },
  methods: {
    changeSelect(val) {
      console.log(val)
    this.$emit('name',val)
    },
    
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