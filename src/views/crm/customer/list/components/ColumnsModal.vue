
<template>
  <a-modal v-model="visible" :title="title" on-ok="handleOk" :width="600">
    <div class="fieldsModalHeader">
      <div class="headerLeft">可选字段</div>
      <div class="headerRight">
        <span style="margin-right: 16px" @click="resetCol">重置</span>
        <span @click="defaultCol">恢复默认</span>
      </div>
    </div>
    <div class="fieldsModalBody">
      <div class="fieldsModalBodyItem" v-for="(item, index) in oldcolumns" :key="index">
        <a-checkbox :disabled="item.disabled" v-model="item.show"> {{ item.title }} </a-checkbox>
      </div>
    </div>

    <template slot="footer">
      <a-button key="back" @click="handleCancel"> 取消 </a-button>

      <a-button key="submit" type="primary" :loading="loading" @click="handleOk"> 确认 </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: 'ColumnsModal',
  data() {
    return {
      title: '自定义展示',
      visible: false,
      loading: false,
      oldcolumns: [
        {
          title: '客户编号',
          dataIndex: 'id',
          key: 'id',
          disabled: true,
          show: true,
          default: true,
        },
        {
          title: '客户子编号',
          dataIndex: 'sonnumber',
          key: 'sonnumber',
          disabled: true,
          show: true,
          default: true,
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          disabled: true,
          show: true,
          default: true,
        },
        {
          title: '偏好油站',
          dataIndex: 'name',
          key: 'name',
          disabled: true,
          show: true,
          default: true,
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          key: 'nickname',
          show: true,
          default: true,
        },
        {
          title: '是否消费油品',
          dataIndex: 'is_consumption',
          key: 'is_consumption',
          show: true,
          default: true,
        },
        {
          title: '加油升数',
          show: true,
          default: true,
          //   dataIndex: 'l_number',
          //   key: 'l_number',
        },
        {
          title: '加油次数',
          show: true,
          default: true,
          //   dataIndex: 'l_count',
          //   key: 'l_count',
        },
        {
          title: '最近加油时间',
          show: true,
          default: true,
          //   dataIndex: 'last_time',
          //   key: 'last_time',
        },
        {
          title: '偏好油品',
          show: true,
          default: true,
          //   dataIndex: 'name',
          //   key: 'name',
        },
        {
          title: '会员等级',
          show: true,
          default: true,
          //   dataIndex: 'level_id',
          //   key: 'level_id',
        },
        {
          title: '现有积分',
          show: true,
          default: true,
          //   dataIndex: 'integral',
          //   key: 'integral',
        },
        {
          title: '加油卡余额',
          show: true,
          default: true,
          //   dataIndex: 'money',
          //   key: 'money',
        },
        {
          title: '客户身份',
          show: true,
          default: true,
          //   dataIndex: 'type',
          //   key: 'type',
        },
        {
          title: '车牌号',
          show: true,
          default: true,
          //   dataIndex: 'plate_number',
          //   key: 'plate_number',
        },
        {
          title: '近30天消费金额',
          show: true,
          //   dataIndex: 'plate_number',
          //   key: 'plate_number',
        },
        {
          title: '近60天消费金额',
          show: true,
          //   dataIndex: 'plate_number',
          //   key: 'plate_number',
        },
        {
          title: '近30天消费升数',
          show: true,
          //   dataIndex: 'plate_number',
          //   key: 'plate_number',
        },
        {
          title: '近60天消费升数',
          show: true,
          //   dataIndex: 'plate_number',
          //   key: 'plate_number',
        },
        {
          title: '近30天消费次数',
          show: true,
          //   dataIndex: 'plate_number',
          //   key: 'plate_number',
        },
        {
          title: '近60天消费次数',
          show: true,
          //   dataIndex: 'plate_number',
          //   key: 'plate_number',
        },
        {
          title: '注册时间',
          show: true,
          //   dataIndex: 'plate_number',
          //   key: 'plate_number',
        },
      ],
    }
  },
  methods: {
    defaultCol(){
      this.oldcolumns.forEach((e,i)=>{
        if (e.default) {
          e.show = true
        }else{
          e.show = false
        }
      })
    },
    resetCol(){

      this.oldcolumns.forEach((e,i)=>{
        if (!e.disabled) {
          e.show = false
        }
      })
    },
    show() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    handleOk() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  .modal-box {
    min-height: 120px;
    padding-top: 20px;
  }
}
.fieldsModalHeader {
  padding: 15px 0;
  border-bottom: 1px solid #e4e7f0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 14px;
  display: flex;
  .headerLeft {
    color: #1f2e4d;
  }
  .headerRight {
    color: #7C7EE2;
    flex: 1;
    text-align: right;
    span {
      cursor: pointer;
    }
  }
}
.fieldsModalBody {
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;
  .fieldsModalBodyItem {
    width: 25%;
    .ant-checkbox-wrapper {
      white-space: nowrap;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3e4b6e;
      line-height: 40px;
    }
  }
}
</style>
