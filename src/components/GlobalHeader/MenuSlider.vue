<template>
    <div class="main-menu-sider-top">
        <div class="main-menu-sider">
            <div class="global_logo">
                <img data-v-2e680234="" src="@/assets/logo.png">
            </div>
            <div class="main-custom-menu">
                <div class="main-custom-menu_container public_global_scrollHidden">
                    <div class="custom-menuContainer custom-menu">
                        <!-- 一级 -->
                        <div 
                            class="menu-master"
                            v-for="(item,index) in menus"
                            :key="index">
                            <div 
                                v-if="!item.hidden"
                                class="menu-master-box" 
                                :linkactive="$route.meta.title.includes(item.meta.title)?'1':''"
                                @click="fatharLink(item)"
                                @mouseenter="enter(index)"
                                >
                                <div class="menu-icon" v-if="item.meta.icon">

                                    <icon-font v-if="item.meta.icon.includes('icon')" :type="item.meta.icon" />
                                    <a-icon v-else :type="item.meta.icon" />

                                </div>
                                <div class="menu-title">{{i18nRender(item.meta.title)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="main-menu-sider-children" @mouseleave="leave()" v-if="!childMenu.hidden">
            <div class="main-menu-sider-children-header">
                {{i18nRender(childMenu.meta.title)}}
            </div>
            <div class="main-menu-sider-children-contentBox">
                <div class="main-menu-sider-children-content public_global_scrollHidden">
                    <a-menu
                        id="siderForSubMenu"
                        mode="inline"
                        :open-keys.sync="openKeys"
                        >


                        <template v-for="item in childMenu.children">
                            <!-- 二级有子 -->
                            <a-sub-menu
                                v-if="item.children"
                                :key="item.name">
                                <span slot="title" style="padding-left: 5px;">
                                    {{i18nRender(item.meta.title)}}
                                </span>

                                <template
                                    v-for="it in item.children">
                                    <!-- 三级 -->
                                    <a-menu-item
                                        :key="it.name"
                                        >
                                        <router-link
                                            :to="{ name: it.name }">{{i18nRender(it.meta.title)}}</router-link>
                                    </a-menu-item>
                                </template>
                            </a-sub-menu>

                            <!-- 二级无子 -->
                            <a-menu-item
                                v-else
                                :key="item.name">
                                <router-link
                                    style="text-indent: 22px;"
                                    :to="{ name: item.name }">{{i18nRender(item.meta.title)}}</router-link>
                            </a-menu-item>



                        </template>
                        
                    </a-menu>
                </div>
            </div>



        </div>



    </div>
</template>

<script>
import { i18nRender } from '@/locales'
let oldIndex = 0
export default {
    name: 'MenuSlider',
    props:{
        menus:{
            type: Array,
            default: []
        }
    },
    data(){
        return{
            fatherIndex: 0,
            openKeys: [],
        }
    },
    computed:{
        childMenu(){
            // console.log(this.menus[this.fatherIndex])
            let arr = []
            if (this.menus[this.fatherIndex].children) {
                arr = this.menus[this.fatherIndex].children.map((e,i)=>{
                    return e.name
                })
            }
            
            // console.log(arr)
            this.openKeys = arr
            return this.menus[this.fatherIndex]
        }
    },
    watch: {
        $route(newV,oldV){
            this.findFatherIndex()
        }
    },
    created(){
        this.findFatherIndex()
    },
    mounted(){
        // console.log(this.menus)
        // console.log(this.$route)
    },
    methods:{
        i18nRender,
        enter(index){
            this.fatherIndex = index
            this.$emit('open')
        },
        leave(){
            this.fatherIndex = oldIndex
            if (this.$route.name == 'notPermission') {
                this.$emit('close')
            }
        },
        findFatherIndex(){
            let index = this.menus.findIndex((e)=>{
                return this.$route.path.includes(e.path)
            })
            this.fatherIndex = index
            oldIndex = index
        },
        fatharLink(item){
            this.$router.push({
                path: item.path
            })
        }

    }
}
</script>

<style lang="less" scoped>
.main-menu-sider-top{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    background-color: #fff;
    .main-menu-sider{
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        width: 120px;
        height: 100%;
        overflow: hidden;
        background-color: #000a24;
        .global_logo{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 55px;
            img{
                display: block;
                width: auto;
                max-width: 96px;
                height: 40px;
            }
        }
        .main-custom-menu{
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1;
            .main-custom-menu_container{
                position: absolute;
                left: 0;
                top: 0;
                width: 126px;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                &.public_global_scrollHidden{

                }
                .custom-menuContainer{
                    cursor: pointer;
                    padding: 0;
                    .menu-master{
                        .menu-master-box{
                            font-size: 14px;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            text-decoration: none;
                            height: 52px;
                            overflow: hidden;
                            &:hover{
                                background-color: rgba(190,200,255,.2);
                            }
                            &[linkactive="1"]{
                                font-weight: 500;
                                background-color: #7c7ee2;
                            }
                            .menu-icon{
                                width: 20px;
                                font-size: 20px;
                                margin-left: 24px;
                                margin-right: 8px;
                                color: #fff;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            .menu-title{
                                color: #fff;
                                width: 70px;
                                padding-right: 5px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
        }
    }
    .main-menu-sider-children{
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        .main-menu-sider-children-header{
            white-space:nowrap;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            color: #040a46;
            height: 55px;
            border-bottom: 1px solid #eaeaea;
        }
        .main-menu-sider-children-contentBox{
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1;
            .main-menu-sider-children-content{
                position: absolute;
                left: 0;
                top: 0;
                width: 138px;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                #siderForSubMenu{
                    padding-bottom: 200px;
                    margin-top: 1px;  
                }
            }
        }
    }
}

</style>
<style lang="less">
#siderForSubMenu{
    .ant-menu-submenu-title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 8px;
        font-weight: 500;
        margin: 0;
        height: 52px;
        color: #040a46;
        &:hover{
            color: #7c7ee2;
        }
    }
    .ant-menu-submenu-inline>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, .ant-menu-submenu-inline>.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before{
        background: linear-gradient(90deg,#7c7ee2,#7c7ee2);
    }
    .ant-menu-item-selected{
        font-weight: 500;
        background-color: transparent;
        a{
            color: #040a46;

            &.router-link-exact-active{
                color: #7c7ee2;
                background: #e7e7ff;
            }
            &.router-link-active{
                color: #7c7ee2;
                background: #e7e7ff;
            }
            
        }
    }
    .ant-menu-submenu-arrow{
        left: 13px;
        right: auto;
    }
    .ant-menu-item{
        padding: 0 8px!important;
        width: 131px;
        margin: 0;
        height: 40px;
        text-indent: 30px;
        box-sizing: border-box; 

        &::after{
            display: none;
        }
        a{
            &:hover{
                color: #7c7ee2;
            }
            &.router-link-exact-active{
                color: #7c7ee2;
                background: #e7e7ff;
            }
            &.router-link-active{
                color: #7c7ee2;
                background: #e7e7ff;
            }
        }

    }
    a{
        color: #040a46;
        &.router-link-exact-active{
            color: #7c7ee2;
            background: #e7e7ff;
        }
        &.router-link-active{
            color: #7c7ee2;
            background: #e7e7ff;
        }
    }
}
</style>