<template>
  <div class="organization-list">
    <main-header />

    <div class="card-wrapper main-content">
      <el-card v-for="org in userList" :key="org.id" class="box-card">
        <div slot="header" class="clearfix">
          <div class="section-org-info">
            <div class="org-avatar"><img src="~@/assets/avatar.png" alt=""></div>
            <div class="org-name">{{ org.name }}</div>
          </div>
        </div>
        <div class="org-desc">{{ org.wallet }}</div>
      </el-card>
      <el-card class="box-card fake" />
      <el-card class="box-card fake" />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/layout-main/main-header'
import { mapGetters } from 'vuex'

export default {
  components: {
    MainHeader
  },
  data() {
    return {
      userList: [{
        id: 1,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: 'Comunion is a decentralized autonomous organization collaboation network, helps companies, organization and individuals all around the world to create, manage and operate their own decentralized autonomous organization (The DAO).',
        socials: ''
      }, {
        id: 2,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: 'Comunion is a decentralized autonomous organization collaboation network, helps companies, organization and individuals all around the world to create, manage and operate their own decentralized autonomous organization (The DAO).',
        socials: ''
      }, {
        id: 3,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: 'Comunion is a decentralized autonomous organization collaboation network, helps companies, organization and individuals all around the world to create, manage and operate their own decentralized autonomous organization (The DAO).',
        socials: ''
      }, {
        id: 4,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: 'Comunion is a decentralized autonomous organization collaboation network, helps companies, organization and individuals all around the world to create, manage and operate their own decentralized autonomous organization (The DAO).',
        socials: ''
      }, {
        id: 5,
        name: 'Robert Caroll',
        title: 'UI Designer',
        tags: 'UI,Web UX,UE,iOS',
        email: 'effy@gmail.com',
        wallet: 'Comunion is a decentralized autonomous organization collaboation network, helps companies, organization and individuals all around the world to create, manage and operate their own decentralized autonomous organization (The DAO).',
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
      isInEdit: false,
      isDialogAddVisible: false,
      searchEmail: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .organization-list {
    .main-content {
      padding: 0 40px;
    }
    .card-wrapper {
      padding-top: 116px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .box-card {
        color: #374059;
        width: 364px;
        margin: 0 10px 30px 0;
        &.fake {
          visibility: hidden;
        }

        .section-org-info {
          text-align: center;
        }
        .org-avatar img{
          width: 58px;
          height: 58px;
          border-radius: 50%;
        }
        .org-desc {
          color: rgba(55, 64, 89, 0.7);
        }
      }
    }
  }

</style>
