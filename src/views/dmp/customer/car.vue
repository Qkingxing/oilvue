
<template>
  <div class="car">
      <div class="mainContainreBlock">
		  <div class="container animated fadeIn">	  
				<datas1 :arrBiao='arrBiao' v-if="show"></datas1>
		  </div>
		  
      </div>
  </div>
</template>

<script>
import datas1 from './datas1'
import {carinfo} from '@/api/data'
export default {
	components:{datas1},
    name: 'Car',
    data(){
      return{
        arrBiao:[],
        show:false
      }
    },
    mounted(){
      this.biao()
    },
    methods:{
      biao(index,dateString){
           if(index == 5){
          let weekStarting_time = dateString[0]
          let weekEnd_time = dateString[1]
           return carinfo({time_type:5,weekStarting_time:weekStarting_time,weekEnd_time:weekEnd_time}).then(res =>{
            this.arrBiao = res.data
            console.log(this.arrBiao)
            this.show = true
          })
        }
        return carinfo({time_type:index?index:1}).then(res =>{
          this.arrBiao = res.data
          console.log(this.arrBiao)
          this.show = true
        })
        
      }
    }
}
</script>

<style lang="scss" scoped>
    .car{
		padding-top: 0px;
      .mainContainreBlock{
		padding-left: 24px;
		padding-right: 24px;
		padding-bottom: 25px;
		background: #fff;
		min-width: 1004px;
		.container{
			position: relative;
			padding-top: 20px;
			
		}
      }
    }
</style>
