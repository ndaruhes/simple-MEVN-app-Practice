import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    namespaced: true,
    state: {
        blogs: []
    },
    mutations: {
        SET_BLOGS(state, data){
            state.blogs = data
        }
    },
    actions: {
        async getBlogs({commit}){
            try{
                let response = await axios.post('http://localhost:3000/api/blogs')
                commit('SET_BLOGS', response.data.blogs)
            }catch(err){
                return err.response
            }
        }
    },
    getters: {
        blogs(state){
            return state.blogs
        }
    }
})