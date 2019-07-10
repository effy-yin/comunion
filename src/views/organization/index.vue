<template>
  <div class="login-container">
    <main-header />

    <div class="sidebar-right">
      comunion
    </div>

    <div class="main-content">r

      <div class="inner-content">
        <div class="welcome"><img src="~@/assets/welcome.png" alt=""></div>
        <div class="intro">Comunion is a decentralized autonomous organization collaboation network, helps companies, organization and individuals all around the world to create, manage and operate their own decentralized autonomous organization (The DAO).</div>
        <div class="tip">You can create a new decentralized organization.</div>
        <el-button class="btn-main" round>Create a  new  decentralized organization</el-button>
        <div class="tip">How to create</div>
      </div>

      <div class="inner-content">
        <div class="section-card">
          <div class="card-title">Claim organization name</div>
          <div class="card-content">
            <el-form ref="form" :model="form">

              <el-form-item label="Profile Photo">
                <el-input v-model="form.name" placeholder="Organization name" />
              </el-form-item>

              <div class="tip">Please input your organization name</div>
              <el-button class="btn-main" round>Next</el-button>
            </el-form>
          </div>
        </div>
      </div>

      <div class="inner-content">
        <div class="section-card">
          <div class="card-title">Fill in information</div>
          <div class="card-content">
            <el-form ref="form" :model="form">

              <el-form-item label="Operation net">
                <el-input v-model="form.name" placeholder="Ethereum Mainnet" />
              </el-form-item>
              <el-form-item label="Organization type">
                <el-input v-model="form.name" placeholder="Organization name" />
              </el-form-item>
              <el-form-item label="Organization Logo">
                <el-input v-model="form.name" placeholder="Organization name" />
              </el-form-item>

              <div class="tip">Please input your organization name</div>
              <el-button class="btn-main" round>Next</el-button>
            </el-form>
          </div>
        </div>
      </div>

      <div class="inner-content">
        <div class="section-card">
          <!--          <div class="card-title">Fill in information</div>-->
          <div class="card-content">
            <el-form ref="form" :model="form">

              <el-form-item label="Office website">
                <el-input v-model="form.name" placeholder="Ethereum Mainnet" />
              </el-form-item>
              <el-form-item label="Organization mission">
                <el-input v-model="form.name" placeholder="Organization mission " />
              </el-form-item>
              <el-form-item label="Organization Vision">
                <el-input v-model="form.name" placeholder="Organization vision " />
              </el-form-item>
              <el-form-item label="Organization Description">
                <el-input v-model="form.name" placeholder="Organization vision " />
              </el-form-item>
              <el-form-item label="Social Media">
                <el-input v-model="form.name" placeholder="Organization vision " />
              </el-form-item>

              <el-button class="btn-main" round>Next</el-button>
            </el-form>
          </div>
        </div>
      </div>

      <div class="inner-content">
        <div class="section-card">
          <div class="card-title">Your information</div>
          <div class="card-content">
            <el-form ref="form" :model="form">

              <el-form-item label="Your Email">
                <el-input v-model="form.name" placeholder="" />
              </el-form-item>

              <div class="tip">-You can continute to  your profile affter completing the creation.</div>
              <el-button class="btn-main" round>Next</el-button>
            </el-form>
          </div>
        </div>
      </div>

      <div class="inner-content">
        <div class="section-card">
          <div class="card-title">Sign the transaction </div>
          <div class="tip">At last, you should sign the transaction to register your organization.</div>
          <div class="card-content">
            <el-form ref="form" :model="form">

              <!--              <el-form-item label="Your Email">-->
              <!--                <el-input v-model="form.name" placeholder=""/>-->
              <!--              </el-form-item>-->

              <!--              <div class="tip">-You can continute to  your profile affter completing the creation.</div>-->
              <!--              <el-button class="btn-main" round>Next</el-button>-->
            </el-form>
          </div>
        </div>
      </div>

      <div class="inner-content">
        <div class="success"><img src="" alt=""></div>
        <div>Congratulations!</div>
        <div class="">You have created a decentralized organization.</div>
        <el-button class="btn-main" round>Get Start</el-button>
      </div>

    </div>

  </div>

</template>

<script>
import mainHeader from '@/layout-main/main-header'
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  components: { mainHeader },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      form: {
        name: ''
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      // color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container .login-form{
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        //color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      //color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        //color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

  }
</style>
