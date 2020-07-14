<template>
    <div class="main">
        <div class="input" >
            <el-form size="medium" :rules="rules" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item
                        prop="username"
                        label="账号">
                    <!--v-model实现双向绑定，即将输入的数据和定义的数据绑定在一块儿-->
                    <el-input v-model="dynamicValidateForm.username"></el-input>
                </el-form-item>
                <el-form-item
                        label="密码"
                        prop="password">
                    <el-input v-model="dynamicValidateForm.password"></el-input>
                </el-form-item>
                <!--inline-block处于一行的元素会同高，改变一个元素的高度会影响其他元素的高度-->
                <div style="display: flex">
                    <el-form-item prop="validate" style="padding-top: 39px" label="验证码">
                        <el-input  class="validate-code" placeholder="验证码"  style="width: 100%;" ></el-input>
                    </el-form-item>
                    <div class="code" @click="refreshCode"  style="margin-left: 200px;margin-top: 10px">
                        <Identity :identifyCode="identifyCode" :content-width="160" :content-height="60" style="margin-top: 10px"></Identity>
                    </div>
                </div>



                <el-form-item>
                    <el-checkbox v-model="checked"></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="buto" type="primary" @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script>
    import {loginRequest} from '../../networks/loginRequest'
    import {Message} from 'element-ui'
    import Identity from '../commonView/Identity'
    export default {
        name: "login",
        created(){
            alert("11")
            this.refreshCode();
        },
        components:{
            Identity,
        },
        data(){
            return{
                identifyCodes: "1234567890",
                dynamicValidateForm: {
                    username: '',
                    password: '',
                },
                identifyCode: "",
                checked: true,
                rules:{
                    username: {
                        required: true, message: '请输入邮箱地址', trigger: 'blur'
                    },
                    password: {
                        required: true, message: '密码不能为空', trigger: 'blur'
                    },

                }
            };
        },
        methods: {
            randomNum (min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                console.log(this.identifyCode);
            },
            submitForm(){
                this.$refs.dynamicValidateForm.validate((valid)=>{
                    //测试stringfy
                    /*let data={
                        abc: "dsa",
                        bcs: "dsa"
                    }
                    alert(JSON.stringify(data));*/
                    if (valid){
                        loginRequest(this.dynamicValidateForm).then(res=> {


                            if(res){
                                if(res.status===200 && res.data.status===200 && res.data.msg==="登录成功"){
                                    window.sessionStorage.setItem("user",JSON.stringify(res))
                                    //this的指向问题，箭头函数的环境里没有this对象，因此会一层一层往外找，到loginrequest的外层，
                                    //因此this对象是组件对象，组件对象里注册了router和store
                                    console.log(this.$route);
                                    console.log(this.$route.query.redict);
                                    //判断里面有没有redict的值，没有的话跳转到home，有的话直接跳转redict
                                    //判断undefined的方法，$route里面有整个浏览器里面的输入信息包括query和query
                                    if (typeof this.$route.query.redict==="undefined"){
                                        this.$router.replace('/home')
                                    }else {
                                        this.$router.replace(this.$route.query.redict)
                                    }

                                    Message.success({
                                        message: "登录成功",
                                        duration: 1000,
                                    })
                                }
                            }
                        }).catch(error=>{
                            console.log(error);
                        })
                    }else {
                        console.log("error");
                    }
                })
            }

        }

    }
</script>

<style scoped>

    .input{
        height: 30vh;
        width: 30%;
        border-radius: 15px;
        /*边线长度，实线，颜色*/
        border: 1px solid #eaeaea;
        /*
           水平阴影位置，垂直阴影位置，阴影长度颜色
        */
        box-shadow: 0 0 25px #cac6c6;

        /*background: ;*/
        background-clip: padding-box;
        /*顺时针记忆*/

        padding: 35px 35px 15px 35px;


        /*margin: 180px auto;*/


    }
    .buto{
        width: 100%;
    }
    .main{
        align-items: center;
        display: flex;
        justify-content: center;
        height: 100vh;
        background: url(../../../public/assert/background.png);
    }
    .validate-code > input{
        height: 100px;
    }


</style>
