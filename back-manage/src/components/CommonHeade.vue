<template>
  <div class="header-content">
    <div class="col1">通用后台管理系统</div>
    <div class="header-row">
      <div class="col2">
        <el-button
          @click="handelMenu"
          plain
          icon="el-icon-menu"
          size="mini"
        ></el-button>
        <h2>首页</h2>
      </div>
      <div class="col3">
        <el-dropdown :hide-on-click="true" szie="mini">
          <div class="img-box">
            <img class="avent" :src="imgSrc" alt="" srcset="" />
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonHeade',
  data() {
    return {
      // 头像url
      imgSrc: require('../assets/images/user.png'),
    }
  },
  methods: {
    handelMenu() {
      this.$store.commit('collapseMenu')
    },
  },
}
</script>

<style lang="less" scoped>
.header-content {
  height: 60px;
  display: flex;
  line-height: 60px;
  .col1 {
    flex: 0 0 160px;
    font-size: 1em;
    font-weight: bold;
    width: 150px;
    border-right: 1px solid #aaa;
    padding-left: 9px;
  }
  .header-row {
    flex: 1;
    display: flex;
    .col2 {
      padding-left: 10px;
      flex: 5 0 100px;
      h2 {
        margin: 0 10px;
        display: inline-block;
        color: #fff;
      }
    }
    .col3 {
      flex: 1 0 20px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .img-box {
        height: 60px;
        .avent {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 0 1em;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
