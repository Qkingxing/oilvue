<template>
  <a-layout-content
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        客户导入
      </div>

      <div class="body import_creat">
        <a-form-model
          ref="form"
          :model="form"
          :rules="rules"
          >
          <a-form-model-item label="客户类型" :colon="false">
            <a-checkbox-group
              v-model="checkboxValue"
              name="checkboxgroup"
              :options="plainOptions"
              @change="onChangeRadio"
            />
          </a-form-model-item>

          <a-form-model-item label="  " :colon="false" class="form-item-group" v-if="checkboxValue.length!=0">
            <a-form-model-item label="加油卡名称" prop="card_id" :colon="false" v-if="checkboxValue.includes(1)">
              <a-select v-model="form.card_id" style="width: 200px" placeholder="请选择加油卡名称">
                <a-select-option 
                  v-for="(item,index) in cards"
                  :key="index"
                  :value="item.id">
                  {{item.card_name}}
                </a-select-option>

              </a-select>
            </a-form-model-item>
            <a-form-model-item label="固定等级" prop="level_id" :colon="false" v-if="checkboxValue.includes(2)">
              <a-select v-model="form.level_id" style="width: 200px" placeholder="请选择固定等级">
                <a-select-option 
                  v-for="(item,index) in fixedLevelOptions"
                  :key="index"
                  :value="item.id">
                  {{item.name}}
                </a-select-option>

              </a-select>
            </a-form-model-item>
            <a-form-model-item label="动态等级" :colon="false" v-if="checkboxValue.includes(3)">
              <ul>
                <li
                  v-for="(item,index) in simpleLevels"
                  :key="index">{{item.level_name}}&nbsp;&nbsp;&nbsp;&nbsp;所需成长值：{{item.growth_start}}-{{item.growth_end}}</li>

              </ul>
            </a-form-model-item>
          </a-form-model-item>

          <a-form-model-item label="上传数据" :colon="false" class="form-item-upload form-item-nomargin">
            <div class="upload-wrapper">
              <div class="upload-content">
                <span>
                  <a-upload
                    name="file"
                    accept=".xlsx"
                    :multiple="false"
                    :file-list="fileList"
                    :before-upload="beforeUpload"
                  >
                    <a-button> 上传 </a-button>
                  </a-upload>
                </span>
              </div>
              <div class="upload-tips">当前仅支持xlsx格式的文件（大小在3M以内）</div>
            </div>
          </a-form-model-item>

          <a-form-model-item label="  " :colon="false" class="form-item-desc">
            必须严格按照模板表格的内容填写用户数据，否则可能会出现异常。

            <a 
              href="https://web-static-1258898587.cos.ap-guangzhou.myqcloud.com/mp/static/resource/导入模板.xlsx" 
              download="导入模板">下载导入模板</a>
              
            <br>
            客户信息按照手机号进行关联，没有手机号的客户信息不会同步到客户端。
          </a-form-model-item>

          <a-form-model-item label="  " :colon="false" class="form-item-handle">
            <div>
              <a-checkbox v-model="isAgree">
                我已阅读并同意<a-button type="link"> 《数据导入免责声明》 </a-button>
              </a-checkbox>
            </div>
            <a-button type="primary" @click="save">
              导入
            </a-button>
            <a-button @click="$router.go(-1)" type="info" style="margin-left: 8px;">
              取消
            </a-button>
          </a-form-model-item>
        </a-form-model>


      </div>

    </a-layout-content>
</template>

<script>
import { getlevelAlls } from '@/api/user'
import { querycardlist,simpleLevel,ImportCustomer } from '@/api/crm'

export default {
  name: 'ImportCreat',
  data(){
    return {
      checkboxValue: [],
      plainOptions: [
        { label: '加油卡', value: 1 },
        { label: '固定等级', value: 2 },
        { label: '动态等级', value: 3 },
      ],
      cards: [],
      fixedLevelOptions: [],
      simpleLevels: [],
      fileList: [],
      isAgree: false,
      form:{
        file: undefined,	
        //[file]	是	.xlsx		
        card_id: undefined,	
        //[int]		加油卡id		
        level_id: undefined,	
        //[int]		固定会员id
        is_spalevel: undefined,
        // 动态会员 ，1 开2，关
      },
      rules: {
        card_id: [
          { required: true, message: '请选择加油卡名称', trigger: 'blur' },
        ],
        level_id: [
          { required: true, message: '请选择固定等级', trigger: 'blur' },
        ],
        file: [
          { required: true, message: '请上传文件', trigger: 'blur' },
        ],
        isAgree: [
          { required: true, message: '请阅读并同意', trigger: 'blur' },
        ],
       
      },

    }
  },
  created(){
    this.load()
  },
  methods:{
    async load(){
      // 加油卡下拉
      let cardsRes = await querycardlist()
      // console.log(cardsRes.data)
      this.cards = cardsRes.data
      // 固定等级下拉
      let fixedLevelRes = await getlevelAlls({type:1})
      // console.log(fixedLevelRes.data)
      this.fixedLevelOptions = fixedLevelRes.data
      // 动态等级简表
      let simpleLevelRes = await simpleLevel()
      // console.log(simpleLevelRes.data)
      this.simpleLevels = simpleLevelRes.data

    },
    save(){
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.isAgree) {
            this.$message.error('请阅读并同意')
            return
          }
          if (!this.fileList.length) {
            this.$message.error('请上传文件')
            return
          }
          // console.log(this.form)
          var form = new FormData();
          form.append("file", this.form.file);
          if (this.form.card_id) {
            form.append("card_id", this.form.card_id);
          }
          if (this.form.level_id) {
            form.append("level_id", this.form.level_id);
          }
          if (this.form.is_spalevel) {
            form.append("is_spalevel", this.form.is_spalevel);
          }

          ImportCustomer(form).then((res)=>{
            // console.log(res)
            
            if (res.code==='200') {
              this.$message.success('导入成功')
              this.$router.go(-1)
            }

          })

        } else {
          // console.log('error submit!!');
          return false;
        }
      });
      

      // console.log(this.form)

    },
    onChangeRadio(){
      // console.log(this.checkboxValue)
      // // 数组转字符串
      // let str = this.checkboxValue.toString()
      if (!this.checkboxValue.includes(1)) {
        this.form.card_id = undefined
      }
      if (!this.checkboxValue.includes(2)) {
        this.form.level_id = undefined
      }
      if (this.checkboxValue.includes(3)) {
        this.form.is_spalevel = 1
      }else{
        this.form.is_spalevel = 2
      }
    },
    beforeUpload(file) {
      this.fileList = [];
      this.fileList = [...this.fileList, file];
      this.form.file = file
      return false;
    },

  }
}
</script>

<style lang="less" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  margin-bottom: 15px;
}
.ant-form-item{
  margin-bottom: 16px;
  display: flex;
  
}

.actionBtns {
  display: flex;
  align-items: center;
  margin: 16px 0;
  button {
    margin-right: 8px;
  }
}
.screen-box {
  padding: 27px 0 24px 0;
  .screen-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
}
.search-btn {
  margin-left: 72px;
  margin-top: 8px;
}
.showDataForTable {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal {
    height: 63px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #040a46;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec {
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor {
  color: #7c7ee2;
}
.select-all {
  margin-left: 16px;
  cursor: pointer;
}
</style>
<style lang="scss">
.import_creat{
  .ant-checkbox-group .ant-checkbox-wrapper {
    min-width: 136px;
  }
  .ant-form-item-label{
    width: 129px;
    padding-right: 16px;
    box-sizing: border-box;
  }
  .form-item-upload{
    position: relative;
  } 
  .form-item-nomargin{
    margin-bottom: 0;
  }
  .upload-wrapper{
    position: relative;
    .upload-content{
      width: 410px;
      margin-bottom: 5px;

      
    }
    .upload-tips{
      color: #96a2be;
      font-size: 14px;
    }
  }
  .ant-btn-link{
    padding: 0;
    line-height: 20px;
    height: 20px;
    display: inline-block;
    box-shadow: none;
    min-width: auto;
  }
  .form-item-desc{
    font-size: 14px;
    color: #3e4b6f;
    .ant-form-item-control{
      line-height: 20px;
    }
  }
  .form-item-handle{
    padding-top: 50px;
  }
  .form-item-group{
    .ant-form-item{
      background-color: #fafafa;
      min-height: 80px;
      width: 680px;
      padding-top: 18px;
      box-sizing: border-box;
      margin-bottom: 8px;
    }
    ul{
      padding-left: 0;
    }
  }
}
</style>