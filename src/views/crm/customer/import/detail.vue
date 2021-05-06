<template>
  <a-layout-content

    :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
  >
    <div class="header">
      导入详情
      <a-button class="ant-btn" @click="$router.go(-1)"> 返回上一页 </a-button>
    </div>

    <div class="body">
      <div class="descriptions">
        <div class="descriptions-item">
          <div class="descriptions-item-label">导入时间</div>
          <div class="descriptions-item-content">{{detail.generate_time}}</div>
        </div>
        <div class="descriptions-item">
          <div class="descriptions-item-label">操作人</div>
          <div class="descriptions-item-content">{{detail.user_name}}</div>
        </div>
        <div class="descriptions-item">
          <div class="descriptions-item-label">导入状态</div>
          <div class="descriptions-item-content">
            <span v-if="detail.import_type">{{importTypeList[detail.import_type].text}}</span>
          </div>
        </div>
        <div class="descriptions-item">
          <div class="descriptions-item-label">成功数</div>
          <div class="descriptions-item-content">{{detail.success_number}}</div>
        </div>
        <div class="descriptions-item">
          <div class="descriptions-item-label">失败数</div>
          <div class="descriptions-item-content">{{detail.error_number}}</div>
        </div>
        <div class="descriptions-item">
          <div class="descriptions-item-label">总积分</div>
          <div class="descriptions-item-content">{{detail.totalIntegral}}</div>
        </div>
        <div class="descriptions-item">
          <div class="descriptions-item-label">总余额</div>
          <div class="descriptions-item-content">{{detail.totalMoney}}</div>
        </div>
        <div class="descriptions-item">
          <div class="descriptions-item-label">加油卡名称</div>
          <div class="descriptions-item-content">-</div>
        </div>
        <div class="descriptions-item">
          <div class="descriptions-item-label"></div>
          <div class="descriptions-item-content"></div>
        </div>
      </div>
      <div class="handle-group">
        <div class="handle-btn-group">
          <a-button type="primary"> 撤回 </a-button>
        </div>
        <a-input-search placeholder="请输入手机号/原系统会员编号查询" style="width: 280px;margin-right: 8px;" />
        <a-button icon="export" @click="exportAll"> 导出数据 </a-button>

      </div>
      <!-- 表格 -->
      <s-table 
        ref="table" 
        size="default" 
        rowKey="id" 
        :columns="columns" 
        :data="loadData">
          
          <span slot="action" slot-scope="text, record">
            <template>
              <div class="action-group" style="text-align:center;">
                <a-button type="link" @click="openEdit(record)"> 编辑 </a-button>
              </div>
              
            </template>
          </span>

        </s-table>
    </div>


   
    <EditUserModal ref="EditUserModal"/>
  </a-layout-content>
</template>

<script>
import { STable } from '@/components'
import { getImportlist,ImportDetail } from '@/api/crm'

export default {
  name: 'ImportDetail',
  components: {
    STable,
    EditUserModal: ()=>import('./components/editUserModal')
  },
  data(){
    return {
      detail: {},
      total: 0,
      importTypeList:[
        { text: '', value: '0' },
        { text: '成功', value: '1' },
        { text: '失败', value: '2' },
        { text: '已撤回', value: '3' },
      ],
      // 表头
      columns: [
        {
          title: '原系统会员编号',
          // dataIndex: 'report_name',
        },
        {
          title: '手机号',
          dataIndex: 'mobile'
        },
        {
          title: '姓名',
          dataIndex: 'nickname',
        },
        {
          title: '车牌号',
          // dataIndex: 'error_number',
        },
        {
          title: '积分',
          dataIndex: 'integral',
        },
        {
          title: '余额',
          // dataIndex: 'totalMoney',
        },
        {
          title: '成长值',
          // dataIndex: 'card_name',
        },
        {
          title: '固定等级',
          // dataIndex: 'import_type',
        },
        {
          title: '注册时间',
          // dataIndex: 'create_time',
        },
        {
          title: '状态',
          // dataIndex: 'generate_time',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          id: this.$route.query.id,
        }

        return ImportDetail(Object.assign(params))
        .then((res)=>{
          // 自定义出参
          console.log(res.data.data.list)
          this.detail = res.data
          this.total = res.data.data.totalCount
          return {
            data: res.data.data.list, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            totalCount: res.data.data.totalCount, // 列表总条数
            totalPage: res.data.data.totalpage // 列表总页数
          }
        })
      },
    }
  },
  methods:{
    openEdit(item){
      this.$refs.EditUserModal.show(item)
    },
    // 批量导出
    exportAll(){

      let that = this

      this.$confirm({
        title: '是否确认导出数据？',
        content: (
          <div>
            <p class="text">共{that.total}位客户，导出后请到数据/报表/下载列表中查看</p>
          </div>
        ),
        onOk () {

          that.$router.push({
            path: '/dmp/report/download'
          })
        },
        onCancel () {}
      })

    },
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 16px 0 7px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eaeaf4;
  font-size: 16px;
  color: #1e1e28;
  line-height: 40px;
  font-weight: 600;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.descriptions{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  border: 1px solid #eaeaf4;
  border-bottom: none;
  margin-bottom: 16px;
  .descriptions-item{
    width: 33.333333%;
    color: #3e4b6f;
    font-size: 14px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #eaeaf4;
    .descriptions-item-label{
      width: 100px;
      font-weight: 500;
      padding: 17px 15px 17px 0;
      line-height: 15px;
      background-color: #f8f8f9;
      text-align: right;
    }
    .descriptions-item-content{
      line-height: 15px;
      padding: 17px 16px;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: left;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
  }
}
.handle-group{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 16px;
  .handle-btn-group{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
}
</style>