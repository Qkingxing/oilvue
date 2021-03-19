
<template>

  <a-layout-content 
    v-if="pageType=='edit'"
    :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px', position: 'relative' }">
    <div class="tipsBox">
      <div class="configTips">
        <a-icon type="exclamation-circle" style="color: rgb(84, 130, 235);vertical-align: middle;margin-right: 5px;"/>
        <span class="teipsText">多个积分规则以最高积分规则为准</span>
      </div>
    </div>
    
    <div class="head">
      <span class="title">新增积分规则</span>
    </div>

    <div class="content">
      <div class="row-item flex">
        <div class="row-title line_h40">活动时间</div>
        <div class="row-content">
          <a-range-picker style="width: 380px;" />
        </div>
      </div>
      <div class="row-item flex">
        <div class="row-title line_h40">活动油站</div>
        <div class="row-content">
          <el-select multiple  collapse-tags v-model="selectedArray" @change="changeSelect" placeholder="请选择活动油站" style="height: auto; margin-bottom: 5px;">
            <el-option label="全选" value="全选" @click.native="selectAll"></el-option>
            <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <div>
            <a-alert message="某某加油站在该时间已有积分规则" type="error" show-icon />
          </div>
        </div>
      </div>

      <div class="row-item flex paneTabs">
        <div class="paneBox paneCur">
          <span>积分规则一</span>
        </div>
        <div class="addPane">
          <span><a-icon type="plus" /></span>
        </div>
      </div>

      <div class="rules-edit-container-ele">
        <div class="content">
          <div class="row-item flex">
            <div class="row-title">活动人群</div>
            <div class="row-content">
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </div>





    </div>

    <div class="createdBtn">
      <a-button type="primary" >
        创 建
      </a-button>
      <a-button type="info" @click="back">
        返 回
      </a-button>
    </div>

  </a-layout-content>

</template>

<script>


import { mapGetters } from 'vuex'

export default {
  name: 'RuleEdit',
  components: {},
  data () {
    return {
      selectedArray: [],
      options: [
        { name: '油品券', label: 'one' },
        { name: '商品券', label: 'tow' },
      ],

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
    console.log(this.userInfo)
  },
  methods: {
    back(){
      this.$emit('back')
    },
    selectAll() {
      if (this.selectedArray.length < this.options.length) {
        this.selectedArray = []
        this.options.map((item) => {
          this.selectedArray.push(item.name)
        })
        this.selectedArray.unshift('全选')
      } else {
        this.selectedArray = []
      }
    },
    changeSelect(val) {
      if (!val.includes('全选') && val.length === this.options.length) {
        this.selectedArray.unshift('全选')
      } else if (val.includes('全选') && val.length - 1 < this.options.length) {
        this.selectedArray = this.selectedArray.filter((item) => {
          return item !== '全选'
        })
      }
    },

  }
}
</script>
<style lang="less" scoped>
.flex{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.line_h40{
  line-height: 40px;
}
a{
  margin: 0 5px;
}
.tipsBox{
  border-bottom: 8px solid #f5f6f9;
  margin: 0 -24px 0 -24px;
  .configTips{
    position: relative;
    height: 48px;
    line-height: 48px;
    padding: 0 0 0 30px;
    background: #edf2fd;
    border: 1px solid #37f;
    .teipsText{
      vertical-align: middle;
    }
  }
}
.head{
  line-height: 60px;
  height: 60px;
  border-bottom: 1px solid #eaeaf4;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 24px;
  .title{
    font-size: 16px;
    font-weight: 600;
  }
}

.content{
  .row-item{
    margin-bottom: 20px;
    .row-title{
      font-size: 14px;
      margin-right: 20px;
      padding-left: 76px;
    }
  }
  .paneTabs{
    border-bottom: 1px solid #e4e7f0;
  }
  
  .paneBox{
    width: 110px;
    height: 43px;
    line-height: 43px;
    text-align: center;
    background: #f9fafc;
    border-radius: 3px 3px 0 0;
    border: 1px solid #e4e7f0;
    border-bottom: none;
    margin-right: 2px;
    cursor: pointer;
    span{
      display: inline-block;
      height: 40px;
      line-height: 40px;
    }
  }
  .paneCur{
    background: #fff;
    position: relative;
    span{
      color: #37f;
    }
    &::after{
      content: " ";
      height: 2px;
      clear: both;
      position: absolute;
      width: 100%;
      bottom: -1px;
      background: #fff;
      left: 0;
    }
  }
  .addPane{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    span{
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #fff;
      border-radius: 2px;
      border: 1px solid #cad5e9;
      display: inline-block;
      margin-left: 6px;
      color: #96a2be;
      font-size: 15px;
      cursor: pointer;
    }
  }







}

.createdBtn{
  padding: 42px 0 0 385px;
  .ant-btn{
    margin: 0 4px;
  }
}
</style>
