
<template>
  <a-layout-content v-loading="loading" :style="{padding: '0 0 24px', minHeight: '700px' }">
    <a-card class="head-card" style="margin-bottom: 10px;">
      <a-steps :current="step" style="width:70%;margin: 0 auto;">
        <a-step>
          <template slot="title">
            活动基础设置
          </template>
        </a-step>
        <a-step title="活动规则设置" />
        <a-step title="完成" />
      </a-steps>
    </a-card>
    <a-card v-if="step == 0">

      <div class="mainContent_block">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          style="min-width:700px;"
          :rules="rules">
          <a-form-model-item 
            label="活动名称" :colon="false" prop="basic.activity_name"
            :rules="{ required: true, message: '请输入1-12个字的营销活动名称', trigger: 'blur' }">

            <a-input v-model="form.basic.activity_name" placeholder="请输入活动名称" :max-length="12" style="width:280px;">
              <div class="input_suffix_slot" slot="suffix">{{form.basic.activity_name.length}}/12</div>
            </a-input>

          </a-form-model-item>
          <a-form-model-item 
            v-if="userInfo.site_id==(-1)"
            label="生效油站" 
            :colon="false" style="position:relative;;" prop="basic.site_ids"
            :rules="{ required: true, message: '请选择生效油站', trigger: 'blur' }">
            <el-select
              multiple
              collapse-tags
              v-model="form.basic.site_ids"
              @change="val => selectAll(val)"
              placeholder="请选择"
              style="width: 280px;"
              size="medium"
            >
              <el-option v-for="(item, index) in sitelist" :key="index" :label="item.site_name" :value="item.id"></el-option>
            </el-select>
            <div class="mSelectErrorTips" v-if="showSiteError">
              <a-icon type="info-circle" theme="filled" style="color:#ff2a2a; display:inline-block;margin: 2px 5px 0 0;" />
              <span>抱歉，您必须选择活动生效的油站</span>
            </div>
          </a-form-model-item>
          <a-form-model-item label="活动时间" :colon="false" prop="activity_time">
            <a-range-picker
              v-model="form.basic.date"
              @change="onChangeActiveDate"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['请选择活动开始时间', '请选择活动结束时间']"
              :show-time="{
                hideDisabledOptions: true,
                defaultValue: [
                  moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')
                ],
              }"
            />
          </a-form-model-item>
          <a-form-model-item label="活动人群" :colon="false">
            <a-radio-group v-model="form.basic.crowdtype">
              <a-radio :value="2">所有线上客户</a-radio>
              <a-radio :value="3">部分可参与</a-radio>
              <a-radio :value="4">部分不可参与</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="  " :colon="false" v-if="form.basic.crowdtype==3||form.basic.crowdtype==4">
            <div class="activity-detail-group" style="padding: 16px 24px 4px;">
              <a-form-model-item :label="form.basic.crowdtype==3?'选择可参与客户':'选择不可参与客户'" :colon="false">
                <el-cascader
                  :disabled="form.basic.site_ids.length==0"
                  style="width: 460px;"
                  v-model="form.basic.group"
                  :options="activePeoples"
                  :props="{ 
                    expandTrigger: 'hover', 
                    multiple: true,
                    value: 'id',
                    label: 'name',
                    children: 'treeList'
                  }"
                ></el-cascader>
              </a-form-model-item>
            </div>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
            <a-button type="primary" @click="checkForm(1)" style="margin-top:60px;">
              下一步
            </a-button>
            <a-button style="margin-left: 10px;" @click="back">
              返回
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>

    </a-card>
    <a-card v-if="step == 1">
      <a-form-model
        ref="activityRuleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        style="min-width:700px;"
      >
        <a-form-model-item 
          label="满减方式" :colon="false">
          <a-radio-group v-model="form.default.full_reduction_type">
            <a-radio :value="1">金额满减</a-radio>
            <a-radio :value="2">折扣满减</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item 
          label="支付限制" :colon="false" prop="default.pay_type"
          :rules="{ required: true, message: '请选择支付限制', trigger: 'blur' }">
          <a-select v-model="form.default.pay_type" style="min-width: 240px" mode="multiple" placeholder="请选择支付限制">
            <a-select-option 
              v-for="(item, index) in payList"
              :key="index"
              :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="参与限制" :colon="false">
          <a-radio-group v-model="form.default.limit_type">
            <a-radio :value="1">不限制</a-radio>
            <a-radio :value="2">限制</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="  " :colon="false" v-if="form.default.limit_type==2">
          <div class="activity-detail-group">
            每个用户，每
            <a-form-model-item 
              :colon="false" class="form-item-inline"
              prop="default.limit_day"
              :rules="[
                { required: true,type: 'number', message: '请输入1到999的整数', trigger: 'blur' },
                { min: 0, max: 999,type: 'number', message: '请输入1到999的整数', trigger: 'blur' },
              ]">
              <a-input-number 
                :min="0"
                v-model="form.default.limit_day"
                :precision="0"
                placeholder="整数" />
            </a-form-model-item>
            天可参与
            <a-form-model-item 
              :colon="false" class="form-item-inline"
              prop="default.limit_number"
              :rules="[
                { required: true,type: 'number', message: '请输入1到999的整数', trigger: 'blur' },
                { min: 0, max: 999,type: 'number', message: '请输入1到999的整数', trigger: 'blur' },
              ]">
              <a-input-number 
                :min="0"
                v-model="form.default.limit_number"
                :precision="0"
                placeholder="整数" />
            </a-form-model-item>
            次
          </div>
        </a-form-model-item>
        
        <a-form-model-item label="满减规则" :colon="false">
          <div 
            class="activity-detail-group-wrapper"
            v-for="(ruleItem,ruleIndex) in form.default.activity_rule" :key="ruleIndex">
            <div class="activity-detail-group activity-detail-group-small">

              <div class="form-item">
                <div class="form-label">消费油品</div>
                <div class="form-wrapper">
                  <el-select 
                    multiple 
                    collapse-tags 
                    v-model="ruleItem.arr_oil_ids" 
                    @change="(val)=>selectAllOil(val,ruleIndex)" 
                    placeholder="请选择消费油品" 
                    style="width: 240px;">
                    <el-option v-for="(oilItem, oilIndex) in oilList" :key="oilIndex" :label="oilItem.oils_name" :value="oilItem.id"></el-option>
                  </el-select>
                </div>
              </div>

              <div class="form-item">
                <div class="form-label" style="padding-top: 16px;">满减金额</div>
                <div class="form-wrapper">
                  <div 
                    class="rule_item_price"
                    v-for="(child,childIndex) in ruleItem.rules" :key="childIndex">
                    <div class="grey_block">
                      <span>原价满</span>
                      
                      <a-form-model-item 
                        class="form-item-inline"
                        :prop="`default.activity_rule.${ruleIndex}.rules.${childIndex}.man_award`"
                        :rules="[
                          { required: true,type: 'number', message: '请正确输入金额', trigger: 'blur' },
                          { validator: (rule, value, callback)=>checkMan(rule, value, callback,ruleIndex,childIndex),type: 'number', trigger: 'blur' },
                        ]">
                        <a-input-number
                          class="input-number"
                          :min="0"
                          :precision="2"
                          v-model="child.man_award"
                          :placeholder="'金额'"
                        />
                      </a-form-model-item>
                      
                      <span style="margin-left:10px;">元，立{{form.default.full_reduction_type==1?'减':'享'}}</span>

                      <a-form-model-item 
                        class="form-item-inline"
                        :prop="`default.activity_rule.${ruleIndex}.rules.${childIndex}.step_award`"
                        :rules="[
                          { required: true,type: 'number', message: '请正确输入金额', trigger: 'blur' },
                          { validator: (rule, value, callback)=>checkStep(rule, value, callback,ruleIndex,childIndex),type: 'number', trigger: 'blur' },
                        ]">
                        <a-input-number
                          class="input-number"
                          v-model="child.step_award"
                          :placeholder="form.default.full_reduction_type==1?'金额':'折扣'"
                          :min="0"
                          :precision="2"
                        ></a-input-number>
                      </a-form-model-item>

                      <span style="margin-left:10px;">{{form.default.full_reduction_type==1?'元':'折'}}</span>

                    </div>
                    <div class="price_operate">

                      <a-icon 
                        v-show="ruleItem.rules.length>1"
                        type="minus-circle" @click="delChild(ruleIndex,childIndex)" />

                      <a-icon 
                        v-show="ruleItem.rules.length-1==childIndex"
                        type="plus-circle"  @click="addChild(ruleIndex)"/>

                    </div>
                    
                  </div>
                  
                </div>
              </div>

              <div 
                v-if="form.default.activity_rule.length>1"
                class="rule_delete" @click="delRule(ruleIndex)">
                <a-icon type="close" />
              </div>

            </div>
          </div>

          <div 
            class="contentForRuleLine" style="padding-top: 20px;"
            >
            <a-button type="dashed" icon="plus" @click="addRule">继续添加</a-button>
          </div>

        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
          <a-button @click="step = 0" style="margin-top:60px;">
            上一步
          </a-button>
          <a-button type="primary" @click="checkForm(2)" style="margin-left: 10px;">
            创建
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-result
      v-if="step == 2"
      status="success"
      title="创建成功"
    >
      <template #extra>
        <a-button @click="goList">返回</a-button>
        <a-button type="primary" @click="goDetail">立即查看</a-button>
      </template>
    </a-result>
  </a-layout-content>
</template>
<script>
import { activitsave, activitCheck } from'@/api/em'
import { getSitelist, addIntegral } from '@/api/crm'
import { getPayList } from '@/api/base'
import { getSitesoillist } from '@/api/oil'
import { getlevelAlls } from '@/api/user'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'FullReduction',
  data () {
    return {
      activityId:null,
      loading: false,
      showSiteError: false,
      step: 0,
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      sitelist: [],
      oilList: [],
      oldChooseData: [],
      activePeoples: [],
      payList: [],
      form: {
        id: undefined,
        basic: {
          type: 3,
          activity_name: '', // 活动名称
          site_ids: [],// 生效油站
          date: [moment().startOf('day'), moment().endOf('day')],
          start_time: moment().startOf('day').format('YYYY-MM-DD HH:mm'), // 开始时间
          end_time: moment().endOf('day').format('YYYY-MM-DD HH:mm'),  // 结束时间
          crowdtype: 2, // 活动人群1所有客户2所有线上客户3部分可参与4部分不可参与
          group: [], // 优惠客群
        },
        default: {
          full_reduction_type: 1, //代表立减方式1金额立减2折扣立减
          limit_type: 1, // 1不限制2限制
          limit_day: null, //每几天
          limit_number: null, //可参与次数
          pay_type: [], //支付方式数组
          activity_rule: [ // 规则
            {
              arr_oil_ids: [],// 油品id集合
              oldChooseData: [],
              rules: [  //规则
                {
                  man_award: null,  //满多少钱
                  step_award: null,  //减多少钱
                }
              ]
            }
          ]
        },
      },
      rules: {
        // activity_name: [
        //   { required: true, message: '请输入1-12个字的营销活动名称', trigger: 'blur' }
        // ],
      },

    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  created () {
    
    this.Init()

    console.log(this.userInfo.site_id)
  },
  methods: {
    moment,
    // 初始化
    async Init(){
      this.loading = true
      // 集团
      if (this.userInfo.site_id==(-1)) {
        // 获取油站列表
        let SitelistRes = await getSitelist({sreach:''})
        // console.log(SitelistRes.data.data)
        if (SitelistRes) {
          this.sitelist = SitelistRes.data.data
          this.sitelist.unshift({
            site_name: '全选',
            id: 'ALL_SELECT'
          })
        }
      }else{
      // 单站
        this.form.basic.site_ids = [this.userInfo.site_id]
        // 获取固定、动态、客群三合一
        let activePeopleRes = await getlevelAlls({type:3,site_id:this.form.basic.site_ids})
        // console.log(activePeopleRes)
        if (activePeopleRes) {
          // console.log(activePeopleRes.data)
          this.activePeoples = activePeopleRes.data
          let activePeoplesLine = []
          // 树状改平行结构
          this.activePeoples.forEach(e=>{
            activePeoplesLine = activePeoplesLine.concat(e.treeList)
          })
          // console.log(activePeoplesLine)
          this.activePeoplesLine = activePeoplesLine
        }
        // 获取油品下拉
        let oilRes = await getSitesoillist(this.form.basic.site_ids)
        this.oilList = oilRes.data
        this.oilList.unshift({
          oils_name: '全选',
          id: 'ALL_SELECT'
        })

      }
      
      // 油品下拉
      // getOilSetList().then(res => {
        // this.oilList = res.data
      // })
      // 获取支付方式列表
      let payRes = await getPayList()
      // console.log(payRes.data)
      if (payRes) {
        this.payList = payRes.data
      }



      this.loading = false
    },
    delChild(ruleIndex,childIndex){
      if (this.form.default.activity_rule[ruleIndex].rules.length==1) {
        return
      }
      this.form.default.activity_rule[ruleIndex].rules.splice(childIndex,1)
    },
    addChild(ruleIndex){
      let obj = {
        man_award: null,  //满多少钱
        step_award: null,  //减多少钱
      }
      this.form.default.activity_rule[ruleIndex].rules.push(obj)
    },
    // 校验满金额
    checkMan(rule, value, callback,ruleIndex,childIndex){
      // 当前输入的值应大于右边
      // 金额应大于上一层对应金额
      // 金额应小于下一层对应金额

      // 所有规则
      let arr = this.form.default.activity_rule[ruleIndex].rules
      // 当前子规则
      let item = arr[childIndex]
      // 上一个
      let prev = arr[childIndex-1]
      // 下一个
      let next = arr[childIndex+1]

      // console.log(arr)
      // console.log(item)
      // console.log(prev)
      // console.log(next)

      if (item.step_award&&value<=item.step_award) {
        return callback(new Error('当前输入的值应大于右边'))
      }

      if (prev&&prev.man_award&&value<=prev.man_award) {
        return callback(new Error('金额应大于上一层对应金额'))
      }

      if (next&&next.man_award&&value>=next.man_award) {
        return callback(new Error('金额应小于下一层对应金额'))
      }

      return callback()
    },
    // 校验满金额
    checkStep(rule, value, callback,ruleIndex,childIndex){
      // 当前输入的值应小于左边
      // 金额应大于上一层对应金额
      // 金额应小于下一层对应金额

      // 所有规则
      let arr = this.form.default.activity_rule[ruleIndex].rules
      // 当前子规则
      let item = arr[childIndex]
      // 上一个
      let prev = arr[childIndex-1]
      // 下一个
      let next = arr[childIndex+1]

      // console.log(arr)
      // console.log(item)
      // console.log(prev)
      // console.log(next)

      if (item.step_award&&value>=item.man_award) {
        return callback(new Error('当前输入的值应小于左边'))
      }

      if (prev&&prev.man_award&&value<=prev.step_award) {
        return callback(new Error('金额应大于上一层对应金额'))
      }

      if (next&&next.man_award&&value>=next.step_award) {
        return callback(new Error('金额应小于下一层对应金额'))
      }

      return callback()
    },
    // 变更活动时间
    onChangeActiveDate(date,text){
      // console.log(date)
      // console.log(text)
      if (date.length) {
        this.form.basic.start_time = text[0]
        this.form.basic.end_time = text[1]
      }else{
        this.form.basic.start_time = undefined
        this.form.basic.end_time = undefined
      }
    },
    // 删除一条规则
    delRule(ruleIndex){
      if (this.form.default.activity_rule.length===1) {
        return
      }
      this.form.default.activity_rule.splice(ruleIndex, 1)
    },
    // 增加一条规则
    addRule(){
      let obj = {
        arr_oil_ids: [],// 油品id集合
        oldChooseData: [],
        rules: [  //规则
          {
            man_award: null,  //满多少钱
            step_award: null,  //减多少钱
          }
        ]
      }
      this.form.default.activity_rule.push(obj)
    },
    // 全选油品
    selectAllOil (val,index) {
      const allValues = this.oilList.map(item => {
        return item.id;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.form.default.activity_rule[index].oldChooseData.length > 0 ? this.form.default.activity_rule[index].oldChooseData : [];
 
      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.form.default.activity_rule[index].arr_oil_ids = allValues;
      }
      // console.log(oldVal)
      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.form.default.activity_rule[index].arr_oil_ids = [];
      }
 
      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.form.default.activity_rule[index].arr_oil_ids = val;
      }
 
      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.form.default.activity_rule[index].arr_oil_ids = ['ALL_SELECT'].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.form.default.activity_rule[index].oldChooseData = this.form.default.activity_rule[index].arr_oil_ids;

    },
    // 全选油站
    async selectAll (val) {
     const allValues = this.sitelist.map(item => {
        return item.id;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];
 
      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.form.basic.site_ids = allValues;
      }
      // console.log(oldVal)
      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.form.basic.site_ids = [];
      }
 
      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.form.basic.site_ids = val;
      }
 
      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.form.basic.site_ids = ['ALL_SELECT'].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.oldChooseData = this.form.basic.site_ids;

      

      let site_ids = this.form.basic.site_ids.filter((e)=>{
        return e!=='ALL_SELECT'
      })

      this.form.basic.group = []

      if (!site_ids.length) {
        return
      }
      this.loading = true
      // 获取固定、动态、客群三合一
      let activePeopleRes = await getlevelAlls({type:3,site_id:site_ids})
        // console.log(activePeopleRes)
      if (activePeopleRes) {
        // console.log(activePeopleRes.data)
        this.activePeoples = activePeopleRes.data
        let activePeoplesLine = []
        // 树状改平行结构
        this.activePeoples.forEach(e=>{
          activePeoplesLine = activePeoplesLine.concat(e.treeList)
        })
        // console.log(activePeoplesLine)
        this.activePeoplesLine = activePeoplesLine
      }
      // 重新获取油品
      this.oilList = []
      let oilListRes = await getSitesoillist(site_ids)

      if (oilListRes) {
          // console.log(res.data)
        this.oilList = oilListRes.data
        this.oilList.unshift({
          oils_name: '全选',
          id: 'ALL_SELECT'
        })
      }
      this.loading = false
        

    },
    checkForm (step) {
      if (step === 1) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // 生效油站校验
            if (this.form.basic.site_ids.length) {
              this.showSiteError = false
            } else {
              this.showSiteError = true
              return false
            }
            // 活动人群校验
            if (this.form.basic.crowdtype===3||this.form.basic.crowdtype===4) {
              if (!this.form.basic.group.length) {
                this.$message.error('请选择活动人群')
                return false
              }
            }

            activitCheck({
              type: this.form.default.full_reduction_type,
              site_id: this.form.basic.site_ids,
              start_time: this.form.basic.start_time,
              end_time: this.form.basic.end_time
            }).then(res=>{
              // console.log(res)
              if (res.data) {
                // 下一步
                this.step = step
              } else {
                if (this.form.basic.type==3) {
                  this.$message.error(`一个油站在同一时间最多支持1个满额送活动`)
                  return false
                }
                this.$message.error(res.msg)
                return false
              }
              
            })
            
          } else {
            this.$message.error('请将错误改正，再次提交')
            return false
          }
        })
      } else if (step === 2) {
        this.$refs.activityRuleForm.validate(valid => {
          if (valid) {
            let error = false
            for (let ruleIndex = 0; ruleIndex < this.form.default.activity_rule.length; ruleIndex++) {
              const ruleItem = this.form.default.activity_rule[ruleIndex];
              if (!ruleItem.arr_oil_ids.length) {
                error = true
                break;
              }
            }
            if (error) {
              this.$message.error('请选择消费油品')
              return false
            }
            // 创建
            this.save()
          } else {
            this.$message.error('请将错误改正，再次提交')
            return false
          }
        })
      }
    },
    save(){
      let form = _.cloneDeep(this.form)
      // 去除油站的全选
      form.basic.site_ids = form.basic.site_ids.filter(e=>{
        return e !== 'ALL_SELECT'
      })
      // 客群清洗
      if (form.basic.crowdtype==3||form.basic.crowdtype==4) {
        form.basic.group = form.basic.group.map(e=>{
          return e[1]
        })
      }
      form.default.activity_rule.forEach((ruleItem,ruleIndex)=>{
        
        // 油品清洗全选
        ruleItem.arr_oil_ids = ruleItem.arr_oil_ids.filter(e=>{
          return e !== 'ALL_SELECT'
        })

        
      })


      // console.log(form)
      // return
      activitsave(form).then(res=>{
        // console.log(res)
        this.activityId = res.data.id
        this.step = 2
      })

      // this.step = 2
    },
    back () {
      this.$router.go(-1)
    },
    goList () {
      this.$router.push('/em/list/list')
    },
    goDetail () {
      this.$router.push({
        path: `/em/list/list`,
        query:{
          activityId: this.activityId
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e1e28;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  margin: -20px 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mainContent_block {
  width: 100%;
  box-sizing: border-box;
}
.mSelectErrorTips {
  display: flex;
  align-items: center;
  position: absolute;
  right: -100%;
  top: 0;
  color: #ff2a2a;
  line-height: 18px;
  font-size: 14px;
}
.activity-detail-group {
  background-color: #fafafa;
  padding: 16px 24px;
  width: 610px;
  .form-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .form-label {
      width: 60px;
      margin-right: 15px;
      text-align: right;
      align-self: flex-start;
    }
    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
    }
    .form-wrapper {
      .input-number {
        margin: 0 10px;
      }
    }
  }
}
/deep/ .ant-form-item-label {
  padding-right: 15px;
}
/deep/ .ant-form-item-required::before {
  display:none;
}
/deep/ .el-checkbox-button__inner {
  border: none !important;
  background-color: initial;
}
/deep/.ant-result{
  background: #ffffff;
  min-height: 600px;
}
.input_suffix_slot{
  color: #eaeaf4;
}
/deep/.ant-form-item .ant-form-item-label{
  width: 110px;
  text-align: right;
  padding-right: 15px;
}
.activity-detail-group {
  background-color: #fafafa;
  padding: 6px 24px 0;
}
/deep/.form-item-inline{
  display: inline-block;
  width: 90px;
  margin-left: 10px;
  margin-right: 10px;
}
.contentForRuleLine{
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 5px 0 11px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  &:last-of-type{
    margin-bottom: 5px;
  }
}
.dateMixinBox{
  position: relative;
  display: block;
  width: 500px;
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
  &:last-of-type{
    margin-bottom: 5px;
  }
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
.contentForRuleLine{
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 5px 0 11px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  &[haserr=true]{
    /deep/i{
      color: #ea4b4b;
    }
    span{
      color: #ea4b4b;
    }
    /deep/.ant-time-picker-input{
      color: #ea4b4b;
      border-color: #ea4b4b;
    }
  }
}
.dateEveryLine_operationBox{
  position: relative;
  display: inline-block;
  top: 5px;
  min-width: 95px;
  height: 32px;
  line-height: 32px;
  vertical-align: top;
  &>i{
    margin-left: 20px;
    cursor: pointer;
    font-size: 16px;
  }
  &>em{
    position: relative;
    font-size: 12px;
    font-style: normal;
    color: #7c7ee2;
    margin-left: 30px;
    cursor: pointer;
  }
}
.activity-detail-group-wrapper+.activity-detail-group-wrapper{
  margin-top: 16px;
}
.rule_item_price{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  margin-bottom: 8px;
  .grey_block{
    background-color: #fafafa;
    padding: 16px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .form-item-inline{
      margin: 0;
      margin-right: 10px;
    }
  }
  .price_operate{
    white-space: nowrap;
    margin-left: 8px;
    &>i{
      font-size: 16px;
      cursor: pointer;
    }
    &>:last-child{
      margin-left: 8px;
    }
  }
}
.activity-detail-group,.activity-detail-group-small{
  position: relative;
}
.rule_delete{
  position: absolute;
  top: 4px;
  right: -20px;
  cursor: pointer;
  line-height: 20px;
  font-size: 16px;
  color: #cad5e9;
}
</style>
