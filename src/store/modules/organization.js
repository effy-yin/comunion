// import { login, logout, getInfo } from '@/api/user'
import { newOrg, getOrgInfo, updateOrgInfo } from '@/api/organization'

const state = {
  _id: '',
  name: '',
  email: '',
  wallet: [],
  website: '',
  mission: '',
  vision: '',
  description: '',
  transactionHash: '',
  social: [],
  members: [],
  status: 1
}

const mutations = {
  SET_ID: (state, _id) => {
    state._id = _id
  },
  SET_INFO: (state, data) => {
    state.name = data.name
    state.email = data.email
    state.wallet = data.wallet
    state.website = data.website
    state.mission = data.mission
    state.vision = data.vision
    state.description = data.description
    state.transactionHash = data.transactionHash
    state.social = data.social
    state.members = data.members
    state.status = data.status
  },
  ADD_MEMBER: (state, member) => {
    state.members.push(member)
  }
}

const actions = {
  newOrg({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      newOrg(data).then(response => {
        if (!response.err) {
          commit('SET_ID', response.entity._id)
          commit('SET_INFO', response.entity)
        } else {
          console.log(response.msg)
        }

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getOrgInfo({ commit, state }, _id) {
    return new Promise((resolve, reject) => {
      getOrgInfo(_id).then(response => {
        if (!response.err) {
          commit('SET_ID', _id)
          commit('SET_INFO', response.entity)
        } else {
          console.log(response.msg)
        }

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addOrgMember({ commit, state }, member) {
    // state.members.push(member)
    const members = state.members.concat((member))
    //
    // this.org.members.push({
    //   wallet: this.searchUser.organization,
    //   email: this.searchUser.email,
    //   description: this.searchUser.description,
    //   role: ''// this.searchUser.role
    // })
    return new Promise((resolve, reject) => {
      updateOrgInfo(state._id, { members: members }).then(res => {
        console.log(res)
        if (res.entity) {
          this.commit('ADD_MEMBER', member)
          resolve('success')
        } else {
          alert('update memeber fail')
          resolve(res.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

