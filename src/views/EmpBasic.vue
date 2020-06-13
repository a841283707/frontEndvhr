<template>
    <div style="padding: 3vh 1vh">
            <el-form size="small" :inline="true"  class="empNameInline">
                <el-form-item label="员工名：">
                    <el-input v-model="empName"  @keyup.enter="getInitEmpWithName" placeholder="请通过员工名进行搜索" prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" type="primary" @click="getInitEmpWithName">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="ifVisible=!ifVisible" >
                        <i class="fa fa-angle-double-down" aria-hidden="true" style="margin-right: 10px"></i>高级搜索
                    </el-button>
                </el-form-item>
            </el-form>
            <transition name="el-fade-in-linear">
                <div v-show="ifVisible" style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding-left: 40px;padding-top: 10px;margin-bottom: 10px" >
                    <el-row>
                        <el-form size="small" :inline="true">
                            <el-col :span="4">
                                <el-form-item label="政治面貌">
                                    <el-select v-model="employee.politicid" placeholder="请选择活动区域" style="width: 150px">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="民族">
                                    <el-select v-model="employee.nationid" placeholder="请选择活动区域" style="width: 150px">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="职位">
                                    <el-select v-model="employee.posid" placeholder="请选择活动区域" style="width: 150px">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="职称">
                                    <el-select v-model="employee.joblevelid" placeholder="请选择活动区域" style="width: 150px">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="聘用形式">
                                    <el-radio-group v-model="employee.engageform">
                                        <el-radio :label="3">劳务合同</el-radio>
                                        <el-radio :label="6">劳动合同</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form size="medium" :inline="true">
                                <el-form-item label="所属部门">
                                    <el-select v-model="employee.departmentid" placeholder="所属部门" style="width: 150px">
                                        <option label="">

                                        </option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form size="medium" :inline="true">
                                <el-form-item label="入职日期">
                                    <el-date-picker
                                            v-model="value1"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </transition>
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
                    prop="nation.name"
                    label="民族"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="nativeplace"
                    label="籍贯"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="politicsstatus.name"
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
                    prop="department.departmentName"
                    label="部门"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="jobLevel.name"
                    label="职业"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="position.name"
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
                :page-size="currentSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                style="display: flex;justify-content: flex-end"
                background
                layout="sizes ,prev, pager, next"
                :total="total">
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
            getEmpByPage(page,size){
                getRequest("/employee/basic/",{
                    page: page,
                    size: size
                }).then(res=>{
                    this.tableData=res.data.employees;
                    this.total=res.data.total
                }).catch(error=>{
                    Message.error("出现错误")
                })
            },
            getInitEmp(){
                this.getEmpByPage(1,9)
            },
            getInitEmpWithName(){
                getRequest("/employee/basic/",{
                    page: 1,
                    size: 9,
                    name: this.empName
                }).then(res=>{
                    this.tableData=res.data.employees;
                    this.total=res.data.total
                }).catch(error=>{
                    Message.error("出现错误")
                })
            },
            handleSizeChange(val){
                this.currentSize=val;
                if (this.empName!=='' && this.empName!==''){
                    this.getInitEmpWithName()
                }else {
                    this.getInitEmp();
                }
            },
            handleCurrentChange(val){
                this.currentPage=val;
                if (this.empName!=='' && this.empName!==''){
                    this.getInitEmpWithName()
                }else {
                    this.getInitEmp();
                }
            }
        },
        created(){
          this.getInitEmp();
        },
        data() {
            return {
                employee: {
                    name: '',
                    politicid: '',
                    nationid: '',
                    posid: '',
                    joblevelid: '',
                    departmentid: '',
                    engageform: 3,
                    begincontract: '',
                    endcontract: '',
                },
                ifVisible: false,
                value1: [],
                empName:'',
                currentSize: 9,
                currentPage: 1,
                total: 100,
                tableData: []
            }
        },
    }
</script>

<style scoped>

</style>