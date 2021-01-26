<template>
    <div class="shijian">
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="今日">
                <div class="content">
                    <div class="head_title">
                        <span class="">会员总数据</span>
                    </div>
                    <div class="overflow_box">
                        <biao1></biao1>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab=" 昨日" force-render>
                昨日
            </a-tab-pane>
            <a-tab-pane key="3" tab="7天">
                7天
            </a-tab-pane>
             <a-tab-pane key="4" tab="30天">
                30天
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import biao1  from '../customer/biao1'
export default {
    components:{biao1},
    data(){
        return{

        }
    },
    methods:{
        callback(key) {
         console.log(key);
        },
    }
}
</script>

<style lang='scss'>
    .shijian{
        .content{
            box-sizing: border-box;
            .head_title{
                height: 20px;
                margin: 20px 0;
            }
        }
    }
</style>