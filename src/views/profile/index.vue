<template>
  <div class="profile">
    <div class="tab-row">
      <span class="title">Profile</span>
      <el-button :class="['btn-tag',curTab==='account'?'':'disable']" plain round @click="curTab='account'">
        Account
      </el-button>
      <el-button :class="['btn-tag',curTab==='wallet'?'':'disable']" plain round @click="curTab='wallet'">
        Wallet
      </el-button>
    </div>
    <el-form ref="form" :model="userInfo">
      <div v-show="curTab==='account'" class="section-card">
        <div class="card-tool">
          <svg v-if="!isInEdit" class="icon" aria-hidden="true" @click="isInEdit=true">
            <use xlink:href="#icon-edit" />
          </svg>
          <svg v-else class="icon" aria-hidden="true" @click="isInEdit=false">
            <use xlink:href="#icon-check" />
          </svg>
        </div>
        <div class="card-title">Personal Information</div>
        <div class="card-content">
          <el-form-item label="Profile Photo">
            <div class="user-avatar"><img src="~@/assets/avatar.png" alt=""></div>
          </el-form-item>
          <el-form-item label="User Name">
            <div v-if="!isInEdit" class="el-input fake">{{ userInfo.name }}</div>
            <el-input v-else v-model="userInfo.name" />
          </el-form-item>
          <el-form-item label="email">
            <div v-if="!isInEdit" class="el-input fake">{{ userInfo.email }}</div>
            <el-input v-else v-model="userInfo.email" />
          </el-form-item>

          <el-form-item label="Social Media">
            <el-input v-for="(social,index) in userInfo.social" :key="social" v-model="social.value" placeholder="input address" class="input-with-select">
              <el-select slot="prepend" v-model="social.name" placeholder="select">
                <el-option v-for="item in socialList" :key="item" :label="item" :value="item" />
              </el-select>
              <el-button slot="append" icon="el-icon-delete" @click="removeSocial(index)" />
            </el-input>
            <span class="add-media" @click="addSocial">+ add</span>
          </el-form-item>
        </div>
      </div>

      <div v-show="curTab==='wallet'" class="section-card">
        <div class="card-title">Total Balance</div>
        <div class="card-content">
          <div class="wallet-card-title">
            <div class="ratio">0.00 BTC = $ 0.00</div>
            <el-button class="btn-main" round @click="handleAddAddress">
              Add Address
            </el-button>
          </div>

          <div v-if="userInfo.wallet">
            <div v-for="wallet in userInfo.wallet" :key="wallet.name" class="section-user-info">
              <svg class="icon icon-edit" aria-hidden="true" @click="handleEditAddress(wallet)">
                <use xlink:href="#icon-edit" />
              </svg>
              <div class="user-avatar">
                <svg class="icon wallet" aria-hidden="true">
                  <use :xlink:href="'#icon-'+wallet.name" />
                </svg>
              </div>
              <div class="user-meta">
                <div class="user-name">0.00 {{ wallet.name.toUpperCase() }}<span class="usage">{{ wallet.usage }}</span></div>
                <div class="user-title">{{ wallet.address }}
                  <el-button class="btn-tag" plain round>view</el-button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </el-form>

    <dialog-add-address ref="dialogWallet" @save-wallet="handleSaveWallet" />
  </div>
</template>

<script>
import DialogAddAddress from './dialog-add-update-address'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    DialogAddAddress
  },
  data() {
    return {
      // form: {
      //   name: 'doddoroy',
      //   email: 'dodo@gmail.com',
      //   tags: 'UI,designer',
      //   socials: 'facebook,twitter',
      //   wallet: [{
      //     name: 'BTC',
      //     address: 'sdf',
      //     usage: '34'
      //   }, {
      //     name: 'ETH',
      //     address: 'sddf',
      //     usage: '1134'
      //   }]
      // },
      socialList: ['twitter', 'facebook', 'linkedin', 'instagram'],
      curTab: 'account',
      visible: false,
      isInEdit: false,
      isNew: true
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    if (!this.userInfo._id) {
      this.$store.dispatch('user/getInfo')
    }
  },
  methods: {
    handleAddAddress() {
      console.log('add')
      this.$refs.dialogWallet.init(true, true, null)
    },
    handleEditAddress(wallet) {
      console.log('edit')
      this.$refs.dialogWallet.init(true, false, wallet)
    },
    handleSaveWallet(newWallet) {
      let wallet = []
      if (this.userInfo.wallet) {
        wallet = [...this.userInfo.wallet, newWallet]
      } else {
        wallet = [newWallet]
      }
      console.log(1, wallet)
      this.$store.dispatch('user/update', { wallet: wallet })
    },
    addSocial() {
      console.log(this.userInfo)
      this.userInfo.social.push({
        name: '',
        value: ''
      })
    },
    removeSocial(index) {
      console.log(this.userInfo.social)
      this.userInfo.social.splice(index, 1)
      console.log(this.userInfo.social)
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    padding: 30px;
    .tab-row {
      margin-bottom: 20px;
      .title {
        display: inline-block;
        font-size: 24px;
        font-weight: 500;
        position: relative;
        top: 6px;
        margin-right: 30px;
      }
    }
    .wallet-card-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .ratio {
        font-size: 24px;
        font-weight: 500;
      }
    }
    .section-user-info {
      position: relative;
      padding: 30px 0;
      border-top: 1px solid rgba(55, 64, 89, 0.1);
      .icon-edit {
        position: absolute;
        top: 30px;
        right: 10px;
        cursor: pointer;
      }
      .user-avatar {
        margin-bottom: 20px;
        .icon.wallet {
          width: 4em;
          height: 4em;
        }
      }
      .usage {
        position: relative;
        left: 8px;
        font-size: 16px;
        color: rgba(55, 64, 89, 0.5);
      }
    }
  }
</style>
