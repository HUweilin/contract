<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h3 class="title">登录</h3>
      <el-form class="login-form" ref="form" :model="form" :rules="rules" label-width="40px" label-position="left" size="small" :hide-required-asterisk="true">
        <el-form-item label="用户" prop="username">
          <el-input prefix-icon="icon iconfont icon-user" v-model="form.username" placeholder="用户名" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" prefix-icon="icon iconfont icon-password" v-model="form.password" placeholder="密码" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button class="login-btn" type="primary" @click="login" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userService } from '../services/api.js'
// import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      userMsg: {},
      logining: false
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.logining = true
          Object.assign(this.userMsg, this.form)
          userService.login(this.userMsg).then(res => {
            this.logining = false
            this.$success('登录成功')
            userService.setLoginMsg(res.data)
            this.$router.push({path: '/contracts'})
          }, err => {
            this.logining = false
            if (err.code === 401) {
              this.$error('用户名或密码不正确')
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-wrapper {
    height: 100%;
    background: url('../assets/images/bg.png');
    overflow: hidden;
  }
  .login-box {
    width: 320px;
    height: 220px;
    padding: 10px 15px;
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -160px;
    border-radius: 10px;
    background-color: #fff;
  }
  .title {
    margin-bottom: 10px;
    font-size: 25px;
    text-align: center;
  }
  .login-form {
    margin: 0 auto;
  }
  .login-btn {
    width: 100%;
  }
</style>
