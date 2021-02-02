<template>
  <div class="Classification">
    <a-layout v-if="$route.name=='Classification'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
       <h3 class="o-title">商品类目</h3>
        <a-divider />
        <a-col :md="24" :sm="24">
          <a-form-item>
            <a-button type="primary"  style="min-width:82px;" @click="addVisible=true"> 新增商品类目 </a-button>
          </a-form-item>
        </a-col>
        <!-- 表格 -->
        <div class="showDataForTable">
          <s-table
            ref="table"
            size="default"
            :rowKey="(record) => record.id"
            :columns="columns"
            :data="loadData"
            :pagination="{ pageSize: 10 }"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          >
          <span slot="action" slot-scope="text, record">
            <a @click="modifyCategory(record)" style="margin-right: 10px;">编辑</a>
            <a-popconfirm title="确定删除吗？" ok-text="确定" cancel-text="取消" @confirm="deleteCategory(record)">
              <a>删除</a>
            </a-popconfirm>
            <a @click="modifyCategorySort(record)" style="margin-left: 10px;">排序</a>
            <a-divider type="vertical"/>
          </span>
          </s-table>
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal
        title="新增商品类目"
        :visible="addVisible"
        :confirm-loading="addConfirmLoading"
        @ok="handleAddOk"
        @cancel="handleAddCancel"
      >
      <div style="display: block;text-align: center;">
        <span style="margin-right: 10px;">商品类目</span>
        <a-input v-model="addCateName" placeholder="" :maxLength="8" style="width: 200px;" />
        <span style="position: relative;right: 30px;color: #c7c7c7;">{{addCateName.length}}/8</span>
      </div>
      </a-modal>
      <a-modal
          title="编辑商品类目"
          :visible="modifyVisible"
          :confirm-loading="modifyConfirmLoading"
          @ok="handleModifyOk"
          @cancel="handleModifyCancel"
        >
        <div style="display: block;text-align: center;" v-if="modifyVisible">
          <span style="margin-right: 10px;">商品类目</span>
          <a-input v-model="modifyInfo.goods_name" placeholder="" :maxLength="8" style="width: 200px;" />
          <span style="position: relative;right: 30px;color: #c7c7c7;">{{modifyInfo.goods_name.length}}/8</span>
        </div>
      </a-modal>
      <a-modal
          title="修改商品类目顺序"
          :visible="sortVisible"
          :confirm-loading="sortConfirmLoading"
          @ok="handleSortOk"
          @cancel="sortVisible=false"
        >
        <div style="display: block;text-align: center;" v-if="sortVisible">
          <span style="margin-right: 10px;">商品类目排序</span>
          <a-input-number v-model="sortInfo.sorting" style="width: 200px;" ></a-input-number>
        </div>
      </a-modal>
    <router-view />
  </div>
</template>

<script>
import { getGoodsCategoryList, addGoodsCategory, modifyGoodsCategory, deleteGoodsCategory, modifyGoodsCategorySorting } from '@/api/goods'
import { STable } from '@/components'
export default {
  name: 'Classification',
  components: {
    STable
  },
  data () {
    return {
      addCateName:'',
      addVisible:false,
      modifyVisible:false,
      sortVisible:false,
      addConfirmLoading: false,
      modifyConfirmLoading: false,
      sortConfirmLoading:false,
      searchType:'高级搜索',
      diyDate:false,
      orderTime:'',
      radioValue: 'new',
      tableOptionChoose:['优惠金额','实付金额','支付方式','状态时间'],
      modifyInfo:{},
      sortInfo:{},
      value:'',
      // 查询参数
      // 表头
      columns: [
        {
          title: '排序',
          dataIndex: 'sorting'
        },
        {
          title: '商品类目',
          dataIndex: 'goods_name'
        },
        {
          title: '商品数',
          dataIndex: 'goods_count',
        },
        {
          table: '操作',
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        let _param = {
          site_id:2,
          limit:10,
          page: parameter.pageNo, // 页码
          size: parameter.pageSize // 每页页数
        }
        return getGoodsCategoryList(Object.assign(_param)).then(res=>{
          return {
            data: res.data, // 列表数组
            pageNo: _param.page,  // 当前页码
            pageSize: _param.limit,  // 每页页数
            totalCount: res.countPage, // 列表总条数
            totalPage: res.pageSize // 列表总页数
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
  created () {
    console.log(this.$route.name)
    this.tableOption()
  },
  methods: {
    onChangeTableOption(){
      
    },
    modifyCategory(item){
      this.modifyInfo = item
      this.modifyVisible = true
    },
    modifyCategorySort(item){
      this.sortInfo = item
      this.sortVisible = true
    },
    handleAddOk(e) {
      if(this.addCateName == ""){
        this.$message.error('类目名称不能为空')
        return;
      }
       this.addConfirmLoading = true;
      let _post={
        goods_name:this.addCateName,
        site_id:'2'
      }
      addGoodsCategory(_post).then(res=>{
        this.$message.success('添加成功')
        this.addVisible = false;
        this.addConfirmLoading = false;
        this.$refs.table.refresh()
      })
    },
    handleModifyOk(){
      if(this.modify == ""){
        this.$message.error('类目名称不能为空')
        return;
      }
      this.addConfirmLoading = true;
      let _post={
        goods_name:this.modifyInfo.goods_name,
        id:this.modifyInfo.id
      }
      modifyGoodsCategory(_post).then(res=>{
        this.$message.success('修改成功')
        this.modifyVisible = false;
        this.modifyVisibleConfirmLoading = false;
        this.$refs.table.refresh()
      })
    },
    handleSortOk(){
      if(this.sortInfo.sorting == ""){
        this.$message.error('排序不能为空')
        return;
      }
      this.sortConfirmLoading = true;
      let _post={
         "up_sorting": [{
              "id": this.sortInfo.id,
              "sorting": this.sortInfo.sorting
          }]
      }
      console.log(_post.up_sorting)
      modifyGoodsCategorySorting(_post).then(res=>{
        this.$message.success('修改成功')
        this.sortVisible = false;
        this.sortVisibleConfirmLoading = false;
        this.$refs.table.refresh()
      })
    },
    handleAddCancel(e) {
      this.addVisible = false;
    },
    handleModifyCancel(){
      this.modifyVisible = false;
    },
    advanceSearchChange(){
      this.searchType == "高级搜索" ? this.searchType="点击收起" :　this.searchType="高级搜索" 
    },
    disabledDate(current) {
      return current && current < moment().endOf('day');
    },
    disabledRangeTime(_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56],
      };
    },
    deleteCategory(item){
      let _post={
        id:item.id
      }
      deleteGoodsCategory(_post).then(res=>{
        this.$message.success('删除成功')
        this.$refs.table.refresh()
      })
    },
    onChange(value){
      value.target.value == 5 ? this.diyDate = true : this.diyDate = false
    },
    showEditTag (type) {
      this.$refs['EditTag'].show(type)
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
.o-title{
  font-weight: 600;
}
.screen-box{
  padding: 0px 0 24px 0;
  .screen-item{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
  .screen-item-inline{
    display: inline-block;
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
