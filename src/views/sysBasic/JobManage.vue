<template>
    <div>
        <div>
            <el-form :inline="true">
                <el-form-item >
                    <!--input里面设置100%不起作用，设置px起作用，怀疑是继承了父级的宽度，而父级的宽度被限制-->
                    <el-input
                            style="width: 320px"
                            placeholder="请输入内容"
                            v-model="positionName">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                </el-form-item>
            </el-form>
            <el-dialog
                    title="请修改当前选择的部门名称"
                    :visible.sync="dialogVisible"
                    width="30%"
            >
                <div slot="title">
                    <span style="font-size: 26px">请修改当前选择的部门名称</span>
                </div>
                <!--在关闭之前执行的函数-->
                <div>
                    <el-input v-model="position.name"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="updatePosition">确 定</el-button>
                </span>
            </el-dialog>

        </div>
        <div style="width: 60%">
            <template>
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="编号"
                            prop="id">
                    </el-table-column>
                    <el-table-column
                            label="职位名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            prop="createdate">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <!--通过slot自定义列表表头，通过slot-scope自定义列表-->
                        <!--<template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>-->
                        <!--slot-scope被废弃掉的属性，用于使用子组件插槽属性，$index,row-->
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    import {getPosition,addPosition,updatePosition,deletePosition} from "../../networks/sysbasic/getPosition";

    export default {
        name: "JobManage",
        created(){
          this.getAllData();
        },
        data(){
            return {
                position: {
                    name: '',
                    id: ''
                },
                dialogVisible: false ,
                positionName: '',
                search: '',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
            }
        },
        methods: {
            onSubmit(){
                addPosition({positionName: this.positionName}).then(res=>{
                    if (res.status===200 && res.data.status===200){
                        this.$message.success("添加成功")
                        this.getAllData();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    this.Message.error("发生错误");
                });
                /*不能把函数写在这儿因为可能会先执行下面的函数，必须按照顺序*/
            },
            updatePosition(){
                updatePosition(this.position).then(res=>{
                    if (res.status===200 && res.data.status===200){
                        this.$message.success("修改成功");
                        this.getAllData();
                    } else {
                        this.$message.error(res.data.msg)
                    }
                }).catch(error=>{
                    this.$message.error("发生错误")
                })
                this.dialogVisible=false;

            },
            getAllData(){
              getPosition().then(res=>{
                  this.tableData=res.data
              }).catch(error=>{
                  console.log(error);
              })
            },
            handleEdit(index, row) {
                this.dialogVisible=true;
                this.position.name=row.name;
                this.position.id=row.id
            },
            handleDelete(index, row) {
                this.position.id=row.id;
                deletePosition(this.position.id).then(res=>{
                    if (res.status===200 &&res.data.status) {
                        this.$message.success(res.data.msg)
                    }else {
                        this.$message.error(res.data.msg)
                    }
                    this.getAllData();
                    this.dialogVisible=false;
                }).catch(error=>{
                    this.$message.error("服务器错误")
                })
                console.log(index, row);
            }
        }

    }
</script>

<style scoped>

</style>