<template>
  <div class="container login">
    <div class="container-box">
      <div class="logo">
        <img src="../../assets/login-logo.png" alt="">
      </div>
      <!-- 登录 -->
      <div class="sign-in login-main">
        <p class="title">推广登录</p>
        <div class="input-box">
          <img src="../../assets/login-user.png" class="label" alt="">
          <input type="text" v-model="loginForm.loginAccount" @blur="windowScrollBack" placeholder="请输入用户名" maxlength="12" minlength="4" />
        </div>
        <div class="input-box">
          <img src="../../assets/login-pwd.png" class="label" alt="">
          <input type="password" v-model="loginForm.loginPassword" @blur="windowScrollBack" placeholder="请输入密码" maxlength="12" minlength="6" />
        </div>
        <!-- <div class="other">
          <span @click="isRegister=true;">账号注册</span>
          <span>忘记密码</span>
        </div> -->
        <div class="btn" @click="login">登录</div>
        <!-- <router-link to="/layout/home" class="back">我先逛逛</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { uploadUserInfo } from '@/utils/utils.js';
let iconSuccess = require('@/assets/icon-success.png');
let iconWarning = require('@/assets/icon-warning.png');
export default {
  data() {
    return {
      signIn: {
        loginAccount: "",
        loginPassword: "",
        confirmPassword: "",
        invitationCode: ""
      },
      loginForm: {
        loginAccount: "",
        loginPassword: ""
      },
      isRegister: false // 是否注册
    };
  },
  created() {
    this.$store.commit('setUserInfo', null);
    this.$store.commit('setToken', '');
    localStorage.clear();
  },
  methods: {
    uploadUserInfo: uploadUserInfo,//获取用户详情
    // 限制输入英文 数字
    onInputChange(key) {
      this.signIn[key] = this.signIn[key].replace(/[^\a-\z\A-\Z0-9]/g, "");
    },
    // 登录
    login() {
      if (
        !this.loginForm.loginAccount ||
        this.loginForm.loginAccount.length < 4
      ) {
        this.$toast({
          duration: 1000,
          icon: iconWarning,
          forbidClick: true, // 禁用背景点击
          message: "请输入正确的用户名"
        });
        return
      }
      if (
        !this.loginForm.loginPassword ||
        this.loginForm.loginPassword.length < 6
      ) {
        this.$toast({
          duration: 1000,
          icon: iconWarning,
          forbidClick: true, // 禁用背景点击
          message: "请输入正确的密码"
        });
        return
      }
      this.$http.post("account/login", this.loginForm).then(res => {
        if (res.retCode == 0) {
          this.$store.commit("setToken", res.data.token);
          this.uploadUserInfo();
          this.$router.replace("/layout/Bonus");
        }
      });
    },
    //获取用户信息
    getUserInfo(token) {
      this.$http.post("userInfo/userInfo", { token: token }).then(res => {
        if (res.retCode == 0) {
          this.$store.commit("setUserInfo", res.data);
        }
      });
    },
    // 键盘收起，页面回弹
    windowScrollBack(){
      window.scrollTo(0,0)
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: #000 url(~@/assets/login-bg.png) no-repeat;
  background-size: contain;
  position: relative;
  padding-top: 120px;
  .container-box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .logo {
    text-align: center;
    margin-bottom: 0px;
    img {
      width: 430px;
    }
  }
  .login-main {
    width: 633px;
    background-color: #19181a;
    border-radius: 5px;
    margin: 0 auto;
    padding: 50px 40px;
    text-align: center;
    .title {
      font-size: 33px;
      color: #fff;
      margin-bottom: 60px;
    }
    .input-box {
      background-color: #36333c;
      height: 80px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      margin-bottom: 24px;
      .label {
        width: 32px;
        margin-right: 24px;
      }
      input {
        line-height: 48px;
        flex: 1;
        font-size: 24px;
        color: #fff;
      }
    }
    .btn {
      margin-top: 60px;
      height: 80px;
      background-color: #ffc102;
      border-radius: 5px;
      line-height: 80px;
      color: #000000;
      font-size: 29px;
      text-align: center;
    }
    .back {
      color: #d8d4df;
      font-size: 24px;
      margin-top: 30px;
      display: block;
    }
    .other {
      text-align: left;
      margin-top: 40px;
      span {
        color: #d7d4de;
        font-size: 24px;
        &:last-child {
          float: right;
        }
      }
    }
  }
}
</style>