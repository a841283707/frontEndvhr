<template>
    <div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="card"
                        label="工号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="ICard"
                        label="身份证号码"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="marry"
                        label="婚姻状况"
                        width="120">
                </el-table-column>
                <el-table-column
                    prop="nation"
                    label="民族"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="homeTown"
                    label="籍贯"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="politicalStatus"
                    label="政治面貌"
                    width="100">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="电子邮件"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="phoneNumber"
                        label="电话号码"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="location"
                        label="联系地址"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="location"
                        label="联系地址"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="location"
                        label="联系地址"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="location"
                        label="联系地址"
                        width="150">
                </el-table-column><el-table-column
                    prop="location"
                    label="联系地址"
                    width="150">
                </el-table-column><el-table-column
                        prop="location"
                        label="联系地址"
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
                    style="display: flex;justify-content: flex-end"
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        methods: {
            handleClick(row) {
                console.log(row);
            }
        },
        data() {
            return {
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
        }
    }
</script>

<style scoped>

</style>