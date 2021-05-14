<template>
  <a-modal
      :title="title"
      :width="600"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      class="layerWrap"
    >
      <div class="input-wrap">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="选择油站" prop="region">
            <el-select multiple collapse-tags v-model="form.site_id" @change="selectAllSite" placeholder="请选择增减积分的油站" style="width:240px;height: auto; margin-bottom: 5px;">
              <el-option v-for="(item, index) in sitelist" :key="index" :label="item.site_name" :value="item.id"></el-option>
            </el-select>
          </a-form-model-item>
          <a-form-model-item label="减少积分数" prop="region" v-if="type=='reduce'">
            <a-input-number 
              :min="0"
              v-model="form.count"
              :precision="0"
              placeholder="整数" 
              />
            <span>   分</span>
          </a-form-model-item>
          <a-form-model-item label="增加积分数" prop="region" v-if="type=='plus'">
            <a-input-number 
              :min="0"
              v-model="form.count"
              :precision="0"
              placeholder="整数" 
              />
            <span>   分</span>
          </a-form-model-item>
          <a-form-model-item label="备注" prop="region">
            <a-input v-model="form.remark" :maxLength="10" placeholder="请输入减少积分的原因(选填)" style="width:240px;"/>
            <span style="margin-left: -45px; color: rgb(199, 199, 199); position: relative;">{{form.remark.length}}/10</span>
          </a-form-model-item>
        </a-form-model>

      </div>
  </a-modal>
</template>

<script>
import { getSitelist, addIntegral } from '@/api/crm'
import _ from 'lodash'

export default {
  name: 'ChangeIntegral',
  data(){
    return {
      type: 'reduce',
      title: '手动减少积分',
      visible: false,
      confirmLoading: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      form: {
        user_id: undefined,//用户id
        site_id: undefined,//站点id
        count: undefined,//积分变量
        type: undefined,//2是手动添加，需要对应count是正数，8是手动减少，需要对应count是负数。
        remark: ''//备注
      },
      rules: {
        // name: [
        //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
        //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        // ],
      },
      sitelist: [],  // 油站下拉
      oldChooseData: [], // 油站下拉上次的选择

    }
  },
  created(){
    this.Init()
  },
  methods: {
    async Init(){
      // 获取油站列表
      let SitelistRes = await getSitelist({sreach:''})
      // console.log(SitelistRes.data.data)
      if (SitelistRes) {
        this.sitelist = SitelistRes.data.data
        this.sitelist.unshift({
          site_name: '全选',
          id: 'ALL_SELECT'
        })
      }
    },
    resetForm(){
      this.form = {
        user_id: undefined,//用户id
        site_id: undefined,//站点id
        count: undefined,//积分变量
        type: undefined,//2是手动添加，需要对应count是正数，8是手动减少，需要对应count是负数。
        remark: ''//备注
      }
    },
    showModal(obj) {
      this.resetForm()
      // console.log(obj)
      this.type = obj.type
      if (obj.type==="plus") {
        this.title = '手动增加积分'
        this.form.type = 2
      }
      if (obj.type==="reduce") {
        this.title = '手动减少积分'
        this.form.type = 8
      }
      this.form.user_id = obj.user_id
      this.visible = true;
    },
    handleOk(e) {
      // this.confirmLoading = true;

      
      let form = _.cloneDeep(this.form)
      form.user_id = this.$route.query.id

      // console.log(form)
      form.site_id = form.site_id.filter(e=>{
        return e!=="ALL_SELECT"
      })
      // console.log(form)
      if (!form.site_id.length) {
        this.$message.error('请选择加油站')
        return
      }
      if (!form.count) {
        this.$message.error('增减积分不能为0')
        return
      }

      addIntegral(form).then(res=>{
        // console.log(res)
        if (res.data&&res.data.type) {
          this.handleCancel()
          this.$emit('reset')
        }
      })

      

      // this.visible = false;
      // this.confirmLoading = false;
    },
    handleCancel(e) {
      this.visible = false;
    },
    // 全选油站
    selectAllSite (val) {
      
      const allValues = this.sitelist.map(item => {
        return item.id;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];
 
      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.form.site_id = allValues;
      }
      // console.log(oldVal)
      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.form.site_id = [];
      }
 
      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.form.site_id = val;
      }
 
      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.form.site_id = ['ALL_SELECT'].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.oldChooseData = this.form.site_id;


    },
  }
}
</script>

<style lang="less" scoped>
.layerWrap .ant-form-item {
  margin-bottom: 12px;
  margin-top: 4px;
}
</style>