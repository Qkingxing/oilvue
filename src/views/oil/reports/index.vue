<template>
  <div class="reports">
    <a-layout v-if="$route.name=='write_off'">
      <a-layout-content :style="{ margin: '24px 0', padding: '24px', background: '#fff', minHeight: '280px' }">
        <h3 class="o-title">零管配置</h3>
         <a-divider />
         <h3></h3>
         <a-form layout="inline" >
           <a-row :gutter="48">
             <a-col :md="24" :sm="24">
               <a-radio-group v-model="orderTime" @change="onChange">
                 <a-radio :value="1">
                   今日
                 </a-radio>
                 <a-radio :value="2" style="margin-left: 10px;">
                   本周
                 </a-radio>
                 <a-radio :value="3" style="margin-left: 10px;">
                   本月
                 </a-radio>
               </a-radio-group>
             </a-col>
           </a-row>
         </a-form>
      </a-layout-content>
    </a-layout>
    </div>
</template>

<script>
export default {
    name: 'Reports'
}
</script>
