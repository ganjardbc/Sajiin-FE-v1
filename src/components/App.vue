<template>
    <div id="app">
        <ReloadApp 
            v-if="updateApplication" 
            @closeReload="closeReload" 
            @reloadApplication="reloadApplication" />
        <router-view />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ReloadApp from './ReloadApp'

export default {
    name: 'app',
    data () {
        return {}
    },
    components: {
        ReloadApp
    },
    computed: {
        ...mapState({
            updateApplication: (state) => state.application.updateApplication,
        }),
    },
    methods: {
        ...mapActions({
            setUpdateApplication: 'application/setUpdateApplication',
        }),
        reloadApplication () {
            this.setUpdateApplication(false)
            window.location.reload()
        },
        closeReload () {
            this.setUpdateApplication(false)
        }
    },
    mounted () {
        if (this.$workbox) {
            this.$workbox.addEventListener("installed", (event) => {
                if (event.isUpdate) {
                    this.setUpdateApplication(true)
                } else {
                    this.setUpdateApplication(false)
                }
            })
        }

        const data = this.$cookies.get('user');
        const token = this.$cookies.get('token');
        if (data && token) {
            const payload = {
                id: data.id,
                name: data.name,
                email: data.email,
                token: token
            }
            this.$socket.emit('admin', payload)
        }
    },
    sockets: {
        connect: function () {
            this.$message('Your are connected')
        },
        disconnect: function () {
            this.$message({
                message: 'Your are disconnected',
                type: 'error'
            })
        },
    }
}
</script>
<style>
    @import url('https://use.fontawesome.com/releases/v5.15.3/css/all.css');
</style>