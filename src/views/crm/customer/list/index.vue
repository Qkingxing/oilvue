
<template>
  <div>
    <a-layout v-if="$route.name=='Clist'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <div class="client-tab-btns">
          <a-radio-group v-model="radioValue" @change="onChangeType">
            <a-radio-button value="old"> 已有客户 </a-radio-button>
            <a-radio-button value="new"> 新增客户 </a-radio-button>
          </a-radio-group>
        </div>
        <div class="screen-box" v-if="radioValue=='old'">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :sm="24" :md="12">
                <a-form-item label="客户搜索" :colon="false" class="screen-item">
                  <!-- <a-input v-model="oldqueryParam.keywords" placeholder="请输入搜索内容" /> -->
                  <a-input
                    style="width: 100%"
                    v-model="oldqueryParam.searchNumber"
                    placeholder="请输入搜索内容"
                  >
                    <a-select
                      slot="addonBefore"
                      style="width: 120px"
                      v-model="oldqueryParam.numberType"
                    >
                      <a-select-option value="sonnumber"> 客户子单编号 </a-select-option>
                      <a-select-option value="mobile"> 手机号 </a-select-option>
                    </a-select>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item label="是否消费" :colon="false" class="screen-item">
                  <a-select v-model="oldqueryParam.is_consumption" style="width: 264px">
                    <a-select-option 
                      :value="item.value"
                      v-for="(item,index) in consumptionOptions"
                      :key="index">
                      {{item.label}}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :md="12" :sm="24">
                <a-form-item label="偏好油站" :colon="false" class="screen-item">
                  <a-select v-model="oldqueryParam.love_site_id" style="width: 264px">
                    <a-select-option
                      :value="item.id"
                      v-for="(item,index) in loveSiteSelect"
                      :key="index">
                      {{item.site_name}}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item label="偏好油品" :colon="false" class="screen-item">
                  <a-select v-model="oldqueryParam.oil_id" style="width: 264px">
                    <a-select-option
                      :value="item.id"
                      v-for="(item,index) in oilSelect"
                      :key="index">
                      {{item.oils_name}}
                    </a-select-option>
                    
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :md="12" :sm="24">
                <a-form-item label="会员等级" :colon="false" class="screen-item">
                  <a-select v-model="oldqueryParam.spalevel_id" style="width: 264px">
                    <a-select-option
                      :value="item.id"
                      v-for="(item,index) in levelSelect"
                      :key="index">
                      {{item.level_name}}
                    </a-select-option>
                    
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item label="客户身份" :colon="false" class="screen-item">
                  <a-select v-model="oldqueryParam.identity_id" style="width: 264px">
                    <a-select-option
                      :value="item.value"
                      v-for="(item,index) in identitySelect"
                      :key="index">
                      {{item.label}}
                    </a-select-option>
                    
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :md="12" :sm="24">
                <a-form-item label="最近加油时间" :colon="false" class="screen-item">
                  <a-range-picker @change="onChangeTime"/>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item
                  label="加油升数"
                  :colon="false"
                  class="screen-item">
                  <a-input-group compact >
                    <a-input-number 
                      v-model="oldqueryParam.l_number1" 
                      style="width:88px;" 
                      placeholder="数字"/>
                    <span style="margin: 0px 8px;line-height:32px;">至</span>
                    <a-input-number
                      v-model="oldqueryParam.l_number2"
                      style="width:88px;"
                      placeholder="数字" />
                    <span style="margin: 0px 8px;line-height:32px;">升</span>
                  </a-input-group>
                </a-form-item>
              </a-col>

              <a-col :md="12" :sm="24">
                <a-form-item label="加油次数" :colon="false" class="screen-item">
                  <a-input-group compact>
                    <a-input v-model="oldqueryParam.l_count1" style="width:88px;" placeholder="数字"/>
                    <span style="margin: 0px 8px;line-height:32px;">至</span>
                    <a-input v-model="oldqueryParam.l_count2" style="width:88px;" placeholder="数字"/>
                    <span style="margin: 0px 8px;line-height:32px;">次</span>
                  </a-input-group>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item label="现有积分" :colon="false" class="screen-item">
                  <a-input-group compact>
                    <a-input v-model="oldqueryParam.integral1" style="width:88px;" placeholder="数字"/>
                    <span style="margin: 0px 8px;line-height:32px;">至</span>
                    <a-input v-model="oldqueryParam.integral2" style="width:88px;" placeholder="数字"/>
                    <span style="margin: 0px 8px;line-height:32px;">分</span>
                  </a-input-group>
                </a-form-item>
              </a-col>

              <a-col :md="12" :sm="24">
                <a-form-item label="加油卡余额" :colon="false" class="screen-item">
                  <a-input-group compact>
                    <a-input v-model="oldqueryParam.money1" style="width:88px;" placeholder="数字"/>
                    <span style="margin: 0px 8px;line-height:32px;">至</span>
                    <a-input v-model="oldqueryParam.money2" style="width:88px;" placeholder="数字"/>
                    <span style="margin: 0px 8px;line-height:32px;">元</span>
                  </a-input-group>
                </a-form-item>
              </a-col>

              <a-col :md="24" :sm="24">
                <a-form-item>
                  <a-button type="primary" class="search-btn" style="min-width:82px;" @click="$refs.table.refresh()"> 搜索 </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="screen-box" v-else>
          <a-form layout="inline" >
            <a-row :gutter="48">
              <a-col :md="24" :sm="24">
                <a-form-item label="客户搜索" :colon="false" class="screen-item">
                  <!-- <a-input v-model="queryParam.keywords" placeholder="请输入搜索内容" /> -->
                  <a-input
                    style="width: 100%"
                    v-model="queryParam.searchNumber"
                    placeholder="请输入搜索内容"
                  >
                    <a-select
                      slot="addonBefore"
                      style="width: 120px"
                      v-model="queryParam.numberType"
                    >
                      <a-select-option value="sonnumber"> 客户子单编号 </a-select-option>
                      <a-select-option value="mobile"> 手机号 </a-select-option>
                    </a-select>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item>
                  <a-button type="primary" class="search-btn" style="min-width:82px;" @click="$refs.table2.refresh()"> 搜索 </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格 -->
        <div class="showDataForTable" v-if="radioValue==='old'">
          <div class="showSearchAndTotal">
            <span class="title">
              客户列表
              <span class="dec">
                符合当前条件客户共「
                <span class="themeColor">
                  {{oldTotal}}
                </span>
                」位
                <!-- <span class="themeColor select-all">选择全部</span> -->
              </span>
            </span>
            <div>
              <a-button :disabled="!oldselectedRowKeys.length">发优惠券</a-button>
              
              <a-button 
                v-if="oldselectedRowKeys.length>0&&userInfo.site_id!=-1" 
                style="margin-left: 8px;">加标签</a-button>

              <a-button style="margin-left: 8px;">导出报表</a-button>
              <a-button style="margin-left: 8px;" icon="setting" @click="openColSetting"/>
            </div>
          </div>
          <s-table
            ref="table"
            size="default"
            rowKey="id"
            :columns="oldcolumns"
            :data="oldloadData"
            :rowSelection="{ selectedRowKeys: oldselectedRowKeys, onChange: oldonSelectChange }"
          >
            <span slot="id" slot-scope="text, record">
              <template>
                <router-link
                  v-if="text" 
                  :to="{
                    path:'/crm/customer/list/detail',
                    query:{
                      id: record.id
                    }
                  }">
                  {{text}}
                </router-link>
                <span v-else>-</span>
              </template>
            </span>
            <span slot="sonnumber" slot-scope="text, record">
              <template>
                <router-link 
                  v-if="text"
                  :to="{
                    path:'/crm/customer/list/detail',
                    query:{
                      id: record.id
                    }
                  }">
                  {{text}}
                </router-link>
                <span v-else>-</span>
              </template>
            </span>
          </s-table>
        </div>

        <div class="showDataForTable" v-else>
          <div class="showSearchAndTotal">
            <span class="title">
              客户列表
              <span class="dec">
                符合当前条件客户共「
                <span class="themeColor">
                  {{newTotal}}
                </span>
                」位
                <!-- <span class="themeColor select-all" @click="showEditTag('all')">
                  选择全部
                </span> -->
              </span>
            </span>
            <div>
              <a-button :disabled="!selectedRowKeys.length">发优惠券</a-button>

              <a-button 
                v-if="selectedRowKeys.length>0&&userInfo.site_id!=-1" 
                style="margin-left: 8px;">加标签</a-button>

              <a-button style="margin-left: 8px;">导出报表</a-button>
              <a-button style="margin-left: 8px;" icon="setting" v-if="radioValue=='old'"/>
            </div>
          </div>
          <s-table
            ref="table2"
            size="default"
            rowKey="id"
            :columns="columns"
            :data="loadData"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="showEditTag('edit',record)" v-if="radioValue=='old'">修改</a>
                <a-divider type="vertical" />
                <a @click="showEditTag('add',record)">加标签</a>
              </template>
            </span>
          </s-table>
        </div>
      </a-layout-content>
      <EditTag ref="EditTag"></EditTag>
    </a-layout>

    <ColumnsModal ref="ColumnsModal"></ColumnsModal>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { identitySelect } from '@/utils/enums'

import { getOldUserList, getSonoillist, getSonsitelist,getlevelAll,getNewUserList } from '@/api/crm'

import EditTag from '../components/EditTag'

export default {
  name: 'Clist',
  components: {
    STable,
    EditTag,
    ColumnsModal: ()=>import('./components/ColumnsModal')
  },
  data () {
    return {
      radioValue: 'new',
      oldqueryParam: {
        numberType: 'sonnumber', // 输入类型
        searchNumber: '', // 客户自编号或手机号
        is_consumption: 1,//是否已消费，1是0否 2全部
        love_site_id: '', // 偏好油站
        site_id: 0,//站点ID
        oil_id: '',// 偏好油品ID 0是全部
        level_id: '', // 会员等级
        spalevel_id: '',//动态会员等级 0是全部
        identity_id: 0,//客户身份 0是全部
        last_time1: '',//最近加油时间 （小）
        last_time2: '',//最近加油时间 （大）
        l_number1: null,//加油升数（小）
        l_number2: null,//加油升数（大）
        l_count1: null,//加油次数（小）
        l_count2: null,//加油次数(大)
        integral1: null,//积分（小）
        integral2: null,//积分（大）
        money1: null,//加油卡余额（小）
        money2: null,//加油卡余额（大）
      },
      loveSiteSelect:[],// 偏好油站下拉
      oilSelect:[],// 偏好油品下拉
      levelSelect:[],// 会员等级下拉
      identitySelect,
      // 客户身份下拉,
      // 会员等级下拉
      consumptionOptions: [
        { label: '全部', value: 2 },
        { label: '已消费', value: 1 },
        { label: '未消费', value: 0 }
      ],
      // 表头
      oldcolumns: [
        {
          title: '客户编号',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '客户子编号',
          dataIndex: 'sonnumber',
          scopedSlots: { customRender: 'sonnumber' }
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
        },
        {
          title: '偏好油站',
          dataIndex: 'name',
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
        },
        {
          title: '是否消费油品',
          dataIndex: 'is_consumption',
        },
        {
          title: '加油升数',
          dataIndex: 'l_number',
        },
        {
          title: '加油次数',
          dataIndex: 'l_count',
        },
        // {
        //   title: '最近加油时间',
        //   dataIndex: 'last_time',
        // },
        // {
        //   title: '偏好油品',
        //   dataIndex: 'name',
        // },
        // {
        //   title: '会员等级',
        //   dataIndex: 'level_id',
        // },
        // {
        //   title: '现有积分',
        //   dataIndex: 'integral',
        // },
        // {
        //   title: '加油卡余额',
        //   dataIndex: 'money',
        // },
        // {
        //   title: '客户身份',
        //   dataIndex: 'type',
        // },
        // {
        //   title: '车牌号',
        //   dataIndex: 'plate_number',
        // },
        // {
        //   title: '近30天消费金额',
        //   dataIndex: 'plate_number',
        // },
        // {
        //   title: '近60天消费金额',
        //   dataIndex: 'plate_number',
        // },
        // {
        //   title: '近30天消费升数',
        //   dataIndex: 'plate_number',
        // },
        // {
        //   title: '近60天消费升数',
        //   dataIndex: 'plate_number',
        // },
        // {
        //   title: '近30天消费次数',
        //   dataIndex: 'plate_number',
        // },
        // {
        //   title: '近60天消费次数',
        //   dataIndex: 'plate_number',
        // },
        // {
        //   title: '注册时间',
        //   dataIndex: 'plate_number',
        // },

      ],
      oldTotal: 0,
      // 加载数据方法 必须为 Promise 对象
      oldloadData: parameter => {
        // console.log('loadData.parameter', parameter)
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          group_id: this.userInfo.group_id, // 集团id
          is_consumption: this.oldqueryParam.is_consumption,
          oil_id: this.oldqueryParam.oil_id,
          spalevel_id: this.oldqueryParam.spalevel_id,
          identity_id: this.oldqueryParam.identity_id,
          last_time1: this.oldqueryParam.last_time1,
          last_time2: this.oldqueryParam.last_time2,
          l_number1: this.oldqueryParam.l_number1,
          l_number2: this.oldqueryParam.l_number2,
          l_count1: this.oldqueryParam.l_count1,
          l_count2: this.oldqueryParam.l_count2,
          integral1: this.oldqueryParam.integral1,
          integral2: this.oldqueryParam.integral2,
          money1: this.oldqueryParam.money1,
          money2: this.oldqueryParam.money2,

        }
        // 站点查询
        if (this.userInfo.site_id!==(-1)) {
          params.site_id = this.userInfo.site_id
        }else{
          // 集团查询
          params.love_site_id = this.oldqueryParam.love_site_id
        }
        params[this.oldqueryParam.numberType] = this.oldqueryParam.searchNumber
        console.log(this.oldqueryParam)
        // console.log(params)
        return getOldUserList(Object.assign(params))
        .then((res)=>{
          // 自定义出参
          // console.log(res.data.list)
          this.oldTotal = res.data.totalCount
          return {
            data: res.data.list, // 列表数组
            pageNo: res.data.pageNo,  // 当前页码
            pageSize: res.data.pageSize,  // 每页页数
            totalCount: res.data.totalCount, // 列表总条数
            totalPage: res.data.totalPage // 列表总页数
          }
        })

      },
      oldselectedRowKeys: [],
      oldselectedRows: [],

      // custom table alert & rowSelection
      oldoptions: {
        rowSelection: {
          selectedRowKeys: this.oldselectedRowKeys,
          onChange: this.oldonSelectChange
        }
      },
      oldoptionAlertShow: false,
      // 查询参数
      queryParam: {
        numberType: 'sonnumber',
        searchNumber: '',
      },
      // 表头
      columns: [
        {
          title: '客户子编号',
          dataIndex: 'no'
        },
        {
          title: '手机号',
          dataIndex: 'description'
        },
        {
          title: '消费次数',
          dataIndex: 'status',
        },
        {
          title: '会员等级',
          // dataIndex: 'status',
        },
        {
          title: '现有积分',
          // dataIndex: 'status',
        },
        {
          title: '加油卡余额',
          // dataIndex: 'status',
        },
        {
          title: '标签',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      newTotal: 0,
      loadData: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
        }
        params[this.queryParam.numberType] = this.queryParam.searchNumber

        return getNewUserList(Object.assign(params))
        .then((res)=>{
          // 自定义出参
          // console.log(res)
          this.newTotal = res.data.total
          return {
            data: res.data.data, // 列表数组
            pageNo: res.data.current_page,  // 当前页码
            pageSize: res.data.per_page,  // 每页页数
            totalCount: res.data.total, // 列表总条数
            totalPage: res.data.total // 列表总页数
          }
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
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    // console.log(this.$route.name)
    this.tableOption()
    this.oldtableOption()
    // 会员等级下拉
    getlevelAll().then(res=>{
      // console.log(res.data)
      this.levelSelect = res.data
    })
    // 偏好油站下拉
    getSonoillist().then(res=>{
      // console.log(res.data)
      this.oilSelect = res.data
    })
    // 偏好油站下拉
    getSonsitelist().then(res=>{
      // console.log(res.data)
      this.loveSiteSelect = res.data
    })

  },
  mounted(){
    
  },
  methods: {
    onChangeType(){
      // console.log(this.radioValue)
      if (this.radioValue==='old') {
        this.$nextTick(()=>{
          this.$refs.table.refresh()
        })
      }else{
        this.$nextTick(()=>{
          this.$refs.table2.refresh()
        })
      }
    },
    // 最近加油时间变更
    onChangeTime(date, dateString){
      // console.log(date.length)
      // console.log(dateString)
      if (date.length===0) {
        this.oldqueryParam.last_time1 = ''
        this.oldqueryParam.last_time2 = ''
      }else{
        this.oldqueryParam.last_time1 = dateString[0]
        this.oldqueryParam.last_time2 = dateString[1]
      }
    },
    showEditTag (type) {
      this.$refs['EditTag'].show(type)
    },
    openColSetting(){
      this.$refs['ColumnsModal'].show()
    },
    oldtableOption () {
      if (!this.oldoptionAlertShow) {
        this.oldoptions = {
          rowSelection: {
            selectedRowKeys: this.oldselectedRowKeys,
            onChange: this.oldonSelectChange
          }
        }
        this.oldoptionAlertShow = true
      } else {
        this.oldoptions = {
          rowSelection: null
        }
        this.oldoptionAlertShow = false
      }
    },
    oldonSelectChange (selectedRowKeys, selectedRows) {
      // console.log(selectedRowKeys)
      // console.log(selectedRows)
      this.oldselectedRowKeys = selectedRowKeys
      this.oldselectedRows = selectedRows
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
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log()
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less" scoped>
.client-tab-btns{
  font-size: 14px;
}
.screen-box{
  padding: 27px 0 24px 0;
  .screen-item{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
}
.search-btn{
  margin-left: 72px;
  margin-top: 8px;
}
.showDataForTable{
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal{
    height: 63px;
    text-align: center;
    border-top: 1px solid #eaeaf4;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    font-size: 16px;
    font-weight: 500;
    color: #040a46;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec{
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor{
  color: #3b85ff;
}
.select-all{
  margin-left: 16px;
  cursor: pointer;
}

</style>
