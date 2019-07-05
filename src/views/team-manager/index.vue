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

    <el-form ref="form" :model="form">
      <div class="card-wrapper">

        <el-card v-for="user in userList" :key="user.id" class="box-card">

          <div slot="header" class="clearfix">

            <el-button style="float: right; padding: 3px 0" type="text" @click="showDialog(user)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-edit" />
              </svg>
            </el-button>

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
              <div class="el-input fake">{{ user.wallet }}</div>
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

    <add-update-dialog ref="userDialog" :visible="isInEdit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddUpdateDialog from './add-update-dialog'

export default {
  components: { AddUpdateDialog },
  data() {
    return {
      userList: [{
        id: 1,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: '238dha87fhz9a09ildhahihhkzhe',
        socials: ''
      }, {
        id: 2,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: '238dha87fhz9a09ildhahihhkzhe',
        socials: ''
      }, {
        id: 3,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: '238dha87fhz9a09ildhahihhkzhe',
        socials: ''
      }, {
        id: 4,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: '238dha87fhz9a09ildhahihhkzhe',
        socials: ''
      }, {
        id: 5,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: '238dha87fhz9a09ildhahihhkzhe',
        socials: ''
      }, {
        id: 6,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: '238dha87fhz9a09ildhahihhkzhe',
        socials: ''
      }, {
        id: 7,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: '238dha87fhz9a09ildhahihhkzhe',
        socials: ''
      }],
      form: {
        name: 's'
      },
      query: '',
      isInEdit: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    showDialog(user) {
      this.isInEdit = true
      this.$refs.userDialog.init(user)
    },
    handleAddClick() {
      this.$router.push('/team-manager/profile')
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
  }

.box-card {
  color: #374059;
  width: 346px;
  margin-bottom: 30px;
  &.fake {
    visibility: hidden;
  }

}
</style>
