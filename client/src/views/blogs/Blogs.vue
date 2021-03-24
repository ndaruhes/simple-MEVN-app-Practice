<template>
    <div>
        <Breacrumb />

        <div class="col-md-4" v-for="blog in blogs" :key="blog.id">
            <div class="col-md-12 shadow rounded">
                <img :src="apiURL+'images/blogs/'+blog.cover" class="card-img-top" :alt="blog.title">
                <div class="card-body">
                    <router-link :to="{ name: 'blog.single', params: {slug: blog.slug} }" class="text-decoration-none text-dark">
                        <h5 class="card-title">{{ blog.title }}</h5>
                    </router-link>
                    <p class="card-text">{{ blog.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import appConfig from "../../config/app";
import Breacrumb from "../../components/Breacrumb";
export default {
    setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    mounted() {
        this.getBlogs();
    },
    components: { Breacrumb },
    computed: {
        ...mapGetters({
            blogs: "blog/blogs",
        }),
    },
    methods: {
        getBlogs() {
            this.$store.dispatch("blog/getBlogs");
        },
    },
};
</script>

<style>
</style>