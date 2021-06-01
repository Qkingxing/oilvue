<template>
  <div class="number-card">
    <div class="item" >
      <span>{{list.name}}</span>
      <div class="money">
         <countTo
              class="value"
              :startVal="0"
              :endVal="Number(list.value)"
              :duration="3000"
            ></countTo>
        <span class="unte">{{list.unit}}</span>
      </div>
      <div class="info" v-if="list.compared_name">
          <span>{{list.compared_name}}</span>   
          <span>降{{list.compared | str}}%</span>
          <i class="trend">
              <a-icon v-show="list.compared < 0"  type="arrow-down"/>
              <a-icon v-show="list.compared >= 0" :style="{ color: 'red' }" type="arrow-up"/>
        </i> 
    </div>
      <div class="info" v-else>
          <!-- <span>{{list.compared_name}}</span>   
          <span>降{{list.compared | str}}%</span>
          <i class="trend">
              <a-icon v-show="list.compared < 0"  type="arrow-down"/>
              <a-icon v-show="list.compared >= 0" :style="{ color: 'red' }" type="arrow-up"/>
        </i>  -->
    </div>
      
      <i class="more_info anticon anticon-question-circle">
            <a-popover :title="list.name" overlayClassName="note">
              <template slot="content">
                <div class="" style="width: 200px">
                  <p>{{list.info_content}}</p>
                </div>
              </template>
              <span class="anticon">
                <a-icon type="question-circle" />
              </span>
            </a-popover>
      </i>
    </div>
  </div>
</template>

<script>
import IconSelector from '@/components/IconSelector'

export default {
  props:['list'],
  components: { IconSelector },
  data() {
    return {
      data: [],
      zhou:'',
     xiaoshou:''
    }
  },
  created(){
    console.log(this.list)
    setTimeout(()=>{
            this.mapDate()
    },100)

  },
  methods: {
    mapDate(){
        // if(sessionStorage.getItem('key')){
        //     if(sessionStorage.getItem('key') == '1'||sessionStorage.getItem('key') == '2'){
         
        //         this.zhou = '周同比'
        //     }else if(sessionStorage.getItem('key') == '3'){
                
        //         this.zhou = '周环比'
        //     }else if(sessionStorage.getItem('key') == '4'){
                
        //         this.zhou = '月环比'
        //     }else{
        //         this.zhou = '周同比'
        //     }
        // }else{
        //     this.zhou = '周同比'
        // }
    }
  },
  filters:{
      str(Compared){
         return Math.abs(Compared) 
      },
     
  }
}
</script>

<style lang="scss">
.item {
  flex: 1;
  height: 150px;
  display: flex;
  margin: 8px 10px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  


  .money {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .value{
        font-size: 30px;
        color: #040a46;
        line-height: 34px;
        margin-right: 5px;
    }
  }

  > span:not(.anticon) {
    margin-top: 20px;
    font-size: 14px;
    color: #3c3c46;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 14px;
    text-align: center;
  }

  .info {
    height: 16px;
    margin-left: 30px;
    margin-bottom: 18px;
    display: flex;
    justify-content: flex-start;

    > span {
      font-size: 12px;
       padding-left: 10px;
      color: #3c3c46;
    }
    .trend{
         position: relative;
         font-size: 16px;
         left: 10px;
         top: -3px;
         color:rgb(72, 198, 114);
    }
  }

     .more_info {
          font-size: 16px;
          color: #eaeaf4;
          position: absolute;
          right: 38px;
          top: 18px;
          cursor: pointer;
        }
}

// 卡片类名
.note {
  width: 350px;
}
</style>
