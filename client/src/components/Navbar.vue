<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-top">
                    Bootstrap
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