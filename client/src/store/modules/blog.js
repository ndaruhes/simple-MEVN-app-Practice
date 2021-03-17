import axios from 'axios'

export default{
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
                let response = await axios.get('blogs')
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
}