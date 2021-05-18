<template>
  <div id="charts" ref="charts"></div>
</template>

<script>
import { Chart } from '@antv/g2'

export default {
    props:['lineChart1',],
   
  data () {
    return {
    }
  },
  methods: {
    init: function () {
      const chart = new Chart({
        container: this.$refs.charts,
        autoFit: true,
        height: 300
      })
     let data = []
      for(let i = 0; i < this.lineChart1.length; i++){
          for(let j = 0; j < this.lineChart1[i].data.length; j++){
             let item ={}
             item.year = this.lineChart1[i].data[j].yaer
             item.value = this.lineChart1[i].data[j].value
             data.push(item)
          }
      }
      chart.data(data)
      chart.scale({
        year: {
          range: [0, 1]
        },
        value: {
          min: 0,
          nice: true
        }
      })

      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true
      })

      chart
        .line()
        .position('year*value')
        .label('value')
      chart.point().position('year*value')

      chart.render()
    }
  },

  mounted () {
    this.init()
    // this.basicBarChart()
  }
}
</script>

<style></style>
