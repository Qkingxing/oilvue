
<template>
  <div class="car">
      <div class="mainContainreBlock">
		  <div class="container animated fadeIn">	  
				<datas1></datas1>
		  </div>
		  
      </div>
  </div>
</template>

<script>
import datas1 from './datas1'
export default {
	components:{datas1},
    name: 'Car',
    data(){
      return{

      }
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .car{
		padding-top: 24px;
      .mainContainreBlock{
		padding-left: 24px;
		padding-right: 24px;
		padding-bottom: 25px;
		background: #fff;
		min-width: 1004px;
		.container{
			position: relative;
			padding-top: 20px;
			
		}
      }
    }
</style>
