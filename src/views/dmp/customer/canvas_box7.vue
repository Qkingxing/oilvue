<template>

    <div id="canvas_box1" style="width:100%" ref="canvas_box1"></div>

  
</template>

<script>
import { Chart } from '@antv/g2'
export default {
  props: ['lineChart2'],
  data() {
    return {
      lists: [],
    //   data: [],
    }
  },
  mounted() {
    this.biao3()
  },
  watch: {
    lineChart2: {
      immediate: true,
      handler(newObj, index) {
        console.log(newObj)
        this.lists = newObj
      },
      deep: true,
    },
  },
  methods: {
    biao3() {
    let data = []
      for (let i = 0; i < this.lists.series.length; i++) {
        for (let j = 0; j < this.lists.xAxis.length; j++) {
          let item = {}
          item.month = this.lists.xAxis[j]
          item.city = this.lists.legend[i]
          item.temperature = this.lists.series[i][j]
          data.push(item)
        }
      }
      console.log(data)
      const chart = new Chart({
        container: this.$refs.canvas_box1,
        autoFit: true,
        height: 500,
      })

      chart.data(data)
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
#canvas_box1 {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  cursor: default;
}
</style>