<template>
  <el-dialog
    class="edit-user-dialog"
    title="Edit Memberships"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose()"
  >
    <el-form ref="form">

      <el-form-item label="Profile Photo">
        <div class="user-avatar"><img src="~@/assets/avatar.png" alt=""></div>
      </el-form-item>
      <el-form-item label="Email">
        <div class="el-input fake">{{ user?user.email:'' }}</div>
      </el-form-item>
      <el-form-item label="Wallet Address">
        <div v-for="wallet in user.wallet" :key="wallet.name" class="el-input fake">
          {{ wallet.name?wallet.name.toUpperCase():'' }}  {{ wallet.value }}
        </div>
      </el-form-item>

      <el-form-item label="Social Media">
        <el-input v-model="user.social" />
      </el-form-item>

      <el-form-item label="Role">
        <el-input v-model="user.role" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="user.description" type="textarea" />
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="btn-main" round @click="handleUserSave">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    'visible': Boolean
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        wallet: '',
        socials: '',
        role: '',
        description: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    init(user) {
      console.log(user, 33)

      this.dialogVisible = this.visible
      this.user = user
    },
    handleClose() {
      console.log('1')
    },
    handleUserSave() {
      this.dialogVisible = false
    }
  }

}
</script>

<style lang="scss">
.edit-user-dialog {
  .user-avatar {
    margin-bottom: 20px;
  }
}
</style>
