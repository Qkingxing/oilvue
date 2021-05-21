
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
      <div v-show="!showTab&&nowKey==1">
        <div>
          <header>
            <div  class="page-title">
              <span >新增挂牌价</span>
              </div>
          </header>
            <a-form >
   
          <a-form-item
            label="生效时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-date-picker
            v-model="oils_start_time"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              valueFormat="YYYY-MM-DD HH:mm:ss"
            />
          </a-form-item>
          <a-form-item
            label="油品"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-tree-select
            :maxTagCount="0"
            @change="oilSelChange"
              v-model="oilArr"
              style="width: 100%"
              :tree-data="treeData"
              tree-checkable
              :show-checked-strategy="SHOW_PARENT"
              search-placeholder="请选择油品"
            />
          </a-form-item>
          <a-form-item
            label=""
            v-for="item in oils"
            :key="item.oils_id"
          :wrapper-col="{ span:24, offset: 4 }"
          >
          
            <a-tag>{{item.title}}</a-tag>
            <div style="margin-right:50px;display:inline-block;width:100px;">{{item.oils_name}}</div>
              <a-input-number :min="1"  v-model="item.oils_money" />
              <span style="margin-left:20px;margin-right:50px">元/L</span>
              <a-button type="link" @click="delOil(item)">
                删除
              </a-button>
          </a-form-item>
          <a-form-item
                label=""
                :wrapper-col="{ span: 12, offset: 4 }"
              >
                <a-button type="primary" @click="addNewOil">
                      创建
                    </a-button>
                    <a-button @click="showTab=true;oils=[];oilArr=[]" :style="{ marginLeft: '8px' }">
                      取消
                    </a-button>
              </a-form-item>
            </a-form>                
          </div>
      </div>
      <div v-show="!showTab&&nowKey==2">
        <header>
          <div  class="page-title"><span>
            新增油枪</span></div>
        </header>
        <a-form :form="yqForm" :label-col="{ span:3 }" :wrapper-col="{ span: 21 }">
          <a-form-item label="枪号">
            <div class="flex25">
              <div class="item-wrap" v-for="(item,index) in yqForm.gunList" :key="index">
                <div class="ipt-wrap">
                 <a-input-number v-model="item.gun_name"   :min="1" :max="255" />
               
                </div>
                <div class="add-btn">
                   <a-button @click="addPlus" size="small"  icon="plus" />
                </div>
                <div class="del-btn">
                   <a-button size="small" @click="delMinus(item,index)"  icon="minus" />
                </div>
              </div>
            </div>
           
          </a-form-item>
           <a-form-item label="油品名称" :wrapper-col="{ span: 12}">
             <a-select v-model="yqForm.oils_id">
              <a-select-option :value="item.id" v-for="(item,index) in setSiteoillistData" :key="index">
                {{ item.oils_name}}
              </a-select-option>
            </a-select>
          </a-form-item>
          <!-- <a-form-item label="油枪分组" :wrapper-col="{ span: 12}">
             <a-select v-model="yqForm.gun_grouping"  @change="yqChange">
              <a-select-option v-for="(item,index) in yqArr" :key="index">
                {{ item.sort_name}}
              </a-select-option>
            </a-select>
          </a-form-item> -->
           <a-form-item label="状态">
            <a-radio-group v-model="yqForm.gun_status">
              <a-radio value="1">
                启用
              </a-radio>
              <a-radio value="0">
                禁用
              </a-radio>
              
            </a-radio-group>
          </a-form-item>
        <!-- <a-form-item label="零管系统">
          <a-radio-group v-model="yqForm.zero_type">
            <a-radio value="1">
              启用
            </a-radio>
            <a-radio value="0">
              禁用
            </a-radio>
           
          </a-radio-group>
        </a-form-item> -->
          <a-form-item :wrapper-col="{ span: 12 }">
            <a-button @click="subYq" type="primary" style="margin-right:20px">
              提交
            </a-button>
            <a-button @click="cancelYq">
              取消
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <a-tabs v-show="showTab"  @change="tabChange" default-active-key="1" size="large">
        <a-tab-pane key="1" tab="油品挂牌价">
            <a-button type="primary" @click="showTab=false">
            新增挂牌价
          </a-button>
          <div class="showDataForTable">
            <a-table
              ref="table"
              size="default"
              rowKey="key"
              :columns="columns"
              :data-source="setSiteoillistData"
            >
             

               <a-tag
        slot="oils_status" slot-scope="oils_status"
        
        :color="oils_status ==1 ? 'volcano' : oils_status ==2 ? 'geekblue' : 'green'"
      >
        {{oils_status==1?'生效中':(oils_status==2?'待生效':'已过期')}}
      </a-tag>
              <span slot="action" slot-scope="text, record">
                <template>
                  <a @click="delTag(record)">撤回</a>
                </template>
              </span>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="油枪配置">
         
          <div class="list-wrap">
            <span class="label-left">状态:</span>
            <a-radio-group name="radioGroup" :default-value="1">
              <a-radio :value="1">
               启用
              </a-radio>
              <a-radio :value="2">
                禁用
              </a-radio>
             
            </a-radio-group>
          </div>

          <a-row class="list-wrap" type="flex" justify="space-between">
            <a-col :span="18">
              <!-- <span class="label-left">排列类型:</span>
              <a-radio-group name="radioGroup" :default-value="1">
                <a-radio :value="1">
                  按油枪号
                </a-radio>
                <a-radio :value="2">
                 按油品
                </a-radio>
               
              </a-radio-group> -->
            </a-col>
            <a-col :span="6" style="text-align:right;padding-right:10px;">
              <span style="margin-right:10px">油枪</span>
              <a-switch default-checked />
            </a-col>
          </a-row>
          <a-row class="list-wrap" type="flex" justify="space-between">
            <a-col :span="6">
              <span class="label-left">油枪列表共「<span style="font-weight:bold;color:#7c7ee2">{{youqiangList.length}}</span>」支油枪</span>
            </a-col>
            <a-col :span="18" style="text-align:right;padding-right:10px;">
              <a-button v-if="showBtns" type="primary" style="margin-right:12px" @click="addyq">
                新增
              </a-button>
              <a-button v-if="showBtns" type="primary" @click="allCheck">
                批量操作
              </a-button>
              <a-button v-if="!showBtns" :disabled="unLength" style="margin-right:12px">编辑</a-button>
              <a-button v-if="!showBtns" style="margin-right:12px" @click="allDel">删除</a-button>
              <a-button v-if="!showBtns" style="margin-right:12px">使用零管</a-button>
              <a-button v-if="!showBtns" style="margin-right:12px">禁用零管</a-button>
              <a-button v-if="!showBtns" style="margin-right:12px" @click="allChecked">全选</a-button>
              <a-button v-if="!showBtns" @click="allUse">完成</a-button>
            </a-col>
          </a-row>
          <div class="line"></div>

          <div  class="gunList-wrap">
          <div  class="gun-item" :key="item.id" v-for="item in youqiangList">
            <span  class="radio-icon" v-if="!showBtns">
               <a-checkbox v-model="item.sel" @change="checkItemchange">
             
            </a-checkbox>
              </span>
              <span  class="item-name">{{item.gun_name}}</span>
              <span  class="item-type">{{item.oils_name}}</span>
              <!-- <span :class="{ 'mark-icon-down': item.check, 'mark-icon-open': !item.check }"  class="mark-icon"></span>
              <span  class="mark-icon-tip">零管</span> -->
          </div>
         
          </div>
        </a-tab-pane>
        <!-- <a-tab-pane key="3" tab="加油机协议">
         <div>
            <span class="proto-item">91动力</span>
            <span class="proto-item" style="margin:0 10px">FCC</span>
            <span class="proto-item">其他厂商</span>
         </div>
         <a-row style="margin-bottom:12px" type="flex" justify="end">
        
          <a-col :span="4" style="text-align:right">
              <a-button type="primary">
                新增协议
              </a-button>
          </a-col>
        </a-row>
          <s-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data="loadData"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="delTag(record)">撤回</a>
              </template>
            </span>
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="4" tab="终端设置">
            <div   class="terminal-content">
              <div  class="tip">填写时请仔细核对油枪顺序，方便维护管理</div>
              <div  class="terminal-box"><div  class="terminal-block">
                <div  class="terminal-info"><div  class="terminal-info-item">
                <div  class="label">终端编码</div>
                <div  class="code">01</div>
                </div><div  class="terminal-info-item">
                  <div  class="label">协议类型</div>
                  <div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 160px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="76dc3c1f-a164-4ba6-8b53-a4cb30c5c41b" class="ant-select-selection ant-select-selection--single">
                    <div class="ant-select-selection__rendered">
                    <div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div></div><span unselectable="on" class="ant-select-arrow" style="user-select: none;">
                      <i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon">
                      <svg  data-icon="down"   ><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                      </svg></i></span></div></div></div><div  class="terminal-info-item"><div  class="label">链接方式</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 160px;">
                      <div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="5bec0136-626a-4a0b-aac1-16e3381f1cd7" class="ant-select-selection ant-select-selection--single">
                        <div class="ant-select-selection__rendered">
                        <div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div></div><span unselectable="on" class="ant-select-arrow" style="user-select: none;">
                        <i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg  data-icon="down"   ><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                      </svg></i></span></div></div>
                      </div><div  class="terminal-info-item">
                        <div  class="label">链接信息</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 160px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="27d1e3cf-8401-45be-8314-37536d8409e1" class="ant-select-selection ant-select-selection--single"><div class="ant-select-selection__rendered">
                        <div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div></div><span unselectable="on" class="ant-select-arrow" style="user-select: none;"><i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg  data-icon="down"   ><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div></div></div></div><div  class="terminal-oils public_global_scroll"><div  class="terminal-oil-box"><div  class="terminal-oil-item">
                          <div  class="oil-gun-num oil-option"><div  class="label">枪号</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 100px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="c6852c93-3658-4edc-9122-74ed150b2035" class="ant-select-selection ant-select-selection--single">
                          <div class="ant-select-selection__rendered"><div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div>
                        </div><span unselectable="on" class="ant-select-arrow" style="user-select: none;">
                          <i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg  data-icon="down"   ><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div></div></div><div  class="oil-side-num oil-option">
                            <div  class="label">内面号</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 100px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="20662312-8377-489a-8036-72658284c070" class="ant-select-selection ant-select-selection--single"><div class="ant-select-selection__rendered"><div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div>
                          </div><span unselectable="on" class="ant-select-arrow" style="user-select: none;">
                            <i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg  data-icon="down"   >
                            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
                            </path></svg></i></span></div></div>
                          </div><div  class="oil-sort-num oil-option"><div  class="label">顺序号</div><div  tabindex="0" class="ant-select ant-select-enabled ant-select-lg" style="width: 100px;"><div role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-controls="f7b32eee-f3ed-47a1-9025-762186008ad5" class="ant-select-selection ant-select-selection--single"><div class="ant-select-selection__rendered"><div unselectable="on" class="ant-select-selection__placeholder" style="display: block; user-select: none;">请选择</div></div><span unselectable="on" class="ant-select-arrow" style="user-select: none;"><i aria-label="图标: down" class="anticon anticon-down ant-select-arrow-icon"><svg  data-icon="down"   ><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></i></span></div></div></div></div></div><div  class="tips" style="display: none;"></div><div  class="terminal-oil-add"><i  aria-label="图标: plus" class="anticon anticon-plus"><svg  data-icon="plus"   ><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg></i>&nbsp;继续添加</div>
                          </div></div><div  class="del-btn sleep" style="display: none;">删除</div></div><div  class="add-terminal">
                            <i  aria-label="图标: plus" class="anticon anticon-plus"><svg  data-icon="plus"   ><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg></i>&nbsp;新增终端</div>
                            <div  class="save-terminal">
                               <a-button type="primary">
                                保存
                              </a-button>
                             </div></div>
        </a-tab-pane> -->
      </a-tabs>

    </a-layout-content>

  </a-layout>
</template>

<script>
import api from '../../../api/set.js'
import { STable } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'
import { TreeSelect } from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
export default {
  name: 'business',
  components: {
    STable
  },
  data () {
    return {
      opArr:[],
      showBtns:true,
      yqArr:[],
      yqForm:{
        "oils_id":"",//油品id
        "gun_status":"",//状态 1：启用，2：禁用
        "zero_type":"",//零管系统 1：启用，2：禁用
        "gun_grouping":"",//加油枪分组id
        "gunList":[
          {
            gun_name:''
          }
        ]
      },
      orilList:[],
      oilArr:[],
      treeData:  [
        {
          title: '国V',
          value: '1-1',
          key: '1',
          children: [],
        },
        {
          title: '国VI',
          value: '2-2',
          key: '2',
          children: [],
        },
        {
          title: '京VI',
          value: '3-3',
          key: '3',
          children:  [],
        },
        {
          title: '尿素',
          value: '4-4',
          key: '4',
          children: [],
        },
        {
          title: '天然气',
          value: '5-5',
          key: '5',
          children: [],
        }
      ],
      SHOW_PARENT,
      formItemLayout:{
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      showTab:true,
      nowKey:'1',
      oils_start_time:'',
      pagination:{ 
        pageSize: 10,
        total:0,
        current:1
      },
      youqiangList:[],
      setSiteoillistData:[],
      setSiteTotal:0,
      oils:[],
      columns:[
        {
          dataIndex: 'oils_name',
          title: '油品',
          key: 'oils_name'
        },
         {
          dataIndex: 'oils_money',
          title: '挂牌价',
          key: 'oils_money'
        },
        {
          dataIndex: 'oils_start_time',
          title: '生效时间',
          key: 'oils_start_time'
        },
        {
          dataIndex: 'oils_status',
          title: '状态',
          key: 'oils_status',
          scopedSlots: { customRender: 'oils_status' }
        },
        {
          dataIndex: 'user_name',
          title: '操作员',
          key: 'user_name'
        },
         {
          dataIndex: '操作',
          title: '操作',
          key: '操作'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        
         return getServiceList(Object.assign(parameter, this.queryParam))
        .then(res => {
           return res.result
         })
      },
      selectedRowKeys: [],
      selectedRows: [],
      // custom table alert & rowSelection
      options: {
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    this.setSiteoillist()
    this.setOillist()
    
  },
  computed:{
    
    unLength(){
      
      return this.opArr.length>1?true:false
    }
  },
  methods: {
    checkItemchange(){
       this.opArr=this.youqiangList.filter(item=>{
        return item.sel
      }).map(item=>{
        
        return item.id
      })
    },
    allChecked(){
      let cyouqiangList=this.youqiangList.filter(item=>{
        
        return item.sel
      })
      if(cyouqiangList.length==this.youqiangList.length){
         this.youqiangList=this.youqiangList.map(item=>{
          item.sel=false
          return item
        })
      }else{
        this.youqiangList=this.youqiangList.map(item=>{
          item.sel=true
          return item
        })
      }
     
     this.opArr=this.youqiangList.filter(item=>{
        return item.sel
      }).map(item=>{
        
        return item.id
      })
    },
    allDel(){
      let that=this
      this.opArr=that.youqiangList.filter(item=>{
        return item.sel
      }).map(item=>{
        
        return item.id
      })
      if(this.opArr.length>0){
         this.$confirm({
          title: '操作提示',
          content: "是否确认删除所选油枪?",
          onOk() {
           
            api.setGundel({ids:that.opArr})
              .then(res => {
              if(res.code==200){
               that.seTgunlist()
              }
              
            })
          },
          onCancel() {
            
          }
        });
      }
    },

    cancelYq(){
      this.showTab=true
      this.yqForm={
        "oils_id":"",//油品id
        "gun_status":"",//状态 1：启用，2：禁用
        "zero_type":"",//零管系统 1：启用，2：禁用
        "gun_grouping":"",//加油枪分组id
        "gunList":[
          {
            gun_name:''
          }
        ]
      }
    },
    subYq(){
      
      let that=this
     
       api.orderAddGun_Oils_list(that.yqForm)
        .then(res => {
         if(res.code==200){
           that.showTab=true
           that.seTgunlist()
           that.yqForm={
            "oils_id":"",//油品id
            "gun_status":"",//状态 1：启用，2：禁用
            "zero_type":"",//零管系统 1：启用，2：禁用
            "gun_grouping":"",//加油枪分组id
            "gunList":[
              {
                gun_name:''
              }
            ]
          }
         }
         
      })
    },
    delMinus(item,index){
      this.yqForm.gunList.splice(index,1);
      if(this.yqForm.gunList.length==0){
        this.yqForm.gunList.push({
          gun_name:''
        })
      }
    },
    addPlus(){
      this.yqForm.gunList.push({
        gun_name:''
      })
    },
    addyq(){
      this.showTab=false
      this.orderAddOil_gun_sort()
    },
    orderAddOil_gun_sort(){
      let that=this
       api.orderAddOil_gun_sort({"operating_type":"4"})
        .then(res => {
          console.log(res.data)
         that.yqArr=res.data
      })
    },
    yqChange(val){
      console.log(val)
    },
    
    addNewOil(){
      
     
      if(!this.oils_start_time){
        this.$message.warning('请选择时间');
      }
      let data=this.oils.filter(item=>{
        return item.money==''
      })
      if(data.length>0||this.oils.length==0){
        this.$message.warning('金额不能为空');
      }
       let obj={
          "oils_start_time":this.oils_start_time ,
          "oils": this.oils.map(item=>{
            delete item.title
            return item
          })
      }
     
       let that=this
        api.setSiteoilsave(obj)
        .then(res => {
          that.oilArr=[]
          that.showTab=true
         that.oils_start_time=''
         that.oils=[]
         that.setSiteoillist()
      })
      
    },
    delOil(val){
     
       this.oilArr=this.oilArr.filter(item=>{
       
        return item!==val.oils_id
      })
      this.oils=this.oils.filter(item=>{
       
        return item.oils_id!==val.oils_id
      })
    },

    oilSelChange(val){
       this.oils=[]

      for(let k=0;k<val.length;k++){
      
        switch(val[k]){
          case '1-1':
              
            for(let i=0;i<this.orilList.length;i++){
             
               if(this.orilList[i].sort==1){
                
                 this.oils.push({
                    title:this.orilList[i].sort_name,
                    "oils_id": this.orilList[i].id,
                    "oils_name": this.orilList[i].name,
                    "oils_money": ""
                })
               }
            }
            break;
             case '2-2':
                for(let i=0;i<this.orilList.length;i++){
               if(this.orilList[i].sort===2){
                 this.oils.push({
                    title:this.orilList[i].sort_name,
                    "oils_id": this.orilList[i].id,
                    "oils_name": this.orilList[i].name,
                    "oils_money": ""
                })
               }
            }
            break;
             case '3-3':
                for(let i=0;i<this.orilList.length;i++){
               if(this.orilList[i].sort===3){
                 this.oils.push({
                    title:this.orilList[i].sort_name,
                    "oils_id": this.orilList[i].id,
                    "oils_name": this.orilList[i].name,
                    "oils_money": ""
                })
               }
            }
            break;
             case '4-4':
                for(let i=0;i<this.orilList.length;i++){
               if(this.orilList[i].sort===4){
                 this.oils.push({
                    title:this.orilList[i].sort_name,
                    "oils_id": this.orilList[i].id,
                    "oils_name": this.orilList[i].name,
                    "oils_money": ""
                })
               }
            }
            break;
             case '5-5':
                for(let i=0;i<this.orilList.length;i++){
               if(this.orilList[i].sort===5){
                 this.oils.push({
                    title:this.orilList[i].sort_name,
                    "oils_id": this.orilList[i].id,
                    "oils_name": this.orilList[i].name,
                    "oils_money": ""
                })
               }
            }
            break;
            default:
               for(let j=0;j<this.orilList.length;j++){
                 
                if(val[k]==this.orilList[j].id){
                  this.oils.push({
                    title:this.orilList[j].sort_name,
                    "oils_id": val[k],
                    "oils_name": this.orilList[j].name,
                    "oils_money": ""
                })
                }  
        }
              break;
        }
       
      }
      
    },
    tabChange(val){
      this.showTab=true
      this.nowKey=val
      this.pagination={ 
        pageSize: 10,
        total:0,
        current:1
      }
      switch(val){
        case '1':
          this.setSiteoillist()
        break;
        case '2':
          this.seTgunlist()
        break;
        case '3':
          console.log(val)
        break;
        case '4':
          console.log(val)
        break;
      }
      
    },
    tableChange(val){
      this.pagination=val

      switch(this.nowKey){
        case '1':
          this.setSiteoillist()
        break;
        case '2':
          console.log(val)
        break;
        case '3':
          console.log(val)
        break;
        case '4':
          console.log(val)
        break;
      }
    },
    setOillist(){
     
       let that=this
        return  api.setOillist()
          .then(res => {
           let data=res.data.data
           that.orilList=data
           for(let i=0;i<data.length;i++){
             for(let j=0;j<that.treeData.length;j++){
               if(data[i].sort_name===that.treeData[j].title){
                 that.treeData[j].children.push({
                   title: data[i].name,
                    value:data[i].id,
                    key: data[i].id
                 })
               }
             }
           }
        })
    },
    allUse(){
      this.showBtns=true
      this.opArr=[]
       this.youqiangList=this.youqiangList.map(item=>{
           item.check=false;
           item.sel=false
           return item
         })
    },
    allCheck(){
      this.showBtns=false
       this.youqiangList=this.youqiangList.map(item=>{
           item.check=true;
           return item
         })
    },
    seTgunlist(){
       let that=this
        api.seTgunlist(that.pagination)
        .then(res => {
         that.youqiangList=res.data.data.map(item=>{
           item.check=false;
           item.sel=false
           return item
         })
      })
    },
    setSiteoillist(){
     
      let that=this;
      that.pagination.oils_status=1;
      console.log(that.pagination);
      api.setSiteoillist(that.pagination)
        .then(res => {
         
          that.setSiteoillistData=res.data.data
         
      })
    },
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
main .gun-item .mark-icon-down {
    border-top: 40px solid #cad5e9;
}

main .gun-item .mark-icon {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 40px solid transparent;
}
.flex25 .ipt-wrap{
  flex:1;
}
.flex25 .ipt-wrap{
  flex:1;
}
.flex25 .add-btn{
  margin:0 7px;
}
.flex25{
  width:100%;
  flex-wrap: wrap;
  display:flex;
  align-items: center;
}
.flex25 .item-wrap{
  width:25%;
  box-sizing: border-box;
  padding:0 10px;
  display:flex;

}
  .save-terminal{
    padding-left:313px;
  }
.terminal-box .terminal-block .terminal-oils .terminal-oil-box .terminal-oil-item .label {
    margin-right: 16px;
}
.terminal-box .terminal-block .terminal-oils .terminal-oil-box .terminal-oil-item .oil-option {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.terminal-box .terminal-block .terminal-oils .terminal-oil-box .terminal-oil-item {
    height: 56px;
    background-color: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.terminal-box .terminal-block .terminal-oils .terminal-oil-add {
    height: 56px;
    line-height: 56px;
    padding-left: 25px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
}
.terminal-box .terminal-block .terminal-oils .terminal-oil-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 8px;
}
.terminal-box .terminal-block .terminal-oils {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 24px 22px;
    overflow-y: scroll;
}
.terminal-box .terminal-block .terminal-info .terminal-info-item .label{
    margin-right: 16px;
}
.terminal-box .terminal-block .terminal-info .terminal-info-item{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.terminal-box .terminal-block .terminal-oils {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 24px 22px;
    overflow-y: scroll;
}
.terminal-box .terminal-block .terminal-info {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 313px;
    padding: 20px 40px;
    background-color: #fafafa;
    border-right: 1px solid hsla(0,0%,87.8%,.5);
}
.terminal-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 278px;
    margin-bottom: 16px;
}
.ant-input-number{
  width:120px;
}
.terminal-box .terminal-block {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-right: 16px;
    border: 1px solid hsla(0,0%,87.8%,.5);
}
.terminal-content .tip, .vendor-hubs {
  margin-bottom: 16px;
}
.terminal-content {
    padding: 0 16px;
}
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.invoice-card-box{
  position: relative;
  height: 128px;
  width: 242px;
  display: inline-block;
  text-align: center;
  margin-right: 20px;
  margin-bottom: 16px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
  .box-title{
    position: absolute;
    top: 30px;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    color: #3c3c46;
  }
  .box-content{
    position: absolute;
    top: 63px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    .value{
      font-size: 34px;
      line-height: 34px;
      color: #040a46;
    }
    .unit {
      font-size: 12px;
      color: #040a46;
      margin-left: 5px;
      transform: translateY(-1px);
    }
  }
}
.customer-statistics{
  margin-top: 30px;
  width: 102%;
  .invoice-card-box{
    height: 108px;
    width: 271px;
    box-shadow: none;
    border: 1px solid #eaeaf4;
    .box-title{
      text-align: left;
      top: 24px;
      left: 24px;
    }
    .box-content{
      top: 49px;
      left: 24px;
      text-align: left;
      justify-content: start;
      .value{
        color: #7C7EE2;
      }
    }
  }
}
.filterContentContainer{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .screen{
    font-size: 12px;
    line-height: 22px;
    min-height: 40px;
    display: flex;
    align-items: center;
    .screen-li {
      display: inline-block;
      width: 48px;
      height: 24px;
      line-height: 24px;
      margin-right: 20px;
      text-align: center;
      color: #040a46;
      font-size: 12px;
      cursor: pointer;
      &.active{
        background-color: #ecf3ff;
        border-radius: 3px;
        color: #3c85ff;
      }
    }
  }
}
.showDataForTable{
  position: relative;
  display: block;
  width: 100%;
  padding-bottom: 60px;
  margin-top: 20px;
}

.current-exprot{
  border-color: #81a8f7;
  color: #81a8f7;
  margin-left: 15px;
}
.label-left{
  width:100px;
  text-align: right;
  margin-right:20px;
}
.list-wrap{
  margin:30px 0;
}
.line{
  height:1px;
  background:#ccc;
}
main .gunList-wrap {
  margin-top: 10px;
  display: grid;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: repeat(auto-fill,128px);
}
main .gun-item {
    min-width: 128px;
    height: 70px;
    border: 1px solid #eaeaf4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    padding: 10px 0;
    text-align: center;
}
main .gun-item .radio-icon {
    position: absolute;
    width: 16px;
    height: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    top: 5px;
    left: 5px;
    border: 1px solid #ddd;
    border-radius: 2px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
main .gun-item .radio-icon .anticon svg {
    width: 8px;
    height: 8px;
}
main .gun-item .item-name{
    font-size: 20px;
}
main .gun-item span {
    display: block;
    margin: 0;
}
main .gun-item .item-type {
    font-size: 12px;
    color: #3c3c46;
}
main .gun-item span {
  display: block;
  margin: 0;
}
main .gun-item .mark-icon-open {
  border-top: 40px solid #ff8240;
}
main .gun-item .mark-icon {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 40px solid transparent;
}
main .gun-item span {
    display: block;
    margin: 0;
}
main .gun-item .mark-icon-tip {
    position: absolute;
    top: 4px;
    right: 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #fff;
    line-height: 17px;
}

 header .page-title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eaeaf4;
    height: 60px;
    margin-bottom:32px;
  }
  header .page-title span {
    color: #1e1e28;
    font-size: 16px;
    font-weight: 700;
  }
</style>

