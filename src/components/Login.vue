<template>
  <div class="login-container">
    <div class="login-box">
      <div class="manage_tip">
        <p>驼峰后台管理系统</p>
      </div>
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/auhor.jpg" alt />
      </div>
      <!-- 表单区域 -->
      <!-- ref被用来给元素和组件注册引用信息；loginFormRef就是表单实例 -->
      <el-form :model="loginForm" class="form-box" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" type="text"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        captcha_code: '123'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm: function () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login: function () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post(
          '/v2/login',
          this.loginForm
        )

        console.log(res)
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.push('home')
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
          this.$router.push('home')
        }
        // if (res.meta.status !== 400) {
        //   console.log('登陆成功')
        //   this.$message.success('登陆成功')
        //   //   window.sessionStorage.setItem('token', res.data.token)
        //   this.$router.push('/home')
        // } else {
        //   console.log('登录失败')
        //   this.$message.error('登录失败')
        // }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.manage_tip {
  position: absolute;
  width: 100%;
  top: -180px;
  left: 25%;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.form-box {
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
