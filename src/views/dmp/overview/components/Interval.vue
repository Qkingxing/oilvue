<template>
  <div id="Interval" ref="echarts"></div>
</template>

<script>
export default {
  data() {
    return {
      index: 500,
      charts: null
    }
  },
  methods: {
    drawChart() {
      this.charts = this.$echarts.init(this.$refs.echarts)
      // 基于准备好的dom，初始化echarts实例
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        legend: {
          left: 10,
          data: ['92#', '95#', '0#'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: '92#' },
              { value: 310, name: '95#' },
              { value: 234, name: '0#' },
            ],
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      this.charts.setOption(option)
    },
  },

  mounted() {
      this.drawChart()
  },
}
</script>

<style lang='scss'>
#Interval {
  display: flex;
  width: 600px;
  height: 400px;

}
</style>