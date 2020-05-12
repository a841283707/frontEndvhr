<template>
    <div>
        <div>
            <el-form :inline="true" style="margin-bottom: -15px">
                <el-form-item >
                    <!--input里面设置100%不起作用，设置px起作用，怀疑是继承了父级的宽度，而父级的宽度被限制-->
                    <el-input
                            style="width: 320px"
                            placeholder="请输入内容"
                            v-model="grade.name">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-select placeholder="请选择职称等级" v-model="grade.titlelevel" >
                        <el-option v-for="(item,index) in titleGrades"  :label="item" :key="index" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                </el-form-item>
            </el-form>
            <el-dialog
                    title="请修改当前选择的职称名称"
                    :visible.sync="dialogVisible"
                    width="30%"
            >
                <div slot="title">
                    <span style="font-size: 26px">请修改当前选择的职称名称</span>
                </div>
                <!--在关闭之前执行的函数-->
                <div>
                    <el-form v-model="diaGrade">
                        <el-input  v-model="diaGrade.name"></el-input>
                        <el-select style="margin-top: 10px" placeholder="请选择职称等级" v-model="diaGrade.titlelevel" >
                            <el-option v-for="(item,index) in titleGrades"  :label="item" :key="index" :value="item">
                            </el-option>
                        </el-select>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="updateGrade">确 定</el-button>
                </span>
            </el-dialog>

        </div>
        <div style="width: 75%">
            <template>
                <!--表格列的宽度设置为%指的是相当于原来的表格宽度，指定为数字是px-->
                <el-table
                        size="small"
                        border
                        :data="grades.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%"
                        @select="handleSelect">

                    <el-table-column
                            label="编号"
                            prop="id"
                    width="77">
                    </el-table-column>
                    <el-table-column
                            label="职称名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="职称级别"
                            prop="titlelevel">
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            prop="createdate">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center">
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
                                    @click="deleteGrade(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    import {getPosition,addPosition,updatePosition,deletePosition,deleteAll} from "../../networks/sysbasic/getPosition";
    import {getGrades,addGrade} from "../../networks/sysbasic/jobLevel";
    import {deleteRequest,putRequest} from '../../networks/request'


    export default {
        name: "JobManage",
        created(){
            this.getGrades();
        },
        data(){
            return {
                titleGrades: [
                '正高级',
                '副高级',
                '中级',
                '初级',
                '员级',
                ],
                grades: '',
                diaGrade: {
                    id: '',
                    name: '',
                    titlelevel: '',
                },
                grade: {
                    id: '',
                    name: '',
                    titlelevel: '',
                },
                diaVisible: false,
                selection: '',
                position: {
                    name: '',
                    id: ''
                },
                dialogVisible: false ,
                positionName: '',
                search: '',
                tableData: []
            }
        },
        methods: {
            getGrades(){
                getGrades().then(res=>
                {
                    this.grades=res.data;
                    console.log(res);
                }).catch(error=>{
                    console.log(error);
                })
            },
            deleteGrade(index,row){
                console.log(row);
                deleteRequest('/sys/basic/jobLevel/deleteGrade',{id: row.id}).then(res=>{
                    if (res.status===200 && res.data.status===200){
                        this.$message.success(res.data.msg)
                        this.getGrades();
                        this.diaVisible=false;
                    } else {
                        this.$message.error(res.data.msg);
                        this.getGrades();
                        this.diaVisible=false;
                    }
                }).catch(error=>{
                    this.Message.error("发生错误");
                })

            },
            handleSelect(selection){
                this.selection=selection;
            },
            onSubmit(){
                addGrade(this.grade).then(res=>{
                    if (res.status===200 && res.data.status===200){
                        this.$message.success("添加成功")
                        this.grade='';
                        this.getGrades();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    this.$message.error("发生错误");
                });
                /*不能把函数写在这儿因为可能会先执行下面的函数，必须按照顺序*/
            },
            updateGrade(){
                putRequest('/sys/basic/jobLevel/updataGrade',this.diaGrade).then(res=>{
                    if (res.status===200 && res.data.status===200){
                        this.$message.success("修改成功");
                        this.getGrades();
                    } else {
                        this.$message.error(res.data.msg)
                    }
                }).catch(error=>{
                    this.$message.error("发生错误")
                })
                this.dialogVisible=false;

            },
            handleEdit(index, row) {
                console.log(row);
                this.dialogVisible=true;
                this.diaGrade.name=row.name;
                this.diaGrade.titlelevel=row.titlelevel
                this.diaGrade.id=row.id
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