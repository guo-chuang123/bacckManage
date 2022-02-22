<template>
  <div class="login-main">
    <el-form
      status-icon
      :model="loginForm"
      :rules="rule"
      ref="form"
      class="login-content"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button class="login-btn" type="primary" @click="Login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from 'mockjs'
import { login } from '../../../api/data'
export default {
  name: 'login',
  data() {
    return {
      // 表单数据
      loginForm: {
        username: '',
        password: '',
      },
      // 校验规则
      rule: {
        username: [
          { required: true, messgae: '用户名不能为空', trigger: 'blur' },
          { min: 3, messgae: '用户名长度不能少于3位', trigger: 'blur' },
        ],
        password: [
          { required: true, messgae: '密码不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    Login() {
      // 用mock模拟生成token值
      const token = Mock.Random.guid()
      console.log(token)
      login(this.loginForm).then((res) => {
        console.log(res.data.data)

        if (res.data.code === 20000) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.data.menu)
          // 存入token值
          this.$store.commit('setToken', res.data.data.token)
          // 动态设置路由
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })

          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success',
          })
        } else {
          this.$message({
            showClose: true,
            message: res.data.data.message,
            type: 'error',
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login-main {
  width: 100%;
  height: 100%;
  display: flex;
  .login-content {
    width: 25%;
    height: 40%;
    display: flex;
    flex-direction: column;
    border-radius: 1em;
    background-color: #fff;
    padding: 1em;
    margin: auto;
    box-shadow: 0 2px 5px #003fa7;
    .btn-box {
      text-align: center;
      .login-btn {
        width: 40%;
        font-size: 1.2em;
        font-weight: bold;
      }
    }
  }
}
</style>
