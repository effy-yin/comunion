<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="logo">
      <img src="~@/assets/logo.png" alt="">
    </div>
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!--          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <img v-if="token" src="~@/assets/avatar.png?imageView2/1/w/80/h/80" class="user-avatar">
          <img v-else src="~@/assets/avatar-default.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <template v-if="!token">
            <el-dropdown-item @click.native="isDialogVisible=true;curType='login'">
              Please Log in First
            </el-dropdown-item>
            <el-dropdown-item @click.native="isDialogVisible=true;curType='register'">
              Register
            </el-dropdown-item>
          </template>
          <template v-else>
            <router-link to="/dao/profile">
              <el-dropdown-item>
                Profile
              </el-dropdown-item>
            </router-link>

            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">Log Out</span>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <router-link to="/home">
      <el-button class="btn-main new-dao-btn" round>
        New Dao
      </el-button>
    </router-link>

    <el-dialog
      :title="type[curType]"
      :visible.sync="isDialogVisible"
      width="500px"
    >
      <el-form v-show="curType==='login'" ref="loginForm" :model="loginForm">
        <el-form-item label="Email">
          <el-input v-model="loginForm.email" placeholder="Please input your email" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginForm.password" type="password" placeholder="Please input your password" />
        </el-form-item>
      </el-form>

      <el-form v-show="curType==='register'||curType==='reset'" ref="registerForm" :model="registerForm">
        <el-form-item label="Email">
          <el-input v-model="registerForm.email" placeholder="Please input your email" />
        </el-form-item>
        <el-form-item label="code" class="code">

          <el-input v-model="registerForm.code" placeholder="Please input verification code" />
          <el-button type="primary btn-main" round @click="handleSendCode">Send Verificatiob Code</el-button>

        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="registerForm.password" type="password" placeholder="Please input your password" />
        </el-form-item>
      </el-form>

      <div v-show="curType==='login'" slot="footer" class="dialog-footer">
        <span @click="curType='reset'">forget password</span>
        <el-button type="primary btn-main" round @click="handleLogin">Log in</el-button>
      </div>
      <div v-show="curType==='register'" slot="footer" class="dialog-footer">
        <el-button type="primary btn-main" round @click="handleLogin">Register</el-button>
      </div>
      <div v-show="curType==='reset'" slot="footer" class="dialog-footer">
        <el-button type="primary btn-main" round @click="handleLogin">Reset Password</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { userRegister, sendVeriCode } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        email: '',
        code: '',
        password: '',
        afterSave: 'sendPsdEmail'
      },
      // resetForm: {
      //   email: '',
      //   code: '',
      //   password: '',
      //   afterSave: 'sendPsdEmail'
      // },
      isDialogVisible: false,
      type: {
        login: 'Please Login',
        register: 'Please Register',
        reset: 'Reset Password'
      },
      curType: 'login'
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'sidebar',
      'userInfo'
    ])
  },
  created() {
    if (!this.userInfo._id) {
      if (this.token) {
        this.$store.dispatch('user/getInfo')
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleLogin() {
      console.log(1, this.loginForm)
      this.$store.dispatch('user/login', this.loginForm).then(data => {
        console.log(data)
        if (data === 'success') {
          this.logInDialogVisible = false
        } else {
          this.$notify({
            message: data,
            type: 'warning'
          })
        }
      })
    },
    handleRegister() {
      userRegister(this.registerForm).then(res => {
        if (!res.err && res.entities) {
          console.log(44, res)
          this.orgList = res.entities
        }
      })
    },
    handleSendCode() {
      sendVeriCode({ email: this.registerForm.email }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
.navbar {
  height: 80px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding-top: 20px;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .logo {
    float: left;
    position: relative;
    top: 10px;
    margin: 0 20px;
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .new-dao-btn {
    float: right;
    margin: 4px 20px 0 0;
  }
  .dialog-footer {
    height: 40px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .code {
    .el-form-item__label {
      float: none;
    }
    .el-input {
      width: 254px;
    }
  }
}
</style>
