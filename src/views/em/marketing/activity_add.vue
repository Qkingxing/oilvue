
<template>
  <a-layout class="activity_add">
    <a-layout-content :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="activity-list">
        <div class="activity">
          <div class="activity-img">
            <img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/02/25/18/86a20f69758f635c330f1854ece1.png">
          </div>
          <div class="activity-head">
            <div class="activity-title">价立减</div>
            <div class="activity-btn">
              <span class="activity-btn-text">立即创建</span>
              <i aria-label="图标: right-circle" class="anticon anticon-right-circle"><svg
                viewBox="64 64 896 896"
                data-icon="right-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
              </i>
            </div>
          </div>
          <div class="activity-labellist">
            <div class="activity-label">留存</div>
            <div class="activity-label">会员日</div>
            <div class="activity-label">价格战</div>
            <div class="activity-label">提升进站率</div>
          </div>
          <div class="activity-desc">指定时间段优惠直降，提升低峰期销售额，打造会员日</div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'ActivityAdd',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.activity_add {
  .activity-list {
    display: flex;
    flex-wrap: wrap;
    padding: 24px 8px;
    .activity {
      width: 278px;
      min-height: 290px;
      background: #fff;
      box-shadow: 0 0 4px 0 hsl(0deg,0%,75% / 50%);
      padding: 10px 10px 19px 10px;
      box-sizing: border-box;
      margin: 0 40px 40px 0;
      overflow: hidden;
      transition: transform .3s ease;
      .activity-img {
        width: 258px;
        height: 145px;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .activity-head {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .activity-title {
          font-size: 16px;
          color: #1e1e28;
          flex: 1;
        }
        .activity-btn {
          color: #1e3cfa;
          font-size: 14px;
          cursor: pointer;
          .activity-btn-text {

          }
        }
      }
    }
  }
}
</style>
