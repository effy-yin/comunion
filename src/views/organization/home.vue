<template>
  <div class="inner-content">
    <div class="welcome"></div>
    <div class="intro">Comunion is a decentralized autonomous organization collaboation network, helps companies, organization and individuals all around the world to create, manage and operate their own decentralized autonomous organization (The DAO).
      <a href="https://comunion.io/" target="_blank" class="blue learn-more">Learn more about comunion</a></div>
    <div class="tip">You can create a new decentralized organization.</div>
    <router-link to="/organization/create">
      <el-button class="btn-main btn-wide" round>Create a  new  decentralized organization</el-button>
    </router-link>
    <div class="tip"><a href="https://bbs.comunion.io/" target="_blank">How to create</a></div>

    <div class="tip bold">Or open an exiisting organation</div>

    <el-form ref="form" :model="form">
      <el-form-item label="" label-width="0">
        <el-input v-model="form.name" placeholder="Organization name" />
      </el-form-item>
      <el-button class="btn-grey btn-wide" round>Open</el-button>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'HowTo',
  data() {
    return {
      form: {
        name: ''
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.inner-content {
  .welcome {
    width: 100%;
    height: 160px;
    background-image: url(~@/assets/welcome.png);
    background-size: cover;
  }
  .learn-more {
    text-decoration: underline;
  }
  .intro {
    margin-top: 38px;
  }
  .blue {
    color: #7B88FF;
  }
  .tip.bold {
    color: rgba(55, 64, 89, 0.85);
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
