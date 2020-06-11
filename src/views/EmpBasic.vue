<template>
    <div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="workid"
                        label="工号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="idcard"
                        label="身份证号码"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        label="婚姻状况"
                        width="120">
                </el-table-column>
                <el-table-column
                    prop="nationid"
                    label="民族"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="nativeplace"
                    label="籍贯"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="politicid"
                    label="政治面貌"
                    width="100">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="电子邮件"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话号码"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="联系地址"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="departmentid"
                        label="部门"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="joblevelid"
                        label="职业"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="posid"
                        label="职称"
                        width="150">
                </el-table-column>
                <el-table-column
                    prop="engageform"
                    label="合同"
                    width="150">
                </el-table-column>
                <el-table-column
                        prop="tiptopdegree"
                        label="学历"
                        width="150">
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="民族"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    :page-sizes="[10, 15, 20, 25]"
                    :page-size="size"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    style="display: flex;justify-content: flex-end"
                    background
                    layout="sizes ,prev, pager, next"
                    :total="1000">
            </el-pagination>
    </div>
</template>

<script>
    import {getRequest} from "../networks/request";
    import {Message} from 'element-ui'
    export default {
        name: "EmpBasic",
        methods: {
            handleClick(row) {
                console.log(row);
            },
            getInitEmp(){
                getRequest("/employee/basic/",{
                    page: 1,
                    size: 9
                }).then(res=>{
                    this.tableData=res.data;
                }).catch(error=>{
                    Message.error("出现错误")
                })
            },
            handleSizeChange(val){
                console.log(val);
            },
            handleCurrentChange(val){
                console.log(val);
            }
        },
        created(){
          this.getInitEmp();
        },
        data() {
            return {
                size: 9,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }]
            }
        },
    }
</script>

<style scoped>

</style>