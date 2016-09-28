import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  photos: {}
}

const mutations = {
 SET_PHOTOS(photos){
   state.photos = photos
 }
}

export default new Vuex.Store({
  state,
  mutations
})
