
<template>
  <div class="wrap">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="优惠设置">
          <a-form
          v-bind="formItemLayout"
          >
    
          <a-form-item label="默认优惠解析" has-feedback>
          1.用户可同时享受所有优惠<br />
          2.选择使用加油卡支付时，亦可享受优惠<br />
          3.油站可根据自身需要自行修改
          </a-form-item>
          <a-form-item label="优惠券优惠" has-feedback>
            <a-radio-group :options="plainOptions" />
          </a-form-item>
          <a-form-item label="会员等级优惠" has-feedback>
            <a-radio-group :options="plainOptions" />
          </a-form-item>
          <a-form-item label="价立减优惠" has-feedback>
            <a-radio-group :options="plainOptions" />
          </a-form-item>
          <a-form-item label="满减优惠" has-feedback>
            <a-radio-group :options="plainOptions" />
          </a-form-item>
          <div>
            加油卡支付设置
          </div>
           <a-form-item label="加油卡支付" has-feedback>
              <a-checkbox-group
                v-model="value"
                name="checkboxgroup"
                :options="plainOptions2"
               
              />
          </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
              <a-button type="primary">
                修改
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
       
        <a-tab-pane key="3" tab="默认优先级案例">
          <a-form
          v-bind="formItemLayout"
          >
    
          <a-form-item label="默认优惠解析" has-feedback>
         当车主加油时，会员等级优惠与价立减优惠互斥且优惠力度一致时
会员等级优先级高于价立减优先级，故车主享受会员等级优惠
          </a-form-item>
          <a-form-item label="优先级排序" has-feedback>
            <ul  class="sort-list">
              <li >
                <span  class="icon">1</span>
                <span  class="text">会员等级优惠</span>
                <div  class="handle-btn-group">
                  <span  class="handle-btn handle-btn-down">
                    <a-icon type="arrow-down" />
                      
                      </span></div></li><li >
                        <span  class="icon">2</span>
                        <span  class="text">满减优惠</span>
                        <div  class="handle-btn-group">
                          <span  class="handle-btn handle-btn-up">
                            <a-icon type="arrow-up" />
                           </span>
                                <span  class="handle-btn handle-btn-down">
                                 <a-icon type="arrow-down" />
                                      </span></div></li><li >
                                        <span  class="icon">3</span>
                                      <span  class="text">优惠券优惠</span>
                                      <div  class="handle-btn-group">
                                        <span  class="handle-btn handle-btn-up">
                                          <a-icon type="arrow-up" />
                                         </span>
                                            <span  class="handle-btn handle-btn-down">
                                              <a-icon type="arrow-down" />
                                           </span></div></li><li >
                                            <span  class="icon">4</span>
                                            <span  class="text">价立减优惠</span>
                                          <div  class="handle-btn-group">
                                            <span  class="handle-btn handle-btn-up">
                                            <a-icon type="arrow-up" /></span></div></li></ul>
          </a-form-item>
         
         
         
         
          
            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
              <a-button type="primary">
                修改
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
  </div>
</template>

<script>
export default {

    name: 'Discount',
    data: () => ({
      plainOptions :['互斥优惠', '并行优惠'],
      plainOptions2 :['优惠券优惠', '价立减优惠', '会员等级优惠', '满减优惠'],
      value:[],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
    }),
    methods:{}
    
}
</script>
<style scoped>
  .wrap{
    /* margin-top:10px; */
    padding:20px;
    min-height:100%;
    background:#fff;
  }
  .sort-list {
    border: 1px solid #ccc;
    
    box-sizing: border-box;
    width: 340px;
}
.sort-list li .icon {
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #ccc;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    margin-right: 20px;
}
.sort-list li .text {
   
    flex: 1;
}
.sort-list li .handle-btn-group {
    width: 60px;
}
.sort-list li .handle-btn-group .handle-btn{
    font-weight: 700;
    font-size: 16px;
}
.sort-list li .handle-btn-group .handle-btn .anticon {
    color: #3c3c46;
   
    transition: color .3s ease;
    padding: 3px;
}
  .sort-list li {
   
    display: flex;
  
    justify-content: space-between;
   
    align-items: center;
    padding: 10px 20px;
    height: 56px;
   
    box-sizing: border-box;
}
</style>
