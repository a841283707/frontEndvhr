<template>
    <el-container>
        <el-container>
            <el-header class="head">
                <span class="left">欢迎您</span>
                <span class="right">
                    <!--下拉菜单的操作方式，给command传入command参数-->
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link" >
                        {{user.data.object.name}}<i><img :src="user.data.object.userface" alt=""></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="账户">账户信息</el-dropdown-item>
                        <el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
                        <el-dropdown-item command="注销">注销登录</el-dropdown-item>
                        <el-dropdown-item command="聊天">聊天</el-dropdown-item>
<!--                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
                      </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-row class="tac">
<!--
                        //span最大24，按比例决定大小
-->
                        <el-col :span="24">
                            <el-menu
                                    class="el-menu-vertical-demo"
                                    @open="handleOpen"
                                    @close="handleClose"
                                    @select="chooseMenu"
                                    background-color="#545c64"
                                    text-color="#fff"
                                    active-text-color="#ffd04b">
                                <!--当index为空得时候，所有的菜单项会同时打开和关闭-->
                                <el-submenu v-for="(item,index) in $store.state.routes" :key=index :index="index+'s'"  v-if="!item.hidden" >
                                    <template slot="title">
<!--
                                        //两个好用的图标库，https://www.iconfont.cn/search/index Font Awesome
                                        //npm install font-awesome --save
-->
                                        <i :class="item.iconCls" style="margin-right: 5px;">


                                        </i>
                                        <span>{{item.name}}</span>
                                    </template>
                                    <!--当index不是确定值得时候一定要用v-bind-->
                                    <el-menu-item v-for="(item1,index1) in item.children" :index="item1.path" :key=index1>
                                        <i :class="item1.iconCls" style="margin-right: 5px;"></i>
                                        <span>{{item1.name}}</span>
                                    </el-menu-item>
                                    <!--分组用法
                                    <el-menu-item-group>
                                        <template slot="title">分组一</template>
                                        <el-menu-item index="/viewOne">选项1</el-menu-item>
                                        <el-menu-item index="1-2">选项2</el-menu-item>
                                    </el-menu-item-group>-->
                                    <!--<el-menu-item-group title="分组2">
                                        <el-menu-item index="1-3">选项3</el-menu-item>
                                    </el-menu-item-group>
                                    <el-submenu index="1-4">
                                        <template slot="title">选项4</template>
                                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                                    </el-submenu>-->
                                </el-submenu>
                                <!--<el-menu-item index="2">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">导航二</span>
                                </el-menu-item>
                                <el-menu-item index="3" disabled>
                                    <i class="el-icon-document"></i>
                                    <span slot="title">导航三</span>
                                </el-menu-item>
                                <el-menu-item index="4">
                                    <i class="el-icon-setting"></i>
                                    <span slot="title">导航四</span>
                                </el-menu-item>-->
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.path!=='/home'"  >
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item >{{$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <!--//路由嵌套-->
                    <div style="font-size: 50px;font-family: 华文行楷;height: 400px;color: aqua;display: flex;align-items: center;justify-content: center" class="homeMessage" v-if="$route.path==='/home'">
                        <p>欢迎来到首页</p>
                    </div>
                    <router-view/>
                </el-main>
            </el-container>
            <el-footer>

            </el-footer>
        </el-container>
    </el-container>
    <!--el-container>：外层容器。
                    当子元素中包含 <el-header> 或 <el-footer> 时，
                    全部子元素会垂直上下排列，否则会水平左右排列。
                            <el-header>：顶栏容器。
                            <el-aside>：侧边栏容器。
                            <el-main>：主要区域容器。
                            <el-footer>：底栏容器。-->
</template>

<script>
/*
    import Message from 'element-ui'
*/
    import {Message} from 'element-ui'

    import {logout} from '../../networks/loginRequest'

    import {requestSides} from '../../networks/loginRequest'

    import {getRouters} from "../../networks/getSides/getSides";

export default {
        name: "Home",
        data(){
            return {
                user: JSON.parse(window.sessionStorage.getItem("user")),
                route: '/',
                /*defaultOpen: */
            }
        },
        created(){
            this.requestforSides();
            console.log(this.$route);
            getRouters(this.$store,this.$router);
        }
        ,
        methods: {
            requestforSides(){
                requestSides().then(res=>{
                    console.log(res);
                    console.log(this.$router)
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            chooseMenu(index,indexPath){
                console.log(index);
                this.$router.replace(index)
                console.log(this.$router);
                /*                console.log(index)
                                console.log(indexPath);*/
/*
                indexPath:["1", "/viewOne"]
*/

            },
            handleCommand(command){
                if (command==="注销"){
                    console.log("logout");
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        logout().then(res=>{
                            Message.success(res.data.msg);
                            this.$router.replace('/')
                            window.sessionStorage.clear();
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                        }).catch(error=>{
                            Message.error("发生错误")
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '成功取消'
                        });
                    });
                }else if (command==='修改密码'){
                }
                else if (command==="修改密码"){
                    this.$router.push('/changePassword')
                }else if (command==="聊天") {
                    this.$router.push('/chat')
                }
            }
        }

    }
</script>

<style scoped>
    .head{
        background: #2c95ff;
        display: flex;
        color: black;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }
    .left{
        font-size: 30px;
        font-family: 华文行楷,cursive;
        color: #ffffff
    }
    .el-dropdown-link{
        font-size: 17px;
    }
    .el-dropdown-link img{
        width: 30px;
        height: 30px;
        /*给小图标加圆角*/
        border-radius: 24px;
        margin-left: 9px;
    }
    .el-dropdown-link{
        display: flex;
        align-items: center;
    }
    .el-submenu .el-menu-item {
/*
        min-width: 124px;
*/
    }

</style>
