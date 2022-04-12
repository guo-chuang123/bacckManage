<template>
  <div class="user-main">
    <div class="user-header">
      <div class="header-add">
        <el-button type="primary" @click="addUser"
          ><i class="add-i el-icon-plus"></i>新增</el-button
        >

        <el-dialog
          :title="operateType === 'add' ? '新增用户' : '更新用户'"
          :visible.sync="isShow"
          :modal-append-to-body="false"
          :before-close="cancleEdit"
        >
          <CommonForm
            :formLabel="operateFormLabel"
            :form="operateForm"
            :inline="true"
            ref="form"
          ></CommonForm>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancleEdit">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <div class="header-search">
        <CommonForm
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
        >
          <el-button type="primary" @click="getList(1, searchForm.keyword)"
            >搜索</el-button
          >
        </CommonForm>
      </div>
    </div>
    <div class="user-content">
      <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changPage="getList"
        @edit="editUser"
        @del="delUser"
      ></CommonTable>
    </div>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import { editData, addData, getUser } from '../../../api/data'
export default {
  name: 'User',
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      input: '',
      // 弹窗是否显示
      isShow: false,
      // 弹窗内title值
      operateType: 'add',
      // 表单配置数据
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input',
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input',
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 0,
            },
          ],
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date',
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input',
        },
      ],
      // 表单数据
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input',
        },
      ],
      searchForm: {
        keywords: '',
      },
      // 表格数据
      tableData: [],
      // 表格配置项
      tableLabel: [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'age',
          label: '年龄',
        },
        {
          prop: 'sexLabel',
          label: '性别',
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200,
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320,
        },
      ],
      // 分页配置数据
      config: {
        page: 1,
        total: 30,
      },
      // 备份当前行的数据
      theRow: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 添加按钮
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
      }
    },
    // 对话框取消事件
    cancleEdit() {
      this.isShow = false
      // 将备份数据重新赋给operateForm,重新渲染,给出提示
      this.operateForm = this.theRow
      this.getList()
      this.$message({
        showClose: true,
        message: '已取消更新',
      })
    },
    // 添加确认
    confirm() {
      // 根据提交的类型,发送请求
      if (this.operateType === 'edit') {
        editData(this.operateForm).then((res) => {
          if (res.data.code === 20000) {
            this.$message({
              showClose: true,
              message: '更新成功',
              type: 'success',
            })
            this.getList()
          }
        })
      } else {
        addData(this.operateForm).then((res) => {
          if (res.data.code === 20000) {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success',
            })
            this.getList()
          }
        })
      }
      this.isShow = false
    },
    // 获取列表数据
    getList(page, name = '') {
      this.config.page = page
      this.config.loading = true
      // 若为搜索，设置页数为1，并按名字查找
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        if (res.list.length === 0) {
          this.$message({
            showClose: true,
            message: '查无此人！',
            type: 'warning',
          })
        } else {
          res.list.map((item) => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          this.tableData = res.list
          this.config.total = res.count
          this.config.loading = false
        }
      })
    },
    // 更新用户
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
      // 将该行数据进行深拷贝,方便编辑取消
      this.theRow = JSON.parse(JSON.stringify(row))
    },
    // 删除用户
    delUser(row) {
      this.$confirm('此操作将永久删除该文件,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const id = row.id
          this.$http
            .get('user/del', {
              params: { id },
            })
            .then(() => {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success',
              })
              this.getList()
            })
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
} 
</script>
 
<style lang="less" scoped>
.user-main {
  flex-direction: column;
  padding: 10px;
  .user-header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    .header-add {
      flex: 2;
      .add-i {
        margin-right: 5px;
      }
    }
    .header-search {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .search-input {
        width: 50%;
        margin-right: 10px;
      }
    }
  }
  .user-content {
    height: 500px;
  }
}
</style>

