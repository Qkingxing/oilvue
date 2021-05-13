<template>
  <div class="multipleChoiceContainer" v-cloak v-clickoutside="outsideClose">
    <div class="mSelectContainer" :isshow="isshow" itdisable="0" @click="togalSelect">
      <div class="mSelect_text" style="color: rgb(191, 191, 191);">请选择奖励优惠券</div>
      <div class="mSelect_triangle">
        <a-icon type="caret-down" style="color: rgb(191, 191, 191);"/>
      </div>
      <div class="mSelect_ListContainer" v-show="isshow==1" @click.stop>
        <div class="mSelect_ListSearchBox">
          <a-input allowClear placeholder="请输入券名称或ID" />
        </div>
        <div class="mSelect_ListBox public_global_scroll">
          <!-- 选项 -->
          <div 
            class="mSelect_ListBlock"
            v-for="(item,i) in list"
            :key="i">
            <label>
              <a-checkbox></a-checkbox>
              <div class="mSelect_ListBlock_text">正式随机券1130</div>
            </label>
          </div>



          <!-- 无数据 -->
          <div v-show="list.length==0" hascenter="true" class="mSelect_ListBlock" style="">暂无数据</div>
        </div>
        <!-- hover详情 -->
        <div class="mSelect_ListDetailInfoBox">
          <div class="multipleChoiceContainer_detail">
            <div>
              <div>优惠券名:</div>
              <div>
                <span style="color:#3a85ff;">正式随机券1130</span>
              </div>
            </div>
            <div>
              <div>券类型:</div>
              <div>油品券</div>
            </div>
            <div>
              <div>券面额:</div>
              <div>随机金额 <span style="color:#3a85ff;">2~10</span>元</div>
            </div>
            <div>
              <div>券有效期:</div>
              <div>自领取日1天内有效!</div>
            </div>
            <div>
              <div>使用限制:</div>
              <div>线上支付、线下核销</div>
            </div>
            <div>
              <div>支付限制:</div>
              <div>不限制</div>
            </div>
            <div>
              <div>使用条件:</div>
              <div>98#车用汽油原价满1元可用<br><div style="height: 5px;"></div>
              98#车用汽油原价满1元可用<br><div style="height: 5px;"></div>98#车用汽油原价满1元可用<br><div style="height: 5px;"></div>95#车用汽油原价满1元可用<br><div style="height: 5px;"></div>92#车用汽油原价满1元可用<br><div style="height: 5px;"></div>0#车用柴油原价满1元可用<br><div style="height: 5px;"></div>-10#车用柴油原价满1元可用<br><div style="height: 5px;"></div>92#车用汽油（高标）原价满1元可用<br><div style="height: 5px;"></div>0#车用柴油（高标）原价满1元可用<br><div style="height: 5px;"></div></div>
            </div>
            <div>
              <div>活动人群:</div>
              <div>所有线上用户</div>
            </div>
            <div>
              <div>油站限制:</div>
              <div>南山第二加油站可用</div>
            </div>
            <div>
              <div>时间限制:</div>
              <div>不限制</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoupons } from '@/api/em'

export default {
  name: 'CouponSelect',
  data(){
    return {
      isshow: 0,
      list: []
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      getCoupons({
        page: 1, // 页码
        limit: 99, // 每页页数
        activation_type: 0,
        is_expired: 1,
      }).then(res=>{
        console.log(res)
      })
    },
    // 打开关闭下拉框
    togalSelect(){
      if (this.isshow) {
        this.isshow = 0
      }else{
        this.isshow = 1
      }
    },
    outsideClose() {
      this.isshow = 0
    }
  },
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }

        function KeyUp(e) {
          if (e.keyCode == 27) {
            if (binding.expression) {
              binding.value(e)
            }
          }
        }
        el.__vueClickOutSize__ = documentHandler
        el.__vueKeyup__ = KeyUp
        
        document.addEventListener('keyup', KeyUp)
        document.addEventListener('click', documentHandler)
      },
      unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutSize__)
        delete  el.__vueClickOutSize__

        document.removeEventListener('keyup', el.__vueKeyup__)
        delete  el.__vueKeyup__
      }
    }
  },
}
</script>

<style lang="less" scoped>
.multipleChoiceContainer{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 220px;
  height: 40px;
  border-color: #d9d9d9;
  margin: 0 15px;
  text-align: left;
}
.mSelectContainer{
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  cursor: pointer;
  z-index: 2;
  &[isshow="1"]{
    .mSelect_triangle{
      -webkit-transform: translateY(-50%) rotateX(180deg);
      transform: translateY(-50%) rotateX(180deg);
    }
  }
  /deep/.ant-input-suffix{
    opacity: 0.6;
  }
}
.mSelect_text{
  display: block;
  font-size: 14px;
  width: 100%;
  padding: 0 30px 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mSelect_triangle{
  position: absolute;
  right: 10px;
  top: 50%;
  -webkit-transition: .6s;
  transition: .6s;
  -webkit-transform: translateY(-50%) rotateX(0);
  transform: translateY(-50%) rotateX(0);
}
.mSelect_ListContainer{
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: block;
  -webkit-box-shadow: 0 0 4px 1px #efefef;
  box-shadow: 0 0 4px 1px #efefef;
  border-radius: 2px;
  -webkit-transform: translate3d(0,5px,0);
  transform: translate3d(0,5px,0);
  background: #fff;
  z-index: 9;
}
.mSelect_ListSearchBox{
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin: 8px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.mSelect_ListBox{
  max-height: 220px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow-y: auto;
}
.mSelect_ListBlock{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  &[hascenter=true]{
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  &>label{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  div{
    display: block;
    font-size: 14px;
    line-height: 1.6;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #1e1e28;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mSelect_ListBlock_text{
    margin-left: 10px;
    margin-top: 1px;
    -webkit-box-flex: initial;
    -ms-flex: initial;
    flex: initial;
  }
}
.mSelect_ListDetailInfoBox{
  position: absolute;
  display: block;
  left: 100%;
  top: 0;
  width: 130%;
  min-height: 100%;
  -webkit-transform: translateX(10px);
  transform: translateX(10px);
  -webkit-box-shadow: 1px 1px 4px #b1b1bd;
  box-shadow: 1px 1px 4px #b1b1bd;
  background: #fff;
}
.multipleChoiceContainer_detail{
  padding: 20px 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  &>div{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    font-size: 12px;
    color: #888;
    line-height: 1.8;
    &>div:first-of-type{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 30%;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }
    &>div:nth-of-type(2){
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      padding-left: 15px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
    }
  }
  
}
</style>