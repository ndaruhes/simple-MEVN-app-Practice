<template>
    <div>
        <Navbar />
        <div class="container">
            <router-view />
        </div>
        <Toast />
        <Footer />
    </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

export default {
    mounted() {},
    components: { Navbar, Toast, Footer },
};
</script>
