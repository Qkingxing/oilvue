<template>
  <a-modal
    title="温馨提示"
    centered
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :bodyStyle="{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }"
  >
    <div class="flex items-center">
      <div class="tips">请选择该会员等级配置生效的时间</div>
      <a-date-picker
        :allowClear="false"
        v-model="date"
        format="YYYY-MM-DD"
        :disabled-date="disabledDate"
        style="min-width: 195px; width: 220px;"
        @change="onChangeDate"
      />
    </div>
    
  </a-modal>
</template>

<script>
import moment from 'moment';
import { updateMemberSpalevel } from '@/api/crm'
export default {
  name: 'GrowModal',
  data(){
    return {
      date: moment(new Date()).add(1,'days').startOf('day'),
      star_time: moment(new Date()).add(1,'days').startOf('day').format('YYYY-MM-DD'),
      visible: false,
      confirmLoading: false,
    }
  },
  created(){

  },
  mounted(){

  },
  methods:{
    show() {
      this.visible = true;
    },
    onChangeDate(date, text){
      // console.log(date)
      // console.log(text)
      this.star_time = text
    },
    // 禁止选择今天之前的时间
    disabledDate(current) {
      // 正式上线要改回来
      return current && current < moment().startOf('day');
      // return current && current < moment().endOf('day');
    },
    handleOk(e) {
      this.confirmLoading = true;
      updateMemberSpalevel(this.star_time).then(()=>{
        this.visible = false;
        this.confirmLoading = false;
        this.$emit('back')
      })
    },
    handleCancel(e) {
      this.visible = false;
    },
  }
}
</script>

<style lang="less" scoped>
.tips{
  margin-bottom: 10px;
  color: #c7c7c7;
}
</style>