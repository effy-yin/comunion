<template>
  <el-dialog
    title="Add Address"
    :visible.sync="show"
    width="40%"
    :before-close="handleClose()"
  >
    <el-form ref="form" :model="form">

      <el-form-item label="Select Currency">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Wallet Address">
        <el-input v-model="form.wallet" />
      </el-form-item>
      <el-form-item label="Usage">
        <el-input v-model="form.email" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="btn-main" round @click="show = false">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['visible'],
  data() {
    return {
      form: {
        id: '',
        name: 'BTH',
        wallet: '',
        usage: ''
      },
      show: false
    }
  },
  methods: {
    init(show) {
      this.show = show
    },
    handleClose() {
      console.log('1')
    }
  }

}
</script>

<style scoped>

</style>
