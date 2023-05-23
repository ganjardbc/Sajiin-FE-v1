<template>
    <div id="App">
        <router-view />
    </div>
</template>
<script>
import logo from '@/assets/img/Logo.png'

export default {
    name: 'App',
    data () {
        return {
            logo: logo,
        }
    },
}
</script>