
<template>

  <a-layout-content 
    v-if="pageType=='detail'"
    v-loading="loading"
    :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
    <div class="tipsBox">
      <div class="configTips">
        <a-icon type="exclamation-circle" style="color: rgb(84, 130, 235);vertical-align: middle;margin-right: 5px;"/>
        <span class="teipsText">多个积分规则以最高积分规则为准</span>
      </div>
    </div>
    
    <div class="head">
      <span class="title">积分规则详情</span>
      <a-button type="info" class="goback" @click="back">
        返回上一页
      </a-button>
    </div>

    <div class="ruleDetail">
      <div class="box">
        <span class="s1">活动时间</span>
        <span class="s2">{{form.start_time}} - {{form.end_time}}</span>
      </div>
      <div class="box flex">
        <span class="s1">活动油站</span>
        <span class="s2" style="width: 800px;">{{form.site_name}}</span>
      </div>
      <div class="box" v-if="active==1">
        <span class="s1">操作</span>
        <span class="s2 end" @click="stop">结束</span>
      </div>
    </div>

    <div class="ruleBox">
      <span 
        class="titRule"
        :class="{
          'cur': index === integralsetIndex,
          'ruleOne': form.integralset.length == 1
        }"
        @click="integralsetIndex = index"
        v-for="(item, index) in form.integralset"
        :key="index"
        >
        {{item.name}}
      </span>
    </div>

    <div class="rules-edit-container">
      <div 
        class="ruleDetail" 
        style="margin-top: 23px;"
        v-for="(item, index) in form.integralset"
        :key="index">
        <template v-if="index === integralsetIndex">

          <div class="box flex">
            <span class="s1">活动人群</span>
            <span class="s2" v-if="item.activity_type==1">所有线上客户 </span>
            <span class="s2" v-if="item.activity_type==2">部分可参与 </span>
            <span class="s2" v-if="item.activity_type==3">部分不可参与 </span>
          </div>
          <div class="boxRule flex">
            <span class="s1" style="margin-top: 18px;">规则设置</span>
            <div>
              <div 
                v-for="(it, i) in item.giveintegral"
                :key="i"
                class="setList">
                <div class="boxset">
                  <span class="s1">重复方式</span>
                  <span class="s2" v-if="it.rule_type==1">活动期间</span>
                  <span class="s2" v-if="it.rule_type==2">每日重复</span>
                  <span class="s2" v-if="it.rule_type==3">每周重复</span>
                  <span class="s2" v-if="it.rule_type==4">每月重复</span>
                </div>
                <div class="boxset">
                  <span class="s1">规则时间</span>
                  <span class="s2" v-if="it.rule_type==1">{{form.start_time}} ~ {{form.end_time}}</span>
                  <span class="s2" v-else>{{timeText(it)}}</span>
                </div>
                <div class="boxset">
                  <span class="s1">支付方式</span>
                  <span class="s2">{{payListText(it.pay_id)}}</span>
                </div>
                <div class="boxset flex">
                  <span class="s1">获取积分</span>
                  <div style="width: 500px;">
                    <div 
                      class="s2" 
                      style="line-height: 24px;"
                      v-for="(jifenItem,jifenIndex) in it.getintegral"
                      :key="jifenIndex">
                      消费 {{oilText(jifenItem)}} 
                      <span v-if="jifenItem.exp_type==1">原价</span>
                      <span v-if="jifenItem.exp_type==2">实付</span>
                      <span v-if="jifenItem.exp_type==3">升数</span>
                      每{{jifenItem.money.toFixed(2)}}
                      <span v-if="jifenItem.exp_type==3">升</span>
                      <span v-else>元</span>
                      ,积{{jifenItem.integral}}分
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </a-layout-content>

</template>

<script>


import { mapGetters } from 'vuex'
import { getIntegrallists,stopIntegralruleset } from '@/api/crm'
import { getPayList } from '@/api/base'
import { getSitesoillist } from '@/api/oil'

export default {
  name: 'RuleDetail',
  components: {},
  data () {
    return {
      loading: false,
      integralsetIndex: 0,// 显示规则索引
      form: {},
      payList:[],
      oilList:[]

    }
  },
  props:{
    pageType:{
      type: String
    },
    itemData:{
      type: Object
    },
    active:{
      type: Number,
      default: 2
    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  created () {
    // console.log(this.userInfo)
    // console.log(this.itemData)
    this.Init()
    
  },
  methods: {
    // 初始化
    async Init(){
      this.loading = true
      // 获取支付方式列表
      let payRes = await getPayList()
      // console.log(payRes.data)
      if (payRes) {
        this.payList = payRes.data
      }
      let formRes = await getIntegrallists(this.itemData.id)

      this.form = formRes.data

      // 获取油品下拉
      let oilRes = await getSitesoillist(this.form.site_ids)
      this.oilList = oilRes.data

      // console.log(this.form)


      this.loading = false
    },
    // 结束规则
    stop(){
      let that = this
      this.$confirm({
        title: '温馨提示',
        content: '积分规则停用后将不再生效，是否确认停用',
        onOk () {
          stopIntegralruleset(that.form.id).then(()=>{
            that.$message.success('结束成功')
            that.back()
          })
        },
        onCancel () {}
      })
    },
    back(){
      this.$emit('back')
    },
    // 重复时间转换文字
    timeText(item){
      let str = ''
      // 每日
      if (item.rule_type===2) {
        let arr = item.day.map(e=>{
          return `${e.start}~${e.end}`
        })
        str = arr.join('、')
      }
      // 每周
      if (item.rule_type===3) {
        let arr = item.week.day.map(e=>{
          return `${e.start}~${e.end}`
        })
        str = arr.join('、')
        
        let weekArr = item.week.week_list.map(e=>{
          return `周${e}`
        })
        let weekStr = weekArr.join('、')
        // console.log(weekStr)
        str = `${weekStr} ${str}`
      }
      // 每月
      if (item.rule_type===4) {
        let arr = item.month.day.map(e=>{
          return `${e.start}~${e.end}`
        })
        str = arr.join('、')
        
        let monthArr = item.month.month_list.map(e=>{
          return `${e}日`
        })
        let monthStr = monthArr.join('、')
        // console.log(monthStr)
        str = `${monthStr} ${str}`
      }

      return str
    },
    // 支付方式转换中文
    payListText(ids){
      // console.log(this.payList)
      let arr = this.payList.filter(e=>{
        return ids.includes(e.id)
      })
      arr = arr.map(e=>{
        return e.name
      })
      let str = arr.join('、')
      // console.log(str)
      return str
    },
    oilText(oils){
      let arrNum = oils.oils_ids.map(Number)
      let arr = this.oilList.filter(e=>{
        return arrNum.includes(e.id)
      })
      arr = arr.map(e=>{
        return e.oils_name
      })
      let str = arr.join('、')
      return str
    }

  }
}
</script>
<style lang="less" scoped>
.flex{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.head{
  line-height: 60px;
  height: 60px;
  border-bottom: 1px solid #eaeaf4;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  .title{
    font-size: 16px;
    font-weight: 600;
  }
}
.ruleDetail{
  margin: 13px 0 0 63px;
  .box{
    line-height: 40px;
    .s1{
      min-width: 66px;
      text-align: right;
      display: inline-block;
    }
    .s2{
      margin-left: 24px;
    }
    .end{
      color: #37f;
      cursor: pointer;
    }
  }
}
.ruleBox{
  margin-top: 16px;
  .ruleOne{
    border-radius: 4px!important;
  }
  
  
  .titRule{
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    border: 1px solid #e4e7f0;
    border-right: none;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    &:first-child{
      border-radius: 4px 0 0 4px;
    }
    &:last-child{
      border-radius: 0 4px 4px 0;
      border: 1px solid #e4e7f0;
    }
  }
  .cur{
    color: #fff;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #37f;
    border: 1px solid #37f;
  }
}
.rules-edit-container{
  .ruleDetail{
    margin: 13px 0 0 63px;
    .box{
      line-height: 40px;
      .s1{
        min-width: 66px;
        text-align: right;
        display: inline-block;
      }
      .s2{
        margin-left: 24px;
      }
    }
    .boxRule{
      margin-top: 16px;
      span{
        display: inline-block;
      }
      .s1{
        min-width: 66px;
        text-align: right;
        display: inline-block;
      }
      .s2{
        margin-left: 24px;
      }
    }
  }
  .setList{
    background: #f9fafc;
    margin-bottom: 16px;
    width: 632px;
    margin-left: 24px;
    padding: 10px 24px;
    .s2{
      min-width: 450px;
      display: inline-block;
      line-height: 24px;
    }
  }
  .boxset{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 8px 0;
  }
}

a{
  margin: 0 5px;
}
.tipsBox{
  border-bottom: 8px solid #f5f6f9;
  margin: 0 -24px 0 -24px;
  .configTips{
    position: relative;
    height: 48px;
    line-height: 48px;
    padding: 0 0 0 30px;
    background: #edf2fd;
    border: 1px solid #37f;
    .teipsText{
      vertical-align: middle;
    }
  }
}
</style>
