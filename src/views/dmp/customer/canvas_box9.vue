<template>

    <div id="canvas_box1" style="width:100%" ref="canvas_box18"></div>

  
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
    console.log(this.lineChart2)
  },
//   watch: {
//     lineChart2: {
//       immediate: true,
//       handler(newObj, index) {
//         console.log(newObj)
//         this.lists = newObj
//         console.log(this.lists)
//       },
//       deep: true,
//     },
//   },
  methods: {
    biao3() {
    let data = []
    console.log(this.lineChart2.series)
      for (let i = 0; i < this.lineChart2.series.length; i++) {
        for (let j = 0; j < this.lineChart2.xAxis.length; j++) {
          let item = {}
          item.month = this.lineChart2.xAxis[j]
          item.city = this.lineChart2.legend[i]
          item.temperature = this.lineChart2.series[i][j]
          data.push(item)
        }
      }
      console.log(data)
      const chart = new Chart({
        container: this.$refs.canvas_box18,
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
            return val + '个'
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