
<template>
  <div class="statistics">
      <div class="mainContainreBlock">
		<div class="container animated fadeIn">
			<tab></tab>
      	</div>
	  </div>
	 
  </div>
</template>

<script>
import tab from './tab'
export default {
	name: 'Cstatistics',
	components:{tab},
    data(){
      return{

      }
    }
}
</script>

<style lang="scss" scoped>
    .statistics{
      	margin: 0px 0px;
	  .mainContainreBlock{
			 padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 25px;
			background: #fff;
			min-width: 1004px;
			.container{
				 position: relative;
      			padding-top: 24px;
			}
	  }
    }
</style>
