<template>
  <el-container class="home">
    <el-header class="home-header">
      <CommonHeade></CommonHeade>
    </el-header>
    <el-container class="home-main">
      <el-aside style="width: 10rem">
        <CommonAside></CommonAside>
      </el-aside>

      <el-main class="home-content">
        <CommonTag></CommonTag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '../components/CommonAside'
import CommonHeade from '../components/CommonHeade.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  name: 'Home',
  components: {
    CommonAside,
    CommonHeade,
    CommonTag
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .home-header {
    color: #fff;
    padding: 0;
    background-color: #002fa7;
  }
  .home-main {
    /deep/.el-main {
      padding: 10px;
    }
    .home-content {
      height: 100%;
    }
  }
}
</style>
>
