<template>
    <div class="sheets">
        <div class="sheets_a">
            <div class="sheet_a">
                <span>券使用统计</span>
                <div class="sheet_a1" >
                    <div class="box" v-for="(list,index) in lists" :key="index">
                        <p class="text1">{{list.name}}</p>
                        <div class="con-article">
                            <span class="text2">
                                 <countTo
                                class="value"
                                :startVal="0"
                                :endVal="list.value"
                                :duration="3000"
                                ></countTo>
                            </span>
                            <div class="con-art-unit">{{list.unit}}</div>
                        </div>
                    <div class="con-footer" v-if="list.compared_name">
                        <div class="con-foo-caption">
                           {{list.compared_name}}
                        </div>
                        
                        <div class="con-foo-percentage">
                             <countTo
                            class="value"
                            :startVal="0"
                            :endVal="list.compared | before"
                            :duration="3000"
                            ></countTo>
                            %
                            
                        </div>
                        <i class="trend" >
                            <a-icon v-show="list.compared < 0"  type="arrow-down"/>
                            <a-icon v-show="list.compared >= 0" :style="{ color: 'red' }" type="arrow-up"/>
                        </i> 
                        
                    </div>
                    </div>
                    
                </div>
            </div>
            <div class="sheet_b">
                <div class="sheet_b1">
                    <biao1 :lineChart1='lineChart1' ></biao1>
                </div>
                <div v-if="keys == 1"  class="sheet_c1">
                   <div class="sale-ratio-name">
                       客户用券次数占比
                   </div>
                   <div class="sheet_c1_a">
                        <biao2 :cake1='cake1'></biao2>
                   </div>
                </div>
            </div>  
        </div>
        
        <div class="sheets_b">
            <div class="sheet_b1">
                {{cake1.name}}
            </div>
            <div class="sheet_b2">
                <biao2 :cake1='cake1'></biao2>
            </div>
        </div>
        <div class="sheets_c">
            <div class="sheets_c1">
                券投入产出统计
            </div>
            <!-- <div class="sheets_c2">
                <div class="box">
                    <div class="con-title">优惠券成本</div>
                    <div class="con-article">
                        <div class="con-art-caption">
                             <countTo
                            class="value"
                            :startVal="0"
                            :endVal="269383"
                            :duration="3000"
                            ></countTo>
                        </div>
                        <div class="con-art-unit">元</div>
                    </div>
                    <div class="con-footer">
                        <div class="con-foo-caption">较上一周</div>
                        <div class="con-foo-percentage">
                             <countTo
                            class="value"
                            :startVal="0"
                            :endVal="120"
                            :duration="3000"
                            ></countTo>
                            %
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="con-title">优惠券成本</div>
                    <div class="con-article">
                        <div class="con-art-caption">0.00</div>
                        <div class="con-art-unit">元</div>
                    </div>
                    <div class="con-footer">
                        <div class="con-foo-caption">较上一周</div>
                        <div class="con-foo-percentage">0%</div>
                    </div>
                </div>
                <div class="box">
                    <div class="con-title">优惠券成本</div>
                    <div class="con-article">
                        <div class="con-art-caption">0.00</div>
                        <div class="con-art-unit">元</div>
                    </div>
                    <div class="con-footer">
                        <div class="con-foo-caption">较上一周</div>
                        <div class="con-foo-percentage">0%</div>
                    </div>
                </div>
                <div class="box">
                    <div class="con-title">优惠券成本</div>
                    <div class="con-article">
                        <div class="con-art-caption">0.00</div>
                        <div class="con-art-unit">元</div>
                    </div>
                    <div class="con-footer">
                        <div class="con-foo-caption">较上一周</div>
                        <div class="con-foo-percentage">0%</div>
                    </div>
                </div>
            </div> -->
            <div class="sheets_c3">
                <div class="sheets_c3_a">
                    <biao3 :lineChart2='lineChart2'></biao3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import biao1 from './biao1'
import biao2 from './biao2'
import biao3 from './biao3'
export default {
    components:{biao1,biao2,biao3},
    props:['keys','lists','lineChart1','cake1','lineChart2'],
    data(){
        return{
           
        }
    },
    mounted(){
        console.log(this.cake1, this.lineChart1,this.lineChart2)
    },
    filters:{
        before(value){
            return Math.abs(value)
        }
    }
}
</script>

<style lang='scss' scoped>
    .sheets{
        .sheets_a{
            border: 1px solid rgb(234, 234, 244);
            margin-top: 16px;
            padding: 24px 12px 25px 24px;
            overflow: hidden;
            .sheet_a{
                .sheet_a1{
                    display: flex;
                    flex-wrap: wrap;
                    margin-left: -25px;
                    .box{
                        position: relative;
                        width: 250px;
                        margin: 30px 0px 0px;
                        padding-left: 25px;
                        border-left: 1px solid rgb(234, 234, 244);
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                            .text1{
                                font-size: 14px;
                                font-weight: 400;
                                color: rgb(30, 30, 40);
                            }
                            .con-footer{
                                    display: flex;
                                    align-items: center;
                                    .trend{
                                        position: relative;
                                        top:-9px;
                                        left: 29px;
                                    }
                                    .con-foo-percentage{
                                        font-size: 12px;
                                        font-weight: 400;
                                        color: rgb(255, 70, 70);
                                    }
                                    .con-foo-caption{
                                            font-size: 12px;
                                            font-weight: 400;
                                            color: rgb(62, 75, 110);
                                    }
                                    .anticon{
                                            font-size: 16px;
                                            color: #eaeaf4;
                                            position: absolute;
                                            right: 6px;
                                            top: 0;
                                            cursor: pointer;
                                    }
                            }
                            .con-article{
                                display: flex;
                                align-content: center;
                                    .text2{
                                        font-size: 32px;
                                        font-weight: 700;
                                        color: rgb(51, 119, 255);
                                        margin-top: -10px;
                                    }
                                    .con-art-unit{
                                        font-size: 14px;
                                        margin: 7px 0px 0px 3px;
                                        font-weight: 400;
                                        color: rgb(30, 30, 40);
                                    }
                            }
                        }  
                }
            }
            .sheet_b{
                position: relative;
                margin-top: 20px;
                    .sheet_b1{
                        position: relative;
                        width: 1320px;
                        // height: 600px;
                        padding: 0px;
                        margin: 0px;
                        border-width: 0px;
                        cursor: default;
                    }
                    .sheet_c1{
                        border: 1px solid #eaeaf4;
                        margin-top: 16px;
                        padding: 24px 12px 25px 24px;
                        overflow: hidden;
                            .sale-ratio-name{
                                font-size: 14px;
                                color: #040a46;
                                margin-top: -6px;
                            }
                            .sheet_c1_a{
                                position: relative;
                                width: 1231px;
                                height: 500px;
                                padding: 0px;
                                margin: 0px;
                                border-width: 0px;
                                cursor: default;
                            }
                    }
            }
        }
        .sheets_b{
            border: 1px solid #eaeaf4;
            margin-top: 16px;
            padding: 24px 12px 25px 24px;
            overflow: hidden;
                .sheet_b1{
                    font-size: 14px;
                    color: #040a46;
                    margin-top: -6px;
                }
                .sheet_b2{
                    position: relative;
                    width: 1267px;
                    height: 500px;
                    padding: 0px;
                    margin: 0px;
                    border-width: 0px;
                    cursor: default;
                }
        }
        .sheets_c{
            border: 1px solid #eaeaf4;
            margin-top: 16px;
            padding: 24px 12px 25px 24px;
            overflow: hidden;
                .sheets_c1{
                    height: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 500;
                    color: #1f2e4d;
                }
                .sheets_c2{
                    display: flex;
                    flex-wrap: wrap;
                    margin-left: -25px;
                        .box{
                            position: relative;
                            width: 250px;
                            margin: 30px 0 0 0;
                            padding-left: 25px;
                            border-left: 1px solid #eaeaf4;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                                .con-title{
                                    font-size: 14px;
                                    font-weight: 400;
                                    color: #040a46;
                                }
                                .con-article{
                                    display: flex;
                                    align-items: center;
                                        .con-art-caption{
                                            font-size: 32px;
                                            font-weight: 700;
                                            color: #7C7EE2;
                                        }
                                        .con-art-unit{
                                            font-size: 14px;
                                            margin: 7px 0 0 3px;
                                            font-weight: 400;
                                            color: #040a46;
                                        }
                                }
                                .con-footer{
                                    display: flex;
                                    align-items: center;
                                        .con-foo-caption{
                                            font-size: 12px;
                                            font-weight: 400;
                                            color: #3e4b6e;
                                        }
                                        .con-foo-percentage{
                                            font-size: 12px;
                                            font-weight: 400;   
                                            color: rgb(255, 70, 70);    
                                        }
                                }
                        }
                }
                .sheets_c3{
                    user-select: none;
                    position: relative;
                    margin-top: 35px;
                    width: 100%;
                    // height: 600px;
                        .sheets_c3_a{
                            position: relative;
                            width: 1320px;
                            // height: 600px;
                            padding: 0px;
                            margin: 0px;
                            border-width: 0px;
                            cursor: default;
                        }
                }
        }
    }
    
</style>