
<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">

      <a-tabs default-active-key="1" size="large">
        <a-tab-pane key="1" tab="设备绑定">
         <div class="head-device">
           自助机序列号
         </div>
         <div class="subhead-device">
           SN码是产品的序列号，请在收到自助机的第一时间与对应油站进行绑定。在未绑定的情况下打开U-Pay会自动提示SN码序列号
         </div>
         <ul class="device-wrap">
           <li class="device-item" v-for="(item,index) in snList" :key="index">
             <span class="left-device">SN码</span>
             <a-input style="width:300px" placeholder="请输入SN码" />
             <span class="del-device">删除</span>
             <span class="del-device">添加</span>
           </li>
         </ul>
         <div class="device-store">
            <a-button type="primary">
              保存
            </a-button>
         </div>
        
        </a-tab-pane>
        <a-tab-pane key="2" tab="屏幕广告">
          <div class="print-upload">
            <span class="print-left">
              上传广告
            </span>
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture-card"
              :file-list="fileList"
            
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
          <div class="print-guanggao">
            <span class="print-left">
              广告间隔
            </span>
            <a-input-number id="inputNumber"  :min="1" :max="10"  />
            <span style="padding-left:12px">秒</span>
          </div>
          <div class="print-set">
            <span class="print-left">
              广告设置
            </span>
            <span class="no-operator">
              屏幕无操作
            </span>
             <a-input-number id="inputNumber"  :min="1" :max="10"  />
            <span class="time">
             秒，自动显示待机广告
            </span>
          </div>
           <div class="device-store">
            <a-button type="primary">
              保存
            </a-button>
         </div>
        </a-tab-pane>
       
      </a-tabs>
    </a-layout-content>

  </a-layout>
</template>

<script>
import { STable } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'business',
  components: {
    STable
  },
  data () {
    return {
       previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
       
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
      ],
      snList:[{},{}],
      // 表头
      columns:[
        {
          dataIndex: '业务类型',
          title: '业务类型',
          key: 'name'
        },
         {
          dataIndex: '支付方式',
          title: '支付方式',
          key: '支付方式'
        },
        {
          dataIndex: '生效时间',
          title: '生效时间',
          key: '生效时间'
        },
        {
          dataIndex: '普通受理规则',
          title: '普通受理规则',
          key: '普通受理规则'
        },
        {
          dataIndex: '特殊受理规则',
          title: '特殊受理规则',
          key: '特殊受理规则'
        },
         {
          dataIndex: '操作人',
          title: '操作人',
          key: '操作人'
        },
         {
          dataIndex: '操作',
          title: '操作',
          key: '操作'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
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
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
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
    }
  }
}
</script>
<style lang="less" scoped>
.print-left{
  display:inline-block;
  width:100px;
}
// .print-set .time{
  
// }
// .print-set .no-operator{
  
// }
.print-guanggao{
  margin:12px 0 20px 0;
  padding-left:88px;
}
.print-upload{
  display:flex;
}
.device-wrap{
  padding-left:160px!important;
  margin-top:80px!important;
}
.device-item{
  margin-bottom:16px;
}
.del-device{
  padding-left:20px;
  color:blue;
  cursor:pointer;
}
.device-store{
  margin-top:80px;
  padding-left:250px!important;
}
.left-device{
  padding-right:30px;
}
.head-device{
  text-align: center;
  font-size:20px;
  margin:40px 0 10px 0;
}
.subhead-device{
  text-align: center;
 
}
.head-title{
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}
.invoice-card-box{
  position: relative;
  height: 128px;
  width: 242px;
  display: inline-block;
  text-align: center;
  margin-right: 20px;
  margin-bottom: 16px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
  .box-title{
    position: absolute;
    top: 30px;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    color: #3c3c46;
  }
  .box-content{
    position: absolute;
    top: 63px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    .value{
      font-size: 34px;
      line-height: 34px;
      color: #040a46;
    }
    .unit {
      font-size: 12px;
      color: #040a46;
      margin-left: 5px;
      transform: translateY(-1px);
    }
  }
}
.customer-statistics{
  margin-top: 30px;
  width: 102%;
  .invoice-card-box{
    height: 108px;
    width: 271px;
    box-shadow: none;
    border: 1px solid #eaeaf4;
    .box-title{
      text-align: left;
      top: 24px;
      left: 24px;
    }
    .box-content{
      top: 49px;
      left: 24px;
      text-align: left;
      justify-content: start;
      .value{
        color: #7C7EE2;
      }
    }
  }
}
.filterContentContainer{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .screen{
    font-size: 12px;
    line-height: 22px;
    min-height: 40px;
    display: flex;
    align-items: center;
    .screen-li {
      display: inline-block;
      width: 48px;
      height: 24px;
      line-height: 24px;
      margin-right: 20px;
      text-align: center;
      color: #040a46;
      font-size: 12px;
      cursor: pointer;
      &.active{
        background-color: #ecf3ff;
        border-radius: 3px;
        color: #3c85ff;
      }
    }
  }
}
.showDataForTable{
  position: relative;
  display: block;
  width: 100%;
  padding-bottom: 60px;
  margin-top: 20px;
}

.current-exprot{
  border-color: #81a8f7;
  color: #81a8f7;
  margin-left: 15px;
}
</style>

