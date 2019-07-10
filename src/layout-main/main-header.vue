<template>
  <div class="main-header">
    <span class="logo" />
    <div class="menu">
      <router-link to="/organization">Home</router-link>
      <router-link to="/organization/list" class="">Organization</router-link>
    </div>
    <div class="right-menu">
      Ethiereum Mainnet
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader'
}
</script>

<style scoped>

</style>
