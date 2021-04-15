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
                <div class="wrap-item-title">
                  <el-select
                    multiple
                    collapse-tags
                    @change="(val)=>selectAll(val,index,cIndex)"
                    placeholder="请选择"
                    style="width: 240px;">
                    <el-option
                      v-for="(selectItem, selectIndex) in companies"
                      :key="selectIndex"
                      :label="selectItem.name"
                      :value="selectItem.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="wrap-item">
                <div class="wrap-item-title">数量</div>
                <div class="wrap-item-title">radio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { STable } from '@/components'

export default {
  name: 'Record',
  components: {
    STable
  },
  data () {
    return {
      companies: []
    }
  },
  created () {
  },
  methods: {
    selectAll () {

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
      .wrap-item-title {
        width: 28px;
        color: #1e1e28;
        margin-right: 16px;
        white-space: nowrap;
      }
    }
  }
}
</style>
