<template>
  <el-dialog
    title="Edit Memberships"
    :visible.sync="visible"
    width="40%"
    :before-close="handleClose()"
  >
    <el-form ref="form" :model="form">

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

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="btn-main" round @click="visible = false">Save</el-button>
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
        name: '',
        wallet: '',
        email: '',
        role: '',
        description: '',
        socials: ''

      }
    }
  },
  methods: {
    init(user) {
      this.form.name = user.name
      this.form.wallet = user.wallet
      this.form.email = user.email
      this.form.role = user.role
      this.form.description = user.description
      this.form.socials = user.socials
    },
    handleClose() {
      console.log('1')
    }
  }

}
</script>

<style scoped>

</style>
