<template>
    <div class="biao">
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
                    <span>环比</span>
                    <span class="percente percent-up">0.00%</span>
                </div>
                <i class="more_info anticon anticon-question-circle">
                     <a-popover title="会员人数" overlayClassName="note">
                            <template slot="content">
                                <div class="" style="width:200px">
                                    <p>查询时间内的累计会员人数（没有去除查询时间内会员等级失效的人数）</p>
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
            <div class="canvas-box">
                 <canvas_box></canvas_box>
            </div>
            <div class="ranking-trend">
                <div class="rankingTrendText">油站消费排行
                    <i class="more_info anticon anticon-question-circle">
                        <a-popover title="会员人数" overlayClassName="note">
                                <template slot="content">
                                    <div class="" style="width:200px">
                                        <p>查询时间内的累计会员人数（没有去除查询时间内会员等级失效的人数）</p>
                                    </div>
                                </template>
                                <span class="anticon">
                                    <a-icon type="question-circle" />
                                </span>
                        </a-popover>
                    </i>
                </div>
                <div class="ranking-trend-box public_global_scroll">
                    <div class="ranking-trend-lists">
                        <div class="ranking-trend-top">1</div>
                        <div class="aad">鹰眼第一加油站</div>
                        <div class="aac">0</div>
                    </div>
                    <div class="ranking-trend-lists">
                        <div class="ranking-trend-top">2</div>
                        <div class="aad">鹰眼第一加油站</div>
                        <div class="aac">0</div>
                    </div>
                </div>
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
                color: #1e1e28;
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
                    color: #1e1e28;
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
                        color: #1e1e28;
                    }
                }
                .trend_info{
                    display: flex;
                    align-items: center;
                    margin: 16px 0 0 24px;
                    font-size: 12px;
                    .percente{
                        color: #48c672;
                        font-weight: 700;
                    }
                }
                .more_info{
                    font-size: 16px;
                    color: #eaeaf4;
                    // position: absolute;
                    // right: 23px;
                    // top: 23px;
                    cursor: pointer;
                }
            }
        }
        .trend-box{
            display: flex;
            box-sizing: border-box;
            .canvas-box{
                user-select: none;
                position: relative;
                // height: 460px;
                // border: 1px solid #eaeaf4;
                // border-radius: 4px;

                .trend{
                    position: absolute;
                    top: 24px;
                    left: 24px;
                }
            }
            .ranking-trend{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-left: 3rem;
                height: 400px;
                .ranking-trend-box {
                    // overflow-y: auto;
                    .ranking-trend-lists{
                       font-size: 14px;
                        color: #3c3c46;
                        width: 100%;
                        height: 20px;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        margin-top: 20px; 
                        .ranking-trend-top{
                            margin-right: 20px;
                            min-width: 20px;
                            min-height: 20px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fff;
                            background-color: #37f;
                        }
                        .aad{
                            margin-right: 20px;
                        }
                        .aac{
                             margin-right: 20px;
                        }
                    }
                }
                .rankingTrendText{
                    font-size: 20px;
                    color: #000;
                    font-weight: 600;
                }
                .more_info{
                    position: relative;
                    top: -4px;
                    font-size: 16px;
                    color: rgb(203, 203, 203);
                }
                
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