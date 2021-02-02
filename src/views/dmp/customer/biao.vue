<template>
    <div class="biao">
        <div class="head_title">
            <span class="">数据统计</span>
            <span class="sub-title">
                统计时间：
                <span class="sub-title">2021-01-17至</span>
                2021-01-23
            </span>
        </div>
        <div class="overflow_box">
            <div class="overflow_li" v-for="(a,index) in 6" :key="index">
                <div class="title">
                    <span>消费客户</span>
                </div>
                <div class="price_info">
                    <span class="price">100</span>
                    <span class="unit">人</span>
                </div>
                <div class="trend_info">
                    <span>较上一周期</span>
                    <span class="percente percent-up">0.00%</span>
                </div>
                <i class="more_info anticon anticon-question-circle">
                     <a-popover title="消费客户" overlayClassName="note">
                            <template slot="content">
                                <div class="" style="width:200px">
                                    <p>统计时间内，已消费人数合计</p>
                                </div>
                            </template>
                            <span class="anticon">
                                <a-icon type="question-circle" />
                            </span>
                    </a-popover>
                </i>
            </div>
        </div>
        <div class="head_title">
            <span>累计数据</span>
            <span class="sub-title">统计截止时间：2021-01-23</span>
        </div>
        <div class="overflow_box" >
            <div class="overflow_li" v-for="(a,index) in 6" :key="index">
                <div class="title">累计用户</div>
                <div class="price_info">
                    <span class="price">1,040</span>
                    <span class="unit">人</span>
                </div>
                <div class="trend_info">
                    <span>较上一周期</span>
                    <span class="percente percent-up">1.86%</span>
                </div>
                 <i class="more_info anticon anticon-question-circle">
                     <a-popover title="消费客户" overlayClassName="note">
                            <template slot="content">
                                <div class="" style="width:200px">
                                    <p>统计时间内，已消费人数合计</p>
                                </div>
                            </template>
                            <span class="anticon">
                                <a-icon type="question-circle" />
                            </span>
                    </a-popover>
                </i>
            </div>
            
        </div>
        <div class="head_title">
            <span>图表分析</span>
        </div>
        <div class="trend-box">
            <div class="canvas-boxs" >
                 <canvas_box ></canvas_box>
            </div>
        </div>
        <div class="pie-chart-box">
            <div class="a">
                <div class="pie-chart-canvas">
                    <span>图像</span>
                </div>
            </div>
            <div class="a">
                <div class="pie-chart-canvas">
                    <span>图像</span>
                </div>
            </div>
            <div class="a">
                <div class="pie-chart-canvas">
                    <span>图像</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import canvas_box from './canvas_box'
export default {
    components:{canvas_box},
    data(){
        return{

        }
    }
}
</script>

<style lang='scss' scoped>
    .biao{
        .head_title{
            height: 16px;
            margin: 16px 0 8px 0;
            line-height: 16px;
            span{
                font-size: 14px;
                color: #040a46;
                font-weight: 500;
                margin-right: 14px;
            }
            .sub-title{
                font-size: 12px;
                color: #96a2be;
                font-family: PingFangSC-Regular,PingFang SC;
                margin: 0;
            }
        }
        .overflow_box{
            display: grid;
            grid-gap: 8px;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            .overflow_li{
                height: 138px;
                text-align: left;
                position: relative;
                border: 1px solid #eaeaf4;
                border-radius: 4px;
                .title{
                    margin: 24px 0 16px 24px;
                    font-size: 14px;
                    color: #040a46;
                    letter-spacing: 0;
                    line-height: 14px;
                }
                .price_info{
                    white-space: nowrap;
                    margin-left: 22px;
                    .price{
                        font-size: 32px;
                        font-weight: 700;
                        color: #37f;
                        line-height: 32px;
                        margin-right: 2px;
                    }
                    .unit{
                        font-size: 14px;
                        color: #040a46;
                    }
                }
                .trend_info{
                    display: flex;
                    align-items: center;
                    margin: 16px 0 0 24px;
                    font-size: 12px;
                    .percente{
                        color: #ff4646;
                        font-weight: 700;
                    }
                }
                .more_info{
                    font-size: 16px;
                    color: #eaeaf4;
                    position: absolute;
                    right: 23px;
                    top: 23px;
                    cursor: pointer;
                }
            }
        }
        .trend-box{
           
            // box-sizing: border-box;
            .canvas-boxs{
                user-select: none;
                position: relative;
                // height: 460px;
                // border: 1px solid #eaeaf4;
                // border-radius: 4px;
               
                // .trend{
                //     position: absolute;
                //     top: 24px;
                //     left: 24px;
                // }
                border: none;
            }
        }
        .pie-chart-box{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 8px;
            margin-top: 16px;
            .a{
                border-radius: 2px;
                border: 1px solid #eaeaf4;
            }
            .pie-chart-canvas{
                width: 100%;
                height: 420px;
                min-width: 440px;
                text-align: center;
                span{
                    line-height: 420px;
                }
            }
        }
    }
</style>