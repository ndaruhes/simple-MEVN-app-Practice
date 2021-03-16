<template>
    <div>
        <h1>Blog</h1>
        <ul v-for="blog in blogs" :key="blog.id">
            <!-- {{ blogs }} -->
            <li>{{ blog.title }}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    mounted() {
        this.getBlogs();
    },
    computed: {
        ...mapGetters({
            blogs: "blog/blogs",
        }),
    },
    methods: {
        getBlogs() {
            this.$store.dispatch("getBlogs");
            // .then((res) => {
            //     // console.log(res);
            // });
        },
    },
};
</script>

<style>
</style>