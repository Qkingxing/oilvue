<template>
  <a-layout>
    <a-layout-content
      v-if="pageType=='list'"
      v-loading="loading"
      :style="{
        padding: '0 24px 24px 24px',
        background: '#fff',
        minHeight: '280px',
        position: 'relative'
      }"
    >
      <div class="add-rule">
        <a-button type="primary" @click="addRule"> 新增会员规则 </a-button>
      </div>
      <div class="list">
        <div class="page-block" v-if="total===1">
          <div class="head-title">
            成长值设置
            <span class="rule-status">{{effectText(rule.effect).label}}</span>
          </div>
          <div class="page-content">
            <div class="growth-setting">
              <div class="setting-item">
                <div class="setting-title">生效时间</div>
                <div class="setting-content" v-if="rule.star_time">{{rule.star_time | moment}}</div>
                <div class="setting-content" v-else style="color: #7c7ee2;">待设置</div>
              </div>
              <div class="setting-item">
                <div class="setting-title">生效油站</div>
                <div class="setting-content">{{rule.group_id}}</div>
              </div>
              <div class="setting-item">
                <div class="setting-title">支付限制</div>
                <div class="setting-content">{{payListText(rule.zf_type)}}</div>
              </div>
              <div class="setting-item">
                <div class="setting-title">成长值累积门槛</div>
                <div class="setting-content">订单实付金额大于{{rule.threshold}}元时，才计算成长值</div>
              </div>
              <div class="setting-item">
                <div class="setting-title">成长值累积规则</div>
                <div class="setting-content">
                  <div style="line-height: 1em; padding-top: 16px;">
                    {{oilText(rule.rules_oils_id)}}
                    ，每消费1元获得{{rule.cumulative}}个成长值</div>
                </div>
              </div>
            </div>
            <div class="growth-level">
              <div class="level-title">会员规则设置</div>
              <div class="level-content">
                <a-table 
                  rowKey="id" 
                  size="default"
                  :pagination="false"
                  :columns="columns" 
                  :data-source="data">
                  <div slot="level" slot-scope="item">
                    <template>
                      Lv{{item}}
                    </template>
                  </div>
                  <div slot="level_icon" slot-scope="item" class="template-img">
                    <template>
                      <img :src="item">
                    </template>
                  </div>
                  <div slot="growth_start" slot-scope="item, row">
                    <template>
                      <span>{{row.growth_start}} - {{row.growth_end}}</span>
                    </template>
                  </div>
                  <div slot="oils_list" slot-scope="item, row" class="public_global_scroll" style="max-height: 10.2em; overflow: scroll;">
                    <template>
                      <div 
                        v-for="(item,index) in row.oils_list"
                        :key="index"
                        keepwidth="true" 
                        style="text-align: left; line-height: 2em;">
                        {{item.oils_name}} 每升优惠{{row.preferential}}元
                      </div>
                    </template>
                  </div>
                </a-table>
              </div>
            </div>
          </div>
          <div class="page-foot">
            <a-button v-if="rule.effect===1" @click="stop">立即停用</a-button>
            <a-button type="primary" v-if="rule.effect===2||rule.effect===3" @click="editRule(rule)">编辑</a-button>
            <a-button v-if="rule.effect===2||rule.effect===3" @click="delRule(rule.effect)">删除</a-button>
            <a-button v-if="rule.effect===3" @click="openModal">使用推荐</a-button>
          </div>
        </div>

        <a-tabs v-if="total===2" v-model="active" size="large">
          <a-tab-pane :key="1" tab="规则一">
            <div class="page-block">
              <div class="head-title">
                成长值设置
                <span class="rule-status">{{effectText(rule.effect).label}}</span>
              </div>
              <div class="page-content">
                <div class="growth-setting">
                  <div class="setting-item">
                    <div class="setting-title">生效时间</div>
                    <div class="setting-content" v-if="rule.star_time">{{rule.star_time | moment}}</div>
                    <div class="setting-content" v-else style="color: #7c7ee2;">待设置</div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-title">生效油站</div>
                    <div class="setting-content">{{rule.group_id}}</div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-title">支付限制</div>
                    <div class="setting-content">{{payListText(rule.zf_type)}}</div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-title">成长值累积门槛</div>
                    <div class="setting-content">订单实付金额大于{{rule.threshold}}元时，才计算成长值</div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-title">成长值累积规则</div>
                    <div class="setting-content">
                      <div style="line-height: 1em; padding-top: 16px;">
                        {{oilText(rule.rules_oils_id)}}
                        ，每消费1元获得{{rule.cumulative}}个成长值</div>
                    </div>
                  </div>
                </div>
                <div class="growth-level">
                  <div class="level-title">会员规则设置</div>
                  <div class="level-content">
                    <a-table 
                      ref="table" 
                      rowKey="id" 
                      size="default"
                      :pagination="false"
                      :columns="columns" 
                      :data-source="data">
                      <div slot="level" slot-scope="item">
                        <template>
                          Lv{{item}}
                        </template>
                      </div>
                      <div slot="level_icon" slot-scope="item" class="template-img">
                        <template>
                          <img :src="item">
                        </template>
                      </div>
                      <div slot="growth_start" slot-scope="item, row">
                        <template>
                          <span>{{row.growth_start}} - {{row.growth_end}}</span>
                        </template>
                      </div>
                      <div slot="oils_list" slot-scope="item, row" class="public_global_scroll" style="max-height: 10.2em; overflow: scroll;">
                        <template>
                          <div 
                            v-for="(item,index) in row.oils_list"
                            :key="index"
                            keepwidth="true" 
                            style="text-align: left; line-height: 2em;">
                            {{item.oils_name}} 每升优惠{{row.preferential}}元
                          </div>
                        </template>
                      </div>
                    </a-table>
                 
                  </div>
                </div>
              </div>
              <div class="page-foot">
                <a-button v-if="rule.effect===1" @click="stop">立即停用</a-button>
                <a-button type="primary" v-if="rule.effect===2||rule.effect===3" @click="editRule(rule)">编辑</a-button>
                <a-button v-if="rule.effect===2||rule.effect===3" @click="delRule(rule.effect)">删除</a-button>
                <a-button v-if="rule.effect===3" @click="openModal">使用推荐</a-button>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane :key="2" tab="规则二" v-if="rule2">
            <div class="page-block">
              <div class="head-title">
                成长值设置
                <span class="rule-status">{{effectText(rule2.effect).label}}</span>
              </div>
              <div class="page-content">
                <div class="growth-setting">
                  <div class="setting-item">
                    <div class="setting-title">生效时间</div>
                    <div class="setting-content" v-if="rule2.star_time">{{rule2.star_time | moment}}</div>
                    <div class="setting-content" v-else style="color: #7c7ee2;">待设置</div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-title">生效油站</div>
                    <div class="setting-content">{{rule2.group_id}}</div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-title">支付限制</div>
                    <div class="setting-content">{{payListText(rule2.zf_type)}}</div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-title">成长值累积门槛</div>
                    <div class="setting-content">订单实付金额大于{{rule2.threshold}}元时，才计算成长值</div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-title">成长值累积规则</div>
                    <div class="setting-content">
                      <div style="line-height: 1em; padding-top: 16px;">
                        {{oilText(rule2.rules_oils_id)}}
                        ，每消费1元获得{{rule2.cumulative}}个成长值</div>
                    </div>
                  </div>
                </div>
                <div class="growth-level">
                  <div class="level-title">会员规则设置</div>
                  <div class="level-content">
                    <a-table 
                      ref="table" 
                      rowKey="id" 
                      size="default"
                      :pagination="false"
                      :columns="columns" 
                      :data-source="data2">
                      <div slot="level" slot-scope="item">
                        <template>
                          Lv{{item}}
                        </template>
                      </div>
                      <div slot="level_icon" slot-scope="item" class="template-img">
                        <template>
                          <img :src="item">
                        </template>
                      </div>
                      <div slot="growth_start" slot-scope="item, row">
                        <template>
                          <span>{{row.growth_start}} - {{row.growth_end}}</span>
                        </template>
                      </div>
                      <div slot="oils_list" slot-scope="item, row" class="public_global_scroll" style="max-height: 10.2em; overflow: scroll;">
                        <template>
                          <div 
                            v-for="(item,index) in row.oils_list"
                            :key="index"
                            keepwidth="true" 
                            style="text-align: left; line-height: 2em;">
                            {{item.oils_name}} 每升优惠{{row.preferential}}元
                          </div>
                        </template>
                      </div>
                    </a-table>
                  </div>
                </div>
              </div>
              <div class="page-foot">
                <a-button v-if="rule2.effect===1" @click="stop">立即停用</a-button>
                <a-button type="primary" v-if="rule2.effect===2||rule2.effect===3" @click="editRule(rule2)">编辑</a-button>
                <a-button v-if="rule2.effect===2||rule2.effect===3" @click="delRule(rule2.effect)">删除</a-button>
                <a-button v-if="rule2.effect===3" @click="openModal">使用推荐</a-button>
              </div>
            </div>
          </a-tab-pane>

        </a-tabs>
      </div>


    </a-layout-content>

    <GrowEdit 
      v-if="pageType=='add'||pageType=='edit'"
      :pageType="pageType"
      :total="total"
      :itemData="itemData"
      @back="back"/>

    <GrowModal ref="GrowModal" @back="back"/>

  </a-layout>
</template>

<script>
import { STable } from '@/components'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import { getPayList } from '@/api/base'
import { queryMemberSpalevel,stopMemberSpalevel,delMemberSpalevel } from '@/api/crm'

export default {
  name: 'Grow',
  components: {
    STable,
    GrowEdit: ()=> import('./grow/edit'),
    GrowModal: ()=> import('./grow/modal')
  },
  data () {
    return {
      pageType: 'list',
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '等级',
          dataIndex: 'level',
          scopedSlots: { customRender: 'level' }
        },
        {
          title: '等级模板',
          dataIndex: 'level_icon',
          scopedSlots: { customRender: 'level_icon' }
        },
        {
          title: '等级名称',
          dataIndex: 'level_name',
        },
        {
          title: '所需成长值',
          dataIndex: 'growth_start',
          scopedSlots: { customRender: 'growth_start' }
        },
        {
          title: '扣减周期',
          dataIndex: 'deductions_deductions',
        },
        {
          title: '扣减值',
          dataIndex: 'deductions',
        },
        {
          title: '等级优惠',
          dataIndex: 'oils_list',
          scopedSlots: { customRender: 'oils_list' }
        },
        {
          title: '操作人',
          dataIndex: 'userId',
        }
      ],
      rule: {},
      data: [],
      rule2: null,
      data2: [],
      total: 1,
      active: 1,
      effectList:[
        {label: '生效中',value: 1},
        {label: '待生效',value: 2},
        {label: '待启用',value: 3},
      ],
      loading: false,
      itemData:null,
      payList:[],
      
    }
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  created () {
    // console.log(this.userInfo)
    this.Init()
  },
  methods: {
    async Init(){
      this.loading = true
      // 获取支付方式列表
      let payRes = await getPayList()
      // console.log(payRes.data)
      if (payRes) {
        this.payList = payRes.data
      }
      let res = await queryMemberSpalevel({})
      if (res) {
        // console.log(res.data)
        this.total = 1
        this.rule = res.data[0]
        this.data = res.data[0].dataList
        if (res.data.length===2&&res.data[1].dataList.length) {
          this.total = 2
          this.rule2 = res.data[1]
          this.data2 = res.data[1].dataList
        }
      }
      this.loading = false
    },
    // 打开使用推荐
    openModal(){
      this.$refs['GrowModal'].show()
    },
    stop(){
      stopMemberSpalevel().then((res)=>{
        this.Init()
      })
    },
    editRule(itemData){
      this.itemData = itemData
      this.pageType = 'edit'
    },
    back(){
      this.pageType = 'list'
      this.Init()
    },
    // 支付方式转换中文
    payListText(ids){
      // console.log(ids)
      if (!ids) {
        return
      }
      let idsArr = ids.split(',').map(Number)
      // console.log(idsArr)
      // console.log(this.payList)
      let arr = this.payList.filter(e=>{
        return idsArr.includes(e.id)
      })
      arr = arr.map(e=>{
        return e.name
      })
      let str = arr.join('、')
      // console.log(str)
      return str
    },
    // 油品名称
    oilText(oils){
      let arr =  _.values(oils)
      let str = arr.map(e=>{return e.oils_name}).join('、')
      // console.log(str)
      if (this.rule.oil_totalcount===arr.length) {
        return '油品不限'
      }
      if (arr.length) {
        return str
      }
      return ''
      
    },
    effectText(val){
      // console.log(this.effectList.filter(e=>{return e.value===val}))
      let arr = this.effectList.filter(e=>{return e.value===val})
      let obj = {
        label: '无数据'
      }
      if (arr.length) {
        obj = arr[0]
      }
      // return this.effectList.filter(e=>{return e.value===val})[0]
      return obj
    },
    // 新增规则
    addRule(){
      this.pageType = 'add'
    },
    // 删除
    delRule (effect) {
      console.log(effect)
      let that = this
      this.$confirm({
        title: '温馨提示',
        content: '确认是否将该定级规则进行删除',
        onOk () {
          delMemberSpalevel({
            effect,
            group_id: that.userInfo.group_id
          }).then((res)=>{
            // console.log(res)
            that.$message.success(`删除成功`);
            that.Init()
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>
<style lang="less" scoped>
.add-rule {
  position: absolute;
  right: 24px;
  top: 10px;
  z-index: 10;
}
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.rule-status {
  padding-left: 10px;
  color: #1890ff;
}
.page-content {
  margin-top: 30px;
}
.growth-setting {
  .setting-item {
    display: flex;
    .setting-title {
      line-height: 45px;
      width: 128px;
      margin-right: 20px;
      text-align: right;
    }
    .setting-content {
      line-height: 45px;
    }
  }
}
.growth-level {
  margin-top: 15px;
  .level-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 60px;
    color: #040a46;
  }
}
.template-img{
  width: 90px;
  height: 53px;
  margin: 0 auto;
  img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
.page-foot {
  text-align: center;
  margin-top: 50px;
  button {
    margin-right: 20px;
  }
}
</style>
