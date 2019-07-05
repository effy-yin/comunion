<template>
  <div class="dao-info-container">
    <!--    <div class="dashboard-text">name: {{ name }}</div>-->
    <el-form ref="form" :model="form">

      <div class="section-card">
        <div class="card-title">Organization Info</div>
        <div class="card-content">
          <el-form-item label="Name">
            <div class="el-input fake">{{ form.name }}</div>
          </el-form-item>
          <el-form-item label="Type">
            <div class="el-input fake">{{ form.type }}</div>
          </el-form-item>
          <el-form-item label="Net">
            <div class="el-input fake">{{ form.net }}</div>
          </el-form-item>
          <el-form-item label="Contract">
            <div class="el-input fake">
              <el-button class="btn-link" plain round>
                {{ form.contract }}
              </el-button>
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="section-card">
        <div class="card-tool">
          <svg v-if="!isAboutInEdit" class="icon" aria-hidden="true" @click="isAboutInEdit=true">
            <use xlink:href="#icon-edit" />
          </svg>
          <svg v-else class="icon" aria-hidden="true" @click="isAboutInEdit=false">
            <use xlink:href="#icon-vote" />
          </svg>
        </div>
        <div class="card-title">About</div>
        <div class="card-content">
          <el-form-item label="Mission">
            <div v-if="!isAboutInEdit" class="el-input fake">{{ form.mission }}</div>
            <el-input v-else v-model="form.mission" />
          </el-form-item>
          <el-form-item label="Desccription">
            <div v-if="!isAboutInEdit" class="el-input fake textarea">{{ form.description }}</div>
            <el-input v-else v-model="form.description" type="textarea" maxlength="100" />
          </el-form-item>

        </div>
      </div>

      <div class="section-card">
        <div class="card-tool">
          <svg v-if="!isContactInEdit" class="icon" aria-hidden="true" @click="isContactInEdit=true">
            <use xlink:href="#icon-edit" />
          </svg>
          <svg v-else class="icon" aria-hidden="true" @click="isContactInEdit=false">
            <use xlink:href="#icon-vote" />
          </svg>
        </div>
        <div class="card-title">Contact</div>
        <div class="card-content">
          <el-form-item label="Office Website">
            <div v-if="!isContactInEdit" class="el-input fake">{{ form.website }}</div>
            <el-input v-else v-model="form.website" />
          </el-form-item>
          <el-form-item label="Social Media">
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
          </el-form-item>

        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        name: 'dao',
        type: 'Design Organization',
        net: 'Ethereum Mainnet',
        contract: '8x81hc0ehdhafnkfa9i003rhiaoi2jsdafdjj2irhr',
        mission: 'A credible design organization that makes easy-to-use digital design for everyone',
        description: 'The primary domain is the domain name for the user to access (also understood as a domain name with dynamic content) such as www.yourdomain.com, blog.yourdomain.com, and so on.',
        website: 'Comunion.io',
        socials: 'twitter,facebook,youtube,instagram'
      },
      isAboutInEdit: false,
      isContactInEdit: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
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
