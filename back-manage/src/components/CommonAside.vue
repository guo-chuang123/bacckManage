<template>
  <div class="content">
    <!-- 侧边栏折叠按钮 -->
    <el-menu class="menu-btn" v-model="isCollapse">
      <el-button class="btn-open" plain v-if="isCollapse" @click="handelMenu"
        ><i class="el-icon-s-unfold"></i
      ></el-button>
      <el-button class="btn-close" plain v-if="!isCollapse" @click="handelMenu"
        ><i class="el-icon-s-fold">折叠</i></el-button
      >
    </el-menu>
    <!-- 侧边栏 -->
    <el-menu
      class="menu-main"
      :collapse="isCollapse"
    >
      <!-- 侧边栏一级按钮 -->
      <el-menu-item
        @click="clickMenu(item)"
        v-for="(item, index1) in noChild"
        :key="item.path"
        :index="'one' + index1"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!-- 侧边栏二级按钮 -->
      <el-submenu
        v-for="(item, index2) in hasChild"
        :key="item.path"
        :index="'inside' + index2"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item1, index) in item.children"
            :key="item1.path"
            @click="clickMenu(item1)"
            :index="'insidein' + index"
          >
            <i :class="'el-icon-' + item1.icon"></i>
            {{ item1.label }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'CommonAside',
  data() {
    return {
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'home/home',
        },
        {
          path: '/goods',
          name: 'goods',
          label: '商品管理',
          icon: 'video-play',
          url: '/goods',
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: '/user',
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/otherOne',
              name: 'otherOne',
              label: '页面1',
              icon: 'setting',
              url: '/otherOne',
            },
            {
              path: '/otherTwo',
              name: 'otherTwo',
              label: '页面2',
              icon: 'setting',
              url: '/otherOne',
            },
          ],
        },
      ],
    }
  },
  computed: {
    // 计算属性，过滤出当前数组无子项目的项
    noChild() {
      return this.menu.filter((item) => !item.children)
    },
    // 计算属性，过滤出当前数组有子项目的项
    hasChild() {
      return this.menu.filter((item) => item.children)
    },
    // 使用vuex实现组件间传递isCollapse
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
  },

  methods: {
    // 点击侧边栏跳转路由
    clickMenu(item) {
      
      this.$store.commit('selsectMenu', item)
      this.$router.push({
        name: item.name,
      })
    },
    // vuex，是否折叠侧边栏
    handelMenu() {
      this.$store.commit('collapseMenu')
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  .menu-main {
    flex: 1;
  }
  .menu-btn {
    background-color: #eee;
    display: flex;
    .btn-open {
      width: 64px;
      font-size: 20px;
    }
    .btn-close {
      width: 100%;
    }
  }
}
</style>
