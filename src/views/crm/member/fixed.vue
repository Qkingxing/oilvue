<template>
  <a-layout>
    <a-layout-content
      v-if="page=='level_list'"
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }"
    >
      <div class="head-title">
        固定等级会员
      </div>
      <div class="actionBtns">
        <a-button type="primary" @click="page='add'"> 新增会员等级 </a-button>
      </div>

      <!-- 表格 -->
      <div class="showDataForTable">
        <s-table 
          :scroll="{ x: 1300 }"
          ref="table" 
          size="default" 
          rowKey="id" 
          :showPagination="false"
          :columns="columns" 
          :data="loadData">

          <span slot="template_icon" slot-scope="item, row">
            <template>
              <img :src="item" style="max-width: 104px; height: 55px; cursor: pointer;">
            </template>
          </span>

          <div slot="group_name" >
            <template>
              {{userInfo.group_name}}
            </template>
          </div>
          <div 
            class="public_global_scroll"
            style="max-height: 7.6em; overflow: auto;"
            slot="discount_list" 
            slot-scope="discount_list,row">
            <template>
              <div 
                style="text-align:center;"
                v-for="(item,index) in discount_list" 
                :key="index">
                <template v-if="row.discount_type==1">
                  {{item.oils_name}} 每升优惠{{item.oils_money}}元
                </template>
                <template v-if="row.discount_type==2">
                  {{item.oils_name}} 享{{item.oils_discount}}折
                </template>
              </div>
            </template>
          </div>

          <div slot="level_status" slot-scope="item, row">
            <template>
              <div v-if="item===1">永久</div>
              <div v-if="item===2">{{row.expired_time}}天</div>
              <div v-if="item===3">{{row.expired_time | moment}}过期</div>
            </template>
          </div>

          <span slot="watch" slot-scope="text, record">
            <template>
              <a @click="openCertificationList(record)">认证列表</a>
              <a-divider type="vertical" />
              <a @click="openUserList(record)">用户列表</a>
            </template>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="openEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="delFixedLevel(record)">删除</a>
              <a-divider type="vertical" />
              <a @click="download(record)">下载等级码</a>
            </template>
          </span>

        </s-table>
      </div>
    </a-layout-content>

    <FixedEdit 
      v-if="page=='add'||page=='edit'"
      @exit="page='level_list'"
      :formData="item"
      :type="page"></FixedEdit>

    <FixedCertificationList 
      :itemData="item"
      v-if="page=='certification_list'"
      @exit="page='level_list'"></FixedCertificationList>

    <FixedUserList 
      :itemData="item"
      v-if="page=='user_list'"
      @exit="page='level_list'"></FixedUserList>

  </a-layout>
</template>

<script>
import { STable } from '@/components'
import { Loading } from 'element-ui'
import { mapGetters } from 'vuex'
import { queryFixedLevel,delFixedLevel,generateCode } from '@/api/crm'

export default {
  name: 'Fixed',
  components: {
    STable,
    FixedEdit: ()=>import('./fixed/FixedEdit'),
    FixedCertificationList: ()=>import('./fixed/FixedCertificationList'),
    FixedUserList: ()=>import('./fixed/FixedUserList'),
  },
  data () {
    return {
      page: 'level_list',
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '等级模板',
          dataIndex: 'template_icon',
          scopedSlots: { customRender: 'template_icon' },
          width: 172
        },
        {
          title: '等级名称',
          dataIndex: 'level_name',
          width: 172
        },
        {
          title: '生效油站',
          scopedSlots: { customRender: 'group_name' },
          width: 172
        },
        {
          title: '等级优惠',
          key: 'discount_list',
          dataIndex: 'discount_list',
          scopedSlots: { customRender: 'discount_list' },
          width: 172
        },
        {
          title: '等级有效期',
          dataIndex: 'level_status',
          scopedSlots: { customRender: 'level_status' },
          width: 172
        },
        {
          title: '最近修改人',
          dataIndex: 'user_name',
          width: 172
        },
        {
          title: '查看',
          dataIndex: 'watch',
          scopedSlots: { customRender: 'watch' },
          fixed: 'right'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        return queryFixedLevel({}).then((res)=>{
          // console.log(res.data)
          return {
            data: res.data, // 列表数组
          }
        })
      },
      item: {},
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () { 
    console.log(this.userInfo)
  },
  methods: {
    openEdit(item){
      this.item = item
      this.page = 'edit'
    },
    openUserList(item){
      this.item = item
      this.page = 'user_list'
    },
    openCertificationList(item){
      this.item = item
      this.page = 'certification_list'
    },
    delFixedLevel (item) {
      let that = this
      this.$confirm({
        title: '请注意',
        content: '删除后该等级用户将转化为动态等级会员',
        onOk () {
          delFixedLevel(item.id).then((res)=>{
            that.$message.success('删除成功')
            that.$refs.table.refresh()
          })
        },
        onCancel () {}
      })
    },
    download (item) {
      const loading = Loading.service({
        lock: true,
        text: '拼命加载中...'
        // spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.9)'
      })
      let that = this
      let name = item.level_name
      generateCode(item.id).then(res=>{
        // console.log(res)
        let base64 =  `data:image/png;base64,${res.data}`
        // console.log(base64)
        // 图片转为base64
        var blob = that.convertBase64UrlToBlob(base64); // 转为blob对象
        
        // 下载
        if (that.myBrowser() == "IE") {
          window.navigator.msSaveBlob(blob, name + ".jpg");
        } else if (that.myBrowser() == "FF") {
          window.location.href = url;
        } else {
          var a = document.createElement("a");
          a.download = name;
          a.href = URL.createObjectURL(blob);
          a.click();
        }
        loading.close()
      })
    },
    // 转换成 blob 对象
    convertBase64UrlToBlob(base64) {
      var parts = base64.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; i++) {
          uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    // 判断浏览器的类型
    myBrowser() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      if (userAgent.indexOf("OPR") > -1) {
          return "Opera";
      } //判断是否Opera浏览器 OPR/43.0.2442.991
      if (userAgent.indexOf("Firefox") > -1) {
          return "FF";
      } //判断是否Firefox浏览器  Firefox/51.0
      if (userAgent.indexOf("Trident") > -1) {
          return "IE";
      } //判断是否IE浏览器  Trident/7.0; rv:11.0
      if (userAgent.indexOf("Edge") > -1) {
          return "Edge";
      } //判断是否Edge浏览器  Edge/14.14393
      if (userAgent.indexOf("Chrome") > -1) {
          return "Chrome";
      } // Chrome/56.0.2924.87
      if (userAgent.indexOf("Safari") > -1) {
          return "Safari";
      } //判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
    },
    delTag () {
      this.$confirm({
        title: '操作提示',
        content: '撤回后将删除本次导入的客户数据，用户已授权的数据不会删除，请确认是否继续',
        onOk () {
          return new Promise((resolve, reject) => {
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
  }
}
</script>
<style lang="less" scoped>
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
}

.actionBtns {
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  margin: 16px 0;
  button {
    margin-right: 8px;
  }
}
.screen-box {
  padding: 27px 0 24px 0;
  .screen-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: #040a46;
  }
}
.search-btn {
  margin-left: 72px;
  margin-top: 8px;
}
.showDataForTable {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 60px;
  overflow: hidden;
  .showSearchAndTotal {
    height: 63px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #040a46;
    line-height: 24px;
    padding: 23px 0 16px 0;
  }
  .dec {
    color: #3c3c46;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
.themeColor {
  color: #7c7ee2;
}
.select-all {
  margin-left: 16px;
  cursor: pointer;
}
</style>
