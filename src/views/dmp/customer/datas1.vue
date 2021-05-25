<template>


  <div class="times">
    <div style=" display: flex;">
      <div class="searchs" style="margin-top: 15px">
        <div
          class="search-lis"
          :key="item.key"
          v-for="item in dates"
          :class="`${item.key == dateKey ? 'actives' : ''}`"
          @click="changeDate(item.key)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="shijian" v-if="show1">
        <a-range-picker @change="onChange" />
      </div>
    </div>

    <div v-if="dateKey == 'jintian'">
        <div class="headr_char">
            <div class="chart_treema_box">
            <span class="span">认证类型占比</span>
            <canvas_box2 :arrBiao='arrBiao'></canvas_box2>
            </div>
            <div class="chart_line_box">
            <span class="span">新增认证人数折线图</span>
            <canvas_box3 :arrBiao='arrBiao'></canvas_box3>
            </div>
        </div>
        <div class="head_title">
            <div class="title_top_size">消费人数趋势</div>
            <div class="xiaofei">
                <a-popover placement="bottom">
                    <template slot="content">
                    <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
                        
                        <span @click="pie" style="cursor: pointer">消费金额趋势</span>
                    </div>
                    </template>

                    <!-- <a-button >切换</a-button> -->
                </a-popover>
            </div>
        </div>
        <div class="draw_chart_line_center" v-if="a">
            <canvas_box4 :arrBiao='arrBiao'></canvas_box4>
        </div>
         <div class="draw_chart_line_center" v-if="!a">
            <canvas_box4 :arrBiao='arrBiao'></canvas_box4>
        </div>
        <div class="head_title">
            <div class="title_top_size">
            <div class="">
                车辆认证整体数据
                <i class="more_info anticon anticon-question-circle">
                <a-popover title="会员人数" overlayClassName="note">
                    <template slot="content">
                    <div class="" style="width: 200px">
                        <p>查询时间内的累计会员人数（没有去除查询时间内会员等级失效的人数）</p>
                    </div>
                    </template>
                    <span class="anticon">
                    <a-icon type="question-circle" />
                    </span>
                </a-popover>
                </i>
            </div>
            <!-- <a-button>导出数据</a-button> -->
            </div>
        </div>
        <div class="page-content">
            <a-table style="margin-top: 8px" :columns="columns" :data-source="[]" />
        </div>
    </div>



 









    <div v-if="dateKey == 'zuotian'">
       <div class="headr_char">
            <div class="chart_treema_box">
            <span class="span">认证类型占比</span>
            <canvas_box2 :arrBiao='arrBiao'></canvas_box2>
            </div>
            <div class="chart_line_box">
            <span class="span">新增认证人数折线图</span>
            <canvas_box3 :arrBiao='arrBiao'></canvas_box3>
            </div>
        </div>
        <div class="head_title">
            <div class="title_top_size">消费人数趋势</div>
            <div class="xiaofei">
                <a-popover placement="bottom">
                    <template slot="content">
                    <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
                        
                        <span style="cursor: pointer">消费金额趋势</span>
                    </div>
                    </template>

                    <!-- <a-button @click="pie">切换</a-button> -->
                </a-popover>
            </div>
        </div>
        <div class="draw_chart_line_center" v-if="a">
            <canvas_box4 :arrBiao='arrBiao'></canvas_box4>
        </div>
        <div class="draw_chart_line_center" v-if="!a">
            <canvas_box4 :arrBiao='arrBiao'></canvas_box4>
        </div>
        <div class="head_title">
            <div class="title_top_size">
            <div class="">
                车辆认证整体数据
                <i class="more_info anticon anticon-question-circle">
                <a-popover title="会员人数" overlayClassName="note">
                    <template slot="content">
                    <div class="" style="width: 200px">
                        <p>查询时间内的累计会员人数（没有去除查询时间内会员等级失效的人数）</p>
                    </div>
                    </template>
                    <span class="anticon">
                    <a-icon type="question-circle" />
                    </span>
                </a-popover>
                </i>
            </div>
            <!-- <a-button>导出数据</a-button> -->
            </div>
        </div>
        <div class="page-content">
            <a-table style="margin-top: 8px" :columns="columns" :data-source="[]" />
        </div>
    </div>
    <div v-if="dateKey == 'benzhou'">
        <div class="headr_char">
            <div class="chart_treema_box">
            <span class="span">认证类型占比</span>
            <canvas_box2 :arrBiao='arrBiao'></canvas_box2>
            </div>
            <div class="chart_line_box">
            <span class="span">新增认证人数折线图</span>
            <canvas_box3 :arrBiao='arrBiao'></canvas_box3>
            </div>
        </div>
        <div class="head_title">
            <div class="title_top_size">消费人数趋势</div>
            <div class="xiaofei">
                <a-popover placement="bottom">
                    <template slot="content">
                    <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
                        
                        <span @click="pie" style="cursor: pointer">消费金额趋势</span>
                    </div>
                    </template>

                    <!-- <a-button>切换</a-button> -->
                </a-popover>
            </div>
        </div>
        <div class="draw_chart_line_center">
            <canvas_box4 :arrBiao='arrBiao'></canvas_box4>
        </div>
        <div class="head_title">
            <div class="title_top_size">
            <div class="">
                车辆认证整体数据
                <i class="more_info anticon anticon-question-circle">
                <a-popover title="会员人数" overlayClassName="note">
                    <template slot="content">
                    <div class="" style="width: 200px">
                        <p>查询时间内的累计会员人数（没有去除查询时间内会员等级失效的人数）</p>
                    </div>
                    </template>
                    <span class="anticon">
                    <a-icon type="question-circle" />
                    </span>
                </a-popover>
                </i>
            </div>
            <!-- <a-button>导出数据</a-button> -->
            </div>
        </div>
        <div class="page-content">
            <a-table style="margin-top: 8px" :columns="columns" :data-source="[]" />
        </div>
    </div>
    <div v-if="dateKey == 'benyue'">
        <div class="headr_char">
            <div class="chart_treema_box">
            <span class="span">认证类型占比</span>
            <canvas_box2 :arrBiao='arrBiao'></canvas_box2>
            </div>
            <div class="chart_line_box">
            <span class="span">新增认证人数折线图</span>
            <canvas_box3 :arrBiao='arrBiao'></canvas_box3>
            </div>
        </div>
        <div class="head_title">
            <div class="title_top_size">消费人数趋势</div>
            <div class="xiaofei">
                <a-popover placement="bottom">
                    <template slot="content">
                    <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
                        
                        <span @click="pie" style="cursor: pointer">消费金额趋势</span>
                    </div>
                    </template>

                    <!-- <a-button>切换</a-button> -->
                </a-popover>
            </div>
        </div>
        <div class="draw_chart_line_center">
            <canvas_box4 :arrBiao='arrBiao'></canvas_box4>
        </div>
        <div class="head_title">
            <div class="title_top_size">
            <div class="">
                车辆认证整体数据
                <i class="more_info anticon anticon-question-circle">
                <a-popover title="会员人数" overlayClassName="note">
                    <template slot="content">
                    <div class="" style="width: 200px">
                        <p>查询时间内的累计会员人数（没有去除查询时间内会员等级失效的人数）</p>
                    </div>
                    </template>
                    <span class="anticon">
                    <a-icon type="question-circle" />
                    </span>
                </a-popover>
                </i>
            </div>
            <a-button>导出数据</a-button>
            </div>
        </div>
        <div class="page-content">
            <a-table style="margin-top: 8px" :columns="columns" :data-source="[]" />
        </div>
    </div>
    <div v-if="dateKey == 'zidingyi'">
       <div class="headr_char">
            <div class="chart_treema_box">
            <span class="span">认证类型占比</span>
            <canvas_box2 :arrBiao='arrBiao'></canvas_box2>
            </div>
            <div class="chart_line_box">
            <span class="span">新增认证人数折线图</span>
            <canvas_box3 :arrBiao='arrBiao'></canvas_box3>
            </div>
        </div>
        <div class="head_title">
            <div class="title_top_size">消费人数趋势</div>
            <div class="xiaofei">
                <a-popover placement="bottom">
                    <template slot="content">
                    <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
                        
                        <span @click="pie" style="cursor: pointer">消费金额趋势</span>
                    </div>
                    </template>

                    <!-- <a-button>切换</a-button> -->
                </a-popover>
            </div>
        </div>
        <div class="draw_chart_line_center">
            <canvas_box4 :arrBiao='arrBiao'></canvas_box4>
        </div>
        <div class="head_title">
            <div class="title_top_size">
            <div class="">
                车辆认证整体数据
                <i class="more_info anticon anticon-question-circle">
                <a-popover title="会员人数" overlayClassName="note">
                    <template slot="content">
                    <div class="" style="width: 200px">
                        <p>查询时间内的累计会员人数（没有去除查询时间内会员等级失效的人数）</p>
                    </div>
                    </template>
                    <span class="anticon">
                    <a-icon type="question-circle" />
                    </span>
                </a-popover>
                </i>
            </div>
            <!-- <a-button>导出数据</a-button> -->
            </div>
        </div>
        <div class="page-content">
            <a-table style="margin-top: 8px" :columns="columns" :data-source="[]" />
        </div> 
    </div>
  </div>



 



   
</template>

<script>
import canvas_box2 from './canvas_box2'
import canvas_box3 from './canvas_box3'
import canvas_box4 from './canvas_box4'
export default {
  props:['arrBiao'],
  components:{canvas_box2,canvas_box3,canvas_box4},
  data() {
    return {
        a:true,
        dateKey: 'jintian',
        index:1,
        dateString:[],
        show1:false,
        dates: [
        { key: 'jintian', name: '今日' },
        { key: 'zuotian', name: '本周' },
        { key: 'benzhou', name: '本月' },
        { key: 'benyue', name: '上月' },
        { key: 'zidingyi', name: '自定义' },
        
      ],
      columns: [
        {
          title: '日期',
          dataIndex: '日期',
          key: '日期',
        },
        {
          title: '油站名字',
          dataIndex: '油站名字',
          key: '油站名字',
        },
        {
          title: '身份认证类型',
          dataIndex: '身份认证类型',
          key: '身份认证类型',
        },
        {
          title: '身份认证人数',
          dataIndex: '身份认证人数',
          key: '身份认证人数',
        },
        {
          title: '消费人数',
          dataIndex: '消费人数',
          key: '消费人数',
        },
        {
          title: '会员人数',
          dataIndex: '会员人数',
          key: '会员人数',
        },
        {
          title: '积分人数',
          dataIndex: '积分人数',
          key: '积分人数',
        },
        {
          title: '消费金额',
          dataIndex: '消费金额',
          key: '消费金额',
        },
        {
          title: '积分值',
          dataIndex: '积分值',
          key: '积分值',
        },
        {
          title: '操作',
          dataIndex: '操作',
          key: '操作',
        },
      ],
    }
  },
  methods: {
    changeDate(key) {
       if(key == 'jintian'){
		   this.show1 = false
           this.index = 1
		   this.$parent.biao(1)
           
       }
       if(key == 'zuotian'){
	    this.show1 = false
        this.index = 2
         this.$parent.biao(2)
       
       }
        if(key == 'benzhou'){
		this.show1 = false
        this.index = 3
        this.$parent.biao(3)
       }
        if(key == 'benyue'){
		this.show1 = false
        this.index = 4
         this.$parent.biao(4)
        
       }
	   if(key == 'zidingyi'){
		   this.show1 = true
           this.index = 5
	   }
      this.dateKey = key
    },
      onChange(date, dateString) {

        this.$parent.biao(5,dateString)
      
    },
    pie(){
        this.a = !this.a
    }
  },
}
</script>

<style lang='scss' scoped>

.times {
    .ant-btn {
    border: 1px solid transparent; //自定义边框
    outline: none; //消除默认点击蓝色边框效果
    color: #7C7EE2;
    margin: 0;
    padding: 0;
    line-height: 59px;
  }
  .ant-btn:hover {
    background-color: #fff;
    border-color: #ffffff !important;
    color: #ffffff;
  }
  .a-popper {
    margin-top: 0;
    .text {
      color: red;
      margin-bottom: 3px;
      text-align: center;
      cursor: pointer;
    }
  }
  .shijian {
 
    .ant-calendar-picker {
      width: 240px;
      padding-top: 15px;
      padding-left: 10px;
      .ant-input {
        display: block;
        height: 40px;
      }
    }
  }
}

.searchs {
  width: 300px;
  height: 40px;
  border: 1px solid #eaeaf4;
  display: flex;
  align-items: center;

  .search-lis {
    width: 100px;
    border-right: 1px solid #eaeaf4;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #040a46;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: #7C7EE2;
    }

    &.actives {
      //   width: ;100px
      width: 100px;
      color: #3c85ff;
      border: 1px solid;
      background: #ecf3ff;
    }
   
  }
}
  .ant-card {
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid #e8e8e8;
    overflow: hidden;
  }
  .headr_char {
    width: 100%;
    height: 400px;
    display: flex;
    padding-bottom: 30px;
    border-bottom: 1px solid #e8e8e8;
    .chart_treema_box {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .span {
        margin-left: -50px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #040a46;
        padding-bottom: 20px;
      }
    }
    .chart_line_box {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .span {
        margin-left: -50px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #040a46;
        padding-bottom: 20px;
      }
    }
  }
  .head_title {
    margin-top: 30px;
    display: flex;
    position: relative;
    .title_top_size {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      color: #040a46;
      padding-bottom: 20px;
    }
    .xiaofei {
      position: absolute;
      left: 97px;
      top: -18px;
    }
    .title_top_size {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      color: #040a46;
      padding-bottom: 20px;
      .more_info {
        margin-left: 7px;
        font-size: 12px;
        color: rgb(203, 203, 203);
      }
    }
  }
  .draw_chart_line_center {
    width: 100%;
    height: 400px;
    margin-left: 20px;
  }
  .page-content {
    box-sizing: border-box;
  }
  .dates {
    width: 0;
    height: 0;
    position: relative;
    top: -20px;
  }
  .ant-menu {
    .ant-menu-item {
      padding-left: 25px;
    }
  }
  .dev {
    position: relative;
    top: -38px;
    left: 349px;
    height: 0;
    margin-left: 7px;
    font-size: 12px;
    color: #cbcbcb;
    cursor: pointer;
  }
  .dev1 {
    position: relative;
    height: 0;
    top: -38px;
    left: 252px;
    margin-left: 7px;
    font-size: 12px;
    color: #cbcbcb;
    cursor: pointer;
  }
  .content {
    box-sizing: border-box;
    .head_title {
      height: 20px;
      margin: 20px 0;
    }
    .overflow_box {
      border: none;
    }
  }

 




</style>