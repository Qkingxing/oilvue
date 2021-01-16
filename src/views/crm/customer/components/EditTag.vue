<template>
  <a-modal v-model="visible" :title="title" on-ok="handleOk" :width="600">
    <div v-if="type == 'all'" class="box">
      <div class="tip">已选择「146」位客户</div>
      <div class="modal-box">
        <a-form layout="inline">
          <a-row>
            <a-form-item label="标签名称">
              <a-input :maxLength="10" placeholder="请输入标签名称" style="width:300px;"/>
              <span style="margin-left: -45px; color: rgb(199, 199, 199); position: relative;">10/10</span>
            </a-form-item>
          </a-row>
        </a-form>
      </div>
    </div>
    <div v-if="type == 'add'" class="box">

      <a-form layout="inline">
        <a-row>
          <a-form-item label="标签名称">
            <a-input :maxLength="10" placeholder="请输入标签名称" style="width:300px;"/>
            <span style="margin-left: -45px; color: rgb(199, 199, 199); position: relative;">10/10</span>
          </a-form-item>
        </a-row>
      </a-form>

    </div>
    <div v-if="type == 'edit'" class="box">

      <a-form layout="inline">
        <a-row style="text-align:left;">
          <a-form-item label="客户编号">
            <span>1062610</span>
          </a-form-item>
        </a-row>
        <a-row style="text-align:left;">
          <a-form-item label="客户标签">
            <a-select placeholder="请选择标签" mode="multiple" style="width: 264px">
              <a-select-option value="jack">
                Jack
              </a-select-option>
              <a-select-option value="lucy">
                Lucy
              </a-select-option>
              <a-select-option value="disabled" disabled>
                Disabled
              </a-select-option>
              <a-select-option value="Yiminghe">
                yiminghe
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-row>
      </a-form>

    </div>
    <template slot="footer">
      <a-button key="back" @click="handleCancel"> 取消 </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk" v-if="type=='all'"> 确认 </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk" v-if="type=='edit'"> 保存 </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk" v-if="type=='add'"> 确认 </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: 'EditTag',
  data () {
    return {
      title: null,
      type: null,
      visible: false,
      loading: false
    }
  },
  methods: {
    show (type) {
      this.type = type
      switch (type) {
        case 'all':
          this.title = '批量加标签'
          break
        case 'add':
          this.title = '新增标签'
          break
        case 'edit':
          this.title = '修改标签'
          break
        default:
          break
      }
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleOk () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  .modal-box{
    min-height: 120px;
    padding-top: 20px;
  }
}
</style>
