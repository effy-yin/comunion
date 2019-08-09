<template>
  <div class="dashboard-container">
    <div class="dashboard-text" />

    <el-upload
      class="upload-demo"
      action="/comunion-api/a/upload"
      name="upload"
      multiple
      :limit="3"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleFileChange() {
      console.log(1)
    },
    handleFileRemove() {
      console.log(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
