
<template>
  <div class="wrap">
     <div class="setting_wrap" v-show="indexShow">
    <a-row class="header" type="flex" justify="space-between">
      <a-col :span="12">
        活动通知
      </a-col>
      <a-col :span="12" style="text-align:right">
        <a-select default-value=" wx40799aa8652a0a71" style="width: 220px">
        <a-select-option value="jack">
           wx40799aa8652a0a71
        </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <div class="index-wrap">
      <div  class="setting_list">
      <div  class="span list_title">油价调整</div>
        <div  class="list_child">
          <span  class="child_name">挂牌价调整</span>
           
          <a-switch default-checked  />
        </div>
     
       
      </div>

      <div  class="setting_list">
      <div  class="span list_title">优惠券</div>
        <div  class="list_child">
          <span  class="child_name">优惠券发放</span>
           
          <a-switch default-checked  />
        </div>
        <div  class="list_child">
          <span  class="child_name">优惠券到期</span>
          <a-switch default-checked  />
        </div>
      
      </div>


      <div  class="setting_list">
      <div  class="span list_title">营销活动</div>
        <div  class="list_child">
          <span  class="child_name">价立减</span>
            <a-button type="link">
              修改
            </a-button>
          <a-switch default-checked  />
        </div>
        <div  class="list_child">
          <span  class="child_name">满额送</span>
          <a-switch default-checked  />
        </div>
        <div  class="list_child">
          <span  class="child_name">好友邀请</span>
           <a-button type="link">
              修改
            </a-button>
          <a-switch default-checked  />
       </div>
        <div  class="list_child">
          <span  class="child_name">好友邀请成功
</span>
          
          <a-switch default-checked  />
       </div>
        <div  class="list_child">
          <span  class="child_name">红包</span>
          
          <a-switch default-checked  />
       </div>
        <div  class="list_child">
          <span  class="child_name">满额减
                      </span>
          
          <a-switch default-checked  />
       </div>
        <div  class="list_child">
          <span  class="child_name">抽奖</span>
          
          <a-switch default-checked  />
       </div>
        <div  class="list_child">
          <span  class="child_name">抽奖结果通知</span>
           <a-button type="link" @click="editSet(1)">
              修改
            </a-button>
          <a-switch default-checked  />
       </div>
       
      </div>

    
    </div>
   
  </div>
   <div class="fast-pay" v-show="!indexShow&&payStatus==1">
     <div  class="mainContainreBlock"><div   class="container animated fadeIn"><div  class="header_wrap"><span  class="header_title">基础设置</span>
     </div><div   class="container"><div  class="base_wrap">
       
         <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
   
          <a-form-item label="通知名称">
            快捷加油支付成功
          </a-form-item>
          <a-form-item label="生效油站">
            <a-select  style="width: 120px" >
             
              <a-select-option value="Yiminghe">
                yiminghe
              </a-select-option>
            </a-select>
          </a-form-item>
           <a-form-item label="通知渠道">
            <a-checkbox-group
            v-model="value"
            name="checkboxgroup"
            :options="plainOptions"
            
          />
          </a-form-item>
           <a-form-item label="1">
            <div  class="channel_wrap">
              <div  class="channel_item_left">
                <span  class="title">公众号模板消息</span>
                <a-form-item label="模板ID">
                   <a-input style="width:280px" placeholder="请输入模板ID" />
                 
                <span  class="tips_wrap">···</span>
                </a-form-item>
                <a-form-item label="备注信息">
                   <a-input style="width:280px" placeholder="已有默认内容（如图示），若使用自定义内容请填写" />
                 
                <span  class="tips_wrap">恢复默认</span>
                </a-form-item>
                  
      <a-form-item label="跳转页面">
        <a-radio-group :options="plainOptions2"  />
      </a-form-item>
      <div  class="link_wrap">该笔订单详情页</div>
         </div>
         <div  class="channel_item_right">
           <div  class="title">消息预览</div>
           <div  class="preview_wrap">
             <div  class="header_wrap">
               <div  class="header_left">
               <div  class="header_circle"></div>
               <div  class="header_title">xx集团</div>
               </div>
               <i  aria-label="图标: ellipsis" class="anticon anticon-ellipsis">
                 <svg viewBox="64 64 896 896" data-icon="ellipsis" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                 <path d="M176 511a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm280 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm280 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0z">
                   </path></svg></i></div>
                 <div  class="content_wrap">
                 <span  style="font-size: 14px;">加油支付成功</span>
                 <span  style="color: rgb(152, 152, 152);">3月3日 09:00</span>
                 <span >快捷加油支付成功！</span><span >付款金额： 200元</span>
                 <span >加油站名称： 鹰眼</span><span >油品： 93#</span>
                 <span >单价： 5.64元/L</span><span >油量： 100L</span>
                 <span >感谢您对xx石化的支持～</span></div>
                 <div  class="look_wrap"><span >查看详情</span>
                 <i  aria-label="图标: right" class="anticon anticon-right" style="color: rgb(199, 199, 199);">
                   <svg viewBox="64 64 896 896" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                     <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                 </svg></i>
                 </div>
                 </div>
                 </div>
                 </div>

               
          </a-form-item>
        </a-form>
       
      
  </div>
  <div  class="senior_wrap">
        <a-row class="senior_header" type="flex" justify="space-between">
          <a-col :span="4">
            高级设置
          </a-col>
          <a-col :span="4" text-align:right>
             <a-button type="link" @click="expand">
              {{btnTxt}}
            </a-button>
          </a-col>
        </a-row>

         <div v-show="expandShow"  class="senior_content_wrap">
           <div  class="senior_content_item">
             <span  class="item_title">关联活动通知</span>
               <a-cascader :options="optionsa" placeholder="Please select" />
             </div>
             </div>
             </div>
             <div  class="footer_wrap">
                <a-button style="margin-right:30px;" type="primary">
                  保存
                </a-button>
                <a-button>
                  取消
                </a-button>
              </div>
     </div></div><div  class="public_local_loading" style="display: none;"><div  class="public_local_loading_box ant-spin ant-spin-lg ant-spin-spinning"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i></span></div></div></div>
    </div>
  </div>
 
</template>

<script>
import { Cascader } from 'ant-design-vue';
export default {
    name: 'ConsumptionNotice',
    data(){
      return{
        optionsa: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            isLeaf: false,
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            isLeaf: false,
          },
        ],
        btnTxt:'展开内容',
        value:[],
        plainOptions : ['公众号模板消息', '短信'],
        plainOptions2 : ['默认页面', '跳转小程序', '跳转公众号'],
        payStatus:'',
        indexShow:true,
        expandShow:false
      }
    },
    methods:{
      loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      // load options lazily
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `${targetOption.label} Dynamic 1`,
            value: 'dynamic1',
          },
          {
            label: `${targetOption.label} Dynamic 2`,
            value: 'dynamic2',
          },
        ];
        this.options = [...this.options];
      }, 1000);
    },
      expand(){
        if(this.expandShow){
          this.expandShow=false
          this.btnTxt='展开内容'
        }else{
          this.expandShow=true
          this.btnTxt='收起内容'
        }
      },
      editSet(val){
        this.payStatus=1
        this.indexShow=false
      }
    }
}
</script>
<style scoped>
.footer_wrap{
  padding:80px 0 10px 40px;
}
.senior_wrap .senior_header {
  margin-bottom:20px;
    padding: 10px 20px 15px 20px;
    border-bottom: 1px solid #eaeaf4;
    color: #1e1e28;
    font-weight: 700;
    font-size: 16px;
    
}
.channel_wrap .channel_item_right .preview_wrap .look_wrap {
    position: absolute;
    bottom: 24px;
    padding: 0 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #eaeaf4;
    width: 296px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 36px;
}
.channel_wrap .channel_item_right .preview_wrap .look_wrap, .smsTitleFlex {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.channel_wrap .channel_item_right .preview_wrap .content_wrap span {
    display: inline-block;
    width: 100%;
    line-height: normal!important;
    font-size: 12px;
    color: #1e1e28;
    margin: 0;
    padding: 0;
}
.channel_wrap .channel_item_right .preview_wrap .content_wrap {
    padding: 15px;
    line-height: 19px;
}
.channel_wrap .channel_item_right .preview_wrap .header_wrap .header_left .header_title {
    color: #1e1e28;
}
.channel_wrap .channel_item_right .preview_wrap .header_wrap .header_left .header_circle {
    width: 20px;
    height: 20px;
    background: #999;
    border-radius: 50%;
    margin-right: 4px;
}
.channel_wrap .channel_item_right .preview_wrap .header_wrap i {
    font-size: 30px;
    color: #ccc;
}
.channel_wrap .channel_item_right .preview_wrap .header_wrap .header_left, .channel_wrap .channel_item_right .preview_wrap .header_wrap{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.channel_wrap .channel_item_right .preview_wrap .header_wrap {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 12px 0 16px;
    height: 43px;
    border-bottom: 1px solid #eaeaf4;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.channel_wrap .channel_item_right .preview_wrap .header_wrap .header_left, .channel_wrap .channel_item_right .preview_wrap .header_wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.channel_wrap .channel_item_right .preview_wrap {
    width: 296px;
    height: 308px;
    margin-top: 16px;
    background: #fff;
    border: 1px solid #eaeaf4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.channel_wrap .channel_item_right .title {
    color: #1e1e28;
    line-height: 14px;
    font-weight: 500;
}
.channel_wrap .channel_item_left .link_wrap {
    width: 380px;
    height: 72px;
    background: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 44px 0 24px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.channel_wrap .channel_item_right {
    width: 344px;
    background: #fafafa;
    height: 386px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 24px;
    position: relative;
}
.channel_wrap .channel_item_left {
    width: 636px;
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 24px;
}
.channel_wrap {
    width: 980px;
    border: 1px solid #eaeaf4;
    margin: 18px 0 16px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.header_wrap .header_title {
    font-size: 16px;
    color: #1e1e28;
    font-weight: 700;
}
.header_wrap {
  padding-left:20px;
    height: 64px;
    border-bottom: 1px solid #eaeaf4;
    width: 100%;
  
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.container {
  background:#fff;
    min-height: 80vh;
     padding-bottom: 88px;
    position: relative;
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
  #components-topLayout .ant-layout-content .mainContainreBox[usedefault=true] .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    overflow: auto;
}
  .setting_wrap{
    background:#fff;
    margin-top:20px;
    padding:20px 20px 10px 20px;
  }
  .header{
    line-height:50px;
    border-bottom: 1px solid #eaeaf4;
  }
  .setting_wrap .setting_list {
    margin-bottom: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.setting_wrap .setting_list .list_title{
  padding-top:30px;
  margin-bottom: 16px;
  width: 100%;
}
.setting_wrap .setting_list .list_child {
    width: 271px;
    height: 64px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 25px 0 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #f9fafc;
    margin: 0 8px 8px 0;
}
.setting_wrap .setting_list .list_child .child_name {
    width: 168px;
}
</style>

