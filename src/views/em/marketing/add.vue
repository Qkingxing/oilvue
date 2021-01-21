
<template>
  <div class="add">
    <a-layout v-if="$route.name=='add'">
      <a-layout-content :style="{padding: '24px', minHeight: '280px' }">
       <a-card>
         <a-steps :current="0">
             <a-step>
               <!-- <span slot="title">Finished</span> -->
               <template slot="title">
                 设置基础信息
               </template>
             </a-step>
             <a-step title="使用规则设置" />
             <a-step title="完成" />
           </a-steps>
       </a-card>
       <a-card style="margin-top: 10px;">
         11
       </a-card>
      </a-layout-content>
    </a-layout>
   </div>
</template>

<script>
import { getRoleList, getServiceList } from '@/api/manage'
export default {
  name: 'Clist',
  components: {
  },
  data () {
    return {
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
    }
  },
  created () {
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.o-title{
  font-weight: 600;
}
.screen-box{
  padding: 27px 0 24px 0;
  .screen-item{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #1e1e28;
  }
  .screen-item-inline{
    display: inline-block;
    margin-bottom: 16px;
    color: #1e1e28;
  }
}
.search-btn{
  margin-left: 72px;
  margin-top: 8px;
}
.showDataForTable{
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal{
    height: 63px;
    text-align: center;
    border-top: 1px solid #eaeaf4;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    font-size: 16px;
    font-weight: 500;
    color: #1e1e28;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec{
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor{
  color: #3b85ff;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}

</style>
