<template>
  <div id="biao" ref="biao"></div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
    data(){
        return{
            data:[
                { company: 'Apple', type: '2019', value: 30 },
                { company: 'Facebook', type: '2020', value: 35 },
                { company: 'Google', type: '2021', value: 28 },
                { company: 'Apple', type: '非技术岗', value: 40 },
                { company: 'Facebook', type: '非技术岗', value: 65 },
                { company: 'Google', type: '非技术岗', value: 47 },
                { company: 'Apple', type: '技术岗', value: 23 },
                { company: 'Facebook', type: '技术岗', value: 18 },
                { company: 'Google', type: '技术岗', value: 20 },
                { company: 'Apple', type: '技术岗', value: 35 },
                { company: 'Facebook', type: '技术岗', value: 30 },
                { company: 'Google', type: '技术岗', value: 25 }
            ]
        }
    },
    mounted(){
        this.formBiao()
    },
    methods:{
        formBiao(){
            const chart = new Chart({
                container: this.$refs.biao,
                autoFit: true,
                height: 500,
            });
            chart.data(this.data);
            chart.scale('value', { nice: true, });
            chart.legend({
                position: 'top'
            });
            chart
            .interval()
            .position('type*value').color('company')
            .adjust([{
                type: 'dodge',
                marginRatio: 0
            }]);
            chart.render();
        }
    }
}
</script>

<style>

</style>