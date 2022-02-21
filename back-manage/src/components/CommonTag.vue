<template>
  <div class="home-tag">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="closeMenu(item, index)"
      class="tag"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommonTag',
  // 获取到tabsList的值
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    // 解构出state中mutations的方法closeTag
    ...mapMutations({
      close: 'closeTag',
    }),
    changeMenu(item) {
      this.$router.push({ name: item.name })
    },
    closeMenu(item, index) {
      this.close(item)

      // 判断当前路由是否与要删除标签路由一致
      if (item.name === this.$route.name) {
        // 删除当前页,并跳转到前一页
        this.$router.push({
          name: this.tags[index - 1].name,
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.home-tag {
  margin-bottom: 0.5em;
  .tag {
    cursor: pointer;
    margin-right: 0.5em;
  }
}
</style>
