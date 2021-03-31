<template>

  <a-layout-content
    id="ruleEdit"
    :style="{
      padding: '0 24px 24px 24px',
      background: '#fff',
      minHeight: '600px',
      position: 'relative'
    }"
  >
    <div class="list">
      <div class="page-block">
        <div class="head-title">
          成长值设置
        </div>
        <div class="page-content">
          <div class="growth-setting">
            <div class="setting-item">
              <div class="setting-title">生效时间</div>
              <div class="setting-content flex items-center">
                <a-date-picker
                  :allowClear="false"
                  v-model="form.date"
                  format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  style="min-width: 195px; width: 220px;"
                  @change="onChangeDate"
                />
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-title">生效油站</div>
              <div class="setting-content">{{userInfo.group_name}}</div>
            </div>
            <div class="setting-item">
              <div class="setting-title">支付限制</div>
              <div class="setting-content" style="display: flex; align-items: center;">

                <a-select v-model="form.zf_type" style="min-width: 240px" mode="multiple" placeholder="请选择支付方式">
                  <a-select-option 
                    v-for="(item, index) in payList"
                    :key="index"
                    :value="item.id">
                    {{item.name}}
                  </a-select-option>
                </a-select>

              </div>
            </div>
            <div class="setting-item">
              <div class="setting-title">成长值累积门槛</div>
              <div class="setting-content flex items-center" :class="{'error':form.threshold_err}" >
                <span>订单实付金额大于</span>
                <a-input-number 
                  v-model="form.threshold" 
                  @blur="checkItem('threshold')" 
                  placeholder="金额" :min="0" :precision="2" :step="0.01"/>
                <span>元时，才计算成长值</span>
                <a-alert v-if="form.threshold_err" type="error" message="请输入大于等于0的金额，支持两位小数" banner />
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-title">成长值累积规则</div>
              <div class="setting-content" >
                <div class="growth-rule flex items-center" :class="{'error':form.cumulative_err}">
                  <el-select 
                    multiple 
                    collapse-tags 
                    v-model="form.rules_oils_id"
                    @change="selectAlloil"
                    placeholder="请选择油品类型" 
                    style="width: 220px;margin-right: 10px;">
                    <el-option v-for="(oilItem, oilIndex) in oilList" :key="oilIndex" :label="oilItem.oils_name" :value="oilItem.id"></el-option>
                  </el-select>
                  <span>每消费1元，累积</span>
                  <a-input-number 
                    v-model="form.cumulative" 
                    @blur="checkItem('cumulative')" 
                    placeholder="整数" :min="1" :precision="0"/>
                  <span>个成长值</span>
                  <a-alert v-if="form.cumulative_err" type="error" message="请输入大于0的整数" banner />
                </div>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-title">成长值扣减周期</div>
              <div class="setting-content flex items-center" :class="{'error':form.deductions_deductions_err}">
                <a-input-number 
                  v-model="form.deductions_deductions" 
                  @blur="checkItem('deductions_deductions')" 
                  placeholder="整数" :min="1" :precision="0" style="margin-left: 0px;"/>
                <span>天</span>
                <div class="tips">用户每隔一段时间扣取一定量的成长值，并以当前成长值重新定级</div>
                <a-alert v-if="form.deductions_deductions_err" type="error" message="请输入大于0的整数" banner />
              </div>
            </div>
          </div>
          <div class="growth-level">
            <div class="level-title">等级设置</div>
            <div class="level-content">
              <div 
                class="level-block"
                v-for="(item,index) in form.levelList"
                :key="index">
                <div class="block-title">Lv{{item.level}}等级设置</div>
                <div class="block-content-item flex items-center">
                  <div class="content-item-left">等级名称</div>
                  <div class="content-item-right">
                    <div :class="{'error':item.level_name_err}">
                      <a-input 
                        v-model="item.level_name" 
                        @blur="checkItem('level_name',index)"
                        :maxLength="8" placeholder="请输入等级名称" style="width: 300px; padding-right: 50px;"/>
                      <div class="input-count">{{item.level_name.length}}/8</div>
                    </div>
                    <a-alert v-if="item.level_name_err" type="error" message="请输入等级名称" banner />
                  </div>
                </div>
                <div class="block-content-item flex" style="height: auto; margin: 10px 0px;">
                  <div class="content-item-left">等级模板</div>
                  <div class="content-item-right">
                    <div class="upload">
                      <a-upload
                        name="file"
                        list-type="picture-card"
                        :show-upload-list="false"
                        action="https://oiljava.ldyxx.com:4435/goods/FileImg"
                        @change="(info)=>handleChange(info,index)"
                      >
                        <div class="img-wrapper">
                          <img :src="item.level_icon" alt="level_template">
                          <div class="changetip">重新上传</div>
                        </div>
                      </a-upload>
                      <div class="tips" style="margin-bottom: 20px;">图片建议尺寸660像素*380像素，大小不超过1M</div>
                    </div>
                  </div>
                </div>
                <div class="block-content-item flex items-center">
                  <div class="content-item-left">所需成长值</div>
                  <div class="content-item-right flex items-center">
                    <a-input-number 
                      v-model="item.growth_start" 
                      @blur="checkItem('growth_start',index)"
                      :disabled="index===0" placeholder="整数" :min="0" :precision="0" style="width: 90px;"/>
                    <div style="width: 30px; text-align: center;">-</div>
                    <a-input-number 
                      v-model="item.growth_end" 
                      @blur="checkItem('growth_end',index)"
                      placeholder="整数" :min="1" :precision="0" style="width: 90px;"/>
                    <a-alert v-if="item.growth_start_err||item.growth_end_err" type="error" message="请输入成长值" banner />
                  
                    <a-alert v-if="item.growth_start_err2||item.growth_end_err2" type="error" message="右侧区间值需大于左侧区间值" banner />

                    <a-alert v-if="item.growth_start_err3||item.growth_end_err3" type="error" message="左侧区间值=上一等级右侧区间值+1" banner />
                  </div>
                </div>
                <div class="block-content-item flex items-center">
                  <div class="content-item-left">周期扣减值</div>
                  <div class="content-item-right flex items-center">
                    <a-input-number 
                      v-model="item.deductions" 
                      @blur="checkItem('deductions',index)"
                      placeholder="整数" :min="0" :precision="0" style="width: 90px;"/>
                  </div>
                  <a-alert v-if="item.deductions_err" type="error" message="请输入扣减成长值" banner />
                  
                </div>
                <div class="block-content-item flex" style="height: auto;">
                  <div class="content-item-left" style="line-height: 60px;">等级优惠</div>
                  <div class="content-item-right" style="display: block;">
                    <div class="discount flex items-center">
                      <span>消费</span>
                      <el-select 
                        multiple 
                        collapse-tags 
                        v-model="item.oils_id"
                        @change="(val)=>selectAllOilRule(val,index)"
                        placeholder="请选择油品类型" 
                        style="width: 180px;margin: 0px 10px;">
                        <el-option v-for="(oilItem, oilIndex) in oilList" :key="oilIndex" :label="oilItem.oils_name" :value="oilItem.id"></el-option>
                      </el-select>
                      <span>每升优惠</span>
                      <a-input-number 
                        v-model="item.preferential" 
                        @blur="checkItem('preferential',index)"
                        placeholder="整数" :min="0" :precision="2" :step="0.01" style="width: 90px; margin: 0px 10px;"/>
                      <span>元</span>
                      <a-alert v-if="item.preferential_err" type="error" message="请输入优惠金额" banner />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="operator" style="margin-top: 20px;">
            <a-button @click="addlevel" type="dashed" icon="plus" style="margin-right: 10px;">添加等级</a-button>
            <a-button @click="dellevel" :disabled="form.levelList.length==1">删除等级</a-button>
          </div>
        </div>
        <div class="page-foot">
          <a-button type="primary" @click="save">确认</a-button>
          <a-button @click="back">取消</a-button>
        </div>

      </div>
    </div>
  </a-layout-content>

</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import moment from 'moment';
import { getPayList } from '@/api/base'
import { getGroupolilist } from '@/api/oil'
import { addMemberSpalevel } from '@/api/crm'

export default {
  name: 'GrowEdit',
  components: {

  },
  data () {
    return {
      oldChooseData: [],
      level_icon:[
        'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/f55e875d1831364420e5297c206c.png',
        'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/ab255ec817103961bab38ed27dcb.png',
        'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/7b419b126b1c9e561f1deacbe32e.png',
        'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/c8eeb02c749af07ff40456bcb75a.png',
        'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/a12f5a7095bb0fc5b8e73d6d294e.png',
        'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/bbd6e360eaea55abeb111ebf9fad.png',
        'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/e82f2487eb569259798864e94b23.png',
      ],
      form: {
        date: moment(new Date()).add(1,'days').startOf('day'), // 生效时间 年月日 不要时分秒！
        star_time: moment(new Date()).add(1,'days').startOf('day').format('YYYY-MM-DD'), // 生效时间 年月日 不要时分秒！
        zf_type: [], // 逗号分隔支付方式
        threshold: null, //成长值累积门槛 订单实付金额大于 元时，才计算成长值请输入大于等于0的金额，支持两位小数
        rules_oils_id: [], // 成长值累积规则存储字符串油品id,号分割
        cumulative: null, // 累计成长值
        deductions_deductions: null, // 周期
        levelList:[
          {
            level: 1, // 等级
            level_name: '', // 等级名称
            level_icon: 'https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/01/08/19/f55e875d1831364420e5297c206c.png', // 等级模板
            growth_start: 0, // 所需成长值至起头
            growth_end: null, // 所需成长值至结尾
            deductions: null, // 周期扣减值
            oils_id: [], // 油品id存储多个字符串以,分割
            oldChooseData: [],
            preferential: null, // 每升优惠
            // effect: 1,// 1生效中，2待生效，3停用状态
          }
        ]


      },
      payList: [],
      oilList: []
    }
  },
  props:{
    pageType:{
      type: String
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
    moment,
    async Init(){
      // 获取支付方式列表
      let payRes = await getPayList()
      // console.log(payRes.data)
      if (payRes) {
        this.payList = payRes.data
      }
      // 获取油品下拉
      let oilRes = await getGroupolilist()
      // console.log(oilRes)
      this.oilList = oilRes.data
      this.oilList.unshift({
        oils_name: '全选',
        id: 'ALL_SELECT'
      })







    },
    save(){
      // console.log(this.form)
      this.checkForm().then((total_data)=>{
        console.log(total_data)
        addMemberSpalevel(total_data).then((res)=>{
          console.log(res)
        })


      }).catch(()=>{})
    },
    onChangeDate(date, text){
      // console.log(date)
      // console.log(text)
      this.form.star_time = text
    },
    // 表单校验
    checkForm(){
      return new Promise((resolve, reject)=>{
        let isError = false
        let erroeText = '设置存在错误，请检查设置内容'
        let form = _.cloneDeep(this.form)
        let total_data = []
        // 支付
        if (!form.zf_type.length) {
          isError = true
        }
        form.zf_type = form.zf_type.join(',')
        // 成长门槛
        if (this.checkItem('threshold')) {
          isError = true
        }
        // 油品
        let rules_oils_id = form.rules_oils_id.filter(e=>{
          return e!=='ALL_SELECT'
        })
        if (!rules_oils_id.length) {
          isError = true
        }
        rules_oils_id = rules_oils_id.join(',')
        // 成长值
        if (this.checkItem('cumulative')) {
          isError = true
        }
        // 成长周期
        if (this.checkItem('deductions_deductions')) {
          isError = true
        }
        // 生成循环列表
        form.levelList.forEach((e,index)=>{
          // 等级名称
          if (this.checkItem('level_name',index)) {
            isError = true
          }
          // 成长值
          if (this.checkItem('growth_start',index)) {
            isError = true
          }
          if (this.checkItem('growth_end',index)) {
            isError = true
          }
          // 周期扣减值
          if (this.checkItem('deductions',index)) {
            isError = true
          }
          // 油品
          let oils_id = e.oils_id.filter(e=>{
            return e!=='ALL_SELECT'
          })
          if (!oils_id.length) {
            isError = true
          }
          oils_id = oils_id.join(',')
          // 优惠金额
          if (this.checkItem('preferential',index)) {
            isError = true
          }

          let obj = {
            ...e,
            star_time: form.star_time,
            oils_id,
            zf_type: form.zf_type,
            threshold: form.threshold,
            rules_oils_id,
            cumulative: form.cumulative,
            deductions_deductions: form.deductions_deductions,
          }
          total_data.push(obj)
        })

        if (isError) {
          this.$message.error(erroeText)
          reject()
        }else{
          resolve(total_data)
        }
      })
    },
    // 校验单条
    checkItem(key,index){
      let isErr = false
      // 头部公用
      if (typeof index==='undefined') {
        if (this.form[key]===null||this.form[key]==='') {
          this.$set(this.form, `${key}_err`, true)
          isErr = true
        }else{
          this.$set(this.form, `${key}_err`, false)
        }
      }else{
        // 列表循环
        if (this.form.levelList[index][key]===null||this.form.levelList[index][key]==='') {
          this.$set(this.form.levelList[index], `${key}_err`, true)
          isErr = true
        }else{
          this.$set(this.form.levelList[index], `${key}_err`, false)
        }
        // 如果是成长值
        if (index!==0&&(key==='growth_start'||key==='growth_end')) {
          let start = this.form.levelList[index]['growth_start']
          let end = this.form.levelList[index]['growth_end']
          // 获取上一个等级，用于比较数值
          let prevItem = this.form.levelList[index-1]

          // console.log(prevItem)
          // 右边大于左边
          if (end > start) {
            this.$set(this.form.levelList[index], 'growth_start_err2', false)
            this.$set(this.form.levelList[index], 'growth_end_err2', false)
          }else{
            this.$set(this.form.levelList[index], 'growth_start_err2', true)
            this.$set(this.form.levelList[index], 'growth_end_err2', true)
            isErr = true
          }
          // 左边大于上一级的右边
          if (start > prevItem.growth_end) {
            this.$set(this.form.levelList[index], 'growth_start_err3', false)
            this.$set(this.form.levelList[index], 'growth_end_err3', false)
          }else{
            this.$set(this.form.levelList[index], 'growth_start_err3', true)
            this.$set(this.form.levelList[index], 'growth_end_err3', true)
            isErr = true
          }
        }
      }
      return isErr
    },
    // 删除一个等级
    dellevel(){
      this.form.levelList.splice(this.form.levelList.length-1,1)
    },
    // 新增一个等级
    addlevel(){
      let obj = {
        // level: 1, // 等级
        level_name: '', // 等级名称
        // level_icon: null, // 等级模板
        growth_start: null, // 所需成长值至起头
        growth_end: null, // 所需成长值至结尾
        deductions: null, // 周期扣减值
        oils_id: [], // 油品id存储多个字符串以,分割
        oldChooseData: [],
        preferential: null, // 每升优惠
        // effect: 1,// 1生效中，2待生效，3停用状态
      }

      obj.level = this.form.levelList.length+1

      let level_icon = this.level_icon[obj.level-1] || this.level_icon[this.level_icon.length-1]

      obj.level_icon = level_icon

      this.checkForm().then(()=>{
        this.form.levelList.push(obj)
      }).catch(()=>{})
      
    },
    // 全选油站
    selectAlloil (val) {
      const allValues = this.oilList.map(item => {
        return item.id;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];
 
      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.form.rules_oils_id = allValues;
      }
      // console.log(oldVal)
      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.form.rules_oils_id = [];
      }
 
      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.form.rules_oils_id = val;
      }
 
      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.form.rules_oils_id = ['ALL_SELECT'].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.oldChooseData = this.form.rules_oils_id;
    },
    // 全选油站
    selectAllOilRule (val, index) {
      const allValues = this.oilList.map(item => {
        return item.id;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.form.levelList[index].oldChooseData.length > 0 ? this.form.levelList[index].oldChooseData : [];
 
      // 若选择全部
      if (val.includes('ALL_SELECT')) {
        this.form.levelList[index].oils_id = allValues;
      }
      // console.log(oldVal)
      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        this.form.levelList[index].oils_id = [];
      }
 
      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        this.form.levelList[index].oils_id = val;
      }
 
      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) {
          this.form.levelList[index].oils_id = ['ALL_SELECT'].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.form.levelList[index].oldChooseData = this.form.levelList[index].oils_id;
    },
   // 禁止选择今天之前的时间
    disabledDate(current) {
      return current && current < moment().endOf('day');
    },
    // 上传图片回调
    handleChange(info,index){
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        let url = info.file.response.data
        // console.log(url)
        this.form.levelList[index].level_icon = url
      }
      if (info.file.status === 'done') {
        this.$message.success(`上传成功`);
      } else if (info.file.status === 'error') {
        this.$message.error(`上传失败`);
      }
    },
    back(){
      this.$emit('back')
    }
  }
}
</script>
<style lang="less" scoped>
.items-center{
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.flex{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.add-rule {
  position: absolute;
  right: 24px;
  top: 10px;
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
.page-foot{
  text-align: center;
  margin-top: 50px;
  .ant-btn{
    margin-right: 20px;
  }
}

.setting-item {
  display: flex;
  height: 60px;
  line-height: 60px;
  position: relative;
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
.growth-level{
  margin-top: 15px;
  .level-title{
    font-size: 16px;
    font-weight: 600;
    line-height: 60px;
  }
}
.level-block{
  border: 1px solid #eaeaf4;
  margin-bottom: -1px;
  padding-bottom: 30px;
  .block-title{
    font-size: 14px;
    color: #000;
    font-weight: 600;
    padding: 20px 0;
    margin-top: 20px;
    width: 110px;
    text-align: right;
  }
  .block-content-item{
    height: 60px;
    .content-item-left{
      width: 86px;
      text-align: right;
      margin-right: 20px;
    }
    .content-item-right{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      .tips{
        font-size: 12px;
        color: #9696a0;
      }
      .discount{
        height: 60px;
      }
    }
  }
}
#ruleEdit{
  .error{
    .ant-input{
      border-color: #ff4646;
    }
    .ant-input-number{
      border-color: #ff4646;
    }
  }
  .setting-item{
    .ant-input-number{
      margin: 0 10px;
      margin-right: 10px;
    }
    .tips{
      position: absolute;
      bottom: -1.5em;
      font-size: 12px;
      line-height: 1em;
      color: #9696a0;
    }
  }
  .setting-title{
    line-height: 60px;
  }
  .setting-content{
    line-height: 60px;
  }
  .input-count{
    display: inline-block;
    position: relative;
    z-index: 9;
    width: 40px;
    margin-left: -40px;
    color: #c7c7c7;
  }
  .ant-alert.ant-alert-error{
    border: none;
    background: transparent;
    color: #ff4646;
  }
}

</style>
<style lang="less">
.level-block{
  .block-content-item{
    .content-item-right{
      .img-wrapper{
        position: relative;
        width: 166px;
        height: 100px;
        border-radius: 0;
        img{
          border-radius: 0;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
        .changetip{
          position: absolute;
          bottom: 0;
          display: block;
          width: 100%;
          background-color: rgba(0,0,0,.6);
          font-size: 14px;
          color: #fff;
          line-height: 25px;
          height: 25px;
        }
      }
      .ant-upload{
        padding: 0;
        &,.ant-upload-select-picture-card{
          border-radius: 0;
        }

      }
    }
  }
}
</style>