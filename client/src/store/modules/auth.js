import axios from 'axios'

export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async register({commit}, credentials){
            commit('SET_BUTTON_LOADING', true, {root: true})
            try{
                let response = await axios.post('register', credentials)
                commit('SET_TOAST_MESSAGE', response.data.message, {root: true})
                commit('SET_TOAST_STATUS', response.data.status, {root: true})
                commit('SET_BUTTON_LOADING', false, {root: true})
                return response
            }catch(err){
                commit('SET_FORM_ERRORS', err.response.data.errors, {root: true})
                return err.response
            }

        }
    },
    modules: {
    }
}