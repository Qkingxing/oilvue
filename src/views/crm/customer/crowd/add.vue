
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        <span>
          基础信息
        </span>
      </div>
      <div class="select-info">
        <div class="label">客群名称</div>
        <a-form layout="inline">
          <a-form-item>
            <a-input :maxLength="10" placeholder="请输入标签名称" style="width:300px;"/>
            <span style="margin-left: -45px; color: rgb(199, 199, 199); position: relative;">10/10</span>
          </a-form-item>
        </a-form>
      </div>
      <div class="select-info">
        <div class="label">
          客群类型&nbsp;
          <a-popover placement="rightTop">
            <template slot="content">
              <div>固定人群：创建分群后人群数量固定不变，只有手动刷新才会更新数据（数据截止到昨日24点)</div>
              <div>条件人群：创建分群后人群数量会自动更新（实时数据）</div>
            </template>
            <a-icon style="color: rgb(153, 153, 153);" type="question-circle" />
          </a-popover>
        </div>
        <a-radio-group name="radioGroup" :default-value="1" style="line-height: 40px;">
          <a-radio :value="1" style="margin-right: 70px;">
            固定人群
          </a-radio>
          <a-radio :value="2">
            条件人群
          </a-radio>
        </a-radio-group>
      </div>
      <div class="head-title" style="margin-top: 20px;"><span>筛选条件</span></div>
      <div class="select_wrap">
        <el-cascader
          style="width: 700px;"
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover', multiple: true }"
          @change="handleChange"
        ></el-cascader>
        <span class="select_count">已选择{{value.length}}项</span>
      </div>
      <div class="customer-attr-info">
        <a-empty />
      </div>
      <div class="select-attr-box">
        <div class="customer-attr-info">
          <div class="title">基础属性</div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>

export default {
  name: 'CrmCrowdAdd',
  components: {},
  data () {
    return {
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则'
            },
            {
              value: 'daohang',
              label: '导航'
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic'
            },
            {
              value: 'form',
              label: 'Form'
            },
            {
              value: 'data',
              label: 'Data'
            },
            {
              value: 'notice',
              label: 'Notice'
            },
            {
              value: 'navigation',
              label: 'Navigation'
            },
            {
              value: 'others',
              label: 'Others'
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ]
    }
  },
  created () {},
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>
<style lang="less" scoped>

.head-title{
  font-size: 14px;
  line-height: 44px;
  font-weight: 500;
  border-bottom: 1px solid #eaeaf4;
  margin-bottom: 24px;
  margin-top: 8px;
}
.select-info{
  display: flex;
  margin-bottom: 16px;
  .label{
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    margin-right: 20px;
    color: #1e1e28;
    font-size: 14px;
  }
}
.select_wrap{
  display: flex;
  align-items: center;
  .select_count{
    margin-left: 20px;
    font-size: 14px;
  }
}
.customer-attr-info{
  width: 100%;
  height: auto;
  min-height: 144px;
  border: 1px solid #eaeaf4;
  margin-top: 16px;
  padding: 24px;
  box-sizing: border-box;
}
.select-attr-box{
  .customer-attr-info{
    width: 100%;
    height: auto;
    min-height: 144px;
    border: 1px solid #eaeaf4;
    margin-top: 16px;
    padding: 24px;
    box-sizing: border-box;
    .title{
      color: #1e1e28;
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
}
</style>
