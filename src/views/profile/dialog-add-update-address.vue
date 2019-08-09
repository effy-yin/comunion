<template>
  <el-dialog
    :title="add?'Add Address':'Edit Address'"
    :visible.sync="show"
    width="40%"
    :before-close="handleClose"
  >
    <el-form ref="walletForm" :model="form">
      <el-form-item label="Select Currency">
        <div class="el-input fake">
          <div :class="['currency',form.name==='btc'? 'cur':'']" @click="form.name='btc'">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-btc" />
            </svg>
            <span>BTC</span>
          </div>
          <div :class="['currency',form.name==='eth'? 'cur':'']" @click="form.name='eth'">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-eth" />
            </svg>
            <span>ETH</span>
          </div>
        </div>

      </el-form-item>
      <el-form-item label="Wallet Address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="Usage">
        <el-input v-model="form.usage" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="btn-main" round @click="handleSave">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      add: true,
      form: {
        name: '',
        address: '',
        usage: ''
      },
      show: false
    }
  },
  methods: {
    init(show, add, wallet) {
      this.show = show
      this.add = add
      if (wallet) {
        console.log('wallet', wallet)
        this.form.name = wallet.name
        this.form.address = wallet.address
        this.form.usage = wallet.usage
      } else {
        console.log(this.$refs.form)
        // this.$refs.walletForm.resetFields()
        this.form.name = ''
        this.form.address = ''
        this.form.usage = ''
      }
    },
    handleClose() {
      this.show = false
    },
    handleSave() {
      this.$emit('save-wallet', this.form)
      this.show = false
    }
  }

}
</script>

<style lang="scss" scoped>
.currency {
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid rgba(55, 64, 89, 0.2);
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
  &.cur {
    border: 1px solid #45588C;
  }
  .icon {
    position: relative;
    top:6px;
    margin-right: 6px
  }
}
</style>
