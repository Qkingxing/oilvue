<template>
  <div id="charts" ref="charts"></div>
</template>

<script>
import { Chart } from '@antv/g2'

export default {
    props:['lineChart1'],
    watch:{
        lineChart1:{
            immediate: true,
            handler(value){
                console.log(value)
                this.lists = value
            },
            deep: true,
        }
    },
  data () {
    return {
        lists:{},
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
      for(let i = 0; i < this.lists.length; i++){
          for(let j = 0; j < this.lists[i].data.length; j++){
             let item ={}
             item.year = this.lists[i].data[j].yaer
             item.value = this.lists[i].data[j].value
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
