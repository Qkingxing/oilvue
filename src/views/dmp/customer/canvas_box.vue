<template>
  <div id="canvas_box" ref="canvas_box9"></div>
</template>

<script>
import { Chart } from '@antv/g2'
export default {
  props: ['lineChart'],
  data() {
    return {
      lists: [],
      data: [],
    }
  },
  mounted() {
    this.biao3()
  },
  watch: {
    lineChart: {
      immediate: true,
      handler(newObj, index) {
        console.log(newObj)
        this.lists = newObj

        for (let i = 0; i < newObj.series.length; i++) {
          for (let j = 0; j < newObj.xAxis.length; j++) {
            let item = {}
            item.month = newObj.xAxis[j]
            item.city = newObj.legend[i]
            item.temperature = newObj.series[i][j]
            this.data.push(item)
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    biao3() {
      const chart = new Chart({
        container: this.$refs.canvas_box9,
        autoFit: true,
        height: 500,
      })

      
      chart.data(this.data)
    
      chart.scale({
        month: {
          range: [0, 1],
        },
        temperature: {
          nice: true,
        },
      })

      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      })

      chart.axis('temperature', {
        label: {
          formatter: (val) => {
            return val + ' °C'
          },
        },
      })

      chart.line().position('month*temperature').color('city').shape('smooth')

      chart.point().position('month*temperature').color('city').shape('circle')

      chart.render()
    },
  },
}
</script>

<style lang='scss' scoped>
#canvas_box {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  cursor: default;
}
</style>