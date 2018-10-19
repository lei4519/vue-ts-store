<template>
  <div>
    <header class="header">
      <symbol id="icon-cart" viewBox="0 0 38 32">
        <title>cart</title>
        <path class="path1"
              d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
        <path class="path2"
              d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
        <path class="path3"
              d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        <path class="path4"
              d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      </symbol>
      <div class="navbar">
        <div class="navbar-left-container">
          <a href="/">
            <img class="navbar-brand-logo" src="/images/logo.png"></a>
        </div>
        <div class="navbar-right-container" style="display: flex;">
          <div class="navbar-menu-container">
            <!--<a href="/" class="navbar-link">我的账户</a>-->
            <span class="navbar-link" v-text="nickName" v-if="nickName"></span>
            <a href="javascript:void(0)" class="navbar-link" v-if="!nickName" @click="loginModelFlag = true">Login</a>
            <a href="javascript:void(0)" class="navbar-link" v-if="nickName" @click="logout">Logout</a>
            <div class="navbar-cart-container">
              <span class="navbar-cart-count"></span>
              <a class="navbar-link navbar-cart-link" href="/#/cart">
                <svg class="navbar-cart-logo">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <modal :mdShow="loginModelFlag" @closeModal="closeModal">
        <div class="md-title" slot="title">Login in</div>
        <div slot="message">
          <ul>
            <li class="regi_form_input">
              <i class="icon IconPeople"></i>
              <input type="text" tabindex="1" name="loginname" v-model="userName"
                     class="regi_login_input regi_login_input_left" placeholder="Userhahh Name"
                     data-type="loginname">
            </li>
            <li class="regi_form_input noMargin">
              <i class="icon IconPwd"></i>
              <input type="password" tabindex="2" name="password" v-model="userPwd"
                     class="regi_login_input regi_login_input_left login-input-no input_text"
                     placeholder="Password">
            </li>
          </ul>
          <div class="error-wrap">
            <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
          </div>
        </div>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn-login" @click="login()" tabindex="3">登 录</a>
        </div>
      </modal>
      <div class="logoutOverlay" v-if="logoutMsg">
        <div class="logoutMsg">退出成功</div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
  import '../assets/css/login.css'
  import { Vue, Component } from 'vue-property-decorator'
  import Modal from '../components/Modal'



  @Component({
    components: {
      Modal
    }
  })
  export default class NavHeader extends Vue {
    public userName: string = ''
    public userPwd: string = ''
    public nickName: string = ''
    public errorTip: boolean = false
    public logging: boolean = false
    public loginModelFlag: boolean = false
    public logoutMsg: boolean = false

    public async login() {
      if (!this.logging) {
        this.logging = true
        const res = (await this.axios.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        })).data
        if (res.status === '0') {
          this.userName = ''
          this.userPwd = ''
          this.errorTip = false
          this.loginModelFlag = false
          this.nickName = res.userName
        } else {
          this.errorTip = true
        }
        this.logging = false
      }
    }

    public async logout() {
      const result = await this.axios.post('/users/logout')
      if (result.data.status === '0') {
        this.nickName = ''
        this.logoutMsg = true
        setTimeout(() => {
          this.logoutMsg = false
        }, 1500)
      }
    }
    public async checkLogin() {
      const result = (await this.axios.get('/users/checkLogin')).data
      if (result.status === '0') {
        this.nickName = result.result.userName
      }
    }
    public mounted(): void {
      this.checkLogin()
    }

    public closeModal() {
      this.loginModelFlag = false
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    .error-wrap {
      text-align: center;
      .error-show {
        display: inline-block;
      }
    }
    .logoutOverlay {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 999;
      .logoutMsg {
        width: 100px;
        height: 40px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -60%);
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        line-height: 40px;
        border-radius: 10px;
        opacity: 0;
        animation: show2hide 1.5s linear;
      }
      @keyframes show2hide {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        15% {
          opacity: 1;
          transform: scale(1.2);
        }
        20% {
          opacity: 1;
          transform: scale(1);
        }
        80% {
          opacity: 1;
          transform: scale(1);
        }
        85% {
          opacity: 1;
          transform: scale(1.2);
        }
        100% {
          opacity: 0;
          transform: scale(0);
        }
      }
    }
  }
</style>
