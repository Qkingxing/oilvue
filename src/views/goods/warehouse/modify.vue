<template>
  <div>
    <a-layout v-if="$route.name=='my' && goodsInfo!=''">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <span>商品基础信息</span>
        <a-divider />
        <a-form layout="inline" >
          <a-row :gutter="48">
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品名称" >
               <a-input style="width: 200px;padding-right: 40px;" v-model="goodsInfo.goods_name" :maxLength="20"></a-input>
               <span style="position: relative;right: 40px;color: #c7c7c7;">{{goodsInfo.goods_name.length}}/20</span>
              </a-form-item>
             </a-col>
            <a-col :md="24" :sm="24"  class="screen-item">
              <a-form-item label="商品类目">
              	<a-select v-model="goodsInfo.categoryId" style="width: 200px">
              		<a-select-option :value="item.id" :key="item.id" v-for="(item,index) in categoryList">
              			{{item.goods_name}}
              		</a-select-option>
              	</a-select>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品类型">
                <a-radio-group v-model="goodsInfo.goods_type">
                  <a-radio value="1">
                    优惠券
                  </a-radio>
                </a-radio-group>
                <div style="padding: 20px 92px 25px 20px;  width: 640px;  background-color: #f5f5fa;">
                  <div>
                    <span>优惠券</span>
                     <a-select
                        mode="multiple"
                        v-model="couponsChooseList"
                        style="width:200px;margin:0 10px"
                        placeholder="请选择奖励优惠券"
                         @change="couponsChange()"
                      >
                        <a-select-option v-for="(item,index) in couponsList" :key="item.id">
                          {{item.coupons_name}}
                        </a-select-option>
                      </a-select>
                      <span>没有合适的优惠券？</span>
                      <a href="">去创建</a>
                  </div>
                  <div style="margin-left: 50px;text-align: center;" v-if="couponsChooseInfoList.length>0">
                    <div class="title" style="background-color: #f9fafc;border: 1px solid #f6f6f6;">
                      <span style="width: 100px;display: inline-block;">券名称</span>
                      <span style="width: 100px;display: inline-block;">券金额</span>
                      <span style="width: 100px;display: inline-block;">数量</span>
                      <span style="width: 100px;display: inline-block;">操作</span>
                    </div>
                    <div class="item" style="background-color: #FFFFFF;" v-for="(item,index) in couponsChooseInfoList" :key="item.id">
                      <span style="width: 100px;display: inline-block;">{{item.coupons_name}}</span>
                      <span style="width: 100px;display: inline-block;">{{item.coupons_amount}}</span>
                      <span style="width: 100px;display: inline-block;">
                        <a-input type="number" :value="item.count"></a-input>
                      </span>
                      <span style="width: 100px;display: inline-block;">
                        <a @click="deleteChooseInfo(index)">删除</a>
                      </span>
                    </div>
                  </div>
                </div>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品库存">
                <a-input-number style="width: 200px;" :min="0" v-model="goodsInfo.goods_inventory"></a-input-number>
              </a-form-item>
            </a-col>
            <!-- <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="油品券">
              </a-form-item>
            </a-col> -->
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品介绍">
                <a-textarea v-model="goodsInfo.goods_introduce" style="width: 200px;height: 100px;"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <span style="margin-top: 3.125rem;">购买设置</span>
        <a-divider />
        <a-form layout="inline" >
          <a-row :gutter="48">
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品状态">
                <a-radio-group v-model="goodsInfo.management_type">
                  <a-radio value="1">
                    积分兑换
                  </a-radio>
                  <a-radio value="2">
                    积分加钱购
                  </a-radio>
                  <a-radio value="3">
                    金钱购买
                  </a-radio>
                </a-radio-group>
                <div style="padding: 20px 92px 25px 20px;  width: 640px;  background-color: #f5f5fa;">
                  <div v-show="goodsInfo.management_type!=3">
                    <span>所需积分</span>
                    <a-input-number style="width: 100px;margin: 0 10px;" v-model="goodsInfo.integral"></a-input-number>
                    <span>分</span>
                  </div>
                  <div v-show="goodsInfo.management_type!=1">
                    <span>所需金额</span>
                    <a-input-number style="width: 100px;margin: 0 10px;"></a-input-number>
                    <span>元</span>
                  </div>
                </div>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="购买限制">
                <a-radio-group v-model="goodsInfo.limit_type">
                  <a-radio value="1">
                    不限个数
                  </a-radio>
                  <a-radio value="2">
                    限制个数
                  </a-radio>
                </a-radio-group>
                <div v-if="goodsInfo.limit_type==2" style="padding: 20px 92px 25px 20px;  width: 640px;  background-color: #f5f5fa;">
                  <span>每人</span>
                  <a-input-number style="margin: 0 10px;" v-model="goodsInfo.dayNumber"></a-input-number>
                  <span>天，可购买</span>
                  <a-input-number  style="margin: 0 10px;" v-model="goodsInfo.count"></a-input-number>
                  <span>个（数量）</span>
                </div>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" style="text-align: center;">
              <a-button @click="reBack()">返回</a-button>
              <a-button type="primary" style="margin: 0 10px;" @click="modifyGoods()">修改</a-button>
              <a-button type="primary" @click="createAndUp()">创建并上架</a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
  import {
  	getGoodsCategoryList, getGoodsList, getCouponsList, modifyGoods
  } from '@/api/goods'
  import { isEmpty } from '@/utils/lzz.js'
  export default{
    data(){
      return{
        categoryList: [],
        goodsList:[],
        couponsList:[],
        couponsChooseList:[],
        couponsChooseInfoList:[],
        goodsInfo:{
          goods_name:'',
          goods_inventory:'',
          categoryId:'',
          goods_introduce:'',
          goods_type:'1',
          integral:'',
          count:'',
          limit_type:'1',
          management_type:"1",
          dayNumber:'',
          coupons:[]
        }
      }
    },
    props:{
      modifyId:{
        type:Number
      }
    },
    created() {
      this.loadGoodsInfo()
    	this.loadCategoryList()
      this.loadCouponsList()
      // this.$route.meta.title = 'menu.goods.warehouse.Classification'
    },
    methods: {
      loadGoodsInfo(){
        let _param={
          limit:10,
          page:1,
          id:this.modifyId
        }
        getGoodsList(_param).then(res=>{
          this.goodsInfo = res.data[0]
          this.goodsInfo.coupons.forEach(item=>{
            this.couponsChooseList.push(item.id)
          })
          this.couponsChooseInfoList = this.goodsInfo.coupons
        })
      },
      modifyGoods(){
        this.goodsInfo.coupons.length = 0
        this.couponsChooseInfoList.forEach(res=>{
          let _obj={
            couponsId:res.id,
            count:res.count
          }
          this.goodsInfo.coupons.push(_obj)
        })
        if(this.goodsInfo.goods_name == ""){
           this.$message.error("请填写商品名称")
           return;
        }
        if(this.goodsInfo.categoryId == ""){
           this.$message.error("请选择商品类目")
           return;
        }
        if(this.goodsInfo.coupons.length == 0){
          this.$message.error("请配置优惠券")
          return;
        }
        if(this.goodsInfo.goods_inventory == ""){
          this.$message.error("请填写库存")
          return;
        }
        if(this.goodsInfo.management_type !=3  && isEmpty(this.goodsInfo.integral)){
          this.$message.error("请填写所需积分")
          return;
        }
        if(this.goodsInfo.management_type !=1  && isEmpty(this.goodsInfo.integral)){
          this.$message.error("请填写所需金额")
          return;
        }
        modifyGoods(this.goodsInfo).then(res=>{
          this.$message.success("修改商品成功")
          this.$emit("modifyOver");
        })
      },
      reBack(){
        this.$emit("reBack");
      },
      createAndUp(){
        
      },
      countChange(value){
      },
      deleteChooseInfo(index){
        this.couponsChooseInfoList.splice(index,1)
        this.couponsChooseList.splice(index,1)
      },
      couponsChange(){
        this.couponsChooseInfoList.length = 0
        this.couponsChooseList.forEach(res=>{
          this.couponsList.forEach(item=>{
            if(res==item.id){
              item.count = 2
              this.couponsChooseInfoList.push(item)
              console.log(this.couponsChooseInfoList)
            }
          })
        })
      },
      loadCouponsList(){
    		let _param = {
    			page: 1,
    			limit: 10
    		}
    		getCouponsList(_param).then(res => {
    			this.couponsList = res.data
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
    		})
    	}
    }
  }
</script>

<style lang="less" scoped="scoped">
 .screen-item{
   margin-bottom: 16px;
   margin-left: 50px;
   color: #1e1e28;
 }
</style>
