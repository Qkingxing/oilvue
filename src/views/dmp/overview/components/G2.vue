<template>
  
  <div>
<div id="charts" style="width: 400px" ref="charts"></div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2'

export default {
  props:['nums'],
  data() {
    return {
      data: [
        { item: '92#', count: this.nums.fives_oils_actually_paid, d: 0.4 , },
        { item: '0#', count: this.nums.zero_oils_actually_paid, d: 0.21 },
        { item: '95#', count: this.nums.two_oils_actually_paid, d: 0.17 },
      ],
    }
  },
  created(){
      console.log(this.nums)
  },
  watch:{
      nums:{
          handler(value){
              return this.nums = value
          },
          deep:true,
      }
  },
  methods: {
      
    init: function () {
        let thit = this
      const chart = new Chart({
        container: this.$refs.charts,
        autoFit: false,
        height: 300,
        width:600,
      })

      chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.5,
      })
      chart.data(this.data)

      chart.scale('d', {
        formatter: (val) => {
          val = val * 100 + '%'
          return val
        },
      })
      // 声明需要进行自定义图例字段： 'item'
      chart.legend('item', {
        position: 'right', // 配置图例显示位置
        custom: true, // 关键字段，告诉 G2，要使用自定义的图例
        items: thit.data.map((obj, index) => {
            console.log(thit)
          return {
            name: obj.item, // 对应 itemName
            value: obj, // 对应 itemValue
            marker: {
              symbol: 'square', // marker 的形状
              style: {
                r: 5, // marker 图形半径
                fill: chart.getTheme().colors10[index], // marker 颜色，使用默认颜色，同图形对应
              },
            }, // marker 配置
          }
        }),
        itemValue: {
          style: {
            fill: '#999',
          }, // 配置 itemValue 样式
          formatter: (val) => `${val.d * 100}%  ${val.count} 元`, // 格式化 itemValue 内容
        },
      })
      chart
        .interval()
        .adjust('stack')
        .position('d')
        .color('item')
        .style({
          fillOpacity: 1,
        })
        .state({
          active: {
            style: (element) => {
              const shape = element.shape
              return {
                lineWidth: 10,
                stroke: shape.attr('fill'),
                strokeOpacity: shape.attr('fillOpacity'),
              }
            },
          },
        })

      // 移除图例点击过滤交互
      chart.removeInteraction('legend-filter')
      chart.interaction('element-active')

      chart.render()

      // 监听 element 上状态的变化来动态更新 Annotation 信息
      chart.on('element:statechange', (ev) => {
        const { state, stateStatus, element } = ev.gEvent.originalEvent

        // 本示例只需要监听 active 的状态变化
        if (state === 'active') {
          const data = element.getData()
          if (stateStatus) {
            // 更新 Annotation
            updateAnnotation(data)
          } else {
            // 隐藏 Annotation
            clearAnnotation()
          }
        }
      })

      // 绘制 annotation
      let lastItem
      function updateAnnotation(data) {
        if (data.item !== lastItem) {
          chart.annotation().clear(true)
          chart
            .annotation()
            .text({
              position: ['50%', '50%'],
              content: data.item,
              style: {
                fontSize: 20,
                fill: '#8c8c8c',
                textAlign: 'center',
              },
              offsetY: -20,
            })
            .text({
              position: ['50%', '50%'],
              content: data.count,
              style: {
                fontSize: 28,
                fill: '#8c8c8c',
                textAlign: 'center',
              },
              offsetX: -10,
              offsetY: 20,
            })
            .text({
              position: ['50%', '50%'],
              content: '台',
              style: {
                fontSize: 20,
                fill: '#8c8c8c',
                textAlign: 'center',
              },
              offsetY: 20,
              offsetX: 20,
            })
          chart.render(true)
          lastItem = data.item
        }
      }

      // 清空 annotation
      function clearAnnotation() {
        chart.annotation().clear(true)
        chart.render(true)
        lastItem = null
      }
    },
  },

  mounted() {
    this.init()
  },
}
</script>

<style></style>