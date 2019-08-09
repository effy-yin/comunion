<template>
  <div class="dao-info-container">
    <!--    <div class="dashboard-text">name: {{ name }}</div>-->
    <el-form ref="orgForm" :model="orgForm">

      <div class="section-card">
        <div class="card-title">Organization Info</div>
        <div class="card-content">
          <el-form-item label="Name">
            <div class="el-input fake">{{ orgForm.name }}</div>
          </el-form-item>
          <el-form-item label="Type">
            <div class="el-input fake">{{ orgForm.type }}</div>
          </el-form-item>
          <el-form-item label="Net">
            <div class="el-input fake">Ethereum Mainnet</div>
          </el-form-item>
          <el-form-item label="Contract">
            <div class="el-input fake">
              <el-button class="btn-link" plain round>
                <svg class="icon" aria-hidden="true" style="width:1em;height:1em">
                  <use xlink:href="#icon-link" />
                </svg>
                {{ orgForm.wallet?(orgForm.wallet[0]?orgForm.wallet[0].value:''):'' }}
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
          <svg v-else class="icon" aria-hidden="true" @click="handleUpdate('about')">
            <use xlink:href="#icon-check" />
          </svg>
        </div>
        <div class="card-title">About</div>
        <div class="card-content">
          <el-form-item label="Mission">
            <div v-if="!isAboutInEdit" class="el-input fake">{{ orgForm.mission }}</div>
            <el-input v-else v-model="orgForm.mission" />
          </el-form-item>
          <el-form-item label="Desccription">
            <div v-if="!isAboutInEdit" class="el-input fake textarea">{{ orgForm.description }}</div>
            <el-input v-else v-model="orgForm.description" type="textarea" maxlength="100" />
          </el-form-item>

        </div>
      </div>

      <div class="section-card">
        <div class="card-tool">
          <svg v-if="!isContactInEdit" class="icon" aria-hidden="true" @click="isContactInEdit=true">
            <use xlink:href="#icon-edit" />
          </svg>
          <svg v-else class="icon" aria-hidden="true" @click="handleUpdate('contact')">
            <use xlink:href="#icon-check" />
          </svg>
        </div>
        <div class="card-title">Contact</div>
        <div class="card-content">
          <el-form-item label="Office Website">
            <div v-if="!isContactInEdit" class="el-input fake">
              <el-button class="btn-link" plain round>
                <svg class="icon" aria-hidden="true" style="width:1em;height:1em">
                  <use xlink:href="#icon-link" />
                </svg>
                {{ orgForm.website }}
              </el-button>
            </div>
            <el-input v-else v-model="orgForm.website" />
          </el-form-item>
          <el-form-item label="Social Media">
            <div class="socials el-input fake">
              <ul>
                <li v-for="(social,index) in orgForm.social" :key="social.name">
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="'#icon-'+social.name" />
                  </svg>
                  <svg v-show="isContactInEdit" class="icon remove" aria-hidden="true" @click="removeSocial(index)">
                    <use xlink:href="#icon-remove" />
                  </svg>
                </li>
                <!-- <li><svg class="icon" aria-hidden="true">
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
                </svg></li> -->
                <li v-show="isContactInEdit"><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-add" />
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
import { getOrgInfo, updateOrgInfo } from '@/api/organization'

export default {
  name: 'Dashboard',
  data() {
    return {
      // orgForm: {
      // name: 'dao',
      // type: 'Design Organization',
      // net: 'Ethereum Mainnet',
      // contract: '8x81hc0ehdhafnkfa9i003rhiaoi2jsdafdjj2irhr',
      // mission: 'A credible design organization that makes easy-to-use digital design for everyone',
      // description: 'The primary domain is the domain name for the user to access (also understood as a domain name with dynamic content) such as www.yourdomain.com, blog.yourdomain.com, and so on.',
      // website: 'Comunion.io',
      // socials: 'twitter,facebook,youtube,instagram'
      // },
      isAboutInEdit: false,
      isContactInEdit: false
    }
  },
  computed: {
    ...mapGetters([
      'orgForm'
    ])
  },
  // watch() {
  //
  // },
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
    removeSocial(index) {
      console.log(index)
      this.orgForm.social.splice(index, 1)
    },
    handleUpdate(type) {
      console.log(123)
      if (type === 'about') {
        this.isAboutInEdit = false
      } else {
        this.isContactInEdit = false
      }
      updateOrgInfo(this.orgForm._id, this.orgForm).then(res => {
        console.log(res)
        if (!res.err) {
          console.log('update success')
        } else {
          alert(res.msg)
        }
      })
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
