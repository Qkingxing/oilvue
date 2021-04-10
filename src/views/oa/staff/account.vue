
<template>
  <div class="mainContainreBox">
    <div class="mainContainreBlock">
      <div class="container animated fadeIn">
        <div class="head-right-box">
          <div v-if="show == 2" style="width: 100%; border-bottom: 1px solid #eaeaf4">
            <span class="zhang">新增账号</span>
          </div>
          <a-button v-if="show == 1" @click="xinzeng" type="primary">新增账号</a-button>

          <a-input-search
            v-if="show == 1"
            placeholder="请输入员工姓名/账号"
            v-model="input"
            style="width: 200px"
            @search="onSearch"
          />
        </div>
      </div>
      <div v-if="show == 2" style="padding-bottom: 25px">
        <span>账号信息</span>
      </div>
      <div v-if="show == 2" style="width: 400px; margin-left: 50px">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="员工账号">
            <a-input v-model="value1" />
          </a-form-item>
          <a-form-item label="登录密码">
            <a-input-password v-model="value2" />
          </a-form-item>
          <a-form-item label="员工姓名">
            <a-input v-model="value3" />
          </a-form-item>
          <a-form-item label="手机号">
            <a-input v-model="value4" />
          </a-form-item>
        </a-form>
      </div>
      <div v-if="show == 2">
        <span>账号权限</span>
      </div>
      <div v-if="show == 2" style="width: 400px; margin-left: 50px">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="账户类型">
            <a-radio-group name="radioGroup" :default-value="1" @change="c">
              <a-radio :value="1"> 单站账号 </a-radio>
              <a-radio :value="2"> 片区账号 </a-radio>
              <a-radio :value="3"> 集团账号 </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="负责集团">
            <a-select label-in-value :default-value="{ key: '鹰眼一站' }" style="width: 200px" @change="handleChange">
              <a-select-option value="鹰眼一站"> 鹰眼一站 </a-select-option>
              <a-select-option value="鹰眼第二加油站"> 鹰眼第二加油站 </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="账号角色">
            <a-select
              label-in-value
              :default-value="{ key: '请选择账号角色' }"
              style="width: 200px"
              @change="handleChanges"
            >
              <a-select-option v-for="(name, index) in names" :key="index"> {{ name.role_name }} </a-select-option>
              <!-- <a-select-option value="加油员"> 加油员 </a-select-option>
              <a-select-option value="收银员"> 收银员 </a-select-option>
              <a-select-option value="财务员"> 财务员 </a-select-option>
              <a-select-option value="测试"> 测试 </a-select-option> -->
            </a-select>
          </a-form-item>
        </a-form>
      </div>
      <div v-if="show == 2" style="width: 200px; margin: 0 auto">
        <a-button @click="fan">返回</a-button>
        <a-button style="margin-left: 5px" @click="add" type="primary"> 创建 </a-button>
      </div>
      <div class="box" v-if="show == 1">
        <!-- 表格 -->
        <div class="showDataForTable">
          <s-table ref="table" align="right" size="default" rowKey="id" :columns="columns" :data="loadData">
            <span slot="update_time" slot-scope="text, record">
              <template>
                <p v-if="record.account_type == 0">集团账户</p>
                <p v-if="record.account_type == 1">单站账户</p>
                <p v-if="record.account_type == 2">片区账户</p>
              </template>
            </span>
            <span style="padding-left: 30px" slot="youzhan" slot-scope="text, record">
              <template>
                <p>{{ record.role_name }}</p>
              </template>
            </span>
            <span align="center" slot="action" slot-scope="text, record">
              <template>
                <a-popover placement="bottomLeft" v-model="record.visible" trigger="click">
                  <a @click="delTag(record)">编辑</a>
                  <p style="cursor: pointer" slot="content" @click="hide(record, 1)">修改</p>
                  <p style="cursor: pointer" slot="content" @click="hide(record, 2)">删除</p>
                  <span style="cursor: pointer" slot="content" @click="hide(record, 3)">清空操作密码</span>
                </a-popover>
              </template>
            </span>
          </s-table>
        </div>

        <EditTag ref="EditTag" @save="resetList"></EditTag>
      </div>
    </div>
  </div>
</template>

<script>
import { userinfolist } from '@/api/work'
import { STable } from '@/components'
import { eliminatepwd } from '@/api/work'
import { useraccount } from '@/api/work'
import { rolelist } from '@/api/work'
import { userdelete } from '@/api/work'
import EditTag from '../../crm/customer/components/EditTag'
export default {
  name: 'Account',
  components: {
    STable,
    EditTag,
  },
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      pageSize: 20,
      current: 4,
      //   visible: false,
      input: '',
      account_type: 0,
      lists: {},
      num: {},
      show: 1,
      index: '',
      names: {},
      columns: [
        {
          title: '账号',
          dataIndex: 'account',
        },
        {
          title: '员工姓名',
          dataIndex: 'user_name',
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
        },
        {
          title: '账号类型',
          dataIndex: 'update_time',
          scopedSlots: { customRender: 'update_time' },
        },
        {
          title: '员工角色',
          dataIndex: 'youzhan',
          scopedSlots: { customRender: 'youzhan' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loadData: (parameter) => {
        let params = {
          page: parameter.pageNo, // 页码
          size: parameter.pageSize, // 每页页数
          account: this.input,
        }
        return userinfolist(Object.assign(params)).then((res) => {
          // 添加visible布尔值
          res.data.data.forEach((element) => {
            element.visible = false
          })
          return {
            data: res.data.data, // 列表数组
            pageNo: res.data.current_page, // 当前页码
            pageSize: res.data.per_page, // 每页页数
            totalCount: res.data.total, // 列表总条数
            // totalPage: res.data.totalPage // 列表总页数
          }
        })
      },
    }
  },
  created() {
    // this.list()
    this.rolelist()
  },
  methods: {
    rolelist() {
      return rolelist({}).then((res) => {
        this.names = res.data.data
      })
    },
    add() {
      let mobile_mode = /^1[34578]\d{9}$/
      if (mobile_mode.test(this.value4)) {
        let data = {
          role_id: this.index.key,
          user_name: this.value3,
          account: this.value1,
          account_type: this.account_type,
          password: this.value2,
          mobile: this.value4,
        }
        return useraccount(data).then((res) => {
          console.log(res)
          this.show = 1
        })
      } else {
        this.$message.error('请输入正确手机号')
      }
    },
    xinzeng() {
      this.show = 2
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log()
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetList() {
      this.$refs.table.refresh(true)
    },
    delTag(record) {
      console.log(record)
      record.visible = true
    },
    fan() {
      this.show = 1
    },
    hide(record, index) {
      if (index == 1) {
        record.visible = false
      }
      if (index == 2) {
        let that = this
        record.visible = false
        this.$confirm({
          title: '系统温馨提示',
          content: '删除会清除标签全部信息，是否删除？',
          onOk() {
            // console.log(item)
            return userdelete({ id: record.id }).then((res) => {
              console.log(res)
              that.$message.success('删除成功')
            })
            // console.log(res)
          },
          onCancel() {},
        })
      }
      if (index == 3) {
        this.$confirm({
          title: '系统温馨提示',
          content: '清空操作密码后，请登录POS机,"收银助手-设置-密码管理"，重新设置密码',
          onOk() {
            // console.log(item)
            return eliminatepwd({ id: record.id })
              .then((res) => {
                console.log(res)
                record.visible = false
              })
              .catch((err) => {
                console.log(err)
              })
            // console.log(res)
          },
          onCancel() {},
        })
      }
    },
    handleChange(value) {
      console.log(value) // { key: "lucy", label: "Lucy (101)" }
    },
    handleChanges(value) {
      console.log(value) // { key: "lucy", label: "Lucy (101)" }
      this.index = value
    },
    // 选择账号权限
    c(value) {
      this.account_type = value.target.value
    },
    onSearch(value) {
      this.$refs.table.refresh(true)
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
    },
  },
  watch: {
    pageSize(val) {
      console.log('pageSize', val)
    },
    current(val) {
      console.log('current', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.mainContainreBox {
  .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    overflow: auto;

    .container {
      display: flex;
      flex: 1;
      height: 100%;
      padding-bottom: 0;
      .head-right-box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin: 20px 0 20px auto;
        // border-bottom: 1px solid #eaeaf4;
        .zhang {
          font-size: 16px;
          color: #1e1e28;
          line-height: 60px;
          font-weight: bold;
        }
      }
    }
    .box {
      width: 100%;
      .box_1 {
        display: flex;
        height: 54px;
        align-items: center;
        justify-content: space-between;
        background-color: #fafafa;
        border: 1px solid #e8e8e8;
        .a {
          padding-left: 30px;
          width: 180px;
        }
        .b {
          width: 164px;
          text-align: center;
        }
        .c {
          width: 214px;
          text-align: center;
        }
        .d {
          width: 163px;
          text-align: center;
        }
        .e {
          width: 278px;
          text-align: center;
        }
        .f {
          text-align: center;
          width: 112px;
        }
      }
      .box_2 {
        display: flex;
        height: 54px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e8e8e8;
        border-right: 1px solid #e8e8e8;
        border-left: 1px solid #e8e8e8;
        .a {
          padding-left: 30px;
          width: 180px;
        }
        .b {
          width: 164px;
          text-align: center;
        }
        .c {
          width: 214px;
          text-align: center;
        }
        .d {
          width: 163px;
          text-align: center;
        }
        .e {
          width: 278px;
          text-align: center;
        }
        .f {
          text-align: center;
          width: 112px;
          color: #7C7EE2;
          cursor: pointer;
        }
      }
      .box_3 {
        text-align: center;
        padding: 20px 0;
      }
    }
  }
}
</style>