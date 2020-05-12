<template>
    <div>
        <div class="basic">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="部门管理" name="first">
                    <div class="block">

                        <el-input
                                placeholder="输入关键字进行过滤"
                                v-model="filterText" class="filter" style="margin-bottom: 20px">
                        </el-input>

                        <el-tree
                                ref="tree"
                                :data="departments"
                                show-checkbox
                                :props="defaultProps"
                                node-key="id"
                                :filter-node-method="filterNode"
                                default-expand-all
                                :expand-on-click-node="false">
                            <!--1.父组件传递了todos数组给子组件
                            2.子组件通过props接受了数组数据，这里应该没有任何问题
                            3.子组件拿到数组后v-for渲染列表，并且通过 <slot :todo="todo">的方式，把数组内的每一个todo对象，传递给父组件
                            4.父组件通过slot-scope="slotProps"的方式，接受todo对象，之后就可以通过slotProps.todo.xxx的方式来使用了
                            所以数据的流动经历了

                            父组件传递todos数组给子组件
                            子组件遍历todos数组，把里面的todo对象传递给父组件
                            好啦，这就是slot-scope的使用方法，就这么简单，完结撒花~-->
                              <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                                <span>
                                  <el-button
                                          class="button"
                                          type="primary"
                                          size="mini"
                                          @click="() => append(data)">
                                    增加部门
                                  </el-button>
                                  <el-button
                                          type="warning"
                                          size="mini"
                                          @click="() => remove(node, data)">
                                    减少部门
                                  </el-button>
                                </span>
                              </span>
                        </el-tree>
                    </div>
                    <el-dialog
                            title="提示"
                            :visible.sync="dialogVisible"
                            width="30%"
                            >
                        <!--在关闭之前执行的函数-->
                        <div>
                            <el-form :model="departmentForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="父级部门" prop="region">
                                    <!--大坑啊！当出现v-model的时候，value就失去作用了，也许是头晕了吧-->
                                    <el-select v-model="departmentForm.departmentId" placeholder="请选择父级部门">
                                        <el-option v-for="item in departmentsName" :label="item.departmentName" :value=item.id></el-option>
                                    </el-select>
                                </el-form-item>
                                <!--prop	表单域 model 字段，
                                在使用 validate、resetFields 方法的情况下，该属性是必填的	string
                                传入 Form 组件的 model 中的字段-->
                                <el-form-item label="部门名称" prop="name" style="width: 80%">
                                    <el-input v-model="departmentForm.departmentName"></el-input>
                                </el-form-item>

                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addDepartment">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="职位管理" name="second">
                    <JobManage/>
                </el-tab-pane>
                <el-tab-pane label="职称管理" name="third">
                    <JobLevel/>
                </el-tab-pane>
                <el-tab-pane label="奖惩规则" name="fourth">

                </el-tab-pane>
                <el-tab-pane label="权限组" name="fiveth">

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {getDepartment,getName,insertDepartment,deleteDepartment} from "../networks/sysbasic/getDepartment";
    import {Message} from 'element-ui'
    import JobManage from './sysBasic/JobManage'
    import JobLevel from './sysBasic/JobLevel'
    let id=1000;
    export default {
        name: "SysBasic",
        components: {
          JobManage,
          JobLevel,
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            const data = [
                {
                id: 1,
                label: '一级 1',
                children: [
                    {
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            },
                {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            },
                {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }];
            return {
                rules: {
/*
                    departmentId: [{required: true,message: '请选择活动区域', trigger: 'change'}],
*/
                    departmentName: [{required: true, message: '部门名称', trigger: 'blur' }],
                },
                departmentForm: {
                  departmentId: "",
                  departmentName: '',
                },
                data: JSON.parse(JSON.stringify(data)),
                activeName: 'first',
                dialogVisible: false,
                filterText: '',
                departments:[],
                departmentsName: [],
                /*服务器返回的字段和tree字段相对应*/
                defaultProps: {
                    children: 'children',
                    label: 'departmentName'
                },
                currentDep: {
                    currentName: '',
                    currentValue: '',
                },

            }
        },
        mounted(){
            this.getDepartment();
            this.getName();
        },
        methods: {
            //发送增加部门请求
            addDepartment(){
                insertDepartment(this.departmentForm).then(res=>{
                    Message.success("操作成功");
                    this.getDepartment();
                    this.dialogVisible=false;
                }).catch(error=>{
                    Message.error("操作失败")
                })
            },
            //得到所有部门
            getName(){
              getName().then(res=>{
                  this.departmentsName=res.data;
              }).catch(error=>{
                  console.log(error);
              })
            },
            //得到列表部门和关系数据
            getDepartment(){
              getDepartment().then(res=>{
                  /*服务端返回的数据是json对象不是json字符串*/
                  this.departments=JSON.parse(JSON.stringify(res.data));
              }).catch(error=>{
                  console.log(error);
              })
            },
            filterNode(value, data) {
                if (!value) return true;
                console.log(data);
                /*便利所有的node找到有value的一个*/
                return data.departmentName.indexOf(value) !== -1;
            },
            //增加部门按钮
            append(data) {
                this.dialogVisible=true;
                this.departmentForm.departmentId=data.id;
                console.log(data);
                /*const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    //如果children不存在
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);*/
            },
            //删除部门按钮
            remove(node, data) {
                if (data.isparent){
                    Message.error("有子部门不能删除")
                }else {
                    this.$confirm('您确定要删除此部门吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        deleteDepartment({id:data.id,isParent: data.isparent}
                        ).then(
                            res=>{
                                console.log(res);
                                if (res.data.status===500){
                                    Message.error(res.data.msg);
                                } else if (res.data.status===200){
                                    Message.success(res.data.msg)
                                    this.getDepartment();
                                }
                             }
                             //then里面的代码出错误也会跳转到catch也就是说then和catch都执行
                        ).catch(error=>{
                            console.log(error);
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消成功'
                        });
                    });
                }
               /* const parent = node.parent;
                //一级目录返回同级所有目录。二级目录返回parent的children
                const children = parent.data.children || parent.data;
                /!*findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
               findIndex() 方法为数组中的每个元素都调用一次函数执行：
               当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，
               之后的值不会再调用执行函数。
               如果没有符合条件的元素返回 -1*!/
                const index = children.findIndex(d => d.id === data.id);
                //从第几个位置开始删除多少个元素
                //array.splice(index,howmany,item1,.....,itemX)
                children.splice(index, 1);*/
            },
            handleClick(tab, event) {
                console.log(tab);
                console.log(event);
            }
        }
    }
</script>

<style scoped>
    .block{
        width: 40%;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        padding-bottom: 6px;
    }
    .button{
        padding-bottom: 3px;
    }
    .basic{
        padding: 20px 10px;
    }


</style>