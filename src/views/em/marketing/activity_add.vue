
<template>
  <a-layout class="activity_add">
    <a-layout-content
      v-if="!activityType"
      :style="{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '280px' }">
      <div class="activity-list">
        <div class="activity" @click="createActivity(102)">
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
        <div class="activity" @click="createActivity(5)">
          <div class="activity-img"><img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/02/25/18/b9e564711b53e0dae8248a6d735a.png"></div><div class="activity-head"><div class="activity-title">满额送</div><div class="activity-btn"><span class="activity-btn-text">立即创建</span><i aria-label="图标: right-circle" class="anticon anticon-right-circle"><svg
            viewBox="64 64 896 896"
            data-icon="right-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg></i></div></div><div class="activity-labellist"><div class="activity-label">留存</div><div class="activity-label">提升复购率</div></div><div class="activity-desc">客户到站消费，根据消费额度赠送对应优惠券</div>
        </div>
        <div class="activity" @click="createActivity(103)">
          <div class="activity-img"><img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/04/15/15/b2e289e87f4c0eaf66571585a38a.png"></div><div class="activity-head"><div class="activity-title">满额减</div><div class="activity-btn"><span class="activity-btn-text">立即创建</span><i aria-label="图标: right-circle" class="anticon anticon-right-circle"><svg
            viewBox="64 64 896 896"
            data-icon="right-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg></i></div></div><div class="activity-labellist"><div class="activity-label">留存</div><div class="activity-label">提升复购率</div></div><div class="activity-desc">客户到站消费，根据消费额度直降对应金额</div>
        </div>
        <div class="activity" @click="createActivity(1)">
          <div class="activity-img"><img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/02/25/18/c73d5dbc972582a2f8b406a0c9bd.png"></div><div class="activity-head"><div class="activity-title">红包</div><div class="activity-btn"><span class="activity-btn-text">立即创建</span><i aria-label="图标: right-circle" class="anticon anticon-right-circle"><svg
            viewBox="64 64 896 896"
            data-icon="right-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg></i></div></div><div class="activity-labellist"><div class="activity-label">拉新</div><div class="activity-label">留存</div><div class="activity-label">提升粘性</div></div><div class="activity-desc">通过多样券包组合，实现多样的玩法，提升油站销量</div>
        </div>
        <div class="activity" @click="createActivity(2)">
          <div class="activity-img"><img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/02/25/18/400766c0f715f75b394874c18d66.png"></div><div class="activity-head"><div class="activity-title">幸运抽奖</div><div class="activity-btn"><span class="activity-btn-text">立即创建</span><i aria-label="图标: right-circle" class="anticon anticon-right-circle"><svg
            viewBox="64 64 896 896"
            data-icon="right-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg></i></div></div><div class="activity-labellist"><div class="activity-label">留存</div><div class="activity-label">提升客户粘性</div><div class="activity-label">玩法多样化</div></div><div class="activity-desc">通过大转盘、砸金蛋、刮刮乐等提升客户粘性，提高留存率</div>
        </div>
        <div class="activity" @click="createActivity(10)">
          <div class="activity-img"><img src="https://yy-1258898587.cos.ap-guangzhou.myqcloud.com/public/2020/02/25/18/dff3c308ef33d801a34d46982cfe.png"></div><div class="activity-head"><div class="activity-title">好友邀请</div><div class="activity-btn"><span class="activity-btn-text">立即创建</span><i aria-label="图标: right-circle" class="anticon anticon-right-circle"><svg
            viewBox="64 64 896 896"
            data-icon="right-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg></i></div></div><div class="activity-labellist"><div class="activity-label">拉新</div><div class="activity-label">扩大获客流</div></div><div class="activity-desc">通过现有客户获取更多客户，有效提升油站销量</div>
        </div>
        <div class="activity" @click="createActivity(14)">
          <div class="activity-img"><img src="https://prd-1258898587.cos.ap-beijing.myqcloud.com/public/2021/03/29/16/60da449f5084915c6d78be2a18a0.png"></div><div class="activity-head"><div class="activity-title">积分抵充值</div><div class="activity-btn"><span class="activity-btn-text">立即创建</span><i aria-label="图标: right-circle" class="anticon anticon-right-circle"><svg
            viewBox="64 64 896 896"
            data-icon="right-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""><path d="M666.7 505.5l-246-178A8 8 0 0 0 408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg></i></div></div><div class="activity-labellist"><div class="activity-label">留存</div><div class="activity-label">提升客户粘性</div></div><div class="activity-desc">积分抵充值，吸引更多客户开通加油卡，提升客户粘性</div>
        </div>
      </div>
    </a-layout-content>
    <Add v-if="activityType"></Add>
  </a-layout>
</template>

<script>
export default {
  name: 'ActivityAdd',
  components: {
    Add: () => import('./activity/add')
  },
  data () {
    return {
      activityType: ''
    }
  },
  created () {
  },
  methods: {
    createActivity (activityType) {
      this.activityType = activityType
    }
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
      box-shadow: 0 0 4px 0 #ddd;
      padding: 10px 10px 19px 10px;
      box-sizing: border-box;
      margin: 0 40px 40px 0;
      overflow: hidden;
      transition: transform .3s ease;
      &:hover {
        transform: scale(1.1);
      }
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
          .anticon {
            margin-left: 10px;
            display: inline-block;
            color: inherit;
            font-style: normal;
            line-height: 0;
            text-align: center;
            text-transform: none;
            vertical-align: -.125em;
            text-rendering: optimizeLegibility;
          }
        }
      }
      .activity-labellist {
        margin-top: 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        .activity-label {
          background-color: #eee;
          font-size: 12px;
          padding: 3px 8px;
          line-height: 20px;
          border-radius: 2px;
          margin-bottom: 5px;
          margin-right: 5px;
        }
      }
      .activity-desc {
        margin-top: 10px;
    font-size: 12px;
    color: #1e1e28;
    line-height: 17px
      }
    }
  }
}
</style>
