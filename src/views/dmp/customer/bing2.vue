<template>
  <div id="canvas_box" ref="canvas_box2"></div>
</template>

<script>
// import { Pie } from '@antv/g2plot'
export default {
  props: ['cake3'],
  data() {
    return {
      arrs: [],
    }
  },
  mounted() {
    this.$nextTick(()=>{
        this.biao()
    })
  },
  watch: {
    cake3: {
      immediate: true,
      handler(item) {
        this.arrs = item
      },
      deep: true,
    },
    
  },
  methods: {
    biao() {
      const data = []
      for (let i = 0; i < this.arrs.data.length; i++) {
        let items = {}
          items.type = this.arrs.data[i].name
          items.value = Number(this.arrs.data[i].value)
          data.push(items)
      }
      const piePlot = new Pie(this.$refs.canvas_box2, {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.5,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            // formatter: () => 'AntV\nG2Plot',
          },
        },
      })

      piePlot.render()
    },
  },
}
</script>

<style>
</style>