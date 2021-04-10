
<template>

  <a-layout-content 
    v-loading="loading"
    :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
    <div class="tipsBox">
      <div class="configTips">
        <a-icon type="exclamation-circle" style="color: rgb(84, 130, 235);vertical-align: middle;margin-right: 5px;"/>
        <span class="teipsText">多个积分规则以最高积分规则为准</span>
      </div>
    </div>
    
    <div class="head">
      <span class="title" v-if="pageType=='add'">新增积分规则</span>
      <span class="title" v-if="pageType=='edit'">修改积分规则</span>
    </div>

    <div class="content">
      <div class="row-item flex">
        <div class="row-title line_h40">活动时间</div>
        <div class="row-content">
          <a-range-picker 
            @change="onChangeTime"
            :allowClear="false"
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
          <div v-show="conflict.show">
            <a-alert :message="conflict.text" type="error" show-icon />
          </div>
        </div>
      </div>

      <div class="row-item flex paneTabs">
        <div 
          class="paneBox"
          ref="paneBox"
          :class="{paneCur: index === integralsetIndex}"
          @click="integralsetIndex = index"
          :index="index"
          v-for="(item, index) in form.integralset"
          :key="index">
          <span>{{'积分规则'+funcChangeNumToCHN(index+1)}}</span>
          <a-icon @click.stop="delIntegralset(index)" v-if="form.integralset.length>1" type="close" style="cursor: pointer;color: rgb(150, 162, 190);margin-left: 6px;"/>
        </div>

        <div class="addPane" v-if="pageType=='add'">
          <span @click="addIntegralset()"><a-icon type="plus"/></span>
        </div>
      </div>

      <div 
        v-show="index === integralsetIndex"
        class="rules-edit-container-ele"
        v-for="(item, index) in form.integralset"
        :key="index">

        <div class="content">
          <div class="row-item flex">
            <div class="row-title">活动人群</div>
            <div class="row-content" v-if="pageType=='add'">
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
            <div v-else class="row-content">
              <div v-if="item.activity_type==1">所有线上客户</div>
              <div v-if="item.activity_type==2">某些人可参与</div>
              <div v-if="item.activity_type==3">某些人不可参与</div>
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
                    <div class="row-content" v-if="pageType=='add'">
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

                            <div 
                              class="dateEveryLine" 
                              column
                              :haserr="checkDayTime(timeIndex, i, index)"
                              v-for="(timeItem, timeIndex) in it.day"
                              :key="timeIndex">
                              <div class="dateEveryLineMain">

                                <a-time-picker 
                                  :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                                  v-model="timeItem.start" 
                                  placeholder="请选择时间" />

                                <span class="dateEveryLine_centerText">至</span>

                                <a-time-picker 
                                  :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                                  v-model="timeItem.end" 
                                  placeholder="请选择时间" />

                                <div class="dateEveryLine_operationBox">
                                  <a-icon @click="addDayTime(timeIndex, i, index)" type="plus-circle" v-if="checkDayTime(timeIndex, i, index)==0&&timeIndex==it.day.length-1&&timeItem.start&&timeItem.end"/>
                                  <a-icon @click="deleteDayTime(timeIndex, i, index)" type="delete" v-if="checkDayTime(timeIndex, i, index)==0&&it.day.length>1"/>
                                </div>

                                <div 
                                  v-if="checkDayTime(timeIndex, i, index)==1"
                                  class="dateEveryLine_error">
                                  <a-icon type="exclamation-circle" />
                                  <span>{{timeItem.error}}</span>
                                </div>
                              </div>
                            </div>

                            <div class="dateEveryLine_tips">请选择24小时制时间，格式如 00:00:00 至 23:59:59</div>
                          </div>
                          <div v-show="it.rule_type==3">
                            <div class="dateMixinBoxTop">
                              <div class="dateMixinBox">
                                <div class="dateMixinBoxLine">
                                  <div 
                                    class="dateMixinBoxLineBlock"
                                    v-for="weekItem in weekList"
                                    :key="weekItem" 
                                    :ischoice="it.week.week_list.includes(weekItem)?1:''"
                                    @click="onChangeWeek(weekItem,i,index,$event)">
                                    {{weekItem}}
                                  </div>
                                </div>
                                <div 
                                  class="dateEveryLine" 
                                  :haserr="checkDayTime(timeIndex, i, index,'week')"
                                  v-for="(timeItem, timeIndex) in it.week.day"
                                  :key="timeIndex">

                                  <a-time-picker 
                                    :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                                    v-model="timeItem.start" 
                                    placeholder="请选择时间"/>

                                  <span class="dateEveryLine_centerText">至</span>

                                  <a-time-picker 
                                    :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                                    v-model="timeItem.end" 
                                    placeholder="请选择时间"/>

                                  <div class="dateEveryLine_operationBox">
                                    <a-icon @click="addDayTime(timeIndex, i, index, 'week')" type="plus-circle" v-if="checkDayTime(timeIndex, i, index, 'week')==0&&timeIndex==it.week.day.length-1&&timeItem.start&&timeItem.end"/>
                                    <a-icon @click="deleteDayTime(timeIndex, i, index, 'week')" type="delete" v-if="checkDayTime(timeIndex, i, index,'week')==0&&it.week.day.length>1"/>
                                  </div>

                                  <div 
                                    v-if="checkDayTime(timeIndex, i, index,'week')==1"
                                    class="dateEveryLine_error">
                                    <a-icon type="exclamation-circle" />
                                    <span>{{timeItem.error}}</span>
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
                                    :ischoice="it.month.month_list.includes(monthItem)?1:''"
                                    v-for="monthItem in 31"
                                    :key="monthItem"
                                    @click="onChangeMonth(monthItem,i,index,$event)">
                                    {{monthItem}}
                                  </div>
                                </div>
                                <div 
                                  class="dateEveryLine" 
                                  :haserr="checkDayTime(timeIndex, i, index,'month')"
                                  v-for="(timeItem, timeIndex) in it.month.day"
                                  :key="timeIndex">

                                  <a-time-picker 
                                    :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                                    v-model="timeItem.start" 
                                    placeholder="请选择时间"/>

                                  <span class="dateEveryLine_centerText">至</span>

                                  <a-time-picker 
                                    :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                                    v-model="timeItem.end" 
                                    placeholder="请选择时间"/>

                                  <div class="dateEveryLine_operationBox">
                                    <a-icon @click="addDayTime(timeIndex, i, index, 'month')" type="plus-circle" v-if="checkDayTime(timeIndex, i, index, 'month')==0&&timeIndex==it.month.day.length-1&&timeItem.start&&timeItem.end"/>
                                    <a-icon @click="deleteDayTime(timeIndex, i, index, 'month')" type="delete" v-if="checkDayTime(timeIndex, i, index,'month')==0&&it.month.day.length>1"/>
                                  </div>

                                  <div 
                                    v-if="checkDayTime(timeIndex, i, index,'month')==1"
                                    class="dateEveryLine_error">
                                    <a-icon type="exclamation-circle" />
                                    <span>{{timeItem.error}}</span>
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
                    <div class="row-content" v-else>
                      <div v-if="it.rule_type==1">活动期间</div>
                      <div v-if="it.rule_type==2">每日重复</div>
                      <div v-if="it.rule_type==3">每周重复</div>
                      <div v-if="it.rule_type==4">每月重复</div>
                    </div>
                  </div>
                  <div 
                    class="flex"
                    :class="{'mar_top16':it.rule_type==1||pageType=='edit'}">
                    <div 
                      class="row-title line_h40"
                      :class="{'ruleTimeBox':it.rule_type!=1&&pageType=='add'}">规则时间</div>
                    <div class="row-content line_h40" v-if="it.rule_type==1&&form.start_time">
                      {{form.start_time}} ~ {{form.end_time}}
                    </div>
                    <div class="row-content ruleTimeDetail" v-if="pageType=='edit'">
                      {{timeText(it)}}
                    </div>
                  </div>
                  <div class="flex mar_top16">
                    <div class="row-title line_h40">支付方式</div>
                    <div v-if="pageType=='add'" class="row-content" style="display:flex;align-items:center;">
                      <a-select v-model="it.pay_id" style="width: 240px" mode="multiple" placeholder="请选择支付方式">
                        <a-select-option 
                          v-for="(item, index) in payList"
                          :key="index"
                          :value="item.id">
                          {{item.name}}
                        </a-select-option>

                      </a-select>
                    </div>
                    <div v-else class="row-content">
                      <div class="pay_type_box">
                        {{payListText(it.pay_id)}}
                      </div>
                    </div>
                  </div>
                  <div class="flex mar_top16">
                    <div class="row-title line_h40" style="margin-top: 24px;">获取积分</div>
                    <div>
                      <div 
                        class="flex getintegralBox"
                        v-for="(jifenItem,jifenIndex) in it.getintegral"
                        :key="jifenIndex">
                        <div class="getintegral">
                          <div class="flex integBox">
                            <span class="line_h40 m_r_15">积分油品</span>
                            <el-select 
                              multiple 
                              collapse-tags 
                              v-model="jifenItem.oils_ids" 
                              @change="(val)=>selectAllOil(val,jifenIndex,i,index)" 
                              placeholder="请选择积分油品" 
                              style="width: 240px;">
                              <el-option v-for="(oilItem, oilIndex) in oilList" :key="oilIndex" :label="oilItem.oils_name" :value="oilItem.id"></el-option>
                            </el-select>
                          </div>
                          <div class="flex integBox">
                            <span class="line_h40 s_span m_r_15">消费积分</span>
                            <div class="flex calcIntegral">
                              <span>消费</span>
                              <a-select v-model="jifenItem.exp_type" style="width: 90px">
                                <a-select-option :value="1"> 原价 </a-select-option>
                                <a-select-option :value="2"> 实付 </a-select-option>
                                <a-select-option :value="3"> 升数 </a-select-option>
                              </a-select>
                              <span>每</span>
                              <a-input-number 
                                :min="0"
                                :precision="2"
                                v-model="jifenItem.money"
                                :placeholder="jifenItem.exp_type==3?'数量':'金额'"
                              />
                              <span v-if="jifenItem.exp_type==3">升</span>
                              <span v-else>元</span>
                              <span>积</span>
                              <a-input-number v-model="jifenItem.integral" placeholder="整数" :min="0" :precision="0"/>
                              <span>分</span>
                            </div>
                          </div>
                        </div>
                        <div class="handlePenel">
                          <a-icon 
                            @click="addJifen(jifenIndex,i,index)"
                            v-show="jifenIndex==it.getintegral.length-1"
                            type="plus-circle" 
                            class="m_r_8 pointer addGetJf"/>
                          <a-icon @click="deleteJifen(jifenIndex,i,index)" type="delete" class="pointer"/>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div @click="delGiveintegral(index,i)" class="removeRuleWrap" v-if="item.giveintegral.length!=1"><span>删除</span></div>
              </div>

              <div class="addRuleSet" v-if="pageType=='add'">
                <div class="addbox" @click="addGiveintegral(index)">
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
        {{pageType=='add'?'创 建':'保 存'}}
      </a-button>
      <a-button type="info" @click="back">
        返 回
      </a-button>
    </div>

  </a-layout-content>

</template>

<script>
import moment from 'moment';
import { getSitelist, addIntegralruleset,ruleConflict,getIntegrallists } from '@/api/crm'
import { getSitesoillist } from '@/api/oil'
import { getPayList } from '@/api/base'
import { funcChangeNumToCHN } from '@/utils/util'
import { mapGetters } from 'vuex'


export default {
  name: 'RuleEdit',
  components: {},
  data () {
    return {
      loading: false,
      integralsetIndex: 0,// 显示规则索引
      sitelist: [],  // 油站下拉
      oldChooseData: [], // 油站下拉上次的选择
      payList: [], // 支付方式下拉
      weekList:['日','一','二','三','四','五','六'],
      oilList:[],//油品下拉
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
                  { start: null, end: null, error: null }
                ],
                week:{
                  week_list: [],
                  day: [
                    { start: null, end: null, error: null }
                  ],
                },
                month:{
                  month_list:[],
                  day: [
                    { start: null, end: null, error: null }
                  ],
                },
                pay_id: [], //支付方式ID
                getintegral: [ //获取积分
                  {
                    //积分油品  字符串
                    oils_ids: [],
                    oldChooseData: [], // 用于全选
                    //消费类型1是实付 2是原价 3升数
                    exp_type: 1,
                    //消费金钱
                    money: null,
                    //获得积分
                    integral: null
                  },

                ]
              },
            ]
          },

        ]
      },
      conflict:{
        show:false,
        text: ''
      },// 冲突对象
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
    },
    itemData:{
      type: Object
    }
  },
  computed:{
    ...mapGetters(['userInfo']),
  },
  created () {
    // console.log(this.userInfo.site_id)
    this.Init()
  },
  methods: {
    moment,
    funcChangeNumToCHN,
    // 初始化
    async Init(){
      this.loading = true
      let SitelistRes = null
      // 如果是集团权限
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
      }else{
        // 单站权限
        this.form.site_ids = [this.userInfo.site_id]
        // 获取油品下拉
        let oilRes = await getSitesoillist(this.form.site_ids)
        this.oilList = oilRes.data
        this.oilList.unshift({
          oils_name: '全选',
          id: 'ALL_SELECT'
        })
      }
      // 获取支付方式列表
      let payRes = await getPayList()
      // console.log(payRes.data)
      if (payRes) {
        this.payList = payRes.data
      }
      if (this.pageType==='edit') {
        // console.log(this.itemData)
        // 编辑模式，拉取详情
        let formRes = await getIntegrallists(this.itemData.id)
        let form = _.cloneDeep(formRes.data)

        form.date = [form.start_time,form.end_time]
        form.site_ids = form.site_ids.map(Number)
        // 获取油品下拉
        let oilRes = await getSitesoillist(form.site_ids)
        this.oilList = oilRes.data
        this.oilList.unshift({
          oils_name: '全选',
          id: 'ALL_SELECT'
        })
        // console.log(form)
        form.integralset.forEach((e,i)=>{
          // console.log(e)
          e.giveintegral.forEach((e2,i2)=>{
            // console.log(e2)
            if (!e2.day) {
              e2.day = [
                { start: null, end: null, error: null }
              ]
            }
            if (!e2.week) {
              e2.week = {
                week_list: [],
                day: [
                  { start: null, end: null, error: null }
                ],
              }
            }
            if(!e2.month){
              e2.month = {
                month_list:[],
                day: [
                  { start: null, end: null, error: null }
                ],
              }
            }
            e2.pay_id = e2.pay_id.map(Number)
            e2.getintegral.forEach((e3,i3)=>{
              e3.oldChooseData = []
              e3.oils_ids = e3.oils_ids.map(Number)
            })
            
          })
        })
        
        // console.log(form)
        this.$set(this,'form',form)

      }
      
      this.loading = false
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
    // 返回列表页
    back(){
      this.$emit('back')
    },
    // 删除大规则
    delIntegralset(index){
      this.form.integralset.splice(index, 1)
      if (this.integralsetIndex>this.form.integralset.length-1) {
        this.integralsetIndex = this.form.integralset.length-1
      }
    },
    // 增加一条大规则
    addIntegralset(){
      let obj = {
        activity_type: 1, //活动人群活动人群类型 1所有线上客户 2部分可参与 3部分不可参与  如果选择所有客户的话，客户群体选择null
        activity_ids: null, //客户群体
        name: '', //积分规则名称
        giveintegral: [
          {
            rule_type: 1, //重复方式重复方式 1是活动期间 2是每日重复 3每周重复 4每月重复，然后当选择活动期间之后，日期之类的填写null
            day: [
              { start: null, end: null, error: null }
            ],
            week:{
              week_list: [],
              day: [
                { start: null, end: null, error: null }
              ],
            },
            month:{
              month_list:[],
              day: [
                { start: null, end: null, error: null }
              ],
            },
            pay_id: [], //支付方式ID
            getintegral: [ //获取积分
              {
                //积分油品  字符串
                oils_ids: [],
                oldChooseData: [], // 用于全选
                //消费类型1是实付 2是原价 3升数
                exp_type: 1,
                //消费金钱
                money: null,
                //获得积分
                integral: null
              },

            ]
          },
        ]
      }
      this.checkForm().then(()=>{
        this.form.integralset.push(obj)
        this.integralsetIndex = this.form.integralset.length-1
      }).catch(()=>{})
    },
    // 增加一条小规则
    addGiveintegral(index){
      let obj = {
        rule_type: 1, //重复方式重复方式 1是活动期间 2是每日重复 3每周重复 4每月重复，然后当选择活动期间之后，日期之类的填写null
        day: [
          { start: null, end: null, error: null }
        ],
        week:{
          week_list: [],
          day: [
            { start: null, end: null, error: null }
          ],
        },
        month:{
          month_list:[],
          day: [
            { start: null, end: null, error: null }
          ],
        },
        pay_id: [], //支付方式ID
        getintegral: [ //获取积分
          {
            //积分油品  字符串
            oils_ids: [],
            oldChooseData: [], // 用于全选
            //消费类型1是实付 2是原价 3升数
            exp_type: 1,
            //消费金钱
            money: null,
            //获得积分
            integral: null
          },

        ]
      }
      this.checkForm().then(()=>{
        this.form.integralset[index].giveintegral.push(obj)
      }).catch(()=>{})
    },
    // 删除一条小规则
    delGiveintegral(index,i){
      this.form.integralset[index].giveintegral.splice(i, 1)
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
      // 校验油站规则是否有冲突
      this.checkSiteRule()
      // console.log(this.form)
    },
    // 选择重复周
    onChangeWeek(item,i,index, event){
      let arr = this.form.integralset[index].giveintegral[i].week.week_list.map(e=>{
        return e
      })
      if (arr.includes(item)) {
        let arr2 = arr.filter(e=>{
          return e !== item
        })
        this.form.integralset[index].giveintegral[i].week.week_list = arr2
      }else{
        this.form.integralset[index].giveintegral[i].week.week_list.push(item)
      }
    },
    // 选择重复月
    onChangeMonth(item,i,index, event){
      let arr = this.form.integralset[index].giveintegral[i].month.month_list.map(e=>{
        return e
      })
      if (arr.includes(item)) {
        let arr2 = arr.filter(e=>{
          return e !== item
        })
        this.form.integralset[index].giveintegral[i].month.month_list = arr2
      }else{
        this.form.integralset[index].giveintegral[i].month.month_list.push(item)
      }
    },
    // 增加一条时间规则
    addDayTime(timeIndex, i, index, key){
      let obj = { start: null, end: null, error: null }
      if (key) {
        // 每周，每月
        this.form.integralset[index].giveintegral[i][key].day.push(obj)
      }else{
        // 每日
        this.form.integralset[index].giveintegral[i].day.push(obj)
      }
      
    },
    // 删除一条时间规则
    deleteDayTime(timeIndex, i, index, key){
      // console.log(timeIndex)
      if (key) {
        // 每周，每月
        this.form.integralset[index].giveintegral[i][key].day.splice(timeIndex, 1)
      }else{
         // 每日
        this.form.integralset[index].giveintegral[i].day.splice(timeIndex, 1)
      }
    },
    
    // 校验时间
    checkDayTime(timeIndex, i, index, key){
      if (key) {
        let { start, end } = this.form.integralset[index].giveintegral[i][key].day[timeIndex]

        if (start && end) {
          // 开始时间不能大于结束时间
          if (moment(start)>=moment(end)) {
            this.form.integralset[index].giveintegral[i][key].day[timeIndex].error = '起始时间不能大于结束时间'
            return 1
          }
          // 开始，结束时间不能与其他集合内任意时间重叠
          let arr = this.form.integralset[index].giveintegral[i][key].day.filter((e, dayIndex)=>{
            return dayIndex !== timeIndex && e.start && e.end
          })

          for (let dayIndex = 0; dayIndex < arr.length; dayIndex++) {
            const e = arr[dayIndex];
            if (moment(e.start)<=moment(start)&&moment(start)<=moment(e.end)) {
              this.form.integralset[index].giveintegral[i][key].day[timeIndex].error = '当前规则有冲突'
              return 1
            }
            if (moment(e.start)<=moment(end)&&moment(end)<=moment(e.end)) {
              this.form.integralset[index].giveintegral[i][key].day[timeIndex].error = '当前规则有冲突'
              return 1
            }
          }
        }
        this.form.integralset[index].giveintegral[i][key].day[timeIndex].error = null
        // 1 不合法， 0 合法
        return 0
      }else{
        let { start, end } = this.form.integralset[index].giveintegral[i].day[timeIndex]

        if (start && end) {
          // 开始时间不能大于结束时间
          if (moment(start)>=moment(end)) {
            this.form.integralset[index].giveintegral[i].day[timeIndex].error = '起始时间不能大于结束时间'
            return 1
          }
          // 开始，结束时间不能与其他集合内任意时间重叠
          let arr = this.form.integralset[index].giveintegral[i].day.filter((e, dayIndex)=>{
            return dayIndex !== timeIndex && e.start && e.end
          })

          for (let dayIndex = 0; dayIndex < arr.length; dayIndex++) {
            const e = arr[dayIndex];
            if (moment(e.start)<=moment(start)&&moment(start)<=moment(e.end)) {
              this.form.integralset[index].giveintegral[i].day[timeIndex].error = '当前规则有冲突'
              return 1
            }
            if (moment(e.start)<=moment(end)&&moment(end)<=moment(e.end)) {
              this.form.integralset[index].giveintegral[i].day[timeIndex].error = '当前规则有冲突'
              return 1
            }
          }
        }
        this.form.integralset[index].giveintegral[i].day[timeIndex].error = null
        // 1 不合法， 0 合法
        return 0
      }
      
    },
    // 删除一条积分规则
    deleteJifen(jifenIndex,i,index){
      // console.log(this.form.integralset[index].giveintegral[i].getintegral[jifenIndex])
      if (this.form.integralset[index].giveintegral[i].getintegral.length===1) {
        return
      }
      this.form.integralset[index].giveintegral[i].getintegral.splice(jifenIndex, 1)
    },
    // 增加一条积分规则
    addJifen(jifenIndex,i,index){
      let obj = {
        //积分油品  字符串
        oils_ids: [],
        oldChooseData: [], // 用于全选
        //消费类型1是实付 2是原价 3升数
        exp_type: 1,
        //消费金钱
        money: null,
        //获得积分
        integral: null
      }
      this.checkForm().then(()=>{
        this.form.integralset[index].giveintegral[i].getintegral.push(obj)
      }).catch(()=>{})
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

      // 储存当前选择的最后结果 作为下次的老数据
      this.oldChooseData = this.form.site_ids;

      // 校验油站规则是否有冲突
      this.checkSiteRule()

      // 根据选择油站，拉取油品列表
      // console.log(this.form.site_ids)
      let site_ids = this.form.site_ids.filter((e)=>{
        return e!=='ALL_SELECT'
      })
      // console.log(site_ids)
      if (site_ids.length) {
        this.loading = true
        getSitesoillist(site_ids).then((res)=>{
          // console.log(res.data)
          this.oilList = res.data
          this.oilList.unshift({
            oils_name: '全选',
            id: 'ALL_SELECT'
          })
          this.loading = false
        })
      }else{
        this.oilList = []
      }

    },
    // 校验油站规则是否有冲突
    checkSiteRule(){
      if (this.form.site_ids.length===0) {
        this.conflict.show = false
        this.conflict.text = ''
        return
      }

      let params = {
        start: this.form.start_time,
        end: this.form.end_time,
        site_ids: this.form.site_ids.filter((e=>{
          return e !== 'ALL_SELECT'
        }))
      }
      this.loading = true
      ruleConflict(params).then((res)=>{
        // console.log(res.data.isnull)
        // 冲突
        if (res.data.isnull===false) {
          let arr = this.sitelist.filter((e)=>{
            return res.data.site_ids.includes(e.id)
          })
          arr = arr.filter((e)=>{
            return e.id !== 'ALL_SELECT'
          })
          arr = arr.map(e=>{
            return e.site_name
          })
          let text = ''
          arr.forEach(e=>{
            text += `${e}、`
          })
          text = text.substring(0, text.length-1)

          this.conflict.show = true
          this.conflict.text = `${text}在该时间已有积分规则`
        }else{
          // 不冲突
          this.conflict.show = false
          this.conflict.text = ''
        }
        this.loading = false
      })
    },
    // 全选油品
    selectAllOil (val,jifenIndex,i,index) {
      const allValues = this.oilList.map(item => {
        return item.id;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.form.integralset[index].giveintegral[i].getintegral[jifenIndex].oldChooseData.length > 0 ? this.form.integralset[index].giveintegral[i].getintegral[jifenIndex].oldChooseData : [];
 
      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.form.integralset[index].giveintegral[i].getintegral[jifenIndex].oils_ids = allValues;
      }
      // console.log(oldVal)
      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.form.integralset[index].giveintegral[i].getintegral[jifenIndex].oils_ids = [];
      }
 
      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.form.integralset[index].giveintegral[i].getintegral[jifenIndex].oils_ids = val;
      }
 
      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.form.integralset[index].giveintegral[i].getintegral[jifenIndex].oils_ids = ['ALL_SELECT'].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.form.integralset[index].giveintegral[i].getintegral[jifenIndex].oldChooseData = this.form.integralset[index].giveintegral[i].getintegral[jifenIndex].oils_ids;

    },
    // 表单校验
    checkForm(){
      return new Promise((resolve, reject)=>{
        let isError = false
        let erroeText = '请先填写完整规则信息'

        if (this.conflict.show) {
          erroeText = this.conflict.text
          isError = true
        }

        let form = {
          site_ids: this.form.site_ids.filter((e)=>{
            return e !== "ALL_SELECT"
          }),
          start_time: this.form.start_time,
          end_time: this.form.end_time,
          integralset: _.cloneDeep(this.form.integralset)
        }
        if (this.pageType==='edit') {
          form.id = this.form.id
        }
        if (!form.site_ids.length&&!isError) {
          erroeText = '请选择活动油站'
          isError = true
        }
        form.integralset.forEach((integralsetItem,integralsetIndex)=>{
          if (this.pageType==='edit') {
            integralsetItem.id = integralsetItem.id
          }
          // console.log(integralsetItem)
          integralsetItem.name = `积分规则${funcChangeNumToCHN(integralsetIndex+1)}`
          integralsetItem.giveintegral.forEach((giveintegralItem,giveintegralIndex)=>{
            if (this.pageType==='edit') {
              giveintegralItem.id = giveintegralItem.id
            }
            // 每日
            if (giveintegralItem.rule_type===2) {
              // console.log(giveintegralItem)
              giveintegralItem.day.forEach((dayItem,datIndex)=>{
                
                dayItem.start = typeof dayItem.start==='string'?dayItem.start:moment(dayItem.start).format('HH:mm:ss')
                dayItem.end = typeof dayItem.end==='string'?dayItem.end:moment(dayItem.end).format('HH:mm:ss')

                if ((dayItem.start==="Invalid date"||dayItem.end==="Invalid date")&&!isError) {
                  erroeText = '请先填写完整规则信息 - 规则时间'
                  isError = true
                }
              })
            }
            // 每周
            if (giveintegralItem.rule_type===3) {
              // console.log(giveintegralItem)
              giveintegralItem.week.day.forEach((dayItem,datIndex)=>{
                
                dayItem.start = typeof dayItem.start==='string'?dayItem.start:moment(dayItem.start).format('HH:mm:ss')
                dayItem.end = typeof dayItem.end==='string'?dayItem.end:moment(dayItem.end).format('HH:mm:ss')

                if ((dayItem.start==="Invalid date"||dayItem.end==="Invalid date")&&!isError) {
                  erroeText = '请先填写完整规则信息 - 规则时间'
                  isError = true
                }
              })
            }
            // 每月
            if (giveintegralItem.rule_type===4) {
              giveintegralItem.month.day.forEach((dayItem,datIndex)=>{

                dayItem.start = typeof dayItem.start==='string'?dayItem.start:moment(dayItem.start).format('HH:mm:ss')
                dayItem.end = typeof dayItem.end==='string'?dayItem.end:moment(dayItem.end).format('HH:mm:ss')
                
                if ((dayItem.start==="Invalid date"||dayItem.end==="Invalid date")&&!isError) {
                  erroeText = '请先填写完整规则信息 - 规则时间'
                  isError = true
                }
              })
            }
            if (!giveintegralItem.pay_id.length&&!isError) {
              erroeText = '请先填写完整规则信息 - 支付方式'
              isError = true
            }
            giveintegralItem.getintegral.forEach((getintegralItem,getintegralIndex)=>{
              // 去掉油品里的全选
              getintegralItem.oils_ids = getintegralItem.oils_ids.filter(e=>{
                return e !== "ALL_SELECT"
              })
              if (!getintegralItem.oils_ids.length&&!isError) {
                erroeText = '请先填写完整规则信息 - 积分油品'
                isError = true
              }
              if (!getintegralItem.money&&!isError) {
                erroeText = '请先填写完整规则信息 - 消费积分'
                isError = true
              }
              if (!getintegralItem.integral&&!isError) {
                erroeText = '请先填写完整规则信息 - 消费积分'
                isError = true
              }

            })

          })
        })

        if (isError) {
          this.$message.error(erroeText)
          reject()
        }else{
          resolve(form)
        }
      })
    },
    // 提交表单
    save(){
      this.checkForm().then((form)=>{
        // console.log(form)

        addIntegralruleset(form).then((res)=>{
          this.back()
        })

      })
      .catch(()=>{})

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
    border: 1px solid #7C7EE2;
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
      color: #7C7EE2;
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
  .pay_type_box{
    width: 476px;
    margin: 8px 0 0 0;
  }
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
    .ant-time-picker-input{
      color: #ea4b4b;
      border-color: #ea4b4b;
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

.ruleTimeDetail{
  width: 600px;
  padding-top: 10px;
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
<style lang="less">
.dateEveryLine{
  &[haserr="1"]{
    .ant-time-picker-input{
      color: #ea4b4b;
      border-color: #ea4b4b;
    }
    i{
      color: #ea4b4b;
    }
  }
}
</style>