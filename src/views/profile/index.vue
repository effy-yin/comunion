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
    <el-form ref="form" :model="form">
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
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="User Name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="email">
            <div class="el-input fake">{{ form.email }}</div>
          </el-form-item>

          <el-form-item label="Social Media">
            <el-input v-model="form.socials" />
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

          <div class="section-user-info">
            <svg class="icon" aria-hidden="true" @click="handleEditAddress">
              <use xlink:href="#icon-edit" />
            </svg>
            <div class="user-avatar"><img src="~@/assets/btc.png" alt=""></div>
            <div class="user-meta">
              <div class="user-name">0.00 BTC</div>
              <div class="user-title">0xjdiaheooadjiohsdioahsdioahdiohds}</div>
            </div>
          </div>
          <div class="section-user-info">
            <svg class="icon" aria-hidden="true" @click="handleEditAddress">
              <use xlink:href="#icon-edit" />
            </svg>
            <div class="user-avatar"><img src="~@/assets/eth.png" alt=""></div>
            <div class="user-meta">
              <div class="user-name">0.00 ETH</div>
              <div class="user-title">0xjdiaheooadjiohsdioahsdioahdiohds}</div>
            </div>
          </div>
        </div>
      </div>
    </el-form>

    <dialog-add-address ref="dialogWallet" />
  </div>
</template>

<script>
import DialogAddAddress from './dialog-add-update-address'
export default {
  name: 'Profile',
  components: {
    DialogAddAddress
  },
  data() {
    return {
      form: {
        name: 'doddoroy',
        email: 'dodo@gmail.com',
        tags: 'UI,designer',
        socials: 'facebook,twitter',
        wallet: [{
          name: 'BTC',
          address: 'sdf',
          usage: '34'
        }, {
          name: 'ETH',
          address: 'sddf',
          usage: '1134'
        }]
      },
      curTab: 'account',
      visible: false,
      isInEdit: false
    }
  },
  methods: {
    handleAddAddress() {
      console.log('add')
      this.$refs.dialogWallet.init(true, true, null)
    },
    handleEditAddress() {
      console.log('edit')
      this.$refs.dialogWallet.init(true, false, this.form.wallet[0])
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
      .icon {
        position: absolute;
        top: 30px;
        right: 10px;
        cursor: pointer;
      }
    }
  }
</style>
