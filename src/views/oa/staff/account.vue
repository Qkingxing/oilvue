
<template>
  <div class="mainContainreBox">
	  <div class="mainContainreBlock">
		  <div class="container animated fadeIn">
			  <div class="head-right-box">
				  	<a-button type="primary">新增账号</a-button>
					<a-input-search placeholder="请输入员工姓名/账号" style="width: 200px" @search="onSearch" />
			  </div>
			  
		  </div>
		<div class="box">	
			<div class="box_1">
				<div class="a">账号</div>
				<div class="b">员工姓名</div>
				<div class="c">手机号</div>
				<div class="d">账号类型</div>
				<div class="e">负责油站-员工角色</div>
				<div class="f">操作</div>
			</div>
			<div class="box_2" v-for="(list,index) in lists" :key="index" >
				<div class="a">{{list.a}}</div>
				<div class="b">{{list.name}}</div>
				<div class="c">{{list.pone}}</div>
				<div class="d">{{list.type}}</div>
				<div class="e">{{list.admin}}</div>
				<div class="f">
				<a-popover v-model="list.bull" title="Title" placement="bottom" trigger="click">
					<template slot="content">
						<p style="cursor: pointer;">修改</p>
							<p style="cursor: pointer;" @click="showConfirm(index)">
								删除
						</p>
						<p style="cursor: pointer;">清空操作密码</p>
					</template>
					<span type="primary" >
							编辑
					</span>
				</a-popover>
					
				</div>
			</div>
			<div class="box_3">
				   <a-pagination
					show-size-changer
					show-quick-jumper
					:default-current="3"
					:total="500"
					@showSizeChange="onShowSizeChange"
					/>
			</div>
			
		</div>
	  </div>
  </div>
</template>

<script>
export default {
    name: 'Account',
    data(){
      return{
		pageSize: 20,
		current: 4,
		visible: false,
		lists:[
			{a:'kang',name:'康佳飞',pone:'13507005198',type:'单站账号',admin:'管理员',bull:false},
			{},
			{},
			{},
			{}
		]
      }
    },
	methods:{

		onSearch(value) {
      		console.log(value);
		},
		onShowSizeChange(current, pageSize) {
      		console.log(current, pageSize);
		},
		showConfirm(index) {
			this.lists[index].bull = false
			this.$confirm({
				title: '系统温馨提示',
				content: h => <div style="color:red;">请问是否删除 田力永 的账号 tianliyong</div>,
				onOk() {
				console.log('OK');
				},
				onCancel() {
				console.log('Cancel');
				},
				class: 'test',
			});
		},
	},
	watch:{
		pageSize(val) {
			console.log('pageSize', val);
		},
		current(val) {
			console.log('current', val);
		},
	}
}
</script>
<style lang="scss" scoped>
	.mainContainreBox{
		.mainContainreBlock{
			padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 25px;
			background: #fff;
			min-width: 1004px;
			overflow: auto;
			.container{
				display: flex;
				flex: 1;
				height: 100%;
				padding-bottom: 0;
				.head-right-box{
					display: flex;
					width: 100%;
					justify-content: space-between;
					margin: 20px 0 20px auto;
				}
				
			}
			.box{
				.box_1{
					display: flex;
					height: 54px;
					align-items: center;
					justify-content: space-between;
					background-color: #fafafa;
					border: 1px solid #e8e8e8;
					.a{
						padding-left: 30px;
						width: 180px;
					}
					.b{
						width: 164px;
						text-align: center;
					}
					.c{
						width: 214px;
						text-align: center;
					}
					.d{
						width: 163px;
						text-align: center;
					}
					.e{
						width: 278px;
						text-align: center;
					}
					.f{
						text-align: center;
						width: 112px;
					}
				}
				.box_2{
					display: flex;
					height: 54px;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #e8e8e8;
					border-right: 1px solid #e8e8e8;
					border-left: 1px solid #e8e8e8;
					.a{
						padding-left: 30px;
						width: 180px;
					}
					.b{
						width: 164px;
						text-align: center;
					}
					.c{
						width: 214px;
						text-align: center;
					}
					.d{
						width: 163px;
						text-align: center;
					}
					.e{
						width: 278px;
						text-align: center;
					}
					.f{
						text-align: center;
						width: 112px;
						color: #37f;
						cursor: pointer;
						
					}
				}
				.box_3{
					text-align: center;
    				padding: 20px 0;
				}
			}
		}
	}
</style>