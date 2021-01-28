<template>
  <div class="reports">
    <a-layout v-if="$route.name=='os_install'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <h3 class="o-title">零管配置</h3>
         <a-divider />
         <h3>班结</h3>
         <a-form layout="inline" style="margin-left: 50px;">
           <a-row :gutter="48">
             <a-col :md="24" :sm="24">
               <a-radio-group>
                 <a-radio :value="1">
                   班结模式
                 </a-radio>
                 <a-radio :value="2" style="margin-left: 10px;">
                   零管班结
                 </a-radio>
                 <a-radio :value="3" style="margin-left: 10px;">
                   SaaS 班结
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
