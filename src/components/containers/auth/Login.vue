<template>
    <div 
        id="Login" 
        class="post-top" 
        style="padding-left: 10px; padding-right: 10px;">
        <div 
            class="card card-login border-radius box-shadow bg-white" 
            style="margin: auto;"
            v-loading="loading">
            <form 
                action="#" 
                @submit.prevent="submit" 
                class="width width-100 padding padding-top-20px padding-bottom-20px">
                <div class="width width-150px width-center">
                    <div 
                        class="image image-full image-center bg-transparent" 
                        style="padding-bottom: 40%;">
                        <img 
                            :src="logo" 
                            alt=""
                            class="post-center" 
                            style="width: 100%;">
                    </div>
                </div>

                <div class="padding padding-top-15px padding-bottom-15px">
                    <div class="field-group">
                        <div class="field-label">Username</div>
                        <el-input 
                            placeholder=""
                            type="text"
                            v-model="form.username"
                            :disabled="loading"></el-input>
                        <div 
                            v-if="errorMessage.username" 
                            class="field-error">
                            {{ errorMessage.username }}
                        </div>
                    </div>

                    <div class="field-group">
                        <div class="field-label">Password</div>
                        <el-input 
                            placeholder=""
                            type="password"
                            v-model="form.password"
                            :disabled="loading"
                            show-password></el-input>
                        <div 
                            v-if="errorMessage.password" 
                            class="field-error">
                            {{ errorMessage.password }}
                        </div>
                    </div>
                </div>

                <button class="btn btn-full btn-main" :disabled="isButtonDisabled">Login</button>

                <div class="fonts fonts-9 grey normal align-center margin margin-bottom-15px margin-top-15px">Or</div>

                <div class="content-center">
                    <router-link :to="{name: 'register'}" class="fonts fonts-11 red semibold align-center">Register</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import logo from '@/assets/img/logo.png'

export default {
    name: "Login",
    components: {},

    data () {
        return {
            logo: logo,
        }
    },

    mounted() {},

    computed: {
        ...mapState({
            form: (state) => state.storeAuth.form,
            errorMessage: (state) => state.storeAuth.errorMessage,
            loading: (state) => state.storeAuth.loading,
        }),
        isButtonDisabled () {
            let status = true 
            if (this.form.username && this.form.password) {
                status = false
            }
            return status
        }
    },

    methods: {
        ...mapActions({
            login: 'storeAuth/login',
        }),

        async submit () {
            const res = await this.login(this.form)
            if (res.data.status === 'ok') {
                const data = res.data.data 

                this.$session.set('token', data.token)
                this.$session.set('tokenBearer', `Bearer ${data.token}`)
                this.$session.set('user', data.user)
                this.$session.set('role', data.role)
                this.$session.set('shop', data.shop)
                this.$session.set('employee', data.employee)
                this.$session.set('permissions', data.permissions)

                if (data.user.role_name === 'admin') {
                    this.$router.replace({ name: 'admin-home' })
                } else {
                    this.$router.replace({ name: 'owner-home' })
                }
            }
        }
    },

    beforeCreate: function () {
        if (this.$session.get('token')) 
        {
            const roleName = this.$session.get('user').role_name
            if (roleName === 'admin') {
                this.$router.replace({ name: 'admin-home' })
            } else {
                this.$router.replace({ name: 'owner-home' })
            }
        }
    }
}

</script>
