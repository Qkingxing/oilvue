<template>
    <div class="biao">
        <div class="overflow_box">
            <div class="overflow_li" >
                <div class="title">
                    <span>油品销售收入</span>
                </div>
                <div class="price_info">
                    <span class="price">0.00</span>
                    <span class="unit">元</span>
                </div>
                <div class="trend_info">
                    <span>较前一天</span>
                    <span class="percente percent-up">0.00%</span>
                </div>
                
            </div>






            <div class="overflow_li" >
                <div class="title">
                    <span>员工引导销售收入</span>
                </div>
                <div class="price_info">
                    <span class="price">0.00</span>
                    <span class="unit">元</span>
                </div>
                <div class="trend_info">
                    <span>较前一天</span>
                    <span class="percente percent-up">0.00%</span>
                </div>
                
            </div>


            <div class="overflow_li" >
                <div class="title">
                    <span>油品订单数</span>
                </div>
                <div class="price_info">
                    <span class="price">0</span>
                    <span class="unit">笔</span>
                </div>
                <div class="trend_info">
                    <span>较前一天</span>
                    <span class="percente percent-up">0.00%</span>
                </div>
                
            </div>


            <div class="overflow_li" >
                <div class="title">
                    <span>员工引导订单数</span>
                </div>
                <div class="price_info">
                    <span class="price">0</span>
                    <span class="unit">笔</span>
                </div>
                <div class="trend_info">
                    <span>较前一天</span>
                    <span class="percente percent-up">0.00%</span>
                </div>
                
            </div>



            <div class="overflow_li" >
                <div class="title">
                    <span>总加油量（升）</span>
                </div>
                <div class="price_info">
                    <span class="price">0.00</span>
                    <span class="unit">升</span>
                </div>
                <div class="trend_info">
                    <span>较前一天</span>
                    <span class="percente percent-up">0.00%</span>
                </div>
               
            </div>



            <div class="overflow_li" >
                <div class="title">
                    <span>员工引导加油量（升）</span>
                </div>
                <div class="price_info">
                    <span class="price">0.00</span>
                    <span class="unit">升</span>
                </div>
                <div class="trend_info">
                    <span>较前一天</span>
                    <span class="percente percent-up">0.00%</span>
                </div>
                
            </div>



     
            


            


            
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        income(){

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
            display: flex;
            position: relative;
             .xiaofei{
                 
               span{
                   position: absolute;
                   font-size: 12px;
                   left: 100px;
               }
            }
            span{
                font-size: 16px;
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
            display: flex;
            align-items: center;
            .canvas-boxs{
                user-select: none;
                position: relative;
                .canvas-boxs{
                    width: 68%;
                    height: 400px;
                }
            }
        }
        .pie-chart-box{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 8px;
            margin-top: 16px;
            .aac{
                min-width: 670px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 0 6px 0 ;
                border-radius: 2px;
                border: 1px solid;
                height: 400px;
            }
        }
    }
</style>