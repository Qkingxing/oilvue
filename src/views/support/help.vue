
<template>
  <a-layout class="help">
    <a-layout-sider class="asider" :style="{ overflow: 'auto', background: '#fff'}">
      <a-menu class="asider-menu" mode="inline" :default-selected-keys="['']">
        <a-menu-item class="menu-item" :key="item.id" v-for="item in categoryList" @click="handleSelectCategory(item)">
          <img class="menu-icon" :src="item.file" alt="" srcset="">
          <span class="nav-text">{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="content">
      <div class="search-header">
        <span>{{selectCategory.name}}</span>
        <a-input-search placeholder="请输入关键字" style="width: 195px" @search="onSearch" />
      </div>
      <div class="article-content">
        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
        >
          <span slot="intro" slot-scope="text, record">
            <template>
              <div style="cursor:pointer" @click="goDetail(record)">
                <div class="text" style="color:#">{{text}}</div>
                <div class="time">更新时间：{{record.updateTime}}</div>
              </div>
            </template>
          </span>
        </s-table>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { getArticles, getArticleCategory } from '@/api/support'
import { STable } from '@/components'

export default {
  name: 'Help',
  components: {
    STable
  },
  data() {
    return {
      articles: [],
      categoryList: [],
      selectCategory: {
        name: '全部问题',
        id: ''
      },
      queryParam: {},
      columns: [
        {
          title: '问题列表',
          dataIndex: 'intro',
          scopedSlots: { customRender: 'intro' }
        },
      ]
    }
  },
  created() {
    this.getQuestionCategory()
  },
  mounted () {
  },
  methods: {
    handleSelectCategory(item) {
      this.selectCategory = item;
      this.queryParam = {
        articleId: item.id,
        search: ''
      }
      this.loadData({
        pageNo: 1,
        pageSize: 10,
      })
    },
    async getQuestionCategory() {
      let res = await getArticleCategory();
      this.categoryList = res.data.data;
      console.log(this.categoryList);
    },
    async getArticles(params) {
      let data = {}
      if(params) {
        data = params
      }
      let res = await getArticles(data);
      this.articles = res.data.data;
      console.log(this.articles)
    },
    onSearch(value) {
      this.getArticles({
        // articles,
        search: value
      })
    },
    loadData: parameter => {
      console.log('loadData.parameter', this)
      let params = {
        page: parameter.pageNo, // 页码
        limit: parameter.pageSize, // 每页页数
      }
      if(this.queryParam) {
        params.articleId = this.queryParam.articleId,
        params.search = this.queryParam.search
      }
      return getArticles(Object.assign(params))
        .then(res => {
          return {
            data: res.data.data, // 列表数组
            pageNo: parameter.pageNo,  // 当前页码
            pageSize: parameter.pageSize,  // 每页页数
            // totalCount: res.data.data.totalCount, // 列表总条数
            // totalPage: res.data.data.totalpage // 列表总页数
          }
        })
    },
  }
}
</script>
<style lang="scss" scoped>
.help {
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 25px;
  background: #fff;
  min-width: 1004px;
  background-color:#fff;
  // height: 650px;
  overflow: auto;
  .asider {
    .asider-menu {
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
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0,0,0,0.15);
}
</style>
