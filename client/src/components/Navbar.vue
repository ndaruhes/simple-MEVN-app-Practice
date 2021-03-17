<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-none">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="https://instagram.fcgk18-1.fna.fbcdn.net/v/t51.2885-19/s320x320/67287766_876428936064153_8325529434526318592_n.jpg?tp=1&_nc_ht=instagram.fcgk18-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=DjRzq-AjeUAAX_4sxlc&ccb=7-4&oh=0adb3e4d1a5aaf3c7ce2a81bb3fac7b1&oe=607A7505" alt="" width="30" height="30" class="d-inline-block align-top rounded-circle shadow">
                    Ndaru's Project
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <router-link to="/" class="nav-link"><i class="fas fa-home me-1"></i>Home</router-link>
                        <router-link to="/blogs" class="nav-link" href="#"><i class="fas fa-rss me-1"></i> Blogs</router-link>
                        <router-link to="/register" class="nav-link" href="#"><i class="fas fa-user-plus me-1"></i> Register</router-link>
                        <router-link to="/login" class="nav-link" href="#"><i class="fas fa-sign-in-alt me-1"></i> Login</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <br>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>