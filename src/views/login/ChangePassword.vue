<template>

    <div class="app-container common-list-page">
        <el-container style="text-align: center;margin-top: 10%">
            <el-header>
                <span>尊敬的<span style="color: #409eff">{{user.name}}</span>
                        <span style="color: crimson;margin-left: 10px">{{user.username}}</span>请修改您的密码</span>
            </el-header>
            <el-main>
                <el-form
                    :rules="resetFormRules"
                    ref="resetForm"
                    status-icon
                    :model="resetForm"
                    label-width="100px"
            >
                <el-form-item label="旧密码：" prop="password">
                    <el-input type="password" v-model="resetForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newpwd">
                    <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="newpassword1">
                    <el-input type="password" v-model="resetForm.newpassword1" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native.prevent="toAmend">确认修改</el-button>
                </el-form-item>
            </el-form>
            </el-main>
        </el-container>


    </div>
</template>

<script>
    // import api from "@/api";//这是我个人全局定义单独用来接收url接口的文件，不作参考
    // import { getUsername } from "@/utils/auth";//这是我个人调用封装获取当前账户的username，不作参考
    import {postRequest} from "../../networks/request";
    import {loginRequest} from "../../networks/loginRequest";
    import {Message} from "element-ui"
    import {logout} from "../../networks/loginRequest";

    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入新密码"));
                } else if (value.toString().length < 6 || value.toString().length > 18) {
                    callback(new Error("密码长度为6-18位"));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.resetForm.newpwd) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                resetForm: {
                    //传给后台所需要的参数
                    newpassword1: "",
                    password: "",
                    username: ""//此处只是后台需要的字段而已，如果前期有公用cookie里面有获取并且保存过，现在需要另外调用进来，具体的获取方法就看个人了
                },
                user: JSON.parse(window.sessionStorage.getItem("user")).data.object,
                timeToLeave: 4,
                resetFormRules: {
                    password: [
                        { required: true, message: "请输入旧密码", trigger: 'blur' }
                    ],
                    newpwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    newpassword1: [
                        { required: true, validator: validatePass2, trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            toLeaveTime(){
                setInterval(()=>{
                    this.timeToLeave=this.timeToLeave--;
                },1000)
            },
            toAmend() {
                this.$refs.resetForm.validate(valid => {
                    if (valid) {
                        loginRequest('/change/updatePassword',this.resetForm).then(res => {
                            if (res.data.code===1001){
                                Message.error("修改失败"+res.data.message);
                                this.resetForm.password='';
                            }else if (res.data.code===1000){
                                Message.success(res.data.data+"将在三秒后跳转至登录页，请牢记你重置的密码")//+this.timeToLeave+"s"
                                setTimeout(() => {
                                    /*关于页面的传参问题个人博客https://blog.csdn.net/weixin_43532415/article/details/107425798*/
                                    logout().then(res=>{
                                        this.$router.replace({name: 'Login',params: {password: this.resetForm.newpassword1}})
                                        window.sessionStorage.clear();
                                    })
                                },3000);
                            }else {
                                Message.error("出现未知状态")
                            }

                        }).catch(error => {
                            console.log(error);
                        });
                    }
                    //这里的api.materialQuery.toAmend是调用前期我们统一的api接口url路径，不作参考 ，只要把后台需要的字段正常传进去即可
                    /*api.materialQuery.toAmend(this.resetForm)
                            .then(res => {
                                if(res.code === 2){
                                    this.$message({
                                        message: res.msg,
                                        type: "error",
                                        duration: "2000"
                                    });
                                    return false;
                                }
                                if (res.code === 0) {
                                    this.$message.success("修改成功,3秒后跳转到登录页！");
                                    setTimeout(() => {
                                        this.logout();//调用跳转到登陆页的方法
                                    }, 3000);
                                }
                                ic
                            })
                            .catch(() => {});
                    }
                });*/
                })
                //这是修改成功后重新返回登陆页的方法，看个人需要自行调整
                /*async logout() {
                await this.$store.dispatch("user/logout");
                this.$router.push(`/login`);
            }*/
            }
        }
    };
</script>

<style lang="scss" scoped>
    .el-form {
        width: 30%;
        margin: 1px auto 0;
        text-align: center;
        button {
            margin: 20px 0 0;
        }
    }
</style>
