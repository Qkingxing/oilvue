<template>
  <a-layout>
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="head-title">
        短信购买
      </div>
      <div class="content">
        <div class="content-item">
          <div class="item-left">商品</div>
          <div class="item-right">通知短信</div>
        </div>
        <div class="content-item">
          <div class="item-left">购买数量</div>
          <div class="item-right">
            <div class="more-wrap">
              <div class="wrap-item">
                <div class="wrap-item-title">油站</div>
                <div class="more_item_content">
                  <el-select
                    multiple
                    collapse-tags
                    v-model="site_ids"
                    @change="val => selectAll(val)"
                    placeholder="请选择"
                    style="width: 240px;"
                    size="medium"
                  >
                    <el-option
                      v-for="selectItem in companies"
                      :key="selectItem.id"
                      :label="selectItem.site_name"
                      :value="selectItem.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="wrap-item">
                <div class="wrap-item-title">数量</div>
                <div class="more_item_content">
                  <div class="small_box" :class="{'small_box_select': item.isActive}" v-for="(item,i) in radioGroup" :key="i" @click="handleChange(item)">
                    <div class="small_box_recommend">
                      <div class="small_box_recommend_title" v-if="item.recommend">推荐</div>
                    </div>
                    <div class="small_box_title">
                      <template v-if="item.amount">
                        <div class="small_box_title_total">{{ item.amount }}</div>
                        <span style="margin-left: 8px;">条</span>
                      </template>
                      <template v-else>
                        <div class="customize_wrap">
                          <a-input class="customize_wrap_input" placeholder="其他数量" type="number" :maxLength="3" />
                        </div>
                      </template>
                    </div>
                    <div class="small_box_content">
                      <div class="small_box_title_sum">低至{{ item.price }}元/条</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="more_btn" @click="add">
              <a-icon type="plus" /><span style="margin-left:8px;">继续添加</span>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="item-left">金额</div>
          <div class="item-right">
            <span style="font-size: 24px; color: rgb(51, 51, 51); font-weight: bold;">0</span>
            <span style="line-height:28px;margin-left:8px;">元</span>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { getAllSiteList } from '@/api/support'
export default {
  name: 'Record',
  data () {
    return {
      companies: [],
      site_ids: [],
      radioGroup: [
        { id: 1, recommend: true, price: 0.037, amount: '10,000', isActive: true },
        { id: 2, recommend: false, price: 0.038, amount: '5,000', isActive: false },
        { id: 3, recommend: false, price: 0.043, amount: '2,000', isActive: false },
        { id: 4, recommend: false, price: 0.5, isActive: false }
      ],
      buyList: []
    }
  },
  async created () {
    const res = await getAllSiteList()
    console.log(res)
    this.companies = res.data.data
  },
  methods: {
    selectAll (val) {
      const allValues = this.companies.map(item => {
        return item.id
      })
      // 若选择全部
      if (val.includes('')) {
        this.site_ids = allValues
      }

      // 计算价格
    },
    handleChange (radioData) {
      this.radioGroup.forEach(x => {
        x.isActive = false
        if (x.id === radioData.id) {
          x.isActive = true
        }
      })
    },
    add () {

    }
  }
}
</script>

<style lang="scss" scoped>
.head-title {
  font-size: 14px;
  color: #040a46;
  height: 55px;
  line-height: 41px;
  border-bottom: 1px solid #eaeaf4;
  line-height: 60px;
  margin-bottom: 28px;
}

.content-item {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  .item-left {
    width: 112px;
    text-align: right;
    color: #1e1e28;
    margin-right: 16px;
  }
  .item-right {
    flex: 1;
  }
  .more-wrap {
    position: relative;
    width: 800px;
    padding: 24px;
    box-sizing: border-box;
    background: #f5f5fa;
    margin-bottom: 8px;
    .wrap-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .wrap-item-title {
        width: 28px;
        color: #1e1e28;
        margin-right: 16px;
        white-space: nowrap;
      }
      .more_item_content {
        width: 100%;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        flex-wrap: wrap;
      }
    }
    .small_box {
      width: 160px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgb(255, 255, 255);
      border-radius: 4px;
      border: 1px solid rgb(228, 231, 240);
      margin: 0px 9px 8px 0px;
      &:hover {
        border-color: #7c7ee2;
      }
      &.small_box_select {
        border-color: #7c7ee2;
      }
      .small_box_recommend {
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: flex-start;
        .small_box_recommend_title {
          width: 32px;
          height: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #7c7ee2;
          border-radius: 4px 0px;
          font-weight: 400;
          font-size: 12px;
          color: rgb(255, 255, 255);
          margin: -1px 0px 0px -1px;
        }
      }
      .small_box_title {
        width: 136px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        padding: 0px 0px 10px;
        color: rgb(30, 30, 40);
        border-bottom: 1px solid rgb(234, 234, 244);
        .small_box_title_total {
          font-size: 24px;
          color: rgb(30, 30, 40);
        }
      }
      .small_box_content {
        margin-top: 5px;
        .small_box_title_sum {
          font-size: 12px;
          line-height: 18px;
          font-family: PingFangSC-Regular, "PingFang SC";
          font-weight: 400;
          color: rgb(150, 150, 160);
        }
      }
      .customize_wrap {
        margin-bottom: 4px;
      }
      .customize_wrap_input {
        font-size: 18px;
        border: none;
        text-align: center;
        font-weight: 700;
        color: #1e1e28;
        &:focus {
          border: none;
        }
        &:hover {
          border: none;
        }
      }
    }
  }
  .more_btn {
    width: 800px;
    height: 48px;
    background: rgb(255, 255, 255);
    border: 1px dashed rgb(234, 234, 244);
    display: flex;
    align-items: center;
    color: rgb(30, 30, 40);
    font-size: 14px;
    padding-left: 26px;
    box-sizing: border-box;
    margin-top: 8px;
    cursor: pointer;
  }
}
</style>
