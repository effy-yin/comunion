<template>
  <div class="team-manager">
    <div class="search-row">
      <el-button class="btn-main" round @click="handleAddClick">
        Add Member
      </el-button>

      <el-input v-model="query" placeholder="Enter a member's email address or wallet address to search for members" class="input-with-select">
        <el-button slot="prepend" icon="el-icon-search" />
      </el-input>
    </div>

    <el-form v-if="orgForm.members.length > 0" ref="form">
      <div class="card-wrapper">

        <el-card v-for="user in orgForm.members" :key="user.id" class="box-card">

          <div slot="header" class="clearfix">

            <svg class="icon tool" aria-hidden="true" type="text" @click="showEditDialog(user)">
              <use xlink:href="#icon-edit" />
            </svg>
            <svg class="icon tool" aria-hidden="true" type="text" @click="handleDelete(user)">
              <use xlink:href="#icon-delete" />
            </svg>

            <div class="section-user-info">
              <div class="user-avatar"><img src="~@/assets/avatar.png" alt=""></div>
              <div class="user-meta">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-title">{{ user.title }}</div>
              </div>
            </div>
            <div class="tag-row">
              <el-tag type="success">UI</el-tag>
              <el-tag type="success">UI</el-tag>
              <el-tag type="success">UI</el-tag>
            </div>

          </div>
          <div>
            <el-form-item label="E-Mail">
              <div class="el-input fake">{{ user.email }}</div>
            </el-form-item>
            <el-form-item label="Wallet Address">
              <div class="el-input fake">{{ user&&user.wallet&&user.wallet.address?user.wallet.address:'' }}</div>
            </el-form-item>
            <div class="socials el-input fake">
              <ul>
                <li><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-twitter" />
                </svg></li>
                <li><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-instagram" />
                </svg></li>
                <li><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-facebook" />
                </svg></li>
                <li><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-youtube" />
                </svg></li>
              </ul>
            </div>
          </div>
        </el-card>
        <el-card class="box-card fake" />
        <el-card class="box-card fake" />
      </div>

    </el-form>

    <div class="no-member">
      Click Add Menber to add members
    </div>

    <add-update-dialog ref="editDialog" :user="curUser" :visible="isDialogEditVisible" />

    <el-dialog
      ref="addDialog"
      title="Add Members"
      :visible.sync="isDialogAddVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div>
        <el-input
          v-model="searchEmail"
          class="search-email-input"
          placeholder="Enter a member's email address"
          prefix-icon="el-icon-search"
        /><el-button type="primary btn-main" round @click="handleUserSearch">Search</el-button>
      </div>

      <!--      <span slot="footer" class="dialog-footer">-->
      <!--        <el-button type="primary btn-main" round @click="handleUserSearch">Search</el-button>-->
      <!--      </span>-->

      <div v-show="isUserExist" class="search-result">
        <el-form ref="form" :model="searchUser">
          <el-card class="box-card">

            <div slot="header" class="clearfix">

              <div class="section-user-info">
                <div class="user-avatar"><img src="~@/assets/avatar.png" alt=""></div>
                <div class="user-meta">
                  <div class="user-name">{{ searchUser&&searchUser.name?searchUser.name :'' }}</div>
                  <div class="user-title">{{ searchUser&&searchUser.title?searchUser.title:'' }}</div>
                </div>
              </div>
              <div class="tag-row">
                <el-tag type="success">UI</el-tag>
                <el-tag type="success">UI</el-tag>
                <el-tag type="success">UI</el-tag>
              </div>

            </div>
            <div>
              <el-form-item label="E-Mail">
                <div class="el-input fake">{{ searchUser&& searchUser.email?searchUser.email:'' }}</div>
              </el-form-item>
              <el-form-item label="Wallet Address">
                <div class="el-input fake">{{ searchUser&&searchUser.address?searchUser.address:'' }}</div>
              </el-form-item>
              <div class="socials el-input fake">
                <ul>
                  <li><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-twitter" />
                  </svg></li>
                  <li><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-instagram" />
                  </svg></li>
                  <li><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-facebook" />
                  </svg></li>
                  <li><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youtube" />
                  </svg></li>
                </ul>
              </div>
            </div>
          </el-card>
        </el-form>
        <el-button type="primary btn-main" round @click="handleAddMember">Add</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrgInfo, updateOrgInfo, checkOrgEmail } from '@/api/organization'
import { getUserInfoByEmail } from '@/api/user'
import { mapGetters } from 'vuex'
import AddUpdateDialog from './dialog-update'

export default {
  components: { AddUpdateDialog },
  data() {
    return {
      // userList: [],
      query: '',
      isDialogEditVisible: false,
      isDialogAddVisible: false,
      searchEmail: '',
      searchUser: null,
      isUserExist: false,
      curUser: null
    }
  },
  computed: {
    ...mapGetters([
      'orgForm'
    ])
  },
  created() {
    this.getOrgInfo()
  },
  methods: {
    getOrgInfo() {
      const id = this.$route.query.id
      if (id) {
        this.$store.dispatch('organization/getOrgInfo', id)
      } else {
        if (!this.orgForm._id) {
          this.$notify({
            message: 'Please select an organization to continue!',
            type: 'warning'
          })
        }
      }
    },
    handleUserSearch() {
      // this.isDialogAddVisible = false
      getUserInfoByEmail(this.searchEmail).then(res => {
        console.log(res)
        if (res.entity) {
          this.isUserExist = true
          this.searchUser = res.entity
        } else {
          this.isUserExist = false
        }
      })
    },
    handleAddMember() {
      this.$store.dispatch('organization/addOrgMember', this.searchUser).then(res=>{
        console.log(res)
        if (res === 'success') {
          this.isDialogAddVisible = false
        } else {
          this.$notify({
            message: res,
            type: 'warning'
          })
        }
      })

    },
    showEditDialog(user) {
      this.isDialogEditVisible = true
      this.$refs.editDialog.init(user)
    },
    handleDelete(user) {
      alert('de')
    },
    handleAddClick() {
      // this.$router.push('/team-manager/profile')
      this.isDialogAddVisible = true
    },
    handleClose() {
      this.isDialogAddVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .team-manager {
    padding: 30px;
    .search-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .input-with-select {
        width: 40%;
      }
    }
    .card-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .search-email-input {
      width: 74%;
      margin-right: 20px;
    }

    .no-member {
      text-align: center;
      color: #45588C;
      margin-top: calc(20%);
    }
    .icon.tool {
      float: right; padding: 3px 0;
      cursor: pointer;
    }
    .box-card {
      color: #374059;
      width: 346px;
      margin-bottom: 30px;
      &.fake {
        visibility: hidden;
      }
    }

    .search-result {
      margin-top: 20px;
      .box-card {
        margin: 0 auto
      }
      .btn-main {
        position: relative;
        left: calc(50% - 26px);
        margin-top: 20px;
      }
    }
  }

</style>
