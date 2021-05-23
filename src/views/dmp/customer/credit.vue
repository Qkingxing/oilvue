
<template>
  <div class="credit">
      <div class="mainContainreBlock">
		  <div class="container animated fadeIn">
			  <div class="head-title">
				  <p>积分统计</p>
			  </div>
			  <div class="dateTabForSquareContainer">
				  <shujian :lists='lists' v-if="show"></shujian>
			  </div>
			  <!-- <div class="content">
				  <biao2 :lists='lists' :index='index' :dateString='dateString' v-if="show"></biao2>
			  </div> -->
		  </div>
      </div>
  </div>
</template>

<script>
import shujian from './shujian'
// import biao2 from './biao2'
import {statistics} from '@/api/data'
import {customerIntegralStatistics} from '@/api/data'
export default {
	components:{shujian},
    name: 'Credit',
    data(){
        return{
			lists:[],
            lineChart1:[],
            lineChart2:[],
			show:false,
        }
    },
	mounted(){
		this.biao()
        // this.biaos()
	},
	methods:{
		biao(index,dateString){
            if(index == 5){
                let weekStarting_time = dateString[0]
                let weekEnd_time = dateString[1]
                return statistics({time_status:5,weekStarting_time:weekStarting_time,weekEnd_time:weekEnd_time}).then(res =>{
				this.lists = res.data
				this.show = true
			})
            }
			return statistics({time_status:index?index:1}).then(res =>{
				this.lists = res.data
				this.show = true
			})
		},
         biaos(index,dateString){
           if(index == 5){
               let weekStarting_time = dateString[0]
              let weekEnd_time = dateString[1]
              return customerIntegralStatistics({time_type:5,weekStarting_time:weekStarting_time,weekEnd_time:weekEnd_time}).then(res =>{
             this.lineChart1 = res.data.lineChart1
             this.lineChart2 = res.data.lineChart2
               console.log(this.lineChart1)
           })
           }
           return customerIntegralStatistics({time_type:index?index:1}).then(res =>{
             this.lineChart1 = res.data.lineChart1
             this.lineChart2 = res.data.lineChart2
             this.show = true
              console.log(this.lineChart2)
           })
       },
	}
}
</script>
<style lang="scss" scoped>
    .credit{
          padding-top: 0px;
		  .mainContainreBlock{
			padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 25px;
			background: #fff;
			min-width: 1004px;
			overflow: auto;  
			.container{
				.head-title{
					font-size: 16px;
					font-weight: 700;
					color: rgb(30, 30, 40);
					border-bottom: 1px solid rgb(234, 234, 244);
					height: 56px;
					line-height: 56px;
					margin-bottom: 10px;
					
				}
				.dateTabForSquareContainer{
					display: flex;
				}
				.content{
					box-sizing: border-box;
				}
			}
		  }
    }
</style>
