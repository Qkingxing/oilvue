<template>
  <div class="my">
   <a-layout v-if="$route.name=='my' && !isAdd && !isModify">
     <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
       <a-button type="primary" @click="toAddGoods()">新增商品</a-button>
       <a-divider />
       <a-form layout="inline" >
         <a-row :gutter="48">
           <a-col :md="24" :sm="24">
             <a-form-item label="商品名称" class="screen-item">
              <a-input style="width: 200px" v-model="param.goods_name"></a-input>
             </a-form-item>
             <a-form-item label="商品类型" class="screen-item">
              <a-select default-value="1" v-model="param.goods_type" style="width: 200px">
                <a-select-option value="1">
                  优惠券
                </a-select-option>
                <a-select-option value="2">
                  实物商品
                </a-select-option>
              </a-select>
             </a-form-item>
             <a-form-item label="商品类目" class="screen-item">
             	<a-select v-model="param.categoryId" style="width: 200px">
             		<a-select-option :value="item.id" :key="item.id" v-for="(item,index) in categoryList">
             			{{item.goods_name}}
             		</a-select-option>
             	</a-select>
             </a-form-item>
             <a-form-item label="商品状态" class="screen-item">
             	<a-select default-value="0" v-model="param.state" style="width: 200px">
                <a-select-option value="0">
                  全部
                </a-select-option>
             	  <a-select-option value="1">
             	    已上架
             	  </a-select-option>
             	  <a-select-option value="2">
             	    已下架
             	  </a-select-option>
             	</a-select>
             </a-form-item>
           </a-col>
           <a-col :md="24" :sm="24">
             <a-form-item>
               <a-button @click="toSearch()" type="primary" class="search-btn" style="min-width:82px;margin: 10px auto;"> 搜索 </a-button>
             </a-form-item>
           </a-col>
         </a-row>
       </a-form>
       <div v-if="goodsList.length>0">
         <a-table ref="table" :columns="columns"  :rowKey='record=>record.id' :data-source="goodsList" :scroll="{ x: 1300 }">
           <a slot="img" slot-scope="text,record" href="javascript:;">
            <img :src="text.goods_cover" />
           </a>
           <a slot="action" slot-scope="text">
             <span>兑换记录</span>
             <span style="margin-left: 10px;">兑换统计</span>
             <span style="margin-left: 10px;" v-if="text.state==2" @click="changeState(text)">上架</span>
             <span style="margin-left: 10px;" v-if="text.state==1" @click="changeState(text)">下架</span>
             <span style="margin-left: 10px;" @click="toModify(text)">编辑</span>
             <a-popconfirm
                 title="确定删除商品吗"
                 ok-text="确定"
                 cancel-text="取消"
                 @confirm="delGoods(text)"
                 style="margin-left: 10px;"
               >
                 <a>删除</a>
              </a-popconfirm>
             </a>
           </a-table>
       </div>
      </a-layout-content>
    </a-layout>
    <add v-if="isAdd" @addOver="addOver" @reBack="reBack"></add>
    <modify v-if="isModify" :modifyId="modifyId" @reBack="modifyBack" @modifyOver="modifyOver"></modify>
  </div>
</template>

<script>
  import add from './add.vue'
  import modify from './modify.vue'
  const columns = [
    { title: '商品ID', dataIndex: 'id', key: '1' },
    {
      title: '商品图片',
      key: '2',
      scopedSlots: { customRender: 'img' },
    },
    { title: '商品名称', dataIndex: 'goods_name', key: '3' },
    { title: '所需积分', dataIndex: 'integral', key: '4' },
    { title: '所需金额', dataIndex: 'goods_amount', key: '5' },
    { title: '已售出', dataIndex: 'goods_sold', key: '6' },
    { title: '库存', dataIndex: 'goods_inventory', key: '7' },
    { title: '商品类目', dataIndex: 'category_name', key: '8' },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 300,
      scopedSlots: { customRender: 'action' },
    },
  ];
  import { deleteNullAttr } from '@/utils/lzz.js'
	import {
		getGoodsCategoryList, getGoodsList, deleteGoods, modifyGoodsState
	} from '@/api/goods'
	export default {
		name: 'My',
		data() {
			return {
        columns,
        isAdd:false,
        isModify:false,
				categoryList: [],
        goodsList:[],
        modifyId:'',
        param:{
          goods_type:'',
          goods_name:'',
          categoryId:'',
          state:'0'
        }
			}
		},
    components:{
      add,
      modify
    },
		created() {
			this.loadCategoryList()
      this.loadGoodsList()
		},
		methods: {
      modifyBack(){
        this.isModify = false
      },
      toModify(item){
        this.modifyId = item.id
        this.isModify = true
      },
      changeState(item){
        let _param={
          id:item.id,
          state:item.state==1?2:1
        }
        modifyGoodsState(_param).then(res=>{
          if(item.state==2){
            this.$message.success("上架成功")
          }else{
            this.$message.success("下架成功")
          }
          this.loadGoodsList()
        })
      },
      delGoods(item){
        let _param={
          id:item.id
        }
        deleteGoods(_param).then(res=>{
          this.$message.success("删除商品成功")
          this.loadGoodsList()
        })
      },
      toAddGoods(){
        this.isAdd = true;
       },
      toSearch(){
        let _param={
          page:1,
          limit:100,
        }
        getGoodsList(Object.assign(deleteNullAttr(this.param),_param)).then(res => {
          this.goodsList=res.data
        })
      },
      addOver(){
        this.isAdd = false
        this.loadGoodsList()
      },
      modifyOver(){
        this.isModify = false
        this.loadGoodsList()
      },
      reBack(){
        this.isAdd = false  
      },
      loadGoodsList(){
        let _param={
          page:1,
          limit:100,
        }
        getGoodsList(_param).then(res => {
          this.goodsList=res.data
        })
      },
			loadCategoryList() {
				let _param = {
					site_id: 2,
					page: 1,
					limit: 10
				}
				getGoodsCategoryList(_param).then(res => {
					this.categoryList = res.data
					console.log(res.data)
				})
			}
		}
	}
</script>
<style scoped="scoped">
  .my img{
    width: 50px;
  }
  .ant-table-row{
    height: 83px !important;
  }
</style>