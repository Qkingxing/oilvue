
<template>

  <a-layout-content 
    v-if="pageType=='edit'"
    :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
    <div class="tipsBox">
      <div class="configTips">
        <a-icon type="exclamation-circle" style="color: rgb(84, 130, 235);vertical-align: middle;margin-right: 5px;"/>
        <span class="teipsText">多个积分规则以最高积分规则为准</span>
      </div>
    </div>
    
    <div class="head">
      <span class="title">新增积分规则</span>
    </div>

    <div class="content">
      <div class="row-item flex">
        <div class="row-title line_h40">活动时间</div>
        <div class="row-content">
          <a-range-picker 
            @change="onChangeTime"
            format="YYYY-MM-DD HH:mm:ss"
            v-model="form.date"
            :disabled-date="disabledDate"
            :show-time="{
              hideDisabledOptions: true,
              defaultValue: [
                moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')
              ],
            }"
            style="width: 380px;" >
            <a-icon slot="suffixIcon" type="calendar" style="color: #c8c8d2;"/>
          </a-range-picker>
        </div>
      </div>
      <div class="row-item flex" v-if="userInfo.site_id==(-1)">
        <div class="row-title line_h40">活动油站</div>
        <div class="row-content">
          <el-select multiple collapse-tags v-model="form.site_ids" @change="selectAllSite" placeholder="请选择活动油站" style="height: auto; margin-bottom: 5px;">
            <el-option v-for="(item, index) in sitelist" :key="index" :label="item.site_name" :value="item.id"></el-option>
          </el-select>
          <!-- 检查规则是否冲突，等接口 -->
          <!-- <div>
            <a-alert message="某某加油站在该时间已有积分规则" type="error" show-icon />
          </div> -->
        </div>
      </div>

      <div class="row-item flex paneTabs">
        <div 
          class="paneBox"
          :class="{'paneCur': index == integralsetIndex}"
          @click="integralsetIndex = index"
          v-for="(item, index) in form.integralset"
          :key="index">
          <span>{{'积分规则'+funcChangeNumToCHN(index+1)}}</span>
          <a-icon @click="delIntegralset(index)" v-if="form.integralset.length>1" type="close" style="cursor: pointer;color: rgb(150, 162, 190);margin-left: 6px;"/>
        </div>

        <div class="addPane">
          <span><a-icon type="plus" /></span>
        </div>
      </div>

      <div 
        v-show="index == integralsetIndex"
        class="rules-edit-container-ele"
        v-for="(item, index) in form.integralset"
        :key="index">

        <div class="content">
          <div class="row-item flex">
            <div class="row-title">活动人群</div>
            <div class="row-content">
              <div>
                <a-radio-group v-model="item.activity_type">
                  <a-radio :value="1">
                    所有线上客户
                    <a-popover placement="right">
                      <template slot="content">
                        <p>所有线上用户：所有可获得用户信息的客户，</p>
                        <p>包括：微信/支付宝小程序、Pos机/自助机/双屏机用户登</p>
                      </template>
                      <a-icon type="question-circle" style="color: rgb(214, 214, 214);"/>
                    </a-popover>
                  </a-radio>
                  <a-radio :value="2">
                    部分可参与
                  </a-radio>
                  <a-radio :value="3">
                    部分不可参与
                  </a-radio>
                </a-radio-group>
              </div>
              <div class="flex f_a_c customerGroup" v-show="item.activity_type!=1">
                <span class="m_l_24">客户群体</span>
                <span style="margin-left: 16px;">
                  <el-cascader
                    style="width: 600px;"
                    v-model="value"
                    :options="options"
                    :props="{ expandTrigger: 'hover', multiple: true }"
                  ></el-cascader>
                </span>
              </div>
            </div>
          </div>
          <div class="row-item flex">
            <div class="row-title" style="margin-top: 37px;">规则设置</div>
            <div class="row-content">
              <div 
                class="ruleWrap flex"
                v-for="(it, i) in item.giveintegral"
                :key="i">
                <div>
                  <div class="flex mar_top16">
                    <div class="row-title">重复方式</div>
                    <div class="row-content">
                      <a-radio-group v-model="it.rule_type">
                        <a-radio :value="1">活动期间</a-radio>
                        <a-radio :value="2">每日重复</a-radio>
                        <a-radio :value="3">每周重复</a-radio>
                        <a-radio :value="4">每月重复</a-radio>
                      </a-radio-group>
                      <div class="mxDateRuleContainer" v-if="it.rule_type!=1">
                        <div class="date-round"></div>
                        <div>
                          <div v-show="it.rule_type==2">
                            <div class="dateEveryLine">
                              <div class="dateEveryLineMain">
                                <a-time-picker placeholder="请选择时间"/>
                                <span class="dateEveryLine_centerText">至</span>
                                <a-time-picker placeholder="请选择时间"/>
                                <div class="dateEveryLine_operationBox"></div>
                                <div class="dateEveryLine_error">
                                  <a-icon type="exclamation-circle" />
                                  <span>起始时间不能大于结束时间</span>
                                </div>
                              </div>
                            </div>
                            <div class="dateEveryLine_tips">请选择24小时制时间，格式如 00:00:00 至 23:59:59</div>
                          </div>
                          <div v-show="it.rule_type==3">
                            <div class="dateMixinBoxTop">
                              <div class="dateMixinBox">
                                <div class="dateMixinBoxLine">
                                  <div class="dateMixinBoxLineBlock" ischoice="1">日</div>
                                  <div class="dateMixinBoxLineBlock">一</div>
                                  <div class="dateMixinBoxLineBlock">二</div>
                                  <div class="dateMixinBoxLineBlock">三</div>
                                  <div class="dateMixinBoxLineBlock">四</div>
                                  <div class="dateMixinBoxLineBlock">五</div>
                                  <div class="dateMixinBoxLineBlock">六</div>
                                </div>
                                <div class="dateEveryLine" haserr="1">
                                  <a-time-picker placeholder="请选择时间"/>
                                  <span class="dateEveryLine_centerText">至</span>
                                  <a-time-picker placeholder="请选择时间"/>
                                  <div class="dateEveryLine_operationBox"></div>

                                  <div class="dateEveryLine_error">
                                    <a-icon type="exclamation-circle" />
                                    <span>起始时间不能大于结束时间</span>
                                  </div>
                                </div>

                                <div class="dateEveryLine_tips">请选择24小时制时间，格式如 00:00:00 至 23:59:59</div>
                              </div>
                            </div>
                          </div>
                          <div v-show="it.rule_type==4">
                            <div class="dateMixinBoxTop">
                              <div class="dateMixinBox">
                                <div class="dateMixinBoxLine" style="width: 90%;">
                                  <div 
                                    class="dateMixinBoxLineBlock"
                                    :ischoice="index"
                                    v-for="(item, index) in 31"
                                    :key="index">{{index+1}}</div>
                                </div>
                                <div class="dateEveryLine" haserr="0">
                                  <a-time-picker placeholder="请选择时间"/>
                                  <span class="dateEveryLine_centerText">至</span>
                                  <a-time-picker placeholder="请选择时间"/>
                                  <div class="dateEveryLine_operationBox">
                                    <a-icon type="delete" />
                                  </div>

                                  <!-- <div class="dateEveryLine_error">
                                    <a-icon type="exclamation-circle" />
                                    <span>起始时间不能大于结束时间</span>
                                  </div> -->
                                </div>
                                <div class="dateEveryLine" haserr="1">
                                  <a-time-picker placeholder="请选择时间"/>
                                  <span class="dateEveryLine_centerText">至</span>
                                  <a-time-picker placeholder="请选择时间"/>
                                  <div class="dateEveryLine_operationBox">
                                    <a-icon type="delete" />
                                  </div>

                                  <div class="dateEveryLine_error">
                                    <a-icon type="exclamation-circle" />
                                    <span>起始时间不能大于结束时间</span>
                                  </div>
                                </div>
                                <div class="dateEveryLine_tips">请选择24小时制时间，格式如 00:00:00 至 23:59:59</div>
                              </div>
                            </div>
                            <div class="dateMixinButton">

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div 
                    class="flex"
                    :class="{'mar_top16':it.rule_type==1}">
                    <div 
                      class="row-title line_h40"
                      :class="{'ruleTimeBox':it.rule_type!=1}">规则时间</div>
                    <div class="row-content line_h40" v-if="it.rule_type==1&&form.start_time">
                      {{form.start_time}} ~ {{form.end_time}}
                    </div>
                  </div>
                  <div class="flex mar_top16">
                    <div class="row-title line_h40">支付方式</div>
                    <div class="row-content" style="display:flex;align-items:center;">
                      <a-select v-model="it.pay_id" style="width: 240px" mode="multiple" placeholder="请选择支付方式">
                        <a-select-option 
                          v-for="(item, index) in payList"
                          :key="index"
                          :value="item.id">
                          {{item.name}}
                        </a-select-option>

                      </a-select>
                    </div>
                  </div>
                  <div class="flex mar_top16">
                    <div class="row-title line_h40" style="margin-top: 24px;">获取积分</div>
                    <div>
                      <div class="flex getintegralBox">
                        <div class="getintegral">
                          <div class="flex integBox">
                            <span class="line_h40 m_r_15">积分油品</span>
                            <!-- <el-select multiple  collapse-tags v-model="selectedArray" @change="changeSelect" placeholder="请选择活动油站" style="height: auto; margin-bottom: 5px;">
                              <el-option label="全选" value="全选" @click.native="selectAll"></el-option>
                              <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.name"></el-option>
                            </el-select> -->
                          </div>
                          <div class="flex integBox">
                            <span class="line_h40 s_span m_r_15">消费积分</span>
                            <div class="flex calcIntegral">
                              <span>消费</span>
                              <a-select style="width: 90px">
                                <a-select-option value="jack">
                                  Jack
                                </a-select-option>
                                <a-select-option value="lucy">
                                  Lucy
                                </a-select-option>
          
                                <a-select-option value="Yiminghe">
                                  yiminghe
                                </a-select-option>
                              </a-select>
                              <span>每</span>
                              <a-input-number />
                              <span>元</span>
                              <span>积</span>
                              <a-input-number />
                              <span>分</span>
                            </div>
                          </div>
                        </div>
                        <div class="handlePenel">
                          <a-icon type="plus-circle" class="m_r_8 pointer addGetJf"/>
                          <a-icon type="delete" class="pointer"/>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div class="removeRuleWrap"><span>删除</span></div>
              </div>

              <div class="addRuleSet">
                <div class="addbox">
                  <a-icon type="plus" />
                  <span class="addText">继续添加</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





    </div>

    <div class="createdBtn">
      <a-button type="primary" @click="save">
        创 建
      </a-button>
      <a-button type="info" @click="back">
        返 回
      </a-button>
    </div>

  </a-layout-content>

</template>

<script>
import moment from 'moment';
import { getSitelist } from '@/api/crm'
import { getPayList } from '@/api/base'
import { funcChangeNumToCHN } from '@/utils/util'
import { mapGetters } from 'vuex'


export default {
  name: 'RuleEdit',
  components: {},
  data () {
    return {
      selectedArray: [],
      options: [
        { name: '油品券', label: 'one' },
        { name: '商品券', label: 'tow' },
      ],
      integralsetIndex: 0,// 显示规则索引
      sitelist: [],  // 油站下拉
      oldChooseData: [], // 油站下拉上次的选择
      payList: [], // 支付方式下拉
      form: {
        date: [ moment().startOf('day'), moment().endOf('day') ],
        start_time: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), // 开始时间
        end_time: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'), // 结束时间
        site_ids: [], // 生效油站
        integralset: [  // 规则列表
          {
            activity_type: 1, //活动人群活动人群类型 1所有线上客户 2部分可参与 3部分不可参与  如果选择所有客户的话，客户群体选择null
            activity_ids: null, //客户群体
            name: '', //积分规则名称
            giveintegral: [
              {
                rule_type: 1, //重复方式重复方式 1是活动期间 2是每日重复 3每周重复 4每月重复，然后当选择活动期间之后，日期之类的填写null
                day: [
                  { start: '', end: '' }
                ],
                week:{
                  week_list: [],
                  day: [
                    { start: '', end: '' }
                  ],
                },
                month:{
                  month_list:[],
                  day: [
                    { start: '', end: '' }
                  ],
                },
                pay_id: [], //支付方式ID
                getintegral: [//获取积分
                  {
                    //积分油品  字符串
                    oils_ids: [1,2,3,4,5,6],
                    //消费类型1是实付 2是原价 3升数
                    exp_type: null,
                    //消费金钱
                    money: null,
                    //获得积分
                    integral: null
                  }
                ]
              },
            ]
          },

        ]
      },
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则'
            },
            {
              value: 'daohang',
              label: '导航'
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic'
            },
            {
              value: 'form',
              label: 'Form'
            },
            {
              value: 'data',
              label: 'Data'
            },
            {
              value: 'notice',
              label: 'Notice'
            },
            {
              value: 'navigation',
              label: 'Navigation'
            },
            {
              value: 'others',
              label: 'Others'
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ]

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
    // console.log(this.userInfo.site_id)
    this.Init()
  },
  methods: {
    moment,
    funcChangeNumToCHN,
    // 返回列表页
    back(){
      this.$emit('back')
    },
    // 删除规则
    delIntegralset(index){
      this.form.integralset.splice(index, 1)
    },
    // 禁止选择今天之前的时间
    disabledDate(current) {
      return current && current < moment().startOf('day');
    },
    // 更改活动时间时
    onChangeTime(date, text){
      // console.log(date)
      // console.log(text)
      if (date.length) {
        this.form.start_time = text[0]
        this.form.end_time = text[1]
      }else{
        this.form.start_time = null
        this.form.end_time = null
      }
      // console.log(this.form)
    },
    async Init(){
      let SitelistRes = null
      if (this.userInfo.site_id === (-1)) {
        // 获取油站列表
        SitelistRes = await getSitelist({sreach:''})
        // console.log(SitelistRes.data.data)
        if (SitelistRes) {
          this.sitelist = SitelistRes.data.data
          this.sitelist.unshift({
            site_name: '全选',
            id: 'ALL_SELECT'
          })
        }
      }
      let payRes = await getPayList()
      console.log(payRes.data)
      if (payRes) {
        this.payList = payRes.data
      }
      
      
    },
    // 全选油站
    selectAllSite (val) {
      
      const allValues = this.sitelist.map(item => {
        return item.id;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];
 
      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.form.site_ids = allValues;
      }
      // console.log(oldVal)
      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.form.site_ids = [];
      }
 
      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.form.site_ids = val;
      }
 
      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.form.site_ids = ['ALL_SELECT'].concat(val);
        }
      }
      console.log(this.form.site_ids)
      // 储存当前选择的最后结果 作为下次的老数据
      this.oldChooseData = this.form.site_ids;
    },
    // 提交表单
    save(){
      console.log(this.form)
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
.f_a_c{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.line_h40{
  line-height: 40px;
}
.mar_top16{
  margin-top: 16px;
}
.m_r_8{
  margin-right: 8px;
}
.m_r_15{
  margin-right: 15px;
}
.pointer{
  cursor: pointer;
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
  margin-bottom: 24px;
  .title{
    font-size: 16px;
    font-weight: 600;
  }
}

.content{
  .row-item{
    margin-bottom: 20px;
    .row-title{
      font-size: 14px;
      margin-right: 20px;
      padding-left: 76px;
    }
  }
  .paneTabs{
    border-bottom: 1px solid #e4e7f0;
  }
  
  .paneBox{
    width: 110px;
    height: 43px;
    line-height: 43px;
    text-align: center;
    background: #f9fafc;
    border-radius: 3px 3px 0 0;
    border: 1px solid #e4e7f0;
    border-bottom: none;
    margin-right: 2px;
    cursor: pointer;
    span{
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
  }
  .paneCur{
    background: #fff;
    position: relative;
    span{
      color: #37f;
    }
    &::after{
      content: " ";
      height: 2px;
      clear: both;
      position: absolute;
      width: 100%;
      bottom: -1px;
      background: #fff;
      left: 0;
    }
  }
  .addPane{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    span{
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #fff;
      border-radius: 2px;
      border: 1px solid #cad5e9;
      display: inline-block;
      margin-left: 6px;
      color: #96a2be;
      font-size: 15px;
      cursor: pointer;
    }
  }

}
.rules-edit-container-ele{
  margin: 40px 0 0 40px;
  .row-item{
    .row-title{
      font-size: 14px;
      margin-right: 20px;
      padding-left: 36px;
    }
  }
  .ruleWrap{
    border: 1px solid #eaeaf4;
    width: 740px;
    padding-top: 20px;
    margin-bottom: 20px;
    .removeRuleWrap{
      position: absolute;
      right: -44px;
      cursor: pointer;
      top: 30px;
    }
    .ruleTimeBox{
      position: absolute;
      top: 82px;
    }
    .calcIntegral {
      display: flex;
      align-items: center;
      span{
        padding: 0 5px;
        display: inline-block;
        height: 40px;
        line-height: 42px;
      }
    }
    .getintegralBox{
      position: relative;
      .addGetJf{
        display: none;
      }
      &:last-child{
        .addGetJf{
          display: inline-block;
        }
      }
    }
    .integBox{
      padding: 24px 24px 0 24px;
    }
    .getintegral{
      background: #f9fafc;
      width: 540px;
      margin-bottom: 24px;
      padding-bottom: 24px;
    }
    .handlePenel{
      position: absolute;
      right: -45px;
      top: 36px;
    }
  }
  .addRuleSet{
    width: 740px;
    height: 56px;
    line-height: 56px;
    background: #fff;
    border: 1px dashed #cad5e9;
    margin-top: 16px;
    .addbox{
      margin: 0 0 0 23px;
      color: #1e1e28;
      font-size: 14px;
      cursor: pointer;
      .addText{
        margin: 0 0 0 5px;
      }
    }
  }
}
.ruleWrap{
  position: relative;
  .mxDateRuleContainer{
    margin-top: 10px;
  }
}
.mxDateRuleContainer{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
}
.dateEveryLine{
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 15px;
  &[column]{
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  &[haserr="1"]{
    
    span{
      color: #ea4b4b;
    }
  }
  .dateEveryLineMain{
    position: relative;
    .dateEveryLine_error{
      margin-top: 10px;
      margin-left: 0px;
    }
  }
  .ant-time-picker{
    padding: 0;
    width: 166px;
  }
  .dateEveryLine_centerText{
    padding: 0 15px;
  }
}
.dateEveryLine_operationBox{
  position: relative;
  display: inline-block;
  top: 5px;
  min-width: 95px;
  i{
    margin-left: 20px;
    cursor: pointer;
  }
}
.dateMixinBox{
  .dateEveryLine{
    &[haserr="1"]{
      margin-bottom: 45px;
    }
  }
  .dateEveryLine_error{
    position: absolute;
    display: block;
    left: 0;
    top: 100%;
    width: 100%;
    margin: 8px 0 0 0px;
  }
}
.dateMixinBoxTop{
  position: relative;
  display: block;
}
.dateMixinBox{
  position: relative;
  display: block;
  width: 500px;
  padding: 15px 20px 20px;
  margin-top: 15px;
  border-radius: 2px;
  background: #fafafa;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.dateMixinBoxLine{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  .dateMixinBoxLineBlock{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 30px;
    height: 30px;
    font-size: 14px;
    color: #1e1e28;
    margin-right: 15px;
    margin-bottom: 10px;
    cursor: pointer;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    &[ischoice="1"]{
      color: #fff;
      background: #3a85ff;
      border-radius: 50%;
    }
  }
}
.dateEveryLine_error{
  position: relative;
  top: 3px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-left: 10px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  white-space: nowrap;
  i{
    color: #ea4b4b;
  }
  span{
    position: relative;
    top: -1px;
    margin-left: 5px;
    font-size: 14px;
    color: #ea4b4b;
  }
}


.dateEveryLine_tips{
  display: block;
  font-size: 14px;
  margin-top: 10px;
  text-indent: 1px;
  color: #9696a0;
}
.customerGroup{
  margin-top: 16px;
  width: 740px;
  min-height: 72px;
  padding: 5px 0;
  background: #f9fafc;
  z-index: 100;
  position: relative;
}
.m_l_24{
  margin-left: 24px;
}

.createdBtn{
  padding: 42px 0 0 385px;
  .ant-btn{
    margin: 0 4px;
  }
}
</style>
