<template>
  <div>
    <div style="widtn: 300px;height: 300px;" id="container" ref="container"></div>
  </div>
</template>

<script>
import { Pie } from '@antv/g2plot'
export default {
  data() {
    return {
      data: [
        { type: '92#', value: 27 },
        { type: '0#', value: 25 },
        { type: '95#', value: 48 },
      ],
    }
  },
  mounted() {
      this.G2()
  },
  methods: {
    G2() {
      const piePlot = new Pie(this.$refs.container, {
        appendPadding: 10,
        data: this.data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
          value: {
            formatter: (v) => `¥ ${v}`,
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          autoRotate: false,
          style: { textAlign: 'center' },
          formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        },
        statistic: {
          title: {
            offsetY: -8,
          },
          content: {
            offsetY: -4,
          },
        },
        // 添加 中心统计文本 交互
        interactions: [
          { type: 'element-selected' },
          { type: 'element-active' },
          {
            type: 'pie-statistic-active',
            cfg: {
              start: [
                { trigger: 'element:mouseenter', action: 'pie-statistic:change' },
                { trigger: 'legend-item:mouseenter', action: 'pie-statistic:change' },
              ],
              end: [
                { trigger: 'element:mouseleave', action: 'pie-statistic:reset' },
                { trigger: 'legend-item:mouseleave', action: 'pie-statistic:reset' },
              ],
            },
          },
        ],
      })
      console.log(piePlot)
      piePlot.render()
    },
  },
}
</script>

<style>
</style>