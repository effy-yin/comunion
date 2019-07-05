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
    <el-form ref="form" :model="form" label-width="80px">
      <div v-show="curTab==='account'" class="section-card">
        <div class="card-title">Personal Information</div>
        <div class="card-content">
          <el-form-item label="Profile Photo">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Wallet Address">
            <el-input v-model="form.wallet" />
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="role">
            <el-input v-model="form.role" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.description" />
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
            <svg class="icon" aria-hidden="true" @click="handleAddAddress">
              <use xlink:href="#icon-edit" />
            </svg>
            <div class="user-avatar"><img src="~@/assets/btc.png" alt=""></div>
            <div class="user-meta">
              <div class="user-name">0.00 BTC</div>
              <div class="user-title">0xjdiaheooadjiohsdioahsdioahdiohds}</div>
            </div>
          </div>
          <div class="section-user-info">
            <svg class="icon" aria-hidden="true" @click="handleAddAddress">
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

    <dialog-add-address ref="dialog" />
  </div>
</template>

<script>
import DialogAddAddress from './dialog-add-address'
export default {
  name: 'Profile',
  components: {
    DialogAddAddress
  },
  data() {
    return {
      form: {

      },
      curTab: 'account',
      visible: false
    }
  },
  methods: {
    handleAddAddress() {
      this.$refs.dialog.init(true)
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
