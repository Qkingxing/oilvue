
<template>
  <div class="member">
    <div class="mainContainreBlock">
      <div class="container animated fadeIn">
        <datas :arrs='arrs' v-if='show'></datas>
      </div>
    </div>
  </div>
</template>

<script>
import {member} from '@/api/data'
import datas from './datas'
export default {
  name: 'Member',
  data(){
    return{
      arrs:[],
      show:false
    }
  },
  components: { datas },
  created(){
    this.members()
  },
  methods:{
    members(index){
        //  if(index == 5){
        //   let weekStarting_time = dateString[0]
        //   let weekEnd_time = dateString[1]
        //    return member({time_type:5,weekStarting_time:weekStarting_time,weekEnd_time:weekEnd_time}).then(res =>{
        //     this.arrBiao = res.data
        //     console.log(this.arrBiao)
        //     this.show = true
        //   })
        // }
        return member({time_status:index?index:1}).then(res =>{
            this.arrs = res.data
        console.log(this.arrs)
        this.show = true
        })
    //   return member({time_status:'1'}).then(res =>{
    //     this.arrs = res.data
    //     console.log(this.arrs)
    //     this.show = true
    //   })
    }
  }
}
</script>
<style lang="scss" scoped>
.member {
  margin: 0px 0px;
  .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    .container {
      position: relative;
      padding-top: 24px;
      .devs {
        .dev {
          position: relative;
          height: 0;
          width: 0;
          top: -1400px;
          left: 236px;
        }
        .dev1 {
          position: relative;
          top: -1400px;
          left: 334px;
          width: 0;
          height: 0;
        }
      }
    }
  }
}
</style>
