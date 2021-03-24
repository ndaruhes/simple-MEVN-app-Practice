<template>
    <div>
        <Navbar />
        <div class="container">
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
    mounted() {},
    components: { Navbar, Footer },
};
</script>
