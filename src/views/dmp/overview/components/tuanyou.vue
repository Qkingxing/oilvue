<template>
  <div>
      <h1>暂无数据</h1>
    <!-- <div class="search" style="margin-top: 15px">
      <div
        class="search-li"
        :key="item.key"
        v-for="item in dates"
        :class="`${item.key == dateKey ? 'active' : ''}`"
        @click="changeDate(item.key)"
      >
        {{ item.name }}
      </div>
      <a-range-picker v-if="dateKey == 'zidingyi'" />
    </div> -->
    <!-- <div v-if="dateKey == 'jintian'">
      <div class="head-title">销售总数据</div>
      <div class="saleall">
        <div class="saleall-container">
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
        </div>
      </div>
      <div class="sales">
        <div class="head-title">销售收入趋势</div>
        <el-popover placement="bottom" width="66" trigger="hover">
          <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
            <span @click="income(1)" style="margin-bottom: 10px; cursor: pointer">销售收入趋势</span>
            <span @click="income(2)" style="margin-bottom: 10px; cursor: pointer">订单趋势</span>
            <span @click="income(3)" style="cursor: pointer">客单价趋势</span>
          </div>
          <el-button slot="reference">切换</el-button>
        </el-popover>
      </div>
      <a-row>
        <a-col :span="20" v-if="line == 1">
          <line-charts></line-charts>
        </a-col>
        <a-col :span="20" v-if="line == 2">
          <line-charts></line-charts>
          哈哈我出来了
        </a-col>
        <a-col :span="20" v-if="line == 3">
          <line-charts></line-charts>
          哈哈我也出来了
        </a-col>
      </a-row>
      <div class="head-title">点比分析</div>
      <el-row style="margin: '0 auto'; width: 100%; display: flex; flex-wrap: wrap">
        <div class="tab_1">
          <el-col :span="40" style="width: 770px">
            <div class="grid-content bg-purple">
              <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>

        <div class="tab_2">
          <el-col :span="40" style="width: 770px; margin-left: 20px">
            <div class="grid-content bg-purple-light">
              <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>
      </el-row>
    </div> -->

    <!-- <div class="time" v-if="dateKey == 'zuotian'">
      <div class="head-title">销售总数据</div>
      <div class="saleall">
        <div class="saleall-container">
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
        </div>
      </div>

      <div class="sales">
        <div class="head-title">销售收入趋势</div>
        <el-popover placement="bottom" width="66" trigger="hover">
          <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
            <span @click="income(1)" style="margin-bottom: 10px; cursor: pointer">销售收入趋势</span>
            <span @click="income(2)" style="margin-bottom: 10px; cursor: pointer">订单趋势</span>
            <span @click="income(3)" style="cursor: pointer">客单价趋势</span>
          </div>
          <el-button slot="reference">切换</el-button>
        </el-popover>
      </div>
      <a-row>
        <a-col :span="20" v-if="line == 1">
          <line-charts></line-charts>
        </a-col>
        <a-col :span="20" v-if="line == 2">
          <line-charts></line-charts>
          哈哈我出来了
        </a-col>
        <a-col :span="20" v-if="line == 3">
          <line-charts></line-charts>
          哈哈我也出来了
        </a-col>
      </a-row>

      <div class="head-title">点比分析</div>
      <el-row style="margin: '0 auto'; width: 100%; display: flex; flex-wrap: wrap">
        <div class="tab_1">
          <el-col :span="40" style="width: 770px">
            <div class="grid-content bg-purple">
             <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>

        <div class="tab_2">
          <el-col :span="40" style="width: 770px; margin-left: 20px">
            <div class="grid-content bg-purple-light">
              <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>
      </el-row>
    </div> -->

    <!-- <div v-if="dateKey == 'benzhou'">
      <div class="head-title">销售总数据</div>
      <div class="saleall">
        <div class="saleall-container">
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
        </div>
      </div>
      <div class="sales">
        <div class="head-title">销售收入趋势</div>
        <el-popover placement="bottom" width="66" trigger="hover">
          <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
            <span @click="income(1)" style="margin-bottom: 10px; cursor: pointer">销售收入趋势</span>
            <span @click="income(2)" style="margin-bottom: 10px; cursor: pointer">订单趋势</span>
            <span @click="income(3)" style="cursor: pointer">客单价趋势</span>
          </div>
          <el-button slot="reference">切换</el-button>
        </el-popover>
      </div>
      <a-row>
        <a-col :span="20" v-if="line == 1">
          <line-charts></line-charts>
        </a-col>
        <a-col :span="20" v-if="line == 2">
          <line-charts></line-charts>
          哈哈我出来了
        </a-col>
        <a-col :span="20" v-if="line == 3">
          <line-charts></line-charts>
          哈哈我也出来了
        </a-col>
      </a-row>
      <div class="head-title">点比分析</div>
      <el-row style="margin: '0 auto'; width: 100%; display: flex; flex-wrap: wrap">
        <div class="tab_1">
          <el-col :span="40" style="width: 770px">
            <div class="grid-content bg-purple">
             <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>

        <div class="tab_2">
          <el-col :span="40" style="width: 770px; margin-left: 20px">
            <div class="grid-content bg-purple-light">
             <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>
      </el-row>
    </div> -->
    <!-- <div v-if="dateKey == 'benyue'">
      <div class="head-title">销售总数据</div>
      <div class="saleall">
        <div class="saleall-container">
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
        </div>
      </div>
      <div class="sales">
        <div class="head-title">销售收入趋势</div>
        <el-popover placement="bottom" width="66" trigger="hover">
          <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
            <span @click="income(1)" style="margin-bottom: 10px; cursor: pointer">销售收入趋势</span>
            <span @click="income(2)" style="margin-bottom: 10px; cursor: pointer">订单趋势</span>
            <span @click="income(3)" style="cursor: pointer">客单价趋势</span>
          </div>
          <el-button slot="reference">切换</el-button>
        </el-popover>
      </div>
      <a-row>
        <a-col :span="20" v-if="line == 1">
          <line-charts></line-charts>
        </a-col>
        <a-col :span="20" v-if="line == 2">
          <line-charts></line-charts>
          哈哈我出来了
        </a-col>
        <a-col :span="20" v-if="line == 3">
          <line-charts></line-charts>
          哈哈我也出来了
        </a-col>
      </a-row>
      <div class="head-title">点比分析</div>
      <el-row style="margin: '0 auto'; width: 100%; display: flex; flex-wrap: wrap">
        <div class="tab_1">
          <el-col :span="40" style="width: 770px">
            <div class="grid-content bg-purple">
              <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>

        <div class="tab_2">
          <el-col :span="40" style="width: 770px; margin-left: 20px">
            <div class="grid-content bg-purple-light">
             <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>
      </el-row>
    </div> -->
    <!-- <div v-if="dateKey == 'zidingyi'">
      <div class="head-title">销售总数据</div>
      <div class="saleall">
        <div class="saleall-container">
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
          <number-card></number-card>
        </div>
      </div>
      <div class="sales">
        <div class="head-title">销售收入趋势</div>
        <el-popover placement="bottom" width="66" trigger="hover">
          <div class="text" style="display: flex; flex-direction: column; text-align: center; margin-top: 0">
            <span @click="income(1)" style="margin-bottom: 10px; cursor: pointer">销售收入趋势</span>
            <span @click="income(2)" style="margin-bottom: 10px; cursor: pointer">订单趋势</span>
            <span @click="income(3)" style="cursor: pointer">客单价趋势</span>
          </div>
          <el-button slot="reference">切换</el-button>
        </el-popover>
      </div>
      <a-row>
        <a-col :span="20" v-if="line == 1">
          <line-charts></line-charts>
        </a-col>
        <a-col :span="20" v-if="line == 2">
          <line-charts></line-charts>
          哈哈我出来了
        </a-col>
        <a-col :span="20" v-if="line == 3">
          <line-charts></line-charts>
          哈哈我也出来了
        </a-col>
      </a-row>
      <div class="head-title">点比分析</div>
      <el-row style="margin: '0 auto'; width: 100%; display: flex; flex-wrap: wrap">
        <div class="tab_1">
          <el-col :span="40" style="width: 770px">
            <div class="grid-content bg-purple">
             <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>

        <div class="tab_2">
          <el-col :span="40" style="width: 770px; margin-left: 20px">
            <div class="grid-content bg-purple-light">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="扫呗-微信" name="a">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信" name="b">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 普通支付" name="c">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 微信公众号" name="d">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 支付宝支付" name="e">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车牌支付" name="f">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 车队司机余额支付" name="g">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 云鸟支付" name="h">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 个人余额支付" name="a1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信扫码支付" name="b1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 微信小程序支付" name="c1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东APP支付" name="d1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 银联APP支付" name="e1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 斑马智行" name="f1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 极豆支付" name="h1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 京东金融" name="s1">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 路行通" name="w9">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 青岛银联APP支付" name="w8">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 易车会员" name="w7">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - gofun车务" name="w6">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 悦旅会" name="w5">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 云闪付" name="w4">
                  <G2></G2>
                </el-tab-pane>
                <el-tab-pane label="团油 - 斑马会员" name="w3">
                  <G2></G2>
                </el-tab-pane>
                 <el-tab-pane label="团油 - 能源家" name="w2">
                  <G2></G2>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </div>
      </el-row>
    </div> -->
  </div>
</template>

<script>
import G2 from '../components/G2'
import times from '../times'
import NumberCard from '../components/numberCard'
import LineCharts from '../components/LineCharts'
export default {
  name: 'Dashboard',
  components: {
    times,
    NumberCard,
    LineCharts,
    G2,
  },

  data() {
    return {
      activeNames: 'first',
      activeName: 'first',
      line: 1,
      vivew: 'times',
      dates: [
        { key: 'jintian', name: '今天' },
        { key: 'zuotian', name: '昨天' },
        { key: 'benzhou', name: '本周' },
        { key: 'benyue', name: '本月' },
        { key: 'zidingyi', name: '自定义' },
      ],
      key: 'quanbu',
      noTitleKey: 'quanbu',
      dateKey: 'jintian',
    }
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleClicks(tab, event) {
      console.log(tab, event)
    },
    income(index) {
      if (index == 1) {
        this.line = 1
        return
      }
      if (index == 2) {
        this.line = 2
        return
      }
      if (index == 3) {
        this.line = 3
        return
      }
    },
    changeDate(key) {
      this.dateKey = key
    },
  },
}
</script>

<style lang="less">
.search {
  height: 40px;
  display: flex;
  align-items: center;

  .search-li {
    width: 48px;
    height: 24px;
    line-height: 24px;
    margin-right: 20px;
    text-align: center;
    color: #1e1e28;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      color: #37f;
      transition: all 0.5s;
    }

    &.active {
      color: #3c85ff;
      background: #ecf3ff;
    }
  }
}
.box {
  width: 300px;
  margin: 0 auto;
  .span {
    color: #1e1e28;
  }
}

// 销售总数据
.saleall {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  .saleall-container {
    margin: -10px;
    display: flex;
    flex-wrap: wrap;

    /deep/.number-card {
      display: flex;
      flex: 1 1 20%;
      max-width: 20%;
    }
  }
}
</style>