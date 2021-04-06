
<template>
  <div>
    <div class="set-common-wrap">
      <div class="header">
        基础信息
      </div>
      <div class="form-wrap">
        <a-form
          :form="formData"
          v-bind="formItemLayout"
         
        >
        <a-form-item label="油站名称">
          <a-input
          
          v-model="formData.site_name"
          />
        </a-form-item>
        <a-form-item label="油站简称">
          <a-input
         v-model="formData.site_abbreviation"
          />
        </a-form-item>
        <a-form-item   label="所在城市">
          <a-select
          @change="shengChange"
          v-model="province_id"
            style="width:100px;margin:0 10px;"
              placeholder="请选择"
            >
            <a-select-option :key="item.id" v-for="item in shengArr" :value="item.id">
               {{item.name}}
              </a-select-option>
            </a-select>
            <a-select
             @change="shiChange"
             v-model="city_id"
            v-if="shiArr.length"
            style="width:100px;margin:0 10px;"
              placeholder="请选择"
            >
            <a-select-option :key="item.id" v-for="item in shiArr" :value="item.id">
               {{item.name}}
              </a-select-option>
            </a-select>
            <a-select
             v-model="district_id"
            v-if="xianArr.length"
              style="width:100px"
                placeholder="选择区"
              >
               <a-select-option :key="item.id" v-for="item in xianArr" :value="item.id">
               {{item.name}}
              </a-select-option>
            </a-select>
            </a-form-item>
            <a-form-item label="详细地址">
              <a-input
              v-model="formData.address"
              :suffix="lastAddress"/>
            </a-form-item>
            <a-form-item   label="经纬度">
              <a-input
              style="width:160px;margin-right:12px;"
               v-model="formData.longitude"
              />
            <a-input
            style="width:160px"
            v-model="formData.latitude"
            />
            <img @click="mapLog=true" class="map-png" src="./map.png" alt="">
            </a-form-item>
            <a-form-item   label="油站电话">
                  <a-input
                  v-model="formData.site_tel"
              />
            </a-form-item>
            <a-form-item label="是否营业">
            <a-radio-group v-model="formData.is_business">
              <a-radio :value="1">
               开业中
              </a-radio>
              <a-radio :value="0">
               暂停营业
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="标签">
            <a-input
            v-model="formData.label"
              :suffix="lastIndex"
            />
          </a-form-item>
          <a-form-item label="油站图片">
            <a-upload
              action="https://oiljava.ldyxx.com:4435/goods/FileImg"
              list-type="picture-card"
              :file-list="fileList"
              name="file"
              @change="handleChange"
            >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
                <div class="ant-upload-text">
                </div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </a-form-item>
            <a-form-item  label="提示">
     
                可上传5张，图片建议尺寸850像素*350像素，大小不超过1M
                </a-form-item>
            <a-form-item label="零管系统">
            <a-radio-group  v-model="formData.zerotube">
              <a-radio :value="1">
               启用
              </a-radio>
              <a-radio :value="0">
               禁用
              </a-radio>
             
            </a-radio-group>
          </a-form-item>
           <a-form-item label="ETC直扣注册">
            <a-radio-group v-model="formData.ETC">
              <a-radio value="1">
               需注册
              </a-radio>
              <a-radio value="0">
               关闭注册
              </a-radio>
             
            </a-radio-group>
          </a-form-item>

        
        </a-form>
      </div>
      <div class="header">
        第三方绑定
      </div>
      <div class="form-wrap">
        <a-form
         v-bind="formItemLayout"
         
        >
        <a-form-item label="微信公众号">
            <a-radio-group v-model="formData.woa_type">
              <a-radio :value="1">
               使用中
              </a-radio>
              <a-radio :value="0">
               未使用
              </a-radio>
             
            </a-radio-group>
          </a-form-item>
         <a-form-item label="关联AppID" v-show="formData.woa_type">
          <a-input
          v-model="formData.woaAppID"
          />
        </a-form-item>
          <a-form-item label="微信小程序">
            <a-radio-group  v-model="formData.aow_type">
              <a-radio :value="1">
               使用中
              </a-radio>
              <a-radio :value="0">
               未使用
              </a-radio>
            </a-radio-group>
          </a-form-item>
         <a-form-item v-show="formData.aow_type"   label="关联AppID">
               <a-input
               v-model="formData.aowAppID"
          />
        </a-form-item>
        <a-form-item label="支付宝小程序">
            <a-radio-group v-model="formData.payapplet_type">
              <a-radio :value="1">
               使用中
              </a-radio>
              <a-radio :value="0">
               未使用
              </a-radio>
             
            </a-radio-group>
          </a-form-item>
       
         <a-form-item v-show="formData.payapplet_type" label="关联AppID">
          <a-input
          v-model="formData.payappletAppID"
          />
        </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
            <a-button @click="store" type="primary">
              保存
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>


     <a-modal
      title="选择坐标后进行复制"
      :visible="mapLog"
      width="800px"
      @ok="mapLog=false"
      @cancel="mapLog=false"
    >
      <iframe src="https://lbs.amap.com/tools/picker" height="600px"  width="100%" id="iframe" style="border:0px;padding:0px;margin:0px"></iframe>
    </a-modal>
  </div>
</template>

<script>
import api from '../../api/set.js'
export default {
    name: 'Basis',
     data: () => ({
       mapLog:false,
       formData:{
         province_id:'',
         name:'',
         district_id:'',
         address:'',
         city_id:''
       },
       city_id:'',
       district_id:'',
       province_id:'',
       shengArr:[],
       shiArr:[],
       xianArr:[],
       lastIndex:'',
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
      },
      previewVisible: false,
      previewImage: '',
      fileList: []
  }),
  
  created(){
    this.userGetProvince(0,'sheng')
    this.setBasicslist()
  },
  computed:{
    lastAddress(){
      this.formData.address=this.formData.address.slice(0,50)
      return this.formData.address.length+'/50'
    }
  },
  methods: {
    shiChange(val){
      this.district_id=''
      this.xianArr=[]
      this.userGetProvince(val,'xian')
    },
    shengChange(val){
      this.city_id=''
      this.district_id=''
      this.shiArr=[]
      this.xianArr=[]
      this.userGetProvince(val,'shi')
    },
    setBasicslist(){
      let that=this
      api.setBasicslist()
        .then(res => {
            that.formData=res.data
            that.fileList=res.data.file.map(item=>{
              item.url=item.path;
              item.status='done'
              item.uid=item.path
              return item
            })

            that.city_id=res.data.city_id
            that.district_id=res.data.district_id
            that.province_id=res.data.province_id
        })
      },
    userGetProvince(pid,type){
      let that=this
      api.userGetProvince({
    "pid":pid})
      .then(res => {
        switch(type){
          case 'sheng':
            that.shengArr=res.data
            
            
          break;
          case 'shi':
            that.shiArr=res.data
          break;
          case 'xian':
            that.xianArr=res.data
          break;
        }
        console.log(res)
        
      })
    },
    store(){
     
      let that=this
      that.formData.files=[]
      for(let i=0;i<that.fileList.length;i++){
        let obj={
          path:that.fileList[i].response?that.fileList[i].response.data:that.fileList[i].url
        }
        that.formData.files.push(obj)
      }
      
      delete that.formData.file
      api.setBasicsset(that.formData)
        .then(res => {
           
        })
      
    },
    mapClick(){

    },
     handleCancel() {
      this.previewVisible = false;
    },
    handleChange({ file,fileList }) {
      this.fileList = fileList
      if(file.status=='error'){
        this.$message.error('上传失败');
        this.fileList = fileList.filter(item=>{
          return item.status=='done'
        });
      }
      if(file.status=='done'){
        this.$message.success(file.response.msg);
      }
      console.log(this.fileList)
      
    }
  }
}
</script>
<style scoped>
  .set-common-wrap{
    background:#fff;
    padding:10px 20px;
    margin:0px auto;
  }
  .header{
    height:80px;
    line-height:60px;
    font-size:18px;
    font-weight:bold;
    border-bottom:1px solid #ccc;
  }
  .map-png{
    width:44px;
    margin-left:10px;
    display:inline-block;
    cursor:pointer;
  }
  .ant-form-item{
    width:800px;
    margin-bottom:16px;
  }
  .form-wrap{
    padding:30px 0;
  }
</style>
