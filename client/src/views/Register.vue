<template>
    <div class="col-md-4 m-auto">
        <h4 class="text-center">Register</h4>
        <form action="#" @submit.prevent="register">
            <div class="form-group mb-3">
                <label for="">Name: </label>
                <input type="text" class="form-control" v-model="form.name" :class="{'is-invalid': formErrors.name && formErrors.name.length > 0}" placeholder=" Your name">
                <div class="invalid-feedback" v-if="formErrors.name">{{formErrors.name[0]}}</div>
            </div>
            <div class="form-group mb-3">
                <label for="">Email: </label>
                <input type="text" class="form-control" v-model="form.email" :class="{'is-invalid': formErrors.email && formErrors.email.length > 0}" placeholder="Your email">
                <div class="invalid-feedback" v-if="formErrors.email">{{formErrors.email[0]}}</div>
            </div>
            <div class="form-group mb-3">
                <label for="">Password: </label>
                <input type="password" class="form-control" v-model="form.password" :class="{'is-invalid': formErrors.password && formErrors.password.length > 0}" placeholder="Your password">
                <div class="invalid-feedback" v-if="formErrors.password">{{formErrors.password[0]}}</div>
            </div>
            <div class="form-group mb-3">
                <label for="">Confirm Password: </label>
                <input type="password" class="form-control" v-model="form.confirmPassword" :class="{'is-invalid': formErrors.confirmPassword && formErrors.confirmPassword.length > 0}" placeholder="Confirm password">
                <div class="invalid-feedback" v-if="formErrors.confirmPassword">{{formErrors.confirmPassword[0]}}</div>
            </div>

            <button type="submit" class="btn btn-primary btn-sm">Submit</button>
        </form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                confirmPasswod: "",
            },
        };
    },
    computed: {
        ...mapGetters({
            btnLoading: "btnLoading",
            formErrors: "formErrors",
        }),
    },
    methods: {
        register() {
            this.$store.dispatch("auth/register", this.form).then((res) => {
                if (res.status === 400) {
                    this.$toast.show(res.data.message, {
                        position: "bottom-right",
                        type: "error",
                        dismissible: true,
                    });
                } else {
                    this.$toast.show(res.data.message, {
                        position: "bottom-right",
                        type: "success",
                        dismissible: true,
                    });
                }
            });
        },
    },
};
</script>

<style>
</style>