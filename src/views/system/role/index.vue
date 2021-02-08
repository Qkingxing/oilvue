<template>
  <div class="mainContainreBox">
    <div class="mainContainreBlock">
      <div class="container">
        <div class="group">
          <div class="title_model">
            <div class="main_label">超级管理员权限设置</div>
          </div>
          <div class="content">
            <div class="contentBlock">
              <div class="contentMain">
                <!-- 搜索 -->
                <div class="search">
                  <a-form ref="queryForm" :inline="true" layout="inline">
                    <a-form-item label="角色名称">
                      <a-input placeholder="请输入角色名称" style="width: 200px" />
                    </a-form-item>

                    <a-form-item label="权限字符">
                      <a-input placeholder="请输入权限字符" style="width: 200px" />
                    </a-form-item>

                    <a-form-item label="状态">
                      <a-select placeholder="角色状态" style="width: 200px">
                        <a-select-option value="china0">China0</a-select-option>
                        <a-select-option value="china1">China1</a-select-option>
                        <a-select-option value="china2">China2</a-select-option>
                      </a-select>
                    </a-form-item>

                    <a-form-item label="创建时间">
                      <a-range-picker
                        style="width: 200px"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      >
                      </a-range-picker>
                    </a-form-item>

                    <a-button>搜索</a-button>
                    <a-button>重置</a-button>
                  </a-form>
                </div>
                <!-- 编辑 -->
                <div class="setting"><a-button>添加</a-button><a-button>编辑</a-button><a-button>删除</a-button></div>
                <!-- table -->
                <a-table :columns="columns" :data-source="data">
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                  <span slot="tags" slot-scope="tags">
                    <a-tag
                      v-for="tag in tags"
                      :key="tag"
                      :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                    >
                      {{ tag.toUpperCase() }}
                    </a-tag>
                  </span>
                  <span slot="action" slot-scope="text, record">
                    <a>Invite 一 {{ record.name }}</a>
                    <a-divider type="vertical" />
                    <a>Delete</a>
                    <a-divider type="vertical" />
                    <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default {
  name: 'Role',

  data () {
    return {
      data,
      columns
    }
  }
}
</script>

<style lang="less" scoped>
.mainContainreBox {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  .mainContainreBlock {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 25px;
    background: #fff;
    min-width: 1004px;
    height: 787px;
    .container {
      box-sizing: border-box;
      .group {
        box-sizing: border-box;
        .title_model {
          position: relative;
          padding: 24px 0 16px;
          border-bottom: 1px solid #eaeaf4;
          display: flex;
          align-items: center;
          vertical-align: bottom;
          .main_label {
            font-size: 16px;
            margin-right: 16px;
            font-weight: 700;
            color: #040a46;
            span {
              font-size: 14px;
              color: #9696a0;
              margin-left: 20px;
            }
          }
        }
        .content {
          padding: 3rem 2rem;
          display: flex;
          .contentBlock {
            display: block;
            width: 100%;
            .contentMain {
              display: flex;
              flex-wrap: wrap;
              width: calc(100% + 21px);
            }
          }
        }
      }
    }
  }
}

.contentMain {
  display: flex;
  flex-direction: column;

  .search {
    display: flex;
    align-items: center;

    .ant-btn {
      margin-right: 20px;
    }
  }

  > .setting {
    padding: 10px 0;

    .ant-btn {
      margin-right: 20px;
    }
  }
}
</style>
