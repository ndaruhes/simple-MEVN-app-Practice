import { createStore } from 'vuex'
// import axios from 'axios'
import auth from './modules/auth'
import blog from './modules/blog'

export default createStore({
  state: {
    blogs: []
  },
  mutations: {
    // SET_BLOGS(state, data){
    //   state.blogs = data
    // }
  },
  actions: {
    // async getBlogs({commit}){
    //   try{
    //       let response = await axios.get('http://localhost:3000/api/blogs')
    //       // console.log(response.data.blogs)
    //       commit('SET_BLOGS', response.data.blogs)
    //   }catch(err){
    //       return err.response
    //   }
    // }
  },
  getters: {
    // blogs(state){
    //   return state.blogs
    // }
  },
  modules: {
    auth, blog
  }
})
