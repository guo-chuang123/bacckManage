<template>
  <el-form ref="form" :model="form" :inline="inline" label-width="80px">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选中日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <el-option
          v-for="item1 in item.opts"
          :key="item1.value"
          :label="item1.label"
          :value="item1.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CommonForm',
  props: {
    // form配置
    formLabel: [],
    // form数据
    form: {},
    // 表单布局
    inline: Boolean,
  },
  data() {
    return {}
  },
}
</script>

<style></style>
