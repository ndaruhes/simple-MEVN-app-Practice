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
                window.myToast.classList.remove('d-none')
                // let a = window.myToast
                // a.classList.remove('d-none')
                // if(!a.classList.contains('d-none')){
                //     setTimeout(() => {
                //         a.classList.add('d-none')
                //     }, 2000)
                // }
                
                return err.response
            }

        }
    },
    modules: {
    }
}