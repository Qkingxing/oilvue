<template>
  <a-layout-content 
    :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '600px', position: 'relative' }">

      <div class="page-title">
        <b>活动详情</b>
        <a-button @click="$router.go(-1)">返 回</a-button>
      </div>

      <div class="page-content" v-loading="loading">
        <div class="page-content-item intr" v-if="detail">
          <div class="intr-right flex-col1">
            <div class="middle">
              <div class="activity-info">
                <div class="activity-label">活动id</div>
                <div class="activity-content">{{detail.id}}</div>
              </div>
              <div class="activity-info">
                <div class="activity-label">活动名称</div>
                <div class="activity-content">{{detail.basic.activity_name}}</div>
              </div>
              <div class="activity-info">
                <div class="activity-label">活动类型</div>
                <div class="activity-content">{{activeTypeText(detail.basic.type)}}</div>
              </div>
              <!-- <div class="activity-info">
                <div class="activity-label">活动通知 </div>
                <div class="activity-content">
                  <a style="color: rgb(51, 119, 255); cursor: pointer; margin-right: 10px;" class="one-pan-link-mark">发送通知</a>
                  <a style="color: rgb(51, 119, 255); cursor: pointer;">查看短信发送记录</a>
                </div>
              </div> -->
              <div class="activity-info">
                <div class="activity-label">活动时间</div>
                <div class="activity-content">
                  <span>{{detail.basic.start_time}}</span>
                  <span>&nbsp;至&nbsp;</span>
                  <span>{{detail.basic.end_time}}</span>

                  <a-date-picker 
                    style="min-width: 195px;" 
                    format="YYYY-MM-DD HH:mm:ss"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledDateTime"
                    :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                    v-model="time"
                    @ok="onOkTime">
                    <a class="edit-time-btn pubBtn one-pan-link-mark" style="padding-left: 16px;">修改时间</a>
                  </a-date-picker>
                  
                </div>
              </div>
              <div class="activity-info">
                <div class="activity-label">活动统计</div>
                <div class="activity-content">
                  <router-link 
                    class="pubBtn"
                    :to="{path:'/dmp/em/statistics'}">点击查看</router-link>
                </div>
              </div>
              <div class="activity-info">
                <div class="activity-label">活动油站</div>
                <div class="activity-content">{{detail.basic.site_names.join('，')}}</div>
              </div>

              <div class="activity-info activity-info-rule-list">
                <div class="activity-label">活动规则</div>
                <div class="activity-content rule-list">
                  <div class="activity-info" v-if="detail.basic.type==1">
                    <div class="activity-label">立减方式</div>
                    <div class="activity-content">{{detail.default.full_reduction_type==1?'金额立减':'折扣立减'}}</div>
                  </div>

                  <div class="activity-info">
                    <div class="activity-label">活动人群</div>
                    <div class="activity-content" v-if="detail.basic.crowdtype==1">所有客户</div>
                    <div class="activity-content" v-if="detail.basic.crowdtype==2">所有线上客户</div>
                    <div class="activity-content" v-if="detail.basic.crowdtype==3">部分可参与({{detail.basic.group_name}})</div>
                    <div class="activity-content" v-if="detail.basic.crowdtype==4">部分不可参与({{detail.basic.group_name}})</div>
                  </div>

                  <div class="activity-info">
                    <div class="activity-label">次数限制</div>
                    <div class="activity-content" v-if="detail.default.limit_type==1">无限制</div>
                    <div class="activity-content" v-if="detail.default.limit_type==2">
                      每{{detail.default.limit_day}}天可参与{{detail.default.limit_number}}次
                    </div>
                  </div>

                  <div class="activity-info" v-if="detail.basic.type==1">
                    <div class="activity-label">时间限制</div>
                    <div class="activity-content" v-if="detail.default.repeat_way==1">活动期间</div>
                    <div class="activity-content" v-if="detail.default.repeat_way==2">每天重复</div>
                    <div class="activity-content" v-if="detail.default.repeat_way==3">每周重复</div>
                    <div class="activity-content" v-if="detail.default.repeat_way==4">每月重复</div>
                  </div>

                  <div class="activity-info" v-if="detail.basic.type==1||detail.basic.type==3">
                    <div class="activity-label">支付限制</div>
                    <div class="activity-content">{{detail.default.pay_name}}</div>
                  </div>
                  
                  <div 
                    class="activity-info activity-info-rule"
                    v-for="(ruleItem,ruleIndex) in detail.default.activity_rule" :key="ruleIndex">

                    <div class="activity-label" style="padding-top: 24px;" v-if="detail.basic.type==1">立减规则{{funcChangeNumToCHN(ruleIndex+1)}}</div>
                    <div class="activity-label" style="padding-top: 24px;" v-if="detail.basic.type==2||detail.basic.type==3">规则{{funcChangeNumToCHN(ruleIndex+1)}}</div>
                    <div class="activity-content" >
                      <div class="rule-wrapper">

                        <div class="rule-item" v-if="detail.basic.type==1">
                          <div class="rule-label">规则时间</div>
                          <div class="rule-content" v-if="detail.default.repeat_way==1">{{detail.basic.start_time}} - {{detail.basic.end_time}} </div>
                          <div class="rule-content" v-if="detail.default.repeat_way==2">每天
                            <span v-for="(timeItem,timeIndex) in ruleItem.arr_time_rule.arr_repeat_time" :key="timeIndex">
                              {{timeItem.repeat_start_time}}~{{timeItem.repeat_end_time}}；
                            </span>
                          </div>
                          <div class="rule-content" v-if="detail.default.repeat_way==3">每周{{ruleItem.arr_time_rule.arr_repeat_day.join('、')}}
                            <span v-for="(timeItem,timeIndex) in ruleItem.arr_time_rule.arr_repeat_time" :key="timeIndex">
                              {{timeItem.repeat_start_time}}~{{timeItem.repeat_end_time}}；
                            </span>
                          </div>
                          <div class="rule-content" v-if="detail.default.repeat_way==4">每月{{ruleItem.arr_time_rule.arr_repeat_day.join('、')}}
                            <span v-for="(timeItem,timeIndex) in ruleItem.arr_time_rule.arr_repeat_time" :key="timeIndex">
                              {{timeItem.repeat_start_time}}~{{timeItem.repeat_end_time}}；
                            </span>
                          </div>
                        </div>

                        <div class="rule-item" v-if="detail.basic.type==1||detail.basic.type==3">
                          <div class="rule-label">消费油品</div>
                          <div class="rule-content">{{ruleItem.arr_oil_names}}</div>
                        </div>

                        <div class="rule-item" v-if="detail.basic.type==1">
                          <div class="rule-label">立减门槛</div>
                          <div class="rule-content">消费{{ruleItem.rule_type==1?'原价':'升数'}}{{ruleItem.cost_origin_price}}{{ruleItem.rule_type==1?'元':'升'}}</div>
                        </div>

                        <div class="rule-item" v-if="detail.basic.type==1">
                          <div class="rule-label">立减{{detail.default.full_reduction_type==1?'金额':'折扣'}}</div>
                          <div class="rule-content">每升立{{detail.default.full_reduction_type==1?'减':'享'}}{{ruleItem.discount_per_litre}}{{detail.default.full_reduction_type==1?'元':'折'}}</div>
                        </div>

                        <!-- 满额送 -->
                        <div class="rule-item" v-if="detail.basic.type==2">
                          <div class="rule-label">消费油品</div>
                          <div class="rule-content">{{ruleItem.arr_oil_names}}-{{ruleItem.rule_type==1?'原价':'实付'}}</div>
                        </div>

                        <div class="rule-item" v-if="detail.basic.type==2">
                          <div class="rule-label">梯度奖励</div>
                          <div class="rule-content">
                            <span
                              v-for="(stepItem,stepIndex) in ruleItem.step_award" :key="stepIndex">消费{{stepItem.cost_min}}-{{stepItem.cost_max}}元，奖励{{stepItem.arr_coupon_id_amount.length}}种{{computCouponTotal(ruleIndex,stepIndex)}}张优惠券<br></span>
                          </div>
                        </div>

                        <!-- 满额减 -->
                        <div class="rule-item" v-if="detail.basic.type==3">
                          <div class="rule-label">满减优惠</div>
                          <div class="rule-content">
                            <span
                              v-for="(child,childIndex) in ruleItem.rules" :key="childIndex">原价满{{child.man_award}}元，立{{detail.default.full_reduction_type==1?'减':'享'}}{{child.step_award}}{{detail.default.full_reduction_type==1?'元':'折'}}<br></span>
                          </div>
                        </div>



                      </div>
                    </div>

                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </a-layout-content>
</template>

<script>
import { getActivitlist } from '@/api/em'
import { activeType } from '@/utils/enums'
import moment from 'moment';
import { funcChangeNumToCHN } from '@/utils/util'

export default {
  name: 'ActiveDetail',
  data(){
    return {
      loading: false,
      activeType,
      time: null,
      detail:null
    }
  },
  created(){
    this.onLoad()
  },
  methods:{
    moment,
    funcChangeNumToCHN,
    async onLoad(){
      this.loading = true

      let detailRes = await getActivitlist({
        id: this.$route.query.activityId
      })

      if (detailRes) {
        console.log(detailRes.data)
        this.detail = detailRes.data
      }
        
      this.loading = false
    },
    // 计算优惠券张数
    computCouponTotal(ruleIndex,stepIndex){
      let arr = this.detail.default.activity_rule[ruleIndex].step_award[stepIndex].arr_coupon_id_amount

      let total = 0

      arr.forEach(e=>{
        total += (e.count)
      })
      return total

    },
    activeTypeText(text){
      // console.log(text)
      let item = this.activeType.find(e=>{
        return e.value === Number(text)
      })
      // console.log(item)
      return item.label
    },
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day');
    },
    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    },
    onOkTime(date){
      console.log(date)

      let that = this
      this.$confirm({
        title: '提醒',
        content: `是否将活动结束时间改为 ${date.format('YYYY-MM-DD HH:mm:ss')}`,
        onOk () {
          
        },
        onCancel () {}
      })
    },
  }
}
</script>

<style lang="less" scoped>
.page-title{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  color: #1e1e28;
  border-bottom: 1px solid #f0f0f0;
}
.page-content{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 30px;
  .page-content-item{
    font-size: 16px;
    color: #1e1e28;
  }
  .intr{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 10px;
    padding-bottom: 50px;
    min-height: 290px;
    .intr-right{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      .middle{
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }
  .flex-col1{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
}
.activity-info{
  line-height: 38px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  .activity-label{
    text-align: right;
    width: 90px;
    color: #3c3c46;
  }
  .activity-content{
    margin-left: 24px;
    color: #1e1e28;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-weight: 500;
    .activity-label{
      width: 96px;
      font-weight: 400;
    }
    &.rule-list{
      border: 1px solid #e0e0e0;
      padding: 27px 20px;
      margin-top: 16px;
      .rule-wrapper{
        background-color: #fafafa;
        padding: 24px;
        max-width: 680px;
        .rule-item{
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          line-height: 30px;
          &+.rule-item{
            margin-top: 16px;
          }
          .rule-label{
            width: 80px;
            color: #3c3c46;
            text-align: right;
            font-weight: 400;
            white-space: nowrap;
          }
          .rule-content{
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin-left: 16px;
            white-space: pre-wrap;
          }
        }
      }
      .activity-info-rule{
        margin-top: 16px;
      }
    }
  }

  &.activity-info-rule-list{
    &>.activity-label{
      margin-top: 43px;
    }
  }
}

</style>