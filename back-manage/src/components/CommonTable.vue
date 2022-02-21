<template>
  <div class="table-main">
    <el-table
      :data="tableData"
      style="width: 100%; height: 100%"
      show-overflow-tooltip
      stripe
      height="450"
    >
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 扩展内容 -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
         <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
         
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="config.total"
      :current-page="config.page"
      @current-change="changePage"
      :page-size="20"
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    // 表格数据
    tableData: [],
    // 表头数据
    tableLabel: [],
    config: {},
  },
  data() {
    return {}
  },
  methods: {
    // 编辑
    handleEdit(row) {
      console.log('row',row)
      this.$emit('edit',row)
    },
    // 删除
    handleDelete(row) {
      console.log('删除')
      this.$emit('del',row)
    },
    changePage(page){
      this.$emit('changPage',page)
    }
  },
}
</script>

<style lang="less" scoped>
.table-main{
  height: 100%;
  background-color: #fff;
  position: relative;
  .page{
    position: absolute;
    bottom: 0;
    right: 25px;
  }
}
</style>
