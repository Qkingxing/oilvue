
<template>

  <a-layout-content 
    v-if="pageType=='detail'"
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
        <span class="s2">2021-03-19 00:00:00- 2021-03-31 23:59:59 </span>
      </div>
      <div class="box flex">
        <span class="s1">活动油站</span>
        <span class="s2" style="width: 800px;">鹰眼一站、鹰眼第二加油站</span>
      </div>
      <div class="box">
        <span class="s1">操作</span>
        <span class="s2 end">结束</span>
      </div>
    </div>

    <div class="ruleBox">
      <span class="titRule ruleOne cur">积分规则一</span>
    </div>

    <div class="rules-edit-container">
      <div class="ruleDetail" style="margin-top: 23px;">
        <div class="box flex">
          <span class="s1">活动人群</span>
          <span class="s2">所有线上客户 </span>
        </div>
        <div class="boxRule flex">
          <span class="s1" style="margin-top: 18px;">规则设置</span>
          <div>
            <div class="setList">
              <div class="boxset">
                <span class="s1">重复方式</span>
                <span class="s2">活动期间</span>
              </div>
              <div class="boxset flex">
                <span class="s1">获取积分</span>
                <div style="width: 500px;">
                  <div class="s2" style="line-height: 24px;">
                    消费 可兰素、0#车用乙醇柴油、98#车用乙醇汽油、95#车用乙醇汽油、92#车用乙醇汽油、95#车用汽油(会员价)、92#车用汽油(会员价)、-30#柴油、-10#车用柴油（会员价）、CNG、LNG、0#车用柴油(不开票)、98#车用汽油(不开票)、0#车用柴油、98#车用汽油、95#车用汽油、92#车用汽油、充值、89#车用汽油、-10#车用柴油、0#车用柴油、98#车用汽油、95#车用汽油、92#车用汽油 实付 每5.00元,积5分
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


import { mapGetters } from 'vuex'

export default {
  name: 'RuleDetail',
  components: {},
  data () {
    return {


    }
  },
  props:{
    pageType:{
      type: String
    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  created () {
    console.log(this.userInfo)
  },
  methods: {
    back(){
      this.$emit('back')
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
