<template>
  <a-modal 
    title="信息确认" 
    :width="800"
    :height="640"
    centered
    :visible="visible" 
    :confirm-loading="confirmLoading" 
    @ok="handleOk" 
    @cancel="handleCancel">
    <div class="tips">将为您筛选以下条件的客户</div>
    <div class="modal-content public_global_scroll" v-if="form">
      <div 
        class="preview-section"
        v-for="(value,index) in form.conditions"
        :key="index"
        v-show="value.isShow">
        <p class="title">{{value.name}}</p>

        <div 
          class="preview-item"
          v-for="(cItem,cIndex) in value.treelist"
          :key="cIndex"
          v-show="cItem.isShow">
          <div class="item-label">{{cItem.name}}</div>
          <!-- 多选 -->
          <div class="item-box" v-if="cItem.type==2">
            <div class="item-block">
              {{checkboxText(cItem.data,cIndex,index)}}
            </div>
          </div>
          <!-- 下拉 -->
          <div class="item-box" v-if="cItem.type==4">
            <div 
              class="item-block"
              v-for="(selectItem, selectIndex) in selectList(cItem.data, cItem.info)" 
              :key="selectIndex">
              {{selectItem}}<span v-if="selectList(cItem.data, cItem.info).length>1">、</span>
            </div>

          </div>
          <!-- 组合（下拉+数字） -->
          <div class="item-box" v-if="cItem.type==3">
            <div 
              class="item-block"
              v-for="(customItem, customIndex) in customList(cItem.info)"
              :key="customIndex"
              >
              {{customItem}}<span v-if="customList(cItem.info).length>1">、</span>
            </div>
          </div>
          <!-- 组合（下拉+下拉+数字） -->
          <div class="item-box" v-if="cItem.type==5">
            <div 
              class="item-block"
              v-for="(customItem, customIndex) in customList2(cItem.info)"
              :key="customIndex"
              >
              {{customItem}}<span v-if="customList2(cItem.info).length>1">、</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </a-modal>
</template>

<script>
export default {
  name: 'CrowdAddModal',
  data() {
    return {
      visible: false,
      confirmLoading: false,
      form: null,
    }
  },
  methods: {
    show(form) {
      this.form = form
      console.log(this.form)
      this.visible = true
    },
    // 双下拉
    customList2(data){

      let arr = []
      data.forEach(e => {
        // console.log(e)
        if (e.name==='区间') {
          let str = `${e.name2} ${e.areaLeft}-${e.arearight}${e.unit}`
          arr.push(str)
        }else{
          let str = `${e.name2} ${e.name}${e.areaLeft}${e.unit}`
          arr.push(str)
        }
      });
      // console.log(arr)

      return arr
    },
    // 单下拉
    customList(data){

      let arr = []
      data.forEach(e => {
        // console.log(e)
        if (e.name==='区间') {
          let str = `${e.areaLeft}-${e.arearight}${e.unit}`
          arr.push(str)
        }else{
          let str = `${e.name}${e.areaLeft}${e.unit}`
          arr.push(str)
        }
      });
      // console.log(arr)

      return arr
    },
    selectList(target, data){
      // console.log(target)
      // console.log(data)
      let arr = data.filter(e=>{
        return target.includes(e.id)
      }).filter(e=>{
        return e.id!==0
      }).map(e=>{
        return e.name
      })
      // console.log(arr)
      return arr
    },
    checkboxText(target,cIndex,index){
      let item = this.form.conditions[index].treelist[cIndex]
      let arr = item.info.filter(e=>{
        return target.includes(e.id)
      }).map(e=>{
        return e.name
      })
      let str = arr.join('、')
      return str
    },
    handleOk(e) {

      this.confirmLoading = true

      this.visible = false
      this.confirmLoading = false
      this.$emit('ok')
    },
    handleCancel(e) {
      // console.log('Clicked cancel button')
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.tips{
  margin-bottom: 16px;
  text-align: left;
}
.modal-content{
  height: 500px;
  overflow-y: scroll;
}
.preview-section{
  border: 1px solid #e4e7f0;
  margin-bottom: 16px;
  padding: 24px;
  .title{
    font-size: 16px;
    color: #1e1e28;
    font-weight: 500;
    text-align: left;
  }
  .preview-item{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-height: 40px;
    .item-label{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      width: 120px;
      height: 40px;
      text-align: right;
      margin-right: 20px;
    }
    .item-box{
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      font-weight: 500;
      .item-block{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 40px;
        text-align: left;
      }
    }
  }
}
</style>