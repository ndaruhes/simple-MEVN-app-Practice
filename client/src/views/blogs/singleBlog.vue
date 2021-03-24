<template>
    <div>
        <div class="col-md-8 m-auto shadow rounded">
            <img :src="apiURL + 'images/blogs/' + blog.cover" :alt="blog.title" class="w-100 rounded-top">
            <div class="col-md-12 p-3">
                <h3 class="text-danger">{{ blog.title }}</h3>
                <span>
                    <i class="fas fa-user me-1"></i>{{ blog.user_name }}
                    <i class="fas fa-calendar-alt me-1"></i> {{ blog.created_at }}
                </span>
                <hr>
                <p>{{ blog.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import appConfig from "../../config/app";
export default {
    setup() {
        return {
            apiURL: appConfig.apiURL,
        };
    },
    mounted() {
        this.getSingleBlog();
    },
    computed: {
        ...mapGetters({
            blog: "blog/blog",
        }),
    },
    methods: {
        getSingleBlog() {
            let slug = this.$route.params.slug;
            this.$store.dispatch("blog/getSingleBlog", slug);
        },
    },
};
</script>

<style>
</style>