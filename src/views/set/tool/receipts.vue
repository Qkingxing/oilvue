
<template>
  <div>
    <div  showbreadcrumb="true" class="mainContainreBox">
      <div  class="mainContainreBlock">
      <div   class="container animated fadeIn">
          <a-tabs @change="tabChange" default-active-key="1" size="large">
            <a-tab-pane key="1" tab="油品支付">
              <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
            <div v-if="index!=0" class="operate_wrap"><div @click="upItem(index,item)" class="operate_item"  :class="{disabled_item:index==1}">↑</div><div @click="downItem(index,item)" class="operate_item" :class="{disabled_item:index==listData.length-1}">↓</div></div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="闪付小票">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="油品退款">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="闪付退款">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="5" tab="加油卡开卡">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="6" tab="加油卡充值">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="7" tab="加油卡查询">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="8" tab="充值退款">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="9" tab="团油支付">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="10" tab="便利店">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="11" tab="便利店退款">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
            <a-tab-pane key="12" tab="商品核销">
               <a-radio-group class="tabs_list_wrap" @change="radioChange" default-value="1" size="large">
                <a-radio-button value="1">
                  客户联
                </a-radio-button>
                <a-radio-button value="2">
                  商户联
                </a-radio-button>
                <a-radio-button value="3">
                  客户补打联
                </a-radio-button>
              </a-radio-group>
          <div  class="flex_wrap">
            <div  class="ticket_wrap">
              <div   class="ticketBox">
                <img  src="./logo.png" class="logo">
                <span v-if="listData[0]?listData[0].list[0].checked:false" class="station_name">{{listData[0]?listData[0].list[0].preview_value:''}}</span>
                <span  class="small_title">（{{radioType==1?'客户联':(radioType==2?'商户联':'客户补打联')}}）</span>
    
    <div  :class="{ oil_msg_wrap:item.title=='consumption_detail',border_style: item.list[item.list.length-1].checked }" class="text_wrap" v-for="(item,index) in listData" :key="index">
      <template v-if="item.title=='payment_info'">
          <div  class="pay_detail" v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <template  v-if="list.key=='payable_amount'||list.key=='paid_amount'">
              <span    class="weight_style">{{list.name}}：</span>
              <span  class="weight_style">{{list.preview_value}}</span>
            </template>
            <template v-else-if="list.key=='payable_amount'">
              <span v-html="list.name">：</span>
              <span>{{list.preview_value}}</span>
            </template>
           
            <template v-else>
              <span  v-html="list.preview_value">：</span>
            </template>
          </div>
      </template>
      <template v-else-if="item.title=='consumption_detail'">
        <div>
          <div v-if="list.checked" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
       <template v-else-if="item.title=='station_info'">
          <div v-if="list.checked&&(list.key!='station_name'&&list.key!='station_logo')" v-for="(list,listindex) in item.list" :key="listindex" class="oil_item">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </template>
         <template v-else-if="item.title=='receipt_info'">
              <div class="center_wrap"  v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <span v-if="list.key!='line'&&list.key!='receipt_qrcode'" v-html="list.preview_value"></span>
                <img :src="list.preview_value" v-if="list.key=='receipt_qrcode'" alt="">
              </div>
          </template>
           <template v-else-if="item.title=='advertising'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='advertising_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
               <div class="center_wrap" v-if="list.key=='weixin_micro_qrcode'">
               
                 <img :src="list.preview_value"  alt="">
               </div>
                 <div class="center_wrap" v-if="list.key=='official_accounts_qrcode'">
                  <img :src="list.preview_value"  alt="">
                
               </div>
              </div>
          </template>
          <template v-else-if="item.title=='receipt_notice'">
              <div   v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
                <div :class="{center_wrap:item.list[1].preview_value==2,right_wrap:item.list[1].preview_value==3}" v-if="list.key=='notice_words'">
                   <span  v-html="list.preview_value"></span>
                </div>
              </div>
          </template>

       <template v-else>
        <div>
          <div v-if="list.checked"  v-for="(list,listindex) in item.list" :key="listindex">
            <span v-if="list.key!='line'">{{list.name}}:</span>
            <span v-if="list.key!='line'">{{list.preview_value}}</span>
          </div>
        </div>
      </template>
    </div>  
</div>
</div>
<div  class="ticket_setting_wrap">
    <div   class="ticketSetting">
      <div  class="header_wrap">
        <div  class="weight_tips"> 
        </div>
        <a-button type="link">
          恢复默认
        </a-button>
        </div>
        <div class="list_wrap">
          <div class="list_item" v-for="(item,index) in listData" :key="index">
            <div class="item_left">
              <span>{{item.label}}</span>
            </div>
            <div class="item_right">
              <template v-if="!(item.title=='receipt_notice'||item.title=='advertising')">
                 <div  class="checkbox_group">
                    <div  class="extra_flex_style">
                      <a-checkbox  v-for="(list,listindex) in item.list" :key="listindex"  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                    </div>
                  </div>
              </template>
             
              <template v-else>
                 <div  class="checkbox_group ant-checkbox-group">
                    <div  class="extra_flex_style" v-for="(list,listindex) in item.list" :key="listindex">
                      <template v-if="listindex==0">
                      <a-checkbox   class="select_item"   v-model="list.checked">
                      
                         {{list.name}}
                        
                       
                      </a-checkbox>
                       <div  class="tips_setting_wrap">
                      <a-textarea class="tips_area" v-model="list.preview_value" :rows="4" />
                      <a-radio-group class="tips_radio_group" name="radioGroup" v-model="item.list[1].preview_value">
                          <a-radio value="1">
                            靠左
                          </a-radio>
                          <a-radio value="2">
                            居中
                          </a-radio>
                          <a-radio value="3">
                            靠右
                          </a-radio>
                        </a-radio-group>
                       </div>
                      </template>
                       <template v-else-if="listindex==1">
                      
                      </template>
                     
                       <template v-else>
                        <a-checkbox  v-model="list.checked">
                        {{list.name}}
                      </a-checkbox>
                      </template>
                    </div>
                    </div>
              </template>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
            </a-tab-pane>
          </a-tabs>
      </div>
      <div  class="footer_wrap">
        <div  class="footer_box">
          <a-button type="primary" @click="setReceiptstyleset">
            应用
          </a-button>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import api from '../../../api/set.js'
export default {
    name: 'Receipts',
    data(){
      return{
        allData:{},
        listData:[],
        station_info_:{
          station_name:{},
          station_address:{},
          station_phone:{},
          station_logo:{},
          line:{}
        },
        "user_info":[],
        "consumption_detail":[],
        "payment_info":[],
        "account_change":[],
        "receipt_info":[],
        "advertising":[],
        "receipt_notice":[],
        "station_info":[],
        "order_info":[],
        advertising_:{
          advertising_words:{},
          position:{},
          official_accounts_qrcode:{},
          weixin_micro_qrcode:{},
          line:{}
        },
        receipt_info_:[],
        receipt_notice_:{
          notice_words:{},
          position:{},
          line:{}
        },
        resData:[],
        radioType:1,
        type:1
      }
    },
    mounted(){
      this.setReceiptstylelist()
    },
    methods:{
      checkChange(val,event){
        for(let i=0;i<this[val].length;i++){
          for(let j=0;j<event.length;j++){
            if(event[j]===this[val][i].value){
              this[val][i].checked=true
            } 
          }
        }
        
      },
      setReceiptstyleset(){
        let listData=JSON.parse(JSON.stringify(this.listData))
        for(let i=0;i<listData.length;i++){

          for(let j=0;j<listData[i].list.length;j++){
            listData[i].list[j].checked=listData[i].list[j].checked?'1':'0'
          }
        }
        let that=this
        that.allData.info=listData
      
      
        api.setReceiptstyleset(that.allData).then(e=>{
          console.log(e)
        }).catch(err=>{
          console.log(err)
        })
      },
      downItem(index,item){
        if(index==this.listData.length-1){
          return
        }
        this.listData.splice(index,1)
        this.listData.splice(index+1,0,item)
      },
      upItem(index,item){
        if(index==1){
          return
        }
        this.listData.splice(index,1)
        this.listData.splice(index-1,0,item)
      },
      radioChange(type){
        this.radioType=type.target.value
        this.setReceiptstylelist()
      },
      tabChange(type){
        this.radioType=1
        this.type=type
        
        this.setReceiptstylelist()
      },
      setReceiptstylelist(){
        let that=this
        let type=''
        console.log(that.type,that.radioType)
        switch(Number(that.type)){
          case 1:
            switch(Number(that.radioType)){
              case 1:
                type=1
                break;
              case 2:
                type=2
                break;
              case 3:
                type=3
                break;
            }

            break;
          case 2:
            switch(Number(that.radioType)){
              case 1:
                type=4
                break;
              case 2:
                type=5
                break;
              case 3:
                type=6
                break;
            }

            break;
          case 3:
            switch(Number(that.radioType)){
              case 1:
                type=7
                break;
              case 2:
                type=8
                break;
              case 3:
                type=9
                break;
            }

            break;
          case 4:
            switch(Number(that.radioType)){
              case 1:
                type=10
                break;
              case 2:
                type=11
                break;
              case 3:
                type=12
                break;
            }

            break;
          case 5:
            switch(Number(that.radioType)){
              case 1:
                type=13
                break;
              case 2:
                type=14
                break;
              case 3:
                type=15
                break;
            }

            break;
          case 6:
            switch(Number(that.radioType)){
              case 1:
                type=16
                break;
              case 2:
                type=17
                break;
              case 3:
                type=18
                break;
            }

            break;
          case 7:
            switch(Number(that.radioType)){
              case 1:
                type=19
                break;
              case 2:
                type=20
                break;
              case 3:
                type=21
                break;
            }

            break;
          case 8:
            switch(Number(that.radioType)){
              case 1:
                type=22
                break;
              case 2:
                type=23
                break;
              case 3:
                type=24
                break;
            }

            break;
          case 9:
            switch(Number(that.radioType)){
              case 1:
                type=25
                break;
              case 2:
                type=26
                break;
              case 3:
                type=27
                break;
            }

            break;
          case 10:
            switch(Number(that.radioType)){
              case 1:
                type=28
                break;
              case 2:
                type=29
                break;
              case 3:
                type=30
                break;
            }

            break;
          case 11:
            switch(Number(that.radioType)){
              case 1:
                type=31
                break;
              case 2:
                type=32
                break;
              case 3:
                type=33
                break;
            }

            break;
          case 12:
            switch(Number(that.radioType)){
              case 1:
                type=34
                break;
              case 2:
                type=35
                break;
              case 3:
                type=36
                break;
            }

            break;
        }
        api.setReceiptstylelist({
          type:type
        })
          .then(res => {
            let data=JSON.parse(res.data.info)
            that.listData=data
            that.allData=res.data
            console.log('*****5555555555555555****')
            console.log(data)
            for(let i=0;i<data.length;i++){
              this[data[i].title]=[]
              for(let j=0;j<data[i].list.length;j++){
                data[i].list[j].label=data[i].list[j].name
                data[i].list[j].value=data[i].list[j].name
                data[i].list[j].checked=data[i].list[j].checked==0?false:true
                this[data[i].title].push(data[i].list[j])
              }
            }
            for(let i=0;i<that.receipt_notice.length;i++){
              that.receipt_notice_[that.receipt_notice[i].key]=that.receipt_notice[i]
            }
            for(let i=0;i<that.advertising.length;i++){
              that.advertising_[that.advertising[i].key]=that.advertising[i]
            }
            for(let i=0;i<that.station_info.length;i++){
              that.station_info_[that.station_info[i].key]=that.station_info[i]
            }
           
          }).catch(err=>{
            console.log(err)
          })
      }
    }
}
</script>
<style scoped>
.right_wrap{
  text-align:right;
}
.center_wrap{
  text-align: center;
}
.center_wrap img {
  margin-top: 16px;
  width: 160px;
  height: 160px;
}
.ticketBox .oil_msg_wrap .oil_item{
    text-align: center;
}
.ticketBox .oil_msg_wrap .oil_item span{
    display: block;
}
.ticketBox .oil_msg_wrap>div{
   
    display: flex;
   
    flex-wrap: wrap;
    padding: 0 20px 22px;
   
    justify-content: space-between;
}
.ticketBox .text_wrap .weight_style {
    font-weight: 500;
    font-size: 24px;
    margin: 10px 0;
}
.ticketBox .text_wrap .pay_detail {
  
    display: flex;
}
.ticketBox span{
    display: inline-block;
    color: #1e1e28;
}
.ticketBox .small_title {
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    width: 100%;
    margin-bottom: 40px;
}
.ticketBox .station_name {
    text-align: center;
    font-weight: 500;
    color: #1e1e28;
    font-size: 24px;
    width: 100%;
}
.tabs_list_wrap {
    margin: 12px 0 0 82px;
}
  .flex_wrap {
      display: flex;
     
  }
  .footer_wrap {
    position: fixed;
    height: 80px;
    width: 100%;
    right: 0;
    box-sizing: border-box;
    padding-right: 28px;
    padding-left: 276px;
    bottom: 0;
}
.footer_wrap .footer_box {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 -2px 8px 0 #e4e7f0;
    width: 100%;
    height: 100%;
    background: #fff;
}
.flex_wrap .ticket_wrap {
  margin-top: 24px;
  margin-left: 20px;
}
.flex_wrap .ticket_setting_wrap {
  margin-left: 36px;
}
.container {
    padding-bottom: 130px;
    background: #fff;
}
.ticketBox {
    position: relative;
    width: 360px;
    box-sizing: border-box;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0,.1);
    margin-left: 8px;
    background: #fff;
    background-size: 20px 10px;
    background-repeat: repeat-x;
    background-position: 0 100%;
    padding: 24px 24px 42px;
}
.ticketBox .logo {
    width: 40px;
    height: 40px;
    margin: 0 auto 16px;
    display: block;
}
.ticketBox .border_style {
  border-bottom: 2px dashed #3e4b6e;
}
.ticketBox .text_wrap {
    margin-bottom: 22px;
    padding-bottom: 22px;
    color: #1e1e28;
    font-size: 16px;
}
.ticketBox .text_wrap span {
    display: inline-block;
    word-break: break-all;
}
.ticketBox:after {
    position: absolute;
    content: "";
    bottom: -12px;
    left: 0;
    width: 100%;
    height: 12px;
    background: url(./wave.png);
}

.header_wrap {
   
    display: flex;
   
    align-items: center;
    width: 576px;
   
    justify-content: space-between;
    margin-top: -7px;
}
.list_wrap .list_item {
    background: #f5f5fa;
    width: 576px;
    padding: 27px 0 0;
    margin-bottom: 8px;
   
    display: flex;
    position: relative;
}
.list_wrap .list_item .item_left {
    width: 108px;
    text-align: right;
}
.list_wrap .list_item .item_right {
   
    display: flex;
    margin-left: 20px;
    width: 80%;
}
.list_wrap .list_item .item_left span {
    color: #1e1e28;
    font-weight: 500;
}
.list_wrap .list_item .item_right{
   
    display: flex;
    margin-left: 20px;
    width: 80%;
}
.list_wrap .list_item .item_right .checkbox_group {
    
    display: flex;
    flex-wrap: wrap;
}
.list_wrap .list_item .item_right .checkbox_group .extra_flex_style {
    display: flex;
    margin-bottom: 16px;
}
.list_wrap .list_item .item_right .select_item{
    width: 130px;
    margin: 0 0 10px 0;
}
.list_wrap .list_item .operate_wrap {
    position: absolute;
    top: 39px;
    right: -54px;
  
    display: flex;
}
.list_wrap .list_item .operate_wrap .disabled_item {
    color: #d8d8d8;
    border: 1px solid #d8d8d8;
    cursor: default;
}
.list_wrap .list_item .operate_wrap .operate_item {
    width: 16px;
    height: 16px;
    color: #3c3c46;
    border: 1px solid #666;
    border-radius: 50%;
    line-height: 14px;
    text-align: center;
    font-size: 12px;
    margin-right: 8px;
    cursor: pointer;
}
.list_wrap .list_item .operate_wrap .disabled_item {
    color: #d8d8d8;
    border: 1px solid #d8d8d8;
    cursor: default;
}
.tabs_list_wrap {
    margin: 12px 0 0 82px;
}

.list_wrap .list_item .item_right .tips_setting_wrap{
  display:flex;
}
.list_wrap .list_item .item_right .tips_setting_wrap .tips_radio_group {
    margin-top: -2px;
}

.list_wrap .list_item .item_right .tips_setting_wrap .tips_area{
    margin-left: -50px;
    width: 220px;
    height: 80px;
    margin-right: 8px;
    margin-bottom: 10px;
    margin-top: -5px;
}

.tips_radio_group{
  width:100%;
  display:flex;
}
</style>
