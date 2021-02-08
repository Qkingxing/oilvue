
<template>
  <div class="mainContainreBox">
    <div  class="mainContainreBlock">
      <div   class="container animated fadeIn">
        <div  class="box_one">
          <div  class="left_box">
            <div  class="head_title">
              <span >短信余额</span>
            </div>
            <div  class="sms_total_wrap">
              <div  class="sms_total_item_top">短信（条）</div>
              <div  class="sms_total_item_bottom">
                  <div  class="sms_total_val">0</div>
                  <a-button size="large" type="primary">
                    购买短信
                  </a-button>
              </div>
            </div>
            <div   class="container">
              <div  class="head-title">
                <span >短信发放记录</span>
              </div>
              <div  class="page-content">
              </div>
            </div>
            <a-table class="my-table" :columns="columns" :data-source="data">
              <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
          </div>
            <div  class="right_box"><div  class="head_title"><span >短信设置</span></div><div  class="content">
                <div  class="icon_box" @click="icoClick(1)">
                  <img  src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/06/12/16/b89e25f00b25b33b560abfbe8e90.png">
                  <span >余额预警设置</span>
                </div>
                <div  class="icon_box" @click="icoClick(2)">
                  <img  src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/06/12/16/2af3da3d8792666f09967f0ea991.png">
                  <span >签名管理</span>
                </div>
                <div  class="icon_box" @click="icoClick(3)">
                  <img  src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/06/12/16/eaff44cab40faf63489f90eb46cc.png">
                  <span >短信测试</span>
                </div>
              </div>
            </div>
          </div>
         
          </div>
         
        </div>
  </div>
</template>

<script>
export default {
    name: 'SMSManage',
    data(){
      return{
        data:[
          {
            key: '1',
            name: '时间',
            age: 32,
            address: ''
          },
          {
            key: '2',
            name: '通知名称',
            age: 42,
            address: ''
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: ''
          }
        ],
      columns: [
        {
          title: '时间',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '通知名称',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '任务类型',
          dataIndex: 'address',
          key: 'address 1'
        },
        {
          title: '活动名称',
          dataIndex: 'address',
          key: 'address 2',
        
        },
        {
          title: '数量(条)',
          dataIndex: 'address',
          key: 'address 3',
        
        },
        {
          title: '归属油站',
          dataIndex: 'address',
          key: 'address 4',
        
        },
        {
          title: '创建人',
          dataIndex: 'address',
          key: 'address 4',
        
        },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'address 4',
        
        }
      ]
      }
    },
    methods:{
      icoClick(val){
        
      }
    }
}
</script>
<style scoped>
.my-table{
  box-sizing: border-box;
  width: calc(100% - 11px);
  padding: 0 24px 0 10px;
}
.head-title {
    font-size: 16px;
    font-weight: 700;
    color: #040a46;
    height: 55px;
    line-height: 41px;
    border-bottom: 1px solid #eaeaf4;
   
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    border-bottom: 0;
    font-size: 14px;
    height: auto;
    margin: 24px 0 16px 0;
    line-height: 14px;
}
.mainContainreBox{
  background:#fff;
}
  #components-topLayout .ant-layout-content .mainContainreBox[showbreadcrumb=true] {
    padding-top: 54px;
}
#components-topLayout .ant-layout-content .mainContainreBox {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 0 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#components-topLayout .ant-layout-content .mainContainreBox[usedefault=true] .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    overflow: auto;
}
#components-topLayout .ant-layout-content .mainContainreBox .mainContainreBlock {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}
.box_one {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.box_one .left_box {
    width: calc(100% - 240px);
    padding: 0 24px 0 10px;
}
.box_one .right_box {
    width: 266px;
    height: calc(100% - 54px);
    right: 24px;
    position: absolute;
    background: #fff;
    padding: 0 24px;
    border-left: 16px solid #f5f6f9;
}
.box_one .head_title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 25px 0 16px 8px;
    font-size: 14px;
    color: #1f2e4d;
    white-space: nowrap;
}
.box_one .left_box .sms_total_wrap {
    display: inline-block;
    min-width: 434px;
    height: 138px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fafafa;
    padding: 24px;
}
.box_one .head_title span {
    font-weight: 500;
    line-height: 14px;
}
.box_one .left_box .sms_total_wrap {
    display: inline-block;
    min-width: 434px;
    height: 138px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fafafa;
    padding: 24px;
}
.box_one .left_box .sms_total_wrap .sms_total_item_top {
  color: #040a46;
  font-size: 14px;
}
.box_one .left_box .sms_total_wrap .sms_total_item_bottom {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.box_one .left_box .sms_total_wrap .sms_total_item_bottom .sms_total_val {
    font-weight: 700;
    font-size: 52px;
    margin-right: 133px;
}
.box_one .right_box {
    width: 266px;
    height: calc(100% - 54px);
    right: 24px;
    position: absolute;
    background: #fff;
    padding: 0 24px;
    border-left: 16px solid #f5f6f9;
}
.box_one .right_box .head_title {
    width: 100%;
    border-bottom: 1px solid #e4e7f0;
    padding: 24px 0 16px 0;
}
.box_one .right_box .content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.box_one .head_title{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 25px 0 16px 8px;
    font-size: 14px;
    color: #1f2e4d;
    white-space: nowrap;
}
.box_one .head_title span {
    font-weight: 500;
    line-height: 14px;
}
.box_one .right_box .content .icon_box {
    width: 100%;
    display: flex;
    cursor:pointer;
    align-items: center;
    margin-top: 24px;
}
.box_one .right_box .content .icon_box img {
    width: 38px;
    height: 38px;
    margin-right: 4px;
}
</style>