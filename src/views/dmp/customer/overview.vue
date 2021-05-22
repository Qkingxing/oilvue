
<template>
  <div class="overview">
      <div class="overview_a">
          <div class="overview_title">
              <span>客户概括</span>
              <!-- <div class="btns">
                   <a-button>创造标签</a-button>
                   <a-button>创造标签</a-button>
              </div> -->
          </div>
          <!-- <div class="overview_a1">
              <shujian></shujian>
          </div> -->
          <div class="overview_a2">
              <times :arr='arr' v-if="show" :lists='lists'></times>
          </div>
      </div>
  </div>
</template>

<script>

import coupon1 from './components/coupon1'
import coupon2 from './components/coupon2'
import times from './components/times'
import {customer} from '@/api/data'
import {customerStatistics} from '@/api/data'
export default {
    name: 'Coverview',
     components: { coupon1, coupon2,times, },
    data(){
        return{
            lists:[],
            lineChart1:[],
            arr:[],
            show:false
        }
    },
    created(){
        this.customers()
     this.customerStatisticss()
    },
    methods:{
        customers(index,dateString){
            if(index == 5){
            let weekStarting_time = dateString[0]
            let weekEnd_time = dateString[1]
            return customer({time_status:5,weekStarting_time:weekStarting_time,weekEnd_time:weekEnd_time}).then(res =>{
                this.lists = res.data
                console.log(this.lists)
            })
            }
            return customer({time_status:index?index:1}).then(res =>{
            this.lists = res.data
            console.log(this.lists)
            })
      },
      customerStatisticss(){
          return customerStatistics({time_status:1}).then(res =>{
             this.arr = res.data
             console.log(this.arr)
             this.show = true
            
          })
      }
    },
}
</script>
<style lang="scss" scoped>
    .overview{
       margin: 0px 0px;
        .overview_a{
            padding-left: 24px;
            padding-right: 24px;
            padding-bottom: 25px;
            background: #fff;
            min-width: 1004px;
            overflow: auto;
            .overview_title{
                font-size: 16px;
                font-weight: 700;
                color: #040a46;
                height: 55px;
                line-height: 41px;
                border-bottom: 1px solid #eaeaf4;
                height: 56px;
                line-height: 56px;
                margin-bottom: 24px;
                .btns{
                    height: 56px;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    float: right;
                }
            }
        }
        .overview_a1{
            display: flex;
            align-items: center;
            overflow: hidden;
            padding-bottom: 8px;
        }
    }
</style>
