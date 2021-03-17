<template>
    <div>
        <Navbar />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
    mounted(){
        console.log(process.env.VUE_APP_ROOT_URL);
    },
    components: { Navbar },
};
</script>
