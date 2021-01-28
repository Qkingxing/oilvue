
<template>
  <div class="credit">
      <div class="mainContainreBlock">
		  <div class="container animated fadeIn">
			  <div class="head-title">
				  <p>积分统计</p>
			  </div>
			  <div class="dateTabForSquareContainer">
				  <shujian></shujian>
			  </div>
			  <div class="content">
				  <biao></biao>
			  </div>
		  </div>
      </div>
  </div>
</template>

<script>
import shujian from './shujian'
import biao from './biao'
export default {
	components:{shujian,biao},
    name: 'Credit',
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
    .credit{
          padding-top: 0px;
		  .mainContainreBlock{
			padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 25px;
			background: #fff;
			min-width: 1004px;
			overflow: auto;  
			.container{
				.head-title{
					font-size: 16px;
					font-weight: 700;
					color: rgb(30, 30, 40);
					border-bottom: 1px solid rgb(234, 234, 244);
					height: 56px;
					line-height: 56px;
					margin-bottom: 10px;
					
				}
				.dateTabForSquareContainer{
					display: flex;
				}
				.content{
					box-sizing: border-box;
				}
			}
		  }
    }
</style>
