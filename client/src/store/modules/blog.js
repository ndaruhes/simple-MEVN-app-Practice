import axios from 'axios'

export default{
    namespaced: true,
    state: {
        blogs: [],
        blog: {}
    },
    mutations: {
        SET_BLOGS(state, data){
            state.blogs = data
        },
        SET_SINGLE_BLOG(state, data){
            state.blog = data
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
        },
        async getSingleBlog({commit}, slug){
            try{
                let response = await axios.get(`blogs/${slug}`)
                commit('SET_SINGLE_BLOG', response.data.blog)
            }catch(err){
                return err.response
            }
        }
    },
    getters: {
        blogs(state){
            return state.blogs
        },
        blog(state){
            return state.blog
        }
    }
}