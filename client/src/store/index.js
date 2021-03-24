import { createStore } from 'vuex'
// import axios from 'axios'
import auth from './modules/auth'
import blog from './modules/blog'

export default createStore({
  state: {
    btnLoading: false,
    formErrors: {},
    toastMessage: '',
    toastStatus: ''
  },
  mutations: {
    SET_BUTTON_LOADING(state, status){
      state.btnLoading = status
    },
    SET_FORM_ERRORS(state, errors){
      state.formErrors = errors
    },
    SET_TOAST_MESSAGE(state, message){
      state.toastMessage = message
    },
    SET_TOAST_STATUS(state, status){
      state.toastStatus = status
    }
  },
  getters: {
    btnLoading(state){
      return state.btnLoading
    },
    formErrors(state){
      return state.formErrors
    },
    toastMessage(state){
      return state.toastMessage
    },
    toastStatus(state){
      return state.toastStatus
    },
  },
  modules: {
    auth, blog
  }
})
