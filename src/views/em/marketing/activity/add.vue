
<template>
  <a-layout-content :style="{padding: '0 0 24px', minHeight: '280px' }">
    <a-card class="head-card" style="margin-bottom: 10px;">
      <a-steps :current="step">
        <a-step>
          <template slot="title">
            活动基础设置
          </template>
        </a-step>
        <a-step title="活动规则设置" />
        <a-step title="完成" />
      </a-steps>
    </a-card>
    <a-card v-show="step == 0">
      1111
    </a-card>
  </a-layout-content>
</template>
<script>
export default {
  data () {
    return {
      step: 0
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.head-card {
  // width:90%;
}
</style>
