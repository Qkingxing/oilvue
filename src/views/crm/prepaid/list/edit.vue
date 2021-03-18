<template>
  <a-layout-content
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="step-content">
        <div class="step-box">
          <a-steps :current="current" labelPlacement="vertical">

            <a-step title="基础设置" />
            <a-step title="充值规则设置" />
            <a-step title="完成" />
          </a-steps>
        </div>
      </div>

      <div class="main-content" v-loading="loading">
        <div class="mainContent-box">
          <div class="mainContent-scroll" :ittfm="current">
            <div class="mainContent-block">
              <div class="mainContent-setting-box">
                <div class="setting-header">基础设置</div>
                <a-form-model
                  ref="ruleForm"
                  :model="form"
                  :rules="rules"
                  style="min-width:700px;" 
                  :label-col="{ span: 3 }" 
                  :wrapper-col="{ span: 19 }">
                  <a-form-model-item label="加油卡名称" ref="card_name" prop="card_name" :colon="false">
                    <a-input 
                      v-model="form.card_name"
                      style="width:240px;" 
                      placeholder="请输入加油卡名称 1-12个字"
                    />
                  </a-form-model-item>
                  <a-form-model-item :colon="false" style="height: 40px;">
                    <div slot="label" class="setting-canUseMerchantBox">
                      <span>可用油站</span>
                      <a-popover placement="top">
                        <template slot="title">
                          <div>可用油站</div>
                        </template>
                        <template slot="content">
                          <div>仅可在本站充值，选择其他可用油站后即支持跨站消费</div>
                        </template>
                        <a-icon style="color: #cad5e9;font-size: 16px;" type="question-circle" />
                      </a-popover>
                    </div>
                    <a-select
                      mode="multiple"
                      v-model="form.site"
                      style="width: 240px;"
                      placeholder="请选择可用油站"
                    >
                      <a-select-option 
                        v-for="(item,index) in siteList" 
                        :key="index"
                        :disabled="item.id==site_id">
                        {{item.site_name}}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item label="卡类型" :colon="false">
                    <a-radio-group v-model="form.card_type">
                      <a-radio
                        v-for="(item,index) in cardTypeList"
                        :key="index"
                        :value="item.value">
                        {{item.label}}
                      </a-radio>
                    </a-radio-group>
                  </a-form-model-item>
                  <a-form-model-item label="卡面样式" :colon="false">
                    <a-radio-group v-model="cardCovertype" @change="onChangeCardCoverType(cardCovertype)">
                      <a-radio :value="1"> 模板 </a-radio>
                      <a-radio :value="2"> 自定义 </a-radio>
                    </a-radio-group>
                    <div class="cardPanelTemplate">
                      <div v-if="cardCovertype==1">
                        <span
                          @click="form.card_style = item"
                          class="cardPanelTemplateItem"
                          :class="{'activeCardPanel': item==form.card_style}"
                          v-for="(item, index) in templateList"
                          :key="index">
                          <img :src="item" alt="">
                        </span>
                      </div>
                      <div v-else>
                        <div class="customTemplate">
                          <div class="uploadOnceContainer upload-content">
                            
                            <a-upload
                              class="uploadOnceContainer_main"
                              name="file"
                              list-type="picture-card"
                              :show-upload-list="false"
                              action="https://oiljava.ldyxx.com:4435/goods/FileImg"
                              @change="handleChange"
                            >
                              
                              <img v-if="form.card_style" :src="form.card_style" alt="avatar" />
                              <div v-if="form.card_style" class="update-tips">重新上传</div>
                              <div v-else>
                                <a-icon :type="'plus'" style="font-size:20px;color: #9696a0;"/>
                              </div>
                            </a-upload>

                            <div class="uploadOnceContainer_prompt">图片建议尺寸670像素*280像素，大小不超过1MB</div>
                          </div>
                          <div class="exampleBox">
                            示例:
                            <img src="https://uat-authentication-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/20/11/71b0969fc36bb90ed93fbb74adbb.png" alt="示例" style="border-radius: 4px;">
                          </div>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item label="规则说明" :colon="false">
                    <a-textarea
                      v-model="form.card_rule"
                      style="width:320px;"
                      placeholder="可补充填写本加油卡的其他注意事项，非必填项"
                      :auto-size="{ minRows: 3, maxRows: 6 }"
                    />
                  </a-form-model-item>


 
                </a-form-model>

                <div class="btn-box">
                  <a-button type="info" size="large" @click="back">
                    取消
                  </a-button>
                  <a-button @click="checkForm(1)" type="primary" size="large" style="margin-left: 8px;">
                    下一步
                  </a-button>
                </div>
              </div>

              <div class="preview-box">
                <div class="preview-box-header">页面预览</div>
                <div class="preview-box-content">
                  <div class="preview-header">
                    <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/04/16/10/666c1309d980cf8a4953486cbf85.png">
                  </div>
                  <div class="preview-content">
                    <div class="preview-content-header">
                      <div class="content-left">{{userInfo.site_name}}</div>
                    </div>
                    <div class="preview-content-body">
                      <div class="preview-card">
                        <img :src="form.card_style==null?'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/04/16/14/a1a5831b2089d7d3e1a19a9e312d.png':form.card_style" alt="预览图片">
                        <div class="preview-card-name">{{form.card_name}}</div>
                        <div class="preview-available">{{oilText}}</div>
                        <div class="preview-price">
                          <div class="preview-price-type">￥</div><span>0.00</span>
                        </div>
                        <div class="preview-btn" v-show="cardCovertype==2">充值</div>
                      </div>
               
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mainContent-block">
              <div class="mainContent-setting-box">
                <div class="setting-header">基础设置</div>
                <a-form-model 
                  ref="ruleForm2"
                  :model="form"
                  :rules="rules"
                  style="min-width:700px;" 
                  :label-col="{ span: 3 }" 
                  :wrapper-col="{ span: 19 }">

                  <a-form-model-item label="充值限制" :colon="false">
                    <a-form-model-item label="" ref="min_refill" prop="min_refill" :colon="false" class="limit_formitem">
                      <a-input 
                        v-model="form.min_refill" 
                        placeholder="金额" 
                        type="number"
                        @change="
                          () => {
                            $refs.ruleForm2.validate()
                          }
                        "/>
                    </a-form-model-item>
                    <span style="color: rgba(0, 0, 0, 0.65); padding: 0px 10px;">至</span>
                    <a-form-model-item label="" ref="max_refill" prop="max_refill" :colon="false" class="limit_formitem">
                      <a-input 
                        v-model="form.max_refill" 
                        placeholder="金额" 
                        type="number"
                        @change="
                          () => {
                            $refs.ruleForm2.validate()
                          }
                        "/>
                    </a-form-model-item>
                    <span>&nbsp;&nbsp;元</span>
                    <span style="color: rgb(199, 199, 199);"></span>
                  </a-form-model-item>

                  <a-form-model-item label="自定义金额" :colon="false">
                    <a-radio-group v-model="form.is_open" class="noMargin">
                      <a-radio :value="2"> 关 </a-radio>
                      <a-radio :value="1"> 开 </a-radio>
                    </a-radio-group>
                  </a-form-model-item>

                  <a-form-model-item label="可用油品" ref="oils" prop="oils" :colon="false">
                    <a-select
                      mode="multiple"
                      v-model="form.oils"
                      style="width: 240px;"
                      placeholder="请选择可用油品"
                    >
                      <a-select-option 
                        v-for="(item,index) in oilList" 
                        :key="index">
                        {{item.oils_name}}
                      </a-select-option>
                    </a-select>
                   
                  </a-form-model-item>

                  <a-form-model-item label="充值优惠" :colon="false">
                    <a-radio-group v-model="form.type" class="noMargin" @change="onChangeType">
                      <a-radio :value="1"> 充值赠送 </a-radio>
                      <a-radio :value="2"> 充值立减 </a-radio>
                      <a-radio :value="3"> 充值折扣 </a-radio>
                      <a-radio :value="0"> 无优惠 </a-radio>
                    </a-radio-group>

                    <div class="noDiscountTemplate" v-if="form.type===0">
                      <div class="noDiscountHearder">
                        <span>固定金额</span>
                        
                        <a-icon @click="addGiverule" class="addRuleBlock iconfont" type="plus-circle" />
                        <a-icon @click="delGiverule(false)" class="addRuleBlock iconfont" type="minus-circle" />

                      </div>
                      <div class="noDiscountContent">
                        <div 
                          class="noDiscountItem"
                          v-for="(item, index) in form.editGiverule"
                          :key="index">
                          <a-input 
                            v-model="item.refillmoney" 
                            placeholder="金额" 
                            type="number"
                            @change="(e)=>checkNoGive(e, index)"/>
                          <div v-show="item.error" class="noDiscountError" style="">充值金额超出限制范围</div>
                        </div>
                        <div class="noDiscountItem" style="visibility: hidden; padding-bottom: 0px;"></div>
                      </div>
                    </div> 

                    <div
                      class="preferentialTemplate" 
                      v-else>

                      <div class="preferentialTemplateHeader">赠送规则</div>
                      <div
                        class="rechargeRule"
                        v-for="(item, index) in form.editGiverule"
                        :key="index">
                        <div class="rechargeRuleContent">
                          <span style="padding: 0px 10px 0px 0px;">充值满</span>
                          <a-form-model-item 
                            label="" 
                            :colon="false" 
                            class="limit_formitem"
                            ref="editGiverule.refillmoney"
                            :prop="'editGiverule.' + index + '.refillmoney'"
                            :rules="refillmoneyRule">

                            <a-input 
                              v-model="item.refillmoney" 
                              placeholder="金额" 
                              type="number" 
                              @change="
                                () => {
                                  $refs['editGiverule.refillmoney'][index].onFieldBlur()
                                }
                              "/>
                          </a-form-model-item>

                          <span style="padding-left: 0.5rem;">元，</span>
                          <span style="padding-right: 10px;" v-if="form.type===1">赠送</span>
                          <span style="padding-right: 10px;" v-if="form.type===2">立减</span>
                          <span style="padding-right: 10px;" v-if="form.type===3">享</span>
                          
                          <a-form-model-item 
                            label="" 
                            :colon="false" 
                            class="limit_formitem"
                            :prop="'editGiverule.' + index + '.givemoney'"
                            :rules="givemoneyRule">

                            <a-input 
                              v-model="item.givemoney" 
                              :placeholder="form.type===3?'数字':'金额'" 
                              type="number"
                              @change="
                                () => {
                                  $refs.ruleForm2.validate()
                                }
                              "/>
                          
                          </a-form-model-item>

                          <span style="padding-left: 0.5rem;" v-if="form.type===3">折</span>
                          <span style="padding-left: 0.5rem;" v-else>元</span>
                          <div class="operationBox">
                            <a-icon @click="delGiverule(index)" class="reduceRuleBlock iconfont" type="minus-circle" />
                            <a-icon @click="addGiverule" class="reduceRuleBlock iconfont" type="plus-circle" v-if="index===form.editGiverule.length-1"/>
                          </div>
                        </div>
                      </div>
                    </div>

                  </a-form-model-item>
                  <a-form-model-item label="首次多赠" :colon="false" v-if="form.type===1">
                    <a-radio-group v-model="isFirstGive">
                      <a-radio :value="0"> 关 </a-radio>
                      <a-radio :value="1"> 开 </a-radio>
                    </a-radio-group>
                  </a-form-model-item>

                  <a-form-model-item label=" " :colon="false" v-if="isFirstGive">
                    <div class="preferentialTemplate" style="display: flex; align-items: center; padding-top: 4px; padding-bottom: 3px;">
                      <span>首次充值多赠送</span>
                      <a-form-model-item 
                        label="" 
                        :colon="false" 
                        class="limit_formitem gas-card-setting-more-send-input" 
                        style="padding-top: 36px;"
                        ref="first_give" 
                        prop="first_give"
                        :rules="firstGiveRule">
                       
                        <a-input 
                          v-model="form.first_give" 
                          placeholder="整数" 
                          class="limit_input" 
                          style="margin: 0px 8px;"
                          type="number" />

                      </a-form-model-item>
                      <span style="margin-left:15px;">元</span>
                    </div>
                  </a-form-model-item>

                </a-form-model>

                <div class="btn-box">
                  <a-button @click="current=0" type="info" size="large">
                    上一步
                  </a-button>
                  <a-button @click="checkForm(2)" type="primary" size="large" style="margin-left: 8px;">
                    保存
                  </a-button>
                </div>
              </div>

              <div class="preview-box">
                <div class="preview-box-header">页面预览</div>
                <div class="preview-box-content">
                  <div class="preview-header">
                    <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/04/16/10/666c1309d980cf8a4953486cbf85.png">
                  </div>
                  <div class="preview-content">
                    <div class="preview-content-header">
                      <div class="content-left">{{userInfo.site_name}}</div>
                    </div>
                    <div class="preview-content-body">
                      <div class="preview-card">
                        <img :src="form.card_style==null?'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/04/16/14/a1a5831b2089d7d3e1a19a9e312d.png':form.card_style" alt="预览图片">
                        <div class="preview-card-name">{{form.card_name}}</div>
                        <div class="preview-available">{{oilText}}</div>
                        <div class="preview-price">
                          <div class="preview-price-type">￥</div><span>0.00</span>
                        </div>
                        <div class="preview-btn" v-show="cardCovertype==2">充值</div>
                      </div>
                      <div class="preview-form">
                        <div class="preview-price" v-if="form.is_open == 1">
                          <div class="preview-price-title">输入充值金额</div>
                          <div class="preview-price-input">请输入充值金额</div>
                        </div>

                        <div class="preview-form-price-type" v-if="form.editGiverule.length">
                          <div class="price-type-title">输入充值金额</div>
                          <div class="price-type-list">
                            <div 
                              class="price-type-item"
                              v-for="(item,index) in form.editGiverule"
                              :key="index">
                              <div class="price-type-item-content">
                                <div class="price-type-number" v-show="item.refillmoney&&item.refillmoney!=''">
                                  {{item.refillmoney}}
                                  <span style="font-size: 10px; font-weight: 600; line-height: 14px;">元</span>
                                </div>
                                <div class="price-type-preferential" v-show="item.givemoney&&item.givemoney!=''">
                                  <span v-if="form.type===1">赠送</span>
                                  <span v-if="form.type===2">立减</span>
                                  <span v-if="form.type===3">优惠</span>
                                  <span v-if="form.type===3">{{computZhe(item.refillmoney,item.givemoney)}}</span>
                                  <span v-else>{{item.givemoney}}</span>
                                  <span>元</span>
                                </div>
                                <span v-show="!item.refillmoney||item.refillmoney==''">未输入</span>
                                <img 
                                  v-if="form.type===3&&item.givemoney&&item.givemoney!=''"
                                  src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/04/17/11/0eb00733b7fe29f03d2ab2c07cfb.png" 
                                  style="position: absolute; width: 38px; height: 37px; top: 0px; right: 0px;">
                                <div v-if="form.type===3&&item.givemoney&&item.givemoney!=''" class="price-discount">{{item.givemoney}}折</div>
                              </div>
                            </div>

                            <div class="price-type-item" style="visibility: hidden;"></div>
                            <div class="price-type-item" style="visibility: hidden;"></div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div class="preview-content-footer">《加油卡服务条款》《充值规则》</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mainContent-block">
              <div class="create_success">
                <div class="icon_success">
                  <a-icon type="check-circle" class="iconfont icon-60" style="color: rgb(100, 180, 90); font-size: 60px;"/>
                </div>
                <div class="create_success_title">加油卡修改成功</div>
              </div>
              <div class="buttonsBox">
                <a-button type="info" size="large" @click="back">
                  返回列表
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </a-layout-content>
</template>

<script>
// import _ from 'lodash'
import {cardTypeList} from '@/utils/select'
import { getSitelist,gasfillingcardsave } from '@/api/crm'
import { getSiteoillist } from '@/api/oil'
import { mapGetters } from 'vuex'
//参数str判断的字符串 m最小值 n最大值
function isRangeIn(str,maxnum,minnum ) {
  var num = Number(str);
  if(num <= Number(maxnum) && num >= Number(minnum)){
    return true;
  }
  return false;
}

export default {
  name: 'PrepaidEdit',
  data(){
    const checkMin = (rule, value, callback) => {
      if (Number(value)<0) {
        callback(new Error('请输入合法金额！'))
      }
      // console.log(this.form.max_refill)
      if (Number(value) > Number(this.form.max_refill)) {
        callback(new Error('请输入合法金额！'))
      }else{
        callback()
      }
    }
    const checkMax = (rule, value, callback) => {
      if (Number(value)<0) {
        callback(new Error('请输入合法金额！'))
      }
      if (Number(value) < Number(this.form.min_refill)) {
        callback(new Error('最大金额不能小于最小金额'))
      }else{
        callback()
      }

    }
    // 充值校验
    const refillmoneyCheck = (rule, value, callback) => {
      if (Number(value)<0) {
        callback(new Error('请输入合法金额！'))
      }
      let count = this.form.editGiverule.filter(e=>{
        return e.refillmoney === value
      }).length

      if (count>1) {
        callback(new Error('存在重复金额'))
      }

      if (isRangeIn(value,this.form.max_refill,this.form.min_refill)) {
        callback()
      }else{
        callback(new Error('请输入合法金额！'))
      }

    }
    // 赠送立减优惠校验
    const givemoneyCheck = (rule, value, callback) => {
      if (Number(value)<0) {
        callback(new Error('请输入合法金额！'))
      }
      if (this.form.type===3) {
        if (isRangeIn(value,9.9,5)) {
          callback()
        }else{
          callback(new Error('折扣5~9.9之间'))
        }
      }
      // console.log(rule.field)
      let index = rule.field.split('.')[1]
      // console.log(index)
      if (isRangeIn(value,this.form.max_refill,this.form.min_refill)) {
        if (this.form.editGiverule[index].refillmoney) {
          if (Number(value) > Number(this.form.editGiverule[index].refillmoney)) {
            if (this.form.type===1) {
              callback(new Error('优惠不能大于充值金额'))
            }
            if (this.form.type===2) {
              callback(new Error('立减不能大于充值金额'))
            }
          }else{
            callback()
          }
        }else{
          callback()
        }
      }else{
        callback(new Error('请输入合法金额！'))
      }
    }
    const firstGiveCheck = (rule, value, callback) => {
      let that = this
      if (Number(value)<0) {
        callback(new Error('请输入合法金额！'))
      }
      
      let min = Math.min.apply(Math, that.form.editGiverule.map((e)=>{
        return e.refillmoney
      }))
      // console.log(min)
      let index = that.form.editGiverule.findIndex((e)=>{
        return Number(e.refillmoney) === min
      })
      // console.log(index)
      let item = that.form.editGiverule[index]

      let cha = Number(item.refillmoney)-Number(item.givemoney)
      // console.log(cha)
      // console.log(Number(value))

      if (cha < Number(value)) {
        callback(new Error('总优惠金额不能大于充值金额'))
      } else {
        callback()
      } 
    }
    return {
      current: 0,
      plainOptions:[
        '个人卡', '车队卡'
      ],
      plainOptions2:[
        '模板', '自定义'
      ],
      templateList:[
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/11/71b0969fc36bb90ed93fbb74adbb.png',
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/11/2143f30c32366b5fb6d899f2d828.png',
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/11/5f13040ce79b5929d4ac982a449c.png'
      ],
      perviewList: [
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/13/8d2d587a8081c645af0335acd7ce.png',
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/13/86c594d94a0829217736f7df93b2.png',
        'https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2020/11/24/13/33fd295028a684b450aa09fdc0ba.png'
      ],
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南'
        },
        {
          value: 'zujian',
          label: '组件',
        },
        {
          value: 'ziyuan',
          label: '资源',

        }
      ],
      form: {
        id: null,	
        //[string]		油卡ID 修改的时候传递		
        card_name: '',	
        //[string]	是	油卡名称	
        site: [],// 可用油站,index	
        card_type: 1,	
        //[string]	是	油卡类型 1是个人 2是车队		
        card_style: null,	
        //[string]	是	油卡背景图片		
        card_rule: '',	
        //[string]	是	油卡简介
        min_refill: '',	
        //[string]	是	最小充值金额		
        max_refill: '',	
        //[string]	是	最大充值金额		
        is_open: 2,
        // 是否开启自定义金额，1开，2关
        oils: [], // 支持的油品
        type: 0,
        // 所属类型 1是充值赠送 2是充值立减 3是充值折扣 0是没有优惠
        giverule: [
          { refillmoney: '', givemoney: '', error: false }
        ],// 优惠条件
        first_give: 0,// 首充
        editGiverule: [
          { refillmoney: '', givemoney: '', error: false }
        ],
      },
      rules:{
        card_name:[
          { required: true, message: '加油卡名称为必填，不能为空！', trigger: 'blur' },
          { min: 1, max: 12, message: '请输入合法名称', trigger: 'blur' },
        ],
        min_refill:[
          { required: true, message: '请输入合法金额！', trigger: 'blur' },
          { validator: checkMin, trigger: 'blur' },
        ],
        max_refill:[
          { required: true, message: '请输入合法金额！', trigger: 'blur' },
          { validator: checkMax, trigger: 'blur' },
        ],
        oils:[
          { required: true, message: '油品限制为必填，不能为空！', trigger: 'blur' },
        ],
        
      },
      refillmoneyRule:[
        { required: true, message: '请输入合法金额！', trigger: 'blur' },
        { validator: refillmoneyCheck, trigger: 'blur' },
      ],
      givemoneyRule:[
        { required: true, message: '请输入合法金额！', trigger: 'blur', },
        { validator: givemoneyCheck, trigger: 'blur' },
      ],
      firstGiveRule:[
        { required: true, message: '请输入金额', trigger: 'blur' },
        { validator: firstGiveCheck, trigger: 'blur' },
      ],
      cardTypeList,
      cardCovertype: 1, // 卡面样式 1 模板 2 自定义
      siteList: [], // 油站集合
      isAutoMoney: 0,// 是否开启自定义金额
      oilList: [], // 油品合集
      isFirstGive: 0, // 是否开启首充
      
      loading: false,

    }
  },
  props:{
    pageType:{
      type: String
    },
    formData:{
      type: Object,
      default: null
    }
  },
  computed:{
    ...mapGetters(['site_id', 'userInfo']),
    oilText(){
      let oilsText = '限'
      this.form.oils.forEach(e=>{
        if (this.oilList[e]) {
          oilsText += `${this.oilList[e].oils_name}、`
        }
      })
      if (this.form.oils.length===0) {
        oilsText = ''
      }
      if (this.form.oils.length===1) {
        oilsText = oilsText.replace('、','')
      }
      // console.log(oilsText)
      return oilsText
    }
  },
  created(){
    this.pageInit()
    
  },
  methods:{
    // 初始化
    async pageInit(){
      let that = this
      this.loading = true
      // 获取可用油站列表
      let res = await getSitelist({sreach:''})
      if(res){
        this.siteList = res.data.data
      }
      // 油品下拉
      let oilRes = await getSiteoillist()
      // console.log(oilRes.data.data)
      if (oilRes) {
        this.oilList = oilRes.data.data
      }

      if (this.pageType==='creat') {
        this.form.card_style = this.templateList[0]
        // 查找当前油站
        let index = this.siteList.findIndex((e,i)=>{
          return e.id === this.site_id
        })
        // console.log(index)
        this.form.site[0] = index
      }
      if (this.pageType==='edit') {
        console.log(this.formData)
        this.form.id = this.formData.id
        this.form.card_name = this.formData.card_name

        // 查找当前油站
        let site = []
        this.formData.site_name.forEach((fe,fi)=>{
          let index = that.siteList.findIndex((ce,ci)=>{
            return ce.id === fe.site_id
          })  
          site.push(index)
        })
        this.form.site = site

        this.form.card_type = this.formData.card_type || 1

        if (this.formData.card_style) {
          this.form.card_style = this.formData.card_style
          let index = this.templateList.findIndex(e=>{
            return e === that.formData.card_style
          })
          // 没找到背景图，证明是自定义的
          if (index===(-1)) {
            this.cardCovertype = 2
          }
          // console.log(index)
        }

        this.form.card_rule = this.formData.card_rule
        this.form.min_refill = this.formData.min_refill
        this.form.max_refill = this.formData.max_refill
        this.form.is_open = this.formData.is_open || 2

        if (this.formData.oilsinfo.length) {
          let oils = []
          // 查找油品
          this.formData.oilsinfo.forEach((fe,fi)=>{
            let index = that.oilList.findIndex((ce,ci)=>{
              return ce.id === fe.oils_id
            })  
            oils.push(index)
          })
          this.form.oils = oils
        }

        this.form.type = this.formData.type
        this.form.giverule = this.formData.giveruleinfo
        this.form.editGiverule = _.cloneDeep(this.formData.giveruleinfo)

        this.form.first_give = this.formData.first_give || 0
        this.isFirstGive = this.formData.first_give?1:0


      }
      this.loading = false
    },
    // 计算折扣，精确两位小数
    computZhe(max,zhe){
      return (max*zhe/10).toFixed(2)
    },
    // 检查固定金额
    checkNoGive(e,index){

      let val = e.target.value
      if (Number(val) <= Number(this.form.max_refill) && Number(val) >= Number(this.form.min_refill)) {
        this.form.editGiverule[index].error = false
      }else{
        this.form.editGiverule[index].error = true
      }
    },
    // 表单校验
    checkForm(current){
      if (current===1) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.current = current
          } else {
            this.$message.error('请将错误改正，再次提交')
            return false;
          }
        });
      }
      if (current===2) {
        this.$refs.ruleForm2.validate(valid => {
          if (valid) {
            this.save()
            this.current = current
          } else {
            this.$message.error('请将错误改正，再次提交')
            return false;
          }
        });
      }
    },
    // 保存
    save(){
      let form = {}
      console.log(this.form)
      // 可用油站参数拼接
      let site = []
      this.form.site.forEach(e=>{
        if (this.siteList[e]) {
          site.push({
            site_id: this.siteList[e].id
          })
        }
      })
      // 可用油品
      let oils = []
      this.form.oils.forEach(e=>{
        if (this.oilList[e]) {
          oils.push({
            oils_id: this.oilList[e].id
          })
        }
      })
      // console.log(oils)
      let giverule = []
      
      this.form.editGiverule.forEach(e=>{
        if (this.form.type===0) {
          e.givemoney = 0
        }
        if (e.refillmoney) {
          giverule.push(e)
        }
      })
      

      form = {
        card_name: this.form.card_name,
        //[string]	是	油卡名称		
        card_type: this.form.card_type,
        //[string]	是	油卡类型 1是个人 2是车队		
        card_style: this.form.card_style,	
        //[string]	是	油卡背景图片		
        card_rule: this.form.card_rule,
        //[string]	是	油卡简介		
        is_open: this.form.is_open,
        //[string]	是	是否开启 1是开启 2是关闭		
        first_give: this.form.first_give || 0,
        //[string]	是	首冲 如果是关闭的话 给0
        site, // 可用油站
        min_refill: this.form.min_refill,
        //[string]	是	最小充值金额		
        max_refill: this.form.max_refill,
        //[string]	是	最大充值金额		
        site_id: this.site_id,
        //[string]	是	所属油站
        oils, // 支持的油品
        type: this.form.type,//所属类型 1是充值赠送 2是充值立减 3是充值折扣 0是没有优惠
        giverule,
      }
      if (this.pageType === 'edit') {
        form.id = this.form.id
      }

      // console.log(form)
      gasfillingcardsave(form).then((res)=>{
        // console.log(res)
        this.current = 2
      })



    },
    // 变更优惠规则时
    onChangeType(){
      console.log(this.form.type)
      if (this.form.type!==0&&this.form.giverule.length===0) {
        this.form.editGiverule = { refillmoney: null, givemoney: null, error: false }
      }else{
        this.form.editGiverule = _.cloneDeep(this.form.giverule)
      }
      
    },
    // 删除优惠规则
    delGiverule(index){
      // console.log(index)
      let that = this

      if (this.form.type!==0&&this.form.editGiverule.length===1) {
        return
      }
      if (index===false) {
        this.form.editGiverule.splice(that.editGiverule.length-1,1)
        return
      }

      this.form.editGiverule.splice(index,1)

      
    },
    // 增加优惠规则
    addGiverule(){
      if (this.form.editGiverule.length===9) {
        this.$message.error('优惠规则最多添加9条！')
        return
      }
      let obj = { refillmoney: null, givemoney: null, error: false }
      this.form.editGiverule.push(obj)
    },
    // 上传图片回调
    handleChange(info){
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        let url = info.file.response.data
        // console.log(url)
        this.form.card_style = url
      }
      if (info.file.status === 'done') {
        this.$message.success(`上传成功`);
      } else if (info.file.status === 'error') {
        this.$message.error(`上传失败`);
      }
    },
    back(){
      this.$emit('back')
    },
    // 切换卡面类型时
    onChangeCardCoverType(value){
      // console.log(value)
      if (value===1) {
        this.form.card_style = this.templateList[0]
      }else{
        this.form.card_style = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.step-content{
  background: #fff;
  display: flex;
  justify-content: center;
  .step-box{
    padding: 16px 0;
    width: 60%;
    height: 87px;
  }
}
.main-content{
  background: #fff;
  margin-top: 8px;
  height: 850px;
  overflow: auto;
  .mainContent-box{
    display: block;
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    .mainContent-scroll{
      transition: .3s;
      transform: translateZ(0);
      width: 100%;
      position: relative;
      height: 100%;
      &[ittfm="1"]{
        transform: translate3d(-100%,0,0);
      }
      &[ittfm="2"]{
        transform: translate3d(-200%,0,0);
      }
      .mainContent-block{
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        padding-left: 24px;
        padding-right: 24px;
        overflow-y: auto;
        overflow-x: auto;
        &:nth-child(2){
          transform: translateX(100%);
        }
        &:nth-child(3){
          transform: translateX(200%);
        }
        .mainContent-setting-box{
          flex: 2;
          padding-right: 40px;
          
          .setting-header{
            font-size: 14px;
            font-family: PingFangSC-Medium,PingFang SC;
            font-weight: 500;
            color: #1e1e28;
            line-height: 14px;
            padding: 24px 0 16px 0;
            border-bottom: 1px solid #eaeaf4;
            margin-bottom: 27px;
          }
          .noMargin{
            .ant-radio-wrapper{
              margin-right: 0;
            }
          }
          .noDiscountTemplate{
            width: 344px;
            background: #fafafa;
            padding: 24px;
            .noDiscountHearder{
              font-size: 14px;
              font-family: PingFangSC-Regular,PingFang SC;
              font-weight: 400;
              color: #1e1e28;
              line-height: 14px;
              margin-bottom: 16px;
              .addRuleBlock{
                width: 16px;
                height: 16px;
                cursor: pointer;
                margin-left: 10px;
                color: #9696a0;
                font-size: 16px;
              }
            }
            .noDiscountContent{
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              .noDiscountItem{
                padding-bottom: 16px;
                position: relative;
                width: 88px;
                .noDiscountError{
                  color: red;
                  width: 88px;
                  height: 16px;
                  font-size: 12px;
                  line-height: 14px;
                }
              }
            }
          }
          .btn-box{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            padding-left: 128px;
            margin-top: 80px;
          }
        }
        .preview-box{
          .preview-box-header{
            font-size: 14px;
            height: 54px;
            font-family: PingFangSC-Medium,PingFang SC;
            font-weight: 500;
            color: #1e1e28;
            line-height: 14px;
            padding: 24px 0 16px 0;
            background: #fff;
          }
          .preview-box-content{
            background: #fafafa;
            position: relative;
            height: 675px;
            width: 368px;
            padding: 24px;
            .preview-header{
              width: 320px;
              height: 67px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .preview-content{
              position: relative;
              width: 320px;
              height: 560px;
              background: #fff;
              padding: 16px 17px;
              .preview-content-header{
                height: 17px;
                font-size: 12px;
                font-family: PingFangSC-Regular,PingFang SC;
                font-weight: 400;
                line-height: 17px;
                margin-bottom: 8px;
                .content-left{
                  color: #1e1e28;
                  display: inline-block;
                }
              }
              .preview-content-body{
                .preview-card{
                  position: relative;
                  width: 286px;
                  height: 121px;
                  overflow: hidden;
                  border-radius: 15px 15px 0 0;
                  img{
                    width: 100%;
                  }
                  .preview-card-name{
                    position: absolute;
                    top: 17px;
                    left: 17px;
                    width: 145px;
                    height: 24px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 17px;
                    font-family: PingFangSC-Semibold,PingFang SC;
                    font-weight: 600;
                    color: #fff;
                    line-height: 24px;
                  }
                  .preview-available{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    font-size: 11px;
                    font-family: PingFangSC-Regular,PingFang SC;
                    font-weight: 400;
                    color: #fff;
                    line-height: 16px;
                    height: 32px;
                    left: 17px;
                    right: 17px;
                    top: 41px;
                    position: absolute;
                  }
                  .preview-price{
                    position: absolute;
                    left: 15px;
                    bottom: 15px;
                    width: 84px;
                    height: 37px;
                    font-size: 24px;
                    font-family: PingFangSC-Semibold,PingFang SC;
                    font-weight: 600;
                    color: #fff;
                    line-height: 37px;
                    .preview-price-type{
                      display: inline-block;
                      font-size: 14px;
                    }
                  }
                  
                  .preview-btn{
                    position: absolute;
                    right: 15px;
                    bottom: 16px;
                    width: 72px;
                    height: 30px;
                    background: #1e3cfa;
                    border-radius: 17px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular,PingFang SC;
                    font-weight: 400;
                    color: #fff;
                    line-height: 30px;
                    text-align: center;
                  }
                }
                .preview-form{
                  padding-top: 16px;
                  .preview-price{
                    padding-bottom: 20px;
                    .preview-price-title{
                      font-size: 12px;
                      font-family: PingFangSC-Regular,PingFang SC;
                      font-weight: 400;
                      color: #1e1e28;
                      line-height: 17px;
                      margin-bottom: 10px;
                    }
                    .preview-price-input{
                      width: 286px;
                      height: 42px;
                      background: #f8f8f8;
                      border-radius: 5px;
                      padding: 11px 9px;
                      font-size: 15px;
                      font-family: PingFangSC-Regular,PingFang SC;
                      font-weight: 400;
                      color: #b2b2b2;
                      line-height: 20px;
                    }
                  }
                  .preview-form-price-type{
                    .price-type-title{
                      font-size: 12px;
                      font-family: PingFangSC-Regular,PingFang SC;
                      font-weight: 400;
                      color: #1e1e28;
                      line-height: 17px;
                      margin-bottom: 10px;
                    }
                    .price-type-list{
                      display: -webkit-box;
                      display: -ms-flexbox;
                      display: flex;
                      -webkit-box-pack: justify;
                      -ms-flex-pack: justify;
                      justify-content: space-between;
                      -ms-flex-wrap: wrap;
                      flex-wrap: wrap;
                      .price-type-item{
                        position: relative;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        width: 90px;
                        height: 60px;
                        background: #f8f8f8;
                        border-radius: 4px;
                        text-align: center;
                        font-family: PingFangSC-Regular,PingFang SC;
                        margin-bottom: 8px;
                        .price-type-item-content{
                          text-align: center;
                          -webkit-box-flex: 1;
                          -ms-flex: 1;
                          flex: 1;
                          .price-type-number{
                            font-size: 14px;
                            font-weight: 600;
                            color: #3c3c46;
                            line-height: 22px;
                          }
                          .price-type-preferential{
                            font-size: 10px;
                            font-weight: 400;
                            color: #3c3c46;
                            line-height: 14px;
                          }
                          .price-discount{
                            position: absolute;
                            height: 16px;
                            width: 37px;
                            font-size: 8px;
                            font-family: PingFangSC-Regular,PingFang SC;
                            font-weight: 400;
                            color: #fff;
                            line-height: 11px;
                            top: 0;
                            right: 0;
                            -webkit-transform: translate3d(2px,7px,0) rotate(45deg);
                            transform: translate3d(2px,7px,0) rotate(45deg);
                          }
                        }
                      }
                    }
                  }
                }
              }
              .preview-content-footer{
                position: absolute;
                bottom: 12px;
                left: 50%;
                -webkit-transform: translate(-50%);
                transform: translate(-50%);
                width: 180px;
                height: 16px;
                font-size: 11px;
                font-family: PingFangSC-Regular,PingFang SC;
                font-weight: 400;
                color: #37f;
                line-height: 16px;
              }
            }
          }
        }
        .preferentialTemplate{
          width: 572px;
          border: 1px solid #eaeaea;
          padding: 24px;
          color: #1e1e28;
          margin-top: 16px;
          .gas-card-setting-more-send-input{
            padding-top: 17px!important;
            width: 104px;
            margin-bottom: 16px;
          }
        }
        .create_success{
          position: absolute;
          top: 28%;
          left: 50%;
          -webkit-transform: translate3d(-50%,-50%,0);
          transform: translate3d(-50%,-50%,0);
          .icon_success{
            text-align: center;
            color: #1890ff;
            margin-bottom: 14px;
            .iconfont{
              transition: color .3s;
              width: 1em;
              height: 1em;
              vertical-align: -.15em;
              fill: currentColor;
              overflow: hidden;
            }
          }
          .create_success_title{
            font-size: 18px;
            font-weight: 500;
            color: #1e1e28;
            text-align: center;
            line-height: 16px;
            margin-bottom: 1px;
          }
        }
        .buttonsBox{
          position: absolute;
          top: 40%;
          left: 50%;
          -webkit-transform: translate3d(-50%,-50%,0);
          transform: translate3d(-50%,-50%,0);
        }


      }
    }
  }
}
.ant-form-item{
  margin-bottom: 16px;
}
.setting-canUseMerchantBox{
  display: flex;
  height: 100%;
  align-items: center;
  span{
    transform: translateX(-8px);
  }
}

</style>
<style lang="scss">
.mainContent-setting-box{
  .ant-col-3{
    padding-left: 42px;
    text-align: right;
    min-width: 122px;
    width: auto;
    line-height: 40px;
  }
  .ant-radio-wrapper{
    width: 140px;
    margin-right: 33px;
    color: #1e1e28;
  }
  .cardPanelTemplate{
    width: 100%;
    padding-top: 15px;
    border-top: 1px solid #eaeaf4;
    div{
      position: relative;
    }
    .cardPanelTemplateItem{
      position: relative;
      display: inline-block;
      width: 120px;
      height: 80px;
      background: #ccc;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 8px;
      cursor: pointer;
      overflow: hidden;
      &.activeCardPanel{
        box-shadow: 0 0 4px 0 #5482eb;
        border: 1px solid #5482eb;
      }
      img{
        height: 100%;
        position: absolute;
        right: 0;
      }
    }
    // 上传图片
    .uploadOnceContainer{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      width: 100%;
      position: relative;
      .uploadOnceContainer_main{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        .ant-upload {
          background: #fff;
          position: relative;
          img{
            width: 100px;
            height: 100px;
          }
          .update-tips{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            color: #fff;
            background-color: rgba(0,0,0,.6);
            text-align: center;
            overflow: hidden;
          }
        }
      }
      .ant-upload-picture-card-wrapper{
        zoom: 1;
        display: inline-block;
        width: 100%;
      }
      .uploadOnceContainer_prompt{
        display: block;
        font-size: 12px;
        color: #9696a0;
        line-height: 12px;
        margin-top: 8px;
      }
    }
    .exampleBox{
      position: absolute;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      right: 0;
      top: 0;
      height: 100px;
      width: 180px;
      background: #fafafa;
      padding: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular,PingFang SC;
      font-weight: 400;
      color: #3c3c46;
      line-height: 14px;
      img{
        width: 120px;
        height: 80px;
        vertical-align: text-top;
      }
    }
  }
  .preferentialTemplate{
    width: 572px;
    border: 1px solid #eaeaea;
    padding: 24px;
    color: #1e1e28;
    margin-top: 16px;
    .preferentialTemplateHeader{
      line-height: 14px;
      margin-bottom: 16px;
    }
    .rechargeRule{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-bottom: 5px;
      padding: 0 24px;
      height: 88px;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background: #fafafa;
      position: relative;
      width: 396px;
      .rechargeRuleContent{
        width: 100%;
      }
      .operationBox{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        width: 78px;
        position: absolute;
        right: -79px;
        .iconfont{
          color: #9696a0;
          font-size: 16px;
          -webkit-transition: color .3s;
          transition: color .3s;
        }
        .reduceRuleBlock{
          width: 16px;
          height: 16px;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
  }
  .limit_formitem{
    display: inline-block;
    &.ant-form-item{
      margin-bottom: 0;
      width: 88px;
    }
  }
  
}
</style>