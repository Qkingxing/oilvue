
<template>
  <div class="refueling">
	  <div class="mainContainreBlock">
		  <div class="container animated fadeIn">
			  <div class="ve-name">
					<span>加油统计</span>
					<a-button>Default</a-button>
			  </div>
			  <div class="condition-bar">
				  <div class="bar-top">
					  <div class="bar-top-left">
						  <div class="title">统计名称</div>
						  <div class="content">员工绩效加油统计</div>
					  </div>
					  <div class="bar-top-right">
						  <div class="title">统计时间</div>
						  <div class="content">2021-01-06 00:00:00 ～ 2021-01-09  23:59:59</div>
					  </div>
				  </div>
				  <div class="bar-bootom">
					  <div class="title">统计时间</div>
					  <div class="assembly">
						  <div class="accd" >
							  	<a-radio-group @change="bba(size)" v-model="size" style="margin-bottom: 16px" size='default'>
									<a-radio-button  value="ri">
										今日
									</a-radio-button>
									<a-radio-button value="zhou">
										本周
									</a-radio-button>
									<a-radio-button value="yue">
										本月
									</a-radio-button>
									<a-radio-button value="yue1">
										上月
									</a-radio-button>
									
								</a-radio-group>
						  </div>
						  <div class="sccd1">
							   <a-range-picker @change="onChange" />
						  </div>
					  </div>
				  </div>
			  </div>
			  <div class="ve-card-view" v-if="size == 'ri'">
				  <div class="title-obj">
					  数据统计
					  <div class="dev">
						<i class="more_info anticon anticon-question-circle">
							<a-popover  overlayClassName="note">
								<template slot="content">
									<div class="" style="width: 200px">
									<p>数据于每日早10点更新</p>
									</div>
								</template>
								<span class="anticon">
									<a-icon type="question-circle" />
								</span>
							</a-popover>
						</i>
					</div>
				  </div>
				  <div class="overflow_box">
					 <labels :lists='lists' v-if="show"></labels>
				  </div>
				  <div class="ve-pie-view">
					  <div class="title-obj">
						  占比图
							<div class="dev">
								<i class="more_info anticon anticon-question-circle">
									<a-popover  overlayClassName="note">
										<template slot="content">
											<div class="" style="width: 200px">
											<p>数据于每日早10点更新</p>
											</div>
										</template>
										<span class="anticon">
											<a-icon type="question-circle" />
										</span>
									</a-popover>
								</i>
							</div>
					  </div>
					  <div class="pie-box">
						  <div class="pie-view">
							  <div class="tap-title">
								  {{cake1.name}}
							  </div>
							  <!-- 1111111111111111111111111111111111 -->
							  <biao :cake1='cake1' v-if="show1"></biao>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								   {{cake2.name}}
							  </div>
							  <biao1 :cake2='cake2' v-if="show1"></biao1>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								  {{cake3.name}}
							  </div>
							  <biao2 :cake3='cake3' v-if="show1"></biao2>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								  {{cake4.name}}
							  </div>
							   <biao3 :cake4='cake4' v-if="show1"></biao3>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
					  </div>

					  
				  </div>


				  
			  </div>

			   <div class="ve-card-view" v-if="size == 'zhou'">
				  <div class="title-obj">
					  数据统计
					  <div class="dev">
						<i class="more_info anticon anticon-question-circle">
							<a-popover  overlayClassName="note">
								<template slot="content">
									<div class="" style="width: 200px">
									<p>数据于每日早10点更新</p>
									</div>
								</template>
								<span class="anticon">
									<a-icon type="question-circle" />
								</span>
							</a-popover>
						</i>
					</div>
				  </div>
				  <div class="overflow_box">
					<labels :lists='lists' v-if="show"></labels>
				  </div>
				  <div class="ve-pie-view">
					  <div class="title-obj">
						  占比图
							<div class="dev">
								<i class="more_info anticon anticon-question-circle">
									<a-popover  overlayClassName="note">
										<template slot="content">
											<div class="" style="width: 200px">
											<p>数据于每日早10点更新</p>
											</div>
										</template>
										<span class="anticon">
											<a-icon type="question-circle" />
										</span>
									</a-popover>
								</i>
							</div>
					  </div>
					 	  <div class="pie-box">
						  <div class="pie-view">
							  <div class="tap-title">
								  {{cake1.name}}
							  </div>
							  <!-- 1111111111111111111111111111111111 -->
							  <biao :cake1='cake1' v-if="show1"></biao>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								   {{cake2.name}}
							  </div>
							  <biao1 :cake2='cake2' v-if="show1"></biao1>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								  {{cake3.name}}
							  </div>
							  <biao2 :cake3='cake3' v-if="show1"></biao2>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								  {{cake4.name}}
							  </div>
							   <biao3 :cake4='cake4' v-if="show1"></biao3>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
					  </div>

					  
				  </div>
			  </div>
			  <div class="ve-card-view" v-if="size == 'yue'">
				  <div class="title-obj">
					  数据统计
					  <div class="dev">
						<i class="more_info anticon anticon-question-circle">
							<a-popover  overlayClassName="note">
								<template slot="content">
									<div class="" style="width: 200px">
									<p>数据于每日早10点更新</p>
									</div>
								</template>
								<span class="anticon">
									<a-icon type="question-circle" />
								</span>
							</a-popover>
						</i>
					</div>
				  </div>
				  <div class="overflow_box">
					<labels :lists='lists' v-if="show"></labels>
				  </div>
				  <div class="ve-pie-view">
					  <div class="title-obj">
						  占比图
							<div class="dev">
								<i class="more_info anticon anticon-question-circle">
									<a-popover  overlayClassName="note">
										<template slot="content">
											<div class="" style="width: 200px">
											<p>数据于每日早10点更新</p>
											</div>
										</template>
										<span class="anticon">
											<a-icon type="question-circle" />
										</span>
									</a-popover>
								</i>
							</div>
					  </div>
					 	  <div class="pie-box">
						  <div class="pie-view">
							  <div class="tap-title">
								  {{cake1.name}}
							  </div>
							  <!-- 1111111111111111111111111111111111 -->
							  <biao :cake1='cake1' v-if="show1"></biao>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								   {{cake2.name}}
							  </div>
							  <biao1 :cake2='cake2' v-if="show1"></biao1>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								  {{cake3.name}}
							  </div>
							  <biao2 :cake3='cake3' v-if="show1"></biao2>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								  {{cake4.name}}
							  </div>
							   <biao3 :cake4='cake4' v-if="show1"></biao3>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
					  </div>

					  
				  </div>
			  </div>
			  <div class="ve-card-view" v-if="size == 'yue1'">
				  <div class="title-obj">
					  数据统计
					  <div class="dev">
						<i class="more_info anticon anticon-question-circle">
							<a-popover  overlayClassName="note">
								<template slot="content">
									<div class="" style="width: 200px">
									<p>数据于每日早10点更新</p>
									</div>
								</template>
								<span class="anticon">
									<a-icon type="question-circle" />
								</span>
							</a-popover>
						</i>
					</div>
				  </div>
				  <div class="overflow_box">
					<labels :lists='lists' v-if="show"></labels>
				  </div>
				  <div class="ve-pie-view">
					  <div class="title-obj">
						  占比图
							<div class="dev">
								<i class="more_info anticon anticon-question-circle">
									<a-popover  overlayClassName="note">
										<template slot="content">
											<div class="" style="width: 200px">
											<p>数据于每日早10点更新</p>
											</div>
										</template>
										<span class="anticon">
											<a-icon type="question-circle" />
										</span>
									</a-popover>
								</i>
							</div>
					  </div>
					  	  <div class="pie-box">
						  <div class="pie-view">
							  <div class="tap-title">
								  {{cake1.name}}
							  </div>
							  <!-- 1111111111111111111111111111111111 -->
							  <biao :cake1='cake1' v-if="show1"></biao>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								   {{cake2.name}}
							  </div>
							  <biao1 :cake2='cake2' v-if="show1"></biao1>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								  {{cake3.name}}
							  </div>
							  <biao2 :cake3='cake3' v-if="show1"></biao2>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
						   <div class="pie-view">
							  <div class="tap-title">
								  {{cake4.name}}
							  </div>
							   <biao3 :cake4='cake4' v-if="show1"></biao3>
							  <!-- <div class="pie-is-null">暂无数据</div> -->
						  </div>
					  </div>

					  
				  </div>
			  </div>
		  </div>
	  </div>
  </div>
</template>

<script>
import biao from './biao' 
import biao1 from './biao1'
import biao2 from './biao2'
import biao3 from './biao3'
import {oilingStatistics} from '@/api/data'
import {revenues} from '@/api/data'
import labels from './labels'
export default {
	name: 'Refueling',
	components:{labels,biao,biao1,biao2,biao3},
    data(){
      return{
		  size: 'ri',
		  lists:[],
		  show:false,
		  show1:false,
		  cake1:{},
		  cake2:{},
		  cake3:{},
		  cake4:{}
      }
	},
	created(){
		this.biao()
		this.biao1()
	},
	methods:{
         bba(vale){
          if(vale == 'ri'){
              this.biao('1')
          }
          if(vale == 'zhou'){
              this.biao('2')
          }
          if(vale == 'yue'){
              this.biao('3')
          }
          if(vale == 'yue1'){
              this.biao('4')
          }
      },
		onChange(date, dateString) {
      		console.log(date, dateString);
                this.biao(5,dateString)
    	},
        biao(index,dateString) {
            if(index == 5){
                let weekStarting_time = dateString[0]
                let weekEnd_time = dateString[1]
                return revenues({ time_status: 5,weekStarting_time:weekStarting_time,weekEnd_time:weekEnd_time}).then((res) => {
                    this.lists = res.data
                    this.show = true
                })
            }
            return revenues({ time_status: index?index:'1'}).then((res) => {
                this.lists = res.data
                this.show = true
            })
        },
        
		biao1(){
			return oilingStatistics({time_type:1}).then(res =>{
				this.cake1 = res.data.cake1
				this.cake2 = res.data.cake2
				this.cake3 = res.data.cake3
				this.cake4 = res.data.cake4
				this.show1 = true
			})
		}
	}
}
</script>

<style lang="scss" scoped>
    .refueling{
      margin: 0px 0px;
	  .mainContainreBlock{
			padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 25px;
			background: #fff;
			min-width: 1004px;
			.container{
				font-family: PingFangSC-Medium,PingFang SC;
    			padding: 24px 0;
				.ve-name{
					display: flex;
					align-items: center;
					justify-content: space-between;
					>span{
						font-size: 16px;
						font-weight: 500;
						color: #040a46;
					}
				}
				.condition-bar{
					width: 100%;
					height: 112px;
					margin-top: 9px;
					padding: 25px 0 25px 24px;
					display: flex;
					flex-direction: column;
					background: #fafafa;
					.bar-top{
						display: grid;
						grid-template-columns: 316px 400px;
						-ms-flex-wrap: nowrap;
						flex-wrap: nowrap;
						.bar-top-left{
							display: flex;
							flex-wrap: nowrap;
							.title{
								font-size: 14px;
								font-family: PingFangSC-Regular,PingFang SC;
								font-weight: 400;
								color: #040a46;
							}
							.content{
								margin-left: 16px;
    							font-weight: 500;
							}
						}
						.bar-top-right{
							display: flex;
							flex-wrap: nowrap;
							.title{
								font-size: 14px;
								font-family: PingFangSC-Regular,PingFang SC;
								font-weight: 400;
								color: #040a46;
							}
							.content{
								margin-left: 16px;
    							font-weight: 500;
							}
						}
					}
					.bar-bootom{
						display: flex;
						align-items: center;
						margin-top: 16px;
						.title{
							font-size: 14px;
							font-family: PingFangSC-Regular,PingFang SC;
							font-weight: 400;
							color: #040a46;
						}
						.assembly{
							display: flex;
							margin-left: 14px;
							margin-top: 2px;
							.sccd1{
								margin-left: 8px;
								height: 32px;
							}
						}
						.ant-radio-button-wrapper{
							width: 78px;
							text-align: center;
						}
					}
				}
				.ve-card-view{
					box-sizing: border-box;
					.title-obj{
						display: flex;
						margin: 24px 0 16px 0;
						font-size: 14px;
						font-family: PingFangSC-Medium,PingFang SC;
						font-weight: 500;
						color: #040a46;
						.dev{
							margin-left: 5px;
							margin-top: -2px;
						}
					}
					.overflow_box{
						// display: grid;
						// grid-gap: 8px;
    					// grid-template-columns: 1fr 1fr 1fr 1fr;
						.overflow_li{
							height: 138px;
							text-align: left;
							position: relative;
							border: 1px solid #eaeaf4;
							border-radius: 4px;

						}
					}
					.pie-box{
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						display: grid;
						grid-template-columns: repeat(2,50%);
						grid-gap: 8px;
						grid-column-gap: 8px;
						padding-right: 5px;
						.pie-view{
							padding: 0 24px;
    						border: 1px solid #e4e7f0;
							.tap-title{
								font-size: 14px;
								font-family: PingFangSC-Medium,PingFang SC;
								font-weight: 500;
								color: #040a46;
								margin: 25px 0 16px 0;
							}
							.pie-is-null{
								font-size: 14px;
								font-family: PingFangSC-Regular,PingFang SC;
								font-weight: 400;
								color: #3c3c46;
								height: 320px;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}
					}
				}
			}
	  }
    }
</style>
