<template>
  <div>
    <a-layout v-if="$route.name=='my'">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <span>商品基础信息</span>
        <a-divider />
        <a-form layout="inline" >
          <a-row :gutter="48">
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品名称" >
               <a-input style="width: 200px;padding-right: 40px;" v-model="form.goods_name" :maxLength="20"></a-input>
               <span style="position: relative;right: 40px;color: #c7c7c7;">{{form.goods_name.length}}/20</span>
              </a-form-item>
             </a-col>
            <a-col :md="24" :sm="24"  class="screen-item">
              <a-form-item label="商品类目">
              	<a-select v-model="form.categoryId" style="width: 200px">
              		<a-select-option :value="item.id" :key="item.id" v-for="(item,index) in categoryList">
              			{{item.goods_name}}
              		</a-select-option>
              	</a-select>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品类型">
                <a-radio-group v-model="form.goods_type">
                  <a-radio value="1">
                    优惠券
                  </a-radio>
                  <a-radio value="2">
                    实物商品
                  </a-radio>
                </a-radio-group>
                <div v-if="form.goods_type == 1" style="padding: 20px 92px 25px 20px;  width: 640px;  background-color: #f5f5fa;">
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
                  <div style="margin-left: 50px;text-align: center;" v-if="form.coupons.length>0">
                    <div class="title" style="background-color: #f9fafc;border: 1px solid #f6f6f6;">
                      <span style="width: 100px;display: inline-block;">券名称</span>
                      <span style="width: 100px;display: inline-block;">券金额</span>
                      <span style="width: 100px;display: inline-block;">数量</span>
                      <span style="width: 100px;display: inline-block;">操作</span>
                    </div>
                    <div class="item" style="background-color: #FFFFFF;" v-for="(item,index) in form.coupons" :key="item.id">
                      <span style="width: 100px;display: inline-block;">{{item.coupons_name}}</span>
                      <span style="width: 100px;display: inline-block;">{{item.coupons_amount}}</span>
                      <span style="width: 100px;display: inline-block;">
                        <a-input-number v-model="item.count"></a-input-number>
                      </span>
                      <span style="width: 100px;display: inline-block;">
                        <a @click="deleteChooseInfo(index)">删除</a>
                      </span>
                    </div>
                  </div>
                </div>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" class="screen-item" v-if="form.goods_type == 2">
              <a-form-item label="商品条码">
                <a-input style="width: 200px;" placeholder="请输入商品条码" v-model="form.barcode"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品库存">
                <a-input-number style="width: 200px;" :min="0" v-model="form.goods_inventory"></a-input-number>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品介绍">
                <a-textarea v-model="form.goods_introduce" style="width: 200px;height: 100px;"></a-textarea>
              </a-form-item>
            </a-col>
            <a-col  :md="24" :sm="24" class="screen-item">
              <a-form-item label="商品图片">
                <a-upload
                   name="avatar"
                   list-type="picture-card"
                   class="avatar-uploader"
                   :show-upload-list="false"
                   action="https://oiljava.ldyxx.com/goods/FileImg"
                   :data="imgData"
                   :before-upload="beforeUpload"
                   @change="handleImgChange"
                 >
                   <img v-if="form.goods_cover" :src="form.goods_cover" style="width: 100px;" alt="avatar" />
                   <div v-else>
                     <a-icon :type="loading ? 'loading' : 'plus'" />
                     <div class="ant-upload-text">
                       Upload
                     </div>
                   </div>
                 </a-upload>
                 <div class="text">请上传形象照，图片大小不超过1M</div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-form layout="inline" >
          <a-row :gutter="48">
            <a-col :md="24" :sm="24" class="screen-item">
              <a-form-item label="购买方式">
                <a-radio-group v-model="form.management_type">
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
                  <div v-show="form.management_type!=3">
                    <span>所需积分</span>
                    <a-input-number style="width: 100px;margin: 0 10px;" v-model="form.integral"></a-input-number>
                    <span>分</span>
                  </div>
                  <div v-show="form.management_type!=1">
                    <span>所需金额</span>
                    <a-input-number style="width: 100px;margin: 0 10px;" v-model="form.goods_amount"></a-input-number>
                    <span>元</span>
                  </div>
                </div>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" class="screen-item" v-if="form.goods_type == 1">
              <a-form-item label="购买限制">
                <a-radio-group v-model="form.limit_type">
                  <a-radio value="1">
                    不限个数
                  </a-radio>
                  <a-radio value="2">
                    限制个数
                  </a-radio>
                </a-radio-group>
                <div v-if="form.limit_type==2" style="padding: 20px 92px 25px 20px;  width: 640px;  background-color: #f5f5fa;">
                  <span>每人</span>
                  <a-input-number style="margin: 0 10px;" v-model="form.dayNumber"></a-input-number>
                  <span>天，可购买</span>
                  <a-input-number  style="margin: 0 10px;" v-model="form.count"></a-input-number>
                  <span>个（数量）</span>
                </div>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24" style="text-align: center;">
              <a-button @click="reBack()">返回</a-button>
              <a-button type="primary" style="margin: 0 10px;" @click="createGoods()">创建</a-button>
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
  	getGoodsCategoryList, getGoodsList, getCouponsList, addGoods, modifyGoodsState
  } from '@/api/goods'
  import { isEmpty } from '@/utils/lzz.js' 
  import { mapGetters } from 'vuex'
  export default{
    data(){
      return{
        categoryList: [],
        goodsList:[],
        couponsList:[],
        couponsChooseList:[],
        imgData:{
          file: {},
        },
        loading: false,
        form:{
          barcode:'',
          goods_name:'',
          goods_inventory:'',
          categoryId:'',
          goods_introduce:'',
          goods_type:'1',
          integral:'',
          goods_amount:'',
          count:'',
          limit_type:'1',
          management_type:"1",
          dayNumber:'',
          coupons:[]
        }
      }
    },
    created() {
    	this.loadCategoryList()
      this.loadCouponsList()
      // this.$route.meta.title = 'menu.goods.warehouse.Classification'
    },
    computed:{
      ...mapGetters(['userInfo'])
    },
    methods: {
      handleImgChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
          this.form.goods_cover = info.file.response.data
          this.loading = false
        }
      },
      beforeUpload(file) {
        this.imgData.file = file
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          this.$message.error('请上传 JPG 或 IPG 格式的照片!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
      },
      createGoods(type){
        if(isEmpty(this.form.goods_name)){
           this.$message.error("请填写商品名称")
           return;
        }
        if(isEmpty(this.form.categoryId)){
           this.$message.error("请选择商品类目")
           return;
        }
        if(this.form.goods_type == 1 && this.form.coupons.length == 0){
          this.$message.error("请配置优惠券")
          return;
        }
        for(let i in this.form.coupons){
          delete this.form.coupons[i].coupons_name;
          delete this.form.coupons[i].coupons_amount;
        }
        if(this.form.goods_type == 2 && isEmpty(this.form.barcode)){
          this.$message.error("请填写商品条码")
          return;
        }
        if(isEmpty(this.form.goods_inventory)){
          this.$message.error("请填写库存")
          return;
        }
        if(this.form.management_type !=3  && isEmpty(this.form.integral)){
          this.$message.error("请填写所需积分")
          return;
        }
        if(this.form.management_type !=1  && isEmpty(this.form.integral)){
          this.$message.error("请填写所需金额")
          return;
        }
        addGoods(this.form).then(res=>{
          this.$message.success("添加商品成功")
          this.$emit("addOver");
        })
      },
      reBack(){
        this.$emit("reBack");
      },
      countChange(value){
        console.log(value)
      },
      deleteChooseInfo(index){
        this.form.coupons.splice(index,1)
        this.couponsChooseList.splice(index,1)
      },
      couponsChange(){
        this.form.coupons = []
        this.couponsChooseList.forEach(res=>{
          this.couponsList.forEach(item=>{
            if(res==item.id){
              let _obj={
                'coupons_amount':item.coupons_amount,
                'coupons_name':item.coupons_name,
                'couponsId':item.id,
                'count':1
              }
              this.form.coupons.push(_obj)
            }
          })
        })
      },
      loadCouponsList(){
    		let _param = {
    			page: 1,
    			limit: 999
    		}
    		getCouponsList(_param).then(res => {
    			this.couponsList = res.data
    		})
      },
    	loadCategoryList() {
    		let _param = {
    			site_id: this.userInfo.site_id,
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

<style lang="less" scoped="scoped">
 .screen-item{
   margin-bottom: 16px;
   color: #040a46;
 }
 .avatar-uploader{
   vertical-align: top;
 }
 .avatar-uploader > .ant-upload {
   width: 128px;
   height: 128px;
 }
</style>
