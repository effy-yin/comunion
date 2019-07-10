<template>
  <el-dialog
    :title="add?'Add Address':'Edit Address'"
    :visible.sync="show"
    width="40%"
    :before-close="handleClose"
  >
    <el-form ref="walletForm" :model="form">

      <el-form-item label="Select Currency">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Wallet Address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="Usage">
        <el-input v-model="form.usage" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="btn-main" round @click="show = false">Save</el-button>
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
    }
  }

}
</script>

<style scoped>

</style>
