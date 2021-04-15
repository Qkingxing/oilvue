
<template>
  <a-layout class="help">
    <template v-if="showDetail">
      <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
        <div class="head-title">
          <span>问题详情</span>
          <a-button @click="showDetail=false">返回上一页</a-button>
        </div>
        <div class="qd_block">
          <div class="qd_header">
            <div class="header_section">{{ detail.intro }}</div>
            <div class="sub_section">更新时间{{ detail.createTime }}</div>
          </div>
          <div class="qd_content">
            <div v-html="detail.e"></div>
          </div>
        </div>
      </a-layout-content>
    </template>
    <template v-else>
      <a-layout-sider class="asider" :style="{ overflow: 'auto', background: '#fff', position: 'relative'}">
        <a-menu class="asider-menu" mode="inline" :default-selected-keys="['']">
          <a-menu-item class="menu-item" :key="item.id" v-for="item in categoryList" @click="handleSelectCategory(item)">
            <img class="menu-icon" :src="item.file" alt="" srcset="">
            <span class="nav-text">{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="content" :style="{ padding: '0 0 24px 24px', background: '#fff', minHeight: '280px' }">
        <div class="search-header">
          <span>{{ selectCategory.name }}</span>
          <a-input-search placeholder="请输入关键字" style="width: 195px" @search="onSearch" />
        </div>
        <s-table
          ref="table"
          :columns="columns"
          :data="loadData"
        >
          <span slot="intro" slot-scope="text, record">
            <template>
              <div style="cursor:pointer;width:100%;" @click="viewDetail(record)">
                <div class="text" style="color:#">{{ text }}</div>
                <div class="time">更新时间：{{ record.updateTime }}</div>
              </div>
            </template>
          </span>
        </s-table>
      </a-layout-content>
    </template>
  </a-layout>
</template>

<script>
import { getArticles, getArticleCategory, getArticleDetail } from '@/api/support'
import { STable } from '@/components'

export default {
  name: 'Help',
  components: {
    STable
  },
  data () {
    return {
      showDetail: false,
      detail: {},
      articles: [],
      categoryList: [],
      selectCategory: {
        name: '全部问题',
        id: ''
      },
      queryParam: {
        articleId: '',
        search: ''
      },
      columns: [
        {
          title: '问题列表',
          dataIndex: 'intro',
          scopedSlots: { customRender: 'intro' }
        }
      ],
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        const params = {
          page: parameter.pageNo, // 页码
          limit: parameter.pageSize // 每页页数
        }
        if (this.queryParam) {
          params.articleId = this.queryParam.articleId,
          params.search = this.queryParam.search
        }
        return getArticles(Object.assign(params))
          .then(res => {
            return {
              data: res.data.data, // 列表数组
              pageNo: parameter.pageNo, // 当前页码
              pageSize: parameter.pageSize, // 每页页数
              totalCount: res.data.total, // 列表总条数
              totalPage: res.data.current_page // 列表总页数
            }
          })
      }
    }
  },
  created () {
    this.getQuestionCategory()
  },
  methods: {
    handleSelectCategory (item) {
      this.selectCategory = item
      this.queryParam = {
        articleId: item.id,
        search: ''
      }
      this.$refs.table.refresh()
    },
    async getQuestionCategory () {
      const res = await getArticleCategory()
      this.categoryList = res.data.data
      console.log(this.categoryList)
    },
    onSearch (value) {
      this.queryParam.search = value
      this.$refs.table.refresh()
    },
    async viewDetail (article) {
      this.showDetail = true
      const res = await getArticleDetail({ articleId: article.articleId })
      console.log(res)
      this.detail = res.data
    }
  }
}
</script>
<style lang="scss" scoped>
.head-title {
  font-size: 17px;
  font-weight: 700;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  margin-bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.asider {
  position: relative;
  .asider-menu {
    overflow: hidden;
    position: relative;
    padding-top: 19px;
    .menu-item {
      display: flex;
      align-items: center;
    }
    .menu-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
}
.content {
  box-sizing: border-box;
  padding-left: 16px;
  .search-header {
    padding: 16px 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaf4;
    font-weight: bold;
    color: #1e1e28;
  }
  .text {
    color: #1e1e28;
    font-size: 14px;
    margin-bottom: 8px;
  }
  .time {
    font-size: 12px;
    color: #9696a0;
    line-height: 17px;
  }
}
.qd_block {
  padding: 0 60px;
  .qd_header {
    padding: 20px 0 16px;
    border-bottom: 1px solid #e4e7f0;
    .header_section {
      margin-bottom: 16px;
      color: #1e1e28;
      font-size: 18px;
      line-height: 25px;
      font-weight: 700;
    }
    .sub_section {
      color: #b1b1b2;
    }
  }
  .qd_content {
    padding: 23px 0 16px;
    border-bottom: 1px solid #eaeaf4
  }
}
</style>
<style lang="scss">
.help {
  .ant-layout-sider-children {
    position: relative !important;
    width: auto;
  }
}
</style>
