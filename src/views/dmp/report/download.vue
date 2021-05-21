<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff' }">
      <div class="head-title">下载列表</div>
      <a-card :bordered="false" class="download">
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
          <div class="search">
            <div class="searchItem">
              <a-form-item label="月报时间">
                <a-input placeholder="请输入到处报表名称" v-model="input" />
              </a-form-item>
            </div>
            <div class="searchItem">
              <a-form-item label="类型">
                <a-select style="display: block">
                  <a-select-option value="jack">
                    Jack (100)
                  </a-select-option>
                  <a-select-option value="lucy">
                    Lucy (101)
                  </a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div class="searchItem">
              <a-form-item label="月报时间">
                <a-month-picker :format="'YYYY-MM'" v-decorator="['time']" style="display: block" />
              </a-form-item>
            </div>
            <div class="searchItem">
              <a-form-item :wrapper-col="{ offset: 8 }">
                <a-button type="primary" html-type="submit">
                  查询
                </a-button>
              </a-form-item>
            </div>
          </div>
        </a-form>
        <h3 style="margin-top: 10px">列表</h3>
        <div class="showDataForTable">
          <s-table ref="table" size="default" rowKey="id" :columns="columns" :data='loadData'>
            <span slot="action" slot-scope="text, record">
              <template>
                <a :href="record.report_url" download="下载模板">下载</a>
              </template>
            </span>
          </s-table>
        </div>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { STable } from '@/components'
import {download} from '@/api/data'

export default {
  name: 'Monthly',

  components: {
    STable
  },


  data () {
    return {
        url:'',
      queryParam: {
		 
	  },
      input:'',
      columns: [
        {
          title: '导出报表名称',
          dataIndex: 'report_name'
        },
        {
          title: '类型',
          dataIndex: 'report_type'
        },
        {
          title: '下载次数',
          dataIndex: 'download_count',
        },
        {
          title: '报表生成时间',
          dataIndex: 'generate_time',
        },
        {
          title: '导出人',
          dataIndex: 'user_name',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
          let params = {
                page: parameter.pageNo, // 页码
               limit: parameter.pageSize, // 每页页数
          }
        return download(Object.assign(params)).then(res => {
		  return {
              data:res.data,
              pageNo: parameter.pageNo,  // 当前页码
              pageSize: parameter.pageSize,  // 每页页数
              totalCount: res.pageSize, // 列表总条数
              totalPage: res.countPage // 列表总页数
          
          }
        })
      }
    }
  },

  beforeCreate () {
    this.form = this.$form.createForm(this, { name: '' })
    console.log(this.form)
  },


  methods: {
    // search
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
          console.log(err)
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
	// delTag(value){
    //     console.log(value)
	// 	location.href(value.report_url)
	// }
  },
  created(){

  }
  
}
</script>

<style lang="less">
.head-title {
  font-size: 16px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  display: flex;
}

.search {
  display: flex;
  flex-wrap: wrap;
  padding-top: 24px;
  background: #f5f5fa;

  .searchItem {
    width: 33%;
  }
}
</style>
